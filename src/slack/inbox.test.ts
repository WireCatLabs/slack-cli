import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { runCli } from "../testing/harness.js"
import { ANNA, DM, ME, remembered, ts, workspace } from "../testing/workspace.js"
import { INBOX_ASK_MS, INBOX_INFO_MOST, slackAdapter } from "./adapter.js"
import { slackClient } from "./client.js"

interface Answer {
  items: { ref: string }[]
  missing?: { field: string; why: string }[]
  meta?: { truncated?: boolean }
}

const inbox = async (service: ReturnType<typeof fakeSlack>) => {
  const ran = await runCli(["personal", "inbox", "--json"], { service })
  expect(ran.code, ran.err).toBe(0)
  return JSON.parse(ran.out) as Answer
}

const infos = (service: ReturnType<typeof fakeSlack>) =>
  service.calls.filter((one) => one.method === "conversations.info").map((one) => one.args.channel)

it("lists an unread DM's newest messages, asks only DMs, and says channels were not counted", async () => {
  remembered()
  const service = fakeSlack({}, FAKE_TOKEN, workspace())
  const answer = await inbox(service)
  expect(answer.items.map((one) => one.ref.split("/").pop())).toEqual([ts(5)])
  expect(infos(service)[0]).toBe(DM)
  expect(infos(service).every((id) => /^[DG]/.test(String(id)))).toBe(true)
  expect(answer.missing?.map((one) => one.why)).toContainEqual(expect.stringContaining("channels are not counted"))
})

it("leaves chats list one list, with no call per chat", async () => {
  remembered()
  const service = fakeSlack({}, FAKE_TOKEN, workspace())
  await runCli(["personal", "chats", "list", "--json"], { service })
  expect(infos(service)).toEqual([])
})

it(`asks at most ${INBOX_INFO_MOST} DMs and says how many it counted`, async () => {
  remembered()
  const world = workspace()
  for (let at = 0; at < INBOX_INFO_MOST + 5; at++)
    world.channels.push({ id: `D0MANY${String(at).padStart(3, "0")}`, kind: "im", user: ANNA, members: [ME, ANNA] })
  const service = fakeSlack({}, FAKE_TOKEN, world)
  const answer = await inbox(service)
  expect(infos(service)).toHaveLength(INBOX_INFO_MOST)
  expect(answer.meta?.truncated).toBe(true)
  expect(answer.missing?.map((one) => one.why)).toContainEqual(
    `counted ${INBOX_INFO_MOST} of ${INBOX_INFO_MOST + 7} DMs and group DMs; the rest may hold unread messages`,
  )
})

it("keeps what it counted when Slack refuses a later DM", async () => {
  remembered()
  const world = workspace()
  world.channels.push({ id: "D0LATE001", kind: "im", user: ANNA, members: [ME, ANNA] })
  const service = fakeSlack({}, FAKE_TOKEN, world)
  const fetch = service.fetch
  service.fetch = async (input, init) => {
    const body = String(init?.body ?? "")
    if (String(input).endsWith("/conversations.info") && body.includes("D0LATE001"))
      return Response.json({ ok: false, error: "internal_error" })
    return fetch(input, init)
  }
  const answer = await inbox(service)
  expect(answer.items.map((one) => one.ref.split("/").pop())).toEqual([ts(5)])
  expect(answer.meta?.truncated).toBe(true)
})

it("stops asking when its time is spent, within a command's 30 s, and says how many it counted", async () => {
  const world = workspace()
  for (let at = 0; at < 10; at++)
    world.channels.push({ id: `D0SLOW${String(at).padStart(3, "0")}`, kind: "im", user: ANNA, members: [ME, ANNA] })
  const service = fakeSlack({}, FAKE_TOKEN, world)
  const adapter = slackAdapter({
    slack: slackClient({ token: FAKE_TOKEN, fetch: service.fetch }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: service.fetch,
    now: () => infos(service).length * (INBOX_ASK_MS / 4),
  })
  const answer = await adapter.unreadChats?.()
  expect(infos(service)).toHaveLength(4)
  expect(answer?.left).toContainEqual(expect.stringMatching(/^counted 4 of \d+ DMs/))
})
