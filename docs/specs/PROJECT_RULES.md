# Project Rules and Workflow

## Purpose

Define how agents (Cursor/Codex) must plan, implement, and verify work.

## Required Workflow

### 0) Read Context

Always review:

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
