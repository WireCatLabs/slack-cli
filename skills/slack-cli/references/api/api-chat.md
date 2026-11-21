<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: chat

## `slack api chat-get-permalink-list [options]`

- What: chat\_getPermalink — read (GET /chat.getPermalink)
- Call: `GET /chat.getPermalink`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--channel <value>` | yes | The ID of the conversation or channel containing the message |
| `--message-ts <value>` | yes | A message's \`ts\` value, uniquely identifying it within a channel |
