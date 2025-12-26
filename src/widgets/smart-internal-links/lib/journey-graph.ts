/**
 * User Journey 기반 내부 링크 그래프
 *
 * Week 3-4: 내부 링크 최적화 - Graph Theory 적용
 * 단순 카테고리 기반 링크를 User Journey 기반으로 개선
 */

import type { ToolSlug, ToolCategory } from "@/entities/tool";
import { tools } from "@/entities/tool";

// ============================================
// User Journey 그래프 정의
// ============================================

/**
 * 도구 간 작업 흐름 (User Journey) 정의
 * 각 도구에서 자연스럽게 이어지는 다음 도구들을 정의
 */
export const USER_JOURNEY_GRAPH: Partial<Record<ToolSlug, ToolSlug[]>> = {
  // ─────────────────────────────────────────────
  // JSON 작업 흐름
  // ─────────────────────────────────────────────
  "json-formatter": [
    "json-to-typescript", // 타입 생성
    "diff-checker", // 버전 비교
    "prettier-playground", // 다른 포맷터
    "hash-generator", // 데이터 해싱
  ],
  "json-to-typescript": [
    "json-formatter", // 다시 JSON 포맷팅
    "prettier-playground", // 코드 포맷팅
  ],

  // ─────────────────────────────────────────────
  // 인코딩/디코딩 작업 흐름
  // ─────────────────────────────────────────────
  "base64-converter": [
    "url-encoder", // URL 인코딩 필요 시
    "jwt-decoder", // JWT 디코딩 (Base64 기반)
    "hash-generator", // 해시 생성
    "html-entity", // HTML 엔티티 변환
  ],
  "url-encoder": [
    "base64-converter", // Base64 인코딩
    "url-parser", // URL 분석
    "html-entity", // HTML 엔티티
    "curl-builder", // cURL 명령어 생성
  ],
  "html-entity": [
    "url-encoder", // URL 인코딩
    "base64-converter", // Base64
    "markdown-preview", // 마크다운 미리보기
  ],

  // ─────────────────────────────────────────────
  // 보안/인증 작업 흐름
  // ─────────────────────────────────────────────
  "jwt-decoder": [
    "base64-converter", // Base64 디코딩
    "json-formatter", // Payload JSON 포맷팅
    "hash-generator", // 서명 검증용 해시
    "unix-timestamp", // 만료 시간 변환
  ],
  "hash-generator": [
    "base64-converter", // 해시 결과 인코딩
    "uuid-generator", // 고유 ID 생성
    "text-case-converter", // 대소문자 변환
  ],
  "uuid-generator": [
    "hash-generator", // UUID 해싱
    "base64-converter", // 인코딩
    "qr-generator", // QR 코드 생성
  ],

  // ─────────────────────────────────────────────
  // 이미지 작업 흐름
  // ─────────────────────────────────────────────
  "image-resizer": [
    "image-converter", // 포맷 변환
    "app-icon-generator", // 앱 아이콘 생성
    "og-generator", // OG 이미지 생성
    "bg-remover", // 배경 제거
  ],
  "image-converter": [
    "image-resizer", // 크기 조절
    "svg-optimizer", // SVG 최적화
    "bg-remover", // 배경 제거
  ],
  "app-icon-generator": [
    "image-resizer", // 추가 리사이징
    "svg-optimizer", // SVG 최적화
    "qr-generator", // QR 코드
  ],
  "svg-optimizer": [
    "image-converter", // 다른 포맷으로 변환
    "color-picker", // 색상 추출/수정
    "css-to-tailwind", // CSS 작업
  ],
  "bg-remover": [
    "image-resizer", // 크기 조절
    "og-generator", // OG 이미지 생성
    "app-icon-generator", // 아이콘 생성
  ],
  "og-generator": [
    "image-resizer", // 크기 조절
    "meta-generator", // 메타 태그 생성
    "schema-generator", // 스키마 마크업
  ],

  // ─────────────────────────────────────────────
  // 미디어 작업 흐름
  // ─────────────────────────────────────────────
  "qr-generator": [
    "url-encoder", // URL 인코딩
    "base64-converter", // 이미지 인코딩
    "image-resizer", // QR 크기 조절
  ],
  "video-compressor": [
    "image-resizer", // 썸네일 리사이징
    "og-generator", // OG 이미지 생성
  ],

  // ─────────────────────────────────────────────
  // CSS/디자인 작업 흐름
  // ─────────────────────────────────────────────
  "color-picker": [
    "gradient-generator", // 그라디언트 생성
    "box-shadow", // 그림자 생성
    "css-to-tailwind", // Tailwind 클래스 변환
  ],
  "gradient-generator": [
    "color-picker", // 색상 선택
    "box-shadow", // 그림자 추가
    "css-to-tailwind", // Tailwind로 변환
    "css-minifier", // CSS 압축
  ],
  "box-shadow": [
    "color-picker", // 색상 선택
    "gradient-generator", // 그라디언트
    "css-minifier", // CSS 압축
  ],
  "css-to-tailwind": [
    "css-minifier", // CSS 압축
    "prettier-playground", // 코드 포맷팅
    "color-picker", // 색상 변환
  ],
  "css-minifier": [
    "css-to-tailwind", // Tailwind 변환
    "prettier-playground", // 포맷팅
    "diff-checker", // CSS 비교
  ],

  // ─────────────────────────────────────────────
  // 코드/개발 작업 흐름
  // ─────────────────────────────────────────────
  "prettier-playground": [
    "diff-checker", // 포맷 전후 비교
    "css-minifier", // 압축
    "json-formatter", // JSON 포맷팅
  ],
  "diff-checker": [
    "prettier-playground", // 포맷팅
    "json-formatter", // JSON 비교
    "markdown-preview", // 마크다운 비교
  ],
  "regex-tester": [
    "text-case-converter", // 텍스트 변환
    "url-parser", // URL 파싱
    "lorem-generator", // 테스트 텍스트
  ],
  "curl-builder": [
    "json-formatter", // 응답 포맷팅
    "jwt-decoder", // 토큰 디코딩
    "url-encoder", // URL 인코딩
    "base64-converter", // 인증 헤더
  ],

  // ─────────────────────────────────────────────
  // 텍스트 작업 흐름
  // ─────────────────────────────────────────────
  "text-case-converter": [
    "lorem-generator", // 텍스트 생성
    "regex-tester", // 정규식 테스트
    "hash-generator", // 텍스트 해싱
  ],
  "lorem-generator": [
    "text-case-converter", // 대소문자 변환
    "markdown-preview", // 마크다운 미리보기
    "regex-tester", // 정규식 테스트
  ],
  "markdown-preview": [
    "lorem-generator", // 콘텐츠 생성
    "html-entity", // HTML 엔티티
    "prettier-playground", // 코드 포맷팅
  ],

  // ─────────────────────────────────────────────
  // SEO 작업 흐름
  // ─────────────────────────────────────────────
  "meta-generator": [
    "og-generator", // OG 이미지 생성
    "schema-generator", // 스키마 마크업
    "sitemap-generator", // 사이트맵 생성
    "serp-preview", // SERP 미리보기
  ],
  "schema-generator": [
    "meta-generator", // 메타 태그
    "json-formatter", // JSON-LD 포맷팅
    "serp-preview", // SERP 미리보기
  ],
  "sitemap-generator": [
    "robots-generator", // robots.txt 생성
    "meta-generator", // 메타 태그
    "url-parser", // URL 분석
  ],
  "robots-generator": [
    "sitemap-generator", // 사이트맵
    "meta-tag-analyzer", // 메타 태그 분석
  ],
  "meta-tag-analyzer": [
    "meta-generator", // 메타 태그 생성
    "serp-preview", // SERP 미리보기
    "schema-generator", // 스키마 마크업
  ],
  "serp-preview": [
    "meta-generator", // 메타 태그 생성
    "headline-analyzer", // 제목 분석
    "schema-generator", // 스키마 마크업
  ],
  "headline-analyzer": [
    "meta-generator", // 메타 태그
    "serp-preview", // SERP 미리보기
    "lorem-generator", // 텍스트 생성
  ],

  // ─────────────────────────────────────────────
  // 유틸리티 작업 흐름
  // ─────────────────────────────────────────────
  "unix-timestamp": [
    "cron-parser", // 크론 표현식
    "uuid-generator", // UUID 생성
    "json-formatter", // 타임스탬프 포맷팅
  ],
  "cron-parser": [
    "unix-timestamp", // 타임스탬프 변환
    "regex-tester", // 정규식 테스트
  ],
  "base-converter": [
    "hash-generator", // 해시 변환
    "uuid-generator", // UUID 표시
    "color-picker", // 색상 코드 변환
  ],
  "url-parser": [
    "url-encoder", // URL 인코딩
    "curl-builder", // cURL 생성
    "qr-generator", // QR 코드 생성
  ],
  "ua-parser": [
    "curl-builder", // User-Agent 사용
    "json-formatter", // 결과 포맷팅
  ],

  // ─────────────────────────────────────────────
  // PDF/OCR 작업 흐름
  // ─────────────────────────────────────────────
  "pdf-toolkit": [
    "image-converter", // 이미지 추출
    "ocr-scanner", // 텍스트 추출
    "text-case-converter", // 텍스트 변환
  ],
  "ocr-scanner": [
    "text-case-converter", // 텍스트 변환
    "regex-tester", // 텍스트 패턴 매칭
    "json-formatter", // 결과 포맷팅
  ],

  // ─────────────────────────────────────────────
  // SQL 작업 흐름
  // ─────────────────────────────────────────────
  "sql-formatter": [
    "diff-checker", // SQL 비교
    "prettier-playground", // 다른 포맷터
    "json-formatter", // 쿼리 결과 포맷팅
  ],
};

