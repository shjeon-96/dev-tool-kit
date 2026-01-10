import Link from "next/link";

export interface Category {
  key: string;
  labelEn: string;
  labelKo: string;
  gradient: string;
}

export interface CategoryGridProps {
  categories: Category[];
  locale: string;
  title?: string;
}

// Default categories
export const BLOG_CATEGORIES: Category[] = [
  { key: "tech", labelEn: "Tech", labelKo: "테크", gradient: "from-blue-500/20 to-cyan-500/20" },
  { key: "business", labelEn: "Business", labelKo: "비즈니스", gradient: "from-emerald-500/20 to-green-500/20" },
  { key: "lifestyle", labelEn: "Lifestyle", labelKo: "라이프", gradient: "from-pink-500/20 to-rose-500/20" },
  { key: "entertainment", labelEn: "Entertainment", labelKo: "엔터", gradient: "from-purple-500/20 to-violet-500/20" },
  { key: "trending", labelEn: "Trending", labelKo: "트렌딩", gradient: "from-orange-500/20 to-amber-500/20" },
  { key: "news", labelEn: "News", labelKo: "뉴스", gradient: "from-slate-500/20 to-gray-500/20" },
];

export function CategoryGrid({
  categories = BLOG_CATEGORIES,
  locale,
  title,
}: CategoryGridProps) {
  const isKorean = locale === "ko";

  return (
    <section className="max-w-6xl mx-auto">
      {title && (
        <div className="divider-editorial mb-10">
          <span className="section-label px-4">{title}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category, index) => (
          <Link
            key={category.key}
            href={`/${locale}/${category.key}`}
            className="group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`relative p-6 rounded-xl border bg-gradient-to-br ${category.gradient} overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:border-accent/50 animate-fade-in-up opacity-0`}
            >
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-foreground/5" />

              <span className="relative font-semibold text-sm">
                {isKorean ? category.labelKo : category.labelEn}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
