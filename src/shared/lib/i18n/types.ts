/**
 * Shared i18n Types
 *
 * 모든 레지스트리에서 공유하는 i18n 타입 정의
 * - LocaleKey: 실제 콘텐츠가 있는 언어 (en, ko, ja)
 * - SupportedLocale: 라우팅에서 지원하는 모든 언어 (6개)
 */

/**
 * 콘텐츠가 존재하는 언어 키
 * 레지스트리의 content 객체에서 사용
 */
export type LocaleKey = "en" | "ko" | "ja";

/**
 * 라우팅에서 지원하는 모든 로케일
 * next-intl routing.ts와 동기화 필요
 */
export type SupportedLocale = "en" | "ko" | "ja" | "es" | "pt" | "de";

/**
 * 로케일 문자열을 LocaleKey로 안전하게 변환
 * es, pt, de는 en으로 폴백
 *
 * @param locale - 라우트에서 받은 로케일 문자열
 * @returns LocaleKey (en | ko | ja)
 *
 * @example
 * ```typescript
 * const localeKey = getSafeLocaleKey(locale);
 * const content = item.content[localeKey];
 * ```
 */
export function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

/**
 * 로케일 키가 유효한 LocaleKey인지 확인
 */
export function isValidLocaleKey(locale: string): locale is LocaleKey {
  return locale === "en" || locale === "ko" || locale === "ja";
}

/**
 * 다국어 콘텐츠 타입
 * 모든 LocaleKey에 대해 동일한 타입의 콘텐츠를 가짐
 *
 * @template T - 콘텐츠 타입
 *
 * @example
 * ```typescript
 * interface MyContent {
 *   title: string;
 *   description: string;
 * }
 *
 * const content: LocalizedContent<MyContent> = {
 *   en: { title: "Hello", description: "..." },
 *   ko: { title: "안녕", description: "..." },
 *   ja: { title: "こんにちは", description: "..." },
 * };
 * ```
 */
export interface LocalizedContent<T> {
  en: T;
  ko: T;
  ja: T;
}

/**
 * 로케일별 콘텐츠 안전 접근
 * LocalizedContent에서 현재 로케일의 콘텐츠를 가져옴
 *
 * @template T - 콘텐츠 타입
 * @param content - LocalizedContent 객체
 * @param locale - 현재 로케일 문자열
 * @returns 해당 로케일의 콘텐츠 (폴백: en)
 */
export function getLocalizedContent<T>(
  content: LocalizedContent<T>,
  locale: string,
): T {
  const key = getSafeLocaleKey(locale);
  return content[key];
}
