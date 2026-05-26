#!/usr/bin/env python3
"""
Basscally Hub Autopilot Controller

Commands:
    status   — instant read-only state report
    next     — write NEXT-AGENT-PROMPT.md, open in editor, status → pushed
    complete — verify artifact + git diff + markers; advance or needs_fix
    check    — health checks only; never advances workflow

Usage:
    python scripts/basscally-autopilot-controller.py status
    python scripts/basscally-autopilot-controller.py next
    python scripts/basscally-autopilot-controller.py complete
    python scripts/basscally-autopilot-controller.py check

Package.json:
    "bh:status":   "python scripts/basscally-autopilot-controller.py status"
    "bh:next":     "python scripts/basscally-autopilot-controller.py next"
    "bh:complete": "python scripts/basscally-autopilot-controller.py complete"
    "bh:check":    "python scripts/basscally-autopilot-controller.py check"
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# ---------------------------------------------------------------------------
# Build step sequence — matches button/function audit exactly
# ---------------------------------------------------------------------------

STEP_IDS = [
    "BH-00",   # Repo scan + docs truth
    "BH-01",   # Naming pass (Club → Hub, 3-days → weekly, copy docs)
    "BH-02",   # Supabase schema + storage buckets
    "BH-03",   # Lemon Squeezy webhook + subscription access
    "BH-04",   # Auth (magic link login + callback)
    "BH-05",   # Landing page + waitlist page
    "BH-06",   # Artist/Style page (Screen 34 — the conversion engine)
    "BH-07",   # Pricing page (3-tier, founding member centre)
    "BH-08",   # Checkout success + cancelled
    "BH-09",   # Member dashboard (empty + populated)
    "BH-10",   # Content detail + audio player + download API
    "BH-11",   # Account + billing management
    "BH-12",   # Paywall + re-subscribe
    "BH-13",   # Admin upload form + content management
    "BH-14",   # Admin metrics dashboard
    "BH-15",   # Email automation (welcome, drop notification, payment failed)
    "BH-16",   # Legal pages (terms, privacy, refund)
    "BH-17",   # Utility states (404, 500, admin unauthorized, rate limit)
    "BH-18",   # UI simulator run — full click test all roles all screens
    "BH-19",   # Mobile responsive audit — all 6 breakpoints
    "BH-20",   # Motion audit + depth/color fix
    "BH-21",   # Performance (Lighthouse ≥ 85 mobile, load < 2s on 3G)
    "BH-22",   # Production readiness + legal sign-off checklist
]

STEP_META: Dict[str, Dict[str, str]] = {
    "BH-00": {
        "title": "Repo Scan and Docs Truth",
        "focus": "Verify all 33+ reference HTML screens are present, bridge doc matches, button audit is the source of truth, no contradictions between docs.",
        "artifact": "docs/AUTO-REPORTS/BH-00-REPO-SCAN.md",
    },
    "BH-01": {
        "title": "Global Naming Pass",
        "focus": "Rename Club→Hub, every-3-days→weekly, drops-from-Chris→drops-from-Chris-and-world-class-bassists across all copy docs, landing page copy, FAQ, design system microcopy. Update package.json scripts. Do not touch code.",
        "artifact": "docs/AUTO-REPORTS/BH-01-NAMING-PASS.md",
    },
    "BH-02": {
        "title": "Supabase Schema and Storage",
        "focus": "Create Supabase project (EU region). Apply schema: users, subscriptions, content, waitlist, artists, styles, content_style_tags, downloads tables. Create storage buckets: audio (private), covers (public). Seed with 3 placeholder drops.",
        "artifact": "docs/AUTO-REPORTS/BH-02-SCHEMA-COMPLETE.md",
    },
    "BH-03": {
        "title": "Lemon Squeezy Webhook and Subscription Access",
        "focus": "Build /api/webhooks/lemonsqueezy. Handle: subscription_created, subscription_updated, subscription_cancelled, subscription_expired, subscription_payment_failed, subscription_payment_success. HMAC SHA256 signature verification. Idempotent. Set is_founding_member if subscriber count < 500. Trigger magic-link email on subscription_created. Wire /api/content/[id]/download — verify subscription server-side before returning signed Storage URL.",
        "artifact": "docs/AUTO-REPORTS/BH-03-WEBHOOK-COMPLETE.md",
    },
    "BH-04": {
        "title": "Magic Link Auth",
        "focus": "Build /auth/login (email field, send magic link, loading, error, success states). Build /auth/callback (Supabase session confirm, redirect to /dashboard). Middleware protecting /(member) and /(admin) routes. Rate-limit magic link resend.",
        "artifact": "docs/AUTO-REPORTS/BH-04-AUTH-COMPLETE.md",
    },
    "BH-05": {
        "title": "Landing Page and Waitlist",
        "focus": "Build app/(marketing)/page.tsx from basscally-full-landing-v2.html reference. All sections verbatim from 02_landing_page_copy_and_wireframe.md with naming updates from BH-01. Build /waitlist page: email capture → waitlist table. Founding member spot counter reads from DB live. Mobile sticky CTA appears after hero CTA scrolls away.",
        "artifact": "docs/AUTO-REPORTS/BH-05-LANDING-COMPLETE.md",
    },
    "BH-06": {
        "title": "Artist and Style Page — The Conversion Engine",
        "focus": "Build /style/[slug] page. Artist hero image, style headline (e.g. Play Makossa like Tribe Fuego), 3-5 track previews (30-second gated preview, full track requires subscription), Unlock all tracks CTA → LS checkout, difficulty/type badges, what-you-will-learn section, mobile sticky CTA. Requires artists and styles tables from BH-02. This is click 2 in the three-click conversion flow.",
        "artifact": "docs/AUTO-REPORTS/BH-06-STYLE-PAGE-COMPLETE.md",
    },
    "BH-07": {
        "title": "Pricing Page — Three-Tier",
        "focus": "Build /pricing. Three plans: Monthly ($2.99), Founding Member ($1.50 — centre, highlighted, no-brainer), Annual ($18/year). Founding member counter live from DB. Middle plan visually dominant (compromise effect). All three CTAs link to correct LS variant IDs. Orbit/wave motion from locked reference screen.",
        "artifact": "docs/AUTO-REPORTS/BH-07-PRICING-COMPLETE.md",
    },
    "BH-08": {
        "title": "Checkout Success and Cancelled",
        "focus": "Build /checkout/success: membership pass card, three next-step cards, magic link explanation, WhatsApp community link, Go to dashboard CTA, Resend magic link. Build /checkout/cancelled: reassure, show founding member price, CTA back to checkout. Both wire to real webhook-populated subscription data.",
        "artifact": "docs/AUTO-REPORTS/BH-08-CHECKOUT-COMPLETE.md",
    },
    "BH-09": {
        "title": "Member Dashboard",
        "focus": "Build /dashboard. Empty state: no drops yet, starter category cards, next-drop rail. Populated state: latest drop hero card (play primary, download secondary), filter tabs (All/Bass-less/Grooves/Fills/Challenges), content grid, right rail (upcoming drops timeline, next-drop countdown from DB scheduled_for). Mobile bottom nav. Skeleton loading states. Scroll-reveal motion.",
        "artifact": "docs/AUTO-REPORTS/BH-09-DASHBOARD-COMPLETE.md",
    },
    "BH-10": {
        "title": "Content Detail and Download API",
        "focus": "Build /c/[id]. Audio player: play/pause, scrub bar (wire currentTime), time display, signed URL from Supabase Storage. Download button → /api/content/[id]/download (subscription check server-side → 403 if lapsed → paywall redirect). Share button (Web Share API, share /c/[id] URL). Rate limit: download-blocked state (Screen 30). Metadata from DB.",
        "artifact": "docs/AUTO-REPORTS/BH-10-CONTENT-DETAIL-COMPLETE.md",
    },
    "BH-11": {
        "title": "Account and Billing Management",
        "focus": "Build /account: subscription status from DB, founding member badge, period end date, Manage billing → LS customer portal, cancel subscription → cancel confirmation modal. Build /account/billing: plan info, Open billing portal button. Past-due banner component: shows when subscription status is past_due, Update payment → LS portal.",
        "artifact": "docs/AUTO-REPORTS/BH-11-ACCOUNT-COMPLETE.md",
    },
    "BH-12": {
        "title": "Paywall and Re-subscribe",
        "focus": "Build /paywall. Locked drop preview (blurred). Reactivate membership CTA → LS checkout. Show founding member re-join note only if is_founding_member=true AND founding spots remain. Triggered when: anonymous user hits /c/[id], lapsed member hits /c/[id], past-due member. All three cases handled.",
        "artifact": "docs/AUTO-REPORTS/BH-12-PAYWALL-COMPLETE.md",
    },
    "BH-13": {
        "title": "Admin Upload Form and Content Management",
        "focus": "Build /admin/content/new: audio upload → Supabase Storage audio bucket (private), all metadata fields, artist/style tag field, status toggle (Draft/Scheduled/Publish now), email subject/body, Preview email button, Save drop. Build /admin/content: table of all drops, search, edit link, resend button, soft delete confirmation modal. Build /admin/content/[id]: edit form pre-populated from DB.",
        "artifact": "docs/AUTO-REPORTS/BH-13-ADMIN-CONTENT-COMPLETE.md",
    },
    "BH-14": {
        "title": "Admin Metrics Dashboard",
        "focus": "Build /admin: 4 metric cards live from DB (active subscribers, MRR, new this month, failed payments). Sparkline bars. Next scheduled drop countdown. Content table with search. Export CSV of subscribers. Admin subscriber list at /admin/subscribers: search, filter by status, paginate. Email delivery logs at /admin/email-logs. Email template previews. All admin routes protected by ADMIN_EMAILS env middleware.",
        "artifact": "docs/AUTO-REPORTS/BH-14-ADMIN-METRICS-COMPLETE.md",
    },
    "BH-15": {
        "title": "Email Automation",
        "focus": "Build email templates via Resend: welcome (with magic link + WhatsApp community link), new-drop notification (with play + download link), payment failed (with update billing link). All non-transactional emails must include working unsubscribe link. Cron/queue job: when content published, send to 100% active subscribers within 5 minutes. Magic link email within 60 seconds of subscription_created webhook.",
        "artifact": "docs/AUTO-REPORTS/BH-15-EMAIL-COMPLETE.md",
    },
    "BH-16": {
        "title": "Legal Pages",
        "focus": "Verify /terms, /privacy, /refund-policy (Phase A built). Do not use /legal/* paths. Footer and login links wire to canonical routes. Contact: basscally.enquiry@gmail.com. Company: Basscally Ltd, No. 16656420.",
        "artifact": "docs/AUTO-REPORTS/BH-16-LEGAL-COMPLETE.md",
    },
    "BH-17": {
        "title": "Utility States",
        "focus": "Build branded 404 page, 500 page, admin unauthorized page. Build download rate-limit state (Screen 30) component. Build billing portal redirect/loading page (Screen 28). Build cancel confirmation modal (Screen 20). Build past-due grace state banner. All match dark editorial design system.",
        "artifact": "docs/AUTO-REPORTS/BH-17-UTILITY-COMPLETE.md",
    },
    "BH-18": {
        "title": "UI Simulator — Full Click Test",
        "focus": "Run basscally-ui-simulator.py --suite all. All 3 personas (anonymous, member, admin) across all routes. Verify: anonymous blocked from /dashboard and /c/[id]; member accesses dashboard and content; lapsed member sees paywall; admin accesses /admin routes; download API rejects lapsed member. Screenshots on every FAIL. Fix-prompt file generated. Zero FAILs required to advance.",
        "artifact": "docs/AUTO-REPORTS/UI-SIM-LATEST.md",
    },
    "BH-19": {
        "title": "Mobile Responsive Audit",
        "focus": "Run basscally-responsive-audit.py and Node responsive/scroll audits. Breakpoints 320/375/390/768/1024/1280. Spec: docs/mobile-responsive-quality-gate.md. Zero P0 FAILs on public routes.",
        "artifact": "docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md",
    },
    "BH-20": {
        "title": "Motion Audit and Depth Fix",
        "focus": "Apply all 15 motion fixes from motion-audit-rules.md (orbit dot transform-origin, overflow-hidden on orbit wrap, wave transform-origin bottom, pointer-events none on decorative layers, z-index isolation). Apply depth/color fix from codex-depth-color-fix-prompt.md (3-layer body atmosphere, gradient card backgrounds, inner highlight, heavier shadows, mobile contrast boost). Re-run motion QA scripts.",
        "artifact": "docs/AUTO-REPORTS/BH-20-MOTION-DEPTH-COMPLETE.md",
    },
    "BH-21": {
        "title": "Performance",
        "focus": "Lighthouse mobile score ≥ 85, CLS < 0.1, load < 2 seconds on 3G from Nigeria/UK/US. Payload caps: no page > 200KB JS initial. Skeleton loaders on all async data. Plausible/Umami analytics installed (cookieless). Verify no cookie banner needed (essential-only cookies).",
        "artifact": "docs/AUTO-REPORTS/BH-21-PERFORMANCE.md",
    },
    "BH-22": {
        "title": "Production Readiness",
        "focus": "All 13 MVP acceptance criteria from PRD §13 verified. All 16 legal pre-launch checklist items from legal spec §8 checked. All 9 open decisions (D1-D9) from button audit resolved. ADMIN_EMAILS set. Webhook secret set. Supabase RLS enabled. Lemon Squeezy production mode. Founding member counter wired. WhatsApp community link confirmed. Solicitor has reviewed legal docs.",
        "artifact": "docs/AUTO-REPORTS/BH-22-PRODUCTION-READY.md",
    },
}

# Artifact marker checks — what must be present in the artifact file for each step
STEP_MARKERS: Dict[str, List[str]] = {
    "BH-00": [
        "reference HTML screens present",
        "bridge doc verified",
        "button audit confirmed",
        "no contradictions",
    ],
    "BH-01": [
        "Basscally Hub",
        "weekly",
        "world-class bassists",
        "naming pass complete",
        "copy docs updated",
    ],
    "BH-02": [
        "users table",
        "subscriptions table",
        "content table",
        "waitlist table",
        "artists table",
        "styles table",
        "downloads table",
        "audio bucket",
        "covers bucket",
        "EU region",
    ],
    "BH-03": [
        "subscription_created",
        "subscription_cancelled",
        "subscription_payment_failed",
        "HMAC SHA256",
        "idempotent",
        "is_founding_member",
        "download API",
        "subscription check server-side",
    ],
    "BH-04": [
        "magic link",
        "auth callback",
        "middleware",
        "rate limit",
        "member routes protected",
        "admin routes protected",
    ],
    "BH-05": [
        "landing page complete",
        "waitlist page",
        "founding member counter",
        "mobile sticky CTA",
        "FAQ accordion",
    ],
    "BH-06": [
        "artist style page",
        "30-second preview",
        "gated",
        "unlock CTA",
        "three-click flow",
        "/style/[slug]",
    ],
    "BH-07": [
        "three-tier pricing",
        "founding member centre",
        "spot counter live",
        "Monthly variant",
        "Annual variant",
    ],
    "BH-08": [
        "checkout success",
        "checkout cancelled",
        "membership pass",
        "WhatsApp community link",
        "resend magic link",
    ],
    "BH-09": [
        "dashboard empty state",
        "dashboard populated",
        "latest drop hero",
        "filter tabs",
        "content grid",
        "next-drop countdown",
        "mobile bottom nav",
        "skeleton loading",
    ],
    "BH-10": [
        "audio player",
        "signed URL",
        "download API",
        "subscription check",
        "scrub bar",
        "rate limit state",
        "share button",
    ],
    "BH-11": [
        "account page",
        "subscription status",
        "LS customer portal",
        "cancel confirmation",
        "past-due banner",
        "billing management",
    ],
    "BH-12": [
        "paywall",
        "blurred preview",
        "reactivate CTA",
        "founding member re-join",
        "lapsed member",
        "anonymous user",
    ],
    "BH-13": [
        "admin upload form",
        "audio upload",
        "artist style tag",
        "status toggle",
        "soft delete",
        "content edit",
        "email preview",
    ],
    "BH-14": [
        "metrics dashboard",
        "active subscribers",
        "MRR",
        "export CSV",
        "subscribers list",
        "email delivery logs",
        "admin middleware",
    ],
    "BH-15": [
        "welcome email",
        "new-drop notification",
        "payment failed email",
        "unsubscribe link",
        "100% active subscribers",
        "within 5 minutes",
        "60 seconds",
    ],
    "BH-16": [
        "terms of service",
        "privacy policy",
        "refund policy",
        "Basscally Ltd",
        "16656420",
        "basscally.enquiry@gmail.com",
    ],
    "BH-17": [
        "404 page",
        "500 page",
        "admin unauthorized",
        "rate limit state",
        "cancel confirmation modal",
        "billing portal redirect",
        "past-due grace",
    ],
    "BH-18": [
        "anonymous blocked",
        "member access",
        "lapsed paywall",
        "admin access",
        "download rejected",
        "zero FAILs",
        "screenshots",
    ],
    "BH-19": [
        "320px",
        "375px",
        "768px",
        "1024px",
        "zero P0 FAILs",
        "tap targets",
        "no horizontal overflow",
        "input font-size 16px",
    ],
    "BH-20": [
        "orbit dot fix",
        "overflow-hidden",
        "pointer-events none",
        "body atmosphere",
        "gradient card",
        "inner highlight",
        "mobile contrast",
    ],
    "BH-21": [
        "Lighthouse ≥ 85",
        "CLS < 0.1",
        "< 2 seconds",
        "skeleton loaders",
        "Plausible",
        "no cookie banner",
    ],
    "BH-22": [
        "13 acceptance criteria",
        "legal checklist",
        "D1 resolved",
        "D6 resolved",
        "RLS enabled",
        "webhook secret",
        "production mode",
        "solicitor review",
        "Program complete",
    ],
}

DECISIONS_LOCKED = [
    "Name: Basscally Hub (was Basscally Club)",
    "Content cadence: weekly (was every 3 days)",
    "Drops from Chris AND world-class bassists",
    "Three-click flow: Hub → Style/Artist page → Checkout",
    "Pricing: Monthly $2.99 / Founding Member $1.50 (centre) / Annual $18",
    "Founding member cap: 500 (counter must be live from DB)",
    "Downloads kept: streaming primary, download secondary",
    "Magic link auth (no passwords)",
    "Lemon Squeezy as Merchant of Record — self-serve customer portal",
    "Supabase EU region",
    "Company: Basscally Ltd, No. 16656420, registered England and Wales",
    "Contact: basscally.enquiry@gmail.com",
    "Analytics: Plausible or Umami (cookieless, no cookie banner needed)",
    "WhatsApp community link in checkout success and welcome email",
    "Resource Centre (was Walkthrough)",
]


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def border(lines: List[str]) -> str:
    bar = "=" * 54
    return "\n".join(["", bar, "BASSCALLY HUB AUTOPILOT", bar] + lines + [bar, ""])


def find_repo_root() -> Path:
    here = Path.cwd()
    for p in [here, *here.parents]:
        if (p / "package.json").exists() and (p / "scripts").exists():
            return p
    return here


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

STATE_FILE = Path("docs/AUTO-REPORTS/BH-STATE.json")
CONFIG_FILE = Path("docs/AUTO-REPORTS/BH-TOOL-CONFIG.json")
REPORTS_DIR = Path("docs/AUTO-REPORTS")


def load_state(repo: Path) -> Dict[str, Any]:
    f = repo / STATE_FILE
    if f.exists():
        try:
            return json.loads(f.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            pass
    # Default initial state
    return {
        "current_step": "BH-00",
        "current_step_title": STEP_META["BH-00"]["title"],
        "current_step_status": "pending",
        "next_action": "run bh:next",
        "after_current_step": "BH-01",
        "last_check_result": "unknown",
        "completed_steps": [],
        "blocked_steps": [],
        "blocked_reason": None,
    }


def save_state(repo: Path, state: Dict[str, Any]) -> None:
    f = repo / STATE_FILE
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(json.dumps(state, indent=2), encoding="utf-8")


def load_config(repo: Path) -> Dict[str, Any]:
    f = repo / CONFIG_FILE
    if f.exists():
        try:
            return json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {
        "editor_command": "cursor",
        "agent_command": None,
        "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md",
    }


def next_step_id(current: str) -> Optional[str]:
    if current in STEP_IDS:
        idx = STEP_IDS.index(current)
        if idx + 1 < len(STEP_IDS):
            return STEP_IDS[idx + 1]
    return None


# ---------------------------------------------------------------------------
# Artifact verification
# ---------------------------------------------------------------------------

def verify_artifact(repo: Path, step: str) -> Tuple[bool, List[str], List[str]]:
    """Returns (passed, passed_markers, failed_markers)."""
    meta = STEP_META.get(step, {})
    artifact_path = repo / meta.get("artifact", "")
    if not artifact_path.exists():
        return False, [], ["artifact file missing"]

    content = artifact_path.read_text(encoding="utf-8", errors="ignore").lower()
    markers = STEP_MARKERS.get(step, [])
    passed, failed = [], []
    for m in markers:
        if m.lower() in content:
            passed.append(m)
        else:
            failed.append(m)

    return len(failed) == 0, passed, failed


def verify_git_diff(repo: Path) -> Tuple[bool, str]:
    """Check that git has changes since last commit (agent did work)."""
    try:
        result = subprocess.run(
            ["git", "diff", "--stat", "HEAD"],
            capture_output=True, text=True, cwd=repo, timeout=15
        )
        diff = result.stdout.strip()
        if diff:
            return True, diff[:500]
        # Check staged
        result2 = subprocess.run(
            ["git", "diff", "--cached", "--stat"],
            capture_output=True, text=True, cwd=repo, timeout=15
        )
        diff2 = result2.stdout.strip()
        return bool(diff2), diff2[:500] if diff2 else "no changes detected"
    except Exception as e:
        return False, str(e)


def _resolve_cmd(name: str) -> str:
    """Resolve npm/npx on Windows (npm.cmd) for subprocess without shell."""
    if sys.platform == "win32":
        for candidate in (f"{name}.cmd", f"{name}.exe", name):
            path = shutil.which(candidate)
            if path:
                return path
    found = shutil.which(name)
    return found if found else name


def run_health_checks(repo: Path) -> List[Dict[str, Any]]:
    """Run build, lint, tsc checks. Returns list of results."""
    npm = _resolve_cmd("npm")
    npx = _resolve_cmd("npx")
    checks = [
        ("build", [npm, "run", "build"], 120),
        ("lint", [npm, "run", "lint"], 60),
        ("tsc", [npx, "tsc", "--noEmit"], 60),
    ]
    results = []
    for name, cmd, timeout in checks:
        try:
            r = subprocess.run(
                cmd, capture_output=True, text=True, cwd=repo, timeout=timeout
            )
            results.append({
                "name": name,
                "passed": r.returncode == 0,
                "output": (r.stdout + r.stderr)[:400],
            })
        except subprocess.TimeoutExpired:
            results.append({"name": name, "passed": False, "output": "timeout"})
        except Exception as e:
            results.append({"name": name, "passed": False, "output": str(e)})
    return results


# ---------------------------------------------------------------------------
# Prompt builder
# ---------------------------------------------------------------------------

def build_next_agent_prompt(state: Dict[str, Any]) -> str:
    step = state.get("current_step", "BH-00")
    meta = STEP_META.get(step, {})
    status = state.get("current_step_status", "pending")
    completed = state.get("completed_steps", [])

    lines = [
        f"# CONTINUE BASSCALLY HUB AUTOPILOT — {step}",
        "",
        f"## Active step: {step} — {meta.get('title', '')}",
        f"**Status:** `{status}`",
        "",
        "## Hard rules — read before touching anything",
        "",
        "- Do not break the dark editorial design system (04_basscally_design_system.md is the contract).",
        "- Do not change schema without updating BH-02 artifact and this prompt.",
        "- Do not deploy to production until BH-22 is complete.",
        "- Do not remove download functionality — streaming primary, download secondary.",
        "- Do not add cookie banners — analytics are cookieless by design.",
        "- Do not change the founding member cap logic without explicit approval.",
        "- Do not re-ask for locked decisions listed below.",
        "- Every button and function must match the basscally-full-button-function-audit.md.",
        "",
        "## Read these first (in order)",
        "",
        "1. docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md",
        "2. docs/AUTO-REPORTS/BH-STATE.json",
        "3. docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md",
        "4. docs/basscally-full-button-function-audit.md",
        "5. 04_basscally_design_system.md",
        "6. 01_PRD_basscally_club_mvp_UPDATED_v1_1.md",
        f"7. {meta.get('artifact', 'docs/AUTO-REPORTS/[step artifact]')} (produce this)",
        "",
        "## Locked decisions — do not re-open",
        "",
    ]
    for d in DECISIONS_LOCKED:
        lines.append(f"- {d}")

    lines += [
        "",
        f"## This step: {step}",
        "",
        meta.get("focus", ""),
        "",
        "## Artifact to produce",
        "",
        f"`{meta.get('artifact', '')}`",
        "",
        "This file must contain ALL of the following (checked by controller):",
        "",
    ]
    for m in STEP_MARKERS.get(step, []):
        lines.append(f"- {m}")

    lines += [
        "",
        "## Completed steps so far",
        "",
    ]
    if completed:
        for s in completed:
            sm = STEP_META.get(s, {})
            lines.append(f"- ✅ {s} — {sm.get('title', '')}")
    else:
        lines.append("- None yet (BH-00 is first)")

    lines += [
        "",
        "## After IDE work",
        "",
        "```powershell",
        "npm run bh:complete",
        "```",
        "",
        "If bh:complete reports missing markers, fix them and run bh:complete again.",
        "Do not run bh:next until bh:complete passes.",
        "",
        "## Reference files",
        "",
        "- Design reference screens: all basscally-screen-*.html files",
        "- Button audit: docs/basscally-full-button-function-audit.md",
        "- Mobile audit spec: docs/mobile-responsive-quality-gate.md",
        "- Legal drafts: docs/basscally-legal-document-drafts.md",
        "- Depth/color fix: docs/codex-depth-color-fix-prompt.md",
        "",
    ]

    if status == "needs_fix":
        lines += [
            "## ⚠️ This step previously failed verification",
            "",
            "The markers that were missing are listed in docs/AUTO-REPORTS/BH-LATEST-RUN.md.",
            "Fix only the missing markers. Do not redo completed work.",
            "",
        ]

    lines += [
        "---",
        "",
        "## EXECUTE NOW",
        "",
        "Read this file completely. Do not ask for clarification.",
        "Do not ask for permission. Do not summarise what you are about to do.",
        "Execute the step described above in full.",
        "Create the artifact file at the path listed above.",
        "Include every required marker in the artifact.",
        "When done, stop. The user will run `npm run bh:complete` to verify.",
        "",
    ]

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------

def cmd_status(repo: Path) -> int:
    state = load_state(repo)
    step = state.get("current_step", "BH-00")
    meta = STEP_META.get(step, {})
    artifact_exists = (repo / meta.get("artifact", "")).exists() if meta.get("artifact") else False
    nxt = next_step_id(step)
    completed = state.get("completed_steps", [])

    lines = [
        f"Step:       {step}",
        f"Title:      {meta.get('title', '')}",
        f"Status:     {state.get('current_step_status', 'pending')}",
        f"Artifact:   {'found' if artifact_exists else 'missing'}",
        f"After this: {nxt or 'DONE'}",
        f"Completed:  {len(completed)} / {len(STEP_IDS)}",
        f"Health:     {state.get('last_check_result', 'unknown')}",
    ]
    print(border(lines))
    return 0


def cmd_next(repo: Path) -> int:
    state = load_state(repo)
    step = state.get("current_step", "BH-00")
    meta = STEP_META.get(step, {})
    config = load_config(repo)

    # Write prompt file
    prompt = build_next_agent_prompt(state)
    prompt_path = repo / config.get("prompt_file", "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md")
    prompt_path.parent.mkdir(parents=True, exist_ok=True)
    prompt_path.write_text(prompt, encoding="utf-8")

    # Update state
    state["current_step_status"] = "pushed"
    state["last_run_at"] = utc_now()
    save_state(repo, state)

    # Write command center
    write_command_center(repo, state)

    # Open editor or agent
    agent_cmd = config.get("agent_command")
    editor_cmd = config.get("editor_command", "cursor")

    if agent_cmd:
        subprocess.Popen([agent_cmd, str(prompt_path)])
        method = f"Agent: {agent_cmd}"
    else:
        try:
            subprocess.Popen([editor_cmd, str(prompt_path)])
            method = f"Opened in {editor_cmd}"
        except FileNotFoundError:
            method = f"Editor not found ({editor_cmd}). Open manually:"

    lines = [
        f"Step:    {step}",
        f"Title:   {meta.get('title', '')}",
        f"Status:  pushed",
        "",
        f"{method}",
        f"{str(prompt_path)}",
        "",
        "Tell your IDE agent: read NEXT-AGENT-PROMPT.md",
        "",
        "After IDE finishes: npm run bh:complete",
    ]
    print(border(lines))
    return 0


def cmd_complete(repo: Path) -> int:
    state = load_state(repo)
    step = state.get("current_step", "BH-00")
    meta = STEP_META.get(step, {})

    print(border([f"Verifying {step}...", ""]))

    results = []

    # 1. Artifact + markers
    artifact_ok, passed, failed = verify_artifact(repo, step)
    for m in passed:
        print(f"  [OK] {m}")
    for m in failed:
        print(f"  [FAIL] {m}: MISSING")
    results.append(artifact_ok)

    # 2. Git diff
    diff_ok, diff_summary = verify_git_diff(repo)
    if diff_ok:
        print("  [OK] Git diff: changes detected")
    else:
        print(f"  [FAIL] Git diff: {diff_summary}")
    results.append(diff_ok)

    # Write latest run report
    run_report = repo / REPORTS_DIR / "BH-LATEST-RUN.md"
    run_report.parent.mkdir(parents=True, exist_ok=True)
    report_lines = [
        f"# BH Latest Run — {utc_now()}",
        f"## Step: {step}",
        f"### Passed markers: {len(passed)}",
    ] + [f"- ✓ {m}" for m in passed] + [
        f"### Failed markers: {len(failed)}",
    ] + [f"- ✗ {m}" for m in failed] + [
        f"### Git diff: {'PASS' if diff_ok else 'FAIL'}",
        diff_summary,
    ]
    run_report.write_text("\n".join(report_lines), encoding="utf-8")

    all_passed = all(results) and len(failed) == 0

    if all_passed:
        # Advance
        completed = state.get("completed_steps", [])
        if step not in completed:
            completed.append(step)
        state["completed_steps"] = completed
        state["current_step_status"] = "completed"

        nxt = next_step_id(step)
        if nxt:
            state["current_step"] = nxt
            state["current_step_title"] = STEP_META.get(nxt, {}).get("title", "")
            state["current_step_status"] = "pending"
            state["after_current_step"] = next_step_id(nxt)
            state["next_action"] = "run bh:next"
            save_state(repo, state)
            write_command_center(repo, state)
            print(border([
                f"{step}: COMPLETED",
                "",
                f"Advanced to: {nxt}",
                f"Title: {state['current_step_title']}",
                "Status: pending",
                "Next: npm run bh:next",
            ]))
        else:
            state["next_action"] = "ALL STEPS COMPLETE"
            save_state(repo, state)
            print(border([
                f"{step}: COMPLETED",
                "",
                "ALL BASSCALLY HUB BUILD STEPS COMPLETE",
                "Ready for BH-22 production readiness sign-off.",
            ]))
    else:
        state["current_step_status"] = "needs_fix"
        state["last_check_result"] = "failed"
        save_state(repo, state)
        write_command_center(repo, state)

        print("")
        print(f"  {step}: NOT COMPLETE")
        if failed:
            print(f"\n  Missing markers:")
            for m in failed:
                print(f"    - {m}")
        print(f"\n  Status: needs_fix")
        print(f"  Next: npm run bh:next (prompt will note missing items)")
        print("=" * 54)

    return 0 if all_passed else 1


def cmd_check(repo: Path) -> int:
    print(border(["Running health checks...", "(no workflow state change)"]))
    results = run_health_checks(repo)
    passed_all = True
    for r in results:
        icon = "[OK]" if r["passed"] else "[FAIL]"
        print(f"  {icon} {r['name']}: {'PASS' if r['passed'] else 'FAIL'}")
        if not r["passed"]:
            passed_all = False
            print(f"      {r['output'][:200]}")

    state = load_state(repo)
    state["last_check_result"] = "passed" if passed_all else "failed"
    save_state(repo, state)

    print(border(["Health check complete.", f"Result: {'PASS' if passed_all else 'FAIL'}"]))
    return 0 if passed_all else 1


# ---------------------------------------------------------------------------
# Command center writer
# ---------------------------------------------------------------------------

def write_command_center(repo: Path, state: Dict[str, Any]) -> None:
    step = state.get("current_step", "BH-00")
    meta = STEP_META.get(step, {})
    completed = state.get("completed_steps", [])
    nxt = next_step_id(step)

    lines = [
        "# Basscally Hub — Current Command Center",
        f"*Updated: {utc_now()}*",
        "",
        f"## Current step: {step} — {meta.get('title', '')}",
        f"**Status:** `{state.get('current_step_status', 'pending')}`",
        f"**After this:** {nxt or 'DONE'}",
        "",
        "## What to do right now",
        "",
        "```powershell",
        "npm run bh:next",
        "```",
        "",
        f"Then tell your IDE agent to read `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md`.",
        "",
        f"After IDE finishes: `npm run bh:complete`",
        "",
        "## Progress",
        f"Completed: {len(completed)} / {len(STEP_IDS)}",
        "",
    ]
    for sid in STEP_IDS:
        done = sid in completed
        sm = STEP_META.get(sid, {})
        icon = "✅" if done else ("▶️" if sid == step else "⬜")
        lines.append(f"{icon} {sid} — {sm.get('title', '')}")

    lines += [
        "",
        "## Locked decisions",
        "",
    ]
    for d in DECISIONS_LOCKED:
        lines.append(f"- {d}")

    cc_path = repo / "docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md"
    cc_path.parent.mkdir(parents=True, exist_ok=True)
    cc_path.write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

LEGACY_COMMANDS = {
    "handoff", "run-current", "executor-status", "open-prompt",
    "push", "prepare", "verify-diff",
}


def main(argv: Optional[List[str]] = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass
    argv = argv or sys.argv[1:]
    repo = find_repo_root()

    if not argv or argv[0] in ("-h", "--help", "help"):
        print(__doc__)
        print("Commands: status | next | complete | check")
        return 0

    cmd = argv[0].lower()
    if cmd in LEGACY_COMMANDS:
        print(f"'{cmd}' is not a valid command. Use: status | next | complete | check", file=sys.stderr)
        return 2

    handlers = {
        "status": lambda: cmd_status(repo),
        "next": lambda: cmd_next(repo),
        "complete": lambda: cmd_complete(repo),
        "check": lambda: cmd_check(repo),
    }
    if cmd not in handlers:
        print(f"Unknown command: {cmd}. Use: status | next | complete | check", file=sys.stderr)
        return 2

    try:
        return handlers[cmd]()
    except KeyboardInterrupt:
        print("\nInterrupted. Next safe command: npm run bh:status")
        return 130


if __name__ == "__main__":
    sys.exit(main())
