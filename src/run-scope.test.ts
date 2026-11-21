import { Readable } from "node:stream"
import { apiCommandPath } from "@wirecat/cli-base/codegen"
import { neverAnswers, runScopeCases } from "@wirecat/cli-core/testing"
import { describe, it } from "vitest"
import { API } from "./config.js"
import { definition } from "./program.js"
import { fakeComments } from "./testing/fake-comments.js"
import { FAKE_TOKEN, fakeSlack } from "./testing/fake-slack.js"
import { signedIn } from "./testing/harness.js"

const stdin = () => Object.assign(Readable.from([FAKE_TOKEN]), { isTTY: false })

// SAMPLE: give each of your remote commands the words that make it succeed against your fake.
describe("each remote command runs inside cli-core's run", () => {
  const cases = runScopeCases({
    definition: definition(),
    commands: {
      "comments list": ["personal", "comments", "list"],
      "comments show": ["personal", "comments", "show", "c1"],
      "comments create": ["personal", "comments", "create", "--text", "Plan"],
      "comments update": ["personal", "comments", "update", "c1", "--text", "Plans"],
      "session start": ["personal", "session", "start"],
      "session status": ["personal", "session", "status", "--check"],
      doctor: ["doctor", "--online"],
    },
    skip: {
      ...Object.fromEntries(
        API.manifest.operations.map((operation) => [
          `api ${apiCommandPath(operation).join(" ")}`,
          "cli-core's serviceApiCommand runs it in its run; src/api.test.ts sends each one",
        ]),
      ),
      "mcp serve": "listens until stopped",
    },
    answering: () => {
      const slack = fakeSlack()
      const comments = fakeComments()
      const fetch: typeof slack.fetch = (input, init) =>
        (new URL(String(input)).host === "slack.com" ? slack : comments).fetch(input, init)
      return { keyring: signedIn(), fetch, stdin: stdin() }
    },
    silent: () => ({ keyring: signedIn(), fetch: neverAnswers, stdin: stdin() }),
  })
  for (const one of cases) it(one.name, () => one.run())
})
