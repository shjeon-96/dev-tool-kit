"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { TIERS, formatPrice, type TierType } from "@/shared/lib/lemonsqueezy";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared/ui";
import { Switch } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export function PricingTiers() {
  const t = useTranslations("pricing");
  const router = useRouter();
  const { session } = useAuth();
  const [isYearly, setIsYearly] = useState(false);

  const tiers = Object.values(TIERS);

  const handleSubscribe = useCallback(
    async (tierId: TierType) => {
      if (tierId === "free") {
        // 무료 플랜은 회원가입으로 이동
        router.push("/auth/signup");
        return;
      }

      if (!session) {
        // 로그인하지 않은 경우 로그인 페이지로
        router.push("/auth/signin?redirect=/pricing");
        return;
      }

      // 체크아웃 API 호출
      const tier = TIERS[tierId];
      const variantId = isYearly ? tier.variantIdYearly : tier.variantIdMonthly;

      if (!variantId) {
        console.error("Variant ID not configured");
        return;
      }

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId }),
        });

        const data = await response.json();

        if (data.checkoutUrl) {
          // 외부 Lemon Squeezy checkout URL로 리다이렉트
          globalThis.location.assign(data.checkoutUrl);
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    },
    [router, session, isYearly],
  );

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span
          className={cn(
            "text-sm font-medium",
            !isYearly ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {t("billing.monthly")}
        </span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span
          className={cn(
            "text-sm font-medium",
            isYearly ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {t("billing.yearly")}
          <span className="ml-2 text-xs text-green-600 dark:text-green-400">
            {t("billing.savePercent", { percent: 17 })}
          </span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {tiers.map((tier) => {
          const price = isYearly ? tier.yearlyPrice / 12 : tier.monthlyPrice;
          const isPopular = tier.popular;

          return (
            <div
              key={tier.id}
              className={cn(
                "relative rounded-xl border p-6 flex flex-col",
                isPopular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border",
              )}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t("tier.popular")}
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-1">
                  {t(`tier.${tier.id}.name`)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`tier.${tier.id}.description`)}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">
                    {formatPrice(price)}
                  </span>
                  <span className="text-muted-foreground">
                    /{t("billing.perMonth")}
                  </span>
                </div>
                {isYearly && tier.yearlyPrice > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("billing.billedYearly", {
                      amount: formatPrice(tier.yearlyPrice),
                    })}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleSubscribe(tier.id)}
                variant={isPopular ? "default" : "outline"}
                className="w-full mb-6"
                size="lg"
              >
                {tier.id === "free" ? t("cta.getStarted") : t("cta.subscribe")}
              </Button>

              {/* Features List */}
              <ul className="space-y-3 flex-1">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{t(`tier.${tier.id}.features.${index}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table (Mobile Hidden) */}
      <div className="hidden lg:block mt-16">
        <h3 className="text-xl font-bold text-center mb-8">
          {t("comparison.title")}
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">
                  {t("comparison.feature")}
                </th>
                {tiers.map((tier) => (
                  <th key={tier.id} className="text-center p-4 font-medium">
                    {t(`tier.${tier.id}.name`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                "tools",
                "apiCalls",
                "bulkActions",
                "history",
                "ads",
                "apiAccess",
                "prioritySupport",
              ].map((feature) => (
                <tr key={feature}>
                  <td className="p-4 text-sm">
                    {t(`comparison.features.${feature}`)}
                  </td>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="text-center p-4">
                      <FeatureValue tierId={tier.id} feature={feature} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FeatureValue({
  tierId,
  feature,
}: {
  tierId: TierType;
  feature: string;
}) {
  const values: Record<string, Record<TierType, string | boolean>> = {
    tools: { free: "29", pro: "29+" },
    apiCalls: { free: "100/day", pro: "10K/mo" },
    bulkActions: { free: "1", pro: "100" },
    history: { free: "7d", pro: "∞" },
    ads: { free: true, pro: false },
    apiAccess: { free: false, pro: true },
    prioritySupport: { free: false, pro: true },
  };

  const value = values[feature]?.[tierId];

  if (typeof value === "boolean") {
    return value ? (
      <X className="h-4 w-4 text-muted-foreground mx-auto" />
    ) : (
      <Check className="h-4 w-4 text-green-500 mx-auto" />
    );
  }

  return <span className="text-sm">{value}</span>;
}
