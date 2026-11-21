<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: auth

## `slack api auth-revoke-list [options]`

- What: auth\_revoke — read (GET /auth.revoke)
- Call: `GET /auth.revoke`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--test <value>` | no | Setting this parameter to \`1\` triggers a \_testing mode\_ where the specified token will not actually be revoked. |

## `slack api auth-test-list [options]`

- What: auth\_test — read (GET /auth.test)
- Call: `GET /auth.test`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
