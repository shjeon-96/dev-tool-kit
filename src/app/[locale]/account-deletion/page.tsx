import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/config/site";
import { LEGAL_CONTENT } from "@/shared/i18n/legal";
import { createPageMetadata } from "@/shared/lib/metadata";
import { AccountDeletionDocument } from "@/shared/ui/policy-document";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = LEGAL_CONTENT[locale].deletion;
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    path: "account-deletion",
  });
}

export default async function AccountDeletionPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = LEGAL_CONTENT[locale];
  return (
    <AccountDeletionDocument
      content={copy.deletion}
      locale={locale}
      homeLink={copy.homeLink}
      footerStatement={copy.footerStatement}
    />
  );
}
