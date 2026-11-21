import type {
  Account,
  AddressBookEntry,
  Attachment,
  Chat,
  ChatEvent,
  Contact,
  GroupCard,
  Member,
  Message,
  ProfileFacts,
  Reactions,
} from "@wirecat/cli-core"
import * as v from "valibot"

/** `auth.test`'s answer (https://docs.slack.dev/reference/methods/auth.test/); a bot token's adds `bot_id`. */
export const authTestAnswer = v.looseObject({
  ok: v.literal(true),
  url: v.string(),
  team: v.string(),
  user: v.string(),
  team_id: v.string(),
  user_id: v.string(),
  bot_id: v.optional(v.string()),
})

export type AuthTest = v.InferOutput<typeof authTestAnswer>

/** One profile is one workspace and one person in it: user ids are the team's own, so the account names both. */
export const accountOf = (answer: AuthTest) => ({
  id: `${answer.team_id}:${answer.user_id}`,
  account: {
    team_id: answer.team_id,
    team: answer.team,
    user_id: answer.user_id,
    user: answer.user,
    url: answer.url,
  },
})

/** The account `T…:U…` as `session start` remembered it. */
export interface Self {
  team: string
  user: string
}

export const selfOf = (account: string): Self => {
  const [team = "", user = ""] = account.split(":")
  return { team, user }
}

const paging = v.optional(v.looseObject({ next_cursor: v.optional(v.string()) }))

export const nextCursor = (answer: { response_metadata?: { next_cursor?: string | undefined } | undefined }) =>
  answer.response_metadata?.next_cursor || undefined

const text = v.optional(v.looseObject({ value: v.optional(v.string()) }))

/** A conversation object (https://docs.slack.dev/reference/objects/conversation-object/). */
const conversation = v.looseObject({
  id: v.string(),
  name: v.optional(v.string()),
  is_channel: v.optional(v.boolean()),
  is_group: v.optional(v.boolean()),
  is_im: v.optional(v.boolean()),
  is_mpim: v.optional(v.boolean()),
  is_private: v.optional(v.boolean()),
  is_archived: v.optional(v.boolean()),
  is_ext_shared: v.optional(v.boolean()),
  is_org_shared: v.optional(v.boolean()),
  user: v.optional(v.string()),
  num_members: v.optional(v.number()),
  topic: text,
  purpose: text,
  unread_count_display: v.optional(v.number()),
  last_read: v.optional(v.string()),
  latest: v.optional(v.nullable(v.looseObject({ ts: v.optional(v.string()) }))),
})

export type Conversation = v.InferOutput<typeof conversation>

export const conversationsAnswer = v.looseObject({
  ok: v.literal(true),
  channels: v.array(conversation),
  response_metadata: paging,
})

export const conversationAnswer = v.looseObject({ ok: v.literal(true), channel: conversation })

/** A user object (https://docs.slack.dev/reference/objects/user-object/). */
const user = v.looseObject({
  id: v.string(),
  team_id: v.optional(v.string()),
  name: v.optional(v.string()),
  real_name: v.optional(v.string()),
  deleted: v.optional(v.boolean()),
  is_bot: v.optional(v.boolean()),
  is_restricted: v.optional(v.boolean()),
  is_ultra_restricted: v.optional(v.boolean()),
  profile: v.optional(
    v.looseObject({
      real_name: v.optional(v.string()),
      display_name: v.optional(v.string()),
      title: v.optional(v.string()),
      phone: v.optional(v.string()),
      team: v.optional(v.string()),
    }),
  ),
})

export type User = v.InferOutput<typeof user>

export const userAnswer = v.looseObject({ ok: v.literal(true), user })

export const usersAnswer = v.looseObject({ ok: v.literal(true), members: v.array(user), response_metadata: paging })

export const membersAnswer = v.looseObject({
  ok: v.literal(true),
  members: v.array(v.string()),
  response_metadata: paging,
})

const file = v.looseObject({
  id: v.string(),
  name: v.optional(v.nullable(v.string())),
  title: v.optional(v.string()),
  mimetype: v.optional(v.string()),
  size: v.optional(v.number()),
  original_w: v.optional(v.number()),
  original_h: v.optional(v.number()),
  url_private: v.optional(v.string()),
  url_private_download: v.optional(v.string()),
  // `hidden_by_limit` past a free workspace's history limit, `external` a link to another service, `tombstone` deleted
  // (https://docs.slack.dev/reference/objects/file-object/).
  mode: v.optional(v.string()),
  is_external: v.optional(v.boolean()),
})

