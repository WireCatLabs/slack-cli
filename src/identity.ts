import type { ManifestIdentity } from "@wirecat/cli-base/wcat/manifest"
import type { AppIdentity } from "@wirecat/cli-core/cli"
import { VERSION } from "./version.js"

export const SERVICE = "Slack"

export const PACKAGE = "@wirecat/slack-cli"

export const IDENTITY: AppIdentity = {
  command: "slack",
  appName: "slack-cli",
  envPrefix: "SLACK",
  description: "a new WireCat CLI, started from cli-template",
  version: VERSION,
  issues: "https://github.com/WireCatLabs/slack-cli/issues/new",
  messenger: true,
  contentLanguages: ["en", "ru"],
}

// What `wcat` and WireCat Desktop show before the tool is installed: rewrite the tagline and the sign-in texts for
// yours. The bin passes it to wcatStart before anything else loads; src/wcat.ts adds the permission keys.
export const DESKTOP = {
  ...IDENTITY,
  docs: "https://github.com/WireCatLabs/slack-cli#readme",
  // Every host the CLI contacts (WC-CMD-32): Slack's Web API.
  hosts: ["slack.com"],
  tagline: "A new WireCat CLI, started from cli-template",
  signIn: {
    gives: "Lets your agent read and write your Slack workspace as you.",
    asks: "The User OAuth Token (xoxp-) of a Slack app you make in your workspace from slack's manifest.",
  },
} satisfies ManifestIdentity

export const SKILL = new URL("../skills/slack-cli/SKILL.md", import.meta.url)
