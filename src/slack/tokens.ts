import { CliError } from "@wirecat/cli-base"
import type { SlackClient } from "./client.js"
import { accountOf, authTestAnswer } from "./map.js"

const BOT_REFUSAL =
  "this is a bot token (xoxb-); slk reads as you, so it takes the app's User OAuth Token (xoxp-…) " +
  "from OAuth & Permissions"

// A rotating token expires every 12 hours and renewing it needs the app's client secret, which slack never holds;
// rotation cannot be turned off once on (https://docs.slack.dev/authentication/using-token-rotation/).
const ROTATING_REFUSAL =
  "this is a rotating token (xoxe.), which expires in 12 hours and slk cannot renew; make the app again from " +
  "docs/slack-app-manifest.json, which keeps token rotation off, and paste its User OAuth Token (xoxp-…)"

export const refuseBot = () => new CliError("validation_error", BOT_REFUSAL)

/** Refused before anything is sent: only a lasting user token reads as the person (https://docs.slack.dev/authentication/tokens/). */
export const refuseOtherTokens = (token: string): string => {
  if (/^(xoxe\.)?xoxb-/.test(token)) throw refuseBot()
  if (token.startsWith("xoxe.")) throw new CliError("validation_error", ROTATING_REFUSAL)
  if (!token.startsWith("xoxp-"))
    throw new CliError(
      "validation_error",
      "this is not a Slack user token; copy the User OAuth Token (xoxp-…) from your app's OAuth & Permissions page",
    )
  return token
}

/** `auth.test` says whose the token is; a bot's answer carries `bot_id`, and a bot cannot read as the person. */
export const whoAmI = async (slack: SlackClient) => {
  const answer = await slack("auth.test", {}, authTestAnswer)
  if (answer.bot_id !== undefined) throw refuseBot()
  return accountOf(answer)
}
