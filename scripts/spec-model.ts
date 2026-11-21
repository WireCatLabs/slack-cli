import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  type ApiModel,
  adaptOpenApi,
  mergeOpenApi,
  patchSpec,
  type SpecPatch,
  upgradeToOpenApi3,
} from "@wirecat/cli-base/codegen"
import { parse } from "yaml"

interface Provenance {
  sources: { name: string; url: string; file: string; sha256: string }[]
}

// JSON first: it is the common case and much faster to read than YAML, which also reads JSON.
export const parseSpec = (text: string): unknown => {
  try {
    return JSON.parse(text)
  } catch {
    return parse(text)
  }
}

// Slack's Swagger writes 28 schemas as draft-04 tuples (`items: [a, b]`), which OpenAPI 3 does not allow: each is one
// value of either type, so a tuple becomes `anyOf`, and a one-entry tuple its only schema.
const untuple = (node: unknown): number => {
  if (Array.isArray(node)) return node.reduce((sum: number, child) => sum + untuple(child), 0)
  if (!node || typeof node !== "object") return 0
  const schema = node as Record<string, unknown>
  let fixed = 0
  if (Array.isArray(schema.items)) {
    schema.items = schema.items.length === 1 ? schema.items[0] : { anyOf: schema.items }
    fixed = 1
  }
  return Object.values(schema).reduce((sum: number, child) => sum + untuple(child), fixed)
}

type Json = Record<string, unknown>
type Operation = { path: string; method: string; operation: Json }

const DOCS = "https://docs.slack.dev/reference/methods/"
const TS_FIELDS = new Set(["ts", "latest", "oldest", "thread_ts", "timestamp"])

const pointerOf = (...parts: string[]) =>
  `/${parts.map((part) => part.replaceAll("~", "~0").replaceAll("/", "~1")).join("/")}`
const objectAt = (node: unknown, ...keys: string[]): Json | undefined =>
  keys.reduce<unknown>((at, key) => (at && typeof at === "object" ? (at as Json)[key] : undefined), node) as
    | Json
    | undefined
const operationsOf = (document: unknown): Operation[] =>
  Object.entries(objectAt(document, "paths") ?? {}).flatMap(([path, item]) =>
    Object.entries(item as Json).map(([method, operation]) => ({ path, method, operation: operation as Json })),
  )
const parametersOf = ({ operation }: Operation) => (operation.parameters ?? []) as Json[]
const formOf = ({ operation }: Operation) => {
  const content = objectAt(operation, "requestBody", "content") ?? {}
  const [type] = Object.keys(content)
  const schema = type ? objectAt(content, type, "schema") : undefined
  return type && schema ? { type, schema } : undefined
}
const operationAt = (document: unknown, method: string) => {
  const [path, verb] = method.includes(" ") ? method.split(" ") : [method, "get"]
  const found = operationsOf(document).find((one) => one.path === `/${path}` && one.method === verb)
  if (!found) throw new Error(`spec-model: no ${verb} /${path}`)
  return found
}
const parameterPointer = (document: unknown, method: string, name: string) => {
  const found = operationAt(document, method)
  const index = parametersOf(found).findIndex((parameter) => parameter.name === name)
  if (index < 0) throw new Error(`spec-model: ${method} takes no ${name}`)
  return pointerOf("paths", found.path, found.method, "parameters", String(index))
}
const answerPointer = (document: unknown, method: string, ...rest: string[]) => {
  const found = operationAt(document, method)
  return pointerOf(
    "paths",
    found.path,
    found.method,
    "responses",
    "200",
    "content",
    "application/json",
    "schema",
    ...rest,
  )
}

const REQUIRED_CHANNEL = [
  "conversations.history",
  "conversations.replies",
  "conversations.info",
  "conversations.members",
]
const PAGED_WITHOUT_METADATA = ["conversations.history", "conversations.replies", "stars.list"]
// Each answers an access token (Slack's docs of each method); the CLI signs in through `session start` instead.
const CREDENTIAL_ANSWERS = ["oauth.access", "oauth.v2.access", "oauth.token"]

