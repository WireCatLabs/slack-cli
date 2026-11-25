### Added

- **`inbox` counts a mention of a user group you are in.** A channel you do not follow now shows when a message after
  your last read names a group of yours, such as `@devs`. Slack's group list is asked once a run, and only when a
  message names a group; a workspace that refuses it is named in `missing`.

### Fixed

- **`inbox` no longer stops at the DM with Slackbot.** Slack lists that DM but answers `channel_not_found` when asked
  about it; inbox now skips it and counts the other chats.
- **`inbox` reads a channel you have never opened.** Slack gives such a channel a zero last-read mark and then refuses
  that mark back, so inbox stopped there; it now counts the channel from its newest message.
