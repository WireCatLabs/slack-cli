import { CliError, isCliError } from "@wirecat/cli-base"
import { type FetchLike, hostFetch } from "@wirecat/cli-base/http"
import type { Chat, ChatCard, Message, Page, PersonCard, WindowedMessage } from "@wirecat/cli-core"
import type { After, MessengerAdapter, RemoteFile } from "@wirecat/cli-core/cli"
import { DESKTOP, SERVICE } from "../identity.js"
import type { SlackArgs, SlackClient } from "./client.js"
import {
  accountOfUser,
  addressEntryOf,
  byTs,
  CONVERSATION_ID,
  type Conversation,
  chatEventOf,
  chatOf,
  contactOf,
  conversationAnswer,
  conversationsAnswer,
  DAY,
  type HistoryAnswer,
  historyAnswer,
  isService,
  isShown,
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
  USER_ID,
  type User,
  userAnswer,
  usersAnswer,
  type WireMessage,
} from "./map.js"
import { serverSearch } from "./search.js"
import { append, threadReplies } from "./threads.js"
import { slackWrites } from "./writes.js"

/** Slack's own cap on `conversations.history` (https://docs.slack.dev/reference/methods/conversations.history/). */
export const HISTORY_MOST = 999

/** DMs and group DMs `inbox` counts: one conversations.info each, at the profile's pace. */
export const INBOX_INFO_MOST = 40

/** What Slack recommends per page of a cursor list (https://docs.slack.dev/apis/web-api/pagination/). */
const PAGE = 200

export interface SlackAdapterOptions {
  slack: SlackClient
  token: string
  self: Self | undefined
  /** How many days back a sync looks for threads with new replies. */
  threadWindowDays: number
  fetch?: FetchLike | undefined
  signal?: AbortSignal | undefined
  now?: () => number
  alsoToChannel?: boolean
}

/** How many unknown people are asked by users.info one by one before the directory is read instead. */
const FEW = 3

const quietlyMissing = (error: unknown) => {
  if (isCliError(error) && error.details.slack_error === "user_not_found") return undefined
  throw error
}

