/**
 * Check browser console for React duplicate key warnings on public routes.
 * Run: npm run dev && node scripts/console-key-warnings.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.CONSOLE_QA_BASE ?? "http://localhost:3000";
const ROUTES = ["/", "/pricing", "/auth/login", "/checkout/success", "/checkout/cancelled"];

const KEY_PATTERNS = [/same key/i, /unique key/i, /duplicate key/i];

async function main() {
  const browser = await chromium.launch({ headless: true });
  let failed = false;

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const hits = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (KEY_PATTERNS.some((re) => re.test(text))) {
        hits.push(`[${msg.type()}] ${text}`);
      }
    });

    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(800);
    } catch (e) {
      hits.push(`navigation: ${e.message}`);
    }

    console.log(`${route}: ${hits.length === 0 ? "clean" : hits.join(" | ")}`);
    if (hits.length) failed = true;
    await page.close();
  }

  await browser.close();
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
