-- Metronome beat maps: one small public JSON file per drop (beat times only).
-- Written only by the metronome builder with the service role (which bypasses RLS);
-- public read so the player can fetch a map without a signed URL. No other policies.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'beat-maps',
  'beat-maps',
  true,
  1048576,
  ARRAY['application/json']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;
