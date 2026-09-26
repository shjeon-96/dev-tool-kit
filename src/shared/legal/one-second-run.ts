import type { AppDocument, AppDocumentKind } from "./app-documents";

// 원본: https://website-navy-gamma-54.vercel.app/privacy, /support 게시본 (2026-09-26 확인).
// running-app 저장소 website/privacy.html·support.html(2026-08-15 커밋)은 게시본보다 새 문구
// (ATT·Your Choices·보존 기간, 배너 광고 삭제)지만 배포되지 않아 사용자가 본 게시본을 옮긴다.
// 개인정보 처리방침은 게시본의 "Last updated: April 25, 2026"을 쓰고, 지원 페이지는 날짜가
// 없어 저장소 support.html의 마지막 커밋 날짜를 쓴다.
const PRIVACY_UPDATED = "2026-04-25";
const SUPPORT_UPDATED = "2026-08-15";

export const ONE_SECOND_RUN_DOCUMENTS: {
  en: Pick<Record<AppDocumentKind, AppDocument>, "privacy" | "support">;
} = {
  en: {
    privacy: {
      title: "One Second Run Privacy Policy",
      description: "Privacy Policy for One Second Run.",
      lead: "Privacy Policy for One Second Run.",
      updatedAt: PRIVACY_UPDATED,
      sections: [
        {
          title: "Overview",
          body: [
            "One Second Run is a running habit timer. The app is designed to work without an account and without collecting location, health, pace, calorie, or contact information.",
          ],
        },
        {
          title: "Data Stored On Device",
          body: [
            "The app stores your start time, daily increase setting, reminder preference, streak, run history, and optional notes locally on your device.",
          ],
        },
        {
          title: "Advertising",
          body: [
            "One Second Run uses Google AdMob. Rewarded ads may be shown before resetting progress, before choosing a new start time, and after completing today's run. A banner ad may appear on the Settings screen. Google may process advertising identifiers and device information according to Google's advertising policies.",
          ],
        },
        {
          title: "Notifications and Live Activities",
          body: [
            "If enabled, the app uses local notifications and Live Activities to show timer progress and reminders. These features are handled on device.",
          ],
        },
        {
          title: "Contact",
          body: [
            "For privacy questions, use the One Second Run support page or the App Store support contact for this app.",
          ],
        },
      ],
    },
    support: {
      title: "Need help with One Second Run?",
      description: "Support for One Second Run.",
      lead: "For app support, bug reports, or App Review questions, use the App Store support contact for One Second Run.",
      updatedAt: SUPPORT_UPDATED,
      sections: [
        {
          title: "What the app does",
          body: [
            "One Second Run helps you complete a simple running or walking timer. Each completed day unlocks tomorrow's goal by one second.",
          ],
        },
        {
          title: "Resetting progress",
          body: [
            "You can reset progress and choose a new start time from Settings. These actions may require watching a rewarded ad. A rewarded ad may also appear after completing today's run.",
          ],
        },
      ],
    },
  },
};
