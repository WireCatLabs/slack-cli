import type { Message } from "@wirecat/cli-core"
import type { SlackClient } from "./client.js"
import { byTs, DAY, historyAnswer, nextCursor, tsOf, type WireMessage } from "./map.js"

export interface ThreadRepliesOptions {
  slack: SlackClient
  windowDays: number
  now: () => number
  mapped: (chatId: string, wires: readonly WireMessage[]) => Promise<Message[]>
  between: (chatId: string, oldest: string, latest?: string) => Promise<WireMessage[]>
}

/** Adds one list to another in place; a spread into `push` throws past about 125,000 items. */
export const append = <T>(into: T[], more: readonly T[]) => {
  for (const one of more) into.push(one)
}

const later = (one: string, other: string) => byTs({ id: one }, { id: other }) > 0

const isRoot = (wire: WireMessage) => (wire.reply_count ?? 0) > 0 && wire.thread_ts === wire.ts

/** `since` is this machine's clock and `ts` is Slack's; the overlap keeps a reply sent while they disagree. */
const SKEW_MS = 60_000

/**
 * Thread replies, which `conversations.history` leaves out (https://docs.slack.dev/messaging/retrieving-messages/),
 * for cli-core's `threadReplies`. The roots are those the history pages of this run showed, and those sent within the
 * window; after a first read, only roots whose `latest_reply` is after `since` are read, from `since` on.
 */
export const threadReplies = ({ slack, windowDays, now, mapped, between }: ThreadRepliesOptions) => {
  const paged = new Map<string, Map<string, WireMessage>>()

  const repliesOf = async (chatId: string, root: WireMessage, after: string | undefined) => {
    const wires: WireMessage[] = []
    for (let cursor: string | undefined; ; ) {
      const answer = await slack(
        "conversations.replies",
        { channel: chatId, ts: root.ts, oldest: after ?? root.ts, limit: 200, cursor },
        historyAnswer,
      )
      append(
        wires,
        answer.messages.filter((one) => one.ts !== root.ts && (after === undefined || later(one.ts, after))),
      )
      cursor = nextCursor(answer)
      if (!answer.has_more || !cursor) return wires
    }
  }

  return {
    seen: (chatId: string, wires: readonly WireMessage[]) => {
      const roots = paged.get(chatId) ?? new Map<string, WireMessage>()
      for (const one of wires) if (isRoot(one)) roots.set(one.ts, one)
      paged.set(chatId, roots)
    },
    read: async (chatId: string, { since }: { since?: number }): Promise<Message[]> => {
      const after = since === undefined ? undefined : tsOf(since - SKEW_MS)
      const roots = new Map(paged.get(chatId))
      paged.delete(chatId)
      for (const one of await between(chatId, tsOf(now() - windowDays * DAY))) if (isRoot(one)) roots.set(one.ts, one)
      const wires: WireMessage[] = []
      for (const root of roots.values())
        if (after === undefined || (root.latest_reply !== undefined && later(root.latest_reply, after)))
          append(wires, await repliesOf(chatId, root, after))
      return (await mapped(chatId, wires)).sort(byTs)
    },
  }
}
