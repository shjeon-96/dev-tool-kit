import type { Locale } from "@/shared/config/site";

export interface PolicySectionContent {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
}

export interface PolicyContent {
  label: string;
  title: string;
  description: string;
  effectiveDate: string;
  sections: readonly PolicySectionContent[];
}

export interface DeletionContent {
  label: string;
  title: string;
  description: string;
  effectiveDate: string;
  stepsTitle: string;
  steps: readonly { title: string; body: string }[];
  scopeTitle: string;
  appScope: {
    title: string;
    badge: string;
    bullets: readonly string[];
    note: string;
  };
  accountScope: {
    title: string;
    badge: string;
    bullets: readonly string[];
    note: string;
  };
  lastAppNotice: string;
  supportTitle: string;
  supportBody: string;
  supportAction: string;
}

interface LegalContent {
  privacy: PolicyContent;
  terms: PolicyContent;
  deletion: DeletionContent;
  homeLink: string;
  footerStatement: string;
}

export const LEGAL_CONTENT: Record<Locale, LegalContent> = {
  ko: {
    homeLink: "픽셀로직 홈",
    footerStatement: "데이터를 다루는 기준을 공개하고 지킵니다.",
    privacy: {
      label: "PRIVACY POLICY",
      title: "개인정보처리방침",
      description:
        "픽셀로직 서비스가 어떤 정보를 왜 처리하고, 사용자가 어떻게 통제할 수 있는지 설명합니다.",
      effectiveDate: "시행일 2026년 8월 26일",
      sections: [
        {
          id: "information",
          title: "수집하는 정보",
          paragraphs: [
            "픽셀로직은 계정과 각 제품의 기능을 제공하는 데 필요한 정보만 처리합니다. 제품마다 필요한 정보가 다르며, 앱 안의 고지는 이 방침과 함께 적용됩니다.",
          ],
          bullets: [
            "계정 정보: 소셜 로그인 제공자의 계정 식별자, 이메일 주소, 제공되는 경우 표시 이름과 프로필 이미지",
            "서비스 정보: 사용하는 앱, 이용 기록, 오류·보안 기록, 기기와 앱 버전 등 운영에 필요한 정보",
            "제품별 정보: 사용자가 직접 입력하거나 기능 이용 중 생성한 데이터. 제품별 스키마와 접근 정책으로 구분",
            "결제 정보: 유료 기능을 사용한 경우 스토어가 발급한 거래·구독 식별 정보. 전체 카드 번호는 픽셀로직이 받지 않음",
          ],
        },
        {
          id: "google-data",
          title: "Google 사용자 데이터",
          paragraphs: [
            "Google 로그인을 선택하면 픽셀로직은 승인 화면에 표시된 범위에서 Google 계정 식별자와 기본 프로필 정보를 받아 계정을 만들거나 기존 계정에 연결합니다.",
            "픽셀로직은 Google 로그인 과정에서 Gmail, Google Drive, Google Calendar의 콘텐츠에 접근하지 않습니다. Google API에서 받은 정보는 가입·로그인·계정 연결, 보안 확인과 사용자 지원에만 사용합니다.",
            "Google API에서 받은 정보의 이용과 다른 앱으로의 이전은 Google API 서비스 사용자 데이터 정책과 Limited Use 요구사항을 준수합니다.",
          ],
          bullets: [
            "접근: 사용자가 Google 로그인을 직접 선택하고 동의한 때에만 진행",
            "저장: 계정 식별과 로그인 유지에 필요한 정보만 인증 시스템에 보관",
            "공유: 판매하지 않으며, 인증·호스팅 등 서비스 제공에 필요한 처리자 외 제3자 광고 목적으로 제공하지 않음",
            "삭제: 앱 안의 계정 및 데이터 삭제 흐름 또는 문의를 통해 요청 가능",
          ],
        },
        {
          id: "purpose",
          title: "이용 목적",
          paragraphs: ["처리한 정보는 다음 목적을 벗어나 사용하지 않습니다."],
          bullets: [
            "계정 생성, 로그인, 앱 간 동일 사용자 확인과 계정 보안",
            "사용자가 선택한 제품 기능 제공과 데이터 동기화",
            "오류 진단, 부정 이용 방지, 사용자 문의 처리",
            "결제 상태 확인과 법적 의무 이행",
          ],
        },
        {
          id: "processors",
          title: "처리 위탁과 공유",
          paragraphs: [
            "픽셀로직은 서비스를 운영하는 데 필요한 범위에서 인증·데이터 호스팅·결제·AI 기능 제공자를 이용할 수 있습니다. 제공자는 픽셀로직의 지시에 따라 정해진 목적에 한해 정보를 처리합니다.",
            "현재 공용 계정과 앱 데이터 인프라는 Supabase를 사용하고, Google 로그인은 Google의 OAuth 서비스를 사용합니다. 유료 결제는 Apple App Store 또는 Google Play가 처리합니다. 제품별 AI 기능과 추가 처리자는 해당 앱의 고지에서 확인할 수 있습니다.",
            "법령상 의무가 있거나 사용자의 생명·안전에 긴급한 보호가 필요한 경우를 제외하고 개인정보를 판매하지 않습니다.",
          ],
        },
        {
          id: "retention",
          title: "보관과 삭제",
          paragraphs: [
            "계정 정보는 계정이 활성 상태인 동안 보관합니다. 사용자가 앱 데이터 또는 전체 계정 삭제를 요청하면 확인된 범위의 데이터를 삭제하거나 복구할 수 없도록 처리합니다.",
            "결제·분쟁·보안 기록처럼 관련 법령 또는 정당한 보안 목적상 보관이 필요한 정보는 필요한 기간 동안 분리 보관한 뒤 삭제합니다. 백업 사본은 통상적인 백업 교체 주기에 따라 제거됩니다.",
            "한 앱의 삭제는 그 앱 멤버십과 데이터만 삭제하고 다른 픽셀로직 앱의 데이터와 로그인 신원은 유지합니다. 마지막 활성 앱을 삭제할 때만 전체 픽셀로직 계정 삭제로 안내합니다.",
          ],
        },
        {
          id: "rights",
          title: "이용자의 권리",
          paragraphs: [
            "사용자는 앱 안에서 자신의 정보 확인·수정·삭제를 요청할 수 있습니다. 로그인할 수 없는 경우 지원 이메일로 문의할 수 있으며, 타인의 정보를 보호하기 위해 계정 소유 확인을 요청할 수 있습니다.",
            "Google 계정 설정에서도 픽셀로직에 부여한 로그인 연결을 해제할 수 있습니다. 연결 해제만으로 픽셀로직에 이미 생성된 앱 데이터가 자동 삭제되지는 않으므로, 데이터 삭제가 필요하면 앱 안의 삭제 기능을 함께 사용해 주세요.",
          ],
        },
        {
          id: "children",
          title: "아동의 정보",
          paragraphs: [
            "아동 대상 기능이 있는 TalkTalk는 성인 보호자가 계정과 동의를 관리합니다. 아이가 직접 소셜 로그인하거나 결제하지 않으며, 아이의 음성 원본과 대화 전사는 영구 저장하지 않는 것을 기본 원칙으로 합니다.",
            "실제 공개 기능과 처리 범위는 TalkTalk 안의 보호자 고지와 동의 화면에서 다시 확인할 수 있습니다.",
          ],
        },
        {
          id: "security",
          title: "보안",
          paragraphs: [
            "픽셀로직은 앱별 데이터 접근 권한, 인증된 요청, 전송 구간 암호화와 운영 접근 제한을 적용합니다. 완전한 보안을 보장할 수는 없지만 문제를 발견하면 영향을 줄이고 사용자에게 필요한 안내를 제공합니다.",
          ],
        },
        {
          id: "changes",
          title: "정책 변경",
          paragraphs: [
            "서비스 또는 법적 요구가 바뀌면 이 방침을 수정할 수 있습니다. 중요한 변경은 시행 전에 홈페이지 또는 앱에서 알리고, 문서 상단의 시행일을 갱신합니다.",
          ],
        },
        {
          id: "contact",
          title: "문의",
          paragraphs: [
            "개인정보 처리, Google 사용자 데이터 또는 권리 행사에 관한 문의는 pixellogic.app@gmail.com으로 보내주세요.",
          ],
        },
      ],
    },
    terms: {
      label: "TERMS OF SERVICE",
      title: "서비스 이용약관",
      description:
        "픽셀로직이 제공하는 앱과 웹 서비스의 이용 조건과 서로의 책임을 설명합니다.",
      effectiveDate: "시행일 2026년 8월 26일",
      sections: [
        {
          id: "service",
          title: "서비스",
          paragraphs: [
            "픽셀로직은 헤아림 사주, TalkTalk, Orbit, SideQuest와 그에 연결된 웹 페이지·계정 기능을 제공합니다. 실제 제공 기능과 대상 지역은 제품별 안내에 따릅니다.",
            "서비스는 개선·보안·법적 요구를 위해 변경되거나 중단될 수 있습니다. 사용자에게 큰 영향을 주는 변경은 가능한 범위에서 미리 알립니다.",
          ],
        },
        {
          id: "account",
          title: "계정",
          paragraphs: [
            "사용자는 정확한 정보를 사용하고 자신의 로그인 수단을 안전하게 관리해야 합니다. 타인의 계정을 사용하거나 접근 권한을 양도해서는 안 됩니다.",
            "픽셀로직 앱들은 로그인 신원을 공유할 수 있지만 제품 데이터와 구매는 앱별로 구분됩니다. 계정 삭제 범위는 요청 전에 앱에서 확인할 수 있습니다.",
          ],
        },
        {
          id: "paid-services",
          title: "유료 서비스",
          paragraphs: [
            "유료 기능, 구독과 인앱 구매의 가격·기간·자동 갱신 조건은 결제 전 앱과 스토어 결제 화면에 표시됩니다. 결제·취소·환불은 Apple App Store 또는 Google Play의 정책과 관련 법령을 따릅니다.",
            "구매 복원 기능이 제공되는 경우 동일한 스토어 계정으로 복원할 수 있습니다.",
          ],
        },
        {
          id: "restrictions",
          title: "이용 제한",
          paragraphs: ["다음 행위는 허용되지 않습니다."],
          bullets: [
            "법령, 타인의 권리 또는 안전을 침해하는 행위",
            "서비스의 보안·안정성을 방해하거나 무단 접근을 시도하는 행위",
            "자동화된 수단으로 과도한 요청을 보내거나 콘텐츠를 무단 복제·배포하는 행위",
            "허위 정보로 계정을 만들거나 타인을 사칭하는 행위",
          ],
        },
        {
          id: "intellectual-property",
          title: "지식재산권",
          paragraphs: [
            "별도 표시가 없는 한 픽셀로직 브랜드, 앱 디자인, 문구와 오리지널 자산의 권리는 픽셀로직에 있습니다. 사용자가 입력한 콘텐츠의 권리는 사용자에게 남지만, 기능 제공에 필요한 범위의 처리 권한을 픽셀로직에 부여합니다.",
          ],
        },
        {
          id: "responsibility",
          title: "책임",
          paragraphs: [
            "픽셀로직은 합리적인 주의로 서비스를 운영하지만 중단 없는 제공이나 모든 결과의 정확성을 보장하지 않습니다. 특히 운세·퀴즈·추천 결과는 오락 또는 참고 목적이며 의료·법률·재정 등 전문 판단을 대신하지 않습니다.",
            "관련 법령이 허용하는 범위에서 간접적·우발적 손해에 대한 책임은 제한될 수 있습니다. 고의 또는 중대한 과실에 대한 책임은 제한하지 않습니다.",
          ],
        },
        {
          id: "changes",
          title: "변경과 종료",
          paragraphs: [
            "약관을 바꾸는 경우 시행일과 중요한 내용을 홈페이지 또는 앱에서 알립니다. 사용자는 언제든 앱 사용을 중단하고 계정 및 데이터 삭제를 요청할 수 있습니다.",
            "중대한 약관 위반이나 서비스 안전을 위협하는 행위가 확인되면 필요한 범위에서 이용을 제한할 수 있으며, 가능한 경우 사유와 이의 제기 방법을 안내합니다.",
          ],
        },
        {
          id: "contact",
          title: "준거와 문의",
          paragraphs: [
            "이 약관은 대한민국 법령에 따라 해석합니다. 서비스 이용에 관한 질문이나 분쟁 조정 요청은 pixellogic.app@gmail.com으로 보내주세요.",
          ],
        },
      ],
    },
    deletion: {
      label: "ACCOUNT & DATA DELETION",
      title: "계정 및 데이터 삭제",
      description: "앱 안에서 삭제 범위를 확인하고 직접 요청할 수 있어요.",
      effectiveDate: "안내 갱신일 2026년 8월 26일",
      stepsTitle: "앱에서 삭제하는 방법",
      steps: [
        {
          title: "앱 설정 열기",
          body: "사용 중인 픽셀로직 앱의 설정 화면을 열어요.",
        },
        {
          title: "계정 및 데이터 삭제 선택",
          body: "계정 또는 개인정보 영역에서 삭제 메뉴를 선택해요.",
        },
        {
          title: "삭제 범위 확인",
          body: "이 앱 데이터와 전체 픽셀로직 계정 중 현재 적용되는 범위를 확인해요.",
        },
        {
          title: "삭제 요청 완료",
          body: "현재 로그인과 소셜 계정 확인을 마치면 앱이 결과를 안내해요.",
        },
      ],
      scopeTitle: "삭제 범위",
      appScope: {
        title: "이 앱 데이터",
        badge: "활성 앱이 더 있을 때",
        bullets: [
          "현재 앱의 멤버십",
          "현재 앱에서 만든 데이터",
          "현재 앱의 설정과 기록",
        ],
        note: "다른 픽셀로직 앱과 공용 로그인 신원은 유지돼요.",
      },
      accountScope: {
        title: "전체 픽셀로직 계정",
        badge: "마지막 활성 앱일 때",
        bullets: [
          "모든 픽셀로직 앱 데이터",
          "공용 로그인 신원",
          "연결된 인증 수단",
        ],
        note: "삭제 후에는 복구할 수 없으며 다시 가입하면 새 데이터로 시작해요.",
      },
      lastAppNotice: "마지막 활성 앱이면 전체 픽셀로직 계정 삭제로 안내합니다.",
      supportTitle: "로그인할 수 없다면 문의하기",
      supportBody:
        "사용 중인 앱 이름과 로그인에 사용한 이메일을 알려주세요. 비밀번호나 인증 코드는 요청하지 않습니다.",
      supportAction: "삭제 지원 이메일 보내기",
    },
  },
  en: {
    homeLink: "PixelLogic home",
    footerStatement: "We publish and follow clear data practices.",
    privacy: {
      label: "PRIVACY POLICY",
      title: "Privacy Policy",
      description:
        "How PixelLogic processes information and how you can control it.",
      effectiveDate: "Effective August 26, 2026",
      sections: [
        {
          id: "information",
          title: "Information we process",
          paragraphs: [
            "PixelLogic processes only the information needed to provide accounts and product features. Product-specific notices apply together with this policy.",
          ],
          bullets: [
            "Account data: provider account identifier, email address, and profile name or image when available",
            "Service data: product used, activity, error and security records, device and app version",
            "Product data: information you provide or create, partitioned by product",
            "Purchase data: store-issued transaction and subscription identifiers; PixelLogic does not receive full card numbers",
          ],
        },
        {
          id: "google-data",
          title: "Google user data",
          paragraphs: [
            "When you choose Google Sign-In, PixelLogic receives the Google account identifier and basic profile information shown on the consent screen to create or connect your account.",
            "PixelLogic does not access Gmail, Google Drive, or Google Calendar content through Google Sign-In. Google API data is used only for registration, sign-in, account linking, security checks, and user support.",
            "PixelLogic’s use and transfer of information received from Google APIs complies with the Google API Services User Data Policy, including Limited Use requirements.",
          ],
          bullets: [
            "Access occurs only after you choose Google Sign-In and consent",
            "Only account data required for authentication is stored",
            "Google user data is not sold or shared for third-party advertising",
            "Deletion can be requested in the app or through support",
          ],
        },
        {
          id: "purpose",
          title: "Purposes",
          paragraphs: ["We use information only for the purposes below."],
          bullets: [
            "Account creation, sign-in, linking, and security",
            "Product features and data synchronization",
            "Diagnostics, abuse prevention, and support",
            "Purchase status and legal obligations",
          ],
        },
        {
          id: "processors",
          title: "Processors and sharing",
          paragraphs: [
            "PixelLogic uses providers for authentication, data hosting, purchases, and product-specific AI features. They process information only to provide those services under our instructions.",
            "Shared account and product infrastructure uses Supabase, Google OAuth provides Google Sign-In, and store purchases are processed by Apple or Google. Product-specific notices identify additional processors.",
            "We do not sell personal information. We disclose information only when required by law or necessary to protect life and safety.",
          ],
        },
        {
          id: "retention",
          title: "Retention and deletion",
          paragraphs: [
            "Account information is retained while the account is active. Verified deletion requests remove or irreversibly de-identify data within the confirmed scope, subject to legal and security retention requirements.",
            "Deleting one app removes only that app’s membership and data. Other PixelLogic apps and the shared sign-in identity remain active. Full account deletion is offered only when deleting the last active app.",
          ],
        },
        {
          id: "rights",
          title: "Your rights",
          paragraphs: [
            "You can review, correct, or delete information in the app. If you cannot sign in, contact support; we may verify account ownership to protect other users.",
            "Revoking PixelLogic access in your Google Account stops the Google connection but does not automatically remove product data already created in PixelLogic. Use the in-app deletion flow when deletion is required.",
          ],
        },
        {
          id: "children",
          title: "Children’s information",
          paragraphs: [
            "For TalkTalk, an adult guardian owns the account and consent. Children do not sign in or pay directly, and child audio and transcripts are not retained permanently by default. The in-product guardian notice explains the active feature scope.",
          ],
        },
        {
          id: "security",
          title: "Security",
          paragraphs: [
            "PixelLogic uses product-level access controls, authenticated requests, encryption in transit, and restricted operational access. If an incident occurs, we work to reduce impact and provide required notice.",
          ],
        },
        {
          id: "changes",
          title: "Changes",
          paragraphs: [
            "We may update this policy as products or legal requirements change. Material changes will be announced before they take effect, and the effective date will be updated.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          paragraphs: [
            "Questions about privacy, Google user data, or your rights can be sent to pixellogic.app@gmail.com.",
          ],
        },
      ],
    },
    terms: {
      label: "TERMS OF SERVICE",
      title: "Terms of Service",
      description: "The conditions for using PixelLogic apps and web services.",
      effectiveDate: "Effective August 26, 2026",
      sections: [
        {
          id: "service",
          title: "Services",
          paragraphs: [
            "PixelLogic provides Haearim Saju, TalkTalk, Orbit, SideQuest, and connected web and account features. Available features and regions are described by each product.",
            "Services may change or be suspended for improvement, security, or legal requirements. We provide advance notice for material changes when practical.",
          ],
        },
        {
          id: "account",
          title: "Accounts",
          paragraphs: [
            "Use accurate information and keep your sign-in methods secure. Do not use or transfer another person’s account.",
            "PixelLogic products may share a sign-in identity, while product data and purchases remain separated. The applicable deletion scope is shown before a request.",
          ],
        },
        {
          id: "paid-services",
          title: "Paid services",
          paragraphs: [
            "Prices, duration, and renewal terms appear before purchase. Apple App Store or Google Play policies and applicable law govern payment, cancellation, and refunds.",
            "Where available, purchases can be restored with the same store account.",
          ],
        },
        {
          id: "restrictions",
          title: "Restrictions",
          paragraphs: ["You may not misuse the services."],
          bullets: [
            "Violate law, rights, or safety",
            "Disrupt security or attempt unauthorized access",
            "Send excessive automated requests or redistribute content without permission",
            "Impersonate others or create accounts with false information",
          ],
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          paragraphs: [
            "PixelLogic owns its brands, product designs, copy, and original assets unless stated otherwise. You retain rights to content you provide and grant the limited permission needed to operate the requested feature.",
          ],
        },
        {
          id: "responsibility",
          title: "Responsibility",
          paragraphs: [
            "PixelLogic operates the services with reasonable care but cannot guarantee uninterrupted availability or every result’s accuracy. Fortune, quiz, and recommendation results are for reference or entertainment and do not replace professional advice.",
            "Liability for indirect or incidental loss may be limited where law allows. Liability for intentional misconduct or gross negligence is not excluded.",
          ],
        },
        {
          id: "changes",
          title: "Changes and termination",
          paragraphs: [
            "We announce material terms changes before they take effect. You can stop using a product and request account or data deletion at any time.",
            "Access may be limited for material violations or threats to service safety, with notice and an appeal path when practical.",
          ],
        },
        {
          id: "contact",
          title: "Governing law and contact",
          paragraphs: [
            "These terms are governed by the laws of the Republic of Korea. Questions can be sent to pixellogic.app@gmail.com.",
          ],
        },
      ],
    },
    deletion: {
      label: "ACCOUNT & DATA DELETION",
      title: "Account & Data Deletion",
      description:
        "Review the deletion scope and submit the request directly in the app.",
      effectiveDate: "Updated August 26, 2026",
      stepsTitle: "Delete from the app",
      steps: [
        {
          title: "Open app settings",
          body: "Open Settings in the PixelLogic app you use.",
        },
        {
          title: "Choose account and data deletion",
          body: "Select the deletion option under account or privacy.",
        },
        {
          title: "Review the scope",
          body: "Confirm whether the request covers this app or the full PixelLogic account.",
        },
        {
          title: "Complete the request",
          body: "Confirm the current sign-in and social account when asked. The app shows the result.",
        },
      ],
      scopeTitle: "Deletion scope",
      appScope: {
        title: "This app’s data",
        badge: "When other apps remain active",
        bullets: [
          "Current app membership",
          "Data created in the current app",
          "Current app settings and history",
        ],
        note: "Other PixelLogic products and the shared sign-in identity remain active.",
      },
      accountScope: {
        title: "Full PixelLogic account",
        badge: "When this is your last active app",
        bullets: [
          "All PixelLogic product data",
          "Shared sign-in identity",
          "Connected authentication methods",
        ],
        note: "Deletion cannot be undone. A later registration starts with new data.",
      },
      lastAppNotice:
        "Deleting your last active app is upgraded to full PixelLogic account deletion.",
      supportTitle: "Can’t sign in?",
      supportBody:
        "Tell us the product name and sign-in email. We never ask for your password or verification code.",
      supportAction: "Email deletion support",
    },
  },
};
