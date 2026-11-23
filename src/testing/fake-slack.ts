/** Spelled as a user token, so session start takes it, and so gitleaks lets it through; never a real token. */
export const FAKE_TOKEN = "xoxp-0synth-wirecat-fake"

export const AUTH_TEST = {
  ok: true,
  url: "https://synth-team.slack.com/",
  team: "Synth Team",
  user: "test.person",
  team_id: "T0SYNTH01",
  user_id: "U0SYNTH01",
}

export interface SlackCall {
  method: string
  args: Record<string, string>
  headers: Headers
}

type Answer = { status?: number; headers?: Record<string, string>; body: unknown }

export interface FakeUser {
  id: string
  name: string
  real_name?: string
  team_id?: string
  is_bot?: boolean
  deleted?: boolean
  profile?: Record<string, unknown>
}

export interface FakeChannel {
  id: string
  kind: "public" | "private" | "mpim" | "im"
  name?: string
  /** A DM's other person. */
  user?: string
  members: string[]
  is_ext_shared?: boolean
  unread?: number
  archived?: boolean
}

export interface FakeMessage {
  ts: string
  user?: string
  bot_id?: string
  username?: string
  text?: string
  subtype?: string
  thread_ts?: string
  team?: string
  edited?: { ts: string; user?: string }
  reactions?: { name: string; users: string[]; count: number }[]
  files?: Record<string, unknown>[]
  [field: string]: unknown
}

/** A workspace as Slack holds it: people, conversations and every message, replies included. */
export interface FakeWorkspace {
  users: FakeUser[]
  channels: FakeChannel[]
  messages: Record<string, FakeMessage[]>
  /** File bytes by their `url_private`, answered on files.slack.com with the Bearer header only. */
  files?: Record<string, string>
  /** The token's user scopes; every one Slack's reads need when unset. */
  scopes?: string[]
}

export const emptyWorkspace = (): FakeWorkspace => ({ users: [], channels: [], messages: {} })

/**
 * The arguments each method takes and the ones it requires, from Slack's reference of it
 * (https://docs.slack.dev/reference/methods/<method>/); anything else is refused.
 */
const METHODS: Record<string, { takes: readonly string[]; needs?: readonly string[] }> = {
  "auth.test": { takes: [] },
  "users.conversations": { takes: ["cursor", "exclude_archived", "limit", "team_id", "types", "user"] },
  "conversations.info": { takes: ["channel", "include_locale", "include_num_members"], needs: ["channel"] },
  "conversations.history": {
    takes: ["channel", "cursor", "include_all_metadata", "inclusive", "latest", "limit", "oldest"],
    needs: ["channel"],
  },
  "conversations.replies": {
    takes: ["channel", "ts", "cursor", "include_all_metadata", "inclusive", "latest", "limit", "oldest"],
    needs: ["channel", "ts"],
  },
  "conversations.members": { takes: ["channel", "cursor", "limit"], needs: ["channel"] },
  "search.messages": {
    takes: ["query", "count", "highlight", "page", "cursor", "sort", "sort_dir", "team_id"],
    needs: ["query"],
  },
  "users.info": { takes: ["user", "include_locale"], needs: ["user"] },
  "users.list": { takes: ["cursor", "include_locale", "limit", "team_id"] },
  "conversations.list": { takes: ["cursor", "exclude_archived", "limit", "team_id", "types"] },
  "chat.postMessage": {
    takes: [
      "channel",
      "text",
      "thread_ts",
      "reply_broadcast",
      "mrkdwn",
      "unfurl_links",
      "unfurl_media",
      "parse",
      "metadata",
    ],
    needs: ["channel", "text"],
  },
  "chat.update": { takes: ["channel", "ts", "text", "parse", "link_names"], needs: ["channel", "ts"] },
  "chat.delete": { takes: ["channel", "ts", "as_user"], needs: ["channel", "ts"] },
  "chat.getPermalink": { takes: ["channel", "message_ts"], needs: ["channel", "message_ts"] },
  "reactions.add": { takes: ["channel", "name", "timestamp"], needs: ["channel", "name", "timestamp"] },
  "reactions.remove": { takes: ["channel", "name", "timestamp", "file", "file_comment"], needs: ["name"] },
  "pins.add": { takes: ["channel", "timestamp"], needs: ["channel", "timestamp"] },
  "pins.remove": { takes: ["channel", "timestamp"], needs: ["channel", "timestamp"] },
  "conversations.mark": { takes: ["channel", "ts"], needs: ["channel", "ts"] },
  "conversations.join": { takes: ["channel"], needs: ["channel"] },
  "conversations.leave": { takes: ["channel"], needs: ["channel"] },
  "conversations.open": { takes: ["channel", "users", "return_im", "prevent_creation"] },
  "files.getUploadURLExternal": {
    takes: ["filename", "length", "alt_txt", "snippet_type"],
    needs: ["filename", "length"],
  },
  "files.completeUploadExternal": {
    takes: ["files", "channel_id", "channels", "thread_ts", "initial_comment", "blocks"],
    needs: ["files"],
  },
}

