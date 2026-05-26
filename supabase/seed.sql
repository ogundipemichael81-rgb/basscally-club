-- BH-02 seed: mock users, demo artist/style, 3 placeholder drops
-- Run after migrations: supabase db reset (local) or psql $DATABASE_URL -f supabase/seed.sql

-- Demo artist (Chris)
INSERT INTO public.artists (id, slug, name, bio, tiktok_handle, is_featured)
VALUES (
  'a0000000-0000-4000-8000-000000000001',
  'chris',
  'Chris',
  'Basscally Hub founder — TikTok bass educator and weekly drop curator.',
  '@basscally',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  bio = EXCLUDED.bio,
  tiktok_handle = EXCLUDED.tiktok_handle,
  is_featured = EXCLUDED.is_featured;

-- Demo style (conversion engine route)
INSERT INTO public.styles (id, slug, artist_id, title, headline, description, default_difficulty, is_published, sort_order)
VALUES (
  'b0000000-0000-4000-8000-000000000001',
  'makossa-tribe-fuego',
  'a0000000-0000-4000-8000-000000000001',
  'Makossa — Tribe Fuego',
  'Play Makossa like Tribe Fuego',
  'Weekly grooves and bass-less material from Chris and world-class bassists in the Makossa pocket.',
  'intermediate',
  true,
  1
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  headline = EXCLUDED.headline,
  description = EXCLUDED.description,
  is_published = EXCLUDED.is_published;

-- Mock users (auth linked in BH-04)
INSERT INTO public.users (id, email, name, is_founding_member)
VALUES
  (
    'c0000000-0000-4000-8000-000000000001',
    'mock-member-active@basscally.club',
    'Mock Member Active',
    true
  ),
  (
    'c0000000-0000-4000-8000-000000000002',
    'mock-member-lapsed@basscally.club',
    'Mock Member Lapsed',
    false
  ),
  (
    'c0000000-0000-4000-8000-000000000003',
    'mock-admin-michael@basscally.club',
    'Mock Admin Michael',
    false
  )
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.subscriptions (
  id,
  user_id,
  provider,
  provider_subscription_id,
  plan_code,
  status,
  current_period_start,
  current_period_end,
  cancel_at_period_end
)
VALUES (
  'd0000000-0000-4000-8000-000000000001',
  'c0000000-0000-4000-8000-000000000001',
  'lemonsqueezy',
  'ls_mock_active_001',
  'founding_monthly',
  'active',
  now() - interval '10 days',
  now() + interval '20 days',
  false
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.subscriptions (
  id,
  user_id,
  provider,
  provider_subscription_id,
  plan_code,
  status,
  ends_at
)
VALUES (
  'd0000000-0000-4000-8000-000000000002',
  'c0000000-0000-4000-8000-000000000002',
  'lemonsqueezy',
  'ls_mock_lapsed_001',
  'standard_monthly',
  'expired',
  now() - interval '3 days'
)
ON CONFLICT (id) DO NOTHING;

-- 3 placeholder drops (published)
INSERT INTO public.content (
  id,
  title,
  type,
  description,
  difficulty,
  audio_storage_key,
  cover_image_url,
  status,
  published_at
)
VALUES
  (
    'e0000000-0000-4000-8000-000000000001',
    'Pocket Groove — Placeholder 01',
    'groove',
    'Short looped pattern for weekly practice. Replace with real audio in admin upload.',
    'beginner',
    'audio/placeholder/groove-01.mp3',
    'covers/placeholder/groove-01.webp',
    'published',
    now() - interval '7 days'
  ),
  (
    'e0000000-0000-4000-8000-000000000002',
    'Transition Fill — Placeholder 02',
    'fill',
    'Transitional phrase placeholder from Chris and world-class bassists.',
    'intermediate',
    'audio/placeholder/fill-02.mp3',
    'covers/placeholder/fill-02.webp',
    'published',
    now() - interval '3 days'
  ),
  (
    'e0000000-0000-4000-8000-000000000003',
    'Bass-less Cover — Placeholder 03',
    'bassless_track',
    'Weekly bass-less cover placeholder for the Hub dashboard and style page previews.',
    'advanced',
    'audio/placeholder/bassless-03.mp3',
    'covers/placeholder/bassless-03.webp',
    'published',
    now() - interval '1 day'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at;

INSERT INTO public.content_style_tags (content_id, style_id)
VALUES
  ('e0000000-0000-4000-8000-000000000001', 'b0000000-0000-4000-8000-000000000001'),
  ('e0000000-0000-4000-8000-000000000002', 'b0000000-0000-4000-8000-000000000001'),
  ('e0000000-0000-4000-8000-000000000003', 'b0000000-0000-4000-8000-000000000001')
ON CONFLICT DO NOTHING;
