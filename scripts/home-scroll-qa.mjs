/**
 * Post-fix home (/) scroll smoothness QA.
 * Run: npm run dev && node scripts/home-scroll-qa.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.HOME_SCROLL_QA_BASE ?? "http://localhost:3000";
const ROUTE = "/";
const WIDTHS = [320, 375, 390, 768, 1024, 1280];
const VIEWPORT_HEIGHT = 812;
const OTHER_ROUTES = ["/pricing", "/auth/login", "/checkout/success", "/terms"];

/** @param {{ width: number; cpuThrottle?: number; reducedMotion?: boolean }} opts */
async function runHomeScrollChecks(page, opts) {
  const { width, cpuThrottle = 1, reducedMotion = false } = opts;

  if (cpuThrottle > 1) {
    const client = await page.context().newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: cpuThrottle });
  }

  await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
  await page.emulateMedia({
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });

  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(800);
  if (!reducedMotion) {
    await page
      .waitForFunction(
        () =>
          document.documentElement.classList.contains("landing-hero-motion-active") ||
          document.querySelector(".landing-deco-motion-active"),
        { timeout: 8000 },
      )
      .catch(() => {});
  }

  return page.evaluate(
    async ({ width: w, reducedMotion: rm }) => {
      const issues = { smooth: [], motion: [], depth: [] };

      const header =
        document.querySelector("header.sticky") ?? document.querySelector("header");
      const mobileCta = document.querySelector(".fixed.bottom-0");
      const hero = document.querySelector(".basscally-landing-hero");
      const depthCards = document.querySelectorAll(".basscally-depth-card");

      if (!hero) issues.depth.push("missing .basscally-landing-hero");
      if (depthCards.length < 3) issues.depth.push("few depth cards");

      const bodyAtmo = getComputedStyle(document.body, "::before");
      const hasAtmo =
        bodyAtmo.content !== "none" &&
        (bodyAtmo.backgroundImage?.includes("gradient") ||
          bodyAtmo.background?.includes("gradient"));
      if (!hasAtmo) issues.depth.push("body atmosphere missing");

      function hasBackdropBlur(el) {
        if (!el) return false;
        const s = getComputedStyle(el);
        const bf = s.backdropFilter || s.webkitBackdropFilter;
        return Boolean(bf && bf !== "none");
      }

      if (w < 768 && hasBackdropBlur(mobileCta)) {
        issues.smooth.push("mobile CTA backdrop-filter");
      }
      if (w < 768 && hasBackdropBlur(header)) {
        issues.smooth.push("sticky header backdrop-filter at mobile");
      }

      function rectSnap(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
        };
      }

      const ctaSnaps = [];
      const headerSnaps = [];

      function isInfiniteAnim(el) {
        const s = getComputedStyle(el);
        if (!s.animationName || s.animationName === "none") return false;
        return s.animationIterationCount === "infinite";
      }

      function countDecoInfinite() {
        const roots = document.querySelectorAll(
          ".decorative-motion, .landing-drops-stage, .hero-live-dot",
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

      if (!rm) {
        const wave = document.querySelector(".landing-wave span");
        if (!wave) issues.motion.push("missing landing wave");
        else if (w >= 768) {
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 120));
          const root = document.querySelector(".landing-wave-motion-root");
          const decoActive = root?.classList.contains("landing-deco-motion-active");
          const ws = getComputedStyle(wave);
          const animating =
            ws.animationName &&
            ws.animationName !== "none" &&
            parseFloat(ws.animationDuration) > 0.02;
          if (!decoActive) {
            issues.motion.push("landing deco motion gate inactive at hero");
          } else if (!animating) {
            issues.motion.push("wave not animating on desktop when in view");
          }
        }
        const maxDeco = w < 768 ? 1 : w < 1024 ? 6 : 8;
        const decoCount = countDecoInfinite();
        if (decoCount > maxDeco) {
          issues.motion.push(`too many deco infinite (${decoCount} > ${maxDeco})`);
        }
      } else {
        const wave = document.querySelector(".landing-wave span");
        if (wave) {
          const ws = getComputedStyle(wave);
          if (ws.animationName && ws.animationName !== "none") {
            const dur = parseFloat(ws.animationDuration);
            if (dur > 0.05) issues.motion.push("wave still animating under reduced motion");
          }
        }
        if (countDecoInfinite() > 0) {
          issues.motion.push("decorative infinite loops under reduced motion");
        }
      }

      async function scrollPass(speed) {
        const doc = document.documentElement;
        const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
        const steps = speed === "slow" ? 16 : 8;
        const delay = speed === "slow" ? 48 : 8;
        let horizontal = false;
        const frameGaps = [];

        for (let rep = 0; rep < 3; rep++) {
          for (let i = 0; i <= steps; i++) {
            window.scrollTo(0, (maxScroll / steps) * i);
            if (mobileCta) ctaSnaps.push(rectSnap(mobileCta));
            if (header) headerSnaps.push(rectSnap(header));
            if (doc.scrollWidth > doc.clientWidth + 1) horizontal = true;

            await new Promise((resolve) => {
              const t0 = performance.now();
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  frameGaps.push(performance.now() - t0);
                  setTimeout(resolve, delay);
                });
              });
            });
          }
          for (let i = steps; i >= 0; i--) {
            window.scrollTo(0, (maxScroll / steps) * i);
            if (mobileCta) ctaSnaps.push(rectSnap(mobileCta));
            if (header) headerSnaps.push(rectSnap(header));
            if (doc.scrollWidth > doc.clientWidth + 1) horizontal = true;
            await new Promise((r) => setTimeout(r, delay));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, delay));
        }

        const dropped = frameGaps.filter((g) => g > 50).length;
        const avgGap = frameGaps.reduce((a, b) => a + b, 0) / (frameGaps.length || 1);
        return { horizontal, dropped, avgGap, frameSamples: frameGaps.length };
      }

      const slow = await scrollPass("slow");
      const fast = await scrollPass("fast");

      if (slow.horizontal || fast.horizontal) {
        issues.smooth.push("horizontal overflow during scroll");
      }

      const dropThreshold = w < 768 ? 12 : 20;
      if (fast.dropped > dropThreshold) {
        issues.smooth.push(`dropped frames: ${fast.dropped} gaps >50ms`);
      }

      if (mobileCta && w < 1024 && ctaSnaps.length > 2) {
        const stuckSnaps = ctaSnaps.filter((s) => s && s.top > window.innerHeight * 0.5);
        const ref = stuckSnaps[0] ?? ctaSnaps[ctaSnaps.length - 1];
        if (ref) {
          const maxTopDelta = Math.max(
            ...stuckSnaps.map((s) => Math.abs((s?.top ?? 0) - ref.top)),
          );
          const maxHeightDelta = Math.max(
            ...stuckSnaps.map((s) => Math.abs((s?.height ?? 0) - ref.height)),
          );
          if (maxTopDelta > 3) {
            issues.smooth.push(`mobile CTA vertical jump (${maxTopDelta}px)`);
          }
          if (maxHeightDelta > 6) {
            issues.smooth.push(`mobile CTA height change (${maxHeightDelta}px)`);
          }
        }
      }

      if (header && headerSnaps.length > 2) {
        const doc = document.documentElement;
        const stuckSnaps = [];
        window.scrollTo(0, Math.min(400, doc.scrollHeight * 0.15));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        for (let i = 0; i < 8; i++) {
          stuckSnaps.push(rectSnap(header));
          window.scrollBy(0, 40);
          await new Promise((r) => requestAnimationFrame(r));
        }
        const tops = stuckSnaps.map((s) => s?.top ?? 0);
        const topSpread = Math.max(...tops) - Math.min(...tops);
        if (topSpread > 2) {
          issues.smooth.push(`sticky header flicker while stuck (${topSpread}px)`);
        }
        window.scrollTo(0, 0);
      }

      let cls = 0;
      try {
        const po = new PerformanceObserver((list) => {
          for (const e of list.getEntries()) {
            if (!e.hadRecentInput) cls += e.value;
          }
        });
        po.observe({ type: "layout-shift", buffered: true });
        await scrollPass("fast");
        po.disconnect();
        const stored = performance.getEntriesByType("layout-shift");
        cls = stored.reduce((sum, e) => sum + (e.hadRecentInput ? 0 : e.value), 0);
      } catch {
        cls = 0;
      }

      if (cls > 0.15) {
        issues.smooth.push(`CLS ${cls.toFixed(3)} > 0.15`);
      }

      return {
        issues,
        metrics: { slow, fast, cls, decoInfinite: countDecoInfinite() },
      };
    },
    { width, reducedMotion: reducedMotion },
  );
}

