# Checklist: Outside-of-Code Tasks

## Purpose

This checklist covers all tasks that must be completed **outside of the codebase** before or during development. These are infrastructure, service configuration, and setup tasks.

**Hard rule:** If a required item is incomplete, stop the iteration and do not proceed.

## Pre-Development Setup

### Domain & DNS (Namecheap)

- [ ] Domain purchased and accessible in Namecheap (Done)
- [ ] Access to Namecheap DNS settings confirmed (Done)
- [ ] Domain added to Vercel project (Done)
- [ ] Vercel-provided DNS records copied (Done)
- [ ] DNS records added to Namecheap (Done)
- [ ] Conflicting DNS records removed (Done)
- [ ] Domain ownership verified in Vercel (Done)
- [ ] HTTPS/SSL certificate active (Done)
- [ ] Canonical redirects working:
  - [ ] `http://bloomadvisory.ai` → `https://bloomadvisory.ai` (301)
  - [ ] `https://www.bloomadvisory.ai` → `https://bloomadvisory.ai` (301) if www configured

### Vercel Setup

- [ ] Vercel account created (Done)
- [ ] Vercel project created (Done)
- [ ] GitHub repository connected to Vercel (Done)
- [ ] Production branch set to `main` (Done)
- [x] Preview deployments enabled
- [x] Build settings configured (Next.js, Node.js 24.x)
- [x] V3 environment variables documented

### Environment Variables

- [x] Supabase dev and production projects created
- [x] V3 Supabase public values obtained:
  - [x] `NEXT_PUBLIC_SUPABASE_URL`
  - [x] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - [ ] `SUPABASE_SECRET_KEY` (server-only)
- [ ] Clerk application created
- [ ] Clerk keys obtained:
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - [ ] `CLERK_SECRET_KEY`
- [ ] Turnstile keys obtained (V4):
  - [ ] `TURNSTILE_SITE_KEY`
  - [ ] `TURNSTILE_SECRET_KEY`
- [x] V3 environment variables added to Vercel:
  - [x] Production environment uses production Supabase
  - [x] Preview environment uses development Supabase
  - [x] Development environment uses development Supabase
- [x] Local `.env.local` created with development Supabase public values

### Privacy + Data Inventory

- [ ] Data inventory completed (questionnaire + contact fields and purpose)
- [ ] Public form copy drafted (what data is collected, why, how it is used)
- [ ] Lightweight privacy policy draft exists
- [ ] Incident response runbook reviewed (`docs/playbooks/INCIDENT_RESPONSE.md`)

### Supabase (Infra)

- [x] Supabase project created
- [x] Separate Supabase projects created:
  - [x] `dev` for local + preview
  - [x] `prod` for production only
- [x] Database schema created (appropriate for current iteration)
- [x] RLS policies configured
- [ ] Admin allowlist table created (`admin_users`)
- [ ] Initial admin user added to `admin_users` table (after V5)
- [x] Supabase Auth is **not** configured or used by the application

### Clerk Setup

- [ ] Clerk application created
- [ ] Authentication methods configured (Email Magic Link)
- [ ] Public sign-ups disabled (invite-only)
- [ ] Redirect URLs configured:
  - [ ] `http://localhost:3000`
  - [ ] `https://bloomadvisory.ai`
  - [ ] `https://*.vercel.app` (preview deployments)
- [ ] Initial admin user invited
- [ ] Admin user Clerk User ID obtained
- [ ] Admin user added to Supabase `admin_users` table

### Analytics Setup (V10)

- [ ] Google Analytics GA4 property created
- [ ] GA4 Measurement ID obtained (`G-XXXXXXX`)
- [ ] Google Tag Manager container created
- [ ] GTM Container ID obtained (`GTM-XXXXXXX`)
- [ ] GA4 Configuration tag added to GTM
- [ ] GTM configured to trigger on All Pages
- [ ] Test events verified in GA4 DebugView

