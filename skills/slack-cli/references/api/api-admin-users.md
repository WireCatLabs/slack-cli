<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.users

## `slack api admin-users-list-list [options]`

- What: admin\_users\_list — read (GET /admin.users.list)
- Call: `GET /admin.users.list`, effect: read
- Sign-in: slackAuth (admin.users:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.users:read\` |
| `--team-id <value>` | yes | The ID (\`T1234\`) of the workspace. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page. |
| `--limit <value>` | no | Limit for how many users to be retrieved per page |
