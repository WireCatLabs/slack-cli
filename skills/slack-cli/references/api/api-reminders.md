<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack API: reminders

## `slack api reminders add [options]`

- What: reminders\_add — write (POST /reminders.add)
- Call: `POST /reminders.add`, effect: write
- Body: `RemindersAddRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api reminders complete [options]`

- What: reminders\_complete — write (POST /reminders.complete)
- Call: `POST /reminders.complete`, effect: write
- Body: `RemindersCompleteRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api reminders delete [options]`

- What: reminders\_delete — destructive (POST /reminders.delete)
- Call: `POST /reminders.delete`, effect: destructive
- Permission keys: `slack.delete`
- Body: `RemindersDeleteRequest`

| Flag | Required | What |
|---|---|---|
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `slack api reminders info [options]`

- What: reminders\_info — read (GET /reminders.info)
- Call: `GET /reminders.info`, effect: read

| Flag | Required | What |
|---|---|---|
| `--reminder <value>` | no | The ID of the reminder |

## `slack api reminders list`

- What: reminders\_list — read (GET /reminders.list)
- Call: `GET /reminders.list`, effect: read
