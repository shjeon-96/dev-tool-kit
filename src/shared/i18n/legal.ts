import type { Locale } from "@/shared/config/site";

interface LegalDocument {
  title: string;
  updated: string;
  sections: readonly { title: string; body: string }[];
}

export const LEGAL_COPY: Record<
  Locale,
  { privacy: LegalDocument; terms: LegalDocument }
> = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: July 16, 2026",
      sections: [
        {
          title: "Game records",
          body: "RUNWAY 10 stores today's decisions, an anonymous player ID, and company metrics in browser local storage so a run can resume. When a run ends, its decision history and anonymous ID are sent to our server to verify and rank the score.",
        },
        {
          title: "Hosting data",
          body: "Our hosting provider may process standard request data such as IP address, browser type, requested URL, and timestamps for delivery, security, and reliability.",
        },
        {
          title: "Analytics and leaderboard",
          body: "Microsoft Clarity helps us understand game interactions. Upstash Redis stores an anonymous player ID with daily sessions, verified completions, cohort returns, share-sheet completions, and referral activity so we can measure retention and operate the leaderboard. Daily activity data is retained for up to 120 days and anonymous identity mappings for up to 400 days.",
        },
        {
          title: "Advertising",
          body: "RUNWAY 10 may use Google AdSense. Google and its partners may use cookies or similar technologies to deliver, measure, and personalize ads according to your consent choices and their policies.",
        },
        {
          title: "Result images",
          body: "When you save a result card, RUNWAY 10 creates the image in your browser and downloads it to your device. The image is not uploaded to our application server. If you use the share button, your device opens its native share sheet with result text and an anonymous referral link.",
        },
        {
          title: "Your controls",
          body: "You can delete gameplay records by clearing this site's local storage. Browser and consent settings control advertising cookies where available.",
        },
        {
          title: "Contact",
          body: "Questions about this policy can be sent to pixellogic.app@gmail.com.",
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      updated: "Last updated: July 15, 2026",
      sections: [
        {
          title: "The game",
          body: "RUNWAY 10 is a fictional decision game for entertainment. Scenarios, metrics, and outcomes are simplified and are not business, legal, employment, or financial advice.",
        },
        {
          title: "Daily challenge",
          body: "Each industry profile and UTC date determine one shared sequence, including a weekly featured crisis. Scores and outcomes may change when game balance or scenario content is updated.",
        },
        {
          title: "Fair use",
          body: "Do not disrupt the service, automate abusive traffic, bypass security controls, or use the service in a way that violates applicable law or another person's rights.",
        },
        {
          title: "Availability",
          body: "The service is provided as available without a promise that every run, stored record, feature, or advertisement will remain available without interruption.",
        },
        {
          title: "Ownership",
          body: "RUNWAY 10 branding, game writing, interface, and original visual assets are owned by PixelLogic unless stated otherwise. The source-code license applies separately where included in the repository.",
        },
        {
          title: "Changes and contact",
          body: "These terms may be updated as the game changes. Continued use after an update means the revised terms apply. Questions can be sent to pixellogic.app@gmail.com.",
        },
      ],
    },
  },
  ko: {
    privacy: {
      title: "개인정보 처리방침",
      updated: "최종 수정: 2026년 7월 16일",
      sections: [
        {
          title: "게임 기록",
          body: "RUNWAY 10은 이어서 플레이할 수 있도록 오늘의 결정, 익명 플레이어 ID, 회사 지표를 브라우저 로컬 저장소에 보관합니다. 게임 종료 시 결정 기록과 익명 ID가 서버로 전송되어 점수를 검증하고 순위를 계산합니다.",
        },
        {
          title: "호스팅 데이터",
          body: "호스팅 제공자는 서비스 제공, 보안, 안정성을 위해 IP 주소, 브라우저 종류, 요청 URL, 시각 같은 표준 요청 정보를 처리할 수 있습니다.",
        },
        {
          title: "분석 및 순위",
          body: "Microsoft Clarity로 게임 이용 과정을 파악합니다. Upstash Redis에는 유지율 측정과 글로벌 순위 운영을 위해 익명 플레이어 ID와 일별 세션, 검증된 완료, 코호트 재방문, 공유 시트 완료, 추천 활동을 저장합니다. 일별 활동 데이터는 최대 120일, 익명 식별자 매핑은 최대 400일 보관합니다.",
        },
        {
          title: "광고",
          body: "RUNWAY 10은 Google AdSense를 사용할 수 있습니다. Google과 파트너는 사용자의 동의 선택 및 각 사 정책에 따라 광고 제공·측정·개인화를 위해 쿠키 또는 유사 기술을 사용할 수 있습니다.",
        },
        {
          title: "결과 이미지",
          body: "결과 카드를 저장하면 RUNWAY 10이 브라우저에서 이미지를 생성해 기기에 다운로드합니다. 이미지는 애플리케이션 서버에 업로드되지 않습니다. 공유 버튼을 사용하면 결과 문구와 익명 추천 링크가 기기의 기본 공유 시트에서 열립니다.",
        },
        {
          title: "사용자 선택권",
          body: "브라우저에서 이 사이트의 로컬 저장소를 지우면 게임 기록을 삭제할 수 있습니다. 광고 쿠키는 브라우저 및 제공되는 동의 설정에서 관리할 수 있습니다.",
        },
        {
          title: "문의",
          body: "개인정보 관련 문의는 pixellogic.app@gmail.com으로 보낼 수 있습니다.",
        },
      ],
    },
    terms: {
      title: "이용약관",
      updated: "최종 수정: 2026년 7월 15일",
      sections: [
        {
          title: "게임의 성격",
          body: "RUNWAY 10은 오락용 가상 의사결정 게임입니다. 사건, 지표, 결과는 단순화된 창작물이며 사업·법률·노무·재무 조언이 아닙니다.",
        },
        {
          title: "오늘의 도전",
          body: "업종과 UTC 날짜마다 공통 사건 순서와 주간 특별 위기가 정해집니다. 게임 밸런스나 사건 내용이 업데이트되면 점수와 결과가 달라질 수 있습니다.",
        },
        {
          title: "공정한 이용",
          body: "서비스를 방해하거나, 악성 자동 트래픽을 만들거나, 보안 통제를 우회하거나, 관련 법률 및 타인의 권리를 침해하는 방식으로 이용해서는 안 됩니다.",
        },
        {
          title: "서비스 제공",
          body: "서비스는 현재 제공 가능한 상태로 제공됩니다. 모든 플레이, 저장 기록, 기능 또는 광고가 중단 없이 계속 유지된다고 보장하지 않습니다.",
        },
        {
          title: "권리",
          body: "별도 표시가 없는 한 RUNWAY 10 브랜드, 게임 문구, 인터페이스, 오리지널 시각 자산의 권리는 PixelLogic에 있습니다. 저장소에 포함된 소스코드 라이선스는 별도로 적용됩니다.",
        },
        {
          title: "변경 및 문의",
          body: "게임 변경에 따라 약관도 수정될 수 있습니다. 수정 후 계속 이용하면 새 약관이 적용됩니다. 문의는 pixellogic.app@gmail.com으로 보낼 수 있습니다.",
        },
      ],
    },
  },
  ja: {
    privacy: {
      title: "プライバシーポリシー",
      updated: "最終更新：2026年7月16日",
      sections: [
        {
          title: "ゲーム記録",
          body: "RUNWAY 10は続行できるよう、当日の決断、匿名プレイヤーID、会社指標をブラウザに保存します。終了時に決断履歴と匿名IDをサーバーへ送り、得点を検証して順位を算出します。",
        },
        {
          title: "ホスティングデータ",
          body: "ホスティング事業者は配信、セキュリティ、信頼性のため、IPアドレス、ブラウザ種類、要求URL、時刻などの標準的な要求情報を処理する場合があります。",
        },
        {
          title: "分析とランキング",
          body: "Microsoft Clarityでゲーム操作を把握します。Upstash Redisには継続率の測定と世界ランキング運営のため、匿名プレイヤーID、日別セッション、検証済み完了、コホート再訪、共有シート完了、紹介活動を保存します。日別活動データは最大120日、匿名識別子の対応は最大400日保持します。",
        },
        {
          title: "広告",
          body: "RUNWAY 10はGoogle AdSenseを利用する場合があります。Googleとそのパートナーは、同意内容と各社ポリシーに従い、広告の配信・測定・最適化にCookie等を利用する場合があります。",
        },
        {
          title: "結果画像",
          body: "結果カードを保存すると、RUNWAY 10はブラウザ内で画像を生成し、端末へダウンロードします。画像はアプリケーションサーバーへ送信されません。共有ボタンを使うと、結果文と匿名紹介リンクが端末の共有シートで開きます。",
        },
        {
          title: "利用者の設定",
          body: "サイトのローカルストレージを消去するとゲーム記録を削除できます。広告Cookieはブラウザおよび提供される同意設定で管理できます。",
        },
        {
          title: "連絡先",
          body: "本方針への質問はpixellogic.app@gmail.comへお送りください。",
        },
      ],
    },
    terms: {
      title: "利用規約",
      updated: "最終更新：2026年7月15日",
      sections: [
        {
          title: "ゲームについて",
          body: "RUNWAY 10は娯楽用の架空の意思決定ゲームです。事件、指標、結果は簡略化された創作であり、事業・法務・労務・財務上の助言ではありません。",
        },
        {
          title: "デイリーチャレンジ",
          body: "業種とUTC日付ごとに共通の事件順と週間特別危機が決まります。ゲームバランスや事件内容の更新により、得点と結果が変わる場合があります。",
        },
        {
          title: "公正な利用",
          body: "サービス妨害、悪質な自動通信、セキュリティ回避、法令または他者の権利を侵害する利用は禁止します。",
        },
        {
          title: "提供状態",
          body: "サービスは提供可能な状態で提供されます。すべてのプレイ、保存記録、機能または広告が中断なく継続することを保証しません。",
        },
        {
          title: "権利",
          body: "別途表示がない限り、RUNWAY 10のブランド、文章、インターフェース、オリジナル視覚素材はPixelLogicに帰属します。リポジトリ内のソースコードには別途ライセンスが適用されます。",
        },
        {
          title: "変更と連絡",
          body: "ゲームの変更に伴い規約を更新する場合があります。更新後の継続利用には新規約が適用されます。質問はpixellogic.app@gmail.comへお送りください。",
        },
      ],
    },
  },
};
