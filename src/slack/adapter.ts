import { CliError } from "@wirecat/cli-base"
import { type FetchLike, hostFetch } from "@wirecat/cli-base/http"
import type { ChatCard, Message, Page, PersonCard, WindowedMessage } from "@wirecat/cli-core"
import type { After, MessengerAdapter, RemoteFile, StoredMessages } from "@wirecat/cli-core/cli"
import { DESKTOP, SERVICE } from "../identity.js"
import type { SlackArgs, SlackClient } from "./client.js"
import {
  accountOfUser,
  addressEntryOf,
  byTs,
  type Conversation,
  chatEventOf,
  chatOf,
  contactOf,
  conversationAnswer,
  conversationsAnswer,
  type HistoryAnswer,
  historyAnswer,
  isService,
  isTs,
  memberOf,
  membersAnswer,
  messageOf,
  nameOf,
  nextCursor,
  peopleIn,
  profileOf,
  type Self,
  tsOf,
  type User,
  userAnswer,
  usersAnswer,
  type WireMessage,
} from "./map.js"
import { append, threadSync } from "./threads.js"

/** Slack's own cap on `conversations.history` (https://docs.slack.dev/reference/methods/conversations.history/). */
export const HISTORY_MOST = 999

/** What Slack recommends per page of a cursor list (https://docs.slack.dev/apis/web-api/pagination/). */
const PAGE = 200

const DAY = 86_400_000

export interface SlackAdapterOptions {
  slack: SlackClient
  token: string
  self: Self | undefined
  stored?: StoredMessages | undefined
  /** How many days back a sync looks for threads with new replies. */
  threadWindowDays: number
  fetch?: FetchLike | undefined
  signal?: AbortSignal | undefined
  now?: () => number
}

const CONVERSATION_ID = /^[CDG][A-Z0-9]{2,}$/
const USER_ID = /^[UW][A-Z0-9]{2,}$/

/**
 * Slack's Web API as cli-core's messenger. Only reads for now; a write port is added beside the reads and through the
 * same client. Every answer is mapped in `map.ts`.
 */
