import { rememberAccount } from "@wirecat/cli-core/cli"
import { IDENTITY } from "../identity.js"
import { AUTH_TEST, type FakeMessage, type FakeWorkspace } from "./fake-slack.js"

export const ME = AUTH_TEST.user_id
export const ANNA = "U0SYNTH02"
export const BORIS = "U0SYNTH03"
export const VERA = "U0EXTRN01"
export const GENERAL = "C0SYNTH01"
export const DM = "D0SYNTH01"
export const GROUP_DM = "G0SYNTH01"
export const SHARED = "C0SHARD01"
export const PUBLIC_UNJOINED = "C0NOTMINE"
export const PRIVATE_UNJOINED = "G0NOTMINE"
export const ARCHIVED = "C0ARCHIVD"
export const FILE_URL = "https://files.slack.com/files-pri/T0SYNTH01-F0SYNTH01/report.txt"

/** The account `session start` remembers, so a command knows whose messages are outgoing without asking Slack. */
export const remembered = (profile = "personal") =>
  rememberAccount(IDENTITY, profile, `${AUTH_TEST.team_id}:${AUTH_TEST.user_id}`, process.env)

/** `ts` of a moment `seconds` after 1700000000, with microseconds, as Slack writes it. */
export const ts = (seconds: number, micro = 100) => `${1_700_000_000 + seconds}.${String(micro).padStart(6, "0")}`

/** `ts` of a moment `days` before now. */
export const daysAgo = (days: number, micro = 100) =>
  `${Math.floor((Date.now() - days * 86_400_000) / 1000)}.${String(micro).padStart(6, "0")}`

const GENERAL_MESSAGES: FakeMessage[] = [
  { ts: ts(0), subtype: "channel_join", user: BORIS, text: `<@${BORIS}> has joined the channel` },
  { ts: ts(10), user: ANNA, text: `Hi <@${ME}>, the plan is in <#C0SYNTH01|general> &amp; <https://example.com|here>` },
  { ts: ts(20), user: ME, text: "Thanks, reading it", edited: { ts: ts(25), user: ME } },
  { ts: ts(30), user: BORIS, text: "Who has the numbers? <!here>" },
  { ts: ts(31), user: ANNA, text: "I do", thread_ts: ts(30) },
  { ts: ts(32), user: ME, text: "Sending them now", thread_ts: ts(30), subtype: "thread_broadcast" },
  {
    ts: ts(40),
    user: ANNA,
    text: "The report",
    reactions: [{ name: "eyes", users: [ME, BORIS], count: 2 }],
    files: [
      {
        id: "F0SYNTH01",
        name: "report.txt",
        title: "report.txt",
        mimetype: "text/plain",
        size: 12,
        url_private: FILE_URL,
        url_private_download: FILE_URL,
      },
    ],
  },
  { ts: ts(50), bot_id: "B0SYNTH01", username: "deploybot", subtype: "bot_message", text: "Deployed" },
]

/** A synthetic workspace: one public channel with a thread, a DM, a group DM and a Slack Connect channel. */
// A deep copy: the fake changes the messages a write touches, and the next test must not see them.
export const workspace = (): FakeWorkspace =>
  structuredClone({
    users: [
      { id: ME, name: "test.person", real_name: "Test Person", profile: { display_name: "Test" } },
      { id: ANNA, name: "anna", real_name: "Anna Synth", profile: { title: "Planner" } },
      { id: BORIS, name: "boris", real_name: "Boris Synth" },
      { id: VERA, name: "vera", real_name: "Vera Outside", team_id: "T0OTHER01", profile: { team: "T0OTHER01" } },
    ],
    channels: [
      { id: GENERAL, kind: "public", name: "general", members: [ME, ANNA, BORIS] },
      { id: DM, kind: "im", user: ANNA, members: [ME, ANNA], unread: 1 },
      { id: GROUP_DM, kind: "mpim", name: "mpdm-test.person--anna--boris-1", members: [ME, ANNA, BORIS] },
      { id: SHARED, kind: "private", name: "partners", members: [ME, VERA], is_ext_shared: true },
      { id: PUBLIC_UNJOINED, kind: "public", name: "elsewhere", members: [ANNA] },
      { id: PRIVATE_UNJOINED, kind: "private", name: "secret", members: [ANNA] },
      { id: ARCHIVED, kind: "public", name: "old-project", members: [ME, ANNA], archived: true },
    ],
    messages: {
      [GENERAL]: GENERAL_MESSAGES,
      [PUBLIC_UNJOINED]: [{ ts: ts(3), user: ANNA, text: "Anyone can read this" }],
      [DM]: [{ ts: ts(5), user: ANNA, text: "Are you free?" }],
      [SHARED]: [{ ts: ts(7), user: VERA, user_team: "T0OTHER01", team: "T0OTHER01", text: "Hello from outside" }],
    },
    files: { [FILE_URL]: "the numbers\n" },
  })
