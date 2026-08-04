-- One intentional, Basscally-owned published preview. Premium storage stays private.
alter table public.content
  add column if not exists is_free_preview boolean not null default false;

create unique index if not exists content_one_published_free_preview
  on public.content ((is_free_preview))
  where is_free_preview = true and status = 'published';
