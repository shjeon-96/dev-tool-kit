import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllPosts, PostCard } from "@/entities/post";
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

  const titles = {
    en: "Technical Blog",
    ko: "기술 블로그",
    ja: "技術ブログ",
  };
  const descriptions = {
    en: "Technical deep dives, tutorials, and updates from the Web Toolkit team.",
    ko: "Web Toolkit 팀의 기술 심층 분석, 튜토리얼 및 업데이트.",
    ja: "Web Toolkitチームによる技術的な詳細、チュートリアル、更新情報。",
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title: `${title} | ${SITE_CONFIG.title}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_CONFIG.title}`,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/blog`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();

  const headings = {
    en: {
      title: "Technical Blog",
      subtitle: "Behind the scenes of Web Toolkit's client-side technology.",
    },
    ko: {
      title: "기술 블로그",
      subtitle: "Web Toolkit의 클라이언트 사이드 기술에 대한 이야기.",
    },
    ja: {
      title: "技術ブログ",
      subtitle: "Web Toolkitのクライアントサイド技術の裏側。",
    },
  };

  const text = headings[locale as keyof typeof headings] || headings.en;

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{text.title}</h1>
        <p className="text-xl text-muted-foreground">{text.subtitle}</p>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No posts found. Coming soon!
        </div>
      )}
    </div>
  );
}
