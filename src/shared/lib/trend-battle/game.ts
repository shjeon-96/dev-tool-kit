import type { GameRound, TrendAnswer, TrendItem } from "@/shared/types/trend";

type RandomSource = () => number;

const minComparableRatio = 1.1;
const maxComparableRatio = 5;

export function pickRandomItem<T>(items: readonly T[], random: RandomSource) {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty item list");
  }

  const index = Math.floor(random() * items.length) % items.length;
  return items[index];
}

export function pickComparableItem(
  base: TrendItem,
  items: readonly TrendItem[],
  random: RandomSource = Math.random,
) {
  const candidates = items.filter((item) => {
    if (item.id === base.id) return false;

    const max = Math.max(base.value, item.value);
    const min = Math.min(base.value, item.value);
    const ratio = max / min;

    return ratio >= minComparableRatio && ratio <= maxComparableRatio;
  });

  const comparableItems =
    candidates.length > 0
      ? candidates
      : items.filter((item) => item.id !== base.id);

  return pickRandomItem(comparableItems, random);
}

export function createRound(
  items: readonly TrendItem[],
  random: RandomSource = Math.random,
): GameRound {
  if (items.length < 2) {
    throw new Error("At least two trend items are required to create a round");
  }

  const leftItem = pickRandomItem(items, random);
  const rightItem = pickComparableItem(leftItem, items, random);

  return {
    leftItem,
    rightItem,
    category: leftItem.category,
    correctAnswer: leftItem.value >= rightItem.value ? "left" : "right",
  };
}

export function isCorrectAnswer(round: GameRound, answer: TrendAnswer) {
  return round.correctAnswer === answer;
}
