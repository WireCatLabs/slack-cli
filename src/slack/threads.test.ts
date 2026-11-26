import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { ANNA, BORIS, daysAgo, GENERAL, ME, ts, workspace } from "../testing/workspace.js"
import { slackAdapter } from "./adapter.js"
import { slackClient } from "./client.js"
import { timeOf } from "./map.js"

const adapterOf = (chat: ReturnType<typeof workspace>) => {
  const service = fakeSlack({}, FAKE_TOKEN, chat)
  return slackAdapter({
    slack: slackClient({ token: FAKE_TOKEN, fetch: service.fetch }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: service.fetch,
  })
}

it("names the roots on a history page, with the time of each one's newest reply", async () => {
  const adapter = adapterOf(workspace())
  const page = await adapter.history?.("general", { limit: 20 })
  expect(await adapter.threadRootsIn?.(GENERAL, page?.items ?? [])).toEqual([
    { id: ts(30), lastReplyAt: timeOf(ts(32)) },
  ])
})

it("lists as recent only the roots sent within the thread window", async () => {
  const chat = workspace()
  const root = daysAgo(3)
  chat.messages[GENERAL]?.push(
    { ts: root, user: ANNA, text: "Recent question" },
    { ts: daysAgo(2), user: BORIS, text: "Recent answer", thread_ts: root },
  )
  const adapter = adapterOf(chat)
  expect(await adapter.recentThreadRoots?.(GENERAL)).toEqual([{ id: root, lastReplyAt: timeOf(daysAgo(2)) }])
})

it("reads one thread's replies, without its root, after a time or whole", async () => {
  const chat = workspace()
  chat.messages[GENERAL]?.push(
    { ts: ts(60), user: ANNA, text: "Second topic" },
    { ts: ts(61), user: BORIS, text: "On it", thread_ts: ts(60) },
    { ts: ts(62), user: ME, text: "Thanks", thread_ts: ts(60) },
  )
  const adapter = adapterOf(chat)
  const whole = await adapter.rootReplies?.(GENERAL, ts(60), {})
  expect(Array.isArray(whole) && whole.map((one) => one.id)).toEqual([ts(61), ts(62)])
  const after = await adapter.rootReplies?.(GENERAL, ts(60), { after: Date.parse(timeOf(ts(61))) + 1 })
  expect(Array.isArray(after) && after.map((one) => one.id)).toEqual([ts(62)])
})
