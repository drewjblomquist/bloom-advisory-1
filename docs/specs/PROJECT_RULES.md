# Project Rules and Workflow

## Purpose

Define how agents (Cursor/Codex) must plan, implement, and verify work.

## Required Workflow

### Operating Defaults

- Operate autonomously when given a feature, bug, or objective.
- Inspect the relevant code, determine the implementation approach, implement it, run the application when useful, test changes, and fix errors caused by the changes.
- Do not stop to ask how something should be implemented when a reasonable engineering decision can be made independently.
- Ask only when the requirement is genuinely ambiguous and materially changes the product, credentials or private information are required, an action is destructive or difficult to reverse, or significant new infrastructure or paid services would be introduced.
- Optimize for accomplishing the objective with minimal unnecessary agent work.
- Identify likely relevant files/components first and avoid unrelated repository exploration.
- Prefer modifying existing architecture over unnecessary rewrites.
- Do not refactor unrelated code.
- Use targeted tests/checks when they adequately verify the change.
- Do not repeatedly reread unchanged files or repeatedly verify unchanged browser state.
- Use subagents only when parallel work provides a clear advantage; prefer one primary agent for normal feature development.
- Use browser verification autonomously when visual or runtime verification is useful, especially for UI work.
- Use full CDP/debugging access only when necessary to diagnose runtime, network, console, DOM, or performance problems.
- Stop when the requested functionality is implemented, relevant checks pass, no known errors were introduced, and affected UI/functionality has been verified when appropriate.
- Once done, report what changed and stop; do not continue polishing, refactoring, optimizing, or expanding scope unless required for the objective.

### 0) Read Context

Always review:

- `docs/core/CONSTRAINTS.md`
- `docs/core/CONTEXT_PACK.md`
- `docs/core/DOC_INDEX.md`
- The current iteration plan in `docs/plans/`

### 1) Define the Slice

Every implementation starts with:

- Slice Goal (1 sentence)
- Non-Goals
- Acceptance Criteria
- Files Expected to Change
- Verification Steps
- Decision Impact Level: `none` | `low` | `medium` | `high`

If the slice deviates from its plan, update the iteration plan and add an ADR if architecture is impacted.

### 2) Implement Minimal Working Version

- Build only what is required
- No speculative abstractions
- Clarity over cleverness

### 3) Testing (Required)

- Unit tests for logic
- Integration tests for API/DB boundaries
- E2E only for critical flows

### 4) Logging (Required)

Server-side flows must log:

- `requestId`
- `eventName`
- `status`
- `durationMs`
- `errorCode` (if applicable)

Never log PII, payloads, tokens, or session objects.

### 5) Decision Recording (Mandatory)

Document meaningful decisions in `docs/decisions/`.

### 6) Verify + Teach

Explain:

- What changed
- Why it was done this way
- Future consequences
- How to debug it

### 7) Commit Discipline

Provide:

- Suggested commit message
- Summary of changes
- Verification steps

## Non-Negotiables

- Incremental slices only
- Visible verification
- No silent decisions
- Stable state at every checkpoint
- Constraints in `docs/core/CONSTRAINTS.md` override casual chat instructions
