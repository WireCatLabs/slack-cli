# Security

Your Slack token stays on your computer, and `slk` sends it only to Slack. What every WireCat tool shares, such as
the keyring, permissions, MCP and what never reaches a log, is on the
[shared security page](https://wirecat.dev/en/docs/security).

`slk` keeps its settings in `config.json` and its state in the folders `slk doctor` shows.
It reaches only `slack.com` and `files.slack.com`. `session start` keeps the Slack user token in the system
keyring, or in a private file where no keyring works. The token goes only into the request's Authorization header,
never into an address, an answer, a run record or the send journal, the file in the state folder that lists each
message sent in your name, so no more than `sends_per_hour` (30 by default) go out in an hour.

`slk personal mcp serve --http` listens on `127.0.0.1` only, for browser apps that reach it through your own
tunnel. Each app logs in with a one-time code, and the server keeps a hash of each login it gives, in the state
folder, readable by you only. `slk personal mcp revoke` forgets every one of them.

A run record keeps the command line as you typed it, so `slk runs show` tells you what was run. Secrets and phone
numbers in it are stored as `[redacted]`, found by their name (`password=`, `API_TOKEN=`) or by their look (a known
token format, a `Bearer` credential, a long random string). A secret that looks like an ordinary word stays, such as
a short password typed with no name before it. To keep none of the words you type, run
`slk personal config set record_input false`.

`config.json` is saved readable by you only (`0600`), and its folder is created for you only (`0700`). A file or
folder made by an older version may be open to other users of the computer: `slk doctor` lists each under
`files.problems` and prints the `chmod` that fixes it. Windows is not checked. Report a vulnerability as [SECURITY.md](https://github.com/WireCatLabs/slack-cli/blob/main/SECURITY.md)
says.
