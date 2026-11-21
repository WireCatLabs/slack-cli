# slack — design

Written by `npx @wirecat/cli-template new`. The agent reads it first, asks the further questions the reference CLI
does not answer, and starts building only after the owner has read it.

## First task

Delete this section once every step is done (WC-DOC-3).

1. If an answer below is missing, ask the owner the [design interview](skills/design-interview/SKILL.md).
2. Learn how a command reaches a service from the sample (`AGENTS.md`, "The sample"), and the domain, the
   store and its commands from the reference CLI below. Build the first command on the sample.
3. Ask the further questions in the interview that the reference CLI does not answer, and write the answers here.
   Build only after the owner has read this page.
4. When the first command reaches the service, rewrite `README.md`, `docs/index.md` and the description in
   `package.json` and `skills/slack-cli/SKILL.md` to say what the tool does and who it is for. Rewrite
   `appMcpCommand`'s `name` and `untrusted` in `src/program.ts` too: name the kinds of outside text the CLI
   carries (WC-MCP-11). Rewrite the tagline and the sign-in texts of `DESKTOP` in `src/identity.ts`, then run
   `pnpm generate`: WireCat Desktop shows them before it installs the tool.

## Answers

- **Category:** messenger
- **Content languages:** en, ru
- **Sign-in:** an API token or key
- **The API:** official API documentation only
- **API description:** Swagger 2.0
- **How people filter:** by time, by person, by container (chat, folder, calendar), by words in the text
- **Never in the store, a log or the output:** tokens and passwords, links that carry a secret
- **Untrusted input:** messages from other people, files and attachments, links, names and titles set by others

## Reference CLI

