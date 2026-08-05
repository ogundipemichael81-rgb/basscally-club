# Admin Drop, Preview, and Player Repair

## Scope

This repair preserves the existing authentication and Lemon Squeezy architecture. It does not delete or duplicate production content.

## Root cause and evidence

- The controlled production drop `Sir TJ` was saved successfully (`published`, `is_free_preview = true`, with an audio storage key).
- The admin list query discarded its Supabase error and converted failed results to an empty array. A nested style relationship could therefore make a real library look empty.
- The list now queries content first, queries style labels separately, throws on either query failure, and presents a distinct error panel.
- `/admin/content` is force-dynamic with `revalidate = 0`.

## Publishing

Publishing and scheduling no longer require email subject/body. Member notification is an explicit optional control, disabled in the UI while delivery is unavailable. If enabled later, subject and body are validated; email failures remain separate from the saved content result.

Create/update responses include the confirmed content id and status. Content, dashboard, and detail paths are revalidated after mutation. Style-tag errors are surfaced instead of ignored.

## Preview authorization and playback

Authenticated unpaid users may open and stream the designated published free-preview row, but cannot download it. Premium rows remain paywalled. Active members retain full access. The detail view now receives `preview` or `member` mode and hides download in preview mode. Preview access no longer imposes a 30-second limit.

The existing practice player supports play, pause/resume, seek, ten-second back/forward, 0.5x/0.75x/1x/1.25x/1.5x speed, and pitch preservation where supported.

## Input contrast

The admin form uses shared Basscally field components for text fields. Native checkbox/file controls remain readable against the dark surface; global field tokens should remain the source of truth for future admin controls.

## Verification

The first deployment of this repair (`dpl_Vt5RuGj5eT7oZSWm8jTCeq2Vv917`) failed because the initial commit referenced `getPracticeSequence` before the corresponding export was included in the production commit. A follow-up deployment then exposed a second integration gap: `ContentDetailView` passed `practiceSequence` while the deployed `ContentAudioPlayer` props did not yet declare it. The player contract is now reconciled with the sequence/query implementation, keeping the free-preview type, authorization, and practice navigation changes together.

- `npm run lint`: passed with existing warnings only; 0 errors.
- `npm run typecheck`: passed.
- `npm run build`: passed on Next.js 16.2.6.
- A locked generated `.next` directory was stopped/removed before the clean build; unrelated working-tree changes were preserved.

## Production browser checks still required

1. Open `/admin/content` and confirm `Sir TJ` appears exactly once.
2. Create a draft without email fields; confirm save and refresh.
3. Publish a controlled test drop without email fields; confirm it appears immediately.
4. Sign in as an unpaid member, open the `Sir TJ` free sample, play, pause, resume, seek, skip, and test all speeds.
5. Confirm download is denied for the unpaid member and a premium row remains paywalled.

No claim of successful live browser audio playback is made from static checks alone; that requires the deployed browser and the real private storage object.
