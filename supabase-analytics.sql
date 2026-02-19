-- ============================================
-- Analytics Extension
-- Run this in your Supabase SQL Editor
-- ============================================

-- Analytics table
create table if not exists analytics (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  user_agent text,
  referrer text,
  device_type text,
  country text,
  session_id text, -- for unique visitor estimation
  created_at timestamptz default now()
);

-- Enable RLS
alter table analytics enable row level security;

-- Public can insert (track views)
create policy "Public can insert analytics" on analytics for insert with check (true);

-- Only authenticated users (admins) can view analytics
create policy "Admins can view analytics" on analytics for select using (auth.role() = 'authenticated');

-- Create indexes for performance
create index if not exists analytics_path_idx on analytics(path);
create index if not exists analytics_created_at_idx on analytics(created_at);
create index if not exists analytics_session_id_idx on analytics(session_id);
