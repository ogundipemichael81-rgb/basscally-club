/**
 * Full public + cancel-page route audit.
 * Run: npm run dev && node scripts/public-route-audit.mjs
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";

const BASE = process.env.PUBLIC_AUDIT_BASE ?? "http://localhost:3000";
const ROUTES = [
  "/",
  "/pricing",
  "/auth/login",
  "/auth/callback",
  "/checkout/success",
  "/checkout/cancelled",
  "/terms",
  "/privacy",
  "/refund-policy",
  "/account/cancel",
];
const WIDTHS = [320, 375, 390, 768, 1024, 1280, 1440];

function runPageAudit({ route, viewportWidth }) {
  const devWordPatterns = [
    "placeholder_user",
    "Phase A",
    "Phase B",
    "MVP",
    "webhook",
    "Supabase",
    "Screen 01",
    "route: /",
    "[TODO]",
    "[DRAFT]",
    "Designed states",
    "Lorem ipsum",
  ];
  const fakeCancelPatterns = [
    "subscription has been cancelled",
    "successfully cancelled",
    "you are no longer a member",
    "cancellation complete",
  ];
  const decoSelector =
    ".decorative-motion,.pricing-orbit-wrap,.pricing-orbit-rotator,.pricing-orbit-dot,.pricing-orbit-ring,.pricing-orbit-ring-2,.pricing-orbit-ring-3,.pricing-wave span,.callback-stage-deco,.callback-vinyl-wrap,.callback-vinyl,.callback-accent-dot,.callback-bars span,.checkout-vinyl-wrap,.checkout-vinyl,.hero-live-dot,.callback-stage-card,.landing-vinyl-pulse-wrap,.landing-wave span,.landing-rail-shimmer";

  const issues = { copy: [], cta: [], motion: [], responsive: [] };
  const gap = 6;

  function overlap(a, b) {
    return !(
      a.right + gap < b.left ||
      a.left - gap > b.right ||
      a.bottom + gap < b.top ||
      a.top - gap > b.bottom
    );
  }

  function visible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return (
      r.width > 2 &&
      r.height > 2 &&
      s.display !== "none" &&
      s.visibility !== "hidden" &&
      Number(s.opacity) > 0.05
    );
  }

  const bodyText = document.body?.innerText || "";
  const html = document.documentElement.innerHTML;

  const legalRoutes = ["/terms", "/privacy", "/refund-policy"];
  const legalVendors = ["supabase", "lemon squeezy", "resend", "vercel"];
  const lower = bodyText.toLowerCase();
  for (const phrase of devWordPatterns) {
    if (legalRoutes.includes(route) && legalVendors.includes(phrase.toLowerCase())) {
      continue;
    }
    if (lower.includes(phrase.toLowerCase()) || html.includes(phrase)) {
      issues.copy.push(`developer language: ${phrase}`);
    }
  }

  if (route === "/account/cancel") {
    if (!lower.includes("cancel membership")) {
      issues.copy.push("missing cancel page title");
    }
    if (!document.querySelector("button[disabled], button:disabled")) {
      issues.copy.push("billing portal not clearly disabled");
    }
    for (const phrase of fakeCancelPatterns) {
      if (lower.includes(phrase)) {
        issues.copy.push(`fake cancellation: ${phrase}`);
      }
    }
    if (
      !lower.includes("when billing is connected") &&
      !lower.includes("billing is connected") &&
      !lower.includes("after billing")
    ) {
      issues.copy.push("missing honest billing-not-live copy");
    }
  }

  const doc = document.documentElement;
  if (
    doc.scrollWidth > doc.clientWidth + 1 ||
    document.body.scrollWidth > document.body.clientWidth + 1
  ) {
    issues.responsive.push("horizontal scroll");
  }

  const headers = [...document.querySelectorAll("header")].filter(visible);
  const isAuthLogin = route === "/auth/login";
  const isMember = route.startsWith("/account");

  if (headers.length === 0 && !isAuthLogin && !isMember) {
    issues.cta.push("no visible header");
  }
  if (headers.length > 1 && !isMember) {
    issues.cta.push(`${headers.length} header layers`);
  }
  if (headers.length > 2 && isMember) {
    issues.cta.push(`${headers.length} header layers on member page`);
  }

  function normalizeLabel(text) {
    return text.replace(/\s+/g, " ").trim().toLowerCase();
  }
  function isJoinLike(label) {
    const n = normalizeLabel(label);
    return n.includes("join") || n.includes("continue") || (n.includes("$1.50") && !n.includes("sign in"));
  }
  function linkLabel(el) {
    return normalizeLabel(el.textContent || el.getAttribute("aria-label") || "");
  }

  const navHeader = headers.find((h) => h.querySelector("nav") || h.closest("header"));
  const marketingNav = [...document.querySelectorAll("header")].filter(
    (h) => visible(h) && h.querySelector('a[href="/"]'),
  );
  const navCtas = marketingNav[0]
    ? [...marketingNav[0].querySelectorAll("nav a, nav button")].filter(visible)
    : [];

  if (marketingNav.length > 1) {
    issues.cta.push("duplicate marketing nav headers");
  }

  const navJoins = navCtas.filter((el) => isJoinLike(linkLabel(el)));
  if (navJoins.length > 1) {
    issues.cta.push("duplicate Join in nav");
  }

  if (
    ["/terms", "/privacy", "/refund-policy"].includes(route) &&
    navCtas.some((el) => isJoinLike(linkLabel(el)))
  ) {
    issues.cta.push("Join in nav on legal");
  }

  if (route === "/" && viewportWidth < 1024) {
    const sticky = document.querySelector(".fixed.bottom-0");
    const stickyVisible = sticky && visible(sticky) && getComputedStyle(sticky).display !== "none";
    const heroJoin = [...document.querySelectorAll(".basscally-hero a")].filter(
      (el) => visible(el) && isJoinLike(linkLabel(el)),
    );
    const navJoinMobile = navCtas.filter((el) => isJoinLike(linkLabel(el)));
    if (stickyVisible && navJoinMobile.length) {
      issues.cta.push("nav Join + sticky on mobile");
    }
    if (stickyVisible && heroJoin.length && getComputedStyle(heroJoin[0]).display !== "none") {
      issues.cta.push("hero Join visible with sticky on mobile");
    }
  }

  const allCtaLinks = [
    ...document.querySelectorAll(
      'header a[href], header button, main a[href], main button, .fixed.bottom-0 a, .auth-page-shell a, .auth-page-shell button',
    ),
  ].filter(visible);

  for (const cta of allCtaLinks) {
    const cr = cta.getBoundingClientRect();
    if (cr.top > window.innerHeight * 0.55) continue;
    for (const h of document.querySelectorAll("h1, h2")) {
      if (!visible(h) || h.contains(cta) || cta.contains(h)) continue;
      const hr = h.getBoundingClientRect();
      if (hr.top > window.innerHeight * 0.5) continue;
      if (overlap(cr, hr)) {
        issues.cta.push("CTA overlaps heading");
        break;
      }
    }
  }

  const footer = document.querySelector("footer");
  if (footer && ["/", "/pricing", "/terms", "/privacy", "/refund-policy"].includes(route)) {
    for (const href of ["/terms", "/privacy", "/refund-policy"]) {
      if (!footer.querySelector(`a[href="${href}"]`)) {
        issues.responsive.push(`missing footer ${href}`);
      }
    }
    const contact = footer.querySelector('a[href^="mailto:"]');
    if (!contact) issues.responsive.push("missing footer contact");
  }

  const decoEls = [...document.querySelectorAll(decoSelector)].filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    const s = getComputedStyle(el);
    return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.01;
  });
  const protectedEls = [
    ...document.querySelectorAll(
      "header, h1, h2, h3, footer, a.btn, a[class*='btn'], button:not([aria-hidden]), input, textarea, label, .fixed.bottom-0",
    ),
  ].filter(visible);

  for (const d of [...new Set(decoEls)]) {
    const dr = d.getBoundingClientRect();
    for (const p of protectedEls) {
      if (d === p || d.contains(p) || p.contains(d)) continue;
      const clip = d.closest(".decorative-motion,.pricing-orbit-wrap,.checkout-vinyl-wrap");
      if (clip && !clip.contains(p)) continue;
      if (overlap(dr, p.getBoundingClientRect())) {
        issues.motion.push(`deco overlaps ${p.tagName}`);
        break;
      }
    }
  }

  const mobileCta = document.querySelector(".fixed.bottom-0");
  if (mobileCta && visible(mobileCta)) {
    const mr = mobileCta.getBoundingClientRect();
    for (const d of decoEls) {
      if (overlap(d.getBoundingClientRect(), mr)) {
        issues.motion.push("deco overlaps mobile CTA");
        break;
      }
    }
  }

  if (route === "/") {
    const wave = document.querySelector(".landing-wave span");
    const liveDot = document.querySelector(".hero-live-dot");
    const glowHero = document.querySelector(".basscally-landing-hero");
    let hasMotion = false;
    if (wave && getComputedStyle(wave).animationName !== "none") hasMotion = true;
    if (liveDot) {
      const after = getComputedStyle(liveDot, "::after");
      if (after.animationName && after.animationName !== "none") hasMotion = true;
    }
    if (glowHero) {
      const before = getComputedStyle(glowHero, "::before");
      if (before.animationName && before.animationName !== "none") hasMotion = true;
    }
    if (!hasMotion) {
      issues.motion.push("home lacks subtle motion");
    }
  }

  const buttons = [
    ...document.querySelectorAll(
      "header a, header button, footer a, footer button, main a[href], main button, .auth-page-shell a, .auth-page-shell button, input, textarea",
    ),
  ].filter(visible);
  for (const btn of buttons) {
    if (btn.closest("[aria-hidden='true'], .decorative-motion")) continue;
    const r = btn.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) continue;
    const cs = getComputedStyle(btn);
    const effectiveH = Math.max(r.height, parseFloat(cs.minHeight) || 0);
    const effectiveW = Math.max(r.width, parseFloat(cs.minWidth) || 0);
    if (effectiveH > 0 && effectiveW > 0 && (effectiveH < 44 || effectiveW < 44)) {
      const hiddenBar = btn.closest(".fixed.bottom-0");
      if (hiddenBar && getComputedStyle(hiddenBar).display === "none") continue;
      issues.responsive.push("tap target < 44px");
      break;
    }
  }

  return issues;
}

async function checkReducedMotion(page, route) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(400);
  const bad = await page.evaluate(() => {
    const sels = [
      ".pricing-orbit-rotator",
      ".pricing-orbit-ring",
      ".callback-vinyl",
      ".checkout-vinyl",
      ".landing-wave span",
      ".landing-vinyl-pulse-ring",
      ".hero-live-dot",
    ];
    return sels.filter((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const cs = getComputedStyle(el);
      return cs.animationName && cs.animationName !== "none";
    });
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return bad;
}

async function checkFocus(page, route) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(60);
  }
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return false;
    const s = getComputedStyle(el);
    return (
      (s.outlineWidth !== "0px" && s.outlineStyle !== "none") ||
      (s.boxShadow && s.boxShadow !== "none") ||
      el.matches(":focus-visible")
    );
  });
}

async function runShell(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { shell: true, cwd: process.cwd() });
    let out = "";
    child.stdout?.on("data", (d) => (out += d));
    child.stderr?.on("data", (d) => (out += d));
    child.on("close", (code) => resolve({ code, out }));
  });
}

function status(issues) {
  return issues.length ? "FAIL" : "PASS";
}

function verdict(row) {
  if ([row.copy, row.cta, row.motion, row.responsive].some((s) => s === "FAIL")) return "FAIL";
  return "PASS";
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const rows = [];
  const reducedFails = {};
  const focusFails = new Set();

  for (const route of ROUTES) {
    const rm = await browser.newPage();
    await rm.setViewportSize({ width: 390, height: 900 });
    try {
      const bad = await checkReducedMotion(rm, route);
      if (bad.length) reducedFails[route] = bad;
    } catch {
      /* */
    }
    await rm.close();

    const fp = await browser.newPage();
    await fp.setViewportSize({ width: 390, height: 900 });
    try {
      const ok = await checkFocus(fp, route);
      if (!ok) focusFails.add(route);
    } catch {
      focusFails.add(route);
    }
    await fp.close();
  }

  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage();
      const height = width <= 390 && route === "/" ? 667 : 900;
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "no-preference" });

      const row = {
        route,
        width,
        copy: "PASS",
        cta: "PASS",
        motion: "PASS",
        responsive: "PASS",
        verdict: "PASS",
        notes: [],
      };

      try {
        const res = await page.goto(`${BASE}${route}`, {
          waitUntil: "networkidle",
          timeout: 45000,
        });
        if (!res || res.status() >= 400) {
          row.copy = row.cta = row.motion = row.responsive = "FAIL";
          row.verdict = "FAIL";
          row.notes.push(`HTTP ${res?.status()}`);
        } else {
          await page.waitForTimeout(500);
          const issues = await page.evaluate(runPageAudit, { route, viewportWidth: width });

          if (issues.copy.length) {
            row.copy = "FAIL";
            row.notes.push(...issues.copy);
          }
          if (issues.cta.length) {
            row.cta = "FAIL";
            row.notes.push(...issues.cta);
          }
          if (issues.motion.length) {
            row.motion = "FAIL";
            row.notes.push(...issues.motion);
          }
          if (issues.responsive.length) {
            row.responsive = "FAIL";
            row.notes.push(...issues.responsive);
          }

          if (reducedFails[route]?.length) {
            row.motion = "FAIL";
            row.notes.push(`reduced-motion: ${reducedFails[route].join(", ")}`);
          }
          if (focusFails.has(route)) {
            row.responsive = "FAIL";
            row.notes.push("focus not visible");
          }
        }
      } catch (e) {
        row.copy = row.cta = row.motion = row.responsive = "FAIL";
        row.notes.push(e.message);
      }

      row.verdict = verdict(row);
      rows.push(row);
      await page.close();
    }
  }

  await browser.close();

  console.log("\nRoute | Width | Copy | CTA | Motion | Responsive | Verdict");
  console.log("--- | --- | --- | --- | --- | --- | ---");
  for (const r of rows) {
    const note = r.verdict === "FAIL" ? ` (${[...new Set(r.notes)].slice(0, 2).join("; ")})` : "";
    console.log(
      `${r.route} | ${r.width} | ${r.copy} | ${r.cta} | ${r.motion} | ${r.responsive} | ${r.verdict}${note}`,
    );
  }

  const failRows = rows.filter((r) => r.verdict === "FAIL");
  console.log(`\nRows: ${rows.length}, FAIL rows: ${failRows.length}`);

  const skipBuild = process.env.PUBLIC_AUDIT_SKIP_BUILD === "1";
  const tc = await runShell("npm", ["run", "typecheck"]);
  const lint = await runShell("npm", ["run", "lint"]);
  const build = skipBuild
    ? { code: 0 }
    : await runShell("npm", ["run", "build"]);
  console.log(`\nTooling: typecheck=${tc.code === 0 ? "PASS" : "FAIL"} lint=${lint.code === 0 ? "PASS" : "FAIL"} build=${build.code === 0 ? "PASS" : "FAIL"}`);

  const toolingFail = tc.code || lint.code || build.code;
  process.exit(failRows.length > 0 || toolingFail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
