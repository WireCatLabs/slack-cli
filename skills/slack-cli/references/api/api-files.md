<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: files

## `slack api files-info-list [options]`

- What: files\_info — read (GET /files.info)
- Call: `GET /files.info`, effect: read
- Sign-in: slackAuth (files:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`files:read\` |
| `--file <value>` | no | Specify a file by providing its ID. |
| `--count <value>` | no | count |
| `--page <value>` | no | page |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--cursor <value>` | no | Parameter for pagination. File comments are paginated for a single file. Set \`cursor\` equal to the \`next\_cursor\` attribute returned by the previous request's \`response\_metadata\`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection of comments. See \[pagination\](/docs/pagination) for more details. |

## `slack api files-list-list [options]`

- What: files\_list — read (GET /files.list)
- Call: `GET /files.list`, effect: read
- Sign-in: slackAuth (files:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`files:read\` |
| `--user <value>` | no | Filter files created by a single user. |
| `--channel <value>` | no | Filter files appearing in a specific channel, indicated by its ID. |
| `--ts-from <value>` | no | Filter files created after this timestamp (inclusive). |
| `--ts-to <value>` | no | Filter files created before this timestamp (inclusive). |
| `--types <value>` | no | Filter files by type (\[see below\](#file\_types)). You can pass multiple values in the types argument, like \`types=spaces,snippets\`.The default value is \`all\`, which does not filter the list. |
| `--count <value>` | no | count |
| `--page <value>` | no | page |
| `--show-files-hidden-by-limit <value>` | no | Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit. |
