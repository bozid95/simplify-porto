-- ============================================
-- Update Projects Table Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Add new columns
alter table projects 
add column if not exists content text default '',
add column if not exists slug text,
add column if not exists visibility text not null default 'draft';

alter table projects
drop constraint if exists projects_visibility_check;

alter table projects
add constraint projects_visibility_check
check (visibility in ('draft', 'public'));

-- Create a unique index on slug
create unique index if not exists projects_slug_idx on projects (slug);

-- Preserve existing portfolio entries as public, while new rows default to draft
update projects
set visibility = 'public';

-- (Optional) If you have existing data, you might want to auto-generate slugs
-- But for now, we leave them null or let the user update them manually via dashboard.
-- If you want to force slug to be not null, you'd need to fill existing rows first.
