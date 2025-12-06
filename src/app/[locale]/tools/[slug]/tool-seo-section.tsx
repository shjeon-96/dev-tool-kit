"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ToolSlug } from "@/entities/tool";

interface ToolSeoSectionProps {
  slug: ToolSlug;
  locale: string;
}

export function ToolSeoSection({ slug }: ToolSeoSectionProps) {
  const t = useTranslations("seo");
  const tSections = useTranslations("seo.sections");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Check if content exists for this tool using raw to avoid throwing on missing
  let whatIs: string | undefined;
  let howToUse: string | undefined;
  let features: string[] = [];
  let faq: { q: string; a: string }[] = [];

  try {
    const rawContent = t.raw(slug as string);
    if (rawContent && typeof rawContent === "object") {
      const content = rawContent as Record<string, unknown>;
      whatIs = content.whatIs as string | undefined;
      howToUse = content.howToUse as string | undefined;
      if (Array.isArray(content.features)) {
        features = content.features as string[];
      }
      if (Array.isArray(content.faq)) {
        faq = content.faq as { q: string; a: string }[];
      }
    }
  } catch {
    // Content not available for this tool
    return null;
  }

  if (!whatIs) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="mt-8 space-y-8 border-t pt-8">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          {tSections("whatIs")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{whatIs}</p>
      </div>

      {howToUse && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {tSections("howToUse")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{howToUse}</p>
        </div>
      )}

      {features.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {tSections("features")}
          </h2>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {faq.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {tSections("faq")}
          </h2>
          <div className="space-y-2">
            {faq.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-muted/50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-3 text-muted-foreground">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
