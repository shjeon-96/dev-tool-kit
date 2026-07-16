import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanySurvivalGame } from "@/features/company-survival/company-survival-game";
import { COMPANY_COPY } from "@/features/company-survival/copy";
import { isLocale } from "@/shared/config/site";
import {
  getChallengeNumber,
  getUtcDateKey,
} from "@/shared/lib/company-survival/game";
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
  return createPageMetadata({
    locale,
    title: COMPANY_COPY[locale].brand,
    description: COMPANY_COPY[locale].subtitle,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const date = getUtcDateKey();
  return (
    <CompanySurvivalGame
      locale={locale}
      date={date}
      challengeNumber={getChallengeNumber(date)}
    />
  );
}
