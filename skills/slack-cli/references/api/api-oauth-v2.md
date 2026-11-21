<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: oauth.v2

## `slack api oauth-v2-access-list [options]`

- What: oauth\_v2\_access — read (GET /oauth.v2.access)
- Call: `GET /oauth.v2.access`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--client-id <value>` | no | Issued when you created your application. |
| `--client-secret <value>` | no | Issued when you created your application. |
| `--code <value>` | yes | The \`code\` param returned via the OAuth callback. |
| `--redirect-uri <value>` | no | This must match the originally submitted URI (if one was sent). |
