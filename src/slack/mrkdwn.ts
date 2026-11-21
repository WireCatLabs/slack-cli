import { CliError } from "@wirecat/cli-base"
import type { TextSpan } from "@wirecat/cli-core"

/** The three characters Slack reads as markup, escaped (https://docs.slack.dev/messaging/formatting-message-text/). */
export const escaped = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

const MARKS: Partial<Record<TextSpan["type"], readonly [string, string]>> = {
  bold: ["*", "*"],
  italic: ["_", "_"],
  strike: ["~", "~"],
  code: ["`", "`"],
  pre: ["```\n", "\n```"],
  // mrkdwn has no heading; a bold line reads as one.
  heading: ["*", "*"],
}

const CANNOT: Partial<Record<TextSpan["type"], string>> = {
  underline: "underline",
  spoiler: "a spoiler",
  highlight: "a highlight",
}

/**
 * Text and its spans as Slack's mrkdwn: `*bold*`, `_italic_`, `~strike~`, `` `code` ``, fenced blocks, `<url|label>`
 * links and `> ` quotes, every other `&`, `<` and `>` escaped. A mark mrkdwn cannot show is refused, never dropped.
 */
export const mrkdwnOf = (text: string, spans: readonly TextSpan[] = []): string => {
  const before = Array.from({ length: text.length + 1 }, () => [] as string[])
  const ordered = [...spans].sort((one, other) => one.from - other.from || other.length - one.length)
  for (const span of ordered) {
    const cannot = CANNOT[span.type]
    if (cannot) throw new CliError("validation_error", `Slack's text has no ${cannot}; take it out of the Markdown`)
    const end = span.from + span.length
    if (span.type === "link") {
      before[span.from]?.push(`<${span.url ?? ""}|`)
      before[end]?.unshift(">")
    } else if (span.type === "blockquote") {
      before[span.from]?.push("> ")
      for (let at = span.from; at < end; at += 1) if (text[at] === "\n") before[at + 1]?.push("> ")
    } else {
      const [open, close] = MARKS[span.type] ?? ["", ""]
      before[span.from]?.push(open)
      before[end]?.unshift(close)
    }
  }
  let out = ""
  for (let at = 0; at <= text.length; at += 1) out += (before[at] ?? []).join("") + escaped(text[at] ?? "")
  return out
}
