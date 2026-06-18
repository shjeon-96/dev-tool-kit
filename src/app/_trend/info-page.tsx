import Link from "next/link";
import { categoryConfigs } from "@/entities/trend-item/data/categories";
import { getLocalizedPath, messages } from "@/shared/lib/trend-battle/i18n";
import type { AppLocale } from "@/shared/types/trend";
import { AdSlot } from "@/widgets/trend-battle/ui/ad-slot";
import { CategoryNav } from "@/widgets/trend-battle/ui/category-nav";

interface InfoPageProps {
  eyebrow: string;
  title: string;
  description: string;
  locale?: AppLocale;
  children: React.ReactNode;
}

export function InfoPage({
  eyebrow,
  title,
  description,
  locale = "en",
  children,
}: InfoPageProps) {
  const copy = messages[locale];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <CategoryNav locale={locale} />
      <section className="mx-auto grid max-w-3xl gap-6 px-4 py-10">
        <div>
          <p className="text-sm font-bold uppercase text-cyan-700">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black">{title}</h1>
          <p className="mt-4 text-lg leading-7 text-slate-700">{description}</p>
        </div>
        <div className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
          {children}
        </div>
        <AdSlot label={`${title} page ad`} text={copy.advertisement} />
      </section>
    </main>
  );
}

export function CategoryLinks({ locale = "en" }: { locale?: AppLocale }) {
  const copy = messages[locale];

  return (
    <div className="grid gap-2">
      <h2 className="text-xl font-bold text-slate-950">
        {copy.playByCategory}
      </h2>
      <div className="flex flex-wrap gap-2">
        {categoryConfigs.map((config) => (
          <Link
            key={config.slug}
            href={getLocalizedPath(config.slug, locale)}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            {locale === "ko" ? koreanLabels[config.slug] : config.shortLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}

const koreanLabels: Record<string, string> = {
  countries: "국가",
  cities: "도시",
  movies: "영화",
  animals: "동물",
  mountains: "산",
};
