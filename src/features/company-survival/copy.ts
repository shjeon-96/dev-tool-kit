import type { Locale } from "@/shared/config/site";
import type {
  CompanyMetric,
  CompanyStatus,
} from "@/shared/types/company-survival";

export const COMPANY_COPY: Record<
  Locale,
  {
    brand: string;
    edition: string;
    title: string;
    subtitle: string;
    briefing: string;
    chooseCompany: string;
    companyNote: string;
    changeCompany: string;
    rules: readonly string[];
    start: string;
    resume: string;
    decision: string;
    turn: string;
    of: string;
    boardMemo: string;
    consequence: string;
    next: string;
    finalReport: string;
    restart: string;
    saveCard: string;
    savedCard: string;
    saveFailed: string;
    storageError: string;
    clearData: string;
    today: string;
    dailyNotice: string;
    privacy: string;
    terms: string;
    score: string;
    careerTitle: string;
    currentStreak: string;
    daysPlayed: string;
    survivalRate: string;
    bestScore: string;
    dayUnit: string;
    globalRank: string;
    topPercent: string;
    players: string;
    rankLoading: string;
    rankError: string;
    metrics: Record<CompanyMetric, string>;
    effectLabels: Record<CompanyMetric, string>;
    status: Record<
      Exclude<CompanyStatus, "playing">,
      { title: string; body: string }
    >;
  }
