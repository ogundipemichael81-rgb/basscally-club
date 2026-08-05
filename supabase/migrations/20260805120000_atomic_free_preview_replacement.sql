-- Keep exactly one published, audio-backed free preview while allowing admins
-- to replace which published drop occupies that permanent position.
create or replace function public.replace_published_free_preview(p_new_content_id uuid)
returns public.content
language plpgsql
set search_path = public
as $$
declare
  selected public.content;
begin
  select * into selected
  from public.content
  where id = p_new_content_id
    and status = 'published'
    and audio_storage_key is not null
  for update;

  if not found then
    raise exception 'The selected preview must be published and have audio.' using errcode = '22023';
  end if;

  update public.content
  set is_free_preview = false,
      updated_at = now()
  where status = 'published'
    and is_free_preview = true
    and id <> p_new_content_id;

  update public.content
  set is_free_preview = true,
      updated_at = now()
  where id = p_new_content_id;

  if (select count(*) from public.content where status = 'published' and is_free_preview = true) <> 1 then
    raise exception 'Preview replacement did not leave exactly one published preview.' using errcode = 'P0001';
  end if;

  select * into selected from public.content where id = p_new_content_id;
  return selected;
end;
$$;

revoke all on function public.replace_published_free_preview(uuid) from public;
grant execute on function public.replace_published_free_preview(uuid) to service_role;
