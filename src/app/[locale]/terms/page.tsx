import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/config/site";
import { LEGAL_CONTENT } from "@/shared/i18n/legal";
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
  const copy = LEGAL_CONTENT[locale].terms;
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    path: "terms",
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = LEGAL_CONTENT[locale];
  return (
    <PolicyDocument
      content={copy.terms}
      locale={locale}
      homeLink={copy.homeLink}
      footerStatement={copy.footerStatement}
      accent="violet"
    />
  );
}
