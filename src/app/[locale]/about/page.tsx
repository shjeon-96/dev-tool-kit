import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Shield,
  Zap,
  Globe,
  Code,
  Heart,
  Github,
  Mail,
  Wrench,
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "ko" ? "소개" : "About",
    description:
      locale === "ko"
        ? "Web Toolkit은 개발자를 위한 무료 온라인 도구 모음입니다. 29개 이상의 유틸리티를 설치 없이 브라우저에서 바로 사용하세요."
        : "Web Toolkit is a free online toolbox for developers. Use 29+ utilities directly in your browser without any installation.",
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
            ? "개발자를 위한 무료 온라인 도구 모음. 설치 없이 브라우저에서 바로 사용하세요."
            : "Free online toolbox for developers. Use directly in your browser without installation."}
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          value="29+"
          label={isKorean ? "개발자 도구" : "Developer Tools"}
        />
        <StatCard value="14" label={isKorean ? "치트시트" : "Cheatsheets"} />
        <StatCard value="3" label={isKorean ? "지원 언어" : "Languages"} />
        <StatCard value="100%" label={isKorean ? "무료" : "Free"} />
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isKorean ? "주요 특징" : "Key Features"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={Shield}
            title={
              isKorean ? "100% 프라이버시 보장" : "100% Privacy Guaranteed"
            }
            description={
              isKorean
                ? "모든 데이터 처리가 브라우저에서 이루어집니다. 귀하의 데이터는 절대 서버로 전송되지 않습니다."
                : "All data processing happens in your browser. Your data is never sent to our servers."
            }
          />
          <FeatureCard
            icon={Zap}
            title={isKorean ? "빠른 속도" : "Lightning Fast"}
            description={
              isKorean
                ? "WebAssembly 기술을 활용하여 네이티브에 가까운 성능을 제공합니다."
                : "Leveraging WebAssembly technology for near-native performance."
            }
          />
          <FeatureCard
            icon={Globe}
            title={isKorean ? "오프라인 지원" : "Offline Support"}
            description={
              isKorean
                ? "PWA 지원으로 인터넷 연결 없이도 도구를 사용할 수 있습니다."
                : "PWA support allows you to use tools even without internet connection."
            }
          />
          <FeatureCard
            icon={Code}
            title={isKorean ? "개발자 친화적" : "Developer Friendly"}
            description={
              isKorean
                ? "개발자의 일상적인 작업을 간소화하는 29개 이상의 전문 도구를 제공합니다."
                : "29+ professional tools designed to simplify developers' daily tasks."
            }
          />
        </div>
      </section>

      {/* Tools Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isKorean ? "제공 도구" : "Available Tools"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${locale}/tools/${tool.slug}`}
              className="p-3 rounded-lg border hover:bg-muted/50 transition-colors text-sm"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/30 rounded-xl p-8 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-semibold">
            {isKorean ? "우리의 미션" : "Our Mission"}
          </h2>
        </div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          {isKorean
            ? "모든 개발자가 필요한 도구에 쉽게 접근할 수 있어야 한다고 믿습니다. Web Toolkit은 개발 워크플로우를 간소화하고, 프라이버시를 보호하며, 완전히 무료로 제공됩니다."
            : "We believe every developer should have easy access to the tools they need. Web Toolkit simplifies your development workflow, protects your privacy, and is completely free to use."}
        </p>
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
            href="https://github.com/jsh-me"
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
        <Link href={`/${locale}/tools`} className="hover:text-foreground">
          {isKorean ? "모든 도구" : "All Tools"}
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

const tools = [
  { slug: "json-formatter", name: "JSON Formatter" },
  { slug: "jwt-decoder", name: "JWT Decoder" },
  { slug: "image-resizer", name: "Image Resizer" },
  { slug: "base64-converter", name: "Base64 Converter" },
  { slug: "hash-generator", name: "Hash Generator" },
  { slug: "qr-generator", name: "QR Code Generator" },
  { slug: "color-picker", name: "Color Picker" },
  { slug: "uuid-generator", name: "UUID Generator" },
  { slug: "url-encoder", name: "URL Encoder" },
  { slug: "regex-tester", name: "Regex Tester" },
  { slug: "markdown-preview", name: "Markdown Preview" },
  { slug: "diff-checker", name: "Diff Checker" },
  { slug: "sql-formatter", name: "SQL Formatter" },
  { slug: "cron-parser", name: "Cron Parser" },
  { slug: "video-compressor", name: "Video Compressor" },
  { slug: "svg-optimizer", name: "SVG Optimizer" },
];
