/**
 * Lightweight scroll / motion performance regression audit (public routes).
 *
 * Run (dev server required):
 *   npm run dev
 *   node scripts/scroll-performance-audit.mjs
 *
 * Env:
 *   SCROLL_AUDIT_BASE          — default http://localhost:3000
 *   SCROLL_AUDIT_MAX_INFINITE         — decorative infinite cap (default 12)
 *   SCROLL_AUDIT_MAX_INFINITE_HOME    — stricter cap for / at 375px (default 4)
 *   SCROLL_AUDIT_MAX_INFINITE_PRICING — cap for /pricing (default 14)
 */
import { chromium } from "playwright";

const BASE = process.env.SCROLL_AUDIT_BASE ?? "http://localhost:3000";
const VIEWPORT = { width: 375, height: 812 };
const MAX_INFINITE = Number(process.env.SCROLL_AUDIT_MAX_INFINITE ?? "12");
const MAX_INFINITE_HOME = Number(process.env.SCROLL_AUDIT_MAX_INFINITE_HOME ?? "4");
const MAX_INFINITE_PRICING = Number(process.env.SCROLL_AUDIT_MAX_INFINITE_PRICING ?? "14");

function maxInfiniteForRoute(route) {
  if (route === "/") return MAX_INFINITE_HOME;
  if (route === "/pricing") return MAX_INFINITE_PRICING;
  return MAX_INFINITE;
}

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

/** Runs in the browser — must be self-contained */
function runScrollPerformanceAudit({ route, maxInfinite }) {
  const REQUIRED_HOME_SELECTORS = [
    ".basscally-landing-hero",
    ".landing-wave-motion-root",
    ".landing-wave span",
    ".decorative-motion",
  ];
  const HEAVY_PROPS = [
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "filter",
    "backdrop-filter",
    "box-shadow",
    "background-position",
  ];

  function selectorHint(el) {
    if (el.id) return `#${el.id}`;
    const classes = [...el.classList].slice(0, 4).join(".");
    const tag = el.tagName.toLowerCase();
    return classes ? `${tag}.${classes}` : tag;
  }

  function hasBackdropBlur(el) {
    if (!el) return false;
    const s = getComputedStyle(el);
    const bf = s.backdropFilter || s.webkitBackdropFilter;
    return Boolean(bf && bf !== "none");
  }

  function isAnimating(el) {
    const s = getComputedStyle(el);
    if (!s.animationName || s.animationName === "none") return false;
    const dur = parseFloat(s.animationDuration);
    return Number.isFinite(dur) && dur > 0.02;
  }

  function isInfiniteAnim(el) {
    const s = getComputedStyle(el);
    if (!isAnimating(el)) return false;
    return s.animationIterationCount === "infinite";
  }

  /** Parse @keyframes in accessible stylesheets */
  function auditKeyframes() {
    const violations = [];
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      if (!rules) continue;
      for (const rule of rules) {
        if (rule.type !== CSSRule.KEYFRAMES_RULE) continue;
        const name = rule.name;
        for (const kf of rule.cssRules) {
          const text = kf.cssText.toLowerCase();
          for (const prop of HEAVY_PROPS) {
            const re = new RegExp(`\\b${prop.replace("-", "\\-")}\\s*:`);
            if (re.test(text)) {
              violations.push({
                keyframe: name,
                keyText: kf.keyText,
                property: prop,
              });
            }
          }
        }
      }
    }
    const byName = new Map();
    for (const v of violations) {
      const key = `${v.keyframe}:${v.property}`;
      if (!byName.has(key)) byName.set(key, v);
    }
    return [...byName.values()];
  }

  function collectInfiniteAnimations() {
    const seen = new Set();
    const items = [];

    const candidates = new Set();
    for (const el of document.querySelectorAll("*")) {
      if (!isInfiniteAnim(el)) continue;
      candidates.add(el);
    }

    for (const el of candidates) {
      if (seen.has(el)) continue;
      seen.add(el);
      const s = getComputedStyle(el);
      items.push({
        selector: selectorHint(el),
        animationName: s.animationName,
      });
    }
    return items;
  }

  function countDecoInfinite() {
    const roots = document.querySelectorAll(
      ".decorative-motion, .pricing-orbit-wrap, .callback-stage-deco, .checkout-vinyl-wrap, .landing-drops-stage, .pricing-wave, .callback-bars, .hero-live-dot",
    );
    const seen = new Set();
    for (const root of roots) {
      if (isInfiniteAnim(root)) seen.add(root);
      for (const el of root.querySelectorAll("*")) {
        if (isInfiniteAnim(el)) seen.add(el);
      }
    }
    return seen.size;
  }

  async function scrollAndCheckOverflow() {
    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const steps = 10;
    let horizontalAtAny = doc.scrollWidth > doc.clientWidth + 1;

    for (let i = 0; i <= steps; i++) {
      window.scrollTo(0, (maxScroll / steps) * i);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (doc.scrollWidth > doc.clientWidth + 1) horizontalAtAny = true;
    }

    for (let i = steps; i >= 0; i--) {
      window.scrollTo(0, (maxScroll / steps) * i);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (doc.scrollWidth > doc.clientWidth + 1) horizontalAtAny = true;
    }

    window.scrollTo(0, 0);
    return horizontalAtAny;
  }

  const missingRequired =
    route === "/"
      ? REQUIRED_HOME_SELECTORS.filter((sel) => !document.querySelector(sel))
      : [];

  const header =
    document.querySelector("header.sticky") ?? document.querySelector("header");
  const mobileCta = document.querySelector(".fixed.bottom-0");

  const keyframeViolations = auditKeyframes();
  const infiniteAnimations = collectInfiniteAnimations();
  const decoInfiniteCount = countDecoInfinite();

  return scrollAndCheckOverflow().then((horizontalOverflow) => {
    const issues = [];

    if (horizontalOverflow) issues.push("horizontal overflow during scroll");
    if (missingRequired.length) {
      issues.push(`missing selectors: ${missingRequired.join(", ")}`);
    }
    if (decoInfiniteCount > maxInfinite) {
      issues.push(
        `too many decorative infinite animations (${decoInfiniteCount} > ${maxInfinite})`,
      );
    }
    if (hasBackdropBlur(mobileCta)) {
      issues.push("mobile CTA uses backdrop-filter (scroll paint risk)");
    }
    if (hasBackdropBlur(header)) {
      issues.push("sticky header uses backdrop-filter at 375px (scroll paint risk)");
    }

    return {
      horizontalOverflow,
      missingRequired,
      infiniteAnimations,
      infiniteCount: infiniteAnimations.length,
      decoInfiniteCount,
      keyframeViolations,
      mobileCtaBlur: hasBackdropBlur(mobileCta),
      headerBlur: hasBackdropBlur(header),
      issues,
    };
  });
}

