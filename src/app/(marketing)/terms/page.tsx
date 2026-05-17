import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { termsOfService } from "@/content/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: termsOfService.metaTitle,
  description: termsOfService.metaDescription,
};

export default function TermsPage() {
  return (
    <>
      <LegalPageShell document={termsOfService} />
      <MarketingFooter />
    </>
  );
}
