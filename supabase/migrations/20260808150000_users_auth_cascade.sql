-- Ensure application profiles are removed when their Supabase Auth identity is deleted.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_auth_id_fkey') THEN
    ALTER TABLE public.users
      ADD CONSTRAINT users_auth_id_fkey
      FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
