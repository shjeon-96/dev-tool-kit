import type { AppDocument, AppDocumentKind } from "./app-documents";

// 원본: running-app 저장소 website/privacy.html·support.html (HEAD, 2026-08-15 커밋).
// 사용자가 저장소 최신본을 게시하기로 해, 예전 게시본(website-navy-gamma-54.vercel.app,
// "Last updated: April 25, 2026")을 대체한다. 개인정보 처리방침은 원본의
// "Last updated: August 13, 2026"을 쓰고, 지원 페이지는 날짜가 없어 support.html의
// 마지막 커밋 날짜를 쓴다.
const PRIVACY_UPDATED = "2026-08-13";
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
            "One Second Run is a running habit timer. The app is designed to work without an account and without route tracking, precise GPS, health, pace, calorie, or contact information.",
          ],
        },
        {
          title: "Data Stored On Device",
          body: [
            "The app stores your start time, daily increase setting, reminder preference, streak, run history, and optional notes locally on your device.",
            "Run history and current progress are kept until you reset progress or remove the app. Other app settings remain until you remove the app. Resetting progress in Settings deletes run history and current progress. Removing the app deletes the remaining app data from the device. One Second Run has no account or server copy from which this data can be recovered.",
          ],
        },
        {
          title: "Advertising",
          body: [
            "One Second Run uses Google AdMob. Rewarded ads may be shown before resetting progress, before choosing a new start time, and after completing today's run. Google may process advertising identifiers, device information, approximate location derived from IP address, ad interaction data, and diagnostic information according to Google's advertising policies.",
            "On first launch the app asks for permission through Apple's App Tracking Transparency framework before the advertising identifier (IDFA) is used for tracking. If permission is denied, the app still works and ads are still shown, but they are not personalised using the advertising identifier. You can change this at any time in Settings › Privacy & Security › Tracking.",
            "Where required, Google's consent form asks for your advertising choices before ads are requested and makes privacy options available in the app. Advertising data is handled by Google under the Google Privacy Policy, including Google's security safeguards, retention practices, and privacy controls. One Second Run does not receive a copy of your on-device run history through AdMob.",
          ],
          links: [
            {
              label: "Google Privacy Policy",
              href: "https://policies.google.com/privacy",
            },
          ],
        },
        {
          title: "Your Choices",
          body: [
            "You can withdraw iOS tracking permission at any time in Settings › Privacy & Security › Tracking. You can disable notifications in system Settings. These choices do not prevent use of the timer or locally stored run history.",
            "To delete run history and current progress, use Reset and choose start time in the app's Settings screen. To delete all locally stored app data, remove the app from your device. For Google's advertising data and controls, use the privacy tools linked from the Google Privacy Policy above.",
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
            "Resetting deletes run history and current progress, but keeps app settings. To delete all locally stored app data, remove the app from your device. There is no account or server backup to restore.",
          ],
        },
      ],
    },
  },
};
