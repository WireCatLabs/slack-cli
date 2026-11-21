<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: users

## `slack api users-conversations-list [options]`

- What: users\_conversations — read (GET /users.conversations)
- Call: `GET /users.conversations`, effect: read
- Sign-in: slackAuth (channels:read, groups:read, im:read, mpim:read)
- Pages: cursor: send `cursor` (query), read the next one from `response_metadata.next_cursor`; items in `channels`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`conversations:read\` |
| `--user <value>` | no | Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership. |
| `--types <value>` | no | Mix and match channel types by providing a comma-separated list of any combination of \`public\_channel\`, \`private\_channel\`, \`mpim\`, \`im\` |
| `--exclude-archived <value>` | no | Set to \`true\` to exclude archived channels from the list |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
| `--all` | no | read every page, as the API pages it |

## `slack api users-get-presence-list [options]`

- What: users\_getPresence — read (GET /users.getPresence)
- Call: `GET /users.getPresence`, effect: read
- Sign-in: slackAuth (users:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users:read\` |
| `--user <value>` | no | User to get presence info on. Defaults to the authed user. |

## `slack api users-identity-list [options]`

- What: users\_identity — read (GET /users.identity)
- Call: `GET /users.identity`, effect: read
- Sign-in: slackAuth (identity.basic)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`identity.basic\` |

## `slack api users-info-list [options]`

- What: users\_info — read (GET /users.info)
- Call: `GET /users.info`, effect: read
- Sign-in: slackAuth (users:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users:read\` |
| `--include-locale <value>` | no | Set this to \`true\` to receive the locale for this user. Defaults to \`false\` |
| `--user <value>` | no | User to get info on |

## `slack api users-list-list [options]`

- What: users\_list — read (GET /users.list)
- Call: `GET /users.list`, effect: read
- Sign-in: slackAuth (users:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`users:read\` |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no \`limit\` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience \`limit\_required\` or HTTP 500 errors. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
| `--include-locale <value>` | no | Set this to \`true\` to receive the locale for users. Defaults to \`false\` |

## `slack api users-lookup-by-email-list [options]`

- What: users\_lookupByEmail — read (GET /users.lookupByEmail)
- Call: `GET /users.lookupByEmail`, effect: read
- Sign-in: slackAuth (users:read.email)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users:read.email\` |
| `--email <value>` | yes | An email address belonging to a user in the workspace |

## `slack api users-set-active [options]`

- What: users\_setActive — write (POST /users.setActive)
- Call: `POST /users.setActive`, effect: write
- Sign-in: slackAuth (users:write)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users:write\` |
