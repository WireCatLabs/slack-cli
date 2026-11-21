import { tokenSessionCommand } from "@wirecat/cli-core/cli"
import { configuration } from "../config.js"
import { slackFor } from "../context.js"
import { IDENTITY, SERVICE } from "../identity.js"
import type { SlackClient } from "../slack/client.js"
import { accountOf, authTestAnswer } from "../slack/map.js"
import { refuseBot, refuseOtherTokens } from "../slack/tokens.js"

/** `auth.test` says whose the token is; a bot's answer carries `bot_id`, and a bot cannot read as the person. */
export const whoAmI = async (slack: SlackClient) => {
  const answer = await slack("auth.test", {}, authTestAnswer)
  if (answer.bot_id !== undefined) throw refuseBot()
  return accountOf(answer)
}

/**
 * `session start | status | end | list` (WC-ACCT-12) through cli-core's token session: the token is read hidden or
 * from stdin, never as an argument, checked with `auth.test`, and only then kept in the keyring through
 * `ProfileTokenStore`.
 */
export const sessionCommand = () =>
  tokenSessionCommand({
    app: IDENTITY,
    service: SERVICE,
    resolveSettings: configuration.resolveSettings,
    token: "user token",
    about:
      "Paste the User OAuth Token (xoxp-…) of your own Slack app, made from docs/slack-app-manifest.json; " +
      "a bot token is refused",
    endNote: "The app stays installed in the workspace; remove it there to revoke the token",
    verify: async (command, token, events) => {
      refuseOtherTokens(token)
      return whoAmI(slackFor(command, token, events))
    },
  })
