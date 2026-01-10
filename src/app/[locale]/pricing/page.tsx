import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Shield, Clock, Zap, CreditCard, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/shared/ui";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pricing" });
  const isKorean = locale === "ko";

  const trustBadges = [
    { icon: Shield, key: "secure" },
    { icon: Clock, key: "cancel" },
    { icon: Zap, key: "instant" },
    { icon: CreditCard, key: "payment" },
  ];

  const freeFeatures = isKorean
    ? ["모든 블로그 콘텐츠 접근", "기본 검색 기능", "이메일 뉴스레터"]
    : ["Access all blog content", "Basic search", "Email newsletter"];

  const proFeatures = isKorean
    ? [
        "모든 Free 기능 포함",
        "광고 없는 읽기 경험",
        "독점 프리미엄 콘텐츠",
        "조기 접근권",
        "우선 고객 지원",
      ]
    : [
        "All Free features",
        "Ad-free reading experience",
        "Exclusive premium content",
        "Early access to new articles",
        "Priority support",
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

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <p className="text-muted-foreground">
              {isKorean ? "시작하기 좋은 무료 플랜" : "Great for getting started"}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-bold">
              $0
              <span className="text-base font-normal text-muted-foreground">
                /{isKorean ? "월" : "month"}
              </span>
            </div>
            <ul className="space-y-3">
              {freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/${locale}/auth/signup`}>
                {isKorean ? "무료로 시작" : "Get Started Free"}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Pro Tier */}
        <Card className="relative border-primary">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              {isKorean ? "추천" : "Recommended"}
            </span>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <p className="text-muted-foreground">
              {isKorean ? "진정한 팬을 위한 플랜" : "For dedicated readers"}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-bold">
              $9
              <span className="text-base font-normal text-muted-foreground">
                /{isKorean ? "월" : "month"}
              </span>
            </div>
            <ul className="space-y-3">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" asChild>
              <Link href={`/${locale}/auth/signup?plan=pro`}>
                {isKorean ? "Pro 시작하기" : "Get Pro"}
              </Link>
            </Button>
          </CardContent>
        </Card>
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
