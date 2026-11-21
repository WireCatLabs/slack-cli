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
  "chats mark-read",
  "chats create",
  "chats join",
  "chats leave",
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
  "messages send",
  "messages transcribe",
  "messages edit",
  "messages delete",
  "messages forward",
  "messages pin",
  "messages unpin",
  "messages link",
  "messages comments",
]

const stdin = () => Object.assign(Readable.from([FAKE_TOKEN]), { isTTY: false })

describe("each remote command runs inside cli-core's run", () => {
  const cases = runScopeCases({
    definition: definition(),
    commands: {
      "session start": ["personal", "session", "start"],
      "session status": ["personal", "session", "status", "--check"],
      doctor: ["doctor", "--online"],
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
