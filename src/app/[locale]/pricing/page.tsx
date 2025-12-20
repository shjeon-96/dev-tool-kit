import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PricingTiers } from "@/features/pricing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pricing");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  return (
    <div className="container max-w-6xl py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("hero.description")}
        </p>
      </div>

      {/* Pricing Tiers */}
      <PricingTiers />

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t("faq.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-semibold">{t(`faq.q${i}`)}</h3>
              <p className="text-muted-foreground text-sm">{t(`faq.a${i}`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>{t("trust.security")}</p>
        <p className="mt-2">{t("trust.guarantee")}</p>
      </div>
    </div>
  );
}
