import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { refundPolicy } from "@/content/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: refundPolicy.metaTitle,
  description: refundPolicy.metaDescription,
};

export default function RefundPolicyPage() {
  return (
    <>
      <LegalPageShell document={refundPolicy} />
      <MarketingFooter />
    </>
  );
}
