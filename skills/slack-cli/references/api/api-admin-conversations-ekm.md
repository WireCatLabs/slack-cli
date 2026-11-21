<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: admin.conversations.ekm

## `slack api admin-conversations-ekm-list-original-connected-channel-info-list [options]`

- What: admin\_conversations\_ekm\_listOriginalConnectedChannelInfo — read (GET…
- Call: `GET /admin.conversations.ekm.listOriginalConnectedChannelInfo`, effect: read
- Sign-in: slackAuth (admin.conversations:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`admin.conversations:read\` |
| `--channel-ids <value>` | no | A comma-separated list of channels to filter to. |
| `--team-ids <value>` | no | A comma-separated list of the workspaces to which the channels you would like returned belong. |
| `--limit <value>` | no | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | no | Set \`cursor\` to \`next\_cursor\` returned by the previous call to list items in the next page. |
