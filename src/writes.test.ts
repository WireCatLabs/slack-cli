import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { beforeEach, describe, expect, it } from "vitest"
import { FAKE_TOKEN, type FakeWorkspace, fakeSlack } from "./testing/fake-slack.js"
import { runCli } from "./testing/harness.js"
import { ANNA, GENERAL, ME, PUBLIC_UNJOINED, remembered, ts, workspace } from "./testing/workspace.js"

// Slack's write methods, each as its reference page describes it:
// https://docs.slack.dev/reference/methods/chat.postMessage/, chat.update, chat.delete, reactions.add,
// reactions.remove, pins.add, pins.remove, conversations.mark, chat.getPermalink, conversations.join,
// conversations.leave, files.getUploadURLExternal and files.completeUploadExternal.

const slackOf = (world: FakeWorkspace = workspace()) => fakeSlack({}, FAKE_TOKEN, world)

const slackCli = (service: ReturnType<typeof slackOf>, ...words: string[]) =>
  runCli(["personal", ...words, "--json"], { service })

beforeEach(() => {
  const state = mkdtempSync(join(tmpdir(), "slack-state-"))
  process.env.SLACK_STATE_DIR = state
  process.env.MESSAGING_STORE = join(state, "wirecat.db")
  remembered()
})

describe("messages send", () => {
  it("**sends plain text as typed**: Slack's markup characters escaped, mrkdwn off", async () => {
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

  it("**refuses a mark mrkdwn cannot show** before anything is sent", async () => {
    const service = slackOf()
    const ran = await slackCli(service, "messages", "send", "general", "__under__", "--md")
    expect(ran.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(service.writes).toEqual([])
  })

  it("**replies in the thread**: a reply to a reply goes to the same root", async () => {
    const service = slackOf()
    await slackCli(service, "messages", "send", "general", "Thanks", "--reply-to", ts(31))
    await slackCli(service, "messages", "send", "general", "And you", "--reply-to", ts(30))
    expect(service.writes.map((one) => one.args.thread_ts)).toEqual([ts(30), ts(30)])
  })

  it("**uploads a file in Slack's three steps** and answers with the message that shares it", async () => {
    const service = slackOf()
    const file = join(mkdtempSync(join(tmpdir(), "slack-upload-")), "notes.txt")
    writeFileSync(file, "the notes\n")
    const sent = await slackCli(service, "messages", "send", "general", "Here", "--file", file, "--reply-to", ts(30))
    expect(sent.code).toBe(0)
    expect(service.writes.map((one) => one.method)).toEqual(["files.completeUploadExternal"])
    expect(service.writes[0]?.args).toMatchObject({ channel_id: GENERAL, thread_ts: ts(30), initial_comment: "Here" })
    expect([...service.uploads.values()]).toEqual([{ name: "notes.txt", bytes: "the notes\n" }])
    expect(sent.json().item).toMatchObject({ message: { text: "Here", attachments: [{ name: "notes.txt" }] } })
  })

  it("**reports an unknown outcome when Slack does not answer, and never sends twice**", async () => {
    const world = workspace()
    const service = fakeSlack(
      {
        "chat.postMessage": () => {
          throw new TypeError("fetch failed")
        },
      },
      FAKE_TOKEN,
      world,
    )
    const ran = await slackCli(service, "messages", "send", "general", "Once")
    expect(ran.code).toBe(14)
    expect(service.calls.filter((one) => one.method === "chat.postMessage")).toHaveLength(1)
  })

  it("**ends a send Slack never answers in outcome_unknown at --timeout**, never as a plain timeout", async () => {
    const service = slackOf()
    const silentSend = {
      fetch: (input: string | URL | Request, init?: RequestInit) =>
        String(input).endsWith("/chat.postMessage") ? new Promise<Response>(() => {}) : service.fetch(input, init),
    }
    const ran = await runCli(["personal", "--timeout", "200ms", "messages", "send", "general", "Once", "--json"], {
      service: silentSend,
    })
    expect(ran.json()).toMatchObject({ error: { code: "outcome_unknown" } })
  })

  it("**names the scope the app lacks** when Slack refuses a send for it", async () => {
    const world = { ...workspace(), scopes: ["channels:read", "channels:history", "users:read"] }
    const ran = await slackCli(slackOf(world), "messages", "send", "general", "Hi")
    expect(ran.json()).toMatchObject({ error: { code: "permission_error" } })
    expect(ran.err).toContain("chat:write")
  })
})

describe("changing a message", () => {
  it("**edits and deletes the owner's own message**, and refuses another person's as Slack does", async () => {
    const service = slackOf()
    const edited = await slackCli(service, "messages", "edit", "general", ts(20), "Read it")
    expect(edited.json().item).toMatchObject({ message: { text: "Read it" } })
    expect((await slackCli(service, "messages", "delete", "general", ts(20), "--yes")).code).toBe(0)
    const others = await slackCli(service, "messages", "delete", "general", ts(10), "--yes")
    expect(others.code).not.toBe(0)
    expect(service.writes.map((one) => one.method)).toEqual(["chat.update", "chat.delete"])
  })

  it("**adds a reaction by Slack's name and takes the owner's off**", async () => {
    const service = slackOf()
    expect((await slackCli(service, "reactions", "add", "general", ts(10), ":tada:")).code).toBe(0)
    expect((await slackCli(service, "reactions", "remove", "general", ts(40))).code).toBe(0)
    expect(service.writes).toEqual([
      { method: "reactions.add", args: { channel: GENERAL, timestamp: ts(10), name: "tada" } },
      { method: "reactions.remove", args: { channel: GENERAL, timestamp: ts(40), name: "eyes" } },
    ])
    const unicode = await slackCli(service, "reactions", "add", "general", ts(10), "👍")
    expect(unicode.json()).toMatchObject({ error: { code: "validation_error" } })
  })

  it("**pins, unpins and links a message**", async () => {
    const service = slackOf()
    expect((await slackCli(service, "messages", "pin", "general", ts(30))).code).toBe(0)
    expect((await slackCli(service, "messages", "unpin", "general", ts(30))).code).toBe(0)
    const link = await slackCli(service, "messages", "link", "general", ts(30))
    expect(JSON.stringify(link.json())).toContain(`archives/${GENERAL}/p1700000030000100`)
    expect(service.writes.map((one) => one.method)).toEqual(["pins.add", "pins.remove"])
  })

  it("**marks a chat read up to its newest message**", async () => {
    const service = slackOf()
    expect((await slackCli(service, "chats", "mark-read", "general")).code).toBe(0)
    expect(service.read[GENERAL]).toBe(ts(50))
  })
})

describe("joining and leaving", () => {
  it("**joins a public channel by name and leaves it**", async () => {
    const service = slackOf()
    const joined = await slackCli(service, "chats", "join", "#elsewhere", "--yes")
    expect(joined.code).toBe(0)
    expect(service.workspace.channels.find((one) => one.id === PUBLIC_UNJOINED)?.members).toContain(ME)
    expect((await slackCli(service, "chats", "leave", "#elsewhere", "--yes")).code).toBe(0)
    expect(service.workspace.channels.find((one) => one.id === PUBLIC_UNJOINED)?.members).toEqual([ANNA])
  })
})
