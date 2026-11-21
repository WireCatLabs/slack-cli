// GENERATED. DO NOT EDIT.
// Source: spec/slack/, checked against provenance.json
// Run: pnpm generate

import { integer, number, unique } from "@wirecat/cli-base/codegen/runtime"
import * as v from "valibot"
import type * as T from "./types.js"

export const Blocks: v.GenericSchema<unknown, T.Blocks> = v.array(
  v.objectWithRest(
    {
      type: v.string(),
    },
    v.unknown(),
  ),
)

export const DefsAppId: v.GenericSchema<unknown, T.DefsAppId> = v.pipe(v.string(), v.regex(/^A[A-Z0-9]{1,}$/))

export const DefsBotId: v.GenericSchema<unknown, T.DefsBotId> = v.pipe(v.string(), v.regex(/^B[A-Z0-9]{8,}$/))

export const DefsChannel: v.GenericSchema<unknown, T.DefsChannel> = v.pipe(v.string(), v.regex(/^[CGD][A-Z0-9]{8,}$/))

export const DefsChannelId: v.GenericSchema<unknown, T.DefsChannelId> = v.pipe(v.string(), v.regex(/^[C][A-Z0-9]{2,}$/))

export const DefsChannelName: v.GenericSchema<unknown, T.DefsChannelName> = v.string()

export const DefsCommentId: v.GenericSchema<unknown, T.DefsCommentId> = v.pipe(v.string(), v.regex(/^Fc[A-Z0-9]{8,}$/))

export const DefsDmId: v.GenericSchema<unknown, T.DefsDmId> = v.pipe(v.string(), v.regex(/^[D][A-Z0-9]{8,}$/))

export const DefsEnterpriseId: v.GenericSchema<unknown, T.DefsEnterpriseId> = v.pipe(
  v.string(),
  v.regex(/^[E][A-Z0-9]{8,}$/),
)

export const DefsEnterpriseName: v.GenericSchema<unknown, T.DefsEnterpriseName> = v.string()

export const DefsEnterpriseUserId: v.GenericSchema<unknown, T.DefsEnterpriseUserId> = v.pipe(
  v.string(),
  v.regex(/^[WU][A-Z0-9]{8,}$/),
)

export const DefsFileId: v.GenericSchema<unknown, T.DefsFileId> = v.pipe(v.string(), v.regex(/^[F][A-Z0-9]{8,}$/))

export const DefsGroupId: v.GenericSchema<unknown, T.DefsGroupId> = v.pipe(v.string(), v.regex(/^[G][A-Z0-9]{8,}$/))

export const DefsOkFalse: v.GenericSchema<unknown, T.DefsOkFalse> = v.literal(false)

export const DefsOkTrue: v.GenericSchema<unknown, T.DefsOkTrue> = v.literal(true)

export const DefsOptionalAppId: v.GenericSchema<unknown, T.DefsOptionalAppId> = v.pipe(
  v.string(),
  v.regex(/^(A[A-Z0-9]{1,})?$/),
)

export const DefsPinnedInfo: v.GenericSchema<unknown, T.DefsPinnedInfo> = v.record(v.string(), v.unknown())

export const DefsReminderId: v.GenericSchema<unknown, T.DefsReminderId> = v.pipe(
  v.string(),
  v.regex(/^Rm[A-Z0-9]{8,}$/),
)

export const DefsSubteamId: v.GenericSchema<unknown, T.DefsSubteamId> = v.pipe(v.string(), v.regex(/^S[A-Z0-9]{2,}$/))

export const DefsTeam: v.GenericSchema<unknown, T.DefsTeam> = v.pipe(v.string(), v.regex(/^[T][A-Z0-9]{2,}$/))

export const DefsTopicPurposeCreator: v.GenericSchema<unknown, T.DefsTopicPurposeCreator> = v.pipe(
  v.string(),
  v.regex(/^[UW][A-Z0-9]{8,}$|^$/),
)

export const DefsTs: v.GenericSchema<unknown, T.DefsTs> = v.pipe(v.string(), v.regex(/^\d{10}\.\d{6}$/))

export const DefsUserId: v.GenericSchema<unknown, T.DefsUserId> = v.pipe(v.string(), v.regex(/^[UW][A-Z0-9]{2,}$/))

export const DefsWorkspaceId: v.GenericSchema<unknown, T.DefsWorkspaceId> = v.pipe(
  v.string(),
  v.regex(/^[TE][A-Z0-9]{8,}$/),
)

export const ObjsBotProfile: v.GenericSchema<unknown, T.ObjsBotProfile> = v.objectWithRest(
  {
    app_id: v.lazy(() => DefsAppId),
    deleted: v.boolean(),
    icons: v.objectWithRest(
      {
        image_36: v.string(),
        image_48: v.string(),
        image_72: v.string(),
      },
      v.unknown(),
    ),
    id: v.lazy(() => DefsBotId),
    name: v.string(),
    team_id: v.lazy(() => DefsTeam),
    updated: integer(),
  },
  v.unknown(),
)

