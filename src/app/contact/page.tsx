import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "Contact | Trend Battle",
  description: "Contact Trend Battle.",
  slug: "contact",
  locale: "en",
});

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Contact"
      description="Send feedback, data corrections, and partnership questions."
    >
      <p>
        Email{" "}
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
