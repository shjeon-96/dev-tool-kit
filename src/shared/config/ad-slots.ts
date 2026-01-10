/**
 * Google AdSense 광고 슬롯 ID
 * Publisher ID: ca-pub-4981986991458105
 *
 * 배치 전략 (Trend Blog):
 * ─────────────────────────────────────────────────
 * 1. CONTENT_TOP (horizontal) - 히어로 섹션 아래
 *    - 사용자가 콘텐츠 스크롤 시작 시 노출
 *    - CPM 중간, 클릭률 높음
 *
 * 2. ARTICLE_MIDDLE (rectangle) - 기사 본문 중간
 *    - 콘텐츠 몰입 후 자연스러운 휴식점
 *    - 가장 높은 CPM 및 클릭률 (골든존)
 *
 * 3. RELATED_TOP (horizontal) - 관련 기사 섹션 위
 *    - 기사 완독 후 다음 콘텐츠 탐색 시점
 *    - 높은 참여도
 *
 * 4. PAGE_BOTTOM (horizontal) - 페이지 하단
 *    - 전체 콘텐츠 소비 후
 *    - 안정적인 노출
 * ─────────────────────────────────────────────────
 */
export const AD_SLOTS = {
  /**
   * 콘텐츠 상단 - 히어로/피처드 섹션 아래
   * Format: horizontal (leaderboard 728x90)
   */
  CONTENT_TOP: "6799586258",

  /**
   * 기사 중간 - 본문 단락 사이 (골든존)
   * Format: rectangle (medium rectangle 300x250)
   * 가장 높은 수익률
   */
  ARTICLE_MIDDLE: "8112667920",

  /**
   * 관련 콘텐츠 상단 - 관련 기사 섹션 위
   * Format: horizontal
   */
  RELATED_TOP: "4991680569",

  /**
   * 페이지 하단 - 푸터 위
   * Format: horizontal
   */
  PAGE_BOTTOM: "4991680569",

  // Legacy aliases (기존 코드 호환용)
  /** @deprecated Use ARTICLE_MIDDLE instead */
  TOOL_RESULT: "8112667920",

  /** @deprecated Use CONTENT_TOP instead */
  CONTENT_BOTTOM: "6799586258",

  /** @deprecated Use PAGE_BOTTOM instead */
  GUIDE_BOTTOM: "4991680569",
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;

/**
 * 광고 배치 가이드라인
 *
 * 1. 콘텐츠 대 광고 비율
 *    - 화면당 광고 1-2개 권장
 *    - 스크롤 없는 영역에 광고 3개 이상 금지
 *
 * 2. 사용자 경험
 *    - 핵심 콘텐츠 접근을 방해하지 않을 것
 *    - 자연스러운 콘텐츠 흐름에 배치
 *
 * 3. 모바일 최적화
 *    - 작은 화면에서 광고 비율 줄이기
 *    - 스크롤 시 고정 광고 피하기
 *
 * 4. 성능
 *    - Lazy loading으로 초기 로딩 영향 최소화
 *    - CLS 방지를 위한 고정 높이 placeholder
 */
