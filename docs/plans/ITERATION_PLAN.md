# Order of Execution

## Purpose

This section defines the **exact build sequence** for BloomAdvisory.ai so we:

- **prove production deployment early** (custom domain + HTTPS working),
- **ship in small, verifiable slices** (no "big bang" merge),
- **avoid rework traps** (schema/auth/admin built in the right order),
- **keep security aligned at every step** (not bolted on at the end).

This plan is intentionally written like a senior engineer would structure a greenfield build: **infrastructure proof → UI skeleton → data plumbing → guardrails → admin + auth → versioning + polish**.

## Global Rules (Apply to Every Iteration)

### "Definition of Done" (per iteration)

An iteration is only "done" when all are true:

1. ✅ Feature works end-to-end in **production** (`https://bloomadvisory.ai`)
2. ✅ Changes are **small and reversible**
3. ✅ Verification steps are written (how Drew confirms it)
4. ✅ Any new env vars are documented + set in Vercel
5. ✅ Structured logs exist for server-side flows (no PII)
6. ✅ Any "decision" that matters later is recorded in `docs/decisions/`

### Environments & Source of Truth

- GitHub repo is the only source of deployable code.
- Vercel production deploys from `main`.
- Every iteration ends with a stable `main` deploy you can point to confidently.

## V1 — Production Deploy Proof (Domain + HTTPS First)

### Goal

Get a **bare-minimum Next.js app deployed to production on `bloomadvisory.ai`**, with DNS + SSL correct, so deployment can't "kill the project" later.

### Scope

- Next.js app skeleton
- Home page renders "Hello Bloom"
- Vercel production deployment connected to GitHub
- Custom domain added to Vercel
- DNS configured in Namecheap
- HTTPS active and redirects correct (http→https, optional www→apex)

### Non-goals

- No Supabase
- No Clerk
- No UI design
- No forms

### Outside-of-code checklist (required)

- Add domain in Vercel project settings
- Apply Vercel DNS records in Namecheap
- Wait for domain verification + SSL issuance
- Confirm canonical routing rules:
    - `https://bloomadvisory.ai` works
    - `http://bloomadvisory.ai` redirects to https
    - if `www` is set up, it redirects to apex

### Verification

- Visit `https://bloomadvisory.ai` → see "Hello Bloom"
- Make a trivial change, push to GitHub, confirm Vercel auto-deploy updates production

### Done means

You've proven the end-to-end pipeline: **local → git push → Vercel → bloomadvisory.ai**.

## V2 — Minimal Public UI Skeleton (No Backend Yet)

### Goal

Create the **basic landing page structure** so we can wire real interactions next.

### Scope

Public `/` includes placeholder sections (content can be rough):

- Logo area (simple text placeholder acceptable)
- Hero section (2 paragraphs)
- Service offerings bubble list (static)
- Questionnaire section **UI only** (fields render, no submit)
- Contact button opens modal **UI only**
- Admin button links to `/admin` (page can be placeholder)
- Footer socials icons (can be placeholder links)

### Non-goals

- No saving to database
- No auth
- No styling invention beyond minimal clean layout (use your existing design constraints). If no approved assets exist, use the CSS gradient only and no custom favicon.

### Verification

- Page renders cleanly on desktop and mobile
- Questionnaire fields are visible and usable (typing works)
- Contact modal opens/closes

### Done means

We now have the **UI surfaces** necessary to test data submission flows next.

## V3 — Supabase Connection + "Single Table" Submissions (Fastest Safe DB Win)

### Why this is the right move (senior-engineer rationale)

You *can* build the full versioned model immediately, but it increases:

- schema complexity,
- RLS complexity,
- admin UI complexity,
- debugging surface area.

A professional approach is to **ship a simple, correct data pipeline first**, then evolve it.

### Goal

Make the questionnaire **actually submit** and land in Supabase reliably.

### Scope

- Create Supabase project
- Add env vars in Vercel:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Create table: `questionnaire_submissions_v1` with columns matching your 12 fields + `submitted_at`
- Create table: `contact_messages` for contact modal submissions
- Add public insert (RLS configured to allow insert-only; no read)
- Implement submission from UI:
    - All fields optional
    - Blank fields written as `null`
    - Success message shown after submit

### Strong recommendation (best practice)

**Submit via a Next.js API route** (server boundary) rather than writing directly from client to Supabase in V1.

Why:

- easier to add anti-spam + rate limits,
- easier to validate inputs,
- easier to rotate policies later without breaking the client.

### Non-goals

- No versioned questionnaire model yet
- No admin viewing UI yet
- No Clerk yet

### Verification

- Submit test form in production → see row in Supabase
- Confirm blank fields are `null`, not empty strings
- Confirm public users cannot read submissions

### Done means

You have a working production lead capture pipeline with correct privacy boundaries.

## V4 — Anti-Spam & Abuse Controls (Early, Before You Go Further)

### Goal

Prevent bots/spam from polluting your dataset and increasing operational noise.

### Scope

