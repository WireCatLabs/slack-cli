### Changed — may break callers

- **Built on cli-core 1.0 and cli-base 1.0.** The generated API files read their types from
  `@wirecat/cli-base/codegen/runtime`. Store version 73 comes with cli-core 1.0: once a 1.0 tool opens the store, a 0.x
  tool refuses it, so upgrade every WireCat CLI together. `store migrate` refuses to run without a rollback copy;
  `--no-backup` migrates anyway.
