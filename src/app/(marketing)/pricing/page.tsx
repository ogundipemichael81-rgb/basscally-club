import { PricingPlanSelector } from "@/components/marketing/pricing-plan-selector";
import type { Metadata } from "next";

/** Screen 32 — plan selector */
export const metadata: Metadata = {
  title: "Choose your Hub plan — Basscally Hub",
  description:
    "Founding member, annual, and monthly plans. Lock your groove and join Basscally Hub.",
};

export default function PricingPage() {
  return <PricingPlanSelector />;
}
