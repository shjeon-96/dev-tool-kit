"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { cn } from "@/shared/lib";
import { Button, AdUnit } from "@/shared/ui";
import { AD_SLOTS } from "@/shared/config";
import { tools } from "@/entities/tool";
import type { Guide } from "../model/types";
import { TableOfContents } from "./table-of-contents";

interface GuideContentProps {
  guide: Guide;
  sections: Array<{
    id: string;
    title: string;
    content: string;
    code?: string;
    language?: string;
  }>;
  relatedToolsData: Array<{
    slug: string;
    title: string;
  }>;
  prevGuide?: { slug: string; title: string } | null;
  nextGuide?: { slug: string; title: string } | null;
}

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function GuideContent({
  guide,
  sections,
  relatedToolsData,
  prevGuide,
  nextGuide,
}: GuideContentProps) {
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<string | undefined>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const tool = tools[guide.slug as keyof typeof tools];

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <article className="flex-1 min-w-0">
        {/* Back link */}
        <Link
          href={`/${locale}/guides`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          All Guides
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {tool && (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">
                {relatedToolsData[0]?.title || guide.slug} Guide
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    difficultyColors[guide.difficulty],
                  )}
                >
                  {difficultyLabels[guide.difficulty]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {guide.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-6">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">
                  {section.content}
                </p>
              </div>
              {section.code && (
                <div className="mt-4">
                  <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto text-sm">
                    <code className={`language-${section.language || "text"}`}>
                      {section.code}
                    </code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Try Tool CTA */}
        <div className="mt-10 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Try it yourself</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Put your knowledge into practice with our free online tool.
          </p>
          <Button asChild>
            <Link href={`/${locale}/tools/${guide.slug}`}>
              Open {relatedToolsData[0]?.title || guide.slug}
            </Link>
          </Button>
        </div>

        {/* 광고: 가이드 하단 */}
        <AdUnit
          slot={AD_SLOTS.GUIDE_BOTTOM}
          format="horizontal"
          className="my-8"
        />

        {/* Related Tools */}
        {guide.relatedTools.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedToolsData.slice(1).map((related) => {
                const relatedTool = tools[related.slug as keyof typeof tools];
                return (
                  <Link
                    key={related.slug}
                    href={`/${locale}/tools/${related.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/30 transition-all"
                  >
                    {relatedTool && (
                      <relatedTool.icon className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">{related.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 pt-6 border-t flex justify-between">
          {prevGuide ? (
            <Link
              href={`/${locale}/guides/${prevGuide.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{prevGuide.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextGuide && (
            <Link
              href={`/${locale}/guides/${nextGuide.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{nextGuide.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </article>

      {/* Sidebar - Table of Contents */}
      <aside className="hidden lg:block w-64 shrink-0">
        <TableOfContents
          sections={sections.map((s) => ({ id: s.id, title: s.title }))}
          activeId={activeSection}
        />
      </aside>
    </div>
  );
}
