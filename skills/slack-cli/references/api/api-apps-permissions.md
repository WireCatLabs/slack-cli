<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: apps.permissions

## `slack api apps-permissions-info-list [options]`

- What: apps\_permissions\_info — read (GET /apps.permissions.info)
- Call: `GET /apps.permissions.info`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`none\` |

## `slack api apps-permissions-request-list [options]`

- What: apps\_permissions\_request — read (GET /apps.permissions.request)
- Call: `GET /apps.permissions.request`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--scopes <value>` | yes | A comma separated list of scopes to request for |
| `--trigger-id <value>` | yes | Token used to trigger the permissions API |
