<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: conversations

## `slack api conversations-history-list [options]`

- What: conversations\_history — read (GET /conversations.history)
- Call: `GET /conversations.history`, effect: read
- Sign-in: slackAuth (channels:history, groups:history, im:history, mpim:history)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`conversations:history\` |
| `--channel <value>` | no | Conversation ID to fetch history for. |
| `--latest <value>` | no | End of time range of messages to include in results. |
| `--oldest <value>` | no | Start of time range of messages to include in results. |
| `--inclusive <value>` | no | Include messages with latest or oldest timestamp in results only when either timestamp is specified. |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |

## `slack api conversations-info-list [options]`

- What: conversations\_info — read (GET /conversations.info)
- Call: `GET /conversations.info`, effect: read
- Sign-in: slackAuth (channels:read, groups:read, im:read, mpim:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`conversations:read\` |
| `--channel <value>` | no | Conversation ID to learn more about |
| `--include-locale <value>` | no | Set this to \`true\` to receive the locale for this conversation. Defaults to \`false\` |
| `--include-num-members <value>` | no | Set to \`true\` to include the member count for the specified conversation. Defaults to \`false\` |

## `slack api conversations-list-list [options]`

- What: conversations\_list — read (GET /conversations.list)
- Call: `GET /conversations.list`, effect: read
- Sign-in: slackAuth (channels:read, groups:read, im:read, mpim:read)
- Pages: cursor: send `cursor` (query), read the next one from `response_metadata.next_cursor`; items in `channels`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`conversations:read\` |
| `--exclude-archived <value>` | no | Set to \`true\` to exclude archived channels from the list |
| `--types <value>` | no | Mix and match channel types by providing a comma-separated list of any combination of \`public\_channel\`, \`private\_channel\`, \`mpim\`, \`im\` |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
| `--all` | no | read every page, as the API pages it |

## `slack api conversations-members-list [options]`

- What: conversations\_members — read (GET /conversations.members)
- Call: `GET /conversations.members`, effect: read
- Sign-in: slackAuth (channels:read, groups:read, im:read, mpim:read)
- Pages: cursor: send `cursor` (query), read the next one from `response_metadata.next_cursor`; items in `members`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`conversations:read\` |
| `--channel <value>` | no | ID of the conversation to retrieve members for |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
| `--all` | no | read every page, as the API pages it |

## `slack api conversations-replies-list [options]`

- What: conversations\_replies — read (GET /conversations.replies)
- Call: `GET /conversations.replies`, effect: read
- Sign-in: slackAuth (channels:history, groups:history, im:history, mpim:history)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | no | Authentication token. Requires scope: \`conversations:history\` |
| `--channel <value>` | no | Conversation ID to fetch thread from. |
| `--ts <value>` | no | Unique identifier of a thread's parent message. \`ts\` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by \`ts\` will return - it is just an ordinary, unthreaded message. |
| `--latest <value>` | no | End of time range of messages to include in results. |
| `--oldest <value>` | no | Start of time range of messages to include in results. |
| `--inclusive <value>` | no | Include messages with latest or oldest timestamp in results only when either timestamp is specified. |
| `--limit <value>` | no | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | no | Paginate through collections of data by setting the \`cursor\` parameter to a \`next\_cursor\` attribute returned by a previous request's \`response\_metadata\`. Default value fetches the first "page" of the collection. See \[pagination\](/docs/pagination) for more detail. |
