# ADR-0006: Supabase Access Pattern (Clerk Auth + Server-Side Admin Access)

**Date:** 2025-01-08
**Status:** accepted

## Context

Clerk is the only authentication system. Supabase Auth is not used. Admin access must still be restricted, and public forms must be able to write data safely.

## Options Considered

1. **Server-side admin access using a Supabase secret key with the `service_role` role (chosen)**
   - Admin checks are done in the app (Clerk session + `admin_users` allowlist)
   - Server-side admin API routes use the secret key
   - Public forms use a publishable key with insert-only RLS policies for the `anon` role

2. **JWT-based RLS with custom tokens**
   - Create custom JWTs to map Clerk identities into Supabase RLS
   - Adds complexity and custom auth plumbing

3. **Use Supabase Auth**
   - Conflicts with the Clerk-only decision

## Decision

Use **server-side admin access with a Supabase secret key**, and **`anon` insert-only policies enforced through a publishable key** for public forms.

## Rationale

- Aligns with Clerk-only auth and avoids Supabase Auth entirely
- Keeps admin authorization explicit and centralized in app logic
- Simplifies RLS policy surface for public writes

## Consequences

### What this enables

- Clear separation: Clerk for identity, Supabase for data
- Admin-only tables remain inaccessible from the client
- Public submissions can be accepted safely via API routes

### What this limits

- Admin data access must always go through server-side routes
- Requires careful handling of the secret key

### What we must remember later

- Never expose the secret key to client code
- Keep public RLS policies limited to insert-only
- All admin reads/writes must be server-side

## Revisit When

- We need client-side admin reads (unlikely)
- We adopt a different auth provider
