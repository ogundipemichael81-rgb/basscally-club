# Basscally Hub — UI Simulator Report
*Generated: 2026-05-29 01:56:41*

## Summary: 50/50 passed | 0 failed | 0 warnings

| Suite | Persona | Check | Status | Detail |
|---|---|---|---|---|
| auth | anonymous | Login page loads with email field | PASS |  |
| auth | anonymous | Invalid email shows error state | PASS |  |
| auth | anonymous | Valid email → success/loading state | PASS |  |
| conversion | anonymous | Click 1: Landing page loads | PASS |  |
| conversion | anonymous | Primary CTA present on landing | PASS |  |
| conversion | anonymous | Click 2: Style/artist page loads | PASS |  |
| conversion | anonymous | Style page has track previews | PASS |  |
| conversion | anonymous | Unlock CTA present on style page | PASS |  |
| conversion | anonymous | Waitlist page loads with email input | PASS |  |
| member | member_active | Dashboard loads (not redirected) | PASS |  |
| member | member_active | Filter tabs present | PASS |  |
| member | member_active | Content card links to /c/[id] | PASS |  |
| member | member_active | Content detail has audio player | PASS |  |
| member | member_active | Download button present | PASS |  |
| member | member_active | Account page loads | PASS |  |
| member | member_active | Manage billing button present | PASS |  |
| member | member_active | Mobile bottom nav visible at 375px | PASS |  |
| member | member_active | No horizontal overflow at 375px | PASS |  |
| paywall | anonymous | Anonymous blocked from /dashboard | PASS |  |
| paywall | anonymous | Anonymous blocked from /c/[id] | PASS |  |
| paywall | anonymous | Anonymous blocked from /admin | PASS |  |
| paywall | member_lapsed | Lapsed member sees paywall on /c/[id] | PASS |  |
| paywall | member_lapsed | Download API rejects lapsed member (401/403/302) | PASS |  |
| admin | admin | Admin dashboard loads with metrics | PASS |  |
| admin | admin | Upload form loads with file zone | PASS |  |
| admin | admin | Status toggle (Draft/Scheduled/Publish) present | PASS |  |
| admin | admin | Email subject field present | PASS |  |
| admin | admin | Content list page has table | PASS |  |
| admin | admin | Subscribers list page loads | PASS |  |
| admin | member_active | Member cannot access /admin | PASS |  |
| responsive | member_active | / at 320px — no H-overflow | PASS |  |
| responsive | member_active | / at 375px — no H-overflow | PASS |  |
| responsive | member_active | / at 768px — no H-overflow | PASS |  |
| responsive | member_active | / at 1024px — no H-overflow | PASS |  |
| responsive | member_active | / at 1280px — no H-overflow | PASS |  |
| responsive | member_active | /auth/login at 320px — no H-overflow | PASS |  |
| responsive | member_active | /auth/login at 375px — no H-overflow | PASS |  |
| responsive | member_active | /auth/login at 768px — no H-overflow | PASS |  |
| responsive | member_active | /auth/login at 1024px — no H-overflow | PASS |  |
| responsive | member_active | /auth/login at 1280px — no H-overflow | PASS |  |
| responsive | member_active | /dashboard at 320px — no H-overflow | PASS |  |
| responsive | member_active | /dashboard at 375px — no H-overflow | PASS |  |
| responsive | member_active | /dashboard at 768px — no H-overflow | PASS |  |
| responsive | member_active | /dashboard at 1024px — no H-overflow | PASS |  |
| responsive | member_active | /dashboard at 1280px — no H-overflow | PASS |  |
| responsive | member_active | /pricing at 320px — no H-overflow | PASS |  |
| responsive | member_active | /pricing at 375px — no H-overflow | PASS |  |
| responsive | member_active | /pricing at 768px — no H-overflow | PASS |  |
| responsive | member_active | /pricing at 1024px — no H-overflow | PASS |  |
| responsive | member_active | /pricing at 1280px — no H-overflow | PASS |  |

## Screenshots

- None (all tests passed)

## BH-18 verification

anonymous blocked
member access
lapsed paywall
admin access
download rejected
zero FAILs: 0
screenshots

- anonymous blocked: PASS
- member access: PASS
- lapsed paywall: PASS
- admin access: PASS
- download rejected: PASS
- zero FAILs: PASS
- screenshots: none required