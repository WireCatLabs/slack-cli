import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { beforeEach, describe, expect, it } from "vitest"
import { FAKE_TOKEN, type FakeMessage, type FakeWorkspace, fakeSlack } from "./testing/fake-slack.js"
import { runCli } from "./testing/harness.js"
import { ANNA, BORIS, GENERAL, ME, PUBLIC_UNJOINED, remembered, ts, workspace } from "./testing/workspace.js"

// Slack's write methods, each as its reference page describes it:
// https://docs.slack.dev/reference/methods/chat.postMessage/, chat.update, chat.delete, reactions.add,
// reactions.remove, pins.add, pins.remove, conversations.mark, conversations.open, chat.getPermalink,
// conversations.join, conversations.leave, files.getUploadURLExternal and files.completeUploadExternal.

type Fake = ReturnType<typeof fakeSlack>
type Fetch = Fake["fetch"]

const slackOf = (world: FakeWorkspace = workspace()) => fakeSlack({}, FAKE_TOKEN, world)

const slackCli = (service: { fetch: Fetch }, ...words: string[]) =>
  runCli(["personal", ...words, "--json"], { service })

const posts = (service: Fake) => service.writes.filter((one) => one.method === "chat.postMessage")

const errorOf = (ran: { err: string }) =>
  (JSON.parse(ran.err) as { error: { code: string; reason: string; details?: Record<string, unknown> } }).error

const ending = (input: string | URL | Request, method: string) => String(input).endsWith(`/${method}`)

/** Slack carries out `method`, and its answer never comes back. */
const landsThenStalls = (service: Fake, method: string) => ({
  fetch: async (input: string | URL | Request, init?: RequestInit) => {
    const answer = await service.fetch(input, init)
    return ending(input, method) ? new Promise<Response>(() => {}) : answer
  },
})

/** `method` never reaches Slack and never answers. */
const neverLands = (service: Fake, method: string) => ({
  fetch: (input: string | URL | Request, init?: RequestInit) =>
    ending(input, method) ? new Promise<Response>(() => {}) : service.fetch(input, init),
})

const stalledSend = async (through: { fetch: Fetch }, ...words: string[]) => {
  const first = await runCli(["personal", "--timeout", "300ms", "messages", "send", ...words, "--json"], {
    service: through,
  })
  const error = errorOf(first)
  expect(error.code).toBe("outcome_unknown")
  const [operation] = (error.details?.operation_ids ?? []) as string[]
  return String(operation)
}

/** `count` messages of other people, all from the last minute: a repeat's window holds every one of them. */
const recent = (count: number, extra: (at: number) => Partial<FakeMessage> = () => ({})): FakeMessage[] => {
  const second = Math.floor(Date.now() / 1000) - 30
  return Array.from({ length: count }, (_, at) => ({
    ts: `${second}.${String(at + 1).padStart(6, "0")}`,
    user: ANNA,
    text: `Note ${at}`,
    ...extra(at),
  }))
}

beforeEach(() => {
  const state = mkdtempSync(join(tmpdir(), "slack-state-"))
  process.env.SLACK_STATE_DIR = state
  process.env.MESSAGING_STORE = join(state, "wirecat.db")
  remembered()
})

