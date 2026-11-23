### Fixed

- **A stopped `messages sync` keeps the thread replies it read.** Replies come one thread at a time, and cli-core
  0.732.0 saves each thread as it arrives, so a sync killed in a chat with many threads loses at most the thread it was
  reading.
