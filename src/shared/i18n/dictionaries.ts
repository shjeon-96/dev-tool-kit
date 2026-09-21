import { type Locale, type ProductId } from "@/shared/config/site";

export interface ProductCopy {
  id: ProductId;
  name: string;
  status: string;
  description: string;
  meta: string;
}

interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    products: string;
    menu: string;
    language: string;
  };
  common: {
    skipToContent: string;
    toggleTheme: string;
    appStore: string;
    googlePlay: string;
    webApp: string;
    publicPage: string;
  };
  home: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    primaryCta: string;
    proofOne: string;
    proofTwo: string;
    proofThree: string;
    productsTitle: string;
    productsIntro: string;
    principleEyebrow: string;
    principleTitle: string;
    principles: readonly { title: string; body: string }[];
    products: readonly ProductCopy[];
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    boriHeroLabel: string;
    boriHeroMessage: string;
    boriHeroBody: string;
    boriShelfLabel: string;
    boriContactLabel: string;
  };
  privacy: {
    title: string;
    updated: string;
    sections: readonly { title: string; body: string }[];
  };
  boriCleanerPrivacy: {
    title: string;
    updated: string;
    sections: readonly { title: string; body: string }[];
  };
  terms: {
    title: string;
    updated: string;
    sections: readonly { title: string; body: string }[];
  };
  footer: {
    statement: string;
    products: string;
    legal: string;
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
}