/** Fixes found by name in the document as Slack published it, before any parameter moves. */
const correctionsOf = (document: unknown): SpecPatch[] => [
  ...REQUIRED_CHANNEL.map((method) => ({
    pointer: `${parameterPointer(document, method, "channel")}/required`,
    value: true,
    reason: `Slack's docs mark \`channel\` required in ${method} (<${DOCS}${method}/>); the spec does not`,
  })),
  {
    pointer: `${parameterPointer(document, "conversations.replies", "ts")}/required`,
    value: true,
    reason: `Slack's docs mark \`ts\` required in conversations.replies (<${DOCS}conversations.replies/>)`,
  },
  ...operationsOf(document)
    .flatMap((found) => [
      ...parametersOf(found).flatMap((parameter, index) =>
        TS_FIELDS.has(String(parameter.name)) && objectAt(parameter, "schema")?.type === "number"
          ? [
              {
                pointer: pointerOf("paths", found.path, found.method, "parameters", String(index), "schema"),
                value: { type: "string" },
              },
            ]
          : [],
      ),
      ...Object.entries(objectAt(formOf(found)?.schema, "properties") ?? {}).flatMap(([name, property]) =>
        TS_FIELDS.has(name) && (property as Json).type === "number"
          ? [
              {
                pointer: pointerOf(
                  "paths",
                  found.path,
                  found.method,
                  "requestBody",
                  "content",
                  String(formOf(found)?.type),
                  "schema",
                  "properties",
                  name,
                ),
                value: { ...(property as Json), type: "string" },
              },
            ]
          : [],
      ),
    ])
    .map((patch) => ({
      ...patch,
      reason:
        "a Slack timestamp is a string with six decimals (the spec's own `defs_ts`); as a number " +
        "1700000000.000100 loses its digits and names another message",
    })),
  {
    pointer: "/components/schemas/objs_response_metadata",
    value: {
      type: "object",
      properties: {
        next_cursor: { type: "string" },
        messages: { type: "array", items: { type: "string" } },
        warnings: { type: "array", items: { type: "string" } },
      },
    },
    reason:
      "the spec's three variants of `response_metadata` (paging, a warning, both) are one object whose fields come " +
      "and go; as a union the paging of users.list and reactions.list cannot be read from it",
  },
  ...PAGED_WITHOUT_METADATA.map((method) => ({
    pointer: answerPointer(document, method, "properties", "response_metadata"),
    value: { type: "object", properties: { next_cursor: { type: "string" } } },
    reason: `Slack's docs show \`response_metadata.next_cursor\` in the answer of ${method} (<${DOCS}${method}/>)`,
  })),
  ...CREDENTIAL_ANSWERS.map((method) => ({
    pointer: answerPointer(document, method, "properties", "access_token"),
    value: { type: "string", format: "password" },
    reason: `${method} answers an access token (<${DOCS}${method}/>), so the api group offers no command for it`,
  })),
  {
    pointer: answerPointer(document, "rtm.connect", "properties", "url", "format"),
    value: "password",
    reason:
      "rtm.connect answers a WebSocket URL that carries a connection ticket (<" +
      `${DOCS}rtm.connect/>), a link with a secret, so the api group offers no command for it`,
  },
]

const TOKEN_REASON =
  "Slack's docs send the token as `Authorization: Bearer` (<https://docs.slack.dev/apis/web-api/>); a `token` " +
  "argument would put the secret in shell history and the run record (WC-SECR-5)"

/** The spec's `token` parameter, in a header, the query or the form, removed from every operation. */
const withoutToken = (document: unknown): SpecPatch[] =>
  operationsOf(document).flatMap((found) => {
    const parameters = parametersOf(found)
    const form = formOf(found)
    const properties = objectAt(form?.schema, "properties") ?? {}
    const body = pointerOf("paths", found.path, found.method, "requestBody", "content", String(form?.type), "schema")
    return [
      ...(parameters.some((parameter) => parameter.name === "token")
        ? [
            {
              pointer: pointerOf("paths", found.path, found.method, "parameters"),
              value: parameters.filter((parameter) => parameter.name !== "token"),
              reason: TOKEN_REASON,
            },
          ]
        : []),
      ...("token" in properties
        ? [
            {
              pointer: `${body}/properties`,
              value: Object.fromEntries(Object.entries(properties).filter(([name]) => name !== "token")),
              reason: TOKEN_REASON,
            },
            ...(Array.isArray(form?.schema.required)
              ? [
                  {
                    pointer: `${body}/required`,
                    value: (form.schema.required as string[]).filter((name) => name !== "token"),
                    reason: TOKEN_REASON,
                  },
                ]
              : []),
          ]
        : []),
    ]
  })

/**
 * A POST whose Swagger `consumes` lists `application/json` gets that body only: cli-core sends JSON and bytes, not a
 * form, and Slack's docs accept JSON with the Bearer header (https://docs.slack.dev/apis/web-api/#posting_json).
 */
const jsonBodies = (document: unknown, swagger: unknown): SpecPatch[] =>
  operationsOf(document).flatMap((found) => {
    const consumes = objectAt(swagger, "paths", found.path, found.method)?.consumes
    const form = formOf(found)
    if (!form || !Array.isArray(consumes) || !consumes.includes("application/json")) return []
    return [
      {
        pointer: pointerOf("paths", found.path, found.method, "requestBody", "content"),
        value: { "application/json": { schema: form.schema } },
        reason:
          "the method accepts `application/json` (its Swagger `consumes`), which cli-core can send; the form it " +
          "lists first it cannot",
      },
    ]
  })

const RELAX_REASON =
  "Slack adds answer fields over time and answers an empty list where the spec of 2020 says `additionalProperties: " +
  "false` and `minItems: 1`, so a strict fake would refuse what Slack sends today"

