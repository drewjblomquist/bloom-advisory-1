# Design Notes

## Purpose

This file documents visual design decisions, missing assets, and design-related questions that arise during development. Cursor must update this file when visual decisions are required and no approved asset exists.

## Design Philosophy

- Minimal, professional, and trust-focused
- No decorative clutter
- No stock-photo-style imagery
- Visuals must never distract from copy or forms

## Asset Requirements

### Backgrounds

- All background images must come from `/design/backgrounds/approved`
- If no approved background exists, default to solid color or CSS gradient
- Never hardcode image paths without checking this folder
- Always apply overlay or gradient if text is present

### Favicon

- Use only files from `/design/favicon/exports`
- Prefer SVG when supported
- Ensure compatibility with dark and light browser themes

## Current Design Canon

See `docs/specs/DESIGN_CANON.md` for complete design specifications.

### Key Constraints

- Single global gradient (radial-gradient with specified colors)
- Dark-first design only
- Low to moderate motion (2-3 out of 5)
- Glass effects only on buttons, modals, word bubbles
- No background animations in V1
- Strong typography hierarchy
- Whitespace preferred over decoration

## Missing Assets

*This section will be updated as development progresses. If a visual decision is required and no approved asset exists, document it here.*

### Pending Decisions

*(None yet - will be added as needed)*

## Design Decisions Log

### Decision: 2025-01-08 - Gradient-Only Background + No Custom Favicon Until Assets Exist

**Context:** V2 UI work requires a background and favicon, but `/design/backgrounds/approved` and `/design/favicon/exports` are empty.

**Decision:** Use the PRD-defined CSS gradient only (no image background). Do not add a custom favicon until an approved asset is added.

**Rationale:** Honors the "no invented visuals" rule while allowing the site to render with the approved gradient.

**Implementation Notes:** Default to CSS gradient background and omit custom favicon links until assets are provided.

**Revisit When:** Approved background or favicon assets are added to `/design`.

---

## Notes for Cursor

When implementing visual design:

1. **Check this file first** for any pending decisions or missing assets
2. **Reference approved assets** in `/design/backgrounds/approved` and `/design/favicon/exports`
3. **Follow design canon** in `docs/specs/DESIGN_CANON.md`
4. **Do not invent** visual style - implement exactly what is defined
5. **Document decisions** here if a visual choice is required and no guidance exists
6. **Pause implementation** if an asset is missing and document it here

## Asset Checklist

Before implementing any visual component, verify:

- [ ] Background image exists in `/design/backgrounds/approved` (if using image)
- [ ] Favicon exists in `/design/favicon/exports` (if using favicon)
- [ ] Design matches canon in `docs/specs/DESIGN_CANON.md`
- [ ] No placeholder visuals created without explicit instruction
- [ ] Missing assets documented in this file
