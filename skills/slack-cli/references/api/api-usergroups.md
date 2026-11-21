<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack API: usergroups

## `slack api usergroups create [options]`

- What: usergroups\_create — write (POST /usergroups.create)
- Call: `POST /usergroups.create`, effect: write
- Body: `UsergroupsCreateRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api usergroups disable [options]`

- What: usergroups\_disable — destructive (POST /usergroups.disable)
- Call: `POST /usergroups.disable`, effect: destructive
- Permission keys: `slack.delete`
- Body: `UsergroupsDisableRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api usergroups enable [options]`

- What: usergroups\_enable — write (POST /usergroups.enable)
- Call: `POST /usergroups.enable`, effect: write
- Body: `UsergroupsEnableRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api usergroups list [options]`

- What: usergroups\_list — read (GET /usergroups.list)
- Call: `GET /usergroups.list`, effect: read

| Flag | Required | What |
|---|---|---|
| `--include-users <value>` | no | Include the list of users for each User Group. |
| `--include-count <value>` | no | Include the number of users in each User Group. |
| `--include-disabled <value>` | no | Include disabled User Groups. |

## `slack api usergroups update [options]`

- What: usergroups\_update — write (POST /usergroups.update)
- Call: `POST /usergroups.update`, effect: write
- Body: `UsergroupsUpdateRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api usergroups users-list [options]`

- What: usergroups\_users\_list — read (GET /usergroups.users.list)
- Call: `GET /usergroups.users.list`, effect: read

| Flag | Required | What |
|---|---|---|
| `--include-disabled <value>` | no | Allow results that involve disabled User Groups. |
| `--usergroup <value>` | yes | The encoded ID of the User Group to update. |

## `slack api usergroups users-update [options]`

- What: usergroups\_users\_update — write (POST /usergroups.users.update)
- Call: `POST /usergroups.users.update`, effect: write
- Body: `UsergroupsUsersUpdateRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |
