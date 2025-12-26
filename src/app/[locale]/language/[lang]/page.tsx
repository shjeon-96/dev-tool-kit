import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/shared/config";
import {
  getAllLanguageTypeSlugs,
  getLanguageType,
  getLanguageTypesByTool,
  type LanguageTypeSlug,
} from "@/entities/language-type";
import { getToolBySlug } from "@/entities/tool";
import {
  BreadcrumbJsonLd,
  TechArticleJsonLd,
  SoftwareApplicationJsonLd,
} from "@/shared/ui/json-ld";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import {
  ArrowRight,
  Code2,
  BookOpen,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

// Locale key helper (es, pt, de → en fallback)
type LocaleKey = "en" | "ko" | "ja";
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

export async function generateStaticParams() {
  const slugs = getAllLanguageTypeSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((lang) => ({ locale, lang })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lang: string }>;
}): Promise<Metadata> {
  const { locale, lang } = await params;
  const languageType = getLanguageType(lang as LanguageTypeSlug);
  if (!languageType) return {};

  const localeKey = getSafeLocaleKey(locale);
  const title = languageType.title[localeKey];
  const description = languageType.description[localeKey];

  return {
    title,
    description,
    keywords: languageType.keywords,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/language/${lang}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${locale}/language/${lang}`,
      type: "article",
    },
  };
}

export default async function LanguageTypePage({
  params,
}: {
  params: Promise<{ locale: string; lang: string }>;
}) {
  const { locale, lang } = await params;
  const t = await getTranslations("language");
  const tCommon = await getTranslations("common");

  const languageType = getLanguageType(lang as LanguageTypeSlug);
  if (!languageType) notFound();

  const localeKey = getSafeLocaleKey(locale);
  const relatedTool = getToolBySlug(languageType.relatedTool);
  const relatedLanguageTypes = getLanguageTypesByTool(languageType.tool)
    .filter((lt) => lt.slug !== languageType.slug)
    .slice(0, 4);

  const breadcrumbItems = [
    { name: "Home", url: `${SITE_CONFIG.url}/${locale}` },
    { name: "Language Guides", url: `${SITE_CONFIG.url}/${locale}/language` },
    {
      name: languageType.title[localeKey],
      url: `${SITE_CONFIG.url}/${locale}/language/${lang}`,
    },
  ];

  return (
    <>
      {/* JSON-LD */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <TechArticleJsonLd
        headline={languageType.title[localeKey]}
        description={languageType.description[localeKey]}
        url={`${SITE_CONFIG.url}/${locale}/language/${lang}`}
        proficiencyLevel="Intermediate"
      />
      <SoftwareApplicationJsonLd
        name={languageType.title[localeKey]}
        description={languageType.description[localeKey]}
        url={`${SITE_CONFIG.url}/${locale}/language/${lang}`}
        featureList={languageType.useCases[localeKey]}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href={`/${locale}`} className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${locale}/language`} className="hover:text-foreground">
            Language Guides
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {languageType.title[localeKey]}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="capitalize">
              {languageType.language}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {languageType.tool}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {languageType.category}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {languageType.title[localeKey]}
          </h1>
          <p className="text-lg text-muted-foreground">
            {languageType.description[localeKey]}
          </p>
        </header>

        {/* Use Cases */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            {t("useCases")}
          </h2>
          <ul className="space-y-2">
            {languageType.useCases[localeKey].map((useCase, index) => (
              <li key={index} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Code Examples */}
        {languageType.codeExamples[localeKey].length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-500" />
              {t("codeExamples")}
            </h2>
            <div className="space-y-6">
              {languageType.codeExamples[localeKey].map((example, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    {example.description && (
                      <p className="text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Related Tool */}
        {relatedTool && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              {t("relatedTool")}
            </h2>
            <Card className="hover:border-primary transition-colors">
              <Link href={`/${locale}/tools/${languageType.relatedTool}`}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {relatedTool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {relatedTool.description}
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Link>
            </Card>
          </section>
        )}

        {/* Related Language Guides */}
        {relatedLanguageTypes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t("relatedGuides")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedLanguageTypes.map((lt) => (
                <Card
                  key={lt.slug}
                  className="hover:border-primary transition-colors"
                >
                  <Link href={`/${locale}/language/${lt.slug}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="text-xs capitalize"
                        >
                          {lt.language}
                        </Badge>
                      </div>
                      <h3 className="font-medium">{lt.title[localeKey]}</h3>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-8 border-t">
          <p className="text-muted-foreground mb-4">{t("tryToolCTA")}</p>
          <Link
            href={`/${locale}/tools/${languageType.relatedTool}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {tCommon("tryNow")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </>
  );
}
