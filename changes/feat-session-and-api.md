### Added

- **Sign in with your own Slack app: `slack <profile> session start`.** Make an app in your workspace from
  [the manifest](../docs/slack-app-manifest.json), install it, and paste its User OAuth Token (`xoxp-`) at the hidden
  prompt or on stdin. slack checks it with Slack's `auth.test` and keeps it in the system keyring, with the
  workspace and the person it belongs to. A bot token (`xoxb-`) and a rotating one (`xoxe.`) are refused before
  anything is sent: slack reads as you, and cannot renew a token that lasts 12 hours. `session status --check`,
  `session list` and `session end` work as in every WireCat CLI.
- **`slack doctor --online` asks Slack whose each saved token is,** every profile signed in here under its own name.
- **`slack <profile> api` reaches Slack's Web API,** one command per method, grouped by Slack's first word:
  `slack <profile> api conversations history --channel <id>`, `slack <profile> api chat post-message --body …`.
  The token goes in the `Authorization: Bearer` header only. Writes go as JSON. `--all` reads every page of the
  methods Slack pages by cursor, and of `files list` by page. A method also asks for the key of the messenger
  command that does the same thing: `messages.delete` for `chat delete`, `messages.edit` for `chat update`,
  `messages.send` for `chat post-message`, `chats.leave` for `conversations leave`, `chats.archive` for
  `conversations archive`, `messages.unpin` for `pins remove`, `reactions.remove` for `reactions remove`. Any other
  delete asks for `slack.delete`. Eleven GETs that send, share or publish (`views publish`, `files remote-share` …)
  count as writes: a read-only profile refuses them, and they are never sent twice. The 15 methods that take only a
  form and the four that answer with a token or a secret link are left out, each with its reason in `slack api show`
  and [API coverage](../docs/dev/API_COVERAGE.md).
