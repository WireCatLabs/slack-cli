import { CliError, type ErrorCode, isCliError, type SleepLike, wallClock } from "@wirecat/cli-base"
import {
  type FetchLike,
  hostFetch,
  type PacerLike,
  providerWaitMs,
  readJsonResponse,
  retrying,
  statusToCode,
} from "@wirecat/cli-base/http"
import { type EventSink, providerRequest } from "@wirecat/cli-core/cli"
import * as v from "valibot"
import { DESKTOP, SERVICE } from "../identity.js"

export const SLACK_API = "https://slack.com/api/"

const LARGEST_ANSWER = 16 * 1024 * 1024

export interface SlackClientOptions {
  token: string
  fetch?: FetchLike | undefined
  /** cli-core's per-profile `Pacer`: every process of the profile waits its turn, and a 429 holds them all. */
  pacer?: PacerLike | undefined
  /** The run's sink, so each call lands in the run record under its method name (WC-LIFE-15). */
  events?: EventSink | undefined
  signal?: AbortSignal | undefined
  /** A test's clock; the pace's waits and a 429's Retry-After sleep for real otherwise. */
  sleep?: SleepLike | undefined
}

export type SlackArgs = Readonly<Record<string, string | number | boolean | undefined>>

const AUTH = new Set(["invalid_auth", "not_authed", "token_revoked", "token_expired", "account_inactive"])
const PERMISSION = new Set(["missing_scope", "not_allowed_token_type", "no_permission"])

/** Slack's codes with a reason of their own (src/reasons.ts). */
const REASON_OF: Record<string, string> = {
  cant_update_message: "message.not-yours",
  cant_delete_message: "message.not-yours",
  edit_window_closed: "message.edit-window-closed",
  msg_too_long: "message.too-long",
  not_in_channel: "chat.not-joined",
  is_archived: "chat.archived",
}

const reasonOf = (code: string) =>
  REASON_OF[code] ??
  (code === "restricted_action" || code.startsWith("restricted_action_") ? "chat.restricted" : undefined)
const NOT_FOUND = new Set([
  "channel_not_found",
  "user_not_found",
  "message_not_found",
  "thread_not_found",
  "file_not_found",
])
const INPUT = new Set([
  "invalid_arguments",
  "invalid_arg_name",
  "invalid_array_arg",
  "invalid_cursor",
  "invalid_ts_latest",
  "invalid_ts_oldest",
  "bad_timestamp",
])
const UNAVAILABLE = new Set(["fatal_error", "internal_error", "service_unavailable", "request_timeout"])

const failureAnswer = v.looseObject({
  ok: v.literal(false),
  error: v.optional(v.string()),
  // conversations.leave answers a chat the account is not in with this flag and no `error`.
  not_in_channel: v.optional(v.boolean()),
  needed: v.optional(v.string()),
})

const REASONED: Record<string, [ErrorCode, string]> = {
  "message.not-yours": ["permission_error", `${SERVICE} lets you change only your own messages`],
  "message.edit-window-closed": ["permission_error", `${SERVICE} no longer lets this message be edited`],
  "message.too-long": ["validation_error", `the message is longer than ${SERVICE} takes; shorten it`],
  "chat.not-joined": ["permission_error", "you are not in this chat; join it first"],
  "chat.archived": ["validation_error", "the chat is archived"],
  "chat.restricted": ["permission_error", "a workspace or channel setting stops this"],
}

/**
 * Slack answers a refusal with HTTP 200 and `ok: false`. Only the code is kept, never Slack's free text, which can
 * quote what was sent (WC-SECR-6); a write Slack failed on its side may have landed (WC-OUT-20).
 */
export const slackFailure = (code: string, writes: boolean, needed?: string): CliError => {
  const details = { slack_error: code }
  const reason = reasonOf(code)
  if (reason) {
    const [errorCode, message] = REASONED[reason] ?? ["provider_error", `${SERVICE} refused the call`]
    return new CliError(errorCode, `${message} (${code})`, { ...details, reason })
  }
  if (AUTH.has(code))
    return new CliError("authentication_error", `${SERVICE} refused the token (${code}); sign in again`, details)
  if (code === "missing_scope")
    return new CliError(
      "permission_error",
      `${SERVICE} refused: the app lacks the scope ${needed ?? "this method needs"}; add it to the app and reinstall`,
      { ...details, ...(needed ? { needed } : {}) },
    )
  if (PERMISSION.has(code)) return new CliError("permission_error", `${SERVICE} refused the call (${code})`, details)
  if (code === "ratelimited")
    return new CliError("rate_limited", `${SERVICE} asked to slow down; retry later`, { ...details, retryable: true })
  if (NOT_FOUND.has(code))
    return new CliError("not_found", `${SERVICE} has no such item, or this account cannot see it (${code})`, details)
  if (INPUT.has(code)) return new CliError("validation_error", `${SERVICE} refused the arguments (${code})`, details)
  if (UNAVAILABLE.has(code))
    return writes
      ? new CliError("outcome_unknown", `${SERVICE} failed during a write (${code}); check before repeating it`, {
          ...details,
          retryable: false,
        })
      : new CliError("provider_unavailable", `${SERVICE} failed (${code}); retry later`, {
          ...details,
          retryable: true,
        })
  return new CliError("provider_error", `${SERVICE} refused the call (${code})`, details)
}

/** The error a Slack answer of HTTP 200 carries, or undefined when it says `ok: true`. */
export const refusalOf = (body: unknown, writes: boolean): CliError | undefined => {
  const refused = v.safeParse(failureAnswer, body)
  if (!refused.success) return undefined
  const { error, not_in_channel, needed } = refused.output
  return slackFailure(error ?? (not_in_channel ? "not_in_channel" : "unknown"), writes, needed)
}

