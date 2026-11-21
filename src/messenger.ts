import type { ProviderEntry } from "@wirecat/cli-core"
import { environmentOf, type Messenger, openAppStore, ProfileTokenStore, recalledAccount } from "@wirecat/cli-core/cli"
import { Pacer, pacePathFor } from "@wirecat/cli-core/sends"
import { configuration, type SlackSettings, THREAD_WINDOW_DAYS } from "./config.js"
import { PACE, type ServiceEnvironment, tokenOf } from "./context.js"
import { IDENTITY, SERVICE, SKILL } from "./identity.js"
import { HISTORY_MOST, slackAdapter } from "./slack/adapter.js"
import { slackClient } from "./slack/client.js"
import { selfOf } from "./slack/map.js"

export const PROVIDER = "slack"

/** What every other WireCat CLI's search reads to know a `slack` account holds messages. */
export const PROVIDER_ENTRY: ProviderEntry = {
  name: PROVIDER,
  kind: "messages",
  aliases: [],
  command: IDENTITY.command,
  opens: { chat: "messages list", message: "messages show", contact: "contacts show" },
}

const tokensOf = (env: NodeJS.ProcessEnv, keyring?: ConstructorParameters<typeof ProfileTokenStore>[0]["keyring"]) =>
  new ProfileTokenStore({ app: IDENTITY, env, keyring })

/**
 * Slack for cli-core's shared commands. What Slack has no primitive for is turned off or listed in `never`, so its
 * command is hidden; what comes with the write slice is in `lacks`.
 */
export const SLACK: Messenger = {
  app: IDENTITY,
  provider: PROVIDER,
  name: SERVICE,
  resolveSettings: configuration.resolveSettings,
  // Read without the keyring, which a listing of profiles must not open: `session start` remembers the account.
  profileState: (profile, env) =>
    recalledAccount(IDENTITY, PROVIDER, profile, env) === undefined ? "signed-out" : "signed-in",
  history: "server",
  // A message id is `ts`, seconds with microseconds: not a whole number, so held stretches are keyed by time. Slack
  // recommends 200 a page and takes at most 999 (https://docs.slack.dev/reference/methods/conversations.history/).
  fetching: { page: 200, maxPageSize: HISTORY_MOST, pause: "1s", maxPages: 10, orderBy: "time" },
  // One adapter call can be several Slack calls, so the pace is kept per Slack call, in the client, and off here.
  pace: { perMinute: 0, burst: PACE.burst },
  chatArgument: "a chat: #channel name, a person's name for a DM, or its Slack id (C…, D…, G…)",
  partnerOf: (chat) =>
    chat.kind === "dialog" && typeof chat.providerMetadata?.slack_user === "string"
      ? chat.providerMetadata.slack_user
      : undefined,
  skill: SKILL,
  accountRemoval: {
    signOut: async (profile, { env, keyring }) => {
      const removed = tokensOf(env, keyring).remove(profile)
      return { revoked: null, removed: removed.length ? ["the Slack user token"] : [] }
    },
  },
  // A Slack thread is read as cli-core reads a forum topic: `messages list <chat> topic:<root ts>`. There is no list
  // of threads, so the topics commands and tools stay hidden through `never`.
  topics: true,
  topicShow: false,
  folderOrder: false,
  folderJoin: false,
  inviteLinkCreate: false,
  inviteLinkList: false,
  inviteLinkRevoke: false,
  joinRequestsAll: false,
  joinRequestsByLink: false,
  channelComments: false,
  readsComments: false,
  addsWithHistory: false,
  knowsAccountAge: false,
  silentSends: false,
  sendAs: false,
  scheduledSends: false,
  autoReplies: false,
  deleteForMe: false,
  pollRevote: false,
  pollAnonymous: false,
  never: [
    "topics",
    "topic",
    "markTopicRead",
    "forumState",
    "upgradeForum",
    "enableForum",
    "createTopic",
    "editTopic",
    "orderPinnedTopics",
    "deleteTopic",
    "topicIcons",
    "inspect",
    "transcribe",
    "forward",
    "createPoll",
    "poll",
    "vote",
    "closePoll",
    "pollVoters",
    "buttons",
    "pressButton",
    "folders",
    "createFolder",
    "updateFolder",
    "deleteFolder",
    "orderFolders",
    "joinFolder",
    "createInviteLink",
    "inviteLinks",
    "revokeInviteLink",
    "updateInviteLink",
    "resetInviteLink",
    "joinRequests",
    "answerJoinRequest",
    "answerAllJoinRequests",
    "discussionOf",
    "comments",
    "sessions",
    "endOtherSessions",
    "lookup",
    "importContacts",
    "addContact",
    "removeContact",
    "renameContact",
    "block",
    "unblock",
    "stickerSets",
    "stickers",
    "calls",
    "privacy",
    "updatePrivacy",
    "officialChatStats",
    "sendAsIdentities",
    "savedSender",
    "startBot",
    "botByLink",
    "botApp",
    "addAdmin",
    "removeAdmin",
    "scheduled",
    "cancelScheduled",
    "editScheduled",
    "sendScheduled",
    "deleteChat",
    "clearHistory",
    "markChatUnread",
  ],
  lacks: [
    "edit",
    "delete",
    "pin",
    "unpin",
    "react",
    "markRead",
    "createGroup",
    "updateGroup",
    "join",
    "leave",
    "addMembers",
    "removeMembers",
    "updateProfile",
    "permalink",
  ],
  connect: async (command, base, options = {}) => {
    const token = tokenOf(command)
    const { fetch, signal } = environmentOf<ServiceEnvironment>(command)
    const { profile } = base.settings
    const remembered = recalledAccount(IDENTITY, PROVIDER, profile, base.env)
    // The messenger commands open the store without a provider entry; written here, every other CLI's search knows
    // that a `slack` account holds messages.
    await openAppStore(base.env, { app: IDENTITY, provider: PROVIDER_ENTRY })
      .then((store) => store.close())
      .catch(() => base.renderer.warn("could not record slack in the local store; other tools' search may skip it"))
    const { requestsPerMinute } = base.settings
    const rate = requestsPerMinute === undefined ? PACE : { ...PACE, perMinute: requestsPerMinute }
    return slackAdapter({
      slack: slackClient({
        token,
        events: options.events,
        signal,
        fetch,
        pacer: new Pacer(pacePathFor(IDENTITY, profile, base.env), rate),
      }),
      token,
      self: remembered ? selfOf(remembered.account) : undefined,
      stored: options.stored,
      threadWindowDays:
        (base.settings as typeof base.settings & Partial<SlackSettings>).threadWindowDays ?? THREAD_WINDOW_DAYS,
      fetch,
      signal,
    })
  },
}
