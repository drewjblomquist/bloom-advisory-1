# V5 — Clerk Authentication Foundation (Admin Login Only)

## Doc Routing Header

- Specs: `docs/specs/AUTH_SPEC.md`, `docs/specs/SECURITY_PRIVACY.md`
- Runbooks: `docs/playbooks/CLERK_SETUP.md`
- Checklists: `docs/playbooks/OUTSIDE_OF_CODE.md`, `docs/playbooks/ITERATION_GATES.md`
- Decisions: `docs/decisions/ADR-0001-auth-clerk-over-supabase-auth.md`

## Gates (must be completed before implementation)

- Outside-of-code checklist: V5 - Clerk Auth
- Clerk app created and keys stored in Vercel
- Redirect URLs configured
- Hard stop if any gate item is incomplete

## Goal

Introduce Clerk as the **only authentication system** and protect `/admin` routes.

## Non-goals

- No admin authorization logic yet (allowlist comes in V6)
- No admin actions yet

## Acceptance Criteria

- `/admin` is protected by Clerk middleware
- `/admin/login` works with Clerk UI
- Invite-only logins enforced
- Production login works

## Files Expected to Change (docs only)

- `docs/plans/V5-clerk-auth.md`
- `docs/playbooks/CLERK_SETUP.md` (if setup steps change)
- `docs/specs/AUTH_SPEC.md` (if auth requirements change)

## Verification Steps

- Visiting `/admin` while logged out redirects to `/admin/login`
- Invited admin can log in successfully
- Uninvited users cannot sign up

## Decision Impact Level

- medium (auth integration)

## Stop Conditions

- Clerk keys or redirect URLs are not configured
- Any gate item is incomplete
- Plan reality diverges without updating this plan and adding an ADR if architecture changes
