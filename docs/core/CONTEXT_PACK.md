# Context Pack

## Intent

- Ship a credible, privacy-first BloomAdvisory.ai V1 on Vercel
- Capture public questionnaire + contact submissions in Supabase
- Provide a secure, Clerk-only admin surface

## Non-Negotiables

- Framework: Next.js
- Hosting: Vercel
- Canonical domain: https://bloomadvisory.ai (DNS + SSL early)
- Database: Supabase Postgres only
- Authentication: Clerk only (no Supabase Auth)
- Authorization: app-level allowlist via `admin_users`
- Public users never log in
- Public forms write data; public reads are blocked
- Abuse prevention required early (after deploy proof)
- Visual design must not be invented; only use `/design` assets or log missing assets

## Global Acceptance Criteria

- Production domain resolves over HTTPS
- Questionnaire + contact submissions write to Supabase via API routes
- Admin access is Clerk-authenticated and allowlisted
- Logs do not include PII

## Global Verification

- Production URL loads and redirects correctly
- Submissions visible in Supabase with insert-only RLS
- Admin access denied for non-allowlisted users

## Agent Rules

- Read `docs/core/DOC_INDEX.md` before planning
- Implement only the current iteration scope
- If plan diverges: update the iteration plan and add an ADR if architecture is impacted
