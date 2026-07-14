import type { Metadata } from "next";
import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "@/shared/config/adsense";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelLogic",
  description: "Build small, useful apps for everyday life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="google-adsense"
          async
          strategy="beforeInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
