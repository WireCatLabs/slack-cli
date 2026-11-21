<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: users.profile

## `slack api users-profile-get-list [options]`

- What: users\_profile\_get — read (GET /users.profile.get)
- Call: `GET /users.profile.get`, effect: read
- Sign-in: slackAuth (users.profile:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users.profile:read\` |
| `--include-labels <value>` | no | Include labels for each ID in custom profile fields |
| `--user <value>` | no | User to retrieve profile info for |
