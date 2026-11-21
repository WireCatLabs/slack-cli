// GENERATED. DO NOT EDIT.
// Source: spec/slack/, checked against provenance.json
// Run: pnpm generate

import type { SchemaNode } from "@wirecat/cli-base/codegen"

export const definitions: Readonly<Record<string, SchemaNode>> = {
  Blocks: {
    description:
      "This is a very loose definition, in the future, we'll populate this with deeper schema in this definition namespace.",
    type: "array",
    items: {
      type: "object",
      properties: {
        type: {
          type: "string",
        },
      },
      required: ["type"],
      additionalProperties: {
        type: "unknown",
      },
    },
  },
  DefsAppId: {
    type: "string",
    pattern: "^A[A-Z0-9]{1,}$",
  },
  DefsBotId: {
    type: "string",
    pattern: "^B[A-Z0-9]{8,}$",
  },
  DefsChannel: {
    type: "string",
    pattern: "^[CGD][A-Z0-9]{8,}$",
  },
  DefsChannelId: {
    type: "string",
    pattern: "^[C][A-Z0-9]{2,}$",
  },
  DefsChannelName: {
    type: "string",
  },
  DefsCommentId: {
    type: "string",
    pattern: "^Fc[A-Z0-9]{8,}$",
  },
  DefsDmId: {
    type: "string",
    pattern: "^[D][A-Z0-9]{8,}$",
  },
  DefsEnterpriseId: {
    type: "string",
    pattern: "^[E][A-Z0-9]{8,}$",
  },
  DefsEnterpriseName: {
    type: "string",
  },
  DefsEnterpriseUserId: {
    type: "string",
    pattern: "^[WU][A-Z0-9]{8,}$",
  },
  DefsFileId: {
    type: "string",
    pattern: "^[F][A-Z0-9]{8,}$",
  },
  DefsGroupId: {
    type: "string",
    pattern: "^[G][A-Z0-9]{8,}$",
  },
  DefsOkFalse: {
    type: "boolean",
    enum: [false],
  },
  DefsOkTrue: {
    type: "boolean",
    enum: [true],
  },
  DefsOptionalAppId: {
    type: "string",
    pattern: "^(A[A-Z0-9]{1,})?$",
  },
  DefsPinnedInfo: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: {
      type: "unknown",
    },
  },
  DefsReminderId: {
    type: "string",
    pattern: "^Rm[A-Z0-9]{8,}$",
  },
  DefsSubteamId: {
    type: "string",
    pattern: "^S[A-Z0-9]{2,}$",
  },
  DefsTeam: {
    type: "string",
    pattern: "^[T][A-Z0-9]{2,}$",
  },
  DefsTopicPurposeCreator: {
    type: "string",
    pattern: "^[UW][A-Z0-9]{8,}$|^$",
  },
  DefsTs: {
    type: "string",
    pattern: "^\\d{10}\\.\\d{6}$",
  },
  DefsUserId: {
    type: "string",
    pattern: "^[UW][A-Z0-9]{2,}$",
  },
  DefsWorkspaceId: {
    type: "string",
    pattern: "^[TE][A-Z0-9]{8,}$",
  },
  ObjsBotProfile: {
    type: "object",
    properties: {
      app_id: {
        type: "ref",
        ref: "defs_app_id",
      },
      deleted: {
        type: "boolean",
      },
      icons: {
        type: "object",
        properties: {
          image_36: {
            type: "string",
          },
          image_48: {
            type: "string",
          },
          image_72: {
            type: "string",
          },
        },
        required: ["image_36", "image_48", "image_72"],
        additionalProperties: {
          type: "unknown",
        },
      },
      id: {
        type: "ref",
        ref: "defs_bot_id",
      },
      name: {
        type: "string",
      },
      team_id: {
        type: "ref",
        ref: "defs_team",
      },
      updated: {
        type: "integer",
      },
    },
    required: ["id", "deleted", "name", "updated", "app_id", "icons", "team_id"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsChannel: {
    type: "object",
    properties: {
      accepted_user: {
        type: "ref",
        ref: "defs_user_id",
      },
      created: {
        type: "integer",
      },
      creator: {
        type: "ref",
        ref: "defs_user_id",
      },
      id: {
        type: "ref",
        ref: "defs_channel_id",
      },
      is_archived: {
        type: "boolean",
      },
      is_channel: {
        type: "boolean",
      },
      is_frozen: {
        type: "boolean",
      },
      is_general: {
        type: "boolean",
      },
      is_member: {
        type: "boolean",
      },
      is_moved: {
        type: "integer",
      },
      is_mpim: {
        type: "boolean",
      },
      is_non_threadable: {
        type: "boolean",
      },
      is_org_shared: {
        type: "boolean",
      },
      is_pending_ext_shared: {
        type: "boolean",
      },
      is_private: {
        type: "boolean",
      },
      is_read_only: {
        type: "boolean",
      },
      is_shared: {
        type: "boolean",
      },
      is_thread_only: {
        type: "boolean",
      },
      last_read: {
        type: "ref",
        ref: "defs_ts",
      },
      latest: {
        type: "ref",
        ref: "objs_message",
        nullable: true,
      },
      members: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_user_id",
        },
        minItems: 0,
        uniqueItems: true,
      },
      name: {
        type: "string",
      },
      name_normalized: {
        type: "string",
      },
      num_members: {
        type: "integer",
      },
      pending_shared: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_team",
        },
        minItems: 0,
        uniqueItems: true,
      },
      previous_names: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_channel_name",
        },
        minItems: 0,
        uniqueItems: true,
      },
      priority: {
        type: "number",
      },
      purpose: {
        type: "object",
        properties: {
          creator: {
            type: "ref",
            ref: "defs_topic_purpose_creator",
          },
          last_set: {
            type: "integer",
          },
          value: {
            type: "string",
          },
        },
        required: ["value", "creator", "last_set"],
        additionalProperties: {
          type: "unknown",
        },
      },
      topic: {
        type: "object",
        properties: {
          creator: {
            type: "ref",
            ref: "defs_topic_purpose_creator",
          },
          last_set: {
            type: "integer",
          },
          value: {
            type: "string",
          },
        },
        required: ["value", "creator", "last_set"],
        additionalProperties: {
          type: "unknown",
        },
      },
      unlinked: {
        type: "integer",
      },
      unread_count: {
        type: "integer",
      },
      unread_count_display: {
        type: "integer",
      },
    },
    required: [
      "id",
      "name",
      "created",
      "creator",
      "is_channel",
      "is_org_shared",
      "is_private",
      "is_mpim",
      "is_shared",
      "name_normalized",
      "members",
      "topic",
      "purpose",
    ],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsComment: {
    type: "object",
    properties: {
      comment: {
        type: "string",
      },
      created: {
        type: "integer",
      },
      id: {
        type: "ref",
        ref: "defs_comment_id",
      },
      is_intro: {
        type: "boolean",
      },
      is_starred: {
        type: "boolean",
      },
      num_stars: {
        type: "integer",
      },
      pinned_info: {
        type: "ref",
        ref: "defs_pinned_info",
      },
      pinned_to: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_channel",
        },
      },
      reactions: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_reaction",
        },
      },
      timestamp: {
        type: "integer",
      },
      user: {
        type: "ref",
        ref: "defs_user_id",
      },
    },
    required: ["id", "created", "timestamp", "user", "is_intro", "comment"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsComments: {
    type: "array",
    items: {
      type: "unknown",
    },
  },
  ObjsConversation: {
    type: "union",
    of: [
      {
        type: "object",
        properties: {
          accepted_user: {
            type: "ref",
            ref: "defs_user_id",
          },
          connected_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_workspace_id",
            },
            minItems: 0,
            uniqueItems: true,
          },
          conversation_host_id: {
            type: "ref",
            ref: "defs_workspace_id",
          },
          created: {
            type: "integer",
          },
          creator: {
            type: "ref",
            ref: "defs_user_id",
          },
          display_counts: {
            type: "object",
            properties: {
              display_counts: {
                type: "integer",
              },
              guest_counts: {
                type: "integer",
              },
            },
            required: ["display_counts", "guest_counts"],
            additionalProperties: {
              type: "unknown",
            },
          },
          enterprise_id: {
            type: "ref",
            ref: "defs_enterprise_id",
          },
          has_pins: {
            type: "boolean",
          },
          id: {
            type: "ref",
            ref: "defs_channel",
          },
          internal_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          is_archived: {
            type: "boolean",
          },
          is_channel: {
            type: "boolean",
          },
          is_ext_shared: {
            type: "boolean",
          },
          is_frozen: {
            type: "boolean",
          },
          is_general: {
            type: "boolean",
          },
          is_global_shared: {
            type: "boolean",
          },
          is_group: {
            type: "boolean",
          },
          is_im: {
            type: "boolean",
          },
          is_member: {
            type: "boolean",
          },
          is_moved: {
            type: "integer",
          },
          is_mpim: {
            type: "boolean",
            enum: [false],
          },
          is_non_threadable: {
            type: "boolean",
          },
          is_open: {
            type: "boolean",
          },
          is_org_default: {
            type: "boolean",
          },
          is_org_mandatory: {
            type: "boolean",
          },
          is_org_shared: {
            type: "boolean",
          },
          is_pending_ext_shared: {
            type: "boolean",
          },
          is_private: {
            type: "boolean",
          },
          is_read_only: {
            type: "boolean",
          },
          is_shared: {
            type: "boolean",
          },
          is_starred: {
            type: "boolean",
          },
          is_thread_only: {
            type: "boolean",
          },
          last_read: {
            type: "ref",
            ref: "defs_ts",
          },
          latest: {
            type: "ref",
            ref: "objs_message",
            nullable: true,
          },
          members: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_user_id",
            },
            minItems: 0,
            uniqueItems: true,
          },
          name: {
            type: "string",
          },
          name_normalized: {
            type: "string",
          },
          num_members: {
            type: "integer",
          },
          parent_conversation: {
            type: "ref",
            ref: "defs_channel",
            nullable: true,
          },
          pending_connected_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          pending_shared: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          pin_count: {
            type: "integer",
          },
          previous_names: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_channel_name",
            },
            minItems: 0,
            uniqueItems: true,
          },
          priority: {
            type: "number",
          },
          purpose: {
            type: "object",
            properties: {
              creator: {
                type: "ref",
                ref: "defs_topic_purpose_creator",
              },
              last_set: {
                type: "integer",
              },
              value: {
                type: "string",
              },
            },
            required: ["value", "creator", "last_set"],
            additionalProperties: {
              type: "unknown",
            },
          },
          shared_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          shares: {
            type: "array",
            items: {
              type: "object",
              properties: {
                accepted_user: {
                  type: "ref",
                  ref: "defs_user_id",
                },
                is_active: {
                  type: "boolean",
                },
                team: {
                  type: "ref",
                  ref: "objs_team",
                },
                user: {
                  type: "ref",
                  ref: "defs_user_id",
                },
              },
              required: ["team", "user", "is_active"],
              additionalProperties: {
                type: "unknown",
              },
            },
            minItems: 0,
            uniqueItems: true,
          },
          timezone_count: {
            type: "integer",
          },
          topic: {
            type: "object",
            properties: {
              creator: {
                type: "ref",
                ref: "defs_topic_purpose_creator",
              },
              last_set: {
                type: "integer",
              },
              value: {
                type: "string",
              },
            },
            required: ["value", "creator", "last_set"],
            additionalProperties: {
              type: "unknown",
            },
          },
          unlinked: {
            type: "integer",
          },
          unread_count: {
            type: "integer",
          },
          unread_count_display: {
            type: "integer",
          },
          use_case: {
            type: "string",
          },
          user: {
            type: "ref",
            ref: "defs_user_id",
          },
          version: {
            type: "integer",
          },
        },
        required: [
          "id",
          "name",
          "created",
          "creator",
          "is_archived",
          "is_channel",
          "is_general",
          "is_mpim",
          "is_group",
          "is_org_shared",
          "is_im",
          "is_shared",
          "is_private",
          "name_normalized",
          "topic",
          "purpose",
        ],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        type: "object",
        properties: {
          accepted_user: {
            type: "ref",
            ref: "defs_user_id",
          },
          connected_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          conversation_host_id: {
            type: "ref",
            ref: "defs_workspace_id",
          },
          created: {
            type: "integer",
          },
          creator: {
            type: "ref",
            ref: "defs_user_id",
          },
          display_counts: {
            type: "object",
            properties: {
              display_counts: {
                type: "integer",
              },
              guest_counts: {
                type: "integer",
              },
            },
            required: ["display_counts", "guest_counts"],
            additionalProperties: {
              type: "unknown",
            },
          },
          id: {
            type: "ref",
            ref: "defs_channel",
          },
          internal_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          is_archived: {
            type: "boolean",
          },
          is_channel: {
            type: "boolean",
          },
          is_ext_shared: {
            type: "boolean",
          },
          is_frozen: {
            type: "boolean",
          },
          is_general: {
            type: "boolean",
          },
          is_group: {
            type: "boolean",
          },
          is_im: {
            type: "boolean",
          },
          is_member: {
            type: "boolean",
          },
          is_moved: {
            type: "integer",
          },
          is_mpim: {
            type: "boolean",
            enum: [true],
          },
          is_non_threadable: {
            type: "boolean",
          },
          is_open: {
            type: "boolean",
          },
          is_org_shared: {
            type: "boolean",
          },
          is_pending_ext_shared: {
            type: "boolean",
          },
          is_private: {
            type: "boolean",
          },
          is_read_only: {
            type: "boolean",
          },
          is_shared: {
            type: "boolean",
          },
          is_starred: {
            type: "boolean",
          },
          is_thread_only: {
            type: "boolean",
          },
          last_read: {
            type: "ref",
            ref: "defs_ts",
          },
          latest: {
            type: "ref",
            ref: "objs_message",
            nullable: true,
          },
          members: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_user_id",
            },
            minItems: 0,
            uniqueItems: true,
          },
          name: {
            type: "string",
          },
          name_normalized: {
            type: "string",
          },
          num_members: {
            type: "integer",
          },
          parent_conversation: {
            type: "ref",
            ref: "defs_channel",
            nullable: true,
          },
          pending_connected_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          pending_shared: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          pin_count: {
            type: "integer",
          },
          previous_names: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_channel_name",
            },
            minItems: 0,
            uniqueItems: true,
          },
          priority: {
            type: "number",
          },
          purpose: {
            type: "object",
            properties: {
              creator: {
                type: "ref",
                ref: "defs_topic_purpose_creator",
              },
              last_set: {
                type: "integer",
              },
              value: {
                type: "string",
              },
            },
            required: ["value", "creator", "last_set"],
            additionalProperties: {
              type: "unknown",
            },
          },
          shared_team_ids: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_team",
            },
            minItems: 0,
            uniqueItems: true,
          },
          shares: {
            type: "array",
            items: {
              type: "object",
              properties: {
                accepted_user: {
                  type: "ref",
                  ref: "defs_user_id",
                },
                is_active: {
                  type: "boolean",
                },
                team: {
                  type: "ref",
                  ref: "objs_team",
                },
                user: {
                  type: "ref",
                  ref: "defs_user_id",
                },
              },
              required: ["team", "user", "is_active"],
              additionalProperties: {
                type: "unknown",
              },
            },
            minItems: 0,
            uniqueItems: true,
          },
          timezone_count: {
            type: "integer",
          },
          topic: {
            type: "object",
            properties: {
              creator: {
                type: "ref",
                ref: "defs_topic_purpose_creator",
              },
              last_set: {
                type: "integer",
              },
              value: {
                type: "string",
              },
            },
            required: ["value", "creator", "last_set"],
            additionalProperties: {
              type: "unknown",
            },
          },
          unlinked: {
            type: "integer",
          },
          unread_count: {
            type: "integer",
          },
          unread_count_display: {
            type: "integer",
          },
          user: {
            type: "ref",
            ref: "defs_user_id",
          },
          version: {
            type: "integer",
          },
        },
        required: [
          "id",
          "name",
          "created",
          "creator",
          "is_archived",
          "is_channel",
          "is_general",
          "is_mpim",
          "is_group",
          "is_org_shared",
          "is_im",
          "is_shared",
          "is_private",
          "name_normalized",
          "topic",
          "purpose",
        ],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        type: "object",
        properties: {
          created: {
            type: "integer",
          },
          has_pins: {
            type: "boolean",
          },
          id: {
            type: "ref",
            ref: "defs_dm_id",
          },
          is_archived: {
            type: "boolean",
          },
          is_ext_shared: {
            type: "boolean",
          },
          is_frozen: {
            type: "boolean",
          },
          is_im: {
            type: "boolean",
          },
          is_open: {
            type: "boolean",
          },
          is_org_shared: {
            type: "boolean",
          },
          is_shared: {
            type: "boolean",
          },
          is_starred: {
            type: "boolean",
          },
          is_user_deleted: {
            type: "boolean",
          },
          last_read: {
            type: "ref",
            ref: "defs_ts",
          },
          latest: {
            type: "ref",
            ref: "objs_message",
            nullable: true,
          },
          parent_conversation: {
            type: "ref",
            ref: "defs_channel",
            nullable: true,
          },
          pin_count: {
            type: "integer",
          },
          priority: {
            type: "number",
          },
          shares: {
            type: "array",
            items: {
              type: "object",
              properties: {
                date_create: {
                  type: "integer",
                },
                id: {
                  type: "ref",
                  ref: "defs_team",
                },
                is_active: {
                  type: "boolean",
                },
                name: {
                  type: "string",
                },
                team: {
                  type: "ref",
                  ref: "objs_team",
                },
              },
              required: ["id", "name", "team", "date_create", "is_active"],
              additionalProperties: {
                type: "unknown",
              },
            },
            minItems: 0,
            uniqueItems: true,
          },
          unread_count: {
            type: "integer",
          },
          unread_count_display: {
            type: "integer",
          },
          user: {
            type: "ref",
            ref: "defs_user_id",
          },
          version: {
            type: "integer",
          },
        },
        required: ["id", "created", "is_im", "is_org_shared", "user", "priority"],
        additionalProperties: {
          type: "unknown",
        },
      },
    ],
  },
  ObjsEnterpriseUser: {
    type: "object",
    properties: {
      enterprise_id: {
        type: "ref",
        ref: "defs_enterprise_id",
      },
      enterprise_name: {
        type: "ref",
        ref: "defs_enterprise_name",
      },
      id: {
        type: "ref",
        ref: "defs_enterprise_user_id",
      },
      is_admin: {
        type: "boolean",
      },
      is_owner: {
        type: "boolean",
      },
      teams: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_team",
        },
        uniqueItems: true,
      },
    },
    required: ["id", "enterprise_id", "enterprise_name", "is_admin", "is_owner", "teams"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsExternalOrgMigrations: {
    type: "object",
    properties: {
      current: {
        type: "array",
        items: {
          type: "object",
          properties: {
            date_started: {
              type: "integer",
            },
            team_id: {
              type: "string",
            },
          },
          required: ["team_id", "date_started"],
        },
      },
      date_updated: {
        type: "integer",
      },
    },
    required: ["date_updated", "current"],
  },
  ObjsFile: {
    type: "object",
    properties: {
      channels: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_channel_id",
        },
        uniqueItems: true,
      },
      comments_count: {
        type: "integer",
      },
      created: {
        type: "integer",
      },
      date_delete: {
        type: "integer",
      },
      display_as_bot: {
        type: "boolean",
      },
      editable: {
        type: "boolean",
      },
      editor: {
        type: "ref",
        ref: "defs_user_id",
      },
      external_id: {
        type: "string",
      },
      external_type: {
        type: "string",
      },
      external_url: {
        type: "string",
      },
      filetype: {
        type: "string",
      },
      groups: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_group_id",
        },
        uniqueItems: true,
      },
      has_rich_preview: {
        type: "boolean",
      },
      id: {
        type: "ref",
        ref: "defs_file_id",
      },
      image_exif_rotation: {
        type: "integer",
      },
      ims: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_dm_id",
        },
        uniqueItems: true,
      },
      is_external: {
        type: "boolean",
      },
      is_public: {
        type: "boolean",
      },
      is_starred: {
        type: "boolean",
      },
      is_tombstoned: {
        type: "boolean",
      },
      last_editor: {
        type: "ref",
        ref: "defs_user_id",
      },
      mimetype: {
        type: "string",
      },
      mode: {
        type: "string",
      },
      name: {
        type: "string",
      },
      non_owner_editable: {
        type: "boolean",
      },
      num_stars: {
        type: "integer",
      },
      original_h: {
        type: "integer",
      },
      original_w: {
        type: "integer",
      },
      permalink: {
        type: "string",
      },
      permalink_public: {
        type: "string",
      },
      pinned_info: {
        type: "ref",
        ref: "defs_pinned_info",
      },
      pinned_to: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_channel",
        },
      },
      pretty_type: {
        type: "string",
      },
      preview: {
        type: "string",
      },
      public_url_shared: {
        type: "boolean",
      },
      reactions: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_reaction",
        },
      },
      shares: {
        type: "object",
        properties: {
          private: {
            type: "object",
            properties: {},
            required: [],
            additionalProperties: {
              type: "unknown",
            },
          },
          public: {
            type: "object",
            properties: {},
            required: [],
            additionalProperties: {
              type: "unknown",
            },
          },
        },
        required: [],
        additionalProperties: {
          type: "unknown",
        },
      },
      size: {
        type: "integer",
      },
      source_team: {
        type: "ref",
        ref: "defs_team",
      },
      state: {
        type: "string",
      },
      thumb_1024: {
        type: "string",
      },
      thumb_1024_h: {
        type: "integer",
      },
      thumb_1024_w: {
        type: "integer",
      },
      thumb_160: {
        type: "string",
      },
      thumb_360: {
        type: "string",
      },
      thumb_360_h: {
        type: "integer",
      },
      thumb_360_w: {
        type: "integer",
      },
      thumb_480: {
        type: "string",
      },
      thumb_480_h: {
        type: "integer",
      },
      thumb_480_w: {
        type: "integer",
      },
      thumb_64: {
        type: "string",
      },
      thumb_720: {
        type: "string",
      },
      thumb_720_h: {
        type: "integer",
      },
      thumb_720_w: {
        type: "integer",
      },
      thumb_80: {
        type: "string",
      },
      thumb_800: {
        type: "string",
      },
      thumb_800_h: {
        type: "integer",
      },
      thumb_800_w: {
        type: "integer",
      },
      thumb_960: {
        type: "string",
      },
      thumb_960_h: {
        type: "integer",
      },
      thumb_960_w: {
        type: "integer",
      },
      thumb_tiny: {
        type: "string",
      },
      timestamp: {
        type: "integer",
      },
      title: {
        type: "string",
      },
      updated: {
        type: "integer",
      },
      url_private: {
        type: "string",
      },
      url_private_download: {
        type: "string",
      },
      user: {
        type: "string",
      },
      user_team: {
        type: "ref",
        ref: "defs_team",
      },
      username: {
        type: "string",
      },
    },
    required: [],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsIcon: {
    type: "object",
    properties: {
      image_102: {
        type: "string",
      },
      image_132: {
        type: "string",
      },
      image_230: {
        type: "string",
      },
      image_34: {
        type: "string",
      },
      image_44: {
        type: "string",
      },
      image_68: {
        type: "string",
      },
      image_88: {
        type: "string",
      },
      image_default: {
        type: "boolean",
      },
    },
    required: [],
  },
  ObjsMessage: {
    type: "object",
    properties: {
      attachments: {
        type: "array",
        items: {
          type: "object",
          properties: {
            fallback: {
              type: "string",
            },
            id: {
              type: "integer",
            },
            image_bytes: {
              type: "integer",
            },
            image_height: {
              type: "integer",
            },
            image_url: {
              type: "string",
            },
            image_width: {
              type: "integer",
            },
          },
          required: ["id"],
          additionalProperties: {
            type: "unknown",
          },
        },
        minItems: 0,
        uniqueItems: true,
      },
      blocks: {
        type: "ref",
        ref: "blocks",
      },
      bot_id: {
        type: "ref",
        ref: "defs_bot_id",
        nullable: true,
      },
      bot_profile: {
        type: "ref",
        ref: "objs_bot_profile",
      },
      client_msg_id: {
        type: "string",
      },
      comment: {
        type: "ref",
        ref: "objs_comment",
      },
      display_as_bot: {
        type: "boolean",
      },
      file: {
        type: "ref",
        ref: "objs_file",
      },
      files: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_file",
        },
        minItems: 0,
        uniqueItems: true,
      },
      icons: {
        type: "object",
        properties: {
          emoji: {
            type: "string",
          },
          image_64: {
            type: "string",
          },
        },
        required: [],
        additionalProperties: {
          type: "unknown",
        },
      },
      inviter: {
        type: "ref",
        ref: "defs_user_id",
      },
      is_delayed_message: {
        type: "boolean",
      },
      is_intro: {
        type: "boolean",
      },
      is_starred: {
        type: "boolean",
      },
      last_read: {
        type: "ref",
        ref: "defs_ts",
      },
      latest_reply: {
        type: "ref",
        ref: "defs_ts",
      },
      name: {
        type: "string",
      },
      old_name: {
        type: "string",
      },
      parent_user_id: {
        type: "ref",
        ref: "defs_user_id",
      },
      permalink: {
        type: "string",
      },
      pinned_to: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_channel",
        },
      },
      purpose: {
        type: "string",
      },
      reactions: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_reaction",
        },
      },
      reply_count: {
        type: "integer",
      },
      reply_users: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_user_id",
        },
        minItems: 0,
        uniqueItems: true,
      },
      reply_users_count: {
        type: "integer",
      },
      source_team: {
        type: "ref",
        ref: "defs_workspace_id",
      },
      subscribed: {
        type: "boolean",
      },
      subtype: {
        type: "string",
      },
      team: {
        type: "ref",
        ref: "defs_workspace_id",
      },
      text: {
        type: "string",
      },
      thread_ts: {
        type: "ref",
        ref: "defs_ts",
      },
      topic: {
        type: "string",
      },
      ts: {
        type: "ref",
        ref: "defs_ts",
      },
      type: {
        type: "string",
      },
      unread_count: {
        type: "integer",
      },
      upload: {
        type: "boolean",
      },
      user: {
        type: "ref",
        ref: "defs_user_id",
      },
      user_profile: {
        type: "ref",
        ref: "objs_user_profile_short",
      },
      user_team: {
        type: "ref",
        ref: "defs_workspace_id",
      },
      username: {
        type: "string",
      },
    },
    required: ["text", "type", "ts"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsPaging: {
    type: "object",
    properties: {
      count: {
        type: "integer",
      },
      page: {
        type: "integer",
      },
      pages: {
        type: "integer",
      },
      per_page: {
        type: "integer",
      },
      spill: {
        type: "integer",
      },
      total: {
        type: "integer",
      },
    },
    required: ["page", "total"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsPrimaryOwner: {
    type: "object",
    properties: {
      email: {
        type: "string",
      },
      id: {
        type: "string",
      },
    },
    required: ["id", "email"],
  },
  ObjsReaction: {
    type: "object",
    properties: {
      count: {
        type: "integer",
      },
      name: {
        type: "string",
      },
      users: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_user_id",
        },
      },
    },
    required: ["name", "users", "count"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsReminder: {
    type: "object",
    properties: {
      complete_ts: {
        type: "integer",
      },
      creator: {
        type: "ref",
        ref: "defs_user_id",
      },
      id: {
        type: "ref",
        ref: "defs_reminder_id",
      },
      recurring: {
        type: "boolean",
      },
      text: {
        type: "string",
      },
      time: {
        type: "integer",
      },
      user: {
        type: "ref",
        ref: "defs_user_id",
      },
    },
    required: ["id", "creator", "user", "text", "recurring"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsResources: {
    type: "object",
    properties: {
      excluded_ids: {
        type: "array",
        items: {
          type: "union",
          of: [
            {
              type: "ref",
              ref: "defs_channel",
            },
            {
              type: "ref",
              ref: "defs_team",
            },
          ],
        },
      },
      ids: {
        type: "array",
        items: {
          type: "union",
          of: [
            {
              type: "ref",
              ref: "defs_channel",
            },
            {
              type: "ref",
              ref: "defs_team",
            },
          ],
        },
      },
      wildcard: {
        type: "boolean",
      },
    },
    required: ["ids"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsResponseMetadata: {
    type: "object",
    properties: {
      next_cursor: {
        type: "string",
      },
      messages: {
        type: "array",
        items: {
          type: "string",
        },
      },
      warnings: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: [],
  },
  ObjsScopes: {
    type: "array",
    items: {
      type: "string",
    },
  },
  ObjsSubteam: {
    type: "object",
    properties: {
      auto_provision: {
        type: "boolean",
      },
      auto_type: {
        type: "string",
        enum: ["owner", "admin"],
        nullable: true,
      },
      channel_count: {
        type: "integer",
      },
      created_by: {
        type: "ref",
        ref: "defs_user_id",
      },
      date_create: {
        type: "integer",
      },
      date_delete: {
        type: "integer",
      },
      date_update: {
        type: "integer",
      },
      deleted_by: {
        type: "ref",
        ref: "defs_user_id",
        nullable: true,
      },
      description: {
        type: "string",
      },
      enterprise_subteam_id: {
        type: "string",
      },
      handle: {
        type: "string",
      },
      id: {
        type: "ref",
        ref: "defs_subteam_id",
      },
      is_external: {
        type: "boolean",
      },
      is_subteam: {
        type: "boolean",
      },
      is_usergroup: {
        type: "boolean",
      },
      name: {
        type: "string",
      },
      prefs: {
        type: "object",
        properties: {
          channels: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_channel_id",
            },
          },
          groups: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_group_id",
            },
          },
        },
        required: ["channels", "groups"],
        additionalProperties: {
          type: "unknown",
        },
      },
      team_id: {
        type: "ref",
        ref: "defs_team",
      },
      updated_by: {
        type: "ref",
        ref: "defs_user_id",
      },
      user_count: {
        type: "integer",
      },
      users: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_user_id",
        },
      },
    },
    required: [
      "id",
      "team_id",
      "is_usergroup",
      "is_subteam",
      "name",
      "description",
      "handle",
      "is_external",
      "date_create",
      "date_update",
      "date_delete",
      "auto_type",
      "auto_provision",
      "enterprise_subteam_id",
      "created_by",
      "updated_by",
      "deleted_by",
      "prefs",
    ],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsTeam: {
    type: "object",
    properties: {
      archived: {
        type: "boolean",
      },
      avatar_base_url: {
        type: "string",
      },
      created: {
        type: "integer",
      },
      date_create: {
        type: "integer",
      },
      deleted: {
        type: "boolean",
      },
      description: {
        nullable: true,
        type: "string",
      },
      discoverable: {
        type: "string",
        nullable: true,
      },
      domain: {
        type: "string",
      },
      email_domain: {
        type: "string",
      },
      enterprise_id: {
        type: "ref",
        ref: "defs_enterprise_id",
      },
      enterprise_name: {
        type: "ref",
        ref: "defs_enterprise_name",
      },
      external_org_migrations: {
        type: "ref",
        ref: "objs_external_org_migrations",
      },
      has_compliance_export: {
        type: "boolean",
      },
      icon: {
        type: "ref",
        ref: "objs_icon",
      },
      id: {
        type: "ref",
        ref: "defs_workspace_id",
      },
      is_assigned: {
        type: "boolean",
      },
      is_enterprise: {
        type: "integer",
      },
      is_over_storage_limit: {
        type: "boolean",
      },
      limit_ts: {
        type: "integer",
      },
      locale: {
        type: "string",
      },
      messages_count: {
        type: "integer",
      },
      msg_edit_window_mins: {
        type: "integer",
      },
      name: {
        type: "string",
      },
      over_integrations_limit: {
        type: "boolean",
      },
      over_storage_limit: {
        type: "boolean",
      },
      pay_prod_cur: {
        type: "string",
      },
      plan: {
        type: "string",
        enum: ["", "std", "plus", "compliance", "enterprise"],
      },
      primary_owner: {
        type: "ref",
        ref: "objs_primary_owner",
      },
      sso_provider: {
        type: "object",
        properties: {
          label: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
        required: [],
      },
    },
    required: ["id", "name", "domain", "email_domain", "icon"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsTeamProfileField: {
    type: "object",
    properties: {
      field_name: {
        nullable: true,
        type: "string",
      },
      hint: {
        type: "string",
      },
      id: {
        type: "string",
        pattern: "^X[a-zA-Z0-9]{9,}$",
      },
      is_hidden: {
        type: "boolean",
      },
      label: {
        type: "string",
      },
      options: {
        type: "ref",
        ref: "objs_team_profile_field_option",
        nullable: true,
      },
      ordering: {
        type: "number",
      },
      possible_values: {
        nullable: true,
        type: "array",
        items: {
          type: "string",
        },
      },
      type: {
        type: "string",
        enum: ["text", "date", "link", "mailto", "options_list", "user"],
      },
    },
    required: ["id", "ordering", "label", "hint", "type"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsTeamProfileFieldOption: {
    type: "object",
    properties: {
      is_custom: {
        nullable: true,
        type: "boolean",
      },
      is_multiple_entry: {
        nullable: true,
        type: "boolean",
      },
      is_protected: {
        nullable: true,
        type: "boolean",
      },
      is_scim: {
        nullable: true,
        type: "boolean",
      },
    },
    required: [],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsUser: {
    type: "union",
    of: [
      {
        description: "user object for non enterprise type",
        type: "object",
        properties: {
          color: {
            type: "string",
            pattern: "^[a-fA-F0-9]{6}$",
          },
          deleted: {
            type: "boolean",
          },
          enterprise_user: {
            type: "ref",
            ref: "objs_enterprise_user",
          },
          has_2fa: {
            type: "boolean",
          },
          id: {
            type: "ref",
            ref: "defs_user_id",
          },
          is_admin: {
            type: "boolean",
          },
          is_app_user: {
            type: "boolean",
          },
          is_bot: {
            type: "boolean",
          },
          is_external: {
            type: "boolean",
          },
          is_forgotten: {
            type: "boolean",
          },
          is_invited_user: {
            type: "boolean",
          },
          is_owner: {
            type: "boolean",
          },
          is_primary_owner: {
            type: "boolean",
          },
          is_restricted: {
            type: "boolean",
          },
          is_stranger: {
            type: "boolean",
          },
          is_ultra_restricted: {
            type: "boolean",
          },
          locale: {
            type: "string",
          },
          name: {
            type: "string",
          },
          presence: {
            type: "string",
          },
          profile: {
            type: "ref",
            ref: "objs_user_profile",
          },
          real_name: {
            type: "string",
          },
          team: {
            type: "ref",
            ref: "defs_workspace_id",
          },
          team_id: {
            type: "ref",
            ref: "defs_workspace_id",
          },
          team_profile: {
            type: "object",
            properties: {
              fields: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "objs_team_profile_field",
                },
                minItems: 0,
                uniqueItems: true,
              },
            },
            required: ["fields"],
            additionalProperties: {
              type: "unknown",
            },
          },
          two_factor_type: {
            type: "string",
          },
          tz: {
            type: "string",
            nullable: true,
          },
          tz_label: {
            type: "string",
          },
          tz_offset: {
            type: "number",
          },
          updated: {
            type: "number",
          },
        },
        required: ["id", "name", "profile", "is_bot", "updated", "is_app_user"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        description: "enterprise user",
        type: "object",
        properties: {
          color: {
            description: "refercing to bug: https://jira.tinyspeck.com/browse/EVALUE-1559",
            type: "string",
            pattern: "^([a-fA-F0-9]{6})?$",
          },
          deleted: {
            type: "boolean",
          },
          enterprise_user: {
            type: "ref",
            ref: "objs_enterprise_user",
          },
          has_2fa: {
            type: "boolean",
          },
          id: {
            type: "ref",
            ref: "defs_user_id",
          },
          is_admin: {
            type: "boolean",
          },
          is_app_user: {
            type: "boolean",
          },
          is_bot: {
            type: "boolean",
          },
          is_external: {
            type: "boolean",
          },
          is_forgotten: {
            type: "boolean",
          },
          is_owner: {
            type: "boolean",
          },
          is_primary_owner: {
            type: "boolean",
          },
          is_restricted: {
            type: "boolean",
          },
          is_stranger: {
            type: "boolean",
          },
          is_ultra_restricted: {
            type: "boolean",
          },
          locale: {
            type: "string",
          },
          name: {
            type: "string",
          },
          presence: {
            type: "string",
          },
          profile: {
            type: "ref",
            ref: "objs_user_profile",
          },
          real_name: {
            type: "string",
          },
          team_id: {
            type: "ref",
            ref: "defs_workspace_id",
          },
          team_profile: {
            type: "object",
            properties: {
              fields: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "objs_team_profile_field",
                },
                minItems: 0,
                uniqueItems: true,
              },
            },
            required: ["fields"],
            additionalProperties: {
              type: "unknown",
            },
          },
          teams: {
            type: "array",
            items: {
              type: "ref",
              ref: "defs_workspace_id",
            },
            minItems: 0,
            uniqueItems: true,
          },
          two_factor_type: {
            type: "string",
          },
          tz: {
            type: "string",
            nullable: true,
          },
          tz_label: {
            type: "string",
          },
          tz_offset: {
            type: "number",
          },
          updated: {
            type: "number",
          },
        },
        required: ["id", "name", "profile", "is_bot", "updated", "is_app_user"],
        additionalProperties: {
          type: "unknown",
        },
      },
    ],
  },
  ObjsUserProfile: {
    type: "object",
    properties: {
      always_active: {
        type: "boolean",
      },
      api_app_id: {
        type: "ref",
        ref: "defs_optional_app_id",
      },
      avatar_hash: {
        type: "string",
      },
      bot_id: {
        type: "ref",
        ref: "defs_bot_id",
      },
      display_name: {
        type: "string",
      },
      display_name_normalized: {
        type: "string",
      },
      email: {
        nullable: true,
        type: "string",
      },
      fields: {
        nullable: true,
        type: "union",
        of: [
          {
            type: "object",
            properties: {},
            required: [],
          },
          {
            type: "array",
            items: {
              type: "object",
              properties: {},
              required: [],
            },
          },
        ],
      },
      first_name: {
        nullable: true,
        type: "string",
      },
      guest_expiration_ts: {
        nullable: true,
        type: "integer",
      },
      guest_invited_by: {
        nullable: true,
        type: "string",
      },
      image_1024: {
        nullable: true,
        type: "string",
      },
      image_192: {
        nullable: true,
        type: "string",
      },
      image_24: {
        nullable: true,
        type: "string",
      },
      image_32: {
        nullable: true,
        type: "string",
      },
      image_48: {
        nullable: true,
        type: "string",
      },
      image_512: {
        nullable: true,
        type: "string",
      },
      image_72: {
        nullable: true,
        type: "string",
      },
      image_original: {
        nullable: true,
        type: "string",
      },
      is_app_user: {
        type: "boolean",
      },
      is_custom_image: {
        type: "boolean",
      },
      is_restricted: {
        nullable: true,
        type: "boolean",
      },
      is_ultra_restricted: {
        nullable: true,
        type: "boolean",
      },
      last_avatar_image_hash: {
        type: "string",
      },
      last_name: {
        nullable: true,
        type: "string",
      },
      memberships_count: {
        type: "integer",
      },
      name: {
        nullable: true,
        type: "string",
      },
      phone: {
        type: "string",
      },
      pronouns: {
        type: "string",
      },
      real_name: {
        type: "string",
      },
      real_name_normalized: {
        type: "string",
      },
      skype: {
        type: "string",
      },
      status_default_emoji: {
        type: "string",
      },
      status_default_text: {
        type: "string",
      },
      status_default_text_canonical: {
        nullable: true,
        type: "string",
      },
      status_emoji: {
        type: "string",
      },
      status_expiration: {
        type: "integer",
      },
      status_text: {
        type: "string",
      },
      status_text_canonical: {
        nullable: true,
        type: "string",
      },
      team: {
        type: "ref",
        ref: "defs_workspace_id",
      },
      title: {
        type: "string",
      },
      updated: {
        type: "integer",
      },
      user_id: {
        type: "string",
      },
      username: {
        nullable: true,
        type: "string",
      },
    },
    required: [
      "real_name",
      "display_name",
      "avatar_hash",
      "real_name_normalized",
      "display_name_normalized",
      "title",
      "phone",
      "skype",
      "status_text",
      "status_emoji",
      "fields",
    ],
    additionalProperties: {
      type: "unknown",
    },
  },
  ObjsUserProfileShort: {
    type: "object",
    properties: {
      avatar_hash: {
        type: "string",
      },
      display_name: {
        type: "string",
      },
      display_name_normalized: {
        type: "string",
      },
      first_name: {
        nullable: true,
        type: "string",
      },
      image_72: {
        type: "string",
      },
      is_restricted: {
        type: "boolean",
      },
      is_ultra_restricted: {
        type: "boolean",
      },
      name: {
        type: "string",
      },
      real_name: {
        type: "string",
      },
      real_name_normalized: {
        type: "string",
      },
      team: {
        type: "ref",
        ref: "defs_workspace_id",
      },
    },
    required: [
      "avatar_hash",
      "image_72",
      "first_name",
      "real_name",
      "display_name",
      "team",
      "name",
      "is_restricted",
      "is_ultra_restricted",
    ],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminAppsApproveRequest: {
    type: "object",
    properties: {
      app_id: {
        description: "The id of the app to approve.",
        type: "string",
      },
      request_id: {
        description: "The id of the request to approve.",
        type: "string",
      },
      team_id: {
        type: "string",
      },
    },
    required: [],
  },
  AdminAppsApproveResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminAppsApprovedListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminAppsRequestsListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminAppsRestrictRequest: {
    type: "object",
    properties: {
      app_id: {
        description: "The id of the app to restrict.",
        type: "string",
      },
      request_id: {
        description: "The id of the request to restrict.",
        type: "string",
      },
      team_id: {
        type: "string",
      },
    },
    required: [],
  },
  AdminAppsRestrictResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminAppsRestrictedListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsArchiveRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to archive.",
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  AdminConversationsArchiveResponse: {
    description: "Schema for successful response of admin.conversations.archive",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsConvertToPrivateRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to convert to private.",
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  AdminConversationsConvertToPrivateResponse: {
    description: "Schema for successful response of admin.conversations.convertToPrivate",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsCreateRequest: {
    type: "object",
    properties: {
      name: {
        description: "Name of the public or private channel to create.",
        type: "string",
      },
      description: {
        description: "Description of the public or private channel to create.",
        type: "string",
      },
      is_private: {
        description: "When `true`, creates a private channel instead of a public channel",
        type: "boolean",
      },
      org_wide: {
        description:
          "When `true`, the channel will be available org-wide. Note: if the channel is not `org_wide=true`, you must specify a `team_id` for this channel",
        type: "boolean",
      },
      team_id: {
        description:
          "The workspace to create the channel in. Note: this argument is required unless you set `org_wide=true`.",
        type: "string",
      },
    },
    required: ["name", "is_private"],
  },
  AdminConversationsCreateResponse: {
    description: "Schema for successful response of admin.conversations.create",
    type: "object",
    properties: {
      channel_id: {
        type: "ref",
        ref: "defs_channel_id",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsDeleteRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to delete.",
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  AdminConversationsDeleteResponse: {
    description: "Schema for successful response of admin.conversations.delete",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsDisconnectSharedRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to be disconnected from some workspaces.",
        type: "string",
      },
      leaving_team_ids: {
        description: "The team to be removed from the channel. Currently only a single team id can be specified.",
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  AdminConversationsDisconnectSharedResponse: {
    description: "Schema for successful response of admin.conversations.disconnectShared",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsEkmListOriginalConnectedChannelInfoResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsGetConversationPrefsResponse: {
    description: "Schema for successful response of admin.conversations.getConversationPrefs",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      prefs: {
        type: "object",
        properties: {
          can_thread: {
            type: "object",
            properties: {
              type: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              user: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: [],
          },
          who_can_post: {
            type: "object",
            properties: {
              type: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              user: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: [],
          },
        },
        required: [],
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsGetTeamsResponse: {
    description: "Schema for successful response of admin.conversations.getTeams",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: ["next_cursor"],
        additionalProperties: {
          type: "unknown",
        },
      },
      team_ids: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_team",
        },
      },
    },
    required: ["ok", "team_ids"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsInviteRequest: {
    type: "object",
    properties: {
      user_ids: {
        description: "The users to invite.",
        type: "string",
      },
      channel_id: {
        description: "The channel that the users will be invited to.",
        type: "string",
      },
    },
    required: ["user_ids", "channel_id"],
  },
  AdminConversationsInviteResponse: {
    description: "Schema for successful response of admin.conversations.invite",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsRenameRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to rename.",
        type: "string",
      },
      name: {
        type: "string",
      },
    },
    required: ["channel_id", "name"],
  },
  AdminConversationsRenameResponse: {
    description: "Schema for successful response of admin.conversations.rename",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsRestrictAccessAddGroupRequest: {
    type: "object",
    properties: {
      team_id: {
        description:
          "The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization.",
        type: "string",
      },
      group_id: {
        description:
          "The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to be an allowlist for the private channel.",
        type: "string",
      },
      channel_id: {
        description: "The channel to link this group to.",
        type: "string",
      },
    },
    required: ["group_id", "channel_id"],
  },
  AdminConversationsRestrictAccessAddGroupResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsRestrictAccessListGroupsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsRestrictAccessRemoveGroupRequest: {
    type: "object",
    properties: {
      team_id: {
        description:
          "The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization.",
        type: "string",
      },
      group_id: {
        description:
          "The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to remove from the private channel.",
        type: "string",
      },
      channel_id: {
        description: "The channel to remove the linked group from.",
        type: "string",
      },
    },
    required: ["team_id", "group_id", "channel_id"],
  },
  AdminConversationsRestrictAccessRemoveGroupResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsSearchResponse: {
    description: "Schema for successful response of admin.conversations.search",
    type: "object",
    properties: {
      channels: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_channel",
        },
      },
      next_cursor: {
        type: "string",
      },
    },
    required: ["channels", "next_cursor"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsSetConversationPrefsRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to set the prefs for",
        type: "string",
      },
      prefs: {
        description: "The prefs for this channel in a stringified JSON format.",
        type: "string",
      },
    },
    required: ["channel_id", "prefs"],
  },
  AdminConversationsSetConversationPrefsResponse: {
    description: "Schema for successful response of admin.conversations.setConversationPrefs",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsSetTeamsRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The encoded `channel_id` to add or remove to workspaces.",
        type: "string",
      },
      team_id: {
        description:
          "The workspace to which the channel belongs. Omit this argument if the channel is a cross-workspace shared channel.",
        type: "string",
      },
      target_team_ids: {
        description:
          "A comma-separated list of workspaces to which the channel should be shared. Not required if the channel is being shared org-wide.",
        type: "string",
      },
      org_channel: {
        description: "True if channel has to be converted to an org channel",
        type: "boolean",
      },
    },
    required: ["channel_id"],
  },
  AdminConversationsSetTeamsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminConversationsUnarchiveRequest: {
    type: "object",
    properties: {
      channel_id: {
        description: "The channel to unarchive.",
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  AdminConversationsUnarchiveResponse: {
    description: "Schema for successful response of admin.conversations.unarchive",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminEmojiAddRequest: {
    type: "object",
    properties: {
      name: {
        description:
          "The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included.",
        type: "string",
      },
      url: {
        description:
          "The URL of a file to use as an image for the emoji. Square images under 128KB and with transparent backgrounds work best.",
        type: "string",
      },
    },
    required: ["name", "url"],
  },
  AdminEmojiAddResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminEmojiAddAliasRequest: {
    type: "object",
    properties: {
      name: {
        description:
          "The name of the emoji to be aliased. Colons (`:myemoji:`) around the value are not required, although they may be included.",
        type: "string",
      },
      alias_for: {
        description: "The alias of the emoji.",
        type: "string",
      },
    },
    required: ["name", "alias_for"],
  },
  AdminEmojiAddAliasResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminEmojiListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminEmojiRemoveRequest: {
    type: "object",
    properties: {
      name: {
        description:
          "The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included.",
        type: "string",
      },
    },
    required: ["name"],
  },
  AdminEmojiRemoveResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminEmojiRenameRequest: {
    type: "object",
    properties: {
      name: {
        description:
          "The name of the emoji to be renamed. Colons (`:myemoji:`) around the value are not required, although they may be included.",
        type: "string",
      },
      new_name: {
        description: "The new name of the emoji.",
        type: "string",
      },
    },
    required: ["name", "new_name"],
  },
  AdminEmojiRenameResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminInviteRequestsApproveRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "ID for the workspace where the invite request was made.",
        type: "string",
      },
      invite_request_id: {
        description: "ID of the request to invite.",
        type: "string",
      },
    },
    required: ["invite_request_id"],
  },
  AdminInviteRequestsApproveResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminInviteRequestsApprovedListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminInviteRequestsDeniedListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminInviteRequestsDenyRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "ID for the workspace where the invite request was made.",
        type: "string",
      },
      invite_request_id: {
        description: "ID of the request to invite.",
        type: "string",
      },
    },
    required: ["invite_request_id"],
  },
  AdminInviteRequestsDenyResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminInviteRequestsListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsAdminsListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsCreateRequest: {
    type: "object",
    properties: {
      team_domain: {
        description: "Team domain (for example, slacksoftballteam).",
        type: "string",
      },
      team_name: {
        description: "Team name (for example, Slack Softball Team).",
        type: "string",
      },
      team_description: {
        description: "Description for the team.",
        type: "string",
      },
      team_discoverability: {
        description:
          "Who can join the team. A team's discoverability can be `open`, `closed`, `invite_only`, or `unlisted`.",
        type: "string",
      },
    },
    required: ["team_domain", "team_name"],
  },
  AdminTeamsCreateResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsOwnersListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsSettingsInfoResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsSettingsSetDefaultChannelsRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "ID for the workspace to set the default channel for.",
        type: "string",
      },
      channel_ids: {
        description: "An array of channel IDs.",
        type: "string",
      },
    },
    required: ["team_id", "channel_ids"],
  },
  AdminTeamsSettingsSetDefaultChannelsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsSettingsSetDescriptionRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "ID for the workspace to set the description for.",
        type: "string",
      },
      description: {
        description: "The new description for the workspace.",
        type: "string",
      },
    },
    required: ["team_id", "description"],
  },
  AdminTeamsSettingsSetDescriptionResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsSettingsSetDiscoverabilityRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID of the workspace to set discoverability on.",
        type: "string",
      },
      discoverability: {
        description:
          "This workspace's discovery setting. It must be set to one of `open`, `invite_only`, `closed`, or `unlisted`.",
        type: "string",
      },
    },
    required: ["team_id", "discoverability"],
  },
  AdminTeamsSettingsSetDiscoverabilityResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsSettingsSetIconRequest: {
    type: "object",
    properties: {
      image_url: {
        description: "Image URL for the icon",
        type: "string",
      },
      team_id: {
        description: "ID for the workspace to set the icon for.",
        type: "string",
      },
    },
    required: ["image_url", "team_id"],
  },
  AdminTeamsSettingsSetIconResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminTeamsSettingsSetNameRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "ID for the workspace to set the name for.",
        type: "string",
      },
      name: {
        description: "The new name of the workspace.",
        type: "string",
      },
    },
    required: ["team_id", "name"],
  },
  AdminTeamsSettingsSetNameResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsergroupsAddChannelsRequest: {
    type: "object",
    properties: {
      usergroup_id: {
        description: "ID of the IDP group to add default channels for.",
        type: "string",
      },
      team_id: {
        description: "The workspace to add default channels in.",
        type: "string",
      },
      channel_ids: {
        description: "Comma separated string of channel IDs.",
        type: "string",
      },
    },
    required: ["usergroup_id", "channel_ids"],
  },
  AdminUsergroupsAddChannelsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsergroupsAddTeamsRequest: {
    type: "object",
    properties: {
      usergroup_id: {
        description: "An encoded usergroup (IDP Group) ID.",
        type: "string",
      },
      team_ids: {
        description:
          "A comma separated list of encoded team (workspace) IDs. Each workspace *MUST* belong to the organization associated with the token.",
        type: "string",
      },
      auto_provision: {
        description: "When `true`, this method automatically creates new workspace accounts for the IDP group members.",
        type: "boolean",
      },
    },
    required: ["usergroup_id", "team_ids"],
  },
  AdminUsergroupsAddTeamsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsergroupsListChannelsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsergroupsRemoveChannelsRequest: {
    type: "object",
    properties: {
      usergroup_id: {
        description: "ID of the IDP Group",
        type: "string",
      },
      channel_ids: {
        description: "Comma-separated string of channel IDs",
        type: "string",
      },
    },
    required: ["usergroup_id", "channel_ids"],
  },
  AdminUsergroupsRemoveChannelsResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersAssignRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      user_id: {
        description: "The ID of the user to add to the workspace.",
        type: "string",
      },
      is_restricted: {
        description: "True if user should be added to the workspace as a guest.",
        type: "boolean",
      },
      is_ultra_restricted: {
        description: "True if user should be added to the workspace as a single-channel guest.",
        type: "boolean",
      },
      channel_ids: {
        description: "Comma separated values of channel IDs to add user in the new workspace.",
        type: "string",
      },
    },
    required: ["team_id", "user_id"],
  },
  AdminUsersAssignResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersInviteRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      email: {
        description: "The email address of the person to invite.",
        type: "string",
      },
      channel_ids: {
        description: "A comma-separated list of `channel_id`s for this user to join. At least one channel is required.",
        type: "string",
      },
      custom_message: {
        description: "An optional message to send to the user in the invite email.",
        type: "string",
      },
      real_name: {
        description: "Full name of the user.",
        type: "string",
      },
      resend: {
        description: "Allow this invite to be resent in the future if a user has not signed up yet. (default: false)",
        type: "boolean",
      },
      is_restricted: {
        description: "Is this user a multi-channel guest user? (default: false)",
        type: "boolean",
      },
      is_ultra_restricted: {
        description: "Is this user a single channel guest user? (default: false)",
        type: "boolean",
      },
      guest_expiration_ts: {
        description:
          "Timestamp when guest account should be disabled. Only include this timestamp if you are inviting a guest user and you want their account to expire on a certain date.",
        type: "string",
      },
    },
    required: ["team_id", "email", "channel_ids"],
  },
  AdminUsersInviteResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersRemoveRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      user_id: {
        description: "The ID of the user to remove.",
        type: "string",
      },
    },
    required: ["team_id", "user_id"],
  },
  AdminUsersRemoveResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersSessionInvalidateRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "ID of the team that the session belongs to",
        type: "string",
      },
      session_id: {
        type: "integer",
      },
    },
    required: ["team_id", "session_id"],
  },
  AdminUsersSessionInvalidateResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersSessionResetRequest: {
    type: "object",
    properties: {
      user_id: {
        description: "The ID of the user to wipe sessions for",
        type: "string",
      },
      mobile_only: {
        description: "Only expire mobile sessions (default: false)",
        type: "boolean",
      },
      web_only: {
        description: "Only expire web sessions (default: false)",
        type: "boolean",
      },
    },
    required: ["user_id"],
  },
  AdminUsersSessionResetResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersSetAdminRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      user_id: {
        description: "The ID of the user to designate as an admin.",
        type: "string",
      },
    },
    required: ["team_id", "user_id"],
  },
  AdminUsersSetAdminResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersSetExpirationRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      user_id: {
        description: "The ID of the user to set an expiration for.",
        type: "string",
      },
      expiration_ts: {
        description: "Timestamp when guest account should be disabled.",
        type: "integer",
      },
    },
    required: ["team_id", "user_id", "expiration_ts"],
  },
  AdminUsersSetExpirationResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersSetOwnerRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      user_id: {
        description: "Id of the user to promote to owner.",
        type: "string",
      },
    },
    required: ["team_id", "user_id"],
  },
  AdminUsersSetOwnerResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AdminUsersSetRegularRequest: {
    type: "object",
    properties: {
      team_id: {
        description: "The ID (`T1234`) of the workspace.",
        type: "string",
      },
      user_id: {
        description: "The ID of the user to designate as a regular user.",
        type: "string",
      },
    },
    required: ["team_id", "user_id"],
  },
  AdminUsersSetRegularResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ApiTestResponse: {
    description: "Schema for successful response api.test method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  AppsEventAuthorizationsListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsPermissionsInfoResponse: {
    description: "Schema for successful response from apps.permissions.info method",
    type: "object",
    properties: {
      info: {
        type: "object",
        properties: {
          app_home: {
            type: "object",
            properties: {
              resources: {
                type: "ref",
                ref: "objs_resources",
              },
              scopes: {
                type: "ref",
                ref: "objs_scopes",
              },
            },
            required: [],
          },
          channel: {
            type: "object",
            properties: {
              resources: {
                type: "ref",
                ref: "objs_resources",
              },
              scopes: {
                type: "ref",
                ref: "objs_scopes",
              },
            },
            required: [],
          },
          group: {
            type: "object",
            properties: {
              resources: {
                type: "ref",
                ref: "objs_resources",
              },
              scopes: {
                type: "ref",
                ref: "objs_scopes",
              },
            },
            required: [],
          },
          im: {
            type: "object",
            properties: {
              resources: {
                type: "ref",
                ref: "objs_resources",
              },
              scopes: {
                type: "ref",
                ref: "objs_scopes",
              },
            },
            required: [],
          },
          mpim: {
            type: "object",
            properties: {
              resources: {
                type: "ref",
                ref: "objs_resources",
              },
              scopes: {
                type: "ref",
                ref: "objs_scopes",
              },
            },
            required: [],
          },
          team: {
            type: "object",
            properties: {
              resources: {
                type: "ref",
                ref: "objs_resources",
              },
              scopes: {
                type: "ref",
                ref: "objs_scopes",
              },
            },
            required: ["scopes", "resources"],
          },
        },
        required: ["team", "channel", "group", "mpim", "im", "app_home"],
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "info"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsPermissionsRequestResponse: {
    description: "Schema for successful response from apps.permissions.request method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsPermissionsResourcesListResponse: {
    description: "Schema for successful response apps.permissions.resources.list method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      resources: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            type: {
              type: "string",
            },
          },
          required: [],
        },
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: ["next_cursor"],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "resources"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsPermissionsScopesListResponse: {
    description: "Schema for successful response api.permissions.scopes.list method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      scopes: {
        type: "object",
        properties: {
          app_home: {
            type: "ref",
            ref: "objs_scopes",
          },
          channel: {
            type: "ref",
            ref: "objs_scopes",
          },
          group: {
            type: "ref",
            ref: "objs_scopes",
          },
          im: {
            type: "ref",
            ref: "objs_scopes",
          },
          mpim: {
            type: "ref",
            ref: "objs_scopes",
          },
          team: {
            type: "ref",
            ref: "objs_scopes",
          },
          user: {
            type: "ref",
            ref: "objs_scopes",
          },
        },
        required: [],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "scopes"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsPermissionsUsersListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsPermissionsUsersRequestResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AppsUninstallResponse: {
    description: "Schema for successful response from apps.uninstall method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AuthRevokeResponse: {
    description: "Schema for successful response from auth.revoke method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      revoked: {
        type: "boolean",
      },
    },
    required: ["ok", "revoked"],
    additionalProperties: {
      type: "unknown",
    },
  },
  AuthTestResponse: {
    description: "Schema for successful response auth.test method",
    type: "object",
    properties: {
      bot_id: {
        type: "ref",
        ref: "defs_bot_id",
      },
      is_enterprise_install: {
        type: "boolean",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      team: {
        type: "string",
      },
      team_id: {
        type: "ref",
        ref: "defs_team",
      },
      url: {
        type: "string",
      },
      user: {
        type: "string",
      },
      user_id: {
        type: "ref",
        ref: "defs_user_id",
      },
    },
    required: ["ok", "url", "team", "user", "team_id", "user_id"],
    additionalProperties: {
      type: "unknown",
    },
  },
  BotsInfoResponse: {
    description: "Schema for successful response from bots.info method",
    type: "object",
    properties: {
      bot: {
        type: "object",
        properties: {
          app_id: {
            type: "ref",
            ref: "defs_app_id",
          },
          deleted: {
            type: "boolean",
          },
          icons: {
            type: "object",
            properties: {
              image_36: {
                type: "string",
              },
              image_48: {
                type: "string",
              },
              image_72: {
                type: "string",
              },
            },
            required: ["image_36", "image_48", "image_72"],
            additionalProperties: {
              type: "unknown",
            },
          },
          id: {
            type: "ref",
            ref: "defs_bot_id",
          },
          name: {
            type: "string",
          },
          updated: {
            type: "integer",
          },
          user_id: {
            type: "ref",
            ref: "defs_user_id",
          },
        },
        required: ["id", "deleted", "name", "updated", "app_id", "icons"],
        additionalProperties: {
          type: "unknown",
        },
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "bot"],
    additionalProperties: {
      type: "unknown",
    },
  },
  CallsAddRequest: {
    type: "object",
    properties: {
      external_unique_id: {
        description:
          "An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service.",
        type: "string",
      },
      external_display_id: {
        description:
          "An optional, human-readable ID supplied by the 3rd-party Call provider. If supplied, this ID will be displayed in the Call object.",
        type: "string",
      },
      join_url: {
        description: "The URL required for a client to join the Call.",
        type: "string",
      },
      desktop_app_join_url: {
        description:
          "When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL.",
        type: "string",
      },
      date_start: {
        description: "Call start time in UTC UNIX timestamp format",
        type: "integer",
      },
      title: {
        description: "The name of the Call.",
        type: "string",
      },
      created_by: {
        description:
          "The valid Slack user ID of the user who created this Call. When this method is called with a user token, the `created_by` field is optional and defaults to the authed user of the token. Otherwise, the field is required.",
        type: "string",
      },
      users: {
        description:
          "The list of users to register as participants in the Call. [Read more on how to specify users here](https://api.slack.com/apis/calls#users).",
        type: "string",
      },
    },
    required: ["external_unique_id", "join_url"],
  },
  CallsAddResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  CallsEndRequest: {
    type: "object",
    properties: {
      id: {
        description:
          "`id` returned when registering the call using the [`calls.add`](https://api.slack.com/methods/calls.add) method.",
        type: "string",
      },
      duration: {
        description: "Call duration in seconds",
        type: "integer",
      },
    },
    required: ["id"],
  },
  CallsEndResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  CallsInfoResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  CallsParticipantsAddRequest: {
    type: "object",
    properties: {
      id: {
        description: "`id` returned by the [`calls.add`](https://api.slack.com/methods/calls.add) method.",
        type: "string",
      },
      users: {
        description:
          "The list of users to add as participants in the Call. [Read more on how to specify users here](https://api.slack.com/apis/calls#users).",
        type: "string",
      },
    },
    required: ["id", "users"],
  },
  CallsParticipantsAddResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  CallsParticipantsRemoveRequest: {
    type: "object",
    properties: {
      id: {
        description: "`id` returned by the [`calls.add`](https://api.slack.com/methods/calls.add) method.",
        type: "string",
      },
      users: {
        description:
          "The list of users to remove as participants in the Call. [Read more on how to specify users here](https://api.slack.com/apis/calls#users).",
        type: "string",
      },
    },
    required: ["id", "users"],
  },
  CallsParticipantsRemoveResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  CallsUpdateRequest: {
    type: "object",
    properties: {
      id: {
        description: "`id` returned by the [`calls.add`](https://api.slack.com/methods/calls.add) method.",
        type: "string",
      },
      title: {
        description: "The name of the Call.",
        type: "string",
      },
      join_url: {
        description: "The URL required for a client to join the Call.",
        type: "string",
      },
      desktop_app_join_url: {
        description:
          "When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL.",
        type: "string",
      },
    },
    required: ["id"],
  },
  CallsUpdateResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatDeleteRequest: {
    type: "object",
    properties: {
      ts: {
        description: "Timestamp of the message to be deleted.",
        type: "string",
      },
      channel: {
        description: "Channel containing the message to be deleted.",
        type: "string",
      },
      as_user: {
        description:
          "Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](https://api.slack.com/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope.",
        type: "boolean",
      },
    },
    required: [],
  },
  ChatDeleteResponse: {
    description: "Schema for successful response of chat.delete method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "defs_channel",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      ts: {
        type: "ref",
        ref: "defs_ts",
      },
    },
    required: ["ok", "channel", "ts"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatDeleteScheduledMessageRequest: {
    type: "object",
    properties: {
      as_user: {
        description:
          "Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](https://api.slack.com/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope.",
        type: "boolean",
      },
      channel: {
        description: "The channel the scheduled_message is posting to",
        type: "string",
      },
      scheduled_message_id: {
        description: "`scheduled_message_id` returned from call to chat.scheduleMessage",
        type: "string",
      },
    },
    required: ["channel", "scheduled_message_id"],
  },
  ChatDeleteScheduledMessageResponse: {
    description: "Schema for successful response from chat.deleteScheduledMessage method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatGetPermalinkResponse: {
    description: "Schema for successful response chat.getPermalink",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "defs_channel",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      permalink: {
        type: "string",
      },
    },
    required: ["ok", "channel", "permalink"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatMeMessageRequest: {
    type: "object",
    properties: {
      channel: {
        description:
          "Channel to send message to. Can be a public channel, private group or IM channel. Can be an encoded ID, or a name.",
        type: "string",
      },
      text: {
        description: "Text of the message to send.",
        type: "string",
      },
    },
    required: [],
  },
  ChatMeMessageResponse: {
    description: "Schema for successful response from chat.meMessage method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "defs_channel",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      ts: {
        type: "ref",
        ref: "defs_ts",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatPostEphemeralRequest: {
    type: "object",
    properties: {
      as_user: {
        description:
          "Pass true to post the message as the authed user. Defaults to true if the chat:write:bot scope is not included. Otherwise, defaults to false.",
        type: "boolean",
      },
      attachments: {
        description: "A JSON-based array of structured attachments, presented as a URL-encoded string.",
        type: "string",
      },
      blocks: {
        description: "A JSON-based array of structured blocks, presented as a URL-encoded string.",
        type: "string",
      },
      channel: {
        description: "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",
        type: "string",
      },
      icon_emoji: {
        description:
          "Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See authorship below.",
        type: "string",
      },
      icon_url: {
        description:
          "URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See authorship below.",
        type: "string",
      },
      link_names: {
        description: "Find and link channel names and usernames.",
        type: "boolean",
      },
      parse: {
        description: "Change how messages are treated. Defaults to `none`. See below.",
        type: "string",
      },
      text: {
        description:
          "How this field works and whether it is required depends on other fields you use in your API call. See below for more detail.",
        type: "string",
      },
      thread_ts: {
        description:
          "Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts` value; use its parent's value instead. Ephemeral messages in threads are only shown if there is already an active thread.",
        type: "string",
      },
      user: {
        description:
          "`id` of the user who will receive the ephemeral message. The user should be in the channel specified by the `channel` argument.",
        type: "string",
      },
      username: {
        description:
          "Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See authorship below.",
        type: "string",
      },
    },
    required: ["channel", "user"],
  },
  ChatPostEphemeralResponse: {
    description: "Schema for successful response from chat.postEphemeral method",
    type: "object",
    properties: {
      message_ts: {
        type: "ref",
        ref: "defs_ts",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "message_ts"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatPostMessageRequest: {
    type: "object",
    properties: {
      as_user: {
        description:
          "Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See authorship below.",
        type: "string",
      },
      attachments: {
        description: "A JSON-based array of structured attachments, presented as a URL-encoded string.",
        type: "string",
      },
      blocks: {
        description: "A JSON-based array of structured blocks, presented as a URL-encoded string.",
        type: "string",
      },
      channel: {
        description:
          "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. See below for more details.",
        type: "string",
      },
      icon_emoji: {
        description:
          "Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See authorship below.",
        type: "string",
      },
      icon_url: {
        description:
          "URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See authorship below.",
        type: "string",
      },
      link_names: {
        description: "Find and link channel names and usernames.",
        type: "boolean",
      },
      mrkdwn: {
        description: "Disable Slack markup parsing by setting to `false`. Enabled by default.",
        type: "boolean",
      },
      parse: {
        description: "Change how messages are treated. Defaults to `none`. See below.",
        type: "string",
      },
      reply_broadcast: {
        description:
          "Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`.",
        type: "boolean",
      },
      text: {
        description:
          "How this field works and whether it is required depends on other fields you use in your API call. See below for more detail.",
        type: "string",
      },
      thread_ts: {
        description:
          "Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead.",
        type: "string",
      },
      unfurl_links: {
        description: "Pass true to enable unfurling of primarily text-based content.",
        type: "boolean",
      },
      unfurl_media: {
        description: "Pass false to disable unfurling of media content.",
        type: "boolean",
      },
      username: {
        description:
          "Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See authorship below.",
        type: "string",
      },
    },
    required: ["channel"],
  },
  ChatPostMessageResponse: {
    description: "Schema for successful response of chat.postMessage method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "defs_channel",
      },
      message: {
        type: "ref",
        ref: "objs_message",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      ts: {
        type: "ref",
        ref: "defs_ts",
      },
    },
    required: ["ok", "channel", "ts", "message"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatScheduleMessageRequest: {
    type: "object",
    properties: {
      channel: {
        description:
          "Channel, private group, or DM channel to send message to. Can be an encoded ID, or a name. See below for more details.",
        type: "string",
      },
      text: {
        description:
          "How this field works and whether it is required depends on other fields you use in your API call. See below for more detail.",
        type: "string",
      },
      post_at: {
        description: "Unix EPOCH timestamp of time in future to send the message.",
        type: "string",
      },
      parse: {
        description:
          "Change how messages are treated. Defaults to `none`. See [chat.postMessage](chat.postMessage#formatting).",
        type: "string",
      },
      as_user: {
        description:
          "Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See [chat.postMessage](chat.postMessage#authorship).",
        type: "boolean",
      },
      link_names: {
        description: "Find and link channel names and usernames.",
        type: "boolean",
      },
      attachments: {
        description: "A JSON-based array of structured attachments, presented as a URL-encoded string.",
        type: "string",
      },
      blocks: {
        description: "A JSON-based array of structured blocks, presented as a URL-encoded string.",
        type: "string",
      },
      unfurl_links: {
        description: "Pass true to enable unfurling of primarily text-based content.",
        type: "boolean",
      },
      unfurl_media: {
        description: "Pass false to disable unfurling of media content.",
        type: "boolean",
      },
      thread_ts: {
        description:
          "Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead.",
        type: "string",
      },
      reply_broadcast: {
        description:
          "Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`.",
        type: "boolean",
      },
    },
    required: [],
  },
  ChatScheduleMessageResponse: {
    description: "Schema for successful response of chat.scheduleMessage method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "defs_channel",
      },
      message: {
        type: "object",
        properties: {
          bot_id: {
            type: "ref",
            ref: "defs_bot_id",
          },
          bot_profile: {
            type: "ref",
            ref: "objs_bot_profile",
          },
          team: {
            type: "ref",
            ref: "defs_team",
          },
          text: {
            type: "string",
          },
          type: {
            type: "string",
          },
          user: {
            type: "ref",
            ref: "defs_user_id",
          },
          username: {
            type: "string",
          },
        },
        required: ["type", "text", "bot_id", "user", "team"],
        additionalProperties: {
          type: "unknown",
        },
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      post_at: {
        type: "integer",
      },
      scheduled_message_id: {
        type: "string",
        pattern: "^[Q][A-Z0-9]{8,}$",
      },
    },
    required: ["ok", "channel", "post_at", "scheduled_message_id", "message"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatScheduledMessagesListResponse: {
    description: "Schema for successful response from chat.scheduledMessages.list method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: ["next_cursor"],
        additionalProperties: {
          type: "unknown",
        },
      },
      scheduled_messages: {
        type: "array",
        items: {
          type: "object",
          properties: {
            channel_id: {
              type: "ref",
              ref: "defs_channel_id",
            },
            date_created: {
              type: "integer",
            },
            id: {
              type: "string",
              pattern: "^[Q][A-Z0-9]{8,}$",
            },
            post_at: {
              type: "integer",
            },
            text: {
              type: "string",
            },
          },
          required: ["id", "channel_id", "post_at", "date_created"],
          additionalProperties: {
            type: "unknown",
          },
        },
      },
    },
    required: ["ok", "scheduled_messages", "response_metadata"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatUnfurlRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Channel ID of the message",
        type: "string",
      },
      ts: {
        description: "Timestamp of the message to add unfurl behavior to.",
        type: "string",
      },
      unfurls: {
        description:
          "URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl blocks or message attachments.",
        type: "string",
      },
      user_auth_message: {
        description:
          "Provide a simply-formatted string to send as an ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior",
        type: "string",
      },
      user_auth_required: {
        description:
          "Set to `true` or `1` to indicate the user must install your Slack app to trigger unfurls for this domain",
        type: "boolean",
      },
      user_auth_url: {
        description:
          "Send users to this custom URL where they will complete authentication in your app to fully trigger unfurling. Value should be properly URL-encoded.",
        type: "string",
      },
    },
    required: ["channel", "ts"],
  },
  ChatUnfurlResponse: {
    description: "Schema for successful response from chat.unfurl method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ChatUpdateRequest: {
    type: "object",
    properties: {
      as_user: {
        description:
          "Pass true to update the message as the authed user. [Bot users](https://api.slack.com/bot-users) in this context are considered authed users.",
        type: "string",
      },
      attachments: {
        description:
          "A JSON-based array of structured attachments, presented as a URL-encoded string. This field is required when not presenting `text`. If you don't include this field, the message's previous `attachments` will be retained. To remove previous `attachments`, include an empty array for this field.",
        type: "string",
      },
      blocks: {
        description:
          "A JSON-based array of [structured blocks](https://api.slack.com/block-kit/building), presented as a URL-encoded string. If you don't include this field, the message's previous `blocks` will be retained. To remove previous `blocks`, include an empty array for this field.",
        type: "string",
      },
      channel: {
        description: "Channel containing the message to be updated.",
        type: "string",
      },
      link_names: {
        description:
          "Find and link channel names and usernames. Defaults to `none`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `none`.",
        type: "string",
      },
      parse: {
        description:
          "Change how messages are treated. Defaults to `client`, unlike `chat.postMessage`. Accepts either `none` or `full`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `client`.",
        type: "string",
      },
      text: {
        description:
          "New text for the message, using the [default formatting rules](https://api.slack.com/reference/surfaces/formatting). It's not required when presenting `blocks` or `attachments`.",
        type: "string",
      },
      ts: {
        description: "Timestamp of the message to be updated.",
        type: "string",
      },
    },
    required: ["channel", "ts"],
  },
  ChatUpdateResponse: {
    description: "Schema for successful response of chat.update method",
    type: "object",
    properties: {
      channel: {
        type: "string",
      },
      message: {
        type: "object",
        properties: {
          attachments: {
            type: "array",
            items: {
              type: "object",
              properties: {},
              required: [],
            },
          },
          blocks: {
            type: "object",
            properties: {},
            required: [],
          },
          text: {
            type: "string",
          },
        },
        required: ["text"],
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      text: {
        type: "string",
      },
      ts: {
        type: "string",
      },
    },
    required: ["ok", "channel", "ts", "text", "message"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsArchiveRequest: {
    type: "object",
    properties: {
      channel: {
        description: "ID of conversation to archive",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsArchiveResponse: {
    description: "Schema for successful response conversations.archive method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsCloseRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Conversation to close.",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsCloseResponse: {
    description: "Schema for successful response conversations.close method",
    type: "object",
    properties: {
      already_closed: {
        type: "boolean",
      },
      no_op: {
        type: "boolean",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsCreateRequest: {
    type: "object",
    properties: {
      name: {
        description: "Name of the public or private channel to create",
        type: "string",
      },
      is_private: {
        description: "Create a private channel instead of a public one",
        type: "boolean",
      },
    },
    required: [],
  },
  ConversationsCreateResponse: {
    description: "Schema for successful response conversations.create method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsHistoryResponse: {
    description: "Schema for successful response from conversations.history method",
    type: "object",
    properties: {
      channel_actions_count: {
        type: "integer",
      },
      channel_actions_ts: {
        type: "integer",
        nullable: true,
      },
      has_more: {
        type: "boolean",
      },
      messages: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_message",
        },
        minItems: 0,
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      pin_count: {
        type: "integer",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: [],
      },
    },
    required: ["ok", "messages", "has_more", "pin_count", "channel_actions_ts", "channel_actions_count"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsInfoResponse: {
    description: "Schema for successful response conversations.info",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsInviteRequest: {
    type: "object",
    properties: {
      channel: {
        description: "The ID of the public or private channel to invite user(s) to.",
        type: "string",
      },
      users: {
        description: "A comma separated list of user IDs. Up to 1000 users may be listed.",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsInviteResponse: {
    description: "Schema for successful response from conversations.invite method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsJoinRequest: {
    type: "object",
    properties: {
      channel: {
        description: "ID of conversation to join",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsJoinResponse: {
    description: "Schema for successful response from conversations.join method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          warnings: {
            type: "array",
            items: {
              type: "string",
            },
            minItems: 0,
            uniqueItems: true,
          },
        },
        required: [],
      },
      warning: {
        type: "string",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsKickRequest: {
    type: "object",
    properties: {
      channel: {
        description: "ID of conversation to remove user from.",
        type: "string",
      },
      user: {
        description: "User ID to be removed.",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsKickResponse: {
    description: "Schema for successful response conversations.kick method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsLeaveRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Conversation to leave",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsLeaveResponse: {
    description: "Schema for successful response from conversations.leave method",
    type: "object",
    properties: {
      not_in_channel: {
        type: "boolean",
        enum: [true],
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsListResponse: {
    description: "Schema for successful response from conversations.list method",
    type: "object",
    properties: {
      channels: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_conversation",
        },
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: ["next_cursor"],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "channels"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsMarkRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Channel or conversation to set the read cursor for.",
        type: "string",
      },
      ts: {
        description: "Unique identifier of message you want marked as most recently seen in this conversation.",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsMarkResponse: {
    description: "Schema for successful response conversations.mark method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsMembersResponse: {
    description: "Schema for successful response conversations.members method",
    type: "object",
    properties: {
      members: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_user_id",
        },
        minItems: 0,
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: ["next_cursor"],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "members", "response_metadata"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsOpenRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Resume a conversation by supplying an `im` or `mpim`'s ID. Or provide the `users` field instead.",
        type: "string",
      },
      users: {
        description:
          "Comma separated lists of users. If only one user is included, this creates a 1:1 DM.  The ordering of the users is preserved whenever a multi-person direct message is returned. Supply a `channel` when not supplying `users`.",
        type: "string",
      },
      return_im: {
        description: "Boolean, indicates you want the full IM channel definition in the response.",
        type: "boolean",
      },
    },
    required: [],
  },
  ConversationsOpenResponse: {
    description: "Schema for successful response from conversations.open method when opening channels, ims, mpims",
    type: "object",
    properties: {
      already_open: {
        type: "boolean",
      },
      channel: {
        type: "union",
        of: [
          {
            type: "ref",
            ref: "objs_conversation",
          },
          {
            type: "object",
            properties: {
              created: {
                type: "string",
              },
              id: {
                type: "ref",
                ref: "defs_dm_id",
              },
              is_im: {
                type: "boolean",
              },
              is_open: {
                type: "boolean",
              },
              last_read: {
                type: "ref",
                ref: "defs_ts",
              },
              latest: {
                type: "ref",
                ref: "objs_message",
              },
              unread_count: {
                type: "number",
              },
              unread_count_display: {
                type: "number",
              },
              user: {
                type: "ref",
                ref: "defs_user_id",
              },
            },
            required: ["id"],
            additionalProperties: {
              type: "unknown",
            },
          },
        ],
      },
      no_op: {
        type: "boolean",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsRenameRequest: {
    type: "object",
    properties: {
      channel: {
        description: "ID of conversation to rename",
        type: "string",
      },
      name: {
        description: "New name for conversation.",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsRenameResponse: {
    description: "Schema for successful response from conversations.rename method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsRepliesResponse: {
    description: "Schema for successful response from conversations.replies method",
    type: "object",
    properties: {
      has_more: {
        type: "boolean",
      },
      messages: {
        type: "array",
        items: {
          type: "union",
          of: [
            {
              type: "object",
              properties: {
                last_read: {
                  type: "ref",
                  ref: "defs_ts",
                },
                latest_reply: {
                  type: "ref",
                  ref: "defs_ts",
                },
                reply_count: {
                  type: "integer",
                },
                reply_users: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "defs_user_id",
                  },
                  uniqueItems: true,
                },
                reply_users_count: {
                  type: "integer",
                },
                source_team: {
                  type: "ref",
                  ref: "defs_team",
                },
                subscribed: {
                  type: "boolean",
                },
                team: {
                  type: "ref",
                  ref: "defs_team",
                },
                text: {
                  type: "string",
                },
                thread_ts: {
                  type: "ref",
                  ref: "defs_ts",
                },
                ts: {
                  type: "ref",
                  ref: "defs_ts",
                },
                type: {
                  type: "string",
                },
                unread_count: {
                  type: "integer",
                },
                user: {
                  type: "ref",
                  ref: "defs_user_id",
                },
                user_profile: {
                  type: "ref",
                  ref: "objs_user_profile_short",
                },
                user_team: {
                  type: "ref",
                  ref: "defs_team",
                },
              },
              required: ["type", "user", "text", "thread_ts", "reply_count", "subscribed", "ts"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                is_starred: {
                  type: "boolean",
                },
                parent_user_id: {
                  type: "ref",
                  ref: "defs_user_id",
                },
                source_team: {
                  type: "ref",
                  ref: "defs_team",
                },
                team: {
                  type: "ref",
                  ref: "defs_team",
                },
                text: {
                  type: "string",
                },
                thread_ts: {
                  type: "ref",
                  ref: "defs_ts",
                },
                ts: {
                  type: "ref",
                  ref: "defs_ts",
                },
                type: {
                  type: "string",
                },
                user: {
                  type: "ref",
                  ref: "defs_user_id",
                },
                user_profile: {
                  type: "ref",
                  ref: "objs_user_profile_short",
                },
                user_team: {
                  type: "ref",
                  ref: "defs_team",
                },
              },
              required: ["type", "user", "text", "thread_ts", "parent_user_id", "ts"],
              additionalProperties: {
                type: "unknown",
              },
            },
          ],
        },
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: [],
      },
    },
    required: ["ok", "messages"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsSetPurposeRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Conversation to set the purpose of",
        type: "string",
      },
      purpose: {
        description: "A new, specialer purpose",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsSetPurposeResponse: {
    description: "Schema for successful response from conversations.setPurpose method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsSetTopicRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Conversation to set the topic of",
        type: "string",
      },
      topic: {
        description: "The new topic string. Does not support formatting or linkification.",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsSetTopicResponse: {
    description: "Schema for successful response from conversations.setTopic method",
    type: "object",
    properties: {
      channel: {
        type: "ref",
        ref: "objs_conversation",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "channel"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ConversationsUnarchiveRequest: {
    type: "object",
    properties: {
      channel: {
        description: "ID of conversation to unarchive",
        type: "string",
      },
    },
    required: [],
  },
  ConversationsUnarchiveResponse: {
    description: "Schema for successful response from conversations.unarchive method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  DialogOpenResponse: {
    description: "Schema for successful response from dialog.open method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  DndEndDndResponse: {
    description: "Schema for successful response from dnd.endDnd method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  DndEndSnoozeResponse: {
    description: "Schema for successful response from dnd.endSnooze method",
    type: "object",
    properties: {
      dnd_enabled: {
        type: "boolean",
      },
      next_dnd_end_ts: {
        type: "integer",
      },
      next_dnd_start_ts: {
        type: "integer",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      snooze_enabled: {
        type: "boolean",
      },
    },
    required: ["ok", "dnd_enabled", "next_dnd_start_ts", "next_dnd_end_ts", "snooze_enabled"],
    additionalProperties: {
      type: "unknown",
    },
  },
  DndInfoResponse: {
    description: "Schema for successful response from dnd.info method",
    type: "object",
    properties: {
      dnd_enabled: {
        type: "boolean",
      },
      next_dnd_end_ts: {
        type: "integer",
      },
      next_dnd_start_ts: {
        type: "integer",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      snooze_enabled: {
        type: "boolean",
      },
      snooze_endtime: {
        type: "integer",
      },
      snooze_remaining: {
        type: "integer",
      },
    },
    required: ["ok", "dnd_enabled", "next_dnd_start_ts", "next_dnd_end_ts"],
    additionalProperties: {
      type: "unknown",
    },
  },
  DndSetSnoozeRequest: {
    type: "object",
    properties: {
      num_minutes: {
        description: "Number of minutes, from now, to snooze until.",
        type: "string",
      },
    },
    required: ["num_minutes"],
  },
  DndSetSnoozeResponse: {
    description: "Schema for successful response from dnd.setSnooze method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      snooze_enabled: {
        type: "boolean",
      },
      snooze_endtime: {
        type: "integer",
      },
      snooze_remaining: {
        type: "integer",
      },
    },
    required: ["ok", "snooze_enabled", "snooze_endtime", "snooze_remaining"],
    additionalProperties: {
      type: "unknown",
    },
  },
  DndTeamInfoResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  EmojiListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesCommentsDeleteRequest: {
    type: "object",
    properties: {
      file: {
        description: "File to delete a comment from.",
        type: "string",
      },
      id: {
        description: "The comment to delete.",
        type: "string",
      },
    },
    required: [],
  },
  FilesCommentsDeleteResponse: {
    description: "Schema for successful response files.comments.delete method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesDeleteRequest: {
    type: "object",
    properties: {
      file: {
        description: "ID of file to delete.",
        type: "string",
      },
    },
    required: [],
  },
  FilesDeleteResponse: {
    description: "Schema for successful response files.delete method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesInfoResponse: {
    description: "Schema for successful response from files.info method",
    type: "object",
    properties: {
      comments: {
        type: "ref",
        ref: "objs_comments",
      },
      content_html: {
        type: "unknown",
      },
      editor: {
        type: "ref",
        ref: "defs_user_id",
      },
      file: {
        type: "ref",
        ref: "objs_file",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      paging: {
        type: "ref",
        ref: "objs_paging",
      },
      response_metadata: {
        type: "ref",
        ref: "objs_response_metadata",
      },
    },
    required: ["ok", "file", "comments"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesListResponse: {
    description: "Schema for successful response from files.list method",
    type: "object",
    properties: {
      files: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_file",
        },
        minItems: 0,
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      paging: {
        type: "ref",
        ref: "objs_paging",
      },
    },
    required: ["ok", "files", "paging"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRemoteAddRequest: {
    type: "object",
    properties: {
      external_id: {
        description: "Creator defined GUID for the file.",
        type: "string",
      },
      title: {
        description: "Title of the file being shared.",
        type: "string",
      },
      filetype: {
        description: "type of file",
        type: "string",
      },
      external_url: {
        description: "URL of the remote file.",
        type: "string",
      },
      preview_image: {
        description: "Preview of the document via `multipart/form-data`.",
        type: "string",
      },
      indexable_file_contents: {
        description:
          "A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery of the remote file.",
        type: "string",
      },
    },
    required: [],
  },
  FilesRemoteAddResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRemoteInfoResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRemoteListResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRemoteRemoveRequest: {
    type: "object",
    properties: {
      file: {
        description: "Specify a file by providing its ID.",
        type: "string",
      },
      external_id: {
        description: "Creator defined GUID for the file.",
        type: "string",
      },
    },
    required: [],
  },
  FilesRemoteRemoveResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRemoteShareResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRemoteUpdateRequest: {
    type: "object",
    properties: {
      file: {
        description: "Specify a file by providing its ID.",
        type: "string",
      },
      external_id: {
        description: "Creator defined GUID for the file.",
        type: "string",
      },
      title: {
        description: "Title of the file being shared.",
        type: "string",
      },
      filetype: {
        description: "type of file",
        type: "string",
      },
      external_url: {
        description: "URL of the remote file.",
        type: "string",
      },
      preview_image: {
        description: "Preview of the document via `multipart/form-data`.",
        type: "string",
      },
      indexable_file_contents: {
        description: "File containing contents that can be used to improve searchability for the remote file.",
        type: "string",
      },
    },
    required: [],
  },
  FilesRemoteUpdateResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesRevokePublicURLRequest: {
    type: "object",
    properties: {
      file: {
        description: "File to revoke",
        type: "string",
      },
    },
    required: [],
  },
  FilesRevokePublicURLResponse: {
    description: "Schema for successful response from files.revokePublicURL method",
    type: "object",
    properties: {
      file: {
        type: "ref",
        ref: "objs_file",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "file"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesSharedPublicURLRequest: {
    type: "object",
    properties: {
      file: {
        description: "File to share",
        type: "string",
      },
    },
    required: [],
  },
  FilesSharedPublicURLResponse: {
    description: "Schema for successful response from files.sharedPublicURL method",
    type: "object",
    properties: {
      file: {
        type: "ref",
        ref: "objs_file",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "file"],
    additionalProperties: {
      type: "unknown",
    },
  },
  FilesUploadRequest: {
    type: "object",
    properties: {
      file: {
        description: "File contents via `multipart/form-data`. If omitting this parameter, you must submit `content`.",
        type: "string",
      },
      content: {
        description: "File contents via a POST variable. If omitting this parameter, you must provide a `file`.",
        type: "string",
      },
      filetype: {
        description: "A [file type](https://api.slack.com/types/file#file_types) identifier.",
        type: "string",
      },
      filename: {
        description: "Filename of file.",
        type: "string",
      },
      title: {
        description: "Title of file.",
        type: "string",
      },
      initial_comment: {
        description: "The message text introducing the file in specified `channels`.",
        type: "string",
      },
      channels: {
        description: "Comma-separated list of channel names or IDs where the file will be shared.",
        type: "string",
      },
      thread_ts: {
        description:
          "Provide another message's `ts` value to upload this file as a reply. Never use a reply's `ts` value; use its parent instead.",
        type: "string",
      },
    },
    required: [],
  },
  FilesUploadResponse: {
    description: "Schema for successful response files.upload method",
    type: "object",
    properties: {
      file: {
        type: "ref",
        ref: "objs_file",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok", "file"],
    additionalProperties: {
      type: "unknown",
    },
  },
  MigrationExchangeResponse: {
    description: "Schema for successful response from migration.exchange method",
    type: "object",
    properties: {
      enterprise_id: {
        type: "string",
      },
      invalid_user_ids: {
        type: "array",
        items: {
          type: "string",
        },
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      team_id: {
        type: "ref",
        ref: "defs_team",
      },
      user_id_map: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "team_id", "enterprise_id"],
    additionalProperties: {
      type: "unknown",
    },
  },
  OauthAccessResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      access_token: {
        type: "string",
        sensitive: true,
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  OauthTokenResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      access_token: {
        type: "string",
        sensitive: true,
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  OauthV2AccessResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      access_token: {
        type: "string",
        sensitive: true,
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  PinsAddRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Channel to pin the item in.",
        type: "string",
      },
      timestamp: {
        description: "Timestamp of the message to pin.",
        type: "string",
      },
    },
    required: ["channel"],
  },
  PinsAddResponse: {
    description: "Schema for successful response from pins.add method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  PinsListResponse: {
    description: "Schema for successful response from pins.list method",
    type: "union",
    of: [
      {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "union",
              of: [
                {
                  type: "object",
                  properties: {
                    created: {
                      type: "integer",
                    },
                    created_by: {
                      type: "ref",
                      ref: "defs_user_id",
                    },
                    file: {
                      type: "ref",
                      ref: "objs_file",
                    },
                    type: {
                      type: "string",
                      enum: ["file"],
                    },
                  },
                  required: [],
                  additionalProperties: {
                    type: "unknown",
                  },
                },
                {
                  type: "object",
                  properties: {
                    channel: {
                      type: "ref",
                      ref: "defs_channel",
                    },
                    created: {
                      type: "integer",
                    },
                    created_by: {
                      type: "ref",
                      ref: "defs_user_id",
                    },
                    message: {
                      type: "ref",
                      ref: "objs_message",
                    },
                    type: {
                      type: "string",
                      enum: ["message"],
                    },
                  },
                  required: [],
                  additionalProperties: {
                    type: "unknown",
                  },
                },
              ],
            },
            uniqueItems: true,
          },
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
        },
        required: ["ok", "items"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        type: "object",
        properties: {
          count: {
            type: "integer",
          },
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
        },
        required: ["ok", "count"],
        additionalProperties: {
          type: "unknown",
        },
      },
    ],
  },
  PinsRemoveRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Channel where the item is pinned to.",
        type: "string",
      },
      timestamp: {
        description: "Timestamp of the message to un-pin.",
        type: "string",
      },
    },
    required: ["channel"],
  },
  PinsRemoveResponse: {
    description: "Schema for successful response from pins.remove method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ReactionsAddRequest: {
    type: "object",
    properties: {
      channel: {
        description: "Channel where the message to add reaction to was posted.",
        type: "string",
      },
      name: {
        description: "Reaction (emoji) name.",
        type: "string",
      },
      timestamp: {
        description: "Timestamp of the message to add reaction to.",
        type: "string",
      },
    },
    required: ["channel", "name", "timestamp"],
  },
  ReactionsAddResponse: {
    description: "Schema for successful response from reactions.add method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ReactionsGetResponse: {
    description: "Schema for successful response from reactions.get method",
    type: "union",
    of: [
      {
        type: "object",
        properties: {
          channel: {
            type: "ref",
            ref: "defs_channel",
          },
          message: {
            type: "ref",
            ref: "objs_message",
          },
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          type: {
            type: "string",
            enum: ["message"],
          },
        },
        required: ["ok", "type", "channel", "message"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        type: "object",
        properties: {
          file: {
            type: "ref",
            ref: "objs_file",
          },
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          type: {
            type: "string",
            enum: ["file"],
          },
        },
        required: ["ok", "type", "file"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        type: "object",
        properties: {
          comment: {
            type: "ref",
            ref: "objs_comment",
          },
          file: {
            type: "ref",
            ref: "objs_file",
          },
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          type: {
            type: "string",
            enum: ["file_comment"],
          },
        },
        required: ["ok", "type", "file", "comment"],
        additionalProperties: {
          type: "unknown",
        },
      },
    ],
  },
  ReactionsListResponse: {
    description: "Schema for successful response from reactions.list method",
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "union",
          of: [
            {
              type: "object",
              properties: {
                channel: {
                  type: "ref",
                  ref: "defs_channel",
                },
                message: {
                  type: "ref",
                  ref: "objs_message",
                },
                type: {
                  type: "string",
                  enum: ["message"],
                },
              },
              required: ["type", "channel", "message"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                file: {
                  type: "ref",
                  ref: "objs_file",
                },
                type: {
                  type: "string",
                  enum: ["file"],
                },
              },
              required: ["type", "file"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                comment: {
                  type: "ref",
                  ref: "objs_comment",
                },
                file: {
                  type: "ref",
                  ref: "objs_file",
                },
                type: {
                  type: "string",
                  enum: ["file_comment"],
                },
              },
              required: ["type", "file", "comment"],
              additionalProperties: {
                type: "unknown",
              },
            },
          ],
        },
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      paging: {
        type: "ref",
        ref: "objs_paging",
      },
      response_metadata: {
        type: "ref",
        ref: "objs_response_metadata",
      },
    },
    required: ["ok", "items"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ReactionsRemoveRequest: {
    type: "object",
    properties: {
      name: {
        description: "Reaction (emoji) name.",
        type: "string",
      },
      file: {
        description: "File to remove reaction from.",
        type: "string",
      },
      file_comment: {
        description: "File comment to remove reaction from.",
        type: "string",
      },
      channel: {
        description: "Channel where the message to remove reaction from was posted.",
        type: "string",
      },
      timestamp: {
        description: "Timestamp of the message to remove reaction from.",
        type: "string",
      },
    },
    required: ["name"],
  },
  ReactionsRemoveResponse: {
    description: "Schema for successful response from reactions.remove method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  RemindersAddRequest: {
    type: "object",
    properties: {
      text: {
        description: "The content of the reminder",
        type: "string",
      },
      time: {
        description:
          'When this reminder should happen: the Unix timestamp (up to five years from now), the number of seconds until the reminder (if within 24 hours), or a natural language description (Ex. "in 15 minutes," or "every Thursday")',
        type: "string",
      },
      user: {
        description:
          "The user who will receive the reminder. If no user is specified, the reminder will go to user who created it.",
        type: "string",
      },
    },
    required: ["text", "time"],
  },
  RemindersAddResponse: {
    description: "Schema for successful response from reminders.add method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      reminder: {
        type: "ref",
        ref: "objs_reminder",
      },
    },
    required: ["ok", "reminder"],
    additionalProperties: {
      type: "unknown",
    },
  },
  RemindersCompleteRequest: {
    type: "object",
    properties: {
      reminder: {
        description: "The ID of the reminder to be marked as complete",
        type: "string",
      },
    },
    required: [],
  },
  RemindersCompleteResponse: {
    description: "Schema for successful response from reminders.complete method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  RemindersDeleteRequest: {
    type: "object",
    properties: {
      reminder: {
        description: "The ID of the reminder",
        type: "string",
      },
    },
    required: [],
  },
  RemindersDeleteResponse: {
    description: "Schema for successful response from reminders.delete method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  RemindersInfoResponse: {
    description: "Schema for successful response from reminders.info method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      reminder: {
        type: "ref",
        ref: "objs_reminder",
      },
    },
    required: ["ok", "reminder"],
    additionalProperties: {
      type: "unknown",
    },
  },
  RemindersListResponse: {
    description: "Schema for successful response from reminders.list method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      reminders: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_reminder",
        },
      },
    },
    required: ["ok", "reminders"],
    additionalProperties: {
      type: "unknown",
    },
  },
  RtmConnectResponse: {
    description: "Schema for successful response from rtm.connect method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      self: {
        type: "object",
        properties: {
          id: {
            type: "ref",
            ref: "defs_user_id",
          },
          name: {
            type: "string",
          },
        },
        required: ["id", "name"],
        additionalProperties: {
          type: "unknown",
        },
      },
      team: {
        type: "object",
        properties: {
          domain: {
            type: "string",
          },
          id: {
            type: "ref",
            ref: "defs_team",
          },
          name: {
            type: "string",
          },
        },
        required: ["id", "name", "domain"],
        additionalProperties: {
          type: "unknown",
        },
      },
      url: {
        type: "string",
        sensitive: true,
      },
    },
    required: ["ok", "url", "team", "self"],
    additionalProperties: {
      type: "unknown",
    },
  },
  SearchMessagesResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  StarsAddRequest: {
    type: "object",
    properties: {
      channel: {
        description:
          "Channel to add star to, or channel where the message to add star to was posted (used with `timestamp`).",
        type: "string",
      },
      file: {
        description: "File to add star to.",
        type: "string",
      },
      file_comment: {
        description: "File comment to add star to.",
        type: "string",
      },
      timestamp: {
        description: "Timestamp of the message to add star to.",
        type: "string",
      },
    },
    required: [],
  },
  StarsAddResponse: {
    description: "Schema for successful response from stars.add method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  StarsListResponse: {
    description: "Schema for successful response from stars.list method",
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "union",
          of: [
            {
              type: "object",
              properties: {
                channel: {
                  type: "ref",
                  ref: "defs_channel",
                },
                date_create: {
                  type: "integer",
                },
                message: {
                  type: "ref",
                  ref: "objs_message",
                },
                type: {
                  type: "string",
                  enum: ["message"],
                },
              },
              required: ["type", "channel", "message", "date_create"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                date_create: {
                  type: "integer",
                },
                file: {
                  type: "ref",
                  ref: "objs_file",
                },
                type: {
                  type: "string",
                  enum: ["file"],
                },
              },
              required: ["type", "file", "date_create"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                comment: {
                  type: "ref",
                  ref: "objs_comment",
                },
                date_create: {
                  type: "integer",
                },
                file: {
                  type: "ref",
                  ref: "objs_file",
                },
                type: {
                  type: "string",
                  enum: ["file_comment"],
                },
              },
              required: ["type", "file", "comment", "date_create"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                channel: {
                  type: "ref",
                  ref: "defs_channel",
                },
                date_create: {
                  type: "integer",
                },
                type: {
                  type: "string",
                  enum: ["channel"],
                },
              },
              required: ["type", "channel", "date_create"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                channel: {
                  type: "ref",
                  ref: "defs_dm_id",
                },
                date_create: {
                  type: "integer",
                },
                type: {
                  type: "string",
                  enum: ["im"],
                },
              },
              required: ["type", "channel", "date_create"],
              additionalProperties: {
                type: "unknown",
              },
            },
            {
              type: "object",
              properties: {
                channel: {
                  type: "ref",
                  ref: "defs_group_id",
                },
                date_create: {
                  type: "integer",
                },
                type: {
                  type: "string",
                  enum: ["group"],
                },
              },
              required: ["type", "channel", "date_create"],
              additionalProperties: {
                type: "unknown",
              },
            },
          ],
        },
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      paging: {
        type: "ref",
        ref: "objs_paging",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: [],
      },
    },
    required: ["ok", "items"],
    additionalProperties: {
      type: "unknown",
    },
  },
  StarsRemoveRequest: {
    type: "object",
    properties: {
      channel: {
        description:
          "Channel to remove star from, or channel where the message to remove star from was posted (used with `timestamp`).",
        type: "string",
      },
      file: {
        description: "File to remove star from.",
        type: "string",
      },
      file_comment: {
        description: "File comment to remove star from.",
        type: "string",
      },
      timestamp: {
        description: "Timestamp of the message to remove star from.",
        type: "string",
      },
    },
    required: [],
  },
  StarsRemoveResponse: {
    description: "Schema for successful response from stars.remove method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  TeamAccessLogsResponse: {
    description: "Schema for successful response from team.accessLogs method",
    type: "object",
    properties: {
      logins: {
        type: "array",
        items: {
          type: "object",
          properties: {
            count: {
              type: "integer",
            },
            country: {
              nullable: true,
              type: "string",
            },
            date_first: {
              type: "integer",
            },
            date_last: {
              type: "integer",
            },
            ip: {
              nullable: true,
              type: "string",
            },
            isp: {
              nullable: true,
              type: "string",
            },
            region: {
              nullable: true,
              type: "string",
            },
            user_agent: {
              type: "string",
            },
            user_id: {
              type: "ref",
              ref: "defs_user_id",
            },
            username: {
              type: "string",
            },
          },
          required: [
            "user_id",
            "username",
            "date_first",
            "date_last",
            "count",
            "ip",
            "user_agent",
            "isp",
            "country",
            "region",
          ],
          additionalProperties: {
            type: "unknown",
          },
        },
        minItems: 0,
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      paging: {
        type: "ref",
        ref: "objs_paging",
      },
    },
    required: ["ok", "logins", "paging"],
    additionalProperties: {
      type: "unknown",
    },
  },
  TeamBillableInfoResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  TeamInfoResponse: {
    description: "Schema for successful response from team.info method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      team: {
        type: "ref",
        ref: "objs_team",
      },
    },
    required: ["ok", "team"],
    additionalProperties: {
      type: "unknown",
    },
  },
  TeamIntegrationLogsResponse: {
    description: "Schema for successful response from team.integrationLogs method",
    type: "object",
    properties: {
      logs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            admin_app_id: {
              type: "ref",
              ref: "defs_app_id",
            },
            app_id: {
              type: "ref",
              ref: "defs_app_id",
            },
            app_type: {
              type: "string",
            },
            change_type: {
              type: "string",
            },
            channel: {
              type: "ref",
              ref: "defs_channel",
            },
            date: {
              type: "string",
            },
            scope: {
              type: "string",
            },
            service_id: {
              type: "string",
            },
            service_type: {
              type: "string",
            },
            user_id: {
              type: "ref",
              ref: "defs_user_id",
            },
            user_name: {
              type: "string",
            },
          },
          required: ["user_id", "user_name", "date", "change_type", "app_type", "app_id", "scope"],
          additionalProperties: {
            type: "unknown",
          },
        },
        minItems: 0,
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      paging: {
        type: "ref",
        ref: "objs_paging",
      },
    },
    required: ["ok", "logs", "paging"],
    additionalProperties: {
      type: "unknown",
    },
  },
  TeamProfileGetResponse: {
    description: "Schema for successful response from team.profile.get method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      profile: {
        type: "object",
        properties: {
          fields: {
            type: "array",
            items: {
              type: "ref",
              ref: "objs_team_profile_field",
            },
            uniqueItems: true,
          },
        },
        required: ["fields"],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "profile"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsCreateRequest: {
    type: "object",
    properties: {
      channels: {
        description: "A comma separated string of encoded channel IDs for which the User Group uses as a default.",
        type: "string",
      },
      description: {
        description: "A short description of the User Group.",
        type: "string",
      },
      handle: {
        description: "A mention handle. Must be unique among channels, users and User Groups.",
        type: "string",
      },
      include_count: {
        description: "Include the number of users in each User Group.",
        type: "boolean",
      },
      name: {
        description: "A name for the User Group. Must be unique among User Groups.",
        type: "string",
      },
    },
    required: ["name"],
  },
  UsergroupsCreateResponse: {
    description: "Schema for successful response from usergroups.create method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      usergroup: {
        type: "ref",
        ref: "objs_subteam",
      },
    },
    required: ["ok", "usergroup"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsDisableRequest: {
    type: "object",
    properties: {
      include_count: {
        description: "Include the number of users in the User Group.",
        type: "boolean",
      },
      usergroup: {
        description: "The encoded ID of the User Group to disable.",
        type: "string",
      },
    },
    required: ["usergroup"],
  },
  UsergroupsDisableResponse: {
    description: "Schema for successful response from usergroups.disable method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      usergroup: {
        type: "ref",
        ref: "objs_subteam",
      },
    },
    required: ["ok", "usergroup"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsEnableRequest: {
    type: "object",
    properties: {
      include_count: {
        description: "Include the number of users in the User Group.",
        type: "boolean",
      },
      usergroup: {
        description: "The encoded ID of the User Group to enable.",
        type: "string",
      },
    },
    required: ["usergroup"],
  },
  UsergroupsEnableResponse: {
    description: "Schema for successful response from usergroups.enable method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      usergroup: {
        type: "ref",
        ref: "objs_subteam",
      },
    },
    required: ["ok", "usergroup"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsListResponse: {
    description: "Schema for successful response from usergroups.list method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      usergroups: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_subteam",
        },
      },
    },
    required: ["ok", "usergroups"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsUpdateRequest: {
    type: "object",
    properties: {
      handle: {
        description: "A mention handle. Must be unique among channels, users and User Groups.",
        type: "string",
      },
      description: {
        description: "A short description of the User Group.",
        type: "string",
      },
      channels: {
        description: "A comma separated string of encoded channel IDs for which the User Group uses as a default.",
        type: "string",
      },
      include_count: {
        description: "Include the number of users in the User Group.",
        type: "boolean",
      },
      usergroup: {
        description: "The encoded ID of the User Group to update.",
        type: "string",
      },
      name: {
        description: "A name for the User Group. Must be unique among User Groups.",
        type: "string",
      },
    },
    required: ["usergroup"],
  },
  UsergroupsUpdateResponse: {
    description: "Schema for successful response from usergroups.update method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      usergroup: {
        type: "ref",
        ref: "objs_subteam",
      },
    },
    required: ["ok", "usergroup"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsUsersListResponse: {
    description: "Schema for successful response from usergroups.users.list method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      users: {
        type: "array",
        items: {
          type: "ref",
          ref: "defs_user_id",
        },
      },
    },
    required: ["ok", "users"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsergroupsUsersUpdateRequest: {
    type: "object",
    properties: {
      include_count: {
        description: "Include the number of users in the User Group.",
        type: "boolean",
      },
      usergroup: {
        description: "The encoded ID of the User Group to update.",
        type: "string",
      },
      users: {
        description:
          "A comma separated string of encoded user IDs that represent the entire list of users for the User Group.",
        type: "string",
      },
    },
    required: ["usergroup", "users"],
  },
  UsergroupsUsersUpdateResponse: {
    description: "Schema for successful response from usergroups.users.update method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      usergroup: {
        type: "ref",
        ref: "objs_subteam",
      },
    },
    required: ["ok", "usergroup"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersConversationsResponse: {
    description:
      "Schema for successful response from users.conversations method. Returned conversation objects do not include `num_members` or `is_member`",
    type: "object",
    properties: {
      channels: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_conversation",
        },
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "object",
        properties: {
          next_cursor: {
            type: "string",
          },
        },
        required: ["next_cursor"],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "channels"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersDeletePhotoRequest: {
    type: "object",
    properties: {},
    required: [],
  },
  UsersDeletePhotoResponse: {
    description: "Schema for successful response from users.deletePhoto method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersGetPresenceResponse: {
    description: "Generated from users.getPresence with shasum e7251aec575d8863f9e0eb38663ae9dc26655f65",
    type: "object",
    properties: {
      auto_away: {
        type: "boolean",
      },
      connection_count: {
        type: "integer",
      },
      last_activity: {
        type: "integer",
      },
      manual_away: {
        type: "boolean",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      online: {
        type: "boolean",
      },
      presence: {
        type: "string",
      },
    },
    required: ["ok", "presence"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersIdentityResponse: {
    description: "Schema for successful response from users.identity method",
    type: "union",
    of: [
      {
        description: "Schema for 'identity.basic' scope",
        type: "object",
        properties: {
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          team: {
            type: "object",
            properties: {
              id: {
                type: "ref",
                ref: "defs_team",
              },
            },
            required: ["id"],
            additionalProperties: {
              type: "unknown",
            },
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "ref",
                ref: "defs_user_id",
              },
              name: {
                type: "string",
              },
            },
            required: ["name", "id"],
            additionalProperties: {
              type: "unknown",
            },
          },
        },
        required: ["ok", "user", "team"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        description: "Schema for 'identity.basic,identity.email' scopes",
        type: "object",
        properties: {
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          team: {
            type: "object",
            properties: {
              id: {
                type: "ref",
                ref: "defs_team",
              },
            },
            required: ["id"],
            additionalProperties: {
              type: "unknown",
            },
          },
          user: {
            type: "object",
            properties: {
              email: {
                type: "string",
              },
              id: {
                type: "ref",
                ref: "defs_user_id",
              },
              name: {
                type: "string",
              },
            },
            required: ["name", "id", "email"],
            additionalProperties: {
              type: "unknown",
            },
          },
        },
        required: ["ok", "user", "team"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        description: "Schema for 'identity.basic,identity.avatar' scopes",
        type: "object",
        properties: {
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          team: {
            type: "object",
            properties: {
              id: {
                type: "ref",
                ref: "defs_team",
              },
            },
            required: ["id"],
            additionalProperties: {
              type: "unknown",
            },
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "ref",
                ref: "defs_user_id",
              },
              image_192: {
                type: "string",
              },
              image_24: {
                type: "string",
              },
              image_32: {
                type: "string",
              },
              image_48: {
                type: "string",
              },
              image_512: {
                type: "string",
              },
              image_72: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
            required: ["name", "id", "image_24", "image_32", "image_48", "image_72", "image_192", "image_512"],
            additionalProperties: {
              type: "unknown",
            },
          },
        },
        required: ["ok", "user", "team"],
        additionalProperties: {
          type: "unknown",
        },
      },
      {
        description: "Schema for 'identity.basic,identity.team' scopes",
        type: "object",
        properties: {
          ok: {
            type: "ref",
            ref: "defs_ok_true",
          },
          team: {
            type: "object",
            properties: {
              domain: {
                type: "string",
              },
              id: {
                type: "ref",
                ref: "defs_team",
              },
              image_102: {
                type: "string",
              },
              image_132: {
                type: "string",
              },
              image_230: {
                type: "string",
              },
              image_34: {
                type: "string",
              },
              image_44: {
                type: "string",
              },
              image_68: {
                type: "string",
              },
              image_88: {
                type: "string",
              },
              image_default: {
                type: "boolean",
              },
              name: {
                type: "string",
              },
            },
            required: [
              "id",
              "name",
              "domain",
              "image_34",
              "image_44",
              "image_68",
              "image_88",
              "image_102",
              "image_132",
              "image_230",
              "image_default",
            ],
            additionalProperties: {
              type: "unknown",
            },
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "ref",
                ref: "defs_user_id",
              },
              name: {
                type: "string",
              },
            },
            required: ["name", "id"],
            additionalProperties: {
              type: "unknown",
            },
          },
        },
        required: ["ok", "user", "team"],
        additionalProperties: {
          type: "unknown",
        },
      },
    ],
  },
  UsersInfoResponse: {
    description: "Schema for successful response from users.info method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      user: {
        type: "ref",
        ref: "objs_user",
      },
    },
    required: ["ok", "user"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersListResponse: {
    description: "Schema for successful response from users.list method",
    type: "object",
    properties: {
      cache_ts: {
        type: "integer",
      },
      members: {
        type: "array",
        items: {
          type: "ref",
          ref: "objs_user",
        },
        minItems: 0,
        uniqueItems: true,
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      response_metadata: {
        type: "ref",
        ref: "objs_response_metadata",
      },
    },
    required: ["ok", "members", "cache_ts"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersLookupByEmailResponse: {
    description: "Schema for successful response from users.lookupByEmail method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      user: {
        type: "ref",
        ref: "objs_user",
      },
    },
    required: ["ok", "user"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersProfileGetResponse: {
    description: "Schema for successful response from users.profile.get method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      profile: {
        type: "ref",
        ref: "objs_user_profile",
      },
    },
    required: ["ok", "profile"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersProfileSetRequest: {
    type: "object",
    properties: {
      name: {
        description: "Name of a single key to set. Usable only if `profile` is not passed.",
        type: "string",
      },
      profile: {
        description:
          "Collection of key:value pairs presented as a URL-encoded JSON hash. At most 50 fields may be set. Each field name is limited to 255 characters.",
        type: "string",
      },
      user: {
        description: "ID of user to change. This argument may only be specified by team admins on paid teams.",
        type: "string",
      },
      value: {
        description: "Value to set a single key to. Usable only if `profile` is not passed.",
        type: "string",
      },
    },
    required: [],
  },
  UsersProfileSetResponse: {
    description: "Schema for successful response from users.profile.set method",
    type: "object",
    properties: {
      email_pending: {
        type: "string",
      },
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      profile: {
        type: "ref",
        ref: "objs_user_profile",
      },
      username: {
        type: "string",
      },
    },
    required: ["ok", "username", "profile"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersSetActiveResponse: {
    description: "Schema for successful response from users.setActive method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersSetPhotoRequest: {
    type: "object",
    properties: {
      crop_w: {
        description: "Width/height of crop box (always square)",
        type: "string",
      },
      crop_x: {
        description: "X coordinate of top-left corner of crop box",
        type: "string",
      },
      crop_y: {
        description: "Y coordinate of top-left corner of crop box",
        type: "string",
      },
      image: {
        description: "File contents via `multipart/form-data`.",
        type: "string",
      },
    },
    required: [],
  },
  UsersSetPhotoResponse: {
    description: "Schema for successful response from users.setPhoto method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
      profile: {
        type: "object",
        properties: {
          avatar_hash: {
            type: "string",
            pattern: "^[0-9a-f]{12}$",
          },
          image_1024: {
            type: "string",
          },
          image_192: {
            type: "string",
          },
          image_24: {
            type: "string",
          },
          image_32: {
            type: "string",
          },
          image_48: {
            type: "string",
          },
          image_512: {
            type: "string",
          },
          image_72: {
            type: "string",
          },
          image_original: {
            type: "string",
          },
        },
        required: [
          "image_24",
          "image_32",
          "image_48",
          "image_72",
          "image_192",
          "image_512",
          "image_1024",
          "image_original",
          "avatar_hash",
        ],
        additionalProperties: {
          type: "unknown",
        },
      },
    },
    required: ["ok", "profile"],
    additionalProperties: {
      type: "unknown",
    },
  },
  UsersSetPresenceRequest: {
    type: "object",
    properties: {
      presence: {
        description: "Either `auto` or `away`",
        type: "string",
      },
    },
    required: ["presence"],
  },
  UsersSetPresenceResponse: {
    description: "Schema for successful response from users.setPresence method",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ViewsOpenResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ViewsPublishResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ViewsPushResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  ViewsUpdateResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  WorkflowsStepCompletedResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  WorkflowsStepFailedResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
  WorkflowsUpdateStepResponse: {
    description:
      "This method either only returns a brief _OK_ response or a verbose schema is not available for this method.",
    type: "object",
    properties: {
      ok: {
        type: "ref",
        ref: "defs_ok_true",
      },
    },
    required: ["ok"],
    additionalProperties: {
      type: "unknown",
    },
  },
}
