# Design Notes

## Active direction — 2026-09-05 public UI refresh

User authorized a full modern redesign. Use a single quiet ink/forest diagonal
gradient, warm off-white text, pale green actions, Inter, and an editorial layout.
The original logo and official social marks remain; no new imagery is required.

- Header: compact logo and four public links; admin access moves to the footer.
- Hero: left-aligned headline and assessment CTA; three concise approach steps
  on the right. Stack below 768px.
- About: split heading and copy, stacked on mobile.
- Services: four open columns, two below 1024px, one below 421px.
- Assessment: persistent introduction beside a continuous grouped form on
  desktop; single column below 768px. Preserve questions, options, payload,
  validation, and success behavior. Use opaque, full-width inputs.
- Contact: high-contrast dialog, scrollable within short viewports.
- Footer: brand, existing social links, and admin access.
- Restrained hover states, visible keyboard focus, reduced-motion support.

This direction supersedes historical V2 visual specifications, including exact
hero copy, centered boxed sections, pill-shaped fields, and the saturated
gradient. It does not change backend or data requirements.

Verification: desktop/mobile screenshots checked; no horizontal overflow at
375, 768, 1024, or 1440px. Local lint, TypeScript, and production build pass;
Vercel Preview builds and serves HTTP 200. Axe reports zero violations (gradient
contrast requires manual evaluation; muted text exceeds 8:1 against the
lightest background stop). Contact validation and Escape focus restoration
pass. Both forms show success and reset with controlled browser API responses;
this UI-only check adds no database rows. Backend logic is unchanged from V3.

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

### Decision: 2026-09-30 - Quieter Supporting Copy and Brighter Backdrop

**Context:** Drew asked to remove the short supporting line from Services and
the footer tagline, and to make the overall site feel slightly lighter.

**Decision:** Remove both copy blocks while keeping the service heading and
footer logo/social links. Increase landscape visibility and reduce the global
ink/forest overlay slightly on desktop and mobile, retaining the existing
dark-first palette and contrast hierarchy.

### Decision: 2026-09-30 - Refined Questionnaire Controls

**Context:** Drew requested that the questionnaire move away from the harsh
square fields and browser-default dropdown presentation, with Apple-inspired
restraint and polish.

**Decision:** Questionnaire fields use opaque warm off-white surfaces with
medium-radius corners, quiet borders, subtle depth, and focused accent rings.
Select fields use a themed, keyboard-accessible menu so their open and closed
states share the same visual language. Choice rows retain the continuous form
structure while their checkboxes receive softer geometry and clearer states.

**Implementation Notes:** This user-directed update supersedes the September 24
square-control geometry for questionnaire controls only. No payload, validation,
requiredness, or submission behavior changes.

### Decision: 2026-09-24 - Bloom Advisory Logo

**Context:** Drew supplied a new stacked Bloom Advisory wordmark for the public
site, replacing the previous single-line serif asset.

**Decision:** Retain the supplied raster as the approved source at
`design/logos/approved/bloom-advisory-logo-source.png` and serve a cropped
web-ready version from `public/images/brand/bloom-advisory.png`. On the dark
site background, CSS blending preserves the wordmark while making its supplied
light background visually transparent.

**Implementation Notes:** The mark appears in the header and footer. It is
kept compact to preserve header rhythm and uses the original proportions. A
future vector/transparent export can replace the CSS blend without changing
component structure.

---

### Decision: 2026-09-24 - Logo-Only Hero

**Context:** Drew removed the hero headline, explanatory copy, CTA, and
approach rail because they added no value to the first impression.

**Decision:** Center the Bloom Advisory mark as the sole hero content. The
logo scales fluidly with the viewport while preserving the existing navigation,
global background, and page structure.

---

### Decision: 2026-09-24 - Two-Font Editorial System

**Context:** Drew established a strict editorial type system: Bloom’s serif
voice should carry expressive ideas, while a neutral humanist sans should carry
information and UI.

**Decision:** Use Cormorant Garamond for all major editorial headings and
statements, and Inter for navigation, buttons, labels, form controls, body
copy, service descriptions, and admin UI. Global scale, leading, and tracking
tokens provide the shared type hierarchy; no third web font is loaded.

---

### Decision: 2026-09-24 - Lighter Background Overlay

**Context:** Drew requested more visibility for the approved landscape beneath
the ink/forest overlay.

**Decision:** Reduce the overlay opacity slightly across desktop and mobile,
while retaining the contrast needed by the remaining navigation, forms, and
body copy.

---

### Decision: 2026-09-24 - Subtle Oil Landscape Background

**Context:** Drew supplied a mountain-valley photograph and requested a subtle
oil-on-canvas treatment that would add warmth and character without competing
with foreground content.

**Decision:** Use the approved generated landscape in
`design/backgrounds/approved/bloom-mountain-oil.png`. The production WebP is
placed beneath the existing ink/forest diagonal gradient at low visual
intensity. The gradient remains the primary contrast layer; the painting acts
as atmosphere rather than illustration.

**Implementation Notes:** The source composition is preserved, with muted
ochre, moss, slate, and blue-gray color; restrained canvas tooth; simplified
brushwork; and no people, text, or invented structures. Mobile uses a darker
overlay and adjusted crop. The generated PNG is retained as the approved
source and a compressed WebP is served by the site.

**Revisit When:** Foreground typography, page length, or the global palette
changes enough to require a new crop or contrast treatment.

---

### Decision: 2026-09-24 - Constraint-Led Editorial Composition

**Context:** The public landing page had accumulated individually reasonable
labels, links, lines, and small UI treatments that competed for attention. The
saved design research from Matt Dailey recommends designing the whole system,
exploring constraints before spot fixes, and removing unnecessary elements.

**Decision:** Use a quiet editorial composition led by typography, proportion,
alignment, and negative space. Each viewport has one dominant idea, one
supporting group, and one primary action. Repeated CTAs and decorative labels
are removed before new visual treatments are considered. Controls share square,
precise geometry and services/forms use continuous rules instead of card grids.

**Implementation Notes:** Preserve the single ink/forest gradient, Inter,
warm off-white text, pale green accent, approved logo, form behavior, and low
motion. The hero is reduced to one CTA and one three-step rail; services become
a two-column editorial index; assessment choices become ruled rows rather than
boxed cards.

**Revisit When:** Real client photography, case studies, or a broader identity
system is approved in `/design`.

---

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
