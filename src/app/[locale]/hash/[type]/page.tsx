import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Hash,
  ExternalLink,
  Shield,
  AlertTriangle,
  Clock,
  Code,
  BarChart3,
  BookOpen,
  CheckCircle2,
  XCircle,
  Cpu,
  History,
  Target,
  Building2,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { HashTypeTool } from "@/features/hash-type";
import {
  getAllHashTypeSlugs,
  getHashTypeBySlug,
  getRelatedHashTypes,
} from "@/entities/hash-type";
import { getUniqueHashContent } from "@/entities/hash-type";
import type { LocaleKey, UniqueHashContent } from "@/entities/hash-type";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  FaqJsonLd,
} from "@/shared/ui";

interface PageProps {
  params: Promise<{
    locale: string;
    type: string;
  }>;
}

// Safe locale fallback helper - returns valid LocaleKey or 'en'
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en"; // Fallback for es, pt, de, and any other locale
}

// 정적 파라미터 생성 - 모든 해시 타입 페이지 사전 생성
export async function generateStaticParams() {
  const slugs = getAllHashTypeSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, type: slug })),
  );
}

// 메타데이터 생성 - SEO 최적화
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, type: typeSlug } = await params;
  const hashType = getHashTypeBySlug(typeSlug);

  if (!hashType) {
    return {
      title: "Hash Type Not Found",
    };
  }

  const localeKey = getSafeLocaleKey(locale);
  const title = hashType.title[localeKey];
  const description = hashType.description[localeKey];
  const keywords = hashType.keywords[localeKey];

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords: [...keywords, "hash", "generator", "online", "free"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/hash/${typeSlug}`,
        ]),
      ),
    },
  };
}

// 보안 레벨 색상 및 라벨
function getSecurityLevelInfo(
  level: UniqueHashContent["security"]["level"],
  locale: LocaleKey,
) {
  const labels = {
    broken: { en: "Broken", ko: "취약", ja: "破損" },
    weak: { en: "Weak", ko: "약함", ja: "弱い" },
    deprecated: { en: "Deprecated", ko: "권장되지 않음", ja: "非推奨" },
    secure: { en: "Secure", ko: "안전", ja: "安全" },
    recommended: { en: "Recommended", ko: "권장", ja: "推奨" },
  };

  const colors = {
    broken: "bg-destructive/20 text-destructive border-destructive/30",
    weak: "bg-warning/20 text-warning border-warning/30",
    deprecated: "bg-warning/20 text-warning border-warning/30",
    secure: "bg-success/20 text-success border-success/30",
    recommended: "bg-success/20 text-success border-success/30",
  };

  return {
    label: labels[level][locale],
    color: colors[level],
  };
}

// 취약점 심각도 색상
function getSeverityColor(severity: string) {
  const colors: Record<string, string> = {
    critical: "bg-destructive/20 text-destructive",
    high: "bg-warning/20 text-warning",
    medium: "bg-warning/20 text-warning",
    low: "bg-info/20 text-info",
    informational: "bg-muted text-muted-foreground",
  };
  return colors[severity] || colors.informational;
}

export default async function HashTypePage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const hashType = getHashTypeBySlug(typeSlug);

  if (!hashType) {
    notFound();
  }

  const localeKey = getSafeLocaleKey(locale);
  const title = hashType.title[localeKey];
  const description = hashType.description[localeKey];

  // 고유 콘텐츠 (Thin Content 해결)
  const uniqueContent = getUniqueHashContent(typeSlug);
  const hasUniqueContent = !!uniqueContent;

  const relatedTypes = getRelatedHashTypes(typeSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "해시 도구"
          : locale === "ja"
            ? "ハッシュツール"
            : "Hash Tools",
      url: `${SITE_CONFIG.url}/${locale}/tools/hash-generator`,
    },
    {
      name: hashType.algorithm,
      url: `${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`,
    },
  ];

  // FAQ 생성
  const faqs =
    locale === "ko"
      ? [
          {
            q: `${hashType.algorithm} 해시란 무엇인가요?`,
            a: description,
          },
          {
            q: `${hashType.algorithm}은 안전한가요?`,
            a: hashType.isSecure
              ? `네, ${hashType.algorithm}은 현재 암호화 용도로 안전하게 사용할 수 있습니다.`
              : `${hashType.algorithm}은 보안 목적으로는 권장되지 않습니다. 체크섬이나 비보안 용도로만 사용하세요.`,
          },
          {
            q: "무료로 사용할 수 있나요?",
            a: "네, 완전히 무료입니다. 회원가입 없이 무제한으로 사용할 수 있습니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `${hashType.algorithm}ハッシュとは何ですか？`,
              a: description,
            },
            {
              q: `${hashType.algorithm}は安全ですか？`,
              a: hashType.isSecure
                ? `はい、${hashType.algorithm}は現在、暗号用途で安全に使用できます。`
                : `${hashType.algorithm}はセキュリティ目的では推奨されません。チェックサムや非セキュリティ用途にのみ使用してください。`,
            },
            {
              q: "無料で使用できますか？",
              a: "はい、完全に無料です。登録なしで無制限に使用できます。",
            },
          ]
        : [
            {
              q: `What is ${hashType.algorithm} hash?`,
              a: description,
            },
            {
              q: `Is ${hashType.algorithm} secure?`,
              a: hashType.isSecure
                ? `Yes, ${hashType.algorithm} is currently secure for cryptographic purposes.`
                : `${hashType.algorithm} is not recommended for security purposes. Use it only for checksums or non-security applications.`,
            },
            {
              q: "Is this tool free to use?",
              a: "Yes, it's completely free. No signup required and unlimited usage.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={title}
        description={description}
        url={`${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`}
        applicationCategory="UtilitiesApplication"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="container max-w-4xl mx-auto py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href={`/${locale}`} className="hover:text-foreground">
            {locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/tools`} className="hover:text-foreground">
            {locale === "ko" ? "도구" : locale === "ja" ? "ツール" : "Tools"}
          </Link>
          <span>/</span>
          <span className="text-foreground">{hashType.algorithm}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <Hash className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            {/* Security Badge */}
            {hasUniqueContent ? (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getSecurityLevelInfo(uniqueContent.security.level, localeKey).color}`}
              >
                {
                  getSecurityLevelInfo(uniqueContent.security.level, localeKey)
                    .label
                }
              </span>
            ) : hashType.isSecure ? (
              <Shield className="h-5 w-5 text-success" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-warning" />
            )}
          </div>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/${locale}/tools/hash-generator`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? "모든 해시 도구"
                  : locale === "ja"
                    ? "すべてのハッシュツール"
                    : "All Hash Tools"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Hash Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <HashTypeTool hashType={hashType} locale={locale} />
        </div>

        {/* ========================================
            고유 콘텐츠 섹션 (Thin Content 해결)
            Unique content sections for reducing similarity
           ======================================== */}
        {hasUniqueContent && (
          <div className="space-y-8">
            {/* Technical Specifications */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "기술 사양"
                  : locale === "ja"
                    ? "技術仕様"
                    : "Technical Specifications"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {locale === "ko"
                      ? "출력 길이"
                      : locale === "ja"
                        ? "出力長"
                        : "Output Length"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.technicalSpecs.outputLength}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {locale === "ko"
                      ? "블록 크기"
                      : locale === "ja"
                        ? "ブロックサイズ"
                        : "Block Size"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.technicalSpecs.blockSize}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {locale === "ko"
                      ? "라운드 수"
                      : locale === "ja"
                        ? "ラウンド数"
                        : "Rounds"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.technicalSpecs.rounds}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {locale === "ko"
                      ? "구조"
                      : locale === "ja"
                        ? "構造"
                        : "Structure"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.technicalSpecs.structure}
                  </p>
                </div>
              </div>
            </section>

            {/* Security Analysis */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "보안 분석"
                  : locale === "ja"
                    ? "セキュリティ分析"
                    : "Security Analysis"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "충돌 저항성"
                      : locale === "ja"
                        ? "衝突耐性"
                        : "Collision Resistance"}
                  </span>
                  <p className="text-sm mt-1">
                    {uniqueContent.security.collisionResistance}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "역상 저항성"
                      : locale === "ja"
                        ? "原像耐性"
                        : "Preimage Resistance"}
                  </span>
                  <p className="text-sm mt-1">
                    {uniqueContent.security.preimageResistance}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "제2 역상 저항성"
                      : locale === "ja"
                        ? "第二原像耐性"
                        : "Second Preimage Resistance"}
                  </span>
                  <p className="text-sm mt-1">
                    {uniqueContent.security.secondPreimageResistance}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "양자 저항성"
                      : locale === "ja"
                        ? "量子耐性"
                        : "Quantum Resistance"}
                  </span>
                  <p className="text-sm mt-1">
                    {uniqueContent.security.quantumResistance}
                  </p>
                </div>
              </div>
            </section>

            {/* History Timeline */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "역사"
                  : locale === "ja"
                    ? "歴史"
                    : "History"}
              </h2>
              <div className="mb-4 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      {locale === "ko"
                        ? "생성 연도"
                        : locale === "ja"
                          ? "作成年"
                          : "Created"}
                    </span>
                    <p className="font-semibold">
                      {uniqueContent.history.createdYear}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {locale === "ko"
                        ? "개발자"
                        : locale === "ja"
                          ? "開発者"
                          : "Creator"}
                    </span>
                    <p className="font-semibold">
                      {uniqueContent.history.creator}
                    </p>
                  </div>
                  {uniqueContent.history.organization && (
                    <div>
                      <span className="text-muted-foreground">
                        {locale === "ko"
                          ? "조직"
                          : locale === "ja"
                            ? "組織"
                            : "Organization"}
                      </span>
                      <p className="font-semibold">
                        {uniqueContent.history.organization}
                      </p>
                    </div>
                  )}
                  {uniqueContent.history.standardization && (
                    <div>
                      <span className="text-muted-foreground">
                        {locale === "ko"
                          ? "표준화"
                          : locale === "ja"
                            ? "標準化"
                            : "Standard"}
                      </span>
                      <p className="font-semibold">
                        {uniqueContent.history.standardization}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Timeline */}
              <div className="relative pl-4 border-l-2 border-muted space-y-4">
                {uniqueContent.history.timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[21px] w-3 h-3 bg-primary rounded-full" />
                    <div className="text-sm">
                      <span className="font-semibold text-primary">
                        {item.year}
                      </span>
                      <p className="text-muted-foreground mt-1">
                        {item.event[localeKey]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Vulnerabilities */}
            {uniqueContent.vulnerabilities.length > 0 && (
              <section className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  {locale === "ko"
                    ? "알려진 취약점"
                    : locale === "ja"
                      ? "既知の脆弱性"
                      : "Known Vulnerabilities"}
                </h2>
                <div className="space-y-3">
                  {uniqueContent.vulnerabilities.map((vuln, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-background"
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${getSeverityColor(vuln.severity)}`}
                        >
                          {vuln.severity.toUpperCase()}
                        </span>
                        <span className="font-semibold">{vuln.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({vuln.year})
                        </span>
                        {vuln.cve && (
                          <span className="text-xs text-muted-foreground font-mono">
                            {vuln.cve}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vuln.description[localeKey]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Real World Use Cases */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "실제 사용 사례"
                  : locale === "ja"
                    ? "実際の使用例"
                    : "Real World Use Cases"}
              </h2>
              <div className="space-y-4">
                {uniqueContent.realWorldUseCases.map((useCase, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{useCase.industry}</span>
                      {useCase.company && (
                        <span className="text-sm text-muted-foreground">
                          • {useCase.company}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-2">{useCase.useCase[localeKey]}</p>
                    <p className="text-xs text-muted-foreground italic">
                      {locale === "ko"
                        ? "이 해시를 사용하는 이유: "
                        : locale === "ja"
                          ? "このハッシュを使用する理由: "
                          : "Why this hash: "}
                      {useCase.whyThisHash[localeKey]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Code Examples */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "코드 예제"
                  : locale === "ja"
                    ? "コード例"
                    : "Code Examples"}
              </h2>
              <div className="space-y-4">
                {uniqueContent.codeExamples.map((example, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-muted flex items-center justify-between">
                      <span className="font-semibold text-sm">
                        {example.language}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {example.title[localeKey]}
                      </span>
                    </div>
                    <pre className="p-4 bg-zinc-950 text-zinc-50 overflow-x-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                    <div className="px-4 py-2 bg-muted/50 text-sm text-muted-foreground">
                      {example.explanation[localeKey]}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "다른 해시와 비교"
                  : locale === "ja"
                    ? "他のハッシュとの比較"
                    : "Comparison with Other Hashes"}
              </h2>
              <div className="space-y-3 mb-6">
                {uniqueContent.comparison.vsOthers.map((comp, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <span className="font-semibold text-primary">
                      vs {comp.hash}
                    </span>
                    <p className="text-sm mt-1">{comp.comparison[localeKey]}</p>
                  </div>
                ))}
              </div>

              {/* When to Use / Not Use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg border-success/30 bg-success/5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    {locale === "ko"
                      ? "사용하면 좋은 경우"
                      : locale === "ja"
                        ? "使用する場合"
                        : "When to Use"}
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {uniqueContent.comparison.whenToUse[localeKey].map(
                      (item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-success mt-0.5">✓</span>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="p-4 border rounded-lg border-destructive/30 bg-destructive/5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    {locale === "ko"
                      ? "사용하지 말아야 할 경우"
                      : locale === "ja"
                        ? "使用しない場合"
                        : "When NOT to Use"}
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {uniqueContent.comparison.whenNotToUse[localeKey].map(
                      (item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5">✗</span>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Performance */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "성능"
                  : locale === "ja"
                    ? "パフォーマンス"
                    : "Performance"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "처리 속도"
                      : locale === "ja"
                        ? "処理速度"
                        : "Speed"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.performance.speedMBps}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    CPU Cycles
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.performance.cpuCycles}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "메모리 사용량"
                      : locale === "ja"
                        ? "メモリ使用量"
                        : "Memory"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.performance.memoryUsage}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "병렬화"
                      : locale === "ja"
                        ? "並列化"
                        : "Parallelizable"}
                  </span>
                  <p className="font-mono text-sm mt-1">
                    {uniqueContent.performance.parallelizable
                      ? locale === "ko"
                        ? "가능"
                        : locale === "ja"
                          ? "可能"
                          : "Yes"
                      : locale === "ko"
                        ? "불가"
                        : locale === "ja"
                          ? "不可"
                          : "No"}
                  </p>
                </div>
              </div>
              {uniqueContent.performance.hardwareAcceleration.length > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    {locale === "ko"
                      ? "하드웨어 가속"
                      : locale === "ja"
                        ? "ハードウェアアクセラレーション"
                        : "Hardware Acceleration"}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {uniqueContent.performance.hardwareAcceleration.map(
                      (hw, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {hw}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* References */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {locale === "ko"
                  ? "참고 문헌"
                  : locale === "ja"
                    ? "参考文献"
                    : "References"}
              </h2>
              <div className="space-y-2">
                {uniqueContent.references.map((ref, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                  >
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                      {ref.type}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{ref.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {ref.identifier}
                      </p>
                    </div>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================================
            기본 콘텐츠 (고유 콘텐츠가 없는 경우)
            Default content for hash types without unique content
           ======================================== */}
        {!hasUniqueContent && (
          <section className="space-y-6 border-t pt-8">
            {/* Use Cases */}
            {hashType.useCases && (
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  {locale === "ko"
                    ? "사용 사례"
                    : locale === "ja"
                      ? "使用例"
                      : "Use Cases"}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {(hashType.useCases[localeKey] || hashType.useCases.en).map(
                    (useCase, index) => (
                      <li key={index}>{useCase}</li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Technical Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "기술 사양"
                  : locale === "ja"
                    ? "技術仕様"
                    : "Technical Specifications"}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 rounded p-3">
                  <div className="text-muted-foreground mb-1">
                    {locale === "ko"
                      ? "알고리즘"
                      : locale === "ja"
                        ? "アルゴリズム"
                        : "Algorithm"}
                  </div>
                  <div className="font-mono font-medium">
                    {hashType.algorithm}
                  </div>
                </div>
                {hashType.outputLength && (
                  <div className="bg-muted/50 rounded p-3">
                    <div className="text-muted-foreground mb-1">
                      {locale === "ko"
                        ? "출력 길이"
                        : locale === "ja"
                          ? "出力長"
                          : "Output Length"}
                    </div>
                    <div className="font-mono font-medium">
                      {hashType.outputLength} bits ({hashType.outputLength / 4}{" "}
                      hex chars)
                    </div>
                  </div>
                )}
                <div className="bg-muted/50 rounded p-3">
                  <div className="text-muted-foreground mb-1">
                    {locale === "ko"
                      ? "보안 상태"
                      : locale === "ja"
                        ? "セキュリティ状態"
                        : "Security Status"}
                  </div>
                  <div
                    className={`font-medium ${hashType.isSecure ? "text-success" : "text-warning"}`}
                  >
                    {hashType.isSecure
                      ? locale === "ko"
                        ? "안전"
                        : locale === "ja"
                          ? "安全"
                          : "Secure"
                      : locale === "ko"
                        ? "비권장"
                        : locale === "ja"
                          ? "非推奨"
                          : "Not Recommended"}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "특징"
                  : locale === "ja"
                    ? "特徴"
                    : "Features"}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  {locale === "ko"
                    ? "100% 클라이언트 사이드 - 데이터가 서버로 전송되지 않습니다"
                    : locale === "ja"
                      ? "100%クライアントサイド - データはサーバーに送信されません"
                      : "100% client-side - your data never leaves your browser"}
                </li>
                <li>
                  {locale === "ko"
                    ? "무료 & 무제한 - 회원가입 없이 무제한 사용"
                    : locale === "ja"
                      ? "無料＆無制限 - 登録なしで無制限に使用可能"
                      : "Free & unlimited - no signup required"}
                </li>
                <li>
                  {locale === "ko"
                    ? "실시간 계산 - 입력하는 동안 자동 계산"
                    : locale === "ja"
                      ? "リアルタイム計算 - 入力中に自動計算"
                      : "Real-time computation - calculates as you type"}
                </li>
                <li>
                  {locale === "ko"
                    ? "원클릭 복사 - 결과를 클립보드에 즉시 복사"
                    : locale === "ja"
                      ? "ワンクリックコピー - 結果をクリップボードに即座にコピー"
                      : "One-click copy - instantly copy results to clipboard"}
                </li>
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "자주 묻는 질문"
                  : locale === "ja"
                    ? "よくある質問"
                    : "FAQ"}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-medium mb-1">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Hash Tools */}
        {relatedTypes.length > 0 && (
          <section className="border-t pt-6 mt-8">
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "관련 해시 도구"
                : locale === "ja"
                  ? "関連ハッシュツール"
                  : "Related Hash Tools"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedTypes.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/hash/${related.slug}`}
                >
                  <Button variant="outline" size="sm">
                    {related.algorithm}
                    {related.isSecure ? (
                      <Shield className="h-3 w-3 ml-1 text-success" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 ml-1 text-warning" />
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
