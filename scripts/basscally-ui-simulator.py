#!/usr/bin/env python3
"""
Basscally Hub — UI Simulator

Tests full user journeys for all personas across all routes.
Performs real browser clicks, form submissions, and screenshot capture.
Does not simulate — actually drives a real Chromium browser.

Usage:
    python scripts/basscally-ui-simulator.py
    python scripts/basscally-ui-simulator.py --suite auth
    python scripts/basscally-ui-simulator.py --suite member
    python scripts/basscally-ui-simulator.py --suite admin
    python scripts/basscally-ui-simulator.py --suite conversion
    python scripts/basscally-ui-simulator.py --suite paywall
    python scripts/basscally-ui-simulator.py --suite all

Requires:
    pip install playwright --break-system-packages
    python -m playwright install chromium
    npm run dev running (localhost:3000)

Produces:
    docs/AUTO-REPORTS/UI-SIM-LATEST.md        — full test report
    docs/AUTO-REPORTS/UI-SIM-FIX-PROMPT.md    — paste-ready fix prompt for failing tests
    docs/AUTO-REPORTS/UI-SIM-SCREENSHOTS/     — screenshot for every FAIL
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path
from datetime import datetime

BASE_URL = "http://localhost:3000"
REPO_ROOT = Path(__file__).parent.parent
REPORT_DIR = REPO_ROOT / "docs" / "AUTO-REPORTS"
SCREENSHOT_DIR = REPORT_DIR / "UI-SIM-SCREENSHOTS"
REPORT_FILE = REPORT_DIR / "UI-SIM-LATEST.md"
FIX_PROMPT_FILE = REPORT_DIR / "UI-SIM-FIX-PROMPT.md"

# ---------------------------------------------------------------------------
# Personas — map to Supabase mock auth cookie values
# Set these to match your mock-auth implementation in the app.
# ---------------------------------------------------------------------------

PERSONAS = {
    "anonymous": {
        "id": None,
        "role": "Anonymous",
        "description": "No session — not logged in",
    },
    "member_active": {
        "id": "mock-member-active",
        "role": "Active Member",
        "description": "Subscribed, founding member, content available",
    },
    "member_lapsed": {
        "id": "mock-member-lapsed",
        "role": "Lapsed Member",
        "description": "Subscription expired — should see paywall",
    },
    "admin": {
        "id": "mock-admin-michael",
        "role": "Admin",
        "description": "Administrator — access to /admin routes",
    },
}

MOCK_COOKIE_NAME = "basscally_mock_user_id"
RESULTS = []
SCREENSHOTS = []


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def check_server():
    import urllib.request
    for url in (BASE_URL, "http://127.0.0.1:3000"):
        try:
            urllib.request.urlopen(url, timeout=5)
            return True
        except Exception:
            continue
    return False


def log(suite, persona, check, status, detail="", screenshot=None):
    entry = {
        "suite": suite,
        "persona": persona,
        "check": check,
        "status": status,
        "detail": detail[:400] if detail else "",
        "screenshot": screenshot,
        "time": datetime.now().strftime("%H:%M:%S"),
    }
    RESULTS.append(entry)
    icon = {"PASS": "✓", "FAIL": "✗", "WARN": "⚠", "INFO": "ℹ"}.get(status, "?")
    role = PERSONAS.get(persona, {}).get("role", persona)
    msg = f"  {icon} [{status}] {persona} ({role}) — {check}"
    if detail and status != "PASS":
        msg += f"\n      {detail[:160]}"
    print(msg)


def make_page(pw, persona_name, headless=True):
    """Create a browser page with the given persona's mock auth."""
    browser = pw.chromium.launch(headless=headless)
    context = browser.new_context(
        viewport={"width": 1366, "height": 768},
        user_agent="BasscallySimulator/1.0",
    )

    persona = PERSONAS.get(persona_name, {})
    if persona.get("id"):
        # Try API-based session first
        try:
            resp = context.request.post(
                f"{BASE_URL}/api/mock-auth/session",
                data={"userId": persona["id"]},
            )
            if not resp.ok:
                raise Exception("API route not available")
        except Exception:
            # Fall back to cookie
            context.add_cookies([{
                "name": MOCK_COOKIE_NAME,
                "value": persona["id"],
                "domain": "localhost",
                "path": "/",
                "httpOnly": False,
            }])

    page = context.new_page()
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(f"PAGE ERROR: {e}"))
    return browser, context, page, errors