/** The scope each write needs of a user token, by the conversation's kind (https://docs.slack.dev/reference/scopes/). */
const WRITE_SCOPE = { public: "channels:write", private: "groups:write", mpim: "mpim:write", im: "im:write" }
const WRITE_NEEDS: Record<string, string> = {
  "chat.postMessage": "chat:write",
  "chat.update": "chat:write",
  "chat.delete": "chat:write",
  "reactions.add": "reactions:write",
  "reactions.remove": "reactions:write",
  "pins.add": "pins:write",
  "pins.remove": "pins:write",
  "files.getUploadURLExternal": "files:write",
  "files.completeUploadExternal": "files:write",
}

const HISTORY_SCOPE = { public: "channels:history", private: "groups:history", mpim: "mpim:history", im: "im:history" }
const READ_SCOPE = { public: "channels:read", private: "groups:read", mpim: "mpim:read", im: "im:read" }
const TYPE_OF = { public: "public_channel", private: "private_channel", mpim: "mpim", im: "im" }
const ALL_SCOPES = [
  ...Object.values(HISTORY_SCOPE),
  ...Object.values(READ_SCOPE),
  ...Object.values(WRITE_SCOPE),
  ...Object.values(WRITE_NEEDS),
  "users:read",
  "search:read",
]

const num = (ts: string) => Number(ts)

/** A message's metadata only when the read asked for it (https://docs.slack.dev/messaging/message-metadata/). */
const metadataIf =
  (args: Record<string, string>) =>
  ({ metadata, ...message }: FakeMessage) =>
    args.include_all_metadata === "true" && metadata !== undefined ? { ...message, metadata } : message

const window = (args: Record<string, string>) => {
  const inclusive = args.inclusive === "true" || args.inclusive === "1"
  const oldest = args.oldest === undefined ? Number.NEGATIVE_INFINITY : num(args.oldest)
  const latest = args.latest === undefined ? Number.POSITIVE_INFINITY : num(args.latest)
  return (ts: string) => (inclusive ? num(ts) >= oldest && num(ts) <= latest : num(ts) > oldest && num(ts) < latest)
}

const cursorPage = <T>(items: readonly T[], args: Record<string, string>, fallback: number, most = 1000) => {
  const from = args.cursor ? Number(Buffer.from(args.cursor, "base64").toString().replace("next:", "")) : 0
  const limit = Math.min(Number(args.limit ?? fallback) || fallback, most)
  const shown = items.slice(from, from + limit)
  const more = from + limit < items.length
  return {
    shown,
    more,
    response_metadata: { next_cursor: more ? Buffer.from(`next:${from + limit}`).toString("base64") : "" },
  }
}

const isReply = (one: FakeMessage) => one.thread_ts !== undefined && one.thread_ts !== one.ts

/** A root as history shows it: its reply count and newest reply worked out from the thread. */
/** Each root's replies, read once per request: a busy chat would otherwise cost every message per message. */
const repliesByRoot = (all: readonly FakeMessage[]) => {
  const roots = new Map<string, FakeMessage[]>()
  for (const one of all)
    if (one.thread_ts !== undefined && one.thread_ts !== one.ts)
      roots.set(one.thread_ts, [...(roots.get(one.thread_ts) ?? []), one])
  return roots
}

