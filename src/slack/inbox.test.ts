import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { runCli } from "../testing/harness.js"
import { ANNA, ME, remembered, ts, workspace } from "../testing/workspace.js"
import { INBOX_INFO_MOST } from "./adapter.js"

const inbox = (service: ReturnType<typeof fakeSlack>, ...words: string[]) =>
  runCli(["personal", "inbox", ...words, "--json"], { service })

it("lists a DM with unread messages and its newest ones, and leaves chats list free of per-chat calls", async () => {
  remembered()
  const service = fakeSlack({}, FAKE_TOKEN, workspace())
  const ran = await inbox(service)
  expect(ran.code).toBe(0)
  const answer = JSON.parse(ran.out) as { items: { chat_id?: string; id: string }[] }
  expect(answer.items.map((one) => one.id)).toEqual([ts(5)])
  const infos = service.calls.filter((one) => one.method === "conversations.info").length
  service.calls.length = 0
  await runCli(["personal", "chats", "list", "--json"], { service })
  expect(service.calls.filter((one) => one.method === "conversations.info")).toEqual([])
  expect(infos).toBeGreaterThan(0)
})

it(`asks at most ${INBOX_INFO_MOST} DMs and says the answer may have missed one`, async () => {
  remembered()
  const world = workspace()
  for (let at = 0; at < INBOX_INFO_MOST + 5; at++) {
    const id = `D0MANY${String(at).padStart(3, "0")}`
    world.channels.push({ id, kind: "im", user: ANNA, members: [ME, ANNA] })
  }
  const service = fakeSlack({}, FAKE_TOKEN, world)
  const ran = await inbox(service)
  expect(ran.code).toBe(0)
  expect(service.calls.filter((one) => one.method === "conversations.info")).toHaveLength(INBOX_INFO_MOST)
  expect(JSON.parse(ran.out)).toMatchObject({ meta: { truncated: true } })
})
