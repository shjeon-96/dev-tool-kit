import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
