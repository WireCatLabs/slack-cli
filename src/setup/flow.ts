import { CliError } from "@wirecat/cli-base"
import { defineSetup, refuseOffline, type SetupCheck } from "@wirecat/cli-core/cli"
import { configuration } from "../config.js"
import { slackFor } from "../context.js"
import { IDENTITY, SERVICE } from "../identity.js"
import { refuseOtherTokens, whoAmI } from "../slack/tokens.js"
import { en } from "./texts.js"

/** The same proof `session start` runs: the token is a user token, and `auth.test` says whose it is. */
const check: SetupCheck = async ({ command, secrets }) => {
  refuseOffline(command, SERVICE)
  const token = secrets.token?.trim()
  if (!token) throw new CliError("validation_error", "paste the User OAuth Token", { param: "token" })
  refuseOtherTokens(token)
  const { id, account } = await whoAmI(slackFor(command, token))
  return { ...account, keep: { secrets: { token }, account: id } }
}

export const slackSetup = defineSetup({
  app: IDENTITY,
  configuration,
  check,
  start: "app",
  steps: {
    app: {
      title: "app.title",
      blocks: [
        { type: "text", text: "app.intro" },
        { type: "text", text: "app.steps" },
        { type: "note", role: "tip", text: "app.admin" },
      ],
      next: "token",
    },
    token: {
      title: "token.title",
      blocks: [
        { type: "text", text: "token.where" },
        { type: "input", id: "token", secret: "token", input: "password", label: "token.label", hint: "token.hint" },
        { type: "note", role: "warning", text: "token.bot" },
      ],
      next: "check",
    },
    check: {
      kind: "run",
      title: "check.title",
      action: "apply",
      blocks: [{ type: "text", text: "check.body" }],
      next: [
        { when: { result: "check", is: "ok" }, to: "done" },
        { when: { result: "check", error: "authentication_error" }, to: "token" },
        { when: { result: "check", error: "validation_error" }, to: "token" },
        { to: "failed" },
      ],
      back: false,
    },
    failed: {
      kind: "done",
      title: "failed.title",
      blocks: [{ type: "note", role: "danger", text: "failed.body" }],
      back: true,
    },
    done: {
      kind: "done",
      title: "done.title",
      blocks: [
        { type: "text", text: "done.body" },
        { type: "code", code: "slk <profile> chats list\nslack <profile> messages sync '#general'", copy: true },
      ],
    },
  },
  texts: { en },
})
