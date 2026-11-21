<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: usergroups.users

## `slack api usergroups-users-list-list [options]`

- What: usergroups\_users\_list — read (GET /usergroups.users.list)
- Call: `GET /usergroups.users.list`, effect: read
- Sign-in: slackAuth (usergroups:read)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`usergroups:read\` |
| `--include-disabled <value>` | no | Allow results that involve disabled User Groups. |
| `--usergroup <value>` | yes | The encoded ID of the User Group to update. |
