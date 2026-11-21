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
  CLI reads as the person. Token rotation stays off in the manifest: a rotated token lasts 12 hours, and refreshing it
  needs the app's client secret.
- **Sign-in code:** cli-core's `tokenSessionCommand` and `ProfileTokenStore`, as every token CLI. The messenger
  session types in cli-core belong to device sessions (WhatsApp, Telegram, MAX); a Slack token is one bearer token.
- **The `api` group:** Slack's Swagger of 2020 with the corrections listed on [API coverage](API_COVERAGE.md). Command
  names are Slack's method names, grouped by their first word: `api conversations history`. A Slack call that fails
  answers HTTP 200 with `ok: false`; until cli-core reads that for an HTTP API, `api` prints such an answer as it is.
- **Pace:** 50 calls a minute per profile, Slack's Tier 3, which the paging reads have; a 429 holds every process of
  the profile for its `Retry-After`.

## Open questions for the owner
