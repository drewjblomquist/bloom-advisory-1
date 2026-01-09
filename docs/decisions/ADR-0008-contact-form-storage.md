# ADR-0008: Contact Form Storage in Supabase

**Date:** 2025-01-08
**Status:** accepted

## Context

The public contact modal collects an email and message. We must decide where this data lives and how it is stored.

## Options Considered

1. **Store in Supabase `contact_messages` table (chosen)**
   - Consistent with other public submissions
   - Admin visibility in the same system of record

2. **Email-only delivery (no DB)**
   - Simpler, but no centralized record

3. **Defer contact submission**
   - Avoids DB work but reduces lead capture

## Decision

Store contact form submissions in a dedicated Supabase table: `contact_messages`.

## Rationale

- Keeps lead capture centralized
- Aligns with privacy-first data handling
- Enables future admin views without rework

## Consequences

### What this enables

- Consistent public submission pipeline
- Simple admin follow-up workflows later

### What this limits

- Requires RLS insert-only policy
- Requires API route for submission

### What we must remember later

- No public reads of contact messages
- No PII in logs

## Revisit When

- We add email automation
- We add a CRM integration
