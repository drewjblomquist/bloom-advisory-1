# UI V2 Planning Guide (Source of Truth)

## 1) Purpose + Scope

This document is the single source of truth for planning and implementing the V2 landing page UI. It defines how UI decisions are specified, how agents must interpret them, and how we avoid layout drift. It does not include visual specifics yet.

Scope:
- Public landing page UI only
- Section-by-section implementation
- Tailwind + global CSS variables
- No UI changes in this document; planning only

## 2) Non-Negotiable Constraints

- This guide is authoritative; all V2 UI code must conform to it.
- Styling approach: Tailwind + global CSS variables.
- Implementation discipline: only touch one component + its tests per step.
- Quality bar: must look correct at 375 / 768 / 1024 / 1440 widths.
- Build/refine one section at a time (no one-shot full page).
- Follow `docs/specs/DESIGN_CANON.md` for visual canon; no design invention.

## 3) "No Assumptions" Operating Principle

Agents must not guess. If any decision affects layout, spacing, responsiveness, component ownership, accessibility, behavior, or styling approach, it must be specified here or marked as Decision Needed.

### 3.1 Decision Needed Handling

Checklist for unknowns:
- Pause implementation.
- Add a Decision Needed entry in the Decision Register below.
- Provide at least two options + a default recommendation.
- Do not implement until decision is resolved.

### 3.2 What Agents Must Never Guess

- Section layout structure and container ownership.
- Spacing rules between sections and within sections.
- Typography hierarchy or font sizes.
- Component boundaries and file ownership.
- Responsive behavior at each breakpoint.
- Interaction states, animations, or transitions.
- Accessibility requirements (labels, aria, focus order).
- Which globals may be edited (variables, wrappers, root layout).

### 3.3 Common Assumptions Agents Make (and How This Guide Prevents Them)

1) "Use default Tailwind spacing" → forbidden unless spacing scale is defined.
2) "Hero is a two-column layout" → only allowed if specified in section spec.
3) "Header and logo live in the same component" → ownership must be explicit.
4) "Mobile stacks in the usual order" → order must be stated in responsive rules.
5) "CTA button is primary color" → color tokens must be defined first.
6) "Nav collapses to a hamburger" → interaction rules must be defined.
7) "Use generic max-width container" → container rules must be defined.
8) "Add background changes per section" → prohibited by design canon unless approved.
9) "Add transitions for polish" → motion rules must be specified.
10) "Use system font temporarily" → font selection and fallback must be stated.
11) "Inputs can use glass effects" → explicitly disallowed by design canon.
12) "Global wrapper can be edited to fix layout" → ownership rules must allow it.

## 4) UI Architecture Overview

### 4.1 Page Regions / Sections (in order)

1. Background
2. Header
3. Nav items
4. Hero Section
5. About
6. Services (bubbles)
7. Questionnaire
8. Contact us
9. Footer (socials links)

### 4.2 Responsibilities (per section)

Each section owns:
- Layout structure inside its boundary
- Section-local spacing
- Section-local interaction behavior (if any)
- Section-local accessibility requirements

Each section does not own:
- Global background system
- Global typography tokens
- Global layout wrappers

## 5) Section Spec Template (Required Schema)

Use the following template for each section before any coding:

### Section: [Section Name]

- Goal / intent:
- Layout contract:
  - Containers:
  - Alignment rules:
  - Expected DOM structure (high level):
- Typography hierarchy expectations:
- Spacing system expectations:
- Interaction / behavior:
- Responsiveness rules (375 / 768 / 1024 / 1440):
- Accessibility requirements:
- Allowed files to touch (ownership + blast radius):
- Acceptance criteria checklist:
- Test / verification steps:
- Do not change constraints:
- Decision Needed (if any):

## 6) Implementation Protocol (Cursor/Codex)

Workflow (must follow in order):
1) Update section spec (this guide) with decisions.
2) Implement one component + its tests only.
3) Verify at 375 / 768 / 1024 / 1440.
4) Commit (optional if user requests).

Examples of "one component + its tests per step":
- Header component + header tests only.
- Hero component + hero tests only.
- Footer component + footer tests only.

File ownership map:
- Each page section maps to a single component file.
- Implementation steps may touch:
  - ONE section component
  - + its associated test or verification artifact only
- `app/page.tsx` composes sections; it does not own layout logic.

Verification expectations:
- Visual check at all breakpoints (browser responsive mode).
- Devtools check for layout sizing and overflow.
- Accessibility check for labels and focus order (section scope).