export const ObjsChannel: v.GenericSchema<unknown, T.ObjsChannel> = v.objectWithRest(
  {
    accepted_user: v.optional(v.lazy(() => DefsUserId)),
    created: integer(),
    creator: v.lazy(() => DefsUserId),
    id: v.lazy(() => DefsChannelId),
    is_archived: v.optional(v.boolean()),
    is_channel: v.boolean(),
    is_frozen: v.optional(v.boolean()),
    is_general: v.optional(v.boolean()),
    is_member: v.optional(v.boolean()),
    is_moved: v.optional(integer()),
    is_mpim: v.boolean(),
    is_non_threadable: v.optional(v.boolean()),
    is_org_shared: v.boolean(),
    is_pending_ext_shared: v.optional(v.boolean()),
    is_private: v.boolean(),
    is_read_only: v.optional(v.boolean()),
    is_shared: v.boolean(),
    is_thread_only: v.optional(v.boolean()),
    last_read: v.optional(v.lazy(() => DefsTs)),
    latest: v.optional(v.nullable(v.lazy(() => ObjsMessage))),
    members: v.pipe(
      v.array(v.lazy(() => DefsUserId)),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    name: v.string(),
    name_normalized: v.string(),
    num_members: v.optional(integer()),
    pending_shared: v.optional(
      v.pipe(
        v.array(v.lazy(() => DefsTeam)),
        v.minLength(0),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    previous_names: v.optional(
      v.pipe(
        v.array(v.lazy(() => DefsChannelName)),
        v.minLength(0),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    priority: v.optional(number()),
    purpose: v.objectWithRest(
      {
        creator: v.lazy(() => DefsTopicPurposeCreator),
        last_set: integer(),
        value: v.string(),
      },
      v.unknown(),
    ),
    topic: v.objectWithRest(
      {
        creator: v.lazy(() => DefsTopicPurposeCreator),
        last_set: integer(),
        value: v.string(),
      },
      v.unknown(),
    ),
    unlinked: v.optional(integer()),
    unread_count: v.optional(integer()),
    unread_count_display: v.optional(integer()),
  },
  v.unknown(),
)

export const ObjsComment: v.GenericSchema<unknown, T.ObjsComment> = v.objectWithRest(
  {
    comment: v.string(),
    created: integer(),
    id: v.lazy(() => DefsCommentId),
    is_intro: v.boolean(),
    is_starred: v.optional(v.boolean()),
    num_stars: v.optional(integer()),
    pinned_info: v.optional(v.lazy(() => DefsPinnedInfo)),
    pinned_to: v.optional(v.array(v.lazy(() => DefsChannel))),
    reactions: v.optional(v.array(v.lazy(() => ObjsReaction))),
    timestamp: integer(),
    user: v.lazy(() => DefsUserId),
  },
  v.unknown(),
)

export const ObjsComments: v.GenericSchema<unknown, T.ObjsComments> = v.array(v.unknown())

export const ObjsConversation: v.GenericSchema<unknown, T.ObjsConversation> = v.union([
  v.objectWithRest(
    {
      accepted_user: v.optional(v.lazy(() => DefsUserId)),
      connected_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsWorkspaceId)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      conversation_host_id: v.optional(v.lazy(() => DefsWorkspaceId)),
      created: integer(),
      creator: v.lazy(() => DefsUserId),
      display_counts: v.optional(
        v.objectWithRest(
          {
            display_counts: integer(),
            guest_counts: integer(),
          },
          v.unknown(),
        ),
      ),
      enterprise_id: v.optional(v.lazy(() => DefsEnterpriseId)),
      has_pins: v.optional(v.boolean()),
      id: v.lazy(() => DefsChannel),
      internal_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      is_archived: v.boolean(),
      is_channel: v.boolean(),
      is_ext_shared: v.optional(v.boolean()),
      is_frozen: v.optional(v.boolean()),
      is_general: v.boolean(),
      is_global_shared: v.optional(v.boolean()),
      is_group: v.boolean(),
      is_im: v.boolean(),
      is_member: v.optional(v.boolean()),
      is_moved: v.optional(integer()),
      is_mpim: v.literal(false),
      is_non_threadable: v.optional(v.boolean()),
      is_open: v.optional(v.boolean()),
      is_org_default: v.optional(v.boolean()),
      is_org_mandatory: v.optional(v.boolean()),
      is_org_shared: v.boolean(),
      is_pending_ext_shared: v.optional(v.boolean()),
      is_private: v.boolean(),
      is_read_only: v.optional(v.boolean()),
      is_shared: v.boolean(),
      is_starred: v.optional(v.boolean()),
      is_thread_only: v.optional(v.boolean()),
      last_read: v.optional(v.lazy(() => DefsTs)),
      latest: v.optional(v.nullable(v.lazy(() => ObjsMessage))),
      members: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsUserId)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      name: v.string(),
      name_normalized: v.string(),
      num_members: v.optional(integer()),
      parent_conversation: v.optional(v.nullable(v.lazy(() => DefsChannel))),
      pending_connected_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      pending_shared: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      pin_count: v.optional(integer()),
      previous_names: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsChannelName)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      priority: v.optional(number()),
      purpose: v.objectWithRest(
        {
          creator: v.lazy(() => DefsTopicPurposeCreator),
          last_set: integer(),
          value: v.string(),
        },
        v.unknown(),
      ),
      shared_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      shares: v.optional(
        v.pipe(
          v.array(
            v.objectWithRest(
              {
                accepted_user: v.optional(v.lazy(() => DefsUserId)),
                is_active: v.boolean(),
                team: v.lazy(() => ObjsTeam),
                user: v.lazy(() => DefsUserId),
              },
              v.unknown(),
            ),
          ),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      timezone_count: v.optional(integer()),
      topic: v.objectWithRest(
        {
          creator: v.lazy(() => DefsTopicPurposeCreator),
          last_set: integer(),
          value: v.string(),
        },
        v.unknown(),
      ),
      unlinked: v.optional(integer()),
      unread_count: v.optional(integer()),
      unread_count_display: v.optional(integer()),
      use_case: v.optional(v.string()),
      user: v.optional(v.lazy(() => DefsUserId)),
      version: v.optional(integer()),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      accepted_user: v.optional(v.lazy(() => DefsUserId)),
      connected_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      conversation_host_id: v.optional(v.lazy(() => DefsWorkspaceId)),
      created: integer(),
      creator: v.lazy(() => DefsUserId),
      display_counts: v.optional(
        v.objectWithRest(
          {
            display_counts: integer(),
            guest_counts: integer(),
          },
          v.unknown(),
        ),
      ),
      id: v.lazy(() => DefsChannel),
      internal_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      is_archived: v.boolean(),
      is_channel: v.boolean(),
      is_ext_shared: v.optional(v.boolean()),
      is_frozen: v.optional(v.boolean()),
      is_general: v.boolean(),
      is_group: v.boolean(),
      is_im: v.boolean(),
      is_member: v.optional(v.boolean()),
      is_moved: v.optional(integer()),
      is_mpim: v.literal(true),
      is_non_threadable: v.optional(v.boolean()),
      is_open: v.optional(v.boolean()),
      is_org_shared: v.boolean(),
      is_pending_ext_shared: v.optional(v.boolean()),
      is_private: v.boolean(),
      is_read_only: v.optional(v.boolean()),
      is_shared: v.boolean(),
      is_starred: v.optional(v.boolean()),
      is_thread_only: v.optional(v.boolean()),
      last_read: v.optional(v.lazy(() => DefsTs)),
      latest: v.optional(v.nullable(v.lazy(() => ObjsMessage))),
      members: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsUserId)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      name: v.string(),
      name_normalized: v.string(),
      num_members: v.optional(integer()),
      parent_conversation: v.optional(v.nullable(v.lazy(() => DefsChannel))),
      pending_connected_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      pending_shared: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      pin_count: v.optional(integer()),
      previous_names: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsChannelName)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      priority: v.optional(number()),
      purpose: v.objectWithRest(
        {
          creator: v.lazy(() => DefsTopicPurposeCreator),
          last_set: integer(),
          value: v.string(),
        },
        v.unknown(),
      ),
      shared_team_ids: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsTeam)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      shares: v.optional(
        v.pipe(
          v.array(
            v.objectWithRest(
              {
                accepted_user: v.optional(v.lazy(() => DefsUserId)),
                is_active: v.boolean(),
                team: v.lazy(() => ObjsTeam),
                user: v.lazy(() => DefsUserId),
              },
              v.unknown(),
            ),
          ),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      timezone_count: v.optional(integer()),
      topic: v.objectWithRest(
        {
          creator: v.lazy(() => DefsTopicPurposeCreator),
          last_set: integer(),
          value: v.string(),
        },
        v.unknown(),
      ),
      unlinked: v.optional(integer()),
      unread_count: v.optional(integer()),
      unread_count_display: v.optional(integer()),
      user: v.optional(v.lazy(() => DefsUserId)),
      version: v.optional(integer()),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      created: integer(),
      has_pins: v.optional(v.boolean()),
      id: v.lazy(() => DefsDmId),
      is_archived: v.optional(v.boolean()),
      is_ext_shared: v.optional(v.boolean()),
      is_frozen: v.optional(v.boolean()),
      is_im: v.boolean(),
      is_open: v.optional(v.boolean()),
      is_org_shared: v.boolean(),
      is_shared: v.optional(v.boolean()),
      is_starred: v.optional(v.boolean()),
      is_user_deleted: v.optional(v.boolean()),
      last_read: v.optional(v.lazy(() => DefsTs)),
      latest: v.optional(v.nullable(v.lazy(() => ObjsMessage))),
      parent_conversation: v.optional(v.nullable(v.lazy(() => DefsChannel))),
      pin_count: v.optional(integer()),
      priority: number(),
      shares: v.optional(
        v.pipe(
          v.array(
            v.objectWithRest(
              {
                date_create: integer(),
                id: v.lazy(() => DefsTeam),
                is_active: v.boolean(),
                name: v.string(),
                team: v.lazy(() => ObjsTeam),
              },
              v.unknown(),
            ),
          ),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      unread_count: v.optional(integer()),
      unread_count_display: v.optional(integer()),
      user: v.lazy(() => DefsUserId),
      version: v.optional(integer()),
    },
    v.unknown(),
  ),
])

export const ObjsEnterpriseUser: v.GenericSchema<unknown, T.ObjsEnterpriseUser> = v.objectWithRest(
  {
    enterprise_id: v.lazy(() => DefsEnterpriseId),
    enterprise_name: v.lazy(() => DefsEnterpriseName),
    id: v.lazy(() => DefsEnterpriseUserId),
    is_admin: v.boolean(),
    is_owner: v.boolean(),
    teams: v.pipe(
      v.array(v.lazy(() => DefsTeam)),
      v.check((items) => unique(items), "items must be unique"),
    ),
  },
  v.unknown(),
)

export const ObjsExternalOrgMigrations: v.GenericSchema<unknown, T.ObjsExternalOrgMigrations> = v.looseObject({
  current: v.array(
    v.looseObject({
      date_started: integer(),
      team_id: v.string(),
    }),
  ),
  date_updated: integer(),
})

export const ObjsFile: v.GenericSchema<unknown, T.ObjsFile> = v.objectWithRest(
  {
    channels: v.optional(
      v.pipe(
        v.array(v.lazy(() => DefsChannelId)),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    comments_count: v.optional(integer()),
    created: v.optional(integer()),
    date_delete: v.optional(integer()),
    display_as_bot: v.optional(v.boolean()),
    editable: v.optional(v.boolean()),
    editor: v.optional(v.lazy(() => DefsUserId)),
    external_id: v.optional(v.string()),
    external_type: v.optional(v.string()),
    external_url: v.optional(v.string()),
    filetype: v.optional(v.string()),
    groups: v.optional(
      v.pipe(
        v.array(v.lazy(() => DefsGroupId)),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    has_rich_preview: v.optional(v.boolean()),
    id: v.optional(v.lazy(() => DefsFileId)),
    image_exif_rotation: v.optional(integer()),
    ims: v.optional(
      v.pipe(
        v.array(v.lazy(() => DefsDmId)),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    is_external: v.optional(v.boolean()),
    is_public: v.optional(v.boolean()),
    is_starred: v.optional(v.boolean()),
    is_tombstoned: v.optional(v.boolean()),
    last_editor: v.optional(v.lazy(() => DefsUserId)),
    mimetype: v.optional(v.string()),
    mode: v.optional(v.string()),
    name: v.optional(v.string()),
    non_owner_editable: v.optional(v.boolean()),
    num_stars: v.optional(integer()),
    original_h: v.optional(integer()),
    original_w: v.optional(integer()),
    permalink: v.optional(v.string()),
    permalink_public: v.optional(v.string()),
    pinned_info: v.optional(v.lazy(() => DefsPinnedInfo)),
    pinned_to: v.optional(v.array(v.lazy(() => DefsChannel))),
    pretty_type: v.optional(v.string()),
    preview: v.optional(v.string()),
    public_url_shared: v.optional(v.boolean()),
    reactions: v.optional(v.array(v.lazy(() => ObjsReaction))),
    shares: v.optional(
      v.objectWithRest(
        {
          private: v.optional(v.record(v.string(), v.unknown())),
          public: v.optional(v.record(v.string(), v.unknown())),
        },
        v.unknown(),
      ),
    ),
    size: v.optional(integer()),
    source_team: v.optional(v.lazy(() => DefsTeam)),
    state: v.optional(v.string()),
    thumb_1024: v.optional(v.string()),
    thumb_1024_h: v.optional(integer()),
    thumb_1024_w: v.optional(integer()),
    thumb_160: v.optional(v.string()),
    thumb_360: v.optional(v.string()),
    thumb_360_h: v.optional(integer()),
    thumb_360_w: v.optional(integer()),
    thumb_480: v.optional(v.string()),
    thumb_480_h: v.optional(integer()),
    thumb_480_w: v.optional(integer()),
    thumb_64: v.optional(v.string()),
    thumb_720: v.optional(v.string()),
    thumb_720_h: v.optional(integer()),
    thumb_720_w: v.optional(integer()),
    thumb_80: v.optional(v.string()),
    thumb_800: v.optional(v.string()),
    thumb_800_h: v.optional(integer()),
    thumb_800_w: v.optional(integer()),
    thumb_960: v.optional(v.string()),
    thumb_960_h: v.optional(integer()),
    thumb_960_w: v.optional(integer()),
    thumb_tiny: v.optional(v.string()),
    timestamp: v.optional(integer()),
    title: v.optional(v.string()),
    updated: v.optional(integer()),
    url_private: v.optional(v.string()),
    url_private_download: v.optional(v.string()),
    user: v.optional(v.string()),
    user_team: v.optional(v.lazy(() => DefsTeam)),
    username: v.optional(v.string()),
  },
  v.unknown(),
)

export const ObjsIcon: v.GenericSchema<unknown, T.ObjsIcon> = v.looseObject({
  image_102: v.optional(v.string()),
  image_132: v.optional(v.string()),
  image_230: v.optional(v.string()),
  image_34: v.optional(v.string()),
  image_44: v.optional(v.string()),
  image_68: v.optional(v.string()),
  image_88: v.optional(v.string()),
  image_default: v.optional(v.boolean()),
})

export const ObjsMessage: v.GenericSchema<unknown, T.ObjsMessage> = v.objectWithRest(
  {
    attachments: v.optional(
      v.pipe(
        v.array(
          v.objectWithRest(
            {
              fallback: v.optional(v.string()),
              id: integer(),
              image_bytes: v.optional(integer()),
              image_height: v.optional(integer()),
              image_url: v.optional(v.string()),
              image_width: v.optional(integer()),
            },
            v.unknown(),
          ),
        ),
        v.minLength(0),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    blocks: v.optional(v.lazy(() => Blocks)),
    bot_id: v.optional(v.nullable(v.lazy(() => DefsBotId))),
    bot_profile: v.optional(v.lazy(() => ObjsBotProfile)),
    client_msg_id: v.optional(v.string()),
    comment: v.optional(v.lazy(() => ObjsComment)),
    display_as_bot: v.optional(v.boolean()),
    file: v.optional(v.lazy(() => ObjsFile)),
    files: v.optional(
      v.pipe(
        v.array(v.lazy(() => ObjsFile)),
        v.minLength(0),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    icons: v.optional(
      v.objectWithRest(
        {
          emoji: v.optional(v.string()),
          image_64: v.optional(v.string()),
        },
        v.unknown(),
      ),
    ),
    inviter: v.optional(v.lazy(() => DefsUserId)),
    is_delayed_message: v.optional(v.boolean()),
    is_intro: v.optional(v.boolean()),
    is_starred: v.optional(v.boolean()),
    last_read: v.optional(v.lazy(() => DefsTs)),
    latest_reply: v.optional(v.lazy(() => DefsTs)),
    name: v.optional(v.string()),
    old_name: v.optional(v.string()),
    parent_user_id: v.optional(v.lazy(() => DefsUserId)),
    permalink: v.optional(v.string()),
    pinned_to: v.optional(v.array(v.lazy(() => DefsChannel))),
    purpose: v.optional(v.string()),
    reactions: v.optional(v.array(v.lazy(() => ObjsReaction))),
    reply_count: v.optional(integer()),
    reply_users: v.optional(
      v.pipe(
        v.array(v.lazy(() => DefsUserId)),
        v.minLength(0),
        v.check((items) => unique(items), "items must be unique"),
      ),
    ),
    reply_users_count: v.optional(integer()),
    source_team: v.optional(v.lazy(() => DefsWorkspaceId)),
    subscribed: v.optional(v.boolean()),
    subtype: v.optional(v.string()),
    team: v.optional(v.lazy(() => DefsWorkspaceId)),
    text: v.string(),
    thread_ts: v.optional(v.lazy(() => DefsTs)),
    topic: v.optional(v.string()),
    ts: v.lazy(() => DefsTs),
    type: v.string(),
    unread_count: v.optional(integer()),
    upload: v.optional(v.boolean()),
    user: v.optional(v.lazy(() => DefsUserId)),
    user_profile: v.optional(v.lazy(() => ObjsUserProfileShort)),
    user_team: v.optional(v.lazy(() => DefsWorkspaceId)),
    username: v.optional(v.string()),
  },
  v.unknown(),
)

export const ObjsPaging: v.GenericSchema<unknown, T.ObjsPaging> = v.objectWithRest(
  {
    count: v.optional(integer()),
    page: integer(),
    pages: v.optional(integer()),
    per_page: v.optional(integer()),
    spill: v.optional(integer()),
    total: integer(),
  },
  v.unknown(),
)

export const ObjsPrimaryOwner: v.GenericSchema<unknown, T.ObjsPrimaryOwner> = v.looseObject({
  email: v.string(),
  id: v.string(),
})

export const ObjsReaction: v.GenericSchema<unknown, T.ObjsReaction> = v.objectWithRest(
  {
    count: integer(),
    name: v.string(),
    users: v.array(v.lazy(() => DefsUserId)),
  },
  v.unknown(),
)

export const ObjsReminder: v.GenericSchema<unknown, T.ObjsReminder> = v.objectWithRest(
  {
    complete_ts: v.optional(integer()),
    creator: v.lazy(() => DefsUserId),
    id: v.lazy(() => DefsReminderId),
    recurring: v.boolean(),
    text: v.string(),
    time: v.optional(integer()),
    user: v.lazy(() => DefsUserId),
  },
  v.unknown(),
)

export const ObjsResources: v.GenericSchema<unknown, T.ObjsResources> = v.objectWithRest(
  {
    excluded_ids: v.optional(v.array(v.union([v.lazy(() => DefsChannel), v.lazy(() => DefsTeam)]))),
    ids: v.array(v.union([v.lazy(() => DefsChannel), v.lazy(() => DefsTeam)])),
    wildcard: v.optional(v.boolean()),
  },
  v.unknown(),
)

export const ObjsResponseMetadata: v.GenericSchema<unknown, T.ObjsResponseMetadata> = v.looseObject({
  next_cursor: v.optional(v.string()),
  messages: v.optional(v.array(v.string())),
  warnings: v.optional(v.array(v.string())),
})

export const ObjsScopes: v.GenericSchema<unknown, T.ObjsScopes> = v.array(v.string())

export const ObjsSubteam: v.GenericSchema<unknown, T.ObjsSubteam> = v.objectWithRest(
  {
    auto_provision: v.boolean(),
    auto_type: v.nullable(v.picklist(["owner", "admin"])),
    channel_count: v.optional(integer()),
    created_by: v.lazy(() => DefsUserId),
    date_create: integer(),
    date_delete: integer(),
    date_update: integer(),
    deleted_by: v.nullable(v.lazy(() => DefsUserId)),
    description: v.string(),
    enterprise_subteam_id: v.string(),
    handle: v.string(),
    id: v.lazy(() => DefsSubteamId),
    is_external: v.boolean(),
    is_subteam: v.boolean(),
    is_usergroup: v.boolean(),
    name: v.string(),
    prefs: v.objectWithRest(
      {
        channels: v.array(v.lazy(() => DefsChannelId)),
        groups: v.array(v.lazy(() => DefsGroupId)),
      },
      v.unknown(),
    ),
    team_id: v.lazy(() => DefsTeam),
    updated_by: v.lazy(() => DefsUserId),
    user_count: v.optional(integer()),
    users: v.optional(v.array(v.lazy(() => DefsUserId))),
  },
  v.unknown(),
)

export const ObjsTeam: v.GenericSchema<unknown, T.ObjsTeam> = v.objectWithRest(
  {
    archived: v.optional(v.boolean()),
    avatar_base_url: v.optional(v.string()),
    created: v.optional(integer()),
    date_create: v.optional(integer()),
    deleted: v.optional(v.boolean()),
    description: v.optional(v.nullable(v.string())),
    discoverable: v.optional(v.nullable(v.string())),
    domain: v.string(),
    email_domain: v.string(),
    enterprise_id: v.optional(v.lazy(() => DefsEnterpriseId)),
    enterprise_name: v.optional(v.lazy(() => DefsEnterpriseName)),
    external_org_migrations: v.optional(v.lazy(() => ObjsExternalOrgMigrations)),
    has_compliance_export: v.optional(v.boolean()),
    icon: v.lazy(() => ObjsIcon),
    id: v.lazy(() => DefsWorkspaceId),
    is_assigned: v.optional(v.boolean()),
    is_enterprise: v.optional(integer()),
    is_over_storage_limit: v.optional(v.boolean()),
    limit_ts: v.optional(integer()),
    locale: v.optional(v.string()),
    messages_count: v.optional(integer()),
    msg_edit_window_mins: v.optional(integer()),
    name: v.string(),
    over_integrations_limit: v.optional(v.boolean()),
    over_storage_limit: v.optional(v.boolean()),
    pay_prod_cur: v.optional(v.string()),
    plan: v.optional(v.picklist(["", "std", "plus", "compliance", "enterprise"])),
    primary_owner: v.optional(v.lazy(() => ObjsPrimaryOwner)),
    sso_provider: v.optional(
      v.looseObject({
        label: v.optional(v.string()),
        name: v.optional(v.string()),
        type: v.optional(v.string()),
      }),
    ),
  },
  v.unknown(),
)

export const ObjsTeamProfileField: v.GenericSchema<unknown, T.ObjsTeamProfileField> = v.objectWithRest(
  {
    field_name: v.optional(v.nullable(v.string())),
    hint: v.string(),
    id: v.pipe(v.string(), v.regex(/^X[a-zA-Z0-9]{9,}$/)),
    is_hidden: v.optional(v.boolean()),
    label: v.string(),
    options: v.optional(v.nullable(v.lazy(() => ObjsTeamProfileFieldOption))),
    ordering: number(),
    possible_values: v.optional(v.nullable(v.array(v.string()))),
    type: v.picklist(["text", "date", "link", "mailto", "options_list", "user"]),
  },
  v.unknown(),
)

export const ObjsTeamProfileFieldOption: v.GenericSchema<unknown, T.ObjsTeamProfileFieldOption> = v.objectWithRest(
  {
    is_custom: v.optional(v.nullable(v.boolean())),
    is_multiple_entry: v.optional(v.nullable(v.boolean())),
    is_protected: v.optional(v.nullable(v.boolean())),
    is_scim: v.optional(v.nullable(v.boolean())),
  },
  v.unknown(),
)

export const ObjsUser: v.GenericSchema<unknown, T.ObjsUser> = v.union([
  v.objectWithRest(
    {
      color: v.optional(v.pipe(v.string(), v.regex(/^[a-fA-F0-9]{6}$/))),
      deleted: v.optional(v.boolean()),
      enterprise_user: v.optional(v.lazy(() => ObjsEnterpriseUser)),
      has_2fa: v.optional(v.boolean()),
      id: v.lazy(() => DefsUserId),
      is_admin: v.optional(v.boolean()),
      is_app_user: v.boolean(),
      is_bot: v.boolean(),
      is_external: v.optional(v.boolean()),
      is_forgotten: v.optional(v.boolean()),
      is_invited_user: v.optional(v.boolean()),
      is_owner: v.optional(v.boolean()),
      is_primary_owner: v.optional(v.boolean()),
      is_restricted: v.optional(v.boolean()),
      is_stranger: v.optional(v.boolean()),
      is_ultra_restricted: v.optional(v.boolean()),
      locale: v.optional(v.string()),
      name: v.string(),
      presence: v.optional(v.string()),
      profile: v.lazy(() => ObjsUserProfile),
      real_name: v.optional(v.string()),
      team: v.optional(v.lazy(() => DefsWorkspaceId)),
      team_id: v.optional(v.lazy(() => DefsWorkspaceId)),
      team_profile: v.optional(
        v.objectWithRest(
          {
            fields: v.pipe(
              v.array(v.lazy(() => ObjsTeamProfileField)),
              v.minLength(0),
              v.check((items) => unique(items), "items must be unique"),
            ),
          },
          v.unknown(),
        ),
      ),
      two_factor_type: v.optional(v.string()),
      tz: v.optional(v.nullable(v.string())),
      tz_label: v.optional(v.string()),
      tz_offset: v.optional(number()),
      updated: number(),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      color: v.optional(v.pipe(v.string(), v.regex(/^([a-fA-F0-9]{6})?$/))),
      deleted: v.optional(v.boolean()),
      enterprise_user: v.optional(v.lazy(() => ObjsEnterpriseUser)),
      has_2fa: v.optional(v.boolean()),
      id: v.lazy(() => DefsUserId),
      is_admin: v.optional(v.boolean()),
      is_app_user: v.boolean(),
      is_bot: v.boolean(),
      is_external: v.optional(v.boolean()),
      is_forgotten: v.optional(v.boolean()),
      is_owner: v.optional(v.boolean()),
      is_primary_owner: v.optional(v.boolean()),
      is_restricted: v.optional(v.boolean()),
      is_stranger: v.optional(v.boolean()),
      is_ultra_restricted: v.optional(v.boolean()),
      locale: v.optional(v.string()),
      name: v.string(),
      presence: v.optional(v.string()),
      profile: v.lazy(() => ObjsUserProfile),
      real_name: v.optional(v.string()),
      team_id: v.optional(v.lazy(() => DefsWorkspaceId)),
      team_profile: v.optional(
        v.objectWithRest(
          {
            fields: v.pipe(
              v.array(v.lazy(() => ObjsTeamProfileField)),
              v.minLength(0),
              v.check((items) => unique(items), "items must be unique"),
            ),
          },
          v.unknown(),
        ),
      ),
      teams: v.optional(
        v.pipe(
          v.array(v.lazy(() => DefsWorkspaceId)),
          v.minLength(0),
          v.check((items) => unique(items), "items must be unique"),
        ),
      ),
      two_factor_type: v.optional(v.string()),
      tz: v.optional(v.nullable(v.string())),
      tz_label: v.optional(v.string()),
      tz_offset: v.optional(number()),
      updated: number(),
    },
    v.unknown(),
  ),
])

export const ObjsUserProfile: v.GenericSchema<unknown, T.ObjsUserProfile> = v.objectWithRest(
  {
    always_active: v.optional(v.boolean()),
    api_app_id: v.optional(v.lazy(() => DefsOptionalAppId)),
    avatar_hash: v.string(),
    bot_id: v.optional(v.lazy(() => DefsBotId)),
    display_name: v.string(),
    display_name_normalized: v.string(),
    email: v.optional(v.nullable(v.string())),
    fields: v.nullable(v.union([v.looseObject({}), v.array(v.looseObject({}))])),
    first_name: v.optional(v.nullable(v.string())),
    guest_expiration_ts: v.optional(v.nullable(integer())),
    guest_invited_by: v.optional(v.nullable(v.string())),
    image_1024: v.optional(v.nullable(v.string())),
    image_192: v.optional(v.nullable(v.string())),
    image_24: v.optional(v.nullable(v.string())),
    image_32: v.optional(v.nullable(v.string())),
    image_48: v.optional(v.nullable(v.string())),
    image_512: v.optional(v.nullable(v.string())),
    image_72: v.optional(v.nullable(v.string())),
    image_original: v.optional(v.nullable(v.string())),
    is_app_user: v.optional(v.boolean()),
    is_custom_image: v.optional(v.boolean()),
    is_restricted: v.optional(v.nullable(v.boolean())),
    is_ultra_restricted: v.optional(v.nullable(v.boolean())),
    last_avatar_image_hash: v.optional(v.string()),
    last_name: v.optional(v.nullable(v.string())),
    memberships_count: v.optional(integer()),
    name: v.optional(v.nullable(v.string())),
    phone: v.string(),
    pronouns: v.optional(v.string()),
    real_name: v.string(),
    real_name_normalized: v.string(),
    skype: v.string(),
    status_default_emoji: v.optional(v.string()),
    status_default_text: v.optional(v.string()),
    status_default_text_canonical: v.optional(v.nullable(v.string())),
    status_emoji: v.string(),
    status_expiration: v.optional(integer()),
    status_text: v.string(),
    status_text_canonical: v.optional(v.nullable(v.string())),
    team: v.optional(v.lazy(() => DefsWorkspaceId)),
    title: v.string(),
    updated: v.optional(integer()),
    user_id: v.optional(v.string()),
    username: v.optional(v.nullable(v.string())),
  },
  v.unknown(),
)

export const ObjsUserProfileShort: v.GenericSchema<unknown, T.ObjsUserProfileShort> = v.objectWithRest(
  {
    avatar_hash: v.string(),
    display_name: v.string(),
    display_name_normalized: v.optional(v.string()),
    first_name: v.nullable(v.string()),
    image_72: v.string(),
    is_restricted: v.boolean(),
    is_ultra_restricted: v.boolean(),
    name: v.string(),
    real_name: v.string(),
    real_name_normalized: v.optional(v.string()),
    team: v.lazy(() => DefsWorkspaceId),
  },
  v.unknown(),
)

export const AdminAppsApproveRequest: v.GenericSchema<unknown, T.AdminAppsApproveRequest> = v.looseObject({
  app_id: v.optional(v.string()),
  request_id: v.optional(v.string()),
  team_id: v.optional(v.string()),
})

export const AdminAppsApproveResponse: v.GenericSchema<unknown, T.AdminAppsApproveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminAppsApprovedListResponse: v.GenericSchema<unknown, T.AdminAppsApprovedListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminAppsRequestsListResponse: v.GenericSchema<unknown, T.AdminAppsRequestsListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminAppsRestrictRequest: v.GenericSchema<unknown, T.AdminAppsRestrictRequest> = v.looseObject({
  app_id: v.optional(v.string()),
  request_id: v.optional(v.string()),
  team_id: v.optional(v.string()),
})

export const AdminAppsRestrictResponse: v.GenericSchema<unknown, T.AdminAppsRestrictResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminAppsRestrictedListResponse: v.GenericSchema<unknown, T.AdminAppsRestrictedListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsArchiveRequest: v.GenericSchema<unknown, T.AdminConversationsArchiveRequest> =
  v.looseObject({
    channel_id: v.string(),
  })

export const AdminConversationsArchiveResponse: v.GenericSchema<unknown, T.AdminConversationsArchiveResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsConvertToPrivateRequest: v.GenericSchema<
  unknown,
  T.AdminConversationsConvertToPrivateRequest
> = v.looseObject({
  channel_id: v.string(),
})

export const AdminConversationsConvertToPrivateResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsConvertToPrivateResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsCreateRequest: v.GenericSchema<unknown, T.AdminConversationsCreateRequest> =
  v.looseObject({
    name: v.string(),
    description: v.optional(v.string()),
    is_private: v.boolean(),
    org_wide: v.optional(v.boolean()),
    team_id: v.optional(v.string()),
  })

export const AdminConversationsCreateResponse: v.GenericSchema<unknown, T.AdminConversationsCreateResponse> =
  v.objectWithRest(
    {
      channel_id: v.optional(v.lazy(() => DefsChannelId)),
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsDeleteRequest: v.GenericSchema<unknown, T.AdminConversationsDeleteRequest> =
  v.looseObject({
    channel_id: v.string(),
  })

export const AdminConversationsDeleteResponse: v.GenericSchema<unknown, T.AdminConversationsDeleteResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsDisconnectSharedRequest: v.GenericSchema<
  unknown,
  T.AdminConversationsDisconnectSharedRequest
> = v.looseObject({
  channel_id: v.string(),
  leaving_team_ids: v.optional(v.string()),
})

export const AdminConversationsDisconnectSharedResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsDisconnectSharedResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsEkmListOriginalConnectedChannelInfoResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsEkmListOriginalConnectedChannelInfoResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsGetConversationPrefsResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsGetConversationPrefsResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    prefs: v.optional(
      v.looseObject({
        can_thread: v.optional(
          v.looseObject({
            type: v.optional(v.array(v.string())),
            user: v.optional(v.array(v.string())),
          }),
        ),
        who_can_post: v.optional(
          v.looseObject({
            type: v.optional(v.array(v.string())),
            user: v.optional(v.array(v.string())),
          }),
        ),
      }),
    ),
  },
  v.unknown(),
)

export const AdminConversationsGetTeamsResponse: v.GenericSchema<unknown, T.AdminConversationsGetTeamsResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      response_metadata: v.optional(
        v.objectWithRest(
          {
            next_cursor: v.string(),
          },
          v.unknown(),
        ),
      ),
      team_ids: v.array(v.lazy(() => DefsTeam)),
    },
    v.unknown(),
  )

export const AdminConversationsInviteRequest: v.GenericSchema<unknown, T.AdminConversationsInviteRequest> =
  v.looseObject({
    user_ids: v.string(),
    channel_id: v.string(),
  })

export const AdminConversationsInviteResponse: v.GenericSchema<unknown, T.AdminConversationsInviteResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsRenameRequest: v.GenericSchema<unknown, T.AdminConversationsRenameRequest> =
  v.looseObject({
    channel_id: v.string(),
    name: v.string(),
  })

export const AdminConversationsRenameResponse: v.GenericSchema<unknown, T.AdminConversationsRenameResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsRestrictAccessAddGroupRequest: v.GenericSchema<
  unknown,
  T.AdminConversationsRestrictAccessAddGroupRequest
> = v.looseObject({
  team_id: v.optional(v.string()),
  group_id: v.string(),
  channel_id: v.string(),
})

export const AdminConversationsRestrictAccessAddGroupResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsRestrictAccessAddGroupResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsRestrictAccessListGroupsResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsRestrictAccessListGroupsResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsRestrictAccessRemoveGroupRequest: v.GenericSchema<
  unknown,
  T.AdminConversationsRestrictAccessRemoveGroupRequest
> = v.looseObject({
  team_id: v.string(),
  group_id: v.string(),
  channel_id: v.string(),
})

export const AdminConversationsRestrictAccessRemoveGroupResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsRestrictAccessRemoveGroupResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsSearchResponse: v.GenericSchema<unknown, T.AdminConversationsSearchResponse> =
  v.objectWithRest(
    {
      channels: v.array(v.lazy(() => ObjsChannel)),
      next_cursor: v.string(),
    },
    v.unknown(),
  )

export const AdminConversationsSetConversationPrefsRequest: v.GenericSchema<
  unknown,
  T.AdminConversationsSetConversationPrefsRequest
> = v.looseObject({
  channel_id: v.string(),
  prefs: v.string(),
})

export const AdminConversationsSetConversationPrefsResponse: v.GenericSchema<
  unknown,
  T.AdminConversationsSetConversationPrefsResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminConversationsSetTeamsRequest: v.GenericSchema<unknown, T.AdminConversationsSetTeamsRequest> =
  v.looseObject({
    channel_id: v.string(),
    team_id: v.optional(v.string()),
    target_team_ids: v.optional(v.string()),
    org_channel: v.optional(v.boolean()),
  })

export const AdminConversationsSetTeamsResponse: v.GenericSchema<unknown, T.AdminConversationsSetTeamsResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminConversationsUnarchiveRequest: v.GenericSchema<unknown, T.AdminConversationsUnarchiveRequest> =
  v.looseObject({
    channel_id: v.string(),
  })

export const AdminConversationsUnarchiveResponse: v.GenericSchema<unknown, T.AdminConversationsUnarchiveResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminEmojiAddRequest: v.GenericSchema<unknown, T.AdminEmojiAddRequest> = v.looseObject({
  name: v.string(),
  url: v.string(),
})

export const AdminEmojiAddResponse: v.GenericSchema<unknown, T.AdminEmojiAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminEmojiAddAliasRequest: v.GenericSchema<unknown, T.AdminEmojiAddAliasRequest> = v.looseObject({
  name: v.string(),
  alias_for: v.string(),
})

export const AdminEmojiAddAliasResponse: v.GenericSchema<unknown, T.AdminEmojiAddAliasResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminEmojiListResponse: v.GenericSchema<unknown, T.AdminEmojiListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminEmojiRemoveRequest: v.GenericSchema<unknown, T.AdminEmojiRemoveRequest> = v.looseObject({
  name: v.string(),
})

export const AdminEmojiRemoveResponse: v.GenericSchema<unknown, T.AdminEmojiRemoveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminEmojiRenameRequest: v.GenericSchema<unknown, T.AdminEmojiRenameRequest> = v.looseObject({
  name: v.string(),
  new_name: v.string(),
})

export const AdminEmojiRenameResponse: v.GenericSchema<unknown, T.AdminEmojiRenameResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminInviteRequestsApproveRequest: v.GenericSchema<unknown, T.AdminInviteRequestsApproveRequest> =
  v.looseObject({
    team_id: v.optional(v.string()),
    invite_request_id: v.string(),
  })

export const AdminInviteRequestsApproveResponse: v.GenericSchema<unknown, T.AdminInviteRequestsApproveResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminInviteRequestsApprovedListResponse: v.GenericSchema<
  unknown,
  T.AdminInviteRequestsApprovedListResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminInviteRequestsDeniedListResponse: v.GenericSchema<unknown, T.AdminInviteRequestsDeniedListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminInviteRequestsDenyRequest: v.GenericSchema<unknown, T.AdminInviteRequestsDenyRequest> = v.looseObject(
  {
    team_id: v.optional(v.string()),
    invite_request_id: v.string(),
  },
)

export const AdminInviteRequestsDenyResponse: v.GenericSchema<unknown, T.AdminInviteRequestsDenyResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminInviteRequestsListResponse: v.GenericSchema<unknown, T.AdminInviteRequestsListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminTeamsAdminsListResponse: v.GenericSchema<unknown, T.AdminTeamsAdminsListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsCreateRequest: v.GenericSchema<unknown, T.AdminTeamsCreateRequest> = v.looseObject({
  team_domain: v.string(),
  team_name: v.string(),
  team_description: v.optional(v.string()),
  team_discoverability: v.optional(v.string()),
})

export const AdminTeamsCreateResponse: v.GenericSchema<unknown, T.AdminTeamsCreateResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsListResponse: v.GenericSchema<unknown, T.AdminTeamsListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsOwnersListResponse: v.GenericSchema<unknown, T.AdminTeamsOwnersListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsSettingsInfoResponse: v.GenericSchema<unknown, T.AdminTeamsSettingsInfoResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminTeamsSettingsSetDefaultChannelsRequest: v.GenericSchema<
  unknown,
  T.AdminTeamsSettingsSetDefaultChannelsRequest
> = v.looseObject({
  team_id: v.string(),
  channel_ids: v.string(),
})

export const AdminTeamsSettingsSetDefaultChannelsResponse: v.GenericSchema<
  unknown,
  T.AdminTeamsSettingsSetDefaultChannelsResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsSettingsSetDescriptionRequest: v.GenericSchema<
  unknown,
  T.AdminTeamsSettingsSetDescriptionRequest
> = v.looseObject({
  team_id: v.string(),
  description: v.string(),
})

export const AdminTeamsSettingsSetDescriptionResponse: v.GenericSchema<
  unknown,
  T.AdminTeamsSettingsSetDescriptionResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsSettingsSetDiscoverabilityRequest: v.GenericSchema<
  unknown,
  T.AdminTeamsSettingsSetDiscoverabilityRequest
> = v.looseObject({
  team_id: v.string(),
  discoverability: v.string(),
})

export const AdminTeamsSettingsSetDiscoverabilityResponse: v.GenericSchema<
  unknown,
  T.AdminTeamsSettingsSetDiscoverabilityResponse
> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminTeamsSettingsSetIconRequest: v.GenericSchema<unknown, T.AdminTeamsSettingsSetIconRequest> =
  v.looseObject({
    image_url: v.string(),
    team_id: v.string(),
  })

export const AdminTeamsSettingsSetIconResponse: v.GenericSchema<unknown, T.AdminTeamsSettingsSetIconResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminTeamsSettingsSetNameRequest: v.GenericSchema<unknown, T.AdminTeamsSettingsSetNameRequest> =
  v.looseObject({
    team_id: v.string(),
    name: v.string(),
  })

export const AdminTeamsSettingsSetNameResponse: v.GenericSchema<unknown, T.AdminTeamsSettingsSetNameResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsergroupsAddChannelsRequest: v.GenericSchema<unknown, T.AdminUsergroupsAddChannelsRequest> =
  v.looseObject({
    usergroup_id: v.string(),
    team_id: v.optional(v.string()),
    channel_ids: v.string(),
  })

export const AdminUsergroupsAddChannelsResponse: v.GenericSchema<unknown, T.AdminUsergroupsAddChannelsResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsergroupsAddTeamsRequest: v.GenericSchema<unknown, T.AdminUsergroupsAddTeamsRequest> = v.looseObject(
  {
    usergroup_id: v.string(),
    team_ids: v.string(),
    auto_provision: v.optional(v.boolean()),
  },
)

export const AdminUsergroupsAddTeamsResponse: v.GenericSchema<unknown, T.AdminUsergroupsAddTeamsResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsergroupsListChannelsResponse: v.GenericSchema<unknown, T.AdminUsergroupsListChannelsResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsergroupsRemoveChannelsRequest: v.GenericSchema<unknown, T.AdminUsergroupsRemoveChannelsRequest> =
  v.looseObject({
    usergroup_id: v.string(),
    channel_ids: v.string(),
  })

export const AdminUsergroupsRemoveChannelsResponse: v.GenericSchema<unknown, T.AdminUsergroupsRemoveChannelsResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsersAssignRequest: v.GenericSchema<unknown, T.AdminUsersAssignRequest> = v.looseObject({
  team_id: v.string(),
  user_id: v.string(),
  is_restricted: v.optional(v.boolean()),
  is_ultra_restricted: v.optional(v.boolean()),
  channel_ids: v.optional(v.string()),
})

export const AdminUsersAssignResponse: v.GenericSchema<unknown, T.AdminUsersAssignResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminUsersInviteRequest: v.GenericSchema<unknown, T.AdminUsersInviteRequest> = v.looseObject({
  team_id: v.string(),
  email: v.string(),
  channel_ids: v.string(),
  custom_message: v.optional(v.string()),
  real_name: v.optional(v.string()),
  resend: v.optional(v.boolean()),
  is_restricted: v.optional(v.boolean()),
  is_ultra_restricted: v.optional(v.boolean()),
  guest_expiration_ts: v.optional(v.string()),
})

export const AdminUsersInviteResponse: v.GenericSchema<unknown, T.AdminUsersInviteResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminUsersListResponse: v.GenericSchema<unknown, T.AdminUsersListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminUsersRemoveRequest: v.GenericSchema<unknown, T.AdminUsersRemoveRequest> = v.looseObject({
  team_id: v.string(),
  user_id: v.string(),
})

export const AdminUsersRemoveResponse: v.GenericSchema<unknown, T.AdminUsersRemoveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminUsersSessionInvalidateRequest: v.GenericSchema<unknown, T.AdminUsersSessionInvalidateRequest> =
  v.looseObject({
    team_id: v.string(),
    session_id: integer(),
  })

export const AdminUsersSessionInvalidateResponse: v.GenericSchema<unknown, T.AdminUsersSessionInvalidateResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsersSessionResetRequest: v.GenericSchema<unknown, T.AdminUsersSessionResetRequest> = v.looseObject({
  user_id: v.string(),
  mobile_only: v.optional(v.boolean()),
  web_only: v.optional(v.boolean()),
})

export const AdminUsersSessionResetResponse: v.GenericSchema<unknown, T.AdminUsersSessionResetResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsersSetAdminRequest: v.GenericSchema<unknown, T.AdminUsersSetAdminRequest> = v.looseObject({
  team_id: v.string(),
  user_id: v.string(),
})

export const AdminUsersSetAdminResponse: v.GenericSchema<unknown, T.AdminUsersSetAdminResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminUsersSetExpirationRequest: v.GenericSchema<unknown, T.AdminUsersSetExpirationRequest> = v.looseObject(
  {
    team_id: v.string(),
    user_id: v.string(),
    expiration_ts: integer(),
  },
)

export const AdminUsersSetExpirationResponse: v.GenericSchema<unknown, T.AdminUsersSetExpirationResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AdminUsersSetOwnerRequest: v.GenericSchema<unknown, T.AdminUsersSetOwnerRequest> = v.looseObject({
  team_id: v.string(),
  user_id: v.string(),
})

export const AdminUsersSetOwnerResponse: v.GenericSchema<unknown, T.AdminUsersSetOwnerResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AdminUsersSetRegularRequest: v.GenericSchema<unknown, T.AdminUsersSetRegularRequest> = v.looseObject({
  team_id: v.string(),
  user_id: v.string(),
})

export const AdminUsersSetRegularResponse: v.GenericSchema<unknown, T.AdminUsersSetRegularResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ApiTestResponse: v.GenericSchema<unknown, T.ApiTestResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.looseObject({}),
)

export const AppsEventAuthorizationsListResponse: v.GenericSchema<unknown, T.AppsEventAuthorizationsListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AppsPermissionsInfoResponse: v.GenericSchema<unknown, T.AppsPermissionsInfoResponse> = v.objectWithRest(
  {
    info: v.looseObject({
      app_home: v.looseObject({
        resources: v.optional(v.lazy(() => ObjsResources)),
        scopes: v.optional(v.lazy(() => ObjsScopes)),
      }),
      channel: v.looseObject({
        resources: v.optional(v.lazy(() => ObjsResources)),
        scopes: v.optional(v.lazy(() => ObjsScopes)),
      }),
      group: v.looseObject({
        resources: v.optional(v.lazy(() => ObjsResources)),
        scopes: v.optional(v.lazy(() => ObjsScopes)),
      }),
      im: v.looseObject({
        resources: v.optional(v.lazy(() => ObjsResources)),
        scopes: v.optional(v.lazy(() => ObjsScopes)),
      }),
      mpim: v.looseObject({
        resources: v.optional(v.lazy(() => ObjsResources)),
        scopes: v.optional(v.lazy(() => ObjsScopes)),
      }),
      team: v.looseObject({
        resources: v.lazy(() => ObjsResources),
        scopes: v.lazy(() => ObjsScopes),
      }),
    }),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AppsPermissionsRequestResponse: v.GenericSchema<unknown, T.AppsPermissionsRequestResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AppsPermissionsResourcesListResponse: v.GenericSchema<unknown, T.AppsPermissionsResourcesListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      resources: v.array(
        v.looseObject({
          id: v.optional(v.string()),
          type: v.optional(v.string()),
        }),
      ),
      response_metadata: v.optional(
        v.objectWithRest(
          {
            next_cursor: v.string(),
          },
          v.unknown(),
        ),
      ),
    },
    v.unknown(),
  )

export const AppsPermissionsScopesListResponse: v.GenericSchema<unknown, T.AppsPermissionsScopesListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      scopes: v.objectWithRest(
        {
          app_home: v.optional(v.lazy(() => ObjsScopes)),
          channel: v.optional(v.lazy(() => ObjsScopes)),
          group: v.optional(v.lazy(() => ObjsScopes)),
          im: v.optional(v.lazy(() => ObjsScopes)),
          mpim: v.optional(v.lazy(() => ObjsScopes)),
          team: v.optional(v.lazy(() => ObjsScopes)),
          user: v.optional(v.lazy(() => ObjsScopes)),
        },
        v.unknown(),
      ),
    },
    v.unknown(),
  )

export const AppsPermissionsUsersListResponse: v.GenericSchema<unknown, T.AppsPermissionsUsersListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AppsPermissionsUsersRequestResponse: v.GenericSchema<unknown, T.AppsPermissionsUsersRequestResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const AppsUninstallResponse: v.GenericSchema<unknown, T.AppsUninstallResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const AuthRevokeResponse: v.GenericSchema<unknown, T.AuthRevokeResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    revoked: v.boolean(),
  },
  v.unknown(),
)

export const AuthTestResponse: v.GenericSchema<unknown, T.AuthTestResponse> = v.objectWithRest(
  {
    bot_id: v.optional(v.lazy(() => DefsBotId)),
    is_enterprise_install: v.optional(v.boolean()),
    ok: v.lazy(() => DefsOkTrue),
    team: v.string(),
    team_id: v.lazy(() => DefsTeam),
    url: v.string(),
    user: v.string(),
    user_id: v.lazy(() => DefsUserId),
  },
  v.unknown(),
)

export const BotsInfoResponse: v.GenericSchema<unknown, T.BotsInfoResponse> = v.objectWithRest(
  {
    bot: v.objectWithRest(
      {
        app_id: v.lazy(() => DefsAppId),
        deleted: v.boolean(),
        icons: v.objectWithRest(
          {
            image_36: v.string(),
            image_48: v.string(),
            image_72: v.string(),
          },
          v.unknown(),
        ),
        id: v.lazy(() => DefsBotId),
        name: v.string(),
        updated: integer(),
        user_id: v.optional(v.lazy(() => DefsUserId)),
      },
      v.unknown(),
    ),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const CallsAddRequest: v.GenericSchema<unknown, T.CallsAddRequest> = v.looseObject({
  external_unique_id: v.string(),
  external_display_id: v.optional(v.string()),
  join_url: v.string(),
  desktop_app_join_url: v.optional(v.string()),
  date_start: v.optional(integer()),
  title: v.optional(v.string()),
  created_by: v.optional(v.string()),
  users: v.optional(v.string()),
})

export const CallsAddResponse: v.GenericSchema<unknown, T.CallsAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const CallsEndRequest: v.GenericSchema<unknown, T.CallsEndRequest> = v.looseObject({
  id: v.string(),
  duration: v.optional(integer()),
})

export const CallsEndResponse: v.GenericSchema<unknown, T.CallsEndResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const CallsInfoResponse: v.GenericSchema<unknown, T.CallsInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const CallsParticipantsAddRequest: v.GenericSchema<unknown, T.CallsParticipantsAddRequest> = v.looseObject({
  id: v.string(),
  users: v.string(),
})

export const CallsParticipantsAddResponse: v.GenericSchema<unknown, T.CallsParticipantsAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const CallsParticipantsRemoveRequest: v.GenericSchema<unknown, T.CallsParticipantsRemoveRequest> = v.looseObject(
  {
    id: v.string(),
    users: v.string(),
  },
)

export const CallsParticipantsRemoveResponse: v.GenericSchema<unknown, T.CallsParticipantsRemoveResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const CallsUpdateRequest: v.GenericSchema<unknown, T.CallsUpdateRequest> = v.looseObject({
  id: v.string(),
  title: v.optional(v.string()),
  join_url: v.optional(v.string()),
  desktop_app_join_url: v.optional(v.string()),
})

export const CallsUpdateResponse: v.GenericSchema<unknown, T.CallsUpdateResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ChatDeleteRequest: v.GenericSchema<unknown, T.ChatDeleteRequest> = v.looseObject({
  ts: v.optional(v.string()),
  channel: v.optional(v.string()),
  as_user: v.optional(v.boolean()),
})

export const ChatDeleteResponse: v.GenericSchema<unknown, T.ChatDeleteResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => DefsChannel),
    ok: v.lazy(() => DefsOkTrue),
    ts: v.lazy(() => DefsTs),
  },
  v.unknown(),
)

export const ChatDeleteScheduledMessageRequest: v.GenericSchema<unknown, T.ChatDeleteScheduledMessageRequest> =
  v.looseObject({
    as_user: v.optional(v.boolean()),
    channel: v.string(),
    scheduled_message_id: v.string(),
  })

export const ChatDeleteScheduledMessageResponse: v.GenericSchema<unknown, T.ChatDeleteScheduledMessageResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const ChatGetPermalinkResponse: v.GenericSchema<unknown, T.ChatGetPermalinkResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => DefsChannel),
    ok: v.lazy(() => DefsOkTrue),
    permalink: v.string(),
  },
  v.unknown(),
)

export const ChatMeMessageRequest: v.GenericSchema<unknown, T.ChatMeMessageRequest> = v.looseObject({
  channel: v.optional(v.string()),
  text: v.optional(v.string()),
})

export const ChatMeMessageResponse: v.GenericSchema<unknown, T.ChatMeMessageResponse> = v.objectWithRest(
  {
    channel: v.optional(v.lazy(() => DefsChannel)),
    ok: v.lazy(() => DefsOkTrue),
    ts: v.optional(v.lazy(() => DefsTs)),
  },
  v.unknown(),
)

export const ChatPostEphemeralRequest: v.GenericSchema<unknown, T.ChatPostEphemeralRequest> = v.looseObject({
  as_user: v.optional(v.boolean()),
  attachments: v.optional(v.string()),
  blocks: v.optional(v.string()),
  channel: v.string(),
  icon_emoji: v.optional(v.string()),
  icon_url: v.optional(v.string()),
  link_names: v.optional(v.boolean()),
  parse: v.optional(v.string()),
  text: v.optional(v.string()),
  thread_ts: v.optional(v.string()),
  user: v.string(),
  username: v.optional(v.string()),
})

export const ChatPostEphemeralResponse: v.GenericSchema<unknown, T.ChatPostEphemeralResponse> = v.objectWithRest(
  {
    message_ts: v.lazy(() => DefsTs),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ChatPostMessageRequest: v.GenericSchema<unknown, T.ChatPostMessageRequest> = v.looseObject({
  as_user: v.optional(v.string()),
  attachments: v.optional(v.string()),
  blocks: v.optional(v.string()),
  channel: v.string(),
  icon_emoji: v.optional(v.string()),
  icon_url: v.optional(v.string()),
  link_names: v.optional(v.boolean()),
  mrkdwn: v.optional(v.boolean()),
  parse: v.optional(v.string()),
  reply_broadcast: v.optional(v.boolean()),
  text: v.optional(v.string()),
  thread_ts: v.optional(v.string()),
  unfurl_links: v.optional(v.boolean()),
  unfurl_media: v.optional(v.boolean()),
  username: v.optional(v.string()),
})

export const ChatPostMessageResponse: v.GenericSchema<unknown, T.ChatPostMessageResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => DefsChannel),
    message: v.lazy(() => ObjsMessage),
    ok: v.lazy(() => DefsOkTrue),
    ts: v.lazy(() => DefsTs),
  },
  v.unknown(),
)

export const ChatScheduleMessageRequest: v.GenericSchema<unknown, T.ChatScheduleMessageRequest> = v.looseObject({
  channel: v.optional(v.string()),
  text: v.optional(v.string()),
  post_at: v.optional(v.string()),
  parse: v.optional(v.string()),
  as_user: v.optional(v.boolean()),
  link_names: v.optional(v.boolean()),
  attachments: v.optional(v.string()),
  blocks: v.optional(v.string()),
  unfurl_links: v.optional(v.boolean()),
  unfurl_media: v.optional(v.boolean()),
  thread_ts: v.optional(v.string()),
  reply_broadcast: v.optional(v.boolean()),
})

export const ChatScheduleMessageResponse: v.GenericSchema<unknown, T.ChatScheduleMessageResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => DefsChannel),
    message: v.objectWithRest(
      {
        bot_id: v.lazy(() => DefsBotId),
        bot_profile: v.optional(v.lazy(() => ObjsBotProfile)),
        team: v.lazy(() => DefsTeam),
        text: v.string(),
        type: v.string(),
        user: v.lazy(() => DefsUserId),
        username: v.optional(v.string()),
      },
      v.unknown(),
    ),
    ok: v.lazy(() => DefsOkTrue),
    post_at: integer(),
    scheduled_message_id: v.pipe(v.string(), v.regex(/^[Q][A-Z0-9]{8,}$/)),
  },
  v.unknown(),
)

