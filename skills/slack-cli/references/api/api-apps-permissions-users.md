<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: apps.permissions.users

## `slack api apps-permissions-users-list-list [options]`

- What: apps\_permissions\_users\_list — read (GET /apps.permissions.users.list)
- Call: `GET /apps.permissions.users.list`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
| `--limit <value>` | no | The maximum number of items to return. |

## `slack api apps-permissions-users-request-list [options]`

- What: apps\_permissions\_users\_request — read (GET /apps.permissions.users.request)
- Call: `GET /apps.permissions.users.request`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--scopes <value>` | yes | A comma separated list of user scopes to request for |
| `--trigger-id <value>` | yes | Token used to trigger the request |
| `--user <value>` | yes | The user this scope is being requested for |
