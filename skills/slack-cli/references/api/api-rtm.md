<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: rtm

## `slack api rtm-connect-list [options]`

- What: rtm\_connect — read (GET /rtm.connect)
- Call: `GET /rtm.connect`, effect: read
- Sign-in: slackAuth (rtm:stream)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`rtm:stream\` |
| `--batch-presence-aware <value>` | no | Batch presence deliveries via subscription. Enabling changes the shape of \`presence\_change\` events. See \[batch presence\](/docs/presence-and-status#batching). |
| `--presence-sub <value>` | no | Only deliver presence events when requested by subscription. See \[presence subscriptions\](/docs/presence-and-status#subscriptions). |
