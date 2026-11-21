<!-- Generated from the command tree by pnpm generate. Do not edit. -->

# Commands

Every command, option and exit code, generated from the program itself. For the same list as JSON, run
`slack commands --json`.

**The first word is the profile**, a name you choose: `slack personal config show`. `SLACK_PROFILE`
does the same for a whole shell session. No profile is assumed: a command that uses an account stops without one and
lists the profiles on this computer.

## Options for every command

| Option | What it does |
|---|---|
| `-V, --version` | output the version number. |
| `-v, --verbose` | more detail in what is shown: -v ids, -vv everything we know. Default: `0`. |
| `--json` | machine-readable output: one JSON value on stdout; --json=id,text keeps only those fields. |
| `--jsonl` | machine-readable output: one JSON object per line, for streaming and jq. |
| `--quiet` | diagnostics off; a failure is still said. |
| `--trace` | the connection's own log lines on stderr — never message content. |
| `--debug` | on a failure, its whole record — cause and stack — in place of the short line. |
| `--timeout <duration>` | give up on the whole command after this — 30s, 2m, 500ms. |
| `--offline` | answer from what was recorded and never connect; fails if nothing was. |
| `--no-input` | never prompt or open interactive login; piped input remains available. |
| `--max-input-bytes <bytes>` | maximum buffered input bytes (default: 16777216). |
| `--max-output-bytes <bytes>` | maximum machine output bytes (default: 4194304; 0 disables). |
| `--brief` | found messages as reference, title, time, sender and excerpt only. |
| `--full` | found messages with their whole text and every provider field. |
| `--compact` | one line per item for an agent: reference first, text last, paging and next steps as # lines. |
| `--dry-run` | preview parsed arguments and permissions before running the action. |
| `--yes` | go ahead without the question an ask level puts before a write. |
| `--record` | keep this run even where the config says record false; record_input false leaves the typed words out. |
| `--no-record` | do not keep this run, even if it fails. |

## `slack commands`

every command by section; --json prints its contract, one path per call

### `slack commands info`

one command contract, or all schemas, error reasons and explicit overrides

```sh
slack commands info [path]
```

| Argument | | What it is |
|---|---|---|
| `path` | optional | one command path; without one, export schemas, error reasons and explicit overrides. |

**Example:** `slack commands info messages list`

## `slack session`

keep this profile's Slack Web token in the OS keyring

### `slack session start`

sign this profile in: the Slack Web API token is asked hidden or read from stdin, never taken as an argument, checked against the service, and only then kept in the keyring, or in a private file

**Changes something on this computer only.**

```sh
slack session start [options]
```

| Option | What it does |
|---|---|
| `--credential-storage <storage>` | where the token is kept: keyring, which falls back to a private file by itself, or file. Default: `keyring`. |

**Example:** `slack personal session start`, `slack personal session start --credential-storage file`

### `slack session status`

show where this profile's token comes from: SLACK_TOKEN, the keyring or a file, never the token; --check asks Slack Web whose token it is

```sh
slack session status [options]
```

| Option | What it does |
|---|---|
| `--check` | ask Slack Web whether the token still works, and whose it is. |

**Example:** `slack personal session status`, `slack personal session status --check --json`

### `slack session end`

forget this profile's token on this computer; the token itself stays valid in Slack Web

**Changes something on this computer only.**

```sh
slack session end
```

**Example:** `slack personal session end`

### `slack session list`

list the profiles on this computer and whether each has a token; picks none

```sh
slack session list
```

**Example:** `slack session list`, `slack session list --json`

## `slack api`

the raw Slack Web API, one command per operation of its OpenAPI document

### `slack api list`

list every Slack Web API operation this CLI offers, without calling Slack Web

```sh
slack api list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Example:** `slack personal api list`, `slack personal api list effect:destructive --json=command,path`

### `slack api show`

show one operation's parameters and request schema, without calling Slack Web

```sh
slack api show <operation>
```

| Argument | | What it is |
|---|---|---|
| `operation` | required | the operation as api list prints it (quoted), its old name, or its operation id. |

**Example:** `slack personal api show "admin-apps-approved-list-list" --json`

### `slack api admin-apps-approved-list-list`

admin_apps_approved_list — read (GET /admin.apps.approved.list)

```sh
slack api admin-apps-approved-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.apps:read`. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |
| `--enterprise-id <value>` | enterprise_id. |

**Example:** `slack personal api admin-apps-approved-list-list --token <value>`

### `slack api admin-apps-requests-list-list`

admin_apps_requests_list — read (GET /admin.apps.requests.list)

```sh
slack api admin-apps-requests-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.apps:read`. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |

**Example:** `slack personal api admin-apps-requests-list-list --token <value>`

### `slack api admin-apps-restricted-list-list`

admin_apps_restricted_list — read (GET /admin.apps.restricted.list)

```sh
slack api admin-apps-restricted-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.apps:read`. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |
| `--enterprise-id <value>` | enterprise_id. |

**Example:** `slack personal api admin-apps-restricted-list-list --token <value>`

### `slack api admin-conversations-ekm-list-original-connected-channel-info-list`

admin_conversations_ekm_listOriginalConnectedChannelInfo — read (GET /admin.conversations.ekm.listOriginalConnectedChannelInfo)

```sh
slack api admin-conversations-ekm-list-original-connected-channel-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.conversations:read`. |
| `--channel-ids <value>` | A comma-separated list of channels to filter to. |
| `--team-ids <value>` | A comma-separated list of the workspaces to which the channels you would like returned belong. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |

**Example:** `slack personal api admin-conversations-ekm-list-original-connected-channel-info-list --token <value>`

### `slack api admin-conversations-get-conversation-prefs-list`

admin_conversations_getConversationPrefs — read (GET /admin.conversations.getConversationPrefs)

```sh
slack api admin-conversations-get-conversation-prefs-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.conversations:read`. |
| `--channel-id <value>` | The channel to get preferences for. |

**Example:** `slack personal api admin-conversations-get-conversation-prefs-list --token <value> --channel-id <value>`

### `slack api admin-conversations-get-teams-list`

admin_conversations_getTeams — read (GET /admin.conversations.getTeams)

```sh
slack api admin-conversations-get-teams-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.conversations:read`. |
| `--channel-id <value>` | The channel to determine connected workspaces within the organization for. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api admin-conversations-get-teams-list --token <value> --channel-id <value>`