Build order (one feature per commit):
- Background
- Header
- Nav items
- Hero Section
- About (pending spec)
- Services (bubbles)
- Questionnaire
- Contact us
- Footer (socials links)

## 7) Responsiveness & Breakpoint Policy

Canonical breakpoints:
- 375 (mobile)
- 768 (tablet)
- 1024 (small desktop)
- 1440 (large desktop)

Global responsiveness framework:
- Mobile-first always.
- <768px: stacked layout by default.
- >=768px: optional two-column layouts.
- >=1024px: stabilized desktop alignment.
- Content-first ordering on mobile unless section spec overrides it.
- If responsive behavior is ambiguous, pause and add a Decision Needed entry.

At each breakpoint, confirm:
- Layout structure (stacking or columns) is correct.
- Spacing scale matches the section spec.
- Typography scales as specified (no implicit jumps).
- No overflow, clipping, or unexpected wrapping.
- Interactive targets are usable (tap size and spacing).

How to document responsive intent:
- Explicitly list behavior per breakpoint in each section spec.
- Never use "standard responsive behavior" without details.

## 8) Design System Policy (High-Level)

Tailwind usage:
- Use Tailwind utilities for layout and spacing.
- Only use arbitrary values if defined in this guide.
- Use Tailwind standard spacing scale; do not invent new spacing patterns.
- Section vertical padding must use limited, intentional values (e.g. `py-16`, `py-24`).
- Prefer `gap-*` for component internals instead of ad-hoc margins.

Global CSS variables:
- Define design tokens (colors, spacing, typography) as CSS variables.
- Variables must live under `:root` in `app/globals.css` only.
- Single source of truth; no CSS variables may be defined elsewhere unless approved.
- Variables must use category-based naming:
  - Colors: `--color-*`
  - Spacing: `--space-*`
  - Radius (optional): `--radius-*`
- Components may only consume variables, not redefine them.

Global vs component-local:
- Global: tokens, background, typography baseline, container width rules.
- Local: section-specific layout and alignment.

Global container width & ownership:
- Use a shared container pattern that owns:
  - `max-w-7xl`
  - horizontal padding (responsive `px-*`)
- Backgrounds may be full-bleed, but inner content must remain inside the container.
- Sections own vertical spacing only.
- No section may introduce its own `max-w-*` without an explicit update to this guide.

Typography token policy (role-based, non-visual):
- Roles required: H1 (hero headline), H2 (section headers), Body, Small/Meta, Navigation.
- Must follow modern SaaS readability norms.
- Use Tailwind utility bundles documented by role, not raw values.
- Avoid arbitrary font sizing.
- Font family selection is finalized for V2: Inter.

Motion baseline rules (safety vault):
- Motion allowed but minimal and subtle.
- Purpose is affordance only (hover, focus), not attention.
- Allowed: `transition-colors`, `transition-opacity`, `transition-transform`.
- Duration: ~150–200ms.
- No scroll-based animation unless explicitly approved per section.

Proposed V2 Additions:
- Add a small, documented set of layout tokens (container max width, section gap).

## 9) Decision Register (UI)

Decision Needed (must be kept up to date):
- Any unresolved layout, spacing, or responsive rule.
- Any component ownership or file boundary ambiguity.
- Any missing design token beyond the global policies defined here.
- Wire scroll-to-section after section IDs/anchors are finalized.
- Wire header nav "Contact Us" to scroll to Contact section once anchors/IDs are finalized.

