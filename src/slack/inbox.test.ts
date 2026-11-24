import { rmSync } from "node:fs"
import { join } from "node:path"
import { afterEach, expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { runCli } from "../testing/harness.js"
import { ANNA, DM, GENERAL, ME, remembered, SHARED, ts, workspace } from "../testing/workspace.js"
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

it("lists an unread DM's newest messages", async () => {
  remembered()
  const service = fakeSlack({}, FAKE_TOKEN, workspace())
  const answer = await inbox(service)
  expect(answer.items.map((one) => one.ref.split("/").pop())).toContainEqual(ts(5))
  expect(infos(service)[0]).toBe(DM)
})

it("counts a channel outside the list only when a message after last_read mentions you", async () => {
  remembered()
  const world = workspace()
  const general = world.channels.find((one) => one.id === GENERAL)
  if (general) general.lastRead = ts(5)
  const service = fakeSlack({}, FAKE_TOKEN, world)
  const answer = await inbox(service)
  const refs = answer.items.map((one) => one.ref)
  expect(refs).toContainEqual(expect.stringContaining(GENERAL))
  expect(refs).not.toContainEqual(expect.stringContaining(SHARED))
  if (general) general.lastRead = ts(45)
  const read = await inbox(fakeSlack({}, FAKE_TOKEN, world))
  expect(read.items.map((one) => one.ref)).not.toContainEqual(expect.stringContaining(GENERAL))
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
  expect(infos(service).filter((id) => String(id).startsWith("D"))).toHaveLength(INBOX_INFO_MOST)
  expect(answer.meta?.truncated).toBe(true)
  expect(answer.missing?.map((one) => one.why)).toContainEqual(
    `counted ${INBOX_INFO_MOST} of ${INBOX_INFO_MOST + 7} DMs, group DMs and followed channels; the rest may hold ` +
      "unread messages",
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
  expect(answer?.left).toContainEqual(expect.stringMatching(/^time ran out: counted 4 of \d+ DMs/))
})

afterEach(() => rmSync(join(process.env.SLACK_CONFIG_DIR ?? "", "config.json"), { force: true }))

const following = async (...settings: [string, string][]) => {
  for (const [key, value] of settings) {
    const set = await runCli(["personal", "config", "set", key, value])
    expect(set.code, set.err).toBe(0)
  }
}

const histories = (service: ReturnType<typeof fakeSlack>) =>
  service.calls.filter((one) => one.method === "conversations.history")

it("counts a followed channel's messages after last_read, others' only, and leaves other channels out", async () => {
  remembered()
  const world = workspace()
  const general = world.channels.find((one) => one.id === GENERAL)
  if (general) general.lastRead = ts(35)
  const service = fakeSlack({}, FAKE_TOKEN, world)
  await following(["inbox_channels", "#General"])
  const answer = await inbox(service)
  expect(answer.items.map((one) => one.ref)).toContainEqual(expect.stringContaining(GENERAL))
  expect(histories(service).find((one) => one.args.channel === GENERAL)?.args.oldest).toBe(ts(35))
  expect(infos(service).filter((id) => String(id).startsWith("C"))[0]).toBe(GENERAL)
})

it("leaves a followed channel out when everything in it is read", async () => {
  remembered()
  const world = workspace()
  const general = world.channels.find((one) => one.id === GENERAL)
  if (general) general.lastRead = ts(60)
  const service = fakeSlack({}, FAKE_TOKEN, world)
  await following(["inbox_channels", GENERAL])
  const answer = await inbox(service)
  expect(answer.items.map((one) => one.ref)).not.toContainEqual(expect.stringContaining(GENERAL))
})

it("refuses a followed channel that is none of the owner's, naming the ones it could be", async () => {
  remembered()
  await following(["inbox_channels", "#nope"])
  const ran = await runCli(["personal", "inbox", "--json"], { service: fakeSlack({}, FAKE_TOKEN, workspace()) })
  expect(ran.code).not.toBe(0)
  expect(ran.err).toContain("inbox_channels names #nope")
  expect(ran.err).toContain("#general")
})

it("counts every channel the owner is in with inbox_all_channels, archived ones aside", async () => {
  remembered()
  const service = fakeSlack({}, FAKE_TOKEN, workspace())
  await following(["inbox_all_channels", "true"])
  const answer = await inbox(service)
  const asked = infos(service).filter((id) => !/^[DG]0SYNTH/.test(String(id)))
  expect(asked.sort()).toEqual(["C0SHARD01", GENERAL].sort())
  expect(answer.missing?.map((one) => one.why) ?? []).not.toContainEqual(expect.stringContaining("looked for mentions"))
})

const adapterOf = (
  world: ReturnType<typeof workspace>,
  inbox: { channels: string[]; allChannels: boolean } = { channels: [], allChannels: false },
  now?: () => number,
) => {
  const service = fakeSlack({}, FAKE_TOKEN, world)
  const adapter = slackAdapter({
    slack: slackClient({ token: FAKE_TOKEN, fetch: service.fetch }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: service.fetch,
    inbox,
    ...(now ? { now } : {}),
  })
  return { service, adapter }
}

const readFrom = (world: ReturnType<typeof workspace>, id: string, lastRead: string) => {
  const one = world.channels.find((each) => each.id === id)
  if (one) one.lastRead = lastRead
}

it("counts in a followed channel only other people's shown messages after last_read", async () => {
  const world = workspace()
  readFrom(world, GENERAL, ts(15))
  const { adapter } = adapterOf(world, { channels: ["general"], allChannels: false })
  const general = (await adapter.unreadChats?.())?.items.find((one) => one.id === GENERAL)
  expect(general?.unreadCount).toBe(3)
})

it("takes last_read as read: a mention at exactly last_read does not count", async () => {
  const world = workspace()
  readFrom(world, GENERAL, ts(30))
  world.messages[GENERAL] = (world.messages[GENERAL] ?? []).filter((one) => one.ts !== ts(40) && one.ts !== ts(50))
  const { adapter } = adapterOf(world)
  expect((await adapter.unreadChats?.())?.items.map((one) => one.id)).not.toContain(GENERAL)
})

it("counts @here as a mention, and shows a mention-only channel down to its newest mention", async () => {
  const world = workspace()
  readFrom(world, GENERAL, ts(5))
  const { adapter } = adapterOf(world)
  const general = (await adapter.unreadChats?.())?.items.find((one) => one.id === GENERAL)
  expect(general?.unreadMentions).toBe(2)
  expect(general?.unreadCount).toBe(4)
})

it("answers cli-core's history read of a counted channel from the page inbox already read", async () => {
  const world = workspace()
  readFrom(world, GENERAL, ts(5))
  const { adapter, service } = adapterOf(world, { channels: ["#general"], allChannels: false })
  await adapter.unreadChats?.()
  const before = histories(service).length
  const page = await adapter.history?.(GENERAL, { limit: 2 })
  expect(page?.items).toHaveLength(2)
  expect(histories(service)).toHaveLength(before)
})

it("asks a channel named twice in inbox_channels once", async () => {
  const { adapter, service } = adapterOf(workspace(), { channels: ["#general", GENERAL], allChannels: false })
  await adapter.unreadChats?.()
  expect(infos(service).filter((id) => id === GENERAL)).toHaveLength(1)
})

it("says time ran out and how many other channels it looked at for mentions", async () => {
  let service: ReturnType<typeof fakeSlack> | undefined
  const ran = adapterOf(workspace(), undefined, () => (service ? infos(service).length : 0) * (INBOX_ASK_MS / 3))
  service = ran.service
  const answer = await ran.adapter.unreadChats?.()
  expect(answer?.left).toContainEqual(expect.stringMatching(/^time ran out: looked for mentions of you in 1 of 2 /))
})

it("says Slack refused a call when a later chat fails, and keeps what it counted", async () => {
  const world = workspace()
  const refusing = adapterOf(world)
  const failing = slackAdapter({
    slack: slackClient({
      token: FAKE_TOKEN,
      fetch: async (input, init) => {
        const body = String(init?.body ?? "")
        if (String(input).endsWith("conversations.history") && body.includes(SHARED))
          return new Response(JSON.stringify({ ok: false, error: "internal_error" }), { status: 200 })
        return refusing.service.fetch(input, init)
      },
    }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: refusing.service.fetch,
  })
  const answer = await failing.unreadChats?.()
  expect(answer?.items.length).toBeGreaterThan(0)
  expect(answer?.left).toContainEqual(expect.stringMatching(/^Slack refused a call \(/))
})
