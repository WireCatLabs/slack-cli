import { randomUUID } from "node:crypto"
import { readFile } from "node:fs/promises"
import { CliError, isCliError } from "@wirecat/cli-base"
import type { GroupCard, Message, MessagePermalink } from "@wirecat/cli-core"
import { parseMarkdownSpans } from "@wirecat/cli-core"
import type { SendOptions, Sent } from "@wirecat/cli-core/cli"
import * as v from "valibot"
import { SERVICE } from "../identity.js"
import type { SlackArgs, SlackClient } from "./client.js"
import {
  CONVERSATION_ID,
  type Conversation,
  conversationAnswer,
  conversationsAnswer,
  groupOf,
  historyAnswer,
  type Names,
  nextCursor,
  USER_ID,
  type WireMessage,
} from "./map.js"
import { escaped, mrkdwnOf } from "./mrkdwn.js"

type Upload = NonNullable<SendOptions["attachments"]>[number]

const ok = v.looseObject({ ok: v.literal(true) })

const posted = v.looseObject({
  ok: v.literal(true),
  channel: v.string(),
  ts: v.string(),
  message: v.optional(v.looseObject({})),
})

const uploadUrl = v.looseObject({ ok: v.literal(true), upload_url: v.string(), file_id: v.string() })
const shared = v.looseObject({
  ok: v.literal(true),
  files: v.array(v.looseObject({ id: v.string(), title: v.optional(v.string()) })),
})
const permalinkAnswer = v.looseObject({ ok: v.literal(true), permalink: v.string() })
const opened = v.looseObject({ ok: v.literal(true), channel: v.looseObject({ id: v.string() }) })

export interface SlackWritesOptions {
  slack: SlackClient
  /** The owner's user id: a repeat looks for the owner's own copy, and `reactions remove` takes off theirs. */
  self: string
  names: Names
  oneMessage: (chatId: string, id: string) => Promise<WireMessage | undefined>
  mapped: (chatId: string, wires: readonly WireMessage[]) => Promise<Message[]>
  conversationOf: (typed: string) => Promise<Conversation>
  /** Called after a join, a leave or a new DM, so the next list reads the conversations again. */
  forget: () => void
  now?: () => number
}

/** How far before a send id's time a repeat looks: Slack's clock and this computer's may differ a little. */
const MARGIN_MS = 60_000
/** How many times a file send reads the chat again for the message Slack shares the file in. */
const SHARE_READS = 3
const PAGE = 200

/** A send id carries the time it was made, so a repeat looks only at what came after it. */
const SEND_ID = /^s(\d{13})-[0-9a-f-]{36}$/

const tsAt = (ms: number) => (ms / 1000).toFixed(6)

/** Slack's codes that mean a repeat finds the change already made (each from the method's page). */
const ALREADY: Record<string, string> = {
  "reactions.add": "already_reacted",
  "pins.add": "already_pinned",
  "pins.remove": "no_pin",
  "chat.delete": "message_not_found",
  "conversations.leave": "not_in_channel",
}

const isSlackError = (error: unknown, code: string | undefined) =>
  code !== undefined && isCliError(error) && error.details.slack_error === code

