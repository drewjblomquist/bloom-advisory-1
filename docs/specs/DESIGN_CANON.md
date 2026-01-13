# Design: Visual Canon

## Visual Design Canon (Source of Truth)

This section defines the **non-negotiable visual rules** for the website**.

Cursor must **implement**, not design. Any ambiguity must default to **simplicity and restraint**.

## Global Visual Direction

- Visual tone: **Professional, calm, modern**
- Style priority (highest → lowest):
    1. Modern SaaS clarity
    2. Editorial / brand-forward restraint
    3. Subtle Apple-inspired polish
- The site must **never** feel flashy, crowded, playful, or generic.

## Background System

### Global Background

- A **single, subtle gradient** is used across:
    - Public-facing site
    - Admin page
- The background **does not change per section**.
- No section-level background colors unless explicitly defined later.
- V2 baseline is a 135° diagonal gradient (see below).

### V2 Baseline Gradient (Authoritative)

This diagonal gradient defines the V2 baseline and may be lightly refined for readability, but **not replaced**.

```css
linear-gradient(
  135deg,
  hsla(233, 100%, 21%, 1) 0%,
  hsla(116, 100%, 21%, 1) 51%,
  hsla(233, 100%, 21%, 1) 100%
);
```

Rules:

- 135° diagonal vibe must remain consistent
- Minor color-stop tweaks are allowed for readability
- No additional gradients may be introduced without PRD updates

### Previous Baseline (Deprecated for V2)

The following radial gradient is deprecated for V2 and should not be used unless explicitly re-approved.

```css
radial-gradient(
  circle,
  rgba(5,166,10,1) 0%,
  rgba(12,26,133,1) 100%
);
```

### Texture

- A **very subtle noise/grain texture** may be layered globally
- Opacity must remain low (≈3–6%)
- Texture is used to reduce flatness, not to be visually noticeable
- Use only if implementation is simple and low-risk; otherwise defer

### Background Constraints (V2)

- Background never changes per section
- No white gaps at bottom or during scroll
- No banding or harsh edges introduced intentionally
- Must work on mobile Safari without scroll artifacts
- No heavy effects (WebGL, large shaders, multiple layered gradients)
- No per-section overrides
- No animated gradients or parallax
- Keep performance stable; no large image assets for background

## Color & Contrast

- Dark-first design only (no light mode in V1)
- Text contrast must always favor **legibility over aesthetics**
- No low-contrast "designer gray" text
- Accent colors must be derived from the background palette

## Typography

### Font Characteristics

- Sans-serif
- Blocky, clean, geometric
- No cursive, handwritten, or decorative fonts
- Must convey professionalism and clarity

### Typography Rules

- Strong hierarchy (clear difference between headings and body)
- Limited font weights (avoid excessive variation)
- Large enough body text for easy reading
- Typography must never feel playful or experimental

(Font selection finalized for V2: Inter.)

## Glass / Translucency System ("Liquid Glass")

### Purpose

Used selectively to add depth and polish without harming readability.

### Allowed Usage

- Buttons
- Modals
- Word bubbles / message containers
- Header surface (restrained liquid-glass treatment)
- Header/nav glass pill for hover/focus/active (restrained, legible)
- Service bubbles use the same liquid glass system as nav items
- Footer icon buttons should remain restrained; avoid heavy glass
- Footer social icons may use inline SVGs from official brand marks when `/design` assets are not present

### Explicitly Disallowed

- Form input fields
- Long text containers
- Primary content areas

### Implementation Constraints

- CSS-only (no WebGL or heavy effects in V1)
- Uses translucency + blur (e.g. `backdrop-filter`)
- Must degrade gracefully if unsupported
- Must not reduce text legibility
- No hard divider line at header bottom; use a soft fade if separation is needed

Glass effects must feel **intentional and restrained**, not decorative.

## Motion & Interaction

### Motion Level (V1)

- Low to moderate (2–3 out of 5)
- Motion should signal quality, not draw attention

### Scroll Behavior

- V2 default: no scroll-based animation unless explicitly approved per section spec
- Animation style: **immediate and snappy**
- No long easing or dramatic transitions

### Explicit Constraints

- No background animations in V1
- No parallax
- No autoplay motion
- Motion must never distract from content clarity

## Layout & Structure Constraints (Anti-Patterns)

The following must be explicitly avoided:

- "Vibe-coded" SaaS layouts
- Excessive stacked cards
- Default Tailwind spacing patterns
- Boxed or over-bordered sections
- Decorative dividers used instead of whitespace
- Anything that feels generic, templated, or overdesigned

Whitespace is preferred over decoration.

## Asset Usage

- Visual references and assets must live in-repo:
    
    ```
    /design
      /references
      /gradients
      /notes
    
    ```
    
- Cursor must reference these assets directly
- No stock visuals or invented patterns unless specified

## Background / Visual Design

## Why These Decisions Were Made

- A single global gradient ensures **visual cohesion and restraint**
- Dark-first design reinforces **professionalism and focus**
- Limited motion communicates **technical competence without gimmicks**
- Selective glass usage adds polish while preserving clarity
- Strong typography and whitespace prevent a generic SaaS feel
- Explicit constraints prevent "vibe coding" and stylistic drift

The goal is **clarity first, polish second, experimentation later**.

## What Must Be Done Before Coding Begins

1. Create the `/design` folder inside the repo
2. Add:
    - Inspiration screenshots
    - Gradient references (CSS snippets or images)
    - A short visual notes file (if needed)
3. Finalize:
    - Primary font choice
    - Final baseline gradient (or confirm current reference)
4. Confirm motion scope (fade-in only, no background animation)
5. Lock this PRD section as the **design source of truth**
6. Instruct Cursor:
    - "Implement exactly what is defined here"
    - "Do not invent visual style"

Only after these steps are complete should UI implementation begin.

## Cursor Operating Instructions – Backgrounds & Favicon

You are NOT allowed to invent or assume visual design.

All background images and favicon assets must be sourced exclusively from the `/design` directory.

Vision - We are looking for a quality, clean, minimilist type of layout. It should not look like a generic AI generated website.

### Backgrounds

- Only use assets from `/design/backgrounds/approved`
- Backgrounds are secondary to content
- Always apply an overlay or gradient if text is present
- Do not hardcode image paths without checking this folder
- If no approved background exists, default to a CSS gradient (no image background)
- See `docs/decisions/ADR-0009-design-asset-fallback.md`.

### Favicon

If no approved favicon exists in `/design/favicon/exports`, do not add a custom favicon yet. Use the browser default until an approved asset is added. See `docs/decisions/ADR-0009-design-asset-fallback.md`.
- Use only files from `/design/favicon/exports`
- Prefer SVG when supported
- Ensure compatibility with dark and light browser themes

### Design Philosophy

- Minimal, professional, and trust-focused
- No decorative clutter
- No stock-photo-style imagery
- Visuals must never distract from copy or forms

### Decision Logging

If a visual decision is required and no approved asset exists:

1. Pause implementation
2. Leave a note in `/design/DESIGN-NOTES.md`
3. Explain what asset is missing and why it's needed
4. Do NOT create placeholder visuals without explicit instruction
