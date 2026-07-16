import type {
  ActionCard,
  CeoTrait,
  Incident,
  IndustryRule,
  TraitDefinition,
  CompanyIndustry,
} from "@/shared/types/company-survival";

export const INDUSTRY_RULES: Readonly<Record<CompanyIndustry, IndustryRule>> = {
  saas: {
    starting: {},
    production: { momentum: 1 },
    passive: {
      ko: "복리 코드 · 매달 성장 +1",
      en: "Compound code · +1 growth monthly",
      ja: "複利コード・毎月成長 +1",
    },
  },
  commerce: {
    starting: { cash: -5, momentum: 6 },
    production: { cash: 2 },
    passive: {
      ko: "현금 회전 · 매달 현금 +2",
      en: "Cash cycle · +2 cash monthly",
      ja: "資金回転・毎月資金 +2",
    },
  },
  "game-studio": {
    starting: { cash: -8, morale: 10 },
    production: { morale: 2 },
    passive: {
      ko: "크리에이티브 팀 · 매달 사기 +2",
      en: "Creative crew · +2 morale monthly",
      ja: "制作チーム・毎月士気 +2",
    },
  },
  fintech: {
    starting: { trust: 10, momentum: -4 },
    production: { trust: 2 },
    passive: {
      ko: "규제 신뢰 · 매달 신뢰 +2",
      en: "Regulated trust · +2 trust monthly",
      ja: "規制の信頼・毎月信頼 +2",
    },
  },
  "ai-lab": {
    starting: { cash: -10, trust: -8, momentum: 16 },
    production: { cash: -1, momentum: 3 },
    passive: {
      ko: "컴퓨트 레이스 · 현금 -1, 성장 +3",
      en: "Compute race · -1 cash, +3 growth",
      ja: "計算競争・資金 -1、成長 +3",
    },
  },
  hardware: {
    starting: { cash: 12, momentum: -9 },
    production: { cash: -2, trust: 1 },
    passive: {
      ko: "공장 고정비 · 현금 -2, 신뢰 +1",
      en: "Factory overhead · -2 cash, +1 trust",
      ja: "工場固定費・資金 -2、信頼 +1",
    },
  },
};

export const CEO_TRAITS: readonly TraitDefinition[] = [
  {
    id: "builder",
    department: "engineering",
    title: { ko: "빌더", en: "Builder", ja: "ビルダー" },
    detail: {
      ko: "제품 카드 효과 +4",
      en: "Product cards gain +4",
      ja: "プロダクトカード効果 +4",
    },
  },
  {
    id: "rainmaker",
    department: "sales",
    title: { ko: "레인메이커", en: "Rainmaker", ja: "レインメーカー" },
    detail: {
      ko: "영업 카드 효과 +4",
      en: "Sales cards gain +4",
      ja: "営業カード効果 +4",
    },
  },
  {
    id: "operator",
    department: "operations",
    title: { ko: "오퍼레이터", en: "Operator", ja: "オペレーター" },
    detail: {
      ko: "운영 카드 비용 -4",
      en: "Operations cards cost 4 less",
      ja: "運営カード費用 -4",
    },
  },
] as const;