// ============================================
// 카테고리별 도구 매핑
// ============================================

/**
 * 카테고리별 관련 도구 조회
 */
export function getRelatedByCategory(toolSlug: ToolSlug): ToolSlug[] {
  const tool = tools[toolSlug];
  if (!tool) return [];

  const category = tool.category;
  return (Object.keys(tools) as ToolSlug[]).filter(
    (slug) => slug !== toolSlug && tools[slug].category === category,
  );
}

/**
 * 사용 이력에서 자주 사용하는 도구 추출
 */
export function getFrequentFromHistory(
  history: string[],
  limit = 5,
): ToolSlug[] {
  const frequency: Record<string, number> = {};

  for (const tool of history) {
    frequency[tool] = (frequency[tool] || 0) + 1;
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => slug as ToolSlug);
}

// ============================================
// 가중치 기반 추천 알고리즘
// ============================================

export interface LinkWeight {
  target: ToolSlug;
  weight: number; // 0-1
  reason: "workflow" | "history" | "category";
}

/**
 * 가중치 기반 도구 추천
 *
 * 가중치 계산:
 * - workflow (Journey 기반): 0.9 ~ 0.6
 * - history (사용 이력): 0.5
 * - category (같은 카테고리): 0.3
 */
export function getWeightedRecommendations(
  currentTool: ToolSlug,
  userHistory: string[] = [],
  maxResults = 8,
): LinkWeight[] {
  const journeyLinks = USER_JOURNEY_GRAPH[currentTool] || [];
  const categoryLinks = getRelatedByCategory(currentTool);
  const frequentTools = getFrequentFromHistory(userHistory);

  const recommendations: LinkWeight[] = [];
  const seen = new Set<ToolSlug>();

  // 1. Journey 기반 링크 (가장 높은 가중치)
  journeyLinks.forEach((target, index) => {
    if (!seen.has(target)) {
      seen.add(target);
      recommendations.push({
        target,
        weight: Math.max(0.6, 0.9 - index * 0.1),
        reason: "workflow",
      });
    }
  });

  // 2. 사용자 히스토리 기반 (중간 가중치)
  frequentTools.forEach((target) => {
    if (!seen.has(target) && target !== currentTool) {
      seen.add(target);
      recommendations.push({
        target,
        weight: 0.5,
        reason: "history",
      });
    }
  });

  // 3. 카테고리 기반 (낮은 가중치)
  categoryLinks.forEach((target) => {
    if (!seen.has(target)) {
      seen.add(target);
      recommendations.push({
        target,
        weight: 0.3,
        reason: "category",
      });
    }
  });

  // 가중치 내림차순 정렬 후 상위 N개 반환
  return recommendations
    .sort((a, b) => b.weight - a.weight)
    .slice(0, maxResults);
}

