# ADR-0009: Design Asset Fallback (Gradient-Only, No Custom Favicon)

**Date:** 2025-01-08
**Status:** accepted

## Context

The design canon requires approved assets under `/design`, but no approved backgrounds or favicons exist yet. V2 requires a usable UI without invented assets.

## Options Considered

1. **Block V2 until assets exist**
   - Strict but slows progress

2. **Allow CSS gradient only and no custom favicon (chosen)**
   - Honors no-invented-assets rule
   - Keeps UI work unblocked

3. **Use temporary placeholder assets**
   - Violates the design canon

## Decision

Use the PRD-defined CSS gradient only and **do not add a custom favicon** until approved assets are added.

## Rationale

- Maintains fidelity to the design canon
- Avoids invented visuals
- Allows progress on UI structure

## Consequences

### What this enables

- V2 UI work can proceed safely

### What this limits

- No image backgrounds or favicon until assets exist

### What we must remember later

- Add approved assets to `/design/backgrounds/approved` and `/design/favicon/exports`
- Update design notes when assets are added

## Revisit When

- Approved assets are provided