/** A message as `conversations.history` and `conversations.replies` hand it out. */
const message = v.looseObject({
  type: v.optional(v.string()),
  subtype: v.optional(v.string()),
  ts: v.string(),
  user: v.optional(v.string()),
  bot_id: v.optional(v.string()),
  username: v.optional(v.string()),
  text: v.optional(v.string()),
  team: v.optional(v.string()),
  user_team: v.optional(v.string()),
  thread_ts: v.optional(v.string()),
  reply_count: v.optional(v.number()),
  reply_users_count: v.optional(v.number()),
  latest_reply: v.optional(v.string()),
  edited: v.optional(v.looseObject({ ts: v.string(), user: v.optional(v.string()) })),
  reactions: v.optional(v.array(v.looseObject({ name: v.string(), users: v.array(v.string()), count: v.number() }))),
  files: v.optional(v.array(file)),
  topic: v.optional(v.string()),
  purpose: v.optional(v.string()),
  name: v.optional(v.string()),
  old_name: v.optional(v.string()),
  inviter: v.optional(v.string()),
  user_profile: v.optional(v.looseObject({ real_name: v.optional(v.string()), display_name: v.optional(v.string()) })),
  bot_profile: v.optional(v.looseObject({ name: v.optional(v.string()) })),
  // Legacy attachments and Block Kit: an integration's message often has its words only there.
  attachments: v.optional(v.array(v.looseObject({ fallback: v.optional(v.string()), text: v.optional(v.string()) }))),
  blocks: v.optional(
    v.array(v.looseObject({ type: v.string(), text: v.optional(v.looseObject({ text: v.optional(v.string()) })) })),
  ),
})

export type WireMessage = v.InferOutput<typeof message>

export const historyAnswer = v.looseObject({
  ok: v.literal(true),
  messages: v.array(message),
  has_more: v.optional(v.boolean()),
  response_metadata: paging,
})

export type HistoryAnswer = v.InferOutput<typeof historyAnswer>

/** `ts` is seconds with microseconds as a string; it is the message's id, never parsed for anything but its time. */
export const DAY = 86_400_000

/** A conversation's id (C…, D…, G…) and a person's (U…, W…), as Slack makes them. */
export const CONVERSATION_ID = /^[CDG][A-Z0-9]{2,}$/
export const USER_ID = /^[UW][A-Z0-9]{2,}$/

export const timeOf = (ts: string): string => new Date(Math.floor(Number(ts) * 1000)).toISOString()

/** A moment as Slack's `latest`/`oldest` take it. */
export const tsOf = (ms: number): string => (ms / 1000).toFixed(6)

export const isTs = (value: string) => /^\d+\.\d+$/.test(value)

export const byTs = (one: { id: string }, other: { id: string }) =>
  Number(one.id) - Number(other.id) || one.id.localeCompare(other.id)

/** Names known for user and channel ids, so a mention reads as the person or channel and not as `U…` or `C…`. */
export type Names = ReadonlyMap<string, string>

export const nameOf = (person: User): string =>
  person.profile?.display_name || person.profile?.real_name || person.real_name || person.name || person.id

/**
 * mrkdwn to plain text (https://docs.slack.dev/messaging/formatting-message-text/): `<@U…>` as `@Name`, `<#C…|name>`
 * as `#name`, `<!here>` as `@here`, `<url|label>` as `label (url)`, and the three escaped characters back.
 */
export const plainText = (raw: string, names: Names): string =>
  raw
    .replace(/<([^<>]*)>/g, (_, inner: string) => {
      const [target = "", label] = inner.split("|", 2)
      if (target.startsWith("@")) return `@${label || names.get(target.slice(1)) || target.slice(1)}`
      if (target.startsWith("#")) return `#${label || names.get(target.slice(1)) || target.slice(1)}`
      if (target.startsWith("!subteam^")) return label || "@group"
      if (target.startsWith("!date^")) return label || ""
      if (target.startsWith("!")) return `@${label || target.slice(1)}`
      const address = target.startsWith("mailto:") ? target.slice("mailto:".length) : target
      return label && label !== address ? `${label} (${address})` : address
    })
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")

/** The user ids a text mentions, once each, in order. */
export const mentionsOf = (raw: string): string[] => [
  ...new Set([...raw.matchAll(/<@([UW][A-Z0-9]+)(?:\|[^>]*)?>/g)].map((found) => found[1] ?? "")),
]

/** The people a message names, so their names can be looked up before it is mapped. */
export const peopleIn = (wire: WireMessage): string[] => [
  ...(wire.user ? [wire.user] : []),
  ...mentionsOf(wire.text ?? ""),
]

/**
 * Subtypes that record a change to the conversation, not something someone said
 * (https://docs.slack.dev/reference/events/message/): they become chat events, never messages.
 */
