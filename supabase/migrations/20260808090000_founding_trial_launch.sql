ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS trial_started_at timestamptz,
  ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz,
  ADD COLUMN IF NOT EXISTS founding_eligible boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS founding_price_locked boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS founding_locked_at timestamptz,
  ADD COLUMN IF NOT EXISTS founding_price_cents integer,
  ADD COLUMN IF NOT EXISTS founding_currency text NOT NULL DEFAULT 'USD';

CREATE INDEX IF NOT EXISTS users_trial_ends_at_idx ON public.users (trial_ends_at);
CREATE INDEX IF NOT EXISTS users_founding_eligible_idx ON public.users (founding_eligible);

CREATE OR REPLACE FUNCTION public.provision_founding_trial(p_user_id uuid)
RETURNS public.users LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE result public.users;
BEGIN
  UPDATE public.users
  SET trial_started_at = COALESCE(trial_started_at, created_at),
      trial_ends_at = COALESCE(trial_ends_at, created_at + interval '7 days'),
      founding_eligible = CASE WHEN trial_started_at IS NULL THEN created_at >= timestamptz '2026-08-08T00:00:00Z' AND created_at < timestamptz '2026-08-15T00:00:00Z' ELSE founding_eligible END,
      founding_price_locked = CASE WHEN trial_started_at IS NULL THEN created_at >= timestamptz '2026-08-08T00:00:00Z' AND created_at < timestamptz '2026-08-15T00:00:00Z' ELSE founding_price_locked END,
      founding_locked_at = CASE WHEN trial_started_at IS NULL AND created_at >= timestamptz '2026-08-08T00:00:00Z' AND created_at < timestamptz '2026-08-15T00:00:00Z' THEN created_at ELSE founding_locked_at END,
      founding_price_cents = CASE WHEN trial_started_at IS NULL AND created_at >= timestamptz '2026-08-08T00:00:00Z' AND created_at < timestamptz '2026-08-15T00:00:00Z' THEN 150 ELSE founding_price_cents END
  WHERE id = p_user_id RETURNING * INTO result;
  IF NOT FOUND THEN RAISE EXCEPTION 'User profile not found'; END IF;
  RETURN result;
END; $$;

REVOKE ALL ON FUNCTION public.provision_founding_trial(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.provision_founding_trial(uuid) TO service_role;