Decisions Made:
- Global CSS variables live under `:root` in `app/globals.css` only.
- CSS variable naming: `--color-*`, `--space-*`, optional `--radius-*`.
- Shared container pattern owns `max-w-7xl` + responsive horizontal padding.
- Sections own vertical spacing only; no section-level `max-w-*`.
- Role-based typography tokens: H1, H2, Body, Small/Meta, Navigation.
- Spacing scale uses Tailwind standard scale; constrained section vertical padding.
- Mobile-first responsiveness framework and content-first ordering.
- Motion baseline: minimal affordance-only motion with limited transitions.
- File ownership map locked: one section component + its tests per step.
- Background ownership is global (root-level), not section-level, to guarantee full-page coverage.
- Noise overlay is deferred unless a minimal, low-risk implementation is identified.
- Readability protection uses minimal global overlays/tokens only (no per-section layers).
- Sticky header is required and always on.
- Header background is full-bleed with container-aligned inner content.
- Glass approach: semi-transparent tint + subtle backdrop blur with graceful fallback.
- Bottom edge transition: short gradient fade; optional ultra-subtle shadow if needed.
- Nav active state uses the same glass pill as hover/focus.
- Nav pill shape is a rounded capsule (Apple-like).
- Smooth-scroll section navigation is the intended behavior.
- Mobile plan: hamburger opens a dropdown/panel menu (implementation deferred).
- Nav motion baseline: opacity-only transition (150–200ms, ease-out).
- Nav active state: scrollspy (IntersectionObserver) once section IDs exist.
- Nav submit label decisions: Questionnaire "Submit"; Contact "Send Message".
- Questionnaire "Other" labels: "Other (Optional)" for both multi-selects.
- Mobile nav pattern: hamburger opens a header-attached dropdown panel.
- Anchor IDs scheme (default): `#about`, `#services`, `#questionnaire`, `#contact`.
- Hero alignment: centered.
- Hero copy is locked (exact text).
- Hero motion: none.
- Font: Inter (global typography decision).
- Hero vertical positioning: top-biased below sticky header with generous padding.
- Hero text max-width: constrained to prevent overly long lines on large screens.
- Services grid layout: 2x2 desktop/tablet, 1x4 mobile.
- Services glass style matches nav hover glass.
- Services hover motion: subtle lift + scale.
- Services click behavior: informational only (V2).
- Services text alignment: centered with strong title hierarchy.
- Questionnaire is inline on page as one continuous form; grouped by headings only (no progress indicator).
- Required fields marked with asterisk.
- Input styling: off-white surface, very rounded corners, no glass inputs.
- Validation: inline, neutral professional tone.
- Success behavior: centered toast ~3s with exact text "Thank you for your response."
- Contact is a page section and is reachable via header nav (scroll target later).
- Contact modal close methods: X, backdrop click, Escape.
- Contact inputs match questionnaire; modal container uses glass.
- Contact requiredness: email + message required; phone optional.
- Contact validation: inline; neutral professional tone.
- Contact success: close modal + centered toast ~3s with exact text "Thank you for your response."
- Footer socials centered horizontally.
- Footer socials include only Instagram + X.
- Footer style: subtle circular icon buttons.
- Footer hover motion: subtle lift + scale.
- Footer external link behavior: new tab + safe rel attributes.
- Footer color/contrast: muted default -> high-contrast on hover/focus.
- Footer icons: inline SVGs from official brand marks (no `/design` assets required for V2).

Rule: If ambiguity is found during implementation, update this register before coding.

## 10) Risks & Anti-Patterns (What Went Wrong Last Time)

- Outcome-based prompts without constraints lead to layout drift.
- Touching shared wrappers/globals causes unintended side effects.
- Layering "fixes" without baselines compounds inconsistencies.
- "Make it like X site" without explicit contracts creates guesswork.

## 11) Section Placeholders (Template Applied)

### Section: Background

- Goal / intent:
  - Provide a single global gradient background that covers the entire page reliably at any scroll height and viewport size.
  - Prevent any white/unstyled gaps or visible background seams.
- Layout contract:
  - Ownership: global (site-wide), not section-level.
  - Coverage: background must span full document height and full viewport width at all times.
  - Containers: backgrounds may be full-bleed; all content remains inside the shared container.
  - Alignment rules: none at section level; background does not respond to section layout.
  - Expected DOM structure (high level): applied at the global root (e.g., `html`/`body` or root layout wrapper).
  - Source of truth: V2 baseline gradient in `docs/specs/DESIGN_CANON.md` (135-degree diagonal).
- Typography hierarchy expectations:
  - None (global typography tokens apply; background must not dictate typography).
- Spacing system expectations:
  - None; sections own vertical spacing only.
- Interaction / behavior:
  - Static only; no parallax, no animated gradients, no scroll-based motion.
  - Noise/grain overlay: deferred unless a single, lightweight global layer can be applied safely without perf risk.
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - Background is identical across breakpoints; only content layout changes.
  - Must fill viewport and full document height at every breakpoint.
  - Must not introduce banding, hard edges, or layout-coupled artifacts at any breakpoint.
- Accessibility requirements:
  - Ensure foreground text and interactive elements remain readable over the gradient.
  - Contrast must favor legibility; do not reduce readability for aesthetics.
  - Readability protection strategy: use contrast-safe text colors from tokens; if needed, add a single global overlay/scrim at the root level (not per section).
- Allowed files to touch (ownership + blast radius):
  - `app/globals.css` (background variables and global background styles only).
  - `app/layout.tsx` or root layout wrapper (if needed to apply global background ownership).
  - No section component files for background ownership.
