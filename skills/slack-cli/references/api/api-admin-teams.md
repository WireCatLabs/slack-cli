<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.teams

## `slack api admin-teams-list-list [options]`

- What: admin\_teams\_list — read (GET /admin.teams.list)
- Call: `GET /admin.teams.list`, effect: read
- Sign-in: slackAuth (admin.teams:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.teams:read\` |
| `--limit <value>` | no | The maximum number of items to return. Must be between 1 - 100 both inclusive. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page. |
