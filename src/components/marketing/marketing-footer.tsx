import { APP_NAME } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="basscally-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
            {APP_NAME}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">A bass practice membership.</p>
          <p className="mt-4 text-sm text-[var(--color-text-dim)]">
            <a href="mailto:hello@basscally.club" className="hover:text-[var(--color-text)]">
              hello@basscally.club
            </a>
            {" · "}Contact
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]" aria-label="Legal">
          <a
            href="mailto:hello@basscally.club?subject=Terms%20of%20Service"
            className="min-h-11 flex items-center hover:text-[var(--color-text)]"
          >
            Terms of Service
          </a>
          <a
            href="mailto:hello@basscally.club?subject=Privacy%20Policy"
            className="min-h-11 flex items-center hover:text-[var(--color-text)]"
          >
            Privacy Policy
          </a>
          <a
            href="mailto:hello@basscally.club?subject=Refund%20Policy"
            className="min-h-11 flex items-center hover:text-[var(--color-text)]"
          >
            Refund Policy
          </a>
        </nav>
        <p className="text-xs text-[var(--color-text-dim)] lg:col-span-2">
          © {new Date().getFullYear()} Basscally. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