- Acceptance criteria checklist:
  - Background covers entire page with no white gaps at any scroll position.
  - Looks correct at 375 / 768 / 1024 / 1440 widths.
  - No visible seams or banding introduced by implementation.
  - Works in mobile Safari without scroll artifacts.
  - No per-section background overrides.
  - Gradient direction retains 135-degree diagonal vibe.
  - Readability holds without per-section overlays.
- Test / verification steps:
  - Manual scroll from top to bottom on desktop and mobile.
  - Resize checks at 375 / 768 / 1024 / 1440.
  - Mobile Safari check for scroll artifacts and background gaps.
  - Devtools check for background attachment to global root (not section-level).
- Do not change constraints:
  - Background never changes per section.
  - No white gaps at bottom or during scroll.
  - No banding/harsh edges introduced intentionally.
  - Must work on mobile Safari without scroll artifacts.
  - No heavy effects (WebGL, large shaders, multiple layered gradients).
  - No per-section overrides.
  - No animated gradients or parallax.
- Decision Needed (if any):
  - None.


### Section: Nav items

- Goal / intent:
  - Provide clear, right-aligned navigation to core sections.
  - Deliver a restrained glass-pill interaction system for hover/focus/active states.
- Layout contract:
  - Nav group is pinned far right inside the header container.
  - Must not drift toward center at any breakpoint.
  - Order (left-to-right): About, Services, Questionnaire, Contact Us.
  - Expected DOM structure (high level): horizontal nav list aligned to container right.
- Typography hierarchy expectations:
  - Use Navigation role tokens; no bespoke font sizes or weights.
- Spacing system expectations:
  - Modern SaaS spacing between items; slightly tight over overly wide.
  - Desktop nav must not wrap to multiple lines.
  - Padding around text must ensure adequate click targets without altering header height.
- Interaction / behavior:
  - Hover: show liquid-glass rounded pill bubble around item text.
  - Focus (keyboard): visible and closely matches hover styling.
  - Active: same glass pill as hover/focus (persistent for active section).
  - Active state is driven by scrollspy (IntersectionObserver) once section IDs exist.
  - Glass pill style: rounded capsule, semi-transparent surface + subtle blur, legible text.
  - Fallback: tint-only when `backdrop-filter` unsupported.
  - Motion: subtle opacity-only transition (150–200ms, ease-out) to avoid blur jank.
  - Navigation wiring is phased:
    - Phase 1: render items + states; link behavior can be stubbed safely.
    - Phase 2: wire smooth-scroll to sections once anchors exist.
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - Desktop behavior defined as above.
  - Mobile plan: hamburger opens a dropdown/panel menu with the same items and order.
  - Mobile implementation is deferred but intent is locked.
- Accessibility requirements:
  - Keyboard navigable in order: About → Services → Questionnaire → Contact Us.
  - Visible focus indication; must be obvious against gradient and not color-only.
  - Adequate hit target size via padding around text.
  - No low-contrast text; legibility prioritized.
- Allowed files to touch (ownership + blast radius):
  - Single nav items component file + its test/verification artifact only.
  - Header component only if required for composition, not styling.
- Acceptance criteria checklist:
  - Nav group pinned far right inside container; no center drift.
  - Items ordered correctly and do not wrap on desktop.
  - Hover/focus/active show glass pill with legible text.
  - No layout shift when pill appears.
  - Fallback works without blur.
  - Motion is subtle and non-distracting.
  - Works at 375 / 768 / 1024 / 1440 (mobile behavior deferred).
- Test / verification steps:
  - Resize checks at 375 / 768 / 1024 / 1440; confirm no wrapping at desktop widths.
  - Keyboard tab-through to confirm focus visibility and order.
  - Devtools check for `backdrop-filter` fallback.
  - Hover/focus/active state visual check; confirm no layout shift.
- Do not change constraints:
  - Do not center the nav group.
  - Do not let nav items wrap on desktop.
  - Do not use tiny click targets; keep padding around text.
  - Do not use heavy animation or long easing.
  - Do not reduce text contrast for aesthetics.
  - Do not introduce per-item bespoke styling; all items follow same system.
  - Do not introduce new global styles or variables without updating planning docs.
  - Do not break header height/vertical alignment when pill appears.
  - Do not rely on JS for basic hover/focus visuals (CSS preferred).
  - Do not add extra borders/lines that fight the glass look.
- Decision Needed (if any):
  - None.

### Section: Hero Section

- Goal / intent:
  - Establish a clear, calm first impression with a two-line message.
  - Deliver the exact headline/subheadline copy without extra elements.
