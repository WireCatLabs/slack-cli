# slk: Slack CLI for AI agents

Read and search your Slack channels, DMs and threads from the terminal, and let Claude Code, Codex or any agent that
speaks MCP do the same for you. slk signs in as you, with a Slack app you make in your own workspace, so it sees
what you see and nothing more.

<p align="center">
  <a href="https://github.com/WireCatLabs/slack-cli/blob/main/docs/index.md">Docs</a> ·
  <a href="https://github.com/WireCatLabs/slack-cli/blob/main/docs/installation.md">Install</a> ·
  <a href="https://github.com/WireCatLabs/slack-cli/blob/main/docs/usage.md">Usage</a>
</p>

- **Every operation of the Slack Web API is a command.** `slk api list` shows them, each with its own
  flags, help and `--json`.
- **Your agent gets the same commands as tools.** An MCP server and an agent skill come with it, no second codebase.
- **You decide what it may change.** Each profile allows, asks or denies each command, and a delete needs a key of
  its own.

## What you get

Ask your agent about Slack. It finds the right command with `slk commands --json`, runs it, and answers
from the result. A command it may not run stops with a clear refusal before anything reaches Slack.

## Why slk

- The token stays in the system keyring, and every command names the profile it uses.
- Every operation is tested against a strict fake built from the API description, in `src/api.test.ts`.
- `--dry-run` shows what a write would send, and sends nothing.

## Quick start

```sh
pnpm install
pnpm build
node dist/bin/slack.js doctor
```

Once it is on npm: `npm install -g @wirecat/slack-cli`, then `slk doctor`. The command is `slk`, and `wcat-slk`
beside it; not `slack`, which [Slack's own developer CLI](https://docs.slack.dev/tools/slack-cli/) installs. Every command that uses an account
starts with a profile, a name you choose: `slk personal config show`.

## Sign in with your own Slack app

slack reads and writes as you, with the user token of a Slack app you make in your own workspace. An app that only
your workspace uses keeps Slack's full limits for reading history; one shared outside it gets one call a minute.

1. Open [api.slack.com/apps](https://api.slack.com/apps), choose **Create New App**, then **From a manifest**, and
   pick your workspace.
2. Paste [docs/slack-app-manifest.json](docs/slack-app-manifest.json). It asks only for the user scopes the commands
   use: reading channels, direct messages, people, files, reactions and pins, searching, and sending as you.
3. Choose **Install to Workspace** and allow it. An admin may have to approve the app first.
4. On **OAuth & Permissions**, copy the **User OAuth Token**. It starts with `xoxp-`.
5. Run `slk personal session start` and paste the token at the hidden prompt. slack checks it with Slack
   (`auth.test`) and keeps it in the system keyring. A bot token (`xoxb-`) is refused, because it cannot read as you.

`slk doctor --online` asks Slack whose each saved token is. To sign out on this computer, run
`slk personal session end`. To revoke the token, remove the app from the workspace.

## Use it with your agent

```sh
slk personal mcp add claude-code
slk skill install
```

`slk personal mcp check` shows the tools your agent gets. `mcp add` refuses a profile whose tools may write
until you review its permissions and pass `--allow-writes`. `slk personal mcp config` prints the setup for
any other MCP client.

Over MCP nobody is there to answer `ask`, so the agent runs the API's writes and deletes without asking. Each
one is kept as a run in `slk personal runs list`. To stop that, make the profile read-only with
`slk personal config set permissions.api readonly`, or refuse one operation with
`slk personal config set permissions.api.<operation> deny`. `slk api list` names the operations.

## What it can do

Read your workspace with the same commands as every WireCat messenger CLI:

- `slk personal chats list` lists the channels, DMs and group DMs you are in. `chats show '#general'` shows one,
  with its members; a DM also shows its unread count. `chats members list '#general'` lists who is in a channel.
- `slk personal messages list '#general'` reads recent messages as plain text, with names in place of user ids.
  `messages list '#general' topic:<ts>` reads one thread. `messages show` and `messages context` open one message
  and the messages around it.
- `slk personal messages download '#general' <ts>` saves a message's files. They come only from
  `files.slack.com`, and the token goes only there.
- `slk personal messages sync '#general'` saves a channel's history on this computer, with new replies of threads
  up to 14 days old (`thread_window_days`). `slk personal search messages "invoice"` asks Slack's own search and
  that copy at once; `search all` does too, and adds notes and other tools' messages from the copy.
- `slk personal chats events '#general'` shows who joined or left and what was renamed, from Slack's service
  messages. `slk personal contacts show anna` shows a person.
- `slk personal messages send '#general' "Ship it"` sends as you. `--reply-to <ts>` answers in the thread, `--md`
  turns Markdown into Slack's formatting, and `--file report.pdf` uploads a file. `messages edit`, `messages delete`,
  `messages pin`, `messages link`, `reactions add` and `chats mark-read`, `chats join` and `chats leave` change what
  you see in Slack and what others see.

Slack does not say when a message was deleted, so a message saved by a sync stays saved. A write with no answer from
Slack exits with `14` and is never sent again by itself: read the chat before you repeat it.

[docs/commands.md](docs/commands.md) lists every command, and `--help` after any of them shows its flags.

## Settings and permissions

`slk personal config show` prints the profile's settings. See [docs/configuration.md](docs/configuration.md).

## Security

See [docs/security.md](docs/security.md), and [SECURITY.md](SECURITY.md) to report a problem.

## When something goes wrong

Run `slk doctor` and see [docs/troubleshooting.md](docs/troubleshooting.md). Report a bug on
[GitHub](https://github.com/WireCatLabs/slack-cli/issues).

## Development

Started from [cli-template](https://github.com/WireCatLabs/cli-template). Its design is in
[docs/dev/DESIGN.md](docs/dev/DESIGN.md), and the working rules are in [AGENTS.md](AGENTS.md). Published as
[@wirecat/slack-cli](https://www.npmjs.com/package/@wirecat/slack-cli).