### SEO / Visibility

- [ ] Admin routes configured with `noindex` meta tags
- [ ] Canonical redirects verified
- [ ] Sitemap configured (if applicable)
- [ ] Robots.txt configured (if applicable)

## Per-Iteration Tasks

### V1 - Deploy Proof

- [x] Vercel project connected to GitHub (Done - confirmed by user)
- [x] Domain added to Vercel (Done - confirmed by user)
- [x] DNS records configured in Namecheap (Done - confirmed by user)
- [x] Domain verified in Vercel (Done - confirmed by user)
- [x] SSL certificate active (Done - confirmed by user)
- [x] First deployment successful (Code ready - pending push to main)

### V2 - UI Skeleton

- [x] Design asset rule acknowledged (V2 closed):
  - [x] No invented visuals
  - [x] If no approved background or favicon exists, use gradient-only background and no custom favicon

### V3 - Database Setup

- [x] Production Supabase project created and resumed
- [x] Separate development Supabase project created
- [x] `questionnaire_submissions_v1` table created
- [x] `contact_messages` table created
- [x] RLS policies configured
- [x] Production environment variables set in Vercel
- [x] Preview and Development environment variables set to the development Supabase project
- [x] Local end-to-end test submission successful against the production project; synthetic rows removed
- [x] Preview end-to-end questionnaire and contact submissions successful against development; synthetic rows removed
- [x] Legacy production API keys disabled; modern publishable-key insert and public-read denial verified
- [ ] Production deployment and form submission verified

### V4 - Abuse Controls

- [ ] Turnstile site key obtained
- [ ] Turnstile secret key obtained
- [ ] Keys stored in Vercel (Preview + Production)
- [ ] Validation tested in Preview

### V5 - Clerk Auth

- [ ] Clerk application created
- [ ] Clerk keys added to Vercel
- [ ] Redirect URLs configured
- [ ] Initial admin user invited
- [ ] Test login successful

### V6 - Admin Authorization

- [ ] `admin_users` table created in Supabase
- [ ] Initial admin user added to table
- [ ] Authorization logic tested
- [ ] Unauthorized access blocked

### V6.5 - UI Revamp & Design Alignment

- [ ] UI goals finalized and documented
- [ ] Design canon conflicts reviewed (resolve or explicitly defer)
- [ ] Approved assets present if required (backgrounds/favicon)

### V8 - Admin Edit Content

- [ ] `site_content` table created
- [ ] RLS configured for public read only

### V9 - Questionnaire Versioning

- [ ] Versioned schema tables created
- [ ] Legacy `questionnaire_submissions_v1` preserved

### V10 - Analytics

- [ ] GA4 property created
- [ ] GTM container created
- [ ] GTM/GA4 keys added to environment variables
- [ ] Test events verified
- [ ] Production events verified

## Ongoing Maintenance

### Weekly

- [ ] Check for dependency updates
- [ ] Review error logs (Vercel, Supabase, Clerk)
- [ ] Check Supabase usage/quota
- [ ] Review analytics for anomalies

### Monthly

- [ ] Review and update documentation
- [ ] Check for security updates
- [ ] Review performance metrics
- [ ] Verify all services are active (not paused)

### As Needed

- [ ] Add new admin users (Clerk invite + Supabase entry)
- [ ] Rotate API keys if compromised
- [ ] Update DNS records if domain changes
- [ ] Update redirect URLs if routes change

## Verification

After completing setup tasks, verify:

- [ ] Domain resolves correctly
- [ ] HTTPS is active
- [ ] All redirects work
- [ ] Environment variables are set
- [ ] Database connection works
- [ ] Authentication works
- [ ] Admin access works
- [ ] Public pages load
- [ ] Forms submit successfully
- [ ] Analytics tracking (if implemented)

## Notes

- Keep a secure record of all API keys and passwords
- Document any deviations from standard setup
- Update this checklist if new services are added
- Review this checklist before each major iteration
