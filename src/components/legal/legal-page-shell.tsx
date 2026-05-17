import type { LegalDocument } from "@/content/legal";
import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { LegalBlockRenderer } from "@/components/legal/legal-block";
import { LegalSectionView } from "@/components/legal/legal-section";
import { SectionLabel } from "@/components/marketing/section-label";
import Link from "next/link";
import { routes } from "@/lib/routes";

export function LegalPageShell({ document }: { document: LegalDocument }) {
  return (
    <article className="basscally-legal-page relative z-[1] py-10 sm:py-14 lg:py-16">
      <div className="basscally-container">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10">
            <SectionLabel>Legal</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-[var(--color-text)] sm:text-4xl">
              {document.title}
            </h1>
            <dl className="mt-5 flex flex-col gap-2 border-l-2 border-[var(--color-border-strong)] pl-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] sm:flex-row sm:flex-wrap sm:gap-x-8">
              <div>
                <dt className="inline text-[var(--color-text-muted)]">Last updated: </dt>
                <dd className="inline text-[var(--color-text)]">{document.lastUpdated}</dd>
              </div>
              <div>
                <dt className="inline text-[var(--color-text-muted)]">Effective date: </dt>
                <dd className="inline text-[var(--color-text)]">{document.effectiveDate}</dd>
              </div>
            </dl>
          </header>

          <div className="basscally-depth-card mb-8 rounded-[var(--radius-lg)] p-6 sm:p-8">
            <div className="flex flex-col gap-4">
              {document.intro.map((block, index) => (
                <LegalBlockRenderer key={`intro-${index}`} block={block} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {document.sections.map((section) => (
              <LegalSectionView key={section.id} section={section} />
            ))}
          </div>

          <footer className="basscally-depth-card mt-8 rounded-[var(--radius-lg)] p-6 sm:p-8">
            <p className="text-sm font-semibold text-[var(--color-text)]">Questions?</p>
            <p className="mt-2 text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
              Email{" "}
              <a
                href={`mailto:${LEGAL_SUPPORT_EMAIL}`}
                className="inline-flex min-h-11 items-center text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
              >
                {LEGAL_SUPPORT_EMAIL}
              </a>
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-muted)]"
              aria-label="Related legal pages"
            >
              <Link
                href={routes.legal.terms}
                className="inline-flex min-h-11 min-w-11 items-center px-2 hover:text-[var(--color-text)]"
              >
                Terms of Service
              </Link>
              <Link
                href={routes.legal.privacy}
                className="inline-flex min-h-11 min-w-11 items-center px-2 hover:text-[var(--color-text)]"
              >
                Privacy Policy
              </Link>
              <Link
                href={routes.legal.refundPolicy}
                className="inline-flex min-h-11 min-w-11 items-center px-2 hover:text-[var(--color-text)]"
              >
                Refund Policy
              </Link>
              <Link
                href={routes.home}
                className="inline-flex min-h-11 min-w-11 items-center px-2 hover:text-[var(--color-text)]"
              >
                Back to home
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </article>
  );
}
