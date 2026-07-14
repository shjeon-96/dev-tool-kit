import type { Locale } from "./site";

interface ProductDefinition {
  name: string;
  href: string;
  code: string;
  description: Record<Locale, string>;
}

export const PRODUCTS: readonly ProductDefinition[] = [
  {
    name: "ShotDay",
    href: "https://shotday.web-toolkit.app",
    code: "HEALTH / 01",
    description: {
      en: "A focused GLP-1 medication routine tracker.",
      ko: "GLP-1 투약 루틴을 꾸준히 관리하는 트래커.",
      ja: "GLP-1投薬ルーティンを継続管理するトラッカー。",
    },
  },
  {
    name: "PlantPal",
    href: "https://plantpal.web-toolkit.app",
    code: "LIVING / 02",
    description: {
      en: "Plant care reminders and AI-assisted identification.",
      ko: "식물 관리 알림과 AI 기반 식물 식별.",
      ja: "植物ケアのリマインダーとAI識別。",
    },
  },
];