def goto(page, path, timeout=20000):
    try:
        page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded", timeout=timeout)
        return True
    except Exception as e:
        return False


def screenshot(page, name):
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    safe = name.replace("/", "_").replace(" ", "_").replace(":", "-")
    path = SCREENSHOT_DIR / f"{safe}_{datetime.now().strftime('%H%M%S')}.png"
    try:
        page.screenshot(path=str(path), full_page=False)
        SCREENSHOTS.append(str(path))
        return str(path.name)
    except Exception:
        return None


def check_element(page, selector, label, timeout=5000):
    try:
        page.wait_for_selector(selector, timeout=timeout, state="visible")
        return True
    except Exception:
        return False


def check_url_contains(page, fragment):
    return fragment in page.url


def check_redirected_to_login(page):
    return "/auth/login" in page.url or "/login" in page.url


def check_redirected_to_paywall(page):
    return "/paywall" in page.url or "/pricing" in page.url


def tap_and_check(page, selector, expected_url_fragment=None, expected_selector=None, timeout=8000):
    try:
        page.click(selector, timeout=timeout)
        time.sleep(1)
        if expected_url_fragment:
            return expected_url_fragment in page.url
        if expected_selector:
            return check_element(page, expected_selector)
        return True
    except Exception:
        return False


# ---------------------------------------------------------------------------
# Test suites
# ---------------------------------------------------------------------------

def suite_auth(pw, headless=True):
    """Test magic link auth flow for anonymous users."""
    print("\n── Auth Suite ──")

    browser, ctx, page, errors = make_page(pw, "anonymous", headless)

    # Login page loads
    goto(page, "/auth/login")
    ok = check_element(page, "input[type='email']", "email input")
    log("auth", "anonymous", "Login page loads with email field", "PASS" if ok else "FAIL",
        screenshot=screenshot(page, "auth_login") if not ok else None)

    # Invalid email shows error
    page.fill("input[type='email']", "notanemail")
    page.click("button[type='button']") if check_element(page, "button[type='button']", "", 2000) else None
    time.sleep(0.5)
    has_error = check_element(page, "[class*='error'], [class*='Error'], .field__error", "error", 3000)
    log("auth", "anonymous", "Invalid email shows error state", "PASS" if has_error else "WARN",
        detail="No visible error element found" if not has_error else "")

    # Valid email transitions to success state
    page.fill("input[type='email']", "test@basscally.club")
    page.click("button[type='button']") if check_element(page, "button[type='button']", "", 2000) else None
    time.sleep(2)
    # Either: success state visible OR loading state (both are correct behaviour)
    success = (
        check_element(page, "[class*='success'], [class*='check'], [class*='email-sent']", "success", 3000)
        or "check your email" in page.content().lower()
    )
    log("auth", "anonymous", "Valid email → success/loading state", "PASS" if success else "WARN",
        detail="Success state not clearly visible" if not success else "",
        screenshot=screenshot(page, "auth_success_state") if not success else None)

    browser.close()


