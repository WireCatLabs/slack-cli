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

// cli-core asks for every key an api operation names unless the CLI's defaults say otherwise; a messenger key
// (`messages.list`, `chats.leave`) keeps the level its own command has, so `api conversations history` is no stricter than `messages list` (WC-PERM-6).
export const permissions = commandPermissions({
  ...apiPermissions,
  defaults: Object.fromEntries(
    Object.entries(apiPermissions.defaults).map(([key, level]) =>
      key.startsWith("api.") || key.startsWith("slack.") ? [key, level] : [key, levelFor({}, key).level],
    ),
  ),
})

/** How many days back `messages sync` looks for threads with new replies (plan.md, "Sync and threads"). */
export const THREAD_WINDOW_DAYS = 14

export interface SlackSettings {
  threadWindowDays: number
}

export const configuration: Configuration = settingsFor<SlackSettings>(IDENTITY, {
  permissions,
  personal: {
    thread_window_days: v.optional(
      v.pipe(v.number("has to be a number of days"), v.integer(), v.minValue(1), v.maxValue(365)),
    ),
  },
  resolve: ({ fromLayers }) => {
    const days = fromLayers("thread_window_days", THREAD_WINDOW_DAYS)
    return { values: { threadWindowDays: days.value }, sources: { thread_window_days: days.from } }
  },
})
