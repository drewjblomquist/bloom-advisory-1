# ADR-0011: Defer UI Revamp Until After V6

## Status

Accepted

## Context

The current V2 UI is functional enough to support backend iterations (V3–V6), but the visual design is not final. A full design polish now would likely be reworked once data flows, auth, and admin features are implemented.

## Decision

Defer the UI revamp and design canon alignment to a dedicated V6.5 iteration after V6 (Admin Authorization) and before V7/V8 (Admin Read/Edit). Backend iterations proceed first.

## Consequences

- Enables faster progress on data, abuse controls, and auth without UI churn.
- UI polish is concentrated in a single iteration (V6.5) with clear goals.
- V7/V8 depend on a stable UI so admin content editing aligns with the final public layout.

## Alternatives Considered

1. **Revamp now (during V2):**
   - Pros: Earlier polish.
   - Cons: High rework risk once backend/admin features land.

2. **Defer to V10 (Analytics + Polish):**
   - Pros: Keep V3–V9 purely functional.
   - Cons: Admin UX could diverge from public UI; too late to stabilize content editing in V8.

## Revisit Trigger

- If V3–V6 scope expands significantly and blocks UI planning, re-evaluate the V6.5 timing.
