// The app made from this is the owner's own: user scopes only, no bot, and token rotation off, since slk cannot renew
// a rotating token. docs/slack-app-manifest.json is the same manifest for pasting by hand; a test keeps them equal.
export const APP_MANIFEST = {
  _metadata: {
    major_version: 2,
    minor_version: 1,
  },
  display_information: {
    name: "WireCat slk",
    description: "Your own Slack, read and written as you by the slk CLI on your computer.",
  },
  oauth_config: {
    scopes: {
      user: [
        "channels:history",
        "groups:history",
        "im:history",
        "mpim:history",
        "channels:read",
        "groups:read",
        "im:read",
        "mpim:read",
        "users:read",
        "users:read.email",
        "search:read",
        "reactions:read",
        "files:read",
        "pins:read",
        "usergroups:read",
        "chat:write",
        "reactions:write",
        "files:write",
        "pins:write",
        "channels:write",
        "groups:write",
        "im:write",
        "mpim:write",
      ],
    },
  },
  settings: {
    org_deploy_enabled: false,
    socket_mode_enabled: false,
    token_rotation_enabled: false,
  },
} as const

/** Slack's "Create New App" with the manifest filled in (https://docs.slack.dev/app-manifests/configuring-apps-with-app-manifests#sharing). */
export const APP_LINK = `https://api.slack.com/apps?new_app=1&manifest_json=${encodeURIComponent(JSON.stringify(APP_MANIFEST))}`
