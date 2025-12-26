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
import { HeroSection } from "@/widgets/hero-section";
import { FAQSection } from "@/widgets/faq-section";
import { SITE_CONFIG } from "@/shared/config";
import { Shield, Zap, Gift, Wifi, ArrowRight } from "lucide-react";
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
      <HeroSection
        locale={locale}
        badge={t("hero.badge")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        cta={t("hero.cta")}
        ctaSecondary={t("hero.ctaSecondary")}
      />

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
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

      {/* Why Web Toolkit Section */}
      <section className="space-y-6 py-8 px-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {t("why.title")}
        </h2>
        <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground">
          <p className="text-lg leading-relaxed">{t("why.paragraph1")}</p>
          <p className="leading-relaxed">{t("why.paragraph2")}</p>
          <p className="leading-relaxed">{t("why.paragraph3")}</p>
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

        {sortedCategories.map((category) => {
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

      {/* Use Cases Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {t("useCases.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-3">
              {t("useCases.frontend.title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("useCases.frontend.description")}
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-3">
              {t("useCases.backend.title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("useCases.backend.description")}
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-3">
              {t("useCases.devops.title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("useCases.devops.description")}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {t("howItWorks.title")}
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {t("howItWorks.step1.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("howItWorks.step1.description")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {t("howItWorks.step2.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("howItWorks.step2.description")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {t("howItWorks.step3.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <FAQSection
        title={t("faq.title")}
        items={[1, 2, 3, 4, 5].map((i) => ({
          question: t(`faq.q${i}`),
          answer: t(`faq.a${i}`),
        }))}
      />

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 px-6 rounded-2xl bg-primary/5 border border-primary/20">
        <h2 className="text-2xl md:text-3xl font-bold">{t("cta.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("cta.description")}
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link href={`/${locale}/tools`}>
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
