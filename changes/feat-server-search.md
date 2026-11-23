### Added

- **`search messages` and `search all` ask Slack's own search too.** They read `search.messages` and the local
  copy at once, so a message is found before any sync, with its chat's name. `--backend server` or `archive` asks
  one of them; `chat:` narrows it with Slack's `in:`. It needs the `search:read` scope, which the app manifest
  already asks for.
- **`config show` lists `thread_window_days`** with its default, 14, and what it does.
- **`setup` and the README link to Slack's app creation with the manifest filled in.** One click opens
  **Create New App** with slk's scopes; pasting `docs/slack-app-manifest.json` by hand still works.