- Add lightweight abuse protection to public submission endpoints:
    - Rate limiting / throttling (per IP/session)
    - Bot check (Cloudflare Turnstile)
    - Server-side validation (length limits, basic sanitization)
- Log rejections without logging PII

### Non-goals

- No ML spam scoring
- No complex blocklists

### Verification

- Spam test: repeated submissions should be blocked/throttled
- Legit submit still works
- Supabase doesn't fill with obvious junk from basic bot scripts

### Done means

Public write endpoints are protected enough to confidently keep the site live.

## V5 — Clerk Authentication Foundation (Admin Login Only)

### Goal

Introduce Clerk as the **only authentication system** (Supabase Auth is out).

### Scope

- Add Clerk to Next.js
- Protect `/admin` routes with Clerk middleware
- Create `/admin/login` using Clerk components (default UI acceptable)
- Disable public signups / make invite-only in Clerk dashboard
- Env vars in Vercel:
    - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
    - `CLERK_SECRET_KEY`

### Non-goals

- No admin authorization logic yet (who is allowed beyond "logged in")
- No admin actions yet

### Verification

- Visiting `/admin` while logged out redirects to `/admin/login`
- Logging in succeeds (only invited accounts can log in)
- Production works, not just localhost

### Done means

You have reliable authentication gates in production.

## V6 — Admin Authorization (Allowlist in Supabase)

### Goal

Make sure being logged in is **not enough** — you must also be an allowed admin.

### Scope

- Create Supabase table: `admin_users`
    - `clerk_user_id`, `email`, `role`, `created_at`
- Admin check flow:
    1. Clerk session exists
    2. Query `admin_users` for matching `clerk_user_id`
    3. If no match → deny access (show "Access denied" or redirect)
- RLS: lock down admin-only tables (and later, reads of submissions)

### Non-goals

- No admin UI beyond a placeholder dashboard

### Verification

- Allowed admin can access `/admin`
- Invited-but-not-allowlisted user cannot access `/admin`
- No hardcoded emails in code

### Done means

You now have **real authorization**, not just authentication.

## V7 — Admin Can View Submissions (Read-Only)

### Goal

Admin can view questionnaire submissions safely.

### Scope

- Add admin submissions list/table view in `/admin`
- Server-side fetching pattern preferred (to avoid leaking keys and to control logs)
- Sorting by `submitted_at` desc
- Minimal filters (industry/team size) optional

### Non-goals

- No editing submissions
- No exporting yet

### Verification

- Admin sees list
- Public cannot access list
- No PII in logs

### Done means

You have an operational workflow: **collect leads → view them**.

## V8 — Editable Homepage Content (Admin Writes)

### Goal

Admin can edit homepage hero + service offerings from admin panel, without redeploy.

### Scope

- Supabase table `site_content` (key/value json)
- Admin UI:
    - Hero text editor + Save button
    - Service offerings list editor (add/remove items) + Save button
- Public homepage reads from `site_content`
- Strict audit fields: `updated_at`, `updated_by` (store Clerk user id)

### Non-goals

- Testimonials V2 (explicitly deferred)
- Fancy CMS features

### Verification

- Update hero text in admin → refresh `/` shows new copy
- Changes persist after redeploy

### Done means

You've achieved "content updates without code changes."

## V9 — Questionnaire Versioning (Upgrade from Simple Table to Real Model)

### Why this comes *now*

Once:

- submission pipeline is stable,
- abuse controls exist,
- admin auth/authorization works,
- admin UI exists,

…then you're ready to introduce the more complex schema without thrashing.

### Goal

Support adding/removing/editing questions while preserving historical submissions.

### Scope

- Implement schema:
    - `questionnaire_versions`
    - `questions`
    - `submissions`
    - `answers`
- Admin UI to:
    - edit questions
    - publish a new version
- Public questionnaire reads the active version and renders dynamically
- Old submissions remain tied to prior version

### Migration plan (important)

- Keep `questionnaire_submissions_v1` as legacy
- Do not delete; mark as legacy
- Start writing new submissions into new tables after cutover
- Optionally write a one-time migration script later (not required)

### Verification

- Admin publishes new version → public form updates
- Submitting answers writes to new model
- Viewing a submission shows answers aligned with its version

### Done means

You now have your "real" flexible questionnaire system.

## V10 — Analytics Integration + Polished Visual System

### Goal

Add GA4/GTM and finalize your background/visual canon implementation once core functionality is stable.

### Scope

- GTM/GA4 script injection
- Route change tracking
- Events:
    - questionnaire_started
    - questionnaire_completed
    - contact_form_submitted
    - admin_login_success (non-PII)
- Implement your global gradient + constraints exactly
- Add `/design` folder enforcement and DESIGN-NOTES rules

### Why this is last

Analytics and design are valuable, but they should not block:

- deploy stability,
- data correctness,
- security correctness.

### Verification

- GA DebugView shows events
- No duplicate page views
- Lighthouse doesn't crater
- Background matches canon and doesn't drift

### Done means

You have a credible production marketing + lead capture platform with tracking.