/** Every answer schema, inline or shared, lets new fields and empty lists through; request schemas stay strict. */
const relaxedAnswers = (document: unknown): SpecPatch[] => {
  const walk = (node: unknown, at: string[]): SpecPatch[] => {
    if (!node || typeof node !== "object") return []
    const schema = node as Json
    return [
      ...(schema.additionalProperties === false
        ? [{ pointer: pointerOf(...at, "additionalProperties"), value: true, reason: RELAX_REASON }]
        : []),
      ...(typeof schema.minItems === "number" && schema.minItems > 0
        ? [{ pointer: pointerOf(...at, "minItems"), value: 0, reason: RELAX_REASON }]
        : []),
      ...Object.entries(schema).flatMap(([key, child]) => walk(child, [...at, key])),
    ]
  }
  return [
    ...walk(objectAt(document, "components", "schemas"), ["components", "schemas"]),
    ...operationsOf(document).flatMap((found) =>
      walk(objectAt(found.operation, "responses"), ["paths", found.path, found.method, "responses"]),
    ),
  ]
}

const LINK_REASON =
  "Slack's descriptions link relative to api.slack.com (`/docs/pagination`) or to anchors of its own pages, which " +
  "break in the coverage page, the commands page and the agent skill"

/** A relative link becomes one to api.slack.com; a link to an anchor of Slack's page keeps only its text. */
const absoluteLinks = (document: unknown): SpecPatch[] => {
  const walk = (node: unknown, at: string[]): SpecPatch[] => {
    if (!node || typeof node !== "object") return []
    return Object.entries(node as Json).flatMap(([key, child]) => {
      if (key !== "description" || typeof child !== "string") return walk(child, [...at, key])
      const fixed = child.replace(/\]\(\//g, "](https://api.slack.com/").replace(/\[([^\]]*)\]\(#[^)]*\)/g, "$1")
      return fixed === child ? [] : [{ pointer: pointerOf(...at, key), value: fixed, reason: LINK_REASON }]
    })
  }
  return walk(document, [])
}

/**
 * Applied in stages, each read from the document the one before left, so a pointer never names a parameter that
 * an earlier stage moved.
 */
const patched = (document: unknown, swagger: unknown) =>
  [correctionsOf, withoutToken, (at: unknown) => jsonBodies(at, swagger), relaxedAnswers, absoluteLinks].reduce(
    (state, stage) => {
      const next = patchSpec(state.document, { patches: stage(state.document) })
      return { document: next.document as unknown, applied: [...state.applied, ...next.applied] }
    },
    { document, applied: [] as { pointer: string; reason: string }[] },
  )

const notesOf = (applied: { pointer: string; reason: string }[]) => {
  const byReason = new Map<string, string[]>()
  for (const { pointer, reason } of applied) byReason.set(reason, [...(byReason.get(reason) ?? []), pointer])
  return [...byReason].map(([reason, pointers]) =>
    pointers.length === 1 ? `patched ${pointers[0]}: ${reason}` : `${pointers.length} patches: ${reason}`,
  )
}

/**
 * The documents as committed, checked against provenance.json, a Swagger one upgraded to OpenAPI 3, joined when there
 * are several, then corrected.
 */
export const specModel = async (root: string): Promise<{ model: ApiModel; notes: string[] }> => {
  const dir = join(root, "spec/slack")
  const provenance = JSON.parse(readFileSync(join(dir, "provenance.json"), "utf8")) as Provenance
  const sources = await Promise.all(
    provenance.sources.map(async (source) => {
      const text = readFileSync(join(dir, source.file), "utf8")
      if (createHash("sha256").update(text).digest("hex") !== source.sha256)
        throw new Error(`spec/slack/${source.file} does not match provenance.json; run pnpm spec:sync`)
      const document = parseSpec(text) as { openapi?: unknown }
      return {
        name: source.name,
        url: source.url,
        swagger: document,
        document: document.openapi ? document : await upgradeToOpenApi3(document),
      }
    }),
  )
  const [only] = sources
  const merged =
    sources.length === 1 && only
      ? { document: only.document, notes: [] as string[] }
      : (() => {
          const { document, report } = mergeOpenApi(sources, { title: "slack", version: "1" })
          return { document, notes: [...report.merged, ...report.renamed].map((line) => `merged: ${line}`) }
        })()
  const tuples = untuple(merged.document)
  const { document, applied } = patched(merged.document, only?.swagger)
  const model = adaptOpenApi(document, {
    sourceUrl: provenance.sources.map((source) => source.url).join(" "),
    sourceRevision: provenance.sources.map((source) => source.sha256).join(" "),
  })
  return {
    model,
    notes: [
      ...merged.notes,
      `${tuples} draft-04 tuple \`items\` became \`anyOf\` (OpenAPI 3 has no tuples)`,
      ...notesOf(applied),
    ],
  }
}
