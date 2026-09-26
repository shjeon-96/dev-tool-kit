import type { AppDocument, AppDocumentKind } from "./app-documents";

// 원본: 이 저장소 dictionaries.ts의 boriCleanerPrivacy (2026-09-21).
// 옛 주소 /{locale}/bori-cleaner/privacy는 next.config 리다이렉트로 이 문서를 연다.
const UPDATED = "2026-09-21";

export const BORI_CLEANER_DOCUMENTS: Record<
  "en" | "ko" | "ja",
  Pick<Record<AppDocumentKind, AppDocument>, "privacy">
> = {
  en: {
    privacy: {
      title: "Bori Cleaner Privacy Policy",
      description:
        "Bori Cleaner scans local Mac file names, sizes and modification dates to help you review developer caches, project outputs and other cleanup candidates.",
      updatedAt: UPDATED,
      sections: [
        {
          title: "What Bori Cleaner does",
          body: [
            "Bori Cleaner scans local Mac file names, sizes and modification dates to help you review developer caches, project outputs and other cleanup candidates.",
          ],
        },
        {
          title: "Information and files",
          body: [
            "Bori Cleaner does not collect or send accounts, names, email addresses, contacts, location, advertising identifiers, analytics or file contents to a server. Scans, settings and archives stay on your Mac. File contents are read locally only when comparing duplicates or creating and restoring an archive.",
          ],
        },
        {
          title: "Automatic care",
          body: [
            "If you enable Automatic Care, the app can use macOS notifications and the login item permission to clean settled caches and logs on a schedule and warn about low disk space. Conversations, credentials, settings, databases, plugins and protected items are excluded from automatic cleanup.",
          ],
        },
        {
          title: "Purchases",
          body: [
            "The one-time Automatic Care purchase is processed by Apple through the App Store and StoreKit. Apple handles payment and Apple Account information; Bori Cleaner does not store payment details.",
          ],
        },
        {
          title: "Contact",
          body: [
            "For privacy questions, contact pixellogic.app@gmail.com or visit the project repository at github.com/shjeon-96/bori-cleaner.",
          ],
        },
      ],
    },
  },
  ko: {
    privacy: {
      title: "보리 클리너 개인정보처리방침",
      description:
        "보리 클리너는 Mac의 파일 이름·크기·수정일을 살펴보고 개발 캐시, 프로젝트 산출물과 정리 후보를 검토하도록 도와요.",
      updatedAt: UPDATED,
      sections: [
        {
          title: "보리 클리너가 하는 일",
          body: [
            "보리 클리너는 Mac의 파일 이름·크기·수정일을 살펴보고 개발 캐시, 프로젝트 산출물과 정리 후보를 검토하도록 도와요.",
          ],
        },
        {
          title: "정보와 파일",
          body: [
            "계정, 이름, 이메일, 연락처, 위치, 광고 식별자, 분석 정보 또는 파일 내용을 서버로 수집·전송하지 않아요. 스캔 결과·설정·아카이브는 Mac에만 저장해요. 중복 비교와 아카이브·복원에 필요한 파일 내용도 Mac에서만 읽어요.",
          ],
        },
        {
          title: "자동 관리",
          body: [
            "자동 관리를 켜면 macOS 알림과 로그인 항목 권한을 사용해 오래 바뀌지 않은 캐시·로그를 주기에 맞춰 정리하고 디스크 부족을 알려 줄 수 있어요. 대화 기록·인증 정보·설정·DB·플러그인·보호 항목은 자동 정리에서 제외해요.",
          ],
        },
        {
          title: "결제",
          body: [
            "자동 관리 일회성 구매는 Apple App Store와 StoreKit으로 처리해요. 결제 정보와 Apple 계정 정보는 Apple이 처리하며 보리 클리너는 보관하지 않아요.",
          ],
        },
        {
          title: "문의",
          body: [
            "개인정보 문의는 pixellogic.app@gmail.com 또는 github.com/shjeon-96/bori-cleaner에서 보내 주세요.",
          ],
        },
      ],
    },
  },
  ja: {
    privacy: {
      title: "ボリクリーナー プライバシーポリシー",
      description:
        "ボリクリーナーはMac上のファイル名・サイズ・変更日を確認し、開発キャッシュやプロジェクトの生成物を見直すためのアプリです。",
      updatedAt: UPDATED,
      sections: [
        {
          title: "ボリクリーナーについて",
          body: [
            "ボリクリーナーはMac上のファイル名・サイズ・変更日を確認し、開発キャッシュやプロジェクトの生成物を見直すためのアプリです。",
          ],
        },
        {
          title: "情報とファイル",
          body: [
            "アカウント、氏名、メールアドレス、連絡先、位置情報、広告識別子、分析情報、ファイル内容をサーバーへ収集・送信しません。スキャン結果・設定・アーカイブはMac内に保存されます。重複比較やアーカイブ・復元に必要なファイル内容もMac上でのみ読み取ります。",
          ],
        },
        {
          title: "自動ケア",
          body: [
            "自動ケアを有効にすると、macOSの通知とログイン項目の権限を使い、長く変更されていないキャッシュやログを定期的に整理し、空き容量が少ないときに知らせます。会話履歴、認証情報、設定、データベース、プラグイン、保護項目は自動整理の対象外です。",
          ],
        },
        {
          title: "購入",
          body: [
            "自動ケアの買い切り購入はApple App StoreとStoreKitで処理されます。支払い情報とApple Account情報はAppleが処理し、ボリクリーナーは保存しません。",
          ],
        },
        {
          title: "お問い合わせ",
          body: [
            "プライバシーに関するお問い合わせは pixellogic.app@gmail.com、または github.com/shjeon-96/bori-cleaner までお送りください。",
          ],
        },
      ],
    },
  },
};
