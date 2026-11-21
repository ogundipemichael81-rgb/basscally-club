"""Builder decisions and safety, without network or model."""
import json
import unittest
import builder
import verify

ID = '6f098a40-5cb8-4df7-8342-40d6ec36a156'
AUDIO = {'path': f'drops/{ID}/audio.mp3', 'size': 10, 'etag': 'abc'}

class FakeDb:
    def __init__(self, drops, maps, audio=AUDIO):
        self._drops, self.maps, self.audio, self.uploads = drops, maps, audio, []
    def drops(self): return self._drops
    def audio_object(self, key): return self.audio
    def current_map(self, cid): return self.maps.get(cid)

class BuilderTests(unittest.TestCase):
    def test_versions_agree(self):
        self.assertEqual(builder.BUILDER_MAP_VERSION, verify.MAP_VERSION)

    def test_needs_build(self):
        current = {'version': verify.MAP_VERSION, 'audioEtag': 'abc'}
        self.assertIsNone(builder.needs_build({}, AUDIO, current))
        self.assertEqual(builder.needs_build({}, AUDIO, None), 'new drop')
        self.assertEqual(builder.needs_build({}, {**AUDIO, 'etag': 'new'}, current), 'audio replaced')
        self.assertEqual(builder.needs_build({}, AUDIO, {**current, 'version': 'old'}), 'new map version')
        self.assertIsNone(builder.needs_build({}, None, None))  # audio not uploaded yet
        self.assertEqual(builder.needs_build({}, AUDIO, current, force=True), 'forced')
        # A failed ("no metronome") record for the same audio is not retried every run.
        self.assertIsNone(builder.needs_build({}, AUDIO, {**current, 'status': 'unverified', 'beats': []}))

    def test_plan_skips_unexpected_audio_paths(self):
        drops = [{'id': ID, 'title': 't', 'status': 'published', 'audio_storage_key': f'audio/drops/{ID}/audio.mp3'},
                 {'id': ID, 'title': 'odd', 'status': 'published', 'audio_storage_key': 'audio/other/x.mp3'},
                 {'id': '../../etc', 'title': 'bad', 'status': 'published', 'audio_storage_key': 'audio/drops/../x.mp3'}]
        work = builder.plan(FakeDb(drops, {}))
        self.assertEqual([w['title'] for w in work], ['t'])

    def test_only_writes_map_bucket_and_never_prints_key(self):
        db = builder.Supabase('https://x.supabase.co', 'sb_secret_TESTKEY')
        captured = {}
        class Resp:
            def __enter__(self): return self
            def __exit__(self, *a): return False
            def read(self): return b'{}'
        def fake_urlopen(req, timeout=None):
            captured['url'], captured['method'] = req.full_url, req.get_method(); return Resp()
        original = builder.urllib.request.urlopen
        builder.urllib.request.urlopen = fake_urlopen
        try: db.upload_map(ID, {'beats': []})
        finally: builder.urllib.request.urlopen = original
        self.assertEqual(captured['url'], f'https://x.supabase.co/storage/v1/object/beat-maps/{ID}.json')
        self.assertEqual(captured['method'], 'POST')
        with self.assertRaises(RuntimeError): db.upload_map('../audio/drops/x', {})
        self.assertNotIn('TESTKEY', repr(db.__dict__.get('url')))

    def test_compact_map_shape_matches_player_contract(self):
        beats = [0.5 + 0.5*i for i in range(10)]
        m = verify.compact_map(ID, 'sha', 'abc', 6.0, 'steady', beats)
        self.assertEqual(m['contentId'], ID); self.assertEqual(m['medianBpm'], 120.0)
        self.assertEqual(m['beats'], beats); self.assertEqual(m['audioEtag'], 'abc')
        json.dumps(m, allow_nan=False)

if __name__ == '__main__': unittest.main()
