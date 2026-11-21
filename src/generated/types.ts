// GENERATED. DO NOT EDIT.
// Source: spec/slack/, checked against provenance.json
// Run: pnpm generate

/** This is a very loose definition, in the future, we'll populate this with deeper schema in this definition namespace. */
export type Blocks = Array<
  {
    type: string
  } & { [key: string]: unknown }
>

export type DefsAppId = string

export type DefsBotId = string

export type DefsChannel = string

export type DefsChannelId = string

export type DefsChannelName = string

export type DefsCommentId = string

export type DefsDmId = string

export type DefsEnterpriseId = string

export type DefsEnterpriseName = string

export type DefsEnterpriseUserId = string

export type DefsFileId = string

export type DefsGroupId = string

export type DefsOkFalse = false

export type DefsOkTrue = true

export type DefsOptionalAppId = string

export type DefsPinnedInfo = Record<string, unknown>

export type DefsReminderId = string

export type DefsSubteamId = string

export type DefsTeam = string

export type DefsTopicPurposeCreator = string

export type DefsTs = string

export type DefsUserId = string

export type DefsWorkspaceId = string

export type ObjsBotProfile = {
  app_id: DefsAppId
  deleted: boolean
  icons: {
    image_36: string
    image_48: string
    image_72: string
  }
  id: DefsBotId
  name: string
  team_id: DefsTeam
  updated: number
}

export type ObjsChannel = {
  accepted_user?: DefsUserId
  created: number
  creator: DefsUserId
  id: DefsChannelId
  is_archived?: boolean
  is_channel: boolean
  is_frozen?: boolean
  is_general?: boolean
  is_member?: boolean
  is_moved?: number
  is_mpim: boolean
  is_non_threadable?: boolean
  is_org_shared: boolean
  is_pending_ext_shared?: boolean
  is_private: boolean
  is_read_only?: boolean
  is_shared: boolean
  is_thread_only?: boolean
  last_read?: DefsTs
  latest?: Array<ObjsMessage | null>
  members: Array<DefsUserId>
  name: string
  name_normalized: string
  num_members?: number
  pending_shared?: Array<DefsTeam>
  previous_names?: Array<DefsChannelName>
  priority?: number
  purpose: {
    creator: DefsTopicPurposeCreator
    last_set: number
    value: string
  }
  topic: {
    creator: DefsTopicPurposeCreator
    last_set: number
    value: string
  }
  unlinked?: number
  unread_count?: number
  unread_count_display?: number
}

export type ObjsComment = {
  comment: string
  created: number
  id: DefsCommentId
  is_intro: boolean
  is_starred?: boolean
  num_stars?: number
  pinned_info?: DefsPinnedInfo
  pinned_to?: Array<DefsChannel>
  reactions?: Array<ObjsReaction>
  timestamp: number
  user: DefsUserId
}

export type ObjsComments = Array<unknown>

export type ObjsConversation = Array<
  | {
      accepted_user?: DefsUserId
      connected_team_ids?: Array<DefsWorkspaceId>
      conversation_host_id?: DefsWorkspaceId
      created: number
      creator: DefsUserId
      display_counts?: {
        display_counts: number
        guest_counts: number
      }
      enterprise_id?: DefsEnterpriseId
      has_pins?: boolean
      id: DefsChannel
      internal_team_ids?: Array<DefsTeam>
      is_archived: boolean
      is_channel: boolean
      is_ext_shared?: boolean
      is_frozen?: boolean
      is_general: boolean
      is_global_shared?: boolean
      is_group: boolean
      is_im: boolean
      is_member?: boolean
      is_moved?: number
      is_mpim: false
      is_non_threadable?: boolean
      is_open?: boolean
      is_org_default?: boolean
      is_org_mandatory?: boolean
      is_org_shared: boolean
      is_pending_ext_shared?: boolean
      is_private: boolean
      is_read_only?: boolean
      is_shared: boolean
      is_starred?: boolean
      is_thread_only?: boolean
      last_read?: DefsTs
      latest?: Array<ObjsMessage | null>
      members?: Array<DefsUserId>
      name: string
      name_normalized: string
      num_members?: number
      parent_conversation?: Array<DefsChannel | null>
      pending_connected_team_ids?: Array<DefsTeam>
      pending_shared?: Array<DefsTeam>
      pin_count?: number
      previous_names?: Array<DefsChannelName>
      priority?: number
      purpose: {
        creator: DefsTopicPurposeCreator
        last_set: number
        value: string
      }
      shared_team_ids?: Array<DefsTeam>
      shares?: Array<{
        accepted_user?: DefsUserId
        is_active: boolean
        team: ObjsTeam
        user: DefsUserId
      }>
      timezone_count?: number
      topic: {
        creator: DefsTopicPurposeCreator
        last_set: number
        value: string
      }
      unlinked?: number
      unread_count?: number
      unread_count_display?: number
      use_case?: string
      user?: DefsUserId
      version?: number
    }
  | {
      accepted_user?: DefsUserId
      connected_team_ids?: Array<DefsTeam>
      conversation_host_id?: DefsWorkspaceId
      created: number
      creator: DefsUserId
      display_counts?: {
        display_counts: number
        guest_counts: number
      }
      id: DefsChannel
      internal_team_ids?: Array<DefsTeam>
      is_archived: boolean
      is_channel: boolean
      is_ext_shared?: boolean
      is_frozen?: boolean
      is_general: boolean
      is_group: boolean
      is_im: boolean
      is_member?: boolean
      is_moved?: number
      is_mpim: true
      is_non_threadable?: boolean
      is_open?: boolean
      is_org_shared: boolean
      is_pending_ext_shared?: boolean
      is_private: boolean
      is_read_only?: boolean
      is_shared: boolean
      is_starred?: boolean
      is_thread_only?: boolean
      last_read?: DefsTs
      latest?: Array<ObjsMessage | null>
      members?: Array<DefsUserId>
      name: string
      name_normalized: string
      num_members?: number
      parent_conversation?: Array<DefsChannel | null>
      pending_connected_team_ids?: Array<DefsTeam>
      pending_shared?: Array<DefsTeam>
      pin_count?: number
      previous_names?: Array<DefsChannelName>
      priority?: number
      purpose: {
        creator: DefsTopicPurposeCreator
        last_set: number
        value: string
      }
      shared_team_ids?: Array<DefsTeam>
      shares?: Array<{
        accepted_user?: DefsUserId
        is_active: boolean
        team: ObjsTeam
        user: DefsUserId
      }>
      timezone_count?: number
      topic: {
        creator: DefsTopicPurposeCreator
        last_set: number
        value: string
      }
      unlinked?: number
      unread_count?: number
      unread_count_display?: number
      user?: DefsUserId
      version?: number
    }
  | {
      created: number
      has_pins?: boolean
      id: DefsDmId
      is_archived?: boolean
      is_ext_shared?: boolean
      is_frozen?: boolean
      is_im: boolean
      is_open?: boolean
      is_org_shared: boolean
      is_shared?: boolean
      is_starred?: boolean
      is_user_deleted?: boolean
      last_read?: DefsTs
      latest?: Array<ObjsMessage | null>
      parent_conversation?: Array<DefsChannel | null>
      pin_count?: number
      priority: number
      shares?: Array<{
        date_create: number
        id: DefsTeam
        is_active: boolean
        name: string
        team: ObjsTeam
      }>
      unread_count?: number
      unread_count_display?: number
      user: DefsUserId
      version?: number
    }
>

export type ObjsEnterpriseUser = {
  enterprise_id: DefsEnterpriseId
  enterprise_name: DefsEnterpriseName
  id: DefsEnterpriseUserId
  is_admin: boolean
  is_owner: boolean
  teams: Array<DefsTeam>
}

export type ObjsExternalOrgMigrations = {
  current: Array<{
    date_started: number
    team_id: string
  }>
  date_updated: number
}

export type ObjsFile = {
  channels?: Array<DefsChannelId>
  comments_count?: number
  created?: number
  date_delete?: number
  display_as_bot?: boolean
  editable?: boolean
  editor?: DefsUserId
  external_id?: string
  external_type?: string
  external_url?: string
  filetype?: string
  groups?: Array<DefsGroupId>
  has_rich_preview?: boolean
  id?: DefsFileId
  image_exif_rotation?: number
  ims?: Array<DefsDmId>
  is_external?: boolean
  is_public?: boolean
  is_starred?: boolean
  is_tombstoned?: boolean
  last_editor?: DefsUserId
  mimetype?: string
  mode?: string
  name?: string
  non_owner_editable?: boolean
  num_stars?: number
  original_h?: number
  original_w?: number
  permalink?: string
  permalink_public?: string
  pinned_info?: DefsPinnedInfo
  pinned_to?: Array<DefsChannel>
  pretty_type?: string
  preview?: string
  public_url_shared?: boolean
  reactions?: Array<ObjsReaction>
  shares?: {
    private?: Record<string, unknown>
    public?: Record<string, unknown>
  }
  size?: number
  source_team?: DefsTeam
  state?: string
  thumb_1024?: string
  thumb_1024_h?: number
  thumb_1024_w?: number
  thumb_160?: string
  thumb_360?: string
  thumb_360_h?: number
  thumb_360_w?: number
  thumb_480?: string
  thumb_480_h?: number
  thumb_480_w?: number
  thumb_64?: string
  thumb_720?: string
  thumb_720_h?: number
  thumb_720_w?: number
  thumb_80?: string
  thumb_800?: string
  thumb_800_h?: number
  thumb_800_w?: number
  thumb_960?: string
  thumb_960_h?: number
  thumb_960_w?: number
  thumb_tiny?: string
  timestamp?: number
  title?: string
  updated?: number
  url_private?: string
  url_private_download?: string
  user?: string
  user_team?: DefsTeam
  username?: string
}

