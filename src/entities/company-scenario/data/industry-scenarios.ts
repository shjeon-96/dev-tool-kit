import type {
  CompanyIndustry,
  CompanyMetrics,
  CompanyScenario,
  ScenarioChoice,
} from "@/shared/types/company-survival";

const text = (en: string, ko: string, ja: string) => ({ en, ko, ja });

const TRADEOFFS = {
  spendGrowth: text(
    "Spend cash. Gain speed.",
    "현금 지출. 성장 가속.",
    "資金投入。成長加速。",
  ),
  saveSlow: text(
    "Save cash. Lose speed.",
    "현금 방어. 성장 둔화.",
    "資金防衛。成長鈍化。",
  ),
  trustCost: text(
    "Build trust. Pay now.",
    "신뢰 확보. 즉시 비용.",
    "信頼獲得。即時コスト。",
  ),
  trustRisk: text(
    "Move fast. Risk trust.",
    "빠른 실행. 신뢰 위험.",
    "迅速実行。信頼リスク。",
  ),
  teamCost: text(
    "Protect team. Spend runway.",
    "팀 보호. 생존 자금 소모.",
    "チーム保護。資金消耗。",
  ),
  teamRisk: text(
    "Protect output. Strain team.",
    "성과 방어. 팀 부담.",
    "成果防衛。チーム負担。",
  ),
  focus: text(
    "Stay focused. Miss the wave.",
    "집중 유지. 기회 상실.",
    "集中維持。機会損失。",
  ),
  bet: text(
    "Take the bet. Accept volatility.",
    "승부 선택. 변동성 감수.",
    "勝負を選択。変動を受容。",
  ),
} as const;

type Tradeoff = keyof typeof TRADEOFFS;

function choice(
  id: string,
  label: ReturnType<typeof text>,
  result: ReturnType<typeof text>,
  effects: Partial<CompanyMetrics>,
  tradeoff: Tradeoff,
): ScenarioChoice {
  return { id, label, result, effects, detail: TRADEOFFS[tradeoff] };
}

function scenario(
  industry: CompanyIndustry,
  id: string,
  department: ReturnType<typeof text>,
  title: ReturnType<typeof text>,
  body: ReturnType<typeof text>,
  choices: readonly [ScenarioChoice, ScenarioChoice],
): CompanyScenario {
  return {
    industry,
    cadence: "standard",
    id: `${industry}-${id}`,
    department,
    title,
    body,
    choices,
  };
}

function weeklyScenario(
  industry: CompanyIndustry,
  id: string,
  department: ReturnType<typeof text>,
  title: ReturnType<typeof text>,
  body: ReturnType<typeof text>,
  choices: readonly [ScenarioChoice, ScenarioChoice],
): CompanyScenario {
  return {
    ...scenario(industry, id, department, title, body, choices),
    cadence: "weekly",
  };
}

const SAAS = text("SAAS OPS", "SaaS 운영", "SaaS運営");
const COMMERCE = text("COMMERCE", "커머스 운영", "コマース運営");
const GAME = text("STUDIO", "스튜디오", "スタジオ");
const FINTECH = text("RISK", "리스크팀", "リスク部門");
const AI = text("AI LAB", "AI 연구소", "AIラボ");
const HARDWARE = text("HARDWARE", "하드웨어팀", "ハードウェア部門");