### `slack api admin-conversations-restrict-access-list-groups-list`

admin_conversations_restrictAccess_listGroups — read (GET /admin.conversations.restrictAccess.listGroups)

```sh
slack api admin-conversations-restrict-access-list-groups-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.conversations:read`. |
| `--channel-id <value>` | channel_id. |
| `--team-id <value>` | The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. |

**Example:** `slack personal api admin-conversations-restrict-access-list-groups-list --token <value> --channel-id <value>`

### `slack api admin-conversations-search-list`

admin_conversations_search — read (GET /admin.conversations.search)

```sh
slack api admin-conversations-search-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.conversations:read`. |
| `--team-ids <value>` | Comma separated string of team IDs, signifying the workspaces to search through. |
| `--query <value>` | Name of the the channel to query by. |
| `--limit <value>` | Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--search-channel-types <value>` | The type of channel to include or exclude in the search. For example `private` will search private channels, while `private_exclude` will exclude them. For a full list of types, check the [Types section](#types). |
| `--sort <value>` | Possible values are `relevant` (search ranking based on what we think is closest), `name` (alphabetical), `member_count` (number of users in the channel), and `created` (date channel was created). You can optionally pair this with the `sort_dir` arg to change how it is sorted. |
| `--sort-dir <value>` | Sort direction. Possible values are `asc` for ascending order like (1, 2, 3) or (a, b, c), and `desc` for descending order like (3, 2, 1) or (c, b, a). |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api admin-conversations-search-list --token <value>`

### `slack api admin-emoji-list-list`

admin_emoji_list — read (GET /admin.emoji.list)

```sh
slack api admin-emoji-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.teams:read`. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |

**Example:** `slack personal api admin-emoji-list-list --token <value>`

### `slack api admin-invite-requests-approved-list-list`

admin_inviteRequests_approved_list — read (GET /admin.inviteRequests.approved.list)

```sh
slack api admin-invite-requests-approved-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.invites:read`. |
| `--team-id <value>` | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | Value of the `next_cursor` field sent as part of the previous API response. |
| `--limit <value>` | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive. |

**Example:** `slack personal api admin-invite-requests-approved-list-list --token <value>`

### `slack api admin-invite-requests-denied-list-list`

admin_inviteRequests_denied_list — read (GET /admin.inviteRequests.denied.list)

```sh
slack api admin-invite-requests-denied-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.invites:read`. |
| `--team-id <value>` | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | Value of the `next_cursor` field sent as part of the previous api response. |
| `--limit <value>` | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000 both inclusive. |

**Example:** `slack personal api admin-invite-requests-denied-list-list --token <value>`

### `slack api admin-invite-requests-list-list`

admin_inviteRequests_list — read (GET /admin.inviteRequests.list)

```sh
slack api admin-invite-requests-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.invites:read`. |
| `--team-id <value>` | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | Value of the `next_cursor` field sent as part of the previous API response. |
| `--limit <value>` | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive. |

**Example:** `slack personal api admin-invite-requests-list-list --token <value>`

### `slack api admin-teams-admins-list-list`

admin_teams_admins_list — read (GET /admin.teams.admins.list)

```sh
slack api admin-teams-admins-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.teams:read`. |
| `--limit <value>` | The maximum number of items to return. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |

**Example:** `slack personal api admin-teams-admins-list-list --token <value> --team-id <value>`

### `slack api admin-teams-list-list`

admin_teams_list — read (GET /admin.teams.list)

```sh
slack api admin-teams-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.teams:read`. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 100 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |

**Example:** `slack personal api admin-teams-list-list --token <value>`

### `slack api admin-teams-owners-list-list`

admin_teams_owners_list — read (GET /admin.teams.owners.list)

```sh
slack api admin-teams-owners-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.teams:read`. |
| `--team-id <value>` | team_id. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |

**Example:** `slack personal api admin-teams-owners-list-list --token <value> --team-id <value>`

### `slack api admin-teams-settings-info-list`

admin_teams_settings_info — read (GET /admin.teams.settings.info)

```sh
slack api admin-teams-settings-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.teams:read`. |
| `--team-id <value>` | team_id. |

**Example:** `slack personal api admin-teams-settings-info-list --token <value> --team-id <value>`

### `slack api admin-usergroups-list-channels-list`

admin_usergroups_listChannels — read (GET /admin.usergroups.listChannels)

```sh
slack api admin-usergroups-list-channels-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.usergroups:read`. |
| `--usergroup-id <value>` | ID of the IDP group to list default channels for. |
| `--team-id <value>` | ID of the the workspace. |
| `--include-num-members <value>` | Flag to include or exclude the count of members per channel. |

**Example:** `slack personal api admin-usergroups-list-channels-list --token <value> --usergroup-id <value>`

### `slack api admin-users-list-list`

admin_users_list — read (GET /admin.users.list)

```sh
slack api admin-users-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin.users:read`. |
| `--team-id <value>` | The ID (`T1234`) of the workspace. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--limit <value>` | Limit for how many users to be retrieved per page. |

**Example:** `slack personal api admin-users-list-list --token <value> --team-id <value>`

### `slack api api-test-list`

api_test — read (GET /api.test)

```sh
slack api api-test-list [options]
```

| Option | What it does |
|---|---|
| `--error <value>` | Error response to return. |
| `--foo <value>` | example property to return. |

**Example:** `slack personal api api-test-list`

### `slack api apps-event-authorizations-list-list`

apps_event_authorizations_list — read (GET /apps.event.authorizations.list)

```sh
slack api apps-event-authorizations-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `authorizations:read`. |
| `--event-context <value>` | event_context. |
| `--cursor <value>` | cursor. |
| `--limit <value>` | limit. |

**Example:** `slack personal api apps-event-authorizations-list-list --token <value> --event-context <value>`

### `slack api apps-permissions-info-list`

apps_permissions_info — read (GET /apps.permissions.info)

