import type { ManifestIdentity } from "@wirecat/cli-base/wcat/manifest"
import type { AppIdentity } from "@wirecat/cli-core/cli"
import { REASONS } from "./reasons.js"
import { VERSION } from "./version.js"

export const SERVICE = "Slack"

export const PACKAGE = "@wirecat/slack-cli"

export const IDENTITY: AppIdentity = {
  command: "slk",
  appName: "slack-cli",
  envPrefix: "SLACK",
  description: "Your Slack workspace from the command line, for you and your AI agents",
  version: VERSION,
  issues: "https://github.com/WireCatLabs/slack-cli/issues/new",
  messenger: true,
  contentLanguages: ["en", "ru"],
  errors: { reasons: REASONS },
}

// What `wcat` and WireCat Desktop show before the tool is installed. The bin passes it to wcatStart before anything
// else loads; src/wcat.ts adds the permission keys.
export const DESKTOP = {
  ...IDENTITY,
  docs: "https://github.com/WireCatLabs/slack-cli#readme",
  // Every host the CLI contacts (WC-CMD-32): Slack's Web API.
  hosts: ["slack.com", "files.slack.com"],
  tagline: "Read and search your Slack channels, DMs and threads",
  signIn: {
    gives: "Lets your agent read and write your Slack workspace as you.",
    asks: "The User OAuth Token (xoxp-) of a Slack app you make in your workspace from the manifest slk gives.",
  },
} satisfies ManifestIdentity

export const SKILL = new URL("../skills/slack-cli/SKILL.md", import.meta.url)

/** The provider name in the shared store and in cli-core's registry. */
export const PROVIDER = "slack"
