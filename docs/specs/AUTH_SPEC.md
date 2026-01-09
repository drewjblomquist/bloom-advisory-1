# Authentication: Clerk Integration

## Purpose & Rationale

Authentication for this project will be handled by **Clerk**, not Supabase Auth.

**Rationale for Clerk selection:**

- Faster and more reliable setup for a solo founder / small team
- Best-in-class Next.js integration (App Router compatible)
- Clean separation between **authentication (Clerk)** and **data/storage (Supabase)**
- Reduces auth-related complexity and edge cases in V1
- Scales cleanly to multi-admin, customer portals, and future products

Supabase will **not** be responsible for authentication in any form.

## Scope of Authentication (V1)

**Authentication is required ONLY for:**

- `/admin` routes
- Any future internal tools or dashboards
- Any write access to site content or protected data

**Authentication is NOT required for:**

- Main marketing site
- Questionnaire submission
- Contact form submission
- Public testimonials
- Public content pages

This is a **strict separation**.

## Auth Model Overview

- Clerk is the **single source of truth** for user identity
- Supabase stores application data only
- Clerk User ID (`user.id`) is the canonical identifier for authenticated users
- Supabase never stores passwords or credentials

```
User → Clerk Auth → Session → App
                      ↓
                Supabase (data only)
```

## Clerk Configuration Requirements

### Authentication Methods

- Email + Magic Link (passwordless)
- No social logins in V1
- No phone auth in V1
- No public sign-ups

### User Creation Policy

- **Admins are invite-only**
- No self-service registration
- Admin users are manually created or invited via Clerk Dashboard

## Authorization Model (Critical)

Clerk **authenticates** users.

Authorization is handled at the **application layer**.

### Admin Authorization Strategy (V1)

- A user is considered an admin if:
    - Their Clerk `user.id` exists in the Supabase `admin_users` table
- Being authenticated alone is NOT sufficient

### Supabase `admin_users` Table

| Column Name | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| clerk_user_id | text | must match Clerk `user.id` |
| email | text | for audit / clarity |
| role | text | default: `admin` |
| created_at | timestamp | audit only |

**All admin authorization checks must:**

1. Verify Clerk session exists
2. Query Supabase `admin_users`
3. Deny access if no matching row

No hard-coded emails. No environment-based bypasses.

## Route Protection Rules

### Protected Routes

- `/admin`
- `/admin/*`
- Any future internal routes

### Enforcement

- Clerk middleware must block unauthenticated users
- App-level logic must block unauthorized users
- Unauthorized users should:
    - Be redirected to sign-in
    - Or shown a minimal "Access Denied" state

No silent failures.

## Environment Configuration

Clerk requires environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```

Rules:

- Keys must never be hard-coded
- Keys must exist in:
    - Local `.env`
    - Hosting provider environment variables
- No secrets committed to Git

## UI & UX Constraints

- Clerk's default UI components are acceptable for V1
- Minimal customization required
- Branding polish is secondary to correctness and security
- Sign-in UI must feel intentionally "internal," not consumer-grade

## Logging & Observability

- Authentication failures should be logged (server-side)
- Authorization failures should be logged separately
- No sensitive data (tokens, emails) in logs

## Security Non-Goals (Explicit)

The following are **out of scope for V1**:

- Role hierarchies beyond `admin`
- Fine-grained permissions
- MFA enforcement
- Session analytics
- Rate limiting beyond Clerk defaults

These may be addressed in future iterations.

## Future Compatibility (Intentional Design)

This architecture must support:

- Multiple admins
- Customer portals (future)
- Paid access / gated tools
- Organization-based access control
- Integration with additional services

Clerk is chosen specifically to **avoid re-architecting auth later**.

## Hard Rules for Coding Agents

- Do NOT use Supabase Auth
- Do NOT mix auth responsibilities
- Do NOT infer admin status from email domain
- Do NOT bypass authorization checks
- Do NOT store credentials anywhere outside Clerk

If an auth decision is ambiguous → **deny access by default**.
