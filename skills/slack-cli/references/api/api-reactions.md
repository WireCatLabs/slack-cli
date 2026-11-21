<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: reactions

## `slack api reactions-get-list [options]`

- What: reactions\_get — read (GET /reactions.get)
- Call: `GET /reactions.get`, effect: read
- Sign-in: slackAuth (reactions:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`reactions:read\` |
| `--channel <value>` | no | Channel where the message to get reactions for was posted. |
| `--file <value>` | no | File to get reactions for. |
| `--file-comment <value>` | no | File comment to get reactions for. |
| `--full <value>` | no | If true always return the complete reaction list. |
| `--timestamp <value>` | no | Timestamp of the message to get reactions for. |

## `slack api reactions-list-list [options]`

- What: reactions\_list — read (GET /reactions.list)
- Call: `GET /reactions.list`, effect: read
- Sign-in: slackAuth (reactions:read)
- Pages: page number: send `page` (query), one more for each page; items in `items`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`reactions:read\` |
| `--user <value>` | no | Show reactions made by this user. Defaults to the authed user. |
| `--full <value>` | no | If true always return the complete reaction list. |
| `--count <value>` | no | count |
| `--page <value>` | no | page |
| `--cursor <value>` | no | Parameter for pagination. Set \`cursor\` equal to the \`next\_cursor\` attribute returned by the previous request's \`response\_metadata\`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more details. |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--all` | no | read every page, as the API pages it |
