/**
 * Media Types for Multimodal Content
 *
 * Shared media type definitions for embeds and content rendering.
 * Used by both shared UI components and entity models.
 */

/**
 * Supported media providers for embedded content
 */
export type MediaProvider =
  | "youtube"
  | "vimeo"
  | "codepen"
  | "twitter"
  | "naver_clip";

/**
 * Media item for article embeds
 */
export interface MediaItem {
  type: "video" | "image" | "embed" | "chart";
  url: string;
  provider?: MediaProvider;
  caption_ko?: string;
  caption_en?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16";
  thumbnailUrl?: string;
}