export const ChatScheduledMessagesListResponse: v.GenericSchema<unknown, T.ChatScheduledMessagesListResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      response_metadata: v.objectWithRest(
        {
          next_cursor: v.string(),
        },
        v.unknown(),
      ),
      scheduled_messages: v.array(
        v.objectWithRest(
          {
            channel_id: v.lazy(() => DefsChannelId),
            date_created: integer(),
            id: v.pipe(v.string(), v.regex(/^[Q][A-Z0-9]{8,}$/)),
            post_at: integer(),
            text: v.optional(v.string()),
          },
          v.unknown(),
        ),
      ),
    },
    v.unknown(),
  )

export const ChatUnfurlRequest: v.GenericSchema<unknown, T.ChatUnfurlRequest> = v.looseObject({
  channel: v.string(),
  ts: v.string(),
  unfurls: v.optional(v.string()),
  user_auth_message: v.optional(v.string()),
  user_auth_required: v.optional(v.boolean()),
  user_auth_url: v.optional(v.string()),
})

export const ChatUnfurlResponse: v.GenericSchema<unknown, T.ChatUnfurlResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ChatUpdateRequest: v.GenericSchema<unknown, T.ChatUpdateRequest> = v.looseObject({
  as_user: v.optional(v.string()),
  attachments: v.optional(v.string()),
  blocks: v.optional(v.string()),
  channel: v.string(),
  link_names: v.optional(v.string()),
  parse: v.optional(v.string()),
  text: v.optional(v.string()),
  ts: v.string(),
})

