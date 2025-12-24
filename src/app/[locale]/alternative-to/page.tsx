import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Wifi, Globe } from "lucide-react";
import { getAllCompetitors, type Competitor } from "@/entities/competitor";
import { BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    "Web Toolkit Alternatives - Compare Developer Tools | Web Toolkit";
  const description =
    "Compare Web Toolkit with JSONFormatter.org, CyberChef, DevToys, and IT-Tools. See why developers choose our 100% client-side, privacy-first tools.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/alternative-to`,
    },
    alternates: {
      canonical: `/${locale}/alternative-to`,
      languages: {
        en: "/en/alternative-to",
        ko: "/ko/alternative-to",
        ja: "/ja/alternative-to",
      },
    },
  };
}

const categoryLabels: Record<Competitor["category"], string> = {
  json: "JSON Tools",
  "multi-tool": "Multi-purpose",
  desktop: "Desktop App",
  online: "Online Tools",
};

const categoryColors: Record<Competitor["category"], string> = {
  json: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "multi-tool":
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  desktop:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  online:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

export default async function AlternativeToIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("alternativeTo");
  const competitors = getAllCompetitors();

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    {
      name: "Alternatives",
      url: `${SITE_CONFIG.url}/${locale}/alternative-to`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="space-y-8">
        {/* Hero Section */}
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("index.title")}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("index.description")}
          </p>
        </header>

        {/* Why Choose Web Toolkit */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-green-500" />
            <div>
              <div className="font-semibold">{t("benefits.privacy.title")}</div>
              <div className="text-sm text-muted-foreground">
                {t("benefits.privacy.description")}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
            <Wifi className="mt-0.5 h-6 w-6 shrink-0 text-blue-500" />
            <div>
              <div className="font-semibold">{t("benefits.offline.title")}</div>
              <div className="text-sm text-muted-foreground">
                {t("benefits.offline.description")}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
            <Zap className="mt-0.5 h-6 w-6 shrink-0 text-yellow-500" />
            <div>
              <div className="font-semibold">{t("benefits.ai.title")}</div>
              <div className="text-sm text-muted-foreground">
                {t("benefits.ai.description")}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
            <Globe className="mt-0.5 h-6 w-6 shrink-0 text-purple-500" />
            <div>
              <div className="font-semibold">
                {t("benefits.platform.title")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("benefits.platform.description")}
              </div>
            </div>
          </div>
        </div>

        {/* Competitors Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">{t("index.compareWith")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competitors.map((competitor) => (
              <Link
                key={competitor.slug}
                href={`/${locale}/alternative-to/${competitor.slug}`}
                className="group flex flex-col rounded-xl border p-5 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[competitor.category]}`}
                  >
                    {categoryLabels[competitor.category]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ~{competitor.searchVolume.toLocaleString()}{" "}
                    {t("index.monthlySearches")}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold">
                  {competitor.name}
                </h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
                  {competitor.description}
                </p>

                <div className="mb-3 space-y-1">
                  {competitor.weaknesses.slice(0, 2).map((weakness, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                      {weakness}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-sm font-medium text-primary">
                    {t("index.seeComparison")}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-2 text-2xl font-bold">{t("cta.title")}</h2>
            <p className="mb-4 text-primary-foreground/80">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-white/90"
            >
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
