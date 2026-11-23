import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { brokenKeyring, memoryKeyring } from "@wirecat/cli-base"
import { accountFileFor, recalledAccount, rememberAccount } from "@wirecat/cli-core/cli"
import { beforeEach, describe, expect, it } from "vitest"
import { IDENTITY } from "./identity.js"
import { FAKE_TOKEN, type FakeMessage, type FakeWorkspace, fakeSlack } from "./testing/fake-slack.js"
import { runCli } from "./testing/harness.js"
import {
  ANNA,
  ARCHIVED,
  BORIS,
  DM,
  daysAgo,
  FILE_URL,
  GENERAL,
  GROUP_DM,
  ME,
  PRIVATE_UNJOINED,
  PUBLIC_UNJOINED,
  remembered,
  SHARED,
  ts,
  VERA,
  workspace,
} from "./testing/workspace.js"

type Item = Record<string, unknown> & { id: string }

const accountFile = () => accountFileFor(IDENTITY, "personal", process.env)

const slackOf = (world: FakeWorkspace = workspace()) => fakeSlack({}, FAKE_TOKEN, world)

const items = (ran: { json: () => Record<string, unknown> }) => ran.json().items as Item[]

const byId = (list: Item[], id: string) => list.find((one) => one.id === id)

// Each test reads its own local store: --offline answers from what earlier tests synced otherwise.
beforeEach(() => {
  const state = mkdtempSync(join(tmpdir(), "slack-state-"))
  process.env.SLACK_STATE_DIR = state
  process.env.MESSAGING_STORE = join(state, "wirecat.db")
  remembered()
})

describe("chats", () => {
  it("**lists the conversations the person is in**, a DM as a dialog named after the person and every channel as a group", async () => {
    const ran = await runCli(["personal", "chats", "list", "--json"], { service: slackOf() })
    expect(ran.code).toBe(0)
    const chats = items(ran)
    expect(chats.map((one) => one.id)).toEqual([GENERAL, DM, GROUP_DM, SHARED])
    expect(byId(chats, DM)).toMatchObject({
      kind: "dialog",
      title: "Anna Synth",
      provider_metadata: { slack_kind: "im", slack_user: ANNA },
    })
    expect(byId(chats, GENERAL)).toMatchObject({ kind: "group", title: "general", unread_count: null })
    expect(byId(chats, GROUP_DM)).toMatchObject({ kind: "group", provider_metadata: { slack_kind: "mpim" } })
    expect(byId(chats, SHARED)).toMatchObject({ provider_metadata: { slack_kind: "private", slack_shared: true } })
  })

  it("**shows one DM with Slack's unread count**, which Slack gives only for a DM, and both people in it", async () => {
    const ran = await runCli(["personal", "chats", "show", "Anna Synth", "--json"], { service: slackOf() })
    expect(ran.json().item).toMatchObject({
      id: DM,
      unread_count: 1,
      participants_count: 2,
      members: [{ id: ANNA, name: "Anna Synth" }, { id: ME }],
    })
  })

  it("**lists a channel's members** with their names", async () => {
    const ran = await runCli(["personal", "chats", "members", "list", "#general", "--json"], { service: slackOf() })
    expect(items(ran).map((one) => [one.id, one.name])).toEqual([
      [ME, "Test"],
      [ANNA, "Anna Synth"],
      [BORIS, "Boris Synth"],
    ])
  })

  it("**turns service messages into chat events**: who joined is an event, never a message", async () => {
    const service = slackOf()
    const events = await runCli(["personal", "chats", "events", "general", "time>2023-11-01", "--json"], { service })
    expect(events.code).toBe(0)
    expect(items(events)).toEqual([
      expect.objectContaining({ type: "join", people: [expect.objectContaining({ id: BORIS })] }),
    ])
    const listed = await runCli(["personal", "messages", "list", "general", "--json"], { service })
    expect(byId(items(listed), ts(0))).toBeUndefined()
  })

  it("**reads a public channel the person has not joined**, as a user token may", async () => {
    const ran = await runCli(["personal", "messages", "list", PUBLIC_UNJOINED, "--json"], { service: slackOf() })
    expect(items(ran).map((one) => one.text)).toEqual(["Anyone can read this"])
  })

  it("**cannot find a private conversation the person is not in**, as Slack answers", async () => {
    const ran = await runCli(["personal", "messages", "list", PRIVATE_UNJOINED, "--json"], { service: slackOf() })
    expect(ran.json()).toMatchObject({ error: { code: "not_found" } })
  })

  it("**leaves archived channels out of the list**, so a sync of every chat skips them", async () => {
    const service = slackOf()
    const ran = await runCli(["personal", "chats", "list", "--json"], { service })
    expect(byId(items(ran), ARCHIVED)).toBeUndefined()
    expect(service.calls.find((one) => one.method === "users.conversations")?.args.exclude_archived).toBe("true")
  })
})

