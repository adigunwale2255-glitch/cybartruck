-- ============================================================
-- CYBERFORGE SUPABASE DATABASE SCHEMA
-- Includes Authentication, User Profiles, Public & Private Messaging,
-- Row Level Security (RLS), Realtime Replication, and Indices.
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text default 'CyberForge Enthusiast',
  truck_model text default 'Cyberbeast Tri-Motor',
  is_online boolean default false,
  last_seen timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. MESSAGES TABLE (PUBLIC COMMUNITY CHAT ROOM)
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  image_url text,
  reply_to_id uuid references public.messages(id) on delete set null,
  build_data jsonb, -- Attached Cybertruck customization spec
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- 3. DIRECT MESSAGES TABLE (1-TO-1 PRIVATE MESSAGING)
create table if not exists public.direct_messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  image_url text,
  reply_to_id uuid references public.direct_messages(id) on delete set null,
  build_data jsonb,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- 4. SAVED VEHICLE CUSTOMIZATIONS
create table if not exists public.custom_builds (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  wrap_color text not null,
  wheels text not null,
  powertrain text not null,
  accessories jsonb default '[]'::jsonb,
  interior text not null,
  total_price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. BLOCKED USERS TABLE
create table if not exists public.blocked_users (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  blocked_user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, blocked_user_id)
);

-- 6. REPORTED MESSAGES TABLE
create table if not exists public.reported_messages (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references public.profiles(id) on delete cascade not null,
  message_id uuid not null,
  reason text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.direct_messages enable row level security;
alter table public.custom_builds enable row level security;
alter table public.blocked_users enable row level security;
alter table public.reported_messages enable row level security;

-- Profiles: Anyone authenticated can read all profiles; users can only update their own
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Public Messages: Anyone can read messages that are not soft-deleted
create policy "Public messages viewable by all." on public.messages
  for select using (deleted_at is null);

create policy "Authenticated users can post public messages." on public.messages
  for insert with check (auth.uid() = sender_id);

create policy "Users can delete own messages." on public.messages
  for update using (auth.uid() = sender_id);

-- Direct Messages: Private between sender and recipient ONLY
create policy "Direct messages viewable only by sender or recipient." on public.direct_messages
  for select using (
    auth.uid() = sender_id or auth.uid() = recipient_id
  );

create policy "Users can send direct messages." on public.direct_messages
  for insert with check (auth.uid() = sender_id);

create policy "Sender or recipient can mark as read / delete." on public.direct_messages
  for update using (auth.uid() = sender_id or auth.uid() = recipient_id);

-- Custom Builds: Publicly viewable, editable only by owner
create policy "Custom builds viewable by everyone." on public.custom_builds
  for select using (true);

create policy "Users can manage own custom builds." on public.custom_builds
  for all using (auth.uid() = user_id);

-- Blocked Users: Only the blocker can view and manage their blocked list
create policy "Users can view and manage their own blocks." on public.blocked_users
  for all using (auth.uid() = user_id);

-- Reports: Authenticated users can insert reports
create policy "Users can report messages." on public.reported_messages
  for insert with check (auth.uid() = reporter_id);

-- ============================================================
-- ENABLE REALTIME REPLICATION
-- ============================================================
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.direct_messages;

-- Trigger to create profile when auth.user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
