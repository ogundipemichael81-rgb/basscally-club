/**
 * Post-fix CTA & navigation QA.
 * Run: npm run dev && node scripts/cta-nav-qa.mjs
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const BASE = process.env.CTA_QA_BASE ?? "http://localhost:3000";
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

function runCtaNavChecks({ route, viewportWidth }) {
  const issues = [];
  const gap = 4;
  const vw = document.documentElement.clientWidth;

  function normalizeLabel(text) {
    return text.replace(/\s+/g, " ").trim().toLowerCase();
  }

  function isJoinLike(label) {
    const n = normalizeLabel(label);
    return (
      n.includes("join") ||
      n.includes("continue") ||
      (n.includes("$1.50") && !n.includes("sign in"))
    );
  }

  function isSignInLike(label) {
    const n = normalizeLabel(label);
    return n.includes("sign in") || n === "go to sign in" || n.includes("back to sign in");
  }

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

  function linkLabel(el) {
    return normalizeLabel(el.textContent || el.getAttribute("aria-label") || "");
  }

  const headers = [...document.querySelectorAll("header")].filter(visible);
  if (headers.length === 0 && !route.startsWith("/auth/login")) {
    if (route !== "/auth/login") {
      issues.push({ cat: "nav", msg: "no visible header" });
    }
  }
  if (headers.length > 1) {
    issues.push({ cat: "nav", msg: `${headers.length} header layers` });
  }

  const horizontalScroll =
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 ||
    document.body.scrollWidth > document.body.clientWidth + 1;
  if (horizontalScroll) {
    issues.push({ cat: "collision", msg: "horizontal scroll" });
  }

  // Nav CTA cluster: header nav links/buttons only
  const navHeader = headers[0];
  const navCtas = navHeader
    ? [...navHeader.querySelectorAll("nav a, nav button, header > div a, header > div button")].filter(
        visible,
      )
    : [];

  const navClusters = navHeader
    ? [...navHeader.querySelectorAll("nav")].filter(visible).length
    : 0;
  if (navClusters > 1) {
    issues.push({ cat: "nav", msg: "multiple nav clusters in header" });
  }

  // Page-level duplicate action rows (pricing pattern)
  const pageActionRows = [...document.querySelectorAll("main a, main button")].filter(
    (el) => {
      if (!visible(el)) return false;
      const parent = el.closest(".mb-7");
      if (!parent) return false;
      const labels = [...parent.querySelectorAll("a,button")].map(linkLabel);
      return labels.some(isSignInLike) && labels.some((l) => l.includes("continue"));
    },
  );
  if (pageActionRows.length > 0 && route === "/pricing") {
    issues.push({ cat: "cta", msg: "pricing page-level Sign in + Continue row" });
  }

  // Collect visible CTA-like elements in viewport top band and page
  const allCtaLinks = [
    ...document.querySelectorAll(
      'header a[href], header button, main a[href], main button, .fixed.bottom-0 a, .fixed.bottom-0 button, .auth-page-shell a, .auth-page-shell button',
    ),
  ].filter(visible);

  const signInVisible = allCtaLinks.filter((el) => isSignInLike(linkLabel(el)));
  const joinVisible = allCtaLinks.filter((el) => isJoinLike(linkLabel(el)));

  // Duplicate Sign in (same label intent, both in header nav area OR nav + duplicate hero pair)
  const navSignIns = navCtas.filter((el) => isSignInLike(linkLabel(el)));
  if (navSignIns.length > 1) {
    issues.push({ cat: "cta", msg: "duplicate Sign in in nav" });
  }

  const visibleSignInLabels = [...new Set(signInVisible.map(linkLabel))];
  if (route === "/checkout/success") {
    const heroSignIns = signInVisible.filter(
      (el) => !el.closest("header") && el.closest("main, .checkout"),
    );
    const navSignIn = signInVisible.filter((el) => el.closest("header"));
    if (navSignIn.length > 0) {
      issues.push({ cat: "cta", msg: "Sign in in nav on success (should be Home)" });
    }
    if (heroSignIns.length > 1) {
      issues.push({ cat: "cta", msg: "multiple hero Sign in buttons" });
    }
  } else if (route.startsWith("/checkout")) {
    const navJoins = navCtas.filter((el) => isJoinLike(linkLabel(el)));
    if (navJoins.length > 0) {
      issues.push({ cat: "cta", msg: "Join/Continue in checkout nav" });
    }
  } else if (
    ["/terms", "/privacy", "/refund-policy"].includes(route) &&
    navCtas.some((el) => isJoinLike(linkLabel(el)))
  ) {
    issues.push({ cat: "cta", msg: "Join in nav on legal page" });
  }

  // Duplicate Join / Continue in nav cluster
  const navJoins = navCtas.filter((el) => isJoinLike(linkLabel(el)));
  if (navJoins.length > 1) {
    issues.push({ cat: "cta", msg: "duplicate Join in nav" });
  }

  // Pricing: page-level sign in + continue outside cards
  if (route === "/pricing") {
    const outsideCards = signInVisible.filter(
      (el) => !el.closest("article") && !el.closest("header"),
    );
    const continueBtns = allCtaLinks.filter((el) =>
      normalizeLabel(el.textContent || "").includes("continue"),
    );
    if (outsideCards.length > 0) {
      issues.push({ cat: "cta", msg: "page-level Sign in outside plan cards" });
    }
    if (continueBtns.length > 0) {
      issues.push({ cat: "cta", msg: "page-level Continue CTA" });
    }
    const planCards = document.querySelectorAll(".basscally-pricing-page article, .basscally-pricing-page [class*='panel-card'] article");
    const cardCheckout = [...document.querySelectorAll(".basscally-pricing-page article a, .basscally-pricing-page article button")].filter(
      visible,
    );
    if (cardCheckout.length < 1) {
      issues.push({ cat: "cta", msg: "no plan card conversion CTA" });
    }
  }

  // Landing mobile: sticky + nav join + hero join all visible
  if (route === "/" && viewportWidth < 1024) {
    const sticky = document.querySelector(".fixed.bottom-0");
    const stickyVisible =
      sticky && visible(sticky) && getComputedStyle(sticky).display !== "none";
    const stickyJoin = stickyVisible
      ? [...sticky.querySelectorAll("a")].filter((el) => visible(el) && isJoinLike(linkLabel(el)))
      : [];
    const heroJoin = allCtaLinks.filter(
      (el) =>
        isJoinLike(linkLabel(el)) &&
        el.closest(".basscally-hero") &&
        visible(el),
    );
    const navJoinMobile = navCtas.filter((el) => isJoinLike(linkLabel(el)));
    if (stickyJoin.length && heroJoin.length && navJoinMobile.length) {
      issues.push({
        cat: "cta",
        msg: "nav Join + hero Join + sticky Join all visible",
      });
    } else if (stickyJoin.length && heroJoin.length) {
      const hr = heroJoin[0].getBoundingClientRect();
      const sr = sticky[0].getBoundingClientRect();
      if (hr.bottom > 0 && hr.top < window.innerHeight && sr.top < window.innerHeight) {
        issues.push({ cat: "cta", msg: "sticky Join duplicates visible hero Join" });
      }
    }
    if (navJoinMobile.length && stickyJoin.length && viewportWidth < 1024) {
      issues.push({ cat: "cta", msg: "nav Join visible with sticky on mobile" });
    }
  }

  // CTA vs title collision in top 40% viewport
  const protectedEls = [
    ...document.querySelectorAll("header, h1, h2, .basscally-legal-page h1"),
    ...allCtaLinks,
  ].filter(visible);
  for (const cta of allCtaLinks) {
    const cr = cta.getBoundingClientRect();
    if (cr.top > window.innerHeight * 0.55) continue;
    for (const h of document.querySelectorAll("h1, h2")) {
      if (!visible(h) || h.contains(cta) || cta.contains(h)) continue;
      const hr = h.getBoundingClientRect();
      if (hr.top > window.innerHeight * 0.5) continue;
      if (overlap(cr, hr)) {
        issues.push({ cat: "collision", msg: "CTA overlaps heading" });
        break;
      }
    }
  }

  // Legal calm: no join buttons in main
  if (route.startsWith("/terms") || route.startsWith("/privacy") || route.startsWith("/refund")) {
    const mainJoin = [...document.querySelectorAll("main a, article a")].filter(
      (el) => visible(el) && isJoinLike(linkLabel(el)),
    );
    if (mainJoin.length > 0) {
      issues.push({ cat: "cta", msg: "Join CTA in legal body" });
    }
  }

  // Footer legal links
  if (
    ["/terms", "/privacy", "/refund-policy", "/"].includes(route) ||
    route === "/pricing"
  ) {
    const footer = document.querySelector("footer");
    if (footer) {
      const legalHrefs = ["/terms", "/privacy", "/refund-policy"];
      for (const href of legalHrefs) {
        const link = footer.querySelector(`a[href="${href}"], a[href$="${href}"]`);
        if (!link) {
          issues.push({ cat: "nav", msg: `missing footer link ${href}` });
        }
      }
    }
  }

  // Auth login: single header expectation (no marketing nav)
  if (route === "/auth/login") {
    const marketingHeaders = [...document.querySelectorAll("header")].filter(
      (h) => visible(h) && h.textContent?.includes("Basscally Club"),
    );
    if (marketingHeaders.length > 0) {
      issues.push({ cat: "nav", msg: "marketing nav on login" });
    }
  }

  return { issues, navCtaCount: navCtas.length };
}

async function checkReducedMotion(page, route) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(400);
  const animating = await page.evaluate(() => {
    const sels = [
      ".pricing-orbit-rotator",
      ".pricing-orbit-ring",
      ".callback-vinyl",
      ".checkout-vinyl",
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
  return animating;
}

async function checkFocus(page, route) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  const issues = [];
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(80);
  }
  const ok = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return false;
    const s = getComputedStyle(el);
    const outline = s.outlineWidth !== "0px" && s.outlineStyle !== "none";
    const shadow = s.boxShadow && s.boxShadow !== "none";
    return outline || shadow || el.matches(":focus-visible");
  });
  if (!ok) issues.push("focus not visible after tab");
  return issues;
}

function statusFromIssues(issues, cat) {
  return issues.some((i) => i.cat === cat) ? "FAIL" : "PASS";
}

function rowVerdict(nav, cta, collision) {
  if (nav === "FAIL" || cta === "FAIL" || collision === "FAIL") return "FAIL";
  return "PASS";
}

async function auditRow(browser, route, width, reducedMotionFails, focusChecked) {
  const page = await browser.newPage();
  const height = width === 375 && route === "/" ? 667 : 900;
  await page.setViewportSize({ width, height });

  const row = {
    route,
    width,
    navStatus: "PASS",
    ctaStatus: "PASS",
    collisionStatus: "PASS",
    verdict: "PASS",
    issues: [],
  };

  try {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(500);

    if (route === "/" && width <= 768) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(250);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
    }

    const data = await page.evaluate(runCtaNavChecks, {
      route,
      viewportWidth: width,
    });
    row.issues = data.issues;

    if (reducedMotionFails[route]?.length) {
      row.issues.push({
        cat: "motion",
        msg: `reduced-motion animating: ${reducedMotionFails[route].join(", ")}`,
      });
    }

    if (!focusChecked.has(route)) {
      const focusIssues = await checkFocus(page, route);
      focusChecked.set(route, focusIssues);
      if (focusIssues.length) {
        row.issues.push({ cat: "collision", msg: focusIssues[0] });
      }
    } else if (focusChecked.get(route)?.length) {
      row.issues.push({ cat: "collision", msg: focusChecked.get(route)[0] });
    }

    row.navStatus = statusFromIssues(row.issues, "nav");
    row.ctaStatus = statusFromIssues(row.issues, "cta");
    row.collisionStatus =
      statusFromIssues(row.issues, "collision") === "FAIL" ||
      row.issues.some((i) => i.cat === "motion")
        ? "FAIL"
        : "PASS";
    if (row.issues.some((i) => i.cat === "motion")) row.collisionStatus = "FAIL";

    row.verdict = rowVerdict(row.navStatus, row.ctaStatus, row.collisionStatus);
  } catch (e) {
    row.navStatus = row.ctaStatus = row.collisionStatus = "FAIL";
    row.verdict = "FAIL";
    row.issues = [{ cat: "nav", msg: e.message }];
  }

  await page.close();
  return row;
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

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const reducedMotionFails = {};
  const focusChecked = new Map();

  for (const route of ROUTES) {
    const rmPage = await browser.newPage();
    await rmPage.setViewportSize({ width: 390, height: 900 });
    const anim = await checkReducedMotion(rmPage, route);
    if (anim.length) reducedMotionFails[route] = anim;
    await rmPage.close();
  }

  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      results.push(
        await auditRow(browser, route, width, reducedMotionFails, focusChecked),
      );
    }
  }

  await browser.close();

  console.log("\nRoute | Width | Nav status | CTA status | Collision status | Verdict");
  console.log("--- | --- | --- | --- | --- | ---");
  for (const r of results) {
    const note =
      r.verdict === "FAIL"
        ? ` — ${r.issues.map((i) => i.msg).join("; ")}`
        : "";
    console.log(
      `${r.route} | ${r.width} | ${r.navStatus} | ${r.ctaStatus} | ${r.collisionStatus} | ${r.verdict}${note}`,
    );
  }

  const fails = results.filter((r) => r.verdict === "FAIL");
  console.log(`\nCTA QA rows: ${results.length}, FAIL rows: ${fails.length}`);

  const skipBuild = process.env.CTA_QA_SKIP_BUILD === "1";
  const tc = await runShell("npm", ["run", "typecheck"]);
  const lint = await runShell("npm", ["run", "lint"]);
  const build = skipBuild
    ? { code: 0, out: "skipped" }
    : await runShell("npm", ["run", "build"]);

  console.log("\nTooling:");
  console.log(`typecheck: ${tc.code === 0 ? "PASS" : "FAIL"}`);
  console.log(`lint: ${lint.code === 0 ? "PASS" : "FAIL"}`);
  console.log(`build: ${build.code === 0 ? "PASS" : "FAIL"}`);

  process.exit(fails.length > 0 || tc.code || lint.code || build.code ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
