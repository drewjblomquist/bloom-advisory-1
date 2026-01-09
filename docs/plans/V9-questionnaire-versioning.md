# V9 — Questionnaire Versioning (Upgrade from Simple Table to Real Model)

## Doc Routing Header

- Specs: `docs/specs/DATA_MODEL.md`
- Runbooks: `docs/playbooks/SUPABASE_SETUP.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0002-db-v1-simple-submissions-then-versioned.md`

## Gates (must be completed before implementation)

- V8 complete
- Outside-of-code checklist: V9 - Questionnaire Versioning
- Versioned schema tables created in Supabase
- Hard stop if any gate item is incomplete

## Goal

Support adding/removing/editing questions while preserving historical submissions.

## Non-goals

- Delete legacy table `questionnaire_submissions_v1`
- Migrate legacy data (optional later)

## Acceptance Criteria

- Versioned schema implemented:
  - `questionnaire_versions`, `questions`, `submissions`, `answers`
- Admin UI to edit questions and publish versions
- Public questionnaire reads active version
- Submissions tied to the correct version
- Legacy `questionnaire_submissions_v1` preserved and marked legacy

## Files Expected to Change (docs only)

- `docs/plans/V9-questionnaire-versioning.md`
- `docs/playbooks/SUPABASE_SETUP.md` (if schema changes)
- `docs/specs/DATA_MODEL.md` (if schema changes)

## Verification Steps

- Admin publishes a new version → public form updates
- Submitting answers writes to new model
- Submission views show answers aligned to version

## Decision Impact Level

- high (schema + admin tooling)

## Stop Conditions

- Versioned tables are not created
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
