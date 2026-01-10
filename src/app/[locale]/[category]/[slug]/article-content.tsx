"use client";

import { useMemo } from "react";
import { AD_SLOTS } from "@/shared/config/ad-slots";
import { AdUnit } from "@/widgets/ad-unit";

interface ArticleContentProps {
  content: string;
}

/**
 * Converts markdown to HTML with XSS protection.
 * Content is AI-generated, but we escape HTML entities as defense-in-depth.
 */
function markdownToHtml(markdown: string): string {
  return markdown
    // Escape HTML to prevent XSS (defense-in-depth for AI content)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headers (after escaping so our generated tags work)
    .replace(/^### (.*)$/gim, "<h3>$1</h3>")
    .replace(/^## (.*)$/gim, "<h2>$1</h2>")
    .replace(/^# (.*)$/gim, "<h1>$1</h1>")
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Blockquotes - editorial pull quote style
    .replace(/^&gt; (.*)$/gim, '<blockquote class="article-blockquote">$1</blockquote>')
    // Lists
    .replace(/^\- (.*)$/gim, "<li>$1</li>")
    .replace(/^\d+\. (.*)$/gim, "<li>$1</li>")
    // Links - only allow http/https protocols
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gim,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="article-link">$1</a>',
    )
    // Code blocks
    .replace(
      /```(\w+)?\n([\s\S]*?)```/gim,
      '<pre class="article-code-block"><code>$2</code></pre>',
    )
    .replace(/`([^`]+)`/gim, '<code class="article-inline-code">$1</code>')
    // Paragraphs
    .replace(/\n\n/gim, "</p><p>")
    .replace(/^(.+)$/gim, "<p>$1</p>")
    // Clean up
    .replace(/<p><h/gim, "<h")
    .replace(/<\/h(\d)><\/p>/gim, "</h$1>")
    .replace(/<p><li>/gim, "<ul class='article-list'><li>")
    .replace(/<\/li><\/p>/gim, "</li></ul>")
    .replace(/<\/ul><ul[^>]*>/gim, "")
    .replace(/<p><pre/gim, "<pre")
    .replace(/<\/pre><\/p>/gim, "</pre>")
    .replace(/<p><blockquote/gim, "<blockquote")
    .replace(/<\/blockquote><\/p>/gim, "</blockquote>")
    .replace(/<p><\/p>/gim, "");
}

export function ArticleContent({ content }: ArticleContentProps) {
  const { firstHalf, secondHalf, showMiddleAd } = useMemo(() => {
    const paragraphs = content.split("\n\n");
    const midPoint = Math.floor(paragraphs.length / 2);
    return {
      firstHalf: markdownToHtml(paragraphs.slice(0, midPoint).join("\n\n")),
      secondHalf: markdownToHtml(paragraphs.slice(midPoint).join("\n\n")),
      showMiddleAd: paragraphs.length > 4,
    };
  }, [content]);

  return (
    <div className="article-prose">
      {/* First Half of Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: firstHalf }}
      />

      {/* Middle Ad */}
      {showMiddleAd && (
        <div className="my-12">
          <AdUnit slot={AD_SLOTS.ARTICLE_MIDDLE} format="rectangle" className="mx-auto max-w-md" />
        </div>
      )}

      {/* Second Half of Content */}
      {secondHalf && (
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: secondHalf }}
        />
      )}
    </div>
  );
}
