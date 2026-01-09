# ADR-0007: Supabase Environment Strategy (Dev + Prod, Preview Uses Dev)

**Date:** 2025-01-08
**Status:** accepted

## Context

We need a clear environment strategy for Supabase across local development, preview deployments, and production.

## Options Considered

1. **Single Supabase project for all environments**
   - Simplest setup
   - Higher risk of data contamination

2. **Separate dev, preview, and prod projects**
   - Clean separation
   - Higher setup and maintenance burden

3. **Dev + prod only; preview uses dev (chosen)**
   - Safe enough for V1
   - Keeps setup reasonable
   - Avoids production data in local/preview

## Decision

Use **two Supabase projects**:

- **Dev project** for local development and preview deployments
- **Prod project** for production only

## Rationale

- Protects production data
- Keeps environment setup manageable for a solo founder
- Aligns with Vercel preview workflow

## Consequences

### What this enables

- Safe local and preview testing
- Production stability with clean data

### What this limits

- Dev environment must be maintained for previews

### What we must remember later

- Never point local or preview deployments at prod
- Document both sets of env vars in Vercel

## Revisit When

- We need a separate preview database
- We scale to multiple developers or teams
