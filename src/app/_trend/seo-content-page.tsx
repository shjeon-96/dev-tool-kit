import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalizedCategoryConfig } from "@/entities/trend-item/data/categories";
import { getItemsByCategory } from "@/entities/trend-item/data/items";
import {
  buildSeoPageJsonLd,
  getSeoContentPage,
  seoContentPages,
} from "@/entities/trend-item/data/seo-pages";
import { getLocalizedPath, messages } from "@/shared/lib/trend-battle/i18n";
import { createRound } from "@/shared/lib/trend-battle/game";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import type { AppLocale } from "@/shared/types/trend";
import { AdSlot } from "@/widgets/trend-battle/ui/ad-slot";
import { CategoryNav } from "@/widgets/trend-battle/ui/category-nav";
import { TrendBattleGame } from "@/widgets/trend-battle/ui/trend-battle-game";

export function createSeoPageMetadata(
  slug: string,
  locale: AppLocale = "en",
): Metadata {
  const page = getSeoContentPage(slug, locale);

  if (!page) {
    return {
      title: "Trend Battle",
      description: "Guess which one is bigger.",
    };
  }

  return createTrendMetadata({
    title: `${page.title} | Trend Battle`,
    description: page.description,
    slug: page.slug,
    locale,
  });
}

interface SeoContentPageProps {
  slug: string;
  locale?: AppLocale;
}

export function SeoContentPage({ slug, locale = "en" }: SeoContentPageProps) {
  const page = getSeoContentPage(slug, locale);

  if (!page) notFound();

  const config = getLocalizedCategoryConfig(page.categorySlug, locale);

  if (!config) notFound();

  const copy = messages[locale];
  const sourceHref = getLocalizedPath("sources", locale);
  const items = getItemsByCategory(page.category);
  const jsonLd = buildSeoPageJsonLd(page, locale);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryNav activeSlug={page.categorySlug} locale={locale} />
      <TrendBattleGame
        items={items}
        config={config}
        storageCategory={page.category}
        initialRound={createRound(items)}
        locale={locale}
      />
      <section className="mx-auto grid max-w-4xl gap-6 px-4 pb-12">
        <div className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
          <div>
            <p className="text-sm font-bold uppercase text-cyan-700">
              {locale === "ko" ? "SEO 퀴즈" : "Comparison quiz"}
            </p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">
              {page.title}
            </h1>
            <p className="mt-3 text-base text-slate-700">{page.intro}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {locale === "ko" ? "데이터 기준" : "Data standard"}
            </h2>
            <p className="mt-2">{page.dataStandard}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {locale === "ko" ? "자주 묻는 질문" : "FAQ"}
            </h2>
            <div className="mt-3 grid gap-3">
              {page.faq.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <summary className="cursor-pointer font-bold text-slate-950">
                    {faq.question}
                  </summary>
                  <p className="mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {locale === "ko" ? "관련 카테고리" : "Related categories"}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {seoContentPages.map((item) => (
                <Link
                  key={item.slug}
                  href={getLocalizedPath(item.slug, locale)}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  {getSeoContentPage(item.slug, locale)?.title}
                </Link>
              ))}
            </div>
          </div>

          <p>
            {locale === "ko"
              ? "전체 데이터 출처는 "
              : "Full data sources are on the "}
            <Link className="font-semibold underline" href={sourceHref}>
              {locale === "ko" ? "출처 페이지" : "Sources page"}
            </Link>
            {locale === "ko" ? "에서 확인할 수 있습니다." : "."}
          </p>
        </div>
        <AdSlot label={`${page.title} page ad`} text={copy.advertisement} />
      </section>
    </main>
  );
}
