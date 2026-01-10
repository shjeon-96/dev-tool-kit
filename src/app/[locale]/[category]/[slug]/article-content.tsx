"use client";

import { useMemo, Fragment } from "react";
import { AD_SLOTS } from "@/shared/config/ad-slots";
import { AdUnit } from "@/widgets/ad-unit";
import { MediaEmbed, parseMediaMarkers } from "@/shared/ui";

interface ArticleContentProps {
  content: string;
  locale?: "ko" | "en";
}

/**
 * Converts markdown to HTML with XSS protection.
 * Content is AI-generated, but we escape HTML entities as defense-in-depth.
 * Preserves media placeholder comments for later rendering.
 */
function markdownToHtml(markdown: string): string {
  return (
    markdown
      // Escape HTML to prevent XSS (defense-in-depth for AI content)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Restore media placeholders (after escaping)
      .replace(
        /&lt;!-- media-(\d+) --&gt;/g,
        '<div class="media-placeholder" data-media-index="$1"></div>',
      )
      // Headers (after escaping so our generated tags work)
      .replace(/^### (.*)$/gim, "<h3>$1</h3>")
      .replace(/^## (.*)$/gim, "<h2>$1</h2>")
      .replace(/^# (.*)$/gim, "<h1>$1</h1>")
      // Bold and italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Blockquotes - editorial pull quote style
      .replace(
        /^&gt; (.*)$/gim,
        '<blockquote class="article-blockquote">$1</blockquote>',
      )
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
      .replace(
        /<p><div class="media-placeholder"/gim,
        '<div class="media-placeholder"',
      )
      .replace(/<\/div><\/p>/gim, "</div>")
      .replace(/<p><\/p>/gim, "")
  );
}

/**
 * Split content by media placeholders for React rendering
 */
function splitByMediaPlaceholders(
  html: string,
): { type: "html" | "media"; content: string; mediaIndex?: number }[] {
  const parts: {
    type: "html" | "media";
    content: string;
    mediaIndex?: number;
  }[] = [];
  const regex =
    /<div class="media-placeholder" data-media-index="(\d+)"><\/div>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    // Add HTML before this placeholder
    if (match.index > lastIndex) {
      const htmlPart = html.slice(lastIndex, match.index);
      if (htmlPart.trim()) {
        parts.push({ type: "html", content: htmlPart });
      }
    }
    // Add media placeholder
    parts.push({
      type: "media",
      content: "",
      mediaIndex: parseInt(match[1], 10),
    });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining HTML
  if (lastIndex < html.length) {
    const htmlPart = html.slice(lastIndex);
    if (htmlPart.trim()) {
      parts.push({ type: "html", content: htmlPart });
    }
  }

  return parts;
}

export function ArticleContent({
  content,
  locale = "en",
}: ArticleContentProps) {
  const { parts, mediaItems, showMiddleAd, middleAdInsertIndex } =
    useMemo(() => {
      // First, parse media markers
      const { cleanContent, mediaItems } = parseMediaMarkers(content);

      // Split into paragraphs for ad placement calculation
      const paragraphs = cleanContent.split("\n\n");

      // Convert to HTML
      const fullHtml = markdownToHtml(cleanContent);

      // Split by media placeholders
      const allParts = splitByMediaPlaceholders(fullHtml);

      return {
        parts: allParts,
        mediaItems,
        showMiddleAd: paragraphs.length > 4,
        middleAdInsertIndex: Math.floor(allParts.length / 2),
      };
    }, [content]);

  return (
    <div className="article-prose">
      {parts.map((part, index) => (
        <Fragment key={index}>
          {/* Insert middle ad at midpoint */}
          {showMiddleAd && index === middleAdInsertIndex && (
            <div className="my-12">
              <AdUnit
                slot={AD_SLOTS.ARTICLE_MIDDLE}
                format="rectangle"
                className="mx-auto max-w-md"
              />
            </div>
          )}

          {/* Render content part */}
          {part.type === "html" && (
            <div
              className="article-content"
              // Safe: Content is processed through markdownToHtml which escapes HTML
              // The only HTML tags are the ones we explicitly create in markdownToHtml
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          )}

          {part.type === "media" &&
            part.mediaIndex !== undefined &&
            mediaItems[part.mediaIndex] && (
              <MediaEmbed item={mediaItems[part.mediaIndex]} locale={locale} />
            )}
        </Fragment>
      ))}
    </div>
  );
}
