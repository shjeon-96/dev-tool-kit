export { HeadlineAnalyzer } from "./ui/headline-analyzer";
export { useHeadlineAnalyzer } from "./model/use-headline-analyzer";
export {
  analyzeHeadline,
  getGradeColor,
  getHeadlineTypeLabel,
} from "./lib/analyzer";
export type {
  HeadlineAnalysis,
  HeadlineGrade,
  HeadlineType,
  WordBalance,
  SentimentResult,
  SeoAnalysis,
} from "./lib/types";
