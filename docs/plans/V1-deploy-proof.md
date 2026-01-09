# V1 — Production Deploy Proof (Domain + HTTPS First)

## Doc Routing Header

- Specs: `docs/plans/ITERATION_PLAN.md`, `docs/specs/DEPLOYMENT_SPEC.md`
- Runbooks: `docs/playbooks/DEPLOY_VERCEL_DOMAIN.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0005-domain-canonicalization.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: Domain & DNS, Vercel setup, environment variables documented
- Hard stop if any gate item is incomplete

## Goal

Get a **bare-minimum Next.js app deployed to production on `bloomadvisory.ai`**, with DNS + SSL correct, so deployment can't stall the project later.

## Non-goals

- No Supabase
- No Clerk
- No UI design
- No forms

## Acceptance Criteria

- `https://bloomadvisory.ai` loads a minimal page
- `http://bloomadvisory.ai` redirects to HTTPS
- `https://www.bloomadvisory.ai` redirects to apex (if www is configured)
- Vercel auto-deploys on push to `main`

## Files Expected to Change (docs only)

- `docs/plans/V1-deploy-proof.md`
- `docs/playbooks/OUTSIDE_OF_CODE.md` (if gates change)
- `docs/playbooks/ITERATION_GATES.md` (if gates change)
- `docs/decisions/ADR-0005-domain-canonicalization.md` (if canonical domain rules change)

## Verification Steps

- Visit `https://bloomadvisory.ai` → see minimal page
- Push a trivial change to `main` → confirm production updates
- Confirm redirects for HTTP and optional www

## Decision Impact Level

- medium (deployment and domain rules)

## Stop Conditions

- Domain verification or SSL is not complete
- Redirects are not working
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