export const ACTION_CARDS: readonly ActionCard[] = [
  {
    id: "hire-engineer",
    kind: "employee",
    department: "engineering",
    title: {
      ko: "시니어 엔지니어",
      en: "Senior Engineer",
      ja: "シニアエンジニア",
    },
    detail: {
      ko: "매달 성장 +3, 급여 -2.",
      en: "+3 growth each month, -2 payroll.",
      ja: "毎月成長 +3、給与 -2。",
    },
    cost: 8,
    effects: { morale: 3 },
  },
  {
    id: "hire-designer",
    kind: "employee",
    department: "design",
    title: {
      ko: "프로덕트 디자이너",
      en: "Product Designer",
      ja: "プロダクトデザイナー",
    },
    detail: {
      ko: "매달 신뢰 +2, 급여 -2.",
      en: "+2 trust each month, -2 payroll.",
      ja: "毎月信頼 +2、給与 -2。",
    },
    cost: 7,
    effects: { trust: 3 },
  },
  {
    id: "hire-sales",
    kind: "employee",
    department: "sales",
    title: { ko: "세일즈 리드", en: "Sales Lead", ja: "セールスリード" },
    detail: {
      ko: "매달 현금 +4, 급여 -2.",
      en: "+4 cash each month, -2 payroll.",
      ja: "毎月資金 +4、給与 -2。",
    },
    cost: 6,
    effects: { cash: 6 },
  },
  {
    id: "hire-operator",
    kind: "employee",
    department: "operations",
    title: {
      ko: "운영 매니저",
      en: "Operations Manager",
      ja: "運営マネージャー",
    },
    detail: {
      ko: "매달 사기 +2, 급여 -2.",
      en: "+2 morale each month, -2 payroll.",
      ja: "毎月士気 +2、給与 -2。",
    },
    cost: 6,
    effects: { morale: 5 },
  },
  {
    id: "ship-core",
    kind: "project",
    department: "engineering",
    title: { ko: "코어 제품 출시", en: "Ship the Core", ja: "コア製品を出荷" },
    detail: {
      ko: "3 작업 필요. 완료 시 성장 +20, 신뢰 +8.",
      en: "Needs 3 work. Completion: +20 growth, +8 trust.",
      ja: "作業3。完了時：成長 +20、信頼 +8。",
    },
    cost: 7,
    effects: { momentum: 6 },
    projectTarget: 3,
    completionEffects: { momentum: 20, trust: 8 },
  },
  {
    id: "redesign",
    kind: "project",
    department: "design",
    title: {
      ko: "온보딩 재설계",
      en: "Redesign Onboarding",
      ja: "導入を再設計",
    },
    detail: {
      ko: "2 작업 필요. 완료 시 신뢰 +18, 성장 +8.",
      en: "Needs 2 work. Completion: +18 trust, +8 growth.",
      ja: "作業2。完了時：信頼 +18、成長 +8。",
    },
    cost: 6,
    effects: { trust: 5 },
    projectTarget: 2,
    completionEffects: { trust: 18, momentum: 8 },
  },
  {
    id: "enterprise",
    kind: "project",
    department: "sales",
    title: {
      ko: "대기업 파일럿",
      en: "Enterprise Pilot",
      ja: "大企業パイロット",
    },
    detail: {
      ko: "2 작업 필요. 완료 시 현금 +26, 신뢰 +5.",
      en: "Needs 2 work. Completion: +26 cash, +5 trust.",
      ja: "作業2。完了時：資金 +26、信頼 +5。",
    },
    cost: 5,
    effects: { cash: 4, trust: -3 },
    projectTarget: 2,
    completionEffects: { cash: 26, trust: 5 },
  },
  {
    id: "automation",
    kind: "project",
    department: "engineering",
    title: { ko: "운영 자동화", en: "Operations Automation", ja: "運営自動化" },
    detail: {
      ko: "3 작업 필요. 클라우드 사고를 막는다.",
      en: "Needs 3 work. Counters cloud incidents.",
      ja: "作業3。クラウド事故を防ぐ。",
    },
    cost: 8,
    effects: { momentum: 4 },
    projectTarget: 3,
    completionEffects: { cash: 10, morale: 12 },
  },
  {
    id: "community",
    kind: "project",
    department: "sales",
    title: {
      ko: "커뮤니티 공략",
      en: "Community Push",
      ja: "コミュニティ攻略",
    },
    detail: {
      ko: "2 작업 필요. 바이럴 위기를 기회로 바꾼다.",
      en: "Needs 2 work. Turns virality into revenue.",
      ja: "作業2。バズを売上に変える。",
    },
    cost: 4,
    effects: { trust: 4, momentum: 3 },
    projectTarget: 2,
    completionEffects: { trust: 14, cash: 10 },
  },
  {
    id: "cut-burn",
    kind: "funding",
    department: "operations",
    title: { ko: "번레이트 절단", en: "Cut the Burn", ja: "燃焼率を削減" },
    detail: {
      ko: "현금을 지키고 사기를 잃는다.",
      en: "Protect cash, bruise morale.",
      ja: "資金を守り、士気を削る。",
    },
    cost: -8,
    effects: { cash: 13, morale: -9 },
  },
  {
    id: "team-day",
    kind: "funding",
    department: "sales",
    title: { ko: "정부 지원금", en: "Public Grant", ja: "公的助成金" },
    detail: {
      ko: "느린 서류, 희석 없는 현금.",
      en: "Slow paperwork, non-dilutive cash.",
      ja: "遅い書類、希薄化なしの資金。",
    },
    cost: 3,
    effects: { cash: 24, momentum: -4 },
  },
  {
    id: "bridge-round",
    kind: "funding",
    department: "operations",
    title: { ko: "브리지 라운드", en: "Bridge Round", ja: "ブリッジラウンド" },
    detail: {
      ko: "생존 자금과 투자자 압박을 함께 받는다.",
      en: "Buy runway and investor pressure.",
      ja: "生存資金と投資家圧力を得る。",
    },
    cost: 2,
    effects: { cash: 22, trust: -10 },
  },
] as const;

export const STARTER_DECK = [
  "hire-engineer",
  "hire-designer",
  "hire-sales",
  "ship-core",
  "redesign",
  "enterprise",
  "cut-burn",
  "bridge-round",
] as const;

export const CARD_UNLOCKS: Readonly<Record<string, number>> = {
  "hire-operator": 1,
  automation: 2,
  community: 2,
  "team-day": 3,
};

export const CEO_TRAIT_UNLOCKS: Readonly<Record<CeoTrait, number>> = {
  builder: 0,
  rainmaker: 1,
  operator: 2,
};

