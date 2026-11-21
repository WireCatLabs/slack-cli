# slack: Slack Web CLI for AI agents

A new WireCat CLI, started from cli-template. One tool for you and for Claude Code, Codex or any agent that speaks MCP.

<p align="center">
  <a href="https://github.com/WireCatLabs/slack-cli/blob/main/docs/index.md">Docs</a> ·
  <a href="https://github.com/WireCatLabs/slack-cli/blob/main/docs/installation.md">Install</a> ·
  <a href="https://github.com/WireCatLabs/slack-cli/blob/main/docs/usage.md">Usage</a>
</p>

- **Every operation of the Slack Web API is a command.** `slack api list` shows them, each with its own
  flags, help and `--json`.
- **Your agent gets the same commands as tools.** An MCP server and an agent skill come with it, no second codebase.
- **You decide what it may change.** Each profile allows, asks or denies each command, and a delete needs a key of
  its own.

## What you get

Ask your agent about Slack Web. It finds the right command with `slack commands --json`, runs it, and answers
from the result. A command it may not run stops with a clear refusal before anything reaches Slack Web.

## Why slack

- The token stays in the system keyring, and every command names the profile it uses.
- Every operation is tested against a strict fake built from the API description, in `src/api.test.ts`.
- `--dry-run` shows what a write would send, and sends nothing.

## Quick start

```sh
pnpm install
pnpm build
node dist/bin/slack.js doctor
```

Once it is on npm: `npm install -g @wirecat/slack-cli`, then `slack doctor`. Every command that uses an account
starts with a profile, a name you choose: `slack personal config show`.

## Sign in with your own Slack app

slack reads and writes as you, with the user token of a Slack app you make in your own workspace. An app that only
your workspace uses keeps Slack's full limits for reading history; one shared outside it gets one call a minute.

1. Open [api.slack.com/apps](https://api.slack.com/apps), choose **Create New App**, then **From a manifest**, and
   pick your workspace.
2. Paste [docs/slack-app-manifest.json](docs/slack-app-manifest.json). It asks only for the user scopes the commands
   use: reading channels, direct messages, people, files, reactions and pins, searching, and sending as you.
3. Choose **Install to Workspace** and allow it. An admin may have to approve the app first.
4. On **OAuth & Permissions**, copy the **User OAuth Token**. It starts with `xoxp-`.
5. Run `slack personal session start` and paste the token at the hidden prompt. slack checks it with Slack
   (`auth.test`) and keeps it in the system keyring. A bot token (`xoxb-`) is refused, because it cannot read as you.

`slack doctor --online` asks Slack whose each saved token is. To sign out on this computer, run
`slack personal session end`. To revoke the token, remove the app from the workspace.

## Use it with your agent

```sh
slack personal mcp add claude-code
slack skill install
```

`slack personal mcp check` shows the tools your agent gets. `mcp add` refuses a profile whose tools may write
until you review its permissions and pass `--allow-writes`. `slack personal mcp config` prints the setup for
any other MCP client.

Over MCP nobody is there to answer `ask`, so the agent runs the API's writes and deletes without asking. Each
one is kept as a run in `slack personal runs list`. To stop that, make the profile read-only with
`slack personal config set permissions.api readonly`, or refuse one operation with
`slack personal config set permissions.api.<operation> deny`. `slack api list` names the operations.

## What it can do

[docs/commands.md](docs/commands.md) lists every command, and `--help` after any of them shows its flags.

## Settings and permissions

`slack personal config show` prints the profile's settings. See [docs/configuration.md](docs/configuration.md).

## Security

See [docs/security.md](docs/security.md), and [SECURITY.md](SECURITY.md) to report a problem.

## When something goes wrong

Run `slack doctor` and see [docs/troubleshooting.md](docs/troubleshooting.md). Report a bug on
[GitHub](https://github.com/WireCatLabs/slack-cli/issues).

## Development

Started from [cli-template](https://github.com/WireCatLabs/cli-template). Its design is in
[docs/dev/DESIGN.md](docs/dev/DESIGN.md), and the working rules are in [AGENTS.md](AGENTS.md). Published as
[@wirecat/slack-cli](https://www.npmjs.com/package/@wirecat/slack-cli).