```sh
slack api apps-permissions-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |

**Example:** `slack personal api apps-permissions-info-list`

### `slack api apps-permissions-request-list`

apps_permissions_request — read (GET /apps.permissions.request)

```sh
slack api apps-permissions-request-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--scopes <value>` | A comma separated list of scopes to request for. |
| `--trigger-id <value>` | Token used to trigger the permissions API. |

**Example:** `slack personal api apps-permissions-request-list --token <value> --scopes <value> --trigger-id <value>`

### `slack api apps-permissions-resources-list-list`

apps_permissions_resources_list — read (GET /apps.permissions.resources.list)

```sh
slack api apps-permissions-resources-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |
| `--limit <value>` | The maximum number of items to return. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api apps-permissions-resources-list-list --token <value>`

### `slack api apps-permissions-scopes-list-list`

apps_permissions_scopes_list — read (GET /apps.permissions.scopes.list)

```sh
slack api apps-permissions-scopes-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |

**Example:** `slack personal api apps-permissions-scopes-list-list --token <value>`

### `slack api apps-permissions-users-list-list`

apps_permissions_users_list — read (GET /apps.permissions.users.list)

```sh
slack api apps-permissions-users-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |
| `--limit <value>` | The maximum number of items to return. |

**Example:** `slack personal api apps-permissions-users-list-list --token <value>`

### `slack api apps-permissions-users-request-list`

apps_permissions_users_request — read (GET /apps.permissions.users.request)

```sh
slack api apps-permissions-users-request-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--scopes <value>` | A comma separated list of user scopes to request for. |
| `--trigger-id <value>` | Token used to trigger the request. |
| `--user <value>` | The user this scope is being requested for. |

**Example:** `slack personal api apps-permissions-users-request-list --token <value> --scopes <value> --trigger-id <value> --user <value>`

### `slack api apps-uninstall-list`

apps_uninstall — read (GET /apps.uninstall)

```sh
slack api apps-uninstall-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--client-id <value>` | Issued when you created your application. |
| `--client-secret <value>` | Issued when you created your application. |

**Example:** `slack personal api apps-uninstall-list`

### `slack api auth-revoke-list`

auth_revoke — read (GET /auth.revoke)

```sh
slack api auth-revoke-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--test <value>` | Setting this parameter to `1` triggers a _testing mode_ where the specified token will not actually be revoked. |

**Example:** `slack personal api auth-revoke-list --token <value>`

### `slack api auth-test-list`

auth_test — read (GET /auth.test)

```sh
slack api auth-test-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |

**Example:** `slack personal api auth-test-list --token <value>`

### `slack api bots-info-list`

bots_info — read (GET /bots.info)

```sh
slack api bots-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users:read`. |
| `--bot <value>` | Bot user to get info on. |

**Example:** `slack personal api bots-info-list --token <value>`

### `slack api calls-info-list`

calls_info — read (GET /calls.info)

```sh
slack api calls-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `calls:read`. |
| `--id <value>` | `id` of the Call returned by the [`calls.add`](/methods/calls.add) method. |

**Example:** `slack personal api calls-info-list --token <value> --id <value>`

### `slack api chat-get-permalink-list`

chat_getPermalink — read (GET /chat.getPermalink)

```sh
slack api chat-get-permalink-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--channel <value>` | The ID of the conversation or channel containing the message. |
| `--message-ts <value>` | A message's `ts` value, uniquely identifying it within a channel. |

**Example:** `slack personal api chat-get-permalink-list --token <value> --channel <value> --message-ts <value>`

### `slack api chat-scheduled-messages-list-list`

chat_scheduledMessages_list — read (GET /chat.scheduledMessages.list)

```sh
slack api chat-scheduled-messages-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--channel <value>` | The channel of the scheduled messages. |
| `--latest <value>` | A UNIX timestamp of the latest value in the time range. |
| `--oldest <value>` | A UNIX timestamp of the oldest value in the time range. |
| `--limit <value>` | Maximum number of original entries to return. |
| `--cursor <value>` | For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api chat-scheduled-messages-list-list`

### `slack api conversations-history-list`

conversations_history — read (GET /conversations.history)

```sh
slack api conversations-history-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `conversations:history`. |
| `--channel <value>` | Conversation ID to fetch history for. |
| `--latest <value>` | End of time range of messages to include in results. |
| `--oldest <value>` | Start of time range of messages to include in results. |
| `--inclusive <value>` | Include messages with latest or oldest timestamp in results only when either timestamp is specified. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |

**Example:** `slack personal api conversations-history-list`

### `slack api conversations-info-list`

conversations_info — read (GET /conversations.info)

```sh
slack api conversations-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `conversations:read`. |
| `--channel <value>` | Conversation ID to learn more about. |
| `--include-locale <value>` | Set this to `true` to receive the locale for this conversation. Defaults to `false`. |
| `--include-num-members <value>` | Set to `true` to include the member count for the specified conversation. Defaults to `false`. |

**Example:** `slack personal api conversations-info-list`

### `slack api conversations-list-list`

conversations_list — read (GET /conversations.list)

```sh
slack api conversations-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `conversations:read`. |
| `--exclude-archived <value>` | Set to `true` to exclude archived channels from the list. |
| `--types <value>` | Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api conversations-list-list`

### `slack api conversations-members-list`

conversations_members — read (GET /conversations.members)

```sh
slack api conversations-members-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `conversations:read`. |
| `--channel <value>` | ID of the conversation to retrieve members for. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api conversations-members-list`

### `slack api conversations-replies-list`

conversations_replies — read (GET /conversations.replies)