const withThread = (one: FakeMessage, roots: ReadonlyMap<string, readonly FakeMessage[]>): FakeMessage => {
  const replies = roots.get(one.ts) ?? []
  if (replies.length === 0) return one
  const latest = replies.reduce((at, other) => (num(other.ts) > num(at) ? other.ts : at), replies[0]?.ts ?? one.ts)
  return {
    ...one,
    thread_ts: one.ts,
    reply_count: replies.length,
    reply_users_count: new Set(replies.map((other) => other.user)).size,
    latest_reply: latest,
  }
}

const userOf = (one: FakeUser) => ({
  team_id: AUTH_TEST.team_id,
  deleted: false,
  is_bot: false,
  ...one,
  profile: { real_name: one.real_name ?? one.name, display_name: "", ...one.profile },
})

const conversationOf = (one: FakeChannel, all: readonly FakeMessage[], info: boolean, counted: boolean) => {
  const newest = all
    .filter((message) => !isReply(message) || message.subtype === "thread_broadcast")
    .reduce<FakeMessage | undefined>((at, message) => (!at || num(message.ts) > num(at.ts) ? message : at), undefined)
  return {
    id: one.id,
    created: 1_700_000_000,
    is_im: one.kind === "im",
    is_mpim: one.kind === "mpim",
    is_channel: one.kind === "public",
    is_group: one.kind === "private" || one.kind === "mpim",
    is_private: one.kind !== "public",
    is_archived: one.archived === true,
    is_ext_shared: one.is_ext_shared === true,
    ...(one.name ? { name: one.name } : {}),
    ...(one.user ? { user: one.user } : {}),
    ...(info && one.kind === "im" ? { unread_count: one.unread ?? 0, unread_count_display: one.unread ?? 0 } : {}),
    ...(info && newest ? { latest: { type: "message", ts: newest.ts, text: newest.text ?? "" } } : {}),
    ...(counted ? { num_members: one.members.length } : {}),
  }
}

/**
 * Slack's Web API as `slackClient` reaches it: a form POST to `https://slack.com/api/<method>` with the Bearer header,
 * and a file's bytes on files.slack.com. It refuses what Slack refuses (an unknown method, a missing token or required
 * argument, a scope the token lacks, a conversation it is not in: `ok: false` with HTTP 200, as Slack answers), and
 * what this CLI must never send (the token in the form, an unknown argument). History is newest first and pages by
 * cursor; replies are only in `conversations.replies`. `answers` replaces a method's answer.
 */