export const ChatUpdateResponse: v.GenericSchema<unknown, T.ChatUpdateResponse> = v.objectWithRest(
  {
    channel: v.string(),
    message: v.looseObject({
      attachments: v.optional(v.array(v.looseObject({}))),
      blocks: v.optional(v.looseObject({})),
      text: v.string(),
    }),
    ok: v.lazy(() => DefsOkTrue),
    text: v.string(),
    ts: v.string(),
  },
  v.unknown(),
)

export const ConversationsArchiveRequest: v.GenericSchema<unknown, T.ConversationsArchiveRequest> = v.looseObject({
  channel: v.optional(v.string()),
})

export const ConversationsArchiveResponse: v.GenericSchema<unknown, T.ConversationsArchiveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsCloseRequest: v.GenericSchema<unknown, T.ConversationsCloseRequest> = v.looseObject({
  channel: v.optional(v.string()),
})

export const ConversationsCloseResponse: v.GenericSchema<unknown, T.ConversationsCloseResponse> = v.objectWithRest(
  {
    already_closed: v.optional(v.boolean()),
    no_op: v.optional(v.boolean()),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsCreateRequest: v.GenericSchema<unknown, T.ConversationsCreateRequest> = v.looseObject({
  name: v.optional(v.string()),
  is_private: v.optional(v.boolean()),
})

export const ConversationsCreateResponse: v.GenericSchema<unknown, T.ConversationsCreateResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => ObjsConversation),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsHistoryResponse: v.GenericSchema<unknown, T.ConversationsHistoryResponse> = v.objectWithRest(
  {
    channel_actions_count: integer(),
    channel_actions_ts: v.nullable(integer()),
    has_more: v.boolean(),
    messages: v.pipe(
      v.array(v.lazy(() => ObjsMessage)),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    pin_count: integer(),
    response_metadata: v.optional(
      v.looseObject({
        next_cursor: v.optional(v.string()),
      }),
    ),
  },
  v.unknown(),
)

export const ConversationsInfoResponse: v.GenericSchema<unknown, T.ConversationsInfoResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => ObjsConversation),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsInviteRequest: v.GenericSchema<unknown, T.ConversationsInviteRequest> = v.looseObject({
  channel: v.optional(v.string()),
  users: v.optional(v.string()),
})

export const ConversationsInviteResponse: v.GenericSchema<unknown, T.ConversationsInviteResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => ObjsConversation),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsJoinRequest: v.GenericSchema<unknown, T.ConversationsJoinRequest> = v.looseObject({
  channel: v.optional(v.string()),
})

