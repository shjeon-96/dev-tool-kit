import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as UI from "@pixellogic/ui/react";
import { isLocale } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { legalDocumentSections } from "@/shared/lib/legal-document";
import { createPageMetadata } from "@/shared/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getDictionary(locale).boriCleanerPrivacy;
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.sections[0].body,
    path: "bori-cleaner/privacy",
  });
}

export default async function BoriCleanerPrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale).boriCleanerPrivacy;

  return (
    <main id="main-content">
      <UI.LegalDocument
        title={copy.title}
        description={copy.updated}
        sections={legalDocumentSections(copy.sections)}
      />
    </main>
  );
}