- Layout contract:
  - Content lives inside the global container (`max-w-7xl`) and is center-aligned.
  - Text block is centered within container with a max-width constraint to prevent overly long lines.
  - Expected DOM structure (high level): section wrapper → container → centered text block.
- Typography hierarchy expectations:
  - Font: Inter (global choice).
  - Headline is dominant over subheadline with a strong, modern SaaS hierarchy.
  - Use role-based typography tokens; do not introduce bespoke sizes.
- Spacing system expectations:
  - Top-biased placement below the sticky header with generous, non-excessive vertical padding.
  - Use section padding values from the approved spacing scale (e.g., `py-16` / `md:py-24`).
  - Provide clear separation from the next section without ad-hoc margins.
- Interaction / behavior:
  - None; hero text is static (no animation or scroll effects).
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - Maintain center alignment and clear hierarchy at all breakpoints.
  - Constrain line length so text does not become too wide on large screens.
  - Acceptable wrapping on small screens must remain readable and centered.
  - Ensure no overlap with the sticky header at any breakpoint.
- Accessibility requirements:
  - High contrast text against the gradient; no low-contrast gray subheadline.
  - Text remains legible at all sizes; hierarchy is clear for readability.
- Allowed files to touch (ownership + blast radius):
  - Single hero component file + its test/verification artifact only.
  - `app/page.tsx` for composition only (no layout logic).
- Acceptance criteria checklist:
  - Headline text: “Don’t know where to start with AI?”
  - Subheadline text: “Welcome to Bloom Advisory.”
  - Center-aligned text block with max-width constraint.
  - Headline remains dominant over subheadline.
  - No motion or scroll effects.
  - No overlap with sticky header.
  - Comfortable spacing above and below hero.
  - Looks correct at 375 / 768 / 1024 / 1440.
- Test / verification steps:
  - Visual check at 375 / 768 / 1024 / 1440 for hierarchy and wrapping.
  - Confirm top offset below sticky header with no overlap.
  - Devtools check for max-width constraint on text block.
- Do not change constraints:
  - Do not add buttons, badges, icons, or extra elements.
  - Do not introduce section-specific background changes.
  - Do not use animated text or scroll effects.
  - Do not vertically center if it harms flow into the next section.
  - Do not use arbitrary font sizes outside role-based tokens.
- Decision Needed (if any):
  - None.

### Section: About

- Goal / intent:
- Layout contract:
  - Containers:
  - Alignment rules:
  - Expected DOM structure (high level):
- Typography hierarchy expectations:
- Spacing system expectations:
- Interaction / behavior:
- Responsiveness rules (375 / 768 / 1024 / 1440):
- Accessibility requirements:
- Allowed files to touch (ownership + blast radius):
- Acceptance criteria checklist:
- Test / verification steps:
- Do not change constraints:
- Decision Needed (if any):

### Section: Services (bubbles)

- Goal / intent:
  - Present four service offerings as the visual focus of the section.
  - Provide a clear, legible, glass-based presentation without interactivity.
- Layout contract:
  - Content lives inside the global container (`max-w-7xl`) and is centered.
  - Desktop (>=1024px): 2x2 grid.
  - Tablet (~768px): 2x2 grid.
  - Mobile (<=375px): stacked vertically (1x4).
  - Grid must remain visually balanced and centered at all breakpoints.
  - Expected DOM structure (high level): section wrapper -> container -> grid -> bubble items.
  - Copy is locked per bubble (title + description):
    - Discovery: "Find where time and money leak"
    - Automation: "Eliminate manual, repetitive work"
    - Integration: "Connect systems that don’t talk"
    - Visibility: "Track performance in real time"
- Typography hierarchy expectations:
  - Title is noticeably larger than description.
  - Both use role-based typography tokens; no bespoke sizes.
  - Text is center-aligned within each bubble.
- Spacing system expectations:
  - Medium bubble size with comfortable breathing room.
  - If tradeoffs are required, err slightly larger rather than smaller.
  - Use standard spacing scale; avoid ad-hoc values.
- Interaction / behavior:
  - Informational only; bubbles are not clickable in V2.
  - Hover (desktop only): subtle lift + scale (very restrained).
  - Motion uses short duration (~150–200ms) and ease-out.
  - No motion on load or scroll.
  - Glass effect must match nav hover glass exactly; fallback to tint-only if blur unsupported.
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - 375: 1x4 stack, centered, no awkward stretching.
  - 768: 2x2 grid, balanced and centered.
  - 1024/1440: 2x2 grid, balanced and centered.
  - Bubbles must not stretch awkwardly or collapse inconsistently.
