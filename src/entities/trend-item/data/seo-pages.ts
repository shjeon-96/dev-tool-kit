import type { AppLocale, TrendCategory } from "@/shared/types/trend";
import { getLocalizedPath } from "@/shared/lib/trend-battle/i18n";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://trendbattle.app";

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoContentPage {
  slug: string;
  categorySlug: string;
  category: TrendCategory;
  title: string;
  description: string;
  intro: string;
  dataStandard: string;
  faq: SeoFaq[];
}

const englishSeoPages = [
  {
    slug: "higher-lower-country-population",
    categorySlug: "countries",
    category: "country_population",
    title: "Country Population Higher or Lower Game",
    description:
      "Guess which country has more people in a fast higher or lower population game.",
    intro:
      "Start with a country population round, pick the larger population, and reveal both real values right away.",
    dataStandard:
      "Country population values are based on public population datasets such as World Bank and UN-style national totals. Values are rounded for quick gameplay.",
    faq: [
      {
        question: "How do you decide the correct country population answer?",
        answer:
          "The item with the larger numeric population value is the correct answer for each round.",
      },
      {
        question: "Why are country values rounded?",
        answer:
          "Rounded display values keep the game readable on mobile while preserving the underlying comparison order.",
      },
      {
        question: "Can I play without signing in?",
        answer:
          "Yes. Trend Battle stores only the high score in localStorage and does not require an account.",
      },
    ],
  },
  {
    slug: "higher-lower-movie-box-office",
    categorySlug: "movies",
    category: "movie_box_office",
    title: "Movie Box Office Higher or Lower Game",
    description:
      "Guess which movie made more money worldwide in a quick box office comparison quiz.",
    intro:
      "Compare two hit movies, choose the higher worldwide box office total, and see both totals after your answer.",
    dataStandard:
      "Movie values use worldwide box office totals from public box office references. Re-releases and reporting updates can change totals over time.",
    faq: [
      {
        question: "Does this use domestic or worldwide box office?",
        answer:
          "The MVP uses worldwide box office totals because they are more useful for a global comparison game.",
      },
      {
        question: "Why do some movie totals change?",
        answer:
          "Re-releases, reporting corrections, and source updates can change lifetime grosses.",
      },
      {
        question: "What happens when I choose wrong?",
        answer:
          "The game ends immediately, shows your score, and lets you restart or share the result.",
      },
    ],
  },
  {
    slug: "which-country-has-more-people",
    categorySlug: "countries",
    category: "country_population",
    title: "Which Country Has More People? Population Quiz",
    description:
      "A fast population quiz where you choose which country has more people.",
    intro:
      "This version focuses on the simple question: which country has more people? Pick one side and learn the population values instantly.",
    dataStandard:
      "Population data is presented as approximate current national population figures with source links shown in each round.",
    faq: [
      {
        question: "Is this a trivia quiz or a game?",
        answer:
          "It is a lightweight comparison game with real data, designed for fast browser sessions.",
      },
      {
        question: "Are tiny countries matched against huge countries?",
        answer:
          "The matching logic prefers closer pairs to avoid rounds where the answer is too obvious.",
      },
      {
        question: "Can I switch categories?",
        answer:
          "Yes. Use the category navigation to play cities, movies, animals, or mountains.",
      },
    ],
  },
  {
    slug: "animal-speed-quiz",
    categorySlug: "animals",
    category: "animal_speed",
    title: "Animal Speed Quiz: Which Animal Is Faster?",
    description:
      "Compare animal top speeds and guess which animal is faster in one tap.",
    intro:
      "Pick the faster animal, reveal the top speed, and build a score streak with quick animal speed comparisons.",
    dataStandard:
      "Animal speed values are curated from public references and should be treated as approximate top-speed figures.",
    faq: [
      {
        question: "Are animal speeds exact?",
        answer:
          "No. Animal speeds can vary by measurement method, individual animal, and short-burst conditions.",
      },
      {
        question: "Why use approximate values?",
        answer:
          "Approximate values are better for a casual comparison game when scientific measurements vary.",
      },
      {
        question: "Can the same speed appear on both sides?",
        answer:
          "Yes, but the round still compares the stored numeric values and reveals both display values.",
      },
    ],
  },
  {
    slug: "mountain-height-quiz",
    categorySlug: "mountains",
    category: "mountain_height",
    title: "Mountain Height Quiz: Which Mountain Is Taller?",
    description:
      "Guess which mountain is taller using elevation data and instant feedback.",
    intro:
      "Compare two mountains, choose the taller one, and reveal the elevation after each answer.",
    dataStandard:
      "Mountain height values use elevation above sea level from public mountain reference datasets.",
    faq: [
      {
        question: "Does the quiz use height from base or elevation?",
        answer:
          "The MVP uses elevation above sea level, which is the common ranking method for highest mountains.",
      },
      {
        question: "Why are many mountain values close?",
        answer:
          "Close values make the game more interesting and avoid obvious comparisons.",
      },
      {
        question: "Where can I verify the data?",
        answer:
          "Each round includes source links, and the Sources page summarizes the references used by the game.",
      },
    ],
  },
] as const satisfies SeoContentPage[];

