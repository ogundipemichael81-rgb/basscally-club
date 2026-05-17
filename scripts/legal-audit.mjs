/**
 * Legal pages content + smoke audit.
 * Run: npm run dev && node scripts/legal-audit.mjs
 */
const BASE = process.env.MOTION_QA_BASE ?? "http://localhost:3000";

const ROUTES = [
  { path: "/terms", name: "Terms" },
  { path: "/privacy", name: "Privacy" },
  { path: "/refund-policy", name: "Refund" },
];

const FORBIDDEN = [
  /⚠️/,
  /SOLICITOR/i,
  /\[DRAFT\]/i,
  /\[TODO\]/i,
  /Stripe/i,
  /PayPal/i,
  /every 3 days/i,
  /like clockwork/i,
  /hello@basscally\.club/i,
];

const REQUIRED_ALL = [/Basscally Ltd/i, /16656420/, /Registered office address available on request/i];

const REQUIRED_EMAIL = /basscally\.enquiry@gmail.com/;

async function fetchHtml(path) {
  const res = await fetch(`${BASE}${path}`);
  return { status: res.status, html: await res.text(), path };
}

function check(name, ok, detail = "") {
  return { name, ok, detail };
}

async function main() {
  const results = [];
  let footerHtml = "";

  for (const route of ROUTES) {
    const { status, html, path } = await fetchHtml(route.path);
    results.push(
      check(`${route.name} loads (HTTP 200)`, status === 200, `status=${status}`),
    );

    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

    for (const re of FORBIDDEN) {
      if (re.test(html) || re.test(text)) {
        results.push(check(`${route.name} forbids ${re}`, false, path));
      }
    }

    for (const re of REQUIRED_ALL) {
      results.push(
        check(`${route.name} includes ${re}`, re.test(text) || re.test(html), path),
      );
    }

    results.push(
      check(`${route.name} support email`, REQUIRED_EMAIL.test(html), path),
    );

    const claimsStoresCards =
      /Basscally stores your card/i.test(text) ||
      (/Basscally store your card/i.test(text) && !/does not store your card/i.test(text));
    results.push(
      check(`${route.name} does not claim Basscally stores cards`, !claimsStoresCards, path),
    );

    if (route.path === "/refund-policy") {
      results.push(
        check(
          "Refund: access until paid period end",
          /end of the (current )?paid period|end of the paid period/i.test(text),
        ),
      );
      results.push(
        check(
          "Refund: statutory rights",
          /statutory rights/i.test(text),
        ),
      );
    }

    if (route.path === "/terms") {
      results.push(
        check(
          "Terms: no every-3-days guarantee",
          !/every 3 days/i.test(text) && /regular practice drops|intended release schedule/i.test(text),
        ),
      );
      results.push(
        check("Terms: statutory rights", /statutory rights/i.test(text),
        ),
      );
    }

    if (route.path === "/privacy") {
      results.push(
        check("Privacy: Lemon Squeezy mentioned", /Lemon Squeezy/i.test(text),
        ),
      );
    }

    // Residential address heuristic: full UK postcode pattern in legal body unlikely for office-on-request
    if (/\b[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}\b/.test(text) && !/available on request/.test(text)) {
      results.push(check(`${route.name} no residential postcode`, false));
    }
  }

  const home = await fetchHtml("/");
  footerHtml = home.html;
  results.push(
    check("Footer Terms → /terms", /href="\/terms"/.test(footerHtml)),
    check("Footer Privacy → /privacy", /href="\/privacy"/.test(footerHtml)),
    check("Footer Refund → /refund-policy", /href="\/refund-policy"/.test(footerHtml)),
    check(
      "Footer Contact → enquiry email",
      /mailto:basscally\.enquiry@gmail\.com/.test(footerHtml),
    ),
  );

  console.log("\nLegal audit results:\n");
  let fails = 0;
  for (const r of results) {
    const mark = r.ok ? "PASS" : "FAIL";
    if (!r.ok) fails++;
    console.log(`${mark} | ${r.name}${r.detail ? ` (${r.detail})` : ""}`);
  }
  console.log(`\n${results.length} checks, ${fails} FAIL`);
  process.exit(fails > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
