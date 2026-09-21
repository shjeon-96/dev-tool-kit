import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, SITE_EMAIL } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import {
  BoriContactSection,
  BoriHomeHero,
  BoriPrinciplesSection,
  BoriProductShelf,
} from "@/shared/ui/bori-components";

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
      <BoriHomeHero
        eyebrow={dictionary.home.eyebrow}
        title={dictionary.home.title}
        titleAccent={dictionary.home.titleAccent}
        intro={dictionary.home.intro}
        primaryCta={dictionary.home.primaryCta}
        proof={[
          dictionary.home.proofOne,
          dictionary.home.proofTwo,
          dictionary.home.proofThree,
        ]}
        products={dictionary.home.products}
        heroLabel={dictionary.home.boriHeroLabel}
        heroMessage={dictionary.home.boriHeroMessage}
        heroDescription={dictionary.home.boriHeroBody}
      />
      <BoriProductShelf
        title={dictionary.home.productsTitle}
        description={dictionary.home.productsIntro}
        products={dictionary.home.products}
        shelfLabel={dictionary.home.boriShelfLabel}
        linkLabels={{
          appStore: dictionary.common.appStore,
          googlePlay: dictionary.common.googlePlay,
          web: dictionary.common.webApp,
          publicPage: dictionary.common.publicPage,
        }}
      />
      <BoriPrinciplesSection
        title={dictionary.home.principleTitle}
        description={dictionary.home.principleEyebrow}
        principles={dictionary.home.principles}
      />
      <BoriContactSection
        title={dictionary.home.contactTitle}
        description={dictionary.home.contactBody}
        label={dictionary.home.boriContactLabel}
        cta={dictionary.home.contactCta}
        email={SITE_EMAIL}
      />
    </main>
  );
}
