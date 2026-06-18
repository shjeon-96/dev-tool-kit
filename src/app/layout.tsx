import type { Metadata } from "next";
import Script from "next/script";
import {
  getGoogleAnalyticsId,
  getPlausibleDomain,
} from "@/shared/lib/trend-battle/analytics";
import {
  getGoogleAdsenseClient,
  getGoogleSiteVerification,
} from "@/shared/lib/trend-battle/monetization";
import { TrendVercelAnalytics } from "@/shared/lib/trend-battle/vercel-analytics";
import "./globals.css";

const googleSiteVerification = getGoogleSiteVerification();
const googleAdsenseClient = getGoogleAdsenseClient();
const googleAnalyticsId = getGoogleAnalyticsId();
const plausibleDomain = getPlausibleDomain();

export const metadata: Metadata = {
  title: "Trend Battle",
  description: "Guess which one is bigger.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://trendbattle.app",
  ),
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {googleAdsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script
              id="trend-battle-google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        ) : null}
        {plausibleDomain ? (
          <Script
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        {children}
        <TrendVercelAnalytics />
      </body>
    </html>
  );
}
