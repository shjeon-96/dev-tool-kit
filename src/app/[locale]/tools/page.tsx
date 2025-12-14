import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  tools,
  getToolsByCategory,
  getSortedCategories,
  type ToolSlug,
} from "@/entities/tool";
import { FavoriteRecentSection } from "@/widgets/tools-list";
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

  const t = await getTranslations("tools");
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {toolSlugs.map((slug) => {
                const tool = tools[slug];
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/tools/${slug}`}
                    className="group relative rounded-lg border p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                        <tool.icon className="h-6 w-6 transition-colors group-hover:text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {t(`${slug as ToolSlug}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {t(`${slug as ToolSlug}.description`)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
