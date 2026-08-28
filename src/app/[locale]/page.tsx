import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HOME_CONTENT } from "@/shared/content/site-content";
import { isLocale } from "@/shared/config/site";
import { createPageMetadata } from "@/shared/lib/metadata";
import { ProductStudioHome } from "@/shared/ui/product-studio-home";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = HOME_CONTENT[locale];
  return createPageMetadata({
    locale,
    title:
      locale === "ko"
        ? "픽셀로직 — 모바일 제품 스튜디오"
        : "PixelLogic — Mobile Product Studio",
    description: content.intro,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductStudioHome locale={locale} content={HOME_CONTENT[locale]} />;
}
