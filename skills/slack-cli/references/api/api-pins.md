<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: pins

## `slack api pins-list-list [options]`

- What: pins\_list — read (GET /pins.list)
- Call: `GET /pins.list`, effect: read
- Sign-in: slackAuth (pins:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`pins:read\` |
| `--channel <value>` | yes | Channel to get pinned items for. |