- Accessibility requirements:
  - Text contrast meets accessibility standards over glass surface.
  - Hover effects must not reduce readability.
  - Motion must not cause layout shift.
- Allowed files to touch (ownership + blast radius):
  - Single services component file + its test/verification artifact only.
  - `app/page.tsx` for composition only (no layout logic).
- Acceptance criteria checklist:
  - Four bubbles rendered with exact copy and order.
  - Grid layout matches breakpoint rules.
  - Bubbles are medium-sized with comfortable spacing.
  - Glass style matches nav hover glass.
  - Hover motion is subtle and does not shift layout.
  - Not clickable; no cursor affordances implying click.
  - Looks correct at 375 / 768 / 1024 / 1440.
- Test / verification steps:
  - Visual check at 375 / 768 / 1024 / 1440 for grid balance.
  - Hover check on desktop for subtle lift/scale without reflow.
  - Devtools check for `backdrop-filter` fallback.
  - Confirm text hierarchy and center alignment inside bubbles.
- Do not change constraints:
  - Do not introduce icons, images, or illustrations in bubbles.
  - Do not vary glass styling per bubble.
  - Do not make bubbles clickable.
  - Do not use heavy shadows or borders that fight the glass effect.
  - Do not allow hover motion to cause layout reflow.
  - Do not use arbitrary spacing or sizing outside the spacing policy.
  - Do not add background changes per bubble or per section.
- Decision Needed (if any):
  - None.

### Section: Questionnaire

- Goal / intent:
  - Convert interested visitors with a low-friction, professional assessment.
  - Collect operational clarity inputs in a single, continuous form.
- Layout contract:
  - Inline section on the landing page (scroll-to anchor).
  - Section title: "Bloom Advisors — Operational Clarity Assessment".
  - Positioning note above the first question: "This short assessment helps us understand where time, money, and clarity are being lost in your operations."
  - Form content is centered inside the global container with a sensible max width to avoid overly wide fields.
  - Inputs use an off-white surface with very rounded corners; no glass styling.
  - Questions (locked, in order):
    - Section heading: "Company Snapshot"
    - 1) Business name (short answer, required)
    - 2) What best describes your company? (dropdown, required)
      - Construction / Homebuilding
      - Real Estate / Property Management
      - Professional Services
      - Manufacturing / Industrial
      - Other
    - 3) Approximately how many full-time employees does your company have? (dropdown, required)
      - 1–5
      - 6–15
      - 16–50
      - 51–200
      - 200+
    - 4) Where do you feel the most operational friction today? (multi-select checkbox list, required)
      - Accounting / AP / Invoicing
      - Procurement / Purchase Orders
      - Reporting & dashboards
      - Data entry or manual admin work
      - Project tracking
      - Customer or vendor communication
      - Other (if selected, show optional text field labeled "Other (Optional)")
    - 5) How are most of these processes handled today? (dropdown, required)
      - Mostly manual
      - A mix of manual work and software
      - Mostly automated
      - Not sure
    - 6) Which tools or systems are most critical to your day-to-day operations? (multi-select checkbox list, optional)
      - QuickBooks or other accounting software
      - Excel or Google Sheets
      - ERP system (e.g. NetSuite, Sage, etc.)
      - Project management software
      - Custom or internal tools
      - Other (if selected, show optional text field labeled "Other (Optional)")
    - 7) How confident are you in the accuracy and consistency of your operational data? (dropdown, required)
      - Very confident
      - Somewhat confident
      - Not very confident
      - Not confident at all
    - 8) If these processes worked better, what would that unlock for your business? (multi-select checkbox list, required)
      - Significant time savings
      - Lower costs or fewer overpayments
      - Better visibility into the business
      - Fewer errors and less rework
      - Ability to scale without adding headcount
      - Peace of mind
    - 9) How urgent is it for you to address these issues? (dropdown, required)
      - Urgent — we need to fix this soon
      - Important, but not urgent
      - Something we want to improve this year
      - Just exploring options
    - 10) Is there anything about your operations that feels especially broken, frustrating, or inefficient right now? (long text, optional)
    - 11) Is there anything else you’d like us to know before we review your responses? (long text, optional)
    - 12) Email address (email, required)
    - 13) Phone number (optional) (phone, optional)
  - Expected DOM structure (high level): section wrapper -> container -> title/note -> grouped form sections -> fields -> submit.
