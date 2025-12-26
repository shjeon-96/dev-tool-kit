import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { ToolSlug } from "../model/types";
import { tools } from "../model/registry";
import { guides } from "@/entities/guide";

interface RelatedToolsSSRProps {
  currentTool: ToolSlug;
  locale: string;
  maxLinks?: number;
}

/**
 * Server-Side Rendered Related Tools & Guide Link
 *
 * SEO를 위해 서버에서 렌더링되는 정적 관련 도구 링크
 * 크롤러가 이 링크들을 통해 다른 페이지로 이동할 수 있음
 */
export function RelatedToolsSSR({
  currentTool,
  locale,
  maxLinks = 6,
}: RelatedToolsSSRProps) {
  const tool = tools[currentTool];
  const hasGuide = currentTool in guides;

  // 관련 도구가 없고 가이드도 없으면 렌더링하지 않음
  if (!tool?.relatedTools?.length && !hasGuide) return null;

  const relatedToolsList = (tool?.relatedTools || [])
    .slice(0, maxLinks)
    .map((slug) => ({
      slug,
      tool: tools[slug],
    }))
    .filter(({ tool: t }) => t);

  return (
    <nav aria-label="Related content" className="mt-8 border-t pt-6">
      {/* 가이드 링크 */}
      {hasGuide && (
        <div className="mb-6">
          <Link
            href={`/${locale}/guides/${currentTool}`}
            className="group flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-semibold text-primary">
                📖 Read the Complete Guide
              </span>
              <span className="block text-sm text-muted-foreground">
                Learn how to use {tool?.title} effectively with examples and
                best practices
              </span>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      {/* 관련 도구 */}
      {relatedToolsList.length > 0 && (
        <div itemScope itemType="https://schema.org/ItemList">
          <h2 className="mb-4 text-lg font-semibold">Related Tools</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedToolsList.map(({ slug, tool: relatedTool }, index) => (
              <li
                key={slug}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <Link
                  href={`/${locale}/tools/${slug}`}
                  className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                  itemProp="url"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted group-hover:bg-background">
                    <relatedTool.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className="block truncate font-medium"
                      itemProp="name"
                    >
                      {relatedTool.title}
                    </span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {relatedTool.description}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
