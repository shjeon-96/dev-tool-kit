import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Zap,
  Shield,
  Wifi,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { tools, type ToolSlug } from "@/entities/tool";
import {
  aiContextTools,
  aiSources,
  getAIContextMeta,
  type AICompatibleTool,
} from "@/entities/ai-context";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  FaqJsonLd,
  AdUnit,
} from "@/shared/ui";
import { SITE_CONFIG, AD_SLOTS } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string; tool: string }>;
}

export function generateStaticParams() {
  const toolSlugs = Object.keys(aiContextTools);
  return toolSlugs.map((tool) => ({ tool }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tool } = await params;
  const aiContext = getAIContextMeta(tool as AICompatibleTool);
  const toolData = tools[tool as ToolSlug];

  if (!aiContext || !toolData) {
    return {};
  }

  const title = `AI Code ${toolData.title} - Fix ChatGPT, Claude, Copilot Errors`;
  const description = `Validate and fix AI-generated code with ${toolData.title}. Fix common errors from ChatGPT, Claude, and Copilot. 100% offline - your code never leaves your device.`;

  return {
    title,
    description,
    keywords: aiContext.keywords,
    openGraph: {
      title,
      description,
      url: `/${locale}/ai/${tool}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/ai/${tool}`,
      languages: {
        en: `/en/ai/${tool}`,
        ko: `/ko/ai/${tool}`,
        ja: `/ja/ai/${tool}`,
      },
    },
  };
}

export default async function AIToolPage({ params }: Props) {
  const { locale, tool } = await params;
  const aiContext = getAIContextMeta(tool as AICompatibleTool);
  const toolData = tools[tool as ToolSlug];

  if (!aiContext || !toolData) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("aiTools");

  const ToolIcon = toolData.icon;

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "AI Tools", url: `${SITE_CONFIG.url}/${locale}/ai` },
    {
      name: toolData.title,
      url: `${SITE_CONFIG.url}/${locale}/ai/${tool}`,
    },
  ];

  // FAQ for schema
  const faqItems = [
    {
      q: `Is it safe to use ${toolData.title} with sensitive AI-generated code?`,
      a: `Yes, ${toolData.title} processes everything locally in your browser. Your code never leaves your device - no data is sent to any server.`,
    },
    {
      q: `What common errors can ${toolData.title} fix from ChatGPT?`,
      a: aiContext.commonErrors.slice(0, 3).join(", ") + " and more.",
    },
    {
      q: "Does this tool work offline?",
      a: "Yes, once loaded, the tool works completely offline. Perfect for enterprise environments with network restrictions.",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={`AI Code ${toolData.title}`}
        description={`Validate and fix AI-generated code. ${aiContext.useCases[0]}`}
        url={`${SITE_CONFIG.url}/${locale}/ai/${tool}`}
        applicationCategory="DeveloperApplication"
      />
      <FaqJsonLd faqs={faqItems} />

      <div className="space-y-8">
        {/* Hero Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 py-1 text-purple-700 dark:text-purple-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t("badge")}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <ToolIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {t("titlePrefix")} {toolData.title}
              </h1>
              <p className="mt-1 text-lg text-muted-foreground">
                {t("subtitle", { tool: toolData.title })}
              </p>
            </div>
          </div>
        </header>

        {/* AI Sources Pills */}
        <div className="flex flex-wrap gap-2">
          {aiContext.aiSources.map((sourceId) => {
            const source = aiSources[sourceId];
            return (
              <span
                key={sourceId}
                className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${source.color} px-3 py-1 text-xs font-medium text-white`}
              >
                {source.name}
              </span>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <Shield className="h-8 w-8 text-green-500" />
            <div>
              <div className="font-semibold">
                {t("trustBadges.privacy.title")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("trustBadges.privacy.description")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <Wifi className="h-8 w-8 text-blue-500" />
            <div>
              <div className="font-semibold">
                {t("trustBadges.offline.title")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("trustBadges.offline.description")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <Zap className="h-8 w-8 text-yellow-500" />
            <div>
              <div className="font-semibold">
                {t("trustBadges.instant.title")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("trustBadges.instant.description")}
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Tool */}
        <Link
          href={`/${locale}/tools/${tool}`}
          className="group flex items-center justify-between rounded-xl border-2 border-primary bg-primary/5 p-6 transition-colors hover:bg-primary/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <ToolIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-lg font-semibold">{t("cta.button")}</div>
              <div className="text-sm text-muted-foreground">
                {t("cta.description", { tool: toolData.title })}
              </div>
            </div>
          </div>
          <ExternalLink className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Ad Unit */}
        <AdUnit
          slot={AD_SLOTS.TOOL_RESULT}
          format="horizontal"
          className="my-6"
        />

        {/* Common Errors Section */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            {t("commonErrors.title")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiContext.commonErrors.map((error, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {index + 1}
                </div>
                <span className="text-sm">{error}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <CheckCircle className="h-5 w-5 text-green-500" />
            {t("useCases.title")}
          </h2>
          <ul className="space-y-2">
            {aiContext.useCases.map((useCase, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ad Unit */}
        <AdUnit
          slot={AD_SLOTS.CONTENT_BOTTOM}
          format="rectangle"
          className="my-6"
        />

        {/* Related Tools */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">{t("relatedTools")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(aiContextTools)
              .filter(([slug]) => slug !== tool)
              .slice(0, 6)
              .map(([slug, meta]) => {
                const relatedTool = tools[slug as ToolSlug];
                if (!relatedTool) return null;

                return (
                  <Link
                    key={slug}
                    href={`/${locale}/ai/${slug}`}
                    className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted group-hover:bg-background">
                      <relatedTool.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">
                        AI {relatedTool.title}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {meta.keywords[0]}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
