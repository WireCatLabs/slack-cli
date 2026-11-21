### Added

- **Read Slack with the messenger commands.** `slack <profile> chats list|show|events`, `chats members list`,
  `contacts list|show`, `messages list|show|context|download` and `search` work as in every WireCat messenger CLI.
  A DM is a dialog, every channel and group DM a group, with `slack_kind` and `slack_shared` (Slack Connect) beside
  it. Message text is plain, with names for `<@U…>` and `<#C…>`; mentions are user ids; reactions keep who reacted.
  Bot messages are marked, and service messages (joins, renames, topics) are chat events, not messages.
- **Threads:** `slack <profile> messages list <chat> topic:<root ts>` reads one thread, root first. A reply sent also
  to the channel is kept once.
- **`slack <profile> messages sync`** saves a chat's history for search, with new replies of threads up to
  `thread_window_days` (14 by default) old. A message Slack stops showing is never marked deleted.
- **`slack <profile> setup`** signs in step by step, with the same token checks as `session start`.
- **Files** download from `files.slack.com` only, with the token in the header.
