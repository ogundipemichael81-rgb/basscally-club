import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ id: string }> };

/** Screen 19 */
export default async function AdminContentEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <PlaceholderPage
      screenNumber={19}
      title="Edit content"
      description="Edit scheduled, draft, or published drop."
      route={routes.admin.contentEdit(id)}
    />
  );
}
