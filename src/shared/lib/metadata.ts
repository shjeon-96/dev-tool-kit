import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  localeAlternates,
  localizedPath,
  type Locale,
} from "@/shared/config/site";

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
};

export function createPageMetadata({
  locale,
  title,
  description,
  path = "",
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${localizedPath(locale, path)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...localeAlternates(path),
        "x-default": `${SITE_URL}${localizedPath("ko", path)}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALES[locale],
      images: [{ url: "/og", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og"],
    },
  };
}