const statusFailure = (status: number, writes: boolean, retryAfterMs: number | undefined): CliError => {
  if (status === 429)
    return new CliError("rate_limited", `${SERVICE} asked to slow down; retry later`, {
      status,
      retryable: true,
      ...(retryAfterMs === undefined ? {} : { retry_after_ms: retryAfterMs }),
    })
  if (status >= 500 && writes)
    return new CliError("outcome_unknown", `${SERVICE} failed during a write; check before repeating it`, {
      status,
      retryable: false,
    })
  return new CliError(statusToCode(status), `${SERVICE} refused the call (HTTP ${status})`, {
    status,
    retryable: status >= 500,
  })
}

// An answer that cannot be read does not say the write did not land (WC-LIFE-9).
const unreadableWrite = () =>
  new CliError("outcome_unknown", `${SERVICE} answered a write with something unreadable; check before repeating it`, {
    retryable: false,
  })

const formOf = (args: SlackArgs) =>
  new URLSearchParams(
    Object.entries(args).flatMap(([name, value]) =>
      value === undefined ? [] : [[name, String(value)] as [string, string]],
    ),
  )

/**
 * The one place that holds the token: in the Authorization header, never in the address, the body or a record
 * (WC-SECR-7). Every method goes as a form POST, which Slack takes for each of them
 * (https://docs.slack.dev/apis/web-api/#post-bodies). A 429 waits as `Retry-After` says through the profile's pace;
 * nothing else is sent twice.
 */
export const slackClient = (options: SlackClientOptions) => {
  const send = retrying(hostFetch({ hosts: DESKTOP.hosts, ...(options.fetch ? { fetch: options.fetch } : {}) }), {
    ...(options.pacer ? { pacer: options.pacer } : {}),
    ...(options.sleep ? { sleep: options.sleep } : {}),
  })

  const call = async <T>(
    method: string,
    args: SlackArgs,
    answer: v.GenericSchema<unknown, T>,
    { writes = false, signal: stop }: { writes?: boolean; signal?: AbortSignal | undefined } = {},
  ): Promise<T> => {
    // A call may also have its own end, as cli-core's bound on a server search does.
    const signals = [options.signal, stop].filter((one): one is AbortSignal => one !== undefined)
    const signal = signals.length > 1 ? AbortSignal.any(signals) : signals[0]
    const end = providerRequest(method, options.events, { method: "POST", transport: "http" })
    const fail = (failure: CliError, status?: number): never => {
      end({
        ...(status === undefined ? {} : { status }),
        errorCode: failure.code,
        ...(typeof failure.details.slack_error === "string" ? { providerError: failure.details.slack_error } : {}),
      })
      throw failure
    }
    let response: Response
    try {
      response = await send(new URL(method, SLACK_API), {
        method: "POST",
        headers: {
          authorization: `Bearer ${options.token}`,
          "content-type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: formOf(args),
        redirect: "error",
        ...(signal ? { signal } : {}),
      })
    } catch (error) {
      if (isCliError(error) && error.details.sent === false) return fail(error)
      if (writes)
        return fail(
          new CliError("outcome_unknown", `${SERVICE} did not answer a write; check before repeating it`, {
            retryable: false,
          }),
        )
      if (signal?.aborted) return fail(new CliError("cancelled", `the ${SERVICE} call was stopped`))
      return fail(isCliError(error) ? error : new CliError("network_error", `${SERVICE} could not be reached`))
    }
    if (!response.ok)
      return fail(statusFailure(response.status, writes, providerWaitMs(response.headers, wallClock)), response.status)
    let body: unknown
    try {
      body = await readJsonResponse(response, {
        maxBytes: LARGEST_ANSWER,
        ...(signal ? { signal } : {}),
      })
    } catch {
      return fail(
        writes
          ? unreadableWrite()
          : new CliError("invalid_response", `${SERVICE} answered with something other than JSON`),
        200,
      )
    }
    const refused = refusalOf(body, writes)
    if (refused) return fail(refused, 200)
    const parsed = v.safeParse(answer, body)
    if (!parsed.success)
      return fail(
        writes
          ? unreadableWrite()
          : new CliError("invalid_response", `${SERVICE}'s answer to ${method} lacks the documented fields`),
        200,
      )
    end({ status: response.status })
    return parsed.output
  }

  /**
   * A file's bytes POSTed to the address `files.getUploadURLExternal` gave, on files.slack.com only, paced and in the
   * run record as `files.upload`. Nothing is shared before `files.completeUploadExternal`, so a failure here sent
   * nothing.
   */
  const upload = async (address: string, bytes: Uint8Array): Promise<void> => {
    const end = providerRequest("files.upload", options.events, { method: "POST", transport: "http" })
    const refused = (message: string): never => {
      const failure = new CliError("provider_error", message, { sent: false })
      end({ errorCode: failure.code })
      throw failure
    }
    if (!URL.canParse(address) || new URL(address).host !== "files.slack.com")
      return refused(`${SERVICE} gave an upload address off files.slack.com; nothing was sent`)
    let response: Response
    try {
      response = await send(new URL(address), {
        method: "POST",
        headers: { authorization: `Bearer ${options.token}`, "content-type": "application/octet-stream" },
        body: bytes,
        redirect: "error",
        ...(options.signal ? { signal: options.signal } : {}),
      })
    } catch {
      return refused(`${SERVICE} could not take the file; nothing was sent`)
    }
    if (!response.ok) return refused(`${SERVICE} refused the file (HTTP ${response.status}); nothing was sent`)
    await response.body?.cancel()
    end({ status: response.status })
  }

  return Object.assign(call, { upload })
}

export type SlackClient = ReturnType<typeof slackClient>
