import { createProgram } from "./command-program.ts"

const GENERATED =
  "generated from Slack's Swagger; src/api.test.ts sends every operation once with its required flags through " +
  "fakeApi, which checks every flag it gets against the spec"

type Node = { name(): string; commands: readonly Node[]; options: readonly { long?: string }[] }
const leaves = (node: Node): Node[] => (node.commands.length ? node.commands.flatMap(leaves) : [node])
const api = (createProgram() as unknown as Node).commands.find((command) => command.name() === "api")
const generatedOptions = [
  ...new Set(
    (api?.commands ?? [])
      .filter((command) => !["list", "show"].includes(command.name()))
      .flatMap(leaves)
      .flatMap((command) => command.options.map((option) => option.long ?? "")),
  ),
].filter((name) => name && name !== "--help")

const SHARED_MCP =
  "cli-core's appMcpCommand; its app-mcp-command and mcp-server-command tests drive it, and src/mcp.test.ts runs " +
  "this CLI's own server, config, revoke and refusals"
const SHARED_REPORTS = "cli-core's messenger doctorCommand; cli-core's doctor tests create and show a report"
const LONG_RUNNING = `starts an HTTP server or a background process that runs until stopped; ${SHARED_MCP}`

const REFUSED =
  "something a Slack user token has no way to do (folders, sessions, join requests, moderation, forwarding, " +
  "transcripts, comments, contact lists), so " +
  "the adapter has no method for it and cli-core refuses it, before connecting where SLACK.lacks or SLACK.never " +
  "names it; cli-core's lacks test holds each refusal, and src/run-scope.test.ts lists them"
/** What Slack has a method for and this version does not do yet; SLACK.lacks refuses each before connecting. */
const NOT_YET = ["account update", "chats members add", "chats members remove", "chats create", "chats update"]
const NOT_YET_REASON =
  "Slack has a method for it (users.profile.set, conversations.invite, conversations.kick, conversations.create, " +
  "conversations.rename and setPurpose), and this version does not call it yet: SLACK.lacks refuses it before " +
  "connecting; cli-core's lacks test holds each refusal, and src/run-scope.test.ts lists them"
const SHARED_MESSENGER =
  "cli-core's shared messenger command or option, mounted unchanged and tested in cli-core; slack adds nothing to it " +
  "beyond the adapter reads src/messenger.test.ts drives"

const rowsOf = (reason: string, rows: string[][]) =>
  rows.map(([command = "", option]) => ({ command, ...(option ? { option } : {}), reason }))

const NOT_SENT_ROWS: string[][] = [
  ["account update"],
  ["account update", "--first-name"],
  ["account update", "--last-name"],
  ["account update", "--description"],
  ["account update", "--photo"],
  ["account update", "--hide-phone"],
  ["account sessions list"],
  ["account sessions end"],
  ["account sessions end", "--others"],
  ["chats inspect"],
  ["chats members add"],
  ["chats members remove"],
  ["chats create"],
  ["chats create", "--channel"],
  ["chats update"],
  ["chats update", "--title"],
  ["chats update", "--description"],
  ["chats update", "--all-can-pin"],
  ["chats update", "--only-admins-add"],
  ["chats update", "--only-admins-call"],
  ["chats update", "--only-owner-edits-info"],
  ["chats update", "--members-see-link"],
  ["chats links show"],
  ["chats links reset"],
  ["chats requests list"],
  ["chats requests list", "--limit"],
  ["chats requests list", "--page"],
  ["chats requests confirm"],
  ["chats requests reject"],
  ["chats admins add"],
  ["chats admins add", "--can"],
  ["chats admins remove"],
  ["chats folders list"],
  ["chats folders show"],
  ["chats folders create"],
  ["chats folders create", "--chat"],
  ["chats folders update"],
  ["chats folders update", "--title"],
  ["chats folders update", "--add"],
  ["chats folders update", "--remove"],
  ["chats folders delete"],
  ["chats rules show"],
  ["chats rules set"],
  ["chats rules unset"],
  ["chats moderate"],
  ["chats moderate", "--since-time"],
  ["chats moderate", "--dry-run"],
  ["chats moderate", "--allow-dangerous"],
  ["chats moderate", "--max-actions"],
  ["contacts lookup"],
  ["contacts add"],
  ["contacts remove"],
  ["contacts block"],
  ["contacts unblock"],
  ["contacts rename"],
  ["contacts import"],
  ["messages list", "--transcribe"],
  ["messages list", "--model"],
  ["messages transcribe"],
  ["messages transcribe", "--local"],
  ["messages transcribe", "--model"],
  ["messages forward"],
  ["messages forward", "--to"],
  ["messages forward", "--operation-id"],
  ["messages comments"],
  ["messages comments", "--limit"],
  ["messages comments", "--cursor"],
]

