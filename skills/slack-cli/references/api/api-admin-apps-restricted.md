<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.apps.restricted

## `slack api admin-apps-restricted-list-list [options]`

- What: admin\_apps\_restricted\_list — read (GET /admin.apps.restricted.list)
- Call: `GET /admin.apps.restricted.list`, effect: read
- Sign-in: slackAuth (admin.apps:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.apps:read\` |
| `--limit <value>` | no | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page |
| `--team-id <value>` | no | team\_id |
| `--enterprise-id <value>` | no | enterprise\_id |
