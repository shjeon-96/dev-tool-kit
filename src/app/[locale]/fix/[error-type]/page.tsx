import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  ArrowRight,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  ExternalLink,
  Zap,
  HelpCircle,
} from "lucide-react";
import {
  errorFixes,
  errorCategories,
  type ErrorFixSlug,
} from "@/entities/error-fix";
import { tools } from "@/entities/tool";
import { BreadcrumbJsonLd, FaqJsonLd, HowToJsonLd } from "@/shared/ui";
import { AdUnit } from "@/widgets/ad-unit/ad-unit";
import { SITE_CONFIG, AD_SLOTS } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string; "error-type": string }>;
}

export function generateStaticParams() {
  const errorSlugs = Object.keys(errorFixes);
  return errorSlugs.map((slug) => ({ "error-type": slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, "error-type": errorType } = await params;
  const errorFix = errorFixes[errorType as ErrorFixSlug];

  if (!errorFix) {
    return {};
  }

  const title = `Fix: ${errorFix.errorMessage} - AI Code Error Solution`;
  const description = `${errorFix.description} Learn how to fix this common AI-generated code error with step-by-step solutions.`;

  return {
    title,
    description,
    keywords: errorFix.keywords,
    openGraph: {
      title,
      description,
      url: `/${locale}/fix/${errorType}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/fix/${errorType}`,
      languages: {
        en: `/en/fix/${errorType}`,
        ko: `/ko/fix/${errorType}`,
        ja: `/ja/fix/${errorType}`,
      },
    },
  };
}

export default async function ErrorFixPage({ params }: Props) {
  const { locale, "error-type": errorType } = await params;
  const errorFix = errorFixes[errorType as ErrorFixSlug];

  if (!errorFix) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("errorFix");

  const category = errorCategories[errorFix.category];
  const CategoryIcon = category.icon;
  const ErrorIcon = errorFix.icon;

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Fix Errors", url: `${SITE_CONFIG.url}/${locale}/fix` },
    {
      name: errorFix.errorMessage,
      url: `${SITE_CONFIG.url}/${locale}/fix/${errorType}`,
    },
  ];

  // HowTo steps for Schema
  const howToSteps = errorFix.fixSteps.map((step, index) => ({
    name: step.title,
    text: step.description,
    position: index + 1,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd
        faqs={errorFix.faq.map((f) => ({ q: f.question, a: f.answer }))}
      />
      <HowToJsonLd
        name={`How to fix: ${errorFix.errorMessage}`}
        description={errorFix.description}
        steps={howToSteps}
      />

      <article className="space-y-8">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CategoryIcon className={`h-4 w-4 ${category.color}`} />
            <span>{category.label}</span>
            <span>•</span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                errorFix.severity === "critical"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : errorFix.severity === "high"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    : errorFix.severity === "medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              {errorFix.severity}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                errorFix.severity === "critical"
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-muted"
              }`}
            >
              <ErrorIcon
                className={`h-7 w-7 ${
                  errorFix.severity === "critical"
                    ? "text-red-600 dark:text-red-400"
                    : ""
                }`}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {errorFix.title}
              </h1>
              <code className="mt-2 block rounded bg-destructive/10 px-2 py-1 text-sm text-destructive">
                {errorFix.errorMessage}
              </code>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            {errorFix.description}
          </p>
        </header>

        {/* AI Context Banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <div className="flex items-start gap-3">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="font-semibold text-blue-900 dark:text-blue-100">
                {t("whyAiGeneratesThis")}
              </h2>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                {errorFix.aiContext}
              </p>
            </div>
          </div>
        </div>

        {/* Cause */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold">
            <AlertCircle className="h-5 w-5 text-warning" />
            {t("cause")}
          </h2>
          <p className="text-muted-foreground">{errorFix.cause}</p>
        </section>

        {/* Ad: Above solution */}
        <AdUnit
          slot={AD_SLOTS.TOOL_RESULT}
          format="horizontal"
          className="my-6"
        />

        {/* Fix Steps */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Lightbulb className="h-5 w-5 text-warning" />
            {t("solutions")}
          </h2>

          <div className="space-y-6">
            {errorFix.fixSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-5"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold" itemProp="name">
                    {step.title}
                  </h3>
                </div>
                <p className="mb-4 text-muted-foreground" itemProp="text">
                  {step.description}
                </p>

                {step.code && (
                  <div className="space-y-3">
                    {step.code.before && (
                      <div>
                        <div className="mb-1 text-xs font-medium text-red-600 dark:text-red-400">
                          ❌ Before (Error)
                        </div>
                        <pre className="overflow-x-auto rounded-md bg-red-50 p-3 text-sm dark:bg-red-950/30">
                          <code>{step.code.before}</code>
                        </pre>
                      </div>
                    )}
                    <div>
                      <div className="mb-1 text-xs font-medium text-green-600 dark:text-green-400">
                        ✅ After (Fixed)
                      </div>
                      <pre className="overflow-x-auto rounded-md bg-green-50 p-3 text-sm dark:bg-green-950/30">
                        <code>{step.code.after}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        {errorFix.relatedTools.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <CheckCircle className="h-5 w-5 text-success" />
              {t("validateWithTools")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {errorFix.relatedTools.map((relatedTool) => {
                const tool = tools[relatedTool.slug];
                if (!tool) return null;

                return (
                  <Link
                    key={relatedTool.slug}
                    href={`/${locale}/tools/${relatedTool.slug}`}
                    className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted group-hover:bg-background">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 font-medium">
                        {tool.title}
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {relatedTool.reason}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Ad: Content bottom */}
        <AdUnit
          slot={AD_SLOTS.CONTENT_BOTTOM}
          format="rectangle"
          className="my-6"
        />

        {/* FAQ */}
        {errorFix.faq.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" />
              {t("faq")}
            </h2>
            <div
              className="space-y-4"
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              {errorFix.faq.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="font-medium" itemProp="name">
                    {faq.question}
                  </h3>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      className="mt-2 text-sm text-muted-foreground"
                      itemProp="text"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Errors */}
        {errorFix.relatedErrors.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold">{t("relatedErrors")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {errorFix.relatedErrors.map((slug) => {
                const related = errorFixes[slug];
                if (!related) return null;

                return (
                  <Link
                    key={slug}
                    href={`/${locale}/fix/${slug}`}
                    className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">
                        {related.title}
                      </div>
                      <code className="block truncate text-xs text-muted-foreground">
                        {related.errorMessage}
                      </code>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
