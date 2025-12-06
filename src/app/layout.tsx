import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Toolkit",
  description: "All-in-one web-based toolkit for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
