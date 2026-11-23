import { plainSetupText } from "@wirecat/cli-core/cli"
import { APP_LINK } from "../slack/app-manifest.js"
import { en } from "./texts.js"

/** The setup flow's steps as one text for `session start`, so the terminal and WireCat Desktop say the same. */
export const TOKEN_GUIDE = [
  `How to get the token. ${en["app.intro"]}`,
  `${en["app.title"]}:\n${en["app.steps"]}`,
  `${en["app.link"]}:\n${APP_LINK}`,
  en["app.by-hand"],
  `${en["install.title"]}:\n${en["install.steps"]}`,
  en["install.admin"],
  `${en["token.where"]} ${en["token.bot"]}`,
]
  .map(plainSetupText)
  .join("\n\n")
