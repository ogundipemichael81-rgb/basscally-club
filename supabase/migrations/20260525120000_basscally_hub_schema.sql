-- BH-02: Basscally Hub core schema (Postgres / Supabase EU)
-- Safe to re-run: uses IF NOT EXISTS where supported.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  country text,
  is_founding_member boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);

-- subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  provider text NOT NULL,
  provider_customer_id text,
  provider_subscription_id text,
  provider_variant_id text,
  provider_price_id text,
  plan_code text NOT NULL,
  status text NOT NULL,
  current_period_start timestamptz,
  current_period_end timestamptz,
  renews_at timestamptz,
  ends_at timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  customer_portal_url text,
  update_payment_method_url text,
  last_webhook_event_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_provider_subscription_id_unique
  ON public.subscriptions (provider_subscription_id)
  WHERE provider_subscription_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON public.subscriptions (status);

-- artists table
CREATE TABLE IF NOT EXISTS public.artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  bio text,
  hero_image_url text,
  tiktok_handle text,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- styles table
CREATE TABLE IF NOT EXISTS public.styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  artist_id uuid NOT NULL REFERENCES public.artists (id) ON DELETE CASCADE,
  title text NOT NULL,
  headline text,
  description text,
  hero_image_url text,
  default_difficulty text,
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS styles_artist_id_idx ON public.styles (artist_id);

-- content table
CREATE TABLE IF NOT EXISTS public.content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  description text,
  difficulty text,
  audio_storage_key text,
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft',
  scheduled_for timestamptz,
  published_at timestamptz,
  email_subject text,
  email_body text,
  created_by_admin_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS content_status_published_at_idx
  ON public.content (status, published_at DESC);

-- content_style_tags (junction)
CREATE TABLE IF NOT EXISTS public.content_style_tags (
  content_id uuid NOT NULL REFERENCES public.content (id) ON DELETE CASCADE,
  style_id uuid NOT NULL REFERENCES public.styles (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (content_id, style_id)
);

-- waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  experience_level text,
  style_interest text,
  note text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- downloads table
CREATE TABLE IF NOT EXISTS public.downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  content_id uuid NOT NULL REFERENCES public.content (id) ON DELETE CASCADE,
  downloaded_at timestamptz NOT NULL DEFAULT now(),
  ip_hash text,
  user_agent_hash text
);

CREATE INDEX IF NOT EXISTS downloads_user_id_idx ON public.downloads (user_id);
CREATE INDEX IF NOT EXISTS downloads_content_id_idx ON public.downloads (content_id);

-- Email + audit (post-MVP automation; created now for webhook/cron wiring)
CREATE TABLE IF NOT EXISTS public.email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users (id),
  content_id uuid REFERENCES public.content (id),
  email_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts text NOT NULL DEFAULT '0',
  scheduled_for timestamptz,
  locked_at timestamptz,
  provider_message_id text,
  error_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users (id),
  content_id uuid REFERENCES public.content (id),
  email_type text NOT NULL,
  status text NOT NULL,
  provider_message_id text,
  provider_event_id text,
  error_reason text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid,
  actor_email text,
  action text NOT NULL,
  entity_type text,
  entity_id text,
  metadata_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Founding member counter helper (cap 500)
CREATE OR REPLACE VIEW public.founding_member_stats AS
SELECT
  count(*) FILTER (WHERE is_founding_member) AS founding_count,
  500::integer AS founding_cap,
  greatest(0, 500 - count(*) FILTER (WHERE is_founding_member))::integer AS spots_remaining
FROM public.users;
