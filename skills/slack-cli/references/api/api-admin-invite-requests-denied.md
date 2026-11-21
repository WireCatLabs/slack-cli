<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.inviteRequests.denied

## `slack api admin-invite-requests-denied-list-list [options]`

- What: admin\_inviteRequests\_denied\_list — read (GET /admin.inviteRequests.denied.list)
- Call: `GET /admin.inviteRequests.denied.list`, effect: read
- Sign-in: slackAuth (admin.invites:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.invites:read\` |
| `--team-id <value>` | no | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | no | Value of the \`next\_cursor\` field sent as part of the previous api response |
| `--limit <value>` | no | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000 both inclusive |