export const ConversationsJoinResponse: v.GenericSchema<unknown, T.ConversationsJoinResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => ObjsConversation),
    ok: v.lazy(() => DefsOkTrue),
    response_metadata: v.optional(
      v.looseObject({
        warnings: v.optional(
          v.pipe(
            v.array(v.string()),
            v.minLength(0),
            v.check((items) => unique(items), "items must be unique"),
          ),
        ),
      }),
    ),
    warning: v.optional(v.string()),
  },
  v.unknown(),
)

export const ConversationsKickRequest: v.GenericSchema<unknown, T.ConversationsKickRequest> = v.looseObject({
  channel: v.optional(v.string()),
  user: v.optional(v.string()),
})

export const ConversationsKickResponse: v.GenericSchema<unknown, T.ConversationsKickResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsLeaveRequest: v.GenericSchema<unknown, T.ConversationsLeaveRequest> = v.looseObject({
  channel: v.optional(v.string()),
})

export const ConversationsLeaveResponse: v.GenericSchema<unknown, T.ConversationsLeaveResponse> = v.objectWithRest(
  {
    not_in_channel: v.optional(v.literal(true)),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsListResponse: v.GenericSchema<unknown, T.ConversationsListResponse> = v.objectWithRest(
  {
    channels: v.pipe(
      v.array(v.lazy(() => ObjsConversation)),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    response_metadata: v.optional(
      v.objectWithRest(
        {
          next_cursor: v.string(),
        },
        v.unknown(),
      ),
    ),
  },
  v.unknown(),
)

export const ConversationsMarkRequest: v.GenericSchema<unknown, T.ConversationsMarkRequest> = v.looseObject({
  channel: v.optional(v.string()),
  ts: v.optional(v.string()),
})

export const ConversationsMarkResponse: v.GenericSchema<unknown, T.ConversationsMarkResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsMembersResponse: v.GenericSchema<unknown, T.ConversationsMembersResponse> = v.objectWithRest(
  {
    members: v.pipe(
      v.array(v.lazy(() => DefsUserId)),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    response_metadata: v.objectWithRest(
      {
        next_cursor: v.string(),
      },
      v.unknown(),
    ),
  },
  v.unknown(),
)

export const ConversationsOpenRequest: v.GenericSchema<unknown, T.ConversationsOpenRequest> = v.looseObject({
  channel: v.optional(v.string()),
  users: v.optional(v.string()),
  return_im: v.optional(v.boolean()),
})

export const ConversationsOpenResponse: v.GenericSchema<unknown, T.ConversationsOpenResponse> = v.objectWithRest(
  {
    already_open: v.optional(v.boolean()),
    channel: v.union([
      v.lazy(() => ObjsConversation),
      v.objectWithRest(
        {
          created: v.optional(v.string()),
          id: v.lazy(() => DefsDmId),
          is_im: v.optional(v.boolean()),
          is_open: v.optional(v.boolean()),
          last_read: v.optional(v.lazy(() => DefsTs)),
          latest: v.optional(v.lazy(() => ObjsMessage)),
          unread_count: v.optional(number()),
          unread_count_display: v.optional(number()),
          user: v.optional(v.lazy(() => DefsUserId)),
        },
        v.unknown(),
      ),
    ]),
    no_op: v.optional(v.boolean()),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsRenameRequest: v.GenericSchema<unknown, T.ConversationsRenameRequest> = v.looseObject({
  channel: v.optional(v.string()),
  name: v.optional(v.string()),
})

export const ConversationsRenameResponse: v.GenericSchema<unknown, T.ConversationsRenameResponse> = v.objectWithRest(
  {
    channel: v.lazy(() => ObjsConversation),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ConversationsRepliesResponse: v.GenericSchema<unknown, T.ConversationsRepliesResponse> = v.objectWithRest(
  {
    has_more: v.optional(v.boolean()),
    messages: v.array(
      v.union([
        v.objectWithRest(
          {
            last_read: v.optional(v.lazy(() => DefsTs)),
            latest_reply: v.optional(v.lazy(() => DefsTs)),
            reply_count: integer(),
            reply_users: v.optional(
              v.pipe(
                v.array(v.lazy(() => DefsUserId)),
                v.check((items) => unique(items), "items must be unique"),
              ),
            ),
            reply_users_count: v.optional(integer()),
            source_team: v.optional(v.lazy(() => DefsTeam)),
            subscribed: v.boolean(),
            team: v.optional(v.lazy(() => DefsTeam)),
            text: v.string(),
            thread_ts: v.lazy(() => DefsTs),
            ts: v.lazy(() => DefsTs),
            type: v.string(),
            unread_count: v.optional(integer()),
            user: v.lazy(() => DefsUserId),
            user_profile: v.optional(v.lazy(() => ObjsUserProfileShort)),
            user_team: v.optional(v.lazy(() => DefsTeam)),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            is_starred: v.optional(v.boolean()),
            parent_user_id: v.lazy(() => DefsUserId),
            source_team: v.optional(v.lazy(() => DefsTeam)),
            team: v.optional(v.lazy(() => DefsTeam)),
            text: v.string(),
            thread_ts: v.lazy(() => DefsTs),
            ts: v.lazy(() => DefsTs),
            type: v.string(),
            user: v.lazy(() => DefsUserId),
            user_profile: v.optional(v.lazy(() => ObjsUserProfileShort)),
            user_team: v.optional(v.lazy(() => DefsTeam)),
          },
          v.unknown(),
        ),
      ]),
    ),
    ok: v.lazy(() => DefsOkTrue),
    response_metadata: v.optional(
      v.looseObject({
        next_cursor: v.optional(v.string()),
      }),
    ),
  },
  v.unknown(),
)

export const ConversationsSetPurposeRequest: v.GenericSchema<unknown, T.ConversationsSetPurposeRequest> = v.looseObject(
  {
    channel: v.optional(v.string()),
    purpose: v.optional(v.string()),
  },
)

export const ConversationsSetPurposeResponse: v.GenericSchema<unknown, T.ConversationsSetPurposeResponse> =
  v.objectWithRest(
    {
      channel: v.lazy(() => ObjsConversation),
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const ConversationsSetTopicRequest: v.GenericSchema<unknown, T.ConversationsSetTopicRequest> = v.looseObject({
  channel: v.optional(v.string()),
  topic: v.optional(v.string()),
})

export const ConversationsSetTopicResponse: v.GenericSchema<unknown, T.ConversationsSetTopicResponse> =
  v.objectWithRest(
    {
      channel: v.lazy(() => ObjsConversation),
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const ConversationsUnarchiveRequest: v.GenericSchema<unknown, T.ConversationsUnarchiveRequest> = v.looseObject({
  channel: v.optional(v.string()),
})

export const ConversationsUnarchiveResponse: v.GenericSchema<unknown, T.ConversationsUnarchiveResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const DialogOpenResponse: v.GenericSchema<unknown, T.DialogOpenResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const DndEndDndResponse: v.GenericSchema<unknown, T.DndEndDndResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const DndEndSnoozeResponse: v.GenericSchema<unknown, T.DndEndSnoozeResponse> = v.objectWithRest(
  {
    dnd_enabled: v.boolean(),
    next_dnd_end_ts: integer(),
    next_dnd_start_ts: integer(),
    ok: v.lazy(() => DefsOkTrue),
    snooze_enabled: v.boolean(),
  },
  v.unknown(),
)

export const DndInfoResponse: v.GenericSchema<unknown, T.DndInfoResponse> = v.objectWithRest(
  {
    dnd_enabled: v.boolean(),
    next_dnd_end_ts: integer(),
    next_dnd_start_ts: integer(),
    ok: v.lazy(() => DefsOkTrue),
    snooze_enabled: v.optional(v.boolean()),
    snooze_endtime: v.optional(integer()),
    snooze_remaining: v.optional(integer()),
  },
  v.unknown(),
)

export const DndSetSnoozeRequest: v.GenericSchema<unknown, T.DndSetSnoozeRequest> = v.looseObject({
  num_minutes: v.string(),
})

export const DndSetSnoozeResponse: v.GenericSchema<unknown, T.DndSetSnoozeResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    snooze_enabled: v.boolean(),
    snooze_endtime: integer(),
    snooze_remaining: integer(),
  },
  v.unknown(),
)

export const DndTeamInfoResponse: v.GenericSchema<unknown, T.DndTeamInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const EmojiListResponse: v.GenericSchema<unknown, T.EmojiListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesCommentsDeleteRequest: v.GenericSchema<unknown, T.FilesCommentsDeleteRequest> = v.looseObject({
  file: v.optional(v.string()),
  id: v.optional(v.string()),
})

export const FilesCommentsDeleteResponse: v.GenericSchema<unknown, T.FilesCommentsDeleteResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesDeleteRequest: v.GenericSchema<unknown, T.FilesDeleteRequest> = v.looseObject({
  file: v.optional(v.string()),
})

export const FilesDeleteResponse: v.GenericSchema<unknown, T.FilesDeleteResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesInfoResponse: v.GenericSchema<unknown, T.FilesInfoResponse> = v.objectWithRest(
  {
    comments: v.lazy(() => ObjsComments),
    content_html: v.optional(v.unknown()),
    editor: v.optional(v.lazy(() => DefsUserId)),
    file: v.lazy(() => ObjsFile),
    ok: v.lazy(() => DefsOkTrue),
    paging: v.optional(v.lazy(() => ObjsPaging)),
    response_metadata: v.optional(v.lazy(() => ObjsResponseMetadata)),
  },
  v.unknown(),
)

export const FilesListResponse: v.GenericSchema<unknown, T.FilesListResponse> = v.objectWithRest(
  {
    files: v.pipe(
      v.array(v.lazy(() => ObjsFile)),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    paging: v.lazy(() => ObjsPaging),
  },
  v.unknown(),
)

export const FilesRemoteAddRequest: v.GenericSchema<unknown, T.FilesRemoteAddRequest> = v.looseObject({
  external_id: v.optional(v.string()),
  title: v.optional(v.string()),
  filetype: v.optional(v.string()),
  external_url: v.optional(v.string()),
  preview_image: v.optional(v.string()),
  indexable_file_contents: v.optional(v.string()),
})

export const FilesRemoteAddResponse: v.GenericSchema<unknown, T.FilesRemoteAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesRemoteInfoResponse: v.GenericSchema<unknown, T.FilesRemoteInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesRemoteListResponse: v.GenericSchema<unknown, T.FilesRemoteListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesRemoteRemoveRequest: v.GenericSchema<unknown, T.FilesRemoteRemoveRequest> = v.looseObject({
  file: v.optional(v.string()),
  external_id: v.optional(v.string()),
})

export const FilesRemoteRemoveResponse: v.GenericSchema<unknown, T.FilesRemoteRemoveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesRemoteShareResponse: v.GenericSchema<unknown, T.FilesRemoteShareResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesRemoteUpdateRequest: v.GenericSchema<unknown, T.FilesRemoteUpdateRequest> = v.looseObject({
  file: v.optional(v.string()),
  external_id: v.optional(v.string()),
  title: v.optional(v.string()),
  filetype: v.optional(v.string()),
  external_url: v.optional(v.string()),
  preview_image: v.optional(v.string()),
  indexable_file_contents: v.optional(v.string()),
})

export const FilesRemoteUpdateResponse: v.GenericSchema<unknown, T.FilesRemoteUpdateResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesRevokePublicURLRequest: v.GenericSchema<unknown, T.FilesRevokePublicURLRequest> = v.looseObject({
  file: v.optional(v.string()),
})

export const FilesRevokePublicURLResponse: v.GenericSchema<unknown, T.FilesRevokePublicURLResponse> = v.objectWithRest(
  {
    file: v.lazy(() => ObjsFile),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesSharedPublicURLRequest: v.GenericSchema<unknown, T.FilesSharedPublicURLRequest> = v.looseObject({
  file: v.optional(v.string()),
})

export const FilesSharedPublicURLResponse: v.GenericSchema<unknown, T.FilesSharedPublicURLResponse> = v.objectWithRest(
  {
    file: v.lazy(() => ObjsFile),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const FilesUploadRequest: v.GenericSchema<unknown, T.FilesUploadRequest> = v.looseObject({
  file: v.optional(v.string()),
  content: v.optional(v.string()),
  filetype: v.optional(v.string()),
  filename: v.optional(v.string()),
  title: v.optional(v.string()),
  initial_comment: v.optional(v.string()),
  channels: v.optional(v.string()),
  thread_ts: v.optional(v.string()),
})

export const FilesUploadResponse: v.GenericSchema<unknown, T.FilesUploadResponse> = v.objectWithRest(
  {
    file: v.lazy(() => ObjsFile),
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const MigrationExchangeResponse: v.GenericSchema<unknown, T.MigrationExchangeResponse> = v.objectWithRest(
  {
    enterprise_id: v.string(),
    invalid_user_ids: v.optional(v.array(v.string())),
    ok: v.lazy(() => DefsOkTrue),
    team_id: v.lazy(() => DefsTeam),
    user_id_map: v.optional(v.record(v.string(), v.unknown())),
  },
  v.unknown(),
)

export const OauthAccessResponse: v.GenericSchema<unknown, T.OauthAccessResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    access_token: v.optional(v.string()),
  },
  v.unknown(),
)

export const OauthTokenResponse: v.GenericSchema<unknown, T.OauthTokenResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    access_token: v.optional(v.string()),
  },
  v.unknown(),
)

export const OauthV2AccessResponse: v.GenericSchema<unknown, T.OauthV2AccessResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    access_token: v.optional(v.string()),
  },
  v.unknown(),
)

export const PinsAddRequest: v.GenericSchema<unknown, T.PinsAddRequest> = v.looseObject({
  channel: v.string(),
  timestamp: v.optional(v.string()),
})

export const PinsAddResponse: v.GenericSchema<unknown, T.PinsAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const PinsListResponse: v.GenericSchema<unknown, T.PinsListResponse> = v.union([
  v.objectWithRest(
    {
      items: v.pipe(
        v.array(
          v.union([
            v.objectWithRest(
              {
                created: v.optional(integer()),
                created_by: v.optional(v.lazy(() => DefsUserId)),
                file: v.optional(v.lazy(() => ObjsFile)),
                type: v.optional(v.picklist(["file"])),
              },
              v.unknown(),
            ),
            v.objectWithRest(
              {
                channel: v.optional(v.lazy(() => DefsChannel)),
                created: v.optional(integer()),
                created_by: v.optional(v.lazy(() => DefsUserId)),
                message: v.optional(v.lazy(() => ObjsMessage)),
                type: v.optional(v.picklist(["message"])),
              },
              v.unknown(),
            ),
          ]),
        ),
        v.check((items) => unique(items), "items must be unique"),
      ),
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      count: integer(),
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  ),
])

export const PinsRemoveRequest: v.GenericSchema<unknown, T.PinsRemoveRequest> = v.looseObject({
  channel: v.string(),
  timestamp: v.optional(v.string()),
})

export const PinsRemoveResponse: v.GenericSchema<unknown, T.PinsRemoveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ReactionsAddRequest: v.GenericSchema<unknown, T.ReactionsAddRequest> = v.looseObject({
  channel: v.string(),
  name: v.string(),
  timestamp: v.string(),
})

export const ReactionsAddResponse: v.GenericSchema<unknown, T.ReactionsAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ReactionsGetResponse: v.GenericSchema<unknown, T.ReactionsGetResponse> = v.union([
  v.objectWithRest(
    {
      channel: v.lazy(() => DefsChannel),
      message: v.lazy(() => ObjsMessage),
      ok: v.lazy(() => DefsOkTrue),
      type: v.picklist(["message"]),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      file: v.lazy(() => ObjsFile),
      ok: v.lazy(() => DefsOkTrue),
      type: v.picklist(["file"]),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      comment: v.lazy(() => ObjsComment),
      file: v.lazy(() => ObjsFile),
      ok: v.lazy(() => DefsOkTrue),
      type: v.picklist(["file_comment"]),
    },
    v.unknown(),
  ),
])

export const ReactionsListResponse: v.GenericSchema<unknown, T.ReactionsListResponse> = v.objectWithRest(
  {
    items: v.array(
      v.union([
        v.objectWithRest(
          {
            channel: v.lazy(() => DefsChannel),
            message: v.lazy(() => ObjsMessage),
            type: v.picklist(["message"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            file: v.lazy(() => ObjsFile),
            type: v.picklist(["file"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            comment: v.lazy(() => ObjsComment),
            file: v.lazy(() => ObjsFile),
            type: v.picklist(["file_comment"]),
          },
          v.unknown(),
        ),
      ]),
    ),
    ok: v.lazy(() => DefsOkTrue),
    paging: v.optional(v.lazy(() => ObjsPaging)),
    response_metadata: v.optional(v.lazy(() => ObjsResponseMetadata)),
  },
  v.unknown(),
)

export const ReactionsRemoveRequest: v.GenericSchema<unknown, T.ReactionsRemoveRequest> = v.looseObject({
  name: v.string(),
  file: v.optional(v.string()),
  file_comment: v.optional(v.string()),
  channel: v.optional(v.string()),
  timestamp: v.optional(v.string()),
})

export const ReactionsRemoveResponse: v.GenericSchema<unknown, T.ReactionsRemoveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const RemindersAddRequest: v.GenericSchema<unknown, T.RemindersAddRequest> = v.looseObject({
  text: v.string(),
  time: v.string(),
  user: v.optional(v.string()),
})

export const RemindersAddResponse: v.GenericSchema<unknown, T.RemindersAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    reminder: v.lazy(() => ObjsReminder),
  },
  v.unknown(),
)

export const RemindersCompleteRequest: v.GenericSchema<unknown, T.RemindersCompleteRequest> = v.looseObject({
  reminder: v.optional(v.string()),
})

export const RemindersCompleteResponse: v.GenericSchema<unknown, T.RemindersCompleteResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const RemindersDeleteRequest: v.GenericSchema<unknown, T.RemindersDeleteRequest> = v.looseObject({
  reminder: v.optional(v.string()),
})

export const RemindersDeleteResponse: v.GenericSchema<unknown, T.RemindersDeleteResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const RemindersInfoResponse: v.GenericSchema<unknown, T.RemindersInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    reminder: v.lazy(() => ObjsReminder),
  },
  v.unknown(),
)

export const RemindersListResponse: v.GenericSchema<unknown, T.RemindersListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    reminders: v.array(v.lazy(() => ObjsReminder)),
  },
  v.unknown(),
)

export const RtmConnectResponse: v.GenericSchema<unknown, T.RtmConnectResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    self: v.objectWithRest(
      {
        id: v.lazy(() => DefsUserId),
        name: v.string(),
      },
      v.unknown(),
    ),
    team: v.objectWithRest(
      {
        domain: v.string(),
        id: v.lazy(() => DefsTeam),
        name: v.string(),
      },
      v.unknown(),
    ),
    url: v.string(),
  },
  v.unknown(),
)

export const SearchMessagesResponse: v.GenericSchema<unknown, T.SearchMessagesResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const StarsAddRequest: v.GenericSchema<unknown, T.StarsAddRequest> = v.looseObject({
  channel: v.optional(v.string()),
  file: v.optional(v.string()),
  file_comment: v.optional(v.string()),
  timestamp: v.optional(v.string()),
})

export const StarsAddResponse: v.GenericSchema<unknown, T.StarsAddResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const StarsListResponse: v.GenericSchema<unknown, T.StarsListResponse> = v.objectWithRest(
  {
    items: v.array(
      v.union([
        v.objectWithRest(
          {
            channel: v.lazy(() => DefsChannel),
            date_create: integer(),
            message: v.lazy(() => ObjsMessage),
            type: v.picklist(["message"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            date_create: integer(),
            file: v.lazy(() => ObjsFile),
            type: v.picklist(["file"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            comment: v.lazy(() => ObjsComment),
            date_create: integer(),
            file: v.lazy(() => ObjsFile),
            type: v.picklist(["file_comment"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            channel: v.lazy(() => DefsChannel),
            date_create: integer(),
            type: v.picklist(["channel"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            channel: v.lazy(() => DefsDmId),
            date_create: integer(),
            type: v.picklist(["im"]),
          },
          v.unknown(),
        ),
        v.objectWithRest(
          {
            channel: v.lazy(() => DefsGroupId),
            date_create: integer(),
            type: v.picklist(["group"]),
          },
          v.unknown(),
        ),
      ]),
    ),
    ok: v.lazy(() => DefsOkTrue),
    paging: v.optional(v.lazy(() => ObjsPaging)),
    response_metadata: v.optional(
      v.looseObject({
        next_cursor: v.optional(v.string()),
      }),
    ),
  },
  v.unknown(),
)

export const StarsRemoveRequest: v.GenericSchema<unknown, T.StarsRemoveRequest> = v.looseObject({
  channel: v.optional(v.string()),
  file: v.optional(v.string()),
  file_comment: v.optional(v.string()),
  timestamp: v.optional(v.string()),
})

export const StarsRemoveResponse: v.GenericSchema<unknown, T.StarsRemoveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const TeamAccessLogsResponse: v.GenericSchema<unknown, T.TeamAccessLogsResponse> = v.objectWithRest(
  {
    logins: v.pipe(
      v.array(
        v.objectWithRest(
          {
            count: integer(),
            country: v.nullable(v.string()),
            date_first: integer(),
            date_last: integer(),
            ip: v.nullable(v.string()),
            isp: v.nullable(v.string()),
            region: v.nullable(v.string()),
            user_agent: v.string(),
            user_id: v.lazy(() => DefsUserId),
            username: v.string(),
          },
          v.unknown(),
        ),
      ),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    paging: v.lazy(() => ObjsPaging),
  },
  v.unknown(),
)

export const TeamBillableInfoResponse: v.GenericSchema<unknown, T.TeamBillableInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const TeamInfoResponse: v.GenericSchema<unknown, T.TeamInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    team: v.lazy(() => ObjsTeam),
  },
  v.unknown(),
)

export const TeamIntegrationLogsResponse: v.GenericSchema<unknown, T.TeamIntegrationLogsResponse> = v.objectWithRest(
  {
    logs: v.pipe(
      v.array(
        v.objectWithRest(
          {
            admin_app_id: v.optional(v.lazy(() => DefsAppId)),
            app_id: v.lazy(() => DefsAppId),
            app_type: v.string(),
            change_type: v.string(),
            channel: v.optional(v.lazy(() => DefsChannel)),
            date: v.string(),
            scope: v.string(),
            service_id: v.optional(v.string()),
            service_type: v.optional(v.string()),
            user_id: v.lazy(() => DefsUserId),
            user_name: v.string(),
          },
          v.unknown(),
        ),
      ),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    paging: v.lazy(() => ObjsPaging),
  },
  v.unknown(),
)

export const TeamProfileGetResponse: v.GenericSchema<unknown, T.TeamProfileGetResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    profile: v.objectWithRest(
      {
        fields: v.pipe(
          v.array(v.lazy(() => ObjsTeamProfileField)),
          v.check((items) => unique(items), "items must be unique"),
        ),
      },
      v.unknown(),
    ),
  },
  v.unknown(),
)

export const UsergroupsCreateRequest: v.GenericSchema<unknown, T.UsergroupsCreateRequest> = v.looseObject({
  channels: v.optional(v.string()),
  description: v.optional(v.string()),
  handle: v.optional(v.string()),
  include_count: v.optional(v.boolean()),
  name: v.string(),
})

export const UsergroupsCreateResponse: v.GenericSchema<unknown, T.UsergroupsCreateResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    usergroup: v.lazy(() => ObjsSubteam),
  },
  v.unknown(),
)

export const UsergroupsDisableRequest: v.GenericSchema<unknown, T.UsergroupsDisableRequest> = v.looseObject({
  include_count: v.optional(v.boolean()),
  usergroup: v.string(),
})

export const UsergroupsDisableResponse: v.GenericSchema<unknown, T.UsergroupsDisableResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    usergroup: v.lazy(() => ObjsSubteam),
  },
  v.unknown(),
)

export const UsergroupsEnableRequest: v.GenericSchema<unknown, T.UsergroupsEnableRequest> = v.looseObject({
  include_count: v.optional(v.boolean()),
  usergroup: v.string(),
})

export const UsergroupsEnableResponse: v.GenericSchema<unknown, T.UsergroupsEnableResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    usergroup: v.lazy(() => ObjsSubteam),
  },
  v.unknown(),
)

export const UsergroupsListResponse: v.GenericSchema<unknown, T.UsergroupsListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    usergroups: v.array(v.lazy(() => ObjsSubteam)),
  },
  v.unknown(),
)

export const UsergroupsUpdateRequest: v.GenericSchema<unknown, T.UsergroupsUpdateRequest> = v.looseObject({
  handle: v.optional(v.string()),
  description: v.optional(v.string()),
  channels: v.optional(v.string()),
  include_count: v.optional(v.boolean()),
  usergroup: v.string(),
  name: v.optional(v.string()),
})

export const UsergroupsUpdateResponse: v.GenericSchema<unknown, T.UsergroupsUpdateResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    usergroup: v.lazy(() => ObjsSubteam),
  },
  v.unknown(),
)

export const UsergroupsUsersListResponse: v.GenericSchema<unknown, T.UsergroupsUsersListResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    users: v.array(v.lazy(() => DefsUserId)),
  },
  v.unknown(),
)

export const UsergroupsUsersUpdateRequest: v.GenericSchema<unknown, T.UsergroupsUsersUpdateRequest> = v.looseObject({
  include_count: v.optional(v.boolean()),
  usergroup: v.string(),
  users: v.string(),
})

export const UsergroupsUsersUpdateResponse: v.GenericSchema<unknown, T.UsergroupsUsersUpdateResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      usergroup: v.lazy(() => ObjsSubteam),
    },
    v.unknown(),
  )

