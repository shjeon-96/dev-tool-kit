import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Book, ArrowRight, Search } from "lucide-react";
import { getAllGlossaryTerms, type GlossaryTerm } from "@/entities/glossary";
import { BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    "Developer Glossary - Programming Terms & Definitions | Web Toolkit";
  const description =
    "Comprehensive glossary of developer terms: JSON, JWT, Base64, UUID, REST API, and more. Clear definitions with examples and related tools.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/glossary`,
    },
    alternates: {
      canonical: `/${locale}/glossary`,
      languages: {
        en: "/en/glossary",
        ko: "/ko/glossary",
        ja: "/ja/glossary",
      },
    },
  };
}

const categoryLabels: Record<GlossaryTerm["category"], string> = {
  "data-formats": "Data Formats",
  security: "Security",
  encoding: "Encoding",
  web: "Web",
  programming: "Programming",
  standards: "Standards",
};

const categoryColors: Record<GlossaryTerm["category"], string> = {
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

export default async function GlossaryIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("glossary");
  const terms = getAllGlossaryTerms();

  // Group terms by first letter
  const termsByLetter = terms.reduce(
    (acc, term) => {
      const letter = term.term[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    },
    {} as Record<string, GlossaryTerm[]>,
  );

  // Sort letters
  const sortedLetters = Object.keys(termsByLetter).sort();

  const breadcrumbItems = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Glossary", url: `${SITE_CONFIG.url}/${locale}/glossary` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="space-y-8">
        {/* Hero Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <Book className="h-3.5 w-3.5" />
              {terms.length} {t("index.terms")}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            {t("index.title")}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("index.description")}
          </p>
        </header>

        {/* Quick Navigation */}
        <nav className="flex flex-wrap gap-2">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors hover:bg-muted"
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* Category Legend */}
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <span
              key={key}
              className={`rounded-full px-2.5 py-0.5 ${categoryColors[key as GlossaryTerm["category"]]}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Terms by Letter */}
        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <section key={letter} id={letter}>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {letter}
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {termsByLetter[letter]
                  .sort((a, b) => a.term.localeCompare(b.term))
                  .map((term) => (
                    <Link
                      key={term.slug}
                      href={`/${locale}/glossary/${term.slug}`}
                      className="group flex flex-col rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[term.category]}`}
                        >
                          {categoryLabels[term.category]}
                        </span>
                      </div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {term.term}
                        {term.acronymFor && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            ({term.acronymFor})
                          </span>
                        )}
                      </h3>
                      <p className="flex-1 text-sm text-muted-foreground line-clamp-2">
                        {term.shortDefinition}
                      </p>
                      <div className="mt-3 flex items-center text-sm font-medium text-primary">
                        {t("index.readMore")}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>

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
