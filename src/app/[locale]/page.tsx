import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  tools,
  getToolsByCategory,
  getSortedCategories,
} from "@/entities/tool";
import { BentoGrid } from "@/widgets/tools-list";
import { SITE_CONFIG } from "@/shared/config";
import {
  Shield,
  Zap,
  Gift,
  Wifi,
  ArrowRight,
  Github,
  Sparkles,
} from "lucide-react";
import { Button } from "@/shared/ui";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const toolCount = Object.keys(tools).length;

  const title = `${SITE_CONFIG.title} - ${toolCount}+ Developer Tools`;
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
        ja: "/ja",
      },
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("landing");
  const tSidebar = await getTranslations("sidebar");
  const toolCount = Object.keys(tools).length;
  const groupedTools = getToolsByCategory(tools);
  const sortedCategories = getSortedCategories();

  const features = [
    {
      icon: Shield,
      titleKey: "features.privacy.title",
      descriptionKey: "features.privacy.description",
    },
    {
      icon: Zap,
      titleKey: "features.speed.title",
      descriptionKey: "features.speed.description",
    },
    {
      icon: Gift,
      titleKey: "features.free.title",
      descriptionKey: "features.free.description",
    },
    {
      icon: Wifi,
      titleKey: "features.offline.title",
      descriptionKey: "features.offline.description",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          {t("hero.badge")}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          {t("hero.title")}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link href={`/${locale}/tools`}>
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a
              href="https://github.com/jsh-me/dev-tool-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              {t("hero.ctaSecondary")}
            </a>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            {toolCount}+
          </div>
          <div className="text-sm text-muted-foreground">
            {t("stats.tools")}
          </div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            {sortedCategories.length}
          </div>
          <div className="text-sm text-muted-foreground">
            {t("stats.categories")}
          </div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-3xl md:text-4xl font-bold text-primary">3</div>
          <div className="text-sm text-muted-foreground">
            {t("stats.languages")}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools by Category Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("categories.title")}
          </h2>
          <Button asChild variant="ghost" className="gap-2">
            <Link href={`/${locale}/tools`}>
              {t("categories.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {sortedCategories.slice(0, 2).map((category) => {
          const toolSlugs = groupedTools.get(category.id) || [];
          if (toolSlugs.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4">
              <h3 className="text-lg font-semibold text-muted-foreground border-b pb-2">
                {tSidebar(`categories.${category.labelKey}`)}
              </h3>
              <BentoGrid slugs={toolSlugs.slice(0, 6)} />
            </div>
          );
        })}

        <div className="text-center pt-4">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href={`/${locale}/tools`}>
              {t("categories.viewAll")} ({toolCount} {t("stats.tools")})
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
