# When something goes wrong

A Slack command failed or the inbox looks incomplete. Most cases take one step: find what you see in the table and do
what its row says. Keep the error code and the profile name if you write to us.

| Symptom | What to do |
| --- | --- |
| Not sure what is set up | Run `slk doctor`. It reads no keyring and uses no network. |
| `slk` is not found | Open a new terminal, and check that npm's global folder is on `PATH`. |
| "name a profile" | Put the profile first, as in `slk personal config show`, or set `SLACK_PROFILE`. |
| "this is a bot token (`xoxb-`)" | `slk` reads as you, so it takes the app's User OAuth Token. On the app's **OAuth & Permissions** page, under **OAuth Tokens**, copy the token that starts with `xoxp-`, then run `slk personal session start` again. |
| "this is a rotating token (`xoxe.`)" | The app has token rotation on, and such a token expires in 12 hours. Make the app again from [the manifest](slack-app-manifest.json), which keeps rotation off, and paste its User OAuth Token. |
| Slack offers to send a request in place of installing | Only an administrator may install apps in this workspace. Send the request. Once they approve it, open **OAuth & Permissions** again and click **Install to Workspace**. |
| `chat.not-joined` on a send | You are not in that channel. Join it with `slk personal chats join "#general"`, then send again. |
| `chat.archived` or `chat.restricted` | The channel is archived, or a workspace or channel setting stops the action. Slack's own code is in `details.slack_error`. |
| `oauth.scope-missing` | The app lacks a scope the command needs; the error names it. Make the app again from [the manifest](slack-app-manifest.json), install it, and sign in with its new token. |
| The inbox answer lists `missing` | Each line says what the inbox left out and why. It ran out of time, about 15 seconds, or Slack refused a call: run `inbox` again, or name the channels you care about in `inbox_channels`; see [settings](configuration.md#inbox). Muted or archived chats were left out: add `--all`. |
| The inbox misses a reply in a DM thread | Thread replies in DMs and group DMs are not read yet. Read the thread with `slk personal messages list "Anna" topic:1732791234.123456`. |
| A send exits with code 14 | Slack gave no answer, so nobody knows whether the message arrived. It is never sent again by itself: read the chat first, then repeat it if it is not there. |
| The settings file does not read | `doctor` lists every problem in the file under `config.issues`. Run the `config unset` each one gives, or fix the file by hand. |
| `doctor` lists `files.problems` | Other users of the computer can read `config.json` or enter its folder. Run each `chmod` that `doctor` prints after "to make it private:". `doctor` never changes a file mode itself. |
| A write is refused | The profile's permissions or `SLACK_READ_ONLY` stop it; see [settings](configuration.md#permissions). |

Never paste a token, a password or private content into a support request.
