import { readFileSync } from "node:fs"
import { memoryKeyring } from "@wirecat/cli-base"
import { ProfileTokenStore, plainSetupText, setupProblems } from "@wirecat/cli-core/cli"
import { describe, expect, it } from "vitest"
import { configuration } from "../config.js"
import { IDENTITY } from "../identity.js"
import { APP_LINK, APP_MANIFEST, APPS_LINK } from "../slack/app-manifest.js"
import { FAKE_TOKEN } from "../testing/fake-slack.js"
import { runCli } from "../testing/harness.js"
import { slackSetup } from "./flow.js"
import { TOKEN_GUIDE } from "./guide.js"

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

  it("**links to Slack's app creation with the manifest of docs/slack-app-manifest.json filled in**", () => {
    const docs = JSON.parse(readFileSync(new URL("../../docs/slack-app-manifest.json", import.meta.url), "utf8"))
    expect(APP_MANIFEST).toEqual(docs)
    const link = new URL(APP_LINK)
    expect(link.origin + link.pathname).toBe("https://api.slack.com/apps")
    expect(link.searchParams.get("new_app")).toBe("1")
    expect(JSON.parse(link.searchParams.get("manifest_json") ?? "")).toEqual(docs)
    expect(JSON.stringify(slackSetup.document)).toContain(JSON.stringify(APP_LINK))
    expect(readFileSync(new URL("../../README.md", import.meta.url), "utf8")).toContain(`(${APP_LINK})`)
  })

  it("**gives session start the same steps and links as the flow**, in plain text for a terminal", () => {
    for (const link of [APP_LINK, APPS_LINK, "https://slack.com/signin"]) expect(TOKEN_GUIDE).toContain(link)
    for (const where of ["OAuth & Permissions", "Install to Workspace", "User OAuth Token", "administrator"])
      expect(TOKEN_GUIDE).toContain(where)
    expect(plainSetupText(TOKEN_GUIDE)).not.toMatch(/\*\*|`|\]\(|^#/m)
    expect(JSON.stringify(slackSetup.document)).not.toMatch(/\bslack <profile>/)
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
