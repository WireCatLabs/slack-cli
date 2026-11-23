<!--
GENERATED. DO NOT EDIT.
Source: spec/slack/, checked against provenance.json
Run: pnpm generate
-->

# API coverage

174 operations from openapi 1.7.0.

| Operation | Call | Command | Effect | Request source | Status | Summary |
|---|---|---|---|---|---|---|
| `admin_apps_approve` | `POST /admin.apps.approve` | `slk <profile> api admin apps-approve` | write | contract | generated |  |
| `admin_apps_approved_list` | `GET /admin.apps.approved.list` | `slk <profile> api admin apps-approved-list` | read | — | generated |  |
| `admin_apps_requests_list` | `GET /admin.apps.requests.list` | `slk <profile> api admin apps-requests-list` | read | — | generated |  |
| `admin_apps_restrict` | `POST /admin.apps.restrict` | `slk <profile> api admin apps-restrict` | write | contract | generated |  |
| `admin_apps_restricted_list` | `GET /admin.apps.restricted.list` | `slk <profile> api admin apps-restricted-list` | read | — | generated |  |
| `admin_conversations_archive` | `POST /admin.conversations.archive` | `slk <profile> api admin conversations-archive` | destructive | contract | generated |  |
| `admin_conversations_convertToPrivate` | `POST /admin.conversations.convertToPrivate` | `slk <profile> api admin conversations-convert-to-private` | write | contract | generated |  |
| `admin_conversations_create` | `POST /admin.conversations.create` | `slk <profile> api admin conversations-create` | write | contract | generated |  |
| `admin_conversations_delete` | `POST /admin.conversations.delete` | `slk <profile> api admin conversations-delete` | destructive | contract | generated |  |
| `admin_conversations_disconnectShared` | `POST /admin.conversations.disconnectShared` | `slk <profile> api admin conversations-disconnect-shared` | write | contract | generated |  |
| `admin_conversations_ekm_listOriginalConnectedChannelInfo` | `GET /admin.conversations.ekm.listOriginalConnectedChannelInfo` | `slk <profile> api admin conversations-ekm-list-original-connected-channel-info` | read | — | generated |  |
| `admin_conversations_getConversationPrefs` | `GET /admin.conversations.getConversationPrefs` | `slk <profile> api admin conversations-get-conversation-prefs` | read | — | generated |  |
| `admin_conversations_getTeams` | `GET /admin.conversations.getTeams` | `slk <profile> api admin conversations-get-teams` | read | — | generated |  |
| `admin_conversations_invite` | `POST /admin.conversations.invite` | `slk <profile> api admin conversations-invite` | write | contract | generated |  |
| `admin_conversations_rename` | `POST /admin.conversations.rename` | `slk <profile> api admin conversations-rename` | write | contract | generated |  |
| `admin_conversations_restrictAccess_addGroup` | `POST /admin.conversations.restrictAccess.addGroup` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `admin_conversations_restrictAccess_listGroups` | `GET /admin.conversations.restrictAccess.listGroups` | `slk <profile> api admin conversations-restrict-access-list-groups` | read | — | generated |  |
| `admin_conversations_restrictAccess_removeGroup` | `POST /admin.conversations.restrictAccess.removeGroup` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | destructive | contract | generated |  |
| `admin_conversations_search` | `GET /admin.conversations.search` | `slk <profile> api admin conversations-search` | read | — | generated |  |
| `admin_conversations_setConversationPrefs` | `POST /admin.conversations.setConversationPrefs` | `slk <profile> api admin conversations-set-conversation-prefs` | write | contract | generated |  |
| `admin_conversations_setTeams` | `POST /admin.conversations.setTeams` | `slk <profile> api admin conversations-set-teams` | write | contract | generated |  |
| `admin_conversations_unarchive` | `POST /admin.conversations.unarchive` | `slk <profile> api admin conversations-unarchive` | write | contract | generated |  |
| `admin_emoji_add` | `POST /admin.emoji.add` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `admin_emoji_addAlias` | `POST /admin.emoji.addAlias` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `admin_emoji_list` | `GET /admin.emoji.list` | `slk <profile> api admin emoji-list` | read | — | generated |  |
| `admin_emoji_remove` | `POST /admin.emoji.remove` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | destructive | contract | generated |  |
| `admin_emoji_rename` | `POST /admin.emoji.rename` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `admin_inviteRequests_approve` | `POST /admin.inviteRequests.approve` | `slk <profile> api admin invite-requests-approve` | write | contract | generated |  |
| `admin_inviteRequests_approved_list` | `GET /admin.inviteRequests.approved.list` | `slk <profile> api admin invite-requests-approved-list` | read | — | generated |  |
| `admin_inviteRequests_denied_list` | `GET /admin.inviteRequests.denied.list` | `slk <profile> api admin invite-requests-denied-list` | read | — | generated |  |
| `admin_inviteRequests_deny` | `POST /admin.inviteRequests.deny` | `slk <profile> api admin invite-requests-deny` | write | contract | generated |  |
| `admin_inviteRequests_list` | `GET /admin.inviteRequests.list` | `slk <profile> api admin invite-requests-list` | read | — | generated |  |
| `admin_teams_admins_list` | `GET /admin.teams.admins.list` | `slk <profile> api admin teams-admins-list` | read | — | generated |  |
| `admin_teams_create` | `POST /admin.teams.create` | `slk <profile> api admin teams-create` | write | contract | generated |  |
| `admin_teams_list` | `GET /admin.teams.list` | `slk <profile> api admin teams-list` | read | — | generated |  |
| `admin_teams_owners_list` | `GET /admin.teams.owners.list` | `slk <profile> api admin teams-owners-list` | read | — | generated |  |
| `admin_teams_settings_info` | `GET /admin.teams.settings.info` | `slk <profile> api admin teams-settings-info` | read | — | generated |  |
| `admin_teams_settings_setDefaultChannels` | `POST /admin.teams.settings.setDefaultChannels` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `admin_teams_settings_setDescription` | `POST /admin.teams.settings.setDescription` | `slk <profile> api admin teams-settings-set-description` | write | contract | generated |  |
| `admin_teams_settings_setDiscoverability` | `POST /admin.teams.settings.setDiscoverability` | `slk <profile> api admin teams-settings-set-discoverability` | write | contract | generated |  |
| `admin_teams_settings_setIcon` | `POST /admin.teams.settings.setIcon` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `admin_teams_settings_setName` | `POST /admin.teams.settings.setName` | `slk <profile> api admin teams-settings-set-name` | write | contract | generated |  |
| `admin_usergroups_addChannels` | `POST /admin.usergroups.addChannels` | `slk <profile> api admin usergroups-add-channels` | write | contract | generated |  |
| `admin_usergroups_addTeams` | `POST /admin.usergroups.addTeams` | `slk <profile> api admin usergroups-add-teams` | write | contract | generated |  |
| `admin_usergroups_listChannels` | `GET /admin.usergroups.listChannels` | `slk <profile> api admin usergroups-list-channels` | read | — | generated |  |
| `admin_usergroups_removeChannels` | `POST /admin.usergroups.removeChannels` | `slk <profile> api admin usergroups-remove-channels` | destructive | contract | generated |  |
| `admin_users_assign` | `POST /admin.users.assign` | `slk <profile> api admin users-assign` | write | contract | generated |  |
| `admin_users_invite` | `POST /admin.users.invite` | `slk <profile> api admin users-invite` | write | contract | generated |  |
| `admin_users_list` | `GET /admin.users.list` | `slk <profile> api admin users-list` | read | — | generated |  |
| `admin_users_remove` | `POST /admin.users.remove` | `slk <profile> api admin users-remove` | destructive | contract | generated |  |
| `admin_users_session_invalidate` | `POST /admin.users.session.invalidate` | `slk <profile> api admin users-session-invalidate` | destructive | contract | generated |  |
| `admin_users_session_reset` | `POST /admin.users.session.reset` | `slk <profile> api admin users-session-reset` | destructive | contract | generated |  |
| `admin_users_setAdmin` | `POST /admin.users.setAdmin` | `slk <profile> api admin users-set-admin` | write | contract | generated |  |
| `admin_users_setExpiration` | `POST /admin.users.setExpiration` | `slk <profile> api admin users-set-expiration` | write | contract | generated |  |
| `admin_users_setOwner` | `POST /admin.users.setOwner` | `slk <profile> api admin users-set-owner` | write | contract | generated |  |
| `admin_users_setRegular` | `POST /admin.users.setRegular` | `slk <profile> api admin users-set-regular` | write | contract | generated |  |
| `api_test` | `GET /api.test` | `slk <profile> api api-test` | read | — | generated |  |
| `apps_event_authorizations_list` | `GET /apps.event.authorizations.list` | `slk <profile> api apps event-authorizations-list` | read | — | generated |  |
| `apps_permissions_info` | `GET /apps.permissions.info` | `slk <profile> api apps permissions-info` | read | — | generated |  |
| `apps_permissions_request` | `GET /apps.permissions.request` | `slk <profile> api apps permissions-request` | write | — | generated |  |
| `apps_permissions_resources_list` | `GET /apps.permissions.resources.list` | `slk <profile> api apps permissions-resources-list` | read | — | generated |  |
| `apps_permissions_scopes_list` | `GET /apps.permissions.scopes.list` | `slk <profile> api apps permissions-scopes-list` | read | — | generated |  |
| `apps_permissions_users_list` | `GET /apps.permissions.users.list` | `slk <profile> api apps permissions-users-list` | read | — | generated |  |
| `apps_permissions_users_request` | `GET /apps.permissions.users.request` | `slk <profile> api apps permissions-users-request` | write | — | generated |  |
| `apps_uninstall` | `GET /apps.uninstall` | `slk <profile> api apps uninstall` | destructive | — | generated |  |
| `auth_revoke` | `GET /auth.revoke` | `slk <profile> api auth revoke` | destructive | — | generated |  |
| `auth_test` | `GET /auth.test` | `slk <profile> api auth test` | read | — | generated |  |
| `bots_info` | `GET /bots.info` | `slk <profile> api bots-info` | read | — | generated |  |
| `calls_add` | `POST /calls.add` | `slk <profile> api calls add` | write | contract | generated |  |
| `calls_end` | `POST /calls.end` | `slk <profile> api calls end` | write | contract | generated |  |
| `calls_info` | `GET /calls.info` | `slk <profile> api calls info` | read | — | generated |  |
| `calls_participants_add` | `POST /calls.participants.add` | `slk <profile> api calls participants-add` | write | contract | generated |  |
| `calls_participants_remove` | `POST /calls.participants.remove` | `slk <profile> api calls participants-remove` | destructive | contract | generated |  |
| `calls_update` | `POST /calls.update` | `slk <profile> api calls update` | write | contract | generated |  |
| `chat_delete` | `POST /chat.delete` | `slk <profile> api chat delete` | destructive | contract | generated |  |
| `chat_deleteScheduledMessage` | `POST /chat.deleteScheduledMessage` | `slk <profile> api chat delete-scheduled-message` | destructive | contract | generated |  |
| `chat_getPermalink` | `GET /chat.getPermalink` | `slk <profile> api chat get-permalink` | read | — | generated |  |
| `chat_meMessage` | `POST /chat.meMessage` | `slk <profile> api chat me-message` | write | contract | generated |  |
| `chat_postEphemeral` | `POST /chat.postEphemeral` | `slk <profile> api chat post-ephemeral` | write | contract | generated |  |
| `chat_postMessage` | `POST /chat.postMessage` | `slk <profile> api chat post-message` | write | contract | generated |  |
| `chat_scheduleMessage` | `POST /chat.scheduleMessage` | `slk <profile> api chat schedule-message` | write | contract | generated |  |
| `chat_scheduledMessages_list` | `GET /chat.scheduledMessages.list` | `slk <profile> api chat scheduled-messages-list` | read | — | generated |  |
| `chat_unfurl` | `POST /chat.unfurl` | `slk <profile> api chat unfurl` | write | contract | generated |  |
| `chat_update` | `POST /chat.update` | `slk <profile> api chat update` | write | contract | generated |  |
| `conversations_archive` | `POST /conversations.archive` | `slk <profile> api conversations archive` | destructive | contract | generated |  |
| `conversations_close` | `POST /conversations.close` | `slk <profile> api conversations close` | write | contract | generated |  |
| `conversations_create` | `POST /conversations.create` | `slk <profile> api conversations create` | write | contract | generated |  |
| `conversations_history` | `GET /conversations.history` | `slk <profile> api conversations history` | read | — | generated |  |
| `conversations_info` | `GET /conversations.info` | `slk <profile> api conversations info` | read | — | generated |  |
| `conversations_invite` | `POST /conversations.invite` | `slk <profile> api conversations invite` | write | contract | generated |  |
| `conversations_join` | `POST /conversations.join` | `slk <profile> api conversations join` | write | contract | generated |  |
| `conversations_kick` | `POST /conversations.kick` | `slk <profile> api conversations kick` | destructive | contract | generated |  |
| `conversations_leave` | `POST /conversations.leave` | `slk <profile> api conversations leave` | destructive | contract | generated |  |
| `conversations_list` | `GET /conversations.list` | `slk <profile> api conversations list` | read | — | generated |  |
| `conversations_mark` | `POST /conversations.mark` | `slk <profile> api conversations mark` | write | contract | generated |  |
| `conversations_members` | `GET /conversations.members` | `slk <profile> api conversations members` | read | — | generated |  |
| `conversations_open` | `POST /conversations.open` | `slk <profile> api conversations open` | write | contract | generated |  |
| `conversations_rename` | `POST /conversations.rename` | `slk <profile> api conversations rename` | write | contract | generated |  |
| `conversations_replies` | `GET /conversations.replies` | `slk <profile> api conversations replies` | read | — | generated |  |
| `conversations_setPurpose` | `POST /conversations.setPurpose` | `slk <profile> api conversations set-purpose` | write | contract | generated |  |
| `conversations_setTopic` | `POST /conversations.setTopic` | `slk <profile> api conversations set-topic` | write | contract | generated |  |
| `conversations_unarchive` | `POST /conversations.unarchive` | `slk <profile> api conversations unarchive` | write | contract | generated |  |
| `dialog_open` | `GET /dialog.open` | `slk <profile> api dialog-open` | write | — | generated |  |
| `dnd_endDnd` | `POST /dnd.endDnd` | `slk <profile> api dnd end-dnd` | write | — | generated |  |
| `dnd_endSnooze` | `POST /dnd.endSnooze` | `slk <profile> api dnd end-snooze` | write | — | generated |  |
| `dnd_info` | `GET /dnd.info` | `slk <profile> api dnd info` | read | — | generated |  |
| `dnd_setSnooze` | `POST /dnd.setSnooze` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `dnd_teamInfo` | `GET /dnd.teamInfo` | `slk <profile> api dnd team-info` | read | — | generated |  |
| `emoji_list` | `GET /emoji.list` | `slk <profile> api emoji-list` | read | — | generated |  |
| `files_comments_delete` | `POST /files.comments.delete` | `slk <profile> api files comments-delete` | destructive | contract | generated |  |
| `files_delete` | `POST /files.delete` | `slk <profile> api files delete` | destructive | contract | generated |  |
| `files_info` | `GET /files.info` | `slk <profile> api files info` | read | — | generated |  |
| `files_list` | `GET /files.list` | `slk <profile> api files list` | read | — | generated |  |
| `files_remote_add` | `POST /files.remote.add` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `files_remote_info` | `GET /files.remote.info` | `slk <profile> api files remote-info` | read | — | generated |  |
| `files_remote_list` | `GET /files.remote.list` | `slk <profile> api files remote-list` | read | — | generated |  |
| `files_remote_remove` | `POST /files.remote.remove` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | destructive | contract | generated |  |
| `files_remote_share` | `GET /files.remote.share` | `slk <profile> api files remote-share` | write | — | generated |  |
| `files_remote_update` | `POST /files.remote.update` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `files_revokePublicURL` | `POST /files.revokePublicURL` | `slk <profile> api files revoke-public-url` | destructive | contract | generated |  |
| `files_sharedPublicURL` | `POST /files.sharedPublicURL` | `slk <profile> api files shared-public-url` | write | contract | generated |  |
| `files_upload` | `POST /files.upload` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `migration_exchange` | `GET /migration.exchange` | `slk <profile> api migration-exchange` | read | — | generated |  |
| `oauth_access` | `GET /oauth.access` | `left out: it returns a credential, which is never printed` | read | — | generated |  |
| `oauth_token` | `GET /oauth.token` | `left out: it returns a credential, which is never printed` | read | — | generated |  |
| `oauth_v2_access` | `GET /oauth.v2.access` | `left out: it returns a credential, which is never printed` | read | — | generated |  |
| `pins_add` | `POST /pins.add` | `slk <profile> api pins add` | write | contract | generated |  |
| `pins_list` | `GET /pins.list` | `slk <profile> api pins list` | read | — | generated |  |
| `pins_remove` | `POST /pins.remove` | `slk <profile> api pins remove` | destructive | contract | generated |  |
| `reactions_add` | `POST /reactions.add` | `slk <profile> api reactions add` | write | contract | generated |  |
| `reactions_get` | `GET /reactions.get` | `slk <profile> api reactions get` | read | — | generated |  |
| `reactions_list` | `GET /reactions.list` | `slk <profile> api reactions list` | read | — | generated |  |
| `reactions_remove` | `POST /reactions.remove` | `slk <profile> api reactions remove` | destructive | contract | generated |  |
| `reminders_add` | `POST /reminders.add` | `slk <profile> api reminders add` | write | contract | generated |  |
| `reminders_complete` | `POST /reminders.complete` | `slk <profile> api reminders complete` | write | contract | generated |  |
| `reminders_delete` | `POST /reminders.delete` | `slk <profile> api reminders delete` | destructive | contract | generated |  |
| `reminders_info` | `GET /reminders.info` | `slk <profile> api reminders info` | read | — | generated |  |
| `reminders_list` | `GET /reminders.list` | `slk <profile> api reminders list` | read | — | generated |  |
| `rtm_connect` | `GET /rtm.connect` | `left out: it returns a credential, which is never printed` | read | — | generated |  |
| `search_messages` | `GET /search.messages` | `slk <profile> api search-messages` | read | — | generated |  |
| `stars_add` | `POST /stars.add` | `slk <profile> api stars add` | write | contract | generated |  |
| `stars_list` | `GET /stars.list` | `slk <profile> api stars list` | read | — | generated |  |
| `stars_remove` | `POST /stars.remove` | `slk <profile> api stars remove` | destructive | contract | generated |  |
| `team_accessLogs` | `GET /team.accessLogs` | `slk <profile> api team access-logs` | read | — | generated |  |
| `team_billableInfo` | `GET /team.billableInfo` | `slk <profile> api team billable-info` | read | — | generated |  |
| `team_info` | `GET /team.info` | `slk <profile> api team info` | read | — | generated |  |
| `team_integrationLogs` | `GET /team.integrationLogs` | `slk <profile> api team integration-logs` | read | — | generated |  |
| `team_profile_get` | `GET /team.profile.get` | `slk <profile> api team profile-get` | read | — | generated |  |
| `usergroups_create` | `POST /usergroups.create` | `slk <profile> api usergroups create` | write | contract | generated |  |
| `usergroups_disable` | `POST /usergroups.disable` | `slk <profile> api usergroups disable` | destructive | contract | generated |  |
| `usergroups_enable` | `POST /usergroups.enable` | `slk <profile> api usergroups enable` | write | contract | generated |  |
| `usergroups_list` | `GET /usergroups.list` | `slk <profile> api usergroups list` | read | — | generated |  |
| `usergroups_update` | `POST /usergroups.update` | `slk <profile> api usergroups update` | write | contract | generated |  |
| `usergroups_users_list` | `GET /usergroups.users.list` | `slk <profile> api usergroups users-list` | read | — | generated |  |
| `usergroups_users_update` | `POST /usergroups.users.update` | `slk <profile> api usergroups users-update` | write | contract | generated |  |
| `users_conversations` | `GET /users.conversations` | `slk <profile> api users conversations` | read | — | generated |  |
| `users_deletePhoto` | `POST /users.deletePhoto` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | destructive | contract | generated |  |
| `users_getPresence` | `GET /users.getPresence` | `slk <profile> api users get-presence` | read | — | generated |  |
| `users_identity` | `GET /users.identity` | `slk <profile> api users identity` | read | — | generated |  |
| `users_info` | `GET /users.info` | `slk <profile> api users info` | read | — | generated |  |
| `users_list` | `GET /users.list` | `slk <profile> api users list` | read | — | generated |  |
| `users_lookupByEmail` | `GET /users.lookupByEmail` | `slk <profile> api users lookup-by-email` | read | — | generated |  |
| `users_profile_get` | `GET /users.profile.get` | `slk <profile> api users profile-get` | read | — | generated |  |
| `users_profile_set` | `POST /users.profile.set` | `slk <profile> api users profile-set` | write | contract | generated |  |
| `users_setActive` | `POST /users.setActive` | `slk <profile> api users set-active` | write | — | generated |  |
| `users_setPhoto` | `POST /users.setPhoto` | `left out: it sends application/x-www-form-urlencoded, which the generated command cannot send` | write | contract | generated |  |
| `users_setPresence` | `POST /users.setPresence` | `slk <profile> api users set-presence` | write | contract | generated |  |
| `views_open` | `GET /views.open` | `slk <profile> api views open` | write | — | generated |  |
| `views_publish` | `GET /views.publish` | `slk <profile> api views publish` | write | — | generated |  |
| `views_push` | `GET /views.push` | `slk <profile> api views push` | write | — | generated |  |
| `views_update` | `GET /views.update` | `slk <profile> api views update` | write | — | generated |  |
| `workflows_stepCompleted` | `GET /workflows.stepCompleted` | `slk <profile> api workflows step-completed` | write | — | generated |  |
| `workflows_stepFailed` | `GET /workflows.stepFailed` | `slk <profile> api workflows step-failed` | write | — | generated |  |
| `workflows_updateStep` | `GET /workflows.updateStep` | `slk <profile> api workflows update-step` | write | — | generated |  |

