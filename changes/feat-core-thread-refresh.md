### Changed

- **cli-core now picks the threads `messages sync` reads again.** slk only tells it which messages on a history page
  have replies, which roots were sent in the last `thread_window_days`, and one thread's replies after a time. Which
  threads to read whole, which from the last sync on and which to skip is now cli-core's shared step (`ThreadRefresh`),
  so the rule is the same for every messenger. A sync saves the same replies as before. A reply sent while a long
  history is read is no longer missed: the next sync asks from the time before that history was read.

### Changed — may break callers

- **`slk account list` is gone: use `slk session list`**, which lists the same profiles and their signed-in accounts.
  cli-core 2.0.0 removed the shared messenger `account list`. The first help screen points at `slk session list`.
