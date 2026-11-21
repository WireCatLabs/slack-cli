<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: reminders

## `slack api reminders-info-list [options]`

- What: reminders\_info — read (GET /reminders.info)
- Call: `GET /reminders.info`, effect: read
- Sign-in: slackAuth (reminders:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`reminders:read\` |
| `--reminder <value>` | no | The ID of the reminder |

## `slack api reminders-list-list [options]`

- What: reminders\_list — read (GET /reminders.list)
- Call: `GET /reminders.list`, effect: read
- Sign-in: slackAuth (reminders:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`reminders:read\` |
