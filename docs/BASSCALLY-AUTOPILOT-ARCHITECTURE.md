# Basscally Hub Autopilot — Definitive Architecture

Version: 1.0
Purpose: Build Basscally Hub exactly to spec. Any LLM or IDE agent reads this, reads the state file, and continues from where the last session stopped. No copy-paste. No clipboard. No manual prompt transfer. The repo is the interface.

---

## What This Is

A repo-based build controller for Basscally Hub. The repo carries all project state. Any LLM or IDE agent reads the repo, continues from the last known state, and writes results back to the repo. Sessions are stateless — the repo is the memory.

## Two Commands. That Is the Entire User Interface.

```powershell
npm run bh:next        # write prompt file → open in IDE → tell agent to read it
npm run bh:complete    # verify artifact → advance to next step (or report what's missing)
```

Nothing else is needed during normal operation.

---

## The Four Commands

### `bh:status`
Reads `docs/AUTO-REPORTS/BH-STATE.json`. Prints current step, status, what's needed. No file writes. Instant.

### `bh:next`
1. Reads current step from state
2. Generates `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` (the complete build instruction for the current step)
3. Opens the prompt file in the active editor (`cursor docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md`)
4. Updates state to `pushed`
5. Prints: "Prompt file opened. Tell your IDE agent to read NEXT-AGENT-PROMPT.md. After it finishes, run bh:complete."

The controller writes the file. The editor opens the file. The IDE agent reads the file from the repo. No clipboard. No pasting. The repo is the interface.

### `bh:complete`
1. Reads `docs/AUTO-REPORTS/BH-STATE.json` for current step
2. Verifies the step's required artifact exists
3. Scans artifact for required marker strings (every step has a list)
4. Runs git diff verification (agent must have made changes)
5. If all pass: marks step completed, advances to next step, prints confirmation
6. If any fail: reports exactly which markers are missing, stays on current step

### `bh:check`
Runs health checks (build, lint, tsc). No state change. No advancement. Use to verify repo is clean without touching workflow state.

---

## Package.json Scripts

```json
{
  "bh:status":   "python scripts/basscally-autopilot-controller.py status",
  "bh:next":     "python scripts/basscally-autopilot-controller.py next",
  "bh:complete": "python scripts/basscally-autopilot-controller.py complete",
  "bh:check":    "python scripts/basscally-autopilot-controller.py check"
}
```

Remove any legacy scripts. Four commands only.

---

## Config File

`docs/AUTO-REPORTS/BH-TOOL-CONFIG.json`:

