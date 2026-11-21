import { CliError } from "@wirecat/cli-base"
import * as v from "valibot"
import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { slackClient, slackFailure } from "./client.js"
import { authTestAnswer } from "./map.js"

const anything = v.looseObject({ ok: v.literal(true) })

it("POSTs a form with the token only in the Bearer header, and refuses a redirect", async () => {
  const slack = fakeSlack()
  const sent: RequestInit[] = []
  const answer = await slackClient({
    token: FAKE_TOKEN,
    fetch: (input, init = {}) => {
      sent.push(init)
      return slack.fetch(input, init)
    },
  })("auth.test", {}, authTestAnswer)
  expect(answer).toMatchObject({ team_id: "T0SYNTH01", user_id: "U0SYNTH01" })
  expect(slack.refusals).toEqual([])
  expect(sent[0]?.redirect).toBe("error")
  expect(String(sent[0]?.body)).not.toContain(FAKE_TOKEN)
})

const METHOD = "https://docs.slack.dev/reference/methods/"

// Each code as the method page that lists it under "Errors".
it.each([
  ["invalid_auth", false, "authentication_error", `${METHOD}auth.test/`],
  ["not_authed", false, "authentication_error", `${METHOD}auth.test/`],
  ["token_revoked", false, "authentication_error", `${METHOD}auth.test/`],
  ["token_expired", false, "authentication_error", `${METHOD}auth.test/`],
  ["account_inactive", false, "authentication_error", `${METHOD}auth.test/`],
  ["missing_scope", false, "permission_error", `${METHOD}auth.test/`],
  ["not_allowed_token_type", false, "permission_error", `${METHOD}auth.test/`],
  ["no_permission", false, "permission_error", `${METHOD}auth.test/`],
  ["restricted_action", false, "permission_error", `${METHOD}conversations.history/`],
  ["ratelimited", false, "rate_limited", `${METHOD}auth.test/`],
  ["channel_not_found", false, "not_found", `${METHOD}chat.postMessage/`],
  ["user_not_found", false, "not_found", `${METHOD}users.info/`],
  ["message_not_found", false, "not_found", `${METHOD}chat.delete/`],
  ["thread_not_found", false, "not_found", `${METHOD}conversations.replies/`],
  ["file_not_found", false, "not_found", `${METHOD}files.info/`],
  ["not_in_channel", true, "permission_error", `${METHOD}chat.postMessage/`],
  ["cant_update_message", true, "permission_error", `${METHOD}chat.update/`],
  ["cant_delete_message", true, "permission_error", `${METHOD}chat.delete/`],
  ["edit_window_closed", true, "permission_error", `${METHOD}chat.update/`],
  ["msg_too_long", true, "validation_error", `${METHOD}chat.update/`],
  ["restricted_action_read_only_channel", true, "permission_error", `${METHOD}chat.postMessage/`],
  ["invalid_arguments", false, "validation_error", `${METHOD}auth.test/`],
  ["invalid_arg_name", false, "validation_error", `${METHOD}auth.test/`],
  ["invalid_array_arg", false, "validation_error", `${METHOD}auth.test/`],
  ["invalid_cursor", false, "validation_error", `${METHOD}conversations.list/`],
  ["invalid_ts_latest", false, "validation_error", `${METHOD}conversations.history/`],
  ["invalid_ts_oldest", false, "validation_error", `${METHOD}conversations.history/`],
  ["bad_timestamp", false, "validation_error", `${METHOD}reactions.add/`],
  ["fatal_error", false, "provider_unavailable", `${METHOD}auth.test/`],
  ["internal_error", false, "provider_unavailable", `${METHOD}auth.test/`],
  ["service_unavailable", false, "provider_unavailable", `${METHOD}auth.test/`],
  ["request_timeout", false, "provider_unavailable", `${METHOD}auth.test/`],
  ["internal_error", true, "outcome_unknown", `${METHOD}auth.test/`],
  ["is_archived", true, "validation_error", `${METHOD}chat.postMessage/`],
])("Slack's %s (a write: %s) is %s, as %s lists it", (error, writes, code) => {
  expect(slackFailure(error, writes).code).toBe(code)
})