const saasScenarios: readonly CompanyScenario[] = [
  weeklyScenario(
    "saas",
    "churn-spike",
    SAAS,
    text(
      "Churn doubled overnight",
      "해지율이 하룻밤 새 두 배가 됐습니다",
      "解約率が一夜で倍増",
    ),
    text(
      "A workflow change broke the habit that kept small teams paying.",
      "워크플로 변경이 소규모 팀의 사용 습관을 깨뜨렸습니다.",
      "ワークフロー変更で小規模チームの利用習慣が崩れました。",
    ),
    [
      choice(
        "rollback",
        text("Roll it back", "변경을 되돌린다", "変更を戻す"),
        text(
          "Churn slows. The new roadmap loses a month.",
          "해지는 줄었고 새 로드맵은 한 달을 잃었습니다.",
          "解約は減少。新計画は1か月遅延。",
        ),
        { trust: 15, momentum: -13 },
        "trustCost",
      ),
      choice(
        "onboard",
        text("Fix onboarding", "온보딩을 고친다", "導入体験を直す"),
        text(
          "New users adapt. Existing customers keep complaining.",
          "신규 사용자는 적응했고 기존 고객 불만은 남았습니다.",
          "新規利用者は適応。既存顧客の不満は継続。",
        ),
        { cash: -10, momentum: 14, trust: -5 },
        "spendGrowth",
      ),
    ],
  ),
  weeklyScenario(
    "saas",
    "api-outage",
    SAAS,
    text(
      "The API missed its own SLA",
      "API가 자체 SLA를 어겼습니다",
      "APIがSLAを違反",
    ),
    text(
      "Enterprise customers want service credits and a public incident review.",
      "기업 고객이 크레딧 보상과 공개 장애 보고서를 요구합니다.",
      "大企業顧客が補償と公開障害報告を要求。",
    ),
    [
      choice(
        "credit",
        text("Pay every credit", "전액 보상한다", "全額補償する"),
        text(
          "Finance winces. Renewal calls become calmer.",
          "재무팀은 울었고 재계약 통화는 차분해졌습니다.",
          "財務は痛手。更新交渉は安定。",
        ),
        { cash: -17, trust: 20 },
        "trustCost",
      ),
      choice(
        "contract",
        text("Follow contract only", "계약만 따른다", "契約範囲のみ対応"),
        text(
          "Cash stays. Procurement adds a red flag.",
          "현금은 남았고 구매팀 평가에는 경고가 붙었습니다.",
          "資金維持。調達評価に警告。",
        ),
        { cash: 7, trust: -18 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "saas",
    "seat-pricing",
    SAAS,
    text(
      "Customers share one login",
      "고객들이 계정 하나를 돌려씁니다",
      "顧客が1アカウントを共有",
    ),
    text(
      "Seat revenue is leaking, but strict enforcement could anger loyal teams.",
      "좌석 매출이 새지만 강제 제한은 충성 고객을 화나게 할 수 있습니다.",
      "席売上が漏出。厳格化は優良顧客の反発を招きます。",
    ),
    [
      choice(
        "enforce",
        text("Enforce seats", "좌석 제한을 건다", "席制限を実施"),
        text(
          "Revenue rises. Community posts call the change hostile.",
          "매출은 올랐고 커뮤니티는 적대적 변경이라 부릅니다.",
          "売上増加。コミュニティは敵対的変更と批判。",
        ),
        { cash: 16, trust: -14 },
        "trustRisk",
      ),
      choice(
        "usage",
        text("Price by usage", "사용량 과금으로 바꾼다", "従量課金へ"),
        text(
          "Heavy users pay more. Billing complexity explodes.",
          "헤비 유저가 더 냈고 청구 복잡도가 폭발했습니다.",
          "ヘビーユーザー負担増。請求複雑度も急増。",
        ),
        { cash: 10, morale: -8, momentum: 7 },
        "bet",
      ),
    ],
  ),
  scenario(
    "saas",
    "integration-market",
    SAAS,
    text(
      "Partners want an app marketplace",
      "파트너들이 앱 마켓을 원합니다",
      "パートナーがアプリ市場を要求",
    ),
    text(
      "Opening the platform could multiply reach and support obligations.",
      "플랫폼 개방은 도달 범위와 지원 의무를 함께 늘립니다.",
      "プラットフォーム開放は到達範囲と支援義務を同時に増やします。",
    ),
    [
      choice(
        "open",
        text("Open the platform", "플랫폼을 연다", "開放する"),
        text(
          "Integrations arrive fast. Support queues follow.",
          "연동 앱이 빠르게 늘고 지원 대기도 따라왔습니다.",
          "連携アプリが急増。サポート待ちも増加。",
        ),
        { momentum: 19, morale: -10, cash: -6 },
        "spendGrowth",
      ),
      choice(
        "curate",
        text("Curate five partners", "파트너 다섯 곳만 고른다", "5社に限定"),
        text(
          "Quality stays high. Smaller partners move to rivals.",
          "품질은 지켰고 작은 파트너는 경쟁사로 갔습니다.",
          "品質維持。小規模パートナーは競合へ。",
        ),
        { trust: 9, momentum: -7, cash: 5 },
        "focus",
      ),
    ],
  ),
  scenario(
    "saas",
    "support-backlog",
    SAAS,
    text(
      "Support has a nine-day backlog",
      "고객지원 대기가 9일입니다",
      "サポート待ちが9日",
    ),
    text(
      "Product engineers can clear it, but every hour delays the release.",
      "제품 개발자가 투입되면 해결되지만 출시가 늦어집니다.",
      "開発者投入で解消できますが、発売が遅れます。",
    ),
    [
      choice(
        "swarm",
        text("Send everyone", "전원을 투입한다", "全員投入"),
        text(
          "The queue disappears. Sprint goals do too.",
          "대기열과 스프린트 목표가 함께 사라졌습니다.",
          "待ち行列とスプリント目標が同時に消滅。",
        ),
        { trust: 17, morale: -6, momentum: -15 },
        "trustCost",
      ),
      choice(
        "outsource",
        text("Hire a support vendor", "외주 지원팀을 쓴다", "外部支援を雇う"),
        text(
          "Replies speed up. Nuance gets lost in scripts.",
          "답변은 빨라졌고 맥락은 스크립트에서 사라졌습니다.",
          "返信は高速化。文脈は台本で消失。",
        ),
        { cash: -13, trust: 6, momentum: 8 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "saas",
    "discount",
    SAAS,
    text(
      "Sales promised a 55% discount",
      "영업팀이 55% 할인을 약속했습니다",
      "営業が55%割引を約束",
    ),
    text(
      "The logo is famous. The contract loses money for two years.",
      "유명 고객이지만 계약은 2년간 적자입니다.",
      "有名顧客ですが、契約は2年間赤字。",
    ),
    [
      choice(
        "honor",
        text("Honor the quote", "약속을 지킨다", "見積を守る"),
        text(
          "The logo lands. Every prospect asks for the same deal.",
          "로고는 얻었고 모든 잠재 고객이 같은 가격을 요구합니다.",
          "導入実績獲得。全見込み客が同条件を要求。",
        ),
        { momentum: 18, cash: -16, trust: 5 },
        "bet",
      ),
      choice(
        "withdraw",
        text("Withdraw the quote", "견적을 철회한다", "見積を撤回"),
        text(
          "Margins survive. Sales loses its biggest trophy.",
          "마진은 살았고 영업팀은 최대 실적을 잃었습니다.",
          "利益率維持。営業は最大案件を失う。",
        ),
        { cash: 8, morale: -9, momentum: -8 },
        "saveSlow",
      ),
    ],
  ),
  scenario(
    "saas",
    "residency",
    SAAS,
    text(
      "Europe demands data residency",
      "유럽 고객이 데이터 현지화를 요구합니다",
      "欧州がデータ所在を要求",
    ),
    text(
      "A regional stack unlocks the market but doubles operational surface.",
      "지역 인프라는 시장을 열지만 운영 범위를 두 배로 만듭니다.",
      "地域基盤は市場を開く一方、運用範囲を倍増させます。",
    ),
    [
      choice(
        "build",
        text("Build the region", "유럽 리전을 만든다", "欧州リージョン構築"),
        text(
          "Enterprise doors open. On-call gains another timezone.",
          "기업 시장이 열렸고 온콜 시간대가 하나 늘었습니다.",
          "大企業市場が開放。当番時間帯も増加。",
        ),
        { cash: -18, momentum: 20, morale: -7 },
        "spendGrowth",
      ),
      choice(
        "wait",
        text("Wait for demand", "수요를 더 기다린다", "需要を待つ"),
        text(
          "Operations stay simple. Two deals expire.",
          "운영은 단순했고 계약 두 건은 만료됐습니다.",
          "運用は単純。2案件は失効。",
        ),
        { cash: 6, momentum: -13 },
        "focus",
      ),
    ],
  ),
  scenario(
    "saas",
    "free-abuse",
    SAAS,
    text(
      "Bots discovered the free tier",
      "봇이 무료 플랜을 발견했습니다",
      "ボットが無料枠を発見",
    ),
    text(
      "Automated accounts consume a third of infrastructure capacity.",
      "자동 계정이 인프라 용량의 3분의 1을 씁니다.",
      "自動アカウントが基盤容量の3分の1を消費。",
    ),
    [
      choice(
        "captcha",
        text("Add strict verification", "강한 인증을 붙인다", "厳格認証を追加"),
        text(
          "Bots vanish. Sign-up conversion falls with them.",
          "봇과 가입 전환율이 함께 떨어졌습니다.",
          "ボット消滅。登録転換率も低下。",
        ),
        { cash: 12, momentum: -11, trust: -4 },
        "saveSlow",
      ),
      choice(
        "meter",
        text("Meter every action", "모든 행동을 계량한다", "全操作を計量"),
        text(
          "Abuse becomes revenue. Billing code becomes a maze.",
          "남용이 매출이 됐고 청구 코드는 미로가 됐습니다.",
          "乱用が売上化。請求コードは迷路に。",
        ),
        { cash: 14, morale: -10, momentum: 5 },
        "bet",
      ),
    ],
  ),
  scenario(
    "saas",
    "founder-sales",
    SAAS,
    text(
      "Only the founder can close deals",
      "대표만 계약을 성사시킬 수 있습니다",
      "創業者しか契約できない",
    ),
    text(
      "Pipeline stalls whenever product or fundraising needs the CEO.",
      "제품이나 투자 업무가 대표를 부를 때마다 영업이 멈춥니다.",
      "製品や資金調達でCEOが呼ばれるたび営業停止。",
    ),
    [
      choice(
        "hire-vp",
        text("Hire a sales VP", "영업 책임자를 뽑는다", "営業責任者を採用"),
        text(
          "Pipeline becomes a system. Culture gains forecasts.",
          "영업이 시스템이 됐고 문화에 예측표가 생겼습니다.",
          "営業が仕組み化。文化に予測表が追加。",
        ),
        { cash: -16, momentum: 16, morale: 4 },
        "spendGrowth",
      ),
      choice(
        "keep",
        text(
          "Keep founder-led sales",
          "대표 영업을 유지한다",
          "創業者営業を継続",
        ),
        text(
          "Close rates stay high. Everything else waits.",
          "계약률은 높고 다른 모든 일은 기다립니다.",
          "成約率維持。他業務は待機。",
        ),
        { cash: 12, momentum: -9, morale: -7 },
        "focus",
      ),
    ],
  ),
  scenario(
    "saas",
    "conference",
    SAAS,
    text(
      "Customers want an annual conference",
      "고객들이 연례 행사를 원합니다",
      "顧客が年次イベントを希望",
    ),
    text(
      "A polished event could deepen loyalty or burn a quarter's marketing budget.",
      "행사는 충성도를 높이거나 분기 마케팅 예산을 태웁니다.",
      "イベントは忠誠を深めるか、四半期予算を焼きます。",
    ),
    [
      choice(
        "stage",
        text("Rent the big hall", "큰 행사장을 빌린다", "大会場を借りる"),
        text(
          "Customers post every keynote. Finance counts every chair.",
          "고객은 키노트를 공유했고 재무는 모든 의자를 셌습니다.",
          "顧客は講演を共有。財務は全席を計算。",
        ),
        { cash: -17, trust: 17, momentum: 9 },
        "trustCost",
      ),
      choice(
        "online",
        text("Run it online", "온라인으로 연다", "オンライン開催"),
        text(
          "Attendance triples. Nobody stays for networking.",
          "참석자는 세 배였고 네트워킹에는 아무도 남지 않았습니다.",
          "参加者3倍。交流には誰も残らず。",
        ),
        { cash: -5, momentum: 10, trust: 3 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "saas",
    "clone",
    SAAS,
    text(
      "A funded rival copied the homepage",
      "투자받은 경쟁사가 홈페이지를 베꼈습니다",
      "資金豊富な競合がサイトを模倣",
    ),
    text(
      "Their product now claims every feature you launched last year.",
      "그들의 제품은 우리가 작년 출시한 모든 기능을 주장합니다.",
      "競合は昨年の全機能を自社のものと主張。",
    ),
    [
      choice(
        "race",
        text("Race feature for feature", "기능으로 맞붙는다", "機能競争する"),
        text(
          "The checklist catches up. Product identity disappears.",
          "체크리스트는 따라잡았고 제품 정체성은 사라졌습니다.",
          "機能表は追いつき、製品の個性は消失。",
        ),
        { cash: -12, momentum: 13, morale: -10 },
        "bet",
      ),
      choice(
        "niche",
        text("Own one niche", "한 시장에 집중한다", "一市場に集中"),
        text(
          "The market gets smaller. Win rates get larger.",
          "시장은 작아졌고 승률은 커졌습니다.",
          "市場は縮小。勝率は上昇。",
        ),
        { trust: 13, momentum: -5, cash: 7 },
        "focus",
      ),
    ],
  ),
  scenario(
    "saas",
    "renewal-forecast",
    SAAS,
    text(
      "The renewal forecast is fiction",
      "재계약 예측이 허구입니다",
      "更新予測が架空",
    ),
    text(
      "Account managers marked every uncertain customer green before the board meeting.",
      "고객 담당자들이 이사회 전에 모든 불확실 고객을 초록색으로 칠했습니다.",
      "担当者が会議前に全不確実顧客を緑表示。",
    ),
    [
      choice(
        "restate",
        text("Restate the forecast", "예측을 바로잡는다", "予測を修正"),
        text(
          "The board loses confidence today and trusts next quarter more.",
          "이사회는 오늘 실망했고 다음 분기는 더 믿게 됐습니다.",
          "取締役会は今日失望し、次四半期をより信頼。",
        ),
        { trust: 16, momentum: -10 },
        "trustCost",
      ),
      choice(
        "coach",
        text(
          "Keep it and coach quietly",
          "유지하고 조용히 교정한다",
          "維持して内密に指導",
        ),
        text(
          "The meeting passes. Reality arrives thirty days later.",
          "회의는 넘겼고 현실은 30일 뒤 도착했습니다.",
          "会議は通過。現実は30日後に到着。",
        ),
        { momentum: 8, trust: -15, morale: -4 },
        "trustRisk",
      ),
    ],
  ),
];

const commerceScenarios: readonly CompanyScenario[] = [
  weeklyScenario(
    "commerce",
    "supplier-price",
    COMMERCE,
    text(
      "Your supplier raised prices 28%",
      "공급사가 가격을 28% 올렸습니다",
      "仕入先が28%値上げ",
    ),
    text(
      "The bestseller becomes unprofitable next shipment.",
      "다음 입고부터 베스트셀러가 적자로 바뀝니다.",
      "次回入荷から主力商品が赤字。",
    ),
    [
      choice(
        "raise",
        text("Raise retail prices", "판매가를 올린다", "販売価格を上げる"),
        text(
          "Margins recover. Conversion drops before lunch.",
          "마진은 회복됐고 전환율은 점심 전에 떨어졌습니다.",
          "利益回復。昼前に転換率低下。",
        ),
        { cash: 16, trust: -12, momentum: -5 },
        "trustRisk",
      ),
      choice(
        "switch",
        text("Switch suppliers", "공급사를 바꾼다", "仕入先を変更"),
        text(
          "Costs fall. Quality reviews become unpredictable.",
          "원가는 내려갔고 품질 리뷰는 예측 불가가 됐습니다.",
          "原価低下。品質評価は不安定。",
        ),
        { cash: 9, trust: -8, momentum: 8 },
        "bet",
      ),
    ],
  ),
  weeklyScenario(
    "commerce",
    "stockout",
    COMMERCE,
    text(
      "The viral product sold out",
      "바이럴 상품이 품절됐습니다",
      "話題の商品が完売",
    ),
    text(
      "Demand is peaking while the next factory slot is six weeks away.",
      "수요는 정점인데 다음 생산 일정은 6주 뒤입니다.",
      "需要最高潮。次の生産枠は6週間後。",
    ),
    [
      choice(
        "air",
        text("Air-freight inventory", "항공 운송한다", "航空輸送する"),
        text(
          "Shelves refill. Freight eats the margin.",
          "재고는 찼고 운송비가 마진을 먹었습니다.",
          "在庫回復。航空費が利益を消費。",
        ),
        { cash: -15, momentum: 20 },
        "spendGrowth",
      ),
      choice(
        "waitlist",
        text("Open a waitlist", "대기 명단을 연다", "予約待ちを開く"),
        text(
          "Cash stays safe. Half the hype moves on.",
          "현금은 안전했고 화제의 절반은 떠났습니다.",
          "資金は安全。話題の半分は離脱。",
        ),
        { trust: 7, momentum: -13, cash: 5 },
        "saveSlow",
      ),
    ],
  ),
  scenario(
    "commerce",
    "return-fraud",
    COMMERCE,
    text(
      "Return fraud became a business model",
      "반품 사기가 사업이 됐습니다",
      "返品詐欺が事業化",
    ),
    text(
      "Worn products return as new, but strict rules punish honest buyers.",
      "쓴 제품이 새 상품으로 돌아오지만 강한 규칙은 선량한 고객을 벌줍니다.",
      "使用済み商品が新品扱いで返品。厳格化は善良な顧客も罰します。",
    ),
    [
      choice(
        "strict",
        text("Tighten returns", "반품을 강화한다", "返品条件を厳格化"),
        text(
          "Fraud falls. Customer service takes the heat.",
          "사기는 줄었고 고객지원이 불길을 맞았습니다.",
          "不正減少。顧客対応が炎上。",
        ),
        { cash: 13, trust: -13, morale: -5 },
        "trustRisk",
      ),
      choice(
        "detect",
        text("Build fraud detection", "사기 탐지를 만든다", "不正検知を構築"),
        text(
          "Good buyers stay happy. Engineering learns shoe sizes.",
          "선량한 고객은 만족했고 개발팀은 신발 사이즈를 배웠습니다.",
          "善良な顧客は満足。開発部は靴サイズを学習。",
        ),
        { cash: -12, trust: 14, momentum: 5 },
        "trustCost",
      ),
    ],
  ),
  scenario(
    "commerce",
    "influencer",
    COMMERCE,
    text(
      "Your top influencer posted a scandal",
      "최대 인플루언서가 사고를 쳤습니다",
      "最大インフルエンサーが炎上",
    ),
    text(
      "Their discount code drives 22% of new orders.",
      "그들의 할인 코드가 신규 주문의 22%를 만듭니다.",
      "割引コードが新規注文の22%を創出。",
    ),
    [
      choice(
        "drop",
        text("End the contract", "계약을 끝낸다", "契約終了"),
        text(
          "Trust stabilizes. Acquisition cost jumps.",
          "신뢰는 안정됐고 고객 획득비는 뛰었습니다.",
          "信頼安定。顧客獲得費が上昇。",
        ),
        { trust: 17, momentum: -16, cash: -5 },
        "trustCost",
      ),
      choice(
        "pause",
        text("Pause and investigate", "중단하고 조사한다", "停止して調査"),
        text(
          "The internet calls it cowardice from both sides.",
          "인터넷 양쪽 모두가 비겁하다고 불렀습니다.",
          "双方から臆病と批判。",
        ),
        { trust: -5, momentum: -8, cash: 6 },
        "focus",
      ),
    ],
  ),
  scenario(
    "commerce",
    "warehouse",
    COMMERCE,
    text(
      "Warehouse workers walked out",
      "물류센터 직원들이 파업했습니다",
      "倉庫従業員がスト",
    ),
    text(
      "Orders stack up while workers demand safer shifts and higher pay.",
      "주문은 쌓이고 직원들은 안전한 교대와 임금 인상을 요구합니다.",
      "注文滞留。従業員は安全な勤務と賃上げを要求。",
    ),
    [
      choice(
        "settle",
        text("Accept the demands", "요구를 수용한다", "要求を受け入れる"),
        text(
          "Shipping resumes. Unit economics tighten.",
          "배송은 재개됐고 건당 수익은 줄었습니다.",
          "配送再開。単位収益は低下。",
        ),
        { cash: -15, morale: 22, trust: 8 },
        "teamCost",
      ),
      choice(
        "third-party",
        text("Move to a 3PL", "외부 물류로 옮긴다", "外部物流へ移行"),
        text(
          "Boxes move again. The company loses direct control.",
          "상자는 움직였고 회사는 직접 통제를 잃었습니다.",
          "荷物は動き、直接管理を喪失。",
        ),
        { cash: -8, morale: -16, momentum: 12 },
        "teamRisk",
      ),
    ],
  ),
  scenario(
    "commerce",
    "packaging",
    COMMERCE,
    text(
      "Customers hate the packaging",
      "고객들이 포장을 싫어합니다",
      "顧客が包装を嫌う",
    ),
    text(
      "Unboxing videos show plastic layers around a sustainability brand.",
      "친환경 브랜드의 비닐 포장이 언박싱 영상에 잡힙니다.",
      "環境ブランドの多重プラ包装が動画で拡散。",
    ),
    [
      choice(
        "redesign",
        text("Redesign immediately", "즉시 다시 만든다", "即時再設計"),
        text(
          "Sentiment improves. Existing boxes become waste.",
          "여론은 좋아졌고 기존 상자는 폐기물이 됐습니다.",
          "評判改善。既存在庫は廃棄物に。",
        ),
        { cash: -13, trust: 18 },
        "trustCost",
      ),
      choice(
        "explain",
        text(
          "Explain the protection",
          "보호 목적을 설명한다",
          "保護目的を説明",
        ),
        text(
          "Damage rates stay low. The memes stay online.",
          "파손률은 낮고 밈은 온라인에 남았습니다.",
          "破損率は低いまま。ミームも残存。",
        ),
        { cash: 6, trust: -10 },
        "focus",
      ),
    ],
  ),
  scenario(
    "commerce",
    "flash-sale",
    COMMERCE,
    text(
      "Marketing scheduled a midnight flash sale",
      "마케팅이 자정 특가를 잡았습니다",
      "深夜セールを予定",
    ),
    text(
      "The site survived the load test only once out of three runs.",
      "사이트는 부하 테스트 세 번 중 한 번만 버텼습니다.",
      "負荷試験3回中1回のみ成功。",
    ),
    [
      choice(
        "run",
        text("Run the sale", "특가를 진행한다", "セール実行"),
        text(
          "Revenue spikes. Checkout falls over for twenty minutes.",
          "매출은 뛰었고 결제는 20분간 쓰러졌습니다.",
          "売上急増。決済は20分停止。",
        ),
        { cash: 19, trust: -13, momentum: 12 },
        "bet",
      ),
      choice(
        "delay",
        text("Delay one week", "일주일 미룬다", "1週間延期"),
        text(
          "Engineering sleeps. The campaign loses urgency.",
          "개발팀은 잤고 캠페인은 긴장감을 잃었습니다.",
          "開発は休息。施策の緊迫感は低下。",
        ),
        { morale: 14, momentum: -12, trust: 4 },
        "teamCost",
      ),
    ],
  ),
  scenario(
    "commerce",
    "marketplace-ban",
    COMMERCE,
    text(
      "The marketplace suspended your store",
      "마켓플레이스가 상점을 정지했습니다",
      "市場が店舗を停止",
    ),
    text(
      "Forty percent of revenue is frozen over an automated policy flag.",
      "자동 정책 경고로 매출 40%가 얼었습니다.",
      "自動規約判定で売上40%が凍結。",
    ),
    [
      choice(
        "appeal",
        text("Wait for the appeal", "이의 신청을 기다린다", "異議申立てを待つ"),
        text(
          "The store returns in six days. Payroll feels every hour.",
          "상점은 6일 뒤 돌아왔고 급여일은 매시간 다가왔습니다.",
          "6日後に復旧。資金は刻々と減少。",
        ),
        { cash: -18, trust: 5 },
        "trustCost",
      ),
      choice(
        "direct",
        text("Push direct sales", "자사몰 판매를 민다", "直販を強化"),
        text(
          "Margins improve. Acquisition gets expensive.",
          "마진은 좋아졌고 고객 획득은 비싸졌습니다.",
          "利益率改善。顧客獲得費は上昇。",
        ),
        { cash: -8, momentum: 17, trust: 6 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "commerce",
    "counterfeit",
    COMMERCE,
    text(
      "Counterfeits outrank the original",
      "가품이 정품보다 검색 상위입니다",
      "偽物が本物より上位表示",
    ),
    text(
      "Cheap copies use your photos and collect one-star reviews meant for you.",
      "싼 복제품이 사진을 훔치고 우리 몫의 별점 1개를 받습니다.",
      "模倣品が写真を盗用し、本物向けの低評価を集めています。",
    ),
    [
      choice(
        "legal",
        text("Launch legal action", "법적 대응한다", "法的措置"),
        text(
          "Listings fall slowly. Legal invoices arrive quickly.",
          "가품은 천천히 줄고 법률 청구서는 빨리 왔습니다.",
          "出品はゆっくり減少。法務費は即到着。",
        ),
        { cash: -16, trust: 13 },
        "trustCost",
      ),
      choice(
        "authenticate",
        text(
          "Add product authentication",
          "정품 인증을 붙인다",
          "製品認証を追加",
        ),
        text(
          "Buyers learn the difference. Packaging cost rises.",
          "고객은 차이를 알게 됐고 포장 원가는 올랐습니다.",
          "顧客は違いを理解。包装費は増加。",
        ),
        { cash: -9, trust: 17, momentum: 4 },
        "trustCost",
      ),
    ],
  ),
  scenario(
    "commerce",
    "subscription",
    COMMERCE,
    text(
      "The subscription box is losing its surprise",
      "구독 상자가 놀라움을 잃었습니다",
      "定期便の驚きが消失",
    ),
    text(
      "Long-term members receive repeats while inventory piles up.",
      "장기 회원은 중복 상품을 받고 재고는 쌓입니다.",
      "長期会員に重複商品。在庫は増加。",
    ),
    [
      choice(
        "personalize",
        text("Personalize every box", "상자를 개인화한다", "全箱を個別化"),
        text(
          "Churn falls. Packing becomes a logic puzzle.",
          "해지는 줄고 포장은 논리 퍼즐이 됐습니다.",
          "解約減少。梱包は論理パズルに。",
        ),
        { trust: 15, morale: -11, cash: -7 },
        "teamRisk",
      ),
      choice(
        "seasonal",
        text(
          "Ship seasonal themes",
          "계절 테마로 통일한다",
          "季節テーマに統一",
        ),
        text(
          "Operations simplify. Superfans call it predictable.",
          "운영은 단순해졌고 열성 팬은 뻔하다고 합니다.",
          "運用簡素化。熱心なファンは予測可能と批判。",
        ),
        { cash: 12, momentum: -7, trust: -4 },
        "saveSlow",
      ),
    ],
  ),
  scenario(
    "commerce",
    "global",
    COMMERCE,
    text(
      "International demand appeared",
      "해외 주문이 몰리기 시작했습니다",
      "海外需要が発生",
    ),
    text(
      "Customers accept high shipping but not surprise customs bills.",
      "고객은 비싼 배송은 참아도 갑작스러운 관세는 참지 않습니다.",
      "高い送料は許容。予期せぬ関税は拒否。",
    ),
    [
      choice(
        "landed",
        text("Include all duties", "관세를 선결제한다", "関税込みにする"),
        text(
          "Checkout trust rises. Margin varies by border.",
          "결제 신뢰는 올랐고 마진은 국경마다 달라졌습니다.",
          "決済信頼向上。利益率は国境ごとに変動。",
        ),
        { trust: 17, cash: -11, momentum: 8 },
        "trustCost",
      ),
      choice(
        "domestic",
        text("Stay domestic", "국내에 집중한다", "国内に集中"),
        text(
          "Operations stay clean. Foreign fans find alternatives.",
          "운영은 깔끔했고 해외 팬은 대안을 찾았습니다.",
          "運用は安定。海外顧客は代替へ。",
        ),
        { cash: 6, momentum: -14 },
        "focus",
      ),
    ],
  ),
  scenario(
    "commerce",
    "same-day",
    COMMERCE,
    text(
      "A rival launched same-day delivery",
      "경쟁사가 당일 배송을 시작했습니다",
      "競合が当日配送を開始",
    ),
    text(
      "Customers now compare arrival time before product quality.",
      "고객은 품질보다 도착 시간을 먼저 비교합니다.",
      "顧客は品質より到着時間を比較。",
    ),
    [
      choice(
        "match",
        text("Match every city", "모든 도시에서 맞붙는다", "全都市で対抗"),
        text(
          "Orders rise. Courier invoices rise faster.",
          "주문은 늘고 배송 청구서는 더 빨리 늘었습니다.",
          "注文増加。配送費はさらに急増。",
        ),
        { cash: -20, momentum: 20, trust: 6 },
        "spendGrowth",
      ),
      choice(
        "premium",
        text("Offer paid express", "유료 빠른 배송을 연다", "有料速達を提供"),
        text(
          "Urgent buyers pay. The default promise stays honest.",
          "급한 고객은 냈고 기본 약속은 정직하게 남았습니다.",
          "急ぐ顧客は支払い、通常約束は維持。",
        ),
        { cash: 11, trust: 9, momentum: 4 },
        "focus",
      ),
    ],
  ),
];

const gameScenarios: readonly CompanyScenario[] = [
  weeklyScenario(
    "game-studio",
    "delay",
    GAME,
    text(
      "The game needs six more months",
      "게임에 6개월이 더 필요합니다",
      "完成まであと6か月",
    ),
    text(
      "The announced release date is printed on retail displays worldwide.",
      "발표한 출시일이 전 세계 매장 진열대에 인쇄됐습니다.",
      "発表済み発売日が世界中の店頭に印刷済み。",
    ),
    [
      choice(
        "delay",
        text("Delay publicly", "공개 연기한다", "公開延期"),
        text(
          "Quality improves. Preorders and patience decline.",
          "품질은 좋아지고 예약과 인내는 줄었습니다.",
          "品質向上。予約と忍耐は減少。",
        ),
        { trust: 10, cash: -16, momentum: -13 },
        "trustCost",
      ),
      choice(
        "ship",
        text("Ship on time", "제때 출시한다", "予定通り発売"),
        text(
          "Revenue arrives. Reviews document every missing month.",
          "매출은 왔고 리뷰는 빠진 6개월을 기록했습니다.",
          "売上到着。レビューは不足6か月を記録。",
        ),
        { cash: 20, trust: -22, morale: -8 },
        "trustRisk",
      ),
    ],
  ),
  weeklyScenario(
    "game-studio",
    "review-bomb",
    GAME,
    text(
      "The store rating fell to 1.8",
      "스토어 평점이 1.8로 떨어졌습니다",
      "ストア評価が1.8へ",
    ),
    text(
      "A balance patch angered the loudest part of the community.",
      "밸런스 패치가 가장 목소리 큰 커뮤니티를 화나게 했습니다.",
      "調整パッチが最も声の大きい層を怒らせました。",
    ),
    [
      choice(
        "revert",
        text("Revert the patch", "패치를 되돌린다", "パッチを戻す"),
        text(
          "Ratings recover. Competitive balance breaks again.",
          "평점은 회복되고 경쟁 밸런스는 다시 무너졌습니다.",
          "評価回復。対戦バランスは再崩壊。",
        ),
        { trust: 13, momentum: -10 },
        "trustCost",
      ),
      choice(
        "hold",
        text("Hold the balance", "밸런스를 유지한다", "調整を維持"),
        text(
          "The outrage fades. Core players learn the new meta.",
          "분노는 잦아들고 핵심 유저는 새 메타를 익혔습니다.",
          "怒りは沈静。中核層は新環境に適応。",
        ),
        { trust: -12, momentum: 14 },
        "focus",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "lootbox",
    GAME,
    text(
      "Loot boxes face a legal deadline",
      "확률형 아이템 규제가 다가옵니다",
      "ルートボックス規制が迫る",
    ),
    text(
      "The mechanic funds half of live operations.",
      "이 시스템이 라이브 운영비 절반을 냅니다.",
      "この仕組みが運営費の半分を支えています。",
    ),
    [
      choice(
        "remove",
        text("Remove them globally", "전 세계에서 제거한다", "全世界で撤去"),
        text(
          "Trust jumps. Monthly revenue loses its engine.",
          "신뢰는 뛰고 월 매출은 엔진을 잃었습니다.",
          "信頼上昇。月次売上は原動力を喪失。",
        ),
        { trust: 23, cash: -20 },
        "trustCost",
      ),
      choice(
        "regional",
        text(
          "Change regulated regions",
          "규제 지역만 바꾼다",
          "規制地域のみ変更",
        ),
        text(
          "Revenue survives. Players compare unequal stores.",
          "매출은 살고 플레이어는 불평등한 상점을 비교합니다.",
          "売上維持。地域差への不満発生。",
        ),
        { cash: 12, trust: -14 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "event-outage",
    GAME,
    text(
      "The finale crashed live",
      "라이브 피날레가 중단됐습니다",
      "ライブ最終章が停止",
    ),
    text(
      "Two million players watched a loading spinner instead of the ending.",
      "200만 명이 결말 대신 로딩 화면을 봤습니다.",
      "200万人が結末ではなく読込画面を視聴。",
    ),
    [
      choice(
        "rerun",
        text("Rerun the event", "이벤트를 다시 연다", "イベント再開催"),
        text(
          "Players return. The team loses another weekend.",
          "플레이어는 돌아왔고 팀은 주말을 하나 더 잃었습니다.",
          "プレイヤー復帰。チームは週末を再び失う。",
        ),
        { trust: 18, morale: -17, cash: -6 },
        "teamRisk",
      ),
      choice(
        "publish",
        text("Publish the ending", "결말 영상을 공개한다", "結末動画を公開"),
        text(
          "Everyone sees it. Nobody feels they were there.",
          "모두 봤지만 누구도 그 자리에 있었다고 느끼지 못했습니다.",
          "全員視聴。しかし参加感は消失。",
        ),
        { trust: -8, morale: 7, momentum: -5 },
        "focus",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "streamer",
    GAME,
    text(
      "A top streamer wants creative control",
      "대형 스트리머가 기획권을 원합니다",
      "大手配信者が企画権を要求",
    ),
    text(
      "Their audience could triple launch reach, but their idea changes the tone.",
      "그들의 시청자는 도달을 세 배로 만들지만 아이디어가 게임 톤을 바꿉니다.",
      "視聴者は到達を3倍にしますが、案は作品の調子を変えます。",
    ),
    [
      choice(
        "deal",
        text("Make the collaboration", "협업한다", "協業する"),
        text(
          "Wishlists surge. The design team stops recognizing the game.",
          "찜은 폭증했고 디자인팀은 게임을 알아보지 못합니다.",
          "予約急増。設計チームは作品を見失う。",
        ),
        { momentum: 22, morale: -13, cash: 7 },
        "bet",
      ),
      choice(
        "decline",
        text("Protect the vision", "비전을 지킨다", "作品性を守る"),
        text(
          "The game stays coherent. The audience stays smaller.",
          "게임은 일관됐고 관객은 작게 남았습니다.",
          "作品は一貫。観客規模は小さいまま。",
        ),
        { trust: 9, momentum: -11, morale: 6 },
        "focus",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "crunch",
    GAME,
    text(
      "The milestone requires crunch",
      "마일스톤에 크런치가 필요합니다",
      "節目に長時間労働が必要",
    ),
    text(
      "The publisher will cut marketing if the build slips.",
      "빌드가 늦으면 퍼블리셔가 마케팅을 줄입니다.",
      "ビルド遅延で販売元が宣伝を削減。",
    ),
    [
      choice(
        "crunch",
        text("Mandate overtime", "야근을 지시한다", "残業を命じる"),
        text(
          "The build lands. Resignation drafts open Monday.",
          "빌드는 나왔고 월요일에 사직서 초안이 열렸습니다.",
          "ビルド完成。月曜に退職届が開かれる。",
        ),
        { momentum: 18, morale: -23, cash: 5 },
        "teamRisk",
      ),
      choice(
        "cut",
        text("Cut two features", "기능 두 개를 뺀다", "機能を2つ削る"),
        text(
          "The team breathes. Preview coverage calls it thin.",
          "팀은 숨을 쉬고 프리뷰는 빈약하다고 평가했습니다.",
          "チームは回復。先行評価は薄いと批判。",
        ),
        { morale: 17, momentum: -13, trust: -5 },
        "teamCost",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "publisher",
    GAME,
    text(
      "A publisher offers global distribution",
      "퍼블리셔가 글로벌 유통을 제안합니다",
      "販売元が世界展開を提案",
    ),
    text(
      "They fund localization and take the IP sequel rights.",
      "현지화 비용을 대는 대신 후속작 권리를 가져갑니다.",
      "現地化費用と引き換えに続編権を取得。",
    ),
    [
      choice(
        "sign",
        text("Sign the deal", "계약한다", "契約する"),
        text(
          "The map opens. Future creative control narrows.",
          "세계가 열리고 미래 창작권은 좁아졌습니다.",
          "世界市場開放。将来の創作権は縮小。",
        ),
        { cash: 22, momentum: 18, morale: -9 },
        "bet",
      ),
      choice(
        "self",
        text("Self-publish", "직접 유통한다", "自主販売"),
        text(
          "Control stays. Marketing becomes another game to build.",
          "통제권은 남고 마케팅은 새로 개발할 게임이 됐습니다.",
          "支配権維持。宣伝が新たな開発対象に。",
        ),
        { cash: -15, morale: 8, trust: 7 },
        "focus",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "cheaters",
    GAME,
    text(
      "Cheaters own the ranked ladder",
      "핵 사용자가 랭킹을 점령했습니다",
      "不正利用者が順位戦を占領",
    ),
    text(
      "A new anti-cheat driver could stop them and trigger privacy fears.",
      "새 안티치트 드라이버는 막을 수 있지만 개인정보 우려를 만듭니다.",
      "新対策は阻止可能ですが、個人情報懸念を生みます。",
    ),
    [
      choice(
        "kernel",
        text(
          "Ship deep anti-cheat",
          "강한 안티치트를 넣는다",
          "強力対策を導入",
        ),
        text(
          "Cheaters vanish. A privacy thread trends worldwide.",
          "핵은 사라지고 개인정보 글이 전 세계에 퍼졌습니다.",
          "不正消滅。個人情報議論が世界拡散。",
        ),
        { trust: -10, momentum: 14, cash: -8 },
        "trustRisk",
      ),
      choice(
        "manual",
        text("Fund manual review", "수동 검수를 늘린다", "人手審査を増強"),
        text(
          "Top ranks improve slowly. Moderators burn out quickly.",
          "상위 랭크는 천천히 좋아지고 운영자는 빨리 지쳤습니다.",
          "上位環境は徐々に改善。運営は急速に消耗。",
        ),
        { cash: -12, morale: -13, trust: 13 },
        "teamRisk",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "sequel",
    GAME,
    text(
      "The board wants a sequel now",
      "이사회가 지금 후속작을 원합니다",
      "取締役会が今すぐ続編を要求",
    ),
    text(
      "The current game still has a growing community and unfinished promises.",
      "현재 게임은 커뮤니티가 성장 중이고 미완성 약속이 남았습니다.",
      "現行作は成長中で、未完の約束があります。",
    ),
    [
      choice(
        "sequel",
        text("Move the core team", "핵심 팀을 옮긴다", "中核チームを移動"),
        text(
          "A new trailer excites investors. Veterans notice the silence.",
          "새 예고편은 투자자를 흥분시키고 기존 유저는 침묵을 알아챘습니다.",
          "新映像に投資家興奮。既存利用者は沈黙を察知。",
        ),
        { momentum: 19, trust: -16, cash: 6 },
        "bet",
      ),
      choice(
        "live",
        text("Keep updating", "라이브 업데이트를 계속한다", "更新を継続"),
        text(
          "The community grows. The sequel window narrows.",
          "커뮤니티는 커지고 후속작 기회는 좁아졌습니다.",
          "共同体は成長。続編機会は縮小。",
        ),
        { trust: 16, momentum: -7, cash: 5 },
        "focus",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "leak",
    GAME,
    text(
      "The ending leaked before launch",
      "출시 전에 결말이 유출됐습니다",
      "発売前に結末が流出",
    ),
    text(
      "Spoilers trend while the marketing plan still depends on mystery.",
      "스포일러가 퍼지고 마케팅은 여전히 미스터리에 의존합니다.",
      "ネタバレ拡散。宣伝は依然として謎頼み。",
    ),
    [
      choice(
        "rewrite",
        text("Rewrite the ending", "결말을 다시 쓴다", "結末を書き直す"),
        text(
          "Surprise returns. The schedule stops making sense.",
          "놀라움은 돌아오고 일정은 의미를 잃었습니다.",
          "驚き復活。日程は崩壊。",
        ),
        { cash: -14, morale: -16, momentum: 10 },
        "teamRisk",
      ),
      choice(
        "own",
        text("Acknowledge the leak", "유출을 인정한다", "流出を認める"),
        text(
          "The campaign pivots to the journey. Mystery fans leave.",
          "캠페인은 여정으로 바뀌고 미스터리 팬은 떠났습니다.",
          "宣伝は旅路へ転換。謎好きは離脱。",
        ),
        { trust: 10, momentum: -8 },
        "focus",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "mods",
    GAME,
    text(
      "A fan mod is better than the roadmap",
      "팬 모드가 공식 로드맵보다 낫습니다",
      "ファンMODが公式計画を上回る",
    ),
    text(
      "Players want it integrated; legal says its code ownership is unclear.",
      "플레이어는 공식 적용을 원하고 법무는 코드 소유권이 불명확하다고 합니다.",
      "利用者は公式化を希望。法務は権利不明と判断。",
    ),
    [
      choice(
        "hire",
        text("Hire the mod team", "모드 팀을 채용한다", "MODチームを採用"),
        text(
          "The feature ships. Internal designers question the process.",
          "기능은 출시됐고 내부 디자이너는 과정을 의심합니다.",
          "機能公開。社内設計者は過程に疑問。",
        ),
        { cash: -9, momentum: 17, morale: -6 },
        "spendGrowth",
      ),
      choice(
        "block",
        text("Block the mod", "모드를 차단한다", "MODを遮断"),
        text(
          "Legal risk drops. Community trust drops farther.",
          "법적 위험은 줄고 커뮤니티 신뢰는 더 줄었습니다.",
          "法的危険低下。共同体の信頼はさらに低下。",
        ),
        { trust: -19, cash: 5 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "game-studio",
    "featuring",
    GAME,
    text(
      "The platform offers front-page featuring",
      "플랫폼이 메인 노출을 제안합니다",
      "プラットフォームが大型露出を提案",
    ),
    text(
      "The slot requires launching two weeks before the build is ready.",
      "노출 조건은 빌드 준비보다 2주 빠른 출시입니다.",
      "条件は完成より2週間早い発売。",
    ),
    [
      choice(
        "take",
        text("Take the slot", "노출을 잡는다", "枠を取る"),
        text(
          "Millions see the game. They also see its rough edges.",
          "수백만 명이 게임과 거친 모서리를 함께 봤습니다.",
          "数百万人が作品と未完成部分を同時に目撃。",
        ),
        { momentum: 24, trust: -14, cash: 10 },
        "bet",
      ),
      choice(
        "decline",
        text("Finish the build", "빌드를 완성한다", "完成を優先"),
        text(
          "Quality holds. Discovery becomes your problem.",
          "품질은 지켰고 발견 가능성은 우리 문제가 됐습니다.",
          "品質維持。発見性は自力課題に。",
        ),
        { trust: 12, momentum: -15, morale: 5 },
        "focus",
      ),
    ],
  ),
];

const fintechScenarios: readonly CompanyScenario[] = [
  weeklyScenario(
    "fintech",
    "audit",
    FINTECH,
    text(
      "Regulators arrive Monday",
      "월요일에 감독기관이 옵니다",
      "月曜に規制当局が来訪",
    ),
    text(
      "Three controls exist only in a spreadsheet marked final-final.",
      "통제 세 개가 final-final 엑셀에만 존재합니다.",
      "3つの統制がfinal-final表にしか存在しません。",
    ),
    [
      choice(
        "freeze",
        text("Freeze product work", "제품 개발을 멈춘다", "製品開発を停止"),
        text(
          "The audit passes. The quarter roadmap does not.",
          "감사는 통과했고 분기 로드맵은 통과하지 못했습니다.",
          "監査合格。四半期計画は未達。",
        ),
        { trust: 20, momentum: -18, morale: -6 },
        "trustCost",
      ),
      choice(
        "sample",
        text("Show partial controls", "부분 통제만 보여준다", "部分統制を提示"),
        text(
          "The meeting ends early with a follow-up notice.",
          "회의는 추가 조치 통지와 함께 일찍 끝났습니다.",
          "会議は追加措置通知で早期終了。",
        ),
        { momentum: 7, trust: -22, cash: -5 },
        "trustRisk",
      ),
    ],
  ),
  weeklyScenario(
    "fintech",
    "fraud",
    FINTECH,
    text(
      "Fraud losses tripled",
      "사기 손실이 세 배가 됐습니다",
      "不正損失が3倍",
    ),
    text(
      "Blocking risky transfers will also stop legitimate families sending rent.",
      "위험 송금을 막으면 정상적인 월세 송금도 멈춥니다.",
      "危険送金を止めると正当な家賃送金も停止。",
    ),
    [
      choice(
        "block",
        text("Tighten every rule", "모든 규칙을 강화한다", "全規則を強化"),
        text(
          "Fraud falls. Support fills with frozen customers.",
          "사기는 줄고 고객지원은 동결 고객으로 찼습니다.",
          "不正減少。サポートは凍結顧客で満杯。",
        ),
        { cash: 15, trust: -14, morale: -7 },
        "trustRisk",
      ),
      choice(
        "model",
        text(
          "Build a better model",
          "탐지 모델을 개선한다",
          "検知モデルを改善",
        ),
        text(
          "False positives fall later. Losses continue today.",
          "오탐은 나중에 줄고 오늘 손실은 계속됐습니다.",
          "誤検知は後日減少。今日の損失は継続。",
        ),
        { cash: -16, trust: 13, momentum: 9 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "fintech",
    "bank",
    FINTECH,
    text(
      "The bank partner threatens to leave",
      "제휴 은행이 떠나겠다고 합니다",
      "提携銀行が撤退を示唆",
    ),
    text(
      "They demand exclusivity before your fastest growth quarter.",
      "가장 빠른 성장 분기 직전에 독점 계약을 요구합니다.",
      "最速成長期の直前に独占を要求。",
    ),
    [
      choice(
        "exclusive",
        text("Accept exclusivity", "독점을 수용한다", "独占を受諾"),
        text(
          "The rails stay open. Future partnerships close.",
          "결제망은 열리고 미래 파트너십은 닫혔습니다.",
          "決済網維持。将来提携は閉鎖。",
        ),
        { trust: 10, cash: 12, momentum: -14 },
        "focus",
      ),
      choice(
        "multi",
        text("Add two banks", "은행 두 곳을 추가한다", "銀行2社を追加"),
        text(
          "Resilience improves. Integration work consumes the quarter.",
          "복원력은 좋아지고 연동 작업이 분기를 먹었습니다.",
          "耐障害性向上。連携作業が四半期を消費。",
        ),
        { cash: -18, momentum: 12, morale: -9 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "fintech",
    "kyc",
    FINTECH,
    text(
      "KYC loses half of new users",
      "본인인증에서 절반이 이탈합니다",
      "本人確認で半数離脱",
    ),
    text(
      "Compliance wants another document; growth wants one fewer screen.",
      "준법은 서류 하나를 더, 성장은 화면 하나를 덜 원합니다.",
      "法令部門は書類追加、成長部門は画面削減を要求。",
    ),
    [
      choice(
        "strict",
        text("Add the document", "서류를 추가한다", "書類を追加"),
        text(
          "Risk falls. Acquisition economics collapse.",
          "위험은 줄고 고객 획득 경제성은 무너졌습니다.",
          "危険低下。顧客獲得効率は崩壊。",
        ),
        { trust: 16, momentum: -17 },
        "trustCost",
      ),
      choice(
        "vendor",
        text(
          "Use instant verification",
          "즉시 인증 업체를 쓴다",
          "即時認証を利用",
        ),
        text(
          "Conversion recovers. Each check has a price.",
          "전환은 회복되고 모든 인증에 가격표가 붙었습니다.",
          "転換率回復。全確認に費用発生。",
        ),
        { cash: -13, momentum: 16, trust: 5 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "fintech",
    "rates",
    FINTECH,
    text(
      "Interest rates changed the model",
      "금리가 사업 모델을 바꿨습니다",
      "金利が事業モデルを変更",
    ),
    text(
      "The free account now loses money on every active customer.",
      "무료 계좌가 활성 고객마다 손실을 냅니다.",
      "無料口座が稼働顧客ごとに赤字。",
    ),
    [
      choice(
        "fee",
        text(
          "Introduce a monthly fee",
          "월 이용료를 받는다",
          "月額手数料を導入",
        ),
        text(
          "Unit economics recover. Social media remembers 'free forever.'",
          "수익성은 회복되고 SNS는 평생 무료를 기억했습니다.",
          "採算回復。SNSは永久無料を記憶。",
        ),
        { cash: 20, trust: -18 },
        "trustRisk",
      ),
      choice(
        "minimum",
        text("Require a minimum balance", "최소 잔액을 둔다", "最低残高を設定"),
        text(
          "Large accounts stay. Small customers feel excluded.",
          "큰 계좌는 남고 작은 고객은 배제됐다고 느낍니다.",
          "大口は残留。小口顧客は排除感。",
        ),
        { cash: 12, trust: -11, momentum: -4 },
        "saveSlow",
      ),
    ],
  ),
  scenario(
    "fintech",
    "payday",
    FINTECH,
    text(
      "Transfers failed on payday",
      "급여일에 송금이 실패했습니다",
      "給料日に送金失敗",
    ),
    text(
      "Balances are correct, but thousands cannot access rent money.",
      "잔액은 맞지만 수천 명이 월세 돈에 접근하지 못합니다.",
      "残高は正確。しかし数千人が家賃資金にアクセス不能。",
    ),
    [
      choice(
        "advance",
        text(
          "Advance customer funds",
          "고객 자금을 선지급한다",
          "顧客資金を立替",
        ),
        text(
          "Rent gets paid. Treasury spends the night reconciling.",
          "월세는 지급됐고 재무는 밤새 대사했습니다.",
          "家賃支払完了。財務は徹夜で照合。",
        ),
        { cash: -19, trust: 24, morale: -7 },
        "trustCost",
      ),
      choice(
        "wait",
        text("Wait for settlement", "정산을 기다린다", "決済を待つ"),
        text(
          "Books stay clean. Customer stories lead the news.",
          "장부는 깨끗했고 고객 사연이 뉴스를 장식했습니다.",
          "帳簿は清潔。顧客の苦境が報道。",
        ),
        { cash: 7, trust: -24 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "fintech",
    "whale",
    FINTECH,
    text(
      "A giant account looks suspicious",
      "대형 계좌가 수상합니다",
      "大口口座が不審",
    ),
    text(
      "It provides 14% of volume and matches a new laundering pattern.",
      "거래량 14%를 차지하며 새 자금세탁 패턴과 일치합니다.",
      "取引量14%を占め、新たな資金洗浄パターンと一致。",
    ),
    [
      choice(
        "freeze",
        text("Freeze immediately", "즉시 동결한다", "即時凍結"),
        text(
          "Risk closes. Revenue and lawyers arrive together.",
          "위험은 닫히고 매출 손실과 변호사가 함께 왔습니다.",
          "危険封鎖。売上損失と弁護士が同時到着。",
        ),
        { cash: -17, trust: 18 },
        "trustCost",
      ),
      choice(
        "monitor",
        text("Monitor quietly", "조용히 감시한다", "内密に監視"),
        text(
          "Volume continues. Compliance stops sleeping.",
          "거래량은 유지되고 준법팀은 잠을 잃었습니다.",
          "取引継続。法令部門は睡眠を喪失。",
        ),
        { cash: 14, morale: -13, trust: -9 },
        "teamRisk",
      ),
    ],
  ),
  scenario(
    "fintech",
    "crypto",
    FINTECH,
    text(
      "Customers demand crypto transfers",
      "고객들이 코인 송금을 원합니다",
      "顧客が暗号資産送金を要求",
    ),
    text(
      "Growth sees a new market; risk sees irreversible mistakes.",
      "성장팀은 새 시장을, 리스크팀은 되돌릴 수 없는 실수를 봅니다.",
      "成長部門は新市場、リスク部門は不可逆の失敗を見ます。",
    ),
    [
      choice(
        "launch",
        text("Launch a limited beta", "제한 베타를 연다", "限定試験を開始"),
        text(
          "Sign-ups surge. Support learns what a chain fork is.",
          "가입은 폭증했고 고객지원은 체인 포크를 배웠습니다.",
          "登録急増。サポートはチェーン分岐を学習。",
        ),
        { momentum: 20, trust: -8, morale: -9, cash: -7 },
        "bet",
      ),
      choice(
        "decline",
        text("Stay with fiat", "법정화폐에 집중한다", "法定通貨に集中"),
        text(
          "Risk stays legible. Early adopters leave.",
          "위험은 읽을 수 있게 남고 얼리어답터는 떠났습니다.",
          "危険は可視。先行利用者は離脱。",
        ),
        { trust: 9, momentum: -12 },
        "focus",
      ),
    ],
  ),
  scenario(
    "fintech",
    "cco",
    FINTECH,
    text(
      "The chief compliance role is empty",
      "준법 책임자가 공석입니다",
      "法令責任者が空席",
    ),
    text(
      "A veteran asks for executive power and a very large package.",
      "베테랑 후보가 경영 권한과 큰 보상을 요구합니다.",
      "熟練候補が経営権限と高額報酬を要求。",
    ),
    [
      choice(
        "hire",
        text("Hire the veteran", "베테랑을 채용한다", "熟練者を採用"),
        text(
          "Regulators relax. Product meetings gain a permanent chair.",
          "감독기관은 안심했고 제품 회의에 고정 좌석이 생겼습니다.",
          "規制当局は安心。製品会議に常設席。",
        ),
        { cash: -16, trust: 18, momentum: -6 },
        "trustCost",
      ),
      choice(
        "promote",
        text("Promote internally", "내부 승진한다", "内部昇進"),
        text(
          "Culture cheers. The first examination becomes training.",
          "조직은 환호했고 첫 검사는 실전 교육이 됐습니다.",
          "組織は歓迎。最初の検査が実地研修に。",
        ),
        { morale: 14, trust: -9, cash: 5 },
        "bet",
      ),
    ],
  ),
  scenario(
    "fintech",
    "chargeback",
    FINTECH,
    text(
      "Chargebacks hit a record",
      "지급 취소가 최고치를 찍었습니다",
      "支払取消が過去最高",
    ),
    text(
      "Merchants want instant payouts while card networks hold reserves.",
      "가맹점은 즉시 정산을 원하고 카드사는 준비금을 잡습니다.",
      "加盟店は即時入金を要求。カード会社は準備金を保持。",
    ),
    [
      choice(
        "reserve",
        text(
          "Raise merchant reserves",
          "가맹점 준비금을 올린다",
          "加盟店準備金を増額",
        ),
        text(
          "Losses stabilize. Good merchants shop for alternatives.",
          "손실은 안정되고 우량 가맹점은 대안을 찾았습니다.",
          "損失安定。優良加盟店は代替を探索。",
        ),
        { cash: 16, trust: -15 },
        "trustRisk",
      ),
      choice(
        "absorb",
        text("Absorb the spike", "손실을 감수한다", "損失を吸収"),
        text(
          "Merchants stay loyal. Runway takes the hit.",
          "가맹점은 충성했고 생존 자금이 충격을 받았습니다.",
          "加盟店は忠実。資金が打撃。",
        ),
        { cash: -19, trust: 17 },
        "trustCost",
      ),
    ],
  ),
  scenario(
    "fintech",
    "residency",
    FINTECH,
    text(
      "A country orders local data storage",
      "한 국가가 데이터 현지 보관을 명령했습니다",
      "ある国が国内保存を命令",
    ),
    text(
      "Compliance requires a separate stack before the next reporting cycle.",
      "다음 보고 전 별도 인프라가 필요합니다.",
      "次回報告前に別基盤が必要。",
    ),
    [
      choice(
        "build",
        text("Build locally", "현지 인프라를 만든다", "国内基盤を構築"),
        text(
          "The license stays. Operations split in two.",
          "면허는 남고 운영은 둘로 갈라졌습니다.",
          "免許維持。運用は二分。",
        ),
        { cash: -20, trust: 16, morale: -8 },
        "trustCost",
      ),
      choice(
        "exit",
        text("Exit the country", "해당 국가에서 철수한다", "市場撤退"),
        text(
          "Complexity falls. Customers lose access overnight.",
          "복잡도는 줄고 고객은 하룻밤에 접근을 잃었습니다.",
          "複雑性低下。顧客は一夜で利用不能。",
        ),
        { cash: 8, momentum: -16, trust: -8 },
        "focus",
      ),
    ],
  ),
  scenario(
    "fintech",
    "insurance",
    FINTECH,
    text(
      "Deposit insurance costs doubled",
      "예금 보험 비용이 두 배가 됐습니다",
      "預金保険費が倍増",
    ),
    text(
      "Passing it through breaks the promise of fee-free banking.",
      "고객에게 넘기면 수수료 없는 금융 약속이 깨집니다.",
      "顧客転嫁で手数料無料の約束が崩れます。",
    ),
    [
      choice(
        "absorb",
        text("Absorb the cost", "비용을 감수한다", "費用を吸収"),
        text(
          "The promise survives. The runway shortens quietly.",
          "약속은 살고 생존 기간은 조용히 줄었습니다.",
          "約束維持。資金期間は静かに短縮。",
        ),
        { cash: -17, trust: 15 },
        "trustCost",
      ),
      choice(
        "premium",
        text(
          "Launch a premium account",
          "프리미엄 계좌를 연다",
          "有料口座を開始",
        ),
        text(
          "Power users upgrade. Product complexity grows.",
          "핵심 고객은 업그레이드했고 제품은 복잡해졌습니다.",
          "中核顧客は移行。製品は複雑化。",
        ),
        { cash: 14, momentum: 7, morale: -6 },
        "bet",
      ),
    ],
  ),
];

const aiScenarios: readonly CompanyScenario[] = [
  weeklyScenario(
    "ai-lab",
    "gpu",
    AI,
    text(
      "The GPU order was canceled",
      "GPU 주문이 취소됐습니다",
      "GPU注文が取消",
    ),
    text(
      "Training starts next week and the next allocation is four months away.",
      "학습은 다음 주인데 다음 할당은 4개월 뒤입니다.",
      "学習は来週、次の割当は4か月後。",
    ),
    [
      choice(
        "spot",
        text("Buy spot compute", "스팟 컴퓨팅을 산다", "スポット計算を購入"),
        text(
          "Training begins. The cloud bill becomes the largest employee.",
          "학습은 시작됐고 클라우드 비용이 최대 직원이 됐습니다.",
          "学習開始。クラウド費が最大人件費に。",
        ),
        { cash: -22, momentum: 21 },
        "spendGrowth",
      ),
      choice(
        "small",
        text(
          "Train a smaller model",
          "작은 모델을 학습한다",
          "小型モデルを学習",
        ),
        text(
          "The schedule holds. Benchmark ambition shrinks.",
          "일정은 지켰고 벤치마크 야망은 줄었습니다.",
          "日程維持。性能目標は縮小。",
        ),
        { cash: 7, momentum: -11, morale: 5 },
        "saveSlow",
      ),
    ],
  ),
  weeklyScenario(
    "ai-lab",
    "leak",
    AI,
    text(
      "Model weights appeared online",
      "모델 가중치가 온라인에 유출됐습니다",
      "モデル重みが流出",
    ),
    text(
      "The unreleased checkpoint includes capabilities still under safety review.",
      "미출시 체크포인트에 안전 검토 중인 기능이 있습니다.",
      "未公開版に安全審査中の能力を含みます。",
    ),
    [
      choice(
        "disclose",
        text("Disclose and rotate", "공개하고 전면 교체한다", "公表して刷新"),
        text(
          "Partners pause. Researchers trust leadership more.",
          "파트너는 멈췄고 연구자는 경영진을 더 믿습니다.",
          "提携は一時停止。研究者の信頼は上昇。",
        ),
        { trust: 18, cash: -15, momentum: -12 },
        "trustCost",
      ),
      choice(
        "contain",
        text("Contain quietly", "조용히 봉쇄한다", "内密に封じる"),
        text(
          "The launch stays scheduled. Mirrors multiply overnight.",
          "출시는 유지됐고 미러는 하룻밤에 늘었습니다.",
          "発売予定維持。複製は一夜で増加。",
        ),
        { momentum: 10, trust: -20 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "benchmark",
    AI,
    text(
      "The benchmark score cannot be reproduced",
      "벤치마크 점수가 재현되지 않습니다",
      "性能値が再現不能",
    ),
    text(
      "The result anchors the fundraising deck already sent to investors.",
      "그 결과가 이미 보낸 투자 자료의 핵심입니다.",
      "結果は既送付の投資資料の中心。",
    ),
    [
      choice(
        "correct",
        text("Correct the deck", "자료를 정정한다", "資料を訂正"),
        text(
          "The number falls. Scientific credibility rises.",
          "숫자는 내려가고 과학적 신뢰는 올랐습니다.",
          "数値低下。科学的信頼上昇。",
        ),
        { trust: 21, momentum: -14 },
        "trustCost",
      ),
      choice(
        "rerun",
        text("Rerun until launch", "출시까지 재실험한다", "発売まで再実験"),
        text(
          "The claim survives for now. The lab stops sleeping.",
          "주장은 일단 살고 연구소는 잠을 멈췄습니다.",
          "主張は一時維持。研究所は不眠。",
        ),
        { morale: -18, momentum: 8, trust: -8 },
        "teamRisk",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "copyright",
    AI,
    text(
      "Artists filed a class action",
      "작가들이 집단 소송을 냈습니다",
      "作家が集団訴訟",
    ),
    text(
      "Training data includes work scraped before the policy existed.",
      "정책이 생기기 전에 수집한 작품이 학습 데이터에 있습니다.",
      "方針制定前に収集した作品が学習データに存在。",
    ),
    [
      choice(
        "license",
        text("License new data", "새 데이터에 비용을 낸다", "新規データを許諾"),
        text(
          "Creators join the program. Data costs become permanent.",
          "창작자가 참여하고 데이터 비용은 영구 항목이 됐습니다.",
          "創作者が参加。データ費は恒久化。",
        ),
        { cash: -19, trust: 22 },
        "trustCost",
      ),
      choice(
        "fight",
        text("Fight the case", "소송으로 맞선다", "訴訟で争う"),
        text(
          "The dataset stays. Public sentiment hardens.",
          "데이터셋은 남고 여론은 굳어졌습니다.",
          "データ維持。世論は硬化。",
        ),
        { cash: -10, trust: -18, momentum: 8 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "safety",
    AI,
    text(
      "Safety tests found a dangerous shortcut",
      "안전 평가가 위험한 우회로를 찾았습니다",
      "安全評価が危険な抜け道を発見",
    ),
    text(
      "Fixing it delays the model beyond a competitor's launch.",
      "수정하면 경쟁사 출시보다 늦어집니다.",
      "修正すると競合発売より遅れます。",
    ),
    [
      choice(
        "fix",
        text("Delay and fix", "연기하고 고친다", "延期して修正"),
        text(
          "The model arrives safer. The market narrative moves on.",
          "모델은 안전하게 왔고 시장의 관심은 지나갔습니다.",
          "安全に発売。市場の話題は移動。",
        ),
        { trust: 24, momentum: -20, cash: -8 },
        "trustCost",
      ),
      choice(
        "guardrail",
        text(
          "Add a surface guardrail",
          "표면 안전장치를 붙인다",
          "表面対策を追加",
        ),
        text(
          "The date holds. Red-team screenshots leak later.",
          "일정은 지켰고 레드팀 화면이 나중에 유출됐습니다.",
          "日程維持。後に試験画像が流出。",
        ),
        { momentum: 17, trust: -23 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "open",
    AI,
    text(
      "Researchers want to open-source the model",
      "연구자들이 모델 공개를 원합니다",
      "研究者がモデル公開を要求",
    ),
    text(
      "Community adoption could explode while the API moat disappears.",
      "커뮤니티 채택은 폭발하지만 API 해자는 사라질 수 있습니다.",
      "採用は爆発的に増加。API優位性は消失可能。",
    ),
    [
      choice(
        "open",
        text("Release the weights", "가중치를 공개한다", "重みを公開"),
        text(
          "Developers flood in. Revenue strategy returns to zero.",
          "개발자는 몰리고 수익 전략은 0으로 돌아갔습니다.",
          "開発者殺到。収益戦略はゼロへ。",
        ),
        { momentum: 25, trust: 12, cash: -15 },
        "bet",
      ),
      choice(
        "api",
        text("Keep the API closed", "API를 닫아둔다", "APIを閉鎖維持"),
        text(
          "Margins stay possible. Researchers lose a recruiting argument.",
          "마진 가능성은 남고 연구자는 채용 명분을 잃었습니다.",
          "利益可能性維持。研究者は採用材料を失う。",
        ),
        { cash: 12, morale: -13, momentum: -7 },
        "focus",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "hallucination",
    AI,
    text(
      "The enterprise demo invented a contract",
      "기업 데모가 계약서를 지어냈습니다",
      "企業デモが契約を捏造",
    ),
    text(
      "The client recorded the model confidently citing a nonexistent clause.",
      "고객이 존재하지 않는 조항을 자신 있게 인용한 장면을 녹화했습니다.",
      "存在しない条項を自信満々に引用する映像が記録済み。",
    ),
    [
      choice(
        "pause",
        text(
          "Pause enterprise sales",
          "기업 판매를 중단한다",
          "企業販売を停止",
        ),
        text(
          "Reliability work begins. The pipeline goes silent.",
          "신뢰성 작업은 시작되고 영업 파이프라인은 조용해졌습니다.",
          "信頼性改善開始。商談は停止。",
        ),
        { trust: 18, cash: -17, momentum: -10 },
        "trustCost",
      ),
      choice(
        "scope",
        text("Narrow the promise", "약속 범위를 줄인다", "約束範囲を縮小"),
        text(
          "The client stays. The magical demo becomes a search box.",
          "고객은 남고 마법 같은 데모는 검색창이 됐습니다.",
          "顧客は残留。魔法のデモは検索箱に。",
        ),
        { trust: 9, momentum: -8, cash: 5 },
        "focus",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "synthetic",
    AI,
    text(
      "Real training data is running out",
      "실제 학습 데이터가 바닥납니다",
      "実データが枯渇",
    ),
    text(
      "Synthetic data is cheap and may amplify the model's own mistakes.",
      "합성 데이터는 싸지만 모델의 실수를 증폭할 수 있습니다.",
      "合成データは安価ですが、自身の誤りを増幅可能。",
    ),
    [
      choice(
        "synthetic",
        text(
          "Scale synthetic data",
          "합성 데이터를 늘린다",
          "合成データを拡大",
        ),
        text(
          "Training accelerates. Evaluation becomes stranger.",
          "학습은 빨라지고 평가는 이상해졌습니다.",
          "学習加速。評価は奇妙に。",
        ),
        { cash: 12, momentum: 18, trust: -10 },
        "bet",
      ),
      choice(
        "curate",
        text(
          "Curate licensed data",
          "허가 데이터를 선별한다",
          "許諾データを選別",
        ),
        text(
          "Quality improves slowly. Every token gains a receipt.",
          "품질은 천천히 좋아지고 모든 토큰에 영수증이 생겼습니다.",
          "品質は徐々に向上。全トークンに領収書。",
        ),
        { cash: -17, trust: 17, momentum: -7 },
        "trustCost",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "poach",
    AI,
    text(
      "A rival offered the research team double",
      "경쟁사가 연구팀에 두 배를 제안했습니다",
      "競合が研究チームに倍額提示",
    ),
    text(
      "Five people hold most of the model's unwritten knowledge.",
      "다섯 명이 모델의 문서화되지 않은 지식 대부분을 갖고 있습니다.",
      "5人がモデルの暗黙知の大半を保有。",
    ),
    [
      choice(
        "match",
        text("Match every offer", "모든 제안을 맞춘다", "全提示に対抗"),
        text(
          "The team stays. Compensation bands stop meaning anything.",
          "팀은 남고 보상 체계는 의미를 잃었습니다.",
          "チーム残留。報酬体系は崩壊。",
        ),
        { cash: -21, morale: 18 },
        "teamCost",
      ),
      choice(
        "document",
        text("Fund a transition", "인수인계를 준비한다", "引継ぎを準備"),
        text(
          "Some leave. The knowledge finally becomes a system.",
          "일부는 떠났고 지식은 마침내 시스템이 됐습니다.",
          "一部離脱。知識は初めて仕組み化。",
        ),
        { morale: -12, momentum: -8, trust: 9, cash: 6 },
        "focus",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "energy",
    AI,
    text(
      "The energy bill became political",
      "전력 사용량이 정치 문제가 됐습니다",
      "電力使用が政治問題化",
    ),
    text(
      "A local campaign links the data center to rising household prices.",
      "지역 캠페인이 데이터센터와 가정 전기료 상승을 연결합니다.",
      "地域運動がデータセンターと家庭料金上昇を関連付け。",
    ),
    [
      choice(
        "green",
        text("Buy clean power", "청정 전력을 산다", "再生電力を購入"),
        text(
          "The headline changes. Compute gets more expensive.",
          "기사 제목은 바뀌고 컴퓨팅은 비싸졌습니다.",
          "報道は変化。計算費は上昇。",
        ),
        { cash: -16, trust: 20 },
        "trustCost",
      ),
      choice(
        "explain",
        text(
          "Publish efficiency data",
          "효율 데이터를 공개한다",
          "効率データを公開",
        ),
        text(
          "Experts approve. The campaign keeps its simpler story.",
          "전문가는 인정했고 캠페인은 단순한 이야기를 유지했습니다.",
          "専門家は評価。運動は単純な物語を継続。",
        ),
        { trust: 6, momentum: -5, cash: 5 },
        "focus",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "government",
    AI,
    text(
      "A government offers a classified contract",
      "정부가 기밀 계약을 제안합니다",
      "政府が機密契約を提示",
    ),
    text(
      "The money funds years of research; employees cannot discuss the use.",
      "자금은 수년 연구를 지원하지만 직원은 용도를 알릴 수 없습니다.",
      "資金は数年分。従業員は用途を語れません。",
    ),
    [
      choice(
        "sign",
        text("Take the contract", "계약한다", "契約する"),
        text(
          "Runway expands. An internal petition appears.",
          "생존 기간은 늘고 내부 탄원서가 등장했습니다.",
          "資金期間延長。社内請願が発生。",
        ),
        { cash: 28, morale: -18, trust: -8 },
        "bet",
      ),
      choice(
        "decline",
        text("Decline the work", "거절한다", "辞退する"),
        text(
          "The mission stays clear. The budget stays thin.",
          "사명은 선명하고 예산은 얇게 남았습니다.",
          "使命は明確。予算は薄いまま。",
        ),
        { trust: 14, morale: 10, cash: -12 },
        "focus",
      ),
    ],
  ),
  scenario(
    "ai-lab",
    "deprecate",
    AI,
    text(
      "The old model costs more than it earns",
      "구형 모델이 버는 돈보다 비용이 큽니다",
      "旧モデルが赤字",
    ),
    text(
      "Long-term customers built critical workflows around its exact behavior.",
      "장기 고객은 그 모델의 정확한 동작에 핵심 업무를 맞췄습니다.",
      "長期顧客はその挙動に重要業務を依存。",
    ),
    [
      choice(
        "sunset",
        text("Set a hard shutdown", "종료일을 정한다", "終了日を設定"),
        text(
          "Costs fall. Migration tickets flood in.",
          "비용은 줄고 이전 문의가 밀려왔습니다.",
          "費用低下。移行依頼が殺到。",
        ),
        { cash: 17, trust: -15, morale: -6 },
        "saveSlow",
      ),
      choice(
        "maintain",
        text("Maintain it another year", "1년 더 유지한다", "1年延長"),
        text(
          "Customers relax. Infrastructure keeps two histories alive.",
          "고객은 안심했고 인프라는 두 역사를 유지합니다.",
          "顧客は安心。基盤は二世代を維持。",
        ),
        { cash: -15, trust: 16, momentum: -5 },
        "trustCost",
      ),
    ],
  ),
];

const hardwareScenarios: readonly CompanyScenario[] = [
  weeklyScenario(
    "hardware",
    "shortage",
    HARDWARE,
    text(
      "One component vanished from the market",
      "핵심 부품이 시장에서 사라졌습니다",
      "主要部品が市場から消失",
    ),
    text(
      "Every shipped unit needs it and brokers offer stock at five times cost.",
      "모든 제품에 필요하고 브로커는 5배 가격을 요구합니다.",
      "全製品に必要。仲介業者は5倍価格を要求。",
    ),
    [
      choice(
        "broker",
        text("Buy the broker stock", "브로커 재고를 산다", "仲介在庫を購入"),
        text(
          "Production continues. Margin disappears.",
          "생산은 계속되고 마진은 사라졌습니다.",
          "生産継続。利益消失。",
        ),
        { cash: -22, momentum: 18 },
        "spendGrowth",
      ),
      choice(
        "redesign",
        text("Redesign the board", "보드를 다시 설계한다", "基板を再設計"),
        text(
          "Supply risk falls later. Certification starts again.",
          "공급 위험은 나중에 줄고 인증은 처음부터 시작됐습니다.",
          "供給危険は後に低下。認証は再開始。",
        ),
        { cash: -12, momentum: -16, trust: 6 },
        "focus",
      ),
    ],
  ),
  weeklyScenario(
    "hardware",
    "recall",
    HARDWARE,
    text(
      "A battery recall is possible",
      "배터리 리콜 가능성이 생겼습니다",
      "バッテリー回収の可能性",
    ),
    text(
      "Three units overheated; twelve thousand share the same cell batch.",
      "세 대가 과열됐고 1만2천 대가 같은 배터리 묶음입니다.",
      "3台が過熱。1万2千台が同一ロット。",
    ),
    [
      choice(
        "recall",
        text("Recall every unit", "전량 리콜한다", "全数回収"),
        text(
          "Customers stay safe. Cash leaves in trucks.",
          "고객은 안전했고 현금은 트럭에 실려 떠났습니다.",
          "顧客安全。資金は回収車で流出。",
        ),
        { cash: -27, trust: 26 },
        "trustCost",
      ),
      choice(
        "monitor",
        text("Monitor the batch", "해당 묶음을 관찰한다", "該当ロットを監視"),
        text(
          "Sales continue. Every support alert feels louder.",
          "판매는 계속되고 모든 고객 문의가 더 크게 들렸습니다.",
          "販売継続。全警告が重く響く。",
        ),
        { cash: 13, trust: -24, morale: -7 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "hardware",
    "yield",
    HARDWARE,
    text(
      "Factory yield fell below 70%",
      "공장 수율이 70% 아래로 떨어졌습니다",
      "工場歩留まりが70%未満",
    ),
    text(
      "The new enclosure looks perfect but fails assembly tolerance.",
      "새 외형은 완벽하지만 조립 공차를 통과하지 못합니다.",
      "新筐体は美しいが組立公差に不合格。",
    ),
    [
      choice(
        "retool",
        text("Retool the line", "생산 라인을 고친다", "生産線を改修"),
        text(
          "Yield recovers. Ship dates move.",
          "수율은 회복되고 배송일은 움직였습니다.",
          "歩留まり回復。出荷日は延期。",
        ),
        { cash: -18, momentum: -13, trust: 8 },
        "trustCost",
      ),
      choice(
        "tolerance",
        text(
          "Relax cosmetic standards",
          "외관 기준을 낮춘다",
          "外観基準を緩和",
        ),
        text(
          "Units ship. Review photos zoom into every gap.",
          "제품은 출하됐고 리뷰 사진은 모든 틈을 확대했습니다.",
          "出荷成功。レビュー写真は隙間を拡大。",
        ),
        { cash: 14, trust: -15, momentum: 8 },
        "trustRisk",
      ),
    ],
  ),
  scenario(
    "hardware",
    "preorder",
    HARDWARE,
    text(
      "Preorders are six months late",
      "예약 배송이 6개월 늦었습니다",
      "予約出荷が6か月遅延",
    ),
    text(
      "Customers funded the first production run and want a real date.",
      "고객이 첫 생산을 지원했고 실제 날짜를 원합니다.",
      "顧客が初回生産を資金支援し、実日程を要求。",
    ),
    [
      choice(
        "refund",
        text("Offer every refund", "전액 환불을 연다", "全額返金を提供"),
        text(
          "Anger falls. Working capital leaves.",
          "분노는 줄고 운영 자금은 떠났습니다.",
          "怒り低下。運転資金流出。",
        ),
        { cash: -21, trust: 20 },
        "trustCost",
      ),
      choice(
        "gift",
        text(
          "Promise a free accessory",
          "무료 액세서리를 약속한다",
          "無料付属品を約束",
        ),
        text(
          "Most buyers wait. Future fulfillment gets heavier.",
          "대부분 기다렸고 미래 배송은 더 무거워졌습니다.",
          "大半は待機。将来の履行負担増。",
        ),
        { trust: 8, cash: -8, momentum: 4 },
        "bet",
      ),
    ],
  ),
  scenario(
    "hardware",
    "certification",
    HARDWARE,
    text(
      "Certification failed on radio noise",
      "전자파 인증에 실패했습니다",
      "電波認証に失敗",
    ),
    text(
      "A shielding fix adds weight and misses the holiday window.",
      "차폐 수정은 무게를 늘리고 연말 성수기를 놓칩니다.",
      "遮蔽修正は重量増加し、年末商戦を逃します。",
    ),
    [
      choice(
        "fix",
        text("Fix and recertify", "수정 후 재인증한다", "修正して再認証"),
        text(
          "The product becomes legal and late.",
          "제품은 합법적이고 늦게 됐습니다.",
          "製品は合法かつ遅延。",
        ),
        { cash: -14, momentum: -18, trust: 12 },
        "trustCost",
      ),
      choice(
        "market",
        text(
          "Launch in fewer markets",
          "일부 시장만 출시한다",
          "市場を限定して発売",
        ),
        text(
          "The date holds. Global partners lose their launch.",
          "날짜는 지키고 글로벌 파트너는 출시를 잃었습니다.",
          "日程維持。海外提携先は発売機会を失う。",
        ),
        { cash: 8, momentum: 7, trust: -11 },
        "focus",
      ),
    ],
  ),
  scenario(
    "hardware",
    "tariff",
    HARDWARE,
    text(
      "A new tariff starts next month",
      "다음 달 새 관세가 시작됩니다",
      "来月から新関税",
    ),
    text(
      "Imported units become 24% more expensive overnight.",
      "수입 제품 원가가 하룻밤에 24% 오릅니다.",
      "輸入原価が一夜で24%上昇。",
    ),
    [
      choice(
        "stock",
        text("Import a year of stock", "1년치 재고를 들인다", "1年分を輸入"),
        text(
          "The tariff is avoided. Cash becomes boxes.",
          "관세는 피했고 현금은 상자가 됐습니다.",
          "関税回避。資金は箱に変化。",
        ),
        { cash: -23, momentum: 10 },
        "bet",
      ),
      choice(
        "local",
        text(
          "Move final assembly",
          "최종 조립을 현지화한다",
          "最終組立を現地化",
        ),
        text(
          "Duty falls later. Operations gain another factory.",
          "관세는 나중에 줄고 운영 공장은 하나 늘었습니다.",
          "関税は後に低下。運用工場は増加。",
        ),
        { cash: -16, momentum: -8, trust: 9 },
        "spendGrowth",
      ),
    ],
  ),
  scenario(
    "hardware",
    "repair",
    HARDWARE,
    text(
      "A repairability score went viral",
      "수리 가능성 점수가 퍼졌습니다",
      "修理容易性評価が拡散",
    ),
    text(
      "The product scored two out of ten because every part is glued.",
      "모든 부품을 접착해 10점 만점에 2점입니다.",
      "全接着構造で10点中2点。",
    ),
    [
      choice(
        "modular",
        text(
          "Make the next batch modular",
          "다음 생산을 모듈형으로 바꾼다",
          "次ロットをモジュール化",
        ),
        text(
          "Trust rises. The device gets thicker and later.",
          "신뢰는 오르고 기기는 두꺼워지고 늦어졌습니다.",
          "信頼上昇。製品は厚く遅延。",
        ),
        { trust: 19, cash: -13, momentum: -10 },
        "trustCost",
      ),
      choice(
        "service",
        text(
          "Offer cheap repairs",
          "저렴한 수리를 제공한다",
          "低価格修理を提供",
        ),
        text(
          "Owners calm down. Service centers absorb the design debt.",
          "고객은 진정했고 서비스센터가 설계 부채를 떠안았습니다.",
          "顧客は安定。修理拠点が設計負債を負担。",
        ),
        { cash: -10, trust: 13, morale: -6 },
        "teamCost",
      ),
    ],
  ),
  scenario(
    "hardware",
    "manufacturer",
    HARDWARE,
    text(
      "The contract factory copied the design",
      "위탁 공장이 설계를 복제했습니다",
      "委託工場が設計を複製",
    ),
    text(
      "A near-identical product appeared under another brand.",
      "거의 같은 제품이 다른 브랜드로 나왔습니다.",
      "ほぼ同一製品が別ブランドで登場。",
    ),
    [
      choice(
        "move",
        text("Move factories", "공장을 옮긴다", "工場を移転"),
        text(
          "The leak closes. Production stops for a quarter.",
          "유출은 막히고 생산은 한 분기 멈췄습니다.",
          "漏洩停止。生産は四半期停止。",
        ),
        { cash: -18, momentum: -20, trust: 8 },
        "trustCost",
      ),
      choice(
        "compete",
        text("Outrun the copy", "속도로 앞선다", "速度で上回る"),
        text(
          "A new version ships. The copy keeps the low price.",
          "새 버전이 나왔고 복제품은 낮은 가격을 지켰습니다.",
          "新版発売。模倣品は低価格維持。",
        ),
        { cash: -12, momentum: 18, morale: -8 },
        "bet",
      ),
    ],
  ),
  scenario(
    "hardware",
    "battery",
    HARDWARE,
    text(
      "Battery life misses the promise",
      "배터리 시간이 약속에 못 미칩니다",
      "電池持続時間が公称未達",
    ),
    text(
      "Marketing says twelve hours; independent tests average eight.",
      "마케팅은 12시간, 독립 테스트는 평균 8시간입니다.",
      "公称12時間、第三者試験は平均8時間。",
    ),
    [
      choice(
        "correct",
        text("Correct every claim", "모든 표기를 고친다", "全表記を修正"),
        text(
          "Trust survives. Conversion loses four hours of magic.",
          "신뢰는 살고 전환율은 4시간의 마법을 잃었습니다.",
          "信頼維持。転換率は4時間分低下。",
        ),
        { trust: 18, momentum: -13 },
        "trustCost",
      ),
      choice(
        "optimize",
        text(
          "Ship power-saving firmware",
          "절전 펌웨어를 낸다",
          "省電力更新を配信",
        ),
        text(
          "Tests improve. Performance users complain.",
          "테스트는 좋아지고 성능 사용자는 불평했습니다.",
          "試験改善。性能重視利用者は不満。",
        ),
        { trust: 7, momentum: 9, morale: -7 },
        "bet",
      ),
    ],
  ),
  scenario(
    "hardware",
    "retail",
    HARDWARE,
    text(
      "A retailer offers national shelf space",
      "대형 유통사가 전국 진열을 제안합니다",
      "大手小売が全国展開を提案",
    ),
    text(
      "They demand returns rights and a margin twice your online channel.",
      "자사몰의 두 배 마진과 반품 권한을 요구합니다.",
      "直販の倍の利益と返品権を要求。",
    ),
    [
      choice(
        "sign",
        text("Take the shelves", "진열대를 잡는다", "棚を取る"),
        text(
          "Awareness jumps. Retail deductions become a new language.",
          "인지도는 뛰고 유통 공제는 새 언어가 됐습니다.",
          "認知度上昇。小売控除が新言語に。",
        ),
        { momentum: 22, cash: -10, morale: -6 },
        "bet",
      ),
      choice(
        "direct",
        text("Stay direct", "자사몰을 지킨다", "直販を維持"),
        text(
          "Margins stay clean. Mainstream buyers pass by.",
          "마진은 깨끗했고 대중 고객은 지나갔습니다.",
          "利益率維持。一般顧客は通過。",
        ),
        { cash: 10, momentum: -13, trust: 4 },
        "focus",
      ),
    ],
  ),
  scenario(
    "hardware",
    "firmware",
    HARDWARE,
    text(
      "The firmware update bricked devices",
      "펌웨어 업데이트가 기기를 먹통으로 만들었습니다",
      "更新で端末が故障",
    ),
    text(
      "Remote recovery works for most units, not all.",
      "원격 복구는 대부분 되지만 전부는 아닙니다.",
      "遠隔復旧は大半で可能、全数ではない。",
    ),
    [
      choice(
        "replace",
        text(
          "Replace every failed unit",
          "실패 기기를 전부 교환한다",
          "故障品を全交換",
        ),
        text(
          "Owners recover quickly. Logistics relives launch day.",
          "고객은 빨리 회복했고 물류는 출시일을 다시 살았습니다.",
          "顧客は迅速復旧。物流は発売日を再体験。",
        ),
        { cash: -18, trust: 21, morale: -8 },
        "trustCost",
      ),
      choice(
        "repair",
        text("Mail repair kits", "수리 키트를 보낸다", "修理キットを送付"),
        text(
          "Costs fall. Customers become unpaid technicians.",
          "비용은 줄고 고객은 무급 기술자가 됐습니다.",
          "費用低下。顧客は無給技術者に。",
        ),
        { cash: -7, trust: -10, momentum: 5 },
        "saveSlow",
      ),
    ],
  ),
  scenario(
    "hardware",
    "next-model",
    HARDWARE,
    text(
      "The next model is ready too early",
      "차기 모델이 너무 일찍 준비됐습니다",
      "次期モデルが早すぎる",
    ),
    text(
      "Launching now clears a competitor but strands current inventory.",
      "지금 출시하면 경쟁사를 앞서지만 현재 재고가 남습니다.",
      "今発売すれば競合に先行、現行在庫は滞留。",
    ),
    [
      choice(
        "launch",
        text("Launch now", "지금 출시한다", "今発売"),
        text(
          "Reviews celebrate progress. Old stock gets discounted.",
          "리뷰는 진화를 칭찬했고 구형 재고는 할인됐습니다.",
          "評価は進歩を称賛。旧在庫は値引き。",
        ),
        { momentum: 21, cash: -16, trust: -5 },
        "bet",
      ),
      choice(
        "wait",
        text("Clear old inventory", "기존 재고를 소진한다", "旧在庫を消化"),
        text(
          "Cash recovers. The competitor owns the headline.",
          "현금은 회복되고 기사 제목은 경쟁사가 차지했습니다.",
          "資金回復。話題は競合が獲得。",
        ),
        { cash: 16, momentum: -15 },
        "saveSlow",
      ),
    ],
  ),
];

export const INDUSTRY_SCENARIOS: readonly CompanyScenario[] = [
  ...saasScenarios,
  ...commerceScenarios,
  ...gameScenarios,
  ...fintechScenarios,
  ...aiScenarios,
  ...hardwareScenarios,
];
