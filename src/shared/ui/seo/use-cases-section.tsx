import { getLabel } from "@/shared/lib/i18n";

interface UseCasesSectionProps {
  locale: string;
  title?: string;
  useCases: string[];
}

function getTitle(locale: string, customTitle?: string): string {
  if (customTitle) return customTitle;
  return getLabel("useCases", locale);
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
