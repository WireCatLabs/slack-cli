<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.conversations.restrictAccess

## `slack api admin-conversations-restrict-access-list-groups-list [options]`

- What: admin\_conversations\_restrictAccess\_listGroups — read (GET…
- Call: `GET /admin.conversations.restrictAccess.listGroups`, effect: read
- Sign-in: slackAuth (admin.conversations:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.conversations:read\` |
| `--channel-id <value>` | yes | channel\_id |
| `--team-id <value>` | no | The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. |