const koreanSeoCopy = {
  "higher-lower-country-population": {
    title: "국가 인구 Higher or Lower 게임",
    description:
      "어느 나라의 인구가 더 많은지 빠르게 맞히는 인구 비교 게임입니다.",
    intro:
      "국가 인구 라운드를 바로 시작하고, 더 인구가 많은 쪽을 고른 뒤 실제 수치를 확인하세요.",
    dataStandard:
      "국가 인구 값은 World Bank, UN 계열 공개 인구 데이터 기준의 국가 단위 인구를 바탕으로 하며, 플레이 가독성을 위해 반올림해 표시합니다.",
    faq: [
      {
        question: "정답은 어떻게 정해지나요?",
        answer: "각 라운드에서 숫자 인구 값이 더 큰 항목이 정답입니다.",
      },
      {
        question: "왜 인구가 반올림되어 보이나요?",
        answer:
          "모바일에서 빠르게 읽기 쉽도록 표시값은 반올림하지만 비교에는 구조화된 숫자 값을 사용합니다.",
      },
      {
        question: "로그인 없이 플레이할 수 있나요?",
        answer:
          "네. Trend Battle은 계정 없이 플레이하며 최고점은 브라우저 localStorage에 저장합니다.",
      },
    ],
  },
  "higher-lower-movie-box-office": {
    title: "영화 흥행 수익 Higher or Lower 게임",
    description:
      "어느 영화의 전 세계 흥행 수익이 더 큰지 맞히는 빠른 비교 퀴즈입니다.",
    intro:
      "두 영화를 비교하고 더 높은 전 세계 박스오피스 수익을 고른 뒤 실제 수익을 바로 확인하세요.",
    dataStandard:
      "영화 값은 공개 박스오피스 출처의 전 세계 흥행 수익을 사용합니다. 재개봉과 집계 업데이트에 따라 값이 바뀔 수 있습니다.",
    faq: [
      {
        question: "국내 수익인가요, 전 세계 수익인가요?",
        answer:
          "MVP에서는 글로벌 사용자에게 더 적합한 전 세계 흥행 수익을 사용합니다.",
      },
      {
        question: "왜 영화 수익이 바뀔 수 있나요?",
        answer:
          "재개봉, 집계 보정, 출처 업데이트로 누적 흥행 수익이 달라질 수 있습니다.",
      },
      {
        question: "틀리면 어떻게 되나요?",
        answer:
          "즉시 게임 오버가 되고 점수, 최고점, 다시 시작, 공유 버튼이 표시됩니다.",
      },
    ],
  },
  "which-country-has-more-people": {
    title: "어느 나라에 사람이 더 많을까? 인구 퀴즈",
    description:
      "두 나라 중 어느 쪽의 인구가 더 많은지 바로 맞히는 빠른 퀴즈입니다.",
    intro:
      "간단하게 어느 나라에 사람이 더 많은지만 고르세요. 선택 후 두 나라의 실제 인구 값을 바로 보여줍니다.",
    dataStandard:
      "인구 데이터는 공개 출처 기반의 국가 단위 인구 근사값이며, 각 라운드에서 출처 링크를 제공합니다.",
    faq: [
      {
        question: "상식 퀴즈인가요, 게임인가요?",
        answer:
          "실제 데이터를 사용하는 가벼운 비교 게임이며 짧은 브라우저 세션에 맞춰 설계했습니다.",
      },
      {
        question: "작은 나라와 큰 나라를 바로 비교하나요?",
        answer:
          "너무 뻔한 문제를 줄이기 위해 가능한 한 비슷한 규모의 항목을 우선 매칭합니다.",
      },
      {
        question: "다른 카테고리도 할 수 있나요?",
        answer: "네. 도시, 영화, 동물, 산 카테고리로 전환할 수 있습니다.",
      },
    ],
  },
  "animal-speed-quiz": {
    title: "동물 속도 퀴즈: 어느 동물이 더 빠를까?",
    description: "동물의 최고 속도를 비교하고 더 빠른 쪽을 한 번에 맞혀보세요.",
    intro:
      "더 빠른 동물을 고르고 최고 속도를 확인하세요. 짧은 라운드로 연속 점수를 쌓을 수 있습니다.",
    dataStandard:
      "동물 속도 값은 공개 출처를 바탕으로 큐레이션한 최고 속도 근사값입니다.",
    faq: [
      {
        question: "동물 속도는 정확한 값인가요?",
        answer:
          "아닙니다. 측정 방식, 개체, 순간 속도 조건에 따라 달라질 수 있습니다.",
      },
      {
        question: "왜 근사값을 쓰나요?",
        answer:
          "동물 속도는 출처마다 차이가 있어 캐주얼 비교 게임에는 근사값이 더 적합합니다.",
      },
      {
        question: "같은 속도도 나올 수 있나요?",
        answer:
          "가능합니다. 라운드는 저장된 숫자 값을 기준으로 판정하고 표시값을 함께 공개합니다.",
      },
    ],
  },
  "mountain-height-quiz": {
    title: "산 높이 퀴즈: 어느 산이 더 높을까?",
    description:
      "실제 고도 데이터를 보고 어느 산이 더 높은지 맞히는 비교 게임입니다.",
    intro:
      "두 산을 비교하고 더 높은 산을 고른 뒤 각 산의 고도를 바로 확인하세요.",
    dataStandard:
      "산 높이는 일반적인 최고봉 순위 기준인 해발 고도 값을 사용합니다.",
    faq: [
      {
        question: "밑에서부터의 높이인가요, 해발 고도인가요?",
        answer: "MVP에서는 산 순위에 널리 쓰이는 해발 고도를 사용합니다.",
      },
      {
        question: "왜 비슷한 높이의 산이 자주 나오나요?",
        answer:
          "비슷한 값끼리 비교해야 문제의 재미가 유지되고 너무 쉬운 라운드를 줄일 수 있습니다.",
      },
      {
        question: "데이터는 어디서 확인할 수 있나요?",
        answer:
          "각 라운드의 출처 링크와 Sources 페이지에서 사용한 공개 출처를 확인할 수 있습니다.",
      },
    ],
  },
} satisfies Record<
  string,
  Omit<SeoContentPage, "slug" | "categorySlug" | "category">
>;

export const seoContentPages = englishSeoPages;

export function getSeoContentPage(slug: string, locale: AppLocale = "en") {
  const page = englishSeoPages.find((item) => item.slug === slug);

  if (!page || locale === "en") return page;

  const copy = koreanSeoCopy[slug as keyof typeof koreanSeoCopy];

  return copy ? { ...page, ...copy } : page;
}

export function buildSeoPageJsonLd(page: SeoContentPage, locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: page.title,
    description: page.description,
    inLanguage: locale,
    url: `${siteUrl}${getLocalizedPath(page.slug, locale)}`,
    mainEntity: page.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