export type ObjsIcon = {
  image_102?: string
  image_132?: string
  image_230?: string
  image_34?: string
  image_44?: string
  image_68?: string
  image_88?: string
  image_default?: boolean
}

export type ObjsMessage = {
  attachments?: Array<{
    fallback?: string
    id: number
    image_bytes?: number
    image_height?: number
    image_url?: string
    image_width?: number
  }>
  blocks?: Blocks
  bot_id?: Array<DefsBotId | null>
  bot_profile?: ObjsBotProfile
  client_msg_id?: string
  comment?: ObjsComment
  display_as_bot?: boolean
  file?: ObjsFile
  files?: Array<ObjsFile>
  icons?: {
    emoji?: string
    image_64?: string
  }
  inviter?: DefsUserId
  is_delayed_message?: boolean
  is_intro?: boolean
  is_starred?: boolean
  last_read?: DefsTs
  latest_reply?: DefsTs
  name?: string
  old_name?: string
  parent_user_id?: DefsUserId
  permalink?: string
  pinned_to?: Array<DefsChannel>
  purpose?: string
  reactions?: Array<ObjsReaction>
  reply_count?: number
  reply_users?: Array<DefsUserId>
  reply_users_count?: number
  source_team?: DefsWorkspaceId
  subscribed?: boolean
  subtype?: string
  team?: DefsWorkspaceId
  text: string
  thread_ts?: DefsTs
  topic?: string
  ts: DefsTs
  type: string
  unread_count?: number
  upload?: boolean
  user?: DefsUserId
  user_profile?: ObjsUserProfileShort
  user_team?: DefsWorkspaceId
  username?: string
}

export type ObjsPaging = {
  count?: number
  page: number
  pages?: number
  per_page?: number
  spill?: number
  total: number
}

export type ObjsPrimaryOwner = {
  email: string
  id: string
}

export type ObjsReaction = {
  count: number
  name: string
  users: Array<DefsUserId>
} & { [key: string]: unknown }

export type ObjsReminder = {
  complete_ts?: number
  creator: DefsUserId
  id: DefsReminderId
  recurring: boolean
  text: string
  time?: number
  user: DefsUserId
}

export type ObjsResources = {
  excluded_ids?: Array<Array<DefsChannel | DefsTeam>>
  ids: Array<Array<DefsChannel | DefsTeam>>
  wildcard?: boolean
}

export type ObjsResponseMetadata = Array<
  | {
      next_cursor: string
    }
  | {
      messages: Array<string>
      warnings: Array<"method_deprecated">
    }
  | {
      messages: Array<string>
      next_cursor: string
      warnings: Array<"method_deprecated">
    }
>

export type ObjsScopes = Array<string>

export type ObjsSubteam = {
  auto_provision: boolean
  auto_type: Array<"owner" | "admin" | null>
  channel_count?: number
  created_by: DefsUserId
  date_create: number
  date_delete: number
  date_update: number
  deleted_by: Array<DefsUserId | null>
  description: string
  enterprise_subteam_id: string
  handle: string
  id: DefsSubteamId
  is_external: boolean
  is_subteam: boolean
  is_usergroup: boolean
  name: string
  prefs: {
    channels: Array<DefsChannelId>
    groups: Array<DefsGroupId>
  }
  team_id: DefsTeam
  updated_by: DefsUserId
  user_count?: number
  users?: Array<DefsUserId>
}

export type ObjsTeam = {
  archived?: boolean
  avatar_base_url?: string
  created?: number
  date_create?: number
  deleted?: boolean
  description?: string | null
  discoverable?: Array<string | null>
  domain: string
  email_domain: string
  enterprise_id?: DefsEnterpriseId
  enterprise_name?: DefsEnterpriseName
  external_org_migrations?: ObjsExternalOrgMigrations
  has_compliance_export?: boolean
  icon: ObjsIcon
  id: DefsWorkspaceId
  is_assigned?: boolean
  is_enterprise?: number
  is_over_storage_limit?: boolean
  limit_ts?: number
  locale?: string
  messages_count?: number
  msg_edit_window_mins?: number
  name: string
  over_integrations_limit?: boolean
  over_storage_limit?: boolean
  pay_prod_cur?: string
  plan?: "" | "std" | "plus" | "compliance" | "enterprise"
  primary_owner?: ObjsPrimaryOwner
  sso_provider?: {
    label?: string
    name?: string
    type?: string
  }
}

export type ObjsTeamProfileField = {
  field_name?: string | null
  hint: string
  id: string
  is_hidden?: boolean
  label: string
  options?: Array<ObjsTeamProfileFieldOption | null>
  ordering: number
  possible_values?: Array<string> | null
  type: "text" | "date" | "link" | "mailto" | "options_list" | "user"
}

export type ObjsTeamProfileFieldOption = {
  is_custom?: boolean | null
  is_multiple_entry?: boolean | null
  is_protected?: boolean | null
  is_scim?: boolean | null
}

export type ObjsUser = Array<
  | {
      color?: string
      deleted?: boolean
      enterprise_user?: ObjsEnterpriseUser
      has_2fa?: boolean
      id: DefsUserId
      is_admin?: boolean
      is_app_user: boolean
      is_bot: boolean
      is_external?: boolean
      is_forgotten?: boolean
      is_invited_user?: boolean
      is_owner?: boolean
      is_primary_owner?: boolean
      is_restricted?: boolean
      is_stranger?: boolean
      is_ultra_restricted?: boolean
      locale?: string
      name: string
      presence?: string
      profile: ObjsUserProfile
      real_name?: string
      team?: DefsWorkspaceId
      team_id?: DefsWorkspaceId
      team_profile?: {
        fields: Array<ObjsTeamProfileField>
      }
      two_factor_type?: string
      tz?: Array<string | null>
      tz_label?: string
      tz_offset?: number
      updated: number
    }
  | {
      /** refercing to bug: https://jira.tinyspeck.com/browse/EVALUE-1559 */
      color?: string
      deleted?: boolean
      enterprise_user?: ObjsEnterpriseUser
      has_2fa?: boolean
      id: DefsUserId
      is_admin?: boolean
      is_app_user: boolean
      is_bot: boolean
      is_external?: boolean
      is_forgotten?: boolean
      is_owner?: boolean
      is_primary_owner?: boolean
      is_restricted?: boolean
      is_stranger?: boolean
      is_ultra_restricted?: boolean
      locale?: string
      name: string
      presence?: string
      profile: ObjsUserProfile
      real_name?: string
      team_id?: DefsWorkspaceId
      team_profile?: {
        fields: Array<ObjsTeamProfileField>
      }
      teams?: Array<DefsWorkspaceId>
      two_factor_type?: string
      tz?: Array<string | null>
      tz_label?: string
      tz_offset?: number
      updated: number
    }
>

export type ObjsUserProfile = {
  always_active?: boolean
  api_app_id?: DefsOptionalAppId
  avatar_hash: string
  bot_id?: DefsBotId
  display_name: string
  display_name_normalized: string
  email?: string | null
  fields: (Record<string, unknown> | Array<Record<string, unknown>>) | null
  first_name?: string | null
  guest_expiration_ts?: number | null
  guest_invited_by?: string | null
  image_1024?: string | null
  image_192?: string | null
  image_24?: string | null
  image_32?: string | null
  image_48?: string | null
  image_512?: string | null
  image_72?: string | null
  image_original?: string | null
  is_app_user?: boolean
  is_custom_image?: boolean
  is_restricted?: boolean | null
  is_ultra_restricted?: boolean | null
  last_avatar_image_hash?: string
  last_name?: string | null
  memberships_count?: number
  name?: string | null
  phone: string
  pronouns?: string
  real_name: string
  real_name_normalized: string
  skype: string
  status_default_emoji?: string
  status_default_text?: string
  status_default_text_canonical?: string | null
  status_emoji: string
  status_expiration?: number
  status_text: string
  status_text_canonical?: string | null
  team?: DefsWorkspaceId
  title: string
  updated?: number
  user_id?: string
  username?: string | null
}

export type ObjsUserProfileShort = {
  avatar_hash: string
  display_name: string
  display_name_normalized?: string
  first_name: string | null
  image_72: string
  is_restricted: boolean
  is_ultra_restricted: boolean
  name: string
  real_name: string
  real_name_normalized?: string
  team: DefsWorkspaceId
}

