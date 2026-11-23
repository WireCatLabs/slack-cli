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
 * window. After a first read, a root is read from `since` on when its `latest_reply` is after it; a root from a page
 * older than the newest is read whole, since a sync reaches such a page only where it held nothing before.
 */
export const threadReplies = ({ slack, windowDays, now, mapped, between }: ThreadRepliesOptions) => {
  const paged = new Map<string, Map<string, { root: WireMessage; whole: boolean }>>()

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
    seen: (chatId: string, wires: readonly WireMessage[], { whole }: { whole: boolean }) => {
      const roots = paged.get(chatId) ?? new Map<string, { root: WireMessage; whole: boolean }>()
      for (const root of wires)
        if (isRoot(root)) roots.set(root.ts, { root, whole: whole || roots.get(root.ts)?.whole === true })
      paged.set(chatId, roots)
    },
    /** One thread's replies at a time, so cli-core saves each as it comes and a stopped sync keeps them (WC-LIFE-12). */
    read: async function* (chatId: string, { since }: { since?: number }): AsyncGenerator<Message[]> {
      const after = since === undefined ? undefined : tsOf(since - SKEW_MS)
      const roots = new Map(paged.get(chatId))
      paged.delete(chatId)
      for (const root of await between(chatId, tsOf(now() - windowDays * DAY)))
        if (isRoot(root) && !roots.has(root.ts)) roots.set(root.ts, { root, whole: false })
      for (const { root, whole } of roots.values()) {
        const moved = root.latest_reply !== undefined && after !== undefined && later(root.latest_reply, after)
        if (after !== undefined && !whole && !moved) continue
        const wires = await repliesOf(chatId, root, after === undefined || whole ? undefined : after)
        if (wires.length > 0) yield (await mapped(chatId, wires)).sort(byTs)
      }
    },
  }
}
