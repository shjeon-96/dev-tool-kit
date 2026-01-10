import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import {
  getAuthorBySlug,
  getAllAuthorSlugs,
  localizeAuthor,
  getSocialProfileUrls,
} from "@/entities/author";
import { BreadcrumbJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";
import {
  User,
  BookOpen,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle,
  Bot,
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all authors
export async function generateStaticParams() {
  // Skip during CI build when Supabase env vars are not available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return [];
  }

  const slugs = await getAllAuthorSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const author = await getAuthorBySlug(slug);
  if (!author) {
    return {};
  }

  const isKorean = locale === "ko";
  const name = isKorean ? author.name_ko : author.name_en;
  const bio = isKorean ? author.bio_ko : author.bio_en;
  const description =
    bio ||
    (isKorean
      ? `${name} - ${SITE_CONFIG.title} 기고자`
      : `${name} - ${SITE_CONFIG.title} Contributor`);

  return {
    title: `${name} - ${SITE_CONFIG.title}`,
    description,
    openGraph: {
      title: name,
      description,
      url: `/${locale}/authors/${slug}`,
      type: "profile",
      images: author.avatar_url
        ? [{ url: author.avatar_url, width: 400, height: 400, alt: name }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title: name,
      description,
    },
    alternates: {
      canonical: `/${locale}/authors/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/authors/${slug}`]),
      ),
    },
  };
}

// Generate Person JSON-LD schema (safe - using JSON.stringify escapes content)
function generatePersonSchema(
  localized: ReturnType<typeof localizeAuthor>,
  socialUrls: string[],
  locale: string,
  slug: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/${locale}/authors/${slug}#person`,
    name: localized.name,
    description: localized.bio,
    image: localized.avatar_url,
    jobTitle: localized.credentials[0] || "Content Creator",
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
    sameAs: socialUrls,
    knowsAbout: localized.expertise_tags,
    url: `${SITE_CONFIG.url}/${locale}/authors/${slug}`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const isKorean = locale === "ko";
  const localized = localizeAuthor(author, isKorean ? "ko" : "en");

  // Breadcrumb items
  const breadcrumbItems = [
    { name: isKorean ? "홈" : "Home", url: `${SITE_CONFIG.url}/${locale}` },
    {
      name: isKorean ? "저자" : "Authors",
      url: `${SITE_CONFIG.url}/${locale}/authors`,
    },
    {
      name: localized.name,
      url: `${SITE_CONFIG.url}/${locale}/authors/${slug}`,
    },
  ];

  const socialUrls = getSocialProfileUrls(author.social_profiles);
  const personSchema = generatePersonSchema(
    localized,
    socialUrls,
    locale,
    slug,
  );

  return (
    <div className="paper-texture min-h-screen">
      {/* Hero Section */}
      <header className="relative -mx-6 -mt-6 px-6 pt-12 pb-16 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 mesh-gradient opacity-20" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <div className="mb-8 inline-block">
            <div className="relative">
              {localized.avatar_url ? (
                <Image
                  src={localized.avatar_url}
                  alt={localized.name}
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full object-cover border-4 border-background shadow-2xl"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-4 border-background shadow-2xl flex items-center justify-center">
                  <User className="w-20 h-20 text-primary/40" />
                </div>
              )}

              {/* AI Generated Badge */}
              {localized.is_ai_generated && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    AI Persona
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            {localized.name}
          </h1>

          {/* Credentials */}
          {localized.credentials.length > 0 && (
            <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
              {localized.credentials.map((credential, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-sm font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {credential}
                </span>
              ))}
            </div>
          )}

          {/* Bio */}
          {localized.bio && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {localized.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {localized.article_count}
              </div>
              <div className="text-sm text-muted-foreground">
                {isKorean ? "기사" : "Articles"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {localized.expertise_tags.length}
              </div>
              <div className="text-sm text-muted-foreground">
                {isKorean ? "전문 분야" : "Expertise Areas"}
              </div>
            </div>
          </div>

          {/* Social Links */}
          {socialUrls.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              {Object.entries(author.social_profiles).map(
                ([platform, url]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border hover:bg-secondary transition-colors text-sm font-medium"
                    >
                      {platform}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ),
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-12">
        {/* Expertise Tags */}
        {localized.expertise_tags.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {isKorean ? "전문 분야" : "Areas of Expertise"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {localized.expertise_tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Articles by Author - Placeholder */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {isKorean ? "최근 기사" : "Recent Articles"}
          </h2>

          {localized.article_count > 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {isKorean ? "기사 목록을 불러오는 중..." : "Loading articles..."}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl border bg-card">
              <p className="text-muted-foreground">
                {isKorean
                  ? "아직 작성된 기사가 없습니다."
                  : "No articles published yet."}
              </p>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {isKorean ? "홈으로 돌아가기" : "Browse all articles"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* JSON-LD Schemas - Safe: JSON.stringify escapes all content */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ProfilePage Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@id": `${SITE_CONFIG.url}/${locale}/authors/${slug}#person`,
            },
            dateCreated: author.created_at,
            dateModified: author.updated_at,
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
    </div>
  );
}
