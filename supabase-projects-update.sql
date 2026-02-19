-- ============================================
-- Update Projects Table Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Add new columns
alter table projects 
add column if not exists content text default '',
add column if not exists slug text;

-- Create a unique index on slug
create unique index if not exists projects_slug_idx on projects (slug);

-- (Optional) If you have existing data, you might want to auto-generate slugs
-- But for now, we leave them null or let the user update them manually via dashboard.
-- If you want to force slug to be not null, you'd need to fill existing rows first.
