import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Check, Minus, Trophy } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  vsComparisons,
  getAllVsSlugs,
  getVsBySlug,
  type VsComparisonSlug,
} from "@/entities/vs";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string; comparison: string }>;
}

type LocaleKey = "en" | "ko" | "ja";
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

export async function generateStaticParams() {
  const comparisons = getAllVsSlugs();
  return routing.locales.flatMap((locale) =>
    comparisons.map((comparison) => ({ locale, comparison })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, comparison } = await params;
  const vs = getVsBySlug(comparison);

  if (!vs) return { title: "Comparison Not Found" };

  const localeKey = getSafeLocaleKey(locale);
  const title = vs.title[localeKey];
  const description = vs.description[localeKey];

  return {
    title,
    description,
    keywords: vs.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/${locale}/vs/${comparison}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/vs/${comparison}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/vs/${comparison}`,
        ]),
      ),
    },
  };
}

export default async function VsComparisonPage({ params }: PageProps) {
  const { locale, comparison } = await params;
  setRequestLocale(locale);

  const vs = getVsBySlug(comparison);
  if (!vs) notFound();

  const localeKey = getSafeLocaleKey(locale);
  const title = vs.title[localeKey];
  const description = vs.description[localeKey];
  const comparisonData = vs.comparison[localeKey];
  const conclusion = vs.conclusion[localeKey];

  const relatedComparisons = getAllVsSlugs()
    .filter(
      (slug) =>
        slug !== comparison && getVsBySlug(slug)?.category === vs.category,
    )
    .slice(0, 4);

  const i18n = {
    home: localeKey === "ko" ? "홈" : localeKey === "ja" ? "ホーム" : "Home",
    comparisons:
      localeKey === "ko" ? "비교" : localeKey === "ja" ? "比較" : "Comparisons",
    tryTool:
      localeKey === "ko"
        ? "도구 사용해보기"
        : localeKey === "ja"
          ? "ツールを試す"
          : "Try This Tool",
    detailedComparison:
      localeKey === "ko"
        ? "상세 비교"
        : localeKey === "ja"
          ? "詳細比較"
          : "Detailed Comparison",
    aspect:
      localeKey === "ko" ? "항목" : localeKey === "ja" ? "項目" : "Aspect",
    conclusion:
      localeKey === "ko" ? "결론" : localeKey === "ja" ? "結論" : "Conclusion",
    related:
      localeKey === "ko"
        ? "관련 비교"
        : localeKey === "ja"
          ? "関連比較"
          : "Related Comparisons",
  };

  // JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: "Web Toolkit" },
    publisher: {
      "@type": "Organization",
      name: "Web Toolkit",
      url: SITE_CONFIG.url,
    },
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}`} className="hover:text-foreground">
          {i18n.home}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/vs`} className="hover:text-foreground">
          {i18n.comparisons}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">
          {vs.item1} vs {vs.item2}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-4 py-2 bg-primary/10 rounded-lg font-semibold text-primary">
            {vs.item1}
          </span>
          <span className="text-muted-foreground font-medium">vs</span>
          <span className="px-4 py-2 bg-secondary/80 rounded-lg font-semibold">
            {vs.item2}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
        <div className="mt-4">
          <Link href={`/${locale}/tools/${vs.relatedTool}`}>
            <Button>
              {i18n.tryTool}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.detailedComparison}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    {i18n.aspect}
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-primary">
                    {vs.item1}
                  </th>
                  <th className="text-left py-3 px-2 font-medium">
                    {vs.item2}
                  </th>
                  <th className="text-center py-3 px-2 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-2 font-medium">{row.aspect}</td>
                    <td
                      className={`py-3 px-2 ${row.winner === "item1" ? "text-success font-medium" : ""}`}
                    >
                      {row.item1}
                    </td>
                    <td
                      className={`py-3 px-2 ${row.winner === "item2" ? "text-success font-medium" : ""}`}
                    >
                      {row.item2}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {row.winner === "item1" && (
                        <Trophy className="h-4 w-4 text-primary inline" />
                      )}
                      {row.winner === "item2" && (
                        <Trophy className="h-4 w-4 text-secondary-foreground inline" />
                      )}
                      {row.winner === "tie" && (
                        <Minus className="h-4 w-4 text-muted-foreground inline" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="mb-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.conclusion}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{conclusion}</p>
        </CardContent>
      </Card>

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">{i18n.related}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedComparisons.map((slug) => {
              const related = getVsBySlug(slug);
              if (!related) return null;
              const relatedLocaleKey = getSafeLocaleKey(locale);
              return (
                <Link
                  key={slug}
                  href={`/${locale}/vs/${slug}`}
                  className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary">
                      {related.item1}
                    </span>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <span className="text-sm font-medium">{related.item2}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {related.description[relatedLocaleKey]}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
