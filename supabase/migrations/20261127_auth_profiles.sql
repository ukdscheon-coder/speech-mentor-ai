-- Apply in Supabase SQL editor BEFORE enabling authenticated history/profile APIs.
-- Existing unattributed history stays inaccessible, not assigned to arbitrary users.
alter table public.practice_attempts add column if not exists user_id uuid references auth.users(id) on delete cascade;
create index if not exists practice_attempts_user_date_idx on public.practice_attempts(user_id,created_at desc);
alter table public.practice_attempts enable row level security;
revoke all on public.practice_attempts from anon;
grant select,insert on public.practice_attempts to authenticated;
drop policy if exists practice_attempts_owner_select on public.practice_attempts;
drop policy if exists practice_attempts_owner_insert on public.practice_attempts;
create policy practice_attempts_owner_select on public.practice_attempts for select to authenticated using (user_id = (select auth.uid()));
create policy practice_attempts_owner_insert on public.practice_attempts for insert to authenticated with check (user_id = (select auth.uid()));
create table if not exists public.speech_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My presentation',
  role text not null,
  purpose text not null default 'general',
  language text not null default 'en-GB',
  goals text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists speech_profiles_user_idx on public.speech_profiles(user_id,updated_at desc);
alter table public.speech_profiles enable row level security;
revoke all on public.speech_profiles from anon;
grant select,insert,update,delete on public.speech_profiles to authenticated;
create policy speech_profiles_owner_select on public.speech_profiles for select to authenticated using (user_id = (select auth.uid()));
create policy speech_profiles_owner_insert on public.speech_profiles for insert to authenticated with check (user_id = (select auth.uid()));
create policy speech_profiles_owner_update on public.speech_profiles for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy speech_profiles_owner_delete on public.speech_profiles for delete to authenticated using (user_id = (select auth.uid()));
