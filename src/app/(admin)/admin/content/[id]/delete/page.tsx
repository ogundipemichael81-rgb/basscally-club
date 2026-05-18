import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = { params: Promise<{ id: string }> };

export default async function AdminContentDeletePage({ params }: Props) {
  await params;

  return (
    <PlaceholderPage
      title="Archive content"
      description="Confirm archiving this drop."
    />
  );
}
