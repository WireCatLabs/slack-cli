### Added

- **`search messages` and `search all` ask Slack's own search too.** It reads `search.messages` and the local copy at once, so a
  message is found before any sync, with its chat's name and, for a reply, its thread. `--backend server` or
  `archive` asks one of them; `chat:` narrows it with Slack's `in:`. It needs the `search:read` scope, which the
  app manifest already asks for.
- **`config show` lists `thread_window_days`** with its default, 14, and what it does.
