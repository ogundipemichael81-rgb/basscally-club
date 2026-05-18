import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingMotionGate } from "@/components/marketing/landing-motion-gate";
import { LandingSections } from "@/components/marketing/landing-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MobileCtaBar } from "@/components/marketing/mobile-cta-bar";

/** Screens 01 + 02 */
export default function LandingPage() {
  return (
    <LandingMotionGate>
      <LandingHero />
      <LandingSections />
      <MarketingFooter />
      <MobileCtaBar />
    </LandingMotionGate>
  );
}
