# V8 — Editable Homepage Content (Admin Writes)

## Doc Routing Header

- Specs: `docs/specs/DATA_MODEL.md`
- Runbooks: `docs/playbooks/SUPABASE_SETUP.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0006-supabase-access-pattern.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V8 - Admin Edit Content
- `site_content` table created with RLS enabled
- Admin authorization verified
- Hard stop if any gate item is incomplete

## Goal

Admin can edit homepage hero + service offerings without redeploy.

## Non-goals

- Testimonials (deferred)
- Fancy CMS features

## Acceptance Criteria

- Admin UI for hero text with Save button
- Admin UI for service offerings list with Save button
- Public homepage reads from `site_content`
- Changes persist after redeploy
- `updated_at` and `updated_by` recorded

## Files Expected to Change (docs only)

- `docs/plans/V8-admin-edit-content.md`
- `docs/playbooks/SUPABASE_SETUP.md` (if table schema changes)
- `docs/specs/DATA_MODEL.md` (if content model changes)

## Verification Steps

- Update hero text in admin → refresh `/` shows new copy
- Changes persist after redeploy

## Decision Impact Level

- medium (admin write paths)

## Stop Conditions

- `site_content` table not created
- Admin authorization not enforced
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
