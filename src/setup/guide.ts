import { APP_LINK } from "../slack/app-manifest.js"
import { en } from "./texts.js"

/**
 * The setup flow's steps as one text for `session start`, so the terminal and WireCat Desktop say the same. It is a
 * setup text's restricted Markdown: cli-core prints it plainly, its links drawn as links where the terminal can.
 */
export const TOKEN_GUIDE = [
  `## How to get the token\n\n${en["app.intro"]}`,
  `## ${en["app.title"]}\n\n${en["app.steps"]}\n\n[${en["app.link"]}](${APP_LINK})\n\n${en["app.by-hand"]}`,
  `## ${en["install.title"]}\n\n${en["install.steps"]}\n\n${en["install.admin"]}`,
  `## ${en["token.title"]}\n\n${en["token.where"]} ${en["token.bot"]}`,
].join("\n\n")
