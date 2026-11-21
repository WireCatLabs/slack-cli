<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: stars

## `slack api stars-list-list [options]`

- What: stars\_list — read (GET /stars.list)
- Call: `GET /stars.list`, effect: read
- Sign-in: slackAuth (stars:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`stars:read\` |
| `--count <value>` | no | count |
| `--page <value>` | no | page |
| `--cursor <value>` | no | Parameter for pagination. Set \`cursor\` equal to the \`next\_cursor\` attribute returned by the previous request's \`response\_metadata\`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more details. |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
