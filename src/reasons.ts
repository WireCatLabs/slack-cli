import { defineReasons, type ErrorReason } from "@wirecat/cli-base/standards"

/**
 * Every reason slack raises beyond cli-core's, so an agent branches on it (WC-OUT-15). `slack_error` is Slack's own
 * code, from the method's page on docs.slack.dev.
 */
export const REASONS: ErrorReason[] = defineReasons(
  (
    [
      // chat.update's cant_update_message, chat.delete's cant_delete_message.
      ["message.not-yours", "permission_error", "Slack lets this account change only messages it may change"],
      // chat.update's edit_window_closed.
      ["message.edit-window-closed", "permission_error", "the workspace no longer lets this message be edited"],
      // chat.postMessage's and chat.update's msg_too_long.
      ["message.too-long", "validation_error", "the message is longer than Slack takes"],
      // chat.postMessage's not_in_channel.
      ["chat.not-joined", "permission_error", "this account is not in the chat"],
      // chat.postMessage's and conversations.join's is_archived.
      ["chat.archived", "validation_error", "the chat is archived"],
      // chat.postMessage's restricted_action and restricted_action_* codes.
      ["chat.restricted", "permission_error", "a workspace or channel setting stops this action"],
    ] satisfies [string, ErrorReason["code"], string][]
  ).map(([reason, code, message]) => ({ reason, code, message, details: ["slack_error"] })),
)
