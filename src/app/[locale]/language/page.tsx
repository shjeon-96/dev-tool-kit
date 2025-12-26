import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/shared/config";
import {
  LANGUAGE_TYPE_REGISTRY,
  type LanguageType,
} from "@/entities/language-type";
import { ItemListJsonLd, BreadcrumbJsonLd } from "@/shared/ui/json-ld";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Code2, FileJson, Hash, Lock, Settings } from "lucide-react";

type LocaleKey = "en" | "ko" | "ja";
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

const CATEGORY_ICONS: Record<LanguageType["category"], React.ReactNode> = {
  "data-format": <FileJson className="h-5 w-5" />,
  encoding: <Code2 className="h-5 w-5" />,
  security: <Lock className="h-5 w-5" />,
  utility: <Settings className="h-5 w-5" />,
};

const CATEGORY_LABELS: Record<
  LanguageType["category"],
  Record<LocaleKey, string>
> = {
  "data-format": {
    en: "Data Formats",
    ko: "데이터 포맷",
    ja: "データフォーマット",
  },
  encoding: {
    en: "Encoding",
    ko: "인코딩",
    ja: "エンコード",
  },
  security: {
    en: "Security",
    ko: "보안",
    ja: "セキュリティ",
  },
  utility: {
    en: "Utilities",
    ko: "유틸리티",
    ja: "ユーティリティ",
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("language");

  const title = t("indexTitle");
  const description = t("indexDescription");

  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/language`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${locale}/language`,
      type: "website",
    },
  };
}

export default async function LanguageIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("language");
  const localeKey = getSafeLocaleKey(locale);

  // Group by category
  const languageTypes = Object.values(LANGUAGE_TYPE_REGISTRY);
  const byCategory = languageTypes.reduce(
    (acc, lt) => {
      if (!acc[lt.category]) acc[lt.category] = [];
      acc[lt.category].push(lt);
      return acc;
    },
    {} as Record<LanguageType["category"], LanguageType[]>,
  );

  // Sort each category by searchVolume
  Object.keys(byCategory).forEach((cat) => {
    byCategory[cat as LanguageType["category"]].sort(
      (a, b) => b.searchVolume - a.searchVolume,
    );
  });

  const breadcrumbItems = [
    { name: "Home", url: `${SITE_CONFIG.url}/${locale}` },
    { name: "Language Guides", url: `${SITE_CONFIG.url}/${locale}/language` },
  ];

  const itemListItems = languageTypes.map((lt) => ({
    name: lt.title[localeKey],
    url: `${SITE_CONFIG.url}/${locale}/language/${lt.slug}`,
    description: lt.description[localeKey],
  }));

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ItemListJsonLd
        name={t("indexTitle")}
        description={t("indexDescription")}
        url={`${SITE_CONFIG.url}/${locale}/language`}
        items={itemListItems}
        itemType="Article"
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("indexTitle")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("indexDescription")}
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary">
              {languageTypes.length} {t("guides")}
            </Badge>
            <Badge variant="outline">10 {t("languages")}</Badge>
            <Badge variant="outline">10 {t("tools")}</Badge>
          </div>
        </header>

        {/* Categories */}
        {(
          [
            "data-format",
            "encoding",
            "security",
            "utility",
          ] as LanguageType["category"][]
        ).map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              {CATEGORY_ICONS[category]}
              {CATEGORY_LABELS[category][localeKey]}
              <Badge variant="outline" className="ml-2">
                {byCategory[category]?.length || 0}
              </Badge>
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory[category]?.map((lt) => (
                <Card
                  key={lt.slug}
                  className="hover:border-primary transition-colors group"
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
                        <Badge variant="outline" className="text-xs capitalize">
                          {lt.tool}
                        </Badge>
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {lt.title[localeKey]}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {lt.description[localeKey]}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* SEO Footer */}
        <footer className="mt-12 pt-8 border-t text-center">
          <p className="text-muted-foreground">{t("footerText")}</p>
        </footer>
      </div>
    </>
  );
}
