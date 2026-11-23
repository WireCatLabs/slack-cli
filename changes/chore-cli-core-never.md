### Changed — may break callers

- **Commands Slack cannot do are gone from help, the commands page and MCP.** `chats links show|reset`,
  `chats requests`, `chats admins`, `chats folders`, `account sessions`, `contacts block|unblock` and
  `messages forward` refused when typed; cli-core 0.730.0 now hides them and the groups left empty.

### Fixed

- **`messages list --after` and `messages context` in a busy chat read a few pages, not every message since.** The
  window after the point is halved while it holds too many to read, so 50,000 messages in a day cost 10 calls, not
  51.
- **A missing scope carries the shared reason `oauth.scope-missing`**, so a refused server search says what to add.
