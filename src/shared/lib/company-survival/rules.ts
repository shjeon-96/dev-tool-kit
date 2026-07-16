import type {
  ActionCard,
  Incident,
  TraitDefinition,
} from "@/shared/types/company-survival";

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
    id: "ship-core",
    department: "engineering",
    title: { ko: "코어 기능 출시", en: "Ship the Core", ja: "コア機能を出荷" },
    detail: {
      ko: "제품은 전진한다. 팀은 야근한다.",
      en: "The product moves. The team stays late.",
      ja: "製品は進む。チームは残業する。",
    },
    cost: 9,
    effects: { momentum: 18, morale: -5 },
  },
  {
    id: "kill-bugs",
    department: "engineering",
    title: { ko: "버그 전쟁", en: "Bug War", ja: "バグ戦争" },
    detail: {
      ko: "신뢰를 복구하고 속도를 희생한다.",
      en: "Restore trust, sacrifice speed.",
      ja: "信頼を戻し、速度を犠牲に。",
    },
    cost: 6,
    effects: { trust: 15, momentum: -4 },
  },
  {
    id: "automation",
    department: "engineering",
    title: {
      ko: "자동화 스프린트",
      en: "Automation Sprint",
      ja: "自動化スプリント",
    },
    detail: {
      ko: "지금 지불하고 다음을 빠르게 만든다.",
      en: "Pay now to compound velocity.",
      ja: "今払い、次を速くする。",
    },
    cost: 12,
    effects: { momentum: 12, morale: 6 },
  },
  {
    id: "research",
    department: "design",
    title: { ko: "고객 잠입 조사", en: "Customer Safari", ja: "顧客潜入調査" },
    detail: {
      ko: "고객의 진짜 문제를 찾아낸다.",
      en: "Find the problem behind the request.",
      ja: "要望の裏の問題を探る。",
    },
    cost: 5,
    effects: { trust: 12, momentum: 7 },
  },
  {
    id: "redesign",
    department: "design",
    title: {
      ko: "온보딩 재설계",
      en: "Redesign Onboarding",
      ja: "導入を再設計",
    },
    detail: {
      ko: "첫 3분의 이탈을 줄인다.",
      en: "Fix the first three minutes.",
      ja: "最初の3分を直す。",
    },
    cost: 8,
    effects: { trust: 9, momentum: 11 },
  },
  {
    id: "brand-stunt",
    department: "design",
    title: { ko: "브랜드 도발", en: "Brand Stunt", ja: "ブランド挑発" },
    detail: {
      ko: "시선은 얻지만 안전하진 않다.",
      en: "Earn attention, invite risk.",
      ja: "注目とリスクを得る。",
    },
    cost: 7,
    effects: { momentum: 16, trust: -6 },
  },
  {
    id: "enterprise",
    department: "sales",
    title: {
      ko: "대기업 파일럿",
      en: "Enterprise Pilot",
      ja: "大企業パイロット",
    },
    detail: {
      ko: "큰 계약, 더 큰 약속.",
      en: "A big logo and a bigger promise.",
      ja: "大きな契約、さらに大きな約束。",
    },
    cost: 5,
    effects: { cash: 18, trust: -4 },
  },
  {
    id: "founder-sales",
    department: "sales",
    title: { ko: "대표 직접 영업", en: "Founder Sales", ja: "創業者営業" },
    detail: {
      ko: "대표가 제품 대신 전화를 든다.",
      en: "The CEO picks up the phone.",
      ja: "CEOが電話を取る。",
    },
    cost: 3,
    effects: { cash: 13, morale: -3 },
  },
  {
    id: "community",
    department: "sales",
    title: {
      ko: "커뮤니티 공략",
      en: "Community Push",
      ja: "コミュニティ攻略",
    },
    detail: {
      ko: "느리지만 강한 입소문을 만든다.",
      en: "Slow, credible word of mouth.",
      ja: "遅く強い口コミを作る。",
    },
    cost: 4,
    effects: { trust: 10, momentum: 8 },
  },
  {
    id: "cut-burn",
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
    department: "operations",
    title: { ko: "팀 리셋 데이", en: "Team Reset", ja: "チームリセット" },
    detail: {
      ko: "하루를 멈춰 다음 달을 살린다.",
      en: "Stop for a day to save the month.",
      ja: "一日止まり、一か月を救う。",
    },
    cost: 7,
    effects: { morale: 18, momentum: -5 },
  },
  {
    id: "bridge-round",
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
