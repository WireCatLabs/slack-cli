import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { GENERAL, ME, workspace } from "../testing/workspace.js"
import { slackAdapter } from "./adapter.js"
import { slackClient } from "./client.js"

const POINT = 1_700_000_000
const tsAt = (seconds: number) => `${POINT + seconds}.000100`

it("finds the oldest messages after a point in a busy chat from a few pages, not every message since", async () => {
  const chat = workspace()
  // 50,000 messages, one every 3 s from two hours after the point: a day of them.
  chat.messages[GENERAL] = Array.from({ length: 50_000 }, (_, at) => ({
    ts: tsAt(7200 + 3 * at),
    user: ME,
    text: `m${at}`,
  }))
  const service = fakeSlack({}, FAKE_TOKEN, chat)
  const adapter = slackAdapter({
    slack: slackClient({ token: FAKE_TOKEN, fetch: service.fetch }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: service.fetch,
    now: () => (POINT + 30 * 86_400) * 1000,
  })
  const found = await adapter.historyAfter?.("general", { limit: 5, after: { id: tsAt(0) } })
  expect(found?.items.map((one) => one.id)).toEqual([0, 1, 2, 3, 4].map((at) => tsAt(7200 + 3 * at)))
  expect(found?.hasMore).toBe(true)
  const pages = service.calls.filter((one) => one.method === "conversations.history").length
  expect(pages).toBeLessThanOrEqual(12)
})
