import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_EMAIL, isLocale } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import {
  SolaContactSection,
  ProcessSections,
} from "@/shared/ui/sola-components";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getDictionary(locale).process;
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.intro,
    path: "process",
  });
}

export default async function ProcessPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <main id="main-content">
      <ProcessSections
        locale={locale}
        copy={dictionary.process}
        products={dictionary.home.products}
      />
      <SolaContactSection
        title={dictionary.process.ctaTitle}
        description={dictionary.process.ctaBody}
        cta={dictionary.home.contactCta}
        email={SITE_EMAIL}
      />
    </main>
  );
}
