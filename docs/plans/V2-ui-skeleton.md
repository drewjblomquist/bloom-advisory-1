# V2 — Minimal Public UI Skeleton (No Backend Yet)

## Doc Routing Header

- Specs: `docs/specs/PROJECT_RULES.md`, `docs/specs/SYSTEM_ARCHITECTURE.md`, `docs/specs/DESIGN_CANON.md`
- Runbooks: `docs/playbooks/LOCAL_DEV.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0009-design-asset-fallback.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V2 - UI Skeleton (design asset rule)
- Hard stop if any gate item is incomplete

## Goal

Create the **basic landing page structure** so we can wire real interactions next.

## Non-goals

- No saving to database
- No auth
- No styling invention beyond the design canon

## Acceptance Criteria

- Public `/` includes:
  - Logo area (text placeholder OK)
  - Hero section (2 paragraphs)
  - Service offerings bubble list (static)
  - Questionnaire section UI only (fields render, no submit)
  - Contact modal UI only
  - Admin button links to `/admin` (page can be placeholder)
  - Footer socials icons (placeholder links OK)
- Page renders cleanly on desktop and mobile
- Contact modal opens/closes

## Files Expected to Change (docs only)

- `docs/plans/V2-ui-skeleton.md`
- `docs/specs/DESIGN_CANON.md` (only if design rules change)
- `design/DESIGN-NOTES.md` (if a new design decision is required)

## Verification Steps

- Load `/` on desktop and mobile
- Confirm all UI sections render
- Open/close contact modal

## Decision Impact Level

- low (UI scaffolding only)

## Stop Conditions

- Design assets are missing and the gradient-only fallback is not acknowledged
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