describe("messages", () => {
  it("**reads a channel as plain text with names**, ts as the id, mentions as user ids, edits and reactions", async () => {
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service: slackOf() })
    const list = items(ran)
    expect(list.map((one) => one.id)).toEqual([ts(10), ts(20), ts(30), ts(32), ts(40), ts(50)])
    expect(byId(list, ts(10))).toMatchObject({
      text: "Hi @Test, the plan is in #general & here (https://example.com)",
      mentions: [ME],
      sender_name: "Anna Synth",
      outgoing: false,
    })
    expect(byId(list, ts(20))).toMatchObject({
      outgoing: true,
      sender_is_me: true,
      edited_at: "2023-11-14T22:13:45.000Z",
    })
    expect(byId(list, ts(30))).toMatchObject({
      text: "Who has the numbers? @here",
      thread_id: ts(30),
      provider_metadata: { reply_count: 2, latest_reply: ts(32) },
    })
    expect(byId(list, ts(40))).toMatchObject({
      reactions: { counts: [{ reaction: "eyes", count: 2 }], mine: "eyes", total: 2 },
      attachments: [{ kind: "file", name: "report.txt", mime: "text/plain", size: 12 }],
      provider_metadata: { slack_reactions: [{ name: "eyes", users: [ME, BORIS] }] },
    })
    expect(byId(list, ts(50))).toMatchObject({ sender_name: "deploybot", provider_metadata: { slack_bot: true } })
    expect(JSON.stringify(list)).not.toContain(FILE_URL)
  })

  it("**keeps a reply sent also to the channel once**, as a reply of its thread", async () => {
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service: slackOf() })
    const broadcast = items(ran).filter((one) => one.id === ts(32))
    expect(broadcast).toEqual([
      expect.objectContaining({
        thread_id: ts(30),
        thread_root_id: ts(30),
        provider_metadata: { slack_subtype: "thread_broadcast" },
      }),
    ])
  })

  it("**marks a person of another team** in a Slack Connect channel", async () => {
    const ran = await runCli(["personal", "messages", "list", SHARED, "--json"], { service: slackOf() })
    expect(items(ran)[0]).toMatchObject({ sender_id: VERA, provider_metadata: { slack_team: "T0OTHER01" } })
  })

  it("**reads a thread** by its root's ts: the root, then its replies", async () => {
    const ran = await runCli(["personal", "messages", "list", "general", `topic:${ts(30)}`, "--json"], {
      service: slackOf(),
    })
    expect(ran.code).toBe(0)
    expect(items(ran).map((one) => [one.id, one.thread_root_id ?? null])).toEqual([
      [ts(30), null],
      [ts(31), ts(30)],
      [ts(32), ts(30)],
    ])
  })

  it("**shows a reply by its ts** though it is not in the channel's history, and by the locator a list printed", async () => {
    const service = slackOf()
    const reply = await runCli(["personal", "messages", "show", "general", ts(31), "--json"], { service })
    expect(reply.json().item).toMatchObject({ id: ts(31), text: "I do", thread_root_id: ts(30) })
    const listed = await runCli(["personal", "messages", "list", "general", "--json"], { service })
    const ref = String(byId(items(listed), ts(20))?.ref)
    const again = await runCli(["personal", "messages", "show", ref, "--json"], { service })
    expect(again.json().item).toMatchObject({ id: ts(20), chat_id: GENERAL })
  })

  it("**reads the messages around one**, oldest first", async () => {
    const ran = await runCli(
      ["personal", "messages", "context", "general", ts(30), "--before-n", "1", "--after-n", "1", "--json"],
      {
        service: slackOf(),
      },
    )
    expect(items(ran).map((one) => one.id)).toEqual([ts(20), ts(30), ts(32)])
  })

  it("**downloads a file with the token, only from files.slack.com**", async () => {
    const service = slackOf()
    const dir = mkdtempSync(join(tmpdir(), "slack-download-"))
    const ran = await runCli(["personal", "messages", "download", "general", ts(40), "--output-dir", dir, "--json"], {
      service,
    })
    expect(ran.code).toBe(0)
    expect(readFileSync(join(dir, "report.txt"), "utf8")).toBe("the numbers\n")
    expect(ran.out + ran.err).not.toContain(FAKE_TOKEN)
  })

  it("**skips each file it cannot fetch** with the reason, and saves the rest, never sending off files.slack.com", async () => {
    const world = workspace()
    const message = world.messages[GENERAL]?.find((one) => one.ts === ts(40)) as FakeMessage
    message.files = [
      ...(message.files ?? []),
      { id: "F0SYNTH02", name: "x.txt", mimetype: "text/plain", url_private: "https://elsewhere.example/x" },
      { id: "F0SYNTH03", name: "old.txt", mimetype: "text/plain", mode: "hidden_by_limit" },
      {
        id: "F0SYNTH04",
        name: "doc",
        mimetype: "text/plain",
        is_external: true,
        url_private: "https://docs.example/d",
      },
      { id: "F0SYNTH05", name: "bad", mimetype: "text/plain", url_private: "not a url" },
    ]
    const service = slackOf(world)
    const dir = mkdtempSync(join(tmpdir(), "slack-download-"))
    const ran = await runCli(["personal", "messages", "download", "general", ts(40), "--output-dir", dir, "--json"], {
      service,
    })
    expect(ran.code).toBe(0)
    expect(ran.err).toContain("hidden past the workspace's history limit")
    expect(ran.err).toContain("a link to a file elsewhere")
    expect(readFileSync(join(dir, "report.txt"), "utf8")).toBe("the numbers\n")
    expect(service.downloads).toEqual([new URL(FILE_URL).pathname])
    expect(service.refusals).toEqual([])
  })

  it("**says which scope the app lacks** when Slack refuses a read for it", async () => {
    const world = { ...workspace(), scopes: ["channels:read", "users:read"] }
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service: slackOf(world) })
    expect(ran.json()).toMatchObject({ error: { code: "permission_error" } })
    expect(ran.err).toContain("channels:history")
  })
})

