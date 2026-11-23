import { APP_LINK, APPS_LINK } from "../slack/app-manifest.js"
import { en } from "./texts.js"

const plain = (text: string) => text.replaceAll("**", "").replaceAll("`", "")

/** The setup flow's steps as one text for `session start`, so the terminal and WireCat Desktop say the same. */
export const TOKEN_GUIDE = [
  `How to get the token. ${en["app.intro"]}`,
  `${en["app.title"]}:\n${en["app.steps"]}`,
  `${en["app.link"]}:\n${APP_LINK}`,
  en["app.by-hand"],
  `${en["install.title"]}:\n${en["install.steps"]}`,
  `${en["install.link"]}: ${APPS_LINK}`,
  en["install.admin"],
  `${en["token.where"]} ${en["token.bot"]}`,
]
  .map(plain)
  .join("\n\n")
