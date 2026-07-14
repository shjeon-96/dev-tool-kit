import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale, localizedPath, LOCALES } from "@/shared/config/site";
import {
  getToolDefinition,
  isToolSlug,
  TOOL_SLUGS,
} from "@/shared/config/tools";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import { ToolIcon } from "@/shared/ui/tool-icon";
import { ToolWorkbench } from "@/features/tools/tool-workbench";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    TOOL_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isToolSlug(slug)) return {};
  const copy = getDictionary(locale).tools[slug];
  return createPageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    path: `tools/${slug}`,
  });
}

export default async function ToolPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isToolSlug(slug)) notFound();
  const dictionary = getDictionary(locale);
  const copy = dictionary.tools[slug];
  const tool = getToolDefinition(slug);

  return (
    <main id="main-content" className="tool-page">
      <header className="shell tool-page-header">
        <Link className="back-link" href={localizedPath(locale, "tools")}>
          <ArrowLeft aria-hidden="true" size={16} />{" "}
          {dictionary.common.allTools}
        </Link>
        <div className={`tool-title-icon accent-${tool.accent}`}>
          <ToolIcon name={tool.icon} size={32} />
        </div>
        <p className="eyebrow">TOOL / {tool.index}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <span className="privacy-chip">
          <LockKeyhole aria-hidden="true" size={15} />
          {dictionary.common.browserOnly}
        </span>
      </header>

      <section className="shell workbench-wrap" aria-label={copy.title}>
        <ToolWorkbench slug={slug} copy={copy} common={dictionary.common} />
      </section>

      <article className="shell field-guide">
        <section className="guide-copy">
          <p className="eyebrow">FIELD NOTES</p>
          <h2>{copy.guideTitle}</h2>
          {copy.guide.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <aside className="procedure-card">
          <p className="eyebrow">PROCEDURE</p>
          <h2>{copy.stepsTitle}</h2>
          <ol>
            {copy.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </aside>
      </article>

      <section className="shell faq-section">
        <p className="eyebrow">REFERENCE</p>
        <h2>{copy.faqTitle}</h2>
        <div className="faq-list">
          {copy.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
