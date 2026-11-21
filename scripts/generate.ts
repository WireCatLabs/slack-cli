import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  apiCommandPath,
  coverageGenerator,
  definitionsGenerator,
  generate,
  manifestGenerator,
  typesGenerator,
  valibotGenerator,
  writeArtifacts,
} from "@wirecat/cli-base/codegen"
import { serviceApiOperations } from "@wirecat/cli-core/cli"
import { specModel } from "./spec-model.ts"

const DOCS = "https://docs.slack.dev/reference/methods/"

// Slack's Web API is RPC: every call is a GET or a POST, and what it does is in its name (Slack's docs of each).
const DELETING: Record<string, string> = {
  chat_delete: "deletes a message",
  chat_deleteScheduledMessage: "deletes a scheduled message",
  files_delete: "deletes a file",
  files_comments_delete: "deletes a file comment",
  files_remote_remove: "removes a remote file",
  files_revokePublicURL: "revokes a file's public link",
  reactions_remove: "removes a reaction",
  pins_remove: "unpins a message",
  stars_remove: "removes a saved item",
  reminders_delete: "deletes a reminder",
  conversations_archive: "archives a channel for everyone in it",
  conversations_kick: "removes a person from a channel",
  conversations_leave: "leaves a channel",
  usergroups_disable: "disables a user group",
  users_deletePhoto: "deletes the profile photo",
  calls_participants_remove: "removes participants from a call",
  auth_revoke: "revokes the token, a GET in the spec",
  apps_uninstall: "uninstalls the app from the workspace, a GET in the spec",
  admin_conversations_archive: "archives a channel",
  admin_conversations_delete: "deletes a channel",
  admin_conversations_restrictAccess_removeGroup: "removes a group's access to a channel",
  admin_emoji_remove: "removes an emoji",
  admin_usergroups_removeChannels: "removes channels from a user group",
  admin_users_remove: "removes a person from the workspace",
  admin_users_session_invalidate: "ends a person's session",
  admin_users_session_reset: "signs a person out of every session",
}

const DELETES = Object.fromEntries(
  Object.entries(DELETING).map(([id, does]) => [
    id,
    { effect: "destructive" as const, reason: `${does} (<${DOCS}${id.replaceAll("_", ".")}/>)` },
  ]),
)

// GETs in the spec that change something: each sends, opens, shares or publishes (Slack's docs of each).
const WRITING: Record<string, string> = {
  apps_permissions_request: "asks the workspace for more scopes",
  apps_permissions_users_request: "asks a person for more scopes",
  dialog_open: "opens a dialog to a person",
  files_remote_share: "shares a remote file into channels",
  views_open: "opens a view to a person",
  views_publish: "publishes a Home tab view",
  views_push: "pushes a view onto a person's stack",
  views_update: "changes a view",
  workflows_stepCompleted: "marks a workflow step done",
  workflows_stepFailed: "marks a workflow step failed",
  workflows_updateStep: "changes a workflow step",
}

const WRITES = Object.fromEntries(
  Object.entries(WRITING).map(([id, does]) => [
    id,
    { effect: "write" as const, reason: `${does}, a GET in the spec (<${DOCS}${id.replaceAll("_", ".")}/>)` },
  ]),
)

const cursor = (items: string) => ({
  style: "cursor" as const,
  cursor: { in: "query" as const, name: "cursor" },
  next: "response_metadata.next_cursor",
  items,
  limit: { in: "query" as const, name: "limit" },
})

// Slack's cursor paging: `cursor` in, `response_metadata.next_cursor` out, empty on the last page
// (https://docs.slack.dev/apis/web-api/pagination/, and the docs of each method).
const CURSORS: Record<string, string> = {
  conversations_list: "channels",
  conversations_history: "messages",
  conversations_replies: "messages",
  conversations_members: "members",
  users_list: "members",
  users_conversations: "channels",
  reactions_list: "items",
  stars_list: "items",
  chat_scheduledMessages_list: "scheduled_messages",
  apps_permissions_resources_list: "resources",
}

const PAGED = Object.fromEntries(
  Object.entries(CURSORS).map(([id, items]) => [
    id,
    {
      pagination: cursor(items),
      reason: `Slack pages ${id.replaceAll("_", ".")} by \`cursor\` and \`response_metadata.next_cursor\``,
    },
  ]),
)

const FILES_PAGED = {
  files_list: {
    pagination: {
      style: "page" as const,
      page: { in: "query" as const, name: "page" },
      limit: { in: "query" as const, name: "count" },
      items: "files",
      start: 1,
    },
    reason: `Slack pages files.list by \`page\` from 1 and \`count\`, with no cursor (<${DOCS}files.list/>)`,
  },
}

