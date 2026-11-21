import { isCliError } from "@wirecat/cli-base"
import {
  appDoctorCommand,
  environmentOf,
  ProfileTokenStore,
  profilesHere,
  type RunOptions,
} from "@wirecat/cli-core/cli"
import { Pacer, pacePathFor } from "@wirecat/cli-core/sends"
import type { Command } from "commander"
import { configuration } from "../config.js"
import { PACE, type ServiceEnvironment } from "../context.js"
import { IDENTITY, PACKAGE } from "../identity.js"
import { slackClient } from "../slack/client.js"
import { whoAmI } from "./session.js"

/** `auth.test` for every profile signed in here, each under its own name; doctor picks no profile. */
const checkProfiles = async (command: Command) => {
  const environment = environmentOf<ServiceEnvironment & RunOptions>(command)
  const env = environment.env ?? process.env
  // biome-ignore lint/plugin/no-own-settings: doctor names no profile, so there is no baseContext to ask
  const { configuredProfiles } = configuration.resolveSettings({}, { env, needsProfile: false })
  const tokens = new ProfileTokenStore({
    app: IDENTITY,
    env,
    ...(environment.keyring ? { keyring: environment.keyring } : {}),
  })
  const signedIn = profilesHere(IDENTITY, configuredProfiles, env).flatMap((profile) => {
    const saved = tokens.read(profile)
    return saved ? [{ profile, token: saved.secret }] : []
  })
  const profiles = await Promise.all(
    signedIn.map(async ({ profile, token }) => {
      const slack = slackClient({
        token,
        fetch: environment.fetch,
        signal: environment.signal,
        pacer: new Pacer(pacePathFor(IDENTITY, profile, env), PACE),
      })
      try {
        return { profile, ok: true, ...(await whoAmI(slack)).account }
      } catch (error) {
        return { profile, ok: false, error_code: isCliError(error) ? error.code : "provider_error" }
      }
    }),
  )
  return { ok: profiles.every((one) => one.ok), profiles }
}

/**
 * cli-core's doctor; `--online` also asks Slack whose each saved token is. Its `online` hook gets no command, so the
 * one being run is kept for it, with the test's keyring and fake in its environment.
 */
export const doctorCommand = (): Command => {
  let running: Command
  return appDoctorCommand(IDENTITY, configuration, {
    packageName: PACKAGE,
    online: () => checkProfiles(running),
  }).hook("preAction", (_, action) => {
    running = action
  })
}
