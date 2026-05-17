import Link from "next/link";
import { IconChevronLeft } from "@/components/icons";
import { routes } from "@/lib/routes";

export function AuthBackLink() {
  return (
    <Link
      href={routes.home}
      className="absolute left-5 top-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
    >
      <IconChevronLeft />
      Back
    </Link>
  );
}
