import type { AppLocale, GameRound } from "@/shared/types/trend";

const closeCallRatio = 2;

export function formatRoundResult(round: GameRound) {
  return [
    `${round.leftItem.name}: ${round.leftItem.displayValue}`,
    `${round.rightItem.name}: ${round.rightItem.displayValue}`,
  ];
}

export function formatRoundInsight(round: GameRound, locale: AppLocale) {
  const max = Math.max(round.leftItem.value, round.rightItem.value);
  const min = Math.min(round.leftItem.value, round.rightItem.value);
  const ratio = max / min;

  if (ratio <= closeCallRatio) {
    return locale === "ko" ? "아슬아슬한 비교였어요." : "Close call.";
  }

  return locale === "ko"
    ? "많은 사람이 헷갈릴 수 있는 문제예요."
    : "Most people might guess this wrong.";
}

export function formatShareText(
  score: number,
  categoryLabel: string,
  locale: AppLocale,
) {
  if (locale === "ko") {
    return `Trend Battle ${categoryLabel}에서 ${score}점을 기록했어요. 어느 쪽이 더 큰지 맞혀보세요.`;
  }

  return `I scored ${score} in Trend Battle: ${categoryLabel}. Guess which one is bigger.`;
}
