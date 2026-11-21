<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: calls

## `slack api calls-info-list [options]`

- What: calls\_info — read (GET /calls.info)
- Call: `GET /calls.info`, effect: read
- Sign-in: slackAuth (calls:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`calls:read\` |
| `--id <value>` | yes | \`id\` of the Call returned by the \[\`calls.add\`\](/methods/calls.add) method. |
