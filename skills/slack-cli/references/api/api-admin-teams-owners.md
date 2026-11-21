<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.teams.owners

## `slack api admin-teams-owners-list-list [options]`

- What: admin\_teams\_owners\_list — read (GET /admin.teams.owners.list)
- Call: `GET /admin.teams.owners.list`, effect: read
- Sign-in: slackAuth (admin.teams:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.teams:read\` |
| `--team-id <value>` | yes | team\_id |
| `--limit <value>` | no | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page. |
