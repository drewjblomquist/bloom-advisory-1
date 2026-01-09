# Checklist: Outside-of-Code Tasks

## Purpose

This checklist covers all tasks that must be completed **outside of the codebase** before or during development. These are infrastructure, service configuration, and setup tasks.

**Hard rule:** If a required item is incomplete, stop the iteration and do not proceed.

## Pre-Development Setup

### Domain & DNS (Namecheap)

- [ ] Domain purchased and accessible in Namecheap
- [ ] Access to Namecheap DNS settings confirmed
- [ ] Domain added to Vercel project
- [ ] Vercel-provided DNS records copied
- [ ] DNS records added to Namecheap
- [ ] Conflicting DNS records removed
- [ ] Domain ownership verified in Vercel
- [ ] HTTPS/SSL certificate active
- [ ] Canonical redirects working:
  - [ ] `http://bloomadvisory.ai` → `https://bloomadvisory.ai` (301)
  - [ ] `https://www.bloomadvisory.ai` → `https://bloomadvisory.ai` (301) if www configured

### Vercel Setup

- [ ] Vercel account created
- [ ] Vercel project created
- [ ] GitHub repository connected to Vercel
- [ ] Production branch set to `main`
- [ ] Preview deployments enabled
- [ ] Build settings configured (Next.js)
- [ ] Environment variables documented

### Environment Variables

- [ ] Supabase project created
- [ ] Supabase keys obtained:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- [ ] Clerk application created
- [ ] Clerk keys obtained:
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - [ ] `CLERK_SECRET_KEY`
- [ ] Turnstile keys obtained (V4):
  - [ ] `TURNSTILE_SITE_KEY`
  - [ ] `TURNSTILE_SECRET_KEY`
- [ ] All environment variables added to Vercel:
  - [ ] Production environment
  - [ ] Preview environment
- [ ] Local `.env.local` file created with all variables

### Privacy + Data Inventory

- [ ] Data inventory completed (questionnaire + contact fields and purpose)
- [ ] Public form copy drafted (what data is collected, why, how it is used)
- [ ] Lightweight privacy policy draft exists
- [ ] Incident response runbook reviewed (`docs/playbooks/INCIDENT_RESPONSE.md`)

### Supabase (Infra)

- [ ] Supabase project created
- [ ] Separate Supabase projects created:
  - [ ] `dev` for local + preview
  - [ ] `prod` for production only
- [ ] Database schema created (appropriate for current iteration)
- [ ] RLS policies configured
- [ ] Admin allowlist table created (`admin_users`)
- [ ] Initial admin user added to `admin_users` table (after V5)
- [ ] Supabase Auth is **not** configured or used

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

- [ ] Vercel project connected to GitHub
- [ ] Domain added to Vercel
- [ ] DNS records configured in Namecheap
- [ ] Domain verified in Vercel
- [ ] SSL certificate active
- [ ] First deployment successful

### V2 - UI Skeleton

- [ ] Design asset rule acknowledged:
  - [ ] No invented visuals
  - [ ] If no approved background or favicon exists, use gradient-only background and no custom favicon

### V3 - Database Setup

- [ ] Supabase project created
- [ ] `questionnaire_submissions_v1` table created
- [ ] `contact_messages` table created
- [ ] RLS policies configured
- [ ] Environment variables set in Vercel
- [ ] Test submission successful

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
