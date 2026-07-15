import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryConfig } from "@/entities/trend-item/data/categories";
import { TrendGamePage } from "@/features/trend-battle/trend-game-page";
import { isLocale } from "@/shared/config/site";
import { createPageMetadata } from "@/shared/lib/metadata";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const config = getCategoryConfig("countries", locale);
  if (!config) return {};

  return createPageMetadata({
    locale,
    title: config.seoTitle,
    description: config.seoDescription,
    path: "play",
  });
}

export default async function PlayPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <TrendGamePage locale={locale} categorySlug="countries" />;
}
