-- ============================================
-- Portfolio Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Profiles table (single row for portfolio owner)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Your Name',
  tagline text default 'Software Developer',
  bio text default 'Write your bio here...',
  avatar_url text default '',
  social_links jsonb default '{"github":"","linkedin":"","twitter":"","email":""}',
  updated_at timestamptz default now()
);

-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  image_url text default '',
  tech_stack text[] default '{}',
  live_url text default '',
  repo_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Articles table
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text default '',
  content text default '',
  tags text[] default '{}',
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Insert default profile row
insert into profiles (name, tagline, bio, avatar_url, social_links)
values (
  'Your Name',
  'Software Developer',
  'Hello! I am a passionate developer building cool things.',
  '',
  '{"github":"https://github.com","linkedin":"https://linkedin.com","twitter":"https://twitter.com","email":"hello@example.com"}'
);

-- Enable RLS (Row Level Security)
alter table profiles enable row level security;
alter table projects enable row level security;
alter table articles enable row level security;

-- Public read policies
create policy "Public can read profiles" on profiles for select using (true);
create policy "Public can read projects" on projects for select using (true);
create policy "Public can read published articles" on articles for select using (published = true);

-- Authenticated user write policies
create policy "Auth users can update profiles" on profiles for update using (auth.role() = 'authenticated');
create policy "Auth users can manage projects" on projects for all using (auth.role() = 'authenticated');
create policy "Auth users can manage articles" on articles for all using (auth.role() = 'authenticated');