describe("messages send", () => {
  it("**sends plain text as typed**: Slack's markup characters escaped, mrkdwn off, no metadata", async () => {
    const service = slackOf()
    const sent = await slackCli(service, "messages", "send", "general", "2 < 3 & *not bold*")
    expect(sent.code).toBe(0)
    expect(service.writes).toEqual([
      { method: "chat.postMessage", args: { channel: GENERAL, text: "2 &lt; 3 &amp; *not bold*", mrkdwn: "false" } },
    ])
    expect(sent.json().item).toMatchObject({ message: { text: "2 < 3 & *not bold*", sender_is_me: true } })
  })

  it("**turns --md into Slack's mrkdwn**, links and code included", async () => {
    const service = slackOf()
    await slackCli(
      service,
      "messages",
      "send",
      "general",
      "**Done**: see [the plan](https://example.com) and `a<b`",
      "--md",
    )
    expect(service.writes[0]?.args).toMatchObject({
      text: "*Done*: see <https://example.com|the plan> and `a&lt;b`",
      mrkdwn: "true",
    })
  })

  it("**keeps a link's address from ending the link** or calling the whole channel", async () => {
    const service = slackOf()
    await slackCli(service, "messages", "send", "general", "[see <you>](https://e.com/a>b|<!channel>&x)", "--md")
    expect(service.writes[0]?.args.text).toBe("<https://e.com/a%3Eb%7C%3C!channel%3E&amp;x|see &lt;you&gt;>")
  })

  it("**refuses a mark mrkdwn cannot show** before anything is sent", async () => {
    const service = slackOf()
    const ran = await slackCli(service, "messages", "send", "general", "__under__", "--md")
    expect(ran.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(service.writes).toEqual([])
  })

  it("**replies in the thread**: --reply-to and --topic both go to the message's root", async () => {
    const service = slackOf()
    await slackCli(service, "messages", "send", "general", "Thanks", "--reply-to", ts(31))
    await slackCli(service, "messages", "send", "general", "And you", "--reply-to", ts(30))
    await slackCli(service, "messages", "send", "general", "Same", "--topic", ts(31))
    expect(service.writes.map((one) => one.args.thread_ts)).toEqual([ts(30), ts(30), ts(30)])
    const unknown = await slackCli(service, "messages", "send", "general", "Lost", "--topic", ts(99))
    expect(unknown.json()).toMatchObject({ error: { code: "not_found" } })
  })

  it("**--no-preview turns Slack's link and media previews off**", async () => {
    const service = slackOf()
    await slackCli(service, "messages", "send", "general", "https://example.com", "--no-preview")
    expect(service.writes[0]?.args).toMatchObject({ unfurl_links: "false", unfurl_media: "false" })
  })

  it("**opens a DM with a person the owner has not written to yet**, then sends there", async () => {
    const service = slackOf()
    const sent = await slackCli(service, "messages", "send", "boris", "Hello")
    expect(sent.code).toBe(0)
    expect(service.writes.map((one) => [one.method, one.args.users ?? one.args.channel])).toEqual([
      ["conversations.open", BORIS],
      ["chat.postMessage", "D0OPEN007"],
    ])
  })

  it("**says the owner is not in the chat** with Slack's code, not that the chat is missing", async () => {
    const ran = await slackCli(slackOf(), "messages", "send", PUBLIC_UNJOINED, "Hi")
    expect(errorOf(ran)).toMatchObject({
      code: "permission_error",
      reason: "chat.not-joined",
      details: { slack_error: "not_in_channel" },
    })
  })

  it("**names the scope the app lacks** when Slack refuses a send for it", async () => {
    const world = { ...workspace(), scopes: ["channels:read", "channels:history", "users:read"] }
    const ran = await slackCli(slackOf(world), "messages", "send", "general", "Hi")
    expect(ran.json()).toMatchObject({ error: { code: "permission_error" } })
    expect(ran.err).toContain("chat:write")
  })

  it("**reports a write answered with something unreadable as an unknown outcome**", async () => {
    const service = fakeSlack({ "chat.postMessage": { body: { ok: true } } }, FAKE_TOKEN, workspace())
    const ran = await slackCli(service, "messages", "send", "general", "Once")
    expect(errorOf(ran).code).toBe("outcome_unknown")
  })
})

describe("a repeat of a send whose outcome was unknown", () => {
  it("**finds the copy Slack kept** and does not post a second", async () => {
    const service = slackOf()
    const operation = await stalledSend(landsThenStalls(service, "chat.postMessage"), "general", "Once")
    const again = await slackCli(service, "messages", "send", "general", "Once", "--operation-id", operation)
    expect(again.code).toBe(0)
    expect(posts(service)).toHaveLength(1)
    expect(service.workspace.messages[GENERAL]?.filter((one) => one.text === "Once")).toHaveLength(1)
  })

  it("**sends once when the first try never reached Slack**", async () => {
    const service = slackOf()
    const operation = await stalledSend(neverLands(service, "chat.postMessage"), "general", "Late")
    expect(posts(service)).toHaveLength(0)
    expect((await slackCli(service, "messages", "send", "general", "Late", "--operation-id", operation)).code).toBe(0)
    expect(posts(service)).toHaveLength(1)
  })

  it("**reads a 250-reply thread to its end** to find the copy", async () => {
    const world = workspace()
    const root = recent(1)[0] as FakeMessage
    const replies = recent(250, () => ({ thread_ts: root.ts })).map((one, at) => ({
      ...one,
      ts: `${Math.floor(Number(root.ts))}.${String(at + 2).padStart(6, "0")}`,
    }))
    world.messages[GENERAL] = [...(world.messages[GENERAL] ?? []), { ...root, reply_count: 250 }, ...replies]
    const service = slackOf(world)
    const words = ["general", "In the thread", "--reply-to", root.ts]
    const operation = await stalledSend(landsThenStalls(service, "chat.postMessage"), ...words)
    expect((await slackCli(service, "messages", "send", ...words, "--operation-id", operation)).code).toBe(0)
    expect(posts(service)).toHaveLength(1)
  })

  it("**reads a busy channel to its end**: 250 messages came after the copy", async () => {
    const service = slackOf()
    const operation = await stalledSend(landsThenStalls(service, "chat.postMessage"), "general", "Busy")
    const copy = Number(service.workspace.messages[GENERAL]?.find((one) => one.text === "Busy")?.ts)
    const later = Array.from({ length: 250 }, (_, at) => ({
      ts: `${Math.floor(copy) + 1}.${String(at + 1).padStart(6, "0")}`,
      user: ANNA,
      text: `Later ${at}`,
    }))
    service.workspace.messages[GENERAL] = [...(service.workspace.messages[GENERAL] ?? []), ...later]
    expect((await slackCli(service, "messages", "send", "general", "Busy", "--operation-id", operation)).code).toBe(0)
    expect(posts(service)).toHaveLength(1)
  })

  it("**refuses an operation id slack did not make**", async () => {
    const service = slackOf()
    const ran = await slackCli(service, "messages", "send", "general", "Late", "--operation-id", "a-lost-send")
    expect(ran.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(posts(service)).toHaveLength(0)
  })
})

describe("messages send --file", () => {
  const fileOf = () => {
    const file = join(mkdtempSync(join(tmpdir(), "slack-upload-")), "notes.txt")
    writeFileSync(file, "the notes\n")
    return file
  }

  it("**uploads a file in Slack's three steps** and answers with the message that shares it", async () => {
    const service = slackOf()
    const sent = await slackCli(
      service,
      "messages",
      "send",
      "general",
      "Here",
      "--file",
      fileOf(),
      "--reply-to",
      ts(30),
    )
    expect(sent.code).toBe(0)
    expect(service.writes.map((one) => one.method)).toEqual(["files.completeUploadExternal"])
    expect(service.writes[0]?.args).toMatchObject({ channel_id: GENERAL, thread_ts: ts(30), initial_comment: "Here" })
    expect([...service.uploads.values()]).toEqual([{ name: "notes.txt", bytes: "the notes\n" }])
    expect(sent.json().item).toMatchObject({ message: { text: "Here", attachments: [{ name: "notes.txt" }] } })
  })

  it("**sends a --photo or an --as-file file the same way**, and refuses a voice message by name", async () => {
    const service = slackOf()
    const photo = join(mkdtempSync(join(tmpdir(), "slack-upload-")), "cat.png")
    writeFileSync(photo, Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    expect((await slackCli(service, "messages", "send", "general", "--photo", photo)).code).toBe(0)
    expect((await slackCli(service, "messages", "send", "general", "--file", fileOf(), "--as-file")).code).toBe(0)
    expect([...service.uploads.values()].map((one) => one.name)).toEqual(["cat.png", "notes.txt"])
    const voice = join(mkdtempSync(join(tmpdir(), "slack-upload-")), "note.ogg")
    writeFileSync(voice, "OggS")
    const refused = await slackCli(service, "messages", "send", "general", "--voice", voice)
    expect(errorOf(refused).code).toBe("validation_error")
    expect(service.writes.map((one) => one.method)).toEqual([
      "files.completeUploadExternal",
      "files.completeUploadExternal",
    ])
  })

  it("**sends no bytes to an upload address off files.slack.com**, and says nothing was sent", async () => {
    const service = fakeSlack(
      {
        "files.getUploadURLExternal": {
          body: { ok: true, upload_url: "https://elsewhere.example/upload/v1/F0UPLD001", file_id: "F0UPLD001" },
        },
      },
      FAKE_TOKEN,
      workspace(),
    )
    const ran = await slackCli(service, "messages", "send", "general", "Here", "--file", fileOf())
    expect(errorOf(ran)).toMatchObject({ code: "provider_error" })
    expect(errorOf(ran).details).toMatchObject({ sent: false })
    expect(service.writes).toEqual([])
    expect(service.calls.map((one) => one.method)).not.toContain("files.completeUploadExternal")
  })

  it("**answers from Slack's share when the message has not shown yet**, after reading the chat again", async () => {
    const service = fakeSlack(
      { "conversations.history": { body: { ok: true, messages: [], has_more: false } } },
      FAKE_TOKEN,
      workspace(),
    )
    const sent = await slackCli(service, "messages", "send", "general", "Here", "--file", fileOf())
    expect(sent.code).toBe(0)
    expect(sent.json().item).toMatchObject({ message: { id: "F0UPLD001", attachments: [{ name: "notes.txt" }] } })
    expect(service.calls.filter((one) => one.method === "conversations.history").length).toBeGreaterThanOrEqual(3)
  })
})

describe("changing a message", () => {
  it("**edits the owner's own message**, and names Slack's refusal of another person's", async () => {
    const service = slackOf()
    const edited = await slackCli(service, "messages", "edit", "general", ts(20), "Read it")
    expect(edited.json().item).toMatchObject({ message: { text: "Read it" } })
    await slackCli(service, "messages", "edit", "general", ts(20), "**Read** it", "--md")
    expect(service.writes.at(-1)?.args.text).toBe("*Read* it")
    const others = await slackCli(service, "messages", "edit", "general", ts(10), "Not mine")
    expect(errorOf(others)).toMatchObject({
      code: "permission_error",
      reason: "message.not-yours",
      details: { slack_error: "cant_update_message" },
    })
  })

  it("**refuses a delete for the owner alone before asking anything**, and deletes for everyone", async () => {
    const service = slackOf()
    const forMe = await runCli(["personal", "messages", "delete", "general", ts(20), "--json"], { service })
    expect(errorOf(forMe).code).toBe("validation_error")
    expect(forMe.err).toContain("--for-everyone")
    const words = ["messages", "delete", "general", ts(20), "--for-everyone", "--yes"]
    expect((await slackCli(service, ...words)).code).toBe(0)
    // A repeat finds it gone: Slack's message_not_found is the outcome asked for.
    expect((await slackCli(service, ...words)).code).toBe(0)
    expect(service.writes.map((one) => one.method)).toEqual(["chat.delete"])
  })

  it("**adds a reaction by Slack's name, a skin tone included, and takes the owner's off**", async () => {
    const service = slackOf()
    expect((await slackCli(service, "reactions", "add", "general", ts(10), ":tada:")).code).toBe(0)
    // A repeat finds it there: already_reacted is the outcome asked for.
    expect((await slackCli(service, "reactions", "add", "general", ts(10), "tada")).code).toBe(0)
    expect((await slackCli(service, "reactions", "add", "general", ts(10), "thumbsup::skin-tone-2")).code).toBe(0)
    expect((await slackCli(service, "reactions", "remove", "general", ts(40))).code).toBe(0)
    expect(service.writes).toEqual([
      { method: "reactions.add", args: { channel: GENERAL, timestamp: ts(10), name: "tada" } },
      { method: "reactions.add", args: { channel: GENERAL, timestamp: ts(10), name: "thumbsup::skin-tone-2" } },
      { method: "reactions.remove", args: { channel: GENERAL, timestamp: ts(40), name: "eyes" } },
    ])
    const unicode = await slackCli(service, "reactions", "add", "general", ts(10), "👍")
    expect(errorOf(unicode).code).toBe("validation_error")
    expect(unicode.err).toContain("thumbsup")
  })

  it("**pins, unpins and links a message**; a repeat of either finds it done", async () => {
    const service = slackOf()
    for (const words of [["pin", "--notify"], ["pin"], ["unpin"], ["unpin"]])
      expect((await slackCli(service, "messages", words[0] ?? "", "general", ts(30), ...words.slice(1))).code).toBe(0)
    const link = await slackCli(service, "messages", "link", "general", ts(30))
    expect(JSON.stringify(link.json())).toContain(`archives/${GENERAL}/p1700000030000100`)
    expect(service.writes.map((one) => one.method)).toEqual(["pins.add", "pins.remove"])
  })

  it("**marks a chat read up to its newest message, or up to the one named**", async () => {
    const service = slackOf()
    expect((await slackCli(service, "chats", "mark-read", "general")).code).toBe(0)
    expect(service.read[GENERAL]).toBe(ts(50))
    expect((await slackCli(service, "chats", "mark-read", "general", "--until-id", ts(20))).code).toBe(0)
    expect(service.read[GENERAL]).toBe(ts(20))
    const topic = await slackCli(service, "chats", "mark-read", "general", "--topic", ts(30))
    expect(topic.code).not.toBe(0)
    expect(service.read[GENERAL]).toBe(ts(20))
  })
})

describe("joining and leaving", () => {
  it("**joins a public channel by name and leaves it**; leaving again finds it done", async () => {
    const service = slackOf()
    const joined = await slackCli(service, "chats", "join", "#elsewhere", "--yes")
    expect(joined.code).toBe(0)
    expect(service.workspace.channels.find((one) => one.id === PUBLIC_UNJOINED)?.members).toContain(ME)
    expect((await slackCli(service, "chats", "leave", "#elsewhere", "--yes")).code).toBe(0)
    expect((await slackCli(service, "chats", "leave", PUBLIC_UNJOINED, "--yes")).code).toBe(0)
    expect(service.workspace.channels.find((one) => one.id === PUBLIC_UNJOINED)?.members).toEqual([ANNA])
  })
})
