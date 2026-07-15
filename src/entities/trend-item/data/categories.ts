import type { Locale } from "@/shared/config/site";
import type { TrendCategory, TrendCategoryConfig } from "@/shared/types/trend";

type LocalizedCategoryCopy = Omit<TrendCategoryConfig, "category" | "slug">;

interface CategoryDefinition {
  category: TrendCategory;
  slug: string;
  copy: Record<Locale, LocalizedCategoryCopy>;
}

export const categoryDefinitions = [
  {
    category: "country_population",
    slug: "countries",
    copy: {
      en: {
        label: "Country population",
        shortLabel: "Countries",
        question: "Does the next country have a higher or lower population?",
        valueLabel: "population",
        seoTitle: "Country Population Higher or Lower Game",
        seoDescription:
          "Compare country populations in a five-round daily higher or lower game.",
      },
      ko: {
        label: "국가별 인구",
        shortLabel: "국가",
        question: "다음 나라의 인구는 더 많을까요, 적을까요?",
        valueLabel: "인구",
        seoTitle: "국가 인구 Higher or Lower 게임",
        seoDescription:
          "국가 인구를 비교하는 5라운드 데일리 Higher or Lower 게임입니다.",
      },
      ja: {
        label: "国別人口",
        shortLabel: "国",
        question: "次の国の人口は多い？少ない？",
        valueLabel: "人口",
        seoTitle: "国別人口 Higher or Lower ゲーム",
        seoDescription: "国の人口を比較する5ラウンドのデイリーゲームです。",
      },
    },
  },
  {
    category: "city_population",
    slug: "cities",
    copy: {
      en: {
        label: "City population",
        shortLabel: "Cities",
        question: "Does the next city have a higher or lower population?",
        valueLabel: "population",
        seoTitle: "City Population Higher or Lower Game",
        seoDescription:
          "Compare major-city population estimates in a quick daily game.",
      },
      ko: {
        label: "도시별 인구",
        shortLabel: "도시",
        question: "다음 도시의 인구는 더 많을까요, 적을까요?",
        valueLabel: "인구",
        seoTitle: "도시 인구 Higher or Lower 게임",
        seoDescription: "세계 주요 도시의 인구를 비교하는 데일리 게임입니다.",
      },
      ja: {
        label: "都市人口",
        shortLabel: "都市",
        question: "次の都市の人口は多い？少ない？",
        valueLabel: "人口",
        seoTitle: "都市人口 Higher or Lower ゲーム",
        seoDescription: "世界の主要都市の人口を比較するデイリーゲームです。",
      },
    },
  },
  {
    category: "movie_box_office",
    slug: "movies",
    copy: {
      en: {
        label: "Movie box office",
        shortLabel: "Movies",
        question: "Did the next movie earn more or less worldwide?",
        valueLabel: "worldwide box office",
        seoTitle: "Movie Box Office Higher or Lower Game",
        seoDescription:
          "Compare worldwide movie box-office totals in a fast daily game.",
      },
      ko: {
        label: "영화 흥행 수익",
        shortLabel: "영화",
        question: "다음 영화의 흥행 수익은 더 높을까요, 낮을까요?",
        valueLabel: "전 세계 흥행 수익",
        seoTitle: "영화 흥행 수익 Higher or Lower 게임",
        seoDescription: "영화의 전 세계 흥행 수익을 비교하는 게임입니다.",
      },
      ja: {
        label: "映画興行収入",
        shortLabel: "映画",
        question: "次の映画の世界興行収入は高い？低い？",
        valueLabel: "世界興行収入",
        seoTitle: "映画興行収入 Higher or Lower ゲーム",
        seoDescription: "映画の世界興行収入を比較するゲームです。",
      },
    },
  },
  {
    category: "animal_speed",
    slug: "animals",
    copy: {
      en: {
        label: "Animal speed",
        shortLabel: "Animals",
        question: "Is the next animal faster or slower?",
        valueLabel: "top speed",
        seoTitle: "Animal Speed Higher or Lower Game",
        seoDescription: "Compare animal top speeds in a five-round daily quiz.",
      },
      ko: {
        label: "동물 최고 속도",
        shortLabel: "동물",
        question: "다음 동물은 더 빠를까요, 느릴까요?",
        valueLabel: "최고 속도",
        seoTitle: "동물 속도 Higher or Lower 게임",
        seoDescription: "동물의 최고 속도를 비교하는 5라운드 게임입니다.",
      },
      ja: {
        label: "動物の最高速度",
        shortLabel: "動物",
        question: "次の動物は速い？遅い？",
        valueLabel: "最高速度",
        seoTitle: "動物速度 Higher or Lower ゲーム",
        seoDescription: "動物の最高速度を比較する5ラウンドゲームです。",
      },
    },
  },
  {
    category: "mountain_height",
    slug: "mountains",
    copy: {
      en: {
        label: "Mountain height",
        shortLabel: "Mountains",
        question: "Is the next mountain higher or lower?",
        valueLabel: "height",
        seoTitle: "Mountain Height Higher or Lower Game",
        seoDescription: "Compare mountain elevations in a quick daily game.",
      },
      ko: {
        label: "산 높이",
        shortLabel: "산",
        question: "다음 산은 더 높을까요, 낮을까요?",
        valueLabel: "높이",
        seoTitle: "산 높이 Higher or Lower 게임",
        seoDescription: "세계 산의 고도를 비교하는 빠른 데일리 게임입니다.",
      },
      ja: {
        label: "山の標高",
        shortLabel: "山",
        question: "次の山は高い？低い？",
        valueLabel: "標高",
        seoTitle: "山の標高 Higher or Lower ゲーム",
        seoDescription: "世界の山の標高を比較するデイリーゲームです。",
      },
    },
  },
] as const satisfies readonly CategoryDefinition[];

export const CATEGORY_SLUGS = categoryDefinitions.map(
  ({ slug }) => slug,
) as CategoryDefinition["slug"][];

export function getCategoryDefinition(slug: string) {
  return categoryDefinitions.find((definition) => definition.slug === slug);
}

export function getCategoryConfig(
  slug: string,
  locale: Locale,
): TrendCategoryConfig | undefined {
  const definition = getCategoryDefinition(slug);
  if (!definition) return undefined;

  return {
    category: definition.category,
    slug: definition.slug,
    ...definition.copy[locale],
  };
}
