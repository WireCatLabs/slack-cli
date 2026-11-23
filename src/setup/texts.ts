/** The setup flow's English texts, by key. `session start` prints the same steps (src/setup/guide.ts). */
export const en = {
  "app.title": "Make your own Slack app",
  "app.intro":
    "Slack lets a program read your messages only through an app installed in your workspace. So you make a small app for slk yourself: it takes about three minutes, it belongs to you, and only you use it. Your messages and the token stay on this computer and go only to Slack. An app made in your own workspace also keeps Slack's full speed for reading history; an app shared from another company gets one read a minute.",
  "app.steps":
    "1. Sign in to Slack in your browser, in the workspace slk should read: [slack.com/signin](https://slack.com/signin)\n2. Open the link below. Slack opens **Create New App** with slk's settings already filled in.\n3. Choose your workspace in the list and click **Next** until you see **Create**, then click **Create**. You do not need to change anything on the way.\n4. Slack opens the app's **Basic Information** page. Its Client ID, Client Secret, Signing Secret and Verification Token are not needed: the token you need comes in the next step.",
  "app.link": "Create the app in Slack",
  "app.by-hand":
    "If the link does not open the form: go to [api.slack.com/apps](https://api.slack.com/apps), click **Create New App**, then **From a manifest**, choose your workspace, and paste the text of [slk's manifest](https://github.com/WireCatLabs/slack-cli/blob/main/docs/slack-app-manifest.json) in place of what is there.",
  "install.title": "Install the app and copy the token",
  "install.steps":
    "1. On the app's page, in the menu on the left, click **OAuth & Permissions**. Lost the page? Open [api.slack.com/apps](https://api.slack.com/apps) and click **WireCat slk**.\n2. Click **Install to Workspace** (Slack may show your workspace's name in place of \"Workspace\"). Slack lists what slk may do as you: read and send messages, see people and files. Click **Allow**.\n3. You are back on **OAuth & Permissions**. Under **OAuth Tokens**, find **User OAuth Token**: it starts with `xoxp-`. Click **Copy**.",
  "install.link": "Your Slack apps",
  "install.admin":
    "If Slack shows **Request to Install** in place of **Install to Workspace**, only an administrator may install apps in this workspace. Send the request: Slack tells you when they allow it, and then you do step 2 again.",
  "token.title": "Paste the token",
  "token.where":
    "Paste the **User OAuth Token** you copied. It works like a password to your Slack, so slk checks it with Slack and keeps it in your system keyring.",
  "token.label": "User OAuth Token",
  "token.hint": "Starts with `xoxp-`. Kept in your system keyring or, without one, in a file only you can read.",
  "token.bot":
    "Not the **Bot User OAuth Token** (`xoxb-`) from the same page: a bot sees only the channels it is added to, and slk reads as you.",
  "check.title": "Checking the token",
  "check.body": "slk asks Slack whose the token is. It keeps the token only if Slack answers.",
  "failed.title": "The check did not pass",
  "failed.body":
    "Slack did not take the token, so nothing was saved. Copy the **User OAuth Token** again from **OAuth & Permissions** and check your internet connection.",
  "done.title": "Connected",
  "done.body": "The profile is ready. List your chats, then copy one into the local store to search it:",
}