def suite_conversion(pw, headless=True):
    """Test the 3-click conversion flow: Landing → Style page → Checkout."""
    print("\n── Conversion Suite (3-click flow) ──")

    browser, ctx, page, errors = make_page(pw, "anonymous", headless)

    # Click 1: Landing page loads
    ok = goto(page, "/")
    has_hero = check_element(page, "h1, [class*='hero__headline'], [class*='heading']", "hero headline")
    log("conversion", "anonymous", "Click 1: Landing page loads", "PASS" if (ok and has_hero) else "FAIL",
        screenshot=screenshot(page, "landing") if not has_hero else None)

    # Landing CTA exists and links somewhere
    cta = page.query_selector("a[href*='style'], a[href*='pricing'], a[href*='checkout'], a[href*='lemonsqueezy']")
    log("conversion", "anonymous", "Primary CTA present on landing", "PASS" if cta else "FAIL",
        detail="No CTA link found" if not cta else "")

    # Click 2: Style/artist page
    ok2 = goto(page, "/style")
    if not ok2:
        # Try first style slug
        ok2 = goto(page, "/style/example")
    log("conversion", "anonymous", "Click 2: Style/artist page loads", "PASS" if ok2 else "WARN",
        detail="Route /style or /style/[slug] not found" if not ok2 else "",
        screenshot=screenshot(page, "style_page") if not ok2 else None)

    if ok2:
        has_preview = check_element(page, "[class*='preview'], [class*='track'], audio", "track preview", 5000)
        log("conversion", "anonymous", "Style page has track previews", "PASS" if has_preview else "WARN",
            detail="No track preview elements found" if not has_preview else "")

        has_cta = check_element(page, "a[href*='checkout'], a[href*='lemonsqueezy'], a[href*='pricing']", "checkout CTA", 3000)
        log("conversion", "anonymous", "Unlock CTA present on style page", "PASS" if has_cta else "FAIL",
            detail="No checkout/unlock CTA found" if not has_cta else "")

    # Waitlist page
    ok3 = goto(page, "/waitlist")
    has_email = check_element(page, "input[type='email']", "email input", 5000)
    log("conversion", "anonymous", "Waitlist page loads with email input", "PASS" if (ok3 and has_email) else "FAIL",
        detail="Waitlist page not found or no email input" if not (ok3 and has_email) else "",
        screenshot=screenshot(page, "waitlist") if not (ok3 and has_email) else None)

    browser.close()


def suite_member(pw, headless=True):
    """Test full member journey: dashboard, content, audio player, download, account."""
    print("\n── Member Suite ──")

    # Active member
    browser, ctx, page, errors = make_page(pw, "member_active", headless)

    # Dashboard loads
    goto(page, "/dashboard")
    time.sleep(1)
    if check_redirected_to_login(page):
        log("member", "member_active", "Dashboard accessible", "FAIL",
            detail="Redirected to login — mock auth not working",
            screenshot=screenshot(page, "dashboard_redirect"))
        browser.close()
        return

    has_content = check_element(page, "[class*='dashboard'], [class*='content-grid'], [class*='drop'], main", "dashboard content", 5000)
    log("member", "member_active", "Dashboard loads (not redirected)", "PASS" if has_content else "FAIL",
        screenshot=screenshot(page, "dashboard") if not has_content else None)

    # Filter tabs
    tabs = page.query_selector_all("[class*='filter-tab'], [role='tab']")
    log("member", "member_active", "Filter tabs present", "PASS" if len(tabs) >= 3 else "WARN",
        detail=f"Found {len(tabs)} tabs, expected ≥ 5" if len(tabs) < 3 else "")

    # Content card exists and is clickable
    card = page.query_selector("a[href*='/c/'], [class*='content-card'] a")
    if card:
        href = card.get_attribute("href") or ""
        log("member", "member_active", "Content card links to /c/[id]", "PASS" if "/c/" in href else "WARN",
            detail=f"Card href: {href}" if "/c/" not in href else "")

        # Navigate to content detail
        card.click()
        time.sleep(1.5)
        has_player = check_element(page, "audio, [class*='audio-player'], [class*='player__play']", "audio player", 5000)
        log("member", "member_active", "Content detail has audio player", "PASS" if has_player else "FAIL",
            screenshot=screenshot(page, "content_detail") if not has_player else None)

        has_download = check_element(page, "a[href*='download'], button[class*='download'], [class*='download']", "download button", 3000)
        log("member", "member_active", "Download button present", "PASS" if has_download else "FAIL",
            detail="No download element found" if not has_download else "")
    else:
        log("member", "member_active", "Content card found", "WARN",
            detail="No content cards found — may need seed data")

    # Account page
    goto(page, "/account")
    time.sleep(1)
    has_account = check_element(page, "[class*='account'], [class*='membership'], [class*='subscription']", "account content", 5000)
    log("member", "member_active", "Account page loads", "PASS" if has_account else "FAIL",
        screenshot=screenshot(page, "account") if not has_account else None)

    has_billing_btn = check_element(page, "a[href*='portal'], a[href*='billing'], button[class*='billing']", "billing button", 3000)
    log("member", "member_active", "Manage billing button present", "PASS" if has_billing_btn else "WARN",
        detail="No billing/portal button found" if not has_billing_btn else "")

    browser.close()

    # Mobile bottom nav check at 375px
    browser2, ctx2, page2, _ = make_page(pw, "member_active", headless)
    page2.set_viewport_size({"width": 375, "height": 812})
    goto(page2, "/dashboard")
    time.sleep(1)
    has_mobile_nav = check_element(page2, "[class*='mobile-bottom-nav'], [class*='bottom-nav'], nav[class*='mobile']", "mobile nav", 5000)
    log("member", "member_active", "Mobile bottom nav visible at 375px", "PASS" if has_mobile_nav else "WARN",
        screenshot=screenshot(page2, "dashboard_mobile_375") if not has_mobile_nav else None)

    # No horizontal overflow
    overflow = page2.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    log("member", "member_active", "No horizontal overflow at 375px", "PASS" if not overflow else "FAIL",
        detail="Horizontal scroll detected at 375px" if overflow else "")

    browser2.close()


