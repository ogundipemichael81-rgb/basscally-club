import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ id: string }> };

/** Screens 06, 21, 30 */
export default async function ContentDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <PlaceholderPage
      screenNumber={6}
      title="Content detail"
      description="Audio player, play, download, blocked, and rate-limit states."
      route={routes.member.content(id)}
    />
  );
}
