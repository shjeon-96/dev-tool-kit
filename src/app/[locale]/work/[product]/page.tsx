import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LOCALES,
  PRODUCT_LINKS,
  isLocale,
  productFromSlug,
  productSlug,
  type ProductId,
} from "@/shared/config/site";
import { getDictionary, productLinkLabels } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import { ProductDetail } from "@/shared/ui/bori-components";
import { storeBadgeSources } from "@/shared/ui/brand-assets";

interface PageProps {
  params: Promise<{ locale: string; product: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    (Object.keys(PRODUCT_LINKS) as ProductId[]).map((id) => ({
      locale,
      product: productSlug(id),
    })),
  );
}

async function resolve(params: PageProps["params"]) {
  const { locale, product: slug } = await params;
  const id = productFromSlug(slug);
  if (!isLocale(locale) || !id) return undefined;
  const dictionary = getDictionary(locale);
  const product = dictionary.home.products.find((item) => item.id === id);
  return product ? { locale, slug, dictionary, product } : undefined;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await resolve(params);
  if (!page) return {};
  return createPageMetadata({
    locale: page.locale,
    title: page.product.name,
    description: page.product.description,
    path: `work/${page.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const page = await resolve(params);
  if (!page) notFound();

  return (
    <main id="main-content">
      <ProductDetail
        locale={page.locale}
        product={page.product}
        labels={page.dictionary.work}
        linkLabels={productLinkLabels(page.dictionary)}
        badges={storeBadgeSources(page.locale)}
      />
    </main>
  );
}
