import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterAll } from "vitest"
import { ARGV_LOG } from "./argv-log.js"

const saved = { ...process.env }

// cli-base's setup already gave this file a fresh TMPDIR and HOME, a keyring that throws and no network, and points
// every folder and store variable at them (WC-TEST-1, WC-STORE-14). The config folder is set only because tests
// write into it by name.
process.env.SLACK_CONFIG_DIR = join(tmpdir(), "config")
process.env.SLACK_NO_UPDATE_CHECK = "1"
// The tests' Slack answers at once; the pace a profile keeps with the real one has its own test.
process.env.SLACK_REQUESTS_PER_MINUTE = "0"
process.env.SLACK_TEST_ARGV_LOG = ARGV_LOG
delete process.env.SLACK_PROFILE
delete process.env.SLACK_READ_ONLY
delete process.env.AI_AGENT
delete process.env.CLAUDECODE

afterAll(() => {
  for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key]
  Object.assign(process.env, saved)
})
