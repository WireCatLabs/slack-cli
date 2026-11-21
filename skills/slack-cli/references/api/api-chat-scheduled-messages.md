<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: chat.scheduledMessages

## `slack api chat-scheduled-messages-list-list [options]`

- What: chat\_scheduledMessages\_list — read (GET /chat.scheduledMessages.list)
- Call: `GET /chat.scheduledMessages.list`, effect: read
- Sign-in: slackAuth (none)
- Pages: cursor: send `cursor` (query), read the next one from `response_metadata.next_cursor`; items in `scheduled_messages`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`none\` |
| `--channel <value>` | no | The channel of the scheduled messages |
| `--latest <value>` | no | A UNIX timestamp of the latest value in the time range |
| `--oldest <value>` | no | A UNIX timestamp of the oldest value in the time range |
| `--limit <value>` | no | Maximum number of original entries to return. |
| `--cursor <value>` | no | For pagination purposes, this is the \`cursor\` value returned from a previous call to \`chat.scheduledmessages.list\` indicating where you want to start this call from. |
| `--all` | no | read every page, as the API pages it |
