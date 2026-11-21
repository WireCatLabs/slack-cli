import * as v from "valibot"

/** `auth.test`'s answer (https://docs.slack.dev/reference/methods/auth.test/); a bot token's adds `bot_id`. */
export const authTestAnswer = v.looseObject({
  ok: v.literal(true),
  url: v.string(),
  team: v.string(),
  user: v.string(),
  team_id: v.string(),
  user_id: v.string(),
  bot_id: v.optional(v.string()),
})

export type AuthTest = v.InferOutput<typeof authTestAnswer>

/** One profile is one workspace and one person in it: user ids are the team's own, so the account names both. */
export const accountOf = (answer: AuthTest) => ({
  id: `${answer.team_id}:${answer.user_id}`,
  account: {
    team_id: answer.team_id,
    team: answer.team,
    user_id: answer.user_id,
    user: answer.user,
    url: answer.url,
  },
})