const SERVICE: Readonly<Record<string, string>> = {
  channel_join: "join",
  group_join: "join",
  channel_leave: "leave",
  group_leave: "leave",
  channel_name: "title",
  group_name: "title",
  channel_topic: "topic",
  group_topic: "topic",
  channel_purpose: "purpose",
  group_purpose: "purpose",
  channel_archive: "archive",
  group_archive: "archive",
  channel_unarchive: "unarchive",
  group_unarchive: "unarchive",
  channel_convert_to_private: "private",
  channel_convert_to_public: "public",
  channel_posting_permissions: "permissions",
  pinned_item: "pin",
  unpinned_item: "unpin",
}

export const isService = (wire: WireMessage) => wire.subtype !== undefined && wire.subtype in SERVICE

/**
 * Subtypes that are neither something someone said nor a change to the conversation
 * (https://docs.slack.dev/reference/events/message/): a reminder set, content an admin's key withholds, a comment in
 * the old file model, an assistant thread's opening. A `tombstone`, which that list leaves out, is what Slack keeps in
 * place of a deleted thread root that has replies. A root among them still leads to its replies.
 */
const NO_MESSAGE = new Set(["reminder_add", "ekm_access_denied", "file_comment", "assistant_app_thread", "tombstone"])

/** What `messages list` shows: neither a service message nor one of the subtypes above. */
export const isShown = (wire: WireMessage) => !isService(wire) && !NO_MESSAGE.has(wire.subtype ?? "")

/** The words of a message whose `text` is empty: its attachments' fallback, else its blocks' text. */
const wordsOf = (wire: WireMessage): string => {
  if (wire.text) return wire.text
  const fallback = (wire.attachments ?? []).map((one) => one.fallback || one.text || "").filter(Boolean)
  if (fallback.length) return fallback.join("\n")
  return (wire.blocks ?? [])
    .map((one) => one.text?.text ?? "")
    .filter(Boolean)
    .join("\n")
}

const kindOfFile = (mime: string | undefined) => {
  if (mime?.startsWith("image/")) return "photo"
  if (mime?.startsWith("video/")) return "video"
  if (mime?.startsWith("audio/")) return "audio"
  return "file"
}

const attachmentsOf = (wire: WireMessage): Attachment[] =>
  (wire.files ?? []).map((one) => {
    const url = one.url_private_download ?? one.url_private
    return {
      kind: kindOfFile(one.mimetype),
      ...(one.name ? { name: one.name } : one.title ? { name: one.title } : {}),
      ...(one.mimetype ? { mime: one.mimetype } : {}),
      ...(one.size === undefined ? {} : { size: one.size }),
      ...(one.original_w === undefined ? {} : { width: one.original_w }),
      ...(one.original_h === undefined ? {} : { height: one.original_h }),
      providerRef: {
        file_id: one.id,
        ...(url ? { url } : {}),
        ...(one.mode ? { mode: one.mode } : {}),
        ...(one.is_external ? { external: true } : {}),
      },
    }
  })

const reactionsOf = (wire: WireMessage, self: Self): Reactions | null => {
  if (!wire.reactions?.length) return null
  const counts = wire.reactions.map((one) => ({ reaction: one.name, count: one.count }))
  return {
    counts,
    mine: wire.reactions.find((one) => one.users.includes(self.user))?.name ?? null,
    total: counts.reduce((sum, one) => sum + one.count, 0),
  }
}

/**
 * One Slack message as cli-core's. The id is `ts` as a string; a reply's thread is its root's `ts`, and the root
 * carries the same `thread_ts`, so a thread read by `topic:<root ts>` holds the root and its replies. A message from
 * a person of another team (Slack Connect) keeps that team.
 */
export const messageOf = (chatId: string, wire: WireMessage, self: Self, names: Names): Message => {
  const raw = wordsOf(wire)
  const sender = wire.user ?? wire.bot_id ?? null
  const team = wire.user_team ?? wire.team
  const reply = wire.thread_ts !== undefined && wire.thread_ts !== wire.ts
  const bot = wire.bot_id !== undefined && wire.user === undefined
  const mentions = mentionsOf(raw)
  const metadata = {
    ...(wire.subtype ? { slack_subtype: wire.subtype } : {}),
    ...(wire.reply_count ? { reply_count: wire.reply_count } : {}),
    ...(wire.reply_users_count ? { reply_users_count: wire.reply_users_count } : {}),
    ...(wire.latest_reply ? { latest_reply: wire.latest_reply } : {}),
    ...(wire.bot_id ? { slack_bot_id: wire.bot_id } : {}),
    ...(bot || wire.subtype === "bot_message" ? { slack_bot: true } : {}),
    ...(team && self.team && team !== self.team ? { slack_team: team } : {}),
    ...(wire.reactions?.length
      ? { slack_reactions: wire.reactions.map((one) => ({ name: one.name, users: one.users })) }
      : {}),
  }
  return {
    id: wire.ts,
    chatId,
    senderId: sender,
    senderName:
      (wire.user ? names.get(wire.user) : undefined) ??
      (wire.user_profile?.display_name || wire.user_profile?.real_name || undefined) ??
      wire.username ??
      wire.bot_profile?.name ??
      null,
    ...(mentions.length ? { mentions } : {}),
    timestamp: timeOf(wire.ts),
    editedAt: wire.edited ? timeOf(wire.edited.ts) : null,
    text: plainText(raw, names),
    outgoing: self.user ? wire.user === self.user : null,
    attachments: attachmentsOf(wire),
    replyTo: null,
    forwardedFrom: null,
    ...(wire.thread_ts ? { threadId: wire.thread_ts } : {}),
    ...(reply && wire.thread_ts ? { threadRootId: wire.thread_ts } : {}),
    reactions: reactionsOf(wire, self),
    ...(Object.keys(metadata).length ? { providerMetadata: metadata } : {}),
  }
}

