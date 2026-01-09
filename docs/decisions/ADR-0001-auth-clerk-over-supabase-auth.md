# ADR-0001: Auth - Clerk over Supabase Auth

**Date:** 2024-12-XX
**Status:** accepted

## Context

We need authentication for admin access to the Bloom Advisors website. Two primary options were considered: Supabase Auth (integrated with our database) and Clerk (dedicated auth service).

## Options Considered

1. **Supabase Auth**
   - Integrated with Supabase database
   - Single platform for auth + database
   - Row Level Security (RLS) policies can use auth context directly
   - Free tier available

2. **Clerk**
   - Dedicated authentication service
   - Best-in-class Next.js integration (App Router compatible)
   - Clean separation of concerns (auth vs data)
   - Faster setup for solo founder / small team
   - Scales cleanly to multi-admin, customer portals

3. **Other options** (not seriously considered)
   - NextAuth.js / Auth.js
   - Firebase Auth
   - Custom JWT implementation

## Decision

Use **Clerk** as the authentication provider.

## Rationale

- **Faster and more reliable setup** for a solo founder / small team
- **Best-in-class Next.js integration** (App Router compatible)
- **Clean separation** between authentication (Clerk) and data/storage (Supabase)
- **Reduces auth-related complexity** and edge cases in V1
- **Scales cleanly** to multi-admin, customer portals, and future products
- **Avoids re-architecting auth later** when adding customer portals or multi-tenant features

## Consequences

### What this enables

- Fast authentication setup
- Clean separation of auth and data concerns
- Easy path to add customer portals later
- Professional auth UI out of the box
- Multi-admin support without complex role management

### What this limits

- Cannot use Supabase RLS policies that depend on Supabase Auth context directly
- Must maintain separate `admin_users` table in Supabase for authorization checks
- Additional service dependency (Clerk) beyond Supabase

### What we must remember later

- Clerk User ID (`user.id`) is the canonical identifier for authenticated users
- Authorization checks must query Supabase `admin_users` table using Clerk user ID
- Never use Supabase Auth in this project
- All admin authorization logic must check both Clerk session AND Supabase allowlist

## Revisit When

- Need to add customer/user authentication (not just admin)
- Need organization-based access control
- Need to integrate with other services that require Supabase Auth
- Cost becomes a concern (Clerk pricing changes)
