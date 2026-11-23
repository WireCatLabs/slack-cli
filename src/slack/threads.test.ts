import { expect, it } from "vitest"
import { FAKE_TOKEN, fakeSlack } from "../testing/fake-slack.js"
import { ANNA, BORIS, GENERAL, ME, ts, workspace } from "../testing/workspace.js"
import { slackAdapter } from "./adapter.js"
import { slackClient } from "./client.js"

it("answers thread replies one thread at a time, so cli-core saves each before asking for the next", async () => {
  const chat = workspace()
  chat.messages[GENERAL]?.push(
    { ts: ts(60), user: ANNA, text: "Second topic" },
    { ts: ts(61), user: BORIS, text: "On it", thread_ts: ts(60) },
    { ts: ts(62), user: ME, text: "Thanks", thread_ts: ts(60) },
  )
  const service = fakeSlack({}, FAKE_TOKEN, chat)
  const adapter = slackAdapter({
    slack: slackClient({ token: FAKE_TOKEN, fetch: service.fetch }),
    token: FAKE_TOKEN,
    self: { team: "T0SYNTH01", user: ME },
    threadWindowDays: 14,
    fetch: service.fetch,
  })
  await adapter.history?.("general", { limit: 20 })
  const answer = adapter.threadReplies?.(GENERAL, {})
  if (!answer || !(Symbol.asyncIterator in answer)) throw new Error("threadReplies should answer in batches")
  const batches: string[][] = []
  for await (const batch of answer) batches.push(batch.map((one) => one.id))
  expect(batches).toEqual([
    [ts(61), ts(62)],
    [ts(31), ts(32)],
  ])
})
