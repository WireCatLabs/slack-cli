### Added

- **Read Slack with the messenger commands.** `slk <profile> chats list|show|events`, `chats members list`,
  `contacts list|show`, `messages list|show|context|download` and `search` work as in every WireCat messenger CLI.
  A DM is a dialog, every channel and group DM a group, with `slack_kind` and `slack_shared` (Slack Connect) beside
  it. Message text is plain, with names for `<@U…>` and `<#C…>`; mentions are user ids; reactions keep who reacted.
  Bot messages are marked, and service messages (joins, renames, topics) are chat events, not messages.
- **Threads:** `slk <profile> messages list <chat> topic:<root ts>` reads one thread, root first. A reply sent also
  to the channel is kept once.
- **`slk <profile> messages sync`** saves a chat's history for search, with the new replies of threads it pages
  through and of threads up to `thread_window_days` (14 by default) old, through cli-core's `threadReplies`. A
  message Slack stops showing is never marked deleted.
- **`slk <profile> setup`** signs in step by step, with the same token checks as `session start`.
- **Files** download from `files.slack.com` only, with the token in the header.
- **Write to Slack with the messenger commands.** `messages send|edit|delete|pin|unpin|link`, `reactions add|remove`
  and `chats mark-read|join|leave`. Text is sent as typed; `--md` turns Markdown into Slack's mrkdwn. `--reply-to`
  answers in the thread, and `--file` uploads through Slack's external upload. A write with no answer is reported as
  unknown and never sent twice; a repeat with its `--operation-id` finds the copy Slack kept. A message to a person
  with no DM yet opens one. Slack's refusals carry a reason of their own, such as `message.not-yours` and
  `chat.not-joined`, with Slack's code in `details.slack_error`.
- **The `api` group answers by the messenger's keys.** A deny on `messages` stops `api conversations history`,
  `replies`, the searches, files, pins, stars and reactions lists too, and those keep `messages list`'s level instead
  of asking; an `api` write still asks. A refusal Slack sends with HTTP 200 is the run's error. An agent never runs an `api` delete, and its
  `messages delete` is refused as a permission. A profile never signed in is named as unknown with the profiles here,
  even when the keyring cannot be read.
- **`reactions add` takes the emoji itself** (`👍`, `👍🏽`) as well as Slack's name for it (`thumbsup`,
  `thumbsup::skin-tone-4`).
- **`slk <profile> messages send --reply-to <ts> --also-to-channel`** shows a thread reply in the channel too,
  as Slack's "Also send to #channel".

### Changed — may break callers

- **The command is `slk`, with `wcat-slk` beside it**, not `slack`: Slack's own developer CLI installs as `slack`.
  The MCP tools are `slk_read`, `slk_write` and `slk_tools_search`.
