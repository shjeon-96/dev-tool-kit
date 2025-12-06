import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { ThemeProvider, JsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: ["개발자 도구", "JSON 변환", "JWT 디코딩", "이미지 리사이즈", "웹툴"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-background">
            <aside className="hidden w-64 flex-col md:flex">
              <Sidebar />
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
