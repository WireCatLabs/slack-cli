### Added

- **`inbox` shows new replies in the threads you follow.** Slack counts a thread you started, replied to or were
  mentioned in as followed, and keeps where you read it to. A channel's unread messages now include the replies after
  that point, each with `threadRootId`, and they count as meant for you, so a channel you do not follow shows too.
  Threads started within `thread_window_days` (14 by default) are looked at; thread replies in DMs are not read yet.
