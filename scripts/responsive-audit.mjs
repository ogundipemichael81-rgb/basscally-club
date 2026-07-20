/**
 * Phase A mobile responsive deep audit.
 * Run: npm run dev && node scripts/responsive-audit.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.MOTION_QA_BASE ?? "http://localhost:3000";
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
const STRESS_WIDTHS = [280, 1440];

function runPageChecks(route) {
    const issues = [];
    const gap = 4;
    const vw = document.documentElement.clientWidth;

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

    const doc = document.documentElement;
    const horizontalScroll =
      doc.scrollWidth > doc.clientWidth + 1 ||
      document.body.scrollWidth > document.body.clientWidth + 1;

    if (horizontalScroll) {
      issues.push({ cat: "collision", msg: "horizontal scroll" });
    }

    // Elements wider than viewport (ignore intentional scroll containers)
    const wide = [...document.querySelectorAll("body *")].filter((el) => {
      if (el.closest(".basscally-table-scroll")) return false;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return false;
      const s = getComputedStyle(el);
      if (s.position === "fixed" && el.tagName === "HEADER") return false;
      return r.right > vw + 2 && r.left < vw;
    });
    if (wide.length > 0) {
      const sample = wide
        .slice(0, 2)
        .map((el) => el.tagName + "." + [...el.classList].slice(0, 2).join("."))
        .join(", ");
      issues.push({ cat: "collision", msg: `overflow viewport: ${sample}` });
    }

    // Parent overflow
    let parentOverflow = false;
    for (const el of document.querySelectorAll(
      ".basscally-container, .basscally-hero, main, section, article, aside",
    )) {
      const pr = el.getBoundingClientRect();
      for (const child of el.children) {
        if (!visible(child)) continue;
        const cr = child.getBoundingClientRect();
        if (cr.right > pr.right + 3 || cr.left < pr.left - 3) {
          parentOverflow = true;
          break;
        }
      }
      if (parentOverflow) break;
    }
    if (parentOverflow) {
      issues.push({ cat: "collision", msg: "child overflows parent" });
    }

    // Sticky nav vs content at scroll 0
    const header = document.querySelector("header");
    if (header && visible(header)) {
      const hr = header.getBoundingClientRect();
      const firstMain =
        document.querySelector("main h1, main h2, .basscally-hero h1") ||
        document.querySelector("h1");
      if (firstMain && visible(firstMain)) {
        const fr = firstMain.getBoundingClientRect();
        if (
          fr.top < hr.bottom - 2 &&
          fr.top >= 0 &&
          fr.bottom > hr.bottom
        ) {
          issues.push({ cat: "collision", msg: "heading under sticky nav" });
        }
      }
    }

    // Decorative collisions
    const DECO = [
      ".decorative-motion",
      ".pricing-orbit-wrap",
      ".pricing-orbit-rotator",
      ".pricing-orbit-dot",
      ".pricing-orbit-ring",
      ".checkout-vinyl-wrap",
      ".checkout-vinyl",
      ".callback-vinyl-wrap",
    ].join(",");
    const PROTECTED = "header,h1,h2,h3,a[href],button,input,textarea,label,.fixed.bottom-0";
    const decoEls = [...document.querySelectorAll(DECO)].filter(visible);
    const protectedEls = [...document.querySelectorAll(PROTECTED)].filter(visible);

    for (const d of decoEls) {
      const dr = d.getBoundingClientRect();
      for (const p of protectedEls) {
        if (d === p || d.contains(p) || p.contains(d)) continue;
        const clip = d.closest(
          ".pricing-orbit-wrap,.checkout-vinyl-wrap,.decorative-motion",
        );
        if (clip && !clip.contains(p)) continue;
        if (overlap(dr, p.getBoundingClientRect())) {
          issues.push({ cat: "collision", msg: "deco overlaps protected" });
          break;
        }
      }
    }

    // Orbit
    const orbitWrap = document.querySelector(".pricing-orbit-wrap");
    if (orbitWrap) {
      const wr = orbitWrap.getBoundingClientRect();
      const rotator = orbitWrap.querySelector(".pricing-orbit-rotator");
      const dot = orbitWrap.querySelector(".pricing-orbit-dot");
      if (
        rotator &&
        getComputedStyle(rotator).display !== "none" &&
        dot &&
        visible(dot)
      ) {
        const dr = dot.getBoundingClientRect();
        if (
          dr.left < wr.left - 3 ||
          dr.right > wr.right + 3 ||
          dr.top < wr.top - 3 ||
          dr.bottom > wr.bottom + 3
        ) {
          issues.push({ cat: "motion", msg: "orbit dot outside ring" });
        }
      }
      const ring = orbitWrap.querySelector(".pricing-orbit-ring");
      if (ring) {
        const rr = ring.getBoundingClientRect();
        const rcx = wr.left + wr.width / 2;
        const rcy = wr.top + wr.height / 2;
        if (
          Math.abs(rr.left + rr.width / 2 - rcx) > 5 ||
          Math.abs(rr.top + rr.height / 2 - rcy) > 5
        ) {
          issues.push({ cat: "motion", msg: "orbit ring off-center" });
        }
      }
    }

    // Deco container escape — only when parent does not clip overflow
    for (const wrap of document.querySelectorAll(
      ".pricing-orbit-wrap,.checkout-vinyl-wrap,.decorative-motion",
    )) {
      if (!visible(wrap)) continue;
      const s = getComputedStyle(wrap);
      if (s.overflow === "hidden" || s.overflow === "clip" || s.contain?.includes("paint"))
        continue;
      const wr = wrap.getBoundingClientRect();
      for (const child of wrap.querySelectorAll("*")) {
        if (!visible(child)) continue;
        const cr = child.getBoundingClientRect();
        if (
          cr.right > wr.right + 4 ||
          cr.left < wr.left - 4 ||
          cr.bottom > wr.bottom + 4 ||
          cr.top < wr.top - 4
        ) {
          issues.push({ cat: "motion", msg: "deco escapes container" });
          break;
        }
      }
    }

    // Touch: primary interactive targets (skip decorative / hidden)
    const buttons = [
      ...document.querySelectorAll(
        "header a, header button, footer a, footer button, main a[href], main button, .auth-page-shell a, .auth-page-shell button, input, textarea",
      ),
    ].filter(visible);
    for (const btn of buttons) {
      if (btn.closest("[aria-hidden='true'], .decorative-motion")) continue;
      if (
        btn.tagName === "INPUT" &&
        btn instanceof HTMLInputElement &&
        btn.type === "checkbox"
      ) {
        const label = btn.closest("label");
        if (label && label.getBoundingClientRect().height >= 44) continue;
      }
      const r = btn.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) continue;
      const cs = getComputedStyle(btn);
      const minH = parseFloat(cs.minHeight) || 0;
      const minW = parseFloat(cs.minWidth) || 0;
      const effectiveH = Math.max(r.height, minH);
      const effectiveW = Math.max(r.width, minW);
      if (effectiveH > 0 && effectiveW > 0 && (effectiveH < 44 || effectiveW < 44)) {
        const hiddenBar = btn.closest(".fixed.bottom-0");
        if (hiddenBar && getComputedStyle(hiddenBar).display === "none") continue;
        issues.push({ cat: "touch", msg: "tap target < 44px" });
        break;
      }
    }

    // Inputs viewport + font-size
    for (const input of document.querySelectorAll("input, textarea, select")) {
      if (!visible(input)) continue;
      if (
        input instanceof HTMLInputElement &&
        (input.type === "checkbox" || input.type === "radio" || input.type === "hidden")
      ) {
        continue;
      }
      const r = input.getBoundingClientRect();
      if (r.right > vw + 2 || r.left < -2) {
        issues.push({ cat: "touch", msg: "input past viewport" });
      }
      const fs = parseFloat(getComputedStyle(input).fontSize);
      if (fs > 0 && fs < 16) {
        issues.push({ cat: "touch", msg: `input font ${fs}px < 16` });
      }
    }

    // Mobile CTA vs footer (mobile widths only)
    const mobileCta = document.querySelector(".fixed.bottom-0");
    const footer = document.querySelector("footer");
    const ctaVisible =
      mobileCta &&
      getComputedStyle(mobileCta).display !== "none" &&
      mobileCta.getBoundingClientRect().height > 20;
    if (ctaVisible && footer && visible(footer)) {
      const fr = footer.getBoundingClientRect();
      const cr = mobileCta.getBoundingClientRect();
      const footerLinks = [...footer.querySelectorAll("a, button")].filter(visible);
      for (const link of footerLinks) {
        const lr = link.getBoundingClientRect();
        if (lr.bottom > cr.top - 4 && lr.top < cr.bottom) {
          issues.push({ cat: "touch", msg: "CTA covers footer link" });
          break;
        }
      }
      if (fr.bottom > window.innerHeight && fr.top < cr.top + 10) {
        const lastLine = footer.querySelector("p:last-child, nav a:last-child");
        if (lastLine && visible(lastLine)) {
          const lr = lastLine.getBoundingClientRect();
          if (lr.bottom > cr.top - 8) {
            issues.push({ cat: "touch", msg: "footer obscured by CTA" });
          }
        }
      }
    }

    // Landing-specific
    if (route === "/") {
      const heroCta = document.querySelector(
        '.basscally-hero a[href*="pricing"], .basscally-hero a',
      );
      if (heroCta && visible(heroCta)) {
        const r = heroCta.getBoundingClientRect();
        if (window.innerHeight <= 700 && r.bottom > window.innerHeight) {
          issues.push({ cat: "touch", msg: "hero CTA below fold at 667h" });
        }
      }
      const statsGrid = document.querySelector(".basscally-hero .grid.grid-cols-3");
      if (statsGrid && visible(statsGrid)) {
        const sr = statsGrid.getBoundingClientRect();
        if (sr.right > vw + 2) {
          issues.push({ cat: "collision", msg: "hero stats row overflow" });
        }
      }
    }

    // Depth heuristic
    const depthCards = document.querySelectorAll(
      ".basscally-depth-card, .basscally-panel-card",
    ).length;
    const flatCards = document.querySelectorAll(
      '[class*="bg-[var(--color-surface)]"]:not(.basscally-depth-card)',
    ).length;
    if (depthCards === 0 && route !== "/auth/login") {
      issues.push({ cat: "depth", msg: "no depth cards on page" });
    }

    // Text overlap heuristic: headings overlapping each other
    const headings = [...document.querySelectorAll("h1,h2,h3")].filter(visible);
    for (let i = 0; i < headings.length; i++) {
      for (let j = i + 1; j < headings.length; j++) {
        if (headings[i].contains(headings[j]) || headings[j].contains(headings[i]))
          continue;
        if (overlap(
          headings[i].getBoundingClientRect(),
          headings[j].getBoundingClientRect(),
        )) {
          issues.push({ cat: "collision", msg: "heading overlap" });
          break;
        }
      }
    }

    return { issues, horizontalScroll };
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
      ".callback-vinyl-wrap",
      ".pricing-wave span",
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
  if (route !== "/auth/login") return [];
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  const issues = [];
  try {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(100);
    const hasFocus = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return false;
      const s = getComputedStyle(el);
      return (
        s.outlineStyle !== "none" ||
        s.boxShadow !== "none" ||
        el.matches(":focus-visible")
      );
    });
    if (!hasFocus) issues.push("focus ring not visible on tab");
  } catch {
    /* ignore */
  }
  return issues;
}

