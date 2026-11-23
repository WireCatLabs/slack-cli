import { CliError, isCliError } from "@wirecat/cli-base"
import {
  type BaseEnvironment,
  baseContext,
  type EventSink,
  environmentOf,
  type GlobalFlags,
  ProfileTokenStore,
  recalledAccount,
  refuseOffline,
} from "@wirecat/cli-core/cli"
import { Pacer, pacePathFor } from "@wirecat/cli-core/sends"
import type { Command } from "commander"
import { configuration } from "./config.js"
import { IDENTITY, PROVIDER, SERVICE } from "./identity.js"
import { slackClient } from "./slack/client.js"
import { refuseOtherTokens } from "./slack/tokens.js"

/** What a test hands `run()` beside cli-core's own: the fake service in place of the network (WC-ARCH-10). */
export interface ServiceEnvironment extends BaseEnvironment {
  fetch?: typeof fetch
}

// Slack limits each method per workspace by tier (https://docs.slack.dev/apis/web-api/rate-limits/). The paging reads
// mix Tier 2 (conversations.list, users.list, reactions.list: 20 a minute) and Tier 3 (conversations.history, 50);
// cli-core's Pacer keeps one pace per profile, so it is the lowest, Tier 2. A 429 holds every process of the profile
// for its Retry-After.
export const PACE = { perMinute: 20, burst: 10 }

/**
 * Settings, keyring and the run come from cli-core's `baseContext` and nowhere else: a command that resolves settings
 * on its own skips `--timeout`, the run record and the profile's permissions (WC-LIFE-5, WC-LIFE-15).
 */
export const contextOf = (command: Command) => {
  const base = baseContext(command, configuration.resolveSettings)
  return {
    ...base,
    environment: environmentOf<ServiceEnvironment>(command),
    flags: command.optsWithGlobals<GlobalFlags>(),
    profile: base.settings.profile,
    tokens: new ProfileTokenStore({
      app: IDENTITY,
      env: base.env,
      keyring: base.keyring,
      warn: base.renderer.warn,
    }),
  }
}

/** The profile's pace: Slack's Tier 2, or `requests_per_minute` when set; 0 turns it off for tests. */
export const pacerFor = (command: Command) => {
  const { env, profile, settings } = contextOf(command)
  const { requestsPerMinute } = settings
  return new Pacer(
    pacePathFor(IDENTITY, profile, env),
    requestsPerMinute === undefined ? PACE : { ...PACE, perMinute: requestsPerMinute },
  )
}

/** Slack for one run, with the token it was given and the profile's pace; each call lands in the run's `events`. */
export const slackFor = (command: Command, token: string, events?: EventSink) => {
  const { environment } = contextOf(command)
  return slackClient({ token, events, signal: environment.signal, fetch: environment.fetch, pacer: pacerFor(command) })
}

/** Whether the profile's token comes from SLACK_TOKEN, which never went through `session start`. */
export const tokenFromEnvironment = (command: Command) => {
  const { profile, tokens } = contextOf(command)
  return tokens.read(profile)?.source === "environment"
}

/**
 * The profile's saved token, or an authentication error that says how to sign in. Read before any request; one from
 * `SLACK_TOKEN` skips `session start`, so it is refused here as there.
 */
export const tokenOf = (command: Command): string => {
  const { profile, tokens, env } = contextOf(command)
  refuseOffline(command, SERVICE)
  try {
    return refuseOtherTokens(tokens.need(profile))
  } catch (error) {
    // A keyring that cannot be read hides whether a profile `session start` never saw is a typo; as not signed in,
    // cli-core names the profiles here (WC-ACCT-3).
    if (isCliError(error) && error.code === "configuration_error" && !recalledAccount(IDENTITY, PROVIDER, profile, env))
      throw new CliError(
        "authentication_error",
        `profile ${profile} is not signed in — run \`${IDENTITY.command} ${profile} session start\``,
        { reason: "session.missing" },
      )
    throw error
  }
}
