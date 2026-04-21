/* -- ============================================
-- Analytics Schema + Rollups
-- Run this in your Supabase SQL Editor
-- ============================================

-- Raw analytics events
create table if not exists analytics (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  user_agent text,
  referrer text,
  device_type text,
  country text,
  session_id text,
  created_at timestamptz default now()
);

-- Summary tables for fast dashboard queries
create table if not exists analytics_daily_totals (
  summary_date date primary key,
  views integer not null default 0,
  unique_visitors integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists analytics_daily_path_summary (
  summary_date date not null,
  path text not null,
  views integer not null default 0,
  unique_visitors integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (summary_date, path)
);

create table if not exists analytics_daily_device_summary (
  summary_date date not null,
  device_type text not null,
  views integer not null default 0,
  unique_visitors integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (summary_date, device_type)
);

-- Helper tables for exact unique-visitor rollups without scanning raw events
create table if not exists analytics_daily_total_sessions (
  summary_date date not null,
  session_id text not null,
  primary key (summary_date, session_id)
);

create table if not exists analytics_daily_path_sessions (
  summary_date date not null,
  path text not null,
  session_id text not null,
  primary key (summary_date, path, session_id)
);

create table if not exists analytics_daily_device_sessions (
  summary_date date not null,
  device_type text not null,
  session_id text not null,
  primary key (summary_date, device_type, session_id)
);

create or replace function public.track_analytics_rollup()
returns trigger
language plpgsql
as $$
declare
  event_date date := timezone('utc', new.created_at)::date;
  normalized_path text := split_part(coalesce(new.path, '/'), '?', 1);
  normalized_device text := coalesce(nullif(trim(new.device_type), ''), 'Desktop');
  inserted_total_session integer := 0;
  inserted_path_session integer := 0;
  inserted_device_session integer := 0;
begin
  insert into analytics_daily_totals (summary_date, views, unique_visitors, updated_at)
  values (event_date, 1, 0, now())
  on conflict (summary_date)
  do update set
    views = analytics_daily_totals.views + 1,
    updated_at = now();

  insert into analytics_daily_path_summary (summary_date, path, views, unique_visitors, updated_at)
  values (event_date, normalized_path, 1, 0, now())
  on conflict (summary_date, path)
  do update set
    views = analytics_daily_path_summary.views + 1,
    updated_at = now();

  insert into analytics_daily_device_summary (summary_date, device_type, views, unique_visitors, updated_at)
  values (event_date, normalized_device, 1, 0, now())
  on conflict (summary_date, device_type)
  do update set
    views = analytics_daily_device_summary.views + 1,
    updated_at = now();

  if new.session_id is not null and trim(new.session_id) <> '' then
    insert into analytics_daily_total_sessions (summary_date, session_id)
    values (event_date, new.session_id)
    on conflict do nothing;
    get diagnostics inserted_total_session = row_count;

    if inserted_total_session > 0 then
      update analytics_daily_totals
      set unique_visitors = unique_visitors + 1,
          updated_at = now()
      where summary_date = event_date;
    end if;

    insert into analytics_daily_path_sessions (summary_date, path, session_id)
    values (event_date, normalized_path, new.session_id)
    on conflict do nothing;
    get diagnostics inserted_path_session = row_count;

    if inserted_path_session > 0 then
      update analytics_daily_path_summary
      set unique_visitors = unique_visitors + 1,
          updated_at = now()
      where summary_date = event_date
        and path = normalized_path;
    end if;

    insert into analytics_daily_device_sessions (summary_date, device_type, session_id)
    values (event_date, normalized_device, new.session_id)
    on conflict do nothing;
    get diagnostics inserted_device_session = row_count;

    if inserted_device_session > 0 then
      update analytics_daily_device_summary
      set unique_visitors = unique_visitors + 1,
          updated_at = now()
      where summary_date = event_date
        and device_type = normalized_device;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists analytics_rollup_trigger on analytics;
create trigger analytics_rollup_trigger
after insert on analytics
for each row
execute function public.track_analytics_rollup();

create or replace function public.rebuild_analytics_rollups()
returns void
language plpgsql
as $$
begin
  truncate table
    analytics_daily_totals,
    analytics_daily_path_summary,
    analytics_daily_device_summary,
    analytics_daily_total_sessions,
    analytics_daily_path_sessions,
    analytics_daily_device_sessions;

  insert into analytics_daily_totals (summary_date, views, unique_visitors, updated_at)
  select
    timezone('utc', created_at)::date as summary_date,
    count(*)::integer as views,
    count(distinct session_id)::integer as unique_visitors,
    now()
  from analytics
  group by 1;

  insert into analytics_daily_path_summary (summary_date, path, views, unique_visitors, updated_at)
  select
    timezone('utc', created_at)::date as summary_date,
    split_part(coalesce(path, '/'), '?', 1) as path,
    count(*)::integer as views,
    count(distinct session_id)::integer as unique_visitors,
    now()
  from analytics
  group by 1, 2;

  insert into analytics_daily_device_summary (summary_date, device_type, views, unique_visitors, updated_at)
  select
    timezone('utc', created_at)::date as summary_date,
    coalesce(nullif(trim(device_type), ''), 'Desktop') as device_type,
    count(*)::integer as views,
    count(distinct session_id)::integer as unique_visitors,
    now()
  from analytics
  group by 1, 2;

  insert into analytics_daily_total_sessions (summary_date, session_id)
  select distinct
    timezone('utc', created_at)::date as summary_date,
    session_id
  from analytics
  where session_id is not null and trim(session_id) <> '';

  insert into analytics_daily_path_sessions (summary_date, path, session_id)
  select distinct
    timezone('utc', created_at)::date as summary_date,
    split_part(coalesce(path, '/'), '?', 1) as path,
    session_id
  from analytics
  where session_id is not null and trim(session_id) <> '';

  insert into analytics_daily_device_sessions (summary_date, device_type, session_id)
  select distinct
    timezone('utc', created_at)::date as summary_date,
    coalesce(nullif(trim(device_type), ''), 'Desktop') as device_type,
    session_id
  from analytics
  where session_id is not null and trim(session_id) <> '';
end;
$$;

create or replace function public.cleanup_old_analytics(retention_days integer default 90)
returns void
language sql
as $$
  delete from analytics
  where created_at < now() - make_interval(days => retention_days);
$$;

-- Enable RLS
alter table analytics enable row level security;
alter table analytics_daily_totals enable row level security;
alter table analytics_daily_path_summary enable row level security;
alter table analytics_daily_device_summary enable row level security;
alter table analytics_daily_total_sessions enable row level security;
alter table analytics_daily_path_sessions enable row level security;
alter table analytics_daily_device_sessions enable row level security;

-- Policies
drop policy if exists "Public can insert analytics" on analytics;
create policy "Public can insert analytics" on analytics for insert with check (true);

drop policy if exists "Admins can view analytics" on analytics;
create policy "Admins can view analytics" on analytics for select using (auth.role() = 'authenticated');

drop policy if exists "Admins can view analytics daily totals" on analytics_daily_totals;
create policy "Admins can view analytics daily totals" on analytics_daily_totals for select using (auth.role() = 'authenticated');

drop policy if exists "Admins can view analytics path summary" on analytics_daily_path_summary;
create policy "Admins can view analytics path summary" on analytics_daily_path_summary for select using (auth.role() = 'authenticated');

drop policy if exists "Admins can view analytics device summary" on analytics_daily_device_summary;
create policy "Admins can view analytics device summary" on analytics_daily_device_summary for select using (auth.role() = 'authenticated');

drop policy if exists "Admins can view analytics total sessions" on analytics_daily_total_sessions;
create policy "Admins can view analytics total sessions" on analytics_daily_total_sessions for select using (auth.role() = 'authenticated');

drop policy if exists "Admins can view analytics path sessions" on analytics_daily_path_sessions;
create policy "Admins can view analytics path sessions" on analytics_daily_path_sessions for select using (auth.role() = 'authenticated');

drop policy if exists "Admins can view analytics device sessions" on analytics_daily_device_sessions;
create policy "Admins can view analytics device sessions" on analytics_daily_device_sessions for select using (auth.role() = 'authenticated');

-- Raw-event indexes
create index if not exists analytics_path_idx on analytics(path);
create index if not exists analytics_created_at_idx on analytics(created_at);
create index if not exists analytics_session_id_idx on analytics(session_id);

-- Rollup indexes
create index if not exists analytics_daily_totals_summary_date_idx on analytics_daily_totals(summary_date);
create index if not exists analytics_daily_path_summary_date_idx on analytics_daily_path_summary(summary_date);
create index if not exists analytics_daily_path_summary_path_idx on analytics_daily_path_summary(path);
create index if not exists analytics_daily_device_summary_date_idx on analytics_daily_device_summary(summary_date);

-- Build rollups for existing analytics data
select public.rebuild_analytics_rollups();
 */