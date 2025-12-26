import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Shield, Clock, Zap, CreditCard } from "lucide-react";
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

  const trustBadges = [
    { icon: Shield, key: "secure" },
    { icon: Clock, key: "cancel" },
    { icon: Zap, key: "instant" },
    { icon: CreditCard, key: "payment" },
  ];

  return (
    <div className="container max-w-6xl py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          {t("hero.badge")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("hero.description")}
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {trustBadges.map(({ icon: Icon, key }) => (
          <div
            key={key}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Icon className="h-4 w-4 text-success" />
            <span>{t(`trust.badges.${key}`)}</span>
          </div>
        ))}
      </div>

      {/* Pricing Tiers */}
      <PricingTiers />

      {/* Social Proof */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          {t("social.trusted")}
        </p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60">
          <span className="text-lg font-semibold">GitHub</span>
          <span className="text-lg font-semibold">Stack Overflow</span>
          <span className="text-lg font-semibold">Reddit</span>
          <span className="text-lg font-semibold">Dev.to</span>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t("faq.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border p-4 space-y-2">
              <h3 className="font-semibold">{t(`faq.q${i}`)}</h3>
              <p className="text-muted-foreground text-sm">{t(`faq.a${i}`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-16 text-center py-12 rounded-xl bg-muted/30 border">
        <h2 className="text-2xl font-bold mb-2">{t("cta.final.title")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("cta.final.description")}
        </p>
        <p className="text-sm text-muted-foreground">{t("trust.guarantee")}</p>
      </div>

      {/* Trust Footer */}
      <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
        <p>{t("trust.security")}</p>
        <p>{t("trust.privacy")}</p>
      </div>
    </div>
  );
}
