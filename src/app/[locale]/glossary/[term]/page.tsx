import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Book, Code, Lightbulb, Link2, Wrench } from "lucide-react";
import {
  getGlossaryTerm,
  getGlossaryTermSlugs,
  getGlossaryTerm as getTerm,
  type GlossaryTermSlug,
} from "@/entities/glossary";
import { tools, type ToolSlug } from "@/entities/tool";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string; term: string }>;
}

export function generateStaticParams() {
  return getGlossaryTermSlugs().map((term) => ({ term }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, term: termSlug } = await params;
  const term = getGlossaryTerm(termSlug);

  if (!term) return {};

  const title = term.acronymFor
    ? `${term.term} (${term.acronymFor}) - Developer Glossary | Web Toolkit`
    : `${term.term} - Developer Glossary | Web Toolkit`;
  const description = term.shortDefinition;

  return {
    title,
    description,
    keywords: term.seoKeywords,
    openGraph: {
      title,
      description,
      url: `/${locale}/glossary/${termSlug}`,
    },
    alternates: {
      canonical: `/${locale}/glossary/${termSlug}`,
      languages: {
        en: `/en/glossary/${termSlug}`,
        ko: `/ko/glossary/${termSlug}`,
        ja: `/ja/glossary/${termSlug}`,
      },
    },
  };
}

const categoryLabels: Record<string, string> = {
  "data-formats": "Data Formats",
  security: "Security",
  encoding: "Encoding",
  web: "Web",
  programming: "Programming",
  standards: "Standards",
};

const categoryColors: Record<string, string> = {
  "data-formats":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  security: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  encoding:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  web: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  programming:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  standards: "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300",
};

export default async function GlossaryTermPage({ params }: Props) {
  const { locale, term: termSlug } = await params;
  const term = getGlossaryTerm(termSlug);

  if (!term) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("glossary");

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Glossary", url: `${SITE_CONFIG.url}/${locale}/glossary` },
    {
      name: term.term,
      url: `${SITE_CONFIG.url}/${locale}/glossary/${termSlug}`,
    },
  ];

  // Generate FAQ for schema
  const faqItems = [
    {
      q: `What is ${term.term}?`,
      a: term.shortDefinition,
    },
    {
      q: `What is ${term.term} used for?`,
      a: term.useCases.slice(0, 2).join(". ") + ".",
    },
  ];

  if (term.acronymFor) {
    faqItems.unshift({
      q: `What does ${term.term} stand for?`,
      a: `${term.term} stands for ${term.acronymFor}.`,
    });
  }

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd faqs={faqItems} />

      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[term.category]}`}
            >
              {categoryLabels[term.category]}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {term.term}
          </h1>

          {term.acronymFor && (
            <p className="text-xl text-muted-foreground">{term.acronymFor}</p>
          )}

          <p className="text-lg text-muted-foreground">
            {term.shortDefinition}
          </p>
        </header>

        {/* Full Definition */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Book className="h-5 w-5 text-primary" />
            {t("detail.definition")}
          </h2>
          <div className="rounded-lg border bg-muted/30 p-6">
            <p className="leading-relaxed text-foreground">
              {term.fullDefinition}
            </p>
          </div>
        </section>

        {/* Examples */}
        {term.examples.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Code className="h-5 w-5 text-primary" />
              {t("detail.examples")}
            </h2>
            <div className="space-y-3">
              {term.examples.map((example, i) => (
                <pre
                  key={i}
                  className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm"
                >
                  <code>{example}</code>
                </pre>
              ))}
            </div>
          </section>
        )}

        {/* Use Cases */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Lightbulb className="h-5 w-5 text-primary" />
            {t("detail.useCases")}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {term.useCases.map((useCase, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg border p-3"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related Tools */}
        {term.relatedTools.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Wrench className="h-5 w-5 text-primary" />
              {t("detail.relatedTools")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {term.relatedTools.map((toolSlug) => {
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
        )}

        {/* Related Terms */}
        {term.relatedTerms.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Link2 className="h-5 w-5 text-primary" />
              {t("detail.relatedTerms")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map((relatedSlug) => {
                const relatedTerm = getTerm(relatedSlug);
                if (!relatedTerm) return null;

                return (
                  <Link
                    key={relatedSlug}
                    href={`/${locale}/glossary/${relatedSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    {relatedTerm.term}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

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

        {/* Back to Glossary */}
        <div className="flex justify-center pt-4">
          <Link
            href={`/${locale}/glossary`}
            className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            <Book className="h-4 w-4" />
            {t("detail.backToGlossary")}
          </Link>
        </div>
      </div>
    </>
  );
}
