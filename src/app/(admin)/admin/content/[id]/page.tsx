import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = { params: Promise<{ id: string }> };

export default async function AdminContentEditPage({ params }: Props) {
  await params;

  return (
    <PlaceholderPage
      title="Edit content"
      description="Edit scheduled or published drops."
    />
  );
}
