import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "Privacy Policy | Trend Battle",
  description: "Privacy policy for Trend Battle.",
  slug: "privacy",
  locale: "en",
});

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Privacy Policy"
      description="Trend Battle is playable without an account and stores gameplay scores in your browser."
    >
      <h2 className="text-xl font-bold text-slate-950">Information we store</h2>
      <p>
        Trend Battle does not require registration. High scores and basic game
        preferences are stored in localStorage on your device.
      </p>
      <h2 className="text-xl font-bold text-slate-950">Analytics and ads</h2>
      <p>
        The site may use privacy-conscious analytics and Google AdSense to
        measure usage and support the service. Third-party providers may process
        standard browser and device information according to their own policies.
      </p>
      <h2 className="text-xl font-bold text-slate-950">Contact</h2>
      <p>
        For privacy questions, contact{" "}
        <a
          className="font-semibold underline"
          href="mailto:pixellogic.app@gmail.com"
        >
          pixellogic.app@gmail.com
        </a>
        .
      </p>
    </InfoPage>
  );
}