```sh
slack api conversations-replies-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `conversations:history`. |
| `--channel <value>` | Conversation ID to fetch thread from. |
| `--ts <value>` | Unique identifier of a thread's parent message. `ts` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by `ts` will return - it is just an ordinary, unthreaded message. |
| `--latest <value>` | End of time range of messages to include in results. |
| `--oldest <value>` | Start of time range of messages to include in results. |
| `--inclusive <value>` | Include messages with latest or oldest timestamp in results only when either timestamp is specified. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |

**Example:** `slack personal api conversations-replies-list`

### `slack api dialog-open-list`

dialog_open — read (GET /dialog.open)

```sh
slack api dialog-open-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--dialog <value>` | The dialog definition. This must be a JSON-encoded string. |
| `--trigger-id <value>` | Exchange a trigger to post to the user. |

**Example:** `slack personal api dialog-open-list --token <value> --dialog <value> --trigger-id <value>`

### `slack api dnd-end-dnd`

dnd_endDnd — write (POST /dnd.endDnd)

**Changes something in the service.**

```sh
slack api dnd-end-dnd [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `dnd:write`. |

**Example:** `slack personal api dnd-end-dnd --token <value>`

### `slack api dnd-end-snooze`

dnd_endSnooze — write (POST /dnd.endSnooze)

**Changes something in the service.**

```sh
slack api dnd-end-snooze [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `dnd:write`. |

**Example:** `slack personal api dnd-end-snooze --token <value>`

### `slack api dnd-info-list`

dnd_info — read (GET /dnd.info)

```sh
slack api dnd-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `dnd:read`. |
| `--user <value>` | User to fetch status for (defaults to current user). |

**Example:** `slack personal api dnd-info-list`

### `slack api dnd-team-info-list`

dnd_teamInfo — read (GET /dnd.teamInfo)

```sh
slack api dnd-team-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `dnd:read`. |
| `--users <value>` | Comma-separated list of users to fetch Do Not Disturb status for. |

**Example:** `slack personal api dnd-team-info-list`

### `slack api emoji-list-list`

emoji_list — read (GET /emoji.list)

```sh
slack api emoji-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `emoji:read`. |

**Example:** `slack personal api emoji-list-list --token <value>`

### `slack api files-info-list`

files_info — read (GET /files.info)

```sh
slack api files-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `files:read`. |
| `--file <value>` | Specify a file by providing its ID. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--cursor <value>` | Parameter for pagination. File comments are paginated for a single file. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection of comments. See [pagination](/docs/pagination) for more details. |

**Example:** `slack personal api files-info-list`

### `slack api files-list-list`

files_list — read (GET /files.list)

```sh
slack api files-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `files:read`. |
| `--user <value>` | Filter files created by a single user. |
| `--channel <value>` | Filter files appearing in a specific channel, indicated by its ID. |
| `--ts-from <value>` | Filter files created after this timestamp (inclusive). |
| `--ts-to <value>` | Filter files created before this timestamp (inclusive). |
| `--types <value>` | Filter files by type ([see below](#file_types)). You can pass multiple values in the types argument, like `types=spaces,snippets`.The default value is `all`, which does not filter the list. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--show-files-hidden-by-limit <value>` | Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit. |

**Example:** `slack personal api files-list-list`

### `slack api files-remote-info-list`

files_remote_info — read (GET /files.remote.info)

```sh
slack api files-remote-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `remote_files:read`. |
| `--file <value>` | Specify a file by providing its ID. |
| `--external-id <value>` | Creator defined GUID for the file. |

**Example:** `slack personal api files-remote-info-list`

### `slack api files-remote-list-list`

files_remote_list — read (GET /files.remote.list)

```sh
slack api files-remote-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `remote_files:read`. |
| `--channel <value>` | Filter files appearing in a specific channel, indicated by its ID. |
| `--ts-from <value>` | Filter files created after this timestamp (inclusive). |
| `--ts-to <value>` | Filter files created before this timestamp (inclusive). |
| `--limit <value>` | The maximum number of items to return. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |

**Example:** `slack personal api files-remote-list-list`

### `slack api files-remote-share-list`

files_remote_share — read (GET /files.remote.share)

```sh
slack api files-remote-share-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `remote_files:share`. |
| `--file <value>` | Specify a file registered with Slack by providing its ID. Either this field or `external_id` or both are required. |
| `--external-id <value>` | The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or `file` or both are required. |
| `--channels <value>` | Comma-separated list of channel IDs where the file will be shared. |

**Example:** `slack personal api files-remote-share-list`

### `slack api migration-exchange-list`

migration_exchange — read (GET /migration.exchange)

```sh
slack api migration-exchange-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `tokens.basic`. |
| `--users <value>` | A comma-separated list of user ids, up to 400 per request. |
| `--team-id <value>` | Specify team_id starts with `T` in case of Org Token. |
| `--to-old <value>` | Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`. |

**Example:** `slack personal api migration-exchange-list --token <value> --users <value>`

### `slack api oauth-access-list`

oauth_access — read (GET /oauth.access)

```sh
slack api oauth-access-list [options]
```

| Option | What it does |
|---|---|
| `--client-id <value>` | Issued when you created your application. |
| `--client-secret <value>` | Issued when you created your application. |
| `--code <value>` | The `code` param returned via the OAuth callback. |
| `--redirect-uri <value>` | This must match the originally submitted URI (if one was sent). |
| `--single-channel <value>` | Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://api.slack.com/legacy-workspace-apps). |

**Example:** `slack personal api oauth-access-list`

### `slack api oauth-token-list`

oauth_token — read (GET /oauth.token)

```sh
slack api oauth-token-list [options]
```

| Option | What it does |
|---|---|
| `--client-id <value>` | Issued when you created your application. |
| `--client-secret <value>` | Issued when you created your application. |
| `--code <value>` | The `code` param returned via the OAuth callback. |
| `--redirect-uri <value>` | This must match the originally submitted URI (if one was sent). |
| `--single-channel <value>` | Request the user to add your app only to a single channel. |

**Example:** `slack personal api oauth-token-list`

### `slack api oauth-v2-access-list`

oauth_v2_access — read (GET /oauth.v2.access)

```sh
slack api oauth-v2-access-list [options]
```

| Option | What it does |
|---|---|
| `--client-id <value>` | Issued when you created your application. |
| `--client-secret <value>` | Issued when you created your application. |
| `--code <value>` | The `code` param returned via the OAuth callback. |
| `--redirect-uri <value>` | This must match the originally submitted URI (if one was sent). |

**Example:** `slack personal api oauth-v2-access-list --code <value>`

### `slack api pins-list-list`

pins_list — read (GET /pins.list)

```sh
slack api pins-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `pins:read`. |
| `--channel <value>` | Channel to get pinned items for. |

**Example:** `slack personal api pins-list-list --token <value> --channel <value>`

### `slack api reactions-get-list`

reactions_get — read (GET /reactions.get)

```sh
slack api reactions-get-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `reactions:read`. |
| `--channel <value>` | Channel where the message to get reactions for was posted. |
| `--file <value>` | File to get reactions for. |
| `--file-comment <value>` | File comment to get reactions for. |
| `--full <value>` | If true always return the complete reaction list. |
| `--timestamp <value>` | Timestamp of the message to get reactions for. |

**Example:** `slack personal api reactions-get-list --token <value>`

### `slack api reactions-list-list`

reactions_list — read (GET /reactions.list)

```sh
slack api reactions-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `reactions:read`. |
| `--user <value>` | Show reactions made by this user. Defaults to the authed user. |
| `--full <value>` | If true always return the complete reaction list. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--cursor <value>` | Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](/docs/pagination) for more details. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api reactions-list-list --token <value>`

### `slack api reminders-info-list`

reminders_info — read (GET /reminders.info)

```sh
slack api reminders-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `reminders:read`. |
| `--reminder <value>` | The ID of the reminder. |

**Example:** `slack personal api reminders-info-list`

### `slack api reminders-list-list`

reminders_list — read (GET /reminders.list)

```sh
slack api reminders-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `reminders:read`. |

**Example:** `slack personal api reminders-list-list`

### `slack api rtm-connect-list`

rtm_connect — read (GET /rtm.connect)

```sh
slack api rtm-connect-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `rtm:stream`. |
| `--batch-presence-aware <value>` | Batch presence deliveries via subscription. Enabling changes the shape of `presence_change` events. See [batch presence](/docs/presence-and-status#batching). |
| `--presence-sub <value>` | Only deliver presence events when requested by subscription. See [presence subscriptions](/docs/presence-and-status#subscriptions). |

**Example:** `slack personal api rtm-connect-list --token <value>`

### `slack api search-messages-list`

search_messages — read (GET /search.messages)

```sh
slack api search-messages-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `search:read`. |
| `--count <value>` | Pass the number of results you want per "page". Maximum of `100`. |
| `--highlight <value>` | Pass a value of `true` to enable query highlight markers (see below). |
| `--page <value>` | page. |
| `--query <value>` | Search query. |
| `--sort <value>` | Return matches sorted by either `score` or `timestamp`. |
| `--sort-dir <value>` | Change sort direction to ascending (`asc`) or descending (`desc`). |

**Example:** `slack personal api search-messages-list --token <value> --query <value>`

### `slack api stars-list-list`

stars_list — read (GET /stars.list)

```sh
slack api stars-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `stars:read`. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--cursor <value>` | Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](/docs/pagination) for more details. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |

**Example:** `slack personal api stars-list-list`

### `slack api team-access-logs-list`

team_accessLogs — read (GET /team.accessLogs)

```sh
slack api team-access-logs-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin`. |
| `--before <value>` | End of time range of logs to include in results (inclusive). |
| `--count <value>` | count. |
| `--page <value>` | page. |

**Example:** `slack personal api team-access-logs-list --token <value>`

### `slack api team-billable-info-list`

team_billableInfo — read (GET /team.billableInfo)

```sh
slack api team-billable-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin`. |
| `--user <value>` | A user to retrieve the billable information for. Defaults to all users. |

**Example:** `slack personal api team-billable-info-list --token <value>`

### `slack api team-info-list`

team_info — read (GET /team.info)

```sh
slack api team-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `team:read`. |
| `--team <value>` | Team to get info on, if omitted, will return information about the current team. Will only return team that the authenticated token is allowed to see through external shared channels. |

**Example:** `slack personal api team-info-list --token <value>`

### `slack api team-integration-logs-list`

team_integrationLogs — read (GET /team.integrationLogs)

```sh
slack api team-integration-logs-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `admin`. |
| `--app-id <value>` | Filter logs to this Slack app. Defaults to all logs. |
| `--change-type <value>` | Filter logs with this change type. Defaults to all logs. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--service-id <value>` | Filter logs to this service. Defaults to all logs. |
| `--user <value>` | Filter logs generated by this user’s actions. Defaults to all logs. |

**Example:** `slack personal api team-integration-logs-list --token <value>`

### `slack api team-profile-get-list`

team_profile_get — read (GET /team.profile.get)

```sh
slack api team-profile-get-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users.profile:read`. |
| `--visibility <value>` | Filter by visibility. |

**Example:** `slack personal api team-profile-get-list --token <value>`

### `slack api usergroups-list-list`

usergroups_list — read (GET /usergroups.list)

```sh
slack api usergroups-list-list [options]
```

| Option | What it does |
|---|---|
| `--include-users <value>` | Include the list of users for each User Group. |
| `--token <value>` | Authentication token. Requires scope: `usergroups:read`. |
| `--include-count <value>` | Include the number of users in each User Group. |
| `--include-disabled <value>` | Include disabled User Groups. |

**Example:** `slack personal api usergroups-list-list --token <value>`

### `slack api usergroups-users-list-list`

usergroups_users_list — read (GET /usergroups.users.list)

```sh
slack api usergroups-users-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `usergroups:read`. |
| `--include-disabled <value>` | Allow results that involve disabled User Groups. |
| `--usergroup <value>` | The encoded ID of the User Group to update. |

**Example:** `slack personal api usergroups-users-list-list --token <value> --usergroup <value>`

### `slack api users-conversations-list`

users_conversations — read (GET /users.conversations)

```sh
slack api users-conversations-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `conversations:read`. |
| `--user <value>` | Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership. |
| `--types <value>` | Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`. |
| `--exclude-archived <value>` | Set to `true` to exclude archived channels from the list. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api users-conversations-list`

### `slack api users-get-presence-list`

users_getPresence — read (GET /users.getPresence)

```sh
slack api users-get-presence-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users:read`. |
| `--user <value>` | User to get presence info on. Defaults to the authed user. |

**Example:** `slack personal api users-get-presence-list --token <value>`

### `slack api users-identity-list`

users_identity — read (GET /users.identity)

```sh
slack api users-identity-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `identity.basic`. |

**Example:** `slack personal api users-identity-list`

### `slack api users-info-list`

users_info — read (GET /users.info)

```sh
slack api users-info-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users:read`. |
| `--include-locale <value>` | Set this to `true` to receive the locale for this user. Defaults to `false`. |
| `--user <value>` | User to get info on. |

**Example:** `slack personal api users-info-list --token <value>`

### `slack api users-list-list`

users_list — read (GET /users.list)

```sh
slack api users-list-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users:read`. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no `limit` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience `limit_required` or HTTP 500 errors. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. |
| `--include-locale <value>` | Set this to `true` to receive the locale for users. Defaults to `false`. |

