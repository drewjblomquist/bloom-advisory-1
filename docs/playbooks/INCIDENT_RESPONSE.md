# Runbook: Incident Response (Admin Access or Key Compromise)

## Purpose

Provide a simple, repeatable response if admin access is compromised or a secret is exposed.

## Trigger Conditions

- Suspicious admin activity
- Unexpected content changes
- Exposed credentials in logs or repo
- Alerts from Clerk, Supabase, or Vercel

## Immediate Actions (First 15 Minutes)

1. **Revoke admin access**
   - Disable or delete the affected Clerk user
   - Remove the user from `admin_users`

2. **Rotate secrets**
   - Clerk: rotate `CLERK_SECRET_KEY`
   - Supabase: rotate `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Turnstile: rotate site/secret keys
   - Update Vercel env vars (Preview + Production)

3. **Invalidate sessions**
   - In Clerk dashboard, revoke active sessions

4. **Audit recent changes**
   - Check Vercel deployments
   - Review Supabase logs and recent writes

## Recovery Actions

- Recreate admin access with a new Clerk user
- Reinsert allowlisted admin in `admin_users`
- Verify admin routes are protected and working
- Confirm public forms still submit

## Post-Incident

- Document the incident in `docs/decisions/` if it affects architecture
- Add prevention steps if needed
- Review and update this runbook