def suite_paywall(pw, headless=True):
    """Test that lapsed/anonymous users are blocked from gated content."""
    print("\n── Paywall Suite ──")

    # Anonymous user tries /dashboard
    browser, ctx, page, errors = make_page(pw, "anonymous", headless)
    goto(page, "/dashboard")
    time.sleep(1)
    blocked = check_redirected_to_login(page) or check_redirected_to_paywall(page)
    log("paywall", "anonymous", "Anonymous blocked from /dashboard", "PASS" if blocked else "FAIL",
        detail=f"Ended up at: {page.url}" if not blocked else "",
        screenshot=screenshot(page, "anon_dashboard_attempt") if not blocked else None)

    # Anonymous tries /c/mock-content-id
    goto(page, "/c/test-content-id")
    time.sleep(1)
    blocked2 = check_redirected_to_login(page) or check_redirected_to_paywall(page) or page.url == f"{BASE_URL}/"
    log("paywall", "anonymous", "Anonymous blocked from /c/[id]", "PASS" if blocked2 else "FAIL",
        detail=f"Ended up at: {page.url}" if not blocked2 else "",
        screenshot=screenshot(page, "anon_content_attempt") if not blocked2 else None)

    # Anonymous tries /admin
    goto(page, "/admin")
    time.sleep(1)
    blocked3 = check_redirected_to_login(page) or "/admin" not in page.url
    log("paywall", "anonymous", "Anonymous blocked from /admin", "PASS" if blocked3 else "FAIL",
        detail=f"Ended up at: {page.url} — ADMIN ACCESSIBLE WITHOUT AUTH!" if not blocked3 else "",
        screenshot=screenshot(page, "anon_admin_attempt") if not blocked3 else None)
    browser.close()

    # Lapsed member tries /c/[id]
    browser2, ctx2, page2, _ = make_page(pw, "member_lapsed", headless)
    goto(page2, "/c/test-content-id")
    time.sleep(1)
    sees_paywall = check_redirected_to_paywall(page2) or check_element(page2, "[class*='paywall'], [class*='locked'], [class*='subscribe']", "paywall element", 3000)
    log("paywall", "member_lapsed", "Lapsed member sees paywall on /c/[id]", "PASS" if sees_paywall else "FAIL",
        detail=f"Ended up at: {page2.url} — lapsed member got content!" if not sees_paywall else "",
        screenshot=screenshot(page2, "lapsed_content_attempt") if not sees_paywall else None)

    # Lapsed member download API returns 403
    try:
        resp = ctx2.request.get(f"{BASE_URL}/api/content/test-content-id/download")
        is_blocked = resp.status in (401, 403, 302)
        log("paywall", "member_lapsed", "Download API rejects lapsed member (401/403/302)", "PASS" if is_blocked else "FAIL",
            detail=f"Got status {resp.status} — expected 401 or 403" if not is_blocked else "")
    except Exception as e:
        log("paywall", "member_lapsed", "Download API test", "WARN", detail=str(e))
    browser2.close()


