import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/config/site";
import { LEGAL_COPY } from "@/shared/i18n/legal";
import { createPageMetadata } from "@/shared/lib/metadata";
import { PolicyDocument } from "@/shared/ui/policy-document";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = LEGAL_COPY[locale].privacy;
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.sections[0].body,
    path: "privacy",
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = LEGAL_COPY[locale].privacy;
  return (
    <PolicyDocument
      title={copy.title}
      updated={copy.updated}
      sections={copy.sections}
      locale={locale}
    />
  );
}
