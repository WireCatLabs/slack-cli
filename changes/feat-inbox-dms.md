### Added

- **`slk personal inbox`: the DMs with unread messages, and their newest ones.** Slack gives unread counts for DMs
  only, one `conversations.info` call each, so `inbox` counts up to 40 DMs a run and says when it stopped short;
  `chats list` stays one cheap list. `inbox --new` and `review` read the same counts.
