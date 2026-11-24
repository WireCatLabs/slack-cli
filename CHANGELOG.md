# Changelog

Notable changes to `@wirecat/slack-cli`. One section per version, newest first.

## 0.1.0 — 24.11.2026

### Added

- Started from `@wirecat/cli-template` 0.32.0.
- **`slk inbox` covers channels.** Name the channels whose every message matters with
  `slk <profile> config set inbox_channels "#general, #dev"`, or count them all with `inbox_all_channels true`. Any
  other channel shows up only when a message after your last read mentions you, or says @here, @channel or
  @everyone. Slack gives a channel no unread count, so inbox reads what came after your last read, for 15 seconds at
  most, and `missing` names what it did not reach and why.
- **History and conversation reads go at Slack's 50 a minute.** `conversations.history`, `.info`, `.replies` and
  `users.conversations` keep a pace of their own, apart from the 20 a minute of the other methods, as Slack's
  [rate limit tiers](https://docs.slack.dev/apis/web-api/rate-limits/) allow.
- **`slk personal inbox`: the DMs with unread messages, and their newest ones.** Slack gives unread counts for DMs
  only, one `conversations.info` call each, so `inbox` asks up to 40 DMs and group DMs a run, and `missing` says how
  many it counted and that channels were not. `chats list` stays one cheap list. `inbox --new` and `review` see these
  chats' last message times, so they now find new DM messages too.
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
- **`search messages` and `search all` ask Slack's own search too.** They read `search.messages` and the local
  copy at once, so a message is found before any sync, with its chat's name. `--backend server` or `archive` asks
  one of them; `chat:` narrows it with Slack's `in:`. It needs the `search:read` scope, which the app manifest
  already asks for.
- **`config show` lists `thread_window_days`** with its default, 14, and what it does.
- **`setup` and the README link to Slack's app creation with the manifest filled in.** One click opens
  **Create New App** with slk's scopes; pasting `docs/slack-app-manifest.json` by hand still works.
- **Sign in with your own Slack app: `slk <profile> session start`.** Make an app in your workspace from
  [the manifest](docs/slack-app-manifest.json), install it, and paste its User OAuth Token (`xoxp-`) at the hidden
  prompt or on stdin. slack checks it with Slack's `auth.test` and keeps it in the system keyring, with the
  workspace and the person it belongs to. A bot token (`xoxb-`) and a rotating one (`xoxe.`) are refused before
  anything is sent: slack reads as you, and cannot renew a token that lasts 12 hours. `session status --check`,
  `session list` and `session end` work as in every WireCat CLI.
- **`slk doctor --online` asks Slack whose each saved token is,** every profile signed in here under its own name.
- **`slk <profile> api` reaches Slack's Web API,** one command per method, grouped by Slack's first word:
  `slk <profile> api conversations history --channel <id>`, `slk <profile> api chat post-message --body …`.
  The token goes in the `Authorization: Bearer` header only. Writes go as JSON. `--all` reads every page of the
  methods Slack pages by cursor, and of `files list` by page. A method also asks for the key of the messenger
  command that does the same thing: `messages.delete` for `chat delete`, `messages.edit` for `chat update`,
  `messages.send` for `chat post-message`, `chats.leave` for `conversations leave`, `chats.archive` for
  `conversations archive`, `messages.unpin` for `pins remove`, `reactions.remove` for `reactions remove`. Any other
  delete asks for `slack.delete`. Eleven GETs that send, share or publish (`views publish`, `files remote-share` …)
  count as writes: a read-only profile refuses them, and they are never sent twice. The 15 methods that take only a
  form and the four that answer with a token or a secret link are left out, each with its reason in `slk api show`
  and [API coverage](docs/dev/API_COVERAGE.md).

### Changed — may break callers

- **Commands Slack cannot do are gone from help, the commands page and MCP.** `chats links show|reset`,
  `chats requests`, `chats admins`, `chats folders`, `account sessions`, `contacts block|unblock` and
  `messages forward` refused when typed; cli-core 0.730.0 now hides them and the groups left empty.
- **The command is `slk`, with `wcat-slk` beside it**, not `slack`: Slack's own developer CLI installs as `slack`.
  The MCP tools are `slk_read`, `slk_write` and `slk_tools_search`.

### Fixed

- **`messages list --after` and `messages context` in a busy chat read a few pages, not every message since.** The
  window after the point is halved while it holds too many to read, so 50,000 messages in a day cost 10 calls, not
  51.
- **A missing scope carries the shared reason `oauth.scope-missing`**, so a refused server search says what to add.
- **`slk session start` prints its steps with headings, and the app's long link as one short link** in a terminal
  that shows links (GNOME Terminal, iTerm2, kitty, WezTerm, Windows Terminal, VS Code; `FORCE_HYPERLINK=1`
  for another). Elsewhere it prints the full address beside the words.
- **Signing in no longer needs help.** `slk session start` prints the steps to the token before it asks: why an app of
  your own, the link that makes it, where **Install to Workspace** and the **User OAuth Token** (`xoxp-…`) are, and
  what to do when only an administrator may install apps. `slk <profile> setup`, WireCat Desktop and the README show
  the same steps.
- **The sign-in ask names `slk`.** It said the manifest "slack" gives.
- **`slk inbox` answers within a command's 30 seconds**: it asks DMs for 20 seconds at most, then says how many it
  counted, where 40 DMs at Slack's pace took two minutes and the command timed out with nothing.
- **A server search stops when cli-core's bound ends it.** `search.messages` calls take the search's own stop
  signal, so a slow search no longer spends Slack's pace after its answer is given.
- **The agent skill names `slk help`.** It said `slack help`.
- **A stopped `messages sync` keeps the thread replies it read.** Replies come one thread at a time, and cli-core
  0.733.0 saves each thread as it arrives, so a sync killed in a chat with many threads loses at most the thread it was
  reading.
