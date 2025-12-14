import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { tools, type ToolSlug } from "@/entities/tool";
import { BreadcrumbJsonLd, FaqJsonLd, ProductJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import { ToolRenderer } from "./tool-renderer";
import { ToolSeoSection } from "./tool-seo-section";
import { ToolHeaderActions } from "./tool-header-actions";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const toolSlugs = Object.keys(tools);
  return toolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "tools" });

  const title = t(`${slug as ToolSlug}.title`);
  const description = t(`${slug as ToolSlug}.description`);
  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/tools/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/${locale}/tools/${slug}`,
      languages: {
        en: `/en/tools/${slug}`,
        ko: `/ko/tools/${slug}`,
      },
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { locale, slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("tools");
  const tSeo = await getTranslations("seo");
  const tBreadcrumb = await getTranslations("seo.breadcrumb");

  const title = t(`${slug as ToolSlug}.title`);
  const description = t(`${slug as ToolSlug}.description`);

  const breadcrumbItems = [
    { name: tBreadcrumb("home"), url: SITE_CONFIG.url },
    { name: tBreadcrumb("tools"), url: `${SITE_CONFIG.url}/${locale}/tools` },
    {
      name: title,
      url: `${SITE_CONFIG.url}/${locale}/tools/${slug}`,
    },
  ];

  // Get FAQ from translations if available
  let faqItems: { q: string; a: string }[] = [];
  try {
    const rawContent = tSeo.raw(slug as string);
    if (rawContent && typeof rawContent === "object") {
      const content = rawContent as Record<string, unknown>;
      if (Array.isArray(content.faq)) {
        faqItems = content.faq as { q: string; a: string }[];
      }
    }
  } catch {
    // FAQ not available for this tool
  }

  const productUrl = `${SITE_CONFIG.url}/${locale}/tools/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd
        name={title}
        description={description}
        url={productUrl}
        category={tool.category}
      />
      {faqItems.length > 0 && <FaqJsonLd faqs={faqItems} />}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <tool.icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
          <ToolHeaderActions slug={slug as ToolSlug} />
        </div>

        <div className="rounded-lg border p-6">
          <ToolRenderer slug={slug as ToolSlug} />
        </div>

        <ToolSeoSection slug={slug as ToolSlug} locale={locale} />
      </div>
    </>
  );
}
