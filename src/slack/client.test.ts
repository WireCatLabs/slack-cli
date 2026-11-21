import * as v from "valibot"
import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { slackClient, slackFailure } from "./client.js"
import { authTestAnswer } from "./map.js"

const anything = v.looseObject({ ok: v.literal(true) })

it("POSTs a form with the token only in the Bearer header, and refuses a redirect", async () => {
  const slack = fakeSlack()
  const sent: RequestInit[] = []
  const answer = await slackClient({
    token: FAKE_TOKEN,
    fetch: (input, init = {}) => {
      sent.push(init)
      return slack.fetch(input, init)
    },
  })("auth.test", {}, authTestAnswer)
  expect(answer).toMatchObject({ team_id: "T0SYNTH01", user_id: "U0SYNTH01" })
  expect(slack.refusals).toEqual([])
  expect(sent[0]?.redirect).toBe("error")
  expect(String(sent[0]?.body)).not.toContain(FAKE_TOKEN)
})

// Slack's error codes: https://docs.slack.dev/reference/methods/auth.test/ and each method's "Errors".
it.each([
  ["invalid_auth", false, "authentication_error"],
  ["token_revoked", false, "authentication_error"],
  ["account_inactive", false, "authentication_error"],
  ["missing_scope", false, "permission_error"],
  ["ratelimited", false, "rate_limited"],
  ["channel_not_found", false, "not_found"],
  ["invalid_cursor", false, "validation_error"],
  ["internal_error", false, "provider_unavailable"],
  ["internal_error", true, "outcome_unknown"],
  ["is_archived", true, "provider_error"],
])("Slack's %s (a write: %s) is %s", (error, writes, code) => {
  expect(slackFailure(error, writes).code).toBe(code)
})

it("a refusal with HTTP 200 keeps Slack's code and the scope it needs, never its free text", async () => {
  const slack = fakeSlack({
    "auth.test": { body: { ok: false, error: "missing_scope", needed: "channels:history", warning: "free text here" } },
  })
  const failure = slackClient({ token: FAKE_TOKEN, fetch: slack.fetch })("auth.test", {}, anything)
  await expect(failure).rejects.toMatchObject({
    code: "permission_error",
    details: { slack_error: "missing_scope", needed: "channels:history" },
  })
  await expect(failure).rejects.not.toThrow("free text")
})

it("a 429 waits for Retry-After through the pace, then sends once more", async () => {
  let turn = 0
  const holds: number[] = []
  const slack = fakeSlack({
    "auth.test": () =>
      turn++ === 0
        ? { status: 429, headers: { "retry-after": "2" }, body: { ok: false, error: "ratelimited" } }
        : { body: { ok: true } },
  })
  const pacer = { reserve: async () => Date.now(), holdFor: async (ms: number) => void holds.push(ms) }
  const slept: number[] = []
  const sleep = async (ms: number) => void slept.push(ms)
  await expect(
    slackClient({ token: FAKE_TOKEN, fetch: slack.fetch, pacer, sleep })("auth.test", {}, anything),
  ).resolves.toEqual({
    ok: true,
  })
  expect(holds).toEqual([2000])
  expect(slept).toEqual([2000])
  expect(slack.calls).toHaveLength(2)
})

it("an answer without the documented fields is invalid_response; one that is not JSON too", async () => {
  const shapeless = fakeSlack({ "auth.test": { body: { ok: true } } })
  await expect(
    slackClient({ token: FAKE_TOKEN, fetch: shapeless.fetch })("auth.test", {}, authTestAnswer),
  ).rejects.toMatchObject({ code: "invalid_response" })
  const html = async () => new Response("<html>", { headers: { "content-type": "text/html" } })
  await expect(slackClient({ token: FAKE_TOKEN, fetch: html })("auth.test", {}, anything)).rejects.toMatchObject({
    code: "invalid_response",
  })
})

it("HTTP failures: a 5xx read may be retried, a 5xx write is outcome_unknown", async () => {
  const down = async () => new Response("", { status: 503 })
  const call = (writes: boolean) =>
    slackClient({ token: FAKE_TOKEN, fetch: down })("auth.test", {}, anything, { writes })
  await expect(call(false)).rejects.toMatchObject({ code: "provider_unavailable", details: { retryable: true } })
  await expect(call(true)).rejects.toMatchObject({ code: "outcome_unknown", details: { retryable: false } })
})

it("no answer: a read is a network error, a stopped read is cancelled, a write is outcome_unknown", async () => {
  const failing = async () => Promise.reject(new TypeError("fetch failed"))
  const call = (writes: boolean, signal?: AbortSignal) =>
    slackClient({ token: FAKE_TOKEN, fetch: failing, signal })("auth.test", {}, anything, { writes })
  await expect(call(false)).rejects.toMatchObject({ code: "network_error" })
  await expect(call(true)).rejects.toMatchObject({ code: "outcome_unknown" })
  const stop = new AbortController()
  stop.abort()
  await expect(call(false, stop.signal)).rejects.toMatchObject({ code: "cancelled" })
})
