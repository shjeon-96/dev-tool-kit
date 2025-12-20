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
import { HowToJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

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

  const toolTitle = tTools(`${slug as GuideSlug}.title`);
  const guideTitle = `${toolTitle} Guide`;
  const guideSummary = t(`${slug}.summary`);
  const guideUrl = `${SITE_CONFIG.url}/${locale}/guides/${slug}`;

  // Build HowTo steps from sections
  const howToSteps = sections.map((section) => ({
    name: section.title,
    text: section.content,
    url: `${guideUrl}#${section.id}`,
  }));

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: t("title"), url: `${SITE_CONFIG.url}/${locale}/guides` },
    { name: guideTitle, url: guideUrl },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <HowToJsonLd
        name={guideTitle}
        description={guideSummary}
        steps={howToSteps}
        totalTime={`PT${guide.readTime}M`}
      />
      <ArticleJsonLd
        headline={guideTitle}
        description={guideSummary}
        url={guideUrl}
        datePublished="2024-12-01"
        dateModified={new Date().toISOString().split("T")[0]}
      />
      <GuideContent
        guide={guide}
        sections={sections}
        relatedToolsData={relatedToolsData}
        prevGuide={prevGuide}
        nextGuide={nextGuide}
      />
    </>
  );
}
