/**
 * Image Resize Target Types - Programmatic SEO용 이미지 리사이즈 타겟 타입 정의
 */

// 리사이즈 타겟 유형
export type ResizeTargetType = "file-size" | "dimension" | "platform";

// 파일 사이즈 타겟 (KB 단위)
export type FileSizeTarget =
  | "10kb"
  | "20kb"
  | "50kb"
  | "100kb"
  | "200kb"
  | "500kb"
  | "1mb"
  | "2mb"
  | "5mb";

// 디멘션 타겟 (정사각형 및 일반 크기)
export type DimensionTarget =
  // 정사각형
  | "100x100"
  | "200x200"
  | "300x300"
  | "400x400"
  | "500x500"
  | "600x600"
  | "800x800"
  | "1000x1000"
  | "1200x1200"
  // 16:9 비율
  | "1920x1080"
  | "1280x720"
  | "854x480"
  // 4:3 비율
  | "1024x768"
  | "800x600"
  | "640x480"
  // 세로 비율 (9:16)
  | "1080x1920"
  | "720x1280";

// 플랫폼별 타겟
export type PlatformTarget =
  // Social Media Profile
  | "instagram-profile" // 320x320
  | "facebook-profile" // 180x180
  | "twitter-profile" // 400x400
  | "linkedin-profile" // 400x400
  | "youtube-profile" // 800x800
  // Social Media Post
  | "instagram-post" // 1080x1080
  | "instagram-story" // 1080x1920
  | "facebook-post" // 1200x630
  | "twitter-post" // 1200x675
  | "linkedin-post" // 1200x627
  // Thumbnail
  | "youtube-thumbnail" // 1280x720
  | "og-image" // 1200x630
  // Favicon
  | "favicon-16" // 16x16
  | "favicon-32" // 32x32
  | "favicon-48" // 48x48
  | "favicon-64" // 64x64
  | "favicon-96" // 96x96
  | "favicon-192" // 192x192
  | "favicon-512" // 512x512
  // App Icons
  | "ios-icon-60" // 60x60
  | "ios-icon-120" // 120x120
  | "ios-icon-180" // 180x180
  | "android-icon-48" // 48x48
  | "android-icon-72" // 72x72
  | "android-icon-96" // 96x96
  | "android-icon-144" // 144x144
  | "android-icon-192"; // 192x192

// 지원 로케일
export type SupportedLocale = "en" | "ko" | "ja";

// 리사이즈 타겟 정의
export interface ResizeTarget {
  slug: string;
  type: ResizeTargetType;
  // 파일 사이즈 타겟 (type이 'file-size'일 때)
  targetSizeKB?: number;
  // 디멘션 타겟 (type이 'dimension' 또는 'platform'일 때)
  targetWidth?: number;
  targetHeight?: number;
  // 플랫폼 정보 (type이 'platform'일 때)
  platform?: string;
  // SEO 메타데이터
  title: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  keywords: Record<SupportedLocale, string[]>;
  // 추가 컨텍스트
  useCases?: Record<SupportedLocale, string[]>;
}

// 리사이즈 설정
export interface ResizeSettings {
  maxWidth?: number;
  maxHeight?: number;
  targetSizeKB?: number;
  quality: number;
  format: "jpeg" | "png" | "webp";
  maintainAspectRatio: boolean;
}

// 리사이즈 결과
export interface ResizeResult {
  success: boolean;
  file?: File;
  preview?: string;
  originalSize: number;
  newSize: number;
  width: number;
  height: number;
  error?: string;
}
