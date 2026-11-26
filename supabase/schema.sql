-- Speech Mentor AI: practice history
-- Run once in the Supabase SQL editor.

create table if not exists public.practice_attempts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  scene_title text not null default '',
  spoken text not null default '',
  wpm integer not null default 0,
  energy text not null default '',
  feedback text not null default ''
);

-- Only the Worker (service role key) reads and writes this table.
alter table public.practice_attempts enable row level security;

create index if not exists practice_attempts_created_at_idx
  on public.practice_attempts (created_at desc);
