-- Daily writing and speech practice, private to the authenticated user.
create table if not exists public.daily_practices (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 profile_id uuid references public.speech_profiles(id) on delete set null,
 prompt_id text not null,
 original_text text not null default '',
 rewritten_text text not null default '',
 spoken_transcript text not null default '',
 duration_seconds integer,
 words_per_minute integer,
 feedback jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists daily_practices_owner_date_idx on public.daily_practices(user_id,created_at desc);
alter table public.daily_practices enable row level security;
revoke all on public.daily_practices from anon;
grant select,insert,delete on public.daily_practices to authenticated;
drop policy if exists daily_practices_select on public.daily_practices;
drop policy if exists daily_practices_insert on public.daily_practices;
drop policy if exists daily_practices_delete on public.daily_practices;
create policy daily_practices_select on public.daily_practices for select to authenticated using (user_id=(select auth.uid()));
create policy daily_practices_insert on public.daily_practices for insert to authenticated with check (user_id=(select auth.uid()) and (profile_id is null or exists(select 1 from public.speech_profiles p where p.id=profile_id and p.user_id=(select auth.uid()))));
create policy daily_practices_delete on public.daily_practices for delete to authenticated using (user_id=(select auth.uid()));
