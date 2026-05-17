import type { LegalBlock } from "@/content/legal";
import { FormatLegalText } from "@/components/legal/format-legal-text";
import { cn } from "@/lib/utils";

export function LegalBlockRenderer({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[length:var(--text-body)] leading-relaxed text-[var(--color-text-muted)]">
          <FormatLegalText text={block.text} />
        </p>
      );
    case "subheading":
      return (
        <p className="mt-2 font-semibold text-[var(--color-text)]">
          <FormatLegalText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 text-[length:var(--text-body)] text-[var(--color-text-muted)]">
          {block.items.map((item) => (
            <li key={item} className="leading-relaxed">
              <FormatLegalText text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return <LegalTable headers={block.headers} rows={block.rows} />;
    default:
      return null;
  }
}

function LegalTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: [string, string][];
}) {
  const [recipientLabel, roleLabel] = headers;

  return (
    <>
      <ul className="space-y-3 md:hidden" aria-label={recipientLabel}>
        {rows.map((row) => (
          <li
            key={row[0]}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)]/40 p-4"
          >
            <p className="font-semibold text-[var(--color-text)]">
              <FormatLegalText text={row[0]} />
            </p>
            <p className="mt-2 text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-text-muted)]">
              <span className="sr-only">{roleLabel}: </span>
              <FormatLegalText text={row[1]} />
            </p>
          </li>
        ))}
      </ul>

      <div className="basscally-table-scroll hidden rounded-[var(--radius-md)] border border-[var(--color-border)] md:block">
        <table className="w-full min-w-[520px] border-collapse text-left text-[length:var(--text-body-sm)]">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 font-semibold text-[var(--color-text)]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row[0]}
                className="border-b border-[var(--color-border)]/80 last:border-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${row[0]}-${cellIndex}`}
                    className={cn(
                      "px-4 py-3 align-top text-[var(--color-text-muted)]",
                      cellIndex === 0 && "font-medium text-[var(--color-text)]",
                    )}
                  >
                    <FormatLegalText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
