<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: dialog

## `slack api dialog-open-list [options]`

- What: dialog\_open — read (GET /dialog.open)
- Call: `GET /dialog.open`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--dialog <value>` | yes | The dialog definition. This must be a JSON-encoded string. |
| `--trigger-id <value>` | yes | Exchange a trigger to post to the user. |
