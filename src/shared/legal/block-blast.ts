import { SITE_EMAIL } from "@/shared/config/site";
import type { AppDocument } from "./app-documents";

// 원본: pixellogic-blocks 저장소 privacy-site/index.html (2026-09-13 커밋).
// https://privacy-site-xi-ochre.vercel.app 에 배포된 내용과 같다(2026-09-26 확인).
// 영문은 원본에서 "English summary"로 표시한 요약본이다.
const EFFECTIVE = "2026-09-04";
const UPDATED = "2026-09-08";
const MAIL_HREF = `mailto:${SITE_EMAIL}?subject=PixelLogic%20Blocks`;

export const BLOCK_BLAST_DOCUMENTS: {
  ko: { privacy: AppDocument };
  en: { privacy: AppDocument };
} = {
  ko: {
    privacy: {
      title: "PixelLogic Blocks 개인정보처리방침",
      description:
        "PixelLogic(이하 “운영자”)은 PixelLogic Blocks(이하 “서비스”) 이용자의 개인정보를 중요하게 생각합니다.",
      lead: "PixelLogic(이하 “운영자”)은 PixelLogic Blocks(이하 “서비스”) 이용자의 개인정보를 중요하게 생각합니다. 이 방침은 서비스가 어떤 정보를 처리하고, 왜 처리하며, 이용자가 어떤 선택을 할 수 있는지 설명합니다.",
      effectiveAt: EFFECTIVE,
      updatedAt: UPDATED,
      sections: [
        {
          title: "처리하는 정보",
          body: [
            "기기에 저장하는 게임 기록 · 진행 중인 게임, 최고 점수, 무한·데일리 기록, 사운드 설정과 첫 실행 안내 완료 여부를 기기에 저장합니다. 게임 기록은 서버에 전송하지 않습니다.",
            "게임, 광고 제거 구매와 구매 복원에 별도 회원가입이나 소셜 로그인이 필요하지 않습니다. 연락처, 사진, 정확한 위치, 마이크, 주소록은 요구하지 않습니다.",
          ],
        },
        {
          title: "처리 목적",
          items: [
            "기기에서 게임 진행을 복원하고 최고 기록을 표시",
            "데일리 챌린지를 현지 날짜 기준으로 운영하고 하루 한 번의 플레이를 표시",
            "광고를 제공하고 사용자가 선택한 보상형 광고 부활을 처리",
            "사용자가 선택한 광고 제거 인앱 구매와 구매 복원을 처리",
          ],
        },
        {
          title: "외부 서비스",
          items: [
            "Google Mobile Ads (AdMob): 배너 광고와 보상형 광고를 제공합니다. Google은 광고 제공·측정·사기 방지 등을 위해 기기 식별자, 광고 식별자, 진단 정보와 광고 상호작용 정보를 처리할 수 있습니다. iOS에서는 추적 허용 요청 결과에 따라 개인화 광고가 달라질 수 있습니다. 자세한 내용은 Google 개인정보처리방침을 확인하세요.",
            "RevenueCat: 설치별로 생성한 익명 식별자와 스토어 구매·영수증 정보를 처리해 광고 제거 권한을 확인합니다. 구매와 복원에는 App Store 또는 Google Play 계정이 사용됩니다. 자세한 내용은 RevenueCat 개인정보처리방침을 확인하세요.",
            "Vercel: 이 개인정보처리방침 웹페이지를 호스팅합니다. 게임 점수나 기기 식별자를 Vercel에 전송하지 않습니다.",
          ],
          links: [
            {
              label: "Google 개인정보처리방침",
              href: "https://policies.google.com/privacy",
            },
            {
              label: "RevenueCat 개인정보처리방침",
              href: "https://www.revenuecat.com/privacy",
            },
          ],
        },
        {
          title: "진단 및 사용 통계 선택",
          body: [
            "설정에서 ‘진단 및 사용 통계’를 켠 경우에만 Firebase Crashlytics와 Google Analytics로 오류·충돌 정보, 기기·운영체제·앱 버전, 앱 인스턴스 식별자와 게임 시작·재개·종료·줄 완성·이어하기 이벤트를 전송합니다. 직접 입력한 이름, 이메일, 게임 점수와 보드 내용은 보내지 않으며 분석용 광고 식별자 수집과 광고 개인화는 사용하지 않습니다. 기본값은 꺼짐이며 설정에서 언제든 끌 수 있습니다. 끄면 추가 수집을 중단하고 아직 전송하지 않은 진단을 삭제합니다. 이미 전송한 정보에 관한 요청은 아래 문의처로 보내 주세요.",
            "광고는 Google UMP에서 지역별 동의 상태를 확인한 뒤 요청합니다. 동의 변경이 필요한 지역에서는 설정의 ‘광고 개인정보 설정’에서 선택을 바꿀 수 있습니다.",
          ],
        },
        {
          title: "공유 기능",
          body: [
            "사용자가 데일리 결과 공유를 직접 선택하면 운영체제의 공유 기능으로 점수·날짜가 전달될 수 있습니다. 운영자는 사용자가 공유 기능을 실행한 뒤의 수신자나 공유 서비스의 처리 내용을 통제하지 않습니다.",
          ],
        },
        {
          title: "보관과 삭제",
          body: [
            "기기 기록은 앱 또는 앱 저장소를 삭제하면 제거됩니다. 기기 기록은 다른 기기로 자동 동기화되지 않습니다. 구매 내역은 스토어의 보관 정책에 따르며 앱 삭제로 환불되지 않습니다. 광고 제거는 구매한 스토어 계정으로 설정 → 구매 복원에서 복원할 수 있습니다. 이전 테스트 버전에서 생성한 계정·서버 기록이나 외부 서비스가 처리한 개인정보의 삭제 요청은 아래 문의처로 보내 주세요. 본인 확인 후 해당 범위를 처리하며 다른 PixelLogic 앱의 계정을 임의로 삭제하지 않습니다.",
          ],
        },
        {
          title: "아동의 개인정보",
          body: [
            "서비스는 아동을 대상으로 의도적으로 제공되지 않습니다. 운영자가 법정대리인의 동의 없이 아동의 개인정보를 수집했다고 생각되면 아래 문의처로 알려 주세요.",
          ],
        },
        {
          title: "이용자의 권리",
          body: [
            `이용자는 자신의 개인정보 처리에 관한 문의, 열람, 정정, 삭제 요청을 할 수 있습니다. 요청은 ${SITE_EMAIL}으로 보내 주세요. 비밀번호나 인증 코드를 보내지 마세요.`,
          ],
          links: [{ label: SITE_EMAIL, href: MAIL_HREF }],
        },
        {
          title: "방침 변경",
          body: [
            "법령, 서비스 기능 또는 외부 처리자의 변경에 따라 이 방침을 수정할 수 있습니다. 변경 시 이 페이지의 최종 수정일을 갱신합니다.",
          ],
        },
      ],
    },
  },
  en: {
    privacy: {
      title: "PixelLogic Blocks Privacy Policy",
      description:
        "PixelLogic (“we”) operates PixelLogic Blocks (“the Service”).",
      lead: "PixelLogic (“we”) operates PixelLogic Blocks (“the Service”). This policy explains the information processed by the Service and the choices available to users.",
      effectiveAt: EFFECTIVE,
      updatedAt: UPDATED,
      sections: [
        {
          title: "Information processed",
          items: [
            "Game progress, best scores, daily records, sound preferences, and onboarding state are stored on this device. Game records are not uploaded to a server or automatically synced between devices.",
            "No app account or social sign-in is required for gameplay, purchases, or restoring purchases. We do not request contacts, photos, precise location, microphone, or address book access.",
          ],
        },
        {
          title: "Purposes and providers",
          body: [
            "AdMob provides banner and rewarded ads and may process device or advertising identifiers, diagnostics, and ad interactions for delivery, measurement, and fraud prevention. RevenueCat uses an anonymous installation identifier and store transaction information to verify ad-removal purchases. Purchases and restores use your App Store or Google Play account. Vercel hosts this policy page; the app does not send game records to Vercel.",
          ],
        },
        {
          title: "Optional diagnostics and usage",
          body: [
            "Diagnostics and usage sharing is off by default. If enabled in Settings, Firebase Crashlytics and Google Analytics receive errors and crashes, device/OS/app versions, app-instance identifiers, and events for game start, resume, end, line clearing, and continuing play. We do not send names, email addresses, scores, or board contents. Analytics advertising identifiers and ad personalization are disabled. Turning this option off stops further collection and deletes unsent diagnostics. Contact us below about information already sent.",
            "Ads are requested only after Google UMP verifies the applicable consent status. Where required, use Ad privacy options in Settings to change your choices.",
          ],
        },
        {
          title: "Sharing, retention, and requests",
          body: [
            "Result sharing is initiated by you through the operating system share sheet. Deleting the app or its storage removes local records, but does not refund or delete store purchases. Restore ad removal from Settings → Restore purchases using the store account that made the purchase.",
            `For support, privacy requests, or deletion of records from an earlier test version, contact ${SITE_EMAIL}. We verify the request before handling the relevant records and do not delete accounts for other PixelLogic apps without authorization. Never send passwords or verification codes.`,
          ],
          links: [{ label: SITE_EMAIL, href: MAIL_HREF }],
        },
        {
          title: "Changes",
          body: [
            "We may update this policy when the Service, providers, or applicable law changes. The effective and revision dates at the top of this page will be updated.",
          ],
        },
      ],
    },
  },
};