// The key of the messenger command that does the same thing (cli-core's chats, messages and reactions commands, as
// tg-cli and whatsapp-cli name them), so denying `chats.leave` holds over `api conversations leave` too. cli-base's
// permission rule gives only `<group>.delete` and `<group>.share`, so the keys are set on the model before `generate`;
// cli-core's api group wants a `.delete` key on every delete, so one without its own (`chats.leave`) has
// `slack.delete` too.
const MESSENGER_KEYS: Record<string, string> = {
  chat_delete: "messages.delete",
  chat_update: "messages.edit",
  chat_postMessage: "messages.send",
  chat_meMessage: "messages.send",
  chat_postEphemeral: "messages.send",
  chat_scheduleMessage: "messages.send",
  chat_deleteScheduledMessage: "messages.scheduled.cancel",
  conversations_archive: "chats.archive",
  conversations_unarchive: "chats.unarchive",
  conversations_leave: "chats.leave",
  conversations_join: "chats.join",
  conversations_create: "chats.create",
  conversations_invite: "chats.members.add",
  conversations_kick: "chats.members.remove",
  conversations_mark: "chats.mark-read",
  conversations_rename: "chats.update",
  conversations_setPurpose: "chats.update",
  conversations_setTopic: "chats.update",
  pins_add: "messages.pin",
  pins_remove: "messages.unpin",
  stars_add: "messages.star",
  stars_remove: "messages.unstar",
  reactions_add: "reactions.add",
  reactions_remove: "reactions.remove",
}
const SHARES = ["files_sharedPublicURL"]

const keysOf = (id: string) => {
  const own = MESSENGER_KEYS[id]
  return [
    ...(own ? [own] : []),
    ...(id in DELETING && !own?.endsWith(".delete") ? ["slack.delete"] : []),
    ...(SHARES.includes(id) ? ["slack.share"] : []),
  ]
}
const withKeys = <M extends { operations: readonly { id: string }[] }>(model: M): M => ({
  ...model,
  operations: model.operations.map((operation) => {
    const keys = keysOf(operation.id)
    return keys.length ? { ...operation, permissions: keys.map((key) => ({ key })) } : operation
  }),
})

// The service's API description → src/generated/ and docs/dev/API_COVERAGE.md. Each correction below is read from
// the service's documentation, never guessed; cli-base docs/standards/kit-surface.md says what each one does.
const root = resolve(import.meta.dirname, "..")
// A fresh CLI has no src/generated/ yet and cannot build without it, so build runs this with --if-missing first.
if (process.argv.includes("--if-missing") && existsSync(join(root, "src/generated/manifest.ts"))) process.exit(0)
const { model, notes } = await specModel(root)
const artifacts = generate(
  withKeys(model),
  [
    typesGenerator({ path: "src/generated/types.ts" }),
    valibotGenerator({ path: "src/generated/schemas.ts", typesImport: "./types.js" }),
    manifestGenerator({ path: "src/generated/manifest.ts" }),
    definitionsGenerator({ path: "src/generated/definitions.ts" }),
    coverageGenerator({
      path: "docs/dev/API_COVERAGE.md",
      title: "API coverage",
      // What cli-core leaves out, with its reason, in place of a command it does not offer.
      command: (operation) =>
        serviceApiOperations({ operations: [operation] } as never).left[0]?.reason.replace(/^/, "left out: ") ??
        `slack <profile> api ${apiCommandPath(operation).join(" ")}`,
    }),
  ],
  {
    banner: ["Source: spec/slack/, checked against provenance.json", "Run: pnpm generate"],
    overrides: { ...DELETES, ...WRITES, ...PAGED, ...FILES_PAGED },
    readingPosts: false,
    // The operation id in kebab case is Slack's method name (`chat_postMessage` → `chat-post-message`), grouped by
    // its first word: `api conversations history`. `fromPath` would add a `list` to every GET.
    names: { groups: "first-word", groupNames: { api: "" } },
    pagination: true,
    auth: {
      securitySchemes: { bearer: { type: "http", scheme: "bearer" } },
      security: [{ bearer: [] }],
      reason:
        "the spec signs in by a `token` parameter; Slack's docs send it as `Authorization: Bearer <token>` " +
        "(<https://docs.slack.dev/authentication/tokens/>), and a token in the query or the form would reach logs",
    },
  },
)
const coverage = artifacts.find((artifact) => artifact.path === "docs/dev/API_COVERAGE.md")
if (coverage && notes.length)
  coverage.content += ["", "## Spec corrections", "", ...notes.map((n) => `- ${n}`), ""].join("\n")
const format = (path: string, content: string) =>
  path.endsWith(".ts")
    ? execFileSync(
        process.execPath,
        [`${root}/node_modules/@biomejs/biome/bin/biome`, "check", "--write", `--stdin-file-path=${path}`],
        { cwd: root, encoding: "utf8", input: content, maxBuffer: 64 * 1024 * 1024 },
      )
    : content
const check = process.argv.includes("--check")
const stale = writeArtifacts(artifacts, { root, check, format })
if (check && stale.length) {
  process.stderr.write(`Generated files are stale: ${stale.join(", ")}; run pnpm generate\n`)
  process.exitCode = 1
}
