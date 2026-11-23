import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { GENERAL, ME, ts, workspace } from "../testing/workspace.js"
import { slackAdapter } from "./adapter.js"
import { slackClient } from "./client.js"

const adapterOf = (service = fakeSlack({}, FAKE_TOKEN, workspace())) => ({
  service,
  adapter: slackAdapter({
    slack: slackClient({ token: FAKE_TOKEN, fetch: service.fetch }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: service.fetch,
  }),
})

it("keeps a reply in its thread, from the root its permalink names", async () => {
  const { adapter } = adapterOf()
  const found = await adapter.searchMessages?.({ text: "Sending" }, { limit: 5 })
  expect(found?.items[0]).toMatchObject({ id: ts(32), chatId: GENERAL, threadId: ts(30), threadRootId: ts(30) })
})

it("asks one chat with in: and the days around the moments, and keeps only what falls between them", async () => {
  const { adapter, service } = adapterOf()
  const minDate = Number(ts(20)) * 1000
  const maxDate = Number(ts(31)) * 1000
  const found = await adapter.searchMessages?.({ text: "", chat: "#general", minDate, maxDate }, { limit: 10 })
  expect(found?.items.map((one) => one.id)).toEqual([ts(31), ts(30), ts(20)])
  expect(found?.chats.map((one) => one.title)).toEqual(["general"])
  const query = service.calls.find((one) => one.method === "search.messages")?.args.query
  expect(query).toBe("in:general after:2023-11-12 before:2023-11-16")
})

it("pages on while a chat's own matches are fewer than asked, and says there is more past the limit", async () => {
  const world = workspace()
  world.messages[GENERAL] = Array.from({ length: 150 }, (_, at) => ({ ts: ts(100 + at), user: ME, text: `note ${at}` }))
  const { adapter, service } = adapterOf(fakeSlack({}, FAKE_TOKEN, world))
  const found = await adapter.searchMessages?.({ text: "note" }, { limit: 120 })
  expect(found?.items).toHaveLength(120)
  expect(found?.items[0]?.id).toBe(ts(249))
  expect(found?.hasMore).toBe(true)
  expect(service.calls.filter((one) => one.method === "search.messages")).toHaveLength(2)
})
