<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: files.remote

## `slack api files-remote-info-list [options]`

- What: files\_remote\_info — read (GET /files.remote.info)
- Call: `GET /files.remote.info`, effect: read
- Sign-in: slackAuth (remote\_files:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`remote\_files:read\` |
| `--file <value>` | no | Specify a file by providing its ID. |
| `--external-id <value>` | no | Creator defined GUID for the file. |

## `slack api files-remote-list-list [options]`

- What: files\_remote\_list — read (GET /files.remote.list)
- Call: `GET /files.remote.list`, effect: read
- Sign-in: slackAuth (remote\_files:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`remote\_files:read\` |
| `--channel <value>` | no | Filter files appearing in a specific channel, indicated by its ID. |
| `--ts-from <value>` | no | Filter files created after this timestamp (inclusive). |
| `--ts-to <value>` | no | Filter files created before this timestamp (inclusive). |
| `--limit <value>` | no | The maximum number of items to return. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |

## `slack api files-remote-share-list [options]`

- What: files\_remote\_share — read (GET /files.remote.share)
- Call: `GET /files.remote.share`, effect: read
- Sign-in: slackAuth (remote\_files:share)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`remote\_files:share\` |
| `--file <value>` | no | Specify a file registered with Slack by providing its ID. Either this field or \`external\_id\` or both are required. |
| `--external-id <value>` | no | The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or \`file\` or both are required. |
| `--channels <value>` | no | Comma-separated list of channel IDs where the file will be shared. |
