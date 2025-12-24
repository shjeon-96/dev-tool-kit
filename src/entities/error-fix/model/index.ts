export type {
  ErrorFixSlug,
  ErrorFix,
  ErrorCategory,
  ErrorSeverity,
  FixStep,
  RelatedToolInfo,
  ErrorFaq,
  ErrorCategoryConfig,
} from "./types";

export {
  errorFixes,
  errorCategories,
  getErrorFix,
  getErrorFixSlugs,
  getErrorsByCategory,
  getSortedCategories,
} from "./registry";
