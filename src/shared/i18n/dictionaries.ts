import { type Locale, type ProductId } from "@/shared/config/site";

export interface ProductCopy {
  id: ProductId;
  name: string;
  status: string;
  description: string;
  meta: string;
  accent: "orange" | "blue" | "green";
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
      "We make focused apps for recording health, organizing time and building habits that last.",
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
        accent: "blue",
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "Live app",
        description:
          "A focused calendar for schedules, tasks and the rhythm of everyday plans.",
        meta: "APP / TIME & ROUTINE",
        accent: "orange",
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "Available now",
        description:
          "A daily running ritual that grows by one second at a time.",
        meta: "APP / DAILY PRACTICE",
        accent: "green",
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
        accent: "blue",
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "배포 중",
        description:
          "일정과 할 일을 정리하고 하루의 리듬을 이어가는 캘린더 앱이에요.",
        meta: "APP / TIME & ROUTINE",
        accent: "orange",
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "스토어에서 만나요",
        description: "매일 1초씩 늘어나는 달리기 루틴을 만드는 앱이에요.",
        meta: "APP / DAILY PRACTICE",
        accent: "green",
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
        accent: "blue",
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "公開中",
        description:
          "予定とタスクを整理し、毎日のリズムを続けるカレンダーアプリです。",
        meta: "APP / TIME & ROUTINE",
        accent: "orange",
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "ストアで配信中",
        description: "毎日1秒ずつ伸びるランニングの習慣をつくるアプリです。",
        meta: "APP / DAILY PRACTICE",
        accent: "green",
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
