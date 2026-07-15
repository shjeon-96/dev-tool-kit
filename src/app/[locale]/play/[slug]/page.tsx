import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORY_SLUGS,
  getCategoryConfig,
} from "@/entities/trend-item/data/categories";
import { TrendGamePage } from "@/features/trend-battle/trend-game-page";
import { isLocale } from "@/shared/config/site";
import { createPageMetadata } from "@/shared/lib/metadata";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.filter((slug) => slug !== "countries").map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const config = getCategoryConfig(slug, locale);
  if (!config) return {};

  return createPageMetadata({
    locale,
    title: config.seoTitle,
    description: config.seoDescription,
    path: `play/${slug}`,
  });
}

export default async function CategoryPlayPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !getCategoryConfig(slug, locale)) notFound();
  return <TrendGamePage locale={locale} categorySlug={slug} />;
}
