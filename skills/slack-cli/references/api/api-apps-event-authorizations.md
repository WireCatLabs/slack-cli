<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: apps.event.authorizations

## `slack api apps-event-authorizations-list-list [options]`

- What: apps\_event\_authorizations\_list — read (GET /apps.event.authorizations.list)
- Call: `GET /apps.event.authorizations.list`, effect: read
- Sign-in: slackAuth (authorizations:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`authorizations:read\` |
| `--event-context <value>` | yes | event\_context |
| `--cursor <value>` | no | cursor |
| `--limit <value>` | no | limit |
