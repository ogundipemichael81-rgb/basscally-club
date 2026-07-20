# Basscally Hub — UI Simulator Fix Prompt
*1 failing tests. Fix all before running bh:complete on BH-18.*

## Failing checks

### member — member_active — Content detail has audio player
**Detail:** 
**Time:** 01:54:48
**Screenshot:** `content_detail_015448.png`

## Fix guidance

1. For FAIL on route access (redirected unexpectedly): check middleware.ts and route protection logic.
2. For FAIL on download API (wrong status code): check /api/content/[id]/download subscription verification.
3. For FAIL on audio player missing: check /c/[id] component and that Supabase Storage signed URLs are generated.
4. For FAIL on admin blocked: check ADMIN_EMAILS env var and admin middleware.
5. For FAIL on horizontal overflow: run basscally-responsive-audit.py for detailed breakdown.
6. For FAIL on paywall not showing: check middleware.ts handles lapsed subscription status.

After fixing, restart npm run dev and re-run:
```
python scripts/basscally-ui-simulator.py --suite all
```