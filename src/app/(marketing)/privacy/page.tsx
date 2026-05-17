import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { privacyPolicy } from "@/content/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
};

export default function PrivacyPage() {
  return (
    <>
      <LegalPageShell document={privacyPolicy} />
      <MarketingFooter />
    </>
  );
}
