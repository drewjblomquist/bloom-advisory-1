# Runbook: Local Development

## Purpose

This runbook covers setting up and running the Bloom Advisors website locally for development.

## Prerequisites

- Node.js installed (version 18+ recommended)
- npm or yarn package manager
- Git installed
- Code editor (VS Code recommended)
- Access to environment variables

## Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd bloom-advisory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

1. Create `.env.local` file in project root:

```bash
cp .env.example .env.local  # if example exists
```

2. Add required environment variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # dev project
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # server-only, never expose

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Analytics (if implemented)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXX
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX

# Abuse controls (V4)
TURNSTILE_SITE_KEY=0x...
TURNSTILE_SECRET_KEY=0x...
```

3. Get values from:
   - Supabase: Project Settings → API
   - Clerk: Dashboard → API Keys
   - Google Analytics: Analytics dashboard

### 4. Run Development Server

```bash
npm run dev
```

Server will start at `http://localhost:3000`

### 5. Verify Setup

1. Open `http://localhost:3000` in browser
2. Check for console errors
3. Verify environment variables are loaded (check Network tab, should not see errors)

## Development Workflow

### Making Changes

1. Make code changes
2. Save files (Next.js hot-reloads automatically)
3. Check browser for updates
4. Check console for errors

### Testing Features

- **Public pages**: Test at `http://localhost:3000`
- **Admin pages**: Test at `http://localhost:3000/admin`
- **API routes**: Test at `http://localhost:3000/api/...`

### Database Access

- Use Supabase dashboard for database queries
- Or use Supabase CLI for local development
- Never use production database for local testing (use the dev Supabase project)

### Authentication Testing

- Use Clerk test mode for local development
- Create test users in Clerk dashboard
- Add test users to Supabase `admin_users` table

## Common Tasks

### Run Type Checking

```bash
npm run typecheck
```

### Run Linting

```bash
npm run lint
```

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

### Start Production Build Locally

```bash
npm run build
npm start
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Environment Variables Not Loading

- Verify `.env.local` is in project root (not in subdirectory)
- Check variable names match exactly (case-sensitive)
- Restart dev server after adding new variables
- Check for typos in variable names

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
```

### TypeScript Errors

- Run `npm run typecheck` to see all errors
- Fix errors before committing
- Check `tsconfig.json` configuration

### Clerk Authentication Issues

- Verify redirect URLs include `http://localhost:3000`
- Check Clerk dashboard for correct configuration
- Verify API keys are correct

### Supabase Connection Issues

- Verify Supabase project is not paused
- Check API keys are correct
- Verify RLS policies allow your operations
- Check network connectivity

## Best Practices

1. **Never commit** `.env.local` to repository
2. **Use separate Supabase project** for local development
3. **Test locally** before pushing to GitHub
4. **Run type checking and linting** before committing
5. **Keep dependencies updated** regularly
6. **Use feature branches** for development

## IDE Setup (VS Code)

### Recommended Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense (if using Tailwind)

### Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Next Steps

After local setup is working:

1. Create feature branch
2. Make changes
3. Test locally
4. Commit and push
5. Create PR for review
6. Merge to `main` triggers production deploy
