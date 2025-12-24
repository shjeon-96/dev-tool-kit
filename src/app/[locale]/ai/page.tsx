import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, Wifi } from "lucide-react";
import { tools, type ToolSlug } from "@/entities/tool";
import {
  aiContextTools,
  aiSources,
  type AICompatibleTool,
} from "@/entities/ai-context";
import { BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    "AI Code Tools - Fix ChatGPT, Claude, Copilot Errors | Web Toolkit";
  const description =
    "Validate and fix AI-generated code from ChatGPT, Claude, GitHub Copilot, and more. 16+ specialized tools for Vibe Coders. 100% offline and private.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/ai`,
    },
    alternates: {
      canonical: `/${locale}/ai`,
      languages: {
        en: "/en/ai",
        ko: "/ko/ai",
        ja: "/ja/ai",
      },
    },
  };
}

export default async function AIToolsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aiTools");
  const toolCount = Object.keys(aiContextTools).length;

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "AI Tools", url: `${SITE_CONFIG.url}/${locale}/ai` },
  ];

  // Calculate total estimated search volume
  const totalSearchVolume = Object.values(aiContextTools).reduce(
    (sum, tool) => sum + (tool.searchVolume || 0),
    0,
  );

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="space-y-8">
        {/* Hero Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {t("index.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("index.subtitle", { count: toolCount })}
              </p>
            </div>
          </div>

          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("index.description")}
          </p>
        </header>

        {/* AI Sources Banner */}
        <div className="rounded-xl border bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-purple-950/30 dark:to-pink-950/30">
          <h2 className="mb-4 text-lg font-semibold">
            {t("index.supportedAI")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {Object.values(aiSources).map((source) => (
              <div
                key={source.id}
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${source.color} px-4 py-2 text-sm font-medium text-white shadow-sm`}
              >
                <Sparkles className="h-4 w-4" />
                {source.name}
              </div>
            ))}
          </div>
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

        {/* Tools Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">{t("index.allTools")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(aiContextTools).map(([slug, meta]) => {
              const toolData = tools[slug as ToolSlug];
              if (!toolData) return null;

              return (
                <Link
                  key={slug}
                  href={`/${locale}/ai/${slug}`}
                  className="group flex flex-col rounded-xl border p-5 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                      <toolData.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">AI {toolData.title}</div>
                      <div className="flex flex-wrap gap-1">
                        {meta.aiSources.slice(0, 3).map((sourceId) => (
                          <span
                            key={sourceId}
                            className="text-[10px] text-muted-foreground"
                          >
                            {aiSources[sourceId].name}
                            {sourceId !== meta.aiSources[2] && " •"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="mb-3 flex-1 text-sm text-muted-foreground">
                    {meta.useCases[0]}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {meta.commonErrors.length} {t("index.errorsFixed")}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Stats Banner */}
        <div className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <div className="text-4xl font-bold">{toolCount}</div>
              <div className="text-purple-100">{t("index.stats.tools")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold">
                {Object.values(aiContextTools).reduce(
                  (sum, t) => sum + t.commonErrors.length,
                  0,
                )}
              </div>
              <div className="text-purple-100">
                {t("index.stats.errorTypes")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold">100%</div>
              <div className="text-purple-100">{t("index.stats.offline")}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
