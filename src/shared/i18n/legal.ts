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
      updated: "Last updated: July 15, 2026",
      sections: [
        {
          title: "Game records",
          body: "RUNWAY 10 stores today's decisions and company metrics in your browser's local storage so a run can resume after a reload. This gameplay record is not sent to an application server.",
        },
        {
          title: "Hosting data",
          body: "Our hosting provider may process standard request data such as IP address, browser type, requested URL, and timestamps for delivery, security, and reliability.",
        },
        {
          title: "Advertising",
          body: "RUNWAY 10 may use Google AdSense. Google and its partners may use cookies or similar technologies to deliver, measure, and personalize ads according to your consent choices and their policies.",
        },
        {
          title: "Clipboard",
          body: "The result-copy action writes a summary to your clipboard only after you press the copy button. The game does not read clipboard contents.",
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
          body: "Each UTC date determines one shared sequence of events. Scores and outcomes may change when game balance or scenario content is updated.",
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
      updated: "최종 수정: 2026년 7월 15일",
      sections: [
        {
          title: "게임 기록",
          body: "RUNWAY 10은 새로고침 후에도 이어서 플레이할 수 있도록 오늘의 결정과 회사 지표를 브라우저 로컬 저장소에 보관합니다. 이 플레이 기록은 애플리케이션 서버로 전송되지 않습니다.",
        },
        {
          title: "호스팅 데이터",
          body: "호스팅 제공자는 서비스 제공, 보안, 안정성을 위해 IP 주소, 브라우저 종류, 요청 URL, 시각 같은 표준 요청 정보를 처리할 수 있습니다.",
        },
        {
          title: "광고",
          body: "RUNWAY 10은 Google AdSense를 사용할 수 있습니다. Google과 파트너는 사용자의 동의 선택 및 각 사 정책에 따라 광고 제공·측정·개인화를 위해 쿠키 또는 유사 기술을 사용할 수 있습니다.",
        },
        {
          title: "클립보드",
          body: "결과 복사 기능은 사용자가 버튼을 누른 뒤에만 요약 결과를 클립보드에 씁니다. 게임은 클립보드 내용을 읽지 않습니다.",
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
          body: "UTC 날짜마다 모든 사용자에게 동일한 사건 순서가 정해집니다. 게임 밸런스나 사건 내용이 업데이트되면 점수와 결과가 달라질 수 있습니다.",
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
      updated: "最終更新：2026年7月15日",
      sections: [
        {
          title: "ゲーム記録",
          body: "RUNWAY 10は再読み込み後も続行できるよう、当日の決断と会社指標をブラウザのローカルストレージに保存します。このプレイ記録はアプリケーションサーバーへ送信されません。",
        },
        {
          title: "ホスティングデータ",
          body: "ホスティング事業者は配信、セキュリティ、信頼性のため、IPアドレス、ブラウザ種類、要求URL、時刻などの標準的な要求情報を処理する場合があります。",
        },
        {
          title: "広告",
          body: "RUNWAY 10はGoogle AdSenseを利用する場合があります。Googleとそのパートナーは、同意内容と各社ポリシーに従い、広告の配信・測定・最適化にCookie等を利用する場合があります。",
        },
        {
          title: "クリップボード",
          body: "結果コピーはボタンを押した後にのみ要約をクリップボードへ書き込みます。ゲームがクリップボード内容を読むことはありません。",
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
          body: "UTC日付ごとに全員共通の事件順が決まります。ゲームバランスや事件内容の更新により、得点と結果が変わる場合があります。",
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
