create table if not exists public.questionnaire_submissions_v1 (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  industry text,
  team_size text,
  tools text,
  time_consuming_tasks text,
  areas_interested text[],
  ai_knowledge_level text,
  openness_to_automation text,
  magic_wand_question text,
  anything_else text,
  email text,
  phone_number text,
  submitted_at timestamptz not null default now()
);

alter table public.questionnaire_submissions_v1
  add column if not exists business_name text,
  add column if not exists industry text,
  add column if not exists team_size text,
  add column if not exists tools text,
  add column if not exists time_consuming_tasks text,
  add column if not exists areas_interested text[],
  add column if not exists ai_knowledge_level text,
  add column if not exists openness_to_automation text,
  add column if not exists magic_wand_question text,
  add column if not exists anything_else text,
  add column if not exists email text,
  add column if not exists phone_number text,
  add column if not exists submitted_at timestamptz default now();

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone_number text,
  message text,
  submitted_at timestamptz not null default now()
);

alter table public.contact_messages
  add column if not exists email text,
  add column if not exists phone_number text,
  add column if not exists message text,
  add column if not exists submitted_at timestamptz default now();

alter table public.questionnaire_submissions_v1 enable row level security;
alter table public.contact_messages enable row level security;

revoke all on table public.questionnaire_submissions_v1 from public, anon, authenticated;
revoke all on table public.contact_messages from public, anon, authenticated;

grant insert on table public.questionnaire_submissions_v1 to anon;
grant insert on table public.contact_messages to anon;

grant select, insert, update, delete on table public.questionnaire_submissions_v1 to service_role;
grant select, insert, update, delete on table public.contact_messages to service_role;

drop policy if exists "Allow public inserts" on public.questionnaire_submissions_v1;
create policy "Allow public inserts"
  on public.questionnaire_submissions_v1
  for insert
  to anon
  with check (true);

drop policy if exists "Allow public inserts" on public.contact_messages;
create policy "Allow public inserts"
  on public.contact_messages
  for insert
  to anon
  with check (true);
