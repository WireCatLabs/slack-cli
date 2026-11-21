import { memoryKeyring } from "@wirecat/cli-base"
import { ProfileTokenStore, setupProblems } from "@wirecat/cli-core/cli"
import { describe, expect, it } from "vitest"
import { configuration } from "../config.js"
import { IDENTITY } from "../identity.js"
import { FAKE_TOKEN } from "../testing/fake-slack.js"
import { runCli } from "../testing/harness.js"
import { slackSetup } from "./flow.js"

const apply = async (answers: Record<string, unknown>) => {
  const keyring = memoryKeyring()
  const ran = await runCli(["personal", "setup", "run", "apply", "--json", "--answer-stdin"], {
    keyring,
    stdin: `${JSON.stringify(answers)}\n`,
  })
  const signedIn = new ProfileTokenStore({ app: IDENTITY, env: {}, keyring }).signedIn("personal")
  return { ...ran, signedIn }
}

describe("the setup flow", () => {
  it("**is a valid v1 document** over slack's own settings", () => {
    expect(setupProblems(slackSetup.document, { settings: configuration.allSettings, v1: true })).toEqual([])
  })

  it("**keeps a user token that auth.test accepts**, and never prints it", async () => {
    const saved = await apply({ token: FAKE_TOKEN })
    expect(saved.code).toBe(0)
    expect(saved.signedIn).toBe(true)
    expect(saved.out + saved.err).not.toContain(FAKE_TOKEN)
  })

  it("**refuses a bot token before anything is kept**", async () => {
    const refused = await apply({ token: "xoxb-0synth-bot-fake" })
    expect(refused.code).not.toBe(0)
    expect(refused.signedIn).toBe(false)
    expect(refused.err).toContain("xoxp-")
  })
})
