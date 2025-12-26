import type { LocaleKey } from "@/shared/lib/i18n";

interface UseCasesSectionProps {
  locale: string;
  title?: string;
  useCases: string[];
}

const defaultTitles: Record<LocaleKey, string> = {
  en: "Use Cases",
  ko: "사용 사례",
  ja: "使用例",
};

function getTitle(locale: string, customTitle?: string): string {
  if (customTitle) return customTitle;
  if (locale === "ko" || locale === "ja") return defaultTitles[locale];
  return defaultTitles.en;
}

/**
 * Use Cases Section Component
 *
 * pSEO 페이지에서 사용하는 사용 사례 섹션
 */
export function UseCasesSection({
  locale,
  title,
  useCases,
}: UseCasesSectionProps) {
  if (useCases.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{getTitle(locale, title)}</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {useCases.map((useCase, index) => (
          <li key={index}>{useCase}</li>
        ))}
      </ul>
    </div>
  );
}
