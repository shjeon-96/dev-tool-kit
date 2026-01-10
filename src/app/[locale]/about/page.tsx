import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Sparkles,
  Globe,
  Clock,
  TrendingUp,
  Heart,
  Github,
  Mail,
  Zap,
  Users,
} from "lucide-react";
import { routing } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "ko" ? "소개" : "About";
  const description =
    locale === "ko"
      ? "Web Toolkit은 최신 트렌드와 유용한 정보를 빠르게 전달하는 트렌드 블로그입니다."
      : "Web Toolkit is a trend blog delivering the latest trends and useful insights.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/about`]),
      ),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isKorean = locale === "ko";

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {isKorean ? "Web Toolkit 소개" : "About Web Toolkit"}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {isKorean
            ? "최신 트렌드와 유용한 정보를 빠르게 전달하는 트렌드 블로그"
            : "A trend blog delivering the latest trends and useful insights"}
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard value="6" label={isKorean ? "카테고리" : "Categories"} />
        <StatCard
          value="24/7"
          label={isKorean ? "자동 업데이트" : "Auto Updates"}
        />
        <StatCard value="2" label={isKorean ? "지원 언어" : "Languages"} />
        <StatCard value="100%" label={isKorean ? "무료" : "Free"} />
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isKorean ? "주요 특징" : "Key Features"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={TrendingUp}
            title={isKorean ? "실시간 트렌드" : "Real-time Trends"}
            description={
              isKorean
                ? "Google Trends, Reddit, 뉴스 등 다양한 소스에서 실시간으로 트렌드를 수집합니다."
                : "We collect trends in real-time from various sources including Google Trends, Reddit, and news."
            }
          />
          <FeatureCard
            icon={Zap}
            title={isKorean ? "AI 기반 콘텐츠" : "AI-Powered Content"}
            description={
              isKorean
                ? "최신 AI 기술을 활용하여 트렌드에 대한 깊이 있는 인사이트를 제공합니다."
                : "Using cutting-edge AI technology to provide in-depth insights on trends."
            }
          />
          <FeatureCard
            icon={Globe}
            title={isKorean ? "다국어 지원" : "Multilingual Support"}
            description={
              isKorean
                ? "한국어와 영어로 콘텐츠를 제공하여 더 많은 독자에게 다가갑니다."
                : "Content available in Korean and English to reach more readers."
            }
          />
          <FeatureCard
            icon={Clock}
            title={isKorean ? "자동 발행" : "Auto Publishing"}
            description={
              isKorean
                ? "24시간 자동으로 새로운 트렌드를 감지하고 기사를 발행합니다."
                : "24/7 automatic trend detection and article publishing."
            }
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isKorean ? "카테고리" : "Categories"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/${category.id}`}
              className="p-4 rounded-lg border hover:bg-muted/50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{category.emoji}</div>
              <div className="font-medium">
                {isKorean ? category.labelKo : category.labelEn}
              </div>
              <div className="text-sm text-muted-foreground">
                {isKorean ? category.descKo : category.descEn}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/30 rounded-xl p-8 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-destructive" />
          <h2 className="text-2xl font-semibold">
            {isKorean ? "우리의 미션" : "Our Mission"}
          </h2>
        </div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          {isKorean
            ? "빠르게 변화하는 세상에서 중요한 트렌드를 놓치지 않도록 도와드립니다. Web Toolkit은 신뢰할 수 있는 인사이트를 무료로 제공하며, 모든 사람이 정보에 쉽게 접근할 수 있도록 합니다."
            : "We help you stay on top of important trends in a fast-changing world. Web Toolkit provides reliable insights for free, making information accessible to everyone."}
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isKorean ? "작동 방식" : "How It Works"}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">
              {isKorean ? "1. 트렌드 감지" : "1. Detect Trends"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? "다양한 소스에서 실시간으로 트렌드를 수집합니다"
                : "Collect trends from various sources in real-time"}
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">
              {isKorean ? "2. 콘텐츠 생성" : "2. Generate Content"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? "AI가 트렌드에 대한 깊이 있는 기사를 작성합니다"
                : "AI writes in-depth articles about the trends"}
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">
              {isKorean ? "3. 자동 발행" : "3. Auto Publish"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? "완성된 기사가 자동으로 발행됩니다"
                : "Completed articles are published automatically"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isKorean ? "연락처" : "Contact"}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="mailto:tmdgns893758@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
            tmdgns893758@gmail.com
          </a>
          <a
            href="https://github.com/shjeon-96"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
        </div>
      </section>

      {/* Footer Links */}
      <section className="border-t pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <Link href={`/${locale}/privacy`} className="hover:text-foreground">
          {isKorean ? "개인정보처리방침" : "Privacy Policy"}
        </Link>
        <Link href={`/${locale}/terms`} className="hover:text-foreground">
          {isKorean ? "이용약관" : "Terms of Service"}
        </Link>
        <Link href={`/${locale}/blog`} className="hover:text-foreground">
          {isKorean ? "블로그" : "Blog"}
        </Link>
      </section>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-muted/30">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

const categories = [
  {
    id: "tech",
    emoji: "💻",
    labelEn: "Tech",
    labelKo: "테크",
    descEn: "Technology & Innovation",
    descKo: "기술과 혁신",
  },
  {
    id: "business",
    emoji: "💼",
    labelEn: "Business",
    labelKo: "비즈니스",
    descEn: "Markets & Finance",
    descKo: "시장과 금융",
  },
  {
    id: "lifestyle",
    emoji: "🌟",
    labelEn: "Lifestyle",
    labelKo: "라이프스타일",
    descEn: "Living & Wellness",
    descKo: "생활과 웰빙",
  },
  {
    id: "entertainment",
    emoji: "🎬",
    labelEn: "Entertainment",
    labelKo: "엔터테인먼트",
    descEn: "Movies & Culture",
    descKo: "영화와 문화",
  },
  {
    id: "trending",
    emoji: "🔥",
    labelEn: "Trending",
    labelKo: "트렌딩",
    descEn: "What's Hot Now",
    descKo: "지금 뜨는 이슈",
  },
  {
    id: "news",
    emoji: "📰",
    labelEn: "News",
    labelKo: "뉴스",
    descEn: "Breaking News",
    descKo: "속보와 시사",
  },
];
