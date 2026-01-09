# Runbook: Troubleshooting

## Purpose

This runbook provides common troubleshooting steps for issues that may arise during development and deployment of the Bloom Advisors website.

## General Debugging Process

1. **Reproduce the issue** - Can you consistently reproduce it?
2. **Check logs** - Look at browser console, server logs, Vercel build logs
3. **Isolate the problem** - Is it frontend, backend, database, or deployment?
4. **Check recent changes** - What changed recently?
5. **Verify configuration** - Environment variables, API keys, etc.

## Common Issues

### Build Failures

#### TypeScript Errors

**Symptoms:** Build fails with TypeScript errors

**Solutions:**
1. Run `npm run typecheck` locally to see all errors
2. Fix TypeScript errors before pushing
3. Check `tsconfig.json` configuration
4. Verify all imports are correct

#### Missing Dependencies

**Symptoms:** Build fails with "module not found" errors

**Solutions:**
1. Run `npm install` to ensure all dependencies are installed
2. Check `package.json` for missing dependencies
3. Verify node_modules is not corrupted (delete and reinstall)

#### Environment Variable Errors

**Symptoms:** Build fails or runtime errors about missing env vars

**Solutions:**
1. Verify all required env vars are set in Vercel
2. Check variable names match exactly (case-sensitive)
3. Ensure `NEXT_PUBLIC_*` prefix for client-side variables
4. Check Vercel environment (Production vs Preview)

### Runtime Errors

#### Authentication Issues

**Symptoms:** Cannot log in, redirect loops, "Access denied" errors

**Solutions:**
1. **Clerk Issues:**
   - Verify Clerk API keys are correct
   - Check redirect URLs in Clerk dashboard include your domain
   - Verify user is invited in Clerk dashboard
   - Check middleware configuration

2. **Authorization Issues:**
   - Verify user exists in Supabase `admin_users` table
   - Check `clerk_user_id` matches Clerk User ID exactly
   - Verify RLS policies allow admin access
   - Check application-level authorization logic

#### Database Connection Issues

**Symptoms:** Cannot read/write to Supabase, connection errors

**Solutions:**
1. Verify Supabase project is not paused
2. Check API keys are correct (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Verify RLS policies allow your operations
4. Check network connectivity
5. Verify you're using the correct Supabase client (anon vs service role)

#### Form Submission Failures

**Symptoms:** Form submits but data doesn't appear in database

**Solutions:**
1. Check browser console for errors
2. Check server logs (Vercel function logs)
3. Verify API route is working (test with curl/Postman)
4. Check RLS policies allow inserts
5. Verify table schema matches form fields
6. Check for validation errors

### Deployment Issues

#### Domain Not Resolving

**Symptoms:** Domain doesn't load, DNS errors

**Solutions:**
1. Check DNS records in Namecheap are correct
2. Wait for DNS propagation (can take up to 48 hours)
3. Use `dig` or `nslookup` to verify DNS records
4. Check domain is verified in Vercel dashboard

#### SSL Certificate Issues

**Symptoms:** HTTPS not working, certificate errors

**Solutions:**
1. Verify DNS records are correct
2. Wait for domain verification to complete
3. Check SSL status in Vercel dashboard
4. Clear browser cache and try again

#### Preview Deployments Not Working

**Symptoms:** PR previews fail or don't deploy

**Solutions:**
1. Check Vercel project is connected to GitHub
2. Verify environment variables are set for Preview
3. Check build logs for errors
4. Verify branch protection rules allow deployments

### Performance Issues

#### Slow Page Loads

**Solutions:**
1. Check Vercel analytics for performance metrics
2. Optimize images and assets
3. Check for unnecessary API calls
4. Verify database queries are optimized
5. Check for memory leaks in client code

#### High Database Usage

**Solutions:**
1. Check for inefficient queries
2. Verify RLS policies are not blocking queries unnecessarily
3. Check for N+1 query problems
4. Consider adding database indexes
5. Monitor Supabase dashboard for usage

## Debugging Tools

### Browser DevTools

- **Console:** Check for JavaScript errors
- **Network:** Check API requests/responses
- **Application:** Check localStorage, cookies, service workers

### Vercel Logs

1. Go to Vercel dashboard → Project → Deployments
2. Click on deployment → "Functions" tab
3. View function logs for server-side errors

### Supabase Logs

1. Go to Supabase dashboard → Project → Logs
2. Check API logs for database queries
3. Check Auth logs for authentication issues

### Clerk Dashboard

1. Go to Clerk dashboard → Activity
2. Check for authentication events
3. Verify user sessions

## Getting Help

### Before Asking for Help

1. **Document the issue:**
   - What were you trying to do?
   - What happened instead?
   - Error messages (full text)
   - Steps to reproduce

2. **Check existing documentation:**
   - Specs in `docs/specs/`
   - Playbooks in `docs/playbooks/`
   - Decisions in `docs/decisions/`

3. **Gather context:**
   - Browser console errors
   - Server logs
   - Network requests
   - Recent changes

### Where to Look for Answers

1. **Specs** - `docs/specs/`
2. **Playbooks** - `docs/playbooks/`
3. **Decisions** - `docs/decisions/`
4. **Code comments** - Inline documentation
5. **Git history** - Recent changes that might have caused issue

## Prevention

### Best Practices to Avoid Issues

1. **Test locally** before pushing
2. **Run type checking and linting** before committing
3. **Verify environment variables** are set correctly
4. **Check logs regularly** for warnings
5. **Monitor Supabase and Vercel dashboards** for issues
6. **Keep dependencies updated** (security patches)
7. **Document decisions** in `docs/decisions/` when making changes
8. **Follow incremental development** - small, testable changes

### Regular Maintenance

1. **Weekly:**
   - Check for dependency updates
   - Review error logs
   - Check Supabase usage

2. **Monthly:**
   - Review and update documentation
   - Check for security updates
   - Review performance metrics

3. **As needed:**
   - Update runbooks when processes change
   - Document new issues and solutions
   - Update troubleshooting guide
