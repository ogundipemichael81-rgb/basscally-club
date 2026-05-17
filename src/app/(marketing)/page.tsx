import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingSections } from "@/components/marketing/landing-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MobileCtaBar } from "@/components/marketing/mobile-cta-bar";

/** Screens 01 + 02 */
export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingSections />
      <MarketingFooter />
      <MobileCtaBar />
    </>
  );
}
