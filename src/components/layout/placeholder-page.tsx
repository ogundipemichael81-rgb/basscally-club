import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/page-shell";

export function PlaceholderPage({
  screenNumber,
  title,
  description,
  route,
}: {
  screenNumber: number;
  title: string;
  description: string;
  route: string;
}) {
  return (
    <PageShell title={title} description={description}>
      <Card>
        <CardHeader>
          <Badge variant="brand">Screen {String(screenNumber).padStart(2, "0")}</Badge>
          <CardTitle>Placeholder — not built yet</CardTitle>
          <CardDescription>
            Route: <code className="text-[var(--color-text)]">{route}</code>
          </CardDescription>
        </CardHeader>
        <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]">
          Phase 1 scaffold only. Full UI will match the locked HTML reference in a later
          phase.
        </p>
      </Card>
    </PageShell>
  );
}
