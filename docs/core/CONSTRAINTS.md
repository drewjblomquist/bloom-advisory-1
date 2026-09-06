# Constraints: Single Source of Truth

## Purpose

This document extracts and freezes the non-negotiables, hard constraints, soft preferences, TODOs, and open decisions from plans/specs/ADRs/playbooks. It is the **highest-priority guidance** for implementation decisions.

If a chat instruction conflicts with this document, **pause and request an explicit decision** before proceeding.

## Priority Order (Highest → Lowest)

### Approved public UI refresh — 2026-09-05

Drew explicitly requested a modern visual redesign after V3 shipped. For this
slice, the design direction in `design/DESIGN-NOTES.md` supersedes the older
V2 layout, exact gradient, copy, and no-design-invention restrictions below.
Implement the public UI refresh now, ahead of V4; retain all architecture,
privacy, API, and form requiredness constraints.

1. This document (`docs/core/CONSTRAINTS.md`)
2. Accepted ADRs in `docs/decisions/`
3. Active iteration plan in `docs/plans/`
4. Specs in `docs/specs/`
5. Playbooks in `docs/playbooks/`

If there is conflict between sources, **escalate and resolve**, do not guess.

## Non-Negotiables (Immutable Rules)

### Product + Architecture

- Framework is **Next.js**.
- Hosting is **Vercel**.
- Canonical domain is **https://bloomadvisory.ai**.
- Database is **Supabase Postgres only** (system of record).
- Authentication is **Clerk only**; **Supabase Auth is never used**.
- Public users **never log in**.
- Public forms **write only**; public reads are blocked.
- Admin access requires **Clerk session + allowlist** in `admin_users` (no hardcoded emails).
- All admin reads/writes are **server-side only** using a **Supabase secret key mapped to `service_role`** (never exposed to the client).
- All public submissions go through **API routes** (no direct client writes).
- **Abuse prevention is required early** and must be server-side (not just frontend).
- **No PII in logs** (no payloads, tokens, sessions, or emails).
- **No secrets in repo**; all secrets live in environment variables.
- **No invented visual design**; only use `/design` assets. If none exist, use CSS gradient only and no custom favicon.

### Process + Quality

- Incremental slices only.
- Visible verification for every change.
- No silent decisions; document meaningful decisions in `docs/decisions/`.
- If plan diverges, update the plan and add ADR if architecture is impacted.
- Keep the project stable at every checkpoint.
- Agents operate autonomously within the current objective and only pause for true ambiguity, credentials/private information, destructive actions, or significant new infrastructure/paid services.
- Agents keep work targeted: inspect likely relevant files first, avoid unrelated refactors, use targeted checks when sufficient, and stop once the requested objective is done.

## Hard Constraints (Required Boundaries)

### Environment + Deployment

- Preview deployments must use **dev Supabase**; prod uses **prod Supabase**.
- Preview and Production configs must be **separate** in Vercel.
- Production deploys from `main`; non-`main` deploys are Preview.
- Canonical redirects must exist:
  - `http://bloomadvisory.ai` → `https://bloomadvisory.ai`
  - `https://www.bloomadvisory.ai` → `https://bloomadvisory.ai` (if www configured)
- Admin routes must be protected and **not indexable** (noindex headers/meta).
- No framework-default error pages exposed; use branded 404.
- Reserved routes **must not be implemented** in V1: `/customerportal`, `/redirect`.

### Security + Privacy

- Authorization must be enforced at **API + DB (RLS)**, not just UI.
- Public insert-only policies for questionnaire/contact tables.
- Admin-only tables locked down with RLS.
- No public reads of `contact_messages` or submissions.
- Secrets must never be exposed client-side; server-only keys must not use `NEXT_PUBLIC_*`.
- Logs must include: `requestId`, `eventName`, `status`, `durationMs`, and optional `errorCode`.

### Data + API

- **V3** uses `questionnaire_submissions_v1` (simple table).
- **V9** introduces versioned schema; **legacy table must be preserved**.
- Blank form fields must be stored as `null`.
- Contact form submissions are stored in `contact_messages`.
- Questionnaire fields are **required** (per `docs/plans/UI_V2_PLANNING_GUIDE.md`).
- Admin allowlist is stored in `admin_users` with `clerk_user_id`.
- Questionnaire spec source of truth is `docs/plans/UI_V2_PLANNING_GUIDE.md` (overrides `docs/specs/SYSTEM_ARCHITECTURE.md` where they conflict).
- Contact form requiredness: email + message required; phone optional.
 - **Do not collect or retain IP address or user agent** (store `null` if columns exist).

### Design + UX

- Design canon is authoritative; implement, do not invent.
- Single global gradient; background never changes per section.
- Dark-first design; legibility over aesthetics.
- No heavy effects, parallax, or animated gradients.
- Glass effects are restrained and **not** used for form inputs.
- Typography must be professional and non-playful.
- If no approved background or favicon exists, use **gradient only** and **no custom favicon**.
 - Footer socials must include **Instagram, X, and Substack**.

### Analytics

- GA4 + GTM (free, modular, privacy-compliant).
- No PII in analytics events.
- Required events: `page_view`, `cta_clicked`, `contact_form_submitted`, `questionnaire_started`, `questionnaire_completed`, `admin_login_success`.

## Soft Preferences (Default Choices; Override Only With Explicit Rationale)

- Keep implementation minimal; avoid speculative abstractions.
- Prefer server-side validation and logging for public writes.
- Use lightweight abuse controls (rate limit + CAPTCHA/Turnstile) before advanced detection.
- Use Clerk default UI for admin login; minimal customization.
- Keep motion low and purposeful (quality signal, not attention grab).

## TODOs and Open Decisions (Must Be Resolved When Relevant)

- Privacy policy and form copy (see `docs/specs/PRODUCT_SCOPE.md`, `docs/playbooks/OUTSIDE_OF_CODE.md`).
- UI V2 open decisions listed in `docs/plans/UI_V2_PLANNING_GUIDE.md` must be resolved before UI changes.
- Versioned questionnaire schema details and migration approach (V9 planning).

## Source References

Primary sources:

- `docs/core/CONTEXT_PACK.md`
- `docs/specs/PROJECT_RULES.md`
- `docs/specs/PRODUCT_SCOPE.md`
- `docs/specs/SECURITY_PRIVACY.md`
- `docs/specs/AUTH_SPEC.md`
- `docs/specs/DEPLOYMENT_SPEC.md`
- `docs/specs/DATA_MODEL.md`
- `docs/specs/DESIGN_CANON.md`
- `docs/specs/ANALYTICS_SPEC.md`
- `docs/specs/SYSTEM_ARCHITECTURE.md`
- `docs/plans/ITERATION_PLAN.md`
- `docs/playbooks/OUTSIDE_OF_CODE.md`
- `docs/playbooks/ITERATION_GATES.md`
- ADRs `docs/decisions/ADR-0001` through `ADR-0011`
