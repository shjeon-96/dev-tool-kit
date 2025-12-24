import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Zap } from "lucide-react";
import {
  errorFixes,
  errorCategories,
  getErrorsByCategory,
  getSortedCategories,
  type ErrorCategory,
} from "@/entities/error-fix";
import { BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = "Fix AI-Generated Code Errors | Common Error Solutions";
  const description =
    "Quick solutions for common errors in AI-generated code. Fix JSON parsing errors, JavaScript type errors, React hook violations, and more.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/fix`,
    },
    alternates: {
      canonical: `/${locale}/fix`,
      languages: {
        en: "/en/fix",
        ko: "/ko/fix",
        ja: "/ja/fix",
      },
    },
  };
}

export default async function FixIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("errorFix");
  const categories = getSortedCategories();

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Fix Errors", url: `${SITE_CONFIG.url}/${locale}/fix` },
  ];

  const totalErrors = Object.keys(errorFixes).length;

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="space-y-8">
        {/* Hero Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {t("title")}
              </h1>
              <p className="text-muted-foreground">
                {t("subtitle", { count: totalErrors })}
              </p>
            </div>
          </div>

          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("description")}
          </p>
        </header>

        {/* AI Context Banner */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-900 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {t("aiCodeBanner.title")}
              </h2>
              <p className="mt-1 text-blue-700 dark:text-blue-300">
                {t("aiCodeBanner.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Errors by Category */}
        <div className="space-y-8">
          {categories.map((categoryId) => {
            const category = errorCategories[categoryId as ErrorCategory];
            const errors = getErrorsByCategory(categoryId as ErrorCategory);
            const CategoryIcon = category.icon;

            return (
              <section key={categoryId}>
                <div className="mb-4 flex items-center gap-2">
                  <CategoryIcon className={`h-5 w-5 ${category.color}`} />
                  <h2 className="text-xl font-semibold">{category.label}</h2>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {errors.length}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {errors.map((error) => (
                    <Link
                      key={error.slug}
                      href={`/${locale}/fix/${error.slug}`}
                      className="group flex items-start gap-3 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/50"
                    >
                      <div
                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                          error.severity === "critical"
                            ? "bg-red-100 dark:bg-red-900/30"
                            : "bg-muted"
                        }`}
                      >
                        <error.icon
                          className={`h-4 w-4 ${
                            error.severity === "critical"
                              ? "text-red-600 dark:text-red-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{error.title}</span>
                          <span
                            className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                              error.severity === "critical"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : error.severity === "high"
                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {error.severity}
                          </span>
                        </div>
                        <code className="mt-1 block truncate text-xs text-muted-foreground">
                          {error.errorMessage}
                        </code>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
