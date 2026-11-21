<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: oauth

## `slack api oauth-access-list [options]`

- What: oauth\_access — read (GET /oauth.access)
- Call: `GET /oauth.access`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--client-id <value>` | no | Issued when you created your application. |
| `--client-secret <value>` | no | Issued when you created your application. |
| `--code <value>` | no | The \`code\` param returned via the OAuth callback. |
| `--redirect-uri <value>` | no | This must match the originally submitted URI (if one was sent). |
| `--single-channel <value>` | no | Request the user to add your app only to a single channel. Only valid with a \[legacy workspace app\](https://api.slack.com/legacy-workspace-apps). |

## `slack api oauth-token-list [options]`

- What: oauth\_token — read (GET /oauth.token)
- Call: `GET /oauth.token`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--client-id <value>` | no | Issued when you created your application. |
| `--client-secret <value>` | no | Issued when you created your application. |
| `--code <value>` | no | The \`code\` param returned via the OAuth callback. |
| `--redirect-uri <value>` | no | This must match the originally submitted URI (if one was sent). |
| `--single-channel <value>` | no | Request the user to add your app only to a single channel. |
