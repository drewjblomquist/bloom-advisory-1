# ADR-0010: Vercel Deployment via Personal GitHub Mirror

**Date:** 2025-01-08
**Status:** accepted

## Context

- Vercel Hobby plan cannot deploy from private GitHub organization repositories (Vercel Pro required).
- Long-term goal: canonical repo should be org-owned (BloomAdvisory/bloom-advisory).
- Current development setup: Cursor/Codex authenticated primarily with personal GitHub identity locally.
- Need to achieve V1 deploy proof without paying for Vercel Pro upfront.

## Options Considered

1. **Deploy from org repo with Vercel Pro**
   - Requires $20/month subscription
   - Direct deployment from canonical repo
   - Premature cost before V1 validation

2. **Make org repo public**
   - Free deployment on Vercel Hobby
   - Exposes codebase publicly (not preferred for early stage)

3. **Deploy from personal GitHub mirror (selected)**
   - Free Vercel Hobby deployment
   - Keeps org repo as canonical source
   - Minimal auth friction during development
   - Clear migration path to org deployment later

## Decision

Deploy from personal GitHub mirror repository (`drewblomquist/bloom-advisory-1`) using personal Vercel Hobby account. Canonical repo remains `BloomAdvisory/bloom-advisory`. Local repo configured with dual git remotes.

## Rationale

- **Avoid Vercel Pro cost** before achieving V1 deploy proof
- **Minimize auth/account friction** during early development phase
- **Preserve migration path** to org-owned deployment when ready
- **Maintain canonical source** in org repo for long-term ownership

## Implementation Details

### Git Remotes

- **origin:** `https://github.com/BloomAdvisory/bloom-advisory.git` (canonical org repo)
- **personal:** `https://github.com/drewblomquist/bloom-advisory-1.git` (deployment mirror)
- **Branch:** `main`

### Vercel Setup State

- **Account:** Personal Vercel Hobby account
- **Project:** New project created
- **Repository:** `drewblomquist/bloom-advisory-1` (personal mirror)
- **Framework Preset:** Currently shows "Other" (no Next.js scaffold exists yet)
- **Root Directory:** `./`
- **Deploy Status:** Intentionally NOT deployed yet (waiting for Next.js scaffold)

### Git Permissions Resolution

Initial push to org repo failed due to insufficient permissions. Resolved by:
- Granting write/admin access to the pushing identity in org repo settings
- Permissions adjusted from read-only to allow pushes

## Consequences

### What this enables

- Free Vercel Hobby deployment during V1 development
- Minimal account/auth complexity during early development
- Clear separation between canonical source and deployment source

### What this limits

- Two remotes require discipline: must push to both or define clear rules
- Personal Vercel account ownership is temporary (not org/team billing)
- Deployment source differs from canonical source (potential confusion)

### What we must remember later

- Push to both remotes when making changes (or automate sync)
- Vercel project is tied to personal account, not org
- Migration to org deployment requires Vercel Pro upgrade OR making repo public

## Risks

- **Dual remotes confusion:** Contributors may forget to push to both remotes
- **Temporary ownership:** Personal Vercel account is not long-term solution
- **Sync drift:** If remotes diverge, deployment may not match canonical source

## Exit Criteria / Migration Plan

1. **After V1 deploy proof achieved:**
   - Evaluate moving deployment to org repo by:
     - Upgrading to Vercel Pro (preferred if budget allows), OR
     - Making repo public (not preferred but free option)

2. **Long-term:**
   - Move Vercel project into org/team billing under professional email
   - Consolidate to single remote (org repo) for deployment

## Verification

### Verify Git Remotes
```bash
git remote -v
```
Expected output:
- `origin` → `BloomAdvisory/bloom-advisory.git`
- `personal` → `drewblomquist/bloom-advisory-1.git`

### Verify Repo Sync
After pushing to both remotes, verify both repos have same commit SHA for `main`:
```bash
git log origin/main --oneline -1
git log personal/main --oneline -1
```

### Verify Vercel Framework Detection
After Next.js scaffold is added:
- Vercel project settings should auto-detect framework
- Framework preset should change from "Other" → "Next.js"

## Revisit When

- V1 deploy proof is achieved
- Budget allows Vercel Pro subscription
- Team needs org-level billing/access
- Repo can be made public without concerns
