import {
  type Configuration,
  commandPermissions,
  serviceApiOperations,
  serviceApiPermissions,
  settingsFor,
} from "@wirecat/cli-core/cli"
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

export const permissions = commandPermissions(serviceApiPermissions(API))

export const configuration: Configuration = settingsFor(IDENTITY, { permissions })
