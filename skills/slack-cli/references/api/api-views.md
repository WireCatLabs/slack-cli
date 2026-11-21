<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: views

## `slack api views-open-list [options]`

- What: views\_open — read (GET /views.open)
- Call: `GET /views.open`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--trigger-id <value>` | yes | Exchange a trigger to post to the user. |
| `--view <value>` | yes | A \[view payload\](/reference/surfaces/views). This must be a JSON-encoded string. |

## `slack api views-publish-list [options]`

- What: views\_publish — read (GET /views.publish)
- Call: `GET /views.publish`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--user-id <value>` | yes | \`id\` of the user you want publish a view to. |
| `--view <value>` | yes | A \[view payload\](/reference/surfaces/views). This must be a JSON-encoded string. |
| `--hash <value>` | no | A string that represents view state to protect against possible race conditions. |

## `slack api views-push-list [options]`

- What: views\_push — read (GET /views.push)
- Call: `GET /views.push`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--trigger-id <value>` | yes | Exchange a trigger to post to the user. |
| `--view <value>` | yes | A \[view payload\](/reference/surfaces/views). This must be a JSON-encoded string. |

## `slack api views-update-list [options]`

- What: views\_update — read (GET /views.update)
- Call: `GET /views.update`, effect: read
- Sign-in: slackAuth (none)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`none\` |
| `--view-id <value>` | no | A unique identifier of the view to be updated. Either \`view\_id\` or \`external\_id\` is required. |
| `--external-id <value>` | no | A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either \`view\_id\` or \`external\_id\` is required. |
| `--view <value>` | no | A \[view object\](/reference/surfaces/views). This must be a JSON-encoded string. |
| `--hash <value>` | no | A string that represents view state to protect against possible race conditions. |