function runReducedMotionCheck() {
  const REDUCED_MOTION_SELECTORS = [
    ".pricing-orbit-rotator",
    ".pricing-orbit-ring",
    ".pricing-orbit-ring-2",
    ".pricing-orbit-ring-3",
    ".pricing-wave span",
    ".callback-vinyl",
    ".checkout-vinyl",
    ".callback-bars span",
    ".landing-wave span",
    ".landing-vinyl-pulse-ring",
    ".hero-live-dot",
  ];
  const bad = [];
  for (const sel of REDUCED_MOTION_SELECTORS) {
    const base = sel.replace("::before", "").replace("::after", "");
    const el = document.querySelector(base);
    if (!el) continue;
    const cs = getComputedStyle(el);
    if (cs.animationName && cs.animationName !== "none") {
      const dur = parseFloat(cs.animationDuration);
      if (Number.isFinite(dur) && dur > 0.05) {
        bad.push(`${sel} (${cs.animationName}, ${cs.animationDuration})`);
      }
    }
  }
  return bad;
}

async function assertServer() {
  try {
    const res = await fetch(BASE, { method: "HEAD" });
    if (!res.ok && res.status !== 405) {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (e) {
    console.error(`\nCannot reach ${BASE} — start the dev server: npm run dev\n`);
    console.error(e.message);
    process.exit(2);
  }
}

async function checkReducedMotion(page, route) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(400);
  const bad = await page.evaluate(runReducedMotionCheck);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return bad;
}

async function main() {
  await assertServer();

  const browser = await chromium.launch({ headless: true });
  const rows = [];
  const reports = [];

  console.log(`\nScroll performance audit — ${BASE}`);
  console.log(`Viewport: ${VIEWPORT.width}x${VIEWPORT.height}\n`);

  for (const route of ROUTES) {
    const maxInfinite = maxInfiniteForRoute(route);
    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORT);
    await page.emulateMedia({ reducedMotion: "no-preference" });

    const row = {
      route,
      overflow: "PASS",
      selectors: "PASS",
      infinite: "PASS",
      keyframes: "PASS",
      mobileBlur: "PASS",
      reducedMotion: "PASS",
      verdict: "PASS",
      notes: [],
    };

    try {
      const res = await page.goto(`${BASE}${route}`, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      if (!res || res.status() >= 400) {
        throw new Error(`HTTP ${res?.status()}`);
      }
      await page.waitForTimeout(500);

      const data = await page.evaluate(runScrollPerformanceAudit, {
        route,
        maxInfinite,
      });

      if (data.horizontalOverflow) {
        row.overflow = "FAIL";
        row.notes.push("horizontal overflow while scrolling");
      }
      if (data.missingRequired.length) {
        row.selectors = "FAIL";
        row.notes.push(`missing: ${data.missingRequired.join(", ")}`);
      }
      if (data.decoInfiniteCount > maxInfinite) {
        row.infinite = "FAIL";
        row.notes.push(
          `decorative infinite: ${data.decoInfiniteCount} (max ${maxInfinite}, page total ${data.infiniteCount})`,
        );
      }
      if (data.keyframeViolations.length) {
        row.keyframes = "WARN";
        row.notes.push(
          `heavy @keyframes: ${data.keyframeViolations
            .slice(0, 4)
            .map((v) => `${v.keyframe}/${v.property}`)
            .join(", ")}${data.keyframeViolations.length > 4 ? "…" : ""}`,
        );
      }
      if (data.mobileCtaBlur || data.headerBlur) {
        row.mobileBlur = "FAIL";
        if (data.mobileCtaBlur) row.notes.push("mobile CTA backdrop-filter");
        if (data.headerBlur) row.notes.push("sticky header backdrop-filter");
      }

      reports.push({
        route,
        infiniteAnimations: data.infiniteAnimations,
        keyframeViolations: data.keyframeViolations,
        decoInfiniteCount: data.decoInfiniteCount,
      });
    } catch (e) {
      row.overflow = row.selectors = row.infinite = "FAIL";
      row.verdict = "FAIL";
      row.notes.push(e.message);
    }

    await page.close();

    try {
      const rmPage = await browser.newPage();
      await rmPage.setViewportSize(VIEWPORT);
      const still = await checkReducedMotion(rmPage, route);
      await rmPage.close();
      if (still.length) {
        row.reducedMotion = "FAIL";
        row.notes.push(`reduced-motion: ${still.slice(0, 3).join("; ")}`);
      }
    } catch (e) {
      row.reducedMotion = "FAIL";
      row.notes.push(`reduced-motion check: ${e.message}`);
    }

    const failCols = [
      row.overflow,
      row.selectors,
      row.infinite,
      row.mobileBlur,
      row.reducedMotion,
    ];
    if (failCols.some((c) => c === "FAIL")) row.verdict = "FAIL";

    rows.push(row);
  }

  await browser.close();

  console.log("Route | Overflow | Selectors | Infinite | Keyframes | Mobile blur | Reduced motion | Verdict");
  console.log("--- | --- | --- | --- | --- | --- | --- | ---");
  for (const r of rows) {
    const note =
      r.verdict === "FAIL" || r.keyframes === "WARN"
        ? ` — ${r.notes.slice(0, 2).join("; ")}`
        : "";
    console.log(
      `${r.route} | ${r.overflow} | ${r.selectors} | ${r.infinite} | ${r.keyframes} | ${r.mobileBlur} | ${r.reducedMotion} | ${r.verdict}${note}`,
    );
  }

  const home = reports.find((r) => r.route === "/");
  if (home?.infiniteAnimations?.length) {
    console.log("\n=== / — elements with infinite animation ===");
    for (const item of home.infiniteAnimations.slice(0, 20)) {
      console.log(`  • ${item.selector} → ${item.animationName}`);
    }
    if (home.infiniteAnimations.length > 20) {
      console.log(`  … and ${home.infiniteAnimations.length - 20} more`);
    }
  }

  const allKeyframeViolations = new Map();
  for (const r of reports) {
    for (const v of r.keyframeViolations ?? []) {
      const key = `${v.keyframe} @ ${v.keyText} (${v.property})`;
      if (!allKeyframeViolations.has(key)) allKeyframeViolations.set(key, v);
    }
  }
  if (allKeyframeViolations.size) {
    console.log("\n=== CSS @keyframes using layout/paint-heavy properties ===");
    for (const [label] of [...allKeyframeViolations.entries()].slice(0, 25)) {
      console.log(`  • ${label}`);
    }
    if (allKeyframeViolations.size > 25) {
      console.log(`  … and ${allKeyframeViolations.size - 25} more (review globals.css)`);
    }
    console.log(
      "\nNote: WARN on keyframes does not fail the run — fix if tied to landing scroll jank.",
    );
  }

  const failRows = rows.filter((r) => r.verdict === "FAIL");
  console.log(`\nRoutes: ${rows.length}, FAIL: ${failRows.length}`);
  if (failRows.length) {
    console.log("\nFAIL details:");
    for (const f of failRows) {
      console.log(JSON.stringify(f, null, 2));
    }
  }

  process.exit(failRows.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
