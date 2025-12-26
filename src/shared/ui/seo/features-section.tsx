import type { LucideIcon } from "lucide-react";
import type { LocaleKey } from "@/shared/lib/i18n";

interface FeatureItem {
  text: string;
  Icon?: LucideIcon;
  iconColor?: string;
}

interface FeaturesSectionProps {
  locale: string;
  title?: string;
  features: FeatureItem[];
  variant?: "grid" | "list";
}

const defaultTitles: Record<LocaleKey, string> = {
  en: "Features",
  ko: "특징",
  ja: "特徴",
};

function getTitle(locale: string, customTitle?: string): string {
  if (customTitle) return customTitle;
  if (locale === "ko" || locale === "ja") return defaultTitles[locale];
  return defaultTitles.en;
}

/**
 * Features Section Component
 *
 * pSEO 페이지에서 사용하는 기능/특징 섹션
 * variant: "grid" (아이콘 + 카드) 또는 "list" (리스트)
 */
export function FeaturesSection({
  locale,
  title,
  features,
  variant = "list",
}: FeaturesSectionProps) {
  if (features.length === 0) return null;

  const sectionTitle = getTitle(locale, title);

  if (variant === "grid") {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-3">{sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              {feature.Icon && (
                <feature.Icon
                  className={`h-5 w-5 flex-shrink-0 mt-0.5 ${feature.iconColor || "text-primary"}`}
                />
              )}
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{sectionTitle}</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {features.map((feature, index) => (
          <li key={index}>{feature.text}</li>
        ))}
      </ul>
    </div>
  );
}
