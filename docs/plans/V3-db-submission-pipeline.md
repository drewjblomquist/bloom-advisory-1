# V3 — Supabase Connection + Public Submission Pipeline

## Doc Routing Header

- Specs: `docs/specs/SYSTEM_ARCHITECTURE.md`, `docs/specs/SECURITY_PRIVACY.md`, `docs/specs/DATA_MODEL.md`
- Runbooks: `docs/playbooks/SUPABASE_SETUP.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0002-db-v1-simple-submissions-then-versioned.md`, `docs/decisions/ADR-0003-public-submissions-via-api-route.md`, `docs/decisions/ADR-0006-supabase-access-pattern.md`, `docs/decisions/ADR-0008-contact-form-storage.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V3 - Database Setup
- Supabase dev and prod projects exist
- Tables created: `questionnaire_submissions_v1`, `contact_messages`
- RLS policies configured for insert-only public writes
- Hard stop if any gate item is incomplete

## Goal

Make the questionnaire and contact form **submit via API routes** and land in Supabase reliably.

## Non-goals

- No versioned questionnaire model yet
- No admin viewing UI yet
- No Clerk yet

## Acceptance Criteria

- Questionnaire submission writes to `questionnaire_submissions_v1`
- Contact modal submission writes to `contact_messages`
- All fields optional; blank fields stored as `null` where applicable
- Public users cannot read submissions or contact messages
- Success message shown after submit

## Files Expected to Change (docs only)

- `docs/plans/V3-db-submission-pipeline.md`
- `docs/playbooks/SUPABASE_SETUP.md` (if schema or policies change)
- `docs/specs/DATA_MODEL.md` (if schema changes)
- `docs/decisions/ADR-0002-db-v1-simple-submissions-then-versioned.md` (if schema strategy changes)

## Verification Steps

- Submit questionnaire in production → row appears in Supabase
- Submit contact form in production → row appears in Supabase
- Confirm blank fields are `null`
- Confirm public users cannot read submissions

## Decision Impact Level

- high (data model + write boundary)

## Stop Conditions

- RLS policies are not configured correctly
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
