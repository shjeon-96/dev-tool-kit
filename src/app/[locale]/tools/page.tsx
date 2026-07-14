import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/config/site";
import { TOOLS } from "@/shared/config/tools";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import { ToolCard } from "@/widgets/tool-card";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createPageMetadata({
    locale,
    title: dictionary.toolsIndex.title,
    description: dictionary.toolsIndex.intro,
    path: "tools",
  });
}

export default async function ToolsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <main id="main-content" className="shell index-page">
      <header className="index-header">
        <p className="eyebrow">{dictionary.toolsIndex.eyebrow}</p>
        <h1>{dictionary.toolsIndex.title}</h1>
        <p>{dictionary.toolsIndex.intro}</p>
      </header>
      <div className="tool-grid">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.slug}
            tool={tool}
            locale={locale}
            dictionary={dictionary}
          />
        ))}
      </div>
    </main>
  );
}
