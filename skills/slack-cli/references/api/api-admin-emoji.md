<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.emoji

## `slack api admin-emoji-list-list [options]`

- What: admin\_emoji\_list — read (GET /admin.emoji.list)
- Call: `GET /admin.emoji.list`, effect: read
- Sign-in: slackAuth (admin.teams:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.teams:read\` |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page |
| `--limit <value>` | no | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