describe("contacts", () => {
  it("**shows a person** by their name, with the DM shared with them", async () => {
    const ran = await runCli(["personal", "contacts", "show", "anna", "--json"], { service: slackOf() })
    expect(ran.json().item).toMatchObject({ id: ANNA, name: "Anna Synth", username: "anna", description: "Planner" })
    expect(JSON.stringify(ran.json())).toContain(DM)
  })
})

const thread = (world: FakeWorkspace, root: string, reply: FakeMessage) => {
  world.messages[GENERAL]?.push({ thread_ts: root, ...reply })
}

const busyChannel = (rootTs: string, count: number): FakeWorkspace => {
  const world = workspace()
  world.messages[GENERAL] = [
    { ts: rootTs, user: ANNA, text: "An old question" },
    ...Array.from({ length: count }, (_, at) => ({ ts: daysAgo(1, (at + 1) * 1000), user: BORIS, text: `news ${at}` })),
  ]
  return world
}

const stored = async (service: ReturnType<typeof slackOf>, chat = GENERAL) =>
  items(await runCli(["personal", "messages", "list", chat, "--offline", "--limit", "100", "--json"], { service }))

describe("messages sync", () => {
  const syncOf =
    (service: ReturnType<typeof slackOf>, pageSize = "2") =>
    () =>
      runCli(["personal", "messages", "sync", "general", "--page-size", pageSize, "--pause", "1ms", "--json"], {
        service,
      })
  const repliesCalls = (service: ReturnType<typeof slackOf>) =>
    service.calls.filter((one) => one.method === "conversations.replies").length

  it("**reads each thread once on a first sync of several pages**", async () => {
    const world = workspace()
    world.messages[GENERAL] = Array.from({ length: 5 }, (_, at) => [
      { ts: daysAgo(2, (at + 1) * 1000), user: ANNA, text: `question ${at}` },
      { ts: daysAgo(1, (at + 1) * 1000), user: BORIS, text: `answer ${at}`, thread_ts: daysAgo(2, (at + 1) * 1000) },
    ]).flat()
    const service = slackOf(world)
    expect((await syncOf(service)()).code).toBe(0)
    expect(await stored(service)).toHaveLength(10)
    expect(repliesCalls(service)).toBe(5)
  })

  it("**brings a new reply to a 10-day-old thread in with one sync**, and a second sync adds nothing", async () => {
    const root = daysAgo(10)
    const world = busyChannel(root, 5)
    const service = slackOf(world)
    const sync = () =>
      runCli(["personal", "messages", "sync", "general", "--page-size", "2", "--pause", "1ms", "--json"], { service })
    expect((await sync()).code).toBe(0)
    expect((await stored(service)).length).toBe(6)

    const reply = daysAgo(0, 7)
    thread(world, root, { ts: reply, user: ME, text: "Answered at last" })
    expect((await sync()).code).toBe(0)
    // The store answers a message's thread by thread_id only; thread_root_id is its own row link, never read back.
    expect(byId(await stored(service), reply)).toMatchObject({ thread_id: root, text: "Answered at last" })

    const before = (await stored(service)).length
    expect((await sync()).code).toBe(0)
    expect((await stored(service)).length).toBe(before)
  })

  it("**asks again only for threads answered since the last sync**", async () => {
    const world = workspace()
    world.messages[GENERAL] = [{ ts: daysAgo(3), user: ANNA, text: "Old question" }]
    thread(world, daysAgo(3), { ts: daysAgo(2), user: BORIS, text: "Old answer" })
    const service = slackOf(world)
    await syncOf(service)()
    expect(repliesCalls(service)).toBe(1)
    await syncOf(service)()
    expect(repliesCalls(service)).toBe(1)
  })

  it("**reads a thread whole when a later sync first reaches its old root**, after one that stopped early", async () => {
    const root = daysAgo(40)
    const answer = daysAgo(39)
    const world = busyChannel(root, 3)
    thread(world, root, { ts: answer, user: BORIS, text: "Old answer" })
    const service = slackOf(world)
    const run = (...more: string[]) =>
      runCli(["personal", "messages", "sync", "general", "--page-size", "2", "--pause", "1ms", ...more, "--json"], {
        service,
      })
    expect((await run("--limit", "3")).code).toBe(0)
    expect(byId(await stored(service), root)).toBeUndefined()
    expect((await run()).code).toBe(0)
    expect(byId(await stored(service), answer)).toMatchObject({ text: "Old answer", thread_id: root })
  })

  it("**reads the replies of the roots it pages through**, older threads included", async () => {
    const world = workspace()
    const service = slackOf(world)
    expect(
      (await runCli(["personal", "messages", "sync", "general", "--pause", "1ms", "--json"], { service })).code,
    ).toBe(0)
    expect((await stored(service)).map((one) => one.id)).toEqual([
      ts(10),
      ts(20),
      ts(30),
      ts(31),
      ts(32),
      ts(40),
      ts(50),
    ])
  })

  it("**never marks a message deleted because Slack stopped showing it**", async () => {
    const world = workspace()
    const service = slackOf(world)
    await runCli(["personal", "messages", "sync", "general", "--pause", "1ms", "--json"], { service })
    world.messages[GENERAL] = world.messages[GENERAL]?.filter((one) => one.ts !== ts(20)) ?? []
    await runCli(["personal", "messages", "sync", "general", "--pause", "1ms", "--json"], { service })
    expect(byId(await stored(service), ts(20))).toMatchObject({ text: "Thanks, reading it" })
  })

  it("**makes what it synced searchable**, in this CLI and under the slack provider", async () => {
    const service = slackOf()
    await runCli(["personal", "messages", "sync", "general", "--pause", "1ms", "--json"], { service })
    const found = await runCli(["personal", "search", "all", "numbers", "--json"], { service })
    expect(items(found).map((one) => one.ref)).toEqual([`msg:slack/T0SYNTH01%3AU0SYNTH01/${GENERAL}/${ts(30)}`])
  })
})

