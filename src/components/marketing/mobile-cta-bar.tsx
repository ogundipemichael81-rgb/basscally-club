import { ButtonLink } from "@/components/marketing/button-link";
import { routes } from "@/lib/routes";

/** Visible on mobile only — matches full landing sticky CTA */
export function MobileCtaBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 p-4 backdrop-blur-md lg:hidden"
    >
      <ButtonLink href={routes.pricing} className="landing-cta-glow w-full">
        Join — $1.50/mo
      </ButtonLink>
    </div>
  );
}
