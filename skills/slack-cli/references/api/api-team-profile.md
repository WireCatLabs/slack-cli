<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: team.profile

## `slack api team-profile-get-list [options]`

- What: team\_profile\_get — read (GET /team.profile.get)
- Call: `GET /team.profile.get`, effect: read
- Sign-in: slackAuth (users.profile:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`users.profile:read\` |
| `--visibility <value>` | no | Filter by visibility. |
