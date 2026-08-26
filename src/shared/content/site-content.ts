import type { Locale } from "@/shared/config/site";

export interface ProductContent {
  id: "woon" | "talktalk" | "orbit" | "sidequest";
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface HomeContent {
  skip: string;
  nav: {
    products: string;
    principles: string;
    data: string;
    contact: string;
    theme: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  primaryAction: string;
  secondaryAction: string;
  googleNote: string;
  productsLabel: string;
  productsTitle: string;
  productsIntro: string;
  products: readonly ProductContent[];
  principlesLabel: string;
  principlesTitle: string;
  principles: readonly { index: string; title: string; body: string }[];
  dataLabel: string;
  dataTitle: string;
  dataIntro: string;
  dataPoints: readonly { title: string; body: string }[];
  dataLink: string;
  contactLabel: string;
  contactTitle: string;
  contactBody: string;
  contactAction: string;
  footerStatement: string;
}

export const HOME_CONTENT: Record<Locale, HomeContent> = {
  ko: {
    skip: "본문으로 건너뛰기",
    nav: {
      products: "제품",
      principles: "원칙",
      data: "데이터 이용",
      contact: "문의",
      theme: "색상 테마 바꾸기",
    },
    eyebrow: "INDEPENDENT PRODUCT STUDIO · SEOUL",
    title: "작은 호기심을, 오래 쓰는 경험으로.",
    intro:
      "픽셀로직은 일상·배움·관계를 위한 모바일 앱을 직접 만들고 운영합니다.",
    primaryAction: "픽셀로직 제품 보기",
    secondaryAction: "데이터 이용 원칙",
    googleNote: "Google 로그인은 계정 연결에 필요한 범위에서만 사용합니다.",
    productsLabel: "PRODUCT CONSTELLATION",
    productsTitle: "우리가 만들고 있는 경험",
    productsIntro:
      "서로 다른 관심에서 출발한 제품들이 하나의 원칙으로 연결됩니다. 적게 묻고, 분명한 가치를 주고, 사용자의 데이터를 제품보다 앞에 둡니다.",
    products: [
      {
        id: "woon",
        name: "헤아림 사주",
        category: "LIFE · INSIGHT",
        description: "근거를 펼쳐 보여주는 사주 앱",
        image: "/products/woon.png",
        imageAlt: "헤아림 사주의 오늘 운세, 오행 분포와 사주 원국 화면",
      },
      {
        id: "talktalk",
        name: "TalkTalk",
        category: "LEARNING · VOICE",
        description: "AI와 이어가는 안전한 영어 대화",
        image: "/products/talktalk.png",
        imageAlt: "TalkTalk에서 AI 목소리와 영어 문장을 주고받는 통화 화면",
      },
      {
        id: "orbit",
        name: "Orbit",
        category: "RELATIONSHIP · DISCOVERY",
        description: "관계를 발견하는 소셜 퀴즈",
        image: "/products/orbit.png",
        imageAlt: "Orbit에서 친구와의 퀴즈 결과 카드를 만드는 화면",
      },
      {
        id: "sidequest",
        name: "SideQuest",
        category: "DAILY LIFE · ADVENTURE",
        description: "평범한 하루를 작은 모험으로",
        image: "/products/sidequest.jpg",
        imageAlt: "SideQuest에서 주변의 작은 모험을 제안하는 홈 화면",
      },
    ],
    principlesLabel: "HOW WE BUILD",
    principlesTitle: "기능보다 먼저, 쓰는 순간을 설계합니다.",
    principles: [
      {
        index: "01",
        title: "적게 묻습니다",
        body: "첫 가치를 만나기 전 입력과 선택을 줄입니다. 필요한 정보는 필요한 순간에만 요청합니다.",
      },
      {
        index: "02",
        title: "끝맺음을 만듭니다",
        body: "사용 시간을 붙잡는 대신 한 번의 경험이 스스로 완결되도록 설계합니다.",
      },
      {
        index: "03",
        title: "데이터 경계를 지킵니다",
        body: "로그인 신원은 연결하되 제품 데이터는 앱별로 구분하고, 삭제 범위를 사용자가 확인할 수 있게 합니다.",
      },
    ],
    dataLabel: "GOOGLE USER DATA",
    dataTitle: "로그인은 문을 여는 열쇠일 뿐이에요.",
    dataIntro:
      "Google 로그인은 픽셀로직 계정을 만들고 기존 계정에 안전하게 연결하는 데 사용합니다. 승인 화면에 표시된 범위를 넘어 Gmail, Drive, Calendar 같은 Google 제품 데이터에는 접근하지 않습니다.",
    dataPoints: [
      {
        title: "무엇을 받나요?",
        body: "로그인에 필요한 Google 계정 식별자와 기본 프로필 정보를 받습니다.",
      },
      {
        title: "어디에 쓰나요?",
        body: "가입·로그인·계정 연결, 보안 확인과 사용자 지원에만 사용합니다.",
      },
      {
        title: "어떻게 지우나요?",
        body: "각 앱 설정에서 해당 앱 데이터 또는 마지막 앱일 때 전체 계정 삭제 범위를 확인하고 요청할 수 있습니다.",
      },
    ],
    dataLink: "개인정보 처리 기준 전체 보기",
    contactLabel: "CONTACT",
    contactTitle: "제품과 개인정보에 관한 질문을 보내주세요.",
    contactBody:
      "앱 사용, 계정, 개인정보 처리와 협업에 관한 문의를 한 곳에서 받습니다.",
    contactAction: "픽셀로직에 이메일 보내기",
    footerStatement: "사람의 하루에 오래 남는 작은 경험을 만듭니다.",
  },
  en: {
    skip: "Skip to content",
    nav: {
      products: "Products",
      principles: "Principles",
      data: "Data use",
      contact: "Contact",
      theme: "Change color theme",
    },
    eyebrow: "INDEPENDENT PRODUCT STUDIO · SEOUL",
    title: "Small curiosities, built to last.",
    intro:
      "PixelLogic creates and operates mobile products for everyday life, learning, and relationships.",
    primaryAction: "Explore our products",
    secondaryAction: "Read our data principles",
    googleNote:
      "Google Sign-In is used only to connect your PixelLogic account.",
    productsLabel: "PRODUCT CONSTELLATION",
    productsTitle: "Experiences we are building",
    productsIntro:
      "Different curiosities, connected by one approach: ask for less, deliver clear value, and put user data before product convenience.",
    products: [
      {
        id: "woon",
        name: "Haearim Saju",
        category: "LIFE · INSIGHT",
        description: "Korean fortune insights with visible reasoning",
        image: "/products/woon.png",
        imageAlt: "Haearim Saju home screen with daily reading and elements",
      },
      {
        id: "talktalk",
        name: "TalkTalk",
        category: "LEARNING · VOICE",
        description: "A safer AI English conversation for children",
        image: "/products/talktalk.png",
        imageAlt: "TalkTalk AI voice conversation screen",
      },
      {
        id: "orbit",
        name: "Orbit",
        category: "RELATIONSHIP · DISCOVERY",
        description: "A social quiz for discovering relationships",
        image: "/products/orbit.png",
        imageAlt: "Orbit social quiz share studio screen",
      },
      {
        id: "sidequest",
        name: "SideQuest",
        category: "DAILY LIFE · ADVENTURE",
        description: "Turn an ordinary day into a small adventure",
        image: "/products/sidequest.jpg",
        imageAlt: "SideQuest home screen suggesting a nearby adventure",
      },
    ],
    principlesLabel: "HOW WE BUILD",
    principlesTitle: "We design the moment before the feature.",
    principles: [
      {
        index: "01",
        title: "Ask for less",
        body: "We reduce input before the first useful moment and request information only when it becomes necessary.",
      },
      {
        index: "02",
        title: "Create an ending",
        body: "Instead of trapping attention, we design each experience to reach a clear and satisfying completion.",
      },
      {
        index: "03",
        title: "Protect data boundaries",
        body: "Identity can connect products, while product data stays partitioned and deletion scope remains visible to users.",
      },
    ],
    dataLabel: "GOOGLE USER DATA",
    dataTitle: "Sign-in is a key, not the product.",
    dataIntro:
      "Google Sign-In creates or securely connects your PixelLogic account. We do not access Google product data such as Gmail, Drive, or Calendar beyond the scopes shown on the consent screen.",
    dataPoints: [
      {
        title: "What do we receive?",
        body: "The Google account identifier and basic profile information required for sign-in.",
      },
      {
        title: "How is it used?",
        body: "Only for registration, sign-in, account linking, security checks, and user support.",
      },
      {
        title: "How is it deleted?",
        body: "Each app shows whether you are deleting that app’s data or, for your last active app, the full PixelLogic account.",
      },
    ],
    dataLink: "Read the full privacy policy",
    contactLabel: "CONTACT",
    contactTitle: "Questions about a product or your data?",
    contactBody:
      "We handle product, account, privacy, and collaboration inquiries in one place.",
    contactAction: "Email PixelLogic",
    footerStatement: "Small experiences that stay with people.",
  },
};
