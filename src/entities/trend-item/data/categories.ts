import type {
  AppLocale,
  StoredTrendCategory,
  TrendCategoryConfig,
} from "@/shared/types/trend";

export const categoryConfigs = [
  {
    category: "country_population",
    label: "Countries by population",
    shortLabel: "Countries",
    slug: "countries",
    question: "Which country has more population?",
    classicPrompt: "Does the next country have higher or lower population?",
    valueLabel: "population",
    seoTitle: "Country Population Higher or Lower Game",
    seoDescription:
      "Guess which country has more people in a fast higher or lower population quiz.",
  },
  {
    category: "city_population",
    label: "Cities by population",
    shortLabel: "Cities",
    slug: "cities",
    question: "Which city has more people?",
    classicPrompt: "Does the next city have higher or lower population?",
    valueLabel: "population",
    seoTitle: "City Population Higher or Lower Game",
    seoDescription:
      "Play a quick city population quiz and compare major cities around the world.",
  },
  {
    category: "movie_box_office",
    label: "Movies by box office",
    shortLabel: "Movies",
    slug: "movies",
    question: "Which movie made more money worldwide?",
    classicPrompt:
      "Did the next movie make higher or lower worldwide box office?",
    valueLabel: "worldwide box office",
    seoTitle: "Movie Box Office Higher or Lower Game",
    seoDescription:
      "Guess which movie earned more at the worldwide box office in a quick comparison game.",
  },
  {
    category: "animal_speed",
    label: "Animals by speed",
    shortLabel: "Animals",
    slug: "animals",
    question: "Which animal is faster?",
    classicPrompt: "Is the next animal faster or slower?",
    valueLabel: "top speed",
    seoTitle: "Animal Speed Quiz: Which Animal Is Faster?",
    seoDescription:
      "Compare animal top speeds and guess which one is faster in a one-tap browser game.",
  },
  {
    category: "mountain_height",
    label: "Mountains by height",
    shortLabel: "Mountains",
    slug: "mountains",
    question: "Which mountain is taller?",
    classicPrompt: "Is the next mountain higher or lower?",
    valueLabel: "height",
    seoTitle: "Mountain Height Higher or Lower Game",
    seoDescription:
      "Guess which mountain is taller using real elevation data and fast feedback.",
  },
] as const satisfies TrendCategoryConfig[];

export function getCategoryConfig(slug: string) {
  return categoryConfigs.find((config) => config.slug === slug);
}

const koreanCategoryCopy = {
  countries: {
    label: "국가별 인구",
    shortLabel: "국가",
    question: "어느 나라의 인구가 더 많을까요?",
    classicPrompt: "다음 나라의 인구는 더 많을까요, 적을까요?",
    valueLabel: "인구",
    seoTitle: "국가 인구 Higher or Lower 게임",
    seoDescription:
      "어느 나라에 사람이 더 많은지 맞히는 빠른 인구 비교 퀴즈입니다.",
  },
  cities: {
    label: "도시별 인구",
    shortLabel: "도시",
    question: "어느 도시의 인구가 더 많을까요?",
    classicPrompt: "다음 도시의 인구는 더 많을까요, 적을까요?",
    valueLabel: "인구",
    seoTitle: "도시 인구 Higher or Lower 게임",
    seoDescription: "세계 주요 도시의 인구를 비교하고 더 큰 쪽을 맞혀보세요.",
  },
  movies: {
    label: "영화 흥행 수익",
    shortLabel: "영화",
    question: "어느 영화의 전 세계 흥행 수익이 더 클까요?",
    classicPrompt: "다음 영화의 흥행 수익은 더 높을까요, 낮을까요?",
    valueLabel: "전 세계 흥행 수익",
    seoTitle: "영화 흥행 수익 Higher or Lower 게임",
    seoDescription:
      "전 세계 박스오피스 수익을 비교해 어떤 영화가 더 많이 벌었는지 맞혀보세요.",
  },
  animals: {
    label: "동물 최고 속도",
    shortLabel: "동물",
    question: "어느 동물이 더 빠를까요?",
    classicPrompt: "다음 동물은 더 빠를까요, 느릴까요?",
    valueLabel: "최고 속도",
    seoTitle: "동물 속도 퀴즈: 어느 동물이 더 빠를까?",
    seoDescription:
      "동물의 최고 속도를 비교하고 더 빠른 쪽을 한 번에 맞히는 게임입니다.",
  },
  mountains: {
    label: "산 높이",
    shortLabel: "산",
    question: "어느 산이 더 높을까요?",
    classicPrompt: "다음 산은 더 높을까요, 낮을까요?",
    valueLabel: "높이",
    seoTitle: "산 높이 Higher or Lower 게임",
    seoDescription: "실제 고도 데이터를 보고 어느 산이 더 높은지 맞혀보세요.",
  },
} satisfies Record<string, Omit<TrendCategoryConfig, "category" | "slug">>;

export function getLocalizedCategoryConfig(
  slug: string,
  locale: AppLocale,
): TrendCategoryConfig | undefined {
  const config = getCategoryConfig(slug);

  if (!config || locale === "en") return config;

  const copy = koreanCategoryCopy[slug as keyof typeof koreanCategoryCopy];

  return copy ? { ...config, ...copy } : config;
}

export function getRecommendedCategoryConfigs(
  currentCategory: StoredTrendCategory,
  locale: AppLocale,
) {
  return categoryConfigs
    .filter((config) => config.category !== currentCategory)
    .slice(0, 3)
    .map((config) => getLocalizedCategoryConfig(config.slug, locale) ?? config);
}
