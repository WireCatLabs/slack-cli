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