export const UsersConversationsResponse: v.GenericSchema<unknown, T.UsersConversationsResponse> = v.objectWithRest(
  {
    channels: v.pipe(
      v.array(v.lazy(() => ObjsConversation)),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    response_metadata: v.optional(
      v.objectWithRest(
        {
          next_cursor: v.string(),
        },
        v.unknown(),
      ),
    ),
  },
  v.unknown(),
)

export const UsersDeletePhotoRequest: v.GenericSchema<unknown, T.UsersDeletePhotoRequest> = v.looseObject({})

export const UsersDeletePhotoResponse: v.GenericSchema<unknown, T.UsersDeletePhotoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const UsersGetPresenceResponse: v.GenericSchema<unknown, T.UsersGetPresenceResponse> = v.objectWithRest(
  {
    auto_away: v.optional(v.boolean()),
    connection_count: v.optional(integer()),
    last_activity: v.optional(integer()),
    manual_away: v.optional(v.boolean()),
    ok: v.lazy(() => DefsOkTrue),
    online: v.optional(v.boolean()),
    presence: v.string(),
  },
  v.unknown(),
)

export const UsersIdentityResponse: v.GenericSchema<unknown, T.UsersIdentityResponse> = v.union([
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      team: v.objectWithRest(
        {
          id: v.lazy(() => DefsTeam),
        },
        v.unknown(),
      ),
      user: v.objectWithRest(
        {
          id: v.lazy(() => DefsUserId),
          name: v.string(),
        },
        v.unknown(),
      ),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      team: v.objectWithRest(
        {
          id: v.lazy(() => DefsTeam),
        },
        v.unknown(),
      ),
      user: v.objectWithRest(
        {
          email: v.string(),
          id: v.lazy(() => DefsUserId),
          name: v.string(),
        },
        v.unknown(),
      ),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      team: v.objectWithRest(
        {
          id: v.lazy(() => DefsTeam),
        },
        v.unknown(),
      ),
      user: v.objectWithRest(
        {
          id: v.lazy(() => DefsUserId),
          image_192: v.string(),
          image_24: v.string(),
          image_32: v.string(),
          image_48: v.string(),
          image_512: v.string(),
          image_72: v.string(),
          name: v.string(),
        },
        v.unknown(),
      ),
    },
    v.unknown(),
  ),
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
      team: v.objectWithRest(
        {
          domain: v.string(),
          id: v.lazy(() => DefsTeam),
          image_102: v.string(),
          image_132: v.string(),
          image_230: v.string(),
          image_34: v.string(),
          image_44: v.string(),
          image_68: v.string(),
          image_88: v.string(),
          image_default: v.boolean(),
          name: v.string(),
        },
        v.unknown(),
      ),
      user: v.objectWithRest(
        {
          id: v.lazy(() => DefsUserId),
          name: v.string(),
        },
        v.unknown(),
      ),
    },
    v.unknown(),
  ),
])

