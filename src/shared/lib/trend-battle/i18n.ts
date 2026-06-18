import type { AppLocale } from "@/shared/types/trend";

export const supportedLocales = ["en", "ko"] as const satisfies AppLocale[];

export const messages = {
  en: {
    languageName: "English",
    otherLanguageName: "한국어",
    otherLanguageHref: "/ko",
    heroTitle: "Guess which one is bigger.",
    randomLabel: "Random battle",
    randomShortLabel: "Random",
    randomQuestion: "Which one is bigger?",
    randomClassicPrompt: "Is the next one higher or lower?",
    score: "Score",
    best: "Best",
    duel: "Duel",
    classic: "Classic",
    thisSide: "This",
    thatSide: "That",
    nextSide: "Next",
    knownValue: "Known value",
    mysteryValue: "Guess this value",
    higher: "Higher",
    lower: "Lower",
    tapToChoose: "Tap to choose",
    correct: "Correct!",
    gameOver: "Game Over",
    scored: "You scored",
    bestScore: "Best score",
    next: "Next",
    playAgain: "Play again",
    shareResult: "Share result",
    shared: "Shared.",
    copied: "Result copied.",
    shareUnavailable: "Sharing is unavailable.",
    data: "Data",
    advertisement: "Advertisement",
    aboutCategoryTitle: "About this category",
    aboutCategoryBody:
      "Values are shown after each answer so the game stays fast while still making the data clear.",
    matchingBody:
      "Matching prefers close comparisons, avoiding pairs where the answer is too obvious. Data sources are linked in each round and summarized on the Sources page.",
    playByCategory: "Play by category",
    daily: "Daily",
    dailyTitle: "Daily 10-question challenge",
    dailySubtitle:
      "Ten fixed rounds for today. One run, one score, no login required.",
    questionProgress: "Question",
    finishDaily: "Finish daily challenge",
    dailyComplete: "Daily complete",
    dailySaved: "Today's score saved.",
    playDailyAgain: "Play today's challenge again",
    tryAnotherCategory: "Try another category",
  },
  ko: {
    languageName: "한국어",
    otherLanguageName: "English",
    otherLanguageHref: "/",
    heroTitle: "어느 쪽이 더 클까요?",
    randomLabel: "랜덤 배틀",
    randomShortLabel: "랜덤",
    randomQuestion: "어느 쪽이 더 클까요?",
    randomClassicPrompt: "다음 항목은 더 높을까요, 낮을까요?",
    score: "점수",
    best: "최고점",
    duel: "대결",
    classic: "클래식",
    thisSide: "이쪽",
    thatSide: "저쪽",
    nextSide: "다음",
    knownValue: "기준값",
    mysteryValue: "이 값 맞히기",
    higher: "더 높다",
    lower: "더 낮다",
    tapToChoose: "눌러서 선택",
    correct: "정답!",
    gameOver: "게임 오버",
    scored: "최종 점수",
    bestScore: "최고점",
    next: "다음",
    playAgain: "다시 시작",
    shareResult: "결과 공유",
    shared: "공유했어요.",
    copied: "결과를 복사했어요.",
    shareUnavailable: "공유를 사용할 수 없어요.",
    data: "데이터",
    advertisement: "광고 영역",
    aboutCategoryTitle: "이 카테고리 소개",
    aboutCategoryBody:
      "정답을 고른 뒤 실제 수치를 바로 보여줘서 빠르게 즐기면서도 데이터를 확인할 수 있습니다.",
    matchingBody:
      "너무 뻔한 비교를 줄이기 위해 비슷한 규모의 항목끼리 우선 매칭합니다. 각 라운드의 데이터 출처는 링크로 확인할 수 있습니다.",
    playByCategory: "카테고리별 플레이",
    daily: "데일리",
    dailyTitle: "오늘의 10문제 챌린지",
    dailySubtitle:
      "오늘 날짜에 고정된 10개 라운드입니다. 로그인 없이 점수를 남길 수 있습니다.",
    questionProgress: "문제",
    finishDaily: "데일리 챌린지 종료",
    dailyComplete: "데일리 완료",
    dailySaved: "오늘 점수를 저장했어요.",
    playDailyAgain: "오늘 챌린지 다시 플레이",
    tryAnotherCategory: "다른 카테고리도 해보기",
  },
} as const;

export function getLocalePrefix(locale: AppLocale) {
  return locale === "ko" ? "/ko" : "";
}

export function getLocalizedPath(slug: string, locale: AppLocale) {
  const prefix = getLocalePrefix(locale);
  const normalizedSlug = slug === "home" ? "" : `/${slug}`;

  return `${prefix}${normalizedSlug}` || "/";
}

export function getAlternateLocale(locale: AppLocale): AppLocale {
  return locale === "ko" ? "en" : "ko";
}

export function getLocaleFromParam(locale?: string): AppLocale {
  return locale === "ko" ? "ko" : "en";
}
