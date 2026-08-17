import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/marketing/section-label";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { APP_NAME } from "@/lib/constants";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: `Join the waitlist — ${APP_NAME}`,
  description:
    "Get early access to Basscally Hub. Join the waitlist for weekly bass practice drops from Chris and world-class bassists.",
};

export default function WaitlistPage() {
  return (
    <div className="basscally-container py-12 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Early access</SectionLabel>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,3rem)] font-extrabold tracking-tight">
          Join the Basscally Hub waitlist
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">
          Founding member spots are limited. Get notified when the next window opens and be first
          in line for $1.50/month practice drops.
        </p>
      </div>

      <div className="basscally-depth-card mx-auto mt-10 max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 lg:p-8">
        <WaitlistForm />
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-sm text-[var(--color-text-dim)]">
        Already have access?{" "}
        <Link
          href={routes.join}
          className="font-medium text-[var(--color-brand)] hover:underline"
        >
          Create a free account
        </Link>{" "}
        or{" "}
        <Link
          href={routes.auth.login}
          className="font-medium text-[var(--color-brand)] hover:underline"
        >
          sign in
        </Link>
        .
      </p>
    </div>
  );
}
