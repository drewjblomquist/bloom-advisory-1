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
  - Hero section (1 paragraph)
  - Service offerings bubble list (static)
  - Questionnaire section UI only (fields render; local validation + toast allowed, no persistence)
  - Contact modal UI only (local validation + toast allowed, no persistence)
  - Admin button links to `/admin/login` (page can be placeholder)
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

---

## Implementation Notes (V2 Closed)

When closing V2, the following were aligned so that **plans match the implemented code**:

1. **Contact:** Contact modal is opened only via the "Contact Us" button in the nav (NavItems). There is no dedicated Contact section on the page body. Decision: keep nav-only entry point for V2.
2. **Questionnaire copy:** Section title is "Assessment of Current Processes"; positioning note is "This short quiz helps us understand where we can help give you back time, money, and clarity in your business." (Updated in UI_V2_PLANNING_GUIDE to match.)
3. **Footer:** Footer includes three social links: X, Instagram, and Substack. (Planning guide updated to allow Substack; decision recorded.)
4. **Design asset rule:** Gradient-only background and no custom favicon are in use and acknowledged in OUTSIDE_OF_CODE checklist.
