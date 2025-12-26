import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
import {
  getUseCase,
  getUseCaseSlugs,
  type UseCaseSlug,
} from "@/entities/use-case";
import { tools, type ToolSlug } from "@/entities/tool";
import { BreadcrumbJsonLd, HowToJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = getUseCaseSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const useCase = getUseCase(slug);

  if (!useCase) return {};

  const t = await getTranslations({ locale, namespace: "useCases" });
  const title = t(`${slug as UseCaseSlug}.title`);
  const description = t(`${slug as UseCaseSlug}.description`);

  return {
    title,
    description,
    keywords: useCase.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/use-cases/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/use-cases/${slug}`,
        ]),
      ),
    },
  };
}

export default async function UseCasePage({ params }: Props) {
  const { locale, slug } = await params;
  const useCase = getUseCase(slug);

  if (!useCase) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("useCases");
  const tTools = await getTranslations("tools");

  const tool = tools[useCase.toolSlug];
  const Icon = tool.icon;

  const title = t(`${slug as UseCaseSlug}.title`);
  const description = t(`${slug as UseCaseSlug}.description`);
  const pageUrl = `${SITE_CONFIG.url}/${locale}/use-cases/${slug}`;

  // Get steps from translations
  let steps: { name: string; text: string }[] = [];
  try {
    const rawSteps = t.raw(`${slug as UseCaseSlug}.steps`);
    if (Array.isArray(rawSteps)) {
      steps = rawSteps as { name: string; text: string }[];
    }
  } catch {
    // Steps not available
  }

  // Get benefits from translations
  let benefits: string[] = [];
  try {
    const rawBenefits = t.raw(`${slug as UseCaseSlug}.benefits`);
    if (Array.isArray(rawBenefits)) {
      benefits = rawBenefits as string[];
    }
  } catch {
    // Benefits not available
  }

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: t("title"), url: `${SITE_CONFIG.url}/${locale}/use-cases` },
    { name: title, url: pageUrl },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {steps.length > 0 && (
        <HowToJsonLd
          name={title}
          description={description}
          steps={steps.map((s) => ({ name: s.name, text: s.text }))}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href={`/${locale}/use-cases`}
              className="hover:text-foreground"
            >
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
          href={`/${locale}/tools/${useCase.toolSlug}`}
          className="group flex items-center gap-4 rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {tTools(`${useCase.toolSlug}.title`)}
            </h2>
            <p className="text-muted-foreground">
              {tTools(`${useCase.toolSlug}.description`)}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>

        {/* Steps */}
        {steps.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {t("howTo")}
            </h2>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{step.name}</h3>
                    <p className="text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {t("benefits")}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground bg-green-50 dark:bg-green-950/20 rounded-lg p-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-lg bg-primary/5 p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">{t("ctaTitle")}</h2>
          <Link
            href={`/${locale}/tools/${useCase.toolSlug}`}
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