def suite_admin(pw, headless=True):
    """Test admin routes — access, upload form, metrics, subscriber list."""
    print("\n── Admin Suite ──")

    browser, ctx, page, errors = make_page(pw, "admin", headless)

    # Admin dashboard
    goto(page, "/admin")
    time.sleep(1)
    if check_redirected_to_login(page):
        log("admin", "admin", "Admin dashboard accessible", "FAIL",
            detail="Redirected to login — admin mock auth not working",
            screenshot=screenshot(page, "admin_redirect"))
        browser.close()
        return

    has_metrics = check_element(page, "[class*='metric'], [class*='stat'], [class*='dashboard']", "metrics", 5000)
    log("admin", "admin", "Admin dashboard loads with metrics", "PASS" if has_metrics else "FAIL",
        screenshot=screenshot(page, "admin_dashboard") if not has_metrics else None)

    # Upload form
    goto(page, "/admin/content/new")
    time.sleep(1)
    has_upload = check_element(page, "[class*='upload'], input[type='file'], [class*='upload-zone']", "upload zone", 5000)
    log("admin", "admin", "Upload form loads with file zone", "PASS" if has_upload else "FAIL",
        screenshot=screenshot(page, "admin_upload") if not has_upload else None)

    has_status_toggle = check_element(page, "[class*='status'], [class*='toggle'], select", "status toggle", 3000)
    log("admin", "admin", "Status toggle (Draft/Scheduled/Publish) present", "PASS" if has_status_toggle else "WARN",
        detail="No status toggle found" if not has_status_toggle else "")

    has_email_field = check_element(page, "input[id*='email'], textarea[id*='email'], [class*='email']", "email field", 3000)
    log("admin", "admin", "Email subject field present", "PASS" if has_email_field else "WARN",
        detail="No email subject field" if not has_email_field else "")

    # Content list
    goto(page, "/admin/content")
    time.sleep(1)
    has_table = check_element(page, "table, [class*='data-table'], [class*='content-list']", "content table", 5000)
    log("admin", "admin", "Content list page has table", "PASS" if has_table else "FAIL",
        screenshot=screenshot(page, "admin_content_list") if not has_table else None)

    # Subscribers list
    goto(page, "/admin/subscribers")
    time.sleep(1)
    has_subs = check_element(page, "table, [class*='subscribers'], [class*='list']", "subscribers", 5000)
    log("admin", "admin", "Subscribers list page loads", "PASS" if has_subs else "FAIL",
        screenshot=screenshot(page, "admin_subscribers") if not has_subs else None)

    # Member cannot reach /admin
    browser.close()
    browser2, ctx2, page2, _ = make_page(pw, "member_active", headless)
    goto(page2, "/admin")
    time.sleep(1)
    member_blocked = "/admin" not in page2.url or check_element(page2, "[class*='unauthorized'], [class*='403']", "unauthorized", 2000)
    log("admin", "member_active", "Member cannot access /admin", "PASS" if member_blocked else "FAIL",
        detail=f"Member reached /admin at {page2.url}" if not member_blocked else "",
        screenshot=screenshot(page2, "member_admin_attempt") if not member_blocked else None)
    browser2.close()


def suite_responsive(pw, headless=True):
    """Basic responsive check: no horizontal overflow at key breakpoints."""
    print("\n── Responsive Suite ──")
    breakpoints = [320, 375, 768, 1024, 1280]
    routes = ["/", "/auth/login", "/dashboard", "/pricing"]

    browser, ctx, page, _ = make_page(pw, "member_active", headless)

    for route in routes:
        for width in breakpoints:
            page.set_viewport_size({"width": width, "height": 900})
            goto(page, route)
            time.sleep(0.8)
            overflow = page.evaluate(
                "document.documentElement.scrollWidth > document.documentElement.clientWidth"
            )
            log("responsive", f"member_active", f"{route} at {width}px — no H-overflow",
                "PASS" if not overflow else "FAIL",
                detail=f"scrollWidth {page.evaluate('document.documentElement.scrollWidth')}px > viewportWidth {width}px" if overflow else "",
                screenshot=screenshot(page, f"responsive_{route.replace('/','_')}_{width}") if overflow else None)

    browser.close()


# ---------------------------------------------------------------------------
# Report writer
# ---------------------------------------------------------------------------

