#!/usr/bin/env bash
# The release's live check against the real service (WC-TEST-18, WC-REL-17). The owner runs bin/live, which prints
# the `# Needs:` lines below, passes the token on stdin and records the pass. Every folder is a temporary one and the
# keyring is out of reach, so nothing touches the owner's store, keyring or settings.
#   scripts/live.sh <test channel> < token-file
# Needs: the User OAuth Token (xoxp-) of an app made from docs/slack-app-manifest.json in a test workspace
# Needs: a test channel the token's user is in, given as the argument (bin/live <account> '#wirecat-live'),
# Needs: where the check posts a message and a thread reply, reacts, edits, and then deletes both
set -euo pipefail
channel=${1:?give the test channel, such as '#wirecat-live': the check posts and deletes messages there}
root=$(cd -- "$(dirname -- "$0")/.." && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

export SLACK_CONFIG_DIR="$work/config" SLACK_STATE_DIR="$work/state" SLACK_CACHE_DIR="$work/cache"
export MESSAGING_STORE="$work/wirecat.db"
export DBUS_SESSION_BUS_ADDRESS="disabled:"
unset SLACK_TOKEN
cli=(node "$root/dist/bin/slack.js")

pnpm --dir "$root" -s build >/dev/null
# Set after the build, which needs the owner's pnpm store: a CLI that moves its folders on start must not see the
# owner's home.
export HOME="$work/home" XDG_CONFIG_HOME="$work/xdg/config" XDG_DATA_HOME="$work/xdg/data"
export XDG_STATE_HOME="$work/xdg/state" XDG_CACHE_HOME="$work/xdg/cache"
mkdir -p "$HOME"

"${cli[@]}" --wcat-describe | node -e '
  const answer = JSON.parse(require("fs").readFileSync(0, "utf8"))
  if (answer.wcat_describe !== 2 || !/^[0-9a-f]{64}$/.test(answer.manifest_sha256)) throw new Error("not format 2")'

"${cli[@]}" live session start --credential-storage file --json >/dev/null
trap '"${cli[@]}" live session end --json >/dev/null 2>&1 || true; rm -rf "$work"' EXIT

"${cli[@]}" live api conversations list --types public_channel --limit 5 --json >"$work/list.json"
node -e '
  const list = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))
  if (list.item?.ok !== true || !Array.isArray(list.item.channels))
    throw new Error(`no channels: ${JSON.stringify(list).slice(0, 200)}`)' "$work/list.json"
"${cli[@]}" doctor --online --json >"$work/doctor.json"
node -e '
  const doctor = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))
  if (doctor.item?.online?.ok !== true) throw new Error("doctor --online: auth.test failed")' "$work/doctor.json"

field() { node -e 'const at = process.argv[1].split("."); let v = JSON.parse(require("fs").readFileSync(0, "utf8"))
  for (const k of at) v = v?.[k]; if (v === undefined || v === null) throw new Error(`no ${process.argv[1]}`); console.log(v)' "$1"; }

channel_id=$("${cli[@]}" live chats show "$channel" --json | field item.id)
"${cli[@]}" live messages list "$channel" --limit 5 --json | field items.length >/dev/null

# What Slack's docs leave open for inbox: whether conversations.info gives a group DM's unread count, and a
# channel's read point. Printed for the record; the check does not fail on them.
probe() { node -e '
  const answer = JSON.parse(require("fs").readFileSync(0, "utf8"))
  const one = answer.item?.channel
  if (!one) throw new Error("api conversations info answered without item.channel")
  const has = (key) => (key in one ? "yes" : "no")
  console.log(`probe: conversations.info of ${process.argv[1]} has last_read ${has("last_read")}, unread_count ${has("unread_count")}`)' "$1"; }
"${cli[@]}" live api conversations info --channel "$channel_id" --json | probe "a channel"
group_dm=$("${cli[@]}" live api conversations list --types mpim --limit 1 --json | node -e '
  const answer = JSON.parse(require("fs").readFileSync(0, "utf8"))
  console.log(answer.item?.channels?.[0]?.id ?? "")')
if [ -n "$group_dm" ]; then
  "${cli[@]}" live api conversations info --channel "$group_dm" --json | probe "a group DM"
else
  echo "probe: no group DM to ask"
fi
"${cli[@]}" live inbox --json | field items >/dev/null

"${cli[@]}" live search messages the --backend server --json >"$work/search.json" 2>"$work/search.err"
if grep -q "server search incomplete" "$work/search.err"; then
  echo "live check failed: Slack's search refused (is search:read granted?)" >&2
  exit 1
fi

root_id="" reply_id=""
cleanup() {
  for id in $reply_id $root_id; do
    "${cli[@]}" live messages delete "$channel" "$id" --for-everyone --yes --json >/dev/null 2>&1 || true
  done
}
trap 'cleanup; "${cli[@]}" live session end --json >/dev/null 2>&1 || true; rm -rf "$work"' EXIT

stamp="wirecat live check $(date -u +%Y-%m-%dT%H:%M:%SZ)"
root_id=$("${cli[@]}" live messages send "$channel" "$stamp" --yes --json | field item.message.id)
reply_id=$("${cli[@]}" live messages send "$channel" "reply to $stamp" --reply-to "$root_id" --yes --json |
  field item.message.id)
"${cli[@]}" live messages list "$channel" "topic:$root_id" --json | node -e '
  const items = JSON.parse(require("fs").readFileSync(0, "utf8")).items
  if (!items.some((one) => one.id === process.argv[1])) throw new Error("the reply is not in its thread")' "$reply_id"
"${cli[@]}" live reactions add "$channel" "$root_id" "👍" --yes --json >/dev/null
"${cli[@]}" live messages edit "$channel" "$root_id" "$stamp (edited)" --yes --json | field item.message.text |
  grep -q "(edited)"
"${cli[@]}" live messages sync "$channel" --json | field item.chat >/dev/null
for id in $reply_id $root_id; do
  "${cli[@]}" live messages delete "$channel" "$id" --for-everyone --yes --json >/dev/null
done
root_id="" reply_id=""

"${cli[@]}" live session end --json >/dev/null
echo "live check passed: describe, sign-in, api conversations list, doctor --online, chats show, messages list, inbox," \
  "server search, send, thread reply, reaction, edit, sync, delete, sign-out"
