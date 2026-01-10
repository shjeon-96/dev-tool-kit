"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Play, ExternalLink, Maximize2 } from "lucide-react";
import type { MediaItem, MediaProvider } from "@/shared/types/media";
import { cn } from "@/shared/lib/utils";

interface MediaEmbedProps {
  item: MediaItem;
  locale?: "ko" | "en";
  className?: string;
  lazy?: boolean;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Extract Vimeo video ID from URL
 */
function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Extract CodePen embed info from URL
 */
function extractCodePenInfo(
  url: string,
): { user: string; slug: string } | null {
  const match = url.match(/codepen\.io\/([^/]+)\/pen\/([^/?]+)/);
  return match ? { user: match[1], slug: match[2] } : null;
}

/**
 * Extract Naver Clip ID from URL
 */
function extractNaverClipId(url: string): string | null {
  const match = url.match(/tv\.naver\.com\/(?:v\/|embed\/)(\d+)/);
  return match ? match[1] : null;
}

/**
 * YouTube Embed Component with lazy loading
 */
function YouTubeEmbed({
  videoId,
  title,
  aspectRatio = "16:9",
}: {
  videoId: string;
  title?: string;
  aspectRatio?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const aspectClass = getAspectClass(aspectRatio);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <button
        onClick={handleLoad}
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-black group cursor-pointer",
          aspectClass,
        )}
        aria-label={`Play ${title || "YouTube video"}`}
      >
        <Image
          src={thumbnailUrl}
          alt={title || "YouTube video thumbnail"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl", aspectClass)}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

/**
 * Vimeo Embed Component
 */
function VimeoEmbed({
  videoId,
  title,
  aspectRatio = "16:9",
}: {
  videoId: string;
  title?: string;
  aspectRatio?: string;
}) {
  const aspectClass = getAspectClass(aspectRatio);

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl", aspectClass)}
    >
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?dnt=1`}
        title={title || "Vimeo video"}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

/**
 * CodePen Embed Component
 */
function CodePenEmbed({
  user,
  slug,
  title,
}: {
  user: string;
  slug: string;
  title?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-card">
      <iframe
        src={`https://codepen.io/${user}/embed/${slug}?default-tab=result&theme-id=dark`}
        title={title || "CodePen embed"}
        loading="lazy"
        allowFullScreen
        className="w-full h-[400px] md:h-[500px]"
      />
    </div>
  );
}

/**
 * Naver Clip Embed Component (vertical video)
 */
function NaverClipEmbed({ clipId, title }: { clipId: string; title?: string }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-[300px] aspect-[9/16] overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://tv.naver.com/embed/${clipId}`}
          title={title || "Naver Clip video"}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

/**
 * Generic iframe embed
 */
function IframeEmbed({
  url,
  title,
  aspectRatio = "16:9",
}: {
  url: string;
  title?: string;
  aspectRatio?: string;
}) {
  const aspectClass = getAspectClass(aspectRatio);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border",
        aspectClass,
      )}
    >
      <iframe
        src={url}
        title={title || "Embedded content"}
        loading="lazy"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

/**
 * Image embed with lightbox support
 */
function ImageEmbed({
  url,
  caption,
  aspectRatio,
}: {
  url: string;
  caption?: string;
  aspectRatio?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const aspectClass = aspectRatio ? getAspectClass(aspectRatio) : "aspect-auto";

  return (
    <>
      <figure className="relative group">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-xl bg-muted cursor-zoom-in",
            aspectClass,
          )}
          onClick={() => setIsExpanded(true)}
        >
          <Image
            src={url}
            alt={caption || "Article image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 rounded-full bg-black/50 text-white">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2 text-sm text-muted-foreground text-center">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsExpanded(false)}
        >
          <Image
            src={url}
            alt={caption || "Article image"}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

/**
 * Get Tailwind aspect ratio class
 */
function getAspectClass(ratio: string): string {
  switch (ratio) {
    case "16:9":
      return "aspect-video";
    case "4:3":
      return "aspect-[4/3]";
    case "1:1":
      return "aspect-square";
    case "9:16":
      return "aspect-[9/16]";
    default:
      return "aspect-video";
  }
}

/**
 * Detect provider from URL if not specified
 */
function detectProvider(url: string): MediaProvider | undefined {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  if (url.includes("codepen.io")) return "codepen";
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  if (url.includes("tv.naver.com")) return "naver_clip";
  return undefined;
}

/**
 * Main MediaEmbed component
 * Renders appropriate embed based on media type and provider
 */
export function MediaEmbed({
  item,
  locale = "en",
  className,
}: MediaEmbedProps) {
  const caption = locale === "ko" ? item.caption_ko : item.caption_en;
  const provider = item.provider || detectProvider(item.url);

  return (
    <div className={cn("my-8", className)}>
      {item.type === "video" && provider === "youtube" && (
        <YouTubeEmbed
          videoId={extractYouTubeId(item.url) || ""}
          title={caption}
          aspectRatio={item.aspectRatio}
        />
      )}

      {item.type === "video" && provider === "vimeo" && (
        <VimeoEmbed
          videoId={extractVimeoId(item.url) || ""}
          title={caption}
          aspectRatio={item.aspectRatio}
        />
      )}

      {item.type === "video" && provider === "naver_clip" && (
        <NaverClipEmbed
          clipId={extractNaverClipId(item.url) || ""}
          title={caption}
        />
      )}

      {item.type === "embed" && provider === "codepen" && (
        <CodePenEmbed
          {...(extractCodePenInfo(item.url) || { user: "", slug: "" })}
          title={caption}
        />
      )}

      {item.type === "embed" && !["codepen"].includes(provider || "") && (
        <IframeEmbed
          url={item.url}
          title={caption}
          aspectRatio={item.aspectRatio}
        />
      )}

      {item.type === "image" && (
        <ImageEmbed
          url={item.url}
          caption={caption}
          aspectRatio={item.aspectRatio}
        />
      )}

      {/* Caption for video/embed types */}
      {caption && item.type !== "image" && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </p>
      )}

      {/* External link for non-embeddable content */}
      {item.type === "embed" && provider === "twitter" && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-4 rounded-xl border bg-card hover:bg-secondary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View on Twitter/X</span>
        </a>
      )}
    </div>
  );
}

/**
 * Parse media markers in content and return MediaItem array
 * Supports formats like:
 * {{video:https://youtube.com/watch?v=xxx}}
 * {{video:https://youtube.com/watch?v=xxx|caption_ko|caption_en}}
 * {{image:https://example.com/image.jpg|caption}}
 * {{embed:https://codepen.io/user/pen/slug}}
 */
export function parseMediaMarkers(content: string): {
  cleanContent: string;
  mediaItems: MediaItem[];
} {
  const mediaItems: MediaItem[] = [];
  const markerRegex = /\{\{(video|image|embed|chart):([^}]+)\}\}/g;

  const cleanContent = content.replace(markerRegex, (_, type, data) => {
    const parts = data.split("|");
    const url = parts[0].trim();
    const caption_ko = parts[1]?.trim();
    const caption_en = parts[2]?.trim() || caption_ko;

    mediaItems.push({
      type: type as MediaItem["type"],
      url,
      caption_ko,
      caption_en,
      provider: detectProvider(url),
    });

    // Return placeholder for later rendering
    return `\n\n<!-- media-${mediaItems.length - 1} -->\n\n`;
  });

  return { cleanContent, mediaItems };
}
