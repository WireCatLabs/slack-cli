<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: apps.permissions.resources

## `slack api apps-permissions-resources-list-list [options]`

- What: apps\_permissions\_resources\_list — read (GET /apps.permissions.resources.list)
- Call: `GET /apps.permissions.resources.list`, effect: read
- Sign-in: slackAuth (none)
- Pages: cursor: send `cursor` (query), read the next one from `response_metadata.next_cursor`; items in `resources`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
| `--limit <value>` | no | The maximum number of items to return. |
| `--all` | no | read every page, as the API pages it |
