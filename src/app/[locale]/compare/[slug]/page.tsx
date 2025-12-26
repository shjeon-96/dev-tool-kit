import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Check, X, Zap } from "lucide-react";
import {
  getComparison,
  getComparisonSlugs,
  type ComparisonSlug,
} from "@/entities/comparison";
import { tools, type ToolSlug } from "@/entities/tool";
import { BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = getComparisonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) return {};

  const t = await getTranslations({ locale, namespace: "compare" });
  const title = t(`${slug as ComparisonSlug}.title`);
  const description = t(`${slug as ComparisonSlug}.description`);

  return {
    title,
    description,
    keywords: comparison.keywords,
    alternates: {
      canonical: `/${locale}/compare/${slug}`,
      languages: {
        en: `/en/compare/${slug}`,
        ko: `/ko/compare/${slug}`,
        ja: `/ja/compare/${slug}`,
      },
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { locale, slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("compare");
  const tTools = await getTranslations("tools");

  const tool = tools[comparison.toolSlug];
  const Icon = tool.icon;

  const title = t(`${slug as ComparisonSlug}.title`);
  const description = t(`${slug as ComparisonSlug}.description`);
  const pageUrl = `${SITE_CONFIG.url}/${locale}/compare/${slug}`;

  // Get features from translations
  let features: { key: string; weToolkit: boolean; competitor: boolean }[] = [];
  try {
    const rawFeatures = t.raw(`${slug as ComparisonSlug}.features`);
    if (Array.isArray(rawFeatures)) {
      features = rawFeatures as {
        key: string;
        weToolkit: boolean;
        competitor: boolean;
      }[];
    }
  } catch {
    // Features not available
  }

  // Get advantages from translations
  let advantages: string[] = [];
  try {
    const rawAdvantages = t.raw(`${slug as ComparisonSlug}.advantages`);
    if (Array.isArray(rawAdvantages)) {
      advantages = rawAdvantages as string[];
    }
  } catch {
    // Advantages not available
  }

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: t("title"), url: `${SITE_CONFIG.url}/${locale}/compare` },
    { name: title, url: pageUrl },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}/compare`} className="hover:text-foreground">
              {t("title")}
            </Link>
            <span>/</span>
            <span>{title}</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Tool Card */}
        <Link
          href={`/${locale}/tools/${comparison.toolSlug}`}
          className="group flex items-center gap-4 rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {tTools(`${comparison.toolSlug}.title`)}
            </h2>
            <p className="text-muted-foreground">
              {tTools(`${comparison.toolSlug}.description`)}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>

        {/* Comparison Table */}
        {features.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("featureComparison")}</h2>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">
                      {t("feature")}
                    </th>
                    <th className="text-center p-4 font-medium w-32">
                      Web Toolkit
                    </th>
                    <th className="text-center p-4 font-medium w-32">
                      {comparison.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {features.map((feature, index) => (
                    <tr key={index} className="hover:bg-muted/30">
                      <td className="p-4">{feature.key}</td>
                      <td className="p-4 text-center">
                        {feature.weToolkit ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-destructive mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.competitor ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-destructive mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Why Choose Us */}
        {advantages.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("whyChooseUs")}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {advantages.map((advantage, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border p-4"
                >
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-lg bg-primary/5 p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">{t("ctaTitle")}</h2>
          <p className="text-muted-foreground">{t("ctaDescription")}</p>
          <Link
            href={`/${locale}/tools/${comparison.toolSlug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t("ctaButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
