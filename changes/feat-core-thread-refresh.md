### Fixed

- **`messages sync` no longer misses a reply sent while it reads a long history.** The next sync asks for thread
  replies from the time before that history was read. Which threads a sync reads again is now cli-core's shared step,
  so it works the same in every WireCat messenger; [DESIGN.md](../docs/dev/DESIGN.md) has the details.

### Changed — may break callers

- **`slk account list` is gone: use `slk session list`**, which lists the same profiles and their signed-in accounts.
  cli-core removed the shared messenger `account list`. The first help screen points at `slk session list`.
- **`session list` and `session status` are no longer MCP tools.** The MCP server already names every profile, and
  whether it is signed in, in each tool's `profile` field.
