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

keep this profile's Slack token in the OS keyring

### `slack session start`

sign this profile in: the Slack user token is asked hidden or read from stdin, never taken as an argument, checked with Slack, and only then kept in the keyring, or in a private file. Paste the User OAuth Token (xoxp-…) of your own Slack app, made from docs/slack-app-manifest.json; a bot token is refused

**Changes something on this computer only.**

```sh
slack session start [options]
```

| Option | What it does |
|---|---|
| `--credential-storage <storage>` | where the token is kept: keyring, which falls back to a private file by itself, or file. Default: `keyring`. |

**Example:** `slack personal session start`, `slack personal session start --credential-storage file`

### `slack session status`

show where this profile's token comes from: SLACK_TOKEN, the keyring or a file, never the token; --check asks Slack whose token it is

```sh
slack session status [options]
```

| Option | What it does |
|---|---|
| `--check` | ask Slack whether the token still works, and whose it is. |

**Example:** `slack personal session status`, `slack personal session status --check --json`

### `slack session end`

forget this profile's token on this computer; the token itself stays valid in Slack. The app stays installed in the workspace; remove it there to revoke the token

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

## `slack setup`

connect this profile to slack: the same questions WireCat Desktop shows, asked in the terminal, checked, and saved only when the check succeeds; show, apply and run are the same flow for programs

### `slack setup show`

print the connection flow as a WireCat setup document: steps, texts in every language, and each setting's own JSON Schema; with a profile it adds the profile's current values, a secret only as { set: true }

```sh
slack setup show
```

**Example:** `slack personal setup show --json`, `slack office setup show --json`

### `slack setup apply`

read the answers as one JSON object on stdin (input id → value), keep only those on the path they lead to, check each with its setting's own schema, then run the CLI's check and save the settings and secrets; --dry-run only checks and saves nothing

**Changes something on this computer only.**

```sh
slack setup apply [options]
```

| Option | What it does |
|---|---|
| `--dry-run` | check the answers, and save nothing. |

**Example:** `slack office setup apply --dry-run --json`, `slack office setup apply --json`

### `slack setup run`

run one run step of the flow: apply checks the answers, runs the CLI's check and saves; the sign-in events go to stderr as JSON lines and the result to stdout; with --answer-stdin the answers are stdin's first line

**Changes something on this computer only.**

```sh
slack setup run <action> [options]
```

| Argument | | What it is |
|---|---|---|
| `action` | required | the step's action: apply. |

| Option | What it does |
|---|---|
| `--answer-stdin` | with --json and no terminal: print each question as a `needs` line on stderr and read its answer, one line, from stdin. |

**Example:** `slack office setup run apply --json --answer-stdin`

## `slack account`

the logged-in account

### `slack account list`

every account profile on this computer, and the account each is logged in as; a name that is only a bot is left out (`bot list` has it), one that is a bot too says `bot: true`; asks the messenger nothing

```sh
slack account list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Returns:** account profile — profile, current, account, name, signed_in, bot; every field: slack commands info account list

**Example:** `slack personal account list`

### `slack account show`

who this profile is logged in as, with the phone number

```sh
slack account show [options]
```

| Option | What it does |
|---|---|
| `--hide-phone` | leave the phone number out. |

**Returns:** account — provider, id, name, username, phone, scope; every field: slack commands info account show

**Example:** `slack personal account show`

### `slack account update`

change the name, the description or the photo everyone sees on your profile

**Changes something in the service.**

```sh
slack account update [options]
```

| Option | What it does |
|---|---|
| `--first-name <name>` | your first name. |
| `--last-name <name>` | your last name. |
| `--description <text>` | about you. |
| `--photo <file>` | a new profile photo — an image file. |
| `--hide-phone` | leave the phone number out of the answer. |

**Returns:** account change — operation_id, account; every field: slack commands info account update

**Example:** `slack personal account update --first-name Alex`

### `slack account sessions`

where else this account is logged in — not `slack session`, which is this tool's own login

#### `slack account sessions list`

every device and app logged in to this account; nothing is ended

```sh
slack account sessions list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms; this list filters by none yet. |

**Returns:** account session — current, client, device, location, last_active_at, created_at; every field: slack commands info account sessions list

**Example:** `slack personal account sessions list`

#### `slack account sessions end`

log out every other device, your phone included; this one stays

**Changes something in the service.**

```sh
slack account sessions end [options]
```

| Option | What it does |
|---|---|
| `--others` | every session but this one. |

**Returns:** ended account sessions — operation_id, sessions; every field: slack commands info account sessions end

**Example:** `slack personal account sessions end --others`

### `slack account remove`

sign the profile out, then forget it on this computer: its settings, its saved sign-in and its files; --keep-data leaves its messages in the store, where search still finds them, --delete-data deletes them; asks first, or --yes

**Changes something in the service.**

```sh
slack account remove [options]
```

| Option | What it does |
|---|---|
| `--keep-data` | leave what the store holds of this account, still searchable. |
| `--delete-data` | delete what the store and the tool's own files hold of this account. |
| `--dry-run` | list what it would remove and keep, and change nothing. |

**Returns:** account removal — profile, data, dry_run, account, revoked, config_file, removed, kept; every field: slack commands info account remove

**Example:** `slack personal account remove --keep-data --dry-run`, `slack personal account remove --delete-data --yes`

## `slack chats`

the account's chats

### `slack chats list`

chats, newest first, archived ones included; the query is answered from the local store, so online, where the messenger filters nothing, it needs --offline

```sh
slack chats list [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |
| `--all` | every row, no paging. |

**Returns:** chat — ref, id, title, kind, unread_count, last_message_at, participants_count, provider, and 14 more; every field: slack commands info chats list

**Next usually:** `slack chats events <chat> [query]`, `slack chats show <chat>`, `slack chats documents list <chat> [query]`

**Example:** `slack personal chats list --limit 10`

### `slack chats events`

who joined, left, was added or removed, and by whom — from the chat's service messages; the last 7 days unless the query names time

```sh
slack chats events <chat> [query]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Returns:** chat event — chat_id, time, type, people, message_id, by, title, before; every field: slack commands info chats events

**Example:** `slack personal chats events "Book club"`

### `slack chats show`

one chat: its kind, unread count, last message time and who is in it

