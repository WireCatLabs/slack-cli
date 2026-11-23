import { tokenSessionCommand } from "@wirecat/cli-core/cli"
import { configuration } from "../config.js"
import { slackFor } from "../context.js"
import { IDENTITY, SERVICE } from "../identity.js"
import { TOKEN_GUIDE } from "../setup/guide.js"
import { refuseOtherTokens, whoAmI } from "../slack/tokens.js"

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
    token: "User OAuth Token (xoxp-…)",
    about:
      "Paste the User OAuth Token (xoxp-…) of your own Slack app, made from docs/slack-app-manifest.json; " +
      "a bot token is refused",
    guide: TOKEN_GUIDE,
    endNote: "The app stays installed in the workspace; remove it there to revoke the token",
    verify: async (command, token, events) => {
      refuseOtherTokens(token)
      return whoAmI(slackFor(command, token, events))
    },
  })
