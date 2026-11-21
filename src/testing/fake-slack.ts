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
  "users.info": { takes: ["user", "include_locale"], needs: ["user"] },
  "users.list": { takes: ["cursor", "include_locale", "limit", "team_id"] },
}

const HISTORY_SCOPE = { public: "channels:history", private: "groups:history", mpim: "mpim:history", im: "im:history" }
const READ_SCOPE = { public: "channels:read", private: "groups:read", mpim: "mpim:read", im: "im:read" }
const TYPE_OF = { public: "public_channel", private: "private_channel", mpim: "mpim", im: "im" }
const ALL_SCOPES = [...Object.values(HISTORY_SCOPE), ...Object.values(READ_SCOPE), "users:read"]

const num = (ts: string) => Number(ts)

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
const withThread = (one: FakeMessage, all: readonly FakeMessage[]): FakeMessage => {
  const replies = all.filter((other) => other.thread_ts === one.ts && other.ts !== one.ts)
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
    is_archived: false,
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
  const refuse = (why: string, error: string, extra: Record<string, unknown> = {}): Response => {
    refusals.push(why)
    return Response.json({ ok: false, error, ...extra })
  }
  const scopes = () => workspace.scopes ?? ALL_SCOPES
  const self = AUTH_TEST.user_id
  const channelOf = (id: string | undefined) => workspace.channels.find((one) => one.id === id)
  const messagesOf = (id: string) => workspace.messages[id] ?? []

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
      const mine = workspace.channels.filter((one) => one.members.includes(self) && types.includes(TYPE_OF[one.kind]))
      const page = cursorPage(mine, args, 100)
      return Response.json({
        ok: true,
        channels: page.shown.map((one) => conversationOf(one, messagesOf(one.id), false, false)),
        response_metadata: page.response_metadata,
      })
    }
    const channel = channelOf(args.channel)
    if (!channel) return refuse(`no conversation ${args.channel}`, "channel_not_found")
    const all = messagesOf(channel.id)
    if (method === "conversations.info") {
      if (!scopes().includes(READ_SCOPE[channel.kind]))
        return refuse(`info without ${READ_SCOPE[channel.kind]}`, "missing_scope", { needed: READ_SCOPE[channel.kind] })
      const counted = args.include_num_members === "true"
      return Response.json({ ok: true, channel: conversationOf(channel, all, true, counted) })
    }
    if (!channel.members.includes(self)) return refuse(`not in ${channel.id}`, "not_in_channel")
    if (method === "conversations.members") {
      const page = cursorPage(channel.members, args, 100)
      return Response.json({ ok: true, members: page.shown, response_metadata: page.response_metadata })
    }
    const scope = HISTORY_SCOPE[channel.kind]
    if (!scopes().includes(scope)) return refuse(`${method} without ${scope}`, "missing_scope", { needed: scope })
    const inside = window(args)
    if (method === "conversations.history") {
      const top = all
        .filter((one) => (!isReply(one) || one.subtype === "thread_broadcast") && inside(one.ts))
        .map((one) => withThread(one, all))
        .sort((one, other) => num(other.ts) - num(one.ts))
      const page = cursorPage(top, args, 100, 999)
      return Response.json({
        ok: true,
        messages: page.shown,
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
    const page = cursorPage([withThread(root, all), ...replies], args, 10, 1000)
    return Response.json({
      ok: true,
      messages: page.shown,
      has_more: page.more,
      response_metadata: page.response_metadata,
    })
  }

  const fetch = async (input: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
    const url = new URL(input instanceof Request ? input.url : input)
    const headers = new Headers(input instanceof Request ? input.headers : init.headers)
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
  return { fetch, calls, refusals, downloads, workspace }
}