```sh
slack chats show <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat — ref, id, title, kind, unread_count, last_message_at, participants_count, provider, and 14 more; every field: slack commands info chats show

**Next usually:** `slack chats events <chat> [query]`, `slack chats documents list <chat> [query]`, `slack chats members list <chat> [query]`

**Example:** `slack personal chats show "Book club"`

### `slack chats documents`

the Google Docs and Drive documents linked in a chat's stored messages

#### `slack chats documents list`

every document link in the chat, newest first, and whether the store has it

```sh
slack chats documents list <chat> [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |

**Returns:** document link — ref, url, document_id, title, in_store, sent_at, sender; every field: slack commands info chats documents list

**Example:** `slack personal chats documents list "Project room" --limit 10`

### `slack chats members`

who is in a group

#### `slack chats members list`

everyone in a group, a page at a time, with their role and when they were last seen

```sh
slack chats members list <chat> [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | field:value terms; this list filters by none yet. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |
| `--all` | every row, no paging. |

**Returns:** member — id, name, username, role, last_seen_at, registered_at, joined_at, invited_by, and 7 more; every field: slack commands info chats members list

**Next usually:** `slack contacts show <person>`, `slack contacts context <person>`, `slack contacts prepare <person>`

**Example:** `slack personal chats members list "Book club"`

#### `slack chats members check`

members that look like bots, each with its reasons — read from the member list and the local store; never one request per person, and it removes nobody

```sh
slack chats members check <chat> [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--max-pages <pages>` | at most this many pages of 200 members, a pause between them (default: 10). |
| `--deep <n>` | also check the top n in full — profile, photos and everything they wrote — one person a second; the public ban lists cover Telegram only, so nothing is sent. |

**Returns:** member — id, name, username, role, last_seen_at, registered_at, joined_at, invited_by, and 7 more; every field: slack commands info chats members check

**Next usually:** `slack contacts show <person>`, `slack contacts context <person>`, `slack contacts prepare <person>`

**Example:** `slack personal chats members check "Book club"`

#### `slack chats members history`

who joined, who left and whose profile changed, oldest first — what chats members fetch recorded in the local store; never asks the messenger

```sh
slack chats members history <chat> [query]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Returns:** chat event — chat_id, time, type, people, message_id, by, title, before; every field: slack commands info chats members history

**Example:** `slack personal chats members history "Book club"`

#### `slack chats members fetch`

read a group's whole member list into the local store's member history: who joined, who left, daily counts and profile changes; someone is recorded as gone only when every member was read

**Changes something on this computer only.**

```sh
slack chats members fetch <chat> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

| Option | What it does |
|---|---|
| `--track` | also fetch it daily while serve runs; chats tracking lists and edits those chats. |
| `--max-pages <pages>` | at most this many pages of 200 members, a pause between them (default: 10). |

**Returns:** chat members fetch — chat_id, joined, gone, changed, read, participants, complete, more, and 1 more; every field: slack commands info chats members fetch

**Example:** `slack personal chats members fetch "Book club"`

#### `slack chats members add`

add people; they are told

**Changes something in the service.**

```sh
slack chats members add <chat> <person>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `person` | required | an id, or part of a name. |

**Returns:** chat members change — operation_id, chat_id, added, not_added, removed; every field: slack commands info chats members add

**Example:** `slack personal chats members add "Book club" "Alex Example"`

#### `slack chats members remove`

remove people; their messages stay

**Changes something in the service.**

```sh
slack chats members remove <chat> <person>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `person` | required | an id, or part of a name. |

**Returns:** chat members change — operation_id, chat_id, added, not_added, removed; every field: slack commands info chats members remove

**Example:** `slack personal chats members remove "Book club" "Alex Example"`

### `slack chats mark-read`

mark a chat read; the other side sees that you read it

**Changes something in the service.**

```sh
slack chats mark-read <chat> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

| Option | What it does |
|---|---|
| `--until-id <id>` | only up to this message id; the newest by default. |
| `--topic <id>` | mark only this forum topic read. |

**Returns:** chat read — operation_id, chat_id, until, thread_id; every field: slack commands info chats mark-read

**Example:** `slack personal chats mark-read "Book club" --until-id 101`

### `slack chats tracking`

the chats whose member lists serve fetches daily into the local store — chats members fetch --track adds one

#### `slack chats tracking list`

every tracked chat: since when, and its last member count

```sh
slack chats tracking list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Returns:** tracked chat — chat_id, title, tracked_at, last_count; every field: slack commands info chats tracking list

**Example:** `slack personal chats tracking list`

#### `slack chats tracking show`

one chat: whether it is tracked, and its member count per day for the last 30 days

```sh
slack chats tracking show <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** tracked chat history — chat_id, tracked_at, counts; every field: slack commands info chats tracking show

**Example:** `slack personal chats tracking show "Book club"`

#### `slack chats tracking add`

fetch this chat's member list daily while serve runs, from its next run

**Changes something on this computer only.**

```sh
slack chats tracking add <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat tracking — chat_id, tracked; every field: slack commands info chats tracking add

**Example:** `slack personal chats tracking add "Book club"`

#### `slack chats tracking remove`

stop fetching it daily; the history already kept stays

**Changes something on this computer only.**

```sh
slack chats tracking remove <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat tracking — chat_id, tracked; every field: slack commands info chats tracking remove

**Example:** `slack personal chats tracking remove "Book club"`

### `slack chats create`

create a group or a channel; the people added are told

**Changes something in the service.**

```sh
slack chats create <title> [person] [options]
```

| Argument | | What it is |
|---|---|---|
| `title` | required | the group's name. |
| `person` | optional | people to add: an id, or part of a name. |

| Option | What it does |
|---|---|
| `--channel` | a private channel instead of a group; people join it by its link. |

**Returns:** chat group change — operation_id, chat, requested; every field: slack commands info chats create

**Example:** `slack personal chats create "Book club" "Alex Example"`

### `slack chats join`

join a group or channel by its link; the others in it see that you joined

**Changes something in the service.**

```sh
slack chats join <link>
```

| Argument | | What it is |
|---|---|---|
| `link` | required | an invite link, or a public one. |

**Returns:** chat group change — operation_id, chat, requested; every field: slack commands info chats join

**Example:** `slack personal chats join https://example.com/invite/book-club`

### `slack chats leave`

leave a group or channel; the others in it see that you left

**Changes something in the service.**

```sh
slack chats leave <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat removal — operation_id, chat_id; every field: slack commands info chats leave

**Example:** `slack personal chats leave "Book club"`

### `slack chats update`

rename a group or channel, change its description, or turn one of its settings on or off

**Changes something in the service.**

```sh
slack chats update <chat> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

| Option | What it does |
|---|---|
| `--title <title>` | the new name. |
| `--description <text>` | the new description. |
| `--all-can-pin <on\|off>` | every member may pin messages. |
| `--only-admins-add <on\|off>` | only admins may add members. |
| `--only-admins-call <on\|off>` | only admins may start a call. |
| `--only-owner-edits-info <on\|off>` | only the owner may change the name and photo. |
| `--members-see-link <on\|off>` | members may see the invite link. |

**Returns:** chat group change — operation_id, chat, requested; every field: slack commands info chats update

**Example:** `slack personal chats update "Book club" --title "Reading group"`

### `slack chats links`

a group's invite link

#### `slack chats links show`

the invite link, if you may see it

```sh
slack chats links show <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat invite — chat_id, title, link; every field: slack commands info chats links show

**Example:** `slack personal chats links show "Book club"`

#### `slack chats links reset`

replace the invite link; the old one stops working

**Changes something in the service.**

```sh
slack chats links reset <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat group change — operation_id, chat, requested; every field: slack commands info chats links reset

**Example:** `slack personal chats links reset "Book club"`

### `slack chats requests`

requests to join a group that needs an admin's approval

#### `slack chats requests list`

who asked to join, newest first; only admins see them, and reading tells nobody

```sh
slack chats requests list <chat> [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |

**Returns:** join request — person_id, name, username, requested_at, about; every field: slack commands info chats requests list

**Example:** `slack personal chats requests list "Book club"`

#### `slack chats requests confirm`

let them in; the group sees them join

**Changes something in the service.**

```sh
slack chats requests confirm <chat> <person>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `person` | required | who asked: an id from `chats requests list`. |

**Returns:** chat request change — operation_id, chat_id, person_id, accepted, already, counted; every field: slack commands info chats requests confirm

**Example:** `slack personal chats requests confirm "Book club" "Alex Example"`

#### `slack chats requests reject`

turn the request away

**Changes something in the service.**

```sh
slack chats requests reject <chat> <person>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `person` | required | who asked: an id from `chats requests list`. |

**Returns:** chat request change — operation_id, chat_id, person_id, accepted, already, counted; every field: slack commands info chats requests reject

**Example:** `slack personal chats requests reject "Book club" "Alex Example"`

### `slack chats admins`

give or take back a member's admin rights

#### `slack chats admins add`

make a member an admin with these rights

**Changes something in the service.**

```sh
slack chats admins add <chat> <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `person` | required | an id, or part of a name. |

| Option | What it does |
|---|---|
| `--can <rights>` | what they may do, comma-separated: read, members, admins, info, pin, link, post, edit, delete. |

**Returns:** chat admin change — operation_id, chat_id, person_id, rights; every field: slack commands info chats admins add

**Example:** `slack personal chats admins add "Book club" "Alex Example" --can info`

#### `slack chats admins remove`

take an admin's rights back; they stay a member

**Changes something in the service.**

```sh
slack chats admins remove <chat> <person>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `person` | required | an id, or part of a name. |

**Returns:** chat admin change — operation_id, chat_id, person_id, rights; every field: slack commands info chats admins remove

**Example:** `slack personal chats admins remove "Book club" "Alex Example"`

### `slack chats folders`

your chat folders

#### `slack chats folders list`

your chat folders, in the order the app shows them

```sh
slack chats folders list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms; this list filters by none yet. |

**Returns:** folder — id, title, chat_ids, emoji, include, skip, excluded_chat_ids, pinned_chat_ids, and 3 more; every field: slack commands info chats folders list

**Next usually:** `slack chats folders show <folder>`, `slack chats folders update <folder>`, `slack chats folders delete <folder>`

**Example:** `slack personal chats folders list`

#### `slack chats folders show`

one chat folder, with the names of the chats in it

```sh
slack chats folders show <folder>
```

| Argument | | What it is |
|---|---|---|
| `folder` | required | the folder's id, or its title exactly. |

**Returns:** folder — id, title, chat_ids, emoji, include, skip, excluded_chat_ids, pinned_chat_ids, and 3 more; every field: slack commands info chats folders show

**Next usually:** `slack chats folders update <folder>`, `slack chats folders delete <folder>`

**Example:** `slack personal chats folders show "Reading"`

#### `slack chats folders create`

create a chat folder

**Changes something in the service.**

```sh
slack chats folders create <title> [options]
```

| Argument | | What it is |
|---|---|---|
| `title` | required | the folder's name; the app may refuse a long one. |

| Option | What it does |
|---|---|
| `--chat <chat>` | a chat to put in it, by id or name; repeat it for more. |

**Returns:** chat folder change — operation_id, folder; every field: slack commands info chats folders create

**Example:** `slack personal chats folders create "Reading" --chat "Book club"`

#### `slack chats folders update`

rename a folder, or change which chats are in it

**Changes something in the service.**

```sh
slack chats folders update <folder> [options]
```

| Argument | | What it is |
|---|---|---|
| `folder` | required | folder id, or its title exactly. |

| Option | What it does |
|---|---|
| `--title <title>` | a new name. |
| `--add <chat>` | put a chat in it; repeat it for more. |
| `--remove <chat>` | take a chat out of it, and off its excluded and pinned lists; repeat it for more. |

**Returns:** chat folder change — operation_id, folder; every field: slack commands info chats folders update

**Example:** `slack personal chats folders update "Reading" --title "Books"`

#### `slack chats folders delete`

delete a folder; the chats in it stay

**Changes something in the service.**

```sh
slack chats folders delete <folder>
```

| Argument | | What it is |
|---|---|---|
| `folder` | required | folder id, or its title exactly. |

**Returns:** chat folder removal — operation_id, folder_id; every field: slack commands info chats folders delete

**Example:** `slack personal chats folders delete "Reading"`

### `slack chats rules`

what `chats moderate` judges a group by, kept in a file of this profile

#### `slack chats rules show`

the group's rules; the defaults, marked not saved, if it has none yet

```sh
slack chats rules show <chat>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

**Returns:** chat rules — chat_id, title, file, saved, rules; every field: slack commands info chats rules show

**Example:** `slack personal chats rules show "Book club"`

#### `slack chats rules set`

change one rule; the group's first change writes every rule with its default

**Changes something on this computer only.**

```sh
slack chats rules set <chat> <key> <value>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `key` | required | one of: trusted, blocked, blockedNames, links, invites, forwards, blockedPeople, flood.messages, flood.minutes, flood.action, newAccount.days, newAccount.action, consent.delete, consent.remove. |
| `value` | required | the new value; a list is comma-separated. |

**Returns:** chat rules — chat_id, title, file, saved, rules; every field: slack commands info chats rules set

**Example:** `slack personal chats rules set "Book club" links report`

#### `slack chats rules unset`

put one rule back to its default

**Changes something on this computer only.**

```sh
slack chats rules unset <chat> <key>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `key` | required | one of: trusted, blocked, blockedNames, links, invites, forwards, blockedPeople, flood.messages, flood.minutes, flood.action, newAccount.days, newAccount.action, consent.delete, consent.remove. |

**Returns:** chat rules — chat_id, title, file, saved, rules; every field: slack commands info chats rules unset

**Example:** `slack personal chats rules unset "Book club" links`

### `slack chats moderate`

judge a group's new messages and members by its rules, and act as they allow

**Changes something in the service.**

```sh
slack chats moderate <chat> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

| Option | What it does |
|---|---|
| `--since-time <time>` | judge what came after this ISO 8601 time, or 2h / 1d ago; the saved point stays. |
| `--dry-run` | judge and plan; do nothing. |
| `--allow-dangerous` | yes to every action whose level in the group's rules is ask. |
| `--max-actions <n>` | at most this many actions in one run; 10 if not given. |

**Returns:** chat moderation — chat_id, rows; every field: slack commands info chats moderate

**Example:** `slack personal chats moderate "Book club" --dry-run`

## `slack contacts`

people this account has a one-to-one chat with

### `slack contacts list`

people you have a one-to-one chat with; name: matches the name, your local alias or the @username, notes: your private notes about them

```sh
slack contacts list [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |
| `--all` | every row, no paging. |
| `--order <recent\|name>` | newest conversation first, or alphabetical. Default: `recent`. |

**Returns:** contact — ref, id, name, username, description, last_messaged_at, alias, display_name, and 15 more; every field: slack commands info contacts list

**Next usually:** `slack contacts show <person>`, `slack contacts context <person>`, `slack contacts prepare <person>`

**Example:** `slack personal contacts list --limit 10`

### `slack contacts show`

one person: what the messenger says about them — handles, flags, last seen, phone, when they registered — your alias, the chats you share, how many of their messages the store holds in each, and the earlier names and usernames the store saw them with; --offline answers from the store alone

```sh
slack contacts show <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name. |

| Option | What it does |
|---|---|
| `--with-notes` | include your private notes, subject to contacts.notes.list permission. |
| `--hide-phone` | leave the phone number out. |

**Returns:** contact — ref, id, name, username, description, last_messaged_at, alias, display_name, and 15 more; every field: slack commands info contacts show

**Next usually:** `slack contacts context <person>`, `slack contacts prepare <person>`, `slack contacts events <person> [query]`

**Example:** `slack personal contacts show "Alex Example"`

### `slack contacts context`

what the store holds about one person, in every messenger linked to them, read only in accounts of this account's scope (personal or work): shared chats, the last messages each way, their recent messages, where others mentioned them — never connects

```sh
slack contacts context <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name. |

| Option | What it does |
|---|---|
| `--limit <n>` | at most this many messages in each list; 10 if not given. |
| `--since-time <time>` | nothing older than this ISO 8601 time, or 2h / 1d ago. |
| `--chat <chat>` | a chat, by id or name; repeat it for more — then their newest messages in each, 20 unless --limit, short unless -v. |
| `--sync-first` | with --chat, read their newest messages in each from the messenger first. |

**Returns:** contact context — person, accounts, shared, last, recent, mentions, limits, complete, and 4 more; every field: slack commands info contacts context

**Example:** `slack personal contacts context "Alex Example" --limit 10`

### `slack contacts prepare`

before you talk to someone: what contacts context gives, plus the one-to-one chats where they wrote last, open tasks, accepted facts, your notes and their recent meetings, each with its reference; never connects

```sh
slack contacts prepare <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name. |

| Option | What it does |
|---|---|
| `--limit <n>` | at most this many messages, and items in each section; 10 if not given. |
| `--since-time <time>` | no message or meeting older than this ISO 8601 time, or 2h / 1d ago. |

**Returns:** contact preparation — person, accounts, shared, last, recent, mentions, limits, complete, and 4 more; every field: slack commands info contacts prepare

**Example:** `slack personal contacts prepare Ana`

### `slack contacts events`

everything one person took part in, in every messenger linked to them — messages they wrote or were mentioned in, chats, mail, meetings, tasks — newest first, from the store; only in this account's scope, personal or work, and scope: of the other one is refused; never connects

```sh
slack contacts events <person> [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name. |
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | at most this many; 50 if not given. |
| `--cursor <cursor>` | go on from where the last page stopped; page.next gives it, with the same filters. |

**Returns:** contact activity — at, subject, subject_id, role, scope, provider, account, chat_id, and 2 more; every field: slack commands info contacts events

**Example:** `slack personal contacts events "Alex Example" --limit 10`

### `slack contacts check`

whether one person looks like a bot, a fake or a spammer: their profile and what they wrote in the store — a hint, never a verdict; the public ban lists cover Telegram only, so nothing is sent

```sh
slack contacts check <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name. |

| Option | What it does |
|---|---|
| `--no-registries` | do not ask the public ban lists; nothing about them leaves this machine. |

**Returns:** contact check — person, score, reasons, registries, unknown, checked_at; every field: slack commands info contacts check

**Example:** `slack personal contacts check "Alex Example"`

### `slack contacts link`

record that two people in the store are one person — the same name is never enough

**Changes something on this computer only.**

```sh
slack contacts link <person> <other> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name. |
| `other` | required | the same in another messenger of the store, as <messenger>:<person> — max:Ana; me: it is you, as zoom:<id> me. |

| Option | What it does |
|---|---|
| `--reason <text>` | why they are one person; an agent's link is a proposal and needs it. |

**Returns:** linked person — uid, name, identities, display_name, proposal; every field: slack commands info contacts link

**Example:** `slack personal contacts link "Alex Example" zoom:101`

### `slack contacts unlink`

undo contacts link for one identity: it is a person of its own again

**Changes something on this computer only.**

```sh
slack contacts unlink <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | their id, @username, or part of their name; <messenger>:<person> for another messenger. |

| Option | What it does |
|---|---|
| `--from <person>` | the person it leaves, person:<uid> or person:me; refused when it sits on another. |

**Returns:** linked person — uid, name, identities, display_name, proposal; every field: slack commands info contacts unlink

**Example:** `slack personal contacts unlink "Alex Example" --from person:me`

### `slack contacts lookup`

who has this phone number — asks for it, or reads it from stdin; never an argument

```sh
slack contacts lookup
```

**Returns:** contact lookup — id, name, username; every field: slack commands info contacts lookup

**Example:** `slack personal contacts lookup`

### `slack contacts sync`

take the whole contact list from the messenger into the local store

**Changes something on this computer only.**

```sh
slack contacts sync
```

**Returns:** contact sync — added, changed, known; every field: slack commands info contacts sync

**Example:** `slack personal contacts sync`

### `slack contacts aliases`

a private local display name in the selected account

#### `slack contacts aliases set`

your own name for a person in this account; kept on this machine, never sent

**Changes something on this computer only.**

```sh
slack contacts aliases set <person> <alias>
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |
| `alias` | required | the private name to use for this person. |

**Returns:** contact alias — person_id, alias; every field: slack commands info contacts aliases set

**Example:** `slack personal contacts aliases set "Alex Example" "Reading partner"`

#### `slack contacts aliases remove`

drop your local name for a person; their own name shows again

**Changes something on this computer only.**

```sh
slack contacts aliases remove <person>
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |

**Returns:** contact alias — person_id, alias; every field: slack commands info contacts aliases remove

**Example:** `slack personal contacts aliases remove "Alex Example"`

### `slack contacts notes`

your private notes on a stored contact, the same in every account that sees them

#### `slack contacts notes list`

every private note you keep on a person, oldest first

```sh
slack contacts notes list <person> [query]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |
| `query` | optional | field:value terms; this list filters by none yet. |

**Returns:** contact note — id, contact, text, revision, created_at, updated_at; every field: slack commands info contacts notes list

**Example:** `slack personal contacts notes list "Alex Example"`

#### `slack contacts notes show`

one private note on a person, with its revision for edit

```sh
slack contacts notes show <person> <id>
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |
| `id` | required | the note id from contacts notes list. |

**Returns:** contact note — id, contact, text, revision, created_at, updated_at; every field: slack commands info contacts notes show

**Example:** `slack personal contacts notes show "Alex Example" 1`

#### `slack contacts notes add`

add a private note on a person from stdin or --text-file; never sent

**Changes something on this computer only.**

```sh
slack contacts notes add <person> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |

| Option | What it does |
|---|---|
| `--text-file <path>` | read note text from a file; omitted or - reads stdin. |

**Returns:** contact note — id, contact, text, revision, created_at, updated_at; every field: slack commands info contacts notes add

**Example:** `slack personal contacts notes add "Alex Example" --text-file ./note.txt`

#### `slack contacts notes edit`

replace a note's text; --revision must match the one you read

**Changes something on this computer only.**

```sh
slack contacts notes edit <person> <id> [options]
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |
| `id` | required | the note id from contacts notes list. |

| Option | What it does |
|---|---|
| `--text-file <path>` | read note text from a file; omitted or - reads stdin. |
| `--revision <n>` | the revision you read before editing. |

**Returns:** contact note — id, contact, text, revision, created_at, updated_at; every field: slack commands info contacts notes edit

**Example:** `slack personal contacts notes edit "Alex Example" 1 --revision 1 --text-file ./note.txt`

#### `slack contacts notes remove`

delete one private note on a person

**Changes something on this computer only.**

```sh
slack contacts notes remove <person> <id>
```

| Argument | | What it is |
|---|---|---|
| `person` | required | the person's id, reference or known name. |
| `id` | required | the note id from contacts notes list. |

**Returns:** contact note removal — id, person_id, removed; every field: slack commands info contacts notes remove

**Example:** `slack personal contacts notes remove "Alex Example" 1`

### `slack contacts block`

stop a person from writing to you — they need not be a contact

**Changes something in the service.**

```sh
slack contacts block <person>
```

| Argument | | What it is |
|---|---|---|
| `person` | required | person id — `contacts lookup` finds one — or part of a known name. |

**Returns:** contact state change — operation_id, person_id; every field: slack commands info contacts block

**Example:** `slack personal contacts block "Alex Example"`

### `slack contacts unblock`

let a blocked person write to you again

**Changes something in the service.**

```sh
slack contacts unblock <person>
```

| Argument | | What it is |
|---|---|---|
| `person` | required | person id — `contacts lookup` finds one — or part of a known name. |

**Returns:** contact state change — operation_id, person_id; every field: slack commands info contacts unblock

**Example:** `slack personal contacts unblock "Alex Example"`

## `slack messages`

read and send messages

### `slack messages evidence`

general chat context, newest first, with references, coverage and fingerprints for verification

```sh
slack messages evidence <chat> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

| Option | What it does |
|---|---|
| `--limit <n>` | how many, 1–100. |
| `--cursor <cursor>` | go on from where page.next says the last packet stopped. |

**Returns:** evidence packet — schema_version, id, kind, source, fingerprint, limits, content_bytes, coverage, and 1 more; every field: slack commands info messages evidence

**Example:** `slack personal messages evidence "Book club" --limit 10`

### `slack messages list`

a chat's messages, oldest to newest

```sh
slack messages list <chat> [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `query` | optional | where to start or which window, and which topic: id<42, date>=2026-10-01 date<2026-10-20, topic:12. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many. |
| `--cursor <cursor>` | go on from where the last page stopped; page.next gives it. |
| `--transcribe` | turn voice messages not heard yet into text — by the messenger where it can, else by a model on this machine; can take minutes. |
| `--model <model>` | which downloaded speech model hears them, with --transcribe; `models list` shows them. |

**Returns:** message — ref, id, chat_id, sender_id, sender_name, sender_is_me, timestamp, edited_at, and 31 more; every field: slack commands info messages list

**Next usually:** `slack messages transcribe <chat> <message>`, `slack messages links <chat> <message>`, `slack messages show <chat> [message]`

**Example:** `slack personal messages list "Book club" --limit 20`

### `slack messages send`

send a text message; without [text], the text is read from stdin

**Changes something in the service.**

```sh
slack messages send <chat> [text] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `text` | optional | the message. |

| Option | What it does |
|---|---|
| `--topic <id>` | send to this forum topic. |
| `--reply-to <message>` | answer this message, by its id in the same chat. |
| `--operation-id <id>` | repeat a send whose outcome was unknown, without risking a second copy. |
| `--no-preview` | no preview card for a link in the text. |
| `--md` | read this messenger's Markdown; see its formatting guide for supported syntax. |
| `--file <file>` | attach a file; the text becomes its caption; repeat it for an album. Default: ``. |
| `--photo <file>` | attach a .jpg, .png or .webp as a photo; the text becomes its caption; repeat it for an album. Default: ``. |
| `--as-file` | send each --file as a file to download, a video included. |
| `--voice <file>` | send an Ogg Opus file as a voice message, alone, with no text. |
| `--allow-any-file` | send a file even from credential folders or this CLI's own folders. |

**Returns:** message write — operation_id, message, messages, scheduled_for; every field: slack commands info messages send

**Example:** `slack personal messages send "Book club" "The meeting starts at 10."`

### `slack messages show`

one message, by its chat and id or by its msg: locator

```sh
slack messages show <chat> [message]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…); or a msg: locator, with no message id after it. |
| `message` | optional | the message id. |

**Returns:** message — ref, id, chat_id, sender_id, sender_name, sender_is_me, timestamp, edited_at, and 31 more; every field: slack commands info messages show

**Next usually:** `slack messages transcribe <chat> <message>`, `slack messages links <chat> <message>`, `slack messages context <chat> [message]`

**Example:** `slack personal messages show "Book club" 101`

### `slack messages context`

a message and what came either side of it, oldest first

```sh
slack messages context <chat> [message] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…); or a msg: locator, with no message id after it. |
| `message` | optional | the message id. |

| Option | What it does |
|---|---|
| `--thread` | the stored reply chain and replies instead of time neighbours; falls back when no graph exists. |
| `--thread-hops <n>` | at most this many links from the hit (default: 8). |
| `--thread-messages <n>` | at most this many messages in each thread context (default: 50). |
| `--thread-bytes <n>` | at most this many bytes of whole messages and links in each context (default: 65536). |
| `--thread-within <duration>` | messages within this long either side of the hit (default: 1d). |
| `--before-n <n>` | how many before it. Default: `5`. |
| `--after-n <n>` | how many after it. Default: `5`. |

**Returns:** message context — ref, id, chat_id, sender_id, sender_name, sender_is_me, timestamp, edited_at, and 42 more; every field: slack commands info messages context

**Example:** `slack personal messages context "Book club" 101 --before-n 3 --after-n 3`

### `slack messages download`

save a message's photos, files, videos and voice notes to a folder — or a whole chat's with --all; with --offline, copy the ones this computer already holds, one by --attachment

**Changes something on this computer only.**

```sh
slack messages download <chat> [message] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…); or a msg: locator, with no message id after it. |
| `message` | optional | the message id; left out with --all or a locator. |

| Option | What it does |
|---|---|
| `--output-dir <dir>` | where to save them; created if missing. Default: `.`. |
| `--attachment <n>` | which file of the message, from 1; needed when it has more than one. |
| `--all` | every file of the chat, newest first; run it again to continue where it stopped. |
| `--pause <duration>` | with --all, a pause between pages, to stay under the provider's limits. Default: `1s`. |
| `--extract` | read text layers from the files this download maps into the local content index. |

**Returns:** message download — files, extraction, complete, batch, chat, saved, existing, stopped; every field: slack commands info messages download

**Example:** `slack personal messages download "Book club" 101 --output-dir ./downloads`, `slack personal messages download msg:slack/me/500/101 --attachment 1 --offline`

### `slack messages transcribe`

a voice message as text — by Slack where it can, else by a model on this machine

```sh
slack messages transcribe <chat> <message> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the id of a voice message. |

| Option | What it does |
|---|---|
| `--local` | use the model on this machine, never the messenger. |
| `--model <model>` | which downloaded model; implies --local (`models list`). |

**Returns:** message transcript — message_id, text, pending, via, model; every field: slack commands info messages transcribe

**Example:** `slack personal messages transcribe "Book club" 101`

### `slack messages edit`

change the text of your own message; the other side may have read it already

**Changes something in the service.**

```sh
slack messages edit <chat> <message> [text] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the id of your own message. |
| `text` | optional | the new text; without it, read from stdin. |

| Option | What it does |
|---|---|
| `--md` | read this messenger's Markdown; see its formatting guide for supported syntax. |

**Returns:** message write — operation_id, message, messages, scheduled_for; every field: slack commands info messages edit

**Example:** `slack personal messages edit "Book club" 101 "The meeting starts at 11."`

### `slack messages delete`

delete messages for you only; with --for-everyone, for everyone in the chat

**Changes something in the service.**

```sh
slack messages delete <chat> <message> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the message ids, by spaces or commas, at most 10. |

| Option | What it does |
|---|---|
| `--for-everyone` | delete for everyone in the chat, not only for you — they cannot get it back. |
| `--allow-dangerous` | go ahead without the question an ask level puts before a deletion. |

**Returns:** message deletion — operation_id, chat_id, deleted, for_everyone; every field: slack commands info messages delete

**Example:** `slack personal messages delete "Book club" 101`

### `slack messages forward`

forward one message to another chat

**Changes something in the service.**

```sh
slack messages forward <chat> <message> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | the chat the message is in: a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the message id. |

| Option | What it does |
|---|---|
| `--to <chat>` | where it goes: a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `--operation-id <id>` | repeat a forward whose outcome was unknown, without risking a second copy. |

**Returns:** message write — operation_id, message, messages, scheduled_for; every field: slack commands info messages forward

**Example:** `slack personal messages forward "Book club" 101 --to "Project room"`

### `slack messages pin`

pin a message in a chat, quietly unless --notify

**Changes something in the service.**

```sh
slack messages pin <chat> <message> [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the message id. |

| Option | What it does |
|---|---|
| `--notify` | tell the chat's members about the pin. |

**Returns:** message pin — operation_id, chat_id, message_id, pinned; every field: slack commands info messages pin

**Example:** `slack personal messages pin <chat> <message>`, `slack personal messages pin <chat> <message> --notify`

### `slack messages unpin`

unpin a message in a chat

**Changes something in the service.**

```sh
slack messages unpin <chat> <message>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the message id. |

**Returns:** message pin — operation_id, chat_id, message_id, pinned; every field: slack commands info messages unpin

**Example:** `slack personal messages unpin <chat> <message>`

### `slack messages link`

a message permalink when supported, and its account-scoped locator

```sh
slack messages link <chat> [message]
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…); or a msg: locator, with no message id after it. |
| `message` | optional | the message id. |

**Returns:** message link — ref, url, access, reason, files; every field: slack commands info messages link

**Next usually:** `slack messages transcribe <chat> <message>`, `slack messages links <chat> <message>`, `slack messages show <chat> [message]`

**Example:** `slack personal messages link "Book club" 101`

### `slack messages links`

why a message is in its conversation: each link it has, and the chain of answers back to the start

```sh
slack messages links <chat> <message>
```

| Argument | | What it is |
|---|---|---|
| `chat` | required | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `message` | required | the message id. |

**Returns:** message links — chat, message, links, chain; every field: slack commands info messages links

**Example:** `slack personal messages links "Book club" 101`

### `slack messages sync`

bring a chat's history in the local store up to date, newest first; run it again to continue; --all syncs every chat; with --json, stderr carries progress lines: {"event":"progress","step":"sync","chats","chats_done","fetched"}, counts only

**Changes something on this computer only.**

```sh
slack messages sync [chat] [options]
```

| Argument | | What it is |
|---|---|---|
| `chat` | optional | a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |

| Option | What it does |
|---|---|
| `--all` | every chat, most recently active first — what search needs; the last 90d unless --since-time or --last; muted chats only with --with-muted or history_muted true. |
| `--limit <n>` | at most this many messages in this run, per chat with --all; 2000 if not given. |
| `--page-size <n>` | how many messages one request asks for; 200 if not given. |
| `--pause <duration>` | pause between pages, to stay under the provider's limits. Default: `1s`. |
| `--since-time <time>` | stop once it reaches messages older than this: ISO 8601, or 2h / 1d ago. |
| `--last <n>` | stop once the newest n messages are held. |
| `--catch-up` | prepare local search after this run; overrides search_catch_up. |
| `--no-catch-up` | skip local preparation after this run. |
| `--catch-up-chunks <n>` | at most this many local vector chunks. |
| `--catch-up-messages <n>` | skip a graph rebuild larger than this many messages. |
| `--catch-up-time <duration>` | local preparation time budget, 30s by default. |
| `--full-history` | read and keep this chat's history in full from now on, past the history limits (history_* settings). |
| `--with-muted` | with --all: also read the chats the owner muted, as history_muted true does. |
| `--background` | run as a job that outlives this command; `store jobs show` follows it. |
| `--dry-run` | only estimate how many messages, requests and minutes a full fetch would still take — from the store, no request. |

**Returns:** message sync — chat, held, ranges, missing, requests, runs, seconds, fetched, and 17 more; every field: slack commands info messages sync

**Example:** `slack personal messages sync "Book club" --last 100`

## `slack search`

find things by text: one resource when you know it (messages, notes), or search all across messages and notes; for mail, the separate memo CLI: memo search mail

### `slack search all`

search messenger messages and notes in the local store, calendar events when the store holds a calendar, and meeting transcripts, chat and summaries when it holds a meeting account — best match first; not mail (the separate memo CLI searches it: memo search mail), tasks, people, memories or projects. Use it when you do not know where something was written; search messages or notes reads one kind with all its fields

```sh
slack search all <query> [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | required | strict Lucene query: words, "phrases", AND/OR/NOT, field groups and date ranges. |

| Option | What it does |
|---|---|
| `--only <resources>` | only these resources, separated by commas: messages, notes, events, meetings. |
| `--source <accounts>` | only these accounts, separated by commas: provider:account as a hit shows it, a provider, a kind or group:<name>; each resource reads the ones of its kind. |
| `--limit <n>` | how many. |
| `--page <n>` | which page, starting at 1. |
| `--exact` | bare words and quotes match their exact form only, as exact:word does. |
| `--timezone <zone>` | the IANA timezone for calendar date boundaries. |

**Returns:** hit — kind, ref, provider, account, title, timestamp, excerpt, url, and 18 more; every field: slack commands info search all

**Example:** `slack personal search all draft`

### `slack search messages`

search messenger messages in the local store — what was read, fetched or kept by serve; optionally fetches new messages with --sync-first; --discover searches the archive only

```sh
slack search messages [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | strict Lucene query: words, "phrases", AND/OR/NOT, field groups and date ranges; with --saved, more words AND-ed to it. |

| Option | What it does |
|---|---|
| `--sync-first` | first fetch new messages within the chat, time and message bounds. |
| `--max-chats <n>` | refresh at most this many chats (default: 5). |
| `--sync-time <duration>` | stop fetching after this long (default: 30s). |
| `--max-messages <n>` | fetch at most this many messages total (default: 500). |
| `--thread` | the stored reply chain and replies instead of time neighbours; falls back when no graph exists. |
| `--thread-hops <n>` | at most this many links from the hit (default: 8). |
| `--thread-messages <n>` | at most this many messages in each thread context (default: 50). |
| `--thread-bytes <n>` | at most this many bytes of whole messages and links in each context (default: 65536). |
| `--thread-within <duration>` | messages within this long either side of the hit (default: 1d). |
| `--source <accounts>` | every account of this messenger held in the store; personal, bots or all — the same as in: in the query; or a list: group:work,telegram:Alice. |
| `--limit <n>` | how many. |
| `--page <n>` | which page, starting at 1. |
| `--newest` | newest first instead of best first. |
| `--exact` | bare words and quotes match their exact form only, as exact:word does; text: still matches every form. |
| `--context <n>` | messages before and after each hit; 2 in the terminal, 0 otherwise. |
| `--discover` | find partial word matches, eligible replies and, once messages have vectors, messages close in meaning in the local archive; results are evidence, not confirmed answers. |
| `--timezone <zone>` | the IANA timezone for calendar date boundaries. |
| `--saved <name\|id>` | run a saved search or an earlier run; options typed here replace its own. |

**Returns:** message hit — ref, timestamp, sender_name, sender_is_me, chat_title, excerpt, matched_in, score, and 9 more; every field: slack commands info search messages

**Next usually:** `slack messages transcribe <chat> <message>`, `slack messages links <chat> <message>`, `slack messages show <chat> [message]`

**Example:** `slack personal search messages draft --limit 10`

### `slack search notes`

search the notes — written in memo, or imported from a notes folder — by words and, with the local text model, by meaning; each hit says which found it and what it links to

```sh
slack search notes <query> [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | required | strict Lucene query: words, "phrases", AND/OR/NOT, tag:, source:internal (written in memo) or source:file (from a notes folder) and date ranges. |

| Option | What it does |
|---|---|
| `--source <accounts>` | only these notes accounts, separated by commas: notes:internal for notes written in memo, notes:<folder id> as a hit shows it, notes, documents or group:<name>. |
| `--filter <query>` | a query every hit must also match, found by words or by meaning. |
| `--limit <n>` | how many. |
| `--page <n>` | which page, starting at 1. |
| `--exact` | words as written only; meaning is not searched. |
| `--timezone <zone>` | the IANA timezone for calendar date boundaries. |

**Returns:** note hit — ref, source, folder_id, path, title, updated_at, kind, provider, and 6 more; every field: slack commands info search notes

**Example:** `slack personal search notes draft --limit 10`

### `slack search conversations`

the conversations nearest to a query in meaning and in words, best first, in one chat or every one — meaning after `conversations embed`; runs on this machine

**Reads from an outside service.**

```sh
slack search conversations <query> [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | required | what to look for, in your own words, in any language the model reads. |

| Option | What it does |
|---|---|
| `--model <model>` | local: a model id from `models list` (default: embeddinggemma); remote: the provider's model. |
| `--embedding-provider <provider>` | embedding provider: local or openai; flags override profile settings. |
| `--base-url <url>` | a server with OpenAI's /v1/embeddings: Gemini, Jina, or Ollama and LM Studio on this machine. |
| `--dims <n>` | remote: the vector size — needed with --base-url; shortens an OpenAI model's. |
| `--max-chats <n>` | at most this many chats; 5 with --sync-first, 20 with --catch-up if not given. |
| `--max-chunks <n>` | at most this many chunks embedded in one run; 2000 if not given. |
| `--sync-first` | first fetch new messages within the chat, time and message bounds. |
| `--sync-time <duration>` | stop fetching after this long (default: 30s). |
| `--max-messages <n>` | fetch at most this many messages total (default: 500). |
| `--chat <chat>` | only this chat: a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…). |
| `--since-time <time>` | only those still going at this ISO 8601 time, or 30m / 2h / 1d ago, or later. |
| `--filter <query>` | strict Lucene filter: any message in a conversation must match; does not change the meaning query. |
| `--source <accounts>` | accounts to search: personal, bots, all, a provider, or a list like group:work,telegram:Alice,email:me@example.com; defaults to the active account. |
| `--timezone <zone>` | IANA timezone for filter dates; system timezone by default. |
| `--limit <n>` | how many. |
| `--catch-up` | first build and embed, on this machine, the chats in scope that changed or were never built — within --max-chats and --max-chunks. |

**Returns:** conversation hit — summary, chunk, score, by, stale, source, locator, matched_in; every field: slack commands info search conversations

**Example:** `slack personal search conversations "Reviewing the project draft"`

### `slack search runs`

search recorded diagnostic metadata and events; literal words and field:value terms joined by AND; no message contents

```sh
slack search runs [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | matches per page, at most 100. |
| `--page <n>` | result page. |

**Returns:** run hit — run_id, command, started_at, status, cli_version, events, events_truncated, profile, and 21 more; every field: slack commands info search runs

**Example:** `slack personal search runs timeout status:failed --limit 10`

## `slack api`

the raw Slack API, one command per operation of its OpenAPI document

### `slack api list`

list every Slack API operation this CLI offers, without calling Slack

```sh
slack api list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Example:** `slack personal api list`, `slack personal api list effect:destructive --json=command,path`

### `slack api show`

show one operation's parameters and request schema, without calling Slack

```sh
slack api show <operation>
```

| Argument | | What it is |
|---|---|---|
| `operation` | required | the operation as api list prints it (quoted), its old name, or its operation id. |

**Example:** `slack personal api show "admin apps-approve" --json`

### `slack api admin`

the admin operations

#### `slack api admin apps-approve`

admin_apps_approve — write (POST /admin.apps.approve)

**Changes something in the service.**

```sh
slack api admin apps-approve [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin apps-approve`

#### `slack api admin apps-approved-list`

admin_apps_approved_list — read (GET /admin.apps.approved.list)

```sh
slack api admin apps-approved-list [options]
```

| Option | What it does |
|---|---|
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |
| `--enterprise-id <value>` | enterprise_id. |

**Example:** `slack personal api admin apps-approved-list`

#### `slack api admin apps-requests-list`

admin_apps_requests_list — read (GET /admin.apps.requests.list)

```sh
slack api admin apps-requests-list [options]
```

| Option | What it does |
|---|---|
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |

**Example:** `slack personal api admin apps-requests-list`

#### `slack api admin apps-restrict`

admin_apps_restrict — write (POST /admin.apps.restrict)

**Changes something in the service.**

```sh
slack api admin apps-restrict [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin apps-restrict`

#### `slack api admin apps-restricted-list`

admin_apps_restricted_list — read (GET /admin.apps.restricted.list)

```sh
slack api admin apps-restricted-list [options]
```

| Option | What it does |
|---|---|
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |
| `--enterprise-id <value>` | enterprise_id. |

**Example:** `slack personal api admin apps-restricted-list`

#### `slack api admin conversations-archive`

admin_conversations_archive — destructive (POST /admin.conversations.archive)

**Changes something in the service.**

```sh
slack api admin conversations-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-archive`

#### `slack api admin conversations-convert-to-private`

admin_conversations_convertToPrivate — write (POST /admin.conversations.convertToPrivate)

**Changes something in the service.**

```sh
slack api admin conversations-convert-to-private [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-convert-to-private`

#### `slack api admin conversations-create`

admin_conversations_create — write (POST /admin.conversations.create)

**Changes something in the service.**

```sh
slack api admin conversations-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-create`

#### `slack api admin conversations-delete`

admin_conversations_delete — destructive (POST /admin.conversations.delete)

**Changes something in the service.**

```sh
slack api admin conversations-delete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-delete`

#### `slack api admin conversations-disconnect-shared`

admin_conversations_disconnectShared — write (POST /admin.conversations.disconnectShared)

**Changes something in the service.**

```sh
slack api admin conversations-disconnect-shared [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-disconnect-shared`

#### `slack api admin conversations-ekm-list-original-connected-channel-info`

admin_conversations_ekm_listOriginalConnectedChannelInfo — read (GET /admin.conversations.ekm.listOriginalConnectedChannelInfo)

```sh
slack api admin conversations-ekm-list-original-connected-channel-info [options]
```

| Option | What it does |
|---|---|
| `--channel-ids <value>` | A comma-separated list of channels to filter to. |
| `--team-ids <value>` | A comma-separated list of the workspaces to which the channels you would like returned belong. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |

**Example:** `slack personal api admin conversations-ekm-list-original-connected-channel-info`

#### `slack api admin conversations-get-conversation-prefs`

admin_conversations_getConversationPrefs — read (GET /admin.conversations.getConversationPrefs)

```sh
slack api admin conversations-get-conversation-prefs [options]
```

| Option | What it does |
|---|---|
| `--channel-id <value>` | The channel to get preferences for. |

**Example:** `slack personal api admin conversations-get-conversation-prefs --channel-id <value>`

#### `slack api admin conversations-get-teams`

admin_conversations_getTeams — read (GET /admin.conversations.getTeams)

```sh
slack api admin conversations-get-teams [options]
```

| Option | What it does |
|---|---|
| `--channel-id <value>` | The channel to determine connected workspaces within the organization for. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api admin conversations-get-teams --channel-id <value>`

#### `slack api admin conversations-invite`

admin_conversations_invite — write (POST /admin.conversations.invite)

**Changes something in the service.**

```sh
slack api admin conversations-invite [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-invite`

#### `slack api admin conversations-rename`

admin_conversations_rename — write (POST /admin.conversations.rename)

**Changes something in the service.**

```sh
slack api admin conversations-rename [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-rename`

#### `slack api admin conversations-restrict-access-list-groups`

admin_conversations_restrictAccess_listGroups — read (GET /admin.conversations.restrictAccess.listGroups)

```sh
slack api admin conversations-restrict-access-list-groups [options]
```

| Option | What it does |
|---|---|
| `--channel-id <value>` | channel_id. |
| `--team-id <value>` | The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. |

**Example:** `slack personal api admin conversations-restrict-access-list-groups --channel-id <value>`

#### `slack api admin conversations-search`

admin_conversations_search — read (GET /admin.conversations.search)

```sh
slack api admin conversations-search [options]
```

| Option | What it does |
|---|---|
| `--team-ids <value>` | Comma separated string of team IDs, signifying the workspaces to search through. |
| `--query <value>` | Name of the the channel to query by. |
| `--limit <value>` | Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--search-channel-types <value>` | The type of channel to include or exclude in the search. For example `private` will search private channels, while `private_exclude` will exclude them. For a full list of types, check the Types section. |
| `--sort <value>` | Possible values are `relevant` (search ranking based on what we think is closest), `name` (alphabetical), `member_count` (number of users in the channel), and `created` (date channel was created). You can optionally pair this with the `sort_dir` arg to change how it is sorted. |
| `--sort-dir <value>` | Sort direction. Possible values are `asc` for ascending order like (1, 2, 3) or (a, b, c), and `desc` for descending order like (3, 2, 1) or (c, b, a). |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api admin conversations-search`

#### `slack api admin conversations-set-conversation-prefs`

admin_conversations_setConversationPrefs — write (POST /admin.conversations.setConversationPrefs)

**Changes something in the service.**

```sh
slack api admin conversations-set-conversation-prefs [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-set-conversation-prefs`

#### `slack api admin conversations-set-teams`

admin_conversations_setTeams — write (POST /admin.conversations.setTeams)

**Changes something in the service.**

```sh
slack api admin conversations-set-teams [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-set-teams`

#### `slack api admin conversations-unarchive`

admin_conversations_unarchive — write (POST /admin.conversations.unarchive)

**Changes something in the service.**

```sh
slack api admin conversations-unarchive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin conversations-unarchive`

#### `slack api admin emoji-list`

admin_emoji_list — read (GET /admin.emoji.list)

```sh
slack api admin emoji-list [options]
```

| Option | What it does |
|---|---|
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |

**Example:** `slack personal api admin emoji-list`

#### `slack api admin invite-requests-approve`

admin_inviteRequests_approve — write (POST /admin.inviteRequests.approve)

**Changes something in the service.**

```sh
slack api admin invite-requests-approve [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin invite-requests-approve`

#### `slack api admin invite-requests-approved-list`

admin_inviteRequests_approved_list — read (GET /admin.inviteRequests.approved.list)

```sh
slack api admin invite-requests-approved-list [options]
```

| Option | What it does |
|---|---|
| `--team-id <value>` | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | Value of the `next_cursor` field sent as part of the previous API response. |
| `--limit <value>` | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive. |

**Example:** `slack personal api admin invite-requests-approved-list`

#### `slack api admin invite-requests-denied-list`

admin_inviteRequests_denied_list — read (GET /admin.inviteRequests.denied.list)

```sh
slack api admin invite-requests-denied-list [options]
```

| Option | What it does |
|---|---|
| `--team-id <value>` | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | Value of the `next_cursor` field sent as part of the previous api response. |
| `--limit <value>` | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000 both inclusive. |

**Example:** `slack personal api admin invite-requests-denied-list`

#### `slack api admin invite-requests-deny`

admin_inviteRequests_deny — write (POST /admin.inviteRequests.deny)

**Changes something in the service.**

```sh
slack api admin invite-requests-deny [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin invite-requests-deny`

#### `slack api admin invite-requests-list`

admin_inviteRequests_list — read (GET /admin.inviteRequests.list)

```sh
slack api admin invite-requests-list [options]
```

| Option | What it does |
|---|---|
| `--team-id <value>` | ID for the workspace where the invite requests were made. |
| `--cursor <value>` | Value of the `next_cursor` field sent as part of the previous API response. |
| `--limit <value>` | The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive. |

**Example:** `slack personal api admin invite-requests-list`

#### `slack api admin teams-admins-list`

admin_teams_admins_list — read (GET /admin.teams.admins.list)

```sh
slack api admin teams-admins-list [options]
```

| Option | What it does |
|---|---|
| `--limit <value>` | The maximum number of items to return. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--team-id <value>` | team_id. |

**Example:** `slack personal api admin teams-admins-list --team-id <value>`

#### `slack api admin teams-create`

admin_teams_create — write (POST /admin.teams.create)

**Changes something in the service.**

```sh
slack api admin teams-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin teams-create`

#### `slack api admin teams-list`

admin_teams_list — read (GET /admin.teams.list)

```sh
slack api admin teams-list [options]
```

| Option | What it does |
|---|---|
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 100 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |

**Example:** `slack personal api admin teams-list`

#### `slack api admin teams-owners-list`

admin_teams_owners_list — read (GET /admin.teams.owners.list)

```sh
slack api admin teams-owners-list [options]
```

| Option | What it does |
|---|---|
| `--team-id <value>` | team_id. |
| `--limit <value>` | The maximum number of items to return. Must be between 1 - 1000 both inclusive. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |

**Example:** `slack personal api admin teams-owners-list --team-id <value>`

#### `slack api admin teams-settings-info`

admin_teams_settings_info — read (GET /admin.teams.settings.info)

```sh
slack api admin teams-settings-info [options]
```

| Option | What it does |
|---|---|
| `--team-id <value>` | team_id. |

**Example:** `slack personal api admin teams-settings-info --team-id <value>`

#### `slack api admin teams-settings-set-description`

admin_teams_settings_setDescription — write (POST /admin.teams.settings.setDescription)

**Changes something in the service.**

```sh
slack api admin teams-settings-set-description [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin teams-settings-set-description`

#### `slack api admin teams-settings-set-discoverability`

admin_teams_settings_setDiscoverability — write (POST /admin.teams.settings.setDiscoverability)

**Changes something in the service.**

```sh
slack api admin teams-settings-set-discoverability [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin teams-settings-set-discoverability`

#### `slack api admin teams-settings-set-name`

admin_teams_settings_setName — write (POST /admin.teams.settings.setName)

**Changes something in the service.**

```sh
slack api admin teams-settings-set-name [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin teams-settings-set-name`

#### `slack api admin usergroups-add-channels`

admin_usergroups_addChannels — write (POST /admin.usergroups.addChannels)

**Changes something in the service.**

```sh
slack api admin usergroups-add-channels [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin usergroups-add-channels`

#### `slack api admin usergroups-add-teams`

admin_usergroups_addTeams — write (POST /admin.usergroups.addTeams)

**Changes something in the service.**

```sh
slack api admin usergroups-add-teams [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin usergroups-add-teams`

#### `slack api admin usergroups-list-channels`

admin_usergroups_listChannels — read (GET /admin.usergroups.listChannels)

```sh
slack api admin usergroups-list-channels [options]
```

| Option | What it does |
|---|---|
| `--usergroup-id <value>` | ID of the IDP group to list default channels for. |
| `--team-id <value>` | ID of the the workspace. |
| `--include-num-members <value>` | Flag to include or exclude the count of members per channel. |

**Example:** `slack personal api admin usergroups-list-channels --usergroup-id <value>`

#### `slack api admin usergroups-remove-channels`

admin_usergroups_removeChannels — destructive (POST /admin.usergroups.removeChannels)

**Changes something in the service.**

```sh
slack api admin usergroups-remove-channels [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin usergroups-remove-channels`

#### `slack api admin users-assign`

admin_users_assign — write (POST /admin.users.assign)

**Changes something in the service.**

```sh
slack api admin users-assign [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-assign`

#### `slack api admin users-invite`

admin_users_invite — write (POST /admin.users.invite)

**Changes something in the service.**

```sh
slack api admin users-invite [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-invite`

#### `slack api admin users-list`

admin_users_list — read (GET /admin.users.list)

```sh
slack api admin users-list [options]
```

| Option | What it does |
|---|---|
| `--team-id <value>` | The ID (`T1234`) of the workspace. |
| `--cursor <value>` | Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. |
| `--limit <value>` | Limit for how many users to be retrieved per page. |

**Example:** `slack personal api admin users-list --team-id <value>`

#### `slack api admin users-remove`

admin_users_remove — destructive (POST /admin.users.remove)

**Changes something in the service.**

```sh
slack api admin users-remove [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-remove`

#### `slack api admin users-session-invalidate`

admin_users_session_invalidate — destructive (POST /admin.users.session.invalidate)

**Changes something in the service.**

```sh
slack api admin users-session-invalidate [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-session-invalidate`

#### `slack api admin users-session-reset`

admin_users_session_reset — destructive (POST /admin.users.session.reset)

**Changes something in the service.**

```sh
slack api admin users-session-reset [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-session-reset`

#### `slack api admin users-set-admin`

admin_users_setAdmin — write (POST /admin.users.setAdmin)

**Changes something in the service.**

```sh
slack api admin users-set-admin [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-set-admin`

#### `slack api admin users-set-expiration`

admin_users_setExpiration — write (POST /admin.users.setExpiration)

**Changes something in the service.**

```sh
slack api admin users-set-expiration [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-set-expiration`

#### `slack api admin users-set-owner`

admin_users_setOwner — write (POST /admin.users.setOwner)

**Changes something in the service.**

```sh
slack api admin users-set-owner [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-set-owner`

#### `slack api admin users-set-regular`

admin_users_setRegular — write (POST /admin.users.setRegular)

**Changes something in the service.**

```sh
slack api admin users-set-regular [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api admin users-set-regular`

### `slack api api-test`

api_test — read (GET /api.test)

```sh
slack api api-test [options]
```

| Option | What it does |
|---|---|
| `--error <value>` | Error response to return. |
| `--foo <value>` | example property to return. |

**Example:** `slack personal api api-test`

### `slack api apps`

the apps operations

#### `slack api apps event-authorizations-list`

apps_event_authorizations_list — read (GET /apps.event.authorizations.list)

```sh
slack api apps event-authorizations-list [options]
```

| Option | What it does |
|---|---|
| `--event-context <value>` | event_context. |
| `--cursor <value>` | cursor. |
| `--limit <value>` | limit. |

**Example:** `slack personal api apps event-authorizations-list --event-context <value>`

#### `slack api apps permissions-info`

apps_permissions_info — read (GET /apps.permissions.info)

```sh
slack api apps permissions-info
```

**Example:** `slack personal api apps permissions-info`

#### `slack api apps permissions-request`

apps_permissions_request — write (GET /apps.permissions.request)

**Changes something in the service.**

```sh
slack api apps permissions-request [options]
```

| Option | What it does |
|---|---|
| `--scopes <value>` | A comma separated list of scopes to request for. |
| `--trigger-id <value>` | Token used to trigger the permissions API. |

**Example:** `slack personal api apps permissions-request --scopes <value> --trigger-id <value>`

#### `slack api apps permissions-resources-list`

apps_permissions_resources_list — read (GET /apps.permissions.resources.list)

```sh
slack api apps permissions-resources-list [options]
```

| Option | What it does |
|---|---|
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--limit <value>` | The maximum number of items to return. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api apps permissions-resources-list`

#### `slack api apps permissions-scopes-list`

apps_permissions_scopes_list — read (GET /apps.permissions.scopes.list)

```sh
slack api apps permissions-scopes-list
```

**Example:** `slack personal api apps permissions-scopes-list`

#### `slack api apps permissions-users-list`

apps_permissions_users_list — read (GET /apps.permissions.users.list)

```sh
slack api apps permissions-users-list [options]
```

| Option | What it does |
|---|---|
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--limit <value>` | The maximum number of items to return. |

**Example:** `slack personal api apps permissions-users-list`

#### `slack api apps permissions-users-request`

apps_permissions_users_request — write (GET /apps.permissions.users.request)

**Changes something in the service.**

```sh
slack api apps permissions-users-request [options]
```

| Option | What it does |
|---|---|
| `--scopes <value>` | A comma separated list of user scopes to request for. |
| `--trigger-id <value>` | Token used to trigger the request. |
| `--user <value>` | The user this scope is being requested for. |

**Example:** `slack personal api apps permissions-users-request --scopes <value> --trigger-id <value> --user <value>`

#### `slack api apps uninstall`

apps_uninstall — destructive (GET /apps.uninstall)

**Changes something in the service.**

```sh
slack api apps uninstall [options]
```

| Option | What it does |
|---|---|
| `--client-id <value>` | Issued when you created your application. |
| `--client-secret <value>` | Issued when you created your application. |

**Example:** `slack personal api apps uninstall`

### `slack api auth`

the auth operations

#### `slack api auth revoke`

auth_revoke — destructive (GET /auth.revoke)

**Changes something in the service.**

```sh
slack api auth revoke [options]
```

| Option | What it does |
|---|---|
| `--test <value>` | Setting this parameter to `1` triggers a _testing mode_ where the specified token will not actually be revoked. |

**Example:** `slack personal api auth revoke`

#### `slack api auth test`

auth_test — read (GET /auth.test)

```sh
slack api auth test
```

**Example:** `slack personal api auth test`

### `slack api bots-info`

bots_info — read (GET /bots.info)

```sh
slack api bots-info [options]
```

| Option | What it does |
|---|---|
| `--bot <value>` | Bot user to get info on. |

**Example:** `slack personal api bots-info`

### `slack api calls`

the calls operations

#### `slack api calls add`

calls_add — write (POST /calls.add)

**Changes something in the service.**

```sh
slack api calls add [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api calls add`

#### `slack api calls end`

calls_end — write (POST /calls.end)

**Changes something in the service.**

```sh
slack api calls end [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api calls end`

#### `slack api calls info`

calls_info — read (GET /calls.info)

```sh
slack api calls info [options]
```

| Option | What it does |
|---|---|
| `--id <value>` | `id` of the Call returned by the [`calls.add`](https://api.slack.com/methods/calls.add) method. |

**Example:** `slack personal api calls info --id <value>`

#### `slack api calls participants-add`

calls_participants_add — write (POST /calls.participants.add)

**Changes something in the service.**

```sh
slack api calls participants-add [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api calls participants-add`

#### `slack api calls participants-remove`

calls_participants_remove — destructive (POST /calls.participants.remove)

**Changes something in the service.**

```sh
slack api calls participants-remove [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api calls participants-remove`

#### `slack api calls update`

calls_update — write (POST /calls.update)

**Changes something in the service.**

```sh
slack api calls update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api calls update`

### `slack api chat`

the chat operations

#### `slack api chat delete`

chat_delete — destructive (POST /chat.delete)

**Changes something in the service.**

```sh
slack api chat delete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat delete`

#### `slack api chat delete-scheduled-message`

chat_deleteScheduledMessage — destructive (POST /chat.deleteScheduledMessage)

**Changes something in the service.**

```sh
slack api chat delete-scheduled-message [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat delete-scheduled-message`

#### `slack api chat get-permalink`

chat_getPermalink — read (GET /chat.getPermalink)

```sh
slack api chat get-permalink [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | The ID of the conversation or channel containing the message. |
| `--message-ts <value>` | A message's `ts` value, uniquely identifying it within a channel. |

**Example:** `slack personal api chat get-permalink --channel <value> --message-ts <value>`

#### `slack api chat me-message`

chat_meMessage — write (POST /chat.meMessage)

**Changes something in the service.**

```sh
slack api chat me-message [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat me-message`

#### `slack api chat post-ephemeral`

chat_postEphemeral — write (POST /chat.postEphemeral)

**Changes something in the service.**

```sh
slack api chat post-ephemeral [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat post-ephemeral`

#### `slack api chat post-message`

chat_postMessage — write (POST /chat.postMessage)

**Changes something in the service.**

```sh
slack api chat post-message [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat post-message`

#### `slack api chat schedule-message`

chat_scheduleMessage — write (POST /chat.scheduleMessage)

**Changes something in the service.**

```sh
slack api chat schedule-message [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat schedule-message`

#### `slack api chat scheduled-messages-list`

chat_scheduledMessages_list — read (GET /chat.scheduledMessages.list)

```sh
slack api chat scheduled-messages-list [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | The channel of the scheduled messages. |
| `--latest <value>` | A UNIX timestamp of the latest value in the time range. |
| `--oldest <value>` | A UNIX timestamp of the oldest value in the time range. |
| `--limit <value>` | Maximum number of original entries to return. |
| `--cursor <value>` | For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api chat scheduled-messages-list`

#### `slack api chat unfurl`

chat_unfurl — write (POST /chat.unfurl)

**Changes something in the service.**

```sh
slack api chat unfurl [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat unfurl`

#### `slack api chat update`

chat_update — write (POST /chat.update)

**Changes something in the service.**

```sh
slack api chat update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api chat update`

### `slack api conversations`

the conversations operations

#### `slack api conversations archive`

conversations_archive — destructive (POST /conversations.archive)

**Changes something in the service.**

```sh
slack api conversations archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations archive`

#### `slack api conversations close`

conversations_close — write (POST /conversations.close)

**Changes something in the service.**

```sh
slack api conversations close [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations close`

#### `slack api conversations create`

conversations_create — write (POST /conversations.create)

**Changes something in the service.**

```sh
slack api conversations create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations create`

#### `slack api conversations history`

conversations_history — read (GET /conversations.history)

```sh
slack api conversations history [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | Conversation ID to fetch history for. |
| `--latest <value>` | End of time range of messages to include in results. |
| `--oldest <value>` | Start of time range of messages to include in results. |
| `--inclusive <value>` | Include messages with latest or oldest timestamp in results only when either timestamp is specified. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api conversations history --channel <value>`

#### `slack api conversations info`

conversations_info — read (GET /conversations.info)

```sh
slack api conversations info [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | Conversation ID to learn more about. |
| `--include-locale <value>` | Set this to `true` to receive the locale for this conversation. Defaults to `false`. |
| `--include-num-members <value>` | Set to `true` to include the member count for the specified conversation. Defaults to `false`. |

**Example:** `slack personal api conversations info --channel <value>`

#### `slack api conversations invite`

conversations_invite — write (POST /conversations.invite)

**Changes something in the service.**

```sh
slack api conversations invite [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations invite`

#### `slack api conversations join`

conversations_join — write (POST /conversations.join)

**Changes something in the service.**

```sh
slack api conversations join [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations join`

#### `slack api conversations kick`

conversations_kick — destructive (POST /conversations.kick)

**Changes something in the service.**

```sh
slack api conversations kick [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations kick`

#### `slack api conversations leave`

conversations_leave — destructive (POST /conversations.leave)

**Changes something in the service.**

```sh
slack api conversations leave [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations leave`

#### `slack api conversations list`

conversations_list — read (GET /conversations.list)

```sh
slack api conversations list [options]
```

| Option | What it does |
|---|---|
| `--exclude-archived <value>` | Set to `true` to exclude archived channels from the list. |
| `--types <value>` | Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api conversations list`

#### `slack api conversations mark`

conversations_mark — write (POST /conversations.mark)

**Changes something in the service.**

```sh
slack api conversations mark [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations mark`

#### `slack api conversations members`

conversations_members — read (GET /conversations.members)

```sh
slack api conversations members [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | ID of the conversation to retrieve members for. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api conversations members --channel <value>`

#### `slack api conversations open`

conversations_open — write (POST /conversations.open)

**Changes something in the service.**

```sh
slack api conversations open [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations open`

#### `slack api conversations rename`

conversations_rename — write (POST /conversations.rename)

**Changes something in the service.**

```sh
slack api conversations rename [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations rename`

#### `slack api conversations replies`

conversations_replies — read (GET /conversations.replies)

```sh
slack api conversations replies [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | Conversation ID to fetch thread from. |
| `--ts <value>` | Unique identifier of a thread's parent message. `ts` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by `ts` will return - it is just an ordinary, unthreaded message. |
| `--latest <value>` | End of time range of messages to include in results. |
| `--oldest <value>` | Start of time range of messages to include in results. |
| `--inclusive <value>` | Include messages with latest or oldest timestamp in results only when either timestamp is specified. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api conversations replies --channel <value> --ts <value>`

#### `slack api conversations set-purpose`

conversations_setPurpose — write (POST /conversations.setPurpose)

**Changes something in the service.**

```sh
slack api conversations set-purpose [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations set-purpose`

#### `slack api conversations set-topic`

conversations_setTopic — write (POST /conversations.setTopic)

**Changes something in the service.**

```sh
slack api conversations set-topic [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations set-topic`

#### `slack api conversations unarchive`

conversations_unarchive — write (POST /conversations.unarchive)

**Changes something in the service.**

```sh
slack api conversations unarchive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api conversations unarchive`

### `slack api dialog-open`

dialog_open — write (GET /dialog.open)

**Changes something in the service.**

```sh
slack api dialog-open [options]
```

| Option | What it does |
|---|---|
| `--dialog <value>` | The dialog definition. This must be a JSON-encoded string. |
| `--trigger-id <value>` | Exchange a trigger to post to the user. |

**Example:** `slack personal api dialog-open --dialog <value> --trigger-id <value>`

### `slack api dnd`

the dnd operations

#### `slack api dnd end-dnd`

dnd_endDnd — write (POST /dnd.endDnd)

**Changes something in the service.**

```sh
slack api dnd end-dnd
```

**Example:** `slack personal api dnd end-dnd`

#### `slack api dnd end-snooze`

dnd_endSnooze — write (POST /dnd.endSnooze)

**Changes something in the service.**

```sh
slack api dnd end-snooze
```

**Example:** `slack personal api dnd end-snooze`

#### `slack api dnd info`

dnd_info — read (GET /dnd.info)

```sh
slack api dnd info [options]
```

| Option | What it does |
|---|---|
| `--user <value>` | User to fetch status for (defaults to current user). |

**Example:** `slack personal api dnd info`

#### `slack api dnd team-info`

dnd_teamInfo — read (GET /dnd.teamInfo)

```sh
slack api dnd team-info [options]
```

| Option | What it does |
|---|---|
| `--users <value>` | Comma-separated list of users to fetch Do Not Disturb status for. |

**Example:** `slack personal api dnd team-info`

### `slack api emoji-list`

emoji_list — read (GET /emoji.list)

```sh
slack api emoji-list
```

**Example:** `slack personal api emoji-list`

### `slack api files`

the files operations

#### `slack api files comments-delete`

files_comments_delete — destructive (POST /files.comments.delete)

**Changes something in the service.**

```sh
slack api files comments-delete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api files comments-delete`

#### `slack api files delete`

files_delete — destructive (POST /files.delete)

**Changes something in the service.**

```sh
slack api files delete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api files delete`

#### `slack api files info`

files_info — read (GET /files.info)

```sh
slack api files info [options]
```

| Option | What it does |
|---|---|
| `--file <value>` | Specify a file by providing its ID. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--cursor <value>` | Parameter for pagination. File comments are paginated for a single file. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection of comments. See [pagination](https://api.slack.com/docs/pagination) for more details. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api files info`

#### `slack api files list`

files_list — read (GET /files.list)

```sh
slack api files list [options]
```

| Option | What it does |
|---|---|
| `--user <value>` | Filter files created by a single user. |
| `--channel <value>` | Filter files appearing in a specific channel, indicated by its ID. |
| `--ts-from <value>` | Filter files created after this timestamp (inclusive). |
| `--ts-to <value>` | Filter files created before this timestamp (inclusive). |
| `--types <value>` | Filter files by type (see below). You can pass multiple values in the types argument, like `types=spaces,snippets`.The default value is `all`, which does not filter the list. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--show-files-hidden-by-limit <value>` | Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api files list`

#### `slack api files remote-info`

files_remote_info — read (GET /files.remote.info)

```sh
slack api files remote-info [options]
```

| Option | What it does |
|---|---|
| `--file <value>` | Specify a file by providing its ID. |
| `--external-id <value>` | Creator defined GUID for the file. |

**Example:** `slack personal api files remote-info`

#### `slack api files remote-list`

files_remote_list — read (GET /files.remote.list)

```sh
slack api files remote-list [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | Filter files appearing in a specific channel, indicated by its ID. |
| `--ts-from <value>` | Filter files created after this timestamp (inclusive). |
| `--ts-to <value>` | Filter files created before this timestamp (inclusive). |
| `--limit <value>` | The maximum number of items to return. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |

**Example:** `slack personal api files remote-list`

#### `slack api files remote-share`

files_remote_share — write (GET /files.remote.share)

**Changes something in the service.**

```sh
slack api files remote-share [options]
```

| Option | What it does |
|---|---|
| `--file <value>` | Specify a file registered with Slack by providing its ID. Either this field or `external_id` or both are required. |
| `--external-id <value>` | The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or `file` or both are required. |
| `--channels <value>` | Comma-separated list of channel IDs where the file will be shared. |

**Example:** `slack personal api files remote-share`

#### `slack api files revoke-public-url`

files_revokePublicURL — destructive (POST /files.revokePublicURL)

**Changes something in the service.**

```sh
slack api files revoke-public-url [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api files revoke-public-url`

#### `slack api files shared-public-url`

files_sharedPublicURL — write (POST /files.sharedPublicURL)

**Changes something in the service.**

```sh
slack api files shared-public-url [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api files shared-public-url`

### `slack api migration-exchange`

migration_exchange — read (GET /migration.exchange)

```sh
slack api migration-exchange [options]
```

| Option | What it does |
|---|---|
| `--users <value>` | A comma-separated list of user ids, up to 400 per request. |
| `--team-id <value>` | Specify team_id starts with `T` in case of Org Token. |
| `--to-old <value>` | Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`. |

**Example:** `slack personal api migration-exchange --users <value>`

### `slack api pins`

the pins operations

#### `slack api pins add`

pins_add — write (POST /pins.add)

**Changes something in the service.**

```sh
slack api pins add [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api pins add`

#### `slack api pins list`

pins_list — read (GET /pins.list)

```sh
slack api pins list [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | Channel to get pinned items for. |

**Example:** `slack personal api pins list --channel <value>`

#### `slack api pins remove`

pins_remove — destructive (POST /pins.remove)

**Changes something in the service.**

```sh
slack api pins remove [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api pins remove`

### `slack api reactions`

the reactions operations

#### `slack api reactions add`

reactions_add — write (POST /reactions.add)

**Changes something in the service.**

```sh
slack api reactions add [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api reactions add`

#### `slack api reactions get`

reactions_get — read (GET /reactions.get)

```sh
slack api reactions get [options]
```

| Option | What it does |
|---|---|
| `--channel <value>` | Channel where the message to get reactions for was posted. |
| `--file <value>` | File to get reactions for. |
| `--file-comment <value>` | File comment to get reactions for. |
| `--full <value>` | If true always return the complete reaction list. |
| `--timestamp <value>` | Timestamp of the message to get reactions for. |

**Example:** `slack personal api reactions get`

#### `slack api reactions list`

reactions_list — read (GET /reactions.list)

```sh
slack api reactions list [options]
```

| Option | What it does |
|---|---|
| `--user <value>` | Show reactions made by this user. Defaults to the authed user. |
| `--full <value>` | If true always return the complete reaction list. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--cursor <value>` | Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more details. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api reactions list`

#### `slack api reactions remove`

reactions_remove — destructive (POST /reactions.remove)

**Changes something in the service.**

```sh
slack api reactions remove [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api reactions remove`

### `slack api reminders`

the reminders operations

#### `slack api reminders add`

reminders_add — write (POST /reminders.add)

**Changes something in the service.**

```sh
slack api reminders add [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api reminders add`

#### `slack api reminders complete`

reminders_complete — write (POST /reminders.complete)

**Changes something in the service.**

```sh
slack api reminders complete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api reminders complete`

#### `slack api reminders delete`

reminders_delete — destructive (POST /reminders.delete)

**Changes something in the service.**

```sh
slack api reminders delete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api reminders delete`

#### `slack api reminders info`

reminders_info — read (GET /reminders.info)

```sh
slack api reminders info [options]
```

| Option | What it does |
|---|---|
| `--reminder <value>` | The ID of the reminder. |

**Example:** `slack personal api reminders info`

#### `slack api reminders list`

reminders_list — read (GET /reminders.list)

```sh
slack api reminders list
```

**Example:** `slack personal api reminders list`

### `slack api search-messages`

search_messages — read (GET /search.messages)

```sh
slack api search-messages [options]
```

| Option | What it does |
|---|---|
| `--count <value>` | Pass the number of results you want per "page". Maximum of `100`. |
| `--highlight <value>` | Pass a value of `true` to enable query highlight markers (see below). |
| `--page <value>` | page. |
| `--query <value>` | Search query. |
| `--sort <value>` | Return matches sorted by either `score` or `timestamp`. |
| `--sort-dir <value>` | Change sort direction to ascending (`asc`) or descending (`desc`). |

**Example:** `slack personal api search-messages --query <value>`

### `slack api stars`

the stars operations

#### `slack api stars add`

stars_add — write (POST /stars.add)

**Changes something in the service.**

```sh
slack api stars add [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api stars add`

#### `slack api stars list`

stars_list — read (GET /stars.list)

```sh
slack api stars list [options]
```

| Option | What it does |
|---|---|
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--cursor <value>` | Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more details. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api stars list`

#### `slack api stars remove`

stars_remove — destructive (POST /stars.remove)

**Changes something in the service.**

```sh
slack api stars remove [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api stars remove`

### `slack api team`

the team operations

#### `slack api team access-logs`

team_accessLogs — read (GET /team.accessLogs)

```sh
slack api team access-logs [options]
```

| Option | What it does |
|---|---|
| `--before <value>` | End of time range of logs to include in results (inclusive). |
| `--count <value>` | count. |
| `--page <value>` | page. |

**Example:** `slack personal api team access-logs`

#### `slack api team billable-info`

team_billableInfo — read (GET /team.billableInfo)

```sh
slack api team billable-info [options]
```

| Option | What it does |
|---|---|
| `--user <value>` | A user to retrieve the billable information for. Defaults to all users. |

**Example:** `slack personal api team billable-info`

#### `slack api team info`

team_info — read (GET /team.info)

```sh
slack api team info [options]
```

| Option | What it does |
|---|---|
| `--team <value>` | Team to get info on, if omitted, will return information about the current team. Will only return team that the authenticated token is allowed to see through external shared channels. |

**Example:** `slack personal api team info`

#### `slack api team integration-logs`

team_integrationLogs — read (GET /team.integrationLogs)

```sh
slack api team integration-logs [options]
```

| Option | What it does |
|---|---|
| `--app-id <value>` | Filter logs to this Slack app. Defaults to all logs. |
| `--change-type <value>` | Filter logs with this change type. Defaults to all logs. |
| `--count <value>` | count. |
| `--page <value>` | page. |
| `--service-id <value>` | Filter logs to this service. Defaults to all logs. |
| `--user <value>` | Filter logs generated by this user’s actions. Defaults to all logs. |

**Example:** `slack personal api team integration-logs`

#### `slack api team profile-get`

team_profile_get — read (GET /team.profile.get)

```sh
slack api team profile-get [options]
```

| Option | What it does |
|---|---|
| `--visibility <value>` | Filter by visibility. |

**Example:** `slack personal api team profile-get`

### `slack api usergroups`

the usergroups operations

#### `slack api usergroups create`

usergroups_create — write (POST /usergroups.create)

**Changes something in the service.**

```sh
slack api usergroups create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api usergroups create`

#### `slack api usergroups disable`

usergroups_disable — destructive (POST /usergroups.disable)

**Changes something in the service.**

```sh
slack api usergroups disable [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api usergroups disable`

#### `slack api usergroups enable`

usergroups_enable — write (POST /usergroups.enable)

**Changes something in the service.**

```sh
slack api usergroups enable [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api usergroups enable`

#### `slack api usergroups list`

usergroups_list — read (GET /usergroups.list)

```sh
slack api usergroups list [options]
```

| Option | What it does |
|---|---|
| `--include-users <value>` | Include the list of users for each User Group. |
| `--include-count <value>` | Include the number of users in each User Group. |
| `--include-disabled <value>` | Include disabled User Groups. |

**Example:** `slack personal api usergroups list`

#### `slack api usergroups update`

usergroups_update — write (POST /usergroups.update)

**Changes something in the service.**

```sh
slack api usergroups update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api usergroups update`

#### `slack api usergroups users-list`

usergroups_users_list — read (GET /usergroups.users.list)

```sh
slack api usergroups users-list [options]
```

| Option | What it does |
|---|---|
| `--include-disabled <value>` | Allow results that involve disabled User Groups. |
| `--usergroup <value>` | The encoded ID of the User Group to update. |

**Example:** `slack personal api usergroups users-list --usergroup <value>`

#### `slack api usergroups users-update`

usergroups_users_update — write (POST /usergroups.users.update)

**Changes something in the service.**

```sh
slack api usergroups users-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api usergroups users-update`

### `slack api users`

the users operations

#### `slack api users conversations`

users_conversations — read (GET /users.conversations)

```sh
slack api users conversations [options]
```

| Option | What it does |
|---|---|
| `--user <value>` | Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership. |
| `--types <value>` | Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`. |
| `--exclude-archived <value>` | Set to `true` to exclude archived channels from the list. |
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api users conversations`

#### `slack api users get-presence`

users_getPresence — read (GET /users.getPresence)

```sh
slack api users get-presence [options]
```

| Option | What it does |
|---|---|
| `--user <value>` | User to get presence info on. Defaults to the authed user. |

**Example:** `slack personal api users get-presence`

#### `slack api users identity`

users_identity — read (GET /users.identity)

```sh
slack api users identity
```

**Example:** `slack personal api users identity`

#### `slack api users info`

users_info — read (GET /users.info)

```sh
slack api users info [options]
```

| Option | What it does |
|---|---|
| `--include-locale <value>` | Set this to `true` to receive the locale for this user. Defaults to `false`. |
| `--user <value>` | User to get info on. |

**Example:** `slack personal api users info`

#### `slack api users list`

users_list — read (GET /users.list)

```sh
slack api users list [options]
```

| Option | What it does |
|---|---|
| `--limit <value>` | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no `limit` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience `limit_required` or HTTP 500 errors. |
| `--cursor <value>` | Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](https://api.slack.com/docs/pagination) for more detail. |
| `--include-locale <value>` | Set this to `true` to receive the locale for users. Defaults to `false`. |
| `--all` | read every page, as the API pages it. |

**Example:** `slack personal api users list`

#### `slack api users lookup-by-email`

users_lookupByEmail — read (GET /users.lookupByEmail)

```sh
slack api users lookup-by-email [options]
```

| Option | What it does |
|---|---|
| `--email <value>` | An email address belonging to a user in the workspace. |

**Example:** `slack personal api users lookup-by-email --email <value>`

#### `slack api users profile-get`

users_profile_get — read (GET /users.profile.get)

```sh
slack api users profile-get [options]
```

| Option | What it does |
|---|---|
| `--include-labels <value>` | Include labels for each ID in custom profile fields. |
| `--user <value>` | User to retrieve profile info for. |

**Example:** `slack personal api users profile-get`

#### `slack api users profile-set`

users_profile_set — write (POST /users.profile.set)

**Changes something in the service.**

```sh
slack api users profile-set [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api users profile-set`

#### `slack api users set-active`

users_setActive — write (POST /users.setActive)

**Changes something in the service.**

```sh
slack api users set-active
```

**Example:** `slack personal api users set-active`

#### `slack api users set-presence`

users_setPresence — write (POST /users.setPresence)

**Changes something in the service.**

```sh
slack api users set-presence [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `slack personal api users set-presence`

### `slack api views`

the views operations

#### `slack api views open`

views_open — write (GET /views.open)

**Changes something in the service.**

```sh
slack api views open [options]
```

| Option | What it does |
|---|---|
| `--trigger-id <value>` | Exchange a trigger to post to the user. |
| `--view <value>` | A [view payload](https://api.slack.com/reference/surfaces/views). This must be a JSON-encoded string. |

**Example:** `slack personal api views open --trigger-id <value> --view <value>`

#### `slack api views publish`

views_publish — write (GET /views.publish)

**Changes something in the service.**

```sh
slack api views publish [options]
```

| Option | What it does |
|---|---|
| `--user-id <value>` | `id` of the user you want publish a view to. |
| `--view <value>` | A [view payload](https://api.slack.com/reference/surfaces/views). This must be a JSON-encoded string. |
| `--hash <value>` | A string that represents view state to protect against possible race conditions. |

**Example:** `slack personal api views publish --user-id <value> --view <value>`

#### `slack api views push`

views_push — write (GET /views.push)

**Changes something in the service.**

```sh
slack api views push [options]
```

| Option | What it does |
|---|---|
| `--trigger-id <value>` | Exchange a trigger to post to the user. |
| `--view <value>` | A [view payload](https://api.slack.com/reference/surfaces/views). This must be a JSON-encoded string. |

**Example:** `slack personal api views push --trigger-id <value> --view <value>`

#### `slack api views update`

views_update — write (GET /views.update)

**Changes something in the service.**

```sh
slack api views update [options]
```

| Option | What it does |
|---|---|
| `--view-id <value>` | A unique identifier of the view to be updated. Either `view_id` or `external_id` is required. |
| `--external-id <value>` | A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either `view_id` or `external_id` is required. |
| `--view <value>` | A [view object](https://api.slack.com/reference/surfaces/views). This must be a JSON-encoded string. |
| `--hash <value>` | A string that represents view state to protect against possible race conditions. |

**Example:** `slack personal api views update`

### `slack api workflows`

the workflows operations

#### `slack api workflows step-completed`

workflows_stepCompleted — write (GET /workflows.stepCompleted)

**Changes something in the service.**

```sh
slack api workflows step-completed [options]
```

| Option | What it does |
|---|---|
| `--workflow-step-execute-id <value>` | Context identifier that maps to the correct workflow step execution. |
| `--outputs <value>` | Key-value object of outputs from your step. Keys of this object reflect the configured `key` properties of your [`outputs`](https://api.slack.com/reference/workflows/workflow_step#output) array from your `workflow_step` object. |

**Example:** `slack personal api workflows step-completed --workflow-step-execute-id <value>`

#### `slack api workflows step-failed`

workflows_stepFailed — write (GET /workflows.stepFailed)

**Changes something in the service.**

```sh
slack api workflows step-failed [options]
```

| Option | What it does |
|---|---|
| `--workflow-step-execute-id <value>` | Context identifier that maps to the correct workflow step execution. |
| `--error <value>` | A JSON-based object with a `message` property that should contain a human readable error message. |

**Example:** `slack personal api workflows step-failed --workflow-step-execute-id <value> --error <value>`

#### `slack api workflows update-step`

workflows_updateStep — write (GET /workflows.updateStep)

**Changes something in the service.**

```sh
slack api workflows update-step [options]
```

| Option | What it does |
|---|---|
| `--workflow-step-edit-id <value>` | A context identifier provided with `view_submission` payloads used to call back to `workflows.updateStep`. |
| `--inputs <value>` | A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. **Please note**: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. [Read more about variables in workflow steps here](https://api.slack.com/workflows/steps#variables). |
| `--outputs <value>` | An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed. |
| `--step-name <value>` | An optional field that can be used to override the step name that is shown in the Workflow Builder. |
| `--step-image-url <value>` | An optional field that can be used to override app image that is shown in the Workflow Builder. |

**Example:** `slack personal api workflows update-step --workflow-step-edit-id <value>`

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
| `name` | optional | a part of this skill, or a skill shipped for a task: api-workflows, api-views, api-users, api-usergroups, api-team, api-stars, api-search, api-reminders, api-reactions, api-pins, api-migration, api-files, api-emoji, api-dnd, api-dialog, api-conversations, api-chat, api-calls, api-bots, api-auth, api-apps, api-api, api-admin, api, follow-ups, link-conversations. |

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
| `--permission <key=level>` | make a permission stricter for this server only, like messages.list=deny; it never loosens the profile; repeat for more keys. |
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
| `--permission <key=level>` | make a permission stricter for this server only, like messages.list=deny; it never loosens the profile; repeat for more keys. |
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
| `--permission <key=level>` | make a permission stricter for this server only, like messages.list=deny; it never loosens the profile; repeat for more keys. |

**Example:** `slack personal mcp add codex --allow-writes`

### `slack mcp check`

check this profile's local MCP handshake and tool list

```sh
slack mcp check [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like messages.list=deny; it never loosens the profile; repeat for more keys. |

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
| `setting` | required | one of: limit, timeout_ms, color, sender_colors, record, record_input, keep_runs_for_days, keep_successful_runs_for_days, keep_store_runs_for_days, runs_size_limit_mb, permissions, sends_per_hour, requests_per_minute, transcribe_with, speech_model, search_catch_up, history_dialog_days, history_group_days, history_group_members_max, history_muted, picture_search, search_reranker, embedding_provider, embedding_model, embedding_base_url, embedding_dims, models, thread_window_days, read_other_bots, update_check, skill_hint, search_stemmers.cyrillic, search_stemmers.latin, owner_languages, phone_countries, task_categories.<name>, task_agent_close, task_agent_close_min, task_first_pass_per_chat, account_groups.<name>, crm.<provider>:<account>.links, crm.<provider>:<account>.company-types, crm.<provider>:<account>.scope, crm.<provider>:<account>.unassigned, crm.<provider>:<account>.self, crm.<provider>:<account>.stage-tasks, crm.<provider>:<account>.activities, crm.<provider>:<account>.files.max_files, crm.<provider>:<account>.files.max_file_mb, crm.<provider>:<account>.files.max_run_mb, crm.<provider>:<account>.files.run_minutes, crm.<provider>:<account>.files.days, crm.<provider>:<account>.files.max_total_mb. |
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
| `setting` | required | one of: limit, timeout_ms, color, sender_colors, record, record_input, keep_runs_for_days, keep_successful_runs_for_days, keep_store_runs_for_days, runs_size_limit_mb, permissions, sends_per_hour, requests_per_minute, transcribe_with, speech_model, search_catch_up, history_dialog_days, history_group_days, history_group_members_max, history_muted, picture_search, search_reranker, embedding_provider, embedding_model, embedding_base_url, embedding_dims, models, thread_window_days, read_other_bots, update_check, skill_hint, search_stemmers.cyrillic, search_stemmers.latin, owner_languages, phone_countries, task_categories.<name>, task_agent_close, task_agent_close_min, task_first_pass_per_chat, account_groups.<name>, crm.<provider>:<account>.links, crm.<provider>:<account>.company-types, crm.<provider>:<account>.scope, crm.<provider>:<account>.unassigned, crm.<provider>:<account>.self, crm.<provider>:<account>.stage-tasks, crm.<provider>:<account>.activities, crm.<provider>:<account>.files.max_files, crm.<provider>:<account>.files.max_file_mb, crm.<provider>:<account>.files.max_run_mb, crm.<provider>:<account>.files.run_minutes, crm.<provider>:<account>.files.days, crm.<provider>:<account>.files.max_total_mb. |

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
