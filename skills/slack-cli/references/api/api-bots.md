<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: bots

## `slack api bots-info-list [options]`

- What: bots\_info — read (GET /bots.info)
- Call: `GET /bots.info`, effect: read
- Sign-in: slackAuth (users:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users:read\` |
| `--bot <value>` | no | Bot user to get info on |
