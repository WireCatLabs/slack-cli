// GENERATED. DO NOT EDIT.
// Source: spec/slack/, checked against provenance.json
// Run: pnpm generate

import type { ApiServer, ManifestOperation, SecurityScheme } from "@wirecat/cli-base/codegen"

export const operations: readonly ManifestOperation[] = [
  {
    id: "admin_apps_approve",
    command: "admin-apps-approve",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.apps.approve",
    },
    effect: "write",
    description: "Approve an app for installation on a workspace.",
    tags: ["admin.apps", "admin"],
    security: [
      {
        slackAuth: ["admin.apps:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.apps:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminAppsApproveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminAppsApproveResponse",
    },
  },
  {
    id: "admin_apps_approved_list",
    command: "admin-apps-approved-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.apps.approved.list",
    },
    effect: "read",
    description: "List approved apps for an org or workspace.",
    tags: ["admin.apps.approved", "admin"],
    security: [
      {
        slackAuth: ["admin.apps:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.apps:read`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "enterprise_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminAppsApprovedListResponse",
    },
  },
  {
    id: "admin_apps_requests_list",
    command: "admin-apps-requests-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.apps.requests.list",
    },
    effect: "read",
    description: "List app requests for a team/workspace.",
    tags: ["admin.apps.requests", "admin"],
    security: [
      {
        slackAuth: ["admin.apps:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.apps:read`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminAppsRequestsListResponse",
    },
  },
  {
    id: "admin_apps_restrict",
    command: "admin-apps-restrict",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.apps.restrict",
    },
    effect: "write",
    description: "Restrict an app for installation on a workspace.",
    tags: ["admin.apps", "admin"],
    security: [
      {
        slackAuth: ["admin.apps:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.apps:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminAppsRestrictRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminAppsRestrictResponse",
    },
  },
  {
    id: "admin_apps_restricted_list",
    command: "admin-apps-restricted-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.apps.restricted.list",
    },
    effect: "read",
    description: "List restricted apps for an org or workspace.",
    tags: ["admin.apps.restricted", "admin"],
    security: [
      {
        slackAuth: ["admin.apps:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.apps:read`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "enterprise_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminAppsRestrictedListResponse",
    },
  },
  {
    id: "admin_conversations_archive",
    command: "admin-conversations-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.archive",
    },
    effect: "write",
    description: "Archive a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsArchiveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsArchiveResponse",
    },
  },
  {
    id: "admin_conversations_convertToPrivate",
    command: "admin-conversations-convert-to-private",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.convertToPrivate",
    },
    effect: "write",
    description: "Convert a public channel to a private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsConvertToPrivateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsConvertToPrivateResponse",
    },
  },
  {
    id: "admin_conversations_create",
    command: "admin-conversations-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.create",
    },
    effect: "write",
    description: "Create a public or private channel-based conversation.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsCreateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsCreateResponse",
    },
  },
  {
    id: "admin_conversations_delete",
    command: "admin-conversations-delete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.delete",
    },
    effect: "write",
    description: "Delete a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsDeleteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsDeleteResponse",
    },
  },
  {
    id: "admin_conversations_disconnectShared",
    command: "admin-conversations-disconnect-shared",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.disconnectShared",
    },
    effect: "write",
    description: "Disconnect a connected channel from one or more workspaces.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsDisconnectSharedRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsDisconnectSharedResponse",
    },
  },
  {
    id: "admin_conversations_ekm_listOriginalConnectedChannelInfo",
    command: "admin-conversations-ekm-list-original-connected-channel-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.conversations.ekm.listOriginalConnectedChannelInfo",
    },
    effect: "read",
    description:
      "List all disconnected channels—i.e., channels that were once connected to other workspaces and then disconnected—and the corresponding original channel IDs for key revocation with EKM.",
    tags: ["admin.conversations.ekm", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:read`",
      },
      {
        name: "channel_ids",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A comma-separated list of channels to filter to.",
      },
      {
        name: "team_ids",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A comma-separated list of the workspaces to which the channels you would like returned belong.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminConversationsEkmListOriginalConnectedChannelInfoResponse",
    },
  },
  {
    id: "admin_conversations_getConversationPrefs",
    command: "admin-conversations-get-conversation-prefs-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.conversations.getConversationPrefs",
    },
    effect: "read",
    description: "Get conversation preferences for a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:read`",
      },
      {
        name: "channel_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The channel to get preferences for.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminConversationsGetConversationPrefsResponse",
    },
  },
  {
    id: "admin_conversations_getTeams",
    command: "admin-conversations-get-teams-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.conversations.getTeams",
    },
    effect: "read",
    description: "Get all the workspaces a given public or private channel is connected to within this Enterprise org.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:read"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "response_metadata.next_cursor",
      items: "team_ids",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:read`",
      },
      {
        name: "channel_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The channel to determine connected workspaces within the organization for.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminConversationsGetTeamsResponse",
    },
  },
  {
    id: "admin_conversations_invite",
    command: "admin-conversations-invite",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.invite",
    },
    effect: "write",
    description: "Invite a user to a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsInviteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsInviteResponse",
    },
  },
  {
    id: "admin_conversations_rename",
    command: "admin-conversations-rename",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.rename",
    },
    effect: "write",
    description: "Rename a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsRenameRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsRenameResponse",
    },
  },
  {
    id: "admin_conversations_restrictAccess_addGroup",
    command: "admin-conversations-restrict-access-add-group",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.restrictAccess.addGroup",
    },
    effect: "write",
    description: "Add an allowlist of IDP groups for accessing a channel",
    tags: ["admin.conversations.restrictAccess", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsRestrictAccessAddGroupRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsRestrictAccessAddGroupResponse",
    },
  },
  {
    id: "admin_conversations_restrictAccess_listGroups",
    command: "admin-conversations-restrict-access-list-groups-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.conversations.restrictAccess.listGroups",
    },
    effect: "read",
    description: "List all IDP Groups linked to a channel",
    tags: ["admin.conversations.restrictAccess", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:read`",
      },
      {
        name: "channel_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminConversationsRestrictAccessListGroupsResponse",
    },
  },
  {
    id: "admin_conversations_restrictAccess_removeGroup",
    command: "admin-conversations-restrict-access-remove-group",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.restrictAccess.removeGroup",
    },
    effect: "write",
    description: "Remove a linked IDP group linked from a private channel",
    tags: ["admin.conversations.restrictAccess", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsRestrictAccessRemoveGroupRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsRestrictAccessRemoveGroupResponse",
    },
  },
  {
    id: "admin_conversations_search",
    command: "admin-conversations-search-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.conversations.search",
    },
    effect: "read",
    description: "Search for public or private channels in an Enterprise organization.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:read"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "next_cursor",
      items: "channels",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:read`",
      },
      {
        name: "team_ids",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Comma separated string of team IDs, signifying the workspaces to search through.",
      },
      {
        name: "query",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Name of the the channel to query by.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      },
      {
        name: "search_channel_types",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The type of channel to include or exclude in the search. For example `private` will search private channels, while `private_exclude` will exclude them. For a full list of types, check the [Types section](#types).",
      },
      {
        name: "sort",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Possible values are `relevant` (search ranking based on what we think is closest), `name` (alphabetical), `member_count` (number of users in the channel), and `created` (date channel was created). You can optionally pair this with the `sort_dir` arg to change how it is sorted ",
      },
      {
        name: "sort_dir",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Sort direction. Possible values are `asc` for ascending order like (1, 2, 3) or (a, b, c), and `desc` for descending order like (3, 2, 1) or (c, b, a)",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminConversationsSearchResponse",
    },
  },
  {
    id: "admin_conversations_setConversationPrefs",
    command: "admin-conversations-set-conversation-prefs",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.setConversationPrefs",
    },
    effect: "write",
    description: "Set the posting permissions for a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsSetConversationPrefsRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsSetConversationPrefsResponse",
    },
  },
  {
    id: "admin_conversations_setTeams",
    command: "admin-conversations-set-teams",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.setTeams",
    },
    effect: "write",
    description: "Set the workspaces in an Enterprise grid org that connect to a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsSetTeamsRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsSetTeamsResponse",
    },
  },
  {
    id: "admin_conversations_unarchive",
    command: "admin-conversations-unarchive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.conversations.unarchive",
    },
    effect: "write",
    description: "Unarchive a public or private channel.",
    tags: ["admin.conversations", "admin"],
    security: [
      {
        slackAuth: ["admin.conversations:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminConversationsUnarchiveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminConversationsUnarchiveResponse",
    },
  },
  {
    id: "admin_emoji_add",
    command: "admin-emoji-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.emoji.add",
    },
    effect: "write",
    description: "Add an emoji.",
    tags: ["admin.emoji", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminEmojiAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminEmojiAddResponse",
    },
  },
  {
    id: "admin_emoji_addAlias",
    command: "admin-emoji-add-alias",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.emoji.addAlias",
    },
    effect: "write",
    description: "Add an emoji alias.",
    tags: ["admin.emoji", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminEmojiAddAliasRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminEmojiAddAliasResponse",
    },
  },
  {
    id: "admin_emoji_list",
    command: "admin-emoji-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.emoji.list",
    },
    effect: "read",
    description: "List emoji for an Enterprise Grid organization.",
    tags: ["admin.emoji", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:read`",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminEmojiListResponse",
    },
  },
  {
    id: "admin_emoji_remove",
    command: "admin-emoji-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.emoji.remove",
    },
    effect: "write",
    description: "Remove an emoji across an Enterprise Grid organization",
    tags: ["admin.emoji", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminEmojiRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminEmojiRemoveResponse",
    },
  },
  {
    id: "admin_emoji_rename",
    command: "admin-emoji-rename",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.emoji.rename",
    },
    effect: "write",
    description: "Rename an emoji.",
    tags: ["admin.emoji", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminEmojiRenameRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminEmojiRenameResponse",
    },
  },
  {
    id: "admin_inviteRequests_approve",
    command: "admin-invite-requests-approve",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.inviteRequests.approve",
    },
    effect: "write",
    description: "Approve a workspace invite request.",
    tags: ["admin.inviteRequests", "admin"],
    security: [
      {
        slackAuth: ["admin.invites:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.invites:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminInviteRequestsApproveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminInviteRequestsApproveResponse",
    },
  },
  {
    id: "admin_inviteRequests_approved_list",
    command: "admin-invite-requests-approved-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.inviteRequests.approved.list",
    },
    effect: "read",
    description: "List all approved workspace invite requests.",
    tags: ["admin.inviteRequests.approved", "admin"],
    security: [
      {
        slackAuth: ["admin.invites:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.invites:read`",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "ID for the workspace where the invite requests were made.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Value of the `next_cursor` field sent as part of the previous API response",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminInviteRequestsApprovedListResponse",
    },
  },
  {
    id: "admin_inviteRequests_denied_list",
    command: "admin-invite-requests-denied-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.inviteRequests.denied.list",
    },
    effect: "read",
    description: "List all denied workspace invite requests.",
    tags: ["admin.inviteRequests.denied", "admin"],
    security: [
      {
        slackAuth: ["admin.invites:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.invites:read`",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "ID for the workspace where the invite requests were made.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Value of the `next_cursor` field sent as part of the previous api response",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The number of results that will be returned by the API on each invocation. Must be between 1 - 1000 both inclusive",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminInviteRequestsDeniedListResponse",
    },
  },
  {
    id: "admin_inviteRequests_deny",
    command: "admin-invite-requests-deny",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.inviteRequests.deny",
    },
    effect: "write",
    description: "Deny a workspace invite request.",
    tags: ["admin.inviteRequests", "admin"],
    security: [
      {
        slackAuth: ["admin.invites:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.invites:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminInviteRequestsDenyRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminInviteRequestsDenyResponse",
    },
  },
  {
    id: "admin_inviteRequests_list",
    command: "admin-invite-requests-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.inviteRequests.list",
    },
    effect: "read",
    description: "List all pending workspace invite requests.",
    tags: ["admin.inviteRequests", "admin"],
    security: [
      {
        slackAuth: ["admin.invites:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.invites:read`",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "ID for the workspace where the invite requests were made.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Value of the `next_cursor` field sent as part of the previous API response",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminInviteRequestsListResponse",
    },
  },
  {
    id: "admin_teams_admins_list",
    command: "admin-teams-admins-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.teams.admins.list",
    },
    effect: "read",
    description: "List all of the admins on a given workspace.",
    tags: ["admin.teams.admins", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:read`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      },
      {
        name: "team_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminTeamsAdminsListResponse",
    },
  },
  {
    id: "admin_teams_create",
    command: "admin-teams-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.teams.create",
    },
    effect: "write",
    description: "Create an Enterprise team.",
    tags: ["admin.teams", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminTeamsCreateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminTeamsCreateResponse",
    },
  },
  {
    id: "admin_teams_list",
    command: "admin-teams-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.teams.list",
    },
    effect: "read",
    description: "List all teams on an Enterprise organization",
    tags: ["admin.teams", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:read`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 100 both inclusive.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminTeamsListResponse",
    },
  },
  {
    id: "admin_teams_owners_list",
    command: "admin-teams-owners-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.teams.owners.list",
    },
    effect: "read",
    description: "List all of the owners on a given workspace.",
    tags: ["admin.teams.owners", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:read`",
      },
      {
        name: "team_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminTeamsOwnersListResponse",
    },
  },
  {
    id: "admin_teams_settings_info",
    command: "admin-teams-settings-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.teams.settings.info",
    },
    effect: "read",
    description: "Fetch information about settings in a workspace",
    tags: ["admin.teams.settings", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:read`",
      },
      {
        name: "team_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminTeamsSettingsInfoResponse",
    },
  },
  {
    id: "admin_teams_settings_setDefaultChannels",
    command: "admin-teams-settings-set-default-channels",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.teams.settings.setDefaultChannels",
    },
    effect: "write",
    description: "Set the default channels of a workspace.",
    tags: ["admin.teams.settings", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminTeamsSettingsSetDefaultChannelsRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminTeamsSettingsSetDefaultChannelsResponse",
    },
  },
  {
    id: "admin_teams_settings_setDescription",
    command: "admin-teams-settings-set-description",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.teams.settings.setDescription",
    },
    effect: "write",
    description: "Set the description of a given workspace.",
    tags: ["admin.teams.settings", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminTeamsSettingsSetDescriptionRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminTeamsSettingsSetDescriptionResponse",
    },
  },
  {
    id: "admin_teams_settings_setDiscoverability",
    command: "admin-teams-settings-set-discoverability",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.teams.settings.setDiscoverability",
    },
    effect: "write",
    description: "An API method that allows admins to set the discoverability of a given workspace",
    tags: ["admin.teams.settings", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminTeamsSettingsSetDiscoverabilityRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminTeamsSettingsSetDiscoverabilityResponse",
    },
  },
  {
    id: "admin_teams_settings_setIcon",
    command: "admin-teams-settings-set-icon",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.teams.settings.setIcon",
    },
    effect: "write",
    description: "Sets the icon of a workspace.",
    tags: ["admin.teams.settings", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminTeamsSettingsSetIconRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminTeamsSettingsSetIconResponse",
    },
  },
  {
    id: "admin_teams_settings_setName",
    command: "admin-teams-settings-set-name",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.teams.settings.setName",
    },
    effect: "write",
    description: "Set the name of a given workspace.",
    tags: ["admin.teams.settings", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminTeamsSettingsSetNameRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminTeamsSettingsSetNameResponse",
    },
  },
  {
    id: "admin_usergroups_addChannels",
    command: "admin-usergroups-add-channels",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.usergroups.addChannels",
    },
    effect: "write",
    description: "Add one or more default channels to an IDP group.",
    tags: ["admin.usergroups", "admin"],
    security: [
      {
        slackAuth: ["admin.usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsergroupsAddChannelsRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsergroupsAddChannelsResponse",
    },
  },
  {
    id: "admin_usergroups_addTeams",
    command: "admin-usergroups-add-teams",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.usergroups.addTeams",
    },
    effect: "write",
    description: "Associate one or more default workspaces with an organization-wide IDP group.",
    tags: ["admin.usergroups", "admin"],
    security: [
      {
        slackAuth: ["admin.teams:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.teams:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsergroupsAddTeamsRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsergroupsAddTeamsResponse",
    },
  },
  {
    id: "admin_usergroups_listChannels",
    command: "admin-usergroups-list-channels-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.usergroups.listChannels",
    },
    effect: "read",
    description: "List the channels linked to an org-level IDP group (user group).",
    tags: ["admin.usergroups", "admin"],
    security: [
      {
        slackAuth: ["admin.usergroups:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.usergroups:read`",
      },
      {
        name: "usergroup_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID of the IDP group to list default channels for.",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "ID of the the workspace.",
      },
      {
        name: "include_num_members",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Flag to include or exclude the count of members per channel.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminUsergroupsListChannelsResponse",
    },
  },
  {
    id: "admin_usergroups_removeChannels",
    command: "admin-usergroups-remove-channels",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.usergroups.removeChannels",
    },
    effect: "write",
    description: "Remove one or more default channels from an org-level IDP group (user group).",
    tags: ["admin.usergroups", "admin"],
    security: [
      {
        slackAuth: ["admin.usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsergroupsRemoveChannelsRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsergroupsRemoveChannelsResponse",
    },
  },
  {
    id: "admin_users_assign",
    command: "admin-users-assign",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.assign",
    },
    effect: "write",
    description: "Add an Enterprise user to a workspace.",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersAssignRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersAssignResponse",
    },
  },
  {
    id: "admin_users_invite",
    command: "admin-users-invite",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.invite",
    },
    effect: "write",
    description: "Invite a user to a workspace.",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersInviteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersInviteResponse",
    },
  },
  {
    id: "admin_users_list",
    command: "admin-users-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/admin.users.list",
    },
    effect: "read",
    description: "List users on a workspace",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:read`",
      },
      {
        name: "team_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The ID (`T1234`) of the workspace.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "Limit for how many users to be retrieved per page",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AdminUsersListResponse",
    },
  },
  {
    id: "admin_users_remove",
    command: "admin-users-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.remove",
    },
    effect: "write",
    description: "Remove a user from a workspace.",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersRemoveResponse",
    },
  },
  {
    id: "admin_users_session_invalidate",
    command: "admin-users-session-invalidate",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.session.invalidate",
    },
    effect: "write",
    description: "Invalidate a single session for a user by session_id",
    tags: ["admin.users.session", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersSessionInvalidateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersSessionInvalidateResponse",
    },
  },
  {
    id: "admin_users_session_reset",
    command: "admin-users-session-reset",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.session.reset",
    },
    effect: "write",
    description: "Wipes all valid sessions on all devices for a given user",
    tags: ["admin.users.session", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersSessionResetRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersSessionResetResponse",
    },
  },
  {
    id: "admin_users_setAdmin",
    command: "admin-users-set-admin",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.setAdmin",
    },
    effect: "write",
    description: "Set an existing guest, regular user, or owner to be an admin user.",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersSetAdminRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersSetAdminResponse",
    },
  },
  {
    id: "admin_users_setExpiration",
    command: "admin-users-set-expiration",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.setExpiration",
    },
    effect: "write",
    description: "Set an expiration for a guest user",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersSetExpirationRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersSetExpirationResponse",
    },
  },
  {
    id: "admin_users_setOwner",
    command: "admin-users-set-owner",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.setOwner",
    },
    effect: "write",
    description: "Set an existing guest, regular user, or admin user to be a workspace owner.",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersSetOwnerRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersSetOwnerResponse",
    },
  },
  {
    id: "admin_users_setRegular",
    command: "admin-users-set-regular",
    binding: {
      kind: "http",
      method: "POST",
      path: "/admin.users.setRegular",
    },
    effect: "write",
    description: "Set an existing guest user, admin user, or owner to be a regular user.",
    tags: ["admin.users", "admin"],
    security: [
      {
        slackAuth: ["admin.users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin.users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "AdminUsersSetRegularRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "AdminUsersSetRegularResponse",
    },
  },
  {
    id: "api_test",
    command: "api-test-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/api.test",
    },
    effect: "read",
    description: "Checks API calling code.",
    tags: ["api"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "error",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Error response to return",
      },
      {
        name: "foo",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "example property to return",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ApiTestResponse",
    },
  },
  {
    id: "apps_event_authorizations_list",
    command: "apps-event-authorizations-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.event.authorizations.list",
    },
    effect: "read",
    description:
      "Get a list of authorizations for the given event context. Each authorization represents an app installation that the event is visible to.",
    tags: ["apps.event.authorizations", "apps"],
    security: [
      {
        slackAuth: ["authorizations:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `authorizations:read`",
      },
      {
        name: "event_context",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsEventAuthorizationsListResponse",
    },
  },
  {
    id: "apps_permissions_info",
    command: "apps-permissions-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.permissions.info",
    },
    effect: "read",
    description: "Returns list of permissions this app has on a team.",
    tags: ["apps.permissions", "apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsPermissionsInfoResponse",
    },
  },
  {
    id: "apps_permissions_request",
    command: "apps-permissions-request-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.permissions.request",
    },
    effect: "read",
    description: "Allows an app to request additional scopes",
    tags: ["apps.permissions", "apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "scopes",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A comma separated list of scopes to request for",
      },
      {
        name: "trigger_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Token used to trigger the permissions API",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsPermissionsRequestResponse",
    },
  },
  {
    id: "apps_permissions_resources_list",
    command: "apps-permissions-resources-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.permissions.resources.list",
    },
    effect: "read",
    description: "Returns list of resource grants this app has on a team.",
    tags: ["apps.permissions.resources", "apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "response_metadata.next_cursor",
      items: "resources",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsPermissionsResourcesListResponse",
    },
  },
  {
    id: "apps_permissions_scopes_list",
    command: "apps-permissions-scopes-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.permissions.scopes.list",
    },
    effect: "read",
    description: "Returns list of scopes this app has on a team.",
    tags: ["apps.permissions.scopes", "apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsPermissionsScopesListResponse",
    },
  },
  {
    id: "apps_permissions_users_list",
    command: "apps-permissions-users-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.permissions.users.list",
    },
    effect: "read",
    description: "Returns list of user grants and corresponding scopes this app has on a team.",
    tags: ["apps.permissions.users", "apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsPermissionsUsersListResponse",
    },
  },
  {
    id: "apps_permissions_users_request",
    command: "apps-permissions-users-request-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.permissions.users.request",
    },
    effect: "read",
    description: "Enables an app to trigger a permissions modal to grant an app access to a user access scope.",
    tags: ["apps.permissions.users", "apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "scopes",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A comma separated list of user scopes to request for",
      },
      {
        name: "trigger_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Token used to trigger the request",
      },
      {
        name: "user",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The user this scope is being requested for",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsPermissionsUsersRequestResponse",
    },
  },
  {
    id: "apps_uninstall",
    command: "apps-uninstall-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/apps.uninstall",
    },
    effect: "read",
    description: "Uninstalls your app from a workspace.",
    tags: ["apps"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "client_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "client_secret",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AppsUninstallResponse",
    },
  },
  {
    id: "auth_revoke",
    command: "auth-revoke-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/auth.revoke",
    },
    effect: "read",
    description: "Revokes a token.",
    tags: ["auth"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "test",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Setting this parameter to `1` triggers a _testing mode_ where the specified token will not actually be revoked.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AuthRevokeResponse",
    },
  },
  {
    id: "auth_test",
    command: "auth-test-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/auth.test",
    },
    effect: "read",
    description: "Checks authentication & identity.",
    tags: ["auth"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "AuthTestResponse",
    },
  },
  {
    id: "bots_info",
    command: "bots-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/bots.info",
    },
    effect: "read",
    description: "Gets information about a bot user.",
    tags: ["bots"],
    security: [
      {
        slackAuth: ["users:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:read`",
      },
      {
        name: "bot",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Bot user to get info on",
      },
    ],
    response: {
      confidence: "contract",
      schema: "BotsInfoResponse",
    },
  },
  {
    id: "calls_add",
    command: "calls-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/calls.add",
    },
    effect: "write",
    description: "Registers a new Call.",
    tags: ["calls"],
    security: [
      {
        slackAuth: ["calls:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `calls:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "CallsAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "CallsAddResponse",
    },
  },
  {
    id: "calls_end",
    command: "calls-end",
    binding: {
      kind: "http",
      method: "POST",
      path: "/calls.end",
    },
    effect: "write",
    description: "Ends a Call.",
    tags: ["calls"],
    security: [
      {
        slackAuth: ["calls:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `calls:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "CallsEndRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "CallsEndResponse",
    },
  },
  {
    id: "calls_info",
    command: "calls-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/calls.info",
    },
    effect: "read",
    description: "Returns information about a Call.",
    tags: ["calls"],
    security: [
      {
        slackAuth: ["calls:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `calls:read`",
      },
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "`id` of the Call returned by the [`calls.add`](/methods/calls.add) method.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CallsInfoResponse",
    },
  },
  {
    id: "calls_participants_add",
    command: "calls-participants-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/calls.participants.add",
    },
    effect: "write",
    description: "Registers new participants added to a Call.",
    tags: ["calls.participants", "calls"],
    security: [
      {
        slackAuth: ["calls:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `calls:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "CallsParticipantsAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "CallsParticipantsAddResponse",
    },
  },
  {
    id: "calls_participants_remove",
    command: "calls-participants-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/calls.participants.remove",
    },
    effect: "write",
    description: "Registers participants removed from a Call.",
    tags: ["calls.participants", "calls"],
    security: [
      {
        slackAuth: ["calls:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `calls:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "CallsParticipantsRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "CallsParticipantsRemoveResponse",
    },
  },
  {
    id: "calls_update",
    command: "calls-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/calls.update",
    },
    effect: "write",
    description: "Updates information about a Call.",
    tags: ["calls"],
    security: [
      {
        slackAuth: ["calls:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `calls:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "CallsUpdateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "CallsUpdateResponse",
    },
  },
  {
    id: "chat_delete",
    command: "chat-delete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.delete",
    },
    effect: "write",
    description: "Deletes a message.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatDeleteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatDeleteResponse",
    },
  },
  {
    id: "chat_deleteScheduledMessage",
    command: "chat-delete-scheduled-message",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.deleteScheduledMessage",
    },
    effect: "write",
    description: "Deletes a pending scheduled message from the queue.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatDeleteScheduledMessageRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatDeleteScheduledMessageResponse",
    },
  },
  {
    id: "chat_getPermalink",
    command: "chat-get-permalink-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/chat.getPermalink",
    },
    effect: "read",
    description: "Retrieve a permalink URL for a specific extant message",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "channel",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The ID of the conversation or channel containing the message",
      },
      {
        name: "message_ts",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A message's `ts` value, uniquely identifying it within a channel",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ChatGetPermalinkResponse",
    },
  },
  {
    id: "chat_meMessage",
    command: "chat-me-message",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.meMessage",
    },
    effect: "write",
    description: "Share a me message into a channel.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatMeMessageRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatMeMessageResponse",
    },
  },
  {
    id: "chat_postEphemeral",
    command: "chat-post-ephemeral",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.postEphemeral",
    },
    effect: "write",
    description: "Sends an ephemeral message to a user in a channel.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatPostEphemeralRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatPostEphemeralResponse",
    },
  },
  {
    id: "chat_postMessage",
    command: "chat-post-message",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.postMessage",
    },
    effect: "write",
    description: "Sends a message to a channel.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatPostMessageRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatPostMessageResponse",
    },
  },
  {
    id: "chat_scheduleMessage",
    command: "chat-schedule-message",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.scheduleMessage",
    },
    effect: "write",
    description: "Schedules a message to be sent to a channel.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatScheduleMessageRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatScheduleMessageResponse",
    },
  },
  {
    id: "chat_scheduledMessages_list",
    command: "chat-scheduled-messages-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/chat.scheduledMessages.list",
    },
    effect: "read",
    description: "Returns a list of scheduled messages.",
    tags: ["chat.scheduledMessages", "chat"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "response_metadata.next_cursor",
      items: "scheduled_messages",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The channel of the scheduled messages",
      },
      {
        name: "latest",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "A UNIX timestamp of the latest value in the time range",
      },
      {
        name: "oldest",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "A UNIX timestamp of the oldest value in the time range",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "Maximum number of original entries to return.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ChatScheduledMessagesListResponse",
    },
  },
  {
    id: "chat_unfurl",
    command: "chat-unfurl",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.unfurl",
    },
    effect: "write",
    description: "Provide custom unfurl behavior for user-posted URLs",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["links:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `links:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatUnfurlRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatUnfurlResponse",
    },
  },
  {
    id: "chat_update",
    command: "chat-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/chat.update",
    },
    effect: "write",
    description: "Updates a message.",
    tags: ["chat"],
    security: [
      {
        slackAuth: ["chat:write:user", "chat:write:bot"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `chat:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ChatUpdateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ChatUpdateResponse",
    },
  },
  {
    id: "conversations_archive",
    command: "conversations-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.archive",
    },
    effect: "write",
    description: "Archives a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsArchiveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsArchiveResponse",
    },
  },
  {
    id: "conversations_close",
    command: "conversations-close",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.close",
    },
    effect: "write",
    description: "Closes a direct message or multi-person direct message.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsCloseRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsCloseResponse",
    },
  },
  {
    id: "conversations_create",
    command: "conversations-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.create",
    },
    effect: "write",
    description: "Initiates a public or private channel-based conversation",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsCreateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsCreateResponse",
    },
  },
  {
    id: "conversations_history",
    command: "conversations-history-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/conversations.history",
    },
    effect: "read",
    description: "Fetches a conversation's history of messages and events.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:history", "groups:history", "im:history", "mpim:history"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:history`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Conversation ID to fetch history for.",
      },
      {
        name: "latest",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "End of time range of messages to include in results.",
      },
      {
        name: "oldest",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "Start of time range of messages to include in results.",
      },
      {
        name: "inclusive",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Include messages with latest or oldest timestamp in results only when either timestamp is specified.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "ConversationsHistoryResponse",
    },
  },
  {
    id: "conversations_info",
    command: "conversations-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/conversations.info",
    },
    effect: "read",
    description: "Retrieve information about a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:read", "groups:read", "im:read", "mpim:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:read`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Conversation ID to learn more about",
      },
      {
        name: "include_locale",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Set this to `true` to receive the locale for this conversation. Defaults to `false`",
      },
      {
        name: "include_num_members",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Set to `true` to include the member count for the specified conversation. Defaults to `false`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ConversationsInfoResponse",
    },
  },
  {
    id: "conversations_invite",
    command: "conversations-invite",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.invite",
    },
    effect: "write",
    description: "Invites users to a channel.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsInviteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsInviteResponse",
    },
  },
  {
    id: "conversations_join",
    command: "conversations-join",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.join",
    },
    effect: "write",
    description: "Joins an existing conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `channels:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsJoinRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsJoinResponse",
    },
  },
  {
    id: "conversations_kick",
    command: "conversations-kick",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.kick",
    },
    effect: "write",
    description: "Removes a user from a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsKickRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsKickResponse",
    },
  },
  {
    id: "conversations_leave",
    command: "conversations-leave",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.leave",
    },
    effect: "write",
    description: "Leaves a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsLeaveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsLeaveResponse",
    },
  },
  {
    id: "conversations_list",
    command: "conversations-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/conversations.list",
    },
    effect: "read",
    description: "Lists all channels in a Slack team.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:read", "groups:read", "im:read", "mpim:read"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "response_metadata.next_cursor",
      items: "channels",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:read`",
      },
      {
        name: "exclude_archived",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Set to `true` to exclude archived channels from the list",
      },
      {
        name: "types",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "ConversationsListResponse",
    },
  },
  {
    id: "conversations_mark",
    command: "conversations-mark",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.mark",
    },
    effect: "write",
    description: "Sets the read cursor in a channel.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsMarkRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsMarkResponse",
    },
  },
  {
    id: "conversations_members",
    command: "conversations-members-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/conversations.members",
    },
    effect: "read",
    description: "Retrieve members of a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:read", "groups:read", "im:read", "mpim:read"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "response_metadata.next_cursor",
      items: "members",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:read`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "ID of the conversation to retrieve members for",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "ConversationsMembersResponse",
    },
  },
  {
    id: "conversations_open",
    command: "conversations-open",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.open",
    },
    effect: "write",
    description: "Opens or resumes a direct message or multi-person direct message.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsOpenRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsOpenResponse",
    },
  },
  {
    id: "conversations_rename",
    command: "conversations-rename",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.rename",
    },
    effect: "write",
    description: "Renames a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsRenameRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsRenameResponse",
    },
  },
  {
    id: "conversations_replies",
    command: "conversations-replies-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/conversations.replies",
    },
    effect: "read",
    description: "Retrieve a thread of messages posted to a conversation",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:history", "groups:history", "im:history", "mpim:history"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:history`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Conversation ID to fetch thread from.",
      },
      {
        name: "ts",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description:
          "Unique identifier of a thread's parent message. `ts` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by `ts` will return - it is just an ordinary, unthreaded message.",
      },
      {
        name: "latest",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "End of time range of messages to include in results.",
      },
      {
        name: "oldest",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "Start of time range of messages to include in results.",
      },
      {
        name: "inclusive",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Include messages with latest or oldest timestamp in results only when either timestamp is specified.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "ConversationsRepliesResponse",
    },
  },
  {
    id: "conversations_setPurpose",
    command: "conversations-set-purpose",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.setPurpose",
    },
    effect: "write",
    description: "Sets the purpose for a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsSetPurposeRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsSetPurposeResponse",
    },
  },
  {
    id: "conversations_setTopic",
    command: "conversations-set-topic",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.setTopic",
    },
    effect: "write",
    description: "Sets the topic for a conversation.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsSetTopicRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsSetTopicResponse",
    },
  },
  {
    id: "conversations_unarchive",
    command: "conversations-unarchive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/conversations.unarchive",
    },
    effect: "write",
    description: "Reverses conversation archival.",
    tags: ["conversations"],
    security: [
      {
        slackAuth: ["channels:write", "groups:write", "im:write", "mpim:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ConversationsUnarchiveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ConversationsUnarchiveResponse",
    },
  },
  {
    id: "dialog_open",
    command: "dialog-open-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/dialog.open",
    },
    effect: "read",
    description: "Open a dialog with a user",
    tags: ["dialog"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "dialog",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The dialog definition. This must be a JSON-encoded string.",
      },
      {
        name: "trigger_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Exchange a trigger to post to the user.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "DialogOpenResponse",
    },
  },
  {
    id: "dnd_endDnd",
    command: "dnd-end-dnd",
    binding: {
      kind: "http",
      method: "POST",
      path: "/dnd.endDnd",
    },
    effect: "write",
    description: "Ends the current user's Do Not Disturb session immediately.",
    tags: ["dnd"],
    security: [
      {
        slackAuth: ["dnd:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `dnd:write`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "DndEndDndResponse",
    },
  },
  {
    id: "dnd_endSnooze",
    command: "dnd-end-snooze",
    binding: {
      kind: "http",
      method: "POST",
      path: "/dnd.endSnooze",
    },
    effect: "write",
    description: "Ends the current user's snooze mode immediately.",
    tags: ["dnd"],
    security: [
      {
        slackAuth: ["dnd:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `dnd:write`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "DndEndSnoozeResponse",
    },
  },
  {
    id: "dnd_info",
    command: "dnd-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/dnd.info",
    },
    effect: "read",
    description: "Retrieves a user's current Do Not Disturb status.",
    tags: ["dnd"],
    security: [
      {
        slackAuth: ["dnd:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `dnd:read`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "User to fetch status for (defaults to current user)",
      },
    ],
    response: {
      confidence: "contract",
      schema: "DndInfoResponse",
    },
  },
  {
    id: "dnd_setSnooze",
    command: "dnd-set-snooze",
    binding: {
      kind: "http",
      method: "POST",
      path: "/dnd.setSnooze",
    },
    effect: "write",
    description: "Turns on Do Not Disturb mode for the current user, or changes its duration.",
    tags: ["dnd"],
    security: [
      {
        slackAuth: ["dnd:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "DndSetSnoozeRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "DndSetSnoozeResponse",
    },
  },
  {
    id: "dnd_teamInfo",
    command: "dnd-team-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/dnd.teamInfo",
    },
    effect: "read",
    description: "Retrieves the Do Not Disturb status for up to 50 users on a team.",
    tags: ["dnd"],
    security: [
      {
        slackAuth: ["dnd:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `dnd:read`",
      },
      {
        name: "users",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Comma-separated list of users to fetch Do Not Disturb status for",
      },
    ],
    response: {
      confidence: "contract",
      schema: "DndTeamInfoResponse",
    },
  },
  {
    id: "emoji_list",
    command: "emoji-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/emoji.list",
    },
    effect: "read",
    description: "Lists custom emoji for a team.",
    tags: ["emoji"],
    security: [
      {
        slackAuth: ["emoji:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `emoji:read`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "EmojiListResponse",
    },
  },
  {
    id: "files_comments_delete",
    command: "files-comments-delete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.comments.delete",
    },
    effect: "write",
    description: "Deletes an existing comment on a file.",
    tags: ["files.comments", "files"],
    security: [
      {
        slackAuth: ["files:write:user"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `files:write:user`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesCommentsDeleteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesCommentsDeleteResponse",
    },
  },
  {
    id: "files_delete",
    command: "files-delete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.delete",
    },
    effect: "write",
    description: "Deletes a file.",
    tags: ["files"],
    security: [
      {
        slackAuth: ["files:write:user"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `files:write:user`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesDeleteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesDeleteResponse",
    },
  },
  {
    id: "files_info",
    command: "files-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/files.info",
    },
    effect: "read",
    description: "Gets information about a file.",
    tags: ["files"],
    security: [
      {
        slackAuth: ["files:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `files:read`",
      },
      {
        name: "file",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Specify a file by providing its ID.",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Parameter for pagination. File comments are paginated for a single file. Set `cursor` equal to the `next_cursor` attribute returned by the previous request\'s `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection of comments. See [pagination](/docs/pagination) for more details.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "FilesInfoResponse",
    },
  },
  {
    id: "files_list",
    command: "files-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/files.list",
    },
    effect: "read",
    description: "List for a team, in a channel, or from a user with applied filters.",
    tags: ["files"],
    security: [
      {
        slackAuth: ["files:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `files:read`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter files created by a single user.",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter files appearing in a specific channel, indicated by its ID.",
      },
      {
        name: "ts_from",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "Filter files created after this timestamp (inclusive).",
      },
      {
        name: "ts_to",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "Filter files created before this timestamp (inclusive).",
      },
      {
        name: "types",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Filter files by type ([see below](#file_types)). You can pass multiple values in the types argument, like `types=spaces,snippets`.The default value is `all`, which does not filter the list.",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "show_files_hidden_by_limit",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "FilesListResponse",
    },
  },
  {
    id: "files_remote_add",
    command: "files-remote-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.remote.add",
    },
    effect: "write",
    description: "Adds a file from a remote service",
    tags: ["files.remote", "files"],
    security: [
      {
        slackAuth: ["remote_files:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesRemoteAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesRemoteAddResponse",
    },
  },
  {
    id: "files_remote_info",
    command: "files-remote-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/files.remote.info",
    },
    effect: "read",
    description: "Retrieve information about a remote file added to Slack",
    tags: ["files.remote", "files"],
    security: [
      {
        slackAuth: ["remote_files:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `remote_files:read`",
      },
      {
        name: "file",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Specify a file by providing its ID.",
      },
      {
        name: "external_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Creator defined GUID for the file.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "FilesRemoteInfoResponse",
    },
  },
  {
    id: "files_remote_list",
    command: "files-remote-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/files.remote.list",
    },
    effect: "read",
    description: "Retrieve information about a remote file added to Slack",
    tags: ["files.remote", "files"],
    security: [
      {
        slackAuth: ["remote_files:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `remote_files:read`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter files appearing in a specific channel, indicated by its ID.",
      },
      {
        name: "ts_from",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "Filter files created after this timestamp (inclusive).",
      },
      {
        name: "ts_to",
        in: "query",
        required: false,
        schema: {
          type: "number",
        },
        description: "Filter files created before this timestamp (inclusive).",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: "The maximum number of items to return.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "FilesRemoteListResponse",
    },
  },
  {
    id: "files_remote_remove",
    command: "files-remote-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.remote.remove",
    },
    effect: "write",
    description: "Remove a remote file.",
    tags: ["files.remote", "files"],
    security: [
      {
        slackAuth: ["remote_files:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesRemoteRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesRemoteRemoveResponse",
    },
  },
  {
    id: "files_remote_share",
    command: "files-remote-share-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/files.remote.share",
    },
    effect: "read",
    description: "Share a remote file into a channel.",
    tags: ["files.remote", "files"],
    security: [
      {
        slackAuth: ["remote_files:share"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `remote_files:share`",
      },
      {
        name: "file",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Specify a file registered with Slack by providing its ID. Either this field or `external_id` or both are required.",
      },
      {
        name: "external_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or `file` or both are required.",
      },
      {
        name: "channels",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Comma-separated list of channel IDs where the file will be shared.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "FilesRemoteShareResponse",
    },
  },
  {
    id: "files_remote_update",
    command: "files-remote-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.remote.update",
    },
    effect: "write",
    description: "Updates an existing remote file.",
    tags: ["files.remote", "files"],
    security: [
      {
        slackAuth: ["remote_files:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesRemoteUpdateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesRemoteUpdateResponse",
    },
  },
  {
    id: "files_revokePublicURL",
    command: "files-revoke-public-url",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.revokePublicURL",
    },
    effect: "write",
    description: "Revokes public/external sharing access for a file",
    tags: ["files"],
    security: [
      {
        slackAuth: ["files:write:user"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `files:write:user`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesRevokePublicURLRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesRevokePublicURLResponse",
    },
  },
  {
    id: "files_sharedPublicURL",
    command: "files-shared-public-url",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.sharedPublicURL",
    },
    effect: "write",
    description: "Enables a file for public/external sharing.",
    tags: ["files"],
    security: [
      {
        slackAuth: ["files:write:user"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `files:write:user`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesSharedPublicURLRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesSharedPublicURLResponse",
    },
  },
  {
    id: "files_upload",
    command: "files-upload",
    binding: {
      kind: "http",
      method: "POST",
      path: "/files.upload",
    },
    effect: "write",
    description: "Uploads or creates a file.",
    tags: ["files"],
    security: [
      {
        slackAuth: ["files:write:user"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "FilesUploadRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "FilesUploadResponse",
    },
  },
  {
    id: "migration_exchange",
    command: "migration-exchange-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/migration.exchange",
    },
    effect: "read",
    description: "For Enterprise Grid workspaces, map local user IDs to global user IDs",
    tags: ["migration"],
    security: [
      {
        slackAuth: ["tokens.basic"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `tokens.basic`",
      },
      {
        name: "users",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A comma-separated list of user ids, up to 400 per request",
      },
      {
        name: "team_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Specify team_id starts with `T` in case of Org Token",
      },
      {
        name: "to_old",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "MigrationExchangeResponse",
    },
  },
  {
    id: "oauth_access",
    command: "oauth-access-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/oauth.access",
    },
    effect: "read",
    description: "Exchanges a temporary OAuth verifier code for an access token.",
    tags: ["oauth"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "client_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "client_secret",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "code",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The `code` param returned via the OAuth callback.",
      },
      {
        name: "redirect_uri",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "This must match the originally submitted URI (if one was sent).",
      },
      {
        name: "single_channel",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://api.slack.com/legacy-workspace-apps).",
      },
    ],
    response: {
      confidence: "contract",
      schema: "OauthAccessResponse",
    },
  },
  {
    id: "oauth_token",
    command: "oauth-token-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/oauth.token",
    },
    effect: "read",
    description: "Exchanges a temporary OAuth verifier code for a workspace token.",
    tags: ["oauth"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "client_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "client_secret",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "code",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The `code` param returned via the OAuth callback.",
      },
      {
        name: "redirect_uri",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "This must match the originally submitted URI (if one was sent).",
      },
      {
        name: "single_channel",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Request the user to add your app only to a single channel.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "OauthTokenResponse",
    },
  },
  {
    id: "oauth_v2_access",
    command: "oauth-v2-access-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/oauth.v2.access",
    },
    effect: "read",
    description: "Exchanges a temporary OAuth verifier code for an access token.",
    tags: ["oauth.v2", "oauth"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "client_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "client_secret",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Issued when you created your application.",
      },
      {
        name: "code",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The `code` param returned via the OAuth callback.",
      },
      {
        name: "redirect_uri",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "This must match the originally submitted URI (if one was sent).",
      },
    ],
    response: {
      confidence: "contract",
      schema: "OauthV2AccessResponse",
    },
  },
  {
    id: "pins_add",
    command: "pins-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/pins.add",
    },
    effect: "write",
    description: "Pins an item to a channel.",
    tags: ["pins"],
    security: [
      {
        slackAuth: ["pins:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `pins:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "PinsAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "PinsAddResponse",
    },
  },
  {
    id: "pins_list",
    command: "pins-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/pins.list",
    },
    effect: "read",
    description: "Lists items pinned to a channel.",
    tags: ["pins"],
    security: [
      {
        slackAuth: ["pins:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `pins:read`",
      },
      {
        name: "channel",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Channel to get pinned items for.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "PinsListResponse",
    },
  },
  {
    id: "pins_remove",
    command: "pins-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/pins.remove",
    },
    effect: "write",
    description: "Un-pins an item from a channel.",
    tags: ["pins"],
    security: [
      {
        slackAuth: ["pins:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `pins:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "PinsRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "PinsRemoveResponse",
    },
  },
  {
    id: "reactions_add",
    command: "reactions-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/reactions.add",
    },
    effect: "write",
    description: "Adds a reaction to an item.",
    tags: ["reactions"],
    security: [
      {
        slackAuth: ["reactions:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reactions:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ReactionsAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ReactionsAddResponse",
    },
  },
  {
    id: "reactions_get",
    command: "reactions-get-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/reactions.get",
    },
    effect: "read",
    description: "Gets reactions for an item.",
    tags: ["reactions"],
    security: [
      {
        slackAuth: ["reactions:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reactions:read`",
      },
      {
        name: "channel",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Channel where the message to get reactions for was posted.",
      },
      {
        name: "file",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "File to get reactions for.",
      },
      {
        name: "file_comment",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "File comment to get reactions for.",
      },
      {
        name: "full",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "If true always return the complete reaction list.",
      },
      {
        name: "timestamp",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Timestamp of the message to get reactions for.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ReactionsGetResponse",
    },
  },
  {
    id: "reactions_list",
    command: "reactions-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/reactions.list",
    },
    effect: "read",
    description: "Lists reactions made by a user.",
    tags: ["reactions"],
    security: [
      {
        slackAuth: ["reactions:read"],
      },
    ],
    pagination: {
      style: "page",
      page: {
        in: "query",
        name: "page",
      },
      limit: {
        in: "query",
        name: "limit",
      },
      items: "items",
    },
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reactions:read`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Show reactions made by this user. Defaults to the authed user.",
      },
      {
        name: "full",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "If true always return the complete reaction list.",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request\'s `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](/docs/pagination) for more details.',
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ReactionsListResponse",
    },
  },
  {
    id: "reactions_remove",
    command: "reactions-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/reactions.remove",
    },
    effect: "write",
    description: "Removes a reaction from an item.",
    tags: ["reactions"],
    security: [
      {
        slackAuth: ["reactions:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reactions:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "ReactionsRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "ReactionsRemoveResponse",
    },
  },
  {
    id: "reminders_add",
    command: "reminders-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/reminders.add",
    },
    effect: "write",
    description: "Creates a reminder.",
    tags: ["reminders"],
    security: [
      {
        slackAuth: ["reminders:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reminders:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "RemindersAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "RemindersAddResponse",
    },
  },
  {
    id: "reminders_complete",
    command: "reminders-complete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/reminders.complete",
    },
    effect: "write",
    description: "Marks a reminder as complete.",
    tags: ["reminders"],
    security: [
      {
        slackAuth: ["reminders:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reminders:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "RemindersCompleteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "RemindersCompleteResponse",
    },
  },
  {
    id: "reminders_delete",
    command: "reminders-delete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/reminders.delete",
    },
    effect: "write",
    description: "Deletes a reminder.",
    tags: ["reminders"],
    security: [
      {
        slackAuth: ["reminders:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reminders:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "RemindersDeleteRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "RemindersDeleteResponse",
    },
  },
  {
    id: "reminders_info",
    command: "reminders-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/reminders.info",
    },
    effect: "read",
    description: "Gets information about a reminder.",
    tags: ["reminders"],
    security: [
      {
        slackAuth: ["reminders:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reminders:read`",
      },
      {
        name: "reminder",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The ID of the reminder",
      },
    ],
    response: {
      confidence: "contract",
      schema: "RemindersInfoResponse",
    },
  },
  {
    id: "reminders_list",
    command: "reminders-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/reminders.list",
    },
    effect: "read",
    description: "Lists all reminders created by or for a given user.",
    tags: ["reminders"],
    security: [
      {
        slackAuth: ["reminders:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `reminders:read`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "RemindersListResponse",
    },
  },
  {
    id: "rtm_connect",
    command: "rtm-connect-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/rtm.connect",
    },
    effect: "read",
    description: "Starts a Real Time Messaging session.",
    tags: ["rtm"],
    security: [
      {
        slackAuth: ["rtm:stream"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `rtm:stream`",
      },
      {
        name: "batch_presence_aware",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Batch presence deliveries via subscription. Enabling changes the shape of `presence_change` events. See [batch presence](/docs/presence-and-status#batching).",
      },
      {
        name: "presence_sub",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description:
          "Only deliver presence events when requested by subscription. See [presence subscriptions](/docs/presence-and-status#subscriptions).",
      },
    ],
    response: {
      confidence: "contract",
      schema: "RtmConnectResponse",
    },
  },
  {
    id: "search_messages",
    command: "search-messages-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/search.messages",
    },
    effect: "read",
    description: "Searches for messages matching a query.",
    tags: ["search"],
    security: [
      {
        slackAuth: ["search:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `search:read`",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description: 'Pass the number of results you want per "page". Maximum of `100`.',
      },
      {
        name: "highlight",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Pass a value of `true` to enable query highlight markers (see below).",
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
      },
      {
        name: "query",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Search query.",
      },
      {
        name: "sort",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Return matches sorted by either `score` or `timestamp`.",
      },
      {
        name: "sort_dir",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Change sort direction to ascending (`asc`) or descending (`desc`).",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SearchMessagesResponse",
    },
  },
  {
    id: "stars_add",
    command: "stars-add",
    binding: {
      kind: "http",
      method: "POST",
      path: "/stars.add",
    },
    effect: "write",
    description: "Adds a star to an item.",
    tags: ["stars"],
    security: [
      {
        slackAuth: ["stars:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `stars:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "StarsAddRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "StarsAddResponse",
    },
  },
  {
    id: "stars_list",
    command: "stars-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/stars.list",
    },
    effect: "read",
    description: "Lists stars for a user.",
    tags: ["stars"],
    security: [
      {
        slackAuth: ["stars:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `stars:read`",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request\'s `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](/docs/pagination) for more details.',
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "StarsListResponse",
    },
  },
  {
    id: "stars_remove",
    command: "stars-remove",
    binding: {
      kind: "http",
      method: "POST",
      path: "/stars.remove",
    },
    effect: "write",
    description: "Removes a star from an item.",
    tags: ["stars"],
    security: [
      {
        slackAuth: ["stars:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `stars:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "StarsRemoveRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "StarsRemoveResponse",
    },
  },
  {
    id: "team_accessLogs",
    command: "team-access-logs-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/team.accessLogs",
    },
    effect: "read",
    description: "Gets the access logs for the current team.",
    tags: ["team"],
    security: [
      {
        slackAuth: ["admin"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin`",
      },
      {
        name: "before",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "End of time range of logs to include in results (inclusive).",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "TeamAccessLogsResponse",
    },
  },
  {
    id: "team_billableInfo",
    command: "team-billable-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/team.billableInfo",
    },
    effect: "read",
    description: "Gets billable users information for the current team.",
    tags: ["team"],
    security: [
      {
        slackAuth: ["admin"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A user to retrieve the billable information for. Defaults to all users.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "TeamBillableInfoResponse",
    },
  },
  {
    id: "team_info",
    command: "team-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/team.info",
    },
    effect: "read",
    description: "Gets information about the current team.",
    tags: ["team"],
    security: [
      {
        slackAuth: ["team:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `team:read`",
      },
      {
        name: "team",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Team to get info on, if omitted, will return information about the current team. Will only return team that the authenticated token is allowed to see through external shared channels",
      },
    ],
    response: {
      confidence: "contract",
      schema: "TeamInfoResponse",
    },
  },
  {
    id: "team_integrationLogs",
    command: "team-integration-logs-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/team.integrationLogs",
    },
    effect: "read",
    description: "Gets the integration logs for the current team.",
    tags: ["team"],
    security: [
      {
        slackAuth: ["admin"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `admin`",
      },
      {
        name: "app_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter logs to this Slack app. Defaults to all logs.",
      },
      {
        name: "change_type",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter logs with this change type. Defaults to all logs.",
      },
      {
        name: "count",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
      {
        name: "service_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter logs to this service. Defaults to all logs.",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter logs generated by this user’s actions. Defaults to all logs.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "TeamIntegrationLogsResponse",
    },
  },
  {
    id: "team_profile_get",
    command: "team-profile-get-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/team.profile.get",
    },
    effect: "read",
    description: "Retrieve a team's profile.",
    tags: ["team.profile", "team"],
    security: [
      {
        slackAuth: ["users.profile:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users.profile:read`",
      },
      {
        name: "visibility",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter by visibility.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "TeamProfileGetResponse",
    },
  },
  {
    id: "usergroups_create",
    command: "usergroups-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/usergroups.create",
    },
    effect: "write",
    description: "Create a User Group",
    tags: ["usergroups"],
    security: [
      {
        slackAuth: ["usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsergroupsCreateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsergroupsCreateResponse",
    },
  },
  {
    id: "usergroups_disable",
    command: "usergroups-disable",
    binding: {
      kind: "http",
      method: "POST",
      path: "/usergroups.disable",
    },
    effect: "write",
    description: "Disable an existing User Group",
    tags: ["usergroups"],
    security: [
      {
        slackAuth: ["usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsergroupsDisableRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsergroupsDisableResponse",
    },
  },
  {
    id: "usergroups_enable",
    command: "usergroups-enable",
    binding: {
      kind: "http",
      method: "POST",
      path: "/usergroups.enable",
    },
    effect: "write",
    description: "Enable a User Group",
    tags: ["usergroups"],
    security: [
      {
        slackAuth: ["usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsergroupsEnableRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsergroupsEnableResponse",
    },
  },
  {
    id: "usergroups_list",
    command: "usergroups-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/usergroups.list",
    },
    effect: "read",
    description: "List all User Groups for a team",
    tags: ["usergroups"],
    security: [
      {
        slackAuth: ["usergroups:read"],
      },
    ],
    parameters: [
      {
        name: "include_users",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Include the list of users for each User Group.",
      },
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:read`",
      },
      {
        name: "include_count",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Include the number of users in each User Group.",
      },
      {
        name: "include_disabled",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Include disabled User Groups.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsergroupsListResponse",
    },
  },
  {
    id: "usergroups_update",
    command: "usergroups-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/usergroups.update",
    },
    effect: "write",
    description: "Update an existing User Group",
    tags: ["usergroups"],
    security: [
      {
        slackAuth: ["usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsergroupsUpdateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsergroupsUpdateResponse",
    },
  },
  {
    id: "usergroups_users_list",
    command: "usergroups-users-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/usergroups.users.list",
    },
    effect: "read",
    description: "List all users in a User Group",
    tags: ["usergroups.users", "usergroups"],
    security: [
      {
        slackAuth: ["usergroups:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:read`",
      },
      {
        name: "include_disabled",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Allow results that involve disabled User Groups.",
      },
      {
        name: "usergroup",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "The encoded ID of the User Group to update.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsergroupsUsersListResponse",
    },
  },
  {
    id: "usergroups_users_update",
    command: "usergroups-users-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/usergroups.users.update",
    },
    effect: "write",
    description: "Update the list of users for a User Group",
    tags: ["usergroups.users", "usergroups"],
    security: [
      {
        slackAuth: ["usergroups:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `usergroups:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsergroupsUsersUpdateRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsergroupsUsersUpdateResponse",
    },
  },
  {
    id: "users_conversations",
    command: "users-conversations-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.conversations",
    },
    effect: "read",
    description: "List conversations the calling user may access.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["channels:read", "groups:read", "im:read", "mpim:read"],
      },
    ],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "cursor",
      },
      next: "response_metadata.next_cursor",
      items: "channels",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `conversations:read`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership.",
      },
      {
        name: "types",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`",
      },
      {
        name: "exclude_archived",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Set to `true` to exclude archived channels from the list",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersConversationsResponse",
    },
  },
  {
    id: "users_deletePhoto",
    command: "users-delete-photo",
    binding: {
      kind: "http",
      method: "POST",
      path: "/users.deletePhoto",
    },
    effect: "write",
    description: "Delete the user profile photo",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users.profile:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsersDeletePhotoRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsersDeletePhotoResponse",
    },
  },
  {
    id: "users_getPresence",
    command: "users-get-presence-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.getPresence",
    },
    effect: "read",
    description: "Gets user presence information.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:read`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "User to get presence info on. Defaults to the authed user.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersGetPresenceResponse",
    },
  },
  {
    id: "users_identity",
    command: "users-identity-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.identity",
    },
    effect: "read",
    description: "Get a user's identity.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["identity.basic"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `identity.basic`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersIdentityResponse",
    },
  },
  {
    id: "users_info",
    command: "users-info-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.info",
    },
    effect: "read",
    description: "Gets information about a user.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:read`",
      },
      {
        name: "include_locale",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Set this to `true` to receive the locale for this user. Defaults to `false`",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "User to get info on",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersInfoResponse",
    },
  },
  {
    id: "users_list",
    command: "users-list-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.list",
    },
    effect: "read",
    description: "Lists all users in a Slack team.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:read`",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          type: "integer",
        },
        description:
          "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no `limit` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience `limit_required` or HTTP 500 errors.",
      },
      {
        name: "cursor",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          'Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request\'s `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail.',
      },
      {
        name: "include_locale",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Set this to `true` to receive the locale for users. Defaults to `false`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersListResponse",
    },
  },
  {
    id: "users_lookupByEmail",
    command: "users-lookup-by-email-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.lookupByEmail",
    },
    effect: "read",
    description: "Find a user with an email address.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users:read.email"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:read.email`",
      },
      {
        name: "email",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "An email address belonging to a user in the workspace",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersLookupByEmailResponse",
    },
  },
  {
    id: "users_profile_get",
    command: "users-profile-get-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/users.profile.get",
    },
    effect: "read",
    description: "Retrieves a user's profile information.",
    tags: ["users.profile", "users"],
    security: [
      {
        slackAuth: ["users.profile:read"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users.profile:read`",
      },
      {
        name: "include_labels",
        in: "query",
        required: false,
        schema: {
          type: "boolean",
        },
        description: "Include labels for each ID in custom profile fields",
      },
      {
        name: "user",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "User to retrieve profile info for",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersProfileGetResponse",
    },
  },
  {
    id: "users_profile_set",
    command: "users-profile-set",
    binding: {
      kind: "http",
      method: "POST",
      path: "/users.profile.set",
    },
    effect: "write",
    description: "Set the profile information for a user.",
    tags: ["users.profile", "users"],
    security: [
      {
        slackAuth: ["users.profile:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users.profile:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsersProfileSetRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsersProfileSetResponse",
    },
  },
  {
    id: "users_setActive",
    command: "users-set-active",
    binding: {
      kind: "http",
      method: "POST",
      path: "/users.setActive",
    },
    effect: "write",
    description: "Marked a user as active. Deprecated and non-functional.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:write`",
      },
    ],
    response: {
      confidence: "contract",
      schema: "UsersSetActiveResponse",
    },
  },
  {
    id: "users_setPhoto",
    command: "users-set-photo",
    binding: {
      kind: "http",
      method: "POST",
      path: "/users.setPhoto",
    },
    effect: "write",
    description: "Set the user profile photo",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users.profile:write"],
      },
    ],
    parameters: [],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsersSetPhotoRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsersSetPhotoResponse",
    },
  },
  {
    id: "users_setPresence",
    command: "users-set-presence",
    binding: {
      kind: "http",
      method: "POST",
      path: "/users.setPresence",
    },
    effect: "write",
    description: "Manually sets user presence.",
    tags: ["users"],
    security: [
      {
        slackAuth: ["users:write"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `users:write`",
      },
    ],
    request: {
      required: false,
      confidence: "contract",
      schema: "UsersSetPresenceRequest",
      contentType: "application/x-www-form-urlencoded",
    },
    response: {
      confidence: "contract",
      schema: "UsersSetPresenceResponse",
    },
  },
  {
    id: "views_open",
    command: "views-open-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/views.open",
    },
    effect: "read",
    description: "Open a view for a user.",
    tags: ["views"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "trigger_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Exchange a trigger to post to the user.",
      },
      {
        name: "view",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A [view payload](/reference/surfaces/views). This must be a JSON-encoded string.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ViewsOpenResponse",
    },
  },
  {
    id: "views_publish",
    command: "views-publish-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/views.publish",
    },
    effect: "read",
    description: "Publish a static view for a User.",
    tags: ["views"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "user_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "`id` of the user you want publish a view to.",
      },
      {
        name: "view",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A [view payload](/reference/surfaces/views). This must be a JSON-encoded string.",
      },
      {
        name: "hash",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A string that represents view state to protect against possible race conditions.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ViewsPublishResponse",
    },
  },
  {
    id: "views_push",
    command: "views-push-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/views.push",
    },
    effect: "read",
    description: "Push a view onto the stack of a root view.",
    tags: ["views"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "trigger_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Exchange a trigger to post to the user.",
      },
      {
        name: "view",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "A [view payload](/reference/surfaces/views). This must be a JSON-encoded string.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ViewsPushResponse",
    },
  },
  {
    id: "views_update",
    command: "views-update-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/views.update",
    },
    effect: "read",
    description: "Update an existing view.",
    tags: ["views"],
    security: [
      {
        slackAuth: ["none"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `none`",
      },
      {
        name: "view_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A unique identifier of the view to be updated. Either `view_id` or `external_id` is required.",
      },
      {
        name: "external_id",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either `view_id` or `external_id` is required.",
      },
      {
        name: "view",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A [view object](/reference/surfaces/views). This must be a JSON-encoded string.",
      },
      {
        name: "hash",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A string that represents view state to protect against possible race conditions.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "ViewsUpdateResponse",
    },
  },
  {
    id: "workflows_stepCompleted",
    command: "workflows-step-completed-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/workflows.stepCompleted",
    },
    effect: "read",
    description: "Indicate that an app's step in a workflow completed execution.",
    tags: ["workflows"],
    security: [
      {
        slackAuth: ["workflow.steps:execute"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `workflow.steps:execute`",
      },
      {
        name: "workflow_step_execute_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Context identifier that maps to the correct workflow step execution.",
      },
      {
        name: "outputs",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "Key-value object of outputs from your step. Keys of this object reflect the configured `key` properties of your [`outputs`](/reference/workflows/workflow_step#output) array from your `workflow_step` object.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "WorkflowsStepCompletedResponse",
    },
  },
  {
    id: "workflows_stepFailed",
    command: "workflows-step-failed-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/workflows.stepFailed",
    },
    effect: "read",
    description: "Indicate that an app's step in a workflow failed to execute.",
    tags: ["workflows"],
    security: [
      {
        slackAuth: ["workflow.steps:execute"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `workflow.steps:execute`",
      },
      {
        name: "workflow_step_execute_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "Context identifier that maps to the correct workflow step execution.",
      },
      {
        name: "error",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "A JSON-based object with a `message` property that should contain a human readable error message.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "WorkflowsStepFailedResponse",
    },
  },
  {
    id: "workflows_updateStep",
    command: "workflows-update-step-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/workflows.updateStep",
    },
    effect: "read",
    description: "Update the configuration for a workflow extension step.",
    tags: ["workflows"],
    security: [
      {
        slackAuth: ["workflow.steps:execute"],
      },
    ],
    parameters: [
      {
        name: "token",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "Authentication token. Requires scope: `workflow.steps:execute`",
      },
      {
        name: "workflow_step_edit_id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "A context identifier provided with `view_submission` payloads used to call back to `workflows.updateStep`.",
      },
      {
        name: "inputs",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. **Please note**: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. [Read more about variables in workflow steps here](/workflows/steps#variables).",
      },
      {
        name: "outputs",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed.",
      },
      {
        name: "step_name",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "An optional field that can be used to override the step name that is shown in the Workflow Builder.",
      },
      {
        name: "step_image_url",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "An optional field that can be used to override app image that is shown in the Workflow Builder.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "WorkflowsUpdateStepResponse",
    },
  },
]

export const servers: readonly ApiServer[] = [
  {
    url: "https://slack.com/api",
  },
]

export const securitySchemes: Readonly<Record<string, SecurityScheme>> = {
  slackAuth: {
    type: "oauth2",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://slack.com/oauth/authorize",
        tokenUrl: "https://slack.com/api/oauth.access",
        scopes: {
          admin: "admin",
          "admin.apps:read": "admin.apps:read",
          "admin.apps:write": "admin.apps:write",
          "admin.conversations:read": "admin.conversations:read",
          "admin.conversations:write": "admin.conversations:write",
          "admin.invites:read": "admin.invites:read",
          "admin.invites:write": "admin.invites:write",
          "admin.teams:read": "admin.teams:read",
          "admin.teams:write": "admin.teams:write",
          "admin.usergroups:read": "admin.usergroups:read",
          "admin.usergroups:write": "admin.usergroups:write",
          "admin.users:read": "admin.users:read",
          "admin.users:write": "admin.users:write",
          "authorizations:read": "authorizations:read",
          bot: "Bot user scope",
          "calls:read": "calls:read",
          "calls:write": "calls:write",
          "channels:history": "channels:history",
          "channels:manage": "channels:manage",
          "channels:read": "channels:read",
          "channels:write": "channels:write",
          "chat:write": "chat:write",
          "chat:write:bot": "Author messages as a bot",
          "chat:write:user": "Author messages as a user",
          "conversations:history": "conversations:history",
          "conversations:read": "conversations:read",
          "conversations:write": "conversations:write",
          "dnd:read": "dnd:read",
          "dnd:write": "dnd:write",
          "emoji:read": "emoji:read",
          "files:read": "files:read",
          "files:write:user": "files:write:user",
          "groups:history": "groups:history",
          "groups:read": "groups:read",
          "groups:write": "groups:write",
          "identity.basic": "identity.basic",
          "im:history": "im:history",
          "im:read": "im:read",
          "im:write": "im:write",
          "links:write": "links:write",
          "mpim:history": "mpim:history",
          "mpim:read": "mpim:read",
          "mpim:write": "mpim:write",
          none: "No scope required",
          "pins:read": "pins:read",
          "pins:write": "pins:write",
          "reactions:read": "reactions:read",
          "reactions:write": "reactions:write",
          "reminders:read": "reminders:read",
          "reminders:write": "reminders:write",
          "remote_files:read": "remote_files:read",
          "remote_files:share": "remote_files:share",
          "remote_files:write": "remote_files:write",
          "rtm:stream": "rtm:stream",
          "search:read": "search:read",
          "stars:read": "stars:read",
          "stars:write": "stars:write",
          "team:read": "team:read",
          "tokens.basic": "tokens.basic",
          "usergroups:read": "usergroups:read",
          "usergroups:write": "usergroups:write",
          "users.profile:read": "users.profile:read",
          "users.profile:write": "users.profile:write",
          "users:read": "users:read",
          "users:read.email": "users:read.email",
          "users:write": "users:write",
          "workflow.steps:execute": "workflow.steps:execute",
        },
      },
    },
  },
}
