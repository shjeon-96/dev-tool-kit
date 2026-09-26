import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as UI from "@pixellogic/ui/react";
import { isLocale } from "@/shared/config/site";
import {
  appDocumentEntries,
  findAppDocument,
} from "@/shared/legal/app-documents";
import { legalDocumentSections } from "@/shared/lib/legal-document";
import { createPageMetadata } from "@/shared/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string; product: string; document: string }>;
}

// 없는 앱·언어 조합은 빌드에 만들지 않고 404로 둔다.
export const dynamicParams = false;

export function generateStaticParams() {
  return appDocumentEntries().map(({ locale, slug, kind }) => ({
    locale,
    product: slug,
    document: kind,
  }));
}

async function resolve(params: PageProps["params"]) {
  const { locale, product, document } = await params;
  if (!isLocale(locale)) return undefined;
  const copy = findAppDocument(product, locale, document);
  return copy
    ? { locale, copy, path: `work/${product}/${document}` }
    : undefined;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await resolve(params);
  if (!page) return {};
  return createPageMetadata({
    locale: page.locale,
    title: page.copy.title,
    description: page.copy.description,
    path: page.path,
  });
}

export default async function AppDocumentPage({ params }: PageProps) {
  const page = await resolve(params);
  if (!page) notFound();

  return (
    <main id="main-content">
      <UI.LegalDocument
        title={page.copy.title}
        description={page.copy.lead}
        effectiveAt={page.copy.effectiveAt}
        updatedAt={page.copy.updatedAt}
        sections={legalDocumentSections(page.copy.sections)}
      />
    </main>
  );
}
