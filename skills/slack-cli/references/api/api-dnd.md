<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: dnd

## `slack api dnd-end-dnd [options]`

- What: dnd\_endDnd — write (POST /dnd.endDnd)
- Call: `POST /dnd.endDnd`, effect: write
- Sign-in: slackAuth (dnd:write)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`dnd:write\` |

## `slack api dnd-end-snooze [options]`

- What: dnd\_endSnooze — write (POST /dnd.endSnooze)
- Call: `POST /dnd.endSnooze`, effect: write
- Sign-in: slackAuth (dnd:write)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`dnd:write\` |

## `slack api dnd-info-list [options]`

- What: dnd\_info — read (GET /dnd.info)
- Call: `GET /dnd.info`, effect: read
- Sign-in: slackAuth (dnd:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`dnd:read\` |
| `--user <value>` | no | User to fetch status for (defaults to current user) |

## `slack api dnd-team-info-list [options]`

- What: dnd\_teamInfo — read (GET /dnd.teamInfo)
- Call: `GET /dnd.teamInfo`, effect: read
- Sign-in: slackAuth (dnd:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`dnd:read\` |
| `--users <value>` | no | Comma-separated list of users to fetch Do Not Disturb status for |
