-- Production-safe scheduled publishing for Vercel Hobby.
-- Scheduler runs in Postgres; publishing does not depend on Vercel Cron or email delivery.
CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION public.publish_due_scheduled_content()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected_count integer;
BEGIN
  WITH published AS (
    UPDATE public.content
    SET
      status = 'published',
      published_at = COALESCE(published_at, now()),
      updated_at = now()
    WHERE status = 'scheduled'
      AND scheduled_for IS NOT NULL
      AND scheduled_for <= now()
    RETURNING id
  )
  SELECT count(*) INTO affected_count FROM published;

  RETURN affected_count;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_due_scheduled_content() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.publish_due_scheduled_content() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.publish_due_scheduled_content() TO postgres, service_role;

-- Keep exactly one named job if this migration is re-applied in a restored environment.
DO $$
DECLARE existing_job_id bigint;
BEGIN
  SELECT jobid INTO existing_job_id FROM cron.job WHERE jobname = 'basscally-publish-due-content' LIMIT 1;
  IF existing_job_id IS NOT NULL THEN
    PERFORM cron.unschedule(existing_job_id);
  END IF;
  PERFORM cron.schedule(
    'basscally-publish-due-content',
    '*/5 * * * *',
    'SELECT public.publish_due_scheduled_content()'
  );
END;
$$;

-- Manual verification queries (run in Supabase SQL Editor after migration):
-- SELECT status FROM public.content WHERE id = '<future scheduled id>'; -- remains scheduled
-- SELECT public.publish_due_scheduled_content();
-- SELECT status, published_at FROM public.content WHERE id = '<due scheduled id>'; -- published
-- SELECT status, published_at FROM public.content WHERE id = '<published id>'; -- unchanged