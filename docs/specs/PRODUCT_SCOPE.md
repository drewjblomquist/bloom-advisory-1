# Scope and Non-Goals

## Project Scope

### MVP Scope (Launch Requirements)

- Landing page
- Questionnaire (writes to Supabase cleanly)
- Contact form (writes to Supabase cleanly)
- Admin portal with authentication (email login)
- Ability to view questionnaire submissions
- Ability to edit homepage content (questionnaire editing/versioning deferred to V9)
- Vercel deployment with working domain
- Analytics integration

### Out-of-Scope for MVP (Planned Future Releases)

- Client portal
- External/public API endpoints (internal Next.js API routes are allowed)
- Portfolio/case study modules
- Blog system
- Dynamic routing for multi-page site
- Role-based permissions
- Automated scorecard generation
- Questionnaire editing/versioning

## What We're Doing & Why

We are intentionally designing Bloom Advisors' website with **privacy-first, conservative security practices** that match the product's role as a trust-based consulting platform.

**What we're doing:**

- Allowing **public users** to submit low-sensitivity questionnaire data without creating accounts
- Restricting **all sensitive actions** (content changes, data access) to a **single authenticated admin**
- Storing **user-submitted data in Supabase**
- Handling **analytics separately via Google Analytics**, with no linkage to user data
- Explicitly limiting how data is used, shared, and retained

**Why we're doing it this way:**

- To establish credibility with early clients
- To minimize risk from common early-stage failures (misconfigurations, over-permissioning, human error)
- To avoid over-engineering while still following best practices
- To ensure future developers or tools (e.g. Cursor) do not make assumptions about access, data usage, or security boundaries

This approach prioritizes **clarity, trust, and intentional constraints** over complexity.

## What Must Be Decided *Before* Writing Any Code

These are **non-negotiable planning steps**. Skipping them leads directly to rework, security gaps, or vague implementations.

### 1. Define Access Boundaries

Before coding, you must clearly document:

- What routes/pages are **public**
- What routes/pages are **admin-only**
- What actions are **read-only vs write-enabled**
- That there is **only one admin in V1**

📌 Outcome:

> Cursor should never have to infer who can do what.

### 2. Finalize Data Inventory

Create a simple list of:

- Every data field collected in the questionnaire
- Which fields are optional
- What each field is used for
- Contact form fields (email, message) and their purpose

Example:

- Email → follow-up communication
- Business pain points → internal analysis & case studies (anonymized)

📌 Outcome:

> You can justify every piece of stored data.

### 3. Lock in Data Separation Decisions

Confirm and document:

- Supabase is **only** for business data
- Google Analytics is **only** for traffic and behavior
- No identifiers link GA data to Supabase records

📌 Outcome:

> Analytics cannot accidentally become user-tracking.

### 4. Decide Where Secrets Live

Before coding, decide:

- Where environment variables will be stored (local + deployment)
- Which keys are:
    - Frontend-safe
    - Backend-only
- That no secrets ever live in the repo

📌 Outcome:

> No accidental key exposure or rebuilds later.

### 5. Decide Deletion & Control Rules

Even if you don't build UI for it yet, decide:

- Who can delete data → **admin only**
- Whether deletion is permanent or soft (V1: permanent is fine)
- That users cannot self-delete in V1

📌 Outcome:

> Data lifecycle is intentional, not accidental.

### 6. Set Privacy Expectations in Writing

Before coding, draft:

- A 1-page privacy explanation (plain English)
- Clear form copy explaining:
    - What's collected
    - Why
    - How it's used

📌 Outcome:

> "Privacy-first" becomes a defensible claim, not marketing fluff.

### 7. Define Failure Assumptions

Write down:

- What happens if admin access is compromised
- How you would revoke access
- How secrets would be rotated

You don't need automation — just a stance.

📌 Outcome:

> You can respond calmly if something goes wrong.
