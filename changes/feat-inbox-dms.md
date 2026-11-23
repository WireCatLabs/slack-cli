### Added

- **`slk personal inbox`: the DMs with unread messages, and their newest ones.** Slack gives unread counts for DMs
  only, one `conversations.info` call each, so `inbox` asks up to 40 DMs and group DMs a run, and `missing` says how
  many it counted and that channels were not. `chats list` stays one cheap list. `inbox --new` and `review` see these
  chats' last message times, so they now find new DM messages too.
