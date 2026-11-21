import { retrying } from "@wirecat/cli-base/http"
import { hostsFetch, serviceApiCommand } from "@wirecat/cli-core/cli"
import type { Command } from "commander"
import { API, configuration } from "../config.js"
import { contextOf, pacerFor, type ServiceEnvironment, tokenOf } from "../context.js"
import { DESKTOP, IDENTITY } from "../identity.js"

// Slack is RPC: a GET can send or publish (`views.publish`), so only an operation the manifest calls a read may be sent
// again after a 5xx or a lost answer; a write is sent once (WC-OUT-20).
const READS = new Set(
  API.manifest.operations.flatMap(({ effect, binding }) =>
    effect === "read" && binding.kind === "http" ? [`${binding.method} ${binding.path}`] : [],
  ),
)
export const isRead = (method: string, url: URL) =>
  READS.has(`${method} ${url.pathname.slice(url.pathname.lastIndexOf("/"))}`)

/** The service's hosts and nothing else (WC-CMD-32), over the test's fake when it gives one. */
export const serviceFetch = (environment: ServiceEnvironment) => hostsFetch(DESKTOP.hosts, environment.fetch)

/**
 * The service's raw API from its spec, `api list`, `api show` and one command per operation, through cli-core's shared
 * group. The manifest gives the server, the sign-in header, the paging of `--all` and the keys: each write asks or
 * refuses by `api.<operation>`, a delete or a share also by its key. The requests keep the profile's pace.
 * The token is the profile's own, read by `tokenOf` like every other command's.
 */
export const apiCommand = (): Command =>
  serviceApiCommand({
    ...API,
    app: IDENTITY,
    configuration,
    fetch: (command) =>
      retrying(serviceFetch(contextOf(command).environment), { reads: isRead, pacer: pacerFor(command) }),
    token: tokenOf,
    schemas: () => import("../generated/schemas.js").then((module) => module.schemas),
    definitions: () => import("../generated/definitions.js").then((module) => module.definitions),
  })
