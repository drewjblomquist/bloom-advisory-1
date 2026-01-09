# ADR-0004: Abuse Controls - Lightweight V1 Approach

**Date:** 2024-12-XX
**Status:** accepted

## Context

Public questionnaire submission endpoint needs protection from spam and abuse. Need to decide on approach and scope for V1.

## Options Considered

1. **No abuse controls in V1**
   - Ship fast, add later
   - Risk: dataset polluted with spam immediately

2. **Lightweight controls (chosen)**
   - Rate limiting / throttling per IP/session
   - Bot check (CAPTCHA or Turnstile)
   - Server-side validation
   - Log rejections

3. **Advanced spam detection**
   - ML-based spam scoring
   - User reputation systems
   - Automated blocking workflows
   - Real-time alerting

## Decision

Implement **lightweight abuse controls** in V4 (early, before going further).

## Rationale

- **Prevents dataset pollution** before it becomes a problem
- **Lightweight enough** to not block V1 launch
- **Server-side enforcement** (not just frontend)
- **Privacy-aligned**: prefer anonymous/behavioral signals over identity tracking
- **Professional approach**: abuse prevention is a core security concern, not optional

## Consequences

### What this enables

- Protected public endpoints from day one
- Clean dataset for analysis
- Reduced operational noise from spam
- Foundation for more advanced controls later

### What this limits

- May block some legitimate users (rate limits)
- CAPTCHA may reduce conversion slightly
- Not as sophisticated as ML-based systems

### What we must remember later

- Abuse controls must be server-side (not just frontend)
- Log rejections without logging PII
- Admin should be able to identify suspicious submissions
- Can manually delete abusive entries
- Consider more advanced controls in future iterations

## Revisit When

- Spam becomes a significant problem despite controls
- Need automated spam classification
- Need user-level reputation systems
- Need real-time alerting for abuse patterns
