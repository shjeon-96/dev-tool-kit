import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  tools,
  getToolsByCategory,
  getSortedCategories,
} from "@/entities/tool";
import { FavoriteRecentSection, BentoGrid } from "@/widgets/tools-list";
import { SITE_CONFIG } from "@/shared/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const toolCount = Object.keys(tools).length;

  const title = `All Developer Tools (${toolCount}+) | ${SITE_CONFIG.title}`;
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/tools`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/tools`,
      languages: {
        en: "/en/tools",
        ko: "/ko/tools",
        ja: "/ja/tools",
      },
    },
  };
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tSite = await getTranslations("site");
  const tSidebar = await getTranslations("sidebar");

  const groupedTools = getToolsByCategory(tools);
  const sortedCategories = getSortedCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DevToolkit</h1>
        <p className="text-muted-foreground">{tSite("description")}</p>
      </div>

      {/* Favorites & Recent Tools */}
      <FavoriteRecentSection />

      {sortedCategories.map((category) => {
        const toolSlugs = groupedTools.get(category.id) || [];
        if (toolSlugs.length === 0) return null;

        return (
          <section key={category.id} className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground border-b pb-2">
              {tSidebar(`categories.${category.labelKey}`)}
            </h2>
            <BentoGrid slugs={toolSlugs} />
          </section>
        );
      })}
    </div>
  );
}
