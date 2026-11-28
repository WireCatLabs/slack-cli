# Settings

Choose what your agent may change in Slack, which channels your inbox follows, and what `slk` keeps about each run.
Settings live in one file, `config.json`, in the folder `slk doctor` shows. Each profile has its own part, and
`defaults` apply to every profile.

```sh
slk personal config show
slk personal config set inbox_channels "#general, #dev"
slk personal config unset inbox_channels
```

`config show` lists each setting and where it came from: the file, a variable or the default.

## Permissions

`permissions` decides what a command may do for this profile, per permission key. A key is a command's path with
dots, such as `messages.send`, or a part of it, such as `messages`. There are four levels:

| Level | What happens |
| --- | --- |
| `allow` | The command runs. |
| `ask` | In a terminal, the command waits for your yes; `--yes` answers it. Over MCP, the command runs. |
| `readonly` | Reads run, writes are refused. |
| `deny` | The command is refused. |

The writes you meet most often all start at `ask`:

| Key | What it covers | Default |
| --- | --- | --- |
| `messages.send` | sending a message or a thread reply | `ask` |
| `messages.edit` | changing a message you sent | `ask` |
| `messages.delete` | deleting a message for everyone; an agent is always refused | `ask` |
| `reactions.add` | adding a reaction | `ask` |
| `chats.join` | joining a channel | `ask` |

In the `api` group, which offers every Slack Web API method, a delete and a write that touches messages also start at
`ask`. Its other writes, such as `api reminders add`, are allowed.

An app connected over MCP has no one to ask, so there `ask` acts as `allow`. Before you connect one, refuse what it
must not do:

```sh
slk personal config set permissions.messages.send deny
slk personal config set permissions.messages readonly
```

The first line stops sending only. The second keeps every read of messages and refuses every change to them.
`slk personal config set permissions.api readonly` does the same for the whole `api` group. To make
one MCP server stricter than the profile, start it with `--permission`, as in
`slk personal mcp serve --permission messages.send=deny`. `SLACK_READ_ONLY=1` refuses every write, whatever the
permissions say. `slk personal messages send "#general" "Ship it" --dry-run` shows the key and level a command
checks, and sends nothing.

## Inbox

| Setting | What it does | Default |
| --- | --- | --- |
| `inbox_channels` | the channels whose every unread message the inbox shows, such as `#general, #dev`; DMs always count | none |
| `inbox_all_channels` | every channel you are in counts, two calls each, so the inbox may stop before the last ones | `false` |
| `thread_window_days` | how many days back `messages sync` looks for threads with new replies | `14` |

Both inbox settings belong to one profile, because the channels are a workspace's.

## Run records

Every command that fails is kept as a run, so `slk personal runs list` and `runs show` tell you what happened. A
command that talks to Slack is kept when it succeeds too. With `record` set to `false`, only failures are kept, and
`--record` keeps one command anyway. `--no-record` keeps nothing, not even a failure. With `record_input` set to `false`, a run keeps the command without
the words you typed. Secrets are hidden either way; see [Security](security.md).