- Typography hierarchy expectations:
  - Font: Inter.
  - Title is the dominant text in the section; positioning note is secondary.
  - Field labels and helper/error text follow role-based tokens; no bespoke sizes.
- Spacing system expectations:
  - Comfortable modern SaaS spacing between groups and fields.
  - Use approved spacing scale; avoid ad-hoc values.
  - Reserve space for errors to avoid layout shift.
- Interaction / behavior:
  - Single continuous form; grouped by headings only (no progress UI).
  - Required fields marked with an asterisk (*).
  - Inline validation on blur/interaction; neutral, professional tone.
  - Email validates format; phone is optional and validates only if provided.
  - Submit button label: "Submit".
  - Success behavior: centered toast for ~3 seconds with exact text "Thank you for your response."
  - Toast is accessible, does not trap focus, and may be dismissible early.
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - Desktop/tablet: fields comfortably readable with max-width constraint; no overly wide inputs.
  - Mobile (375): fields stack full-width; large tap targets; comfortable spacing.
  - No horizontal scrolling at any breakpoint.
- Accessibility requirements:
  - Labels always visible (no placeholder-only labels).
  - Full keyboard navigation with clear focus states.
  - Requiredness indicated accessibly (asterisk + semantics).
  - Errors provide text and accessible attributes; not color-only.
  - High contrast text for labels, inputs, and errors.
- Allowed files to touch (ownership + blast radius):
  - Single questionnaire component file + its test/verification artifact only.
  - `app/page.tsx` for composition only (no layout logic).
  - Shared input component file only if it already exists and is the single owner for form fields.
- Acceptance criteria checklist:
  - Title and positioning note are exact and above the first question.
  - Form is inline, single continuous flow with section headings only.
  - Required fields marked with asterisk.
  - Off-white, very rounded input styling; no glass inputs.
  - Inline validation for required/email/phone behaviors.
  - Success toast appears centered with exact text and ~3s duration.
  - No layout shift when errors appear.
  - Works at 375 / 768 / 1024 / 1440 with no horizontal scroll.
  - All questions, types, options, and requiredness match spec.
- Test / verification steps:
  - Visual check at 375 / 768 / 1024 / 1440 for layout and max-width.
  - Keyboard navigation through all fields and submit.
  - Trigger validation errors for required, email, and optional phone.
  - Confirm "Other" selections reveal optional text field.
  - Submit and verify toast text, duration, and accessibility.
- Do not change constraints:
  - Do not apply liquid-glass styling to input fields.
  - Do not remove labels in favor of placeholders only.
  - Do not hide requiredness; must be clearly marked with *.
  - Do not introduce multi-step/progress UI.
  - Do not add trust copy beyond the single positioning sentence.
  - Do not introduce animations beyond the success toast.
  - Do not allow layout shift when errors appear.
  - Do not add icons or decorative elements to inputs.
  - Do not add section-specific backgrounds.
- Decision Needed (if any):
  - None.

### Section: Contact us

- Goal / intent:
  - Provide a lightweight contact capture path with a single modal form.
- Layout contract:
  - Contact is a dedicated page section (scroll target).
  - Section contains a single "Contact Us" button that opens a modal.
  - Modal container uses restrained liquid-glass surface (rectangular card).
  - Inputs match Questionnaire styling: off-white surface, very rounded corners, no glass.
  - Expected DOM structure (high level): section wrapper -> container -> button -> modal (glass card) -> form fields.
- Typography hierarchy expectations:
  - Font: Inter.
  - Clear labels and helper/error text using role-based tokens.
- Spacing system expectations:
  - Comfortable modern SaaS spacing within the modal.
  - Use approved spacing scale; avoid ad-hoc values.
  - Reserve space for errors to avoid layout shift.
- Interaction / behavior:
  - Clicking "Contact Us" opens modal.
  - Modal closes via X button, backdrop click, or Escape key.
  - Inline validation on blur/interaction; neutral, professional tone.
  - Required: email + message. Optional: phone.
  - Email validates format; phone validates only if provided.
  - Submit button label: "Send Message".
  - On success: close modal, then show centered toast for ~3 seconds with exact text "Thank you for your response."
  - Use the same toast style/pattern as Questionnaire for consistency.
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - 375: modal near full-screen/full-screen with padding; fields stack and are easy to tap.
  - 768/1024/1440: centered modal with sensible max width; not overly wide.
  - No horizontal scrolling at any breakpoint.
