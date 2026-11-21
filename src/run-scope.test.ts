import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { Readable } from "node:stream"
import { apiCommandPath } from "@wirecat/cli-base/codegen"
import { neverAnswers, runScopeCases } from "@wirecat/cli-core/testing"
import { describe, it } from "vitest"
import { API } from "./config.js"
import { definition } from "./program.js"
import { FAKE_TOKEN, fakeSlack } from "./testing/fake-slack.js"
import { signedIn } from "./testing/harness.js"
import { workspace } from "./testing/workspace.js"

const READS: Record<string, readonly string[]> = {
  "account show": ["personal", "account", "show"],
  "chats list": ["personal", "chats", "list"],
  "chats show": ["personal", "chats", "show", "general"],
  "chats events": ["personal", "chats", "events", "general"],
  "chats members list": ["personal", "chats", "members", "list", "general"],
  "contacts list": ["personal", "contacts", "list"],
  "contacts show": ["personal", "contacts", "show", "anna"],
  "messages list": ["personal", "messages", "list", "general"],
  "messages show": ["personal", "messages", "show", "general", "1700000030.000100"],
  "messages context": ["personal", "messages", "context", "general", "1700000030.000100"],
  "messages download": [
    "personal",
    "messages",
    "download",
    "general",
    "1700000040.000100",
    "--output-dir",
    mkdtempSync(join(tmpdir(), "run-scope-download-")),
  ],
  "messages sync": ["personal", "messages", "sync", "general", "--pause", "1ms"],
}

// The silent fake stalls the chat lookup before anything is sent, and that is honestly a `timeout`; a write that
// went out and got no answer is `outcome_unknown` in src/writes.test.ts.
const WRITE_REASON = "a write; src/writes.test.ts runs it, and its stalled send under --timeout ends in outcome_unknown"

const WRITES: Record<string, readonly string[]> = {
  "messages send": ["personal", "messages", "send", "general", "Hi"],
  "messages edit": ["personal", "messages", "edit", "general", "1700000020.000100", "Read it"],
  "messages delete": ["personal", "messages", "delete", "general", "1700000020.000100", "--yes"],
  "messages pin": ["personal", "messages", "pin", "general", "1700000030.000100"],
  "messages unpin": ["personal", "messages", "unpin", "general", "1700000030.000100"],
  "messages link": ["personal", "messages", "link", "general", "1700000030.000100"],
  "reactions add": ["personal", "reactions", "add", "general", "1700000010.000100", "tada"],
  "reactions remove": ["personal", "reactions", "remove", "general", "1700000040.000100"],
  "chats mark-read": ["personal", "chats", "mark-read", "general"],
  "chats join": ["personal", "chats", "join", "#elsewhere", "--yes"],
  "chats leave": ["personal", "chats", "leave", "general", "--yes"],
}

// cli-core mounts every messenger command and hides or refuses what Slack lacks; those never reach Slack.
const UNREAD =
  "hidden through SLACK.never or refused through SLACK.lacks before connecting; the read slice sends nothing for it"

const NOT_SENT = [
  "chats inspect",
  "chats documents list",
  "chats members check",
  "chats members fetch",
  "chats members add",
  "chats members remove",
  "chats create",
  "chats update",
  "chats links show",
  "chats links reset",
  "chats requests list",
  "chats requests confirm",
  "chats requests reject",
  "chats admins add",
  "chats admins remove",
  "chats folders list",
  "chats folders show",
  "chats folders create",
  "chats folders update",
  "chats folders delete",
  "chats moderate",
  "contacts lookup",
  "contacts add",
  "contacts remove",
  "contacts block",
  "contacts unblock",
  "contacts rename",
  "contacts import",
  "messages transcribe",
  "messages forward",
  "messages comments",
]

// Mounted unchanged from cli-core over the store or the model downloads; cli-core's own tests run each in its run.
const SHARED = [
  "models download",
  "models add",
  "review",
  "store gaps repair",
  "conversations links rebuild",
  "conversations embed",
  "attachments extract",
  "attachments list",
  "attachments show",
  "attachments download",
  "tags rebuild",
  "metadata sync",
  "stats messages show",
  "stats messages counters sync",
  "stats messages unanswered",
  "stats messages discussion",
  "stats messages top",
  "stats contacts responses",
  "stats contacts top",
  "stats chats show",
  "stats chats newcomers",
  "stats chats retention",
  "searches show",
  "recipients add",
]
const SHARED_REASON = "cli-core's shared messenger command, mounted unchanged; cli-core's tests run it inside its run"

const stdin = () => Object.assign(Readable.from([FAKE_TOKEN]), { isTTY: false })

describe("each remote command runs inside cli-core's run", () => {
  const cases = runScopeCases({
    definition: definition(),
    commands: {
      "session start": ["personal", "session", "start"],
      "session status": ["personal", "session", "status", "--check"],
      doctor: ["personal", "doctor", "--online"],
      ...READS,
    },
    skip: {
      ...Object.fromEntries(
        API.manifest.operations.map((operation) => [
          `api ${apiCommandPath(operation).join(" ")}`,
          "cli-core's serviceApiCommand runs it in its run; src/api.test.ts sends each one",
        ]),
      ),
      "mcp serve": "listens until stopped",
      ...Object.fromEntries(NOT_SENT.map((path) => [path, UNREAD])),
      ...Object.fromEntries(Object.keys(WRITES).map((path) => [path, WRITE_REASON])),
      ...Object.fromEntries(SHARED.map((path) => [path, SHARED_REASON])),
      setup: "asks for the token on a terminal; src/setup/flow.test.ts runs its check",
      "setup run": "asks for the token on a terminal; src/setup/flow.test.ts runs its check",
      "setup apply": "src/setup/flow.test.ts runs its check",
      "account list": "reads the remembered accounts, sends nothing",
      "account update": UNREAD,
      "account sessions list": UNREAD,
      "account sessions end": UNREAD,
      "account remove": "removes the token here; Slack has no sign-out the user token may call",
      "contacts context": "reads the store; src/messenger.test.ts",
      "contacts prepare": "reads the store; src/messenger.test.ts",
      "contacts events": "reads the store; src/messenger.test.ts",
      "contacts check": "reads the store; src/messenger.test.ts",
      "contacts sync": "users.list, as contacts list sends",
      "search all": "reads the store; src/messenger.test.ts searches after a sync",
      "search messages": "reads the store; src/messenger.test.ts searches after a sync",
      "search conversations": "reads the store; src/messenger.test.ts searches after a sync",
    },
    answering: () => ({
      keyring: signedIn(),
      fetch: fakeSlack({}, FAKE_TOKEN, workspace()).fetch,
      stdin: stdin(),
      env: { SLACK_TOKEN: FAKE_TOKEN },
    }),
    silent: () => ({ keyring: signedIn(), fetch: neverAnswers, stdin: stdin(), env: { SLACK_TOKEN: FAKE_TOKEN } }),
  })
  for (const one of cases) it(one.name, () => one.run())
})
