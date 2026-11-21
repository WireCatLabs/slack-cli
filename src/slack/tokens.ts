import { CliError } from "@wirecat/cli-base"

const BOT_REFUSAL =
  "this is a bot token (xoxb-); slack reads as you, so it takes the app's User OAuth Token (xoxp-…) " +
  "from OAuth & Permissions"

// A rotating token expires every 12 hours and renewing it needs the app's client secret, which slack never holds;
// rotation cannot be turned off once on (https://docs.slack.dev/authentication/using-token-rotation/).
const ROTATING_REFUSAL =
  "this is a rotating token (xoxe.), which expires in 12 hours and slack cannot renew; make the app again from " +
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