export const isCardUnlocked = (cardId: string, completedRuns: number) =>
  completedRuns >= (CARD_UNLOCKS[cardId] ?? 0);

export const isCeoTraitUnlocked = (trait: CeoTrait, completedRuns: number) =>
  completedRuns >= CEO_TRAIT_UNLOCKS[trait];

export const INCIDENTS: readonly Incident[] = [
  {
    id: "cloud-bill",
    title: {
      ko: "클라우드 청구서 폭탄",
      en: "Cloud Bill Shock",
      ja: "クラウド請求爆弾",
    },
    body: {
      ko: "트래픽이 아니라 설정이 회사를 공격했다.",
      en: "Configuration, not traffic, attacked the company.",
      ja: "トラフィックではなく設定が会社を襲った。",
    },
    effects: { cash: -8 },
    counterProjectId: "automation",
    counterEffects: { cash: -1, morale: 2 },
    counterBody: {
      ko: "자동화가 폭주 비용을 차단했다.",
      en: "Automation contained the runaway bill.",
      ja: "自動化が暴走コストを止めた。",
    },
  },
  {
    id: "viral-post",
    title: { ko: "갑작스러운 바이럴", en: "Sudden Virality", ja: "突然のバズ" },
    body: {
      ko: "고객이 몰렸다. 준비됐는지는 별개다.",
      en: "Customers arrived. Readiness did not.",
      ja: "顧客は来た。準備は別だ。",
    },
    effects: { momentum: 9, morale: -5 },
    counterProjectId: "community",
    counterEffects: { cash: 10, momentum: 12 },
    counterBody: {
      ko: "커뮤니티가 관심을 유료 고객으로 전환했다.",
      en: "The community converted attention into customers.",
      ja: "コミュニティが注目を顧客に変えた。",
    },
  },
  {
    id: "key-resignation",
    title: {
      ko: "핵심 인재의 면담 요청",
      en: "A Key Resignation",
      ja: "中核人材の面談",
    },
    body: {
      ko: "회의 제목은 단순했다: 잠깐 이야기 가능하세요?",
      en: "The meeting title: Got a minute?",
      ja: "会議名：少し話せますか？",
    },
    effects: { morale: -10 },
    counterDepartment: "operations",
    counterEffects: { morale: -3, trust: 2 },
    counterBody: {
      ko: "운영 매니저가 퇴사 신호를 먼저 잡았다.",
      en: "Operations caught the resignation signal early.",
      ja: "運営担当が退職の兆候を先に掴んだ。",
    },
  },
  {
    id: "investor-demo",
    title: {
      ko: "투자자 기습 데모",
      en: "Investor Demo",
      ja: "投資家の抜き打ちデモ",
    },
    body: {
      ko: "가장 불안정한 화면부터 눌렀다.",
      en: "They clicked the least stable screen first.",
      ja: "最も不安定な画面を最初に押した。",
    },
    effects: { trust: -8 },
    counterProjectId: "ship-core",
    counterEffects: { trust: 8, momentum: 3 },
    counterBody: {
      ko: "완성된 코어 제품이 데모를 버텼다.",
      en: "The finished core product survived the demo.",
      ja: "完成したコア製品がデモを耐えた。",
    },
  },
  {
    id: "renewal",
    title: { ko: "예상 밖 갱신", en: "Surprise Renewal", ja: "予想外の更新" },
    body: {
      ko: "한 고객이 다음 해에도 남기로 했다.",
      en: "One customer chose another year.",
      ja: "一社が来年も残ると決めた。",
    },
    effects: { cash: 9, trust: 5 },
    counterDepartment: "sales",
    counterEffects: { cash: 14, trust: 7 },
    counterBody: {
      ko: "세일즈 리드가 다년 계약까지 끌어냈다.",
      en: "The sales lead expanded it into a multi-year deal.",
      ja: "営業リードが複数年契約に広げた。",
    },
  },
  {
    id: "scope-creep",
    title: { ko: "요구사항 증식", en: "Scope Creep", ja: "要件の増殖" },
    body: {
      ko: "작은 요청이 로드맵 전체를 먹기 시작했다.",
      en: "A small request began eating the roadmap.",
      ja: "小さな要望がロードマップを食べ始めた。",
    },
    effects: { momentum: -8, morale: -4 },
    counterDepartment: "design",
    counterEffects: { momentum: -2, morale: -1, trust: 3 },
    counterBody: {
      ko: "디자이너가 요구를 하나의 문제로 다시 정의했다.",
      en: "Design reframed the requests into one problem.",
      ja: "デザインが要求を一つの問題に整理した。",
    },
  },
] as const;

export function getActionCard(id: string) {
  const card = ACTION_CARDS.find((item) => item.id === id);
  if (!card) throw new Error(`Unknown action card: ${id}`);
  return card;
}
export function getIncident(id: string) {
  const incident = INCIDENTS.find((item) => item.id === id);
  if (!incident) throw new Error(`Unknown incident: ${id}`);
  return incident;
}
