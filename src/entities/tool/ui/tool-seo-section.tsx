"use client";

import { useState } from "react";
import {
  ChevronDown,
  Lightbulb,
  Wrench,
  CheckCircle2,
  Target,
} from "lucide-react";
import { toolSeoContent } from "../model/seo-content";
import type { ToolSlug } from "../model/types";

interface ToolSeoSectionProps {
  slug: ToolSlug;
}

export function ToolSeoSection({ slug }: ToolSeoSectionProps) {
  const content = toolSeoContent[slug];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [openTroubleshootIndex, setOpenTroubleshootIndex] = useState<
    number | null
  >(null);

  if (!content) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleTroubleshoot = (index: number) => {
    setOpenTroubleshootIndex(openTroubleshootIndex === index ? null : index);
  };

  return (
    <section className="mt-8 space-y-8 border-t pt-8">
      {/* What is this tool? */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          이 도구는 무엇인가요?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {content.whatIs}
        </p>
      </div>

      {/* Why do you need this? - NEW */}
      {content.whyNeeded && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />왜 이 도구가
            필요한가요?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {content.whyNeeded}
          </p>
        </div>
      )}

      {/* How to use */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">사용 방법</h2>
        <p className="text-muted-foreground leading-relaxed">
          {content.howToUse}
        </p>
      </div>

      {/* Features */}
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

      {/* Advantages - NEW */}
      {content.advantages && content.advantages.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            DevToolkit의 차별점
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.advantages.map((advantage, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-muted-foreground bg-green-50 dark:bg-green-950/20 rounded-lg p-3"
              >
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Use Cases - NEW */}
      {content.useCases && content.useCases.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            실제 사용 사례
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.useCases.map((useCase, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Troubleshooting - NEW */}
      {content.troubleshooting && content.troubleshooting.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-500" />
            문제 해결 가이드
          </h2>
          <div className="space-y-2">
            {content.troubleshooting.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleTroubleshoot(index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-orange-100/50 dark:hover:bg-orange-900/20 transition-colors"
                >
                  <span className="text-orange-800 dark:text-orange-200">
                    {item.problem}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-orange-500 transition-transform ${
                      openTroubleshootIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openTroubleshootIndex === index && (
                  <div className="px-4 pb-3 text-muted-foreground border-t border-orange-200 dark:border-orange-900 pt-3">
                    <span className="font-medium text-green-600 dark:text-green-400">
                      해결:{" "}
                    </span>
                    {item.solution}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
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
                <div className="px-4 pb-3 text-muted-foreground">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