- Accessibility requirements:
  - Keyboard navigable with logical Tab order.
  - Visible focus states for all interactive elements.
  - Escape closes modal; backdrop click closes modal.
  - Labels always visible; no placeholder-only labels.
  - Errors include text and accessible attributes; not color-only.
- Allowed files to touch (ownership + blast radius):
  - Single contact component file + its test/verification artifact only.
  - `app/page.tsx` for composition only (no layout logic).
  - Shared modal/toast component only if it already exists and is the single owner.
- Acceptance criteria checklist:
  - Contact section exists with a single "Contact Us" button.
  - Modal opens/closes via X, backdrop, and Escape.
  - Modal uses glass container; inputs match Questionnaire (off-white, very rounded).
  - Required fields: email + message; phone optional.
  - Inline validation for required/email/phone behavior.
  - Success closes modal and shows centered toast with exact text for ~3s.
  - Works at 375 / 768 / 1024 / 1440 with no horizontal scroll.
- Test / verification steps:
  - Click open/close via X, backdrop, Escape.
  - Keyboard navigation through fields and controls.
  - Trigger validation errors; confirm no layout shift.
  - Mobile check: modal sizing and tap targets at 375.
  - Submit and verify toast text/duration after modal closes.
- Do not change constraints:
  - Do not apply glass styling to input fields.
  - Do not require phone number.
  - Do not remove outside-click or Escape close behavior.
  - Do not add extra fields beyond the 3 specified.
  - Do not add multi-step flow.
  - Do not add heavy animation or libraries for modal/glass.
  - Do not allow layout shift when validation errors appear.
  - Do not allow modal to be unusable on mobile.
  - Do not introduce visual patterns that diverge from Questionnaire inputs or Glass system.
- Decision Needed (if any):
  - None.

### Section: Footer (socials links)

- Goal / intent:
  - Provide clean, restrained outbound links to Bloom Advisory social profiles.
- Layout contract:
  - Footer contains only two icons: Instagram and X.
  - Links (exact):
    - X: https://x.com/bloomadvisoryai?s=21
    - Instagram: https://www.instagram.com/bloomadvisory.ai/
  - Icons are centered horizontally in a single row.
  - Even spacing between icons; aligned and visually balanced.
  - Each icon sits inside a subtle circular button (no heavy decoration).
  - Expected DOM structure (high level): footer wrapper -> container -> centered icon row -> icon links.
- Typography hierarchy expectations:
  - None (icons only).
- Spacing system expectations:
  - Comfortable spacing between icon buttons; use approved spacing scale.
  - Tap target size must be large enough on mobile without oversized visuals.
- Interaction / behavior:
  - Hover: subtle lift/scale + slight opacity/brightness shift.
  - Duration ~150–200ms, ease-out.
  - Focus state visible and not color-only.
  - Links open in a new tab with safe rel attributes.
  - No tracking or extra behaviors in V2.
- Responsiveness rules (375 / 768 / 1024 / 1440):
  - Layout remains centered and single-row at all breakpoints.
  - No wrapping or misalignment; no horizontal scroll.
  - Tap targets remain large and usable at 375.
- Accessibility requirements:
  - Each icon link has an accessible label (`aria-label`).
  - Keyboard focusable with visible focus style.
  - Contrast meets accessibility standards in default and hover/focus states.
  - Icon source: inline SVGs derived from official brand marks (no /design assets required for V2).
- Allowed files to touch (ownership + blast radius):
  - Single footer component file + its test/verification artifact only.
  - `app/page.tsx` for composition only (no layout logic).
- Acceptance criteria checklist:
  - Only Instagram + X icons rendered.
  - Links point to exact destinations.
  - Icons centered and evenly spaced in a single row.
  - Subtle circular button styling; no heavy glass effects.
  - Hover/focus state visible; motion is subtle.
  - Opens links in new tab with safe rel attributes.
  - Works at 375 / 768 / 1024 / 1440.
- Test / verification steps:
  - Keyboard focus check for visible focus style.
  - Hover check for subtle lift/scale and opacity change.
  - Mobile tap target check at 375.
  - Verify external link behavior and rel attributes.
- Do not change constraints:
  - Do not add other social platforms.
  - Do not use heavy glass effects.
  - Do not hide icons behind hover-only visibility.
  - Do not use low-contrast muted icons that are hard to see.
  - Do not add long animations or distracting motion.
  - Do not open links in the same tab.
  - Do not remove accessible labels or focus styles.
- Decision Needed (if any):
  - None.

## 12) Next Steps

We will fill section specs one at a time via future prompts. No implementation starts until the relevant section spec is fully defined and all Decision Needed items for that section are resolved.
