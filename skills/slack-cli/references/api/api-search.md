<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: search

## `slack api search-messages-list [options]`

- What: search\_messages — read (GET /search.messages)
- Call: `GET /search.messages`, effect: read
- Sign-in: slackAuth (search:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`search:read\` |
| `--count <value>` | no | Pass the number of results you want per "page". Maximum of \`100\`. |
| `--highlight <value>` | no | Pass a value of \`true\` to enable query highlight markers (see below). |
| `--page <value>` | no | page |
| `--query <value>` | yes | Search query. |
| `--sort <value>` | no | Return matches sorted by either \`score\` or \`timestamp\`. |
| `--sort-dir <value>` | no | Change sort direction to ascending (\`asc\`) or descending (\`desc\`). |
