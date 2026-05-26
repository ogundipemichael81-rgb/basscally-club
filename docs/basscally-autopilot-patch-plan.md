# Basscally Hub — Autopilot Patch Plan

**Date:** 2026-05-25  
**Purpose:** Patch uploaded autopilot tooling to match **current repo truth** without starting Phase B or deleting Phase A work.

---

## Patch principles

1. **Preserve** completed Phase A UI, gates, and legal routes (`/terms`, `/privacy`, `/refund-policy`).
2. **Do not** replace legal routes with `/legal/*`; document aliases as optional future redirects.
3. **Mark** BH-16 legal UI as largely complete in controller state after BH-00 scan.
4. **Add** new routes to simulator/responsive audits: `/style/makossa-tribe-fuego`, `/waitlist`, `/resources`, legal pages.
5. **Keep** existing Node QA scripts — Python audits complement, not replace, `public-route-audit.mjs` and scroll scripts.
6. **Do not** start Supabase, Lemon Squeezy, or app backend code in this patch pass.

---

## Files to patch (ordered)

### 1. `scripts/basscally-autopilot-controller.py`

| Location | Current | Patch to |
| --- | --- | --- |
| BH-16 `focus` | `/legal/terms`, `/legal/privacy`, `/legal/refund` | `/terms`, `/privacy`, `/refund-policy`; note Phase A **done** — artifact = verification report |
| BH-05 `focus` | Rebuild landing from v2 HTML | **Extend** existing landing + add `/waitlist`; do not rebuild Phase A |
| BH-07 `focus` | Rebuild pricing | **Wire** LS + fix founding centre highlight; keep existing UI |
| BH-20 `focus` | Motion + depth fix | Mark **pre-complete** for Phase A; artifact = sign-off referencing existing gates |
| Initial `completed_steps` suggestion | `[]` | After BH-00: pre-mark `BH-16`, `BH-20` with evidence links (optional manual state edit) |

**Do not remove** BH-00–BH-22 sequence or step gating.

### 2. `scripts/basscally-ui-simulator.py`

Add to route / conversion suites when pages exist:

- `/terms`, `/privacy`, `/refund-policy`
- `/waitlist`
- `/style/makossa-tribe-fuego` (and generic `/style/[slug]` pattern)
- `/resources`
- `/account/cancel`
- `/checkout/success`, `/checkout/cancelled`

Keep `/style` fallback probe until slug route ships.

Document dependency on `POST /api/mock-auth/session` for member/admin personas.

### 3. `scripts/basscally-responsive-audit.py`

Expand `ROUTES_TO_TEST`:

```python
("/", "Landing page", "anonymous"),
("/pricing", "Pricing", "anonymous"),
("/auth/login", "Login", "anonymous"),
("/terms", "Terms", "anonymous"),
("/privacy", "Privacy", "anonymous"),
("/refund-policy", "Refund policy", "anonymous"),
("/waitlist", "Waitlist", "anonymous"),          # WARN until built
("/style/makossa-tribe-fuego", "Style page", "anonymous"),  # WARN until built
("/resources", "Resource Centre", "anonymous"),  # WARN until built
("/checkout/success", "Checkout success", "anonymous"),
("/checkout/cancelled", "Checkout cancelled", "anonymous"),
("/account/cancel", "Cancel info", "member_active"),
("/dashboard", "Dashboard", "member_active"),
("/account", "Account", "member_active"),
```

Treat missing routes as **WARN**, not hard fail, until BH-05/BH-06 ship.

### 4. `docs/BASSCALLY-AUTOPILOT-SETUP-README.md`

- Update legal route examples to `/terms`, `/privacy`, `/refund-policy`.
- Note `basscally-full-button-function-audit.md` may be missing — use `basscally-action-cycle-audit.md`.
- List Node scroll scripts alongside Python tools.

### 5. `docs/GPT-PROJECT-MEMORY-HANDOVER.md`

- Add Phase A completion note (scroll perf P0, legal routes canonical).
- Reference reconciliation docs.

### 6. Restore or create `docs/basscally-full-button-function-audit.md`

**Option A:** Copy from Michael’s upload if available.  
**Option B:** Generate from `docs/basscally-action-cycle-audit.md` with a header noting it is the restored audit.

**This patch plan does not create that file** — tracked as follow-up after upload confirmed.

### 7. `docs/AUTO-REPORTS/BH-STATE.json` (on first run)

Suggested initial state after BH-00 manual review:

```json
{
  "current_step": "BH-00",
  "current_step_status": "pending",
  "completed_steps": [],
  "notes": "Phase A UI gates passed 2026-05-18. See basscally-current-state-reconciliation.md"
}
```

After BH-00 complete → advance to **BH-01** (naming pass, not backend).

---

## Controller metadata — conflicts found

| Step | Conflict | Resolution |
| --- | --- | --- |
| BH-16 | `/legal/*` paths | Patch to `/terms`, `/privacy`, `/refund-policy` |
| BH-05 | “Build landing from scratch” | Change to “extend landing + waitlist” |
| BH-01 | Implied not started | Next step after BH-00 — Hub naming + weekly cadence |
| BH-02–BH-04 | Backend | **Blocked** until BH-00 + BH-01 + patch applied |
| BH-06 | Style page | Blocked on Chris content decision (D2) — can scaffold route |
| BH-18 | UI sim | Blocked on mock auth API + member pages |
| BH-19 | Python responsive audit | Subset vs `responsive-audit.mjs` — run both |
| BH-20 | Motion/depth | **Pre-done** for Phase A — reference existing PASS |
| BH-21 | Performance | Landing scroll partial PASS; Lighthouse not automated |

---

## package.json (done in this reconciliation)

```json
"bh:status": "python scripts/basscally-autopilot-controller.py status",
"bh:next": "python scripts/basscally-autopilot-controller.py next",
"bh:complete": "python scripts/basscally-autopilot-controller.py complete",
"bh:check": "python scripts/basscally-autopilot-controller.py check"
```

---

## `docs/AUTO-REPORTS/BH-TOOL-CONFIG.json` (created)

```json
{
  "editor_command": "cursor",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

---

## Recommended execution order

| Order | Action | Command |
| --- | --- | --- |
| 1 | Verify tooling | `npm run bh:status` |
| 2 | Health check | `npm run bh:check` |
| 3 | Start BH-00 | `npm run bh:next` → execute prompt → `npm run bh:complete` |
| 4 | Patch controller + simulators | Apply §1–§3 above (separate commit) |
| 5 | BH-01 naming pass | Docs + copy only |
| 6 | **Then** BH-02 Supabase | First backend step |

---

## P0 blockers before Phase B

1. BH-00 repo scan artifact not yet produced.
2. Autopilot controller BH-16 legal path mismatch.
3. Missing `basscally-full-button-function-audit.md`.
4. BH-01 not done (Hub name, weekly cadence still wrong in public copy).
5. Pricing highlight order vs locked founding-centre decision.
6. New routes `/style/*`, `/waitlist`, `/resources` not implemented.

---

## Next safe command

```powershell
npm run bh:status
```

**Stop here.** Do not run `bh:next` until Michael confirms patch plan, or run `bh:next` immediately for BH-00 only per END-TO-END pack.

---

## References

- `docs/basscally-current-state-reconciliation.md`
- `docs/basscally-action-cycle-audit.md`
- `docs/BASSCALLY-END-TO-END-PROMPT-PACK.md` §3 (patch prompt)
