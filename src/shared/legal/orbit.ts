import { SITE_EMAIL } from "@/shared/config/site";
import type { AppDocument, AppDocumentKind } from "./app-documents";

// 원본: orbit 저장소 apps/web/src/app/{privacy,terms,support}/page.tsx (2026-09-12).
// 게시 중인 https://orbit.web-toolkit.app 과 같다. 날짜는 각 페이지에 적힌 시행일·갱신일이다.
const PRIVACY_EFFECTIVE = "2026-09-12";
const TERMS_EFFECTIVE = "2026-08-27";
const SUPPORT_UPDATED = "2026-08-27";
const EMAIL_LINK = { label: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` };

export const ORBIT_DOCUMENTS: {
  en: Record<AppDocumentKind, AppDocument>;
} = {
  en: {
    privacy: {
      title: "Privacy Policy",
      description:
        "How Orbit handles account, quiz, result, subscription, analytics, and crash diagnostic data.",
      lead: "Orbit helps people discover who knows them best. This policy explains what we process to provide that experience.",
      effectiveAt: PRIVACY_EFFECTIVE,
      updatedAt: PRIVACY_EFFECTIVE,
      sections: [
        {
          title: "Information we process",
          body: ["Depending on how you use Orbit, we may process:"],
          items: [
            "Account information from the sign-in provider you choose, plus your Orbit display name.",
            "Your profile answers, quiz versions, participant names, submitted answers, scores, and shared result identifiers.",
            "Device, app, and attribution information needed to secure sessions, deliver notifications, and measure product reliability.",
            "Subscription and entitlement status supplied by Apple, Google, and RevenueCat. Orbit does not receive your payment card number.",
            "Analytics events such as quiz creation, quiz completion, sharing, and feature views.",
            "Automatic crash diagnostics, including error messages, stack traces, app and operating-system versions, device and memory information, and installation or session identifiers.",
          ],
        },
        {
          title: "Why we use it",
          body: [
            "We use this information to provide your quizzes and results, keep your account synchronized across devices, deliver requested notifications, process subscriptions, prevent abuse, provide support, and improve reliability and product design.",
          ],
        },
        {
          title: "Service providers",
          body: [
            "Orbit uses infrastructure providers to operate the service, including Supabase for authentication and application data, RevenueCat and the app stores for subscription processing, and Vercel for the public web experience. These providers process information only for the services they provide to Orbit and under their own published terms and privacy policies.",
            "Orbit uses Google Firebase Crashlytics to diagnose crashes and improve app stability. We do not attach your Orbit account identifier, email address, profile answers, or custom activity logs to Crashlytics reports. Automatic reports can still include exception details produced by the app and its software libraries. For details about Firebase’s handling of diagnostic data, see Firebase Privacy and Security.",
          ],
          links: [
            {
              label: "Firebase Privacy and Security",
              href: "https://firebase.google.com/support/privacy",
            },
          ],
        },
        {
          title: "Sharing and public links",
          body: [
            "A quiz or result link is designed to be shared with people you choose. Anyone who receives a public link may be able to view the information included on that page. Do not include sensitive information in a display name or quiz answer.",
          ],
        },
        {
          title: "Retention and deletion",
          body: [
            "We retain information while it is needed to provide Orbit, meet legal obligations, resolve disputes, and enforce our terms. You can request deletion from the Orbit account screen. Orbit deletes the current app membership and its data; when it is the last active membership, the shared account deletion flow may also remove linked PixelLogic account data as described in the confirmation screen.",
          ],
        },
        {
          title: "Your choices",
          body: [
            `You can sign out, manage notification preferences, restore or manage subscriptions through the relevant store, and delete your Orbit account in the app. For privacy questions or requests, email ${SITE_EMAIL}.`,
          ],
          links: [EMAIL_LINK],
        },
        {
          title: "Changes",
          body: [
            "We may update this policy when Orbit or the law changes. The effective date below identifies the current version.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      description:
        "Terms that apply when you use Orbit quizzes, results, sharing, and subscriptions.",
      lead: "These terms describe the rules for using Orbit and the responsibilities that come with sharing quizzes and results.",
      effectiveAt: TERMS_EFFECTIVE,
      updatedAt: TERMS_EFFECTIVE,
      sections: [
        {
          title: "Using Orbit",
          body: [
            "You may use Orbit only when you can enter into a binding agreement under the laws that apply to you. Keep your sign-in credentials secure and provide information that you have the right to share.",
          ],
        },
        {
          title: "Quiz and result content",
          body: [
            "You are responsible for the display names, answers, and other content you submit. Do not upload unlawful, abusive, harassing, discriminatory, privacy-invasive, or infringing content. Do not use Orbit to impersonate another person or to collect information about someone without a legitimate reason.",
          ],
        },
        {
          title: "Sharing",
          body: [
            "Orbit creates links so you can invite people to take a quiz or view a result. You control where you share those links and are responsible for the audience you choose. Anyone with a public link may be able to view the information on it.",
          ],
        },
        {
          title: "Orbit+ subscriptions",
          body: [
            "Orbit+ is an auto-renewable subscription offered through Apple or Google. The price, trial eligibility, renewal date, and local currency shown by the store at purchase control your transaction. You can manage or cancel a subscription through your store account. Orbit unlocks premium features only after the store and Orbit server entitlement confirm the purchase.",
          ],
        },
        {
          title: "Availability and changes",
          body: [
            "We may change, suspend, or discontinue parts of Orbit to maintain, secure, or improve the service. We do not promise that Orbit will be uninterrupted or error-free. Nothing in Orbit is professional, medical, financial, or legal advice.",
          ],
        },
        {
          title: "Termination",
          body: [
            "You may stop using Orbit at any time. We may suspend access when necessary to protect users, the service, or third-party rights. Account deletion and its scope are shown for your confirmation in the app before the request is submitted.",
          ],
        },
        {
          title: "Apple terms",
          body: [
            "When you download Orbit from Apple, Apple’s standard licensed application end user license agreement also applies: Apple Standard EULA.",
          ],
          links: [
            {
              label: "Apple Standard EULA",
              href: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
            },
          ],
        },
        {
          title: "Contact and updates",
          body: [
            `Questions about these terms can be emailed to ${SITE_EMAIL}. We will post updates on this page and revise the effective date.`,
          ],
          links: [EMAIL_LINK],
        },
      ],
    },
    support: {
      title: "How can we help?",
      description:
        "Get help with Orbit quizzes, sharing, sign-in, and Orbit+ subscriptions.",
      lead: "Find quick answers for sign-in, quiz links, results, and Orbit+ subscriptions.",
      updatedAt: SUPPORT_UPDATED,
      sections: [
        {
          title: "Sign-in or account issues",
          body: [
            "Check that you are using the same Apple or Google account you used to create Orbit. If the issue continues, sign out and sign in again before requesting account deletion.",
          ],
        },
        {
          title: "Quiz or result link issues",
          body: [
            "Ask the quiz owner for a new link if a shared page is no longer available. Public links are intentionally separate from the mobile sign-in flow.",
          ],
        },
        {
          title: "Orbit+ purchases",
          body: [
            "Use Restore Purchases in the Orbit+ screen after signing in with the same store account. Orbit+ features unlock only after the store and Orbit server confirm the entitlement.",
          ],
        },
        {
          title: "Contact us",
          body: [
            `For support, privacy requests, or billing questions, email ${SITE_EMAIL} and include the app version and a description of the issue. Do not send passwords, payment details, or authentication codes.`,
          ],
          links: [EMAIL_LINK],
        },
      ],
    },
  },
};
