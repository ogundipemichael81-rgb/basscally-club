/**
 * Route-by-route motion collision QA (headless).
 * Run: node scripts/motion-qa.mjs  (dev server at localhost:3000)
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
];
const WIDTHS = [375, 390, 768, 1024, 1280, 1440];

async function snapshotPage(page) {
  return page.evaluate(() => {
    const DECO_SELECTORS = [
      ".decorative-motion",
      ".pricing-orbit-wrap",
      ".pricing-orbit-rotator",
      ".pricing-orbit-dot",
      ".pricing-orbit-ring",
      ".pricing-orbit-ring-2",
      ".pricing-orbit-ring-3",
      ".pricing-orbit-core",
      ".pricing-wave span",
      ".callback-stage-deco",
      ".callback-vinyl-wrap",
      ".callback-vinyl",
      ".callback-accent-dot",
      ".callback-bars span",
      ".checkout-vinyl-wrap",
      ".checkout-vinyl",
      ".hero-live-dot",
      ".callback-stage-card",
      ".landing-vinyl-pulse-wrap",
      ".landing-wave span",
      ".landing-rail-shimmer",
    ].join(",");
    const PROTECTED_SELECTORS = [
      "header",
      "h1",
      "h2",
      "h3",
      "a.btn",
      "a[class*='btn']",
      "button:not([aria-hidden])",
      "input",
      "textarea",
      "label",
      ".fixed.bottom-0",
    ].join(",");

    const gap = 6;
    function overlap(a, b) {
      return !(
        a.right + gap < b.left ||
        a.left - gap > b.right ||
        a.bottom + gap < b.top ||
        a.top - gap > b.bottom
      );
    }

    const doc = document.documentElement;
    const horizontalScroll = doc.scrollWidth > doc.clientWidth + 1;

    const decoEls = [...document.querySelectorAll(DECO_SELECTORS)].filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return false;
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.01;
    });
    const uniqueDeco = [...new Set(decoEls)];

    const protectedEls = [...document.querySelectorAll(PROTECTED_SELECTORS)].filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return false;
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden";
    });

    function clippedDeco(el) {
      let node = el;
      while (node && node !== document.body) {
        const s = getComputedStyle(node);
        if (
          (s.overflow === "hidden" || s.overflow === "clip") &&
          (node.classList.contains("pricing-orbit-wrap") ||
            node.classList.contains("checkout-vinyl-wrap") ||
            node.classList.contains("decorative-motion"))
        ) {
          return node;
        }
        node = node.parentElement;
      }
      return null;
    }

    const collisions = [];
    for (const d of uniqueDeco) {
      const dr = d.getBoundingClientRect();
      const clipRoot = clippedDeco(d);
      for (const p of protectedEls) {
        if (d === p || d.contains(p) || p.contains(d)) continue;
        if (clipRoot && !clipRoot.contains(p)) continue;
        if (overlap(dr, p.getBoundingClientRect())) {
          collisions.push({
            deco: [...d.classList].slice(0, 3).join("."),
            target: `${p.tagName}.${[...p.classList].slice(0, 2).join(".")}`,
          });
        }
      }
    }

    const orbitWrap = document.querySelector(".pricing-orbit-wrap");
    let orbitDotOutside = false;
    if (orbitWrap) {
      const wr = orbitWrap.getBoundingClientRect();
      const rotator = orbitWrap.querySelector(".pricing-orbit-rotator");
      const dot = orbitWrap.querySelector(".pricing-orbit-dot");
      const rotatorVisible =
        rotator && getComputedStyle(rotator).display !== "none";
      if (rotatorVisible && dot) {
        const dr = dot.getBoundingClientRect();
        if (dr.width > 1 && dr.height > 1) {
          orbitDotOutside =
            dr.left < wr.left - 3 ||
            dr.right > wr.right + 3 ||
            dr.top < wr.top - 3 ||
            dr.bottom > wr.bottom + 3;
        }
      }
    }

    const ring = document.querySelector(".pricing-orbit-ring");
    let ringOffCenter = false;
    if (ring && orbitWrap) {
      const rr = ring.getBoundingClientRect();
      const cr = orbitWrap.getBoundingClientRect();
      const rcx = cr.left + cr.width / 2;
      const rcy = cr.top + cr.height / 2;
      ringOffCenter =
        Math.abs(rr.left + rr.width / 2 - rcx) > 4 ||
        Math.abs(rr.top + rr.height / 2 - rcy) > 4;
    }

    const mobileCta = document.querySelector(".fixed.bottom-0");
    let mobileCtaBlocked = false;
    let mobileCtaSmall = false;
    const mobileCtaVisible =
      mobileCta &&
      getComputedStyle(mobileCta).display !== "none" &&
      mobileCta.getBoundingClientRect().height > 20;
    if (mobileCtaVisible) {
      const mr = mobileCta.getBoundingClientRect();
      for (const d of uniqueDeco) {
        if (mobileCta.contains(d) || d.contains(mobileCta)) continue;
        if (overlap(d.getBoundingClientRect(), mr)) mobileCtaBlocked = true;
      }
      for (const link of mobileCta.querySelectorAll("a, button")) {
        const r = link.getBoundingClientRect();
        if (r.height > 0 && (r.height < 40 || r.width < 44)) mobileCtaSmall = true;
      }
    }

    return {
      horizontalScroll,
      collisions,
      orbitDotOutside,
      ringOffCenter,
      mobileCtaBlocked,
      mobileCtaSmall,
    };
  });
}

async function sampleOrbit(page) {
  let outside = false;
  for (let i = 0; i < 8; i++) {
    await page.waitForTimeout(250);
    const o = await page.evaluate(() => {
      const wrap = document.querySelector(".pricing-orbit-wrap");
      const dot = wrap?.querySelector(".pricing-orbit-dot");
      if (!wrap || !dot || getComputedStyle(dot).display === "none") return false;
      const wr = wrap.getBoundingClientRect();
      const dr = dot.getBoundingClientRect();
      return (
        dr.left < wr.left - 3 ||
        dr.right > wr.right + 3 ||
        dr.top < wr.top - 3 ||
        dr.bottom > wr.bottom + 3
      );
    });
    if (o) outside = true;
  }
  return outside;
}

async function checkReducedMotion(page, route) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const animating = await page.evaluate(() => {
    const sels = [
      ".pricing-orbit-rotator",
      ".pricing-orbit-ring",
      ".callback-vinyl",
      ".checkout-vinyl",
      ".callback-vinyl-wrap",
      ".hero-live-dot::after",
    ];
    const bad = [];
    for (const sel of sels) {
      const el = document.querySelector(sel.replace("::after", ""));
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (cs.animationName && cs.animationName !== "none") bad.push(sel);
      if (cs.animationDuration && parseFloat(cs.animationDuration) > 0.01) {
        const dur = parseFloat(cs.animationDuration);
        if (dur > 0.01 && cs.animationName !== "none") bad.push(sel + "(" + cs.animationName + ")");
      }
    }
    return [...new Set(bad)];
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return animating;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const reducedMotionFails = {};

  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      const issues = [];

      try {
        await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForTimeout(700);
      } catch (e) {
        results.push({
          route,
          width,
          motion: "FAIL",
          collision: "FAIL",
          fix: "navigation error",
          issues: [e.message],
        });
        await page.close();
        continue;
      }

      let data = await snapshotPage(page);

      if (route === "/pricing" && width > 680) {
        const orbitOutside = await sampleOrbit(page);
        if (orbitOutside) data = { ...data, orbitDotOutside: true };
      }

      if (data.horizontalScroll) issues.push("horizontal scroll");
      if (data.collisions.length > 0)
        issues.push(
          `overlap: ${data.collisions
            .slice(0, 3)
            .map((c) => `${c.deco}→${c.target}`)
            .join("; ")}`,
        );
      if (data.orbitDotOutside) issues.push("orbit dot leaves ring");
      if (data.ringOffCenter) issues.push("ring off-center");
      if (data.mobileCtaBlocked) issues.push("deco overlaps mobile CTA");
      if (data.mobileCtaSmall) issues.push("mobile CTA tap target small");

      const motionOk =
        !data.horizontalScroll && !data.orbitDotOutside && !data.ringOffCenter;
      const collisionOk =
        data.collisions.length === 0 &&
        !data.mobileCtaBlocked &&
        !data.mobileCtaSmall;

      results.push({
        route,
        width,
        motion: motionOk ? "PASS" : "FAIL",
        collision: collisionOk ? "PASS" : "FAIL",
        fix: motionOk && collisionOk ? "—" : issues.join("; ") || "review",
        issues,
      });

      await page.close();
    }

    const rmPage = await browser.newPage();
    await rmPage.setViewportSize({ width: 390, height: 900 });
    try {
      const still = await checkReducedMotion(rmPage, route);
      if (still.length > 0) {
        reducedMotionFails[route] = still;
        const row = results.find((r) => r.route === route && r.width === 390);
        if (row) {
          row.motion = "FAIL";
          row.fix = (row.fix === "—" ? "" : row.fix + "; ") + `reduced-motion: ${still.join(", ")}`;
          row.issues.push(`reduced-motion animating: ${still.join(", ")}`);
        }
      }
    } catch {
      /* ignore */
    }
    await rmPage.close();
  }

  await browser.close();

  console.log("\n=== MOTION QA TABLE ===\n");
  console.log("Route | Width | Motion status | Collision status | Fix needed");
  console.log("--- | --- | --- | --- | ---");
  for (const r of results) {
    console.log(
      `${r.route} | ${r.width} | ${r.motion} | ${r.collision} | ${r.fix}`,
    );
  }

  const fails = results.filter((r) => r.motion === "FAIL" || r.collision === "FAIL");
  console.log(`\nTotal: ${results.length}, FAIL: ${fails.length}`);
  if (fails.length) {
    console.log("\nFAIL details:");
    for (const f of fails) console.log(JSON.stringify(f));
  }

  process.exit(fails.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
