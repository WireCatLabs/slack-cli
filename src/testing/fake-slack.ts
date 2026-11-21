/** Spelled as a user token, so session start takes it, and so gitleaks lets it through; never a real token. */
export const FAKE_TOKEN = "xoxp-0synth-wirecat-fake"

export const AUTH_TEST = {
  ok: true,
  url: "https://synth-team.slack.com/",
  team: "Synth Team",
  user: "test.person",
  team_id: "T0SYNTH01",
  user_id: "U0SYNTH01",
}

export interface SlackCall {
  method: string
  args: Record<string, string>
  headers: Headers
}

type Answer = { status?: number; headers?: Record<string, string>; body: unknown }

/** The arguments each method takes, from Slack's docs of it; anything else is refused. */
const METHODS: Record<string, readonly string[]> = {
  "auth.test": [],
}

/**
 * Slack's Web API as `slackClient` reaches it: a form POST to `https://slack.com/api/<method>` with the Bearer header.
 * It refuses what Slack refuses (an unknown method, a missing token: `ok: false` with HTTP 200, as Slack answers),
 * and what this CLI must never send (the token in the form, an unknown argument). `answers` replaces a method's answer.
 */
export const fakeSlack = (answers: Record<string, Answer | ((call: SlackCall) => Answer)> = {}, token = FAKE_TOKEN) => {
  const calls: SlackCall[] = []
  const refusals: string[] = []
  const refuse = (why: string, error: string): Response => {
    refusals.push(why)
    return Response.json({ ok: false, error })
  }
  const fetch = async (input: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
    const url = new URL(input instanceof Request ? input.url : input)
    const headers = new Headers(init.headers)
    const args = Object.fromEntries(new URLSearchParams(String(init.body ?? "")))
    const method = url.pathname.replace(/^\/api\//, "")
    calls.push({ method, args, headers })
    if (url.host !== "slack.com" || !url.pathname.startsWith("/api/"))
      return refuse(`not Slack: ${url}`, "unknown_method")
    if (init.method !== "POST") return refuse(`${method} not POSTed`, "invalid_post_type")
    if (url.search) return refuse(`${method} with a query`, "invalid_arguments")
    if (headers.get("content-type") !== "application/x-www-form-urlencoded")
      return refuse(`${method} not a form`, "invalid_post_type")
    if ("token" in args) return refuse(`${method} with the token in the form`, "invalid_arguments")
    if (headers.get("authorization") === null) return refuse(`${method} without a token`, "not_authed")
    if (headers.get("authorization") !== `Bearer ${token}`)
      return refuse(`${method} with another token`, "invalid_auth")
    const known = METHODS[method]
    if (!known) return refuse(`unknown method ${method}`, "unknown_method")
    const unknown = Object.keys(args).filter((name) => !known.includes(name))
    if (unknown.length) return refuse(`${method} with ${unknown.join(", ")}`, "invalid_arg_name")
    const given = answers[method]
    const answer = typeof given === "function" ? given({ method, args, headers }) : given
    if (!answer) return Response.json(method === "auth.test" ? AUTH_TEST : { ok: true })
    return Response.json(answer.body, { status: answer.status ?? 200, headers: answer.headers ?? {} })
  }
  return { fetch, calls, refusals }
}
