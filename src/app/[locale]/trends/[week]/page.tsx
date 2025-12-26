import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import {
  Calendar,
  TrendingUp,
  Star,
  GitFork,
  ExternalLink,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";
import {
  getTrendReport,
  listTrendReports,
  getWeekDateRange,
  getLastNWeeks,
} from "@/shared/lib/data-pipeline";
import type { TrendingRepo, RedditPost } from "@/shared/lib/data-pipeline";

// 1시간마다 재검증 (새 트렌드 데이터 반영)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string; week: string }>;
}

// 최근 12주만 정적 생성
export async function generateStaticParams() {
  const weeks = getLastNWeeks(12);
  return routing.locales.flatMap((locale) =>
    weeks.map((week) => ({ locale, week })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, week } = await params;

  const titles: Record<string, string> = {
    en: `Developer Trends ${week} | Web Toolkit`,
    ko: `개발자 트렌드 ${week} | Web Toolkit`,
    ja: `開発者トレンド ${week} | Web Toolkit`,
  };

  const descriptions: Record<string, string> = {
    en: `Weekly developer trends report for ${week}. Top GitHub repositories, trending tools, and community discussions.`,
    ko: `${week} 주간 개발자 트렌드 리포트. GitHub 인기 리포지토리, 트렌딩 도구, 커뮤니티 토론.`,
    ja: `${week}の週間デベロッパートレンドレポート。人気のGitHubリポジトリ、トレンドツール、コミュニティディスカッション。`,
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/trends/${week}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/trends/${week}`,
        ko: `${SITE_CONFIG.url}/ko/trends/${week}`,
        ja: `${SITE_CONFIG.url}/ja/trends/${week}`,
      },
    },
  };
}

export default async function TrendReportPage({ params }: PageProps) {
  const { locale, week } = await params;
  setRequestLocale(locale);

  const report = await getTrendReport(week);

  if (!report) {
    notFound();
  }

  const { start, end } = getWeekDateRange(week);
  const formatDate = (d: Date) =>
    d.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const t = {
    en: {
      back: "All Reports",
      period: "Period",
      githubTrending: "Trending on GitHub",
      developerTools: "Developer Tools of the Week",
      byLanguage: "By Language",
      hotDiscussions: "Hot Discussions",
      emergingTopics: "Emerging Topics",
      stars: "stars",
      forks: "forks",
      today: "today",
      relatedTools: "Related Tools on Web Toolkit",
    },
    ko: {
      back: "전체 리포트",
      period: "기간",
      githubTrending: "GitHub 트렌딩",
      developerTools: "금주의 개발자 도구",
      byLanguage: "언어별",
      hotDiscussions: "핫 토론",
      emergingTopics: "떠오르는 토픽",
      stars: "스타",
      forks: "포크",
      today: "오늘",
      relatedTools: "Web Toolkit 관련 도구",
    },
    ja: {
      back: "全レポート",
      period: "期間",
      githubTrending: "GitHub トレンド",
      developerTools: "今週の開発者ツール",
      byLanguage: "言語別",
      hotDiscussions: "ホットディスカッション",
      emergingTopics: "注目トピック",
      stars: "スター",
      forks: "フォーク",
      today: "今日",
      relatedTools: "Web Toolkit関連ツール",
    },
  }[locale as "en" | "ko" | "ja"] || {
    back: "All Reports",
    period: "Period",
    githubTrending: "Trending on GitHub",
    developerTools: "Developer Tools of the Week",
    byLanguage: "By Language",
    hotDiscussions: "Hot Discussions",
    emergingTopics: "Emerging Topics",
    stars: "stars",
    forks: "forks",
    today: "today",
    relatedTools: "Related Tools on Web Toolkit",
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      {/* Navigation */}
      <Link
        href={`/${locale}/trends`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.back}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold font-mono">{week}</h1>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {t.period}: {formatDate(start)} - {formatDate(end)}
          </span>
        </div>
      </div>

      {/* Emerging Topics */}
      {report.redditDiscussions.emergingTopics.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t.emergingTopics}</h2>
          <div className="flex flex-wrap gap-2">
            {report.redditDiscussions.emergingTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                #{topic}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* GitHub Trending */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t.githubTrending}</h2>
        <div className="space-y-3">
          {report.githubTrending.overall.slice(0, 10).map((repo, index) => (
            <RepoCard key={repo.fullName} repo={repo} rank={index + 1} t={t} />
          ))}
        </div>
      </section>

      {/* Developer Tools */}
      {report.githubTrending.developerTools.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t.developerTools}</h2>
          <div className="space-y-3">
            {report.githubTrending.developerTools.map((repo) => (
              <RepoCard key={repo.fullName} repo={repo} t={t} highlight />
            ))}
          </div>
        </section>
      )}

      {/* By Language */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t.byLanguage}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(report.githubTrending.byLanguage).map(
            ([lang, repos]) =>
              repos.length > 0 && (
                <div key={lang} className="border rounded-lg p-4">
                  <h3 className="font-semibold capitalize mb-3">{lang}</h3>
                  <div className="space-y-2">
                    {repos.slice(0, 3).map((repo) => (
                      <a
                        key={repo.fullName}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm hover:text-primary"
                      >
                        <span className="truncate">{repo.fullName}</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {formatNumber(repo.stars)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </section>

      {/* Hot Discussions */}
      {report.redditDiscussions.topPosts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t.hotDiscussions}</h2>
          <div className="space-y-3">
            {report.redditDiscussions.topPosts.slice(0, 10).map((post) => (
              <DiscussionCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      <section className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">{t.relatedTools}</h2>
        <div className="flex flex-wrap gap-2">
          <Link href={`/${locale}/tools/json-formatter`}>
            <Button variant="outline" size="sm">
              JSON Formatter
            </Button>
          </Link>
          <Link href={`/${locale}/tools/hash-generator`}>
            <Button variant="outline" size="sm">
              Hash Generator
            </Button>
          </Link>
          <Link href={`/${locale}/tools/uuid-generator`}>
            <Button variant="outline" size="sm">
              UUID Generator
            </Button>
          </Link>
          <Link href={`/${locale}/tools/base64-converter`}>
            <Button variant="outline" size="sm">
              Base64 Converter
            </Button>
          </Link>
          <Link href={`/${locale}/tools`}>
            <Button variant="outline" size="sm">
              All Tools →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================
// 컴포넌트
// ============================================

function RepoCard({
  repo,
  rank,
  highlight,
  t,
}: {
  repo: TrendingRepo;
  rank?: number;
  highlight?: boolean;
  t: Record<string, string>;
}) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 border rounded-lg hover:border-primary/50 transition-colors ${
        highlight ? "bg-primary/5 border-primary/20" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {rank && (
          <span className="text-2xl font-bold text-muted-foreground/50">
            {rank}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate">{repo.fullName}</span>
            {repo.language && repo.language !== "Unknown" && (
              <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                {repo.language}
              </span>
            )}
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </div>
          {repo.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {repo.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {formatNumber(repo.stars)} {t.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {formatNumber(repo.forks)} {t.forks}
            </span>
            {repo.todayStars > 0 && (
              <span className="text-primary">
                +{repo.todayStars} {t.today}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

function DiscussionCard({ post }: { post: RedditPost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 bg-warning/10 text-warning rounded">
              r/{post.subreddit}
            </span>
            <span className="text-xs text-muted-foreground">
              u/{post.author}
            </span>
          </div>
          <p className="font-medium line-clamp-2">{post.title}</p>
          {post.content && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {post.content}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
