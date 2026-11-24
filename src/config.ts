import {
  type Configuration,
  commandPermissions,
  serviceApiOperations,
  serviceApiPermissions,
  settingsFor,
} from "@wirecat/cli-core/cli"
import { levelFor } from "@wirecat/cli-core/sends"
import * as v from "valibot"
import * as manifest from "./generated/manifest.js"
import { IDENTITY, SERVICE } from "./identity.js"

/** Each command is checked against its own path (`notes.list`); add the keys a command checks inside itself. */
// The keys a delete or a share checks come from `permissions` in scripts/generate.ts. Left out: an operation that
// answers with a credential (the CLI signs in through `session`) and a body cli-core cannot send (a form).
const { offered, left } = serviceApiOperations(manifest)

export const API = {
  manifest: { ...manifest, operations: offered },
  service: SERVICE,
  excluded: left,
}

const apiPermissions = serviceApiPermissions(API)

// cli-core asks for every key an api operation names; a read of what people wrote is checked as `messages.list` and is
// no stricter than `messages list` (WC-PERM-4). A write keeps the ask: the api group has no recipient list or pace.
export const permissions = commandPermissions({
  ...apiPermissions,
  defaults: { ...apiPermissions.defaults, "messages.list": levelFor({}, "messages.list").level },
})

/** How many days back `messages sync` looks for threads with new replies (plan.md, "Sync and threads"). */
export const THREAD_WINDOW_DAYS = 14

export interface SlackSettings {
  threadWindowDays: number
  inboxChannels: string[]
  inboxAllChannels: boolean
}

const threadWindowDays = v.optional(
  v.pipe(v.number("has to be a number of days"), v.integer(), v.minValue(1), v.maxValue(365)),
)

const inboxChannels = v.optional(v.string("has to be channel names or ids, comma-separated: #general, #dev"))
const inboxAllChannels = v.optional(v.boolean("has to be true or false"))

export const configuration: Configuration = settingsFor<SlackSettings>(IDENTITY, {
  permissions,
  personal: {
    thread_window_days: threadWindowDays,
    inbox_channels: inboxChannels,
    inbox_all_channels: inboxAllChannels,
  },
  // The channels are a workspace's, so they are set per profile only.
  defaults: { thread_window_days: threadWindowDays },
  settings: [
    {
      key: "thread_window_days",
      default: THREAD_WINDOW_DAYS,
      description: "how many days back messages sync looks for threads with new replies",
    },
    {
      key: "inbox_channels",
      default: "",
      description:
        "the channels inbox counts every unread message of, comma-separated names or ids (#general, #dev); DMs are " +
        "always counted",
    },
    {
      key: "inbox_all_channels",
      default: false,
      description: "inbox counts every channel you are in, two calls each, so it may stop before the last ones",
    },
  ],
  resolve: ({ fromLayers }) => {
    const days = fromLayers("thread_window_days", THREAD_WINDOW_DAYS)
    const channels = fromLayers("inbox_channels", "")
    const allChannels = fromLayers("inbox_all_channels", false)
    return {
      values: {
        threadWindowDays: days.value,
        inboxChannels: channels.value
          .split(",")
          .map((one) => one.trim())
          .filter(Boolean),
        inboxAllChannels: allChannels.value,
      },
      sources: {
        thread_window_days: days.from,
        inbox_channels: channels.from,
        inbox_all_channels: allChannels.from,
      },
    }
  },
})
