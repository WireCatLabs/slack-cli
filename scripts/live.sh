#!/usr/bin/env bash
# The release's live check against the real service (WC-TEST-18, WC-REL-17). The owner runs bin/live, which prints
# the `# Needs:` lines below, passes the token on stdin and records the pass. Every folder is a temporary one and the
# keyring is out of reach, so nothing touches the owner's store, keyring or settings.
#   scripts/live.sh < token-file
# Needs: the User OAuth Token (xoxp-) of an app made from docs/slack-app-manifest.json in a test workspace
# Needs: at least one public channel the token's user can see
set -euo pipefail
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

"${cli[@]}" live session end --json >/dev/null
echo "live check passed: describe format 2, sign-in, conversations list, doctor --online, sign-out"
