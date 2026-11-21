"""Automatic metronome maps for new and replaced drops.

  python builder.py plan                 # which drops need a map (stdlib only, fast)
  python builder.py build [--dry-run] [--only <content id>] [--force]

For every published or scheduled drop with audio, the builder compares the audio's
storage eTag with the eTag recorded in that drop's map in the `beat-maps` bucket. A new
drop, replaced audio or a new map version triggers a build: download the audio (read
only), verify its size and MD5, run the pinned Beat This! model, choose the beats by
experiment against the audio (verify.py), and upload one JSON file to `beat-maps`.

A drop that does not pass gets a record with no beats, so the player shows no
metronome and the builder does not retry until the audio changes. The builder only ever
writes `beat-maps/<content id>.json`; it never writes, moves or deletes audio.

Environment: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY,
METRONOME_CHECKPOINT (path to the verified beat_this final0 checkpoint), optional
GITHUB_OUTPUT. Never prints the key or any signed URL; logs are public.
"""
import argparse
import hashlib
import json
import os
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

MAP_BUCKET = 'beat-maps'
AUDIO_BUCKET = 'audio'
BUILDER_MAP_VERSION = 'basscally-beat-map-3'  # must equal verify.MAP_VERSION (checked in tests)
CHECKPOINT_SHA256 = '8c328b45f59d8dd3dff219253ff6a8d6482be57d0133a29140e2febbf8eb8331'
CHECKPOINT_SIZE = 81058141
MAX_AUDIO_BYTES = 60 * 1024 * 1024
UUID = set('0123456789abcdef-')

class Supabase:
    def __init__(self, url, key):
        if not url or not key: raise SystemExit('MISSING_SUPABASE_URL_OR_SERVICE_ROLE_KEY')
        self.url = url.rstrip('/'); self.key = key

    def _request(self, method, path, body=None, headers=None, timeout=60):
        h = {'Authorization': f'Bearer {self.key}', 'apikey': self.key, **(headers or {})}
        return urllib.request.Request(self.url + path, data=body, headers=h, method=method), timeout

    def json(self, method, path, payload=None):
        body = json.dumps(payload).encode() if payload is not None else None
        req, timeout = self._request(method, path, body, {'Content-Type': 'application/json'} if body else None)
        with urllib.request.urlopen(req, timeout=timeout) as r: return json.loads(r.read() or b'null')

    def drops(self):
        query = urllib.parse.urlencode({'select': 'id,title,status,audio_storage_key',
                                        'audio_storage_key': 'not.is.null', 'status': 'in.(published,scheduled)',
                                        'order': 'created_at.asc'})
        return self.json('GET', f'/rest/v1/content?{query}')

    def audio_object(self, storage_key):
        """Metadata (size, eTag) of the stored audio, or None when it is missing."""
        path = storage_key[len(AUDIO_BUCKET) + 1:]
        parent, name = path.rsplit('/', 1)
        rows = self.json('POST', f'/storage/v1/object/list/{AUDIO_BUCKET}',
                         {'prefix': parent, 'limit': 100, 'search': name})
        row = next((r for r in rows or [] if r.get('name') == name), None)
        if not row or not row.get('metadata'): return None
        return {'path': path, 'size': int(row['metadata']['size']), 'etag': row['metadata']['eTag'].strip('"')}

    def current_map(self, content_id):
        req, timeout = self._request('GET', f'/storage/v1/object/{MAP_BUCKET}/{content_id}.json')
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r: return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code in (400, 404): return None  # storage answers 400 "not found" for missing objects
            raise

    def download_audio(self, path, target):
        req, _ = self._request('GET', f'/storage/v1/object/{AUDIO_BUCKET}/{urllib.parse.quote(path)}')
        with urllib.request.urlopen(req, timeout=300) as r, open(target, 'xb') as f:
            total = 0
            while block := r.read(1 << 20):
                total += len(block)
                if total > MAX_AUDIO_BYTES: raise RuntimeError('AUDIO_TOO_LARGE')
                f.write(block)

    def upload_map(self, content_id, record):
        # The only write the builder makes: one small JSON file per drop in the map bucket.
        if not is_uuid(content_id): raise RuntimeError('BAD_CONTENT_ID')
        body = (json.dumps(record, separators=(',', ':')) + '\n').encode()
        req, timeout = self._request('POST', f'/storage/v1/object/{MAP_BUCKET}/{content_id}.json', body,
                                     {'Content-Type': 'application/json', 'x-upsert': 'true', 'cache-control': 'max-age=60'})
        with urllib.request.urlopen(req, timeout=timeout) as r: r.read()

def is_uuid(value):
    return isinstance(value, str) and len(value) == 36 and set(value) <= UUID

def needs_build(drop, audio, current, force=False):
    """Why this drop needs a (re)build, or None when its map is current."""
    if audio is None: return None  # no audio stored yet: nothing to analyse
    if force: return 'forced'
    if current is None: return 'new drop'
    if current.get('version') != BUILDER_MAP_VERSION: return 'new map version'
    if current.get('audioEtag') != audio['etag']: return 'audio replaced'
    return None