export type AdminAppsApproveRequest = {
  /** The id of the app to approve. */
  app_id?: string
  /** The id of the request to approve. */
  request_id?: string
  team_id?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminAppsApproveResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminAppsApprovedListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminAppsRequestsListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminAppsRestrictRequest = {
  /** The id of the app to restrict. */
  app_id?: string
  /** The id of the request to restrict. */
  request_id?: string
  team_id?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminAppsRestrictResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminAppsRestrictedListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminConversationsArchiveRequest = {
  /** The channel to archive. */
  channel_id: string
}

/** Schema for successful response of admin.conversations.archive */
export type AdminConversationsArchiveResponse = {
  ok: DefsOkTrue
}

export type AdminConversationsConvertToPrivateRequest = {
  /** The channel to convert to private. */
  channel_id: string
}

/** Schema for successful response of admin.conversations.convertToPrivate */
export type AdminConversationsConvertToPrivateResponse = {
  ok: DefsOkTrue
}

export type AdminConversationsCreateRequest = {
  /** Name of the public or private channel to create. */
  name: string
  /** Description of the public or private channel to create. */
  description?: string
  /** When `true`, creates a private channel instead of a public channel */
  is_private: boolean
  /** When `true`, the channel will be available org-wide. Note: if the channel is not `org_wide=true`, you must specify a `team_id` for this channel */
  org_wide?: boolean
  /** The workspace to create the channel in. Note: this argument is required unless you set `org_wide=true`. */
  team_id?: string
}

/** Schema for successful response of admin.conversations.create */
export type AdminConversationsCreateResponse = {
  channel_id?: DefsChannelId
  ok: DefsOkTrue
}

export type AdminConversationsDeleteRequest = {
  /** The channel to delete. */
  channel_id: string
}

/** Schema for successful response of admin.conversations.delete */
export type AdminConversationsDeleteResponse = {
  ok: DefsOkTrue
}

export type AdminConversationsDisconnectSharedRequest = {
  /** The channel to be disconnected from some workspaces. */
  channel_id: string
  /** The team to be removed from the channel. Currently only a single team id can be specified. */
  leaving_team_ids?: string
}

/** Schema for successful response of admin.conversations.disconnectShared */
export type AdminConversationsDisconnectSharedResponse = {
  ok: DefsOkTrue
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminConversationsEkmListOriginalConnectedChannelInfoResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** Schema for successful response of admin.conversations.getConversationPrefs */
export type AdminConversationsGetConversationPrefsResponse = {
  ok: DefsOkTrue
  prefs?: {
    can_thread?: {
      type?: Array<string>
      user?: Array<string>
    }
    who_can_post?: {
      type?: Array<string>
      user?: Array<string>
    }
  }
}

/** Schema for successful response of admin.conversations.getTeams */
export type AdminConversationsGetTeamsResponse = {
  ok: DefsOkTrue
  response_metadata?: {
    next_cursor: string
  }
  team_ids: Array<DefsTeam>
}

export type AdminConversationsInviteRequest = {
  /** The users to invite. */
  user_ids: string
  /** The channel that the users will be invited to. */
  channel_id: string
}

/** Schema for successful response of admin.conversations.invite */
export type AdminConversationsInviteResponse = {
  ok: DefsOkTrue
}

export type AdminConversationsRenameRequest = {
  /** The channel to rename. */
  channel_id: string
  name: string
}

/** Schema for successful response of admin.conversations.rename */
export type AdminConversationsRenameResponse = {
  ok: DefsOkTrue
}

export type AdminConversationsRestrictAccessAddGroupRequest = {
  /** Authentication token. Requires scope: `admin.conversations:write` */
  token: string
  /** The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. */
  team_id?: string
  /** The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to be an allowlist for the private channel. */
  group_id: string
  /** The channel to link this group to. */
  channel_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminConversationsRestrictAccessAddGroupResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminConversationsRestrictAccessListGroupsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminConversationsRestrictAccessRemoveGroupRequest = {
  /** Authentication token. Requires scope: `admin.conversations:write` */
  token: string
  /** The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. */
  team_id: string
  /** The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to remove from the private channel. */
  group_id: string
  /** The channel to remove the linked group from. */
  channel_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminConversationsRestrictAccessRemoveGroupResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** Schema for successful response of admin.conversations.search */
export type AdminConversationsSearchResponse = {
  channels: Array<ObjsChannel>
  next_cursor: string
}

export type AdminConversationsSetConversationPrefsRequest = {
  /** The channel to set the prefs for */
  channel_id: string
  /** The prefs for this channel in a stringified JSON format. */
  prefs: string
}

/** Schema for successful response of admin.conversations.setConversationPrefs */
export type AdminConversationsSetConversationPrefsResponse = {
  ok: DefsOkTrue
}

export type AdminConversationsSetTeamsRequest = {
  /** The encoded `channel_id` to add or remove to workspaces. */
  channel_id: string
  /** The workspace to which the channel belongs. Omit this argument if the channel is a cross-workspace shared channel. */
  team_id?: string
  /** A comma-separated list of workspaces to which the channel should be shared. Not required if the channel is being shared org-wide. */
  target_team_ids?: string
  /** True if channel has to be converted to an org channel */
  org_channel?: boolean
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminConversationsSetTeamsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminConversationsUnarchiveRequest = {
  /** The channel to unarchive. */
  channel_id: string
}

/** Schema for successful response of admin.conversations.unarchive */
export type AdminConversationsUnarchiveResponse = {
  ok: DefsOkTrue
}

export type AdminEmojiAddRequest = {
  /** Authentication token. Requires scope: `admin.teams:write` */
  token: string
  /** The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included. */
  name: string
  /** The URL of a file to use as an image for the emoji. Square images under 128KB and with transparent backgrounds work best. */
  url: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminEmojiAddResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminEmojiAddAliasRequest = {
  /** Authentication token. Requires scope: `admin.teams:write` */
  token: string
  /** The name of the emoji to be aliased. Colons (`:myemoji:`) around the value are not required, although they may be included. */
  name: string
  /** The alias of the emoji. */
  alias_for: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminEmojiAddAliasResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminEmojiListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminEmojiRemoveRequest = {
  /** Authentication token. Requires scope: `admin.teams:write` */
  token: string
  /** The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included. */
  name: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminEmojiRemoveResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminEmojiRenameRequest = {
  /** Authentication token. Requires scope: `admin.teams:write` */
  token: string
  /** The name of the emoji to be renamed. Colons (`:myemoji:`) around the value are not required, although they may be included. */
  name: string
  /** The new name of the emoji. */
  new_name: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminEmojiRenameResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminInviteRequestsApproveRequest = {
  /** ID for the workspace where the invite request was made. */
  team_id?: string
  /** ID of the request to invite. */
  invite_request_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminInviteRequestsApproveResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminInviteRequestsApprovedListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminInviteRequestsDeniedListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminInviteRequestsDenyRequest = {
  /** ID for the workspace where the invite request was made. */
  team_id?: string
  /** ID of the request to invite. */
  invite_request_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminInviteRequestsDenyResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminInviteRequestsListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsAdminsListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminTeamsCreateRequest = {
  /** Team domain (for example, slacksoftballteam). */
  team_domain: string
  /** Team name (for example, Slack Softball Team). */
  team_name: string
  /** Description for the team. */
  team_description?: string
  /** Who can join the team. A team's discoverability can be `open`, `closed`, `invite_only`, or `unlisted`. */
  team_discoverability?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsCreateResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsOwnersListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsSettingsInfoResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminTeamsSettingsSetDefaultChannelsRequest = {
  /** Authentication token. Requires scope: `admin.teams:write` */
  token: string
  /** ID for the workspace to set the default channel for. */
  team_id: string
  /** An array of channel IDs. */
  channel_ids: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsSettingsSetDefaultChannelsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminTeamsSettingsSetDescriptionRequest = {
  /** ID for the workspace to set the description for. */
  team_id: string
  /** The new description for the workspace. */
  description: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsSettingsSetDescriptionResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminTeamsSettingsSetDiscoverabilityRequest = {
  /** The ID of the workspace to set discoverability on. */
  team_id: string
  /** This workspace's discovery setting. It must be set to one of `open`, `invite_only`, `closed`, or `unlisted`. */
  discoverability: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsSettingsSetDiscoverabilityResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminTeamsSettingsSetIconRequest = {
  /** Authentication token. Requires scope: `admin.teams:write` */
  token: string
  /** Image URL for the icon */
  image_url: string
  /** ID for the workspace to set the icon for. */
  team_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsSettingsSetIconResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminTeamsSettingsSetNameRequest = {
  /** ID for the workspace to set the name for. */
  team_id: string
  /** The new name of the workspace. */
  name: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminTeamsSettingsSetNameResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsergroupsAddChannelsRequest = {
  /** ID of the IDP group to add default channels for. */
  usergroup_id: string
  /** The workspace to add default channels in. */
  team_id?: string
  /** Comma separated string of channel IDs. */
  channel_ids: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsergroupsAddChannelsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsergroupsAddTeamsRequest = {
  /** An encoded usergroup (IDP Group) ID. */
  usergroup_id: string
  /** A comma separated list of encoded team (workspace) IDs. Each workspace *MUST* belong to the organization associated with the token. */
  team_ids: string
  /** When `true`, this method automatically creates new workspace accounts for the IDP group members. */
  auto_provision?: boolean
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsergroupsAddTeamsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsergroupsListChannelsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsergroupsRemoveChannelsRequest = {
  /** ID of the IDP Group */
  usergroup_id: string
  /** Comma-separated string of channel IDs */
  channel_ids: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsergroupsRemoveChannelsResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersAssignRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** The ID of the user to add to the workspace. */
  user_id: string
  /** True if user should be added to the workspace as a guest. */
  is_restricted?: boolean
  /** True if user should be added to the workspace as a single-channel guest. */
  is_ultra_restricted?: boolean
  /** Comma separated values of channel IDs to add user in the new workspace. */
  channel_ids?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersAssignResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersInviteRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** The email address of the person to invite. */
  email: string
  /** A comma-separated list of `channel_id`s for this user to join. At least one channel is required. */
  channel_ids: string
  /** An optional message to send to the user in the invite email. */
  custom_message?: string
  /** Full name of the user. */
  real_name?: string
  /** Allow this invite to be resent in the future if a user has not signed up yet. (default: false) */
  resend?: boolean
  /** Is this user a multi-channel guest user? (default: false) */
  is_restricted?: boolean
  /** Is this user a single channel guest user? (default: false) */
  is_ultra_restricted?: boolean
  /** Timestamp when guest account should be disabled. Only include this timestamp if you are inviting a guest user and you want their account to expire on a certain date. */
  guest_expiration_ts?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersInviteResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersRemoveRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** The ID of the user to remove. */
  user_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersRemoveResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersSessionInvalidateRequest = {
  /** ID of the team that the session belongs to */
  team_id: string
  session_id: number
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersSessionInvalidateResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersSessionResetRequest = {
  /** The ID of the user to wipe sessions for */
  user_id: string
  /** Only expire mobile sessions (default: false) */
  mobile_only?: boolean
  /** Only expire web sessions (default: false) */
  web_only?: boolean
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersSessionResetResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersSetAdminRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** The ID of the user to designate as an admin. */
  user_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersSetAdminResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersSetExpirationRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** The ID of the user to set an expiration for. */
  user_id: string
  /** Timestamp when guest account should be disabled. */
  expiration_ts: number
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersSetExpirationResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersSetOwnerRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** Id of the user to promote to owner. */
  user_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersSetOwnerResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type AdminUsersSetRegularRequest = {
  /** The ID (`T1234`) of the workspace. */
  team_id: string
  /** The ID of the user to designate as a regular user. */
  user_id: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AdminUsersSetRegularResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** Schema for successful response api.test method */
export type ApiTestResponse = {
  ok: DefsOkTrue
} & { [key: string]: Record<string, unknown> }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AppsEventAuthorizationsListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** Schema for successful response from apps.permissions.info method */
export type AppsPermissionsInfoResponse = {
  info: {
    app_home: {
      resources?: ObjsResources
      scopes?: ObjsScopes
    }
    channel: {
      resources?: ObjsResources
      scopes?: ObjsScopes
    }
    group: {
      resources?: ObjsResources
      scopes?: ObjsScopes
    }
    im: {
      resources?: ObjsResources
      scopes?: ObjsScopes
    }
    mpim: {
      resources?: ObjsResources
      scopes?: ObjsScopes
    }
    team: {
      resources: ObjsResources
      scopes: ObjsScopes
    }
  }
  ok: DefsOkTrue
}

/** Schema for successful response from apps.permissions.request method */
export type AppsPermissionsRequestResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response apps.permissions.resources.list method */
export type AppsPermissionsResourcesListResponse = {
  ok: DefsOkTrue
  resources: Array<{
    id?: string
    type?: string
  }>
  response_metadata?: {
    next_cursor: string
  }
} & { [key: string]: unknown }

/** Schema for successful response api.permissions.scopes.list method */
export type AppsPermissionsScopesListResponse = {
  ok: DefsOkTrue
  scopes: {
    app_home?: ObjsScopes
    channel?: ObjsScopes
    group?: ObjsScopes
    im?: ObjsScopes
    mpim?: ObjsScopes
    team?: ObjsScopes
    user?: ObjsScopes
  } & { [key: string]: unknown }
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AppsPermissionsUsersListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type AppsPermissionsUsersRequestResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** Schema for successful response from apps.uninstall method */
export type AppsUninstallResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from auth.revoke method */
export type AuthRevokeResponse = {
  ok: DefsOkTrue
  revoked: boolean
}

/** Schema for successful response auth.test method */
export type AuthTestResponse = {
  bot_id?: DefsBotId
  is_enterprise_install?: boolean
  ok: DefsOkTrue
  team: string
  team_id: DefsTeam
  url: string
  user: string
  user_id: DefsUserId
}

/** Schema for successful response from bots.info method */
export type BotsInfoResponse = {
  bot: {
    app_id: DefsAppId
    deleted: boolean
    icons: {
      image_36: string
      image_48: string
      image_72: string
    }
    id: DefsBotId
    name: string
    updated: number
    user_id?: DefsUserId
  }
  ok: DefsOkTrue
}

export type CallsAddRequest = {
  /** An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service. */
  external_unique_id: string
  /** An optional, human-readable ID supplied by the 3rd-party Call provider. If supplied, this ID will be displayed in the Call object. */
  external_display_id?: string
  /** The URL required for a client to join the Call. */
  join_url: string
  /** When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL. */
  desktop_app_join_url?: string
  /** Call start time in UTC UNIX timestamp format */
  date_start?: number
  /** The name of the Call. */
  title?: string
  /** The valid Slack user ID of the user who created this Call. When this method is called with a user token, the `created_by` field is optional and defaults to the authed user of the token. Otherwise, the field is required. */
  created_by?: string
  /** The list of users to register as participants in the Call. [Read more on how to specify users here](/apis/calls#users). */
  users?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type CallsAddResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type CallsEndRequest = {
  /** `id` returned when registering the call using the [`calls.add`](/methods/calls.add) method. */
  id: string
  /** Call duration in seconds */
  duration?: number
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type CallsEndResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type CallsInfoResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type CallsParticipantsAddRequest = {
  /** `id` returned by the [`calls.add`](/methods/calls.add) method. */
  id: string
  /** The list of users to add as participants in the Call. [Read more on how to specify users here](/apis/calls#users). */
  users: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type CallsParticipantsAddResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type CallsParticipantsRemoveRequest = {
  /** `id` returned by the [`calls.add`](/methods/calls.add) method. */
  id: string
  /** The list of users to remove as participants in the Call. [Read more on how to specify users here](/apis/calls#users). */
  users: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type CallsParticipantsRemoveResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type CallsUpdateRequest = {
  /** `id` returned by the [`calls.add`](/methods/calls.add) method. */
  id: string
  /** The name of the Call. */
  title?: string
  /** The URL required for a client to join the Call. */
  join_url?: string
  /** When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL. */
  desktop_app_join_url?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type CallsUpdateResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type ChatDeleteRequest = {
  /** Timestamp of the message to be deleted. */
  ts?: number
  /** Channel containing the message to be deleted. */
  channel?: string
  /** Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope. */
  as_user?: boolean
}

/** Schema for successful response of chat.delete method */
export type ChatDeleteResponse = {
  channel: DefsChannel
  ok: DefsOkTrue
  ts: DefsTs
}

export type ChatDeleteScheduledMessageRequest = {
  /** Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope. */
  as_user?: boolean
  /** The channel the scheduled_message is posting to */
  channel: string
  /** `scheduled_message_id` returned from call to chat.scheduleMessage */
  scheduled_message_id: string
}

/** Schema for successful response from chat.deleteScheduledMessage method */
export type ChatDeleteScheduledMessageResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response chat.getPermalink */
export type ChatGetPermalinkResponse = {
  channel: DefsChannel
  ok: DefsOkTrue
  permalink: string
}

export type ChatMeMessageRequest = {
  /** Channel to send message to. Can be a public channel, private group or IM channel. Can be an encoded ID, or a name. */
  channel?: string
  /** Text of the message to send. */
  text?: string
}

/** Schema for successful response from chat.meMessage method */
export type ChatMeMessageResponse = {
  channel?: DefsChannel
  ok: DefsOkTrue
  ts?: DefsTs
}

export type ChatPostEphemeralRequest = {
  /** Pass true to post the message as the authed user. Defaults to true if the chat:write:bot scope is not included. Otherwise, defaults to false. */
  as_user?: boolean
  /** A JSON-based array of structured attachments, presented as a URL-encoded string. */
  attachments?: string
  /** A JSON-based array of structured blocks, presented as a URL-encoded string. */
  blocks?: string
  /** Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. */
  channel: string
  /** Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See [authorship](#authorship) below. */
  icon_emoji?: string
  /** URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
  icon_url?: string
  /** Find and link channel names and usernames. */
  link_names?: boolean
  /** Change how messages are treated. Defaults to `none`. See [below](#formatting). */
  parse?: string
  /** How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail. */
  text?: string
  /** Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts` value; use its parent's value instead. Ephemeral messages in threads are only shown if there is already an active thread. */
  thread_ts?: string
  /** `id` of the user who will receive the ephemeral message. The user should be in the channel specified by the `channel` argument. */
  user: string
  /** Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
  username?: string
}

/** Schema for successful response from chat.postEphemeral method */
export type ChatPostEphemeralResponse = {
  message_ts: DefsTs
  ok: DefsOkTrue
}

export type ChatPostMessageRequest = {
  /** Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See [authorship](#authorship) below. */
  as_user?: string
  /** A JSON-based array of structured attachments, presented as a URL-encoded string. */
  attachments?: string
  /** A JSON-based array of structured blocks, presented as a URL-encoded string. */
  blocks?: string
  /** Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. See [below](#channels) for more details. */
  channel: string
  /** Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See [authorship](#authorship) below. */
  icon_emoji?: string
  /** URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
  icon_url?: string
  /** Find and link channel names and usernames. */
  link_names?: boolean
  /** Disable Slack markup parsing by setting to `false`. Enabled by default. */
  mrkdwn?: boolean
  /** Change how messages are treated. Defaults to `none`. See [below](#formatting). */
  parse?: string
  /** Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`. */
  reply_broadcast?: boolean
  /** How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail. */
  text?: string
  /** Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead. */
  thread_ts?: string
  /** Pass true to enable unfurling of primarily text-based content. */
  unfurl_links?: boolean
  /** Pass false to disable unfurling of media content. */
  unfurl_media?: boolean
  /** Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
  username?: string
}

/** Schema for successful response of chat.postMessage method */
export type ChatPostMessageResponse = {
  channel: DefsChannel
  message: ObjsMessage
  ok: DefsOkTrue
  ts: DefsTs
}

export type ChatScheduleMessageRequest = {
  /** Channel, private group, or DM channel to send message to. Can be an encoded ID, or a name. See [below](#channels) for more details. */
  channel?: string
  /** How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail. */
  text?: string
  /** Unix EPOCH timestamp of time in future to send the message. */
  post_at?: string
  /** Change how messages are treated. Defaults to `none`. See [chat.postMessage](chat.postMessage#formatting). */
  parse?: string
  /** Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See [chat.postMessage](chat.postMessage#authorship). */
  as_user?: boolean
  /** Find and link channel names and usernames. */
  link_names?: boolean
  /** A JSON-based array of structured attachments, presented as a URL-encoded string. */
  attachments?: string
  /** A JSON-based array of structured blocks, presented as a URL-encoded string. */
  blocks?: string
  /** Pass true to enable unfurling of primarily text-based content. */
  unfurl_links?: boolean
  /** Pass false to disable unfurling of media content. */
  unfurl_media?: boolean
  /** Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead. */
  thread_ts?: number
  /** Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`. */
  reply_broadcast?: boolean
}

/** Schema for successful response of chat.scheduleMessage method */
export type ChatScheduleMessageResponse = {
  channel: DefsChannel
  message: {
    bot_id: DefsBotId
    bot_profile?: ObjsBotProfile
    team: DefsTeam
    text: string
    type: string
    user: DefsUserId
    username?: string
  }
  ok: DefsOkTrue
  post_at: number
  scheduled_message_id: string
}

/** Schema for successful response from chat.scheduledMessages.list method */
export type ChatScheduledMessagesListResponse = {
  ok: DefsOkTrue
  response_metadata: {
    next_cursor: string
  }
  scheduled_messages: Array<{
    channel_id: DefsChannelId
    date_created: number
    id: string
    post_at: number
    text?: string
  }>
}

export type ChatUnfurlRequest = {
  /** Channel ID of the message */
  channel: string
  /** Timestamp of the message to add unfurl behavior to. */
  ts: string
  /** URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl blocks or message attachments. */
  unfurls?: string
  /** Provide a simply-formatted string to send as an ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior */
  user_auth_message?: string
  /** Set to `true` or `1` to indicate the user must install your Slack app to trigger unfurls for this domain */
  user_auth_required?: boolean
  /** Send users to this custom URL where they will complete authentication in your app to fully trigger unfurling. Value should be properly URL-encoded. */
  user_auth_url?: string
}

/** Schema for successful response from chat.unfurl method */
export type ChatUnfurlResponse = {
  ok: DefsOkTrue
}

export type ChatUpdateRequest = {
  /** Pass true to update the message as the authed user. [Bot users](/bot-users) in this context are considered authed users. */
  as_user?: string
  /** A JSON-based array of structured attachments, presented as a URL-encoded string. This field is required when not presenting `text`. If you don't include this field, the message's previous `attachments` will be retained. To remove previous `attachments`, include an empty array for this field. */
  attachments?: string
  /** A JSON-based array of [structured blocks](/block-kit/building), presented as a URL-encoded string. If you don't include this field, the message's previous `blocks` will be retained. To remove previous `blocks`, include an empty array for this field. */
  blocks?: string
  /** Channel containing the message to be updated. */
  channel: string
  /** Find and link channel names and usernames. Defaults to `none`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `none`. */
  link_names?: string
  /** Change how messages are treated. Defaults to `client`, unlike `chat.postMessage`. Accepts either `none` or `full`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `client`. */
  parse?: string
  /** New text for the message, using the [default formatting rules](/reference/surfaces/formatting). It's not required when presenting `blocks` or `attachments`. */
  text?: string
  /** Timestamp of the message to be updated. */
  ts: string
}

/** Schema for successful response of chat.update method */
export type ChatUpdateResponse = {
  channel: string
  message: {
    attachments?: Array<Record<string, unknown>>
    blocks?: Record<string, unknown>
    text: string
  }
  ok: DefsOkTrue
  text: string
  ts: string
}

export type ConversationsArchiveRequest = {
  /** ID of conversation to archive */
  channel?: string
}

/** Schema for successful response conversations.archive method */
export type ConversationsArchiveResponse = {
  ok: DefsOkTrue
}

export type ConversationsCloseRequest = {
  /** Conversation to close. */
  channel?: string
}

/** Schema for successful response conversations.close method */
export type ConversationsCloseResponse = {
  already_closed?: boolean
  no_op?: boolean
  ok: DefsOkTrue
}

export type ConversationsCreateRequest = {
  /** Name of the public or private channel to create */
  name?: string
  /** Create a private channel instead of a public one */
  is_private?: boolean
}

/** Schema for successful response conversations.create method */
export type ConversationsCreateResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
}

/** Schema for successful response from conversations.history method */
export type ConversationsHistoryResponse = {
  channel_actions_count: number
  channel_actions_ts: Array<number | null>
  has_more: boolean
  messages: Array<ObjsMessage>
  ok: DefsOkTrue
  pin_count: number
}

/** Schema for successful response conversations.info */
export type ConversationsInfoResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
}

export type ConversationsInviteRequest = {
  /** The ID of the public or private channel to invite user(s) to. */
  channel?: string
  /** A comma separated list of user IDs. Up to 1000 users may be listed. */
  users?: string
}

/** Schema for successful response from conversations.invite method */
export type ConversationsInviteResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
}

export type ConversationsJoinRequest = {
  /** ID of conversation to join */
  channel?: string
}

/** Schema for successful response from conversations.join method */
export type ConversationsJoinResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
  response_metadata?: {
    warnings?: Array<string>
  }
  warning?: string
}

export type ConversationsKickRequest = {
  /** ID of conversation to remove user from. */
  channel?: string
  /** User ID to be removed. */
  user?: string
}

/** Schema for successful response conversations.kick method */
export type ConversationsKickResponse = {
  ok: DefsOkTrue
}

export type ConversationsLeaveRequest = {
  /** Conversation to leave */
  channel?: string
}

/** Schema for successful response from conversations.leave method */
export type ConversationsLeaveResponse = {
  not_in_channel?: true
  ok: DefsOkTrue
}

/** Schema for successful response from conversations.list method */
export type ConversationsListResponse = {
  channels: Array<ObjsConversation>
  ok: DefsOkTrue
  response_metadata?: {
    next_cursor: string
  }
}

export type ConversationsMarkRequest = {
  /** Channel or conversation to set the read cursor for. */
  channel?: string
  /** Unique identifier of message you want marked as most recently seen in this conversation. */
  ts?: number
}

/** Schema for successful response conversations.mark method */
export type ConversationsMarkResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response conversations.members method */
export type ConversationsMembersResponse = {
  members: Array<DefsUserId>
  ok: DefsOkTrue
  response_metadata: {
    next_cursor: string
  }
}

export type ConversationsOpenRequest = {
  /** Resume a conversation by supplying an `im` or `mpim`'s ID. Or provide the `users` field instead. */
  channel?: string
  /** Comma separated lists of users. If only one user is included, this creates a 1:1 DM. The ordering of the users is preserved whenever a multi-person direct message is returned. Supply a `channel` when not supplying `users`. */
  users?: string
  /** Boolean, indicates you want the full IM channel definition in the response. */
  return_im?: boolean
}

/** Schema for successful response from conversations.open method when opening channels, ims, mpims */
export type ConversationsOpenResponse = {
  already_open?: boolean
  channel: Array<
    | ObjsConversation
    | {
        created?: string
        id: DefsDmId
        is_im?: boolean
        is_open?: boolean
        last_read?: DefsTs
        latest?: ObjsMessage
        unread_count?: number
        unread_count_display?: number
        user?: DefsUserId
      }
  >
  no_op?: boolean
  ok: DefsOkTrue
}

export type ConversationsRenameRequest = {
  /** ID of conversation to rename */
  channel?: string
  /** New name for conversation. */
  name?: string
}

/** Schema for successful response from conversations.rename method */
export type ConversationsRenameResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
}

/** Schema for successful response from conversations.replies method */
export type ConversationsRepliesResponse = {
  has_more?: boolean
  messages: Array<
    Array<
      | {
          last_read?: DefsTs
          latest_reply?: DefsTs
          reply_count: number
          reply_users?: Array<DefsUserId>
          reply_users_count?: number
          source_team?: DefsTeam
          subscribed: boolean
          team?: DefsTeam
          text: string
          thread_ts: DefsTs
          ts: DefsTs
          type: string
          unread_count?: number
          user: DefsUserId
          user_profile?: ObjsUserProfileShort
          user_team?: DefsTeam
        }
      | {
          is_starred?: boolean
          parent_user_id: DefsUserId
          source_team?: DefsTeam
          team?: DefsTeam
          text: string
          thread_ts: DefsTs
          ts: DefsTs
          type: string
          user: DefsUserId
          user_profile?: ObjsUserProfileShort
          user_team?: DefsTeam
        }
    >
  >
  ok: DefsOkTrue
}

export type ConversationsSetPurposeRequest = {
  /** Conversation to set the purpose of */
  channel?: string
  /** A new, specialer purpose */
  purpose?: string
}

/** Schema for successful response from conversations.setPurpose method */
export type ConversationsSetPurposeResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
}

export type ConversationsSetTopicRequest = {
  /** Conversation to set the topic of */
  channel?: string
  /** The new topic string. Does not support formatting or linkification. */
  topic?: string
}

/** Schema for successful response from conversations.setTopic method */
export type ConversationsSetTopicResponse = {
  channel: ObjsConversation
  ok: DefsOkTrue
}

export type ConversationsUnarchiveRequest = {
  /** ID of conversation to unarchive */
  channel?: string
}

/** Schema for successful response from conversations.unarchive method */
export type ConversationsUnarchiveResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from dialog.open method */
export type DialogOpenResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from dnd.endDnd method */
export type DndEndDndResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from dnd.endSnooze method */
export type DndEndSnoozeResponse = {
  dnd_enabled: boolean
  next_dnd_end_ts: number
  next_dnd_start_ts: number
  ok: DefsOkTrue
  snooze_enabled: boolean
}

/** Schema for successful response from dnd.info method */
export type DndInfoResponse = {
  dnd_enabled: boolean
  next_dnd_end_ts: number
  next_dnd_start_ts: number
  ok: DefsOkTrue
  snooze_enabled?: boolean
  snooze_endtime?: number
  snooze_remaining?: number
}

export type DndSetSnoozeRequest = {
  /** Authentication token. Requires scope: `dnd:write` */
  token: string
  /** Number of minutes, from now, to snooze until. */
  num_minutes: string
}

/** Schema for successful response from dnd.setSnooze method */
export type DndSetSnoozeResponse = {
  ok: DefsOkTrue
  snooze_enabled: boolean
  snooze_endtime: number
  snooze_remaining: number
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type DndTeamInfoResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type EmojiListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type FilesCommentsDeleteRequest = {
  /** File to delete a comment from. */
  file?: string
  /** The comment to delete. */
  id?: string
}

/** Schema for successful response files.comments.delete method */
export type FilesCommentsDeleteResponse = {
  ok: DefsOkTrue
}

export type FilesDeleteRequest = {
  /** ID of file to delete. */
  file?: string
}

/** Schema for successful response files.delete method */
export type FilesDeleteResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from files.info method */
export type FilesInfoResponse = {
  comments: ObjsComments
  content_html?: unknown
  editor?: DefsUserId
  file: ObjsFile
  ok: DefsOkTrue
  paging?: ObjsPaging
  response_metadata?: ObjsResponseMetadata
}

/** Schema for successful response from files.list method */
export type FilesListResponse = {
  files: Array<ObjsFile>
  ok: DefsOkTrue
  paging: ObjsPaging
}

export type FilesRemoteAddRequest = {
  /** Authentication token. Requires scope: `remote_files:write` */
  token?: string
  /** Creator defined GUID for the file. */
  external_id?: string
  /** Title of the file being shared. */
  title?: string
  /** type of file */
  filetype?: string
  /** URL of the remote file. */
  external_url?: string
  /** Preview of the document via `multipart/form-data`. */
  preview_image?: string
  /** A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery of the remote file. */
  indexable_file_contents?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type FilesRemoteAddResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type FilesRemoteInfoResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type FilesRemoteListResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type FilesRemoteRemoveRequest = {
  /** Authentication token. Requires scope: `remote_files:write` */
  token?: string
  /** Specify a file by providing its ID. */
  file?: string
  /** Creator defined GUID for the file. */
  external_id?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type FilesRemoteRemoveResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type FilesRemoteShareResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type FilesRemoteUpdateRequest = {
  /** Authentication token. Requires scope: `remote_files:write` */
  token?: string
  /** Specify a file by providing its ID. */
  file?: string
  /** Creator defined GUID for the file. */
  external_id?: string
  /** Title of the file being shared. */
  title?: string
  /** type of file */
  filetype?: string
  /** URL of the remote file. */
  external_url?: string
  /** Preview of the document via `multipart/form-data`. */
  preview_image?: string
  /** File containing contents that can be used to improve searchability for the remote file. */
  indexable_file_contents?: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type FilesRemoteUpdateResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type FilesRevokePublicURLRequest = {
  /** File to revoke */
  file?: string
}

/** Schema for successful response from files.revokePublicURL method */
export type FilesRevokePublicURLResponse = {
  file: ObjsFile
  ok: DefsOkTrue
}

export type FilesSharedPublicURLRequest = {
  /** File to share */
  file?: string
}

/** Schema for successful response from files.sharedPublicURL method */
export type FilesSharedPublicURLResponse = {
  file: ObjsFile
  ok: DefsOkTrue
}

export type FilesUploadRequest = {
  /** Authentication token. Requires scope: `files:write:user` */
  token?: string
  /** File contents via `multipart/form-data`. If omitting this parameter, you must submit `content`. */
  file?: string
  /** File contents via a POST variable. If omitting this parameter, you must provide a `file`. */
  content?: string
  /** A [file type](/types/file#file_types) identifier. */
  filetype?: string
  /** Filename of file. */
  filename?: string
  /** Title of file. */
  title?: string
  /** The message text introducing the file in specified `channels`. */
  initial_comment?: string
  /** Comma-separated list of channel names or IDs where the file will be shared. */
  channels?: string
  /** Provide another message's `ts` value to upload this file as a reply. Never use a reply's `ts` value; use its parent instead. */
  thread_ts?: number
}

/** Schema for successful response files.upload method */
export type FilesUploadResponse = {
  file: ObjsFile
  ok: DefsOkTrue
}

/** Schema for successful response from migration.exchange method */
export type MigrationExchangeResponse = {
  enterprise_id: string
  invalid_user_ids?: Array<string>
  ok: DefsOkTrue
  team_id: DefsTeam
  user_id_map?: { [key: string]: unknown }
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type OauthAccessResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type OauthTokenResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type OauthV2AccessResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type PinsAddRequest = {
  /** Channel to pin the item in. */
  channel: string
  /** Timestamp of the message to pin. */
  timestamp?: string
}

/** Schema for successful response from pins.add method */
export type PinsAddResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from pins.list method */
export type PinsListResponse = Array<
  | {
      items: Array<
        | {
            created?: number
            created_by?: DefsUserId
            file?: ObjsFile
            type?: "file"
          }
        | {
            channel?: DefsChannel
            created?: number
            created_by?: DefsUserId
            message?: ObjsMessage
            type?: "message"
          }
      >
      ok: DefsOkTrue
    }
  | {
      count: number
      ok: DefsOkTrue
    }
>

export type PinsRemoveRequest = {
  /** Channel where the item is pinned to. */
  channel: string
  /** Timestamp of the message to un-pin. */
  timestamp?: string
}

/** Schema for successful response from pins.remove method */
export type PinsRemoveResponse = {
  ok: DefsOkTrue
}

export type ReactionsAddRequest = {
  /** Channel where the message to add reaction to was posted. */
  channel: string
  /** Reaction (emoji) name. */
  name: string
  /** Timestamp of the message to add reaction to. */
  timestamp: string
}

/** Schema for successful response from reactions.add method */
export type ReactionsAddResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from reactions.get method */
export type ReactionsGetResponse = Record<string, unknown>

/** Schema for successful response from reactions.list method */
export type ReactionsListResponse = {
  items: Array<
    Array<
      | {
          channel: DefsChannel
          message: ObjsMessage
          type: "message"
        }
      | {
          file: ObjsFile
          type: "file"
        }
      | {
          comment: ObjsComment
          file: ObjsFile
          type: "file_comment"
        }
    >
  >
  ok: DefsOkTrue
  paging?: ObjsPaging
  response_metadata?: ObjsResponseMetadata
}

export type ReactionsRemoveRequest = {
  /** Reaction (emoji) name. */
  name: string
  /** File to remove reaction from. */
  file?: string
  /** File comment to remove reaction from. */
  file_comment?: string
  /** Channel where the message to remove reaction from was posted. */
  channel?: string
  /** Timestamp of the message to remove reaction from. */
  timestamp?: string
}

/** Schema for successful response from reactions.remove method */
export type ReactionsRemoveResponse = {
  ok: DefsOkTrue
}

export type RemindersAddRequest = {
  /** The content of the reminder */
  text: string
  /** When this reminder should happen: the Unix timestamp (up to five years from now), the number of seconds until the reminder (if within 24 hours), or a natural language description (Ex. "in 15 minutes," or "every Thursday") */
  time: string
  /** The user who will receive the reminder. If no user is specified, the reminder will go to user who created it. */
  user?: string
}

/** Schema for successful response from reminders.add method */
export type RemindersAddResponse = {
  ok: DefsOkTrue
  reminder: ObjsReminder
}

export type RemindersCompleteRequest = {
  /** The ID of the reminder to be marked as complete */
  reminder?: string
}

/** Schema for successful response from reminders.complete method */
export type RemindersCompleteResponse = {
  ok: DefsOkTrue
}

export type RemindersDeleteRequest = {
  /** The ID of the reminder */
  reminder?: string
}

/** Schema for successful response from reminders.delete method */
export type RemindersDeleteResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from reminders.info method */
export type RemindersInfoResponse = {
  ok: DefsOkTrue
  reminder: ObjsReminder
}

/** Schema for successful response from reminders.list method */
export type RemindersListResponse = {
  ok: DefsOkTrue
  reminders: Array<ObjsReminder>
}

/** Schema for successful response from rtm.connect method */
export type RtmConnectResponse = {
  ok: DefsOkTrue
  self: {
    id: DefsUserId
    name: string
  }
  team: {
    domain: string
    id: DefsTeam
    name: string
  }
  url: string
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type SearchMessagesResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

export type StarsAddRequest = {
  /** Channel to add star to, or channel where the message to add star to was posted (used with `timestamp`). */
  channel?: string
  /** File to add star to. */
  file?: string
  /** File comment to add star to. */
  file_comment?: string
  /** Timestamp of the message to add star to. */
  timestamp?: string
}

/** Schema for successful response from stars.add method */
export type StarsAddResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from stars.list method */
export type StarsListResponse = {
  items: Array<
    Array<
      | {
          channel: DefsChannel
          date_create: number
          message: ObjsMessage
          type: "message"
        }
      | {
          date_create: number
          file: ObjsFile
          type: "file"
        }
      | {
          comment: ObjsComment
          date_create: number
          file: ObjsFile
          type: "file_comment"
        }
      | {
          channel: DefsChannel
          date_create: number
          type: "channel"
        }
      | {
          channel: DefsDmId
          date_create: number
          type: "im"
        }
      | {
          channel: DefsGroupId
          date_create: number
          type: "group"
        }
    >
  >
  ok: DefsOkTrue
  paging?: ObjsPaging
}

export type StarsRemoveRequest = {
  /** Channel to remove star from, or channel where the message to remove star from was posted (used with `timestamp`). */
  channel?: string
  /** File to remove star from. */
  file?: string
  /** File comment to remove star from. */
  file_comment?: string
  /** Timestamp of the message to remove star from. */
  timestamp?: string
}

/** Schema for successful response from stars.remove method */
export type StarsRemoveResponse = {
  ok: DefsOkTrue
}

/** Schema for successful response from team.accessLogs method */
export type TeamAccessLogsResponse = {
  logins: Array<{
    count: number
    country: string | null
    date_first: number
    date_last: number
    ip: string | null
    isp: string | null
    region: string | null
    user_agent: string
    user_id: DefsUserId
    username: string
  }>
  ok: DefsOkTrue
  paging: ObjsPaging
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type TeamBillableInfoResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** Schema for successful response from team.info method */
export type TeamInfoResponse = {
  ok: DefsOkTrue
  team: ObjsTeam
}

/** Schema for successful response from team.integrationLogs method */
export type TeamIntegrationLogsResponse = {
  logs: Array<{
    admin_app_id?: DefsAppId
    app_id: DefsAppId
    app_type: string
    change_type: string
    channel?: DefsChannel
    date: string
    scope: string
    service_id?: string
    service_type?: string
    user_id: DefsUserId
    user_name: string
  }>
  ok: DefsOkTrue
  paging: ObjsPaging
}

/** Schema for successful response from team.profile.get method */
export type TeamProfileGetResponse = {
  ok: DefsOkTrue
  profile: {
    fields: Array<ObjsTeamProfileField>
  }
}

export type UsergroupsCreateRequest = {
  /** A comma separated string of encoded channel IDs for which the User Group uses as a default. */
  channels?: string
  /** A short description of the User Group. */
  description?: string
  /** A mention handle. Must be unique among channels, users and User Groups. */
  handle?: string
  /** Include the number of users in each User Group. */
  include_count?: boolean
  /** A name for the User Group. Must be unique among User Groups. */
  name: string
}

/** Schema for successful response from usergroups.create method */
export type UsergroupsCreateResponse = {
  ok: DefsOkTrue
  usergroup: ObjsSubteam
}

export type UsergroupsDisableRequest = {
  /** Include the number of users in the User Group. */
  include_count?: boolean
  /** The encoded ID of the User Group to disable. */
  usergroup: string
}

/** Schema for successful response from usergroups.disable method */
export type UsergroupsDisableResponse = {
  ok: DefsOkTrue
  usergroup: ObjsSubteam
}

export type UsergroupsEnableRequest = {
  /** Include the number of users in the User Group. */
  include_count?: boolean
  /** The encoded ID of the User Group to enable. */
  usergroup: string
}

/** Schema for successful response from usergroups.enable method */
export type UsergroupsEnableResponse = {
  ok: DefsOkTrue
  usergroup: ObjsSubteam
}

/** Schema for successful response from usergroups.list method */
export type UsergroupsListResponse = {
  ok: DefsOkTrue
  usergroups: Array<ObjsSubteam>
}

export type UsergroupsUpdateRequest = {
  /** A mention handle. Must be unique among channels, users and User Groups. */
  handle?: string
  /** A short description of the User Group. */
  description?: string
  /** A comma separated string of encoded channel IDs for which the User Group uses as a default. */
  channels?: string
  /** Include the number of users in the User Group. */
  include_count?: boolean
  /** The encoded ID of the User Group to update. */
  usergroup: string
  /** A name for the User Group. Must be unique among User Groups. */
  name?: string
}

/** Schema for successful response from usergroups.update method */
export type UsergroupsUpdateResponse = {
  ok: DefsOkTrue
  usergroup: ObjsSubteam
}

/** Schema for successful response from usergroups.users.list method */
export type UsergroupsUsersListResponse = {
  ok: DefsOkTrue
  users: Array<DefsUserId>
}

export type UsergroupsUsersUpdateRequest = {
  /** Include the number of users in the User Group. */
  include_count?: boolean
  /** The encoded ID of the User Group to update. */
  usergroup: string
  /** A comma separated string of encoded user IDs that represent the entire list of users for the User Group. */
  users: string
}

/** Schema for successful response from usergroups.users.update method */
export type UsergroupsUsersUpdateResponse = {
  ok: DefsOkTrue
  usergroup: ObjsSubteam
}

/** Schema for successful response from users.conversations method. Returned conversation objects do not include `num_members` or `is_member` */
export type UsersConversationsResponse = {
  channels: Array<ObjsConversation>
  ok: DefsOkTrue
  response_metadata?: {
    next_cursor: string
  }
} & { [key: string]: unknown }

export type UsersDeletePhotoRequest = {
  /** Authentication token. Requires scope: `users.profile:write` */
  token: string
}

/** Schema for successful response from users.deletePhoto method */
export type UsersDeletePhotoResponse = {
  ok: DefsOkTrue
}

/** Generated from users.getPresence with shasum e7251aec575d8863f9e0eb38663ae9dc26655f65 */
export type UsersGetPresenceResponse = {
  auto_away?: boolean
  connection_count?: number
  last_activity?: number
  manual_away?: boolean
  ok: DefsOkTrue
  online?: boolean
  presence: string
} & { [key: string]: unknown }

/** Schema for successful response from users.identity method */
export type UsersIdentityResponse = Array<
  | {
      ok: DefsOkTrue
      team: {
        id: DefsTeam
      }
      user: {
        id: DefsUserId
        name: string
      }
    }
  | {
      ok: DefsOkTrue
      team: {
        id: DefsTeam
      }
      user: {
        email: string
        id: DefsUserId
        name: string
      }
    }
  | {
      ok: DefsOkTrue
      team: {
        id: DefsTeam
      }
      user: {
        id: DefsUserId
        image_192: string
        image_24: string
        image_32: string
        image_48: string
        image_512: string
        image_72: string
        name: string
      }
    }
  | {
      ok: DefsOkTrue
      team: {
        domain: string
        id: DefsTeam
        image_102: string
        image_132: string
        image_230: string
        image_34: string
        image_44: string
        image_68: string
        image_88: string
        image_default: boolean
        name: string
      }
      user: {
        id: DefsUserId
        name: string
      }
    }
>

/** Schema for successful response from users.info method */
export type UsersInfoResponse = {
  ok: DefsOkTrue
  user: ObjsUser
} & { [key: string]: unknown }

/** Schema for successful response from users.list method */
export type UsersListResponse = {
  cache_ts: number
  members: Array<ObjsUser>
  ok: DefsOkTrue
  response_metadata?: ObjsResponseMetadata
}

/** Schema for successful response from users.lookupByEmail method */
export type UsersLookupByEmailResponse = {
  ok: DefsOkTrue
  user: ObjsUser
} & { [key: string]: unknown }

/** Schema for successful response from users.profile.get method */
export type UsersProfileGetResponse = {
  ok: DefsOkTrue
  profile: ObjsUserProfile
}

export type UsersProfileSetRequest = {
  /** Name of a single key to set. Usable only if `profile` is not passed. */
  name?: string
  /** Collection of key:value pairs presented as a URL-encoded JSON hash. At most 50 fields may be set. Each field name is limited to 255 characters. */
  profile?: string
  /** ID of user to change. This argument may only be specified by team admins on paid teams. */
  user?: string
  /** Value to set a single key to. Usable only if `profile` is not passed. */
  value?: string
}

/** Schema for successful response from users.profile.set method */
export type UsersProfileSetResponse = {
  email_pending?: string
  ok: DefsOkTrue
  profile: ObjsUserProfile
  username: string
}

/** Schema for successful response from users.setActive method */
export type UsersSetActiveResponse = {
  ok: DefsOkTrue
}

export type UsersSetPhotoRequest = {
  /** Authentication token. Requires scope: `users.profile:write` */
  token: string
  /** Width/height of crop box (always square) */
  crop_w?: string
  /** X coordinate of top-left corner of crop box */
  crop_x?: string
  /** Y coordinate of top-left corner of crop box */
  crop_y?: string
  /** File contents via `multipart/form-data`. */
  image?: string
}

/** Schema for successful response from users.setPhoto method */
export type UsersSetPhotoResponse = {
  ok: DefsOkTrue
  profile: {
    avatar_hash: string
    image_1024: string
    image_192: string
    image_24: string
    image_32: string
    image_48: string
    image_512: string
    image_72: string
    image_original: string
  }
}

export type UsersSetPresenceRequest = {
  /** Either `auto` or `away` */
  presence: string
}

/** Schema for successful response from users.setPresence method */
export type UsersSetPresenceResponse = {
  ok: DefsOkTrue
}

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type ViewsOpenResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type ViewsPublishResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type ViewsPushResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type ViewsUpdateResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type WorkflowsStepCompletedResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type WorkflowsStepFailedResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** This method either only returns a brief _OK_ response or a verbose schema is not available for this method. */
export type WorkflowsUpdateStepResponse = {
  ok: DefsOkTrue
} & { [key: string]: unknown }

/** What each operation answers, by its id. */
export interface Responses {
  admin_apps_approve: AdminAppsApproveResponse
  admin_apps_approved_list: AdminAppsApprovedListResponse
  admin_apps_requests_list: AdminAppsRequestsListResponse
  admin_apps_restrict: AdminAppsRestrictResponse
  admin_apps_restricted_list: AdminAppsRestrictedListResponse
  admin_conversations_archive: AdminConversationsArchiveResponse
  admin_conversations_convertToPrivate: AdminConversationsConvertToPrivateResponse
  admin_conversations_create: AdminConversationsCreateResponse
  admin_conversations_delete: AdminConversationsDeleteResponse
  admin_conversations_disconnectShared: AdminConversationsDisconnectSharedResponse
  admin_conversations_ekm_listOriginalConnectedChannelInfo: AdminConversationsEkmListOriginalConnectedChannelInfoResponse
  admin_conversations_getConversationPrefs: AdminConversationsGetConversationPrefsResponse
  admin_conversations_getTeams: AdminConversationsGetTeamsResponse
  admin_conversations_invite: AdminConversationsInviteResponse
  admin_conversations_rename: AdminConversationsRenameResponse
  admin_conversations_restrictAccess_addGroup: AdminConversationsRestrictAccessAddGroupResponse
  admin_conversations_restrictAccess_listGroups: AdminConversationsRestrictAccessListGroupsResponse
  admin_conversations_restrictAccess_removeGroup: AdminConversationsRestrictAccessRemoveGroupResponse
  admin_conversations_search: AdminConversationsSearchResponse
  admin_conversations_setConversationPrefs: AdminConversationsSetConversationPrefsResponse
  admin_conversations_setTeams: AdminConversationsSetTeamsResponse
  admin_conversations_unarchive: AdminConversationsUnarchiveResponse
  admin_emoji_add: AdminEmojiAddResponse
  admin_emoji_addAlias: AdminEmojiAddAliasResponse
  admin_emoji_list: AdminEmojiListResponse
  admin_emoji_remove: AdminEmojiRemoveResponse
  admin_emoji_rename: AdminEmojiRenameResponse
  admin_inviteRequests_approve: AdminInviteRequestsApproveResponse
  admin_inviteRequests_approved_list: AdminInviteRequestsApprovedListResponse
  admin_inviteRequests_denied_list: AdminInviteRequestsDeniedListResponse
  admin_inviteRequests_deny: AdminInviteRequestsDenyResponse
  admin_inviteRequests_list: AdminInviteRequestsListResponse
  admin_teams_admins_list: AdminTeamsAdminsListResponse
  admin_teams_create: AdminTeamsCreateResponse
  admin_teams_list: AdminTeamsListResponse
  admin_teams_owners_list: AdminTeamsOwnersListResponse
  admin_teams_settings_info: AdminTeamsSettingsInfoResponse
  admin_teams_settings_setDefaultChannels: AdminTeamsSettingsSetDefaultChannelsResponse
  admin_teams_settings_setDescription: AdminTeamsSettingsSetDescriptionResponse
  admin_teams_settings_setDiscoverability: AdminTeamsSettingsSetDiscoverabilityResponse
  admin_teams_settings_setIcon: AdminTeamsSettingsSetIconResponse
  admin_teams_settings_setName: AdminTeamsSettingsSetNameResponse
  admin_usergroups_addChannels: AdminUsergroupsAddChannelsResponse
  admin_usergroups_addTeams: AdminUsergroupsAddTeamsResponse
  admin_usergroups_listChannels: AdminUsergroupsListChannelsResponse
  admin_usergroups_removeChannels: AdminUsergroupsRemoveChannelsResponse
  admin_users_assign: AdminUsersAssignResponse
  admin_users_invite: AdminUsersInviteResponse
  admin_users_list: AdminUsersListResponse
  admin_users_remove: AdminUsersRemoveResponse
  admin_users_session_invalidate: AdminUsersSessionInvalidateResponse
  admin_users_session_reset: AdminUsersSessionResetResponse
  admin_users_setAdmin: AdminUsersSetAdminResponse
  admin_users_setExpiration: AdminUsersSetExpirationResponse
  admin_users_setOwner: AdminUsersSetOwnerResponse
  admin_users_setRegular: AdminUsersSetRegularResponse
  api_test: ApiTestResponse
  apps_event_authorizations_list: AppsEventAuthorizationsListResponse
  apps_permissions_info: AppsPermissionsInfoResponse
  apps_permissions_request: AppsPermissionsRequestResponse
  apps_permissions_resources_list: AppsPermissionsResourcesListResponse
  apps_permissions_scopes_list: AppsPermissionsScopesListResponse
  apps_permissions_users_list: AppsPermissionsUsersListResponse
  apps_permissions_users_request: AppsPermissionsUsersRequestResponse
  apps_uninstall: AppsUninstallResponse
  auth_revoke: AuthRevokeResponse
  auth_test: AuthTestResponse
  bots_info: BotsInfoResponse
  calls_add: CallsAddResponse
  calls_end: CallsEndResponse
  calls_info: CallsInfoResponse
  calls_participants_add: CallsParticipantsAddResponse
  calls_participants_remove: CallsParticipantsRemoveResponse
  calls_update: CallsUpdateResponse
  chat_delete: ChatDeleteResponse
  chat_deleteScheduledMessage: ChatDeleteScheduledMessageResponse
  chat_getPermalink: ChatGetPermalinkResponse
  chat_meMessage: ChatMeMessageResponse
  chat_postEphemeral: ChatPostEphemeralResponse
  chat_postMessage: ChatPostMessageResponse
  chat_scheduleMessage: ChatScheduleMessageResponse
  chat_scheduledMessages_list: ChatScheduledMessagesListResponse
  chat_unfurl: ChatUnfurlResponse
  chat_update: ChatUpdateResponse
  conversations_archive: ConversationsArchiveResponse
  conversations_close: ConversationsCloseResponse
  conversations_create: ConversationsCreateResponse
  conversations_history: ConversationsHistoryResponse
  conversations_info: ConversationsInfoResponse
  conversations_invite: ConversationsInviteResponse
  conversations_join: ConversationsJoinResponse
  conversations_kick: ConversationsKickResponse
  conversations_leave: ConversationsLeaveResponse
  conversations_list: ConversationsListResponse
  conversations_mark: ConversationsMarkResponse
  conversations_members: ConversationsMembersResponse
  conversations_open: ConversationsOpenResponse
  conversations_rename: ConversationsRenameResponse
  conversations_replies: ConversationsRepliesResponse
  conversations_setPurpose: ConversationsSetPurposeResponse
  conversations_setTopic: ConversationsSetTopicResponse
  conversations_unarchive: ConversationsUnarchiveResponse
  dialog_open: DialogOpenResponse
  dnd_endDnd: DndEndDndResponse
  dnd_endSnooze: DndEndSnoozeResponse
  dnd_info: DndInfoResponse
  dnd_setSnooze: DndSetSnoozeResponse
  dnd_teamInfo: DndTeamInfoResponse
  emoji_list: EmojiListResponse
  files_comments_delete: FilesCommentsDeleteResponse
  files_delete: FilesDeleteResponse
  files_info: FilesInfoResponse
  files_list: FilesListResponse
  files_remote_add: FilesRemoteAddResponse
  files_remote_info: FilesRemoteInfoResponse
  files_remote_list: FilesRemoteListResponse
  files_remote_remove: FilesRemoteRemoveResponse
  files_remote_share: FilesRemoteShareResponse
  files_remote_update: FilesRemoteUpdateResponse
  files_revokePublicURL: FilesRevokePublicURLResponse
  files_sharedPublicURL: FilesSharedPublicURLResponse
  files_upload: FilesUploadResponse
  migration_exchange: MigrationExchangeResponse
  oauth_access: OauthAccessResponse
  oauth_token: OauthTokenResponse
  oauth_v2_access: OauthV2AccessResponse
  pins_add: PinsAddResponse
  pins_list: PinsListResponse
  pins_remove: PinsRemoveResponse
  reactions_add: ReactionsAddResponse
  reactions_get: ReactionsGetResponse
  reactions_list: ReactionsListResponse
  reactions_remove: ReactionsRemoveResponse
  reminders_add: RemindersAddResponse
  reminders_complete: RemindersCompleteResponse
  reminders_delete: RemindersDeleteResponse
  reminders_info: RemindersInfoResponse
  reminders_list: RemindersListResponse
  rtm_connect: RtmConnectResponse
  search_messages: SearchMessagesResponse
  stars_add: StarsAddResponse
  stars_list: StarsListResponse
  stars_remove: StarsRemoveResponse
  team_accessLogs: TeamAccessLogsResponse
  team_billableInfo: TeamBillableInfoResponse
  team_info: TeamInfoResponse
  team_integrationLogs: TeamIntegrationLogsResponse
  team_profile_get: TeamProfileGetResponse
  usergroups_create: UsergroupsCreateResponse
  usergroups_disable: UsergroupsDisableResponse
  usergroups_enable: UsergroupsEnableResponse
  usergroups_list: UsergroupsListResponse
  usergroups_update: UsergroupsUpdateResponse
  usergroups_users_list: UsergroupsUsersListResponse
  usergroups_users_update: UsergroupsUsersUpdateResponse
  users_conversations: UsersConversationsResponse
  users_deletePhoto: UsersDeletePhotoResponse
  users_getPresence: UsersGetPresenceResponse
  users_identity: UsersIdentityResponse
  users_info: UsersInfoResponse
  users_list: UsersListResponse
  users_lookupByEmail: UsersLookupByEmailResponse
  users_profile_get: UsersProfileGetResponse
  users_profile_set: UsersProfileSetResponse
  users_setActive: UsersSetActiveResponse
  users_setPhoto: UsersSetPhotoResponse
  users_setPresence: UsersSetPresenceResponse
  views_open: ViewsOpenResponse
  views_publish: ViewsPublishResponse
  views_push: ViewsPushResponse
  views_update: ViewsUpdateResponse
  workflows_stepCompleted: WorkflowsStepCompletedResponse
  workflows_stepFailed: WorkflowsStepFailedResponse
  workflows_updateStep: WorkflowsUpdateStepResponse
}
