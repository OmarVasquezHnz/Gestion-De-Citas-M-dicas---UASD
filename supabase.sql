-- Ejecutar en el SQL Editor de Supabase
create table if not exists public.app_storage (
    key text primary key,
    value jsonb not null default '[]'::jsonb,
    updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_app_storage_updated_at on public.app_storage;
create trigger trg_app_storage_updated_at
before update on public.app_storage
for each row
execute function public.set_updated_at();
