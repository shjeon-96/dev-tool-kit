import {
  type Locale,
  type ProductId,
  type ProductLinkKind,
} from "@/shared/config/site";
import {
  GOOGLE_ADS_PRIVACY_URL,
  GOOGLE_ADS_SETTINGS_URL,
} from "@/shared/config/adsense";

export interface ProductCopy {
  id: ProductId;
  name: string;
  status: string;
  description: string;
  meta: string;
  highlights: readonly string[];
  screens: readonly string[];
}

interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    products: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    home: string;
    primary: string;
    process: string;
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
    title: string;
    titleAccent: string;
    intro: string;
    primaryCta: string;
    productsTitle: string;
    productsIntro: string;
    principleTitle: string;
    principles: readonly { title: string; body: string }[];
    products: readonly ProductCopy[];
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
  };
  privacy: {
    title: string;
    updated: string;
    sections: readonly {
      title: string;
      body: string;
      links?: readonly { label: string; href: string }[];
    }[];
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
  process: {
    title: string;
    intro: string;
    scope: string;
    stepsTitle: string;
    steps: readonly { title: string; body: string }[];
    proofTitle: string;
    proof: readonly string[];
    stackTitle: string;
    ctaTitle: string;
    ctaBody: string;
  };
  work: {
    viewDetails: string;
    products: string;
    highlights: string;
    screens: string;
    build: string;
    stack: string;
    platforms: string;
    launched: string;
  };
  footer: {
    nav: string;
    products: string;
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
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    home: "PixelLogic home",
    primary: "Primary navigation",
    process: "How we work",
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
    title: "Small products",
    titleAccent: "for a brighter everyday.",
    intro:
      "We make focused apps for health, routines, play and the small ways people connect.",
    primaryCta: "See the products",
    productsTitle: "A few things you can use.",
    productsIntro: "Real products and public apps, made with the same care.",
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
        highlights: [
          "Log your weight with just a number, then fine-tune it with ±0.1 kg and ±1 kg buttons.",
          "See how your weight changes over a week, a year or all time.",
          "Keep your average, recent change and dated history in one place.",
        ],
        screens: ["Record", "Weight forecast", "Chart", "History"],
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "Live app",
        description:
          "A focused calendar for schedules, tasks and the rhythm of everyday plans.",
        meta: "APP / TIME & ROUTINE",
        highlights: [
          "See holidays and multi-day events at a glance on a monthly calendar.",
          "Keep track of plans with repeating events and reminders, and check off to-dos by priority.",
          "Decorate dates with cat stickers and check your schedule from a home screen widget.",
        ],
        screens: ["Calendar", "Stickers", "To-dos", "Settings"],
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "Available now",
        description:
          "A daily running ritual that grows by one second at a time.",
        meta: "APP / DAILY PRACTICE",
        highlights: [
          "Start at a comfortable time, and each day's target grows by one second.",
          "No GPS, pace charts or account. Just finish today's timer.",
          "Streaks, history, local reminders and a Live Activity timer on the Dynamic Island.",
        ],
        screens: ["Today", "Timer", "History", "Start time"],
      },
      {
        id: "blockBlast",
        name: "PixelLogic Blocks",
        status: "Available now",
        description:
          "An 8×8 block puzzle about placing pieces, clearing lines and keeping a combo.",
        meta: "APP / PUZZLE",
        highlights: [
          "Place blocks on an 8×8 board and clear full rows and columns.",
          "Every ten placements brings a new theme and scoring rule, and longer combos earn bigger bonuses.",
          "Play endless or take one daily challenge, with no account needed.",
        ],
        screens: ["Line clear", "Next pieces", "Personal best"],
      },
      {
        id: "orbit",
        name: "Orbit: Who Knows You?",
        status: "Open on the web",
        description:
          "A playful quiz for sharing questions with friends and discovering how they see you.",
        meta: "WEB / SOCIAL QUIZ",
        highlights: [
          "Answer a few questions and Orbit turns them into a quiz about you.",
          "Share one link. Friends open the quiz directly, with no app or sign-in.",
          "See who knows you best and turn each answer into a conversation.",
        ],
        screens: ["Landing page", "How it works"],
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "Have a small idea worth keeping?",
    contactBody:
      "Tell us what you are making, noticing or trying to make better.",
    contactCta: "Say hello",
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Updated September 23, 2026",
    sections: [
      {
        title: "This website",
        body: "This website presents PixelLogic products and links to their own product surfaces. We do not ask for an account to browse this site.",
      },
      {
        title: "Advertising and cookies",
        body: "This site loads Google AdSense. Google and its advertising partners may use cookies or similar technologies to show and measure ads, including ads based on visits to this and other sites. You can manage personalized Google ads in My Ad Center.",
        links: [
          { label: "Google advertising privacy", href: GOOGLE_ADS_PRIVACY_URL },
          { label: "My Ad Center", href: GOOGLE_ADS_SETTINGS_URL },
        ],
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
  process: {
    title: "How we work",
    intro:
      "We build apps and web products with an AI-assisted workflow, and share a first working result within one week of starting.",
    scope: "iOS and Android apps, and web services.",
    stepsTitle: "What happens when you ask us to build something",
    steps: [
      { title: "Talk", body: "Tell us by email what you want to build." },
      {
        title: "Scope and quote",
        body: "We list the screens and features for the first version and quote from that list.",
      },
      {
        title: "Build",
        body: "We build with an AI-assisted workflow and share a first result you can actually tap through within one week of starting.",
      },
      {
        title: "Review and fix",
        body: "We review the result together and fix what needs fixing.",
      },
      {
        title: "Launch",
        body: "We handle App Store and Google Play submission and review, or deploy to the web.",
      },
      {
        title: "After launch",
        body: "We fix bugs for the period agreed in the quote; ongoing maintenance is arranged separately.",
      },
    ],
    proofTitle: "What we have built and shipped",
    proof: [
      "Four apps released and maintained on the App Store and Google Play.",
      "Three web services deployed: the Weight History and Sol Scheduler web apps, and Orbit.",
      "Our own design system, PixelLogic UI, used by this site and Sol Scheduler.",
      "This site and PixelLogic Blocks support English, Korean and Japanese.",
    ],
    stackTitle: "Tools we use",
    ctaTitle: "Have something you want to build?",
    ctaBody:
      "Send us the idea as it is. We will start by sorting out the scope together.",
  },
  work: {
    viewDetails: "View details",
    products: "Products",
    highlights: "What it does",
    screens: "Screens",
    build: "How it's built",
    stack: "Stack",
    platforms: "Platforms",
    launched: "Launched",
  },
  footer: {
    nav: "Site links",
    products: "Products",
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
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    language: "언어",
    home: "PixelLogic 홈",
    primary: "주 메뉴",
    process: "진행 방식",
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
    title: "작지만 오래 쓰는 제품을",
    titleAccent: "만들어요.",
    intro:
      "건강을 기록하고, 시간을 정리하고, 좋은 습관을 이어가도록 돕는 앱을 만들어요.",
    primaryCta: "제품 보기",
    productsTitle: "지금 만날 수 있는 제품들",
    productsIntro: "실제 배포된 PixelLogic 앱과 디지털 제품들이에요.",
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
        highlights: [
          "숫자만 입력하면 바로 기록되고, ±0.1kg·±1kg 버튼으로 빠르게 고쳐요.",
          "1주일부터 1년, 전체 기간까지 몸무게 변화를 그래프로 봐요.",
          "평균 체중, 최근 변화량, 날짜별 기록을 한곳에서 관리해요.",
        ],
        screens: ["기록", "체중 예측", "차트", "히스토리"],
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "배포 중",
        description:
          "일정과 할 일을 정리하고 하루의 리듬을 이어가는 캘린더 앱이에요.",
        meta: "APP / TIME & ROUTINE",
        highlights: [
          "월간 달력에서 공휴일과 여러 날에 걸친 일정을 한눈에 봐요.",
          "반복 일정과 알림으로 중요한 약속을 챙기고, 할 일은 우선순위대로 체크해요.",
          "고양이 스티커로 날짜를 꾸미고, 홈 화면 위젯에서 일정을 확인해요.",
        ],
        screens: ["달력", "스티커", "할 일", "설정"],
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "스토어에서 만나요",
        description: "매일 1초씩 늘어나는 달리기 루틴을 만드는 앱이에요.",
        meta: "APP / DAILY PRACTICE",
        highlights: [
          "편한 시간으로 시작하면 다음 날 목표가 1초씩 늘어나요.",
          "GPS, 페이스 차트, 계정 없이 오늘의 타이머만 끝내면 돼요.",
          "연속 기록과 히스토리, 알림, Dynamic Island의 Live Activity 타이머를 지원해요.",
        ],
        screens: ["오늘", "타이머", "기록", "시작 시간"],
      },
      {
        id: "blockBlast",
        name: "PixelLogic Blocks",
        status: "스토어에서 만나요",
        description:
          "블록을 놓고 줄을 지우며 콤보를 이어가는 8×8 퍼즐 게임이에요.",
        meta: "APP / PUZZLE",
        highlights: [
          "8×8 보드에 블록을 놓고 가로줄과 세로줄을 지워요.",
          "10번 배치할 때마다 테마와 배점 규칙이 바뀌고, 콤보가 이어질수록 보너스가 커져요.",
          "무한 모드와 하루 한 번의 데일리 도전이 있고, 회원가입 없이 바로 즐겨요.",
        ],
        screens: ["줄 지우기", "다음 조각", "최고 기록"],
      },
      {
        id: "orbit",
        name: "Orbit: Who Knows You?",
        status: "웹에서 만나요",
        description:
          "친구에게 퀴즈를 보내고 서로가 나를 어떻게 보는지 알아가는 서비스예요.",
        meta: "WEB / SOCIAL QUIZ",
        highlights: [
          "몇 가지 질문에 답하면 나에 대한 퀴즈가 만들어져요.",
          "링크 하나로 친구에게 보내면, 친구는 앱이나 로그인 없이 바로 풀어요.",
          "누가 나를 가장 잘 아는지 확인하고, 답을 새로운 대화로 이어가요.",
        ],
        screens: ["소개 페이지", "이용 방법"],
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "오래 남길 작은 아이디어가 있나요?",
    contactBody:
      "만들고 있거나, 발견했거나, 더 나아지게 만들고 싶은 이야기를 들려 주세요.",
    contactCta: "이야기 나누기",
  },
  privacy: {
    title: "개인정보처리방침",
    updated: "2026년 9월 23일 업데이트",
    sections: [
      {
        title: "이 웹사이트",
        body: "이 사이트는 PixelLogic 제품을 소개하고 각 제품 화면으로 연결하는 쇼케이스예요. 사이트를 둘러보기 위해 계정이 필요하지 않아요.",
      },
      {
        title: "광고와 쿠키",
        body: "이 사이트는 Google AdSense를 불러와요. Google과 광고 파트너는 이 사이트나 다른 사이트의 방문 기록을 바탕으로 광고를 제공하고 측정하기 위해 쿠키 등의 기술을 사용할 수 있어요. Google 맞춤 광고는 내 광고 센터에서 관리할 수 있어요.",
        links: [
          { label: "Google 광고 개인정보 안내", href: GOOGLE_ADS_PRIVACY_URL },
          { label: "내 광고 센터", href: GOOGLE_ADS_SETTINGS_URL },
        ],
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
  process: {
    title: "이렇게 만들어요",
    intro:
      "앱과 웹을 AI 워크플로우로 빠르게 만들고, 착수 후 1주 안에 첫 결과물을 보여 드려요.",
    scope: "iOS·Android 앱과 웹 서비스를 만들어요.",
    stepsTitle: "의뢰하면 이렇게 진행돼요",
    steps: [
      { title: "상담", body: "숨고 메시지나 메일로 만들고 싶은 것을 들어요." },
      {
        title: "범위 정리와 견적",
        body: "첫 버전에 넣을 화면과 기능을 목록으로 정리하고, 그 목록으로 견적을 드려요.",
      },
      {
        title: "개발",
        body: "AI 워크플로우로 만들고, 착수 후 1주 안에 실제로 눌러 볼 수 있는 첫 결과물을 공유해요.",
      },
      { title: "검수와 수정", body: "결과물을 함께 확인하고 고쳐요." },
      {
        title: "출시",
        body: "App Store·Google Play 등록과 심사 대응, 또는 웹 배포까지 해요.",
      },
      {
        title: "출시 뒤",
        body: "견적 때 정한 기간 동안 버그를 고치고, 이후 유지보수는 따로 협의해요.",
      },
    ],
    proofTitle: "직접 만들고 출시했어요",
    proof: [
      "App Store와 Google Play에 앱 4개를 출시해 운영하고 있어요.",
      "웹 서비스 3개를 배포했어요. Weight History·Sol Scheduler 웹 앱과 Orbit이에요.",
      "자체 디자인 시스템(PixelLogic UI)을 만들어 이 사이트와 Sol Scheduler에 쓰고 있어요.",
      "이 사이트와 PixelLogic Blocks는 한국어·영어·일본어를 지원해요.",
    ],
    stackTitle: "쓰는 기술",
    ctaTitle: "만들고 싶은 게 있나요?",
    ctaBody: "생각하신 그대로 보내 주세요. 범위 정리부터 같이 시작해요.",
  },
  work: {
    viewDetails: "자세히 보기",
    products: "제품",
    highlights: "이런 일을 해요",
    screens: "화면",
    build: "만든 방식",
    stack: "기술",
    platforms: "플랫폼",
    launched: "출시",
  },
  footer: {
    nav: "사이트 링크",
    products: "제품",
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
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    language: "言語",
    home: "PixelLogic ホーム",
    primary: "メインナビゲーション",
    process: "進め方",
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
    title: "小さく、丁寧に",
    titleAccent: "つくる。",
    intro:
      "健康を記録し、時間を整え、続く習慣をつくるためのアプリをつくっています。",
    primaryCta: "プロダクトを見る",
    productsTitle: "いま使えるプロダクト",
    productsIntro:
      "実際に公開しているPixelLogicのアプリとデジタルプロダクトです。",
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
        highlights: [
          "数字を入れるだけで記録でき、±0.1kg・±1kgボタンで素早く調整できます。",
          "1週間から1年、全期間まで体重の変化をグラフで確認できます。",
          "平均体重、最近の変化、日付ごとの記録をまとめて管理できます。",
        ],
        screens: ["記録", "体重予測", "グラフ", "履歴"],
      },
      {
        id: "solScheduler",
        name: "Sol Scheduler",
        status: "公開中",
        description:
          "予定とタスクを整理し、毎日のリズムを続けるカレンダーアプリです。",
        meta: "APP / TIME & ROUTINE",
        highlights: [
          "月間カレンダーで祝日や複数日にわたる予定をひと目で確認できます。",
          "繰り返し予定と通知で大切な約束を忘れず、やることは優先度順にチェックできます。",
          "猫のステッカーで日付を飾り、ホーム画面のウィジェットで予定を確認できます。",
        ],
        screens: ["カレンダー", "ステッカー", "やること", "設定"],
      },
      {
        id: "oneSecondRun",
        name: "One Second Run",
        status: "ストアで配信中",
        description: "毎日1秒ずつ伸びるランニングの習慣をつくるアプリです。",
        meta: "APP / DAILY PRACTICE",
        highlights: [
          "無理のない時間から始めると、翌日の目標が1秒ずつ伸びます。",
          "GPSもペースグラフもアカウントも不要。今日のタイマーを終えるだけです。",
          "連続記録と履歴、ローカル通知、Dynamic IslandのLive Activityタイマーに対応しています。",
        ],
        screens: ["今日", "タイマー", "履歴", "開始時間"],
      },
      {
        id: "blockBlast",
        name: "PixelLogic Blocks",
        status: "ストアで配信中",
        description:
          "ブロックを置き、ラインを消しながらコンボをつなぐ8×8パズルです。",
        meta: "APP / PUZZLE",
        highlights: [
          "8×8のボードにブロックを置いて、縦横のラインを消します。",
          "10回配置するごとにテーマと得点ルールが変わり、コンボが続くほどボーナスが増えます。",
          "エンドレスと1日1回のデイリー挑戦があり、会員登録なしですぐ遊べます。",
        ],
        screens: ["ライン消去", "次のピース", "ベスト記録"],
      },
      {
        id: "orbit",
        name: "Orbit: Who Knows You?",
        status: "ウェブで公開中",
        description:
          "友だちにクイズを送り、お互いがどう見ているかを楽しむサービスです。",
        meta: "WEB / SOCIAL QUIZ",
        highlights: [
          "いくつかの質問に答えると、あなたについてのクイズができます。",
          "リンクひとつで友だちに送れて、友だちはアプリやログインなしですぐ解けます。",
          "誰があなたを一番よく知っているかを確かめ、答えを新しい会話につなげます。",
        ],
        screens: ["紹介ページ", "使い方"],
      },
    ],
    contactEyebrow: "START A CONVERSATION",
    contactTitle: "残しておきたい小さなアイデアがありますか？",
    contactBody:
      "つくっていること、気づいたこと、もっと良くしたいことを聞かせてください。",
    contactCta: "話しかける",
  },
  privacy: {
    title: "プライバシーポリシー",
    updated: "2026年9月23日更新",
    sections: [
      {
        title: "このサイト",
        body: "このサイトはPixelLogicのプロダクトを紹介し、それぞれのプロダクトへ案内するショーケースです。閲覧にアカウントは必要ありません。",
      },
      {
        title: "広告と Cookie",
        body: "このサイトでは Google AdSense を読み込みます。Google と広告パートナーは、このサイトや他のサイトへの訪問に基づく広告の表示と効果測定のため、Cookie などの技術を使用する場合があります。Google のパーソナライズ広告はマイ アド センターで管理できます。",
        links: [
          {
            label: "Google の広告とプライバシー",
            href: GOOGLE_ADS_PRIVACY_URL,
          },
          { label: "マイ アド センター", href: GOOGLE_ADS_SETTINGS_URL },
        ],
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
  process: {
    title: "つくり方",
    intro:
      "アプリとWebをAIワークフローで素早くつくり、着手から1週間以内に最初の成果物をお見せします。",
    scope: "iOS・Androidアプリと、Webサービスをつくります。",
    stepsTitle: "ご依頼からの流れ",
    steps: [
      { title: "相談", body: "つくりたいものをメールでお聞かせください。" },
      {
        title: "範囲の整理と見積もり",
        body: "最初のバージョンに入れる画面と機能を一覧にまとめ、その一覧で見積もりを出します。",
      },
      {
        title: "開発",
        body: "AIワークフローでつくり、着手から1週間以内に実際に触れる最初の成果物を共有します。",
      },
      { title: "確認と修正", body: "成果物を一緒に確認し、直します。" },
      {
        title: "リリース",
        body: "App Store・Google Playへの登録と審査対応、またはWebへの公開まで行います。",
      },
      {
        title: "リリース後",
        body: "見積もりで決めた期間はバグを修正し、その後の保守は別途ご相談します。",
      },
    ],
    proofTitle: "自分たちでつくり、リリースしてきたもの",
    proof: [
      "App StoreとGoogle Playで4つのアプリをリリースし、運営しています。",
      "3つのWebサービスを公開しています。Weight History・Sol SchedulerのWebアプリとOrbitです。",
      "独自のデザインシステム(PixelLogic UI)をつくり、このサイトとSol Schedulerで使っています。",
      "このサイトとPixelLogic Blocksは日本語・英語・韓国語に対応しています。",
    ],
    stackTitle: "使っている技術",
    ctaTitle: "つくりたいものはありますか?",
    ctaBody: "考えているままお送りください。範囲の整理から一緒に始めます。",
  },
  work: {
    viewDetails: "詳しく見る",
    products: "プロダクト",
    highlights: "できること",
    screens: "画面",
    build: "つくり方",
    stack: "技術",
    platforms: "プラットフォーム",
    launched: "リリース",
  },
  footer: {
    nav: "サイトリンク",
    products: "プロダクト",
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

export function productLinkLabels(
  dictionary: Dictionary,
): Record<ProductLinkKind, string> {
  return {
    appStore: dictionary.common.appStore,
    googlePlay: dictionary.common.googlePlay,
    web: dictionary.common.webApp,
    publicPage: dictionary.common.publicPage,
  };
}
