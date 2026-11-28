# Use it

Ask your agent what you missed in Slack, what a thread decided, or to answer someone, and see each command it runs.
Every command starts with the name of the workspace's profile, so nothing reads or sends in the wrong workspace.

**On this page:**

1. [Catch up on what you missed](#catch-up-on-what-you-missed)
2. [Read a whole thread](#read-a-whole-thread)
3. [Find a message](#find-a-message)
4. [Reply, edit or react](#reply-edit-or-react)
5. [The profile comes first](#the-profile-comes-first)
6. [Connect an agent](#connect-an-agent)
7. [Output for scripts](#output-for-scripts)

## Catch up on what you missed

```sh
slk personal inbox
```

You get other people's unread messages in your DMs and group DMs, and new replies in the threads you follow. In
channels, you get the messages that mention you or a user group you are in. To see every unread message of a channel,
name it once:

```sh
slk personal config set inbox_channels "#general, #dev"
```

`inbox --new` shows only what arrived since the last `inbox --new`, each message once, which suits a scheduled run.
The inbox stops after about 15 seconds. When it could not read every chat in that time, its answer lists under
`missing` what it left out and why; see [When something goes wrong](troubleshooting.md).

## Read a whole thread

```sh
slk personal messages list "#general" topic:1732791234.123456
```

You get the thread's first message and then every reply, oldest first. The number after `topic:` is the first
message's id, which `messages list "#general"` and `inbox` show for each message.

## Find a message

```sh
slk personal search messages "invoice"
```

The search runs on Slack's own search and on the copy on your computer at once.
`slk personal messages sync "#general"` saves a channel's history into that copy, with the new replies of threads up
to 14 days old.

## Reply, edit or react

```sh
slk personal messages send "#general" "Ship it" --reply-to 1732791234.123456
slk personal reactions add "#general" 1732791234.123456 eyes
```

`--reply-to` answers in the thread; add `--also-to-channel` to show the reply in the channel too. `messages edit`
changes a message you sent, and `messages delete --for-everyone` removes it for everyone, as Slack has no delete for
you alone. In a terminal, each of these asks you first. An agent connected over MCP is not asked, so it sends, edits
and reacts at once, and it is never allowed to delete. Decide what it may do in
[settings](configuration.md#permissions) before you connect it.

A send that got no answer from Slack exits with code 14 and is never sent again by itself. Read the chat before you
repeat it.

## The profile comes first

A profile is a name you choose for one account. It is the first word of every command that uses an account:

```sh
slk personal config show
```

`SLACK_PROFILE=personal` does the same for one shell session. No profile is ever assumed, not even the only one: a
command without one stops with exit code 2 and lists the profiles on this computer.

## Connect an agent

`slk skill install` puts the tool's skill where Claude Code, Codex, Gemini CLI and OpenClaw look for it.
`slk skill install --for hermes` also adds that folder to Hermes Agent's own settings, so a bare `skill install`
leaves Hermes out. `slk personal mcp serve` serves the profile's commands over MCP, on stdin and stdout:

```sh
claude mcp add slack -- slk personal mcp serve
```

The server offers every command, the ones that write included. The profile's permissions decide what runs; see
[settings](configuration.md#permissions).

For ChatGPT and Claude in the browser,
`slk personal mcp serve --http --public-url https://laptop.example.ts.net` serves on `127.0.0.1` (port 8765, or
`--port`) behind your own tunnel. A browser app logs in with a one-time code that the command prints;
`slk personal mcp revoke` ends every login. `slk personal mcp server start` runs the same
server in the background, `mcp server status` shows its port, the login code and the apps logged in, and
`mcp server stop` ends it.

## Output for scripts

Every command except `mcp serve` on stdin and stdout takes `--json`, and prints one JSON value on stdout. Errors are
JSON on stderr, with a code to branch on. The [command reference](commands.md) lists the codes.
