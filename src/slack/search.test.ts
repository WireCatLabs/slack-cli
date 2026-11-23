import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { ANNA, BORIS, DM, GENERAL, ME, SHARED, ts, VERA, workspace } from "../testing/workspace.js"
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

it("names a DM after the person, from the person's id Slack puts in channel.name", async () => {
  const { adapter } = adapterOf()
  const found = await adapter.searchMessages?.({ text: "free" }, { limit: 5 })
  expect(found?.items[0]).toMatchObject({ id: ts(5), chatId: DM, chatTitle: "Anna Synth" })
  expect(found?.chats[0]).toMatchObject({ id: DM, kind: "dialog", title: "Anna Synth" })
})

it("asks for one sender with from:", async () => {
  const { adapter, service } = adapterOf()
  await adapter.searchMessages?.({ text: "plan", chat: "#general", from: ANNA }, { limit: 5 })
  expect(service.calls.find((one) => one.method === "search.messages")?.args.query).toBe(
    `plan in:general from:<@${ANNA}>`,
  )
})

const answered = (matches: Record<string, unknown>[], pages = 1) =>
  fakeSlack(
    {
      "search.messages": {
        body: { ok: true, messages: { matches, paging: { count: 100, page: 1, pages } } },
      },
    },
    FAKE_TOKEN,
    workspace(),
  )

it("keeps only the asked chat's matches, whatever Slack's in: matched", async () => {
  const general = { channel: { id: GENERAL, name: "general" }, ts: ts(30), user: BORIS, text: "numbers" }
  const elsewhere = { channel: { id: SHARED, name: "general" }, ts: ts(31), user: VERA, text: "numbers" }
  const { adapter } = adapterOf(answered([elsewhere, general]))
  const found = await adapter.searchMessages?.({ text: "numbers", chat: "#general" }, { limit: 5 })
  expect(found?.items.map((one) => one.chatId)).toEqual([GENERAL])
})

it("takes a bot's empty user as no person, and its username as the sender", async () => {
  const bot = {
    channel: { id: GENERAL, name: "general" },
    ts: ts(50),
    user: "",
    username: "deploybot",
    text: "Deployed",
  }
  const { adapter } = adapterOf(answered([bot]))
  const found = await adapter.searchMessages?.({ text: "Deployed" }, { limit: 5 })
  expect(found?.items[0]).toMatchObject({ senderName: "deploybot" })
  expect(found?.items[0]?.senderId).not.toBe("")
})

it("stops after three pages and says there is more", async () => {
  const world = workspace()
  world.messages[GENERAL] = Array.from({ length: 500 }, (_, at) => ({ ts: ts(100 + at), user: ME, text: `note ${at}` }))
  const { adapter, service } = adapterOf(fakeSlack({}, FAKE_TOKEN, world))
  const found = await adapter.searchMessages?.({ text: "note" }, { limit: 400 })
  expect(found?.items).toHaveLength(300)
  expect(found?.items[0]?.id).toBe(ts(599))
  expect(found?.hasMore).toBe(true)
  expect(service.calls.filter((one) => one.method === "search.messages")).toHaveLength(3)
})

it("asks no further page once a page holds enough", async () => {
  const world = workspace()
  world.messages[GENERAL] = Array.from({ length: 250 }, (_, at) => ({ ts: ts(100 + at), user: ME, text: `note ${at}` }))
  const { adapter, service } = adapterOf(fakeSlack({}, FAKE_TOKEN, world))
  const found = await adapter.searchMessages?.({ text: "note" }, { limit: 100 })
  expect(found).toMatchObject({ hasMore: true })
  expect(service.calls.filter((one) => one.method === "search.messages")).toHaveLength(1)
})

it("asks Slack nothing for a limit of none", async () => {
  const { adapter, service } = adapterOf()
  expect(await adapter.searchMessages?.({ text: "numbers" }, { limit: 0 })).toEqual({
    items: [],
    hasMore: false,
    chats: [],
  })
  expect(service.calls).toEqual([])
})
