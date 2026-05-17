import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ id: string }> };

/** Screen 28 */
export default async function AdminContentDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <PlaceholderPage
      screenNumber={28}
      title="Archive content"
      description="Soft delete confirmation — archive only."
      route={routes.admin.contentDelete(id)}
    />
  );
}
