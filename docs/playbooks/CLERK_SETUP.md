# Runbook: Clerk Setup

## Purpose

This runbook covers setting up Clerk authentication for the Bloom Advisors admin portal.

## Prerequisites

- Clerk account created
- Next.js application ready for integration
- Understanding of authentication requirements (see `docs/specs/AUTH_SPEC.md`)

## Steps

### 1. Create Clerk Application

1. Go to [clerk.com](https://clerk.com) and sign in
2. Click "Create Application"
3. Configure application:
   - Name: "Bloom Advisors"
   - Authentication: Choose authentication methods:
     - Email (Magic Link) - **Required for V1**
     - Email (Password) - Optional
     - Social providers - **Not in V1**
   - Click "Create"

### 2. Configure Authentication Methods

1. Go to "User & Authentication" → "Email, Phone, Username"
2. Enable "Email address" as identifier
3. Configure email verification:
   - Magic Link (recommended for V1)
   - Or Email + Password (if preferred)
4. Disable public sign-ups (invite-only):
   - Go to "User & Authentication" → "Restrictions"
   - Set "Allow sign-ups" to OFF
   - Or use "Allowlist" to restrict to specific email domains

### 3. Get API Keys

1. Go to "API Keys" in Clerk dashboard
2. Copy the following:
   - Publishable Key (starts with `pk_`) → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Secret Key (starts with `sk_`) → `CLERK_SECRET_KEY`

### 4. Configure Redirect URLs

1. Go to "Paths" in Clerk dashboard
2. Add allowed redirect URLs:
   - `http://localhost:3000` (development)
   - `https://bloomadvisory.ai` (production)
   - `https://*.vercel.app` (preview deployments - use wildcard)
3. Add sign-in redirect URL: `/admin`
4. Add sign-up redirect URL: `/admin` (if using)

### 5. Install Clerk in Next.js

1. Install Clerk package:

```bash
npm install @clerk/nextjs
```

2. Add environment variables to `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

3. Add to Vercel environment variables (Production and Preview)

### 6. Configure Clerk Middleware

1. Create or update `middleware.ts` in project root:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

### 7. Set Up Clerk Provider

1. Wrap your app with ClerkProvider in `app/layout.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}
```

### 8. Create Admin Login Page

1. Create `app/admin/login/page.tsx`:

```typescript
import { SignIn } from '@clerk/nextjs'

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  )
}
```

### 9. Invite Initial Admin User

1. Go to Clerk dashboard → "Users"
2. Click "Invite User"
3. Enter admin email address
4. User will receive invitation email
5. After they sign in, get their Clerk User ID from dashboard
6. Add to Supabase `admin_users` table (see `docs/playbooks/SUPABASE_SETUP.md`)

## Verification Checklist

- [ ] Clerk application created
- [ ] Authentication methods configured (Email Magic Link)
- [ ] Public sign-ups disabled (invite-only)
- [ ] API keys copied and stored securely
- [ ] Redirect URLs configured
- [ ] Clerk package installed
- [ ] Environment variables set (local and Vercel)
- [ ] Middleware configured to protect `/admin` routes
- [ ] ClerkProvider added to app layout
- [ ] Admin login page created
- [ ] Initial admin user invited
- [ ] Admin user added to Supabase `admin_users` table
- [ ] Test login flow works end-to-end

## Troubleshooting

### Redirect loop

- Check redirect URLs are correctly configured in Clerk dashboard
- Verify middleware is not protecting public routes
- Check sign-in redirect URL matches your admin route

### "User not found" after login

- Verify user is invited in Clerk dashboard
- Check user exists in Supabase `admin_users` table
- Verify `clerk_user_id` matches Clerk User ID exactly

### Environment variable errors

- Verify keys are correct (publishable vs secret)
- Check keys are set in Vercel (not just local)
- Ensure no typos in variable names

### Middleware not working

- Check middleware matcher configuration
- Verify middleware is in correct location (project root)
- Check Next.js version compatibility

## Security Notes

- **Never commit** Clerk secret key to repository
- Use publishable key in client-side code only
- Use secret key only in server-side code
- Regularly rotate keys if compromised
- Monitor Clerk dashboard for suspicious activity

## Future Updates

- Add MFA enforcement (future iteration)
- Add organization-based access (future)
- Customize Clerk UI branding (optional polish)
