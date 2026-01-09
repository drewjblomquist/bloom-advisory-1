# Deployment: Vercel & Domain

## Purpose & Scope

This section defines how the Bloom Advisors website is deployed, hosted, and made publicly accessible using **Vercel**. It covers:

- Why Vercel is used
- What Vercel is responsible for in the system architecture
- How deployments are triggered and managed
- Environment handling (Preview vs Production)
- Required setup steps **outside of coding**
- Constraints and expectations that must be followed during development

This section does **not** define application logic, database behavior, or authentication logic, but it **does** define how those systems are deployed and configured at runtime.

## Decision Summary

**Decision:**

Bloom Advisors will use **Vercel** as the primary deployment and hosting platform.

**Rationale:**

- Native support for **Next.js**, which is the framework used by the site
- Built-in **Git-based deployment workflow** with preview environments
- Clear separation between **Preview** and **Production** environments
- Straightforward custom domain + SSL management
- Scales cleanly from solo development to client-facing production workloads

This deployment approach is intentionally aligned with modern, client-ready best practices and mirrors what would be implemented for real consulting clients.

## Responsibilities of Vercel

Vercel is responsible for:

- **Building** the application from the connected Git repository
- **Deploying** the application to:
    - Preview environments (non-production branches)
    - Production environment (production branch)
- **Hosting** the application and serving all public traffic
- **Managing environment variables** per environment (Preview vs Production)
- **Providing deployment logs** and build diagnostics
- **Handling custom domain routing and SSL** once DNS is correctly configured

Vercel is **not** responsible for:

- Database storage (handled by Supabase)
- Authentication logic (handled by Clerk)
- Analytics logic (handled by the selected analytics provider)

## Deployment Model

### Source Control Integration

- Vercel is connected directly to the project's **GitHub repository**
- GitHub is the single source of truth for deployable code

### Branch Strategy

- **Production Branch:** `main`
- Any commit pushed to `main` triggers a **Production Deployment**
- Any commit pushed to a non-production branch triggers a **Preview Deployment**

### Environments

The system will operate in three conceptual environments:

| Environment | Purpose |
| --- | --- |
| Local | Developer machine |
| Preview | Testing and QA via Vercel preview URLs |
| Production | Live site on custom domain |

Preview and Production environments **must be treated as separate** for configuration and secrets.
Preview deployments must point to the **dev** Supabase project (see `docs/decisions/ADR-0007-supabase-environment-strategy.md`).

## Environment Variables & Configuration

### Environment Variable Policy

- All secrets and configuration values are stored in **Vercel Environment Variables**
- No secrets are committed to the repository
- Variables must be explicitly configured for:
    - Preview
    - Production

### Expected Variables (Example)

This list is illustrative and must be kept up to date as the system evolves:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- Any auth redirect or site URL values required by Supabase/Clerk

Each variable must be evaluated and marked as:

- Preview only
- Production only
- Both

### Non-Negotiable Rule

If the application depends on an environment variable, it **must** be documented in the PRD and configured in Vercel before deployment.

## Domain & SSL Management

### Custom Domain

- The Production deployment will be attached to a custom domain owned by Bloom Advisors
- Domains are added and managed in the Vercel project settings

### DNS Configuration

- DNS records are managed at the domain registrar
- Exact records provided by Vercel must be applied
- Existing conflicting records must be removed

### SSL

- SSL is automatically provisioned by Vercel once DNS verification succeeds
- Production is not considered "live" until HTTPS is active

## Pre-Coding Requirements (Must Be Completed First)

The following steps **must be completed before any deployment-dependent code is written**:

1. Vercel account is created and accessible
2. Project ownership is decided (personal vs team)
3. GitHub repository is connected to Vercel
4. Production branch (`main`) is finalized
5. Environment variable list is defined and documented
6. Domain ownership and DNS access are confirmed
7. Deployment workflow is agreed upon:
    - Feature branch → Preview
    - Merge to `main` → Production

Failure to complete these steps may cause rework or invalid assumptions in code.

## Deployment Workflow (Operational)

1. Developer pushes code to a non-production branch
    
    → Vercel creates a **Preview Deployment**
    
2. Preview URL is used to validate:
    - UI
    - Form submissions
    - Auth behavior
3. Code is merged into `main`
    
    → Vercel creates a **Production Deployment**
    
4. Production deployment is verified on the custom domain
5. If a deployment fails, logs are reviewed and the issue is resolved before proceeding

Rollback strategy: redeploy a previously successful commit.

## Constraints & Guardrails

- No direct production changes outside Git
- No secrets in source code
- No production testing without a Preview deploy
- No environment-specific assumptions in code unless explicitly documented

## Success Criteria

This deployment strategy is considered successful when:

- Preview deployments reliably reflect non-production changes
- Production deployments are stable and repeatable
- Environment variables are clearly separated and documented
- Custom domain resolves securely over HTTPS
- The workflow can be reused for client projects without structural changes

## Domain, DNS, Deployment, Route-Level Visibility

### Objectives

Define the authoritative domain configuration, DNS ownership boundaries, Vercel deployment model, and domain-aware routing rules for BloomAdvisory.ai V1 so that:

- Production traffic resolves to the correct canonical domain over HTTPS
- Preview deployments are enabled and predictable
- Admin routes are both **access-controlled** and **not indexable**
- Redirects and error handling are deterministic (no framework-default pages)

### Canonical Domain Strategy

