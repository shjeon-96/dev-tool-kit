"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toolSeoContent } from "../model/seo-content";
import type { ToolSlug } from "../model/types";

interface ToolSeoSectionProps {
  slug: ToolSlug;
}

export function ToolSeoSection({ slug }: ToolSeoSectionProps) {
  const content = toolSeoContent[slug];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!content) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="mt-8 space-y-8 border-t pt-8">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          이 도구는 무엇인가요?
        </h2>
        <p className="text-muted-foreground leading-relaxed">{content.whatIs}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">사용 방법</h2>
        <p className="text-muted-foreground leading-relaxed">
          {content.howToUse}
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">특징</h2>
        <ul className="space-y-2">
          {content.features.map((feature, index) => (
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

      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">자주 묻는 질문</h2>
        <div className="space-y-2">
          {content.faq.map((item, index) => (
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
    </section>
  );
}