const en: Dictionary = {
  meta: {
    title: "PixelLogic — Small products, made with care",
    description:
      "PixelLogic makes thoughtful apps and useful digital products for everyday life.",
  },
  nav: {
    products: "Products",
    menu: "Menu",
    language: "Language",
  },
  common: {
    skipToContent: "Skip to content",
    toggleTheme: "Toggle theme",
    appStore: "App Store",
    googlePlay: "Google Play",
    webApp: "Open app",
    publicPage: "Public page",
  },
  home: {
    eyebrow: "PIXELLOGIC / MADE WITH CARE",
    title: "Small products",
    titleAccent: "for a brighter everyday.",
    intro:
      "We make focused apps for health, routines, play and the small ways people connect.",
    primaryCta: "See the products",
    proofOne: "Apps / products / experiments",
    proofTwo: "Built by PixelLogic",
    proofThree: "One care standard",
    productsTitle: "A few things you can use.",
    productsIntro: "Real products and public apps, made with the same care.",
    principleEyebrow: "ONE PRODUCT MINDSET",
    principleTitle: "Different days, one steady point of view.",
    principles: [
      {
        title: "Make everyday progress visible",
        body: "Weight History turns a simple record into a clearer view of change.",
      },
      {
        title: "Make the next moment easier",
        body: "Sol Scheduler brings schedules and tasks into a rhythm you can return to.",
      },
      {
        title: "Make small habits stick",
        body: "One Second Run keeps progress light, specific and repeatable.",
      },
    ],
    products: [
      {
        id: "weightHistory",
        name: "Weight History",
        status: "Live app",
        description:
          "A calmer way to record weight, understand trends and keep moving toward a goal.",
        meta: "APP / HEALTH RECORDS",
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "Live app",
        description:
          "A focused calendar for schedules, tasks and the rhythm of everyday plans.",
        meta: "APP / TIME & ROUTINE",
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "Available now",
        description:
          "A daily running ritual that grows by one second at a time.",
        meta: "APP / DAILY PRACTICE",
      },
      {
        id: "blockBlast",
        name: "PixelLogic Blocks",
        status: "Available now",
        description:
          "An 8×8 block puzzle about placing pieces, clearing lines and keeping a combo.",
        meta: "APP / PUZZLE",
      },
      {
        id: "orbit",
        name: "Orbit: Who Knows You?",
        status: "Open on the web",
        description:
          "A playful quiz for sharing questions with friends and discovering how they see you.",
        meta: "WEB / SOCIAL QUIZ",
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "Have a small idea worth keeping?",
    contactBody:
      "Tell us what you are making, noticing or trying to make better.",
    contactCta: "Say hello",
    boriHeroLabel: "BORI / PIXELLOGIC GUIDE",
    boriHeroMessage: "Small products, a little more heart.",
    boriHeroBody:
      "Bori is PixelLogic's little guide. We make apps that bring a little more calm to everyday routines.",
    boriShelfLabel: "BORI'S PICKS",
    boriContactLabel: "BORI SAYS HELLO",
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Updated September 21, 2026",
    sections: [
      {
        title: "This website",
        body: "This website presents PixelLogic products and links to their own product surfaces. We do not ask for an account to browse this site.",
      },
      {
        title: "Product-specific information",
        body: "When you open an individual product, its own surface explains the data handling and permissions that apply there.",
      },
      {
        title: "Contact",
        body: "Questions about privacy can be sent to pixellogic.app@gmail.com.",
      },
    ],
  },
  boriCleanerPrivacy: {
    title: "Bori Cleaner Privacy Policy",
    updated: "Updated September 21, 2026",
    sections: [
      {
        title: "What Bori Cleaner does",
        body: "Bori Cleaner scans local Mac file names, sizes and modification dates to help you review developer caches, project outputs and other cleanup candidates.",
      },
      {
        title: "Information and files",
        body: "Bori Cleaner does not collect or send accounts, names, email addresses, contacts, location, advertising identifiers, analytics or file contents to a server. Scans, settings and archives stay on your Mac. File contents are read locally only when comparing duplicates or creating and restoring an archive.",
      },
      {
        title: "Automatic care",
        body: "If you enable Automatic Care, the app can use macOS notifications and the login item permission to clean settled caches and logs on a schedule and warn about low disk space. Conversations, credentials, settings, databases, plugins and protected items are excluded from automatic cleanup.",
      },
      {
        title: "Purchases",
        body: "The one-time Automatic Care purchase is processed by Apple through the App Store and StoreKit. Apple handles payment and Apple Account information; Bori Cleaner does not store payment details.",
      },
      {
        title: "Contact",
        body: "For privacy questions, contact pixellogic.app@gmail.com or visit the project repository at github.com/shjeon-96/bori-cleaner.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    updated: "Updated September 21, 2026",
    sections: [
      {
        title: "Use of the site",
        body: "This site is a product showcase and information surface for PixelLogic. Product-specific terms may apply when you open an individual app or service.",
      },
      {
        title: "Availability",
        body: "Products and experiments may change, pause or become unavailable while they are being developed.",
      },
      {
        title: "Contact",
        body: "Questions about these terms can be sent to pixellogic.app@gmail.com.",
      },
    ],
  },
  footer: {
    statement: "Small products. Made with care.",
    products: "Products",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

const ko: Dictionary = {
  meta: {
    title: "PixelLogic — 작지만 오래 쓰는 제품을 만들어요",
    description: "PixelLogic은 일상에 오래 남는 앱과 디지털 제품을 만들어요.",
  },
  nav: {
    products: "제품",
    menu: "메뉴",
    language: "언어",
  },
  common: {
    skipToContent: "본문으로 건너뛰기",
    toggleTheme: "테마 전환",
    appStore: "App Store",
    googlePlay: "Google Play",
    webApp: "앱 열기",
    publicPage: "공개 안내",
  },
  home: {
    eyebrow: "PIXELLOGIC / MADE WITH CARE",
    title: "작지만 오래 쓰는 제품을",
    titleAccent: "만들어요.",
    intro:
      "건강을 기록하고, 시간을 정리하고, 좋은 습관을 이어가도록 돕는 앱을 만들어요.",
    primaryCta: "제품 보기",
    proofOne: "앱 / 제품 / 실험",
    proofTwo: "PixelLogic에서 만들어요",
    proofThree: "하나의 세심한 기준",
    productsTitle: "지금 만날 수 있는 제품들",
    productsIntro: "실제 배포된 PixelLogic 앱과 디지털 제품들이에요.",
    principleEyebrow: "ONE PRODUCT MINDSET",
    principleTitle: "서로 다른 하루를 하나의 마음으로 이어가요.",
    principles: [
      {
        title: "변화를 눈에 보이게 해요",
        body: "Weight History는 간단한 기록을 흐름으로 보여줘요.",
      },
      {
        title: "다음 순간을 가볍게 해요",
        body: "Sol Scheduler는 일정과 할 일을 하루의 리듬으로 정리해요.",
      },
      {
        title: "작은 습관을 오래 가게 해요",
        body: "One Second Run은 구체적이고 반복 가능한 달리기를 만들어요.",
      },
    ],
    products: [
      {
        id: "weightHistory",
        name: "Weight History",
        status: "배포 중",
        description:
          "체중을 기록하고 흐름을 살펴보며 목표까지 이어가도록 돕는 앱이에요.",
        meta: "APP / HEALTH RECORDS",
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "배포 중",
        description:
          "일정과 할 일을 정리하고 하루의 리듬을 이어가는 캘린더 앱이에요.",
        meta: "APP / TIME & ROUTINE",
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "스토어에서 만나요",
        description: "매일 1초씩 늘어나는 달리기 루틴을 만드는 앱이에요.",
        meta: "APP / DAILY PRACTICE",
      },
      {
        id: "blockBlast",
        name: "PixelLogic Blocks",
        status: "스토어에서 만나요",
        description:
          "블록을 놓고 줄을 지우며 콤보를 이어가는 8×8 퍼즐 게임이에요.",
        meta: "APP / PUZZLE",
      },
      {
        id: "orbit",
        name: "Orbit: Who Knows You?",
        status: "웹에서 만나요",
        description:
          "친구에게 퀴즈를 보내고 서로가 나를 어떻게 보는지 알아가는 서비스예요.",
        meta: "WEB / SOCIAL QUIZ",
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "오래 남길 작은 아이디어가 있나요?",
    contactBody:
      "만들고 있거나, 발견했거나, 더 나아지게 만들고 싶은 이야기를 들려 주세요.",
    contactCta: "이야기 나누기",
    boriHeroLabel: "BORI / PIXELLOGIC GUIDE",
    boriHeroMessage: "작은 제품도, 오래 쓰는 마음으로 만들어요.",
    boriHeroBody:
      "보리는 PixelLogic의 작은 안내자예요. 매일 쓰는 앱이 조금 더 차분하고 따뜻하게 남기를 바라요.",
    boriShelfLabel: "보리가 고른 제품",
    boriContactLabel: "보리가 인사해요",
  },
  privacy: {
    title: "개인정보처리방침",
    updated: "2026년 9월 21일 업데이트",
    sections: [
      {
        title: "이 웹사이트",
        body: "이 사이트는 PixelLogic 제품을 소개하고 각 제품 화면으로 연결하는 쇼케이스예요. 사이트를 둘러보기 위해 계정이 필요하지 않아요.",
      },
      {
        title: "제품별 안내",
        body: "각 제품을 사용할 때의 데이터 처리와 권한 안내는 해당 제품 화면에서 별도로 설명해요.",
      },
      {
        title: "문의",
        body: "개인정보에 관한 문의는 pixellogic.app@gmail.com으로 보내 주세요.",
      },
    ],
  },
  boriCleanerPrivacy: {
    title: "보리 클리너 개인정보처리방침",
    updated: "2026년 9월 21일 업데이트",
    sections: [
      {
        title: "보리 클리너가 하는 일",
        body: "보리 클리너는 Mac의 파일 이름·크기·수정일을 살펴보고 개발 캐시, 프로젝트 산출물과 정리 후보를 검토하도록 도와요.",
      },
      {
        title: "정보와 파일",
        body: "계정, 이름, 이메일, 연락처, 위치, 광고 식별자, 분석 정보 또는 파일 내용을 서버로 수집·전송하지 않아요. 스캔 결과·설정·아카이브는 Mac에만 저장해요. 중복 비교와 아카이브·복원에 필요한 파일 내용도 Mac에서만 읽어요.",
      },
      {
        title: "자동 관리",
        body: "자동 관리를 켜면 macOS 알림과 로그인 항목 권한을 사용해 오래 바뀌지 않은 캐시·로그를 주기에 맞춰 정리하고 디스크 부족을 알려 줄 수 있어요. 대화 기록·인증 정보·설정·DB·플러그인·보호 항목은 자동 정리에서 제외해요.",
      },
      {
        title: "결제",
        body: "자동 관리 일회성 구매는 Apple App Store와 StoreKit으로 처리해요. 결제 정보와 Apple 계정 정보는 Apple이 처리하며 보리 클리너는 보관하지 않아요.",
      },
      {
        title: "문의",
        body: "개인정보 문의는 pixellogic.app@gmail.com 또는 github.com/shjeon-96/bori-cleaner에서 보내 주세요.",
      },
    ],
  },
  terms: {
    title: "이용약관",
    updated: "2026년 9월 21일 업데이트",
    sections: [
      {
        title: "사이트 이용",
        body: "이 사이트는 PixelLogic의 제품을 소개하는 공간이에요. 개별 앱이나 서비스에 들어가면 제품별 약관이 적용될 수 있어요.",
      },
      {
        title: "제품 상태",
        body: "제품과 실험은 만드는 과정에서 변경되거나 잠시 중단될 수 있어요.",
      },
      {
        title: "문의",
        body: "약관에 관한 문의는 pixellogic.app@gmail.com으로 보내 주세요.",
      },
    ],
  },
  footer: {
    statement: "작지만 오래 쓰는 제품을 만들어요.",
    products: "제품",
    legal: "법적 안내",
    privacy: "개인정보",
    terms: "약관",
    contact: "문의",
    rights: "All rights reserved.",
  },
};

const ja: Dictionary = {
  meta: {
    title: "PixelLogic — 小さく、丁寧につくるプロダクト",
    description:
      "PixelLogicは、日々の暮らしに長く残るアプリとデジタルプロダクトをつくります。",
  },
  nav: {
    products: "プロダクト",
    menu: "メニュー",
    language: "言語",
  },
  common: {
    skipToContent: "本文へ移動",
    toggleTheme: "テーマを切り替える",
    appStore: "App Store",
    googlePlay: "Google Play",
    webApp: "アプリを開く",
    publicPage: "公開ページ",
  },
  home: {
    eyebrow: "PIXELLOGIC / MADE WITH CARE",
    title: "小さく、丁寧に",
    titleAccent: "つくる。",
    intro:
      "健康を記録し、時間を整え、続く習慣をつくるためのアプリをつくっています。",
    primaryCta: "プロダクトを見る",
    proofOne: "アプリ / プロダクト / 実験",
    proofTwo: "PixelLogicで制作",
    proofThree: "ひとつの丁寧な基準",
    productsTitle: "いま使えるプロダクト",
    productsIntro:
      "実際に公開しているPixelLogicのアプリとデジタルプロダクトです。",
    principleEyebrow: "ONE PRODUCT MINDSET",
    principleTitle: "違う毎日に、ひとつの確かな視点を。",
    principles: [
      {
        title: "日々の変化を見えるようにする",
        body: "Weight Historyは、シンプルな記録を変化の流れとして見せます。",
      },
      {
        title: "次の瞬間を軽くする",
        body: "Sol Schedulerは、予定とタスクを戻りやすいリズムに整えます。",
      },
      {
        title: "小さな習慣を続けやすくする",
        body: "One Second Runは、具体的で繰り返せるランニングをつくります。",
      },
    ],
    products: [
      {
        id: "weightHistory",
        name: "Weight History",
        status: "公開中",
        description:
          "体重を記録し、変化を確認しながら目標へ進むためのアプリです。",
        meta: "APP / HEALTH RECORDS",
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "公開中",
        description:
          "予定とタスクを整理し、毎日のリズムを続けるカレンダーアプリです。",
        meta: "APP / TIME & ROUTINE",
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "ストアで配信中",
        description: "毎日1秒ずつ伸びるランニングの習慣をつくるアプリです。",
        meta: "APP / DAILY PRACTICE",
      },
      {
        id: "blockBlast",
        name: "PixelLogic Blocks",
        status: "ストアで配信中",
        description:
          "ブロックを置き、ラインを消しながらコンボをつなぐ8×8パズルです。",
        meta: "APP / PUZZLE",
      },
      {
        id: "orbit",
        name: "Orbit: Who Knows You?",
        status: "ウェブで公開中",
        description:
          "友だちにクイズを送り、お互いがどう見ているかを楽しむサービスです。",
        meta: "WEB / SOCIAL QUIZ",
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "残しておきたい小さなアイデアがありますか？",
    contactBody:
      "つくっていること、気づいたこと、もっと良くしたいことを聞かせてください。",
    contactCta: "話しかける",
    boriHeroLabel: "BORI / PIXELLOGIC GUIDE",
    boriHeroMessage: "小さなプロダクトに、もう少しあたたかさを。",
    boriHeroBody:
      "ボリはPixelLogicの小さな案内役です。毎日使うアプリが、少し落ち着いてあたたかく残るようにつくっています。",
    boriShelfLabel: "ボリのおすすめ",
    boriContactLabel: "ボリからごあいさつ",
  },
  privacy: {
    title: "プライバシーポリシー",
    updated: "2026年9月21日更新",
    sections: [
      {
        title: "このサイト",
        body: "このサイトはPixelLogicのプロダクトを紹介し、それぞれのプロダクトへ案内するショーケースです。閲覧にアカウントは必要ありません。",
      },
      {
        title: "プロダクトごとの案内",
        body: "各プロダクトを利用する際のデータ処理と権限については、それぞれの画面で説明します。",
      },
      {
        title: "お問い合わせ",
        body: "プライバシーに関するお問い合わせは pixellogic.app@gmail.com までお送りください。",
      },
    ],
  },
  boriCleanerPrivacy: {
    title: "ボリクリーナー プライバシーポリシー",
    updated: "2026年9月21日更新",
    sections: [
      {
        title: "ボリクリーナーについて",
        body: "ボリクリーナーはMac上のファイル名・サイズ・変更日を確認し、開発キャッシュやプロジェクトの生成物を見直すためのアプリです。",
      },
      {
        title: "情報とファイル",
        body: "アカウント、氏名、メールアドレス、連絡先、位置情報、広告識別子、分析情報、ファイル内容をサーバーへ収集・送信しません。スキャン結果・設定・アーカイブはMac内に保存されます。重複比較やアーカイブ・復元に必要なファイル内容もMac上でのみ読み取ります。",
      },
      {
        title: "自動ケア",
        body: "自動ケアを有効にすると、macOSの通知とログイン項目の権限を使い、長く変更されていないキャッシュやログを定期的に整理し、空き容量が少ないときに知らせます。会話履歴、認証情報、設定、データベース、プラグイン、保護項目は自動整理の対象外です。",
      },
      {
        title: "購入",
        body: "自動ケアの買い切り購入はApple App StoreとStoreKitで処理されます。支払い情報とApple Account情報はAppleが処理し、ボリクリーナーは保存しません。",
      },
      {
        title: "お問い合わせ",
        body: "プライバシーに関するお問い合わせは pixellogic.app@gmail.com、または github.com/shjeon-96/bori-cleaner までお送りください。",
      },
    ],
  },
  terms: {
    title: "利用規約",
    updated: "2026年9月21日更新",
    sections: [
      {
        title: "サイトの利用",
        body: "このサイトはPixelLogicのプロダクトを紹介する場所です。個別のアプリやサービスでは、プロダクトごとの規約が適用される場合があります。",
      },
      {
        title: "プロダクトの状態",
        body: "プロダクトや実験は開発中に変更・停止される場合があります。",
      },
      {
        title: "お問い合わせ",
        body: "規約に関するお問い合わせは pixellogic.app@gmail.com までお送りください。",
      },
    ],
  },
  footer: {
    statement: "小さく、丁寧につくる。",
    products: "プロダクト",
    legal: "Legal",
    privacy: "プライバシー",
    terms: "規約",
    contact: "お問い合わせ",
    rights: "All rights reserved.",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, ko, ja };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