```json
{
  "editor_command": "cursor",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

When `agent_command` is null, `bh:next` opens the prompt file in the editor. You tell the IDE agent to read it.

When `agent_command` has a value (future Claude Code CLI, Codex CLI), `bh:next` calls that command directly. The user command does not change.

---

## State File

`docs/AUTO-REPORTS/BH-STATE.json`:

```json
{
  "current_step": "BH-00",
  "current_step_title": "Repo Scan and Docs Truth",
  "current_step_status": "pending",
  "next_action": "run bh:next",
  "after_current_step": "BH-01",
  "last_check_result": "unknown",
  "completed_steps": [],
  "blocked_steps": [],
  "blocked_reason": null
}
```

---

## The Complete Build Sequence

22 steps. In order. No skipping. No parallel.

| Step | Title | What it produces |
|---|---|---|
| BH-00 | Repo Scan and Docs Truth | Confirms all reference files present, no contradictions |
| BH-01 | Global Naming Pass | Club→Hub, 3-days→weekly everywhere in copy docs |
| BH-02 | Supabase Schema and Storage | All DB tables, storage buckets, EU region |
| BH-03 | Lemon Squeezy Webhook | Subscription access, HMAC verification, download API |
| BH-04 | Magic Link Auth | Login, callback, middleware, route protection |
| BH-05 | Landing Page and Waitlist | Full landing, waitlist email capture |
| BH-06 | Artist/Style Page | The conversion engine — click 2 in 3-click flow |
| BH-07 | Pricing Page | 3-tier, founding member centre, live spot counter |
| BH-08 | Checkout Success + Cancelled | Post-payment flow, WhatsApp link, magic link |
| BH-09 | Member Dashboard | Empty + populated, filters, countdown, mobile nav |
| BH-10 | Content Detail + Download API | Audio player, signed URLs, download gating |
| BH-11 | Account + Billing | Subscription status, LS portal, cancel flow |
| BH-12 | Paywall + Re-subscribe | Access blocking for anonymous/lapsed |
| BH-13 | Admin Upload + Content Mgmt | Upload form, content list, edit, soft delete |
| BH-14 | Admin Metrics Dashboard | Live metrics, subscriber list, email logs |
| BH-15 | Email Automation | Welcome, drop notification, payment failed, unsubscribe |
| BH-16 | Legal Pages | Terms, Privacy, Refund — from legal draft doc |
| BH-17 | Utility States | 404, 500, admin unauthorized, rate limit, cancel modal |
| BH-18 | UI Simulator — Full Click Test | All personas, all routes, zero FAILs |
| BH-19 | Mobile Responsive Audit | 48 checks, 6 breakpoints, zero P0 FAILs |
| BH-20 | Motion + Depth Fix | 15 motion fixes, 3-layer depth, mobile contrast |
| BH-21 | Performance | Lighthouse ≥ 85 mobile, CLS < 0.1, < 2s on 3G |
| BH-22 | Production Readiness | 13 acceptance criteria, legal sign-off, launch |

---

## The Three Roles Being Tested

| Persona | ID (mock cookie) | What they can access |
|---|---|---|
| Anonymous | (none) | `/`, `/waitlist`, `/style/[slug]`, `/pricing`, `/auth/login` only |
| Active member | `mock-member-active` | `/dashboard`, `/c/[id]`, `/account`, `/account/billing` |
| Lapsed member | `mock-member-lapsed` | Sees paywall on `/c/[id]`, cannot download |
| Admin | `mock-admin-michael` | All above + `/admin/*` routes |

Mock auth is set via cookie `basscally_mock_user_id` or via POST to `/api/mock-auth/session`. The mock auth route must be staging-only (never production).

---

## The Three-Click Conversion Flow

This is the architectural spine of the product. Every screen must support it.

```
Click 1: TikTok/IG bio link → basscally.club (or /style/[slug] direct link)
Click 2: Artist/Style page → "Play Makossa like Tribe Fuego" + preview tracks
Click 3: Checkout → founding member pricing → payment
```

After payment: magic link email → dashboard → hot practice track ready.

The style page (BH-06) is the most critical new screen. It was not in the original 33 screens. Do not skip it.

---

## Files in the System

Controller:
```
scripts/basscally-autopilot-controller.py    ← four commands
scripts/basscally-ui-simulator.py            ← full click test, BH-18
scripts/basscally-responsive-audit.py        ← responsive checks, BH-19
```

State and config (written by controller, never manually edited):
```
docs/AUTO-REPORTS/BH-STATE.json
docs/AUTO-REPORTS/BH-TOOL-CONFIG.json
```

Reports (written by controller/scripts, read by agents):
```
docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md
docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md
docs/AUTO-REPORTS/BH-LATEST-RUN.md
docs/AUTO-REPORTS/UI-SIM-LATEST.md
docs/AUTO-REPORTS/UI-SIM-FIX-PROMPT.md
docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md
```

Step artifacts (written by IDE agent per step, verified by controller):
```
docs/AUTO-REPORTS/BH-00-REPO-SCAN.md
docs/AUTO-REPORTS/BH-01-NAMING-PASS.md
docs/AUTO-REPORTS/BH-02-SCHEMA-COMPLETE.md
... (one per step, BH-00 through BH-22)
```

Reference docs (design truth — read-only):
```
04_basscally_design_system.md
01_PRD_basscally_club_mvp_UPDATED_v1_1.md
02_landing_page_copy_and_wireframe.md
06_locked_screen_designs.md
docs/basscally-full-button-function-audit.md
docs/basscally-mobile-responsive-deep-audit.md
docs/basscally-legal-document-drafts.md
docs/codex-depth-color-fix-prompt.md
```

Reference HTML screens (locked design references):
```
basscally-hero-v2.html
basscally-full-landing-v2.html
basscally-auth-login.html
basscally-screen-4-dashboard-empty-art-motion.html
basscally-screen-5-dashboard-populated.html
basscally-screen-6-content-detail.html
basscally-screen-7-account-membership.html
basscally-screen-8-paywall-resubscribe.html
basscally-admin-screens-9-10.html
```

---

## Locked Decisions — Do Not Re-Open

These are final. The controller will not ask for them again. Any LLM picking up this repo must not re-ask.

| Decision | Value |
|---|---|
| Product name | Basscally Hub (domain: basscally.club) |
| Content cadence | Weekly |
| Drop creators | Chris + world-class bassists |
| Pricing | $1.50 founding / $2.99 monthly / $18 annual |
| Founding cap | 500 (live counter from DB) |
| Auth | Magic link (no passwords) |
| Payment | Lemon Squeezy (Merchant of Record) |
| Billing self-serve | LS customer portal |
| Downloads | Kept — streaming primary, download secondary |
| Database region | Supabase EU |
| Analytics | Plausible/Umami (cookieless, no banner) |
| Company | Basscally Ltd, No. 16656420, England and Wales |
| Contact | basscally.enquiry@gmail.com |
| WhatsApp community | Link in checkout success + welcome email |

---

## Step Completion Rules

1. `bh:check` never advances workflow. Health checks only.
2. `bh:next` sets status to `pushed`. Cannot set `completed`.
3. `bh:complete` is the ONLY command that can set `completed`. Only when artifact exists AND all markers pass.
4. A step's next step is not actionable until the current step reaches `completed`.
5. Missing markers are reported exactly. No partial advancement.

---

## What the Controller Must Not Do

- Copy anything to clipboard
- Paste into any chat
- Advance a step without artifact verification
- Mention the next step as actionable until current step is done
- Re-ask for locked decisions
- Create report files not listed in this architecture doc
- Hardcode any specific LLM or IDE

---

## The Daily Loop

```powershell
npm run bh:next         # prompt written and opened, tell agent to read it
# IDE agent works from NEXT-AGENT-PROMPT.md
npm run bh:complete     # verifies artifact, advances or reports gaps
npm run bh:next         # next step prompt written
# repeat until BH-22
```

Two commands, alternating, until the project is done.

---

## If You Are an LLM Picking Up This Repo

1. Read this file completely.
2. Read `docs/AUTO-REPORTS/BH-STATE.json` — that tells you exactly where you are.
3. Read `docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md` — that tells you what to do right now.
4. Read `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` if status is `pushed` — that is your full task.
5. Do the work described in the prompt.
6. Create the artifact file listed in the prompt with all required markers.
7. The user runs `npm run bh:complete` to verify. You do not verify yourself.
8. Do not invent decisions not in the locked list above.
9. Do not advance to the next step yourself. The controller does that.