describe("a token from SLACK_TOKEN", () => {
  const fromEnvironment = { SLACK_TOKEN: FAKE_TOKEN }

  it("**asks auth.test whose it is and remembers it**, so a profile never signed in here syncs", async () => {
    rmSync(accountFile(), { force: true })
    const service = slackOf()
    const sync = await runCli(["personal", "messages", "sync", "general", "--pause", "1ms", "--json"], {
      service,
      keyring: memoryKeyring(),
      env: fromEnvironment,
    })
    expect(sync.code).toBe(0)
    expect(service.calls.filter((one) => one.method === "auth.test")).toHaveLength(1)
    expect(recalledAccount(IDENTITY, "slack", "personal", process.env)?.account).toBe(`T0SYNTH01:${ME}`)
  })

  it("**is refused when the profile holds another account's messages**, before it reads anything", async () => {
    rememberAccount(IDENTITY, "personal", "T0OTHER01:U0OTHER01", process.env)
    const service = slackOf()
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], {
      service,
      keyring: memoryKeyring(),
      env: fromEnvironment,
    })
    expect(ran.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(ran.err).toContain("SLACK_TOKEN belongs to T0SYNTH01:U0SYNTH01")
    expect(service.calls.map((one) => one.method)).toEqual(["auth.test"])
    expect(recalledAccount(IDENTITY, "slack", "personal", process.env)?.account).toBe("T0OTHER01:U0OTHER01")
  })

  it("**is not asked again when the token was saved by session start**", async () => {
    const service = slackOf()
    await runCli(["personal", "messages", "list", "general", "--json"], { service })
    expect(service.calls.filter((one) => one.method === "auth.test")).toEqual([])
  })
})