## Effects not taken from the HTTP method

| Operation | Effect | Why |
|---|---|---|
| `admin_conversations_archive` | destructive | override: archives a channel (<https://docs.slack.dev/reference/methods/admin.conversations.archive/>) |
| `admin_conversations_delete` | destructive | override: deletes a channel (<https://docs.slack.dev/reference/methods/admin.conversations.delete/>) |
| `admin_conversations_restrictAccess_removeGroup` | destructive | override: removes a group's access to a channel (<https://docs.slack.dev/reference/methods/admin.conversations.restrictAccess.removeGroup/>) |
| `admin_emoji_remove` | destructive | override: removes an emoji (<https://docs.slack.dev/reference/methods/admin.emoji.remove/>) |
| `admin_usergroups_removeChannels` | destructive | override: removes channels from a user group (<https://docs.slack.dev/reference/methods/admin.usergroups.removeChannels/>) |
| `admin_users_remove` | destructive | override: removes a person from the workspace (<https://docs.slack.dev/reference/methods/admin.users.remove/>) |
| `admin_users_session_invalidate` | destructive | override: ends a person's session (<https://docs.slack.dev/reference/methods/admin.users.session.invalidate/>) |
| `admin_users_session_reset` | destructive | override: signs a person out of every session (<https://docs.slack.dev/reference/methods/admin.users.session.reset/>) |
| `apps_permissions_request` | write | override: asks the workspace for more scopes, a GET in the spec (<https://docs.slack.dev/reference/methods/apps.permissions.request/>) |
| `apps_permissions_users_request` | write | override: asks a person for more scopes, a GET in the spec (<https://docs.slack.dev/reference/methods/apps.permissions.users.request/>) |
| `apps_uninstall` | destructive | override: uninstalls the app from the workspace, a GET in the spec (<https://docs.slack.dev/reference/methods/apps.uninstall/>) |
| `auth_revoke` | destructive | override: revokes the token, a GET in the spec (<https://docs.slack.dev/reference/methods/auth.revoke/>) |
| `calls_participants_remove` | destructive | override: removes participants from a call (<https://docs.slack.dev/reference/methods/calls.participants.remove/>) |
| `chat_delete` | destructive | override: deletes a message (<https://docs.slack.dev/reference/methods/chat.delete/>) |
| `chat_deleteScheduledMessage` | destructive | override: deletes a scheduled message (<https://docs.slack.dev/reference/methods/chat.deleteScheduledMessage/>) |
| `conversations_archive` | destructive | override: archives a channel for everyone in it (<https://docs.slack.dev/reference/methods/conversations.archive/>) |
| `conversations_kick` | destructive | override: removes a person from a channel (<https://docs.slack.dev/reference/methods/conversations.kick/>) |
| `conversations_leave` | destructive | override: leaves a channel (<https://docs.slack.dev/reference/methods/conversations.leave/>) |
| `dialog_open` | write | override: opens a dialog to a person, a GET in the spec (<https://docs.slack.dev/reference/methods/dialog.open/>) |
| `files_comments_delete` | destructive | override: deletes a file comment (<https://docs.slack.dev/reference/methods/files.comments.delete/>) |
| `files_delete` | destructive | override: deletes a file (<https://docs.slack.dev/reference/methods/files.delete/>) |
| `files_remote_remove` | destructive | override: removes a remote file (<https://docs.slack.dev/reference/methods/files.remote.remove/>) |
| `files_remote_share` | write | override: shares a remote file into channels, a GET in the spec (<https://docs.slack.dev/reference/methods/files.remote.share/>) |
| `files_revokePublicURL` | destructive | override: revokes a file's public link (<https://docs.slack.dev/reference/methods/files.revokePublicURL/>) |
| `pins_remove` | destructive | override: unpins a message (<https://docs.slack.dev/reference/methods/pins.remove/>) |
| `reactions_remove` | destructive | override: removes a reaction (<https://docs.slack.dev/reference/methods/reactions.remove/>) |
| `reminders_delete` | destructive | override: deletes a reminder (<https://docs.slack.dev/reference/methods/reminders.delete/>) |
| `stars_remove` | destructive | override: removes a saved item (<https://docs.slack.dev/reference/methods/stars.remove/>) |
| `usergroups_disable` | destructive | override: disables a user group (<https://docs.slack.dev/reference/methods/usergroups.disable/>) |
| `users_deletePhoto` | destructive | override: deletes the profile photo (<https://docs.slack.dev/reference/methods/users.deletePhoto/>) |
| `views_open` | write | override: opens a view to a person, a GET in the spec (<https://docs.slack.dev/reference/methods/views.open/>) |
| `views_publish` | write | override: publishes a Home tab view, a GET in the spec (<https://docs.slack.dev/reference/methods/views.publish/>) |
| `views_push` | write | override: pushes a view onto a person's stack, a GET in the spec (<https://docs.slack.dev/reference/methods/views.push/>) |
| `views_update` | write | override: changes a view, a GET in the spec (<https://docs.slack.dev/reference/methods/views.update/>) |
| `workflows_stepCompleted` | write | override: marks a workflow step done, a GET in the spec (<https://docs.slack.dev/reference/methods/workflows.stepCompleted/>) |
| `workflows_stepFailed` | write | override: marks a workflow step failed, a GET in the spec (<https://docs.slack.dev/reference/methods/workflows.stepFailed/>) |
| `workflows_updateStep` | write | override: changes a workflow step, a GET in the spec (<https://docs.slack.dev/reference/methods/workflows.updateStep/>) |

## Pagination

| Operation | Style | Request | Answer | Source |
|---|---|---|---|---|
| `admin_conversations_getTeams` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `team_ids` | detected |
| `admin_conversations_search` | cursor | query `cursor`, query `limit` | next `next_cursor`, items `channels` | detected |
| `apps_permissions_resources_list` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `resources` | override: Slack pages apps.permissions.resources.list by `cursor` and `response_metadata.next_cursor` |
| `chat_scheduledMessages_list` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `scheduled_messages` | override: Slack pages chat.scheduledMessages.list by `cursor` and `response_metadata.next_cursor` |
| `conversations_history` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `messages` | override: Slack pages conversations.history by `cursor` and `response_metadata.next_cursor` |
| `conversations_list` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `channels` | override: Slack pages conversations.list by `cursor` and `response_metadata.next_cursor` |
| `conversations_members` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `members` | override: Slack pages conversations.members by `cursor` and `response_metadata.next_cursor` |
| `conversations_replies` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `messages` | override: Slack pages conversations.replies by `cursor` and `response_metadata.next_cursor` |
| `files_info` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor` | detected |
| `files_list` | page | query `page`, query `count` | items `files` | override: Slack pages files.list by `page` from 1 and `count`, with no cursor (<https://docs.slack.dev/reference/methods/files.list/>) |
| `reactions_list` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `items` | override: Slack pages reactions.list by `cursor` and `response_metadata.next_cursor` |
| `stars_list` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `items` | override: Slack pages stars.list by `cursor` and `response_metadata.next_cursor` |
| `users_conversations` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `channels` | override: Slack pages users.conversations by `cursor` and `response_metadata.next_cursor` |
| `users_list` | cursor | query `cursor`, query `limit` | next `response_metadata.next_cursor`, items `members` | override: Slack pages users.list by `cursor` and `response_metadata.next_cursor` |

## Sign-in

Not from the source: the spec signs in by a `token` parameter; Slack's docs send it as `Authorization: Bearer <token>` (<https://docs.slack.dev/authentication/tokens/>), and a token in the query or the form would reach logs

## Permission keys

| Operation | Key | When |
|---|---|---|
| `admin_conversations_archive` | `slack.delete` | always |
| `admin_conversations_delete` | `slack.delete` | always |
| `admin_conversations_restrictAccess_removeGroup` | `slack.delete` | always |
| `admin_emoji_remove` | `slack.delete` | always |
| `admin_usergroups_removeChannels` | `slack.delete` | always |
| `admin_users_remove` | `slack.delete` | always |
| `admin_users_session_invalidate` | `slack.delete` | always |
| `admin_users_session_reset` | `slack.delete` | always |
| `apps_uninstall` | `slack.delete` | always |
| `auth_revoke` | `slack.delete` | always |
| `calls_participants_remove` | `slack.delete` | always |
| `chat_delete` | `messages.delete` | always |
| `chat_deleteScheduledMessage` | `messages.scheduled.cancel` | always |
| `chat_deleteScheduledMessage` | `slack.delete` | always |
| `chat_meMessage` | `messages.send` | always |
| `chat_postEphemeral` | `messages.send` | always |
| `chat_postMessage` | `messages.send` | always |
| `chat_scheduleMessage` | `messages.send` | always |
| `chat_update` | `messages.edit` | always |
| `conversations_archive` | `chats.archive` | always |
| `conversations_archive` | `slack.delete` | always |
| `conversations_create` | `chats.create` | always |
| `conversations_history` | `messages.list` | always |
| `conversations_invite` | `chats.members.add` | always |
| `conversations_join` | `chats.join` | always |
| `conversations_kick` | `chats.members.remove` | always |
| `conversations_kick` | `slack.delete` | always |
| `conversations_leave` | `chats.leave` | always |
| `conversations_leave` | `slack.delete` | always |
| `conversations_mark` | `chats.mark-read` | always |
| `conversations_rename` | `chats.update` | always |
| `conversations_replies` | `messages.list` | always |
| `conversations_setPurpose` | `chats.update` | always |
| `conversations_setTopic` | `chats.update` | always |
| `conversations_unarchive` | `chats.unarchive` | always |
| `files_comments_delete` | `slack.delete` | always |
| `files_delete` | `slack.delete` | always |
| `files_info` | `messages.list` | always |
| `files_list` | `messages.list` | always |
| `files_remote_remove` | `slack.delete` | always |
| `files_revokePublicURL` | `slack.delete` | always |
| `files_sharedPublicURL` | `slack.share` | always |
| `pins_add` | `messages.pin` | always |
| `pins_list` | `messages.list` | always |
| `pins_remove` | `messages.unpin` | always |
| `pins_remove` | `slack.delete` | always |
| `reactions_add` | `reactions.add` | always |
| `reactions_get` | `messages.list` | always |
| `reactions_list` | `messages.list` | always |
| `reactions_remove` | `reactions.remove` | always |
| `reactions_remove` | `slack.delete` | always |
| `reminders_delete` | `slack.delete` | always |
| `search_messages` | `messages.list` | always |
| `stars_add` | `messages.star` | always |
| `stars_list` | `messages.list` | always |
| `stars_remove` | `messages.unstar` | always |
| `stars_remove` | `slack.delete` | always |
| `usergroups_disable` | `slack.delete` | always |
| `users_deletePhoto` | `slack.delete` | always |

## Spec corrections

- 28 draft-04 tuple `items` became the value they describe, or `anyOf` its entries (OpenAPI 3 has no tuples)
- patched /paths/~1conversations.history/get/parameters/1/required: Slack's docs mark `channel` required in conversations.history (<https://docs.slack.dev/reference/methods/conversations.history/>); the spec does not
- patched /paths/~1conversations.replies/get/parameters/1/required: Slack's docs mark `channel` required in conversations.replies (<https://docs.slack.dev/reference/methods/conversations.replies/>); the spec does not
- patched /paths/~1conversations.info/get/parameters/1/required: Slack's docs mark `channel` required in conversations.info (<https://docs.slack.dev/reference/methods/conversations.info/>); the spec does not
- patched /paths/~1conversations.members/get/parameters/1/required: Slack's docs mark `channel` required in conversations.members (<https://docs.slack.dev/reference/methods/conversations.members/>); the spec does not
- patched /paths/~1conversations.replies/get/parameters/2/required: Slack's docs mark `ts` required in conversations.replies (<https://docs.slack.dev/reference/methods/conversations.replies/>)
- 11 patches: a Slack timestamp is a string with six decimals (the spec's own `defs_ts`); as a number 1700000000.000100 loses its digits and names another message
- patched /components/schemas/objs_response_metadata: the spec's three variants of `response_metadata` (paging, a warning, both) are one object whose fields come and go; as a union the paging of users.list and reactions.list cannot be read from it
- patched /paths/~1conversations.history/get/responses/200/content/application~1json/schema/properties/response_metadata: Slack's docs show `response_metadata.next_cursor` in the answer of conversations.history (<https://docs.slack.dev/reference/methods/conversations.history/>)
- patched /paths/~1conversations.replies/get/responses/200/content/application~1json/schema/properties/response_metadata: Slack's docs show `response_metadata.next_cursor` in the answer of conversations.replies (<https://docs.slack.dev/reference/methods/conversations.replies/>)
- patched /paths/~1stars.list/get/responses/200/content/application~1json/schema/properties/response_metadata: Slack's docs show `response_metadata.next_cursor` in the answer of stars.list (<https://docs.slack.dev/reference/methods/stars.list/>)
- patched /paths/~1oauth.access/get/responses/200/content/application~1json/schema/properties/access_token: oauth.access answers an access token (<https://docs.slack.dev/reference/methods/oauth.access/>), so the api group offers no command for it
- patched /paths/~1oauth.v2.access/get/responses/200/content/application~1json/schema/properties/access_token: oauth.v2.access answers an access token (<https://docs.slack.dev/reference/methods/oauth.v2.access/>), so the api group offers no command for it
- patched /paths/~1oauth.token/get/responses/200/content/application~1json/schema/properties/access_token: oauth.token answers an access token (<https://docs.slack.dev/reference/methods/oauth.token/>), so the api group offers no command for it
- patched /paths/~1rtm.connect/get/responses/200/content/application~1json/schema/properties/url/format: rtm.connect answers a WebSocket URL that carries a connection ticket (<https://docs.slack.dev/reference/methods/rtm.connect/>), a link with a secret, so the api group offers no command for it
- 185 patches: Slack's docs send the token as `Authorization: Bearer` (<https://docs.slack.dev/apis/web-api/>); a `token` argument would put the secret in shell history and the run record (WC-SECR-5)
- 76 patches: the method accepts `application/json` (its Swagger `consumes`), which cli-core can send; the form it lists first it cannot
- 290 patches: Slack adds answer fields over time and answers an empty list where the spec of 2020 says `additionalProperties: false` and `minItems: 1`, so a strict fake would refuse what Slack sends today
- 51 patches: Slack's descriptions link relative to api.slack.com (`/docs/pagination`) or to anchors of its own pages, which break in the coverage page, the commands page and the agent skill
