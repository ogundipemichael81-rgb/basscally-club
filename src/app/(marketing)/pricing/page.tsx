import { PricingPlanSelector } from "@/components/marketing/pricing-plan-selector";
import type { Metadata } from "next";

/** Screen 32 — plan selector */
export const metadata: Metadata = {
  title: "Choose your Club plan — Basscally Club",
  description:
    "Founding member, annual, and monthly plans. Lock your groove and join Basscally Club.",
};

export default function PricingPage() {
  return <PricingPlanSelector />;
}
