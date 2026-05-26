-- BH-02: RLS policy plan (enable on public tables; tighten in BH-03/BH-04 with auth.uid())

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_style_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS. Member reads use policies added when Supabase Auth is wired (BH-04).

DROP POLICY IF EXISTS waitlist_insert_anon ON public.waitlist;
CREATE POLICY waitlist_insert_anon ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS artists_select_public ON public.artists;
CREATE POLICY artists_select_public ON public.artists
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS styles_select_published ON public.styles;
CREATE POLICY styles_select_published ON public.styles
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS content_select_published ON public.content;
CREATE POLICY content_select_published ON public.content
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS content_style_tags_select_public ON public.content_style_tags;
CREATE POLICY content_style_tags_select_public ON public.content_style_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Storage: members stream/download via signed URLs from server (service role). No direct anon read on audio.

DROP POLICY IF EXISTS covers_public_read ON storage.objects;
CREATE POLICY covers_public_read ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'covers');

DROP POLICY IF EXISTS audio_service_role_all ON storage.objects;
CREATE POLICY audio_service_role_all ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'audio')
  WITH CHECK (bucket_id = 'audio');

DROP POLICY IF EXISTS covers_service_role_write ON storage.objects;
CREATE POLICY covers_service_role_write ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'covers')
  WITH CHECK (bucket_id = 'covers');
