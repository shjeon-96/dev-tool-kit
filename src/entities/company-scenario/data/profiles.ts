import type { Locale } from "@/shared/config/site";
import { type CompanyIndustry } from "@/shared/types/company-survival";

export interface CompanyProfile {
  id: CompanyIndustry;
  code: string;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const COMPANY_PROFILES: readonly CompanyProfile[] = [
  {
    id: "saas",
    code: "SaaS",
    label: { en: "B2B SaaS", ko: "B2B SaaS", ja: "B2B SaaS" },
    description: {
      en: "Subscriptions, enterprise clients, and endless roadmap fights.",
      ko: "구독 매출, 엔터프라이즈 고객, 끝없는 로드맵 전쟁.",
      ja: "サブスク、大企業顧客、終わらないロードマップ争い。",
    },
  },
  {
    id: "commerce",
    code: "D2C",
    label: { en: "Commerce", ko: "커머스", ja: "コマース" },
    description: {
      en: "Inventory, margins, returns, and volatile demand.",
      ko: "재고, 마진, 반품, 예측 불가능한 수요.",
      ja: "在庫、利益率、返品、読めない需要。",
    },
  },
  {
    id: "game-studio",
    code: "GAME",
    label: { en: "Game Studio", ko: "게임 스튜디오", ja: "ゲームスタジオ" },
    description: {
      en: "Live operations, fandom, launch dates, and creative burnout.",
      ko: "라이브 운영, 팬덤, 출시일, 창작자의 번아웃.",
      ja: "ライブ運営、ファン、発売日、クリエイターの消耗。",
    },
  },
  {
    id: "fintech",
    code: "FIN",
    label: { en: "Fintech", ko: "핀테크", ja: "フィンテック" },
    description: {
      en: "Compliance, fraud, trust, and money moving at midnight.",
      ko: "규제, 사기, 신뢰, 자정에도 움직이는 돈.",
      ja: "規制、不正、信頼、深夜も動く資金。",
    },
  },
  {
    id: "ai-lab",
    code: "AI",
    label: { en: "AI Lab", ko: "AI 연구소", ja: "AIラボ" },
    description: {
      en: "Compute bills, model races, safety, and impossible demos.",
      ko: "컴퓨팅 비용, 모델 경쟁, 안전, 불가능한 데모.",
      ja: "計算費用、モデル競争、安全性、不可能なデモ。",
    },
  },
  {
    id: "hardware",
    code: "HW",
    label: { en: "Hardware", ko: "하드웨어", ja: "ハードウェア" },
    description: {
      en: "Factories, components, defects, and physical deadlines.",
      ko: "공장, 부품, 불량, 미룰 수 없는 물리적 마감.",
      ja: "工場、部品、不良、延期できない物理的締切。",
    },
  },
] as const;

export function getCompanyProfile(industry: CompanyIndustry) {
  const profile = COMPANY_PROFILES.find((item) => item.id === industry);
  if (!profile) throw new Error(`Unknown company profile: ${industry}`);
  return profile;
}
