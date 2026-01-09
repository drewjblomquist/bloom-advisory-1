# ADR-0003: Public Submissions via API Route (Not Direct Client Write)

**Date:** 2024-12-XX
**Status:** accepted

## Context

Questionnaire submissions need to be written to Supabase. Two approaches: (1) write directly from client to Supabase using anon key, or (2) submit via Next.js API route that writes to Supabase.

## Options Considered

1. **Direct client write to Supabase**
   - Client uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - RLS policies control access
   - Simpler implementation (no API route needed)
   - Client code directly calls Supabase

2. **API route (chosen)**
   - Client submits to Next.js API route
   - API route validates and writes to Supabase
   - Server-side boundary for validation and abuse controls

3. **Server Actions** (Next.js 13+)
   - Similar to API route but using React Server Actions
   - Could be considered for future iterations

## Decision

Submit questionnaire data via a **Next.js API route** (server boundary) rather than writing directly from client to Supabase.

## Rationale

- **Easier to add anti-spam + rate limits** (can be added in V4 without changing client code)
- **Easier to validate inputs** server-side before database write
- **Easier to rotate policies later** without breaking the client
- **Better security posture**: server-side validation and logging
- **Consistent pattern** for all write operations

## Consequences

### What this enables

- Server-side validation before database write
- Easy addition of rate limiting and abuse controls
- Server-side logging (structured, no PII)
- Can use service role key if needed (never exposed to client)
- Easier to add CAPTCHA/bot detection later

### What this limits

- Slightly more complex than direct client write
- Additional API route to maintain
- Requires network request (but this is fine for form submission)

### What we must remember later

- All public write operations should go through API routes
- Never expose service role key to client
- Validate all inputs server-side
- Log submission attempts (success and failure) with structured logging

## Revisit When

- Need real-time updates (would require Supabase real-time subscriptions)
- Need offline submission capability
- Performance becomes an issue (unlikely for form submissions)
