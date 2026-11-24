### Added

- **`slk inbox` covers channels.** Name the channels whose every message matters with
  `slk <profile> config set inbox_channels "#general, #dev"`, or count them all with `inbox_all_channels true`. Any
  other channel shows up only when a message after your last read mentions you, or says @here, @channel or
  @everyone. Slack gives a channel no unread count, so inbox reads what came after your last read, for 15 seconds at
  most, and `missing` names what it did not reach and why.
- **History and conversation reads go at Slack's 50 a minute.** `conversations.history`, `.info`, `.replies` and
  `users.conversations` keep a pace of their own, apart from the 20 a minute of the other methods, as Slack's
  [rate limit tiers](https://docs.slack.dev/apis/web-api/rate-limits/) allow.
