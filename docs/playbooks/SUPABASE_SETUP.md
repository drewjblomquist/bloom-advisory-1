# Runbook: Supabase Setup

## Purpose

This runbook covers setting up Supabase for the Bloom Advisors website, including project creation, database schema, and RLS policies.

## Prerequisites

- Supabase account created
- Access to Supabase dashboard
- Understanding of database schema (see `docs/specs/DATA_MODEL.md`)
- Two Supabase projects planned: `dev` (local + preview) and `prod` (production only)

## Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Configure project:
    - Name: "Bloom Advisors" (or your preference)
    - Database Password: (generate strong password, save it securely)
    - Region: Choose closest to your users
    - Pricing Plan: Free tier is sufficient for V1
4. Wait for project provisioning (takes a few minutes)

Repeat this for both `dev` and `prod` projects. Use `dev` for local and preview, and `prod` for production only.

### 2. Get API Keys

1. Go to Project Settings → API
2. Copy the following:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - `anon` `public` key (this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `service_role` `secret` key (this is `SUPABASE_SERVICE_ROLE_KEY` - **never expose to client**)

### 3. Create Database Schema

#### V3: Simple Submissions Table

1. Go to SQL Editor
2. Run the following SQL to create `questionnaire_submissions_v1`:

```sql
CREATE TABLE questionnaire_submissions_v1 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT,
  industry TEXT,
  team_size TEXT,
  tools TEXT,
  time_consuming_tasks TEXT,
  areas_interested TEXT[],
  ai_knowledge_level TEXT,
  openness_to_automation TEXT,
  magic_wand_question TEXT,
  anything_else TEXT,
  email TEXT,
  phone_number TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Enable RLS:

```sql
ALTER TABLE questionnaire_submissions_v1 ENABLE ROW LEVEL SECURITY;
```

4. Create policy for public inserts (no reads):

```sql
CREATE POLICY "Allow public inserts" ON questionnaire_submissions_v1
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

#### V3: Contact Messages Table

1. Create `contact_messages`:

```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  message TEXT,
  user_agent TEXT,
  source TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. Enable RLS:

```sql
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
```

3. Create policy for public inserts (no reads):

```sql
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

#### V6: Admin Users Table

1. Create `admin_users` table:

```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. Enable RLS:

```sql
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

3. Do not add any public policies. Admin checks must run server-side with the service role key (Clerk is the auth system; Supabase Auth is not used).

#### V8: Site Content Table

1. Create `site_content` table:

```sql
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. Enable RLS and create policies (admins can read/write, public can read):

```sql
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site_content" ON site_content
  FOR SELECT
  TO anon
  USING (true);

-- Admin writes happen server-side with the service role key.
```

#### V9: Versioned Questionnaire Schema

1. Create `questionnaire_versions`:

```sql
CREATE TABLE questionnaire_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  version_number INTEGER NOT NULL,
  published_at TIMESTAMPTZ,
  published_by UUID
);
```

2. Create `questions`:

```sql
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  questionnaire_version_id UUID REFERENCES questionnaire_versions(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  helper_text TEXT,
  question_type TEXT NOT NULL,
  is_required BOOLEAN DEFAULT false,
  display_order INTEGER NOT NULL,
  config JSONB,
  is_active BOOLEAN DEFAULT true
);
```

3. Create `submissions` (versioned):

```sql
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  questionnaire_version_id UUID REFERENCES questionnaire_versions(id),
  respondent_name TEXT,
  respondent_email TEXT,
  respondent_company TEXT,
  respondent_role TEXT,
  source TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

4. Create `answers`:

```sql
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  answer_value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

5. Enable RLS on all tables and create appropriate policies

### 4. Set Up Row Level Security (RLS)

Follow the security model defined in `docs/specs/SECURITY_PRIVACY.md`:

- Public users: INSERT only on submissions and contact messages (no SELECT)
- Admins: Full access via server-side API routes using the service role key

### 5. Add Initial Admin User

1. After V5 (Clerk setup), get your Clerk user ID
2. Insert into `admin_users`:

```sql
INSERT INTO admin_users (clerk_user_id, email, role)
VALUES ('clerk_user_id_here', 'your-email@example.com', 'admin');
```

### 6. Configure Environment Variables

Add to Vercel (and local `.env`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose to client)

## Verification Checklist

- [ ] Supabase project created
- [ ] API keys copied and stored securely
- [ ] Database schema created (appropriate for current iteration)
- [ ] `contact_messages` table created (V3)
- [ ] RLS enabled on all tables
- [ ] Policies created and tested
- [ ] Environment variables set in Vercel
- [ ] Initial admin user added (after V5)
- [ ] Test insert from application works

## Troubleshooting

### RLS blocking inserts

- Check policies are correct
- Verify you're using the correct Supabase client (anon key for public, service role for admin)
- Check policy conditions match your use case

### Connection errors

- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check API keys are correct
- Ensure project is not paused (free tier projects pause after inactivity)

### Migration issues

- Use Supabase migrations or SQL Editor
- Test migrations on a development project first
- Keep migration scripts in version control

## Security Notes

- **Never commit** service role key to repository
- **Never expose** service role key to client-side code
- Use anon key for public operations
- Use service role key only in server-side API routes
- Regularly rotate keys if compromised

## Future Updates

- Schema changes should be tracked as migrations
- Consider using Supabase CLI for migrations
- Document all schema changes in `docs/decisions/` if they affect architecture
