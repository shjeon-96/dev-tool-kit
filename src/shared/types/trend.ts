export type TrendCategory =
  | "country_population"
  | "city_population"
  | "movie_box_office"
  | "animal_speed"
  | "mountain_height";

export type TrendAnswer = "left" | "right";
export type TrendGameMode = "daily" | "practice";

export interface TrendItem {
  id: string;
  category: TrendCategory;
  name: string;
  value: number;
  unit: string;
  displayValue: string;
  sourceName: string;
  sourceUrl: string;
  updatedAt: string;
  note?: string;
}

export interface GameRound {
  leftItem: TrendItem;
  rightItem: TrendItem;
  category: TrendCategory;
  correctAnswer: TrendAnswer;
}

export interface TrendCategoryConfig {
  category: TrendCategory;
  label: string;
  shortLabel: string;
  slug: string;
  question: string;
  valueLabel: string;
  seoTitle: string;
  seoDescription: string;
}
