# Checklist: Iteration Gates

## Purpose

This checklist defines the "Definition of Done" criteria that must be met before an iteration is considered complete. Use this checklist at the end of each iteration (V1-V10).

**Hard rule:** If a gate is incomplete, stop and do not proceed to the next iteration.

## Global Definition of Done

Every iteration must meet these criteria:

### 1. Feature Works End-to-End in Production

- [ ] Feature is deployed to production (`https://bloomadvisory.ai`)
- [ ] Feature works as specified in iteration plan
- [ ] No critical bugs or errors
- [ ] Feature is accessible and usable

### 2. Changes Are Small and Reversible

- [ ] Changes are contained to specific iteration scope
- [ ] No breaking changes to existing functionality
- [ ] Changes can be rolled back if needed
- [ ] Migration path is clear (if applicable)

### 3. Verification Steps Written

- [ ] Clear verification steps documented
- [ ] Steps are testable by non-developer
- [ ] Expected outcomes are defined
- [ ] Verification completed successfully

### 4. Environment Variables Documented and Set

- [ ] All new environment variables documented in PRD
- [ ] Variables set in Vercel (Production and Preview)
- [ ] Variables documented in `docs/playbooks/` if needed
- [ ] Local `.env.local` updated (if applicable)

### 5. Structured Logs Exist for Server-Side Flows

- [ ] Server-side operations include structured logging
- [ ] Logs include: `requestId`, `eventName`, `status`, `durationMs`
- [ ] Error logs include `errorCode` when applicable
- [ ] No PII, payloads, tokens, or session objects in logs
- [ ] Logs are testable and verifiable

### 6. Decisions Recorded (If Applicable)

- [ ] Any architectural decisions documented in `docs/decisions/`
- [ ] Tradeoffs and rationale explained
- [ ] Future implications noted
- [ ] Revisit triggers defined (if applicable)
- [ ] If reality diverged from plan, update the current iteration plan and add an ADR if architecture is impacted

## Iteration-Specific Gates

### V1 - Deploy Proof

- [x] Next.js app deployed to Vercel (Code ready - pending push to main)
- [x] Custom domain configured and working (Done - confirmed by user)
- [x] HTTPS active (Done - confirmed by user)
- [x] Redirects working (http→https, www→apex) (Handled by Vercel infrastructure)
- [x] Auto-deploy working (push to main triggers deploy) (Configured - will verify after first push)

### V2 - UI Skeleton

- [ ] All UI sections render correctly
- [ ] Responsive on desktop and mobile
- [ ] No console errors
- [ ] Forms are visible and usable (even if not functional)
- [ ] Navigation works
- [ ] Design asset rule followed (no invented visuals; gradient-only background allowed if no approved assets exist)

### V3 - Database Submission Pipeline

- [ ] Supabase connection working
- [ ] Table created with correct schema
- [ ] Contact messages table created with correct schema
- [ ] RLS policies configured
- [ ] Form submission writes to database
- [ ] Blank fields stored as `null`
- [ ] Success message displays
- [ ] Public users cannot read submissions

### V4 - Abuse Controls

- [ ] Rate limiting/throttling implemented
- [ ] Bot detection (CAPTCHA/Turnstile) working
- [ ] Server-side validation in place
- [ ] Rejections logged (no PII)
- [ ] Legitimate submissions still work
- [ ] Spam test: repeated submissions blocked
- [ ] Turnstile keys configured in Vercel

### V5 - Clerk Auth

- [ ] Clerk integrated in Next.js
- [ ] `/admin` routes protected by middleware
- [ ] Login page accessible at `/admin/login`
- [ ] Invite-only signups configured
- [ ] Test login successful
- [ ] Unauthenticated users redirected

### V6 - Admin Authorization

- [ ] `admin_users` table created
- [ ] Authorization check implemented
- [ ] Allowed admin can access `/admin`
- [ ] Unauthorized user denied access
- [ ] No hardcoded emails in code
- [ ] RLS policies configured for admin tables

### V7 - Admin Read Submissions

- [ ] Admin submissions list/table view implemented
- [ ] Server-side fetching pattern used
- [ ] Sorting by `submitted_at` desc works
- [ ] Filters work (if implemented)
- [ ] Public users cannot access list
- [ ] No PII in logs

### V8 - Admin Edit Content

- [ ] `site_content` table created
- [ ] Admin UI for editing hero text
- [ ] Admin UI for editing service offerings
- [ ] Save functionality works
- [ ] Public homepage reads from `site_content`
- [ ] Changes persist after redeploy
- [ ] Audit fields (`updated_at`, `updated_by`) working

### V9 - Questionnaire Versioning

- [ ] Versioned schema implemented:
  - [ ] `questionnaire_versions` table
  - [ ] `questions` table
  - [ ] `submissions` table (versioned)
  - [ ] `answers` table
- [ ] Admin UI for editing questions
- [ ] Admin UI for publishing versions
- [ ] Public questionnaire reads active version
- [ ] Submissions tied to correct version
- [ ] Legacy `questionnaire_submissions_v1` preserved
- [ ] Migration path clear

### V10 - Analytics and Polish

- [ ] GTM/GA4 script injection working
- [ ] Route change tracking implemented
- [ ] Required events tracked:
  - [ ] `questionnaire_started`
  - [ ] `questionnaire_completed`
  - [ ] `contact_form_submitted`
  - [ ] `admin_login_success` (non-PII)
- [ ] Events appear in GA4 DebugView
- [ ] No duplicate page views
- [ ] Lighthouse score ≥ 90
- [ ] Visual design matches canon:
  - [ ] Global gradient applied
  - [ ] Typography matches spec
  - [ ] Glass effects used appropriately
  - [ ] Motion constraints followed
- [ ] `/design` folder structure in place
- [ ] DESIGN-NOTES.md updated if needed

## Code Quality Gates

### Before Merging to Main

- [ ] All tests pass (if applicable)
- [ ] TypeScript type checking passes
- [ ] ESLint passes (or errors documented)
- [ ] No console errors in browser
- [ ] No build warnings
- [ ] Code follows project patterns
- [ ] No commented-out code
- [ ] No TODO comments without tracking

### Documentation

- [ ] PRD updated if requirements changed
- [ ] Runbooks updated if processes changed
- [ ] Decisions documented if architecture changed
- [ ] Code comments added for complex logic
- [ ] README updated if needed

## Security Gates

- [ ] No secrets in code
- [ ] Environment variables properly scoped
- [ ] RLS policies correctly configured
- [ ] Authorization checks in place
- [ ] Input validation implemented
- [ ] Error messages don't leak sensitive info
- [ ] Logs don't contain PII

## Performance Gates

- [ ] Page load time acceptable
- [ ] No unnecessary API calls
- [ ] Database queries optimized
- [ ] Images optimized (if applicable)
- [ ] Lighthouse performance score acceptable

## Final Checklist Before Marking Iteration Complete

- [ ] All iteration-specific gates met
- [ ] All global gates met
- [ ] Code quality gates met
- [ ] Security gates met
- [ ] Performance gates met
- [ ] Documentation updated
- [ ] Verification steps completed
- [ ] Ready for next iteration

## Notes

- If an iteration gate cannot be met, document why and what the plan is to address it
- Some gates may be deferred to later iterations (document in decisions)
- Use this checklist as a conversation starter, not a blocker
- Update this checklist if new gates are identified
