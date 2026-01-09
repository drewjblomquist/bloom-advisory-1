# Runbook: Deploy Vercel Domain DNS

## Purpose

This runbook covers the complete process of deploying the Bloom Advisors website to Vercel and configuring the custom domain with DNS.

## Prerequisites

- Vercel account created
- GitHub repository created and connected to Vercel
- Domain ownership confirmed (Namecheap)
- Access to Namecheap DNS settings

## Steps

### 1. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: (leave default unless monorepo)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

### 2. Add Custom Domain

1. In Vercel project settings, go to "Domains"
2. Click "Add Domain"
3. Enter `bloomadvisory.ai`
4. Vercel will provide DNS records needed

### 3. Configure DNS in Namecheap

1. Log in to Namecheap
2. Go to Domain List → Manage `bloomadvisory.ai`
3. Go to "Advanced DNS" tab
4. Remove any conflicting A or CNAME records
5. Add the DNS records provided by Vercel:
   - Type: A (or CNAME as specified by Vercel)
   - Host: @ (or as specified)
   - Value: (provided by Vercel)
   - TTL: Automatic (or 300)

### 4. Verify Domain

1. Vercel will automatically verify domain ownership via DNS
2. Wait for DNS propagation (can take up to 48 hours, usually much faster)
3. Check domain status in Vercel dashboard
4. Once verified, SSL certificate will be automatically provisioned

### 5. Verify HTTPS

1. Visit `https://bloomadvisory.ai`
2. Confirm SSL certificate is active (lock icon in browser)
3. Test redirects:
   - `http://bloomadvisory.ai` → should redirect to `https://bloomadvisory.ai`
   - If www is configured: `https://www.bloomadvisory.ai` → should redirect to `https://bloomadvisory.ai`

### 6. Configure Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add all required variables for Production:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - Any other required variables
3. Also add for Preview environment (use same values in V1)

### 7. Trigger First Deployment

1. Push code to `main` branch (or merge PR)
2. Vercel will automatically build and deploy
3. Monitor build logs in Vercel dashboard
4. Verify deployment is successful

## Verification Checklist

- [ ] Domain resolves to Vercel deployment
- [ ] HTTPS is active and working
- [ ] HTTP redirects to HTTPS (301)
- [ ] WWW redirects to apex (if configured)
- [ ] Environment variables are set
- [ ] First deployment succeeded
- [ ] Site loads correctly on canonical domain

## Troubleshooting

### Domain not resolving

- Check DNS records are correct in Namecheap
- Wait for DNS propagation (can take up to 48 hours)
- Use `dig` or `nslookup` to check DNS records

### SSL certificate not provisioning

- Ensure DNS records are correct
- Wait for domain verification to complete
- Check domain status in Vercel dashboard

### Build failures

- Check build logs in Vercel dashboard
- Verify environment variables are set
- Check for TypeScript or build errors locally first

### Redirects not working

- Check Next.js middleware configuration
- Verify Vercel redirect rules (if using)
- Test in incognito mode to avoid cache issues

## Rollback Procedure

If deployment fails:

1. Go to Vercel project → Deployments
2. Find last successful deployment
3. Click "..." menu → "Promote to Production"
4. Or redeploy specific commit from Git history

## Future Updates

- All future deployments happen automatically on push to `main`
- Preview deployments created for PRs
- No manual deployment steps needed after initial setup
