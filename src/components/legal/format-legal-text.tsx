import { LEGAL_SUPPORT_EMAIL } from "@/content/legal";
import { Fragment, type ReactNode } from "react";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function parseBoldSegments(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return [text];

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-[var(--color-text)]">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{linkifyPlain(part)}</Fragment>
    ),
  );
}

function linkifyPlain(text: string): ReactNode[] {
  if (!text) return [];

  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const urlMatch = URL_PATTERN.exec(remaining);
    URL_PATTERN.lastIndex = 0;

    const emailIndex = remaining.indexOf(LEGAL_SUPPORT_EMAIL);
    const urlIndex = urlMatch?.index ?? -1;

    let nextIndex = -1;
    let kind: "email" | "url" | null = null;

    if (emailIndex !== -1 && (urlIndex === -1 || emailIndex <= urlIndex)) {
      nextIndex = emailIndex;
      kind = "email";
    } else if (urlIndex !== -1) {
      nextIndex = urlIndex;
      kind = "url";
    }

    if (nextIndex === -1) {
      nodes.push(remaining);
      break;
    }

    if (nextIndex > 0) {
      nodes.push(remaining.slice(0, nextIndex));
    }

    if (kind === "email") {
      nodes.push(
        <a
          key={key++}
          href={`mailto:${LEGAL_SUPPORT_EMAIL}`}
          className="text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
        >
          {LEGAL_SUPPORT_EMAIL}
        </a>,
      );
      remaining = remaining.slice(nextIndex + LEGAL_SUPPORT_EMAIL.length);
    } else if (kind === "url" && urlMatch) {
      const href = urlMatch[0];
      nodes.push(
        <a
          key={key++}
          href={href}
          className="text-[var(--color-brand)] underline decoration-[var(--color-brand)]/40 underline-offset-2 hover:text-[var(--color-text)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {href.replace(/^https?:\/\//, "")}
        </a>,
      );
      remaining = remaining.slice(nextIndex + href.length);
    }
  }

  return nodes;
}

export function FormatLegalText({ text }: { text: string }) {
  return <>{parseBoldSegments(text)}</>;
}