export const slackWrites = (options: SlackWritesOptions) => {
  const { slack } = options
  const now = options.now ?? Date.now
  // A send id this run made is a first try; any other is a repeat of a send whose outcome was unknown.
  const minted = new Set<string>()

  const write = <T>(method: string, args: SlackArgs, answer: v.GenericSchema<unknown, T>) =>
    slack(method, args, answer, { writes: true })

  /** A write whose repeat may find it done: Slack's code for that is the outcome asked for. */
  const idempotent = (method: string, args: SlackArgs) =>
    write(method, args, ok).then(
      () => undefined,
      (error: unknown) => {
        if (!isSlackError(error, ALREADY[method])) throw error
      },
    )

  const rootOf = async (chatId: string, ts: string) => {
    const wire = await options.oneMessage(chatId, ts)
    if (!wire) throw new CliError("not_found", `no message ${ts} in this chat`)
    return wire.thread_ts ?? wire.ts
  }

  /** `--topic <ts>` and `--reply-to <ts>` both go to that message's thread: Slack replies to its root. */
  const threadOf = async (chatId: string, { threadId, replyTo }: Pick<SendOptions, "threadId" | "replyTo">) => {
    const fromTopic = threadId ? await rootOf(chatId, threadId) : undefined
    const fromReply = replyTo ? await rootOf(chatId, replyTo) : undefined
    if (fromTopic && fromReply && fromTopic !== fromReply)
      throw new CliError("validation_error", `message ${replyTo} is not in the thread ${threadId}`)
    return fromTopic ?? fromReply
  }

  const refuseUnsendable = (sending: SendOptions) => {
    const cannot = [
      sending.silent && "--silent",
      sending.at && "--at-time",
      sending.sendAs && "--send-as",
      sending.sticker && "a sticker",
      sending.stickerFile && "a sticker",
      sending.spoiler && "--spoiler",
      sending.captionAbove && "--caption-above",
      sending.markup?.length && "buttons",
      sending.attachments?.some((one) => one.kind === "voice") && "a voice message",
    ].filter(Boolean)
    if (cannot.length) throw new CliError("validation_error", `${SERVICE} cannot send ${cannot.join(", ")}`)
  }

  /** A chat to post in: a person with no DM yet gets one (https://docs.slack.dev/reference/methods/conversations.open/). */
  const postable = async (chatId: string) => {
    if (!USER_ID.test(chatId)) return chatId
    const { channel } = await slack("conversations.open", { users: chatId }, opened)
    options.forget()
    return channel.id
  }

  /**
   * The owner's messages in the chat, or in one thread, since `sinceMs`, every page of them. Slack keeps no key for a
   * send, so the owner, the place and the time are what a repeat finds its earlier copy by.
   */
  const ownSince = async (chatId: string, thread: string | undefined, sinceMs: number) => {
    const oldest = tsAt(sinceMs - MARGIN_MS)
    const found: WireMessage[] = []
    for (let cursor: string | undefined; ; ) {
      const page = thread
        ? await slack(
            "conversations.replies",
            { channel: chatId, ts: thread, oldest, limit: PAGE, cursor },
            historyAnswer,
          )
        : await slack("conversations.history", { channel: chatId, oldest, limit: PAGE, cursor }, historyAnswer)
      for (const one of page.messages) {
        const inPlace = thread
          ? one.thread_ts === thread && one.ts !== thread
          : !one.thread_ts || one.thread_ts === one.ts
        if (one.user === options.self && inPlace && Number(one.ts) >= Number(oldest)) found.push(one)
      }
      cursor = nextCursor(page)
      if (!page.has_more || !cursor) return found
    }
  }

  const bytesOf = async (upload: Upload) =>
    upload.source.kind === "bytes" ? upload.source.bytes : new Uint8Array(await readFile(upload.source.path))

  /**
   * Slack's upload (https://docs.slack.dev/reference/methods/files.getUploadURLExternal/): an address for the bytes and
   * the bytes POSTed to it share nothing yet, so neither is a write; `files.completeUploadExternal` is.
   */
  const upload = async (upload: Upload) => {
    const bytes = await bytesOf(upload)
    const place = await slack("files.getUploadURLExternal", { filename: upload.name, length: bytes.length }, uploadUrl)
    await slack.upload(place.upload_url, bytes)
    return { id: place.file_id, title: upload.name }
  }

  /** The message Slack shares the files in, which it may show a moment after `files.completeUploadExternal`. */
  const sharedMessage = async (chatId: string, fileId: string, thread: string | undefined, sinceMs: number) => {
    for (let read = 0; read < SHARE_READS; read += 1) {
      const found = (await ownSince(chatId, thread, sinceMs)).find((one) =>
        one.files?.some((file) => file.id === fileId),
      )
      if (found) return found
    }
    return undefined
  }

  const sendFiles = async (
    chatId: string,
    attachments: readonly Upload[],
    { text, body, thread }: { text: string; body: string; thread: string | undefined },
  ) => {
    const since = now()
    const files = []
    for (const one of attachments) files.push(await upload(one))
    const answer = await write(
      "files.completeUploadExternal",
      { files: JSON.stringify(files), channel_id: chatId, thread_ts: thread, initial_comment: text ? body : undefined },
      shared,
    )
    const [first] = answer.files
    const wire = await sharedMessage(chatId, first?.id ?? "", thread, since)
    if (wire) {
      const [message] = await options.mapped(chatId, [wire])
      if (message) return message
    }
    // Slack took the files and has not shown their message yet: the answer stands in, under the first file's id.
    const stand: WireMessage = {
      ts: tsAt(since),
      user: options.self,
      text: body,
      ...(thread ? { thread_ts: thread } : {}),
      files: answer.files.map((one) => ({ id: one.id, name: one.title, title: one.title })),
    } as WireMessage
    const [message] = await options.mapped(chatId, [stand])
    if (!message) throw new CliError("outcome_unknown", `${SERVICE} took the files; read the chat to see them`)
    return { ...message, id: first?.id ?? message.id }
  }

  const textOf = (text: string, formatting: SendOptions["formatting"]) =>
    formatting === undefined ? escaped(text) : mrkdwnOf(text, formatting)

  const publicChannel = async (typed: string) => {
    const wanted = typed.trim().replace(/^#/, "")
    if (CONVERSATION_ID.test(wanted)) return wanted
    for (let cursor: string | undefined; ; ) {
      const page = await slack(
        "conversations.list",
        { types: "public_channel", exclude_archived: true, limit: PAGE, cursor },
        conversationsAnswer,
      )
      const found = page.channels.find((one) => one.name === wanted.toLowerCase())
      if (found) return found.id
      cursor = nextCursor(page)
      if (!cursor) throw new CliError("not_found", `no public channel "${wanted}" in this workspace`)
    }
  }

  return {
    formatMarkdown: async (text: string) => parseMarkdownSpans(text),

    newSendId: () => {
      const id = `s${now()}-${randomUUID()}`
      minted.add(id)
      return id
    },

    validateThread: async (chatId: string, threadId: string, { replyTo }: { replyTo?: string }) => {
      await threadOf(chatId, { threadId, ...(replyTo ? { replyTo } : {}) })
    },

    send: async (typedChat: string, text: string, sending: SendOptions): Promise<Sent> => {
      refuseUnsendable(sending)
      const repeat = !minted.has(sending.sendId)
      const mintedAt = Number(SEND_ID.exec(sending.sendId)?.[1])
      if (repeat && !mintedAt)
        throw new CliError(
          "validation_error",
          `${SERVICE} has no send with the operation id ${sending.sendId}; give the one a failed send printed, or ` +
            "send again without --operation-id",
        )
      if (repeat && sending.attachments?.length)
        throw new CliError(
          "validation_error",
          `${SERVICE} keeps no mark on a file message to find it by; read the chat, and if the file is not there, ` +
            "send it again without --operation-id",
        )
      const chatId = await postable(typedChat)
      const thread = await threadOf(chatId, sending)
      const body = textOf(text, sending.formatting)
      if (repeat) {
        const earlier = (await ownSince(chatId, thread, mintedAt)).find((one) => one.text === body)
        const [message] = earlier ? await options.mapped(chatId, [earlier]) : []
        if (message) return { message, sendId: sending.sendId }
      }
      if (sending.attachments?.length)
        return { message: await sendFiles(chatId, sending.attachments, { text, body, thread }), sendId: sending.sendId }
      const answer = await write(
        "chat.postMessage",
        {
          channel: chatId,
          text: body,
          thread_ts: thread,
          // Plain text stays plain: `*` and `_` typed are not marks unless --md asked for them.
          mrkdwn: sending.formatting !== undefined,
          ...(sending.noPreview ? { unfurl_links: false, unfurl_media: false } : {}),
        },
        posted,
      )
      const wire = { ...(answer.message ?? {}), ts: answer.ts } as WireMessage
      const [message] = await options.mapped(answer.channel, [wire])
      if (!message) throw new CliError("outcome_unknown", `${SERVICE} took the message; read the chat to see it`)
      return { message, sendId: sending.sendId }
    },

    edit: async (
      chatId: string,
      messageId: string,
      text: string,
      editing: { formatting?: SendOptions["formatting"] },
    ) => {
      await write("chat.update", { channel: chatId, ts: messageId, text: textOf(text, editing.formatting) }, ok)
      const wire = await options.oneMessage(chatId, messageId)
      const [message] = wire ? await options.mapped(chatId, [wire]) : []
      if (!message) throw new CliError("not_found", `no message ${messageId} in this chat`)
      return message
    },

    delete: async (chatId: string, messageIds: string[], deleting: { forEveryone: boolean }) => {
      if (!deleting.forEveryone)
        throw new CliError(
          "validation_error",
          `${SERVICE} deletes a message for everyone in the chat, never for you alone; add --for-everyone`,
          { sent: false },
        )
      for (const ts of messageIds) await idempotent("chat.delete", { channel: chatId, ts })
    },

    pin: (chatId: string, messageId: string) => idempotent("pins.add", { channel: chatId, timestamp: messageId }),

    unpin: (chatId: string, messageId: string) => idempotent("pins.remove", { channel: chatId, timestamp: messageId }),

    /** An emoji adds the owner's reaction by Slack's name for it; `null` takes off the owner's reactions. */
    react: async (chatId: string, messageId: string, emoji: string | null) => {
      if (emoji !== null) {
        const name = emoji.trim().replace(/^:|:$/g, "")
        if (!/^[a-z0-9_+'-]+(::skin-tone-[2-6])?$/.test(name))
          throw new CliError(
            "validation_error",
            "give the emoji's Slack name, such as thumbsup, :eyes: or thumbsup::skin-tone-2, not the emoji itself",
          )
        await idempotent("reactions.add", { channel: chatId, timestamp: messageId, name })
        return
      }
      const wire = await options.oneMessage(chatId, messageId)
      if (!wire) throw new CliError("not_found", `no message ${messageId} in this chat`)
      const mine = (wire.reactions ?? []).filter((one) => one.users.includes(options.self))
      for (const one of mine)
        await write("reactions.remove", { channel: chatId, timestamp: messageId, name: one.name }, ok)
    },

    markRead: async (chatId: string, until?: string) => {
      const ts =
        until ?? (await slack("conversations.history", { channel: chatId, limit: 1 }, historyAnswer)).messages[0]?.ts
      if (!ts) return
      await write("conversations.mark", { channel: chatId, ts }, ok)
    },

    permalink: async (chatId: string, messageId: string): Promise<MessagePermalink> => {
      const answer = await slack("chat.getPermalink", { channel: chatId, message_ts: messageId }, permalinkAnswer)
      // A Slack link opens only for someone signed in to the workspace.
      return { url: answer.permalink, access: "restricted", reason: null }
    },

    join: async (link: string): Promise<GroupCard> => {
      const channel = await publicChannel(link)
      const answer = await write("conversations.join", { channel }, conversationAnswer)
      options.forget()
      return groupOf(answer.channel, options.names)
    },

    leave: async (chat: string) => {
      const { id } = await options.conversationOf(chat)
      await idempotent("conversations.leave", { channel: id })
      options.forget()
      return { chatId: id }
    },
  }
}
