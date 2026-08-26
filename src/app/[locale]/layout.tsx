import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  LOCALES,
  SITE_NAME,
  SITE_NAME_EN,
  SITE_URL,
  isLocale,
} from "@/shared/config/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME_EN}`,
  },
  applicationName: SITE_NAME,
  description:
    "일상·배움·관계를 위한 모바일 앱을 직접 만들고 운영하는 픽셀로직의 공식 홈페이지입니다.",
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

  return (
    <html
      lang={rawLocale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script id="pixellogic-theme" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("pixellogic-theme-v1");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=t==="light"||t==="dark"?t:m?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