Learn from [whatsapp-cli](https://github.com/WireCatLabs/whatsapp-cli), then [tg-cli](https://github.com/WireCatLabs/tg-cli) and [max-cli](https://github.com/WireCatLabs/max-cli).

## Content languages

Languages: en, ru.
Set the messenger's `speechModels` to `parakeet-v3`.

## Further answers

- **Sign-in (2026-11-21):** each person makes an internal Slack app in their own workspace from
  [docs/slack-app-manifest.json](../slack-app-manifest.json) and pastes its User OAuth Token (`xoxp-`). An app shared
  outside its workspace gets one history call a minute; an internal one keeps the full limits. One profile is one
  workspace and one person: the account is `<team_id>:<user_id>` from `auth.test`. A bot token is refused, since the
  CLI reads as the person. Token rotation stays off in the manifest, and a rotating token (`xoxe.`) is refused: it
  lasts 12 hours, refreshing it needs the app's client secret, and rotation cannot be turned off once on
  (<https://docs.slack.dev/authentication/using-token-rotation/>).
- **Sign-in code:** cli-core's `tokenSessionCommand` and `ProfileTokenStore`, as every token CLI. The messenger
  session types in cli-core belong to device sessions (WhatsApp, Telegram, MAX); a Slack token is one bearer token.
- **The `api` group:** Slack's Swagger of 2020 with the corrections listed on [API coverage](API_COVERAGE.md). Command
  names are Slack's method names, grouped by their first word: `api conversations history`. A Slack call that fails
  answers HTTP 200 with `ok: false`; until cli-core reads that for an HTTP API, `api` prints such an answer as it is.
- **Pace:** 20 calls a minute per profile, Slack's Tier 2. The paging reads mix Tier 2 (`conversations.list`,
  `users.list`, `reactions.list`) and Tier 3 (`conversations.history`, `conversations.replies`, `users.conversations`,
  50 a minute); cli-core's `Pacer` keeps one pace per profile, so it takes the lowest. A 429 holds every process of
  the profile for its `Retry-After`.
- **Messenger reads (2026-11-21):** the messenger commands are cli-core's, over one adapter
  (`src/slack/adapter.ts`), with every Slack answer mapped in `src/slack/map.ts`. A DM is a dialog; a group DM and
  every channel are groups, told apart by `provider_metadata.slack_kind` (`public`, `private`, `mpim`, `im`), with
  `slack_shared` for Slack Connect. A message id is Slack's `ts` as a string, so held stretches are keyed by time
  (`orderBy: "time"`). Service subtypes are chat events, never messages. Slack gives no deletion signal in
  `conversations.history`, so a message is never marked deleted.
- **Threads:** read with `messages list <chat> topic:<root ts>`, through cli-core's topic read. Slack has no list of
  threads, so the topic commands stay hidden. `messages sync` calls `history` and never `historyAfter`, so a sync
  page also carries the new replies of its own roots, and of roots up to `thread_window_days` (14) old once the page
  reaches them; a reply never lowers a page's oldest key. A thread holding fewer replies than Slack's `reply_count`
  is read whole.
- **Commands mounted as whatsapp-cli mounts them:** reactions, the store-only reads (store, conversations,
  attachments, tags, mentions, metadata, stats, tasks, searches), models, review, recipients, sends, flood,
  complete and cli-core's messenger `doctor`. `mcp` stays the app's own: cli-core's messenger MCP server checks
  `--permission` against messenger keys only and refuses the `api` group's.
- **Left out, with the reason:**
  - `watch`, `serve` and `server`: they listen to a push the adapter would have to receive. A user token gets none.
    Slack's Events API needs a public address, and Socket Mode needs an app-level token (`xapp-`) besides the user
    token; polling every chat would spend the 20-a-minute pace.
  - `inbox`: Slack's conversation list carries no unread count or last message, so it is empty online, and cli-core
    refuses `inbox --offline`.
  - `guide`: it reads scenario files, and slack has none yet.
  - `images`: cli-core's `images read` fails cli-dev's command lint here ("read" is not in its vocabulary), which
    fails `ci:quick`; it comes back when cli-core renames it.
  - `polls`, `stickers`, `bot`, `topics`, `calls`: Slack has no such thing for a user token.
- **Last activity:** `users.conversations` gives no `latest`, so a listed chat's `lastMessageAt` is unknown and
  `messages sync --all` reads every chat it lists. Archived channels are left out of the list
  (`exclude_archived`). No cheap source of last activity was found for a user token: `conversations.info` would cost a
  call per chat at the profile's pace.
- **Writes** (`src/slack/writes.ts`): `chat.postMessage`, `chat.update`, `chat.delete`, `reactions.add|remove`,
  `pins.add|remove`, `conversations.mark`, `conversations.open`, `chat.getPermalink`, `conversations.join|leave`, and
  a file through `files.getUploadURLExternal`, a POST of the bytes to `files.slack.com` and
  `files.completeUploadExternal`. A write goes with `writes: true`: no answer, or an answer that cannot be read, is
  `outcome_unknown`, never retried. The upload address and the bytes share nothing yet, so they go as reads, and a
  failure there says nothing was sent; the bytes go through the client, paced and in the run record as
  `files.upload`, to `files.slack.com` only. Plain text is escaped and sent with `mrkdwn: false`; `--md` is
  cli-core's Markdown spans written as mrkdwn, a link's address percent-encoded where `<`, `>` or `|` would end it,
  and a mark mrkdwn lacks is refused. `--reply-to` and `--topic` go to the message's root: a Slack thread is one level.
  A person with no DM yet gets one through `conversations.open` before the send.
- **A repeat is one copy:** Slack's `chat.postMessage` has no idempotency key, and its metadata is refused from a user
  token (`metadata_must_be_sent_from_app`). A send id carries the time it was made (`s<ms>-<uuid>`). A send id this run
  did not make is a repeat: the adapter reads the chat (or the thread) from a minute before that time to the end,
  every page, and answers with the owner's own message of the same text in the same place, else sends. An id slack
  did not make is refused. A file message is found by its file id the same way, but a repeat of a file send is
  refused: the files would be uploaded again under new ids. A repeat of a pin, an unpin, a delete, a reaction or a
  leave that finds it done (`already_pinned`, `no_pin`, `message_not_found`, `already_reacted`, `not_in_channel`) is
  the outcome asked for. So a delete of a message that is not there answers as done.
- **A file's message shows late:** Slack may share a file a moment after `files.completeUploadExternal`. The chat is
  read three times for it; then the answer stands in for the message, under the first file's id.
- **Slack's refusals with a reason** (`src/reasons.ts`, each code from the method's page): `message.not-yours`
  (`cant_update_message`, `cant_delete_message`), `message.edit-window-closed`, `message.too-long`,
  `chat.not-joined` (`not_in_channel`), `chat.archived` (`is_archived`), `chat.restricted` (`restricted_action*`).
  Slack's own code is in `details.slack_error`.
- **Deviations from cli-core's ports:**
  - `delete` is for everyone only: Slack has no delete for one person, so a delete without `--for-everyone` is
    refused before the confirmation question, never widened.
  - `react` adds; Slack keeps several reactions per person, so an emoji does not replace the owner's other ones. An
    emoji is Slack's name for it (`thumbsup`, `:eyes:`, `thumbsup::skin-tone-2`); a Unicode emoji is refused.
  - `pin --notify` changes nothing: Slack shows a pin in the channel either way.
  - `chat.update` takes no `mrkdwn` switch, so a plain edit with `*x*` may show bold where a plain send would not.
    `files.completeUploadExternal`'s `initial_comment` has none either: a file's caption is escaped like plain text,
    and `*x*` in it may show bold.
- **Not offered by cli-core's send:** `reply_broadcast` (a thread reply also shown in the channel) has no field in
  `SendOptions`, so a reply stays in its thread. `--silent`, `--at-time`, `--send-as`, buttons, spoilers and voice
  messages are refused by name.
- **Not verified on a live workspace:** whether Slack keeps a sent text exactly as sent, which the repeat matches on;
  and how long a file's message takes to show. `messages link` asks for the remembered account before connecting, so
  on `SLACK_TOKEN` alone it works only after one other command has saved the account.
- **Hidden and refused:** what Slack has no primitive for is in `SLACK.never`. Sessions and folders are in `lacks`
  instead, since `never` would leave `account sessions` and `chats folders` in sight with nothing under them.

## Open questions for the owner
