-- ─────────────────────────────────────────────────────
--  CDSC@SCOE — Supabase Database Setup
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────

-- 1. PROFILES TABLE
--    Mirrors auth.users with extra CDSC-specific fields
-- ─────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  full_name     text,
  year          text,
  roll_no       text,
  domains       text[],         -- array of selected domain names
  avatar_url    text,
  is_verified   boolean default false,
  is_admin      boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- 2. ENABLE ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- 3. RLS POLICIES
-- ─────────────────────────────────────────────────────

-- Users can view their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile (triggered on signup)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Members can view all profiles (for community directory - optional)
-- Uncomment if you want a member directory feature:
-- create policy "Members can view all profiles"
--   on public.profiles for select
--   using (auth.uid() is not null);

-- 4. AUTO-CREATE PROFILE ON SIGNUP
--    This trigger fires when a new user signs up (email or OAuth)
-- ─────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, year, roll_no, domains)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'year',
    new.raw_user_meta_data->>'roll_no',
    case
      when new.raw_user_meta_data->'domains' is not null
      then array(select jsonb_array_elements_text(new.raw_user_meta_data->'domains'))
      else '{}'::text[]
    end
  );
  return new;
end;
$$ language plpgsql security definer;

-- Attach trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. UPDATED_AT AUTO-UPDATE
-- ─────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- 6. RESOURCES TABLE (for Phase 3 admin uploads)
-- ─────────────────────────────────────────────────────
create table if not exists public.resources (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  domain      text,
  type        text,             -- 'video', 'pdf', 'blog', 'document'
  url         text,
  is_public   boolean default false,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz default now()
);

alter table public.resources enable row level security;

-- Public resources visible to all
create policy "Public resources are visible to all"
  on public.resources for select
  using (is_public = true);

-- Private resources visible to logged-in members
create policy "Members can view all resources"
  on public.resources for select
  using (auth.uid() is not null);

-- Only admins can insert/update resources
create policy "Admins can manage resources"
  on public.resources for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- ─────────────────────────────────────────────────────
--  DONE! Your Supabase DB is ready for CDSC.
--  Next: Enable Google OAuth in Auth → Providers → Google
-- ─────────────────────────────────────────────────────
