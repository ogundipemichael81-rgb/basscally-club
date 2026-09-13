import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const socialLinks = read("src/lib/social-links.ts");
const communityCard = read("src/components/community/whatsapp-community-card.tsx");
const analytics = read("src/lib/analytics/client-events.ts");
const dashboard = read("src/components/dashboard/dashboard-page-view.tsx");
const dashboardRoute = read("src/app/(member)/dashboard/page.tsx");
const player = read("src/components/content/content-audio-player.tsx");
const publicFiles = [
  "src/app/(marketing)/page.tsx",
  "src/app/(marketing)/join/page.tsx",
  "src/app/(marketing)/pricing/page.tsx",
  "src/app/(marketing)/paywall/page.tsx",
  "src/components/marketing/landing-hero.tsx",
].map(read).join("\n");

const invite = "https://chat.whatsapp.com/DJBtxeOSjoX8coymswNbvY";
assert(socialLinks.includes(invite), "Canonical WhatsApp invite is missing.");
assert(!communityCard.includes("chat.whatsapp.com"), "Community card must use the canonical social-links constant.");
assert(communityCard.includes("whatsapp_invite_viewed"), "Viewed analytics event is missing.");
assert(communityCard.includes("whatsapp_join_clicked"), "Click analytics event is missing.");
for (const placement of ["first_login", "dashboard", "practice_complete"]) {
  assert(analytics.includes(placement), `Placement ${placement} is missing.`);
}
assert(communityCard.includes('target="_blank"') && communityCard.includes('rel="noopener noreferrer"'), "Community link needs safe new-tab attributes.");
assert(communityCard.includes("min-h-11") && communityCard.includes("max-[680px]:w-full"), "Community CTA must remain touch-friendly on narrow mobile layouts.");
assert(dashboard.includes('placement="dashboard"'), "Permanent dashboard community card is missing.");
assert(dashboard.includes('placement="first_login"'), "Welcome community placement is missing.");
assert(dashboardRoute.includes('showWelcome={welcome==="1"}'), "welcome=1 is not passed to the dashboard.");
assert(player.includes("audio.onended") && player.includes("setPracticeComplete(true)"), "Practice completion does not reveal the community prompt.");
assert(player.includes('placement="practice_complete"'), "Practice completion community placement is missing.");
assert(!publicFiles.includes("WhatsApp Community"), "Public surfaces must not contain a prominent WhatsApp Community CTA.");

console.log("WHATSAPP_COMMUNITY_LOOP_PASS");
