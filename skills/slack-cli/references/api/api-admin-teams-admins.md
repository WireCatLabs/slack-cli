<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.teams.admins

## `slack api admin-teams-admins-list-list [options]`

- What: admin\_teams\_admins\_list — read (GET /admin.teams.admins.list)
- Call: `GET /admin.teams.admins.list`, effect: read
- Sign-in: slackAuth (admin.teams:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.teams:read\` |
| `--limit <value>` | no | The maximum number of items to return. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page. |
| `--team-id <value>` | yes | team\_id |
