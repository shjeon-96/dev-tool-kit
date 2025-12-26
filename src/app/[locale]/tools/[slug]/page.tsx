import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { tools, type ToolSlug, RelatedToolsSSR } from "@/entities/tool";
import { ToolFeatureCards } from "@/entities/tool";
import { routing } from "@/i18n/routing";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  SoftwareApplicationJsonLd,
} from "@/shared/ui";
import { AdUnit } from "@/widgets/ad-unit/ad-unit";
import {
  SmartInternalLinks,
  ToolVisitRecorder,
} from "@/widgets/smart-internal-links";
import { SITE_CONFIG, AD_SLOTS } from "@/shared/config";
import { ToolRenderer } from "./tool-renderer";
import { ToolSeoSection } from "./tool-seo-section";
import { ToolHeaderActions } from "./tool-header-actions";
import { EmbedWrapper } from "./embed-wrapper";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const toolSlugs = Object.keys(tools);
  return routing.locales.flatMap((locale) =>
    toolSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  const commonT = await getTranslations({ locale, namespace: "site" });

  const tool = tools[slug as ToolSlug];
  if (!tool) return notFound();

  const toolName = t(`${slug}.title`);
  const toolDescription = t(`${slug}.description`);
  const siteTitle = commonT("title");

  const baseUrl = SITE_CONFIG.url;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(
    toolName,
  )}&description=${encodeURIComponent(toolDescription)}`;

  return {
    title: `${toolName} - ${siteTitle}`,
    description: toolDescription,
    keywords: `${toolName}, ${tool.title}, developer tools, devtoolkit`,
    openGraph: {
      title: `${toolName} | ${siteTitle}`,
      description: toolDescription,
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: toolName,
      description: toolDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/tools/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}/tools/${slug}`]),
      ),
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tool = tools[slug as ToolSlug];
  if (!tool) return notFound();

  const t = await getTranslations({ locale, namespace: "tools" });
  const toolName = t(`${slug}.title`);
  const toolDescription = t(`${slug}.description`);

  const toolRenderer = <ToolRenderer slug={slug as ToolSlug} />;

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <EmbedWrapper toolContent={toolRenderer}>
        {/* Client-side visit recording */}
        <ToolVisitRecorder slug={slug as ToolSlug} />

        {/* JSON-LD for SEO */}
        <SoftwareApplicationJsonLd
          name={toolName}
          description={toolDescription}
          url={`${SITE_CONFIG.url}/${locale}/tools/${slug}`}
          applicationCategory="DeveloperApplication"
          operatingSystem="Web"
        />
        <BreadcrumbJsonLd
          items={[
            { url: SITE_CONFIG.url, name: "Home" },
            { url: `${SITE_CONFIG.url}/${locale}/tools`, name: "Tools" },
            {
              url: `${SITE_CONFIG.url}/${locale}/tools/${slug}`,
              name: toolName,
            },
          ]}
        />

        <div className="container py-6 lg:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Main Content */}
            <main className="lg:col-span-9">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                    {toolName}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    {toolDescription}
                  </p>
                </div>
                <ToolHeaderActions slug={slug as ToolSlug} />
              </div>

              {/* Tool Implementation */}
              <div className="min-h-[400px]">{toolRenderer}</div>

              {/* Mobile Ad - Only visible on mobile/tablet */}
              <div className="lg:hidden my-6">
                <AdUnit slot={AD_SLOTS.TOOL_RESULT} format="horizontal" />
              </div>

              {/* SEO Content Section */}
              <ToolSeoSection slug={slug as ToolSlug} locale={locale} />

              {/* Smart Internal Links */}
              <Suspense
                fallback={
                  <div className="h-20 animate-pulse bg-muted rounded-lg mt-8" />
                }
              >
                <SmartInternalLinks currentTool={slug as ToolSlug} />
              </Suspense>

              {/* Related Tools */}
              <section className="mt-12 pt-8 border-t">
                <div className="rounded-xl bg-muted/30 p-6 sm:p-8">
                  <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
                  <RelatedToolsSSR
                    currentTool={slug as ToolSlug}
                    locale={locale}
                    maxLinks={6}
                  />
                </div>
              </section>

              {/* Mobile Ad Bottom - Only visible on mobile/tablet */}
              <div className="lg:hidden my-6">
                <AdUnit slot={AD_SLOTS.CONTENT_BOTTOM} format="rectangle" />
              </div>

              {/* FAQ schema if it exists */}
              {tool.faq && (
                <FaqJsonLd
                  faqs={tool.faq.map((f: string) => ({
                    q: t(`${slug}.faq.${f}.q`),
                    a: t(`${slug}.faq.${f}.a`),
                  }))}
                />
              )}
            </main>

            {/* Sidebar */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-[72px] space-y-8">
                <AdUnit slot={AD_SLOTS.TOOL_RESULT} format="vertical" />

                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-3 font-semibold">Features</h3>
                  <ToolFeatureCards features={tool.features || []} />
                </div>

                <AdUnit slot={AD_SLOTS.CONTENT_BOTTOM} format="rectangle" />
              </div>
            </aside>
          </div>
        </div>
      </EmbedWrapper>
    </Suspense>
  );
}
