-- Apply once in the Supabase project SQL editor, or through a connected admin tool.
-- No service key is required by the website. All identity comes from auth.uid().
begin;

create table if not exists public.gym_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null default 0 check (revision >= 0),
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 262144),
  updated_at timestamptz not null default now()
);
create table if not exists public.gym_state_backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  revision bigint not null check (revision > 0),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  created_at timestamptz not null default now(),
  unique(user_id,revision)
);
create index if not exists gym_backup_user_revision on public.gym_state_backups(user_id,revision desc);

alter table public.gym_states enable row level security;
alter table public.gym_states force row level security;
alter table public.gym_state_backups enable row level security;
alter table public.gym_state_backups force row level security;
revoke all on public.gym_states,public.gym_state_backups from public,anon,authenticated;
grant select on public.gym_states,public.gym_state_backups to authenticated;

do $$ begin
  if not exists(select 1 from pg_policies where schemaname='public' and tablename='gym_states' and policyname='gym_read_own_state') then
    create policy gym_read_own_state on public.gym_states for select to authenticated using ((select auth.uid())=user_id);
  end if;
  if not exists(select 1 from pg_policies where schemaname='public' and tablename='gym_state_backups' and policyname='gym_read_own_backups') then
    create policy gym_read_own_backups on public.gym_state_backups for select to authenticated using ((select auth.uid())=user_id);
  end if;
end $$;

create or replace function public.save_gym_state(p_expected_revision bigint,p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  owner_id uuid := auth.uid();
  existing public.gym_states%rowtype;
  next_revision bigint;
  saved_at timestamptz := pg_catalog.transaction_timestamp();
begin
  if owner_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if p_expected_revision is null or p_expected_revision < 0 or p_payload is null or pg_catalog.jsonb_typeof(p_payload)<>'object' or pg_catalog.octet_length(p_payload::text)>262144 then
    raise exception 'Invalid gym state' using errcode='22023';
  end if;

  -- The unique owner row and FOR UPDATE serialize competing devices atomically.
  insert into public.gym_states(user_id,revision,payload,updated_at)
    values(owner_id,0,'{}'::jsonb,saved_at) on conflict(user_id) do nothing;
  select * into existing from public.gym_states where user_id=owner_id for update;
  if existing.revision<>p_expected_revision then
    return pg_catalog.jsonb_build_object('ok',false,'code','conflict','revision',existing.revision,'state',existing.payload,'updatedAt',existing.updated_at);
  end if;
  if existing.revision>0 then
    insert into public.gym_state_backups(user_id,revision,payload,created_at)
      values(owner_id,existing.revision,existing.payload,saved_at) on conflict(user_id,revision) do nothing;
  end if;
  next_revision := existing.revision+1;
  update public.gym_states set revision=next_revision,payload=p_payload,updated_at=saved_at where user_id=owner_id;
  delete from public.gym_state_backups where user_id=owner_id and revision not in
    (select revision from public.gym_state_backups where user_id=owner_id order by revision desc limit 10);
  return pg_catalog.jsonb_build_object('ok',true,'revision',next_revision,'updatedAt',saved_at);
end;
$$;

revoke all on function public.save_gym_state(bigint,jsonb) from public,anon,authenticated;
grant execute on function public.save_gym_state(bigint,jsonb) to authenticated;
comment on function public.save_gym_state(bigint,jsonb) is 'User-scoped optimistic save with ten previous revisions; owner is always auth.uid(), never supplied by the client.';
notify pgrst,'reload schema';
commit;