it("a refusal with HTTP 200 keeps Slack's code and the scope it needs, never its free text", async () => {
  const slack = fakeSlack({
    "auth.test": { body: { ok: false, error: "missing_scope", needed: "channels:history", warning: "free text here" } },
  })
  const failure = slackClient({ token: FAKE_TOKEN, fetch: slack.fetch })("auth.test", {}, anything)
  await expect(failure).rejects.toMatchObject({
    code: "permission_error",
    details: { slack_error: "missing_scope", needed: "channels:history" },
  })
  await expect(failure).rejects.not.toThrow("free text")
})

it("a 429 waits for Retry-After through the pace, then sends once more", async () => {
  let turn = 0
  const holds: number[] = []
  const slack = fakeSlack({
    "auth.test": () =>
      turn++ === 0
        ? { status: 429, headers: { "retry-after": "2" }, body: { ok: false, error: "ratelimited" } }
        : { body: { ok: true } },
  })
  const pacer = { reserve: async () => Date.now(), holdFor: async (ms: number) => void holds.push(ms) }
  const slept: number[] = []
  const sleep = async (ms: number) => void slept.push(ms)
  await expect(
    slackClient({ token: FAKE_TOKEN, fetch: slack.fetch, pacer, sleep })("auth.test", {}, anything),
  ).resolves.toEqual({
    ok: true,
  })
  expect(holds).toEqual([2000])
  expect(slept).toEqual([2000])
  expect(slack.calls).toHaveLength(2)
})

it("an answer without the documented fields is invalid_response; one that is not JSON too", async () => {
  const shapeless = fakeSlack({ "auth.test": { body: { ok: true } } })
  await expect(
    slackClient({ token: FAKE_TOKEN, fetch: shapeless.fetch })("auth.test", {}, authTestAnswer),
  ).rejects.toMatchObject({ code: "invalid_response" })
  const html = async () => new Response("<html>", { headers: { "content-type": "text/html" } })
  await expect(slackClient({ token: FAKE_TOKEN, fetch: html })("auth.test", {}, anything)).rejects.toMatchObject({
    code: "invalid_response",
  })
})

it("a 5xx is sent once: a read says it may be retried later, a write is outcome_unknown", async () => {
  let sent = 0
  const down = async () => {
    sent++
    return new Response("", { status: 503 })
  }
  const call = (writes: boolean) =>
    slackClient({ token: FAKE_TOKEN, fetch: down })("auth.test", {}, anything, { writes })
  await expect(call(false)).rejects.toMatchObject({ code: "provider_unavailable", details: { retryable: true } })
  await expect(call(true)).rejects.toMatchObject({ code: "outcome_unknown", details: { retryable: false } })
  expect(sent).toBe(2)
})

it("a write refused before it was sent keeps its own error, never outcome_unknown", async () => {
  const undeclared = new CliError("configuration_error", "not a host this CLI declares", { sent: false })
  const refusing = async () => Promise.reject(undeclared)
  await expect(
    slackClient({ token: FAKE_TOKEN, fetch: refusing })("chat.postMessage", {}, anything, { writes: true }),
  ).rejects.toMatchObject({ code: "configuration_error" })
  const overBudget = new CliError("rate_limited", "the pace needs a longer wait", { sent: false })
  const pacer = { reserve: async () => Promise.reject(overBudget), holdFor: async () => {} }
  const slack = fakeSlack()
  await expect(
    slackClient({ token: FAKE_TOKEN, fetch: slack.fetch, pacer })("chat.postMessage", {}, anything, { writes: true }),
  ).rejects.toMatchObject({ code: "rate_limited" })
  expect(slack.calls).toEqual([])
})

it("no answer: a read is a network error, a stopped read is cancelled, a write is outcome_unknown", async () => {
  const failing = async () => Promise.reject(new TypeError("fetch failed"))
  const call = (writes: boolean, signal?: AbortSignal) =>
    slackClient({ token: FAKE_TOKEN, fetch: failing, signal })("auth.test", {}, anything, { writes })
  await expect(call(false)).rejects.toMatchObject({ code: "network_error" })
  await expect(call(true)).rejects.toMatchObject({ code: "outcome_unknown" })
  const stop = new AbortController()
  stop.abort()
  await expect(call(false, stop.signal)).rejects.toMatchObject({ code: "cancelled" })
})