const MISSING_MESSAGE = new Set(["thread_not_found", "message_not_found"])

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

  let directory: Promise<unknown> | undefined

  /**
   * Names for the people a read names. A few are asked one by one; more than that, and the whole directory is read
   * once for the run, as one users.info each would cost a call of the profile's pace. A person Slack does not know
   * keeps the id in place of a name; any other refusal, a rate limit among them, is the read's.
   */
  const learn = async (ids: Iterable<string>) => {
    const unknown = () => [...new Set(ids)].filter((id) => USER_ID.test(id) && !people.has(id))
    if (unknown().length > FEW) {
      directory ??= everyone()
      await directory
    }
    const left = unknown()
    if (directory && left.length > FEW) return
    for (const id of left) await person(id).catch(quietlyMissing)
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
          { types: "public_channel,private_channel,mpim,im", exclude_archived: true, limit: PAGE, cursor },
          conversationsAnswer,
        )
        append(found, page.channels)
        cursor = nextCursor(page)
        if (!cursor) break
      }
      for (const one of found) if (one.name && !one.is_mpim) names.set(one.id, one.name)
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

  /** The messages among `wires`, mapped: service messages, tombstones and the like are left out. */
  const mapped = async (chatId: string, wires: readonly WireMessage[]): Promise<Message[]> => {
    const shown = wires.filter(isShown)
    await learn(shown.flatMap(peopleIn))
    return shown.map((wire) => messageOf(chatId, wire, me, names))
  }

  const historyCall = (chatId: string, args: SlackArgs) =>
    slack("conversations.history", { channel: chatId, ...args }, historyAnswer)

  const repliesCall = (chatId: string, ts: string, args: SlackArgs) =>
    slack("conversations.replies", { channel: chatId, ts, ...args }, historyAnswer)

  /**
   * Newest first, as Slack answers, service messages left out; pages on by cursor while they leave it short. A
   * tombstone stays, since a sync finds a deleted root's replies through it; `mapped` leaves it out of the page.
   */
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

  /** The messages of `[oldest, latest)` shown in a list, newest first, or `undefined` once more than `most`. */
  const shownBetween = async (chatId: string, oldest: string, latest: string | undefined, most: number) => {
    const shown: WireMessage[] = []
    for (let cursor: string | undefined; ; ) {
      const answer = await historyCall(chatId, { oldest, latest, limit: HISTORY_MOST, cursor })
      append(shown, answer.messages.filter(isShown))
      if (shown.length > most) return undefined
      cursor = nextCursor(answer)
      if (!answer.has_more || !cursor) return shown
    }
  }

  /**
   * Slack reads back from `latest`, never forward from `oldest`, so the oldest messages after a point are found in a
   * window after it that widens until it holds enough of them or reaches now. A window too full to read whole is
   * halved back towards the last one that held too few, so a busy chat costs a few pages, not every message since.
   */
  const forward = async (chatId: string, after: string, limit: number) => {
    const from = Number(after) * 1000
    const most = limit + HISTORY_MOST
    let few = 0
    let full: number | undefined
    for (const span of [DAY / 24, DAY, 7 * DAY, 30 * DAY, 365 * DAY, Number.POSITIVE_INFINITY]) {
      const open = from + span >= now()
      const found = await shownBetween(chatId, after, open ? undefined : tsOf(from + span), most)
      if (found === undefined) {
        full = Math.min(span, now() - from)
        break
      }
      if (found.length >= limit || open)
        return { wires: found.toReversed().slice(0, limit), hasMore: found.length > limit || !open }
      few = span
    }
    // Slack's ts has microseconds: a millisecond is the narrowest window worth asking.
    while (full !== undefined && full - few > 1) {
      const span = few + Math.floor((full - few) / 2)
      const found = await shownBetween(chatId, after, tsOf(from + span), most)
      if (found === undefined) full = span
      else if (found.length < limit) few = span
      else return { wires: found.toReversed().slice(0, limit), hasMore: true }
    }
    const last = (await shownBetween(chatId, after, tsOf(from + (full ?? 0)), Number.POSITIVE_INFINITY)) ?? []
    return { wires: last.toReversed().slice(0, limit), hasMore: true }
  }

  const page = async (
    chatId: string,
    wires: readonly WireMessage[],
    hasMore: boolean,
    older = false,
  ): Promise<Page<Message>> => {
    threads.seen(chatId, wires, { whole: older })
    return { items: (await mapped(chatId, wires)).sort(byTs), hasMore }
  }

  const searchMessages = serverSearch({
    slack,
    conversationOf,
    learn,
    chatOf: (one) => chatOf(one, names),
    messageOf: (chatId, wire) => messageOf(chatId, wire, me, names),
  })

  const threads = threadReplies({
    slack,
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

  /** Why Slack hands out no bytes for this file, or nothing when it does. */
  const unusable = (attachment: Message["attachments"][number]): string | undefined => {
    const ref = attachment.providerRef ?? {}
    // The kind, not the file name: a name is someone else's text.
    const name = attachment.kind
    if (ref.mode === "hidden_by_limit") return `${name}: hidden past the workspace's history limit`
    if (ref.external === true || ref.mode === "external") return `${name}: a link to a file elsewhere`
    if (ref.mode === "tombstone") return `${name}: deleted`
    const url = ref.url
    if (typeof url !== "string" || !URL.canParse(url) || new URL(url).host !== "files.slack.com")
      return `${name}: no address on files.slack.com`
    return undefined
  }

  const fileOf = (attachment: Message["attachments"][number], position: number): RemoteFile => ({
    kind: attachment.kind,
    ...(attachment.name ? { name: attachment.name } : {}),
    ...(attachment.mime ? { mime: attachment.mime } : {}),
    ...(attachment.size === undefined ? {} : { size: attachment.size }),
    position,
    async *bytes() {
      const response = await downloads(String(attachment.providerRef?.url), {
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
  })

  const oneMessage = async (chatId: string, id: string): Promise<WireMessage | undefined> => {
    const top = await historyCall(chatId, { latest: id, inclusive: true, limit: 1 })
    const found = top.messages.find((one) => one.ts === id)
    if (found) return found
    // A reply is not in the channel's history; `conversations.replies` takes any message of a thread.
    // Its answer starts with the root, so the reply asked for is the second message.
    const thread = await repliesCall(chatId, id, { oldest: id, inclusive: true, limit: 2 }).catch((error: unknown) => {
      if (isCliError(error) && MISSING_MESSAGE.has(String(error.details.slack_error))) return undefined
      throw error
    })
    return thread?.messages.find((one) => one.ts === id)
  }

  const writes = slackWrites({
    slack,
    self: me.user,
    names,
    ...(options.now ? { now: options.now } : {}),
    ...(options.alsoToChannel ? { alsoToChannel: true } : {}),
    oneMessage,
    mapped,
    conversationOf,
    forget: () => {
      conversations = undefined
    },
  })

  return {
    ...writes,
    self: () => (self ? `${self.team}:${self.user}` : null),
    me: async () => accountOfUser(me, me.user ? await person(me.user).catch(quietlyMissing) : undefined),
    // A person with no DM yet resolves to them, by their user id: a send opens the DM first.
    resolve: async (typed) => {
      const held = await conversationOf(typed).catch(async (error: unknown) => {
        if (!isCliError(error) || error.code !== "not_found" || CONVERSATION_ID.test(typed.trim())) throw error
        const person = await findPerson(typed).catch(() => {
          throw error
        })
        if (person.id === me.user) throw error
        return { id: person.id, is_im: true, user: person.id } as Conversation
      })
      return chatOf(held, names)
    },
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
    logout: async () => {},
    close: async () => {},
    // Slack lists no unread counts; conversations.info gives them for DMs only
    // (https://docs.slack.dev/reference/methods/conversations.info/), one call each, so inbox asks a bounded few.
    unreadChats: async () => {
      const all = await listed()
      // DMs first: the docs promise their counts; a group DM's is not stated, and it still gives a last message time.
      const direct = [...all.filter((one) => one.is_im), ...all.filter((one) => one.is_mpim)]
      const asked = direct.slice(0, INBOX_INFO_MOST)
      const items: Chat[] = []
      let stopped = false
      for (const one of asked) {
        try {
          const { channel } = await slack("conversations.info", { channel: one.id }, conversationAnswer)
          items.push(chatOf({ ...one, ...channel }, names))
        } catch (error) {
          // What was counted still answers; the rest is named below rather than lost.
          if (items.length === 0) throw error
          stopped = true
          break
        }
      }
      const channels = all.length - direct.length
      const left = [
        ...(channels > 0 ? [`${channels} channels are not counted: Slack gives unread counts for DMs only`] : []),
        ...(stopped || direct.length > asked.length
          ? [`counted ${items.length} of ${direct.length} DMs and group DMs; the rest may hold unread messages`]
          : []),
      ]
      return { items, hasMore: items.length < direct.length, ...(left.length ? { left } : {}) }
    },
    chats: async ({ limit, offset }) => {
      const all = (await listed()).map((one) => chatOf(one, names))
      const end = limit === undefined ? all.length : offset + limit
      return { items: all.slice(offset, end), hasMore: all.length > end }
    },
    history: async (chat, { limit, before }) => {
      const chatId = await idOf(chat)
      const latest = before === undefined ? undefined : isTs(before) ? before : tsOf(Date.parse(before))
      const { wires, hasMore } = await newestFirst(chatId, limit, latest ? { latest } : {})
      return page(chatId, wires, hasMore, latest !== undefined)
    },
    threadReplies: (chatId, window) => threads.read(chatId, window),
    searchMessages,
    historyAfter: async (chat, { limit, after }) => {
      const chatId = await idOf(chat)
      const from = "id" in after ? after.id : tsOf((after as Extract<After, { time: number }>).time)
      const { wires, hasMore } = await forward(chatId, from, limit)
      return page(chatId, wires, hasMore)
    },
    historyBefore: async (chat, { limit, time }) => {
      const chatId = await idOf(chat)
      const { wires, hasMore } = await newestFirst(chatId, limit, { latest: tsOf(time) })
      return page(chatId, wires, hasMore, true)
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
      const files: RemoteFile[] = []
      const skipped: string[] = []
      for (const [position, attachment] of (message?.attachments ?? []).entries()) {
        const why = unusable(attachment)
        if (why) skipped.push(why)
        else files.push(fileOf(attachment, position))
      }
      return { files, skipped }
    },
  }
}