// ============================================
// 도구 정보 헬퍼
// ============================================

/**
 * 도구 제목 조회
 */
export function getToolTitle(slug: ToolSlug): string {
  return tools[slug]?.title || slug;
}

/**
 * 도구 카테고리 조회
 */
export function getToolCategory(slug: ToolSlug): ToolCategory | undefined {
  return tools[slug]?.category;
}

/**
 * 도구 존재 여부 확인
 */
export function isValidToolSlug(slug: string): slug is ToolSlug {
  return slug in tools;
}

// ============================================
// 그래프 분석 유틸리티
// ============================================

/**
 * 특정 도구로 향하는 인바운드 링크 조회
 */
export function getInboundLinks(targetSlug: ToolSlug): ToolSlug[] {
  const inbound: ToolSlug[] = [];

  for (const [source, targets] of Object.entries(USER_JOURNEY_GRAPH)) {
    if (targets?.includes(targetSlug)) {
      inbound.push(source as ToolSlug);
    }
  }

  return inbound;
}

/**
 * 도구 그래프의 연결 강도 계산 (PageRank 유사)
 */
export function calculateToolImportance(): Record<ToolSlug, number> {
  const importance: Record<string, number> = {};

  // 초기화: 모든 도구에 동일한 중요도 부여
  const allTools = Object.keys(tools) as ToolSlug[];
  for (const tool of allTools) {
    importance[tool] = 1;
  }

  // 인바운드 링크 수에 따라 중요도 조정
  for (const tool of allTools) {
    const inbound = getInboundLinks(tool);
    importance[tool] += inbound.length * 0.5;
  }

  // 아웃바운드 링크 수에 따라 중요도 조정
  for (const tool of allTools) {
    const outbound = USER_JOURNEY_GRAPH[tool] || [];
    importance[tool] += outbound.length * 0.2;
  }

  return importance as Record<ToolSlug, number>;
}
