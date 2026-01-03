import { getLabel } from "@/shared/lib/i18n";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  locale: string;
  faqs: FAQItem[];
}

/**
 * FAQ Section Component
 *
 * pSEO 페이지에서 사용하는 FAQ 섹션
 */
export function FAQSectionSEO({ locale, faqs }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{getLabel("faq", locale)}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="font-medium mb-1">{faq.q}</h3>
            <p className="text-muted-foreground text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
