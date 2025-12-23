import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Calendar, TrendingUp, Github, MessageSquare } from "lucide-react";
import { Button } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import {
  listTrendReports,
  getLatestTrendReport,
  getWeekDateRange,
} from "@/lib/data-pipeline";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Developer Trends - Weekly Reports | Web Toolkit",
    ko: "개발자 트렌드 - 주간 리포트 | Web Toolkit",
    ja: "開発者トレンド - 週間レポート | Web Toolkit",
  };

  const descriptions: Record<string, string> = {
    en: "Weekly developer trends report. Top GitHub repositories, trending tools, and community discussions.",
    ko: "주간 개발자 트렌드 리포트. GitHub 인기 리포지토리, 트렌딩 도구, 커뮤니티 토론.",
    ja: "週間デベロッパートレンドレポート。人気のGitHubリポジトリ、トレンドツール、コミュニティディスカッション。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/trends`,
      languages: {
        en: `${SITE_CONFIG.url}/en/trends`,
        ko: `${SITE_CONFIG.url}/ko/trends`,
        ja: `${SITE_CONFIG.url}/ja/trends`,
      },
    },
  };
}

export default async function TrendsIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const reports = await listTrendReports();
  const latestReport = await getLatestTrendReport();

  const t = {
    en: {
      title: "Developer Trends",
      subtitle:
        "Weekly reports on trending repositories, developer tools, and community discussions",
      latestReport: "Latest Report",
      allReports: "All Reports",
      noReports: "No reports available yet. Check back soon!",
      viewReport: "View Report",
      github: "GitHub Trending",
      tools: "Developer Tools",
      discussions: "Hot Discussions",
    },
    ko: {
      title: "개발자 트렌드",
      subtitle:
        "트렌딩 리포지토리, 개발자 도구, 커뮤니티 토론에 대한 주간 리포트",
      latestReport: "최신 리포트",
      allReports: "전체 리포트",
      noReports: "아직 리포트가 없습니다. 곧 업데이트됩니다!",
      viewReport: "리포트 보기",
      github: "GitHub 트렌딩",
      tools: "개발자 도구",
      discussions: "핫 토론",
    },
    ja: {
      title: "開発者トレンド",
      subtitle:
        "トレンドリポジトリ、開発者ツール、コミュニティディスカッションの週間レポート",
      latestReport: "最新レポート",
      allReports: "全レポート",
      noReports: "まだレポートがありません。もうすぐ更新されます！",
      viewReport: "レポートを見る",
      github: "GitHub トレンド",
      tools: "開発者ツール",
      discussions: "ホットディスカッション",
    },
  }[locale as "en" | "ko" | "ja"] || {
    title: "Developer Trends",
    subtitle:
      "Weekly reports on trending repositories, developer tools, and community discussions",
    latestReport: "Latest Report",
    allReports: "All Reports",
    noReports: "No reports available yet. Check back soon!",
    viewReport: "View Report",
    github: "GitHub Trending",
    tools: "Developer Tools",
    discussions: "Hot Discussions",
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{t.noReports}</p>
        </div>
      ) : (
        <>
          {/* Latest Report Highlight */}
          {latestReport && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t.latestReport}</h2>
              <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-mono text-lg">
                      {latestReport.week}
                    </span>
                  </div>
                  <Link href={`/${locale}/trends/${latestReport.week}`}>
                    <Button>{t.viewReport}</Button>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-background rounded-lg">
                    <Github className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">
                      {latestReport.githubTrending.overall.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.github}
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">
                      {latestReport.githubTrending.developerTools.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.tools}
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <MessageSquare className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">
                      {latestReport.redditDiscussions.topPosts.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.discussions}
                    </div>
                  </div>
                </div>

                {/* Top Topics */}
                {latestReport.redditDiscussions.emergingTopics.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {latestReport.redditDiscussions.emergingTopics
                        .slice(0, 8)
                        .map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                          >
                            #{topic}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* All Reports */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t.allReports}</h2>
            <div className="space-y-2">
              {reports.map((week) => {
                const { start, end } = getWeekDateRange(week);
                const formatDate = (d: Date) =>
                  d.toLocaleDateString(locale, {
                    month: "short",
                    day: "numeric",
                  });

                return (
                  <Link
                    key={week}
                    href={`/${locale}/trends/${week}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono">{week}</span>
                      <span className="text-sm text-muted-foreground">
                        ({formatDate(start)} - {formatDate(end)})
                      </span>
                    </div>
                    <span className="text-primary text-sm">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
