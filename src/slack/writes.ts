import { randomUUID } from "node:crypto"
import { readFile } from "node:fs/promises"
import { CliError } from "@wirecat/cli-base"
import { type FetchLike, hostFetch } from "@wirecat/cli-base/http"
import type { GroupCard, Message, MessagePermalink } from "@wirecat/cli-core"
import { parseMarkdownSpans } from "@wirecat/cli-core"
import type { SendOptions, Sent } from "@wirecat/cli-core/cli"
import * as v from "valibot"
import { DESKTOP, SERVICE } from "../identity.js"
import type { SlackArgs, SlackClient } from "./client.js"
import {
  type Conversation,
  chatOf,
  conversationAnswer,
  conversationsAnswer,
  historyAnswer,
  type Names,
  nextCursor,
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
const permalinkAnswer = v.looseObject({ ok: v.literal(true), permalink: v.string() })

export interface SlackWritesOptions {
  slack: SlackClient
  token: string
  /** The owner's user id, so `reactions remove` takes off the owner's reactions only. */
  self: string
  names: Names
  fetch?: FetchLike | undefined
  signal?: AbortSignal | undefined
  oneMessage: (chatId: string, id: string) => Promise<WireMessage | undefined>
  mapped: (chatId: string, wires: readonly WireMessage[]) => Promise<Message[]>
  conversationOf: (typed: string) => Promise<Conversation>
  /** Called after a join or a leave, so the next list reads the conversations again. */
  forget: () => void
}

const CONVERSATION_ID = /^[CDG][A-Z0-9]{2,}$/

/** The mark a send carries, so a repeat of its send id finds it (https://docs.slack.dev/messaging/message-metadata/). */
const SEND_MARK = "wirecat_send"

const markOf = (sendId: string) => JSON.stringify({ event_type: SEND_MARK, event_payload: { send_id: sendId } })

const sentWith = (sendId: string) => (wire: WireMessage) => {
  const metadata = (wire as { metadata?: { event_type?: string; event_payload?: { send_id?: unknown } } }).metadata
  return metadata?.event_type === SEND_MARK && metadata.event_payload?.send_id === sendId
}

const isSlackError = (error: unknown, code: string) =>
  error instanceof CliError && (error.details as { slack_error?: unknown } | undefined)?.slack_error === code

/** What Slack's write methods take: every one is `chat:write`, `reactions:write`, `pins:write` or `*:write`. */
export const slackWrites = (options: SlackWritesOptions) => {
  const { slack } = options
  // A send id this run made is a first try; any other is a repeat of a send whose outcome was unknown.
  const minted = new Set<string>()
  const write = <T>(method: string, args: SlackArgs, answer: v.GenericSchema<unknown, T>) =>
    slack(method, args, answer, { writes: true })

  const uploads = hostFetch({
    hosts: DESKTOP.hosts,
    credentialScope: "https://files.slack.com/",
    ...(options.fetch ? { fetch: options.fetch } : {}),
  })

  /** A reply to a reply goes to the same thread: Slack threads are one level deep. */
  const threadOf = async (chatId: string, { threadId, replyTo }: Pick<SendOptions, "threadId" | "replyTo">) => {
    if (threadId) return threadId
    if (!replyTo) return undefined
    const wire = await options.oneMessage(chatId, replyTo)
    if (!wire) throw new CliError("not_found", `no message ${replyTo} in this chat to reply to`)
    return wire.thread_ts ?? wire.ts
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

  const bytesOf = async (upload: Upload) =>
    upload.source.kind === "bytes" ? upload.source.bytes : new Uint8Array(await readFile(upload.source.path))

  /**
   * Slack's upload in three steps (https://docs.slack.dev/reference/methods/files.getUploadURLExternal/): an address
   * for the bytes, the bytes POSTed to it, then `files.completeUploadExternal` shares them in the chat as one message.
   */
  const upload = async (upload: Upload) => {
    const bytes = await bytesOf(upload)
    const place = await write("files.getUploadURLExternal", { filename: upload.name, length: bytes.length }, uploadUrl)
    if (!URL.canParse(place.upload_url) || new URL(place.upload_url).host !== "files.slack.com")
      throw new CliError("provider_error", `${SERVICE} gave an upload address off files.slack.com; nothing was sent`)
    const response = await uploads(place.upload_url, {
      method: "POST",
      headers: { authorization: `Bearer ${options.token}`, "content-type": "application/octet-stream" },
      body: bytes,
      ...(options.signal ? { signal: options.signal } : {}),
    }).catch(() => {
      throw new CliError("outcome_unknown", `${SERVICE} did not answer the file upload; check before repeating it`)
    })
    if (!response.ok) throw new CliError("provider_error", `${SERVICE} refused the file (HTTP ${response.status})`)
    return { id: place.file_id, title: upload.name }
  }

  /** The message `files.completeUploadExternal` made: its answer names the files only. */
  const sharedMessage = async (chatId: string, fileId: string, thread: string | undefined) => {
    const answer = thread
      ? await slack("conversations.replies", { channel: chatId, ts: thread, limit: 200 }, historyAnswer)
      : await slack("conversations.history", { channel: chatId, limit: 20 }, historyAnswer)
    const found = answer.messages.find((one) => one.files?.some((file) => file.id === fileId))
    if (!found)
      throw new CliError(
        "outcome_unknown",
        `${SERVICE} took the file but has not shown its message yet; read the chat before sending it again`,
      )
    return found
  }

  /** The copy an earlier try of this send id left, among the chat's or the thread's newest messages. */
  const earlierCopy = async (chatId: string, sendId: string, thread: string | undefined) => {
    const recent = thread
      ? await slack(
          "conversations.replies",
          { channel: chatId, ts: thread, limit: 200, include_all_metadata: true },
          historyAnswer,
        )
      : await slack("conversations.history", { channel: chatId, limit: 100, include_all_metadata: true }, historyAnswer)
    return recent.messages.find(sentWith(sendId))
  }

  const textOf = (text: string, formatting: SendOptions["formatting"]) =>
    formatting === undefined ? escaped(text) : mrkdwnOf(text, formatting)

  const groupOf = (channel: Conversation): GroupCard => ({
    ...chatOf(channel, options.names),
    description: channel.purpose?.value || channel.topic?.value || null,
    link: null,
    settings: {
      allCanPin: null,
      onlyAdminsAdd: null,
      onlyAdminsCall: null,
      onlyOwnerEditsInfo: null,
      membersSeeLink: null,
    },
  })

  const publicChannel = async (typed: string) => {
    const wanted = typed.trim().replace(/^#/, "")
    if (CONVERSATION_ID.test(wanted)) return wanted
    for (let cursor: string | undefined; ; ) {
      const page = await slack(
        "conversations.list",
        { types: "public_channel", exclude_archived: true, limit: 200, cursor },
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
      const id = randomUUID()
      minted.add(id)
      return id
    },

    send: async (chatId: string, text: string, sending: SendOptions): Promise<Sent> => {
      refuseUnsendable(sending)
      const thread = await threadOf(chatId, sending)
      const body = textOf(text, sending.formatting)
      const repeat = !minted.has(sending.sendId)
      if (repeat && sending.attachments?.length)
        throw new CliError(
          "validation_error",
          `${SERVICE} keeps no mark on a file message to find it by; read the chat, and if the file is not there, ` +
            "send it again without --operation-id",
        )
      if (repeat) {
        const earlier = await earlierCopy(chatId, sending.sendId, thread)
        const [message] = earlier ? await options.mapped(chatId, [earlier]) : []
        if (message) return { message, sendId: sending.sendId }
      }
      if (sending.attachments?.length) {
        const files = []
        for (const one of sending.attachments) files.push(await upload(one))
        await write(
          "files.completeUploadExternal",
          {
            files: JSON.stringify(files),
            channel_id: chatId,
            thread_ts: thread,
            initial_comment: text ? body : undefined,
          },
          ok,
        )
        const [first] = files
        const wire = await sharedMessage(chatId, first?.id ?? "", thread)
        const [message] = await options.mapped(chatId, [wire])
        if (!message) throw new CliError("outcome_unknown", `${SERVICE} shared the file; read the chat to see it`)
        return { message, sendId: sending.sendId }
      }
      const answer = await write(
        "chat.postMessage",
        {
          channel: chatId,
          text: body,
          thread_ts: thread,
          // Plain text stays plain: `*` and `_` typed are not marks unless --md asked for them.
          mrkdwn: sending.formatting !== undefined,
          metadata: markOf(sending.sendId),
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
      if (!wire) throw new CliError("not_found", `no message ${messageId} in this chat`)
      const [message] = await options.mapped(chatId, [wire])
      if (!message) throw new CliError("not_found", `no message ${messageId} in this chat`)
      return message
    },

    delete: async (chatId: string, messageIds: string[], deleting: { forEveryone: boolean }) => {
      if (!deleting.forEveryone)
        throw new CliError(
          "validation_error",
          `${SERVICE} deletes a message for everyone in the chat, never for you alone; add --for-everyone`,
        )
      for (const ts of messageIds) await write("chat.delete", { channel: chatId, ts }, ok)
    },

    pin: async (chatId: string, messageId: string) => {
      await write("pins.add", { channel: chatId, timestamp: messageId }, ok)
    },

    unpin: async (chatId: string, messageId: string) => {
      await write("pins.remove", { channel: chatId, timestamp: messageId }, ok)
    },

    /** An emoji adds the owner's reaction by Slack's name for it; `null` takes off the owner's reactions. */
    react: async (chatId: string, messageId: string, emoji: string | null) => {
      if (emoji !== null) {
        const name = emoji.trim().replace(/^:|:$/g, "")
        if (!/^[a-z0-9_+'-]+$/.test(name))
          throw new CliError("validation_error", "give the emoji's Slack name, such as thumbsup or :eyes:")
        // A repeat after an unknown outcome finds the reaction there: that is the outcome asked for.
        await write("reactions.add", { channel: chatId, timestamp: messageId, name }, ok).catch((error: unknown) => {
          if (!isSlackError(error, "already_reacted")) throw error
        })
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
      return groupOf(answer.channel)
    },

    leave: async (chat: string) => {
      const { id } = await options.conversationOf(chat)
      await write("conversations.leave", { channel: id }, ok)
      options.forget()
      return { chatId: id }
    },
  }
}