export const UsersInfoResponse: v.GenericSchema<unknown, T.UsersInfoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    user: v.lazy(() => ObjsUser),
  },
  v.unknown(),
)

export const UsersListResponse: v.GenericSchema<unknown, T.UsersListResponse> = v.objectWithRest(
  {
    cache_ts: integer(),
    members: v.pipe(
      v.array(v.lazy(() => ObjsUser)),
      v.minLength(0),
      v.check((items) => unique(items), "items must be unique"),
    ),
    ok: v.lazy(() => DefsOkTrue),
    response_metadata: v.optional(v.lazy(() => ObjsResponseMetadata)),
  },
  v.unknown(),
)

export const UsersLookupByEmailResponse: v.GenericSchema<unknown, T.UsersLookupByEmailResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    user: v.lazy(() => ObjsUser),
  },
  v.unknown(),
)

export const UsersProfileGetResponse: v.GenericSchema<unknown, T.UsersProfileGetResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    profile: v.lazy(() => ObjsUserProfile),
  },
  v.unknown(),
)

export const UsersProfileSetRequest: v.GenericSchema<unknown, T.UsersProfileSetRequest> = v.looseObject({
  name: v.optional(v.string()),
  profile: v.optional(v.string()),
  user: v.optional(v.string()),
  value: v.optional(v.string()),
})

export const UsersProfileSetResponse: v.GenericSchema<unknown, T.UsersProfileSetResponse> = v.objectWithRest(
  {
    email_pending: v.optional(v.string()),
    ok: v.lazy(() => DefsOkTrue),
    profile: v.lazy(() => ObjsUserProfile),
    username: v.string(),
  },
  v.unknown(),
)

