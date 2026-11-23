### Added

- **`slk personal inbox`: the DMs with unread messages, and their newest ones.** Slack gives unread counts for DMs
  only, one `conversations.info` call each, so `inbox` asks up to 40 DMs and group DMs a run, and `missing` says how
  many it counted and that channels were not. `chats list` stays one cheap list. `inbox --new` and `review` see these
  chats' last message times, so they now find new DM messages too.

### Fixed

- **Signing in no longer needs help.** `slk session start` prints the steps to the token before it asks: why an app of
  your own, the link that makes it, where **Install to Workspace** and the **User OAuth Token** (`xoxp-…`) are, and
  what to do when only an administrator may install apps. `slk <profile> setup`, WireCat Desktop and the README show
  the same steps.
