# V10 — Analytics Integration + Polished Visual System

## Doc Routing Header

- Specs: `docs/specs/ANALYTICS_SPEC.md`, `docs/specs/DESIGN_CANON.md`
- Runbooks: (none)
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0009-design-asset-fallback.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V10 - Analytics
- GA4 + GTM set up with production keys
- Hard stop if any gate item is incomplete

## Goal

Add GA4/GTM and finalize the visual canon implementation once core functionality is stable.

## Non-goals

- No additional analytics providers
- No new visual experiments beyond the design canon

## Acceptance Criteria

- GTM/GA4 script injection working
- Route change tracking implemented
- Required events tracked:
  - `questionnaire_started`
  - `questionnaire_completed`
  - `contact_form_submitted`
  - `admin_login_success`
- Events appear in GA4 DebugView
- No duplicate page views
- Design canon applied:
  - Global gradient applied
  - Typography matches spec
  - Glass effects used only where allowed
  - Motion constraints followed

## Files Expected to Change (docs only)

- `docs/plans/V10-analytics-and-polish.md`
- `docs/specs/ANALYTICS_SPEC.md` (if analytics spec changes)
- `docs/specs/DESIGN_CANON.md` (if design rules change)
- `design/DESIGN-NOTES.md` (if a new design decision is required)

## Verification Steps

- GA4 DebugView shows events
- No duplicate page views
- Lighthouse score does not regress materially

## Decision Impact Level

- low (instrumentation and polish)

## Stop Conditions

- GA4/GTM keys are missing
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
