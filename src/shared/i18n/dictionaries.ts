import type { Locale } from "@/shared/config/site";

export interface ProductCopy {
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
    play: string;
    about: string;
    menu: string;
    language: string;
  };
  common: { skipToContent: string };
  home: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    proofOne: string;
    proofTwo: string;
    proofThree: string;
    productsEyebrow: string;
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
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: readonly { title: string; body: string }[];
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
    company: string;
    legal: string;
    about: string;
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
      "PixelLogic makes thoughtful apps, games and useful digital products for everyday life.",
  },
  nav: {
    products: "Products",
    play: "Play",
    about: "About",
    menu: "Menu",
    language: "Language",
  },
  common: { skipToContent: "Skip to content" },
  home: {
    eyebrow: "PIXELLOGIC / MADE WITH CARE",
    title: "Small products",
    titleAccent: "for a brighter everyday.",
    intro:
      "We make focused apps, playful games and quiet digital experiences that earn a place in daily life.",
    primaryCta: "See the products",
    secondaryCta: "How we work",
    proofOne: "Apps / games / experiments",
    proofTwo: "Built by PixelLogic",
    proofThree: "Care over noise",
    productsEyebrow: "THE STUDIO SHELF",
    productsTitle: "A few things we are making.",
    productsIntro:
      "Different problems, one shared instinct: make the useful part feel considered.",
    principleEyebrow: "HOW WE BUILD",
    principleTitle: "Clear enough to use. Warm enough to keep.",
    principles: [
      {
        title: "Start with the ordinary",
        body: "The best product ideas often begin with a small friction in a real day.",
      },
      {
        title: "Make the next step obvious",
        body: "We remove noise until the useful action is easy to see and easy to return to.",
      },
      {
        title: "Leave room for feeling",
        body: "Careful motion, friendly detail and honest states make software feel human.",
      },
    ],
    products: [
      {
        name: "Bitemory",
        status: "In the studio",
        description:
          "A gentler way to remember meals, nutrition and the small patterns around them.",
        meta: "APP / EVERYDAY MEMORY",
        accent: "orange",
      },
      {
        name: "Sol Calendar",
        status: "In the studio",
        description:
          "Schedules, tasks and progress brought together in one calmer calendar.",
        meta: "APP / TIME & ROUTINE",
        accent: "blue",
      },
      {
        name: "One Second Run",
        status: "In the studio",
        description:
          "A daily running ritual that grows by one second at a time.",
        meta: "APP / DAILY PRACTICE",
        accent: "green",
      },
      {
        name: "PixelLogic Blocks",
        status: "In the studio",
        description:
          "A focused block puzzle for short sessions, clear choices and satisfying turns.",
        meta: "GAME / SHORT PLAY",
        accent: "orange",
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "Have a small idea worth keeping?",
    contactBody:
      "Tell us what you are making, noticing or trying to make better.",
    contactCta: "Say hello",
  },
  about: {
    eyebrow: "ABOUT PIXELLOGIC",
    title: "A small studio for useful, human software.",
    intro:
      "PixelLogic is an independent product studio exploring the space between everyday utility and quiet delight.",
    sections: [
      {
        title: "What we make",
        body: "Apps that help people remember, plan and keep going. Games that make a few spare minutes feel worthwhile. Small experiments that teach us what to build next.",
      },
      {
        title: "How we work",
        body: "We keep the product surface focused, treat states and accessibility as part of the design, and prefer a small clear idea over a large noisy feature list.",
      },
      {
        title: "Why the name",
        body: "PixelLogic is a balance: warm details on top of dependable systems. Every product should feel welcoming at first touch and trustworthy over time.",
      },
    ],
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
    company: "Studio",
    legal: "Legal",
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

const ko: Dictionary = {
  meta: {
    title: "PixelLogic — 작지만 오래 쓰는 제품을 만들어요",
    description:
      "PixelLogic은 일상에 오래 남는 앱, 게임과 디지털 제품을 만드는 작은 제품 스튜디오예요.",
  },
  nav: {
    products: "제품",
    play: "게임",
    about: "스튜디오",
    menu: "메뉴",
    language: "언어",
  },
  common: { skipToContent: "본문으로 건너뛰기" },
  home: {
    eyebrow: "PIXELLOGIC / MADE WITH CARE",
    title: "작지만 오래 쓰는 제품을",
    titleAccent: "만들어요.",
    intro:
      "일상에 필요한 앱, 잠깐의 시간을 즐겁게 하는 게임, 다음을 배우는 작은 실험을 만들어요.",
    primaryCta: "제품 보기",
    secondaryCta: "만드는 방식",
    proofOne: "앱 / 게임 / 실험",
    proofTwo: "PixelLogic에서 만들어요",
    proofThree: "소음보다 세심함",
    productsEyebrow: "STUDIO SHELF",
    productsTitle: "지금 만들고 있는 것들",
    productsIntro:
      "서로 다른 문제를 풀지만, 유용한 부분이 오래 기억되도록 만든다는 마음은 같아요.",
    principleEyebrow: "HOW WE BUILD",
    principleTitle: "분명하게 쓰고, 따뜻하게 머무는 제품.",
    principles: [
      {
        title: "평범한 하루에서 시작해요",
        body: "좋은 제품은 실제 하루 속 작은 불편을 발견하는 데서 시작해요.",
      },
      {
        title: "다음 행동을 분명하게 해요",
        body: "소음을 덜어내고 지금 필요한 행동이 쉽게 보이도록 만들어요.",
      },
      {
        title: "느낌이 머물 자리를 남겨요",
        body: "세심한 모션과 친절한 상태가 소프트웨어를 사람답게 만들어요.",
      },
    ],
    products: [
      {
        name: "Bitemory",
        status: "만드는 중",
        description:
          "식사와 영양, 그 주변의 작은 패턴을 더 편하게 기억하는 앱이에요.",
        meta: "APP / EVERYDAY MEMORY",
        accent: "orange",
      },
      {
        name: "Sol Calendar",
        status: "만드는 중",
        description:
          "일정과 할 일, 이어지는 기록을 한 곳에서 관리하는 캘린더예요.",
        meta: "APP / TIME & ROUTINE",
        accent: "blue",
      },
      {
        name: "One Second Run",
        status: "만드는 중",
        description: "매일 1초씩 늘어나는 달리기 루틴을 만드는 앱이에요.",
        meta: "APP / DAILY PRACTICE",
        accent: "green",
      },
      {
        name: "PixelLogic Blocks",
        status: "만드는 중",
        description:
          "짧은 시간에도 분명한 선택과 기분 좋은 한 수를 주는 블록 퍼즐이에요.",
        meta: "GAME / SHORT PLAY",
        accent: "orange",
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "오래 남길 작은 아이디어가 있나요?",
    contactBody:
      "만들고 있거나, 발견했거나, 더 나아지게 만들고 싶은 이야기를 들려 주세요.",
    contactCta: "이야기 나누기",
  },
  about: {
    eyebrow: "ABOUT PIXELLOGIC",
    title: "유용하고 사람다운 소프트웨어를 만드는 작은 스튜디오예요.",
    intro:
      "PixelLogic은 일상의 유용함과 조용한 즐거움 사이를 탐색하는 독립 제품 스튜디오예요.",
    sections: [
      {
        title: "무엇을 만들어요",
        body: "기억하고, 계획하고, 계속 나아가도록 돕는 앱을 만들어요. 짧은 시간을 가치 있게 만드는 게임도 만들어요.",
      },
      {
        title: "어떻게 만들어요",
        body: "화면은 분명하게, 상태와 접근성은 처음부터 함께 설계해요. 크고 시끄러운 기능 목록보다 작고 명확한 생각을 믿어요.",
      },
      {
        title: "이름에 담은 뜻",
        body: "PixelLogic은 따뜻한 디테일과 믿을 수 있는 시스템의 균형이에요. 처음엔 반갑고, 오래 쓸수록 든든한 제품을 만들어요.",
      },
    ],
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
        body: "이 사이트는 PixelLogic의 제품과 스튜디오를 소개하는 공간이에요. 개별 앱이나 서비스에 들어가면 제품별 약관이 적용될 수 있어요.",
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
    company: "스튜디오",
    legal: "법적 안내",
    about: "소개",
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
      "PixelLogicは、日々の暮らしに長く残るアプリ、ゲーム、デジタルプロダクトをつくる小さなスタジオです。",
  },
  nav: {
    products: "プロダクト",
    play: "ゲーム",
    about: "スタジオ",
    menu: "メニュー",
    language: "言語",
  },
  common: { skipToContent: "本文へ移動" },
  home: {
    eyebrow: "PIXELLOGIC / MADE WITH CARE",
    title: "小さく、丁寧に",
    titleAccent: "つくる。",
    intro:
      "毎日に役立つアプリ、短い時間を楽しむゲーム、次を学ぶ小さな実験をつくっています。",
    primaryCta: "プロダクトを見る",
    secondaryCta: "つくり方を見る",
    proofOne: "アプリ / ゲーム / 実験",
    proofTwo: "PixelLogicで制作",
    proofThree: "ノイズより丁寧さ",
    productsEyebrow: "STUDIO SHELF",
    productsTitle: "いま、つくっているもの",
    productsIntro:
      "解く課題は違っても、役立つ部分を心地よく残すという考えは共通しています。",
    principleEyebrow: "HOW WE BUILD",
    principleTitle: "明確に使えて、あたたかく残るプロダクト。",
    principles: [
      {
        title: "日常から始める",
        body: "本当に使う一日の小さな不便から、アイデアを始めます。",
      },
      {
        title: "次の行動を明確にする",
        body: "ノイズを減らし、いま必要な行動が見えるようにつくります。",
      },
      {
        title: "気持ちの余白を残す",
        body: "丁寧な動きと親切な状態が、ソフトウェアを人間らしくします。",
      },
    ],
    products: [
      {
        name: "Bitemory",
        status: "制作中",
        description:
          "食事と栄養、その周りの小さなパターンを記録するアプリです。",
        meta: "APP / EVERYDAY MEMORY",
        accent: "orange",
      },
      {
        name: "Sol Calendar",
        status: "制作中",
        description:
          "予定、タスク、続けてきた記録をひとつにまとめるカレンダーです。",
        meta: "APP / TIME & ROUTINE",
        accent: "blue",
      },
      {
        name: "One Second Run",
        status: "制作中",
        description: "毎日1秒ずつ伸びるランニングの習慣をつくるアプリです。",
        meta: "APP / DAILY PRACTICE",
        accent: "green",
      },
      {
        name: "PixelLogic Blocks",
        status: "制作中",
        description:
          "短い時間で、明確な選択と気持ちよい一手を楽しむブロックパズルです。",
        meta: "GAME / SHORT PLAY",
        accent: "orange",
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "残しておきたい小さなアイデアがありますか？",
    contactBody:
      "つくっていること、気づいたこと、もっと良くしたいことを聞かせてください。",
    contactCta: "話しかける",
  },
  about: {
    eyebrow: "ABOUT PIXELLOGIC",
    title: "役立ち、そして人らしいソフトウェアをつくる小さなスタジオです。",
    intro:
      "PixelLogicは、日常の役立ちやすさと静かな楽しさの間を探る独立系プロダクトスタジオです。",
    sections: [
      {
        title: "つくるもの",
        body: "覚える、計画する、続けることを助けるアプリ。短い時間を価値あるものにするゲーム。次を学ぶ小さな実験をつくります。",
      },
      {
        title: "つくり方",
        body: "画面を明確にし、状態とアクセシビリティを最初から設計します。大きく騒がしい機能一覧より、小さく明確な考えを信じています。",
      },
      {
        title: "名前に込めたこと",
        body: "PixelLogicは、あたたかいディテールと信頼できるシステムのバランスです。最初は親しみやすく、長く使うほど安心できるものをつくります。",
      },
    ],
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
        body: "このサイトはPixelLogicのプロダクトとスタジオを紹介する場所です。個別のアプリやサービスでは、プロダクトごとの規約が適用される場合があります。",
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
    company: "スタジオ",
    legal: "Legal",
    about: "概要",
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
