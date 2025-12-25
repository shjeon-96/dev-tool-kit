import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Sidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import {
  ThemeProvider,
  JsonLd,
  ClarityScript,
  ToastProvider,
  AdBlockNotice,
} from "@/shared/ui";
import { CommandMenu } from "@/widgets/command-menu";
import { SmartPasteProvider } from "@/features/smart-paste";
import { LeadCaptureProvider } from "@/features/lead-capture";
import { OfflineUpgradePrompt } from "@/entities/subscription";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isKorean = locale === "ko";

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.title}`,
    },
    description: isKorean
      ? "개발자를 위한 웹 기반 올인원 도구 모음. JSON Formatter, JWT Decoder, Image Resizer 등을 설치 없이 브라우저에서 바로 사용하세요."
      : "All-in-one web-based toolkit for developers. Use JSON Formatter, JWT Decoder, Image Resizer and more directly in your browser without installation.",
    keywords: isKorean
      ? ["개발자 도구", "JSON 변환", "JWT 디코딩", "이미지 리사이즈", "웹툴"]
      : [
          "developer tools",
          "JSON formatter",
          "JWT decoder",
          "image resizer",
          "web tools",
        ],
    openGraph: {
      type: "website",
      locale: isKorean ? "ko_KR" : "en_US",
      url: SITE_CONFIG.url,
      title: SITE_CONFIG.title,
      description: isKorean
        ? "개발자를 위한 웹 기반 올인원 도구 모음"
        : "All-in-one web-based toolkit for developers",
      siteName: SITE_CONFIG.title,
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: isKorean
        ? "개발자를 위한 웹 기반 올인원 도구 모음"
        : "All-in-one web-based toolkit for developers",
      images: ["/api/og"],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        en: `${SITE_CONFIG.url}/en`,
        ko: `${SITE_CONFIG.url}/ko`,
      },
    },
    verification: {
      google: "UbK-cRKd2S1F-xeGfKZsoDQqr5t9EXk8upUmWhqLb0w",
      other: {
        "naver-site-verification": "12d9409b0e0f7faf6b74da7f2bc059e6a6683a37",
        "google-adsense-account": "ca-pub-4981986991458105",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ko")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WebToolkit" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BHCZK28NQQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BHCZK28NQQ');
          `}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NKT5P48C');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKT5P48C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4981986991458105"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <JsonLd />
        <ClarityScript />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a href="#main-content" className="skip-link">
              {locale === "ko" ? "본문으로 건너뛰기" : "Skip to main content"}
            </a>
            <SmartPasteProvider>
              <LeadCaptureProvider>
                <ToastProvider>
                  <OfflineUpgradePrompt />
                  <AdBlockNotice />
                  <div className="fixed inset-0 flex bg-background">
                    <aside
                      className="hidden w-64 flex-col md:flex"
                      aria-label={
                        locale === "ko"
                          ? "사이드바 네비게이션"
                          : "Sidebar navigation"
                      }
                    >
                      <Sidebar />
                    </aside>
                    <main
                      id="main-content"
                      className="flex-1 flex flex-col min-w-0"
                      role="main"
                    >
                      <Header />
                      <div className="main-scroll-area flex-1 overflow-y-auto p-6">
                        {children}
                      </div>
                      <Footer />
                      <CommandMenu />
                    </main>
                  </div>
                </ToastProvider>
              </LeadCaptureProvider>
            </SmartPasteProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
