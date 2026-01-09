# ADR-0002: Database - V1 Simple Submissions, Then Versioned Model

**Date:** 2024-12-XX
**Status:** accepted

## Context

We need to store questionnaire submissions. Two approaches were considered: (1) build the full versioned model immediately, or (2) start with a simple single-table approach and migrate to versioned model later.

## Options Considered

1. **Full versioned model from V1**
   - Implement `questionnaire_versions`, `questions`, `submissions`, `answers` tables immediately
   - Supports question changes without breaking historical data
   - More complex schema, RLS, and admin UI from the start

2. **Simple table first, then versioned (chosen)**
   - Start with `questionnaire_submissions_v1` table matching form fields
   - Migrate to versioned model in V9 after core functionality is stable
   - Simpler initial implementation, less debugging surface area

3. **Never version (not considered)**
   - Single table forever, accept that question changes break historical context

## Decision

Start with a **simple single-table approach** (`questionnaire_submissions_v1`) in V3, then migrate to the full versioned model in V9.

## Rationale

- **Reduces complexity** in early iterations when we're proving deployment, auth, and basic data flow
- **Faster to ship** a working lead capture pipeline
- **Less debugging surface area** while establishing core patterns
- **Professional approach**: ship simple, correct data pipeline first, then evolve it
- **Migration path is clear**: keep legacy table, mark as legacy, start writing to new tables

## Consequences

### What this enables

- Faster V3 completion (prove data pipeline works)
- Simpler RLS policies initially
- Less admin UI complexity in early iterations
- Clear migration path in V9

### What this limits

- Cannot change questions without losing historical context (until V9)
- Legacy table will exist alongside new tables after migration
- One-time migration effort required in V9

### What we must remember later

- Keep `questionnaire_submissions_v1` as legacy (do not delete)
- Mark it as legacy in V9
- Start writing new submissions to versioned tables after cutover
- Optionally write migration script to move legacy data (not required)

## Revisit When

- Need to change questions before V9
- Legacy table becomes a maintenance burden
- Need to query across both legacy and versioned submissions