export const UsersSetActiveResponse: v.GenericSchema<unknown, T.UsersSetActiveResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const UsersSetPhotoRequest: v.GenericSchema<unknown, T.UsersSetPhotoRequest> = v.looseObject({
  crop_w: v.optional(v.string()),
  crop_x: v.optional(v.string()),
  crop_y: v.optional(v.string()),
  image: v.optional(v.string()),
})

export const UsersSetPhotoResponse: v.GenericSchema<unknown, T.UsersSetPhotoResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
    profile: v.objectWithRest(
      {
        avatar_hash: v.pipe(v.string(), v.regex(/^[0-9a-f]{12}$/)),
        image_1024: v.string(),
        image_192: v.string(),
        image_24: v.string(),
        image_32: v.string(),
        image_48: v.string(),
        image_512: v.string(),
        image_72: v.string(),
        image_original: v.string(),
      },
      v.unknown(),
    ),
  },
  v.unknown(),
)

export const UsersSetPresenceRequest: v.GenericSchema<unknown, T.UsersSetPresenceRequest> = v.looseObject({
  presence: v.string(),
})

export const UsersSetPresenceResponse: v.GenericSchema<unknown, T.UsersSetPresenceResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ViewsOpenResponse: v.GenericSchema<unknown, T.ViewsOpenResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ViewsPublishResponse: v.GenericSchema<unknown, T.ViewsPublishResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ViewsPushResponse: v.GenericSchema<unknown, T.ViewsPushResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const ViewsUpdateResponse: v.GenericSchema<unknown, T.ViewsUpdateResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const WorkflowsStepCompletedResponse: v.GenericSchema<unknown, T.WorkflowsStepCompletedResponse> =
  v.objectWithRest(
    {
      ok: v.lazy(() => DefsOkTrue),
    },
    v.unknown(),
  )

export const WorkflowsStepFailedResponse: v.GenericSchema<unknown, T.WorkflowsStepFailedResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const WorkflowsUpdateStepResponse: v.GenericSchema<unknown, T.WorkflowsUpdateStepResponse> = v.objectWithRest(
  {
    ok: v.lazy(() => DefsOkTrue),
  },
  v.unknown(),
)

export const schemas = {
  Blocks,
  DefsAppId,
  DefsBotId,
  DefsChannel,
  DefsChannelId,
  DefsChannelName,
  DefsCommentId,
  DefsDmId,
  DefsEnterpriseId,
  DefsEnterpriseName,
  DefsEnterpriseUserId,
  DefsFileId,
  DefsGroupId,
  DefsOkFalse,
  DefsOkTrue,
  DefsOptionalAppId,
  DefsPinnedInfo,
  DefsReminderId,
  DefsSubteamId,
  DefsTeam,
  DefsTopicPurposeCreator,
  DefsTs,
  DefsUserId,
  DefsWorkspaceId,
  ObjsBotProfile,
  ObjsChannel,
  ObjsComment,
  ObjsComments,
  ObjsConversation,
  ObjsEnterpriseUser,
  ObjsExternalOrgMigrations,
  ObjsFile,
  ObjsIcon,
  ObjsMessage,
  ObjsPaging,
  ObjsPrimaryOwner,
  ObjsReaction,
  ObjsReminder,
  ObjsResources,
  ObjsResponseMetadata,
  ObjsScopes,
  ObjsSubteam,
  ObjsTeam,
  ObjsTeamProfileField,
  ObjsTeamProfileFieldOption,
  ObjsUser,
  ObjsUserProfile,
  ObjsUserProfileShort,
  AdminAppsApproveRequest,
  AdminAppsApproveResponse,
  AdminAppsApprovedListResponse,
  AdminAppsRequestsListResponse,
  AdminAppsRestrictRequest,
  AdminAppsRestrictResponse,
  AdminAppsRestrictedListResponse,
  AdminConversationsArchiveRequest,
  AdminConversationsArchiveResponse,
  AdminConversationsConvertToPrivateRequest,
  AdminConversationsConvertToPrivateResponse,
  AdminConversationsCreateRequest,
  AdminConversationsCreateResponse,
  AdminConversationsDeleteRequest,
  AdminConversationsDeleteResponse,
  AdminConversationsDisconnectSharedRequest,
  AdminConversationsDisconnectSharedResponse,
  AdminConversationsEkmListOriginalConnectedChannelInfoResponse,
  AdminConversationsGetConversationPrefsResponse,
  AdminConversationsGetTeamsResponse,
  AdminConversationsInviteRequest,
  AdminConversationsInviteResponse,
  AdminConversationsRenameRequest,
  AdminConversationsRenameResponse,
  AdminConversationsRestrictAccessAddGroupRequest,
  AdminConversationsRestrictAccessAddGroupResponse,
  AdminConversationsRestrictAccessListGroupsResponse,
  AdminConversationsRestrictAccessRemoveGroupRequest,
  AdminConversationsRestrictAccessRemoveGroupResponse,
  AdminConversationsSearchResponse,
  AdminConversationsSetConversationPrefsRequest,
  AdminConversationsSetConversationPrefsResponse,
  AdminConversationsSetTeamsRequest,
  AdminConversationsSetTeamsResponse,
  AdminConversationsUnarchiveRequest,
  AdminConversationsUnarchiveResponse,
  AdminEmojiAddRequest,
  AdminEmojiAddResponse,
  AdminEmojiAddAliasRequest,
  AdminEmojiAddAliasResponse,
  AdminEmojiListResponse,
  AdminEmojiRemoveRequest,
  AdminEmojiRemoveResponse,
  AdminEmojiRenameRequest,
  AdminEmojiRenameResponse,
  AdminInviteRequestsApproveRequest,
  AdminInviteRequestsApproveResponse,
  AdminInviteRequestsApprovedListResponse,
  AdminInviteRequestsDeniedListResponse,
  AdminInviteRequestsDenyRequest,
  AdminInviteRequestsDenyResponse,
  AdminInviteRequestsListResponse,
  AdminTeamsAdminsListResponse,
  AdminTeamsCreateRequest,
  AdminTeamsCreateResponse,
  AdminTeamsListResponse,
  AdminTeamsOwnersListResponse,
  AdminTeamsSettingsInfoResponse,
  AdminTeamsSettingsSetDefaultChannelsRequest,
  AdminTeamsSettingsSetDefaultChannelsResponse,
  AdminTeamsSettingsSetDescriptionRequest,
  AdminTeamsSettingsSetDescriptionResponse,
  AdminTeamsSettingsSetDiscoverabilityRequest,
  AdminTeamsSettingsSetDiscoverabilityResponse,
  AdminTeamsSettingsSetIconRequest,
  AdminTeamsSettingsSetIconResponse,
  AdminTeamsSettingsSetNameRequest,
  AdminTeamsSettingsSetNameResponse,
  AdminUsergroupsAddChannelsRequest,
  AdminUsergroupsAddChannelsResponse,
  AdminUsergroupsAddTeamsRequest,
  AdminUsergroupsAddTeamsResponse,
  AdminUsergroupsListChannelsResponse,
  AdminUsergroupsRemoveChannelsRequest,
  AdminUsergroupsRemoveChannelsResponse,
  AdminUsersAssignRequest,
  AdminUsersAssignResponse,
  AdminUsersInviteRequest,
  AdminUsersInviteResponse,
  AdminUsersListResponse,
  AdminUsersRemoveRequest,
  AdminUsersRemoveResponse,
  AdminUsersSessionInvalidateRequest,
  AdminUsersSessionInvalidateResponse,
  AdminUsersSessionResetRequest,
  AdminUsersSessionResetResponse,
  AdminUsersSetAdminRequest,
  AdminUsersSetAdminResponse,
  AdminUsersSetExpirationRequest,
  AdminUsersSetExpirationResponse,
  AdminUsersSetOwnerRequest,
  AdminUsersSetOwnerResponse,
  AdminUsersSetRegularRequest,
  AdminUsersSetRegularResponse,
  ApiTestResponse,
  AppsEventAuthorizationsListResponse,
  AppsPermissionsInfoResponse,
  AppsPermissionsRequestResponse,
  AppsPermissionsResourcesListResponse,
  AppsPermissionsScopesListResponse,
  AppsPermissionsUsersListResponse,
  AppsPermissionsUsersRequestResponse,
  AppsUninstallResponse,
  AuthRevokeResponse,
  AuthTestResponse,
  BotsInfoResponse,
  CallsAddRequest,
  CallsAddResponse,
  CallsEndRequest,
  CallsEndResponse,
  CallsInfoResponse,
  CallsParticipantsAddRequest,
  CallsParticipantsAddResponse,
  CallsParticipantsRemoveRequest,
  CallsParticipantsRemoveResponse,
  CallsUpdateRequest,
  CallsUpdateResponse,
  ChatDeleteRequest,
  ChatDeleteResponse,
  ChatDeleteScheduledMessageRequest,
  ChatDeleteScheduledMessageResponse,
  ChatGetPermalinkResponse,
  ChatMeMessageRequest,
  ChatMeMessageResponse,
  ChatPostEphemeralRequest,
  ChatPostEphemeralResponse,
  ChatPostMessageRequest,
  ChatPostMessageResponse,
  ChatScheduleMessageRequest,
  ChatScheduleMessageResponse,
  ChatScheduledMessagesListResponse,
  ChatUnfurlRequest,
  ChatUnfurlResponse,
  ChatUpdateRequest,
  ChatUpdateResponse,
  ConversationsArchiveRequest,
  ConversationsArchiveResponse,
  ConversationsCloseRequest,
  ConversationsCloseResponse,
  ConversationsCreateRequest,
  ConversationsCreateResponse,
  ConversationsHistoryResponse,
  ConversationsInfoResponse,
  ConversationsInviteRequest,
  ConversationsInviteResponse,
  ConversationsJoinRequest,
  ConversationsJoinResponse,
  ConversationsKickRequest,
  ConversationsKickResponse,
  ConversationsLeaveRequest,
  ConversationsLeaveResponse,
  ConversationsListResponse,
  ConversationsMarkRequest,
  ConversationsMarkResponse,
  ConversationsMembersResponse,
  ConversationsOpenRequest,
  ConversationsOpenResponse,
  ConversationsRenameRequest,
  ConversationsRenameResponse,
  ConversationsRepliesResponse,
  ConversationsSetPurposeRequest,
  ConversationsSetPurposeResponse,
  ConversationsSetTopicRequest,
  ConversationsSetTopicResponse,
  ConversationsUnarchiveRequest,
  ConversationsUnarchiveResponse,
  DialogOpenResponse,
  DndEndDndResponse,
  DndEndSnoozeResponse,
  DndInfoResponse,
  DndSetSnoozeRequest,
  DndSetSnoozeResponse,
  DndTeamInfoResponse,
  EmojiListResponse,
  FilesCommentsDeleteRequest,
  FilesCommentsDeleteResponse,
  FilesDeleteRequest,
  FilesDeleteResponse,
  FilesInfoResponse,
  FilesListResponse,
  FilesRemoteAddRequest,
  FilesRemoteAddResponse,
  FilesRemoteInfoResponse,
  FilesRemoteListResponse,
  FilesRemoteRemoveRequest,
  FilesRemoteRemoveResponse,
  FilesRemoteShareResponse,
  FilesRemoteUpdateRequest,
  FilesRemoteUpdateResponse,
  FilesRevokePublicURLRequest,
  FilesRevokePublicURLResponse,
  FilesSharedPublicURLRequest,
  FilesSharedPublicURLResponse,
  FilesUploadRequest,
  FilesUploadResponse,
  MigrationExchangeResponse,
  OauthAccessResponse,
  OauthTokenResponse,
  OauthV2AccessResponse,
  PinsAddRequest,
  PinsAddResponse,
  PinsListResponse,
  PinsRemoveRequest,
  PinsRemoveResponse,
  ReactionsAddRequest,
  ReactionsAddResponse,
  ReactionsGetResponse,
  ReactionsListResponse,
  ReactionsRemoveRequest,
  ReactionsRemoveResponse,
  RemindersAddRequest,
  RemindersAddResponse,
  RemindersCompleteRequest,
  RemindersCompleteResponse,
  RemindersDeleteRequest,
  RemindersDeleteResponse,
  RemindersInfoResponse,
  RemindersListResponse,
  RtmConnectResponse,
  SearchMessagesResponse,
  StarsAddRequest,
  StarsAddResponse,
  StarsListResponse,
  StarsRemoveRequest,
  StarsRemoveResponse,
  TeamAccessLogsResponse,
  TeamBillableInfoResponse,
  TeamInfoResponse,
  TeamIntegrationLogsResponse,
  TeamProfileGetResponse,
  UsergroupsCreateRequest,
  UsergroupsCreateResponse,
  UsergroupsDisableRequest,
  UsergroupsDisableResponse,
  UsergroupsEnableRequest,
  UsergroupsEnableResponse,
  UsergroupsListResponse,
  UsergroupsUpdateRequest,
  UsergroupsUpdateResponse,
  UsergroupsUsersListResponse,
  UsergroupsUsersUpdateRequest,
  UsergroupsUsersUpdateResponse,
  UsersConversationsResponse,
  UsersDeletePhotoRequest,
  UsersDeletePhotoResponse,
  UsersGetPresenceResponse,
  UsersIdentityResponse,
  UsersInfoResponse,
  UsersListResponse,
  UsersLookupByEmailResponse,
  UsersProfileGetResponse,
  UsersProfileSetRequest,
  UsersProfileSetResponse,
  UsersSetActiveResponse,
  UsersSetPhotoRequest,
  UsersSetPhotoResponse,
  UsersSetPresenceRequest,
  UsersSetPresenceResponse,
  ViewsOpenResponse,
  ViewsPublishResponse,
  ViewsPushResponse,
  ViewsUpdateResponse,
  WorkflowsStepCompletedResponse,
  WorkflowsStepFailedResponse,
  WorkflowsUpdateStepResponse,
} as const