async function checkOtherRoutesUnchanged(browser) {
  const fails = [];
  for (const route of OTHER_ROUTES) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 375, height: 812 });
    try {
      const res = await page.goto(`${BASE}${route}`, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      if (!res || res.status() >= 400) {
        fails.push(`${route}: HTTP ${res?.status()}`);
        continue;
      }
      const broken = await page.evaluate(() => {
        const problems = [];
        if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) {
          problems.push("horizontal scroll");
        }
        const h1 = document.querySelector("h1");
        if (!h1) problems.push("missing h1");
        return problems;
      });
      if (broken.length) fails.push(`${route}: ${broken.join(", ")}`);
    } catch (e) {
      fails.push(`${route}: ${e.message}`);
    }
    await page.close();
  }
  return fails;
}

async function main() {
  try {
    const res = await fetch(BASE, { method: "HEAD" });
    if (!res.ok && res.status !== 405) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.error(`\nStart dev server: npm run dev\n${e.message}`);
    process.exit(2);
  }

  const browser = await chromium.launch({ headless: true });
  const rows = [];

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    let smooth = "PASS";
    let motion = "PASS";
    let depth = "PASS";
    const notes = [];

    try {
      const result = await runHomeScrollChecks(page, { width });
      if (result.issues.smooth.length) {
        smooth = "FAIL";
        notes.push(...result.issues.smooth);
      }
      if (result.issues.motion.length) {
        motion = "FAIL";
        notes.push(...result.issues.motion);
      }
      if (result.issues.depth.length) {
        depth = "FAIL";
        notes.push(...result.issues.depth);
      }
    } catch (e) {
      smooth = motion = depth = "FAIL";
      notes.push(e.message);
    }
    await page.close();

    const verdict =
      smooth === "PASS" && motion === "PASS" && depth === "PASS" ? "PASS" : "FAIL";
    rows.push({ width, smooth, motion, depth, verdict, notes });
  }

  const rmPage = await browser.newPage();
  let rmMotion = "PASS";
  const rmNotes = [];
  try {
    const rm = await runHomeScrollChecks(rmPage, {
      width: 375,
      reducedMotion: true,
    });
    if (rm.issues.motion.length) {
      rmMotion = "FAIL";
      rmNotes.push(...rm.issues.motion);
    }
  } catch (e) {
    rmMotion = "FAIL";
    rmNotes.push(e.message);
  }
  await rmPage.close();

  const throttlePage = await browser.newPage();
  let throttleSmooth = "PASS";
  const throttleNotes = [];
  try {
    const th = await runHomeScrollChecks(throttlePage, {
      width: 375,
      cpuThrottle: 4,
    });
    if (th.issues.smooth.length) {
      throttleSmooth = "FAIL";
      throttleNotes.push(...th.issues.smooth);
    }
    if (th.metrics?.fast?.dropped > 25) {
      throttleSmooth = "FAIL";
      throttleNotes.push(`CPU 4x: ${th.metrics.fast.dropped} dropped frames`);
    }
  } catch (e) {
    throttleSmooth = "FAIL";
    throttleNotes.push(e.message);
  }
  await throttlePage.close();

  const otherFails = await checkOtherRoutesUnchanged(browser);
  await browser.close();

  console.log("\n=== HOME SCROLL QA ===\n");
  console.log("Route | Width | Scroll smoothness | Motion | Depth | Verdict");
  console.log("--- | --- | --- | --- | --- | ---");
  for (const r of rows) {
    const note = r.verdict === "FAIL" ? ` (${r.notes.slice(0, 2).join("; ")})` : "";
    console.log(
      `/ | ${r.width} | ${r.smooth} | ${r.motion} | ${r.depth} | ${r.verdict}${note}`,
    );
  }

  console.log(
    `\nReduced motion @ 375px: motion=${rmMotion}${rmNotes.length ? ` — ${rmNotes.join("; ")}` : ""}`,
  );
  console.log(
    `CPU 4x @ 375px: smooth=${throttleSmooth}${throttleNotes.length ? ` — ${throttleNotes.join("; ")}` : ""}`,
  );
  console.log(
    `Other routes spot-check: ${otherFails.length ? "FAIL — " + otherFails.join("; ") : "PASS"}`,
  );

  const failRows = rows.filter((r) => r.verdict === "FAIL");
  const anyFail =
    failRows.length > 0 ||
    rmMotion === "FAIL" ||
    throttleSmooth === "FAIL" ||
    otherFails.length > 0;

  process.exit(anyFail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
