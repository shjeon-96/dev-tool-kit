"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { tools, type ToolSlug } from "../model";

interface RelatedToolsProps {
  currentSlug: ToolSlug;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const locale = useLocale();
  const t = useTranslations("tools");
  const currentTool = tools[currentSlug];

  if (!currentTool?.relatedTools || currentTool.relatedTools.length === 0) {
    return null;
  }

  const relatedToolsList = currentTool.relatedTools
    .filter((slug) => tools[slug])
    .slice(0, 4);

  if (relatedToolsList.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 space-y-4 border-t pt-8">
      <h2 className="text-xl font-semibold tracking-tight">관련 도구</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relatedToolsList.map((slug) => {
          const tool = tools[slug];
          const Icon = tool.icon;

          return (
            <Link
              key={slug}
              href={`/${locale}/tools/${slug}`}
              className="group flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-muted transition-transform group-hover:scale-110 flex-shrink-0">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                    {t(`${slug}.title`)}
                  </h3>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary flex-shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                  {t(`${slug}.description`)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
