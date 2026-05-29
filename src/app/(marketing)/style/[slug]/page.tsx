import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StylePageView } from "@/components/style/style-page-view";
import { APP_NAME, DEFAULT_STYLE_SLUG } from "@/lib/constants";
import { getFoundingCheckoutUrl } from "@/lib/lemonsqueezy/checkout-url";
import { getStylePageBySlug } from "@/lib/style/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [{ slug: DEFAULT_STYLE_SLUG }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getStylePageBySlug(slug);

  if (!data) {
    return { title: `Style — ${APP_NAME}` };
  }

  return {
    title: `${data.headline} — ${APP_NAME}`,
    description:
      data.description ??
      `Practice ${data.title} with weekly drops from Chris and world-class bassists.`,
  };
}

export default async function StylePage({ params }: Props) {
  const { slug } = await params;
  const data = await getStylePageBySlug(slug);

  if (!data) {
    notFound();
  }

  const checkoutHref = getFoundingCheckoutUrl();

  return <StylePageView data={data} checkoutHref={checkoutHref} />;
}
