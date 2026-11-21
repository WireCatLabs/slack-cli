<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.usergroups

## `slack api admin-usergroups-list-channels-list [options]`

- What: admin\_usergroups\_listChannels — read (GET /admin.usergroups.listChannels)
- Call: `GET /admin.usergroups.listChannels`, effect: read
- Sign-in: slackAuth (admin.usergroups:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.usergroups:read\` |
| `--usergroup-id <value>` | yes | ID of the IDP group to list default channels for. |
| `--team-id <value>` | no | ID of the the workspace. |
| `--include-num-members <value>` | no | Flag to include or exclude the count of members per channel. |