function grade(issues, cat) {
  const catIssues = issues.filter((i) => i.cat === cat);
  return catIssues.length === 0 ? "PASS" : "FAIL";
}

function verdict(row) {
  if (
    row.collision === "FAIL" ||
    row.motion === "FAIL" ||
    row.touch === "FAIL"
  )
    return "FAIL";
  if (row.depth === "FAIL") return "REVIEW";
  return "PASS";
}

const MOCK_COOKIE = {
  name: "basscally_mock_user_id",
  value: "mock-member-active",
};

async function auditWidth(browser, route, width, isStress = false) {
  const height = width === 375 && route === "/" ? 667 : 900;
  const context = await browser.newContext();
  if (route === "/account/cancel") {
    await context.addCookies([
      { ...MOCK_COOKIE, url: BASE.replace(/\/$/, "") || "http://localhost:3000" },
    ]);
  }
  const page = await context.newPage();
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ reducedMotion: "no-preference" });

  const row = {
    route,
    width: isStress ? `${width}*` : width,
    collision: "PASS",
    motion: "PASS",
    touch: "PASS",
    depth: "PASS",
    verdict: "PASS",
    issues: [],
  };

  try {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(600);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const data = await page.evaluate(runPageChecks, route);

    if (width <= 768 && route === "/") {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      const footerIssues = await page.evaluate(() => {
        const issues = [];
        const gap = 4;
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
        const mobileCta = document.querySelector(".fixed.bottom-0");
        const footer = document.querySelector("footer");
        const ctaBar = mobileCta?.getBoundingClientRect();
        const ctaVisible =
          mobileCta &&
          getComputedStyle(mobileCta).display !== "none" &&
          ctaBar &&
          ctaBar.height > 20 &&
          ctaBar.top < window.innerHeight - 8;
        if (ctaVisible && footer && visible(footer)) {
          const cr = mobileCta.getBoundingClientRect();
          const footerLinks = [...footer.querySelectorAll("a, button")].filter(visible);
          for (const link of footerLinks) {
            const lr = link.getBoundingClientRect();
            if (lr.bottom > cr.top - gap && lr.top < cr.bottom) {
              issues.push({ cat: "touch", msg: "CTA covers footer link" });
              break;
            }
          }
        }
        return issues;
      });
      data.issues.push(...footerIssues);
    }

    if (route === "/pricing" && width > 680) {
      for (let i = 0; i < 6; i++) {
        await page.waitForTimeout(200);
        const o = await page.evaluate(() => {
          const wrap = document.querySelector(".pricing-orbit-wrap");
          const dot = wrap?.querySelector(".pricing-orbit-dot");
          if (!wrap || !dot || getComputedStyle(dot).display === "none")
            return false;
          const wr = wrap.getBoundingClientRect();
          const dr = dot.getBoundingClientRect();
          return (
            dr.left < wr.left - 3 ||
            dr.right > wr.right + 3 ||
            dr.top < wr.top - 3 ||
            dr.bottom > wr.bottom + 3
          );
        });
        if (o) data.issues.push({ cat: "motion", msg: "orbit dot outside (animated)" });
      }
    }

    row.issues = data.issues;
    row.collision = grade(data.issues, "collision");
    row.motion = grade(data.issues, "motion");
    row.touch = grade(data.issues, "touch");
    row.depth = grade(data.issues, "depth");
    row.verdict = verdict(row);
  } catch (e) {
    row.collision = row.motion = row.touch = row.depth = "FAIL";
    row.verdict = "FAIL";
    row.issues = [{ cat: "collision", msg: e.message }];
  }

  await page.close();
  await context.close();
  return row;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const reducedFails = {};

  for (const route of ROUTES) {
    const rmPage = await browser.newPage();
    await rmPage.setViewportSize({ width: 390, height: 900 });
    const anim = await checkReducedMotion(rmPage, route);
    if (anim.length) reducedFails[route] = anim;
    await rmPage.close();

    for (const w of WIDTHS) {
      results.push(await auditWidth(browser, route, w));
    }
    for (const w of STRESS_WIDTHS) {
      results.push(await auditWidth(browser, route, w, true));
    }
  }

  // Apply reduced motion fails to 390 rows
  for (const row of results) {
    if (row.width === 390 && reducedFails[row.route]) {
      row.motion = "FAIL";
      row.issues.push({
        cat: "motion",
        msg: `reduced-motion: ${reducedFails[row.route].join(", ")}`,
      });
      row.verdict = verdict(row);
    }
  }

  await browser.close();

  console.log("\nRoute | Width | Collision | Motion | Touch | Depth | Verdict");
  console.log("--- | --- | --- | --- | --- | --- | ---");
  for (const r of results) {
    const issueStr =
      r.issues.length > 0
        ? ` (${r.issues.map((i) => i.msg).join("; ")})`
        : "";
    console.log(
      `${r.route} | ${r.width} | ${r.collision} | ${r.motion} | ${r.touch} | ${r.depth} | ${r.verdict}${r.verdict === "FAIL" ? issueStr : ""}`,
    );
  }

  const p0Fails = results.filter(
    (r) =>
      r.collision === "FAIL" ||
      r.motion === "FAIL" ||
      r.touch === "FAIL" ||
      r.verdict === "FAIL",
  );

  console.log(`\nTotal rows: ${results.length}, P0 FAIL rows: ${p0Fails.length}`);
  if (p0Fails.length) {
    console.log("\nJSON FAILS:");
    console.log(JSON.stringify(p0Fails, null, 2));
  }

  process.exit(p0Fails.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
