/** The setup flow's English texts, by key. */
export const en = {
  "app.title": "Make your Slack app",
  "app.intro":
    "slack reads your Slack workspace as you, through a small app you make in it yourself. An app made in your own workspace keeps Slack's full read limits.",
  "app.steps":
    "1. Open https://api.slack.com/apps and click **Create New App** → **From a manifest**.\n2. Pick your workspace and paste the manifest from slack's docs: https://github.com/WireCatLabs/slack-cli/blob/main/docs/slack-app-manifest.json\n3. Click **Install to Workspace** and allow it.\n4. Keep token rotation off: a rotated token stops working after 12 hours.",
  "app.admin": "Some workspaces let only an administrator install an app. Slack then sends them your request.",
  "token.title": "Paste the token",
  "token.where":
    "Open the app's **OAuth & Permissions** page and copy the **User OAuth Token**. It starts with `xoxp-`.",
  "token.label": "User OAuth Token",
  "token.hint": "Kept in your system keyring or, without one, in a file only you can read.",
  "token.bot": "A bot token (`xoxb-`) is refused: slk reads as you, not as a bot.",
  "check.title": "Checking the token",
  "check.body": "slack asks Slack whose the token is. It keeps the token only if Slack answers.",
  "failed.title": "The check did not pass",
  "failed.body":
    "Slack did not take the token, so nothing was saved. Copy the User OAuth Token again and check your connection.",
  "done.title": "Connected",
  "done.body": "The profile is ready. List your chats, then copy one into the local store to search it:",
}
