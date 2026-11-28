### Added

- **WireCat Desktop reads what it needs for slk from slk itself.** The manifest (`slk --wcat-describe`) now names the
  MCP server's port (8755) and the way to sign in (the User OAuth Token, typed on stdin). Desktop's own list stays
  only as a fallback. From cli-base 1.2.0 (was 1.0.0).