describe("odd messages", () => {
  const channelWith = (messages: FakeMessage[]) => {
    const world = workspace()
    world.messages[GENERAL] = messages
    return world
  }

  it("**reads a channel link without a label, or with an empty one, as the channel's name**", async () => {
    const world = channelWith([
      { ts: ts(1), user: ANNA, text: `See <#${GENERAL}> and <#${GENERAL}|> and <@${BORIS}|>` },
    ])
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service: slackOf(world) })
    expect(items(ran)[0]?.text).toBe("See #general and #general and @Boris Synth")
  })

  it("**takes an integration's words from its attachments or blocks** when its text is empty", async () => {
    const world = channelWith([
      {
        ts: ts(1),
        bot_id: "B0SYNTH01",
        subtype: "bot_message",
        text: "",
        attachments: [{ fallback: "Build 12 passed" }],
      },
      {
        ts: ts(2),
        bot_id: "B0SYNTH01",
        subtype: "bot_message",
        blocks: [{ type: "section", text: { text: "Deploy done" } }],
      },
    ])
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service: slackOf(world) })
    expect(items(ran).map((one) => one.text)).toEqual(["Build 12 passed", "Deploy done"])
  })

  it("**leaves out reminders, withheld content and other non-messages**, as neither messages nor events", async () => {
    const world = channelWith([
      { ts: ts(1), user: ANNA, subtype: "reminder_add", text: "set up a reminder" },
      { ts: ts(2), user: ANNA, subtype: "ekm_access_denied", text: "Your admins have suspended access" },
      { ts: ts(3), user: ANNA, subtype: "file_comment", text: "a comment" },
      { ts: ts(4), user: ANNA, text: "A real one" },
    ])
    const service = slackOf(world)
    const listed = await runCli(["personal", "messages", "list", "general", "--json"], { service })
    expect(items(listed).map((one) => one.text)).toEqual(["A real one"])
    const events = await runCli(["personal", "chats", "events", "general", "time>2023-11-01", "--json"], { service })
    expect(items(events)).toEqual([])
  })

  it("**keeps a deleted thread root out, and its replies in**: a tombstone never overwrites the stored root", async () => {
    const [root, answer, later] = [daysAgo(3), daysAgo(2), daysAgo(0)]
    const world = channelWith([
      { ts: root, user: ANNA, text: "Original question" },
      { ts: answer, user: BORIS, text: "Its answer", thread_ts: root },
    ])
    const service = slackOf(world)
    const sync = () => runCli(["personal", "messages", "sync", "general", "--pause", "1ms", "--json"], { service })
    await sync()
    world.messages[GENERAL] = [
      { ts: root, user: "USLACKBOT", subtype: "tombstone", text: "This message was deleted." },
      { ts: answer, user: BORIS, text: "Its answer", thread_ts: root },
      { ts: later, user: ANNA, text: "A later reply", thread_ts: root },
      // cli-core asks for thread replies only after a history page that names the chat.
      { ts: daysAgo(1), user: BORIS, text: "Something else" },
    ]
    await sync()
    const held = await stored(service)
    expect(byId(held, root)).toMatchObject({ text: "Original question", sender_id: ANNA })
    expect(byId(held, later)).toMatchObject({ text: "A later reply", thread_id: root })
    const listed = await runCli(["personal", "messages", "list", "general", "--json"], { service })
    expect(byId(items(listed), root)).toBeUndefined()
  })

  it("**reads the directory once when a page names many unknown people**, never one users.info each", async () => {
    const world = workspace()
    const crowd = Array.from({ length: 8 }, (_, at) => ({ id: `U0CROWD0${at}`, name: `crowd${at}` }))
    world.users.push(...crowd)
    world.messages[GENERAL] = crowd.map((one, at) => ({ ts: ts(at + 1), user: one.id, text: `hi ${at}` }))
    const service = slackOf(world)
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service })
    expect(items(ran)[0]).toMatchObject({ sender_name: "crowd0" })
    expect(service.calls.filter((one) => one.method === "users.info" && one.args.user?.startsWith("U0CROWD"))).toEqual(
      [],
    )
    expect(service.calls.filter((one) => one.method === "users.list")).toHaveLength(1)
  })

  it("**keeps an unknown person's id quietly, but not a rate limit** on users.info", async () => {
    const world = channelWith([{ ts: ts(1), user: "U0GONE001", text: "from a deleted account" }])
    const quiet = await runCli(["personal", "messages", "list", "general", "--json"], { service: slackOf(world) })
    expect(items(quiet)[0]).toMatchObject({ sender_id: "U0GONE001", sender_name: null })
    const limited = fakeSlack(
      { "users.info": { body: { ok: false, error: "ratelimited" }, status: 429, headers: { "retry-after": "0" } } },
      FAKE_TOKEN,
      world,
    )
    const ran = await runCli(["personal", "messages", "list", "general", "--json"], { service: limited })
    expect(ran.code).toBe(8)
    expect(ran.err).toContain('"code":"rate_limited"')
  })

  it("**says a message is not there only when Slack says so**; another refusal stays what it is", async () => {
    const missing = await runCli(["personal", "messages", "show", "general", ts(99), "--json"], { service: slackOf() })
    expect(missing.json()).toMatchObject({ error: { code: "not_found" } })
    const refusing = fakeSlack(
      { "conversations.replies": { body: { ok: false, error: "invalid_auth" } } },
      FAKE_TOKEN,
      workspace(),
    )
    const refused = await runCli(["personal", "messages", "show", "general", ts(99), "--json"], { service: refusing })
    expect(refused.json()).toMatchObject({ error: { code: "authentication_error" } })
  })
})

it("**names the profiles here for a profile never signed in**, though the keyring cannot be read (WC-ACCT-3)", async () => {
  const ran = await runCli(["nosuch", "messages", "list", "general", "--json"], {
    service: slackOf(),
    keyring: brokenKeyring(),
  })
  expect(ran.json()).toMatchObject({ error: { code: "not_found", message: expect.stringContaining("nosuch") } })
})

it("**keeps the keyring's own error for a profile this computer knows**", async () => {
  rememberAccount(IDENTITY, "personal", "T0SYNTH01:U0SYNTH01", process.env)
  const ran = await runCli(["personal", "messages", "list", "general", "--json"], {
    service: slackOf(),
    keyring: brokenKeyring(),
  })
  expect(ran.json()).toMatchObject({ error: { code: "configuration_error" } })
})
