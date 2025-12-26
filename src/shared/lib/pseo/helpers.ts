/**
 * pSEO Page Helpers
 *
 * pSEO 페이지에서 공통으로 사용하는 헬퍼 함수들
 */

import type { LocaleKey } from "@/shared/lib/i18n";
import { getSafeLocaleKey } from "@/shared/lib/i18n";
import type { BreadcrumbItem, LocalizedText } from "./types";
import { SITE_CONFIG } from "@/shared/config";

/**
 * 로케일별 텍스트 가져오기
 */
export function getLocalizedText(texts: LocalizedText, locale: string): string {
  const key = getSafeLocaleKey(locale);
  return texts[key];
}

/**
 * 홈 라벨 가져오기
 */
export function getHomeLabel(locale: string): string {
  const labels: LocalizedText = {
    en: "Home",
    ko: "홈",
    ja: "ホーム",
  };
  return getLocalizedText(labels, locale);
}

/**
 * 브레드크럼 아이템 생성
 */
export function createBreadcrumbItems(
  locale: string,
  categoryName: string,
  currentTitle: string,
  routePrefix: string,
  slug: string,
): BreadcrumbItem[] {
  return [
    {
      name: getHomeLabel(locale),
      url: SITE_CONFIG.url,
    },
    {
      name: categoryName,
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: currentTitle,
      url: `${SITE_CONFIG.url}/${locale}/${routePrefix}/${slug}`,
    },
  ];
}

/**
 * OG 이미지 URL 생성
 */
export function createOGImageUrl(title: string, description: string): string {
  return `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
}

/**
 * 대체 언어 URL 생성
 */
export function createAlternateLanguages(
  locales: readonly string[],
  routePrefix: string,
  slug: string,
): Record<string, string> {
  return Object.fromEntries(
    locales.map((l) => [l, `${SITE_CONFIG.url}/${l}/${routePrefix}/${slug}`]),
  );
}

/**
 * 공통 기능 텍스트 (클라이언트 사이드 처리 관련)
 */
export function getCommonFeatures(locale: string): string[] {
  const features: Record<LocaleKey, string[]> = {
    en: [
      "100% client-side - your data never leaves your browser",
      "Instant processing - results appear immediately",
      "No registration required - completely free to use",
      "Privacy-first - no data is sent to servers",
    ],
    ko: [
      "100% 클라이언트 사이드 - 데이터가 서버로 전송되지 않습니다",
      "즉시 처리 - 결과가 즉시 표시됩니다",
      "회원가입 불필요 - 완전 무료 사용",
      "프라이버시 우선 - 서버로 데이터가 전송되지 않습니다",
    ],
    ja: [
      "100%クライアントサイド - データはサーバーに送信されません",
      "即座に処理 - 結果がすぐに表示されます",
      "登録不要 - 完全に無料で使用可能",
      "プライバシー重視 - サーバーにデータは送信されません",
    ],
  };

  const key = getSafeLocaleKey(locale);
  return features[key];
}