**Example:** `slack personal api users-list-list`

### `slack api users-lookup-by-email-list`

users_lookupByEmail — read (GET /users.lookupByEmail)

```sh
slack api users-lookup-by-email-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users:read.email`. |
| `--email <value>` | An email address belonging to a user in the workspace. |

**Example:** `slack personal api users-lookup-by-email-list --token <value> --email <value>`

### `slack api users-profile-get-list`

users_profile_get — read (GET /users.profile.get)

```sh
slack api users-profile-get-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users.profile:read`. |
| `--include-labels <value>` | Include labels for each ID in custom profile fields. |
| `--user <value>` | User to retrieve profile info for. |

**Example:** `slack personal api users-profile-get-list --token <value>`

### `slack api users-set-active`

users_setActive — write (POST /users.setActive)

**Changes something in the service.**

```sh
slack api users-set-active [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `users:write`. |

**Example:** `slack personal api users-set-active --token <value>`

### `slack api views-open-list`

views_open — read (GET /views.open)

```sh
slack api views-open-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--trigger-id <value>` | Exchange a trigger to post to the user. |
| `--view <value>` | A [view payload](/reference/surfaces/views). This must be a JSON-encoded string. |

**Example:** `slack personal api views-open-list --token <value> --trigger-id <value> --view <value>`

### `slack api views-publish-list`

views_publish — read (GET /views.publish)

```sh
slack api views-publish-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--user-id <value>` | `id` of the user you want publish a view to. |
| `--view <value>` | A [view payload](/reference/surfaces/views). This must be a JSON-encoded string. |
| `--hash <value>` | A string that represents view state to protect against possible race conditions. |

**Example:** `slack personal api views-publish-list --token <value> --user-id <value> --view <value>`

### `slack api views-push-list`

views_push — read (GET /views.push)

```sh
slack api views-push-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--trigger-id <value>` | Exchange a trigger to post to the user. |
| `--view <value>` | A [view payload](/reference/surfaces/views). This must be a JSON-encoded string. |

**Example:** `slack personal api views-push-list --token <value> --trigger-id <value> --view <value>`

### `slack api views-update-list`

views_update — read (GET /views.update)

```sh
slack api views-update-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `none`. |
| `--view-id <value>` | A unique identifier of the view to be updated. Either `view_id` or `external_id` is required. |
| `--external-id <value>` | A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either `view_id` or `external_id` is required. |
| `--view <value>` | A [view object](/reference/surfaces/views). This must be a JSON-encoded string. |
| `--hash <value>` | A string that represents view state to protect against possible race conditions. |

**Example:** `slack personal api views-update-list --token <value>`

### `slack api workflows-step-completed-list`

workflows_stepCompleted — read (GET /workflows.stepCompleted)

```sh
slack api workflows-step-completed-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `workflow.steps:execute`. |
| `--workflow-step-execute-id <value>` | Context identifier that maps to the correct workflow step execution. |
| `--outputs <value>` | Key-value object of outputs from your step. Keys of this object reflect the configured `key` properties of your [`outputs`](/reference/workflows/workflow_step#output) array from your `workflow_step` object. |

**Example:** `slack personal api workflows-step-completed-list --token <value> --workflow-step-execute-id <value>`

### `slack api workflows-step-failed-list`

workflows_stepFailed — read (GET /workflows.stepFailed)

```sh
slack api workflows-step-failed-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `workflow.steps:execute`. |
| `--workflow-step-execute-id <value>` | Context identifier that maps to the correct workflow step execution. |
| `--error <value>` | A JSON-based object with a `message` property that should contain a human readable error message. |

**Example:** `slack personal api workflows-step-failed-list --token <value> --workflow-step-execute-id <value> --error <value>`

### `slack api workflows-update-step-list`

workflows_updateStep — read (GET /workflows.updateStep)

```sh
slack api workflows-update-step-list [options]
```

