"use client";

import { useState } from "react";
import type { EmailTemplatePreview } from "@/lib/admin/email/template-previews";

type Props = {
  previews: EmailTemplatePreview[];
};

export function AdminEmailTemplatesView({ previews }: Props) {
  const [selectedId, setSelectedId] = useState(previews[0]?.id ?? "");

  const selected =
    previews.find((template) => template.id === selectedId) ?? previews[0];

  return (
    <div>
      <div className="mb-8">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
          Template preview
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">
          Email templates
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-muted)]">
          Preview copy for transactional and lifecycle emails. Live sending ships in
          BH-15.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav className="space-y-2" aria-label="Email templates">
          {previews.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedId(template.id)}
              className={
                selected?.id === template.id
                  ? "w-full rounded-[var(--radius-lg)] border border-[rgba(255,69,0,0.55)] bg-[rgba(42,20,8,0.5)] px-4 py-3 text-left"
                  : "w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left hover:border-[var(--color-border-strong)]"
              }
            >
              <strong className="block text-sm">{template.name}</strong>
              <span className="mt-1 block text-xs text-[var(--color-text-dim)]">
                {template.description}
              </span>
            </button>
          ))}
        </nav>

        {selected ? <TemplatePreviewCard template={selected} /> : null}
      </div>
    </div>
  );
}

function TemplatePreviewCard({ template }: { template: EmailTemplatePreview }) {
  return (
    <article className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
        {template.name}
      </h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{template.description}</p>
      <div className="mt-6 space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-dim)]">
            Subject
          </p>
          <p className="mt-1 text-sm">{template.subject}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-dim)]">
            Body
          </p>
          <pre className="mt-2 whitespace-pre-wrap font-[family-name:var(--font-body)] text-sm text-[var(--color-text-muted)]">
            {template.body}
          </pre>
        </div>
      </div>
    </article>
  );
}
