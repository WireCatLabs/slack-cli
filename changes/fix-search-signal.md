### Fixed

- **A server search stops when cli-core's bound ends it.** `search.messages` calls take the search's own stop
  signal, so a slow search no longer spends Slack's pace after its answer is given.
