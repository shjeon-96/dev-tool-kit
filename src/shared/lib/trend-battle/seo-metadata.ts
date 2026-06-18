import type { Metadata } from "next";
import type { AppLocale } from "@/shared/types/trend";
import { getLocalizedPath } from "./i18n";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://trendbattle.app";

interface TrendMetadataInput {
  title: string;
  description: string;
  slug: string;
  locale: AppLocale;
  openGraphTitle?: string;
}

export function createLocalizedAlternates(
  slug: string,
  locale: AppLocale,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: toAbsoluteUrl(getLocalizedPath(slug, locale)),
    languages: {
      en: toAbsoluteUrl(getLocalizedPath(slug, "en")),
      ko: toAbsoluteUrl(getLocalizedPath(slug, "ko")),
      "x-default": toAbsoluteUrl(getLocalizedPath(slug, "en")),
    },
  };
}

export function createTrendMetadata({
  title,
  description,
  slug,
  locale,
  openGraphTitle = title,
}: TrendMetadataInput): Metadata {
  const url = toAbsoluteUrl(getLocalizedPath(slug, locale));

  return {
    title,
    description,
    alternates: createLocalizedAlternates(slug, locale),
    openGraph: {
      type: "website",
      title: openGraphTitle,
      description,
      url,
      siteName: "Trend Battle",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
    },
  };
}

function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
}
