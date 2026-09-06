# V3 — Supabase Connection + Public Submission Pipeline

## Doc Routing Header

- Specs: `docs/specs/SYSTEM_ARCHITECTURE.md`, `docs/specs/SECURITY_PRIVACY.md`, `docs/specs/DATA_MODEL.md`
- Runbooks: `docs/playbooks/SUPABASE_SETUP.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0002-db-v1-simple-submissions-then-versioned.md`, `docs/decisions/ADR-0003-public-submissions-via-api-route.md`, `docs/decisions/ADR-0006-supabase-access-pattern.md`, `docs/decisions/ADR-0008-contact-form-storage.md`

## Gates (must be completed before production verification)

- Outside-of-code checklist: V3 - Database Setup
- Supabase dev and prod projects exist
- Tables created: `questionnaire_submissions_v1`, `contact_messages`
- RLS policies configured for insert-only public writes
- Hard stop before marking V3 complete if any gate item is incomplete

## Goal

Make the questionnaire and contact form **submit via API routes** and land in Supabase reliably.

## Non-goals

- No versioned questionnaire model yet
- No admin viewing UI yet
- No Clerk yet

## Acceptance Criteria

- Questionnaire submission writes to `questionnaire_submissions_v1`
- Contact modal submission writes to `contact_messages`
- Questionnaire fields follow the V2 requiredness rules; blank optional fields stored as `null` where applicable
- Public users cannot read submissions or contact messages
- Success message shown after submit

## Implementation Mapping

V3 keeps the accepted simple table model and maps the current V2 UI into `questionnaire_submissions_v1`:

- `businessName` → `business_name`
- `companyType` + `companyTypeOther` → `industry`
- `employeeCount` → `team_size`
- `criticalTools` + `toolsOther` → `tools`
- `painPoints` → `time_consuming_tasks`
- `frictionAreas` + `frictionOther` → `areas_interested`
- `dataConfidence` → `ai_knowledge_level`
- `processHandling` → `openness_to_automation`
- `unlocks` → `magic_wand_question`
- `urgency`, `painPoints`, and `additionalNotes` → `anything_else`
- `email` → `email`
- `phone` → `phone_number`

Contact modal submissions map to `contact_messages`:

- `email` → `email`
- `phone` → `phone_number`
- `message` → `message`

## Files Expected to Change

- `app/api/questionnaire/route.ts`
- `app/api/contact/route.ts`
- `app/lib/submissionApi.ts`
- `app/lib/submissionValidation.ts`
- `app/lib/structuredLog.ts`
- `app/components/Questionnaire.tsx`
- `app/components/Questionnaire.module.css`
- `app/components/Contact.tsx`
- `app/components/Contact.module.css`
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

## Verification Status (2026-09-05)

- Production Supabase project resumed and linked.
- V3 migration applied; both tables have RLS enabled with `anon` INSERT-only grants and policies.
- Supabase security and performance advisors report no issues.
- Direct REST and local browser flows successfully inserted into both tables; public reads returned `401`.
- Optional blank values were stored as `null`; all synthetic verification rows were removed.
- Production Vercel variables are configured with the Supabase URL and publishable key.
- Separate development Supabase project created in the production organization's region; the V3 migration and advisors pass there.
- Vercel Preview, Development, and local development use the development project; Production remains isolated on production Supabase.
- Protected Vercel Preview deployed and verified through both form flows with no browser console errors; synthetic rows were removed.
- Legacy production JWT-based API keys disabled after a repository, Git history, Vercel environment, and OAuth-app consumer audit. Legacy `apikey` requests return `401`; the modern publishable key still inserts and public reads remain blocked.
- Vercel project runtime updated from deprecated Node.js 20.x to Node.js 24.x; fresh Node.js 24.x Preview and Production builds are deployed and verified.
- Production deployed from `main` and both live forms were verified on `https://bloomadvisory.ai`; each row landed in production with blank optional phone values stored as `null`, and the synthetic rows were removed.
