import { notImplementedStub } from "@/lib/api-stub";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  return notImplementedStub(`Content download (${id})`);
}