def write_reports():
    total = len(RESULTS)
    passed = sum(1 for r in RESULTS if r["status"] == "PASS")
    failed = sum(1 for r in RESULTS if r["status"] == "FAIL")
    warned = sum(1 for r in RESULTS if r["status"] == "WARN")

    lines = [
        "# Basscally Hub — UI Simulator Report",
        f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*",
        "",
        f"## Summary: {passed}/{total} passed | {failed} failed | {warned} warnings",
        "",
        "| Suite | Persona | Check | Status | Detail |",
        "|---|---|---|---|---|",
    ]
    for r in RESULTS:
        detail = r.get("detail", "")[:80].replace("|", "—")
        shot = f" 📸" if r.get("screenshot") else ""
        lines.append(f"| {r['suite']} | {r['persona']} | {r['check']} | {r['status']}{shot} | {detail} |")

    lines += ["", "## Screenshots", ""]
    if SCREENSHOTS:
        for s in SCREENSHOTS:
            lines.append(f"- `{s}`")
    else:
        lines.append("- None (all tests passed)")

    REPORT_FILE.parent.mkdir(parents=True, exist_ok=True)
    REPORT_FILE.write_text("\n".join(lines), encoding="utf-8")

    # Fix prompt for failing tests
    fails = [r for r in RESULTS if r["status"] == "FAIL"]
    if fails:
        fix_lines = [
            "# Basscally Hub — UI Simulator Fix Prompt",
            f"*{len(fails)} failing tests. Fix all before running bh:complete on BH-18.*",
            "",
            "## Failing checks",
            "",
        ]
        for r in fails:
            fix_lines += [
                f"### {r['suite']} — {r['persona']} — {r['check']}",
                f"**Detail:** {r['detail']}",
                f"**Time:** {r['time']}",
            ]
            if r.get("screenshot"):
                fix_lines.append(f"**Screenshot:** `{r['screenshot']}`")
            fix_lines.append("")
        fix_lines += [
            "## Fix guidance",
            "",
            "1. For FAIL on route access (redirected unexpectedly): check middleware.ts and route protection logic.",
            "2. For FAIL on download API (wrong status code): check /api/content/[id]/download subscription verification.",
            "3. For FAIL on audio player missing: check /c/[id] component and that Supabase Storage signed URLs are generated.",
            "4. For FAIL on admin blocked: check ADMIN_EMAILS env var and admin middleware.",
            "5. For FAIL on horizontal overflow: run basscally-responsive-audit.py for detailed breakdown.",
            "6. For FAIL on paywall not showing: check middleware.ts handles lapsed subscription status.",
            "",
            "After fixing, restart npm run dev and re-run:",
            "```",
            "python scripts/basscally-ui-simulator.py --suite all",
            "```",
        ]
        FIX_PROMPT_FILE.write_text("\n".join(fix_lines), encoding="utf-8")
        print(f"\n  Fix prompt written: {FIX_PROMPT_FILE}")

    print(f"\n  Report written: {REPORT_FILE}")
    return failed == 0


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

SUITE_MAP = {
    "auth": suite_auth,
    "conversion": suite_conversion,
    "member": suite_member,
    "paywall": suite_paywall,
    "admin": suite_admin,
    "responsive": suite_responsive,
}


def main():
    parser = argparse.ArgumentParser(description="Basscally Hub UI Simulator")
    parser.add_argument("--suite", default="all", choices=list(SUITE_MAP.keys()) + ["all"])
    parser.add_argument("--headed", action="store_true", help="Run with visible browser window")
    args = parser.parse_args()

    print("═" * 54)
    print("BASSCALLY HUB UI SIMULATOR")
    print("═" * 54)

    if not check_server():
        print("\n  ✗ Server not running at localhost:3000")
        print("  Run: npm run dev")
        sys.exit(1)
    print("  ✓ Server running")

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("\n  ✗ Playwright not installed.")
        print("  Run: pip install playwright && python -m playwright install chromium")
        sys.exit(1)

    headless = not args.headed
    suites_to_run = SUITE_MAP.keys() if args.suite == "all" else [args.suite]

    with sync_playwright() as pw:
        for suite_name in suites_to_run:
            SUITE_MAP[suite_name](pw, headless=headless)

    all_passed = write_reports()

    total = len(RESULTS)
    passed = sum(1 for r in RESULTS if r["status"] == "PASS")
    failed = sum(1 for r in RESULTS if r["status"] == "FAIL")
    warned = sum(1 for r in RESULTS if r["status"] == "WARN")

    print(f"\n{'═' * 54}")
    print(f"  {passed}/{total} PASS | {failed} FAIL | {warned} WARN")
    if all_passed:
        print("  ✓ All tests passed — BH-18 artifact can be created")
    else:
        print(f"  ✗ {failed} failing — fix before bh:complete")
    print("═" * 54)
    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()
