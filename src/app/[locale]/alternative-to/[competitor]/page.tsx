import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Minus,
  Shield,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import {
  getCompetitor,
  getCompetitorSlugs,
  type CompetitorSlug,
  type ComparisonPoint,
} from "@/entities/competitor";
import { tools, type ToolSlug } from "@/entities/tool";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  FaqJsonLd,
} from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string; competitor: string }>;
}

export function generateStaticParams() {
  return getCompetitorSlugs().map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, competitor: competitorSlug } = await params;
  const competitor = getCompetitor(competitorSlug as CompetitorSlug);

  if (!competitor) return {};

  const title = `${competitor.name} Alternative - Web Toolkit vs ${competitor.name}`;
  const description = `Compare Web Toolkit with ${competitor.name}. See why developers switch to our 100% client-side, privacy-first developer tools. ${competitor.weaknesses[0]}`;

  return {
    title,
    description,
    keywords: competitor.targetKeywords,
    openGraph: {
      title,
      description,
      url: `/${locale}/alternative-to/${competitorSlug}`,
    },
    alternates: {
      canonical: `/${locale}/alternative-to/${competitorSlug}`,
      languages: {
        en: `/en/alternative-to/${competitorSlug}`,
        ko: `/ko/alternative-to/${competitorSlug}`,
        ja: `/ja/alternative-to/${competitorSlug}`,
      },
    },
  };
}

function ComparisonCell({ point }: { point: ComparisonPoint }) {
  const getValue = (value: string | boolean, isWebToolkit: boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    return (
      <span
        className={
          isWebToolkit && point.advantage === "web-toolkit"
            ? "font-medium text-green-600 dark:text-green-400"
            : !isWebToolkit && point.advantage === "competitor"
              ? "font-medium text-green-600 dark:text-green-400"
              : ""
        }
      >
        {value}
      </span>
    );
  };

  const getAdvantageIcon = () => {
    switch (point.advantage) {
      case "web-toolkit":
        return <Check className="h-4 w-4 text-green-500" />;
      case "competitor":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <tr className="border-b">
      <td className="py-3 px-4 font-medium">{point.feature}</td>
      <td className="py-3 px-4 text-center bg-green-50/50 dark:bg-green-950/20">
        {getValue(point.webToolkit, true)}
      </td>
      <td className="py-3 px-4 text-center">
        {getValue(point.competitor, false)}
      </td>
      <td className="py-3 px-4 text-center">{getAdvantageIcon()}</td>
    </tr>
  );
}

export default async function CompetitorPage({ params }: Props) {
  const { locale, competitor: competitorSlug } = await params;
  const competitor = getCompetitor(competitorSlug as CompetitorSlug);

  if (!competitor) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("alternativeTo");

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    {
      name: "Alternatives",
      url: `${SITE_CONFIG.url}/${locale}/alternative-to`,
    },
    {
      name: `vs ${competitor.name}`,
      url: `${SITE_CONFIG.url}/${locale}/alternative-to/${competitorSlug}`,
    },
  ];

  const faqItems = [
    {
      q: `Is Web Toolkit better than ${competitor.name}?`,
      a: `Web Toolkit offers 100% client-side processing for better privacy, while ${competitor.name} ${competitor.category === "desktop" ? "requires installation" : "may process data on servers"}. Web Toolkit also provides AI code error detection for ChatGPT and Claude outputs.`,
    },
    {
      q: `Is ${competitor.name} safe for sensitive data?`,
      a:
        competitor.category === "desktop"
          ? `${competitor.name} processes data locally, which is safe. However, it's Windows-only. Web Toolkit works on all platforms while keeping your data local.`
          : `${competitor.name} may send data to external servers. Web Toolkit processes everything in your browser - your API keys and tokens never leave your device.`,
    },
    {
      q: `Can I use Web Toolkit offline like ${competitor.name}?`,
      a: `Yes! Web Toolkit is a PWA (Progressive Web App) that works offline. Once loaded, you can use all 43+ tools without internet connection.`,
    },
  ];

  const advantageCount = competitor.comparisonPoints.filter(
    (p) => p.advantage === "web-toolkit",
  ).length;

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name="Web Toolkit"
        description={`Better alternative to ${competitor.name} with 100% client-side processing and AI code support.`}
        url={`${SITE_CONFIG.url}/${locale}/alternative-to/${competitorSlug}`}
        applicationCategory="DeveloperApplication"
      />
      <FaqJsonLd faqs={faqItems} />

      <div className="space-y-8">
        {/* Hero Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <Shield className="h-3.5 w-3.5" />
              {t("detail.privacyFirst")}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {competitor.name} {t("detail.alternative")}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("detail.heroDescription", { competitor: competitor.name })}
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-green-50 p-4 dark:bg-green-950/20">
            <div className="text-3xl font-bold text-green-600">
              {advantageCount}/{competitor.comparisonPoints.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("detail.categoriesWon")}
            </div>
          </div>
          <div className="rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/20">
            <div className="text-3xl font-bold text-blue-600">43+</div>
            <div className="text-sm text-muted-foreground">
              {t("detail.toolsAvailable")}
            </div>
          </div>
          <div className="rounded-lg border bg-purple-50 p-4 dark:bg-purple-950/20">
            <div className="text-3xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-muted-foreground">
              {t("detail.clientSide")}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            {t("detail.comparisonTable")}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">
                    {t("detail.feature")}
                  </th>
                  <th className="py-3 px-4 text-center font-semibold bg-green-100/50 dark:bg-green-900/20">
                    Web Toolkit
                  </th>
                  <th className="py-3 px-4 text-center font-semibold">
                    {competitor.name}
                  </th>
                  <th className="py-3 px-4 text-center font-semibold w-20">
                    {t("detail.winner")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitor.comparisonPoints.map((point, i) => (
                  <ComparisonCell key={i} point={point} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Weaknesses Section */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            {t("detail.whySwitch", { competitor: competitor.name })}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {competitor.weaknesses.map((weakness, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <span className="text-sm">{weakness}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Overlapping Tools */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            {t("detail.tryTheseTools")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {competitor.overlappingTools.map((toolSlug) => {
              const tool = tools[toolSlug as ToolSlug];
              if (!tool) return null;

              return (
                <Link
                  key={toolSlug}
                  href={`/${locale}/tools/${toolSlug}`}
                  className="group flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <tool.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{tool.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {tool.description}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">{t("detail.faq")}</h2>
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <div key={i} className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">{t("detail.readyToSwitch")}</h2>
          <p className="max-w-lg text-green-100">
            {t("detail.ctaDescription", { competitor: competitor.name })}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50"
            >
              {t("detail.exploreTools")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={competitor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("detail.visit")} {competitor.name}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
