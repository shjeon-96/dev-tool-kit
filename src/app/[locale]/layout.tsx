import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ADSENSE_CLIENT_ID } from "@/shared/config/adsense";
import { LOCALES, SITE_NAME, SITE_URL, isLocale } from "@/shared/config/site";
import { ClarityScript } from "@/shared/ui/clarity";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  category: "game",
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
        <ClarityScript />
        <a className="skip-link" href="#main-content">
          {rawLocale === "ko"
            ? "게임으로 건너뛰기"
            : rawLocale === "ja"
              ? "ゲームへ移動"
              : "Skip to game"}
        </a>
        {children}
      </body>
    </html>
  );
}