const SHARED_ROWS: string[][] = [
  ["account list"],
  ["account show", "--hide-phone"],
  ["account remove"],
  ["account remove", "--keep-data"],
  ["account remove", "--delete-data"],
  ["account remove", "--dry-run"],
  ["chats list", "--limit"],
  ["chats list", "--page"],
  ["chats list", "--all"],
  ["chats documents list"],
  ["chats documents list", "--limit"],
  ["chats documents list", "--page"],
  ["chats members list", "--limit"],
  ["chats members list", "--page"],
  ["chats members list", "--all"],
  ["chats members check"],
  ["chats members check", "--max-pages"],
  ["chats members check", "--deep"],
  ["chats members history"],
  ["chats members fetch"],
  ["chats members fetch", "--track"],
  ["chats members fetch", "--max-pages"],
  ["chats tracking list"],
  ["chats tracking show"],
  ["chats tracking add"],
  ["chats tracking remove"],
  ["contacts list", "--limit"],
  ["contacts list", "--page"],
  ["contacts list", "--all"],
  ["contacts list", "--order"],
  ["contacts show", "--with-notes"],
  ["contacts show", "--hide-phone"],
  ["contacts context"],
  ["contacts context", "--limit"],
  ["contacts context", "--since-time"],
  ["contacts context", "--chat"],
  ["contacts context", "--sync-first"],
  ["contacts prepare"],
  ["contacts prepare", "--limit"],
  ["contacts prepare", "--since-time"],
  ["contacts events"],
  ["contacts events", "--limit"],
  ["contacts events", "--cursor"],
  ["contacts check"],
  ["contacts check", "--no-registries"],
  ["contacts link"],
  ["contacts link", "--reason"],
  ["contacts unlink"],
  ["contacts unlink", "--from"],
  ["contacts sync"],
  ["contacts aliases set"],
  ["contacts aliases remove"],
  ["contacts notes list"],
  ["contacts notes show"],
  ["contacts notes add"],
  ["contacts notes add", "--text-file"],
  ["contacts notes edit"],
  ["contacts notes edit", "--text-file"],
  ["contacts notes edit", "--revision"],
  ["contacts notes remove"],
  ["messages evidence"],
  ["messages evidence", "--limit"],
  ["messages evidence", "--cursor"],
  ["messages list", "--cursor"],
  ["messages context", "--thread"],
  ["messages context", "--thread-hops"],
  ["messages context", "--thread-messages"],
  ["messages context", "--thread-bytes"],
  ["messages context", "--thread-within"],
  ["messages download", "--attachment"],
  ["messages download", "--all"],
  ["messages download", "--pause"],
  ["messages download", "--extract"],
  ["messages links"],
  ["messages sync", "--all"],
  ["messages sync", "--limit"],
  ["messages sync", "--since-time"],
  ["messages sync", "--last"],
  ["messages sync", "--catch-up"],
  ["messages sync", "--no-catch-up"],
  ["messages sync", "--catch-up-chunks"],
  ["messages sync", "--catch-up-messages"],
  ["messages sync", "--catch-up-time"],
  ["messages sync", "--full-history"],
  ["messages sync", "--with-muted"],
  ["messages sync", "--background"],
  ["messages sync", "--dry-run"],
  ["search all", "--only"],
  ["search all", "--source"],
  ["search all", "--limit"],
  ["search all", "--page"],
  ["search all", "--exact"],
  ["search all", "--timezone"],
  ["search all", "--backend"],
  ["search all", "--server-time"],
  ["search messages", "--server-time"],
  ["search messages"],
  ["search messages", "--sync-first"],
  ["search messages", "--max-chats"],
  ["search messages", "--sync-time"],
  ["search messages", "--max-messages"],
  ["search messages", "--thread"],
  ["search messages", "--thread-hops"],
  ["search messages", "--thread-messages"],
  ["search messages", "--thread-bytes"],
  ["search messages", "--thread-within"],
  ["search messages", "--source"],
  ["search messages", "--limit"],
  ["search messages", "--page"],
  ["search messages", "--newest"],
  ["search messages", "--exact"],
  ["search messages", "--context"],
  ["search messages", "--discover"],
  ["search messages", "--timezone"],
  ["search messages", "--saved"],
  ["search notes"],
  ["search notes", "--source"],
  ["search notes", "--filter"],
  ["search notes", "--limit"],
  ["search notes", "--page"],
  ["search notes", "--exact"],
  ["search notes", "--timezone"],
  ["search conversations"],
  ["search conversations", "--model"],
  ["search conversations", "--embedding-provider"],
  ["search conversations", "--base-url"],
  ["search conversations", "--dims"],
  ["search conversations", "--max-chats"],
  ["search conversations", "--max-chunks"],
  ["search conversations", "--sync-first"],
  ["search conversations", "--sync-time"],
  ["search conversations", "--max-messages"],
  ["search conversations", "--chat"],
  ["search conversations", "--since-time"],
  ["search conversations", "--filter"],
  ["search conversations", "--source"],
  ["search conversations", "--timezone"],
  ["search conversations", "--limit"],
  ["search conversations", "--catch-up"],
  ["search runs"],
  ["search runs", "--limit"],
  ["search runs", "--page"],
]

