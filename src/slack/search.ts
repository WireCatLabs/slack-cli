import type { Chat, MessageHit, Page } from "@wirecat/cli-core"
import type { ServerQuery } from "@wirecat/cli-core/cli"
import * as v from "valibot"
import type { SlackClient } from "./client.js"
import { type Conversation, DAY, type WireMessage, wireMessage } from "./map.js"

/** At most 100 a page (https://docs.slack.dev/reference/methods/search.messages/). */
const COUNT_MOST = 100
// cli-core gives a server search 5 s; more pages than this would mostly be dropped at the bound.
const PAGES_MOST = 3

const match = v.looseObject({
  ...wireMessage.entries,
  channel: v.looseObject({
    id: v.string(),
    name: v.optional(v.string()),
    is_private: v.optional(v.boolean()),
    is_mpim: v.optional(v.boolean()),
    is_im: v.optional(v.boolean()),
  }),
  permalink: v.optional(v.string()),
})

const searchAnswer = v.looseObject({
  ok: v.literal(true),
  messages: v.looseObject({
    matches: v.array(match),
    paging: v.optional(v.looseObject({ page: v.optional(v.number()), pages: v.optional(v.number()) })),
  }),
})

type Match = v.InferOutput<typeof match>

export interface ServerSearchOptions {
  slack: SlackClient
  conversationOf: (typed: string) => Promise<Conversation>
  listed: () => Promise<Conversation[]>
  hit: (chatId: string, wire: WireMessage) => Promise<Omit<MessageHit, "chatTitle">>
  chatOf: (one: Conversation) => Chat
}

const day = (ms: number) => new Date(ms).toISOString().slice(0, 10)

// A match carries no thread_ts; a reply's permalink names its root
// (https://docs.slack.dev/reference/methods/chat.getPermalink/).
const threadOf = (one: Match) => {
  if (!one.permalink || !URL.canParse(one.permalink)) return undefined
  return new URL(one.permalink).searchParams.get("thread_ts") ?? undefined
}

/**
 * cli-core's `searchMessages` over `search.messages`, newest first. Slack's `after:` and `before:` take whole days in
 * the person's own time zone (https://slack.com/help/articles/202528808), so the days asked reach two past each end
 * and the moments are kept here; a chat is kept here too, by id, whatever `in:` matched.
 */
export const serverSearch = ({ slack, conversationOf, listed, hit, chatOf }: ServerSearchOptions) => {
  const inOf = (one: Conversation) => (one.is_im && one.user ? `in:<@${one.user}>` : `in:${one.name ?? one.id}`)

  return async (query: ServerQuery, { limit }: { limit: number }): Promise<Page<MessageHit> & { chats: Chat[] }> => {
    const chat = query.chat === undefined ? undefined : await conversationOf(query.chat)
    const words = [
      query.text,
      ...(chat ? [inOf(chat)] : []),
      ...(query.from ? [`from:<@${query.from}>`] : []),
      ...(query.minDate === undefined ? [] : [`after:${day(query.minDate - 2 * DAY)}`]),
      ...(query.maxDate === undefined ? [] : [`before:${day(query.maxDate + 2 * DAY)}`]),
    ]
      .filter(Boolean)
      .join(" ")
    const kept = (one: Match) => {
      const at = Number(one.ts) * 1000
      return (
        (!chat || one.channel.id === chat.id) &&
        (query.minDate === undefined || at >= query.minDate) &&
        (query.maxDate === undefined || at <= query.maxDate)
      )
    }
    const found: Match[] = []
    let more = false
    for (let page = 1; page <= PAGES_MOST; page++) {
      const answer = await slack(
        "search.messages",
        { query: words, count: COUNT_MOST, page, sort: "timestamp", sort_dir: "desc" },
        searchAnswer,
      )
      for (const one of answer.messages.matches) if (kept(one)) found.push(one)
      more = page < (answer.messages.paging?.pages ?? page)
      if (found.length > limit || !more) break
    }
    const shown = found.slice(0, limit)
    const held = new Map((await listed()).map((one) => [one.id, one]))
    const chats = new Map<string, Chat>()
    for (const one of shown)
      if (!chats.has(one.channel.id))
        chats.set(one.channel.id, chatOf(held.get(one.channel.id) ?? (one.channel as Conversation)))
    const items: MessageHit[] = []
    for (const one of shown) {
      const thread = threadOf(one)
      const wire = thread && !one.thread_ts ? { ...one, thread_ts: thread } : one
      items.push({ ...(await hit(one.channel.id, wire)), chatTitle: chats.get(one.channel.id)?.title ?? null })
    }
    return { items, hasMore: found.length > limit || more, chats: [...chats.values()] }
  }
}
