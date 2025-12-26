import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conversions, type Conversion } from "@/entities/converter";
import { SITE_CONFIG } from "@/shared/config";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Online Converters - Free Data Format Conversion Tools",
    ko: "온라인 변환기 - 무료 데이터 포맷 변환 도구",
    ja: "オンライン変換ツール - 無料データ形式変換ツール",
  };

  const descriptions: Record<string, string> = {
    en: "Free online converters for JSON, YAML, CSV, Base64, colors, numbers, and more. Convert data formats instantly in your browser.",
    ko: "JSON, YAML, CSV, Base64, 색상, 숫자 등을 위한 무료 온라인 변환기. 브라우저에서 즉시 데이터 형식을 변환하세요.",
    ja: "JSON、YAML、CSV、Base64、色、数値など用の無料オンライン変換ツール。ブラウザで即座にデータ形式を変換。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/convert`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/convert`,
      languages: {
        en: `${SITE_CONFIG.url}/en/convert`,
        ko: `${SITE_CONFIG.url}/ko/convert`,
        ja: `${SITE_CONFIG.url}/ja/convert`,
      },
    },
  };
}

export default async function ConvertersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 카테고리별로 그룹화
  const groupedConversions = groupByCategory(conversions);

  const categoryLabels: Record<string, Record<string, string>> = {
    data: {
      en: "Data Format Converters",
      ko: "데이터 형식 변환",
      ja: "データ形式変換",
    },
    encoding: {
      en: "Encoding / Decoding",
      ko: "인코딩 / 디코딩",
      ja: "エンコード / デコード",
    },
    color: {
      en: "Color Converters",
      ko: "색상 변환",
      ja: "カラー変換",
    },
    number: {
      en: "Number Base Converters",
      ko: "진법 변환",
      ja: "基数変換",
    },
    hash: {
      en: "Hash Generators",
      ko: "해시 생성기",
      ja: "ハッシュ生成",
    },
    time: {
      en: "Time Converters",
      ko: "시간 변환",
      ja: "時間変換",
    },
    code: {
      en: "Code Converters",
      ko: "코드 변환",
      ja: "コード変換",
    },
  };

  const pageTitle: Record<string, string> = {
    en: "Online Converters",
    ko: "온라인 변환기",
    ja: "オンライン変換ツール",
  };

  const pageDescription: Record<string, string> = {
    en: "Free online tools to convert between different data formats. All processing happens in your browser - your data is never sent to any server.",
    ko: "다양한 데이터 형식 간 변환을 위한 무료 온라인 도구. 모든 처리는 브라우저에서 이루어지며, 데이터는 어떤 서버로도 전송되지 않습니다.",
    ja: "異なるデータ形式間の変換のための無料オンラインツール。すべての処理はブラウザで行われ、データはどのサーバーにも送信されません。",
  };

  return (
    <div className="container max-w-6xl mx-auto py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {pageTitle[locale] || pageTitle.en}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {pageDescription[locale] || pageDescription.en}
        </p>
      </div>

      {/* Converters by Category */}
      <div className="space-y-10">
        {Object.entries(groupedConversions).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {categoryLabels[category]?.[locale] ||
                categoryLabels[category]?.en ||
                category}
              <span className="text-sm font-normal text-muted-foreground">
                ({items.length})
              </span>
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((conversion) => (
                <ConverterCard
                  key={conversion.slug}
                  conversion={conversion}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* SEO Content */}
      <section className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">
          {locale === "ko"
            ? "무료 온라인 변환 도구"
            : locale === "ja"
              ? "無料オンライン変換ツール"
              : "Free Online Conversion Tools"}
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            {locale === "ko"
              ? "Web Toolkit의 변환 도구는 모두 무료이며, 브라우저에서 직접 실행됩니다. 데이터가 서버로 전송되지 않아 개인정보가 안전하게 보호됩니다. JSON, YAML, CSV 등의 데이터 형식 변환부터 Base64 인코딩, 색상 변환, 진법 변환까지 개발자에게 필요한 모든 변환 도구를 제공합니다."
              : locale === "ja"
                ? "Web Toolkitの変換ツールはすべて無料で、ブラウザで直接実行されます。データはサーバーに送信されないため、プライバシーは安全に保護されます。JSON、YAML、CSVなどのデータ形式変換からBase64エンコード、色変換、基数変換まで、開発者に必要なすべての変換ツールを提供します。"
                : "All conversion tools in Web Toolkit are free and run directly in your browser. Your data is never sent to any server, keeping your privacy protected. From data format conversions like JSON, YAML, and CSV to Base64 encoding, color conversions, and number base conversions - we provide all the conversion tools developers need."}
          </p>
        </div>
      </section>
    </div>
  );
}

// 카테고리별 그룹화
function groupByCategory(items: Conversion[]): Record<string, Conversion[]> {
  return items.reduce(
    (acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, Conversion[]>,
  );
}

// 변환기 카드 컴포넌트
function ConverterCard({
  conversion,
  locale,
}: {
  conversion: Conversion;
  locale: string;
}) {
  const title =
    conversion.title[locale as keyof typeof conversion.title] ||
    conversion.title.en;
  const description =
    conversion.description[locale as keyof typeof conversion.description] ||
    conversion.description.en;

  return (
    <Link
      href={`/${locale}/convert/${conversion.slug}`}
      className="group block p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2 mt-1" />
      </div>

      {/* Direction Badge */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            conversion.direction === "bidirectional"
              ? "bg-success/10 text-success"
              : "bg-info/10 text-info"
          }`}
        >
          {conversion.direction === "bidirectional"
            ? locale === "ko"
              ? "양방향"
              : locale === "ja"
                ? "双方向"
                : "Bidirectional"
            : locale === "ko"
              ? "단방향"
              : locale === "ja"
                ? "一方向"
                : "One-way"}
        </span>
      </div>
    </Link>
  );
}
