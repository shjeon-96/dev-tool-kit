import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getGuide,
  getGuideSlugs,
  getAllGuides,
  GuideContent,
  type GuideSlug,
} from "@/entities/guide";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("guides");
  const tTools = await getTranslations("tools");

  const guide = getGuide(slug);
  if (!guide) return {};

  const toolTitle = tTools(`${slug as GuideSlug}.title`);

  return {
    title: `${toolTitle} Guide - ${t("title")}`,
    description: t(`${slug}.summary`),
    keywords: guide.keywords,
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuide(slug);
  if (!guide) notFound();

  const t = await getTranslations("guides");
  const tTools = await getTranslations("tools");

  // Build sections with translations
  const sections = guide.sections.map((section) => ({
    id: section.id,
    title: t(`${slug}.sections.${section.id}.title`),
    content: t(`${slug}.sections.${section.id}.content`),
    code: section.code,
    language: section.language,
  }));

  // Build related tools data
  const relatedToolsData = [guide.slug, ...guide.relatedTools].map(
    (toolSlug) => ({
      slug: toolSlug,
      title: tTools(`${toolSlug as GuideSlug}.title`),
    }),
  );

  // Get prev/next guides for navigation
  const allGuides = getAllGuides();
  const currentIndex = allGuides.findIndex((g) => g.slug === slug);
  const prevGuide =
    currentIndex > 0
      ? {
          slug: allGuides[currentIndex - 1].slug,
          title: tTools(
            `${allGuides[currentIndex - 1].slug as GuideSlug}.title`,
          ),
        }
      : null;
  const nextGuide =
    currentIndex < allGuides.length - 1
      ? {
          slug: allGuides[currentIndex + 1].slug,
          title: tTools(
            `${allGuides[currentIndex + 1].slug as GuideSlug}.title`,
          ),
        }
      : null;

  return (
    <GuideContent
      guide={guide}
      sections={sections}
      relatedToolsData={relatedToolsData}
      prevGuide={prevGuide}
      nextGuide={nextGuide}
    />
  );
}
