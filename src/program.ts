import { join } from "node:path"
import { resolvePaths } from "@wirecat/cli-base"
import {
  accountCommand,
  appMcpCommand,
  chatsCommand,
  commandsCommand,
  configCommand,
  contactsCommand,
  createProgram as createSharedProgram,
  messagesCommand,
  outputFor,
  ProfileTokenStore,
  type ProgramDefinition,
  type ProgramOptions,
  type RunOptions,
  run as runShared,
  runsCommand,
  searchCommand,
  setupCommand,
  skillCommand,
  upgradeCommand,
} from "@wirecat/cli-core/cli"
import { appUpdate } from "@wirecat/cli-core/update"
import type { Command } from "commander"
import { apiCommand } from "./commands/api.js"
import { doctorCommand } from "./commands/doctor.js"
import { sessionCommand } from "./commands/session.js"
import { configuration } from "./config.js"
import { IDENTITY, PACKAGE, SERVICE, SKILL } from "./identity.js"
import { SLACK } from "./messenger.js"
import { slackSetup } from "./setup/flow.js"

const update = appUpdate({
  packageName: PACKAGE,
  command: IDENTITY.command,
  version: IDENTITY.version,
  entry: import.meta.url,
  statePath: (env) =>
    join(resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix, env }).state, "update-check.json"),
  // biome-ignore lint/plugin/no-own-settings: the update check runs before any command exists to give baseContext
  enabled: (env) => configuration.resolveSettings({}, { env, needsProfile: false }).updateCheck,
  offVariables: [`${IDENTITY.envPrefix}_NO_UPDATE_CHECK`],
})

// The program's own MCP server, not cli-core's messenger one: that one checks `--permission` against messenger keys
// only and refuses the `api` group's, and Slack needs no single shared connection for serve to hold.
const mcpCommand = () =>
  appMcpCommand(IDENTITY, configuration, {
    name: SERVICE,
    untrusted: ["message text", "names and titles set by others", "file names", "links"],
    permissionExample: "messages.list=deny",
    skill: SKILL,
    signedIn: (profile, env, keyring) => new ProfileTokenStore({ app: IDENTITY, env, keyring }).signedIn(profile),
  })

export const definition = (): ProgramDefinition => ({
  app: IDENTITY,
  // The daily "a newer version exists" line after a command that succeeded; <PREFIX>_NO_UPDATE_CHECK turns it off.
  update,
  // The whole object: cli-core refuses a command by its key only when it gets the permission table too.
  configuration,
  commands: () => [
    commandsCommand(IDENTITY),
    sessionCommand(),
    setupCommand(slackSetup),
    accountCommand(SLACK),
    chatsCommand(SLACK),
    contactsCommand(SLACK),
    messagesCommand(SLACK),
    searchCommand(SLACK),
    apiCommand(),
    doctorCommand(),
    skillCommand(IDENTITY, SKILL),
    mcpCommand(),
    upgradeCommand(IDENTITY, PACKAGE, (command) => ({
      ...outputFor(command),
      installer: () => update.installer({}),
      latest: () => update.latest({}),
      install: (argv) => update.runUpdate(argv, {}),
    })),
    configCommand(IDENTITY, configuration),
    runsCommand(IDENTITY),
  ],
})

export const createProgram = (options?: ProgramOptions): Command => createSharedProgram(definition(), options)

export const run = (argv: string[], options?: RunOptions): Promise<number> => runShared(argv, definition(), options)