/** A service message as cli-core's chat event: who joined or left, a new name or topic. */
export const chatEventOf = (wire: WireMessage, names: Names): ChatEvent => {
  const by = wire.inviter ?? wire.user ?? null
  const event = SERVICE[wire.subtype ?? ""] ?? wire.subtype ?? "other"
  return {
    messageId: wire.ts,
    timestamp: timeOf(wire.ts),
    event,
    by: { id: by, name: by ? (names.get(by) ?? null) : null },
    people: wire.user ? [{ id: wire.user, name: names.get(wire.user) ?? null }] : [],
    ...(event === "title" && wire.name ? { title: wire.name } : {}),
  }
}

const slackKind = (one: Conversation) => {
  if (one.is_im) return "im"
  if (one.is_mpim) return "mpim"
  return one.is_private || one.is_group ? "private" : "public"
}

// A group DM's name lists its members' handles: `mpdm-anna--boris--vera-1`.
const groupDmTitle = (name: string) =>
  name
    .replace(/^mpdm-/, "")
    .replace(/-\d+$/, "")
    .split("--")
    .join(", ")

/**
 * A conversation as cli-core's chat: a DM is a dialog; a group DM and every channel are groups, since everyone in a
 * Slack channel writes. Slack hands out unread counts only for DMs, and only through `conversations.info`
 * (https://docs.slack.dev/reference/methods/conversations.info/), so a listed chat's count is unknown.
 */
export const chatOf = (one: Conversation, names: Names): Chat => {
  const kind = slackKind(one)
  const title =
    kind === "im"
      ? (names.get(one.user ?? "") ?? one.user ?? null)
      : kind === "mpim"
        ? groupDmTitle(one.name ?? "")
        : (one.name ?? null)
  const latest = one.latest?.ts
  return {
    id: one.id,
    title,
    kind: kind === "im" ? "dialog" : "group",
    unreadCount: one.unread_count_display ?? null,
    lastMessageAt: latest ? timeOf(latest) : null,
    participantsCount: one.num_members ?? (kind === "im" ? 2 : null),
    archived: one.is_archived === true,
    membershipState: "joined",
    providerMetadata: {
      slack_kind: kind,
      slack_shared: one.is_ext_shared === true || one.is_org_shared === true ? true : null,
      slack_user: one.user ?? null,
      last_read: one.last_read ?? null,
    },
  }
}

/** A channel as a group card: Slack's purpose, else its topic, is the description; Slack gives no invite link. */
export const groupOf = (one: Conversation, names: Names): GroupCard => ({
  ...chatOf(one, names),
  description: one.purpose?.value || one.topic?.value || null,
  link: null,
  settings: {
    allCanPin: null,
    onlyAdminsAdd: null,
    onlyAdminsCall: null,
    onlyOwnerEditsInfo: null,
    membersSeeLink: null,
  },
})

export const memberOf = (person: User): Member => ({
  id: person.id,
  name: nameOf(person),
  username: person.name ?? null,
})

export const contactOf = (person: User): Contact => ({
  ...memberOf(person),
  description: person.profile?.title || null,
  lastMessagedAt: null,
})

export const addressEntryOf = (person: User): AddressBookEntry => ({
  ...memberOf(person),
  phone: person.profile?.phone || null,
})

export const accountOfUser = (self: Self, person: User | undefined): Account => ({
  id: `${self.team}:${self.user}`,
  name: person ? nameOf(person) : null,
  username: person?.name ?? null,
})

export const profileOf = (person: User, chats: ProfileFacts["chats"]): ProfileFacts => ({
  id: person.id,
  name: nameOf(person),
  usernames: person.name ? [person.name] : [],
  bio: person.profile?.title || null,
  ...(person.profile?.phone ? { phone: person.profile.phone } : {}),
  flags: {
    bot: person.is_bot === true,
    deleted: person.deleted === true,
    restricted: person.is_restricted === true || person.is_ultra_restricted === true,
  },
  chats,
})
