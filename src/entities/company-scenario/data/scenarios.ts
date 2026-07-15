import type { CompanyScenario } from "@/shared/types/company-survival";

export const COMPANY_SCENARIOS: readonly CompanyScenario[] = [
  {
    id: "enterprise-client",
    department: { en: "SALES", ko: "영업팀", ja: "営業部" },
    title: {
      en: "One client wants everything",
      ko: "큰손 고객이 전부 바꿔달랍니다",
      ja: "大口顧客が全変更を要求",
    },
    body: {
      en: "A client worth 38% of revenue will renew only if their custom dashboard ships this month.",
      ko: "매출 38%를 차지하는 고객이 이번 달 안에 전용 대시보드를 만들면 재계약하겠다고 합니다.",
      ja: "売上の38%を占める顧客が、今月中の専用ダッシュボード提供を更新条件にしました。",
    },
    choices: [
      {
        id: "accept",
        label: { en: "Build it", ko: "요구를 받는다", ja: "要求を受ける" },
        detail: {
          en: "Protect revenue. Freeze roadmap.",
          ko: "매출 방어. 기존 로드맵 중단.",
          ja: "売上を守り、既存計画を凍結。",
        },
        result: {
          en: "The renewal lands. Product team starts a private mutiny.",
          ko: "재계약 성공. 제품팀 단체 채팅방 분위기는 얼어붙었습니다.",
          ja: "更新成功。プロダクトチームの空気は凍りました。",
        },
        effects: { cash: 18, morale: -14, momentum: -8 },
      },
      {
        id: "decline",
        label: {
          en: "Hold the line",
          ko: "제품 원칙을 지킨다",
          ja: "製品方針を守る",
        },
        detail: {
          en: "Keep focus. Risk the account.",
          ko: "집중력 유지. 고객 이탈 위험.",
          ja: "集中を維持。顧客離脱の危険。",
        },
        result: {
          en: "The client leaves. Smaller customers applaud the roadmap.",
          ko: "고객은 떠났지만 작은 고객들이 로드맵을 지지합니다.",
          ja: "顧客は去りましたが、小規模顧客はロードマップを支持。",
        },
        effects: { cash: -16, trust: 8, momentum: 10 },
      },
    ],
  },
  {
    id: "four-day-week",
    department: { en: "PEOPLE", ko: "인사팀", ja: "人事部" },
    title: {
      en: "The team wants Fridays back",
      ko: "팀이 금요일을 돌려달랍니다",
      ja: "金曜日を返してほしい",
    },
    body: {
      en: "Burnout is rising. A four-day week could stop resignations, but the launch is six weeks away.",
      ko: "번아웃 지표가 위험합니다. 주 4일제가 퇴사를 막을 수 있지만 출시까지 6주 남았습니다.",
      ja: "燃え尽きが増加中。週休3日なら退職を止められますが、発売まで6週間です。",
    },
    choices: [
      {
        id: "pilot",
        label: {
          en: "Run the pilot",
          ko: "주 4일제를 시행한다",
          ja: "試験導入する",
        },
        detail: {
          en: "Recover energy. Slow delivery.",
          ko: "에너지 회복. 출시 속도 감소.",
          ja: "活力回復。開発速度低下。",
        },
        result: {
          en: "Energy returns. Friday deploys finally stop breaking production.",
          ko: "팀이 살아났습니다. 금요일 배포 사고도 사라졌습니다.",
          ja: "チーム復活。金曜デプロイ事故も消えました。",
        },
        effects: { morale: 20, momentum: -9, trust: 5 },
      },
      {
        id: "push",
        label: {
          en: "Push to launch",
          ko: "출시까지 밀어붙인다",
          ja: "発売まで押し切る",
        },
        detail: {
          en: "Keep speed. Spend goodwill.",
          ko: "속도 유지. 팀 신뢰 소모.",
          ja: "速度維持。信頼を消耗。",
        },
        result: {
          en: "The sprint closes. Two senior engineers quietly update LinkedIn.",
          ko: "스프린트는 끝났고, 시니어 두 명이 조용히 이력서를 수정합니다.",
          ja: "スプリント完了。シニア2名が静かに職歴を更新。",
        },
        effects: { momentum: 15, morale: -18, trust: -6 },
      },
    ],
  },
  {
    id: "security-incident",
    department: { en: "SECURITY", ko: "보안팀", ja: "セキュリティ" },
    title: {
      en: "A researcher found the open door",
      ko: "보안 연구원이 열린 문을 찾았습니다",
      ja: "研究者が開いた扉を発見",
    },
    body: {
      en: "No data is known to be stolen. Disclosure now will delay fundraising and dominate the news.",
      ko: "유출 정황은 없습니다. 지금 공개하면 투자 일정이 밀리고 뉴스가 도배될 겁니다.",
      ja: "流出の形跡はなし。今公表すれば資金調達が遅れ、報道を独占します。",
    },
    choices: [
      {
        id: "disclose",
        label: {
          en: "Disclose today",
          ko: "오늘 공개한다",
          ja: "今日公表する",
        },
        detail: {
          en: "Own the mistake. Pay immediately.",
          ko: "실수 인정. 즉시 비용 발생.",
          ja: "過失を認め、即時コスト。",
        },
        result: {
          en: "The headline hurts. Customers remember the honesty.",
          ko: "기사 제목은 아팠지만 고객들은 정직함을 기억합니다.",
          ja: "見出しは痛手。しかし顧客は誠実さを記憶。",
        },
        effects: { cash: -12, trust: 22, momentum: -7 },
      },
      {
        id: "quiet-fix",
        label: {
          en: "Patch quietly",
          ko: "조용히 고친다",
          ja: "静かに修正する",
        },
        detail: {
          en: "Save the round. Bet on silence.",
          ko: "투자 일정 유지. 침묵에 베팅.",
          ja: "調達日程を維持。沈黙に賭ける。",
        },
        result: {
          en: "The round stays on track. The researcher posts the full thread.",
          ko: "투자는 순항했지만 연구원이 모든 내용을 공개했습니다.",
          ja: "調達は順調。しかし研究者が全内容を公開。",
        },
        effects: { cash: 10, trust: -25, morale: -8 },
      },
    ],
  },
  {
    id: "viral-free-plan",
    department: { en: "GROWTH", ko: "성장팀", ja: "グロース" },
    title: {
      en: "Free users are flooding in",
      ko: "무료 사용자가 몰려옵니다",
      ja: "無料ユーザーが殺到",
    },
    body: {
      en: "A viral post brings 40,000 signups overnight. Infrastructure cost is climbing by the minute.",
      ko: "바이럴 게시물 하나로 하룻밤에 4만 명이 가입했습니다. 인프라 비용이 분 단위로 오릅니다.",
      ja: "投稿が拡散し一晩で4万人登録。インフラ費用が分刻みで上昇。",
    },
    choices: [
      {
        id: "rate-limit",
        label: {
          en: "Limit the free plan",
          ko: "무료 플랜을 제한한다",
          ja: "無料枠を制限する",
        },
        detail: {
          en: "Save runway. Cool the hype.",
          ko: "현금 방어. 화제성 감소.",
          ja: "資金防衛。話題性低下。",
        },
        result: {
          en: "Servers recover. Social media calls you greedy for forty-eight hours.",
          ko: "서버는 회복됐고, 이틀 동안 욕심쟁이 회사가 됐습니다.",
          ja: "サーバー回復。48時間だけ強欲企業と呼ばれました。",
        },
        effects: { cash: 10, momentum: -10, trust: -5 },
      },
      {
        id: "ride-wave",
        label: { en: "Ride the wave", ko: "파도를 탄다", ja: "波に乗る" },
        detail: {
          en: "Buy capacity. Chase conversion.",
          ko: "서버 증설. 유료 전환 추격.",
          ja: "増強し、有料転換を狙う。",
        },
        result: {
          en: "The graph goes vertical. So does the cloud invoice.",
          ko: "성장 그래프가 수직 상승했습니다. 클라우드 청구서도 그렇습니다.",
          ja: "成長曲線が垂直に。クラウド請求も同様。",
        },
        effects: { cash: -18, momentum: 25, trust: 8 },
      },
    ],
  },
  {
    id: "investor-term-sheet",
    department: { en: "BOARD", ko: "이사회", ja: "取締役会" },
    title: {
      en: "The money comes with a chair",
      ko: "투자금에 새 의자가 딸려옵니다",
      ja: "投資金に椅子が付いてくる",
    },
    body: {
      en: "An investor offers eighteen months of runway for board control and aggressive growth targets.",
      ko: "투자자가 18개월치 자금을 제안했습니다. 조건은 이사회 통제권과 공격적인 성장 목표입니다.",
      ja: "投資家が18か月分の資金を提示。条件は取締役会支配と強気の成長目標。",
    },
    choices: [
      {
        id: "sign",
        label: {
          en: "Sign the terms",
          ko: "계약서에 서명한다",
          ja: "契約する",
        },
        detail: {
          en: "Fill the bank. Lose autonomy.",
          ko: "자금 확보. 자율성 상실.",
          ja: "資金確保。自律性喪失。",
        },
        result: {
          en: "The bank account breathes. The board calendar fills up.",
          ko: "통장 잔고가 살아났고 이사회 일정도 빽빽해졌습니다.",
          ja: "口座は回復。取締役会の日程も満杯。",
        },
        effects: { cash: 28, morale: -10, trust: -7, momentum: 8 },
      },
      {
        id: "bootstrap",
        label: {
          en: "Stay independent",
          ko: "독립을 지킨다",
          ja: "独立を守る",
        },
        detail: {
          en: "Keep control. Cut deeper.",
          ko: "통제권 유지. 더 큰 절약.",
          ja: "支配権維持。さらに節約。",
        },
        result: {
          en: "The board stays small. Every subscription now matters.",
          ko: "이사회는 작게 유지됐고, 이제 모든 구독이 절실합니다.",
          ja: "取締役会は小さいまま。全契約が生命線に。",
        },
        effects: { cash: -12, morale: 8, trust: 10, momentum: -5 },
      },
    ],
  },
  {
    id: "ai-rewrite",
    department: { en: "PRODUCT", ko: "제품팀", ja: "プロダクト" },
    title: {
      en: "The demo makes your product look old",
      ko: "경쟁사 데모가 우리 제품을 낡아 보이게 합니다",
      ja: "競合デモで製品が古く見える",
    },
    body: {
      en: "A competitor launches an AI feature investors love. Your team says a response requires a full rewrite.",
      ko: "경쟁사가 투자자들이 좋아할 AI 기능을 출시했습니다. 대응하려면 전면 재개발이 필요합니다.",
      ja: "競合が投資家好みのAI機能を公開。対抗には全面改修が必要です。",
    },
    choices: [
      {
        id: "rewrite",
        label: {
          en: "Start the rewrite",
          ko: "전면 재개발한다",
          ja: "全面改修する",
        },
        detail: {
          en: "Make the bet. Stop shipping.",
          ko: "큰 승부. 기존 출시 중단.",
          ja: "大勝負。既存開発停止。",
        },
        result: {
          en: "The prototype dazzles. Paying customers wait in the lobby.",
          ko: "프로토타입은 빛났고 유료 고객은 로비에서 기다립니다.",
          ja: "試作品は鮮烈。有料顧客は待たされます。",
        },
        effects: { cash: -14, momentum: 20, trust: -12, morale: 5 },
      },
      {
        id: "focus",
        label: {
          en: "Ignore the demo",
          ko: "우리 문제에 집중한다",
          ja: "自社課題に集中",
        },
        detail: {
          en: "Serve customers. Miss the narrative.",
          ko: "고객 집중. 시장 화제 상실.",
          ja: "顧客優先。市場の話題を失う。",
        },
        result: {
          en: "Churn falls. Investors ask why your deck has no sparkle.",
          ko: "이탈률은 줄었지만 투자자들은 발표 자료가 심심하다고 합니다.",
          ja: "解約率低下。投資家は資料が地味だと言います。",
        },
        effects: { trust: 16, momentum: -12, cash: 7 },
      },
    ],
  },
  {
    id: "pricing",
    department: { en: "FINANCE", ko: "재무팀", ja: "財務部" },
    title: {
      en: "The price has not moved in three years",
      ko: "3년째 가격이 그대로입니다",
      ja: "価格が3年間据え置き",
    },
    body: {
      en: "Costs doubled while pricing stayed friendly. Finance proposes a 40% increase at renewal.",
      ko: "비용은 두 배가 됐지만 가격은 그대로입니다. 재무팀이 갱신 가격 40% 인상을 제안합니다.",
      ja: "費用は倍増、価格は据え置き。財務部が更新時40%値上げを提案。",
    },
    choices: [
      {
        id: "raise",
        label: { en: "Raise by 40%", ko: "40% 인상한다", ja: "40%値上げ" },
        detail: {
          en: "Extend runway. Trigger complaints.",
          ko: "현금 확보. 고객 반발.",
          ja: "資金確保。顧客反発。",
        },
        result: {
          en: "Revenue rises. Your inbox becomes a pricing forum.",
          ko: "매출은 올랐고 받은편지함은 가격 토론장이 됐습니다.",
          ja: "売上増加。受信箱は価格討論会に。",
        },
        effects: { cash: 20, trust: -17, momentum: -4 },
      },
      {
        id: "tier",
        label: {
          en: "Create a premium tier",
          ko: "상위 요금제를 만든다",
          ja: "上位プランを作る",
        },
        detail: {
          en: "More work. Preserve entry price.",
          ko: "개발 부담. 진입 가격 유지.",
          ja: "開発負担。入口価格維持。",
        },
        result: {
          en: "Power users upgrade. Product scope gains another floor.",
          ko: "핵심 사용자가 업그레이드했고 제품 범위는 한 층 더 늘었습니다.",
          ja: "上級ユーザーが移行。製品範囲も一階増築。",
        },
        effects: { cash: 10, trust: 7, morale: -9, momentum: 6 },
      },
    ],
  },
  {
    id: "founder-interview",
    department: { en: "PR", ko: "홍보팀", ja: "広報" },
    title: {
      en: "A microphone is pointed at the founder",
      ko: "대표 앞에 생방송 마이크가 놓였습니다",
      ja: "創業者の前に生放送マイク",
    },
    body: {
      en: "A major podcast offers a live interview. The founder is charismatic, opinionated, and impossible to rehearse.",
      ko: "대형 팟캐스트가 생방송 인터뷰를 제안했습니다. 대표는 매력적이고, 소신이 강하며, 리허설이 안 됩니다.",
      ja: "大型番組が生出演を提案。創業者は魅力的で主張が強く、リハーサル不能。",
    },
    choices: [
      {
        id: "go-live",
        label: { en: "Go live", ko: "생방송에 나간다", ja: "生出演する" },
        detail: {
          en: "Win attention. Accept chaos.",
          ko: "관심 확보. 돌발 위험.",
          ja: "注目獲得。混乱も受容。",
        },
        result: {
          en: "Clips go viral. Legal starts a new emergency channel.",
          ko: "영상은 퍼졌고 법무팀은 새 비상 채널을 만들었습니다.",
          ja: "動画は拡散。法務は緊急チャンネルを新設。",
        },
        effects: { momentum: 22, trust: -8, morale: 5 },
      },
      {
        id: "decline",
        label: {
          en: "Send the product lead",
          ko: "제품 책임자를 보낸다",
          ja: "製品責任者を送る",
        },
        detail: {
          en: "Stay precise. Lose spectacle.",
          ko: "정확성 확보. 화제성 감소.",
          ja: "正確性確保。話題性低下。",
        },
        result: {
          en: "The interview is useful, calm, and watched by twelve buyers.",
          ko: "유익하고 차분한 방송을 구매 담당자 열두 명이 봤습니다.",
          ja: "有益で穏やかな放送を、購買担当12名が視聴。",
        },
        effects: { trust: 12, momentum: -5, cash: 4 },
      },
    ],
  },
  {
    id: "office",
    department: { en: "OPERATIONS", ko: "운영팀", ja: "運営" },
    title: {
      en: "The office lease expires Friday",
      ko: "사무실 계약이 금요일에 끝납니다",
      ja: "オフィス契約が金曜で終了",
    },
    body: {
      en: "Remote work saves money. Half the team says the office is where difficult work finally gets resolved.",
      ko: "원격 근무는 돈을 아낍니다. 팀 절반은 어려운 일이 결국 사무실에서 해결된다고 말합니다.",
      ja: "リモートなら節約可能。半数は難題が解決するのはオフィスだと主張。",
    },
    choices: [
      {
        id: "remote",
        label: {
          en: "Go fully remote",
          ko: "완전 원격으로 간다",
          ja: "完全リモートへ",
        },
        detail: {
          en: "Save rent. Change the culture.",
          ko: "임대료 절약. 문화 변화.",
          ja: "家賃節約。文化変化。",
        },
        result: {
          en: "Runway grows. Meetings multiply to fill the empty hallway.",
          ko: "생존 기간이 늘었고 빈 복도만큼 회의가 늘었습니다.",
          ja: "生存期間増加。空の廊下を埋めるように会議も増加。",
        },
        effects: { cash: 14, morale: -6, momentum: -7 },
      },
      {
        id: "renew",
        label: {
          en: "Renew smaller",
          ko: "작은 사무실로 갱신한다",
          ja: "小規模で更新",
        },
        detail: {
          en: "Keep a home base. Spend cash.",
          ko: "거점 유지. 현금 지출.",
          ja: "拠点維持。現金支出。",
        },
        result: {
          en: "The new office is crowded. Decisions happen before lunch.",
          ko: "새 사무실은 비좁지만 결정은 점심 전에 끝납니다.",
          ja: "新オフィスは狭いが、決定は昼前に完了。",
        },
        effects: { cash: -10, morale: 12, momentum: 9 },
      },
    ],
  },
  {
    id: "acquisition",
    department: { en: "M&A", ko: "전략팀", ja: "戦略室" },
    title: {
      en: "A giant wants to buy the company",
      ko: "대기업이 회사를 사고 싶답니다",
      ja: "大企業が買収を提案",
    },
    body: {
      en: "The offer rewards the founders and protects every job for one year. Your mission becomes a product line.",
      ko: "창업자에게 큰 보상이 있고 1년간 고용도 보장됩니다. 대신 회사의 사명은 제품군 하나가 됩니다.",
      ja: "創業者に大きな報酬、雇用は1年保証。使命は一製品ラインになります。",
    },
    choices: [
      {
        id: "sell",
        label: {
          en: "Take the offer",
          ko: "제안을 받는다",
          ja: "提案を受ける",
        },
        detail: {
          en: "Secure the team. End the experiment.",
          ko: "팀 보호. 독립 실험 종료.",
          ja: "チーム保護。独立実験終了。",
        },
        result: {
          en: "The wire arrives. The new parent requests a synergy roadmap.",
          ko: "돈이 입금됐고 모회사는 시너지 로드맵을 요청합니다.",
          ja: "入金完了。親会社はシナジー計画を要求。",
        },
        effects: { cash: 30, morale: -13, momentum: -12, trust: 5 },
      },
      {
        id: "refuse",
        label: {
          en: "Remain independent",
          ko: "거절하고 계속 간다",
          ja: "断って続ける",
        },
        detail: {
          en: "Keep the mission. Carry the risk.",
          ko: "사명 유지. 위험 감수.",
          ja: "使命維持。危険を負う。",
        },
        result: {
          en: "The team cheers. Finance quietly extends the red cells.",
          ko: "팀은 환호했고 재무팀은 조용히 빨간 셀을 늘렸습니다.",
          ja: "チームは歓声。財務は赤いセルを静かに増やしました。",
        },
        effects: { cash: -15, morale: 18, trust: 9, momentum: 7 },
      },
    ],
  },
  {
    id: "layoff",
    department: { en: "FINANCE", ko: "재무팀", ja: "財務部" },
    title: {
      en: "The runway chart turns red",
      ko: "생존 기간 그래프가 빨갛게 변했습니다",
      ja: "生存期間グラフが赤に",
    },
    body: {
      en: "At current spend, cash lasts four months. Cutting 20% of roles buys another year.",
      ko: "현재 지출이면 현금은 4개월 버팁니다. 인력 20%를 줄이면 1년을 더 살 수 있습니다.",
      ja: "現在の支出では残り4か月。人員20%削減で1年延長できます。",
    },
    choices: [
      {
        id: "cut",
        label: {
          en: "Cut once, deeply",
          ko: "한 번에 크게 줄인다",
          ja: "一度で大幅削減",
        },
        detail: {
          en: "Extend runway. Break promises.",
          ko: "현금 확보. 약속 파기.",
          ja: "資金延長。約束を破る。",
        },
        result: {
          en: "The company survives the spreadsheet. The empty desks stay loud.",
          ko: "회사는 엑셀에서 살아남았습니다. 빈자리는 계속 시끄럽습니다.",
          ja: "会社は表計算上で生存。空席は大きく響きます。",
        },
        effects: { cash: 24, morale: -24, trust: -13, momentum: -7 },
      },
      {
        id: "salary-cut",
        label: {
          en: "Cut leadership pay",
          ko: "경영진 급여를 줄인다",
          ja: "経営陣報酬を削る",
        },
        detail: {
          en: "Buy less time. Share the pain.",
          ko: "적은 시간 확보. 고통 분담.",
          ja: "延長は短い。痛みを共有。",
        },
        result: {
          en: "The runway moves by months, not years. The team notices who paid first.",
          ko: "생존 기간은 몇 달 늘었습니다. 팀은 누가 먼저 대가를 냈는지 봤습니다.",
          ja: "延長は数か月。それでも誰が先に払ったか、チームは見ています。",
        },
        effects: { cash: 10, morale: 14, trust: 14, momentum: -3 },
      },
    ],
  },
  {
    id: "bug-bounty",
    department: { en: "ENGINEERING", ko: "개발팀", ja: "開発部" },
    title: {
      en: "Launch day has a critical bug",
      ko: "출시일에 치명적 버그가 나왔습니다",
      ja: "発売日に重大バグ",
    },
    body: {
      en: "The bug affects 7% of users. Rolling back kills the campaign; shipping a hotfix means testing in production.",
      ko: "사용자 7%에게 문제가 생깁니다. 롤백하면 캠페인이 죽고, 긴급 수정하면 운영 환경에서 시험해야 합니다.",
      ja: "ユーザー7%に影響。ロールバックで施策中止、緊急修正なら本番でテスト。",
    },
    choices: [
      {
        id: "rollback",
        label: { en: "Roll back", ko: "롤백한다", ja: "ロールバック" },
        detail: {
          en: "Protect users. Lose launch day.",
          ko: "사용자 보호. 출시 효과 상실.",
          ja: "利用者保護。発売効果喪失。",
        },
        result: {
          en: "The campaign stalls. Support tickets stop instantly.",
          ko: "캠페인은 멈췄고 고객 문의도 즉시 멈췄습니다.",
          ja: "施策停止。問い合わせも即時停止。",
        },
        effects: { trust: 16, momentum: -17, cash: -5 },
      },
      {
        id: "hotfix",
        label: {
          en: "Ship the hotfix",
          ko: "긴급 수정한다",
          ja: "緊急修正を出す",
        },
        detail: {
          en: "Save momentum. Risk another failure.",
          ko: "출시 유지. 추가 장애 위험.",
          ja: "勢い維持。追加障害の危険。",
        },
        result: {
          en: "The fix holds. Engineering ages three fiscal quarters.",
          ko: "수정은 성공했고 개발팀은 회계연도 세 분기만큼 늙었습니다.",
          ja: "修正成功。開発部は3四半期分老けました。",
        },
        effects: { momentum: 17, morale: -13, trust: -5, cash: 6 },
      },
    ],
  },
] as const;

export function getScenario(id: string) {
  const scenario = COMPANY_SCENARIOS.find((item) => item.id === id);
  if (!scenario) throw new Error(`Unknown company scenario: ${id}`);
  return scenario;
}
