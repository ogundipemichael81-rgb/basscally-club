import type { LegalSection } from "@/content/legal";
import { LegalBlockRenderer } from "@/components/legal/legal-block";

export function LegalSectionView({ section }: { section: LegalSection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="basscally-depth-card scroll-mt-28 rounded-[var(--radius-lg)] p-6 sm:p-8"
    >
      <h2
        id={`${section.id}-heading`}
        className="mb-5 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-text)] sm:text-2xl"
      >
        {section.title}
      </h2>
      <div className="flex flex-col gap-4">
        {section.blocks.map((block, index) => (
          <LegalBlockRenderer key={`${section.id}-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}