**Canonical Production Domain (apex):**

- `https://bloomadvisory.ai` is the single canonical domain for production.

**Non-canonical variants:**

- `http://bloomadvisory.ai` must redirect to `https://bloomadvisory.ai`
- `https://www.bloomadvisory.ai` (if configured) must 301 redirect to `https://bloomadvisory.ai`
- If `http://www.bloomadvisory.ai` exists, it must also redirect to `https://bloomadvisory.ai`

**Indexing/SEO intent:**

- Only `https://bloomadvisory.ai` is intended to be indexed and shared.
- All non-canonical variants must permanently redirect (301) to the canonical domain.

### DNS Ownership and Responsibilities

**Domain registrar / DNS provider:**

- Registrar: Namecheap
- DNS is managed in Namecheap (no proxy/CDN layer assumed in V1).

**Ownership boundary:**

- DNS records are configured manually in Namecheap.
- The application repo must not contain secrets or DNS record values.
- Vercel will provide required DNS record values (A/CNAME/TXT) during setup; these values are treated as infrastructure configuration (not code).

**Verification expectations:**

- Domain ownership verification is performed via DNS (typically a TXT record) as required by Vercel.
- Production SSL is expected to be provisioned automatically by Vercel after DNS is correct and domain is verified.

### Route Model: Public vs Protected (Domain-Aware)

BloomAdvisory.ai V1 is a single public marketing page with a protected admin surface.

**Public routes**

- `/` (landing page with content, questionnaire, contact modal)
- `/admin/login` (auth entry)
- `404` (custom branded not-found)

**Protected routes**

- `/admin` (single-page admin surface for V1)
- `/admin/*` (treated as protected even if not used in V1; invalid paths should still resolve to branded 404)

**Reserved future routes (not implemented in V1)**

- `/customerportal` (reserved namespace; do not implement in V1)
- `/redirect` (reserved route; do not implement in V1 unless explicitly specified later)

### Authentication Gate and Admin Visibility Rules

**Access requirements for protected routes**

- A user must have an active Clerk session **and**
- The user's Clerk user ID must exist in the Supabase admin allowlist table (data-driven authorization; not hardcoded).

**Unauthenticated behavior**

- Any request to `/admin` or `/admin/*` without a valid session must redirect to:
    - `/admin/login`

**Non-admin / unauthorized behavior**

- Authenticated users whose Clerk user ID is not in the allowlist are treated as unauthorized and must not access admin UI.
- Unauthorized users must be routed to the same outcome as unauthenticated:
    - redirect to `/admin/login`
    - (No information disclosure about whether an account exists or which emails are allowed.)

**Search engine invisibility requirements (Admin)**

- Admin routes must never be indexed:
    - `/admin`
    - `/admin/*`
    - `/admin/login`
- Admin pages must send headers/meta to prevent indexing:
    - `noindex, nofollow` (or equivalent)
- Admin routes must not be discoverable via sitemap output (if sitemap exists later).

### Redirect Rules (Required)

**Canonical + HTTPS**

- `http://bloomadvisory.ai/*` → `https://bloomadvisory.ai/*` (301)
- `https://www.bloomadvisory.ai/*` → `https://bloomadvisory.ai/*` (301), if `www` is configured.

**Auth flow**

- If authenticated admin visits `/admin/login` → redirect to `/admin`
- If unauthenticated user visits `/admin` or `/admin/*` → redirect to `/admin/login`
- After successful login → redirect to `/admin` (no "return-to-last-route" behavior in V1)

### 404 and Failure Behavior (Branded, No Defaults)

**Global requirement**

- No framework-default error pages should be exposed to users.

**Not Found behavior**

- Any unknown route on the domain renders a **custom branded 404** page.
- Admin unknown route handling:
    - `/admin/unknown` is protected; if unauthenticated → redirect to `/admin/login`
    - if authenticated admin → branded 404 (within admin styling constraints if applicable)

**Brand requirements for 404**

- Minimal, clean layout matching site theme
- Clear CTA (e.g., "Back to Home")
- No technical stack traces or generic server error wording

### Environment Variables and Secrets Policy

**Storage location**

- All secrets and environment configuration are stored in **Vercel Project Environment Variables**, not in the repo.

**V1 environment strategy**

- **One Supabase project** is used for Production and Preview deployments in V1.
- Preview deployments must have all required env vars present to build successfully.

**Required env var categories (non-exhaustive)**

- Supabase public client configuration (NEXT_PUBLIC_*)
- Clerk authentication keys
- Analytics keys (if enabled)
- Any server-only secrets must never be exposed via NEXT_PUBLIC_*

**No hardcoding rule**

- Cursor must not hardcode any environment keys, URLs, or secrets into the codebase.

### Repository + Vercel Integration Requirements

**Source of truth**

- Git repository is the source of truth for application code.
- Vercel deploys from the connected repo.

**Deployment triggers**

- Merge to `main` triggers Production deploy.
- PR creation/update triggers Preview deploy.

**Operational constraint**

- Domain/DNS configuration is not managed in code; it is configured in Namecheap + Vercel project settings and documented here.

### Non-Goals for V1 (Explicit)

- Multi-domain support beyond canonical + optional www redirect
- Subdomain architecture (e.g., `admin.`) in V1
- Separate staging Supabase project in V1
- Customer authentication or customer portal implementation in V1
- Complex role-based access controls beyond allowlisted admin Clerk user IDs in V1
