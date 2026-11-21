import { brokenKeyring, memoryKeyring } from "@wirecat/cli-base"
import { ProfileTokenStore, rememberAccount } from "@wirecat/cli-core/cli"
import { expect, it } from "vitest"
import { IDENTITY } from "../identity.js"
import { AUTH_TEST, FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { runCli } from "../testing/harness.js"

const ACCOUNT = { team_id: "T0SYNTH01", team: "Synth Team", user_id: "U0SYNTH01", user: "test.person" }

it("session start checks the token with auth.test before keeping it; status, list and end", async () => {
  const keyring = memoryKeyring()
  const service = fakeSlack()
  const started = await runCli(["personal", "session", "start", "--json"], { keyring, service, stdin: FAKE_TOKEN })
  expect(started.json().item).toMatchObject({ state: "saved", stored_in: "keyring", verified: true, ...ACCOUNT })
  expect(service.calls.map((call) => call.method)).toEqual(["auth.test"])
  expect(service.refusals).toEqual([])
  const status = await runCli(["personal", "session", "status", "--check", "--json"], { keyring, service })
  expect(status.json().item).toMatchObject({ state: "saved", token_from: "keyring", verified: true, ...ACCOUNT })
  expect((await runCli(["session", "list", "--json"], { keyring })).json().items).toContainEqual(
    expect.objectContaining({ profile: "personal", signed_in: true }),
  )
  expect((await runCli(["personal", "session", "end", "--json"], { keyring })).code).toBe(0)
  const ended = await runCli(["personal", "session", "status", "--json"], { keyring })
  expect(ended.json().item).toMatchObject({ state: "missing" })
})

it("the token reaches no output, no error and no run record", async () => {
  const keyring = memoryKeyring()
  const started = await runCli(["personal", "session", "start", "--record", "--json"], {
    keyring,
    service: fakeSlack(),
    stdin: FAKE_TOKEN,
  })
  const runs = await runCli(["personal", "runs", "list", "--json"], { keyring })
  const run = (runs.json().items as { run_id: string; command: string }[]).find(({ command }) =>
    command.includes("session start"),
  )
  expect(run).toBeDefined()
  const record = await runCli(["personal", "runs", "show", String(run?.run_id), "--json"], { keyring })
  expect(record.code, record.err).toBe(0)
  expect(record.out).toContain("auth.test")
  const refused = await runCli(["personal", "session", "status", "--check", "--json"], {
    keyring,
    service: fakeSlack({ "auth.test": { body: { ok: false, error: "token_revoked" } } }),
  })
  expect(refused.json()).toMatchObject({
    error: { code: "authentication_error", message: expect.stringContaining("token_revoked") },
  })
  for (const text of [started.out, started.err, runs.out, record.out, refused.out, refused.err])
    expect(text).not.toContain(FAKE_TOKEN)
})

it("session start refuses a bot token before anything is sent, and keeps nothing", async () => {
  const keyring = memoryKeyring()
  const service = fakeSlack()
  const refused = await runCli(["personal", "session", "start", "--json"], {
    keyring,
    service,
    stdin: "xoxb-0synth-bot-fake",
  })
  expect(refused.json()).toMatchObject({ error: { code: "validation_error" } })
  expect(refused.err).toContain("User OAuth Token")
  expect(service.calls).toEqual([])
  expect(new ProfileTokenStore({ app: IDENTITY, keyring }).signedIn("personal")).toBe(false)
})

it("session start refuses a rotating token (xoxe.) before anything is sent, and keeps nothing", async () => {
  const keyring = memoryKeyring()
  const service = fakeSlack()
  const refused = await runCli(["personal", "session", "start", "--json"], {
    keyring,
    service,
    stdin: "xoxe.xoxp-0synth-rotating-fake",
  })
  expect(refused.json()).toMatchObject({
    error: { code: "validation_error", message: expect.stringContaining("token rotation off") },
  })
  expect(service.calls).toEqual([])
  expect(new ProfileTokenStore({ app: IDENTITY, keyring }).signedIn("personal")).toBe(false)
})

it("a token from SLACK_TOKEN is refused as session start refuses it, before anything is sent", async () => {
  const service = fakeSlack()
  for (const token of ["xoxb-0synth-bot-fake", "xoxe.xoxp-0synth-rotating-fake"]) {
    const ran = await runCli(["personal", "api", "auth", "test", "--json"], {
      keyring: memoryKeyring(),
      service,
      env: { SLACK_TOKEN: token },
    })
    expect(ran.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(ran.err).not.toContain(token)
  }
  expect(service.calls).toEqual([])
})

it("session start refuses what is no user token, and a token Slack says is a bot's", async () => {
  const keyring = memoryKeyring()
  const other = await runCli(["personal", "session", "start", "--json"], { keyring, stdin: "xapp-0synth-fake" })
  expect(other.json()).toMatchObject({ error: { code: "validation_error" } })
  const bot = await runCli(["personal", "session", "start", "--json"], {
    keyring,
    service: fakeSlack({ "auth.test": { body: { ...AUTH_TEST, bot_id: "B0SYNTH01" } } }),
    stdin: FAKE_TOKEN,
  })
  expect(bot.json()).toMatchObject({ error: { code: "validation_error" } })
  expect(new ProfileTokenStore({ app: IDENTITY, keyring }).signedIn("personal")).toBe(false)
})

it("session start keeps nothing when Slack refuses the token with HTTP 200 and ok: false", async () => {
  const keyring = memoryKeyring()
  const refused = await runCli(["personal", "session", "start", "--json"], {
    keyring,
    service: fakeSlack({}, "xoxp-0synth-other"),
    stdin: FAKE_TOKEN,
  })
  expect(refused.json()).toMatchObject({
    error: { code: "authentication_error", message: expect.stringContaining("invalid_auth") },
  })
  const status = await runCli(["personal", "session", "status", "--json"], { keyring })
  expect(status.json().item).toMatchObject({ state: "missing" })
})

it("session start --credential-storage file, or with no working keyring, keeps the token in a private file", async () => {
  const keyring = brokenKeyring()
  const started = await runCli(["personal", "session", "start", "--json"], {
    keyring,
    service: fakeSlack(),
    stdin: FAKE_TOKEN,
  })
  expect(started.json().item).toMatchObject({ stored_in: "file" })
  expect(started.err).toContain("keyring")
  expect((await runCli(["personal", "session", "end", "--json"], { keyring })).code).toBe(0)
  const filed = await runCli(["personal", "session", "start", "--credential-storage", "file", "--json"], {
    keyring: memoryKeyring(),
    service: fakeSlack(),
    stdin: FAKE_TOKEN,
  })
  expect(filed.json().item).toMatchObject({ stored_in: "file" })
  expect((await runCli(["personal", "session", "end", "--json"])).code).toBe(0)
})

it("doctor --online asks Slack about the named profile's token, and says when Slack refuses it", async () => {
  rememberAccount(IDENTITY, "personal", `${AUTH_TEST.team_id}:${AUTH_TEST.user_id}`, process.env)
  const good = await runCli(["personal", "doctor", "--online", "--json"], { service: fakeSlack() })
  expect(good.json().item).toMatchObject({ online: { ok: true } })
  const revoked = memoryKeyring({ "slack-cli:token:personal": "xoxp-0synth-revoked" })
  const refused = await runCli(["personal", "doctor", "--online", "--json"], { keyring: revoked, service: fakeSlack() })
  const { online } = refused.json().item as { online: unknown }
  expect(online).toMatchObject({ ok: false, error_code: "authentication_error" })
  expect(JSON.stringify(refused.json())).not.toContain("xoxp-")
})

it("doctor without --online calls nothing", async () => {
  const service = fakeSlack()
  expect((await runCli(["doctor", "--json"], { service })).code).toBe(0)
  expect(service.calls).toEqual([])
})