> = {
  ko: {
    brand: "RUNWAY 10",
    edition: "오늘의 경영 위기",
    title: "회사를 10번의 결정 동안 살려라.",
    subtitle:
      "좋은 선택은 없습니다. 숫자가 0이 되기 전에 다음 월요일까지 버티세요.",
    briefing: "대표이사 긴급 브리핑",
    chooseCompany: "오늘 경영할 회사를 선택하세요",
    companyNote: "업종마다 시작 지표와 전용 위기가 다릅니다.",
    changeCompany: "다른 회사 선택",
    rules: [
      "같은 업종은 매일 동일한 10개 사건",
      "현금·팀·신뢰 중 하나라도 0이면 종료",
      "결정은 되돌릴 수 없음",
    ],
    start: "대표이사로 출근하기",
    resume: "경영 회의로 돌아가기",
    decision: "결재 요청",
    turn: "결정",
    of: "/",
    boardMemo: "상황 보고",
    consequence: "결정 결과",
    next: "다음 보고서 열기",
    finalReport: "최종 생존 보고서",
    restart: "오늘의 회사 다시 시작",
    saveCard: "결과 카드 저장",
    savedCard: "공유용 결과 이미지를 저장했습니다.",
    saveFailed: "결과 이미지를 만들지 못했습니다.",
    storageError:
      "저장된 경영 기록이 손상됐습니다. 기록을 지운 뒤 다시 시작해야 합니다.",
    clearData: "손상된 기록 지우기",
    today: "오늘의 시드",
    dailyNotice: "자정(UTC)에 새 위기가 도착합니다.",
    privacy: "개인정보",
    terms: "이용약관",
    score: "기업가치 점수",
    careerTitle: "대표이사 개인 기록",
    currentStreak: "현재 연속 출근",
    daysPlayed: "완료한 경영일",
    survivalRate: "생존율",
    bestScore: "최고 기업가치",
    dayUnit: "일",
    globalRank: "글로벌 업종 순위",
    topPercent: "상위",
    players: "개 기록",
    rankLoading: "글로벌 순위를 집계하고 있습니다…",
    rankError: "글로벌 순위 서버에 연결하지 못했습니다.",
    metrics: { cash: "현금", morale: "팀", trust: "신뢰", momentum: "성장" },
    effectLabels: {
      cash: "현금",
      morale: "팀",
      trust: "신뢰",
      momentum: "성장",
    },
    status: {
      survived: {
        title: "월요일까지 살아남았습니다",
        body: "완벽한 회사는 아니지만, 아직 결정할 회사가 남아 있습니다.",
      },
      bankrupt: {
        title: "통장이 먼저 퇴근했습니다",
        body: "현금이 0이 됐습니다. 급여일이 회사를 끝냈습니다.",
      },
      exodus: {
        title: "회사에 팀이 남지 않았습니다",
        body: "사람이 0이 됐습니다. 빈 슬랙 채널만 정상 작동합니다.",
      },
      rejected: {
        title: "시장에 신뢰가 남지 않았습니다",
        body: "고객과 투자자가 동시에 문을 닫았습니다.",
      },
    },
  },
  en: {
    brand: "RUNWAY 10",
    edition: "TODAY'S CORPORATE CRISIS",
    title: "Keep the company alive for ten decisions.",
    subtitle:
      "There are no good choices. Make it to next Monday before a critical number hits zero.",
    briefing: "Chief executive emergency briefing",
    chooseCompany: "Choose today's company",
    companyNote: "Each industry starts differently and has exclusive crises.",
    changeCompany: "Choose another company",
    rules: [
      "The same profile gets the same ten crises each day",
      "Cash, team, or trust at zero ends the company",
      "Every decision is final",
    ],
    start: "Clock in as CEO",
    resume: "Return to the boardroom",
    decision: "DECISION REQUIRED",
    turn: "DECISION",
    of: "/",
    boardMemo: "SITUATION REPORT",
    consequence: "DECISION OUTCOME",
    next: "Open next report",
    finalReport: "View final report",
    restart: "Restart today's company",
    saveCard: "Save result card",
    savedCard: "Shareable result image saved.",
    saveFailed: "Could not create the result image.",
    storageError:
      "Saved company record is corrupted. Clear it before starting again.",
    clearData: "Clear corrupted record",
    today: "TODAY'S SEED",
    dailyNotice: "A new crisis arrives at midnight UTC.",
    privacy: "Privacy",
    terms: "Terms",
    score: "COMPANY VALUE SCORE",
    careerTitle: "CEO CAREER RECORD",
    currentStreak: "CURRENT STREAK",
    daysPlayed: "DAYS COMPLETED",
    survivalRate: "SURVIVAL RATE",
    bestScore: "BEST COMPANY VALUE",
    dayUnit: "DAYS",
    globalRank: "GLOBAL INDUSTRY RANK",
    topPercent: "TOP",
    players: "RUNS",
    rankLoading: "Calculating your global rank…",
    rankError: "The global leaderboard is unavailable.",
    metrics: {
      cash: "CASH",
      morale: "TEAM",
      trust: "TRUST",
      momentum: "GROWTH",
    },
    effectLabels: {
      cash: "Cash",
      morale: "Team",
      trust: "Trust",
      momentum: "Growth",
    },
    status: {
      survived: {
        title: "You made it to Monday",
        body: "The company is imperfect, but it still exists to make another decision.",
      },
      bankrupt: {
        title: "The bank account clocked out",
        body: "Cash reached zero. Payroll ended the company.",
      },
      exodus: {
        title: "Nobody is left to build it",
        body: "Team reached zero. Only the empty Slack channels remain online.",
      },
      rejected: {
        title: "The market stopped believing",
        body: "Customers and investors closed the door at the same time.",
      },
    },
  },
  ja: {
    brand: "RUNWAY 10",
    edition: "今日の経営危機",
    title: "10回の決断で会社を生き残らせろ。",
    subtitle:
      "正解はありません。重要な数字が0になる前に、次の月曜日まで耐えてください。",
    briefing: "代表取締役 緊急説明",
    chooseCompany: "今日経営する会社を選択",
    companyNote: "業種ごとに初期指標と専用危機が異なります。",
    changeCompany: "別の会社を選ぶ",
    rules: [
      "同じ業種には毎日同じ10件の危機",
      "資金・チーム・信頼のどれかが0で終了",
      "決断は取り消せない",
    ],
    start: "CEOとして出勤する",
    resume: "会議室に戻る",
    decision: "決裁要請",
    turn: "決断",
    of: "/",
    boardMemo: "状況報告",
    consequence: "決断の結果",
    next: "次の報告書を開く",
    finalReport: "最終報告を見る",
    restart: "今日の会社を再開する",
    saveCard: "結果カードを保存",
    savedCard: "共有用の結果画像を保存しました。",
    saveFailed: "結果画像を作成できませんでした。",
    storageError:
      "保存された経営記録が破損しています。削除して再開してください。",
    clearData: "破損記録を削除",
    today: "今日のシード",
    dailyNotice: "午前0時（UTC）に新しい危機が届きます。",
    privacy: "プライバシー",
    terms: "利用規約",
    score: "企業価値スコア",
    careerTitle: "CEO個人記録",
    currentStreak: "現在の連続出勤",
    daysPlayed: "完了した経営日",
    survivalRate: "生存率",
    bestScore: "最高企業価値",
    dayUnit: "日",
    globalRank: "世界業界ランキング",
    topPercent: "上位",
    players: "件",
    rankLoading: "世界順位を集計中…",
    rankError: "世界ランキングに接続できませんでした。",
    metrics: {
      cash: "資金",
      morale: "チーム",
      trust: "信頼",
      momentum: "成長",
    },
    effectLabels: {
      cash: "資金",
      morale: "チーム",
      trust: "信頼",
      momentum: "成長",
    },
    status: {
      survived: {
        title: "月曜日まで生き残りました",
        body: "完璧ではありませんが、次の決断をする会社は残っています。",
      },
      bankrupt: {
        title: "口座が先に退勤しました",
        body: "資金が0になりました。給料日が会社を終わらせました。",
      },
      exodus: {
        title: "作る人が残っていません",
        body: "チームが0になりました。空のSlackだけが稼働中です。",
      },
      rejected: {
        title: "市場の信頼を失いました",
        body: "顧客と投資家が同時に扉を閉じました。",
      },
    },
  },
};
