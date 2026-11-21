<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: usergroups

## `slack api usergroups-list-list [options]`

- What: usergroups\_list — read (GET /usergroups.list)
- Call: `GET /usergroups.list`, effect: read
- Sign-in: slackAuth (usergroups:read)

| Flag | Required | What |
|---|---|---|
| `--include-users <value>` | no | Include the list of users for each User Group. |
| `--token <value>` | yes | Authentication token. Requires scope: \`usergroups:read\` |
| `--include-count <value>` | no | Include the number of users in each User Group. |
| `--include-disabled <value>` | no | Include disabled User Groups. |
