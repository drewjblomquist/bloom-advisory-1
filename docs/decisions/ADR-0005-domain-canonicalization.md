# ADR-0005: Domain Canonicalization Strategy

**Date:** 2024-12-XX
**Status:** accepted

## Context

Need to define canonical domain strategy for Bloom Advisors website. Multiple variants possible: `http` vs `https`, `www` vs apex, etc.

## Options Considered

1. **Apex domain only** (`bloomadvisory.ai`)
   - Single canonical domain
   - No www subdomain
   - Simpler DNS configuration

2. **WWW as canonical** (`www.bloomadvisory.ai`)
   - Traditional approach
   - Some prefer www for branding

3. **Apex as canonical, www redirects (chosen)**
   - `https://bloomadvisory.ai` is canonical
   - `http://bloomadvisory.ai` → `https://bloomadvisory.ai` (301)
   - `https://www.bloomadvisory.ai` → `https://bloomadvisory.ai` (301) if www is configured
   - Clean branding, better SEO, fewer edge cases

## Decision

Use **`https://bloomadvisory.ai` (apex)** as the only canonical domain. All other variants redirect to it.

## Rationale

- **Clean branding**: shorter, more memorable
- **Better SEO**: single canonical URL
- **Fewer edge cases**: no www vs non-www confusion
- **Industry standard**: many modern sites use apex domain
- **Simpler configuration**: fewer DNS records to manage

## Consequences

### What this enables

- Single canonical URL for all links and sharing
- Better SEO (no duplicate content issues)
- Simpler DNS configuration
- Cleaner analytics (no www vs non-www split)

### What this limits

- Cannot use www subdomain for different purposes
- Some users may type www and get redirected (minor UX consideration)

### What we must remember later

- All internal links should use canonical domain
- Analytics should track canonical domain only
- Sitemap (if added) should use canonical domain
- Social sharing should use canonical domain
- Admin routes must also respect canonical domain

## Implementation Details

- Vercel handles HTTPS automatically
- Next.js middleware or Vercel config handles redirects:
  - `http://` → `https://` (301)
  - `www.` → apex (301) if www is configured
- Admin routes must also respect canonical domain
- 404 pages should use canonical domain in links

## Revisit When

- Need to use www subdomain for different purpose
- Need subdomain architecture (e.g., `admin.bloomadvisory.ai`)
- SEO requirements change
- Multi-domain support needed