export const fakeSlack = (
  answers: Record<string, Answer | ((call: SlackCall) => Answer)> = {},
  token = FAKE_TOKEN,
  workspace: FakeWorkspace = emptyWorkspace(),
) => {
  const calls: SlackCall[] = []
  const refusals: string[] = []
  const downloads: string[] = []
  /** Every write Slack took, in order: the method and its arguments. */
  const writes: { method: string; args: Record<string, string> }[] = []
  const uploads = new Map<string, { name: string; bytes: string }>()
  const read: Record<string, string> = {}
  const refuse = (why: string, error: string, extra: Record<string, unknown> = {}): Response => {
    refusals.push(why)
    return Response.json({ ok: false, error, ...extra })
  }
  const scopes = () => workspace.scopes ?? ALL_SCOPES
  const self = AUTH_TEST.user_id
  const channelOf = (id: string | undefined) => workspace.channels.find((one) => one.id === id)
  const messagesOf = (id: string) => workspace.messages[id] ?? []

  const newTs = (chatId: string) => {
    // Now, as Slack stamps a message, and after every message the chat holds.
    const newest = messagesOf(chatId).reduce((at, one) => Math.max(at, Math.floor(num(one.ts))), 0)
    return `${Math.max(newest + 1, Math.floor(Date.now() / 1000))}.000100`
  }

  /** A write to a conversation the person is in; undefined for a read. */
  const write = (method: string, args: Record<string, string>, channel: FakeChannel): Response | undefined => {
    const needed = method.startsWith("conversations.") ? WRITE_SCOPE[channel.kind] : WRITE_NEEDS[method]
    if (method === "chat.getPermalink") {
      const at = messagesOf(channel.id).find((one) => one.ts === args.message_ts)
      if (!at) return refuse(`no message ${args.message_ts}`, "message_not_found")
      const path = `p${args.message_ts?.replace(".", "")}`
      return Response.json({
        ok: true,
        channel: channel.id,
        permalink: `${AUTH_TEST.url}archives/${channel.id}/${path}`,
      })
    }
    if (!needed || !(method in WRITE_NEEDS || ["conversations.mark", "conversations.leave"].includes(method)))
      return undefined
    if (!scopes().includes(needed)) return refuse(`${method} without ${needed}`, "missing_scope", { needed })
    workspace.messages[channel.id] ??= []
    const all = workspace.messages[channel.id] ?? []
    const target = all.find((one) => one.ts === (args.ts ?? args.timestamp))
    const done = (body: Record<string, unknown> = {}) => {
      writes.push({ method, args })
      return Response.json({ ok: true, ...body })
    }
    if (method === "conversations.leave") {
      if (!channel.members.includes(self)) return Response.json({ ok: false, not_in_channel: true })
      channel.members = channel.members.filter((one) => one !== self)
      return done()
    }
    // chat.postMessage's page: "Message metadata can only be posted or updated using an app-level token".
    if (args.metadata !== undefined) return refuse("metadata from a user token", "metadata_must_be_sent_from_app")
    if (method === "chat.postMessage" || method === "files.completeUploadExternal") {
      if (!channel.members.includes(self)) return refuse(`${method} outside ${channel.id}`, "not_in_channel")
      const ts = newTs(channel.id)
      const files =
        method === "files.completeUploadExternal"
          ? (JSON.parse(args.files ?? "[]") as { id: string; title?: string }[]).map((one) => ({
              id: one.id,
              name: uploads.get(one.id)?.name,
              title: one.title,
              mimetype: "text/plain",
              size: uploads.get(one.id)?.bytes.length,
              url_private: `https://files.slack.com/files-pri/${AUTH_TEST.team_id}-${one.id}/${uploads.get(one.id)?.name}`,
            }))
          : undefined
      const message: FakeMessage = {
        ts,
        user: self,
        text: args.text ?? args.initial_comment ?? "",
        ...(args.thread_ts ? { thread_ts: args.thread_ts } : {}),
        ...(args.reply_broadcast === "true" ? { subtype: "thread_broadcast" } : {}),
        ...(files ? { files } : {}),
        ...(args.metadata ? { metadata: JSON.parse(args.metadata) } : {}),
      }
      all.push(message)
      if (method === "files.completeUploadExternal")
        return done({ files: (files ?? []).map((one) => ({ id: one.id, title: one.title })) })
      return done({ channel: channel.id, ts, message: { type: "message", ...message } })
    }
    if (method === "conversations.mark") {
      read[channel.id] = args.ts ?? ""
      return done()
    }
    if (!target) return refuse(`no message ${args.ts ?? args.timestamp}`, "message_not_found")
    if (method === "chat.update") {
      if (target.user !== self) return refuse("not mine", "cant_update_message")
      target.text = args.text ?? ""
      target.edited = { ts: newTs(channel.id), user: self }
      return done({ channel: channel.id, ts: target.ts, text: target.text })
    }
    if (method === "chat.delete") {
      if (target.user !== self) return refuse("not mine", "cant_delete_message")
      workspace.messages[channel.id] = all.filter((one) => one !== target)
      return done({ channel: channel.id, ts: target.ts })
    }
    if (method === "reactions.add" || method === "reactions.remove") {
      const reactions = target.reactions ?? []
      const held = reactions.find((one) => one.name === args.name)
      if (method === "reactions.add") {
        if (held?.users.includes(self)) return refuse("again", "already_reacted")
        if (held) held.users.push(self)
        else reactions.push({ name: args.name ?? "", users: [self], count: 1 })
      } else {
        if (!held?.users.includes(self)) return refuse("none", "no_reaction")
        held.users = held.users.filter((one) => one !== self)
      }
      for (const one of reactions) one.count = one.users.length
      target.reactions = reactions.filter((one) => one.count > 0)
      return done()
    }
    // Slack's message object lists where it is pinned in `pinned_to`.
    const pinnedTo = Array.isArray(target.pinned_to) ? (target.pinned_to as string[]) : []
    if (method === "pins.add") {
      if (pinnedTo.includes(channel.id)) return refuse("again", "already_pinned")
      target.pinned_to = [...new Set([...pinnedTo, channel.id])]
      return done()
    }
    if (!pinnedTo.includes(channel.id)) return refuse("not pinned", "no_pin")
    target.pinned_to = pinnedTo.filter((one) => one !== channel.id)
    return done()
  }

  /**
   * Slack's search as its pages describe it: every word in the text, and `in:<name>`, `in:<@U…>`, `from:<@U…>`,
   * `after:` and `before:` (whole UTC days here, exclusive), over what the person can read. A match carries no
   * `thread_ts`; a reply's permalink names its root.
   */
  const search = (args: Record<string, string>): Response => {
    if (!scopes().includes("search:read"))
      return refuse("search without search:read", "missing_scope", { needed: "search:read" })
    const count = Number(args.count ?? 20)
    const page = Number(args.page ?? 1)
    if (count > 100 || page > 100) return refuse("count or page past 100", "invalid_arguments")
    const words: string[] = []
    const filters: ((channel: FakeChannel, one: FakeMessage) => boolean)[] = []
    for (const word of (args.query ?? "").split(/\s+/).filter(Boolean)) {
      const [key, value = ""] = word.includes(":")
        ? [word.slice(0, word.indexOf(":")), word.slice(word.indexOf(":") + 1)]
        : [word]
      const person = /^<@([UW][A-Z0-9]+)>$/.exec(value)?.[1]
      if (key === "in")
        filters.push((channel) =>
          person ? channel.kind === "im" && channel.user === person : channel.name === value.replace(/^#/, ""),
        )
      else if (key === "from") filters.push((_, one) => one.user === person)
      else if (key === "after") filters.push((_, one) => num(one.ts) * 1000 >= Date.parse(value) + 86_400_000)
      else if (key === "before") filters.push((_, one) => num(one.ts) * 1000 < Date.parse(value))
      else words.push(word.toLowerCase())
    }
    const found = workspace.channels
      .filter((channel) => channel.members.includes(self) || channel.kind === "public")
      .flatMap((channel) =>
        messagesOf(channel.id)
          .filter(
            (one) =>
              (!one.subtype || one.subtype === "thread_broadcast" || one.subtype === "bot_message") &&
              words.every((word) => (one.text ?? "").toLowerCase().includes(word)),
          )
          .filter((one) => filters.every((keep) => keep(channel, one)))
          .map((one) => ({ channel, one })),
      )
      .sort((one, other) => num(other.one.ts) - num(one.one.ts))
    const pages = Math.max(1, Math.ceil(found.length / count))
    const matches = found.slice((page - 1) * count, page * count).map(({ channel, one }) => {
      const { thread_ts: thread, reply_count: _count, ...rest } = one
      const link = `https://synth-team.slack.com/archives/${channel.id}/p${one.ts.replace(".", "")}`
      return {
        ...rest,
        type: "message",
        channel: {
          id: channel.id,
          name: channel.kind === "im" ? channel.user : channel.name,
          is_private: channel.kind !== "public",
          is_mpim: channel.kind === "mpim",
        },
        permalink: isReply(one) ? `${link}?thread_ts=${thread}&cid=${channel.id}` : link,
      }
    })
    return Response.json({
      ok: true,
      query: args.query,
      messages: { matches, paging: { count, page, pages, total: found.length }, total: found.length },
    })
  }

  const answer = (method: string, args: Record<string, string>): Response => {
    if (method === "auth.test") return Response.json(AUTH_TEST)
    if (method.startsWith("users.") && !scopes().includes("users:read"))
      return refuse(`${method} without users:read`, "missing_scope", { needed: "users:read" })
    if (method === "users.info") {
      const found = workspace.users.find((one) => one.id === args.user)
      return found ? Response.json({ ok: true, user: userOf(found) }) : refuse(`no user ${args.user}`, "user_not_found")
    }
    if (method === "users.list") {
      const page = cursorPage(workspace.users, args, 0)
      return Response.json({ ok: true, members: page.shown.map(userOf), response_metadata: page.response_metadata })
    }
    if (method === "users.conversations") {
      const types = (args.types ?? "public_channel").split(",")
      const mine = workspace.channels.filter(
        (one) =>
          one.members.includes(self) &&
          types.includes(TYPE_OF[one.kind]) &&
          !(args.exclude_archived === "true" && one.archived === true),
      )
      const page = cursorPage(mine, args, 100)
      return Response.json({
        ok: true,
        channels: page.shown.map((one) => conversationOf(one, messagesOf(one.id), false, false)),
        response_metadata: page.response_metadata,
      })
    }
    if (method === "conversations.open") {
      if (!scopes().includes("im:write"))
        return refuse("open without im:write", "missing_scope", { needed: "im:write" })
      const user = args.users ?? ""
      if (!workspace.users.some((one) => one.id === user)) return refuse(`no person ${user}`, "user_not_found")
      const held = workspace.channels.find((one) => one.kind === "im" && one.user === user)
      if (held) return Response.json({ ok: true, channel: { id: held.id } })
      const id = `D0OPEN${String(workspace.channels.length).padStart(3, "0")}`
      workspace.channels.push({ id, kind: "im", user, members: [self, user] })
      writes.push({ method, args })
      return Response.json({ ok: true, channel: { id } })
    }
    if (method === "conversations.list") {
      if (!scopes().includes("channels:read"))
        return refuse("list without channels:read", "missing_scope", { needed: "channels:read" })
      const open = workspace.channels.filter((one) => one.kind === "public" && !one.archived)
      const page = cursorPage(open, args, 100)
      return Response.json({
        ok: true,
        channels: page.shown.map((one) => conversationOf(one, messagesOf(one.id), false, false)),
        response_metadata: page.response_metadata,
      })
    }
    if (method === "search.messages") return search(args)
    if (method === "files.getUploadURLExternal") {
      if (!scopes().includes("files:write"))
        return refuse("upload without files:write", "missing_scope", { needed: "files:write" })
      const id = `F0UPLD${String(uploads.size + 1).padStart(3, "0")}`
      uploads.set(id, { name: args.filename ?? "", bytes: "" })
      return Response.json({ ok: true, upload_url: `https://files.slack.com/upload/v1/${id}`, file_id: id })
    }
    // Without a channel the file stays private and no message is made (files.completeUploadExternal's page).
    if (method === "files.completeUploadExternal" && !args.channel_id)
      return Response.json({ ok: true, files: JSON.parse(args.files ?? "[]") })
    const channel = channelOf(args.channel ?? args.channel_id)
    if (!channel) return refuse(`no conversation ${args.channel ?? args.channel_id}`, "channel_not_found")
    if (method === "conversations.join") {
      if (!scopes().includes("channels:write"))
        return refuse("join without channels:write", "missing_scope", { needed: "channels:write" })
      if (!channel.members.includes(self)) channel.members.push(self)
      writes.push({ method, args })
      return Response.json({ ok: true, channel: conversationOf(channel, messagesOf(channel.id), true, true) })
    }
    const all = messagesOf(channel.id)
    if (method === "conversations.info") {
      if (!scopes().includes(READ_SCOPE[channel.kind]))
        return refuse(`info without ${READ_SCOPE[channel.kind]}`, "missing_scope", { needed: READ_SCOPE[channel.kind] })
      const counted = args.include_num_members === "true"
      return Response.json({ ok: true, channel: conversationOf(channel, all, true, counted) })
    }
    // A user token reads every public conversation and the private ones its person is in
    // (https://docs.slack.dev/reference/methods/conversations.history/); a private one it is not in is not there.
    if (!channel.members.includes(self) && channel.kind !== "public")
      return refuse(`not in ${channel.id}`, "channel_not_found")
    if (method === "conversations.members") {
      const page = cursorPage(channel.members, args, 100)
      return Response.json({ ok: true, members: page.shown, response_metadata: page.response_metadata })
    }
    const written = write(method, args, channel)
    if (written) return written
    const scope = HISTORY_SCOPE[channel.kind]
    if (!scopes().includes(scope)) return refuse(`${method} without ${scope}`, "missing_scope", { needed: scope })
    const inside = window(args)
    if (method === "conversations.history") {
      const top = all
        .filter((one) => (!isReply(one) || one.subtype === "thread_broadcast") && inside(one.ts))
        .sort((one, other) => num(other.ts) - num(one.ts))
      const page = cursorPage(top, args, 100, 999)
      const roots = repliesByRoot(all)
      return Response.json({
        ok: true,
        messages: page.shown.map((one) => withThread(one, roots)).map(metadataIf(args)),
        has_more: page.more,
        response_metadata: page.response_metadata,
      })
    }
    const asked = all.find((one) => one.ts === args.ts)
    if (!asked) return refuse(`no message ${args.ts}`, "thread_not_found")
    const rootTs = isReply(asked) ? (asked.thread_ts ?? asked.ts) : asked.ts
    const root = all.find((one) => one.ts === rootTs)
    if (!root) return refuse(`no root ${rootTs}`, "thread_not_found")
    const replies = all
      .filter((one) => one.thread_ts === rootTs && one.ts !== rootTs && inside(one.ts))
      .sort((one, other) => num(one.ts) - num(other.ts))
    const page = cursorPage([withThread(root, repliesByRoot(all)), ...replies], args, 10, 1000)
    return Response.json({
      ok: true,
      messages: page.shown.map(metadataIf(args)),
      has_more: page.more,
      response_metadata: page.response_metadata,
    })
  }

  const fetch = async (input: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
    // As fetch does: a stopped request is never sent.
    if (init.signal?.aborted) throw init.signal.reason ?? new DOMException("This operation was aborted", "AbortError")
    const url = new URL(input instanceof Request ? input.url : input)
    const headers = new Headers(input instanceof Request ? input.headers : init.headers)
    if (url.host === "files.slack.com" && url.pathname.startsWith("/upload/v1/")) {
      const held = uploads.get(url.pathname.slice("/upload/v1/".length))
      if (init.method !== "POST" || !held) return new Response("", { status: 404 })
      held.bytes = new TextDecoder().decode(new Uint8Array(await new Response(init.body).arrayBuffer()))
      workspace.files = { ...workspace.files }
      return new Response(`OK - ${held.bytes.length}`)
    }
    if (url.host === "files.slack.com") {
      downloads.push(url.pathname)
      const bytes = workspace.files?.[url.toString()]
      if (headers.get("authorization") !== `Bearer ${token}`) return new Response("", { status: 403 })
      return bytes === undefined ? new Response("", { status: 404 }) : new Response(bytes)
    }
    const args = Object.fromEntries(new URLSearchParams(String(init.body ?? "")))
    const method = url.pathname.replace(/^\/api\//, "")
    calls.push({ method, args, headers })
    if (url.host !== "slack.com" || !url.pathname.startsWith("/api/"))
      return refuse(`not Slack: ${url}`, "unknown_method")
    if (init.method !== "POST") return refuse(`${method} not POSTed`, "invalid_post_type")
    if (url.search) return refuse(`${method} with a query`, "invalid_arguments")
    if (headers.get("content-type") !== "application/x-www-form-urlencoded")
      return refuse(`${method} not a form`, "invalid_post_type")
    if ("token" in args) return refuse(`${method} with the token in the form`, "invalid_arguments")
    if (headers.get("authorization") === null) return refuse(`${method} without a token`, "not_authed")
    if (headers.get("authorization") !== `Bearer ${token}`)
      return refuse(`${method} with another token`, "invalid_auth")
    const known = METHODS[method]
    if (!known) return refuse(`unknown method ${method}`, "unknown_method")
    const unknown = Object.keys(args).filter((name) => !known.takes.includes(name))
    if (unknown.length) return refuse(`${method} with ${unknown.join(", ")}`, "invalid_arg_name")
    const missing = (known.needs ?? []).filter((name) => !args[name])
    if (missing.length) return refuse(`${method} without ${missing.join(", ")}`, "invalid_arguments")
    const given = answers[method]
    const replaced = typeof given === "function" ? given({ method, args, headers }) : given
    if (!replaced) return answer(method, args)
    return Response.json(replaced.body, { status: replaced.status ?? 200, headers: replaced.headers ?? {} })
  }
  return { fetch, calls, refusals, downloads, writes, uploads, read, workspace }
}
