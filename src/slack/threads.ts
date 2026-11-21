import type { Message } from "@wirecat/cli-core"
import type { StoredMessages } from "@wirecat/cli-core/cli"
import type { SlackArgs, SlackClient } from "./client.js"
import { DAY, historyAnswer, nextCursor, tsOf, type WireMessage } from "./map.js"

export interface ThreadSyncOptions {
  slack: SlackClient
  stored: StoredMessages | undefined
  windowDays: number
  now: () => number
  mapped: (chatId: string, wires: readonly WireMessage[]) => Promise<Message[]>
  between: (chatId: string, oldest: string, latest?: string) => Promise<WireMessage[]>
}

/** Adds one list to another in place; a spread into `push` throws past about 125,000 items. */
export const append = <T>(into: T[], more: readonly T[]) => {
  for (const one of more) into.push(one)
}

const later = (one: string, other: string) => Number(one) > Number(other)

const isRoot = (wire: WireMessage) => (wire.reply_count ?? 0) > 0 && wire.thread_ts === wire.ts

/**
 * The replies a sync adds to a page of `conversations.history`, which holds top-level messages only
 * (https://docs.slack.dev/messaging/retrieving-messages/). cli-core's sync reads newest to oldest and marks the
 * stretch from a page's oldest message to the newest it saw as held, so a reply joins a page only when it is no older
 * than the page's oldest top-level message: a page's own roots' replies always are. Roots older than the first page,
 * sent within the window, are read once per sync; their new replies wait for the page that reaches back to them.
 * What counts as new is what the store does not hold: a thread with fewer stored replies than its `reply_count`, or
 * whose `latest_reply` is newer than its newest stored reply.
 */
export const threadSync = ({ slack, stored, windowDays, now, mapped, between }: ThreadSyncOptions) => {
  const pending = new Map<string, Message[]>()
  const handled = new Map<string, Set<string>>()

  const newReplies = async (chatId: string, root: WireMessage): Promise<Message[]> => {
    const count = root.reply_count ?? 0
    const held = await stored?.threadMessages?.(chatId, root.ts, { limit: count + 1 }).catch(() => undefined)
    const replies = held?.items.filter((one) => one.id !== root.ts) ?? []
    // A reply sent also to the channel is stored from the history itself, so the newest stored reply can be newer
    // than replies the store lacks: a thread holding fewer replies than Slack counts is read whole.
    const whole = replies.length < count
    const newest = whole ? root.ts : (replies.at(-1)?.id ?? root.ts)
    if (!whole && (!root.latest_reply || !later(root.latest_reply, newest))) return []
    const wires: WireMessage[] = []
    for (let cursor: string | undefined; ; ) {
      const args: SlackArgs = { channel: chatId, ts: root.ts, oldest: newest, limit: 200, cursor }
      const answer = await slack("conversations.replies", args, historyAnswer)
      append(
        wires,
        answer.messages.filter((one) => one.ts !== root.ts && later(one.ts, newest)),
      )
      cursor = nextCursor(answer)
      if (!answer.has_more || !cursor) break
    }
    return mapped(chatId, wires)
  }

  const fresh = (chatId: string, roots: readonly WireMessage[]) => {
    const seen = handled.get(chatId) ?? new Set<string>()
    handled.set(chatId, seen)
    return roots.filter((one) => {
      if (!isRoot(one) || seen.has(one.ts)) return false
      seen.add(one.ts)
      return true
    })
  }

  return {
    repliesFor: async (
      chatId: string,
      { wires, hasMore, latest }: { wires: readonly WireMessage[]; hasMore: boolean; latest: string | undefined },
    ): Promise<Message[]> => {
      const low = hasMore ? wires.reduce((at, one) => (later(at, one.ts) ? one.ts : at), wires[0]?.ts ?? "") : undefined
      const dealt: Message[] = []
      for (const root of fresh(chatId, wires)) append(dealt, await newReplies(chatId, root))
      if (latest === undefined && low) {
        const window = await between(chatId, tsOf(now() - windowDays * DAY), low)
        const waiting = pending.get(chatId) ?? []
        for (const root of fresh(chatId, window)) append(waiting, await newReplies(chatId, root))
        pending.set(chatId, waiting)
      }
      const waiting = pending.get(chatId) ?? []
      const due = waiting.filter((one) => low === undefined || !later(low, one.id))
      pending.set(
        chatId,
        waiting.filter((one) => !due.includes(one)),
      )
      return [...dealt, ...due]
    },
  }
}
