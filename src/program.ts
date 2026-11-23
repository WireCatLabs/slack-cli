import { join } from "node:path"
import { CliError, resolvePaths } from "@wirecat/cli-base"
import { annotate, overrideSharedContract } from "@wirecat/cli-base/commands"
import {
  accountCommand,
  appMcpCommand,
  attachmentsCommand,
  chatsCommand,
  commandsCommand,
  completeCommand,
  configCommand,
  contactsCommand,
  conversationsCommand,
  createProgram as createSharedProgram,
  doctorCommand,
  environmentOf,
  floodCommand,
  mentionsCommand,
  messagesCommand,
  metadataCommand,
  modelsCommand,
  outputFor,
  ProfileTokenStore,
  type ProgramDefinition,
  type ProgramOptions,
  type RunOptions,
  reactionsCommand,
  recipientsCommand,
  reviewCommand,
  run as runShared,
  runsCommand,
  searchCommand,
  searchesCommand,
  sendsCommand,
  setupCommand,
  skillCommand,
  statsCommand,
  storeCommand,
  tagsCommand,
  tasksCommand,
  upgradeCommand,
} from "@wirecat/cli-core/cli"
import { appUpdate } from "@wirecat/cli-core/update"
import type { Command } from "commander"
import { apiCommand } from "./commands/api.js"
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

// cli-core's example joins by an invite link; Slack joins a public channel by its name or id.
const slackChats = () => {
  const chats = chatsCommand(SLACK)
  const join = chats.commands.find((one) => one.name() === "join")
  if (join)
    overrideSharedContract(join, "Slack joins a public channel by name, not by an invite link", (command) =>
      annotate(command, { examples: [`${IDENTITY.command} personal chats join '#general'`] }),
    )
  return chats
}

/** Slack deletes for everyone only: a delete without --for-everyone is refused before anyone is asked to confirm. */
const slackMessages = () => {
  const messages = messagesCommand(SLACK)
  messages.commands
    .find((one) => one.name() === "delete")
    ?.hook("preAction", (command) => {
      // An agent is refused by cli-core's delete itself, as a permission and not a missing flag (WC-PERM-11).
      if (environmentOf(command).agent) return
      if (command.opts().forEveryone !== true)
        throw new CliError(
          "validation_error",
          `${SERVICE} deletes a message for everyone in the chat, never for you alone; add --for-everyone`,
          { sent: false },
        )
    })
  const send = messages.commands.find((one) => one.name() === "send")
  if (send)
    overrideSharedContract(send, "Slack can show a thread reply in the channel too (reply_broadcast)", (command) =>
      command
        .option(
          "--also-to-channel",
          'with --reply-to or --topic: show the reply in the channel too, as Slack\'s "Also send to #channel"',
        )
        .hook("preAction", (action) => {
          const { alsoToChannel, replyTo, topic, file, photo } = action.opts()
          if (alsoToChannel !== true) return
          if (replyTo === undefined && topic === undefined)
            throw new CliError(
              "validation_error",
              "--also-to-channel shows a thread reply; add --reply-to or --topic",
              {
                sent: false,
              },
            )
          if ([file, photo].some((given) => (Array.isArray(given) ? given.length > 0 : given !== undefined)))
            throw new CliError(
              "validation_error",
              `${SERVICE} shows only a text reply in the channel too; leave out --file`,
              { sent: false },
            )
        }),
    )
  return messages
}

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
    slackChats(),
    contactsCommand(SLACK),
    slackMessages(),
    reactionsCommand(SLACK),
    modelsCommand(SLACK),
    reviewCommand(SLACK),
    storeCommand(SLACK),
    conversationsCommand(SLACK),
    attachmentsCommand(SLACK),
    tagsCommand(SLACK),
    mentionsCommand(SLACK),
    metadataCommand(SLACK),
    statsCommand(SLACK),
    tasksCommand(SLACK),
    searchCommand(SLACK),
    searchesCommand(SLACK),
    floodCommand(SLACK),
    recipientsCommand(SLACK),
    sendsCommand(SLACK),
    apiCommand(),
    doctorCommand(SLACK),
    completeCommand(SLACK, configuration),
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
