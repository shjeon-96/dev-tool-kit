import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/entities/post";
import { MarkdownViewer } from "@/features/blog";
import { Button, Badge } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales = ["en", "ko", "ja"];

  return locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const description =
    post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;

  return {
    title: `${title} | ${SITE_CONFIG.title}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_CONFIG.title}`,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/${locale}/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const content =
    post.content[locale as keyof typeof post.content] || post.content.en;

  return (
    <article className="container max-w-3xl mx-auto py-12 px-4">
      {/* Back Button */}
      <div className="mb-8">
        <Link href={`/${locale}/blog`}>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-4 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {locale === "ko"
              ? "목록으로"
              : locale === "ja"
                ? "一覧に戻る"
                : "Back to Blog"}
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="secondary" className="capitalize">
            {post.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {format(new Date(post.date), "MMMM d, yyyy")}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <MarkdownViewer content={content} />

      {/* Tags */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