export const UNTESTED: { command: string; option?: string; reason: string }[] = [
  ...generatedOptions.map((option) => ({ command: "api *", option, reason: GENERATED })),
  {
    command: "",
    option: "--help-all",
    reason: "Commander answers before any command runs, so the trace never sees it; contracts/help.snap covers help",
  },
  {
    command: "",
    option: "--version",
    reason: "Commander answers before any command runs, so the trace never sees it; `pnpm version:check` checks it",
  },
  {
    command: "mcp server start",
    reason:
      "starts a detached `mcp serve --http` from the built entry; cli-core tests mcpServerCommand, and the background run was checked by hand against dist/",
  },
  {
    command: "mcp server start",
    option: "--port",
    reason:
      "starts a detached `mcp serve --http` from the built entry; cli-core tests mcpServerCommand, and the background run was checked by hand against dist/",
  },
  {
    command: "mcp server start",
    option: "--public-url",
    reason:
      "starts a detached `mcp serve --http` from the built entry; cli-core tests mcpServerCommand, and the background run was checked by hand against dist/",
  },
  {
    command: "mcp server stop",
    reason:
      "stops the detached server that `mcp server start` wrote a pid file for; cli-core tests mcpServerCommand, and no live scenario starts a server to stop",
  },
  ...["--http", "--port", "--public-url"].map((option) => ({ command: "mcp serve", option, reason: LONG_RUNNING })),
  { command: "doctor reports show", reason: SHARED_REPORTS },
  { command: "doctor reports create", reason: SHARED_REPORTS },
  { command: "doctor reports create", option: "--run", reason: SHARED_REPORTS },
  { command: "doctor reports create", option: "--output", reason: SHARED_REPORTS },
  { command: "mcp server status", reason: LONG_RUNNING },
  { command: "mcp server status", option: "--profiles", reason: LONG_RUNNING },
  { command: "mcp revoke", option: "--profiles", reason: SHARED_MCP },
  ...[undefined, "--allow-writes", "--permission"].map((option) => ({
    command: "mcp add",
    ...(option ? { option } : {}),
    reason: `writes Codex's or Claude Code's own MCP settings; ${SHARED_MCP}`,
  })),
  ...[undefined, "--permission"].map((option) => ({
    command: "mcp check",
    ...(option ? { option } : {}),
    reason: `starts the installed CLI as a child process, as the agent would; ${SHARED_MCP}`,
  })),
  ...rowsOf(
    REFUSED,
    NOT_SENT_ROWS.filter(([command = ""]) => !NOT_YET.some((one) => command.startsWith(one))),
  ),
  ...rowsOf(
    NOT_YET_REASON,
    NOT_SENT_ROWS.filter(([command = ""]) => NOT_YET.some((one) => command.startsWith(one))),
  ),
  {
    command: "messages send",
    option: "--allow-any-file",
    reason:
      "cli-core's guard on files from credential and app folders, the same in every messenger CLI; tested in " +
      "cli-core's send tests, and slack's own file sends run in src/writes.test.ts",
  },
  {
    command: "messages delete",
    option: "--allow-dangerous",
    reason:
      "cli-core's switch past an ask level's question before a deletion; tested in cli-core's messages delete " +
      "command tests, and slack's deletes run with --yes in src/writes.test.ts",
  },
  ...rowsOf(SHARED_MESSENGER, SHARED_ROWS),
  {
    command: "setup",
    reason: "asks its questions on a terminal; src/setup/flow.test.ts runs `setup run apply` against the fake",
  },
  { command: "setup show", reason: "cli-core's setupCommand prints the document; src/setup/flow.test.ts checks it" },
  {
    command: "setup apply",
    reason: "the same apply as `setup run apply`, which src/setup/flow.test.ts drives against the fake",
  },
  {
    command: "setup apply",
    option: "--dry-run",
    reason: "cli-core's setupCommand checks the answers without saving; tested in cli-core",
  },
  ...Object.entries({
    "store *": "src/cli/messenger/store-maintenance.test.ts, gaps.test.ts and store-mode.test.ts",
    "conversations *": "src/cli/messenger/analysis.test.ts and src/services/conversations.test.ts",
    "attachments *": "src/cli/messenger/attachments.test.ts and media-archive.test.ts",
    "tags *": "src/cli/messenger/tags.test.ts",
    "mentions *": "src/cli/messenger/mentions.test.ts",
    "models *": "src/cli/messenger/models-command.test.ts",
    "stats *": "src/cli/messenger/stats-command.test.ts and src/services/counters.test.ts",
    "tasks *": "src/cli/messenger/tasks.test.ts",
    "searches *": "src/cli/messenger/searches.test.ts",
    "metadata *": "src/cli/messenger/metadata.test.ts",
    "recipients *": "src/cli/messenger/messenger.test.ts («recipients»)",
    "sends *": "src/cli/messenger/messenger.test.ts and src/sends/journal.test.ts",
    "flood *": "src/cli/messenger/flood-command.test.ts",
    complete: "src/cli/messenger/complete-command.test.ts",
  }).map(([command, tests]) => ({
    command,
    reason: `cli-core's shared group over the local store, mounted unchanged; tested in cli-core ${tests}`,
  })),
  ...[undefined, "--unanswered", "--all", "--transcribe", "--model", "--new"].map((option) => ({
    command: "review",
    ...(option ? { option } : {}),
    reason:
      "cli-core's shared review over the local store, mounted unchanged; tested in cli-core src/cli/messenger/review.test.ts",
  })),
  ...["--new", "--limit", "--all", "--transcribe", "--model"].map((option) => ({
    command: "inbox",
    option,
    reason:
      "cli-core's shared inbox, mounted unchanged; tested in cli-core src/cli/messenger/inbox.test.ts. slk's own part, " +
      "unreadChats, is tested in src/slack/inbox.test.ts",
  })),
]