def plan(db, only=None, force=False):
    work = []
    for drop in db.drops():
        if only and drop['id'] != only: continue
        if not is_uuid(drop['id']) or not str(drop['audio_storage_key']).startswith(f'{AUDIO_BUCKET}/drops/{drop["id"]}/'):
            print(f"skip {drop['id'][:8]} unexpected audio location"); continue
        audio = db.audio_object(drop['audio_storage_key'])
        reason = needs_build(drop, audio, db.current_map(drop['id']), force)
        if reason: work.append({**drop, 'audio': audio, 'reason': reason})
    return work

def file_digest(path, algorithm):
    h = hashlib.new(algorithm)
    with open(path, 'rb') as f:
        for block in iter(lambda: f.read(1 << 20), b''): h.update(block)
    return h.hexdigest()

def load_tracker(checkpoint):
    path = Path(checkpoint)
    if not path.is_file() or path.stat().st_size != CHECKPOINT_SIZE or file_digest(path, 'sha256') != CHECKPOINT_SHA256:
        raise SystemExit('CHECKPOINT_IDENTITY_FAIL')
    from beat_this.inference import File2Beats
    return File2Beats(checkpoint_path=str(path), device='cpu')

def build_one(db, tracker, drop, dry_run):
    import soundfile as sf
    from verify import choose_beats, compact_map
    audio = drop['audio']
    with tempfile.TemporaryDirectory() as tmp:
        target = Path(tmp)/('audio' + Path(audio['path']).suffix)
        db.download_audio(audio['path'], target)
        if target.stat().st_size != audio['size']: raise RuntimeError('SIZE_MISMATCH')
        if '-' not in audio['etag'] and file_digest(target, 'md5') != audio['etag']: raise RuntimeError('MD5_MISMATCH')
        sha = file_digest(target, 'sha256')
        raw_beats, _ = tracker(str(target))
        x, sr = sf.read(target, always_2d=True, dtype='float32')
        method, beats, report = choose_beats(x, sr, raw_beats)
        duration = len(x)/sr
    if method:
        record = compact_map(drop['id'], sha, audio['etag'], duration, method, beats)
        summary = f"metronome ON {record['medianBpm']} BPM, {len(beats)} beats, {method}"
    else:
        record = {'version': BUILDER_MAP_VERSION, 'contentId': drop['id'], 'audioSha256': sha, 'audioEtag': audio['etag'],
                  'status': 'unverified', 'reason': report.get('reason'), 'beats': []}
        summary = f"no metronome: {report.get('reason')}"
    worst = ', '.join(f"{k} {v['worst_ms']:.1f}ms {'pass' if v['pass'] else 'fail'}" for k, v in report.get('candidates', {}).items())
    print(f"{drop['id'][:8]} {drop['title'][:40]!r} ({drop['reason']}): {summary}" + (f" [{worst}]" if worst else ''), flush=True)
    if not dry_run: db.upload_map(drop['id'], record)
    return record

def main(argv=None):
    p = argparse.ArgumentParser()
    p.add_argument('command', choices=['plan', 'build'])
    p.add_argument('--dry-run', action='store_true', help='analyse and report, upload nothing')
    p.add_argument('--only', help='one content id')
    p.add_argument('--force', action='store_true', help='rebuild even when the map is current')
    p.add_argument('--out', type=Path, help='also write each record here (local comparison)')
    args = p.parse_args(argv)
    db = Supabase(os.environ.get('SUPABASE_URL') or os.environ.get('NEXT_PUBLIC_SUPABASE_URL'),
                  os.environ.get('SUPABASE_SERVICE_ROLE_KEY'))
    work = plan(db, args.only, args.force)
    for w in work: print(f"todo {w['id'][:8]} {w['title'][:40]!r}: {w['reason']}")
    print(f"{len(work)} drop(s) need a metronome map", flush=True)
    if os.environ.get('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'], 'a', encoding='utf-8') as f: f.write(f"has_work={'true' if work else 'false'}\n")
    if args.command == 'plan' or not work: return 0
    tracker = load_tracker(os.environ.get('METRONOME_CHECKPOINT', ''))
    failures = 0
    for drop in work:
        try:
            record = build_one(db, tracker, drop, args.dry_run)
            if args.out:
                args.out.mkdir(parents=True, exist_ok=True)
                (args.out/f"{drop['id']}.json").write_text(json.dumps(record, separators=(',', ':')) + '\n', encoding='utf-8')
        except Exception as e:  # one bad drop must not block the others; retried next run
            failures += 1; print(f"ERROR {drop['id'][:8]} {type(e).__name__}: {str(e)[:200]}", flush=True)
    return 1 if failures else 0

if __name__ == '__main__': sys.exit(main())
