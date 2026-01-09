# V6 — Admin Authorization (Allowlist in Supabase)

## Doc Routing Header

- Specs: `docs/specs/AUTH_SPEC.md`, `docs/specs/DATA_MODEL.md`
- Runbooks: `docs/playbooks/SUPABASE_SETUP.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0006-supabase-access-pattern.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V6 - Admin Authorization
- `admin_users` table created and initial admin inserted
- Hard stop if any gate item is incomplete

## Goal

Make sure being logged in is **not enough** — the user must be allowlisted in `admin_users`.

## Non-goals

- No admin UI beyond a placeholder dashboard

## Acceptance Criteria

- Admin check flow:
  - Clerk session exists
  - `admin_users` lookup by Clerk user id
  - Deny access if no match
- No hardcoded emails in code

## Files Expected to Change (docs only)

- `docs/plans/V6-admin-authorization.md`
- `docs/playbooks/SUPABASE_SETUP.md` (if table setup changes)
- `docs/specs/DATA_MODEL.md` (if authz model changes)

## Verification Steps

- Allowlisted admin can access `/admin`
- Invited-but-not-allowlisted user is denied

## Decision Impact Level

- high (authorization boundary)

## Stop Conditions

- `admin_users` table missing or empty
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
