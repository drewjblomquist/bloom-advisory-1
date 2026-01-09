# Architecture Overview

## Components Described

### Front End

#### Main Page

- Logo - Top Left fairly medium sized
- Hero Section - 2 brief paragraphs that can be read as soon as the screen loads
- Service Offerings - 4-6 bubbles describing the type of services offered
- Testimonials Section - Should look like modules or bubbles on the screen
- Admin Button - small button at the bottom right of the page that links to the admin page and its required authentication.
- Contact Button - A button that opens a modal for the user to input their email and leave a comment that gets sent to a `contact_messages` table in Supabase via an API route. Automatically closes when they get done and shows a success message.
- Socials link - Small instagram and twitter icons at the very bottom that auto link to our socials.
- Questionnaire - should be in the middle of the page, have to scroll down a bit to see it, below the hero section service offers.

#### Questionnaire

(Remember all of this section you can add or delete questions in the admin section!)

Create a form with the following fields, styled for clean display on a professional business site:

1. Business Name (text input)
2. Industry (dropdown with options: Retail, Hospitality, Professional Services, Construction, Real Estate, Healthcare, Logistics/Trucking, Manufacturing, Education, Nonprofit, Other [text fill-in])
3. Team Size (dropdown: Just me, 2–10, 11–50, 51–100, 100+)
4. Top 2–3 Daily Tools (text input)
5. Most Time-Consuming Manual Tasks (textarea)
6. Areas Interested in Automating (checkboxes):
    - Processing invoices or purchase orders
    - Managing inventory or supply levels
    - Filing or tagging incoming emails
    - Generating documents or reports
    - Customer service (e.g., auto replies, FAQs)
    - Scheduling or calendar management
    - Social media or marketing content
    - Data entry or spreadsheet cleanup
    - None of these / Not sure yet
7. Current AI Knowledge Level (dropdown):
    - Almost nothing — I need it explained in simple terms
    - I've heard about it but haven't used any tools
    - I've tried a few things (like ChatGPT, Zapier, etc.)
    - I'm already using some AI-powered workflows
8. Openness to Automation (dropdown):
    - Very open — I'm actively looking for help
    - Curious, but not sure how it fits
    - Open, but need someone to guide me
    - Not interested right now
9. Magic Wand Question — What would you fix? (textarea)
10. Anything else to share? (optional textarea)
11. Email (text input)
12. Phone Number (text input)

**Requirements:**

- None of the fields should be required — allow submission even if left blank.
- On form submission, write the data into a Supabase.
- Any field that is blank should be written as `null` to Supabase.
- Show a friendly "Thanks! We'll review your responses soon" message after successful submission.

**Supabase Table Notes:**

- The table should contain columns that exactly match the fields above (e.g., `business_name`, `industry`, `team_size`, `tools`, etc.).
- You can manually create the table and columns in Supabase, or if you're using Prisma or an ORM, create the schema there and push it to Supabase.
- Add a timestamp (`submitted_at`) column that stores the current date/time of submission using `new Date()` in JS or `NOW()` in SQL.

#### Admin Page

- Authentication - User is routed to Clerk sign-in (email magic link). Supabase Auth is not used.
- Layout - There will be sections that are in the same order and look similar to thier respective front ends, but they are editable. There should be a save button directly next to each section and when you leave the admin page that final save is what state it should represent on the main page for that respective section.
- The following front end components should be editable:
    - Hero Section - Should be able to have between 5 and 1000 characters in this box. There should be a save button directly next to it and when you leave the admin page that final state is what should represent on the main page for that respective section.
    - Service Offerings - Should be able to change the wording, change the number of bubble sections. These will be short 1-2 sentece popouts/bubbles.
    - Testimonials - Should be able to add a new testimonial any time. This should present as just a breif title and description. Then able to be clicked on and surfaces a pop up modal in the users face with the details. This is all a V2 add so do not wrry about htis in V1.
    - Questionnaire -
        - Admin adds/removes questions in `questions` tied to an active `questionnaire_version`
        - Submissions write to `submissions` + `answers`
        - Old submissions remain intact because they reference the version

## Routing Model

- Single domain, route-based structure
- Public: `/`
- Admin: `/admin`, `/admin/login`
- Reserved (not built): `/customerportal`, `/redirect`

**Why:** simpler auth, simpler deployment, easier to scale later

## Framework & Hosting

- **Next.js (React-based)** on **Vercel**
- Next.js chosen for SEO, routing, and native Vercel support

**Why:** industry standard, fewer infrastructure decisions, better long-term flexibility

## Deployment Workflow

- GitHub repo is source of truth
- `main` → production
- PRs → preview deployments
- Local dev → development

**Why:** safe iteration, predictable deploys, Cursor-friendly workflow

## Admin Security & Visibility

- Only admins authenticate
- Admin access controlled via Supabase `admin_users` allowlist table keyed by Clerk user id
- Admin routes:
    - Fully protected
    - Not indexed
    - Never accessible when logged out

**Why:** secure by default, editable without code changes

## Errors & Redirects

- Branded 404 for all failures
- No default framework error pages
- Deterministic redirects for auth + canonical domain

**Why:** professional UX and predictable behavior

## Secrets & Environments

- All secrets live in Vercel env vars
- Supabase environments:
    - `dev` project for local and preview deployments
    - `prod` project for production only
- No production database usage in local development
 - See `docs/decisions/ADR-0007-supabase-environment-strategy.md`

**Why:** prevents leaks, keeps previews working, reduces complexity early
