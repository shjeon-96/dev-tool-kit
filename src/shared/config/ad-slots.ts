/**
 * Google AdSense 광고 슬롯 ID
 * Publisher ID: ca-pub-4981986991458105
 */
export const AD_SLOTS = {
  /** 도구 결과 하단 - 골든존 */
  TOOL_RESULT: "8112667920",

  /** 콘텐츠 하단 (SEO 섹션 후) */
  CONTENT_BOTTOM: "6799586258",

  /** 가이드/치트시트 하단 */
  GUIDE_BOTTOM: "4991680569",
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;
