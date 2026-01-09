# V7 — Admin Can View Submissions (Read-Only)

## Doc Routing Header

- Specs: `docs/specs/DATA_MODEL.md`, `docs/specs/SECURITY_PRIVACY.md`
- Runbooks: (none)
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0006-supabase-access-pattern.md`

## Gates (must be completed before implementation)

- V6 complete
- Admin authorization verified
- Hard stop if any gate item is incomplete

## Goal

Admin can view questionnaire submissions safely.

## Non-goals

- No editing submissions
- No exporting yet

## Acceptance Criteria

- Admin submissions list/table view exists
- Server-side fetching pattern used
- Sorting by `submitted_at` desc
- Public users cannot access list
- No PII in logs

## Files Expected to Change (docs only)

- `docs/plans/V7-admin-read-submissions.md`
- `docs/specs/DATA_MODEL.md` (if read model changes)

## Verification Steps

- Admin sees submission list
- Public cannot access the list

## Decision Impact Level

- medium (admin data access)

## Stop Conditions

- Admin authorization is not enforced
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