export const slackAdapter = (options: SlackAdapterOptions): MessengerAdapter => {
  const { slack, self } = options
  const now = options.now ?? Date.now
  const me: Self = self ?? { team: "", user: "" }
  const people = new Map<string, User>()
  const names = new Map<string, string>()
  let conversations: Promise<Conversation[]> | undefined

  const known = (person: User) => {
    people.set(person.id, person)
    names.set(person.id, nameOf(person))
    return person
  }

  const person = async (id: string): Promise<User> => {
    const held = people.get(id)
    if (held) return held
    return known((await slack("users.info", { user: id }, userAnswer)).user)
  }

  // A person the token cannot see (a bot id in `reply_users`, a deleted account) leaves the id in place of a name.
  const learn = async (ids: Iterable<string>) => {
    for (const id of new Set(ids)) if (USER_ID.test(id) && !people.has(id)) await person(id).catch(() => undefined)
  }

  const everyone = async (): Promise<User[]> => {
    const found: User[] = []
    for (let cursor: string | undefined; ; ) {
      const page = await slack("users.list", { limit: PAGE, cursor }, usersAnswer)
      append(found, page.members.map(known))
      cursor = nextCursor(page)
      if (!cursor) return found
    }
  }

  const listed = (): Promise<Conversation[]> => {
    conversations ??= (async () => {
      const found: Conversation[] = []
      for (let cursor: string | undefined; ; ) {
        const page = await slack(
          "users.conversations",
          { types: "public_channel,private_channel,mpim,im", exclude_archived: false, limit: PAGE, cursor },
          conversationsAnswer,
        )
        append(found, page.channels)
        cursor = nextCursor(page)
        if (!cursor) break
      }
      await learn(found.flatMap((one) => (one.user ? [one.user] : [])))
      return found
    })()
    return conversations
  }

  const titleOf = (one: Conversation) => chatOf(one, names).title?.toLowerCase()

  const conversationOf = async (typed: string): Promise<Conversation> => {
    const wanted = typed.trim().replace(/^#/, "")
    if (CONVERSATION_ID.test(wanted)) {
      const held = (await listed()).find((one) => one.id === wanted)
      return held ?? (await slack("conversations.info", { channel: wanted }, conversationAnswer)).channel
    }
    const all = await listed()
    const dm = USER_ID.test(wanted) ? all.filter((one) => one.user === wanted) : []
    const named = dm.length ? dm : all.filter((one) => titleOf(one) === wanted.toLowerCase())
    if (named.length > 1)
      throw new CliError("validation_error", `more than one chat is called "${wanted}"; give its id (C…, D… or G…)`)
    const [found] = named
    if (!found) throw new CliError("not_found", `no chat "${wanted}" among the ones you are in`)
    return found
  }

  const idOf = async (typed: string) => {
    const wanted = typed.trim()
    return CONVERSATION_ID.test(wanted) ? wanted : (await conversationOf(wanted)).id
  }

  const mapped = async (chatId: string, wires: readonly WireMessage[]): Promise<Message[]> => {
    await learn(wires.flatMap(peopleIn))
    return wires.map((wire) => messageOf(chatId, wire, me, names))
  }

  const historyCall = (chatId: string, args: SlackArgs) =>
    slack("conversations.history", { channel: chatId, ...args }, historyAnswer)

  const repliesCall = (chatId: string, ts: string, args: SlackArgs) =>
    slack("conversations.replies", { channel: chatId, ts, ...args }, historyAnswer)

  /** Newest first, as Slack answers, service messages left out; pages on by cursor while they leave it short. */
  const newestFirst = async (chatId: string, limit: number, args: SlackArgs) => {
    const kept: WireMessage[] = []
    let answer: HistoryAnswer
    let cursor: string | undefined
    do {
      answer = await historyCall(chatId, { limit: Math.min(limit - kept.length, HISTORY_MOST), ...args, cursor })
      append(
        kept,
        answer.messages.filter((one) => !isService(one)),
      )
      cursor = nextCursor(answer)
    } while (kept.length < limit && answer.has_more === true && cursor)
    return { wires: kept, hasMore: answer.has_more === true }
  }

  /** Every message in `[oldest, latest)`, newest first, by cursor; service messages kept for `chatEvents`. */
  const between = async (chatId: string, oldest: string, latest?: string) => {
    const all: WireMessage[] = []
    for (let cursor: string | undefined; ; ) {
      const answer = await historyCall(chatId, { oldest, latest, limit: HISTORY_MOST, cursor })
      append(all, answer.messages)
      cursor = nextCursor(answer)
      if (!answer.has_more || !cursor) return all
    }
  }

  /**
   * Slack reads back from `latest`, never forward from `oldest`, so the oldest messages after a point are found in a
   * window after it that widens until it holds enough of them or reaches now.
   */
  const forward = async (chatId: string, after: string, limit: number) => {
    const from = Number(after) * 1000
    for (const span of [DAY / 24, DAY, 7 * DAY, 30 * DAY, 365 * DAY, Number.POSITIVE_INFINITY]) {
      const end = from + span
      const open = end >= now()
      const found = (await between(chatId, after, open ? undefined : tsOf(end))).filter((one) => !isService(one))
      if (found.length >= limit || open) {
        const oldest = found.toReversed().slice(0, limit)
        return { wires: oldest, hasMore: found.length > limit || !open }
      }
    }
    return { wires: [], hasMore: false }
  }

  const page = async (chatId: string, wires: readonly WireMessage[], hasMore: boolean): Promise<Page<Message>> => ({
    items: (await mapped(chatId, wires)).sort(byTs),
    hasMore,
  })

  const threads = threadSync({
    slack,
    stored: options.stored,
    windowDays: options.threadWindowDays,
    now,
    mapped,
    between,
  })

  const allReplies = async (chatId: string, root: string, args: SlackArgs = {}) => {
    const all: WireMessage[] = []
    for (let cursor: string | undefined; ; ) {
      const answer = await repliesCall(chatId, root, { limit: PAGE, ...args, cursor })
      append(all, answer.messages)
      cursor = nextCursor(answer)
      if (!answer.has_more || !cursor) return all
    }
  }

  const findPerson = async (typed: string): Promise<User> => {
    const wanted = typed.trim().replace(/^@/, "")
    if (USER_ID.test(wanted)) return person(wanted)
    const lower = wanted.toLowerCase()
    const matches = (await everyone()).filter((one) =>
      [one.name, one.real_name, one.profile?.display_name, one.profile?.real_name].some(
        (name) => name?.toLowerCase() === lower,
      ),
    )
    if (matches.length > 1)
      throw new CliError("validation_error", `more than one person is called "${wanted}"; give their id (U…)`)
    const [found] = matches
    if (!found) throw new CliError("not_found", `no person "${wanted}" in this workspace`)
    return found
  }

  const sharedChats = async (personId: string) =>
    (await listed())
      .filter((one) => one.user === personId)
      .map((one) => {
        const { id, title, kind, lastMessageAt } = chatOf(one, names)
        return { id, title, kind, lastMessageAt }
      })

  const downloads = hostFetch({
    hosts: DESKTOP.hosts,
    credentialScope: "https://files.slack.com/",
    ...(options.fetch ? { fetch: options.fetch } : {}),
  })

  const fileOf = (attachment: Message["attachments"][number], position: number): RemoteFile => {
    const url = attachment.providerRef?.url
    return {
      kind: attachment.kind,
      ...(attachment.name ? { name: attachment.name } : {}),
      ...(attachment.mime ? { mime: attachment.mime } : {}),
      ...(attachment.size === undefined ? {} : { size: attachment.size }),
      position,
      async *bytes() {
        if (typeof url !== "string" || new URL(url).host !== "files.slack.com")
          throw new CliError("provider_error", `${SERVICE} gave this file no address on files.slack.com`)
        const response = await downloads(url, {
          headers: { authorization: `Bearer ${options.token}` },
          ...(options.signal ? { signal: options.signal } : {}),
        })
        if (!response.ok || !response.body)
          throw new CliError(
            response.status === 404 ? "not_found" : "provider_error",
            `${SERVICE} refused the file (HTTP ${response.status})`,
          )
        yield* response.body
      },
    }
  }

  const oneMessage = async (chatId: string, id: string): Promise<WireMessage | undefined> => {
    const top = await historyCall(chatId, { latest: id, inclusive: true, limit: 1 })
    const found = top.messages.find((one) => one.ts === id)
    if (found) return found
    // A reply is not in the channel's history; `conversations.replies` takes any message of a thread.
    // Its answer starts with the root, so the reply asked for is the second message.
    const thread = await repliesCall(chatId, id, { oldest: id, inclusive: true, limit: 2 }).catch(() => undefined)
    return thread?.messages.find((one) => one.ts === id)
  }

  return {
    self: () => (self ? `${self.team}:${self.user}` : null),
    me: async () => accountOfUser(me, me.user ? await person(me.user).catch(() => undefined) : undefined),
    resolve: async (typed) => chatOf(await conversationOf(typed), names),
    chat: async (typed): Promise<ChatCard> => {
      const id = await idOf(typed)
      const { channel } = await slack(
        "conversations.info",
        { channel: id, include_num_members: true },
        conversationAnswer,
      )
      if (channel.user) await learn([channel.user])
      const chat = chatOf(channel, names)
      const members =
        channel.is_im && channel.user
          ? [memberOf(await person(channel.user)), ...(me.user ? [memberOf(await person(me.user))] : [])]
          : null
      return { ...chat, members }
    },
    send: async () => {
      throw new CliError("validation_error", `sending to ${SERVICE} comes in a later version; this one only reads`)
    },
    logout: async () => {},
    close: async () => {},
    chats: async ({ limit, offset }) => {
      const all = (await listed()).map((one) => chatOf(one, names))
      const end = limit === undefined ? all.length : offset + limit
      return { items: all.slice(offset, end), hasMore: all.length > end }
    },
    history: async (chat, { limit, before, reactions }) => {
      const chatId = await idOf(chat)
      const latest = before === undefined ? undefined : isTs(before) ? before : tsOf(Date.parse(before))
      const { wires, hasMore } = await newestFirst(chatId, limit, latest ? { latest } : {})
      const top = await page(chatId, wires, hasMore)
      // cli-core passes `reactions: false` only from `messages sync`: only a sync gathers new thread replies.
      if (reactions !== false) return top
      const replies = await threads.repliesFor(chatId, { wires, hasMore, latest })
      const ids = new Set(top.items.map((one) => one.id))
      return { items: [...top.items, ...replies.filter((one) => !ids.has(one.id))].sort(byTs), hasMore }
    },
    historyAfter: async (chat, { limit, after }) => {
      const chatId = await idOf(chat)
      const from = "id" in after ? after.id : tsOf((after as Extract<After, { time: number }>).time)
      const { wires, hasMore } = await forward(chatId, from, limit)
      return page(chatId, wires, hasMore)
    },
    historyBefore: async (chat, { limit, time }) => {
      const chatId = await idOf(chat)
      const { wires, hasMore } = await newestFirst(chatId, limit, { latest: tsOf(time) })
      return page(chatId, wires, hasMore)
    },
    around: async (chat, messageId, window): Promise<WindowedMessage[]> => {
      const chatId = await idOf(chat)
      const anchor = await oneMessage(chatId, messageId)
      if (!anchor) throw new CliError("not_found", `no message ${messageId} in this chat`)
      const [before, after] = await Promise.all([
        window.before > 0 ? newestFirst(chatId, window.before, { latest: messageId }) : { wires: [] },
        window.after > 0 ? forward(chatId, messageId, window.after) : { wires: [] },
      ])
      const items = await mapped(chatId, [...before.wires, anchor, ...after.wires])
      return items.sort(byTs).map((one) => (one.id === messageId ? { ...one, anchor: true } : one))
    },
    topicHistory: async (chat, threadId, { limit, before }) => {
      const chatId = await idOf(chat)
      const all = (await allReplies(chatId, threadId)).filter(
        (one) => before === undefined || byTs({ id: one.ts }, { id: before }) < 0,
      )
      return { items: (await mapped(chatId, all.slice(-limit))).sort(byTs), hasMore: all.length > limit }
    },
    contact: async (typed): Promise<PersonCard> => {
      const found = await findPerson(typed)
      return { ...contactOf(found), chats: await sharedChats(found.id) }
    },
    profile: async (typed) => {
      const found = await findPerson(typed)
      return profileOf(found, await sharedChats(found.id))
    },
    addressBook: async () => (await everyone()).filter((one) => !one.deleted).map(addressEntryOf),
    members: async (chat, { limit, offset }) => {
      const chatId = await idOf(chat)
      const ids: string[] = []
      for (let cursor: string | undefined; ; ) {
        const answer = await slack("conversations.members", { channel: chatId, limit: PAGE, cursor }, membersAnswer)
        append(ids, answer.members)
        cursor = nextCursor(answer)
        if (!cursor) break
      }
      const end = limit === undefined ? ids.length : offset + limit
      const shown = ids.slice(offset, end)
      await learn(shown)
      return {
        chatId,
        items: shown.map((id) =>
          people.has(id) ? memberOf(people.get(id) as User) : { id, name: null, username: null },
        ),
        hasMore: ids.length > end,
        participantsCount: ids.length,
      }
    },
    admins: async () => null,
    chatEvents: async (chat, { since }) => {
      const chatId = await idOf(chat)
      const service = (await between(chatId, tsOf(since))).filter(isService).toReversed()
      await learn(service.flatMap((one) => [...peopleIn(one), ...(one.inviter ? [one.inviter] : [])]))
      return {
        chatId,
        since: new Date(since).toISOString(),
        events: service.map((one) => chatEventOf(one, names)),
        more: false,
      }
    },
    download: async (chat, messageId) => {
      const chatId = await idOf(chat)
      const wire = await oneMessage(chatId, messageId)
      if (!wire) throw new CliError("not_found", `no message ${messageId} in this chat`)
      const [message] = await mapped(chatId, [wire])
      return { files: (message?.attachments ?? []).map(fileOf), skipped: [] }
    },
  }
}
