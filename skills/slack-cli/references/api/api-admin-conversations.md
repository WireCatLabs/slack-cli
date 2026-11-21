<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.conversations

## `slack api admin-conversations-get-conversation-prefs-list [options]`

- What: admin\_conversations\_getConversationPrefs — read (GET…
- Call: `GET /admin.conversations.getConversationPrefs`, effect: read
- Sign-in: slackAuth (admin.conversations:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.conversations:read\` |
| `--channel-id <value>` | yes | The channel to get preferences for. |

## `slack api admin-conversations-get-teams-list [options]`

- What: admin\_conversations\_getTeams — read (GET /admin.conversations.getTeams)
- Call: `GET /admin.conversations.getTeams`, effect: read
- Sign-in: slackAuth (admin.conversations:read)
- Pages: cursor: send `cursor` (query), read the next one from `response_metadata.next_cursor`; items in `team_ids`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.conversations:read\` |
| `--channel-id <value>` | yes | The channel to determine connected workspaces within the organization for. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page |
| `--limit <value>` | no | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--all` | no | read every page, as the API pages it |

## `slack api admin-conversations-search-list [options]`

- What: admin\_conversations\_search — read (GET /admin.conversations.search)
- Call: `GET /admin.conversations.search`, effect: read
- Sign-in: slackAuth (admin.conversations:read)
- Pages: cursor: send `cursor` (query), read the next one from `next_cursor`; items in `channels`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.conversations:read\` |
| `--team-ids <value>` | no | Comma separated string of team IDs, signifying the workspaces to search through. |
| `--query <value>` | no | Name of the the channel to query by. |
| `--limit <value>` | no | Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page. |
| `--search-channel-types <value>` | no | The type of channel to include or exclude in the search. For example \`private\` will search private channels, while \`private\_exclude\` will exclude them. For a full list of types, check the \[Types section\](#types). |
| `--sort <value>` | no | Possible values are \`relevant\` (search ranking based on what we think is closest), \`name\` (alphabetical), \`member\_count\` (number of users in the channel), and \`created\` (date channel was created). You can optionally pair this with the \`sort\_dir\` arg to change how it is sorted |
| `--sort-dir <value>` | no | Sort direction. Possible values are \`asc\` for ascending order like (1, 2, 3) or (a, b, c), and \`desc\` for descending order like (3, 2, 1) or (c, b, a) |
| `--all` | no | read every page, as the API pages it |
