# Metronome builder

Gives every new or replaced drop a verified metronome, with no redeploy.

- **When:** GitHub Actions, every 15 minutes (`.github/workflows/metronome-builder.yml`),
  or on demand from the Actions tab ("Run workflow").
- **What:** for each published or scheduled drop whose audio has no current map, it
  downloads the audio (read-only, size and MD5 checked), runs the pinned Beat This!
  final0 model, and chooses the beats by experiment against the audio (`verify.py`: kick/
  bass phase scan per section, steady grid or DP path, 20 ms limit).
- **Output:** `beat-maps/<content id>.json` in Supabase storage (public bucket). The
  player reads it there, and falls back to `public/beat-maps/` only if storage has no record.
- **Fails safe:** a drop that does not pass gets a record with no beats, so it shows no
  metronome. It is rebuilt automatically when its audio is replaced. To retry it on
  purpose, run the workflow with `force` and `only` set to its content id.
- **Never:** writes, moves or deletes audio; prints the service key; uploads audio
  anywhere (this repository and its logs are public).

Setup: repository secret `SUPABASE_SERVICE_ROLE_KEY`, and the `beat-maps` bucket
(migration `20261121200000_beat_maps_bucket.sql`).

Local run (from this folder, with the research venv):
`python builder.py plan` / `python builder.py build --dry-run --out <folder>`.

Equivalence (2026-11-21): a dry run over all 8 live drops reproduced the approved,
listening-tested maps in `public/beat-maps/` exactly, every field and every beat.
Timing at playback speeds is separate: see the acoustic timing lab (research branch).
