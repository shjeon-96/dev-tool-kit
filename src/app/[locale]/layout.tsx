import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ADSENSE_CLIENT_ID } from "@/shared/config/adsense";
import { LOCALES, SITE_NAME, SITE_URL, isLocale } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { SiteFooter, SiteHeader } from "@/widgets/site-shell";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  category: "technology",
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const dictionary = getDictionary(rawLocale);

  return (
    <html lang={rawLocale} data-scroll-behavior="smooth">
      <body>
        {process.env.NODE_ENV === "production" ? (
          <Script
            id="google-adsense"
            async
            strategy="beforeInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        ) : null}
        <a className="skip-link" href="#main-content">
          {dictionary.common.skipToContent}
        </a>
        <SiteHeader locale={rawLocale} dictionary={dictionary} />
        {children}
        <SiteFooter locale={rawLocale} dictionary={dictionary} />
      </body>
    </html>
  );
}
