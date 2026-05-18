import { ButtonLink } from "@/components/marketing/button-link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/layout/page-shell";
import { routes } from "@/lib/routes";

export function PlaceholderPage({
  title,
  description,
  body,
}: {
  title: string;
  description: string;
  body?: string;
}) {
  return (
    <PageShell title={title} description={description}>
      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            {body ??
              "This area is not available yet. Sign in to check your membership, or return home."}
          </CardDescription>
        </CardHeader>
        <div className="flex flex-wrap gap-3 px-6 pb-6">
          <ButtonLink href={routes.auth.login} variant="secondary" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href={routes.home} variant="ghost" size="sm">
            Back to home
          </ButtonLink>
        </div>
      </Card>
    </PageShell>
  );
}
