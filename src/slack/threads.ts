import type { Message } from "@wirecat/cli-core"
import type { ThreadRefresh, ThreadRoot } from "@wirecat/cli-core/cli"
import type { SlackClient } from "./client.js"
import { byTs, DAY, historyAnswer, nextCursor, timeOf, tsOf, type WireMessage } from "./map.js"

export interface ThreadRefreshOptions {
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

export const later = (one: string, other: string) => byTs({ id: one }, { id: other }) > 0

const isRoot = (wire: WireMessage) => (wire.reply_count ?? 0) > 0 && wire.thread_ts === wire.ts

const rootOf = (id: string, latest: unknown): ThreadRoot => ({
  id,
  ...(typeof latest === "string" ? { lastReplyAt: timeOf(latest) } : {}),
})

/**
 * Thread replies, which `conversations.history` leaves out (https://docs.slack.dev/messaging/retrieving-messages/),
 * for cli-core's `ThreadRefresh`, which picks the threads. Slack has no list of threads: the recent roots are those
 * sent within the window, found by reading its history once more. `paged` keeps a page's deleted roots, which no
 * message carries, for the `threadRootsIn` cli-core asks right after that page.
 */
export const threadRefresh = ({ slack, windowDays, now, mapped, between }: ThreadRefreshOptions) => {
  const deleted = new Map<string, ThreadRoot[]>()
  const refresh: ThreadRefresh = {
    threadRootsIn: async (chatId, messages) => {
      const gone = deleted.get(chatId) ?? []
      deleted.delete(chatId)
      return [
        ...gone,
        ...messages
          .filter((one) => Number(one.providerMetadata?.reply_count ?? 0) > 0 && one.threadId === one.id)
          .map((one) => rootOf(one.id, one.providerMetadata?.latest_reply)),
      ]
    },
    recentThreadRoots: async (chatId) =>
      (await between(chatId, tsOf(now() - windowDays * DAY)))
        .filter(isRoot)
        .map((one) => rootOf(one.ts, one.latest_reply)),
    rootReplies: async (chatId, rootId, { after }) => {
      const from = after === undefined ? undefined : tsOf(after)
      const wires: WireMessage[] = []
      for (let cursor: string | undefined; ; ) {
        const answer = await slack(
          "conversations.replies",
          { channel: chatId, ts: rootId, oldest: from ?? rootId, limit: 200, cursor },
          historyAnswer,
        )
        append(
          wires,
          answer.messages.filter((one) => one.ts !== rootId && (from === undefined || later(one.ts, from))),
        )
        cursor = nextCursor(answer)
        if (!answer.has_more || !cursor) break
      }
      return (await mapped(chatId, wires)).sort(byTs)
    },
  }
  const paged = (chatId: string, wires: readonly WireMessage[]) => {
    const gone = wires.filter((one) => one.subtype === "tombstone" && isRoot(one))
    if (gone.length > 0)
      deleted.set(
        chatId,
        gone.map((one) => rootOf(one.ts, one.latest_reply)),
      )
    else deleted.delete(chatId)
  }
  return { refresh, paged }
}
