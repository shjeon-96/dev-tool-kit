import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
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
  const copy = getDictionary(locale).terms;
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.sections[0].body,
    path: "terms",
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale).terms;
  return (
    <PolicyDocument
      title={copy.title}
      updated={copy.updated}
      sections={copy.sections}
    />
  );
}