| Option | What it does |
|---|---|
| `--token <value>` | Authentication token. Requires scope: `workflow.steps:execute`. |
| `--workflow-step-edit-id <value>` | A context identifier provided with `view_submission` payloads used to call back to `workflows.updateStep`. |
| `--inputs <value>` | A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. **Please note**: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. [Read more about variables in workflow steps here](/workflows/steps#variables). |
| `--outputs <value>` | An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed. |
| `--step-name <value>` | An optional field that can be used to override the step name that is shown in the Workflow Builder. |
| `--step-image-url <value>` | An optional field that can be used to override app image that is shown in the Workflow Builder. |

**Example:** `slack personal api workflows-update-step-list --token <value> --workflow-step-edit-id <value>`

## `slack comments`

read and write comments in Example Comments, the sample service

### `slack comments list`

list the comments in Example Comments, newest first

```sh
slack comments list [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |
| `--all` | every row, no paging. |

**Returns:** comment — id, text, author, created_at; every field: slack commands info comments list

**Example:** `slack personal comments list`, `slack personal comments list author:u2 --json=id,text`

### `slack comments show`

show one comment in Example Comments

```sh
slack comments show <id>
```

| Argument | | What it is |
|---|---|---|
| `id` | required | the comment's id, as list prints it. |

**Returns:** comment — id, text, author, created_at; every field: slack commands info comments show

**Example:** `slack personal comments show c1`, `slack personal comments show c1 --json`

### `slack comments create`

post a comment in Example Comments

**Changes something in the service.**

```sh
slack comments create [options]
```

| Option | What it does |
|---|---|
| `--text <text>` | the comment's text. |

**Example:** `slack personal comments create --text "Looks good to me"`, `slack personal comments create --text "Looks good to me" --dry-run`

### `slack comments update`

change the text of your comment in Example Comments

**Changes something in the service.**

```sh
slack comments update <id> [options]
```

| Argument | | What it is |
|---|---|---|
| `id` | required | the comment's id, as list prints it. |

| Option | What it does |
|---|---|
| `--text <text>` | the new text. |

**Example:** `slack personal comments update c1 --text "Looks good now"`

## `slack doctor`

the state this installation is in, without connecting unless --online

```sh
slack doctor [options]
```

| Option | What it does |
|---|---|
| `--online` | also connect once and read the account; sends nothing. |

**Example:** `slack doctor`, `slack doctor --json`

### `slack doctor reports`

problem reports

#### `slack doctor reports show`

what a problem report holds; writes nothing

```sh
slack doctor reports show
```

**Example:** `slack doctor reports show`

#### `slack doctor reports create`

write a problem report to a file, and say where to send it

**Changes something on this computer only.**

```sh
slack doctor reports create [options]
```

| Option | What it does |
|---|---|
| `--run <id>` | the run the report is about; the newest failed one if not given. |
| `--output <file>` | where to write it; a new file in this directory if not given. |

**Example:** `slack doctor reports create --output ./problem-report.json`

## `slack skill`

the instructions an agent is given for this tool

### `slack skill show`

print SKILL.md — `slack skill install` puts it where Claude Code, Codex, Gemini CLI and OpenClaw look for it, and where Hermes does on request; --for prints the copy already there

```sh
slack skill show [name] [options]
```

| Argument | | What it is |
|---|---|---|
| `name` | optional | a part of this skill, or a skill shipped for a task: follow-ups, link-conversations. |

| Option | What it does |
|---|---|
| `--for <agents>` | print the copy installed for these agents instead of this version's. One of: `claude`, `agents`. |

**Example:** `slack skill show`, `slack skill show follow-ups`

### `slack skill install`

write SKILL.md to \~/.claude/skills/slack-cli/ (Claude Code) and \~/.agents/skills/slack-cli/ (Codex, Gemini CLI, OpenClaw); --for hermes also has Hermes read \~/.agents/skills, which changes Hermes's own settings, so all leaves it out

**Changes something on this computer only.**

```sh
slack skill install [options]
```

| Option | What it does |
|---|---|
| `--for <agents>` | which agents to install for. One of: `claude`, `agents`, `hermes`, `all`. Default: `all`. |

**Example:** `slack skill install --for agents`

### `slack skill status`

for each place `slack skill install` writes to, and for the copy Hermes reads: the path, the version installed there, and whether it is current, stale, missing or unversioned

```sh
slack skill status
```

**Example:** `slack skill status`, `slack skill status --json`

## `slack mcp`

serve this profile to an agent over MCP and set it up — `claude mcp add slack -- slack <profile> mcp serve`

### `slack mcp serve`

serve this profile to an agent over MCP, on stdin and stdout — `claude mcp add slack -- slack <profile> mcp serve`; `slack mcp serve --profiles a,b` or `--profiles all` serves those profiles from one server and each tool asks which

**Changes something in the service.**

```sh
slack mcp serve [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |
| `--profiles <names\|all>` | serve several profiles from one server instead of one: names, comma-separated, or all for every profile. |
| `--http` | serve over HTTP on 127.0.0.1 for ChatGPT and Claude in the browser, behind your tunnel; the profile's permissions decide. |
| `--port <port>` | the local port for --http (default 8765). |
| `--public-url <url>` | the tunnel's https address the browser apps use, e.g. https://<name>.ts.net or https://<name>.ts.net/tg. |

**Example:** `slack personal mcp serve`, `slack mcp serve --profiles work,personal`, `slack personal mcp serve --http --public-url https://laptop.example.ts.net`

### `slack mcp revoke`

forget every login `mcp serve --http` gave a browser app, of this profile or of the server `--profiles` names; each app must log in again

**Changes something on this computer only.**

```sh
slack mcp revoke [options]
```

| Option | What it does |
|---|---|
| `--profiles <names\|all>` | serve several profiles from one server instead of one: names, comma-separated, or all for every profile. |

**Example:** `slack personal mcp revoke`, `slack mcp revoke --profiles all`

### `slack mcp server`

start, stop and check `mcp serve --http` in the background; status shows the login code for a browser app

#### `slack mcp server start`

start `mcp serve --http` apart from this shell and answer once it listens, with its login code

**Changes something on this computer only.**

```sh
slack mcp server start [options]
```

| Option | What it does |
|---|---|
| `--port <port>` | the local port (default 8765). |
| `--public-url <url>` | the tunnel's https address the browser apps use, e.g. https://<name>.ts.net or https://<name>.ts.net/tg. |
| `--permission <key=level>` | make a permission stricter for this server only; repeat for more keys. |
| `--profiles <names\|all>` | the server of several profiles that `mcp serve --profiles` serves: names, comma-separated, or all. |

**Example:** `slack personal mcp server start --public-url https://laptop.example.ts.net`

#### `slack mcp server stop`

stop `mcp serve --http` — only one that `mcp server start` started

**Changes something on this computer only.**

```sh
slack mcp server stop [options]
```

| Option | What it does |
|---|---|
| `--profiles <names\|all>` | the server of several profiles that `mcp serve --profiles` serves: names, comma-separated, or all. |

**Example:** `slack personal mcp server stop`

#### `slack mcp server status`

whether `mcp serve --http` runs, on which port and address, the login code for a new browser app, and the apps logged in

```sh
slack mcp server status [options]
```

| Option | What it does |
|---|---|
| `--profiles <names\|all>` | the server of several profiles that `mcp serve --profiles` serves: names, comma-separated, or all. |

**Example:** `slack personal mcp server status --json`

### `slack mcp config`

print the mcpServers entry for Claude Desktop, Cursor and others, with full paths; writes nothing

```sh
slack mcp config [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |
| `--profiles <names\|all>` | serve several profiles from one server instead of one: names, comma-separated, or all for every profile. |

**Example:** `slack personal mcp config`, `slack mcp config --profiles all`

### `slack mcp add`

add this profile's local MCP server to Codex or Claude Code

**Changes something on this computer only.**

```sh
slack mcp add <client> [options]
```

| Argument | | What it is |
|---|---|---|
| `client` | required | codex or claude-code. |

| Option | What it does |
|---|---|
| `--allow-writes` | acknowledge that this profile offers writing tools. |
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |

**Example:** `slack personal mcp add codex --allow-writes`

### `slack mcp check`

check this profile's local MCP handshake and tool list

```sh
slack mcp check [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |

**Example:** `slack personal mcp check`

## `slack upgrade`

upgrade slack with the package manager that installed it; --check only looks

**Changes something on this computer only.**

```sh
slack upgrade [options]
```

| Option | What it does |
|---|---|
| `--check` | say whether a newer version exists, and install nothing. |

**Example:** `slack upgrade --check`

## `slack config`

the settings in force, and where each one came from

### `slack config show`

the profile, the profiles that exist, and each setting with where it came from

```sh
slack config show [options]
```

| Option | What it does |
|---|---|
| `--bot` | the settings a bot command on this profile gets, rather than the personal account's. |

**Example:** `slack personal config show`

### `slack config set`

save a setting to the configuration file

**Changes something on this computer only.**

```sh
slack config set <setting> <value> [options]
```

| Argument | | What it is |
|---|---|---|
| `setting` | required | one of: limit, timeout_ms, color, sender_colors, record, record_input, keep_runs_for_days, keep_successful_runs_for_days, keep_store_runs_for_days, runs_size_limit_mb, permissions, sends_per_hour, requests_per_minute, transcribe_with, speech_model, search_catch_up, history_dialog_days, history_group_days, history_group_members_max, history_muted, picture_search, search_reranker, embedding_provider, embedding_model, embedding_base_url, embedding_dims, models, read_other_bots, update_check, skill_hint, search_stemmers.cyrillic, search_stemmers.latin, owner_languages, phone_countries, task_categories.<name>, task_agent_close, task_agent_close_min, task_first_pass_per_chat, account_groups.<name>, crm.<provider>:<account>.links, crm.<provider>:<account>.company-types, crm.<provider>:<account>.scope, crm.<provider>:<account>.unassigned, crm.<provider>:<account>.self, crm.<provider>:<account>.stage-tasks, crm.<provider>:<account>.activities, crm.<provider>:<account>.files.max_files, crm.<provider>:<account>.files.max_file_mb, crm.<provider>:<account>.files.max_run_mb, crm.<provider>:<account>.files.run_minutes, crm.<provider>:<account>.files.days, crm.<provider>:<account>.files.max_total_mb. |
| `value` | required | a number, true or false; for a group tg:work,max:Alice,email:me@x. |

| Option | What it does |
|---|---|
| `--defaults` | change what every profile gets, rather than this profile. |
| `--personal` | only for personal accounts — the personal section of the file. |
| `--bot` | only for bots — the bot section of the file. |

**Example:** `slack personal config set limit 20`

### `slack config unset`

remove a setting from the configuration file

**Changes something on this computer only.**

```sh
slack config unset <setting> [options]
```

| Argument | | What it is |
|---|---|---|
| `setting` | required | one of: limit, timeout_ms, color, sender_colors, record, record_input, keep_runs_for_days, keep_successful_runs_for_days, keep_store_runs_for_days, runs_size_limit_mb, permissions, sends_per_hour, requests_per_minute, transcribe_with, speech_model, search_catch_up, history_dialog_days, history_group_days, history_group_members_max, history_muted, picture_search, search_reranker, embedding_provider, embedding_model, embedding_base_url, embedding_dims, models, read_other_bots, update_check, skill_hint, search_stemmers.cyrillic, search_stemmers.latin, owner_languages, phone_countries, task_categories.<name>, task_agent_close, task_agent_close_min, task_first_pass_per_chat, account_groups.<name>, crm.<provider>:<account>.links, crm.<provider>:<account>.company-types, crm.<provider>:<account>.scope, crm.<provider>:<account>.unassigned, crm.<provider>:<account>.self, crm.<provider>:<account>.stage-tasks, crm.<provider>:<account>.activities, crm.<provider>:<account>.files.max_files, crm.<provider>:<account>.files.max_file_mb, crm.<provider>:<account>.files.max_run_mb, crm.<provider>:<account>.files.run_minutes, crm.<provider>:<account>.files.days, crm.<provider>:<account>.files.max_total_mb. |

| Option | What it does |
|---|---|
| `--defaults` | change what every profile gets, rather than this profile. |
| `--personal` | only for personal accounts — the personal section of the file. |
| `--bot` | only for bots — the bot section of the file. |

**Example:** `slack personal config unset limit`

### `slack config migrate`

write each setting the file lacks at its default, keeping yours

**Changes something on this computer only.**

```sh
slack config migrate
```

**Example:** `slack config migrate`

### `slack config repair`

fix broken JSON syntax in the settings file — comments, a missing or extra comma, unquoted keys, single quotes, missing closing brackets at the end — keeping every value, with a backup beside it; refuses anything with more than one reading and changes nothing then

**Changes something on this computer only.**

```sh
slack config repair [options]
```

| Option | What it does |
|---|---|
| `--dry-run` | say what it would fix, and change nothing. |

**Example:** `slack config repair`, `slack config repair --dry-run`

## `slack runs`

recorded runs — what this tool did, and when

### `slack runs list`

recorded runs, newest first

```sh
slack runs list [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |

**Returns:** run — run_id, command, started_at, status, cli_version, profile, completed_at, requests, and 23 more; every field: slack commands info runs list

**Example:** `slack personal runs list --limit 10`

### `slack runs show`

one run: what it was, how it ended, and every event it logged

```sh
slack runs show <run-id> [options]
```

| Argument | | What it is |
|---|---|---|
| `run-id` | required | an id from `slack runs list`. |

| Option | What it does |
|---|---|
| `--problems` | only failed responses, warnings and crashes. |

**Returns:** run details — run_id, command, started_at, status, cli_version, directory, event_count, events, and 22 more; every field: slack commands info runs show

**Example:** `slack personal runs show run-101`

### `slack runs path`

the directory holding one run

```sh
slack runs path <run-id>
```

| Argument | | What it is |
|---|---|---|
| `run-id` | required | an id from `slack runs list`. |

**Returns:** run location — path; every field: slack commands info runs path

**Example:** `slack personal runs path run-101`

## Exit codes

Branch on the code, not on the text: the text can change, the code does not.

| Code | When |
|---|---|
| `0` | it worked |
| `2` | `validation_error` |
| `3` | `configuration_error` |
| `4` | `authentication_error` |
| `5` | `permission_error` |
| `6` | `not_found` |
| `7` | `confirmation_required` |
| `8` | `rate_limited` |
| `9` | `timeout` |
| `10` | `network_error` |
| `11` | `provider_error` |
| `12` | `provider_unavailable` |
| `13` | `invalid_response` |
| `14` | `outcome_unknown` |
| `15` | `conflict` |
| `130` | `cancelled` |
| `1` | anything else |
