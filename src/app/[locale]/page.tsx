import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, SITE_EMAIL } from "@/shared/config/site";
import { getDictionary, productLinkLabels } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import {
  SolaContactSection,
  SolaHomeHero,
  SolaPrinciplesSection,
  SolaProductShelf,
} from "@/shared/ui/sola-components";
import { storeBadgeSources } from "@/shared/ui/brand-assets";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createPageMetadata({
    locale,
    title: dictionary.meta.title,
    description: dictionary.meta.description,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <main id="main-content">
      <SolaHomeHero
        title={dictionary.home.title}
        titleAccent={dictionary.home.titleAccent}
        intro={dictionary.home.intro}
        primaryCta={dictionary.home.primaryCta}
      />
      <SolaProductShelf
        title={dictionary.home.productsTitle}
        description={dictionary.home.productsIntro}
        products={dictionary.home.products}
        locale={locale}
        linkLabels={productLinkLabels(dictionary)}
        badges={storeBadgeSources(locale)}
        detailsLabel={dictionary.work.viewDetails}
      />
      <SolaPrinciplesSection
        title={dictionary.home.principleTitle}
        principles={dictionary.home.principles}
      />
      <SolaContactSection
        title={dictionary.home.contactTitle}
        description={dictionary.home.contactBody}
        cta={dictionary.home.contactCta}
        email={SITE_EMAIL}
      />
    </main>
  );
}
