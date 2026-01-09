# V4 — Anti-Spam & Abuse Controls

## Doc Routing Header

- Specs: `docs/specs/SECURITY_PRIVACY.md`
- Runbooks: (none)
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0004-abuse-controls-approach.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V4 - Abuse Controls
- Abuse provider selected: Cloudflare Turnstile (free)
- Required keys documented and stored in Vercel
- Hard stop if any gate item is incomplete

## Goal

Prevent bots and spam from polluting public submissions.

## Non-goals

- No ML spam scoring
- No complex blocklists

## Acceptance Criteria

- Rate limiting/throttling in place for public submissions
- Turnstile (or equivalent) verification required for submit
- Server-side validation and rejection logging (no PII)
- Legitimate submissions still succeed

## Files Expected to Change (docs only)

- `docs/plans/V4-abuse-controls.md`
- `docs/playbooks/OUTSIDE_OF_CODE.md` (if gate steps change)
- `docs/decisions/ADR-0004-abuse-controls-approach.md` (if approach changes)

## Verification Steps

- Rapid repeated submissions are throttled
- Missing/invalid Turnstile token is rejected
- Legit submit passes and writes to Supabase

## Decision Impact Level

- medium (security boundary)

## Stop Conditions

- Abuse provider keys are missing
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
