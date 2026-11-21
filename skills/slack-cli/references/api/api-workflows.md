<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# Slack Web API: workflows

## `slack api workflows-step-completed-list [options]`

- What: workflows\_stepCompleted — read (GET /workflows.stepCompleted)
- Call: `GET /workflows.stepCompleted`, effect: read
- Sign-in: slackAuth (workflow.steps:execute)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`workflow.steps:execute\` |
| `--workflow-step-execute-id <value>` | yes | Context identifier that maps to the correct workflow step execution. |
| `--outputs <value>` | no | Key-value object of outputs from your step. Keys of this object reflect the configured \`key\` properties of your \[\`outputs\`\](/reference/workflows/workflow\_step#output) array from your \`workflow\_step\` object. |

## `slack api workflows-step-failed-list [options]`

- What: workflows\_stepFailed — read (GET /workflows.stepFailed)
- Call: `GET /workflows.stepFailed`, effect: read
- Sign-in: slackAuth (workflow.steps:execute)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`workflow.steps:execute\` |
| `--workflow-step-execute-id <value>` | yes | Context identifier that maps to the correct workflow step execution. |
| `--error <value>` | yes | A JSON-based object with a \`message\` property that should contain a human readable error message. |

## `slack api workflows-update-step-list [options]`

- What: workflows\_updateStep — read (GET /workflows.updateStep)
- Call: `GET /workflows.updateStep`, effect: read
- Sign-in: slackAuth (workflow.steps:execute)

| Flag | Required | What |
|---|---|---|
| `--token <value>` | yes | Authentication token. Requires scope: \`workflow.steps:execute\` |
| `--workflow-step-edit-id <value>` | yes | A context identifier provided with \`view\_submission\` payloads used to call back to \`workflows.updateStep\`. |
| `--inputs <value>` | no | A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. \*\*Please note\*\*: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. \[Read more about variables in workflow steps here\](/workflows/steps#variables). |
| `--outputs <value>` | no | An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed. |
| `--step-name <value>` | no | An optional field that can be used to override the step name that is shown in the Workflow Builder. |
| `--step-image-url <value>` | no | An optional field that can be used to override app image that is shown in the Workflow Builder. |
