import { PlaceholderPage } from "@/components/layout/placeholder-page";

type Props = { params: Promise<{ id: string }> };

export default async function ContentDetailPage({ params }: Props) {
  await params;

  return (
    <PlaceholderPage
      title="Practice drop"
      description="Play, download, and practice this drop."
      body="Sign in to listen and download member audio."
    />
  );
}
