import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { CategoryLinks, InfoPage } from "../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "About | Trend Battle",
  description:
    "Trend Battle is a fast comparison game where users guess which item has the bigger number.",
  slug: "about",
  locale: "en",
});

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="A quick comparison game for short breaks."
      description="Trend Battle starts immediately, asks one simple question, and reveals the real values after every answer."
    >
      <p>
        Trend Battle is a global higher-or-lower style web game. It compares
        public data across countries, cities, movies, animals, and mountains so
        players can make a quick guess without creating an account.
      </p>
      <p>
        The product is designed for short mobile sessions: no login, no setup,
        no complicated quiz rules. Score and best score are stored locally in
        the browser.
      </p>
      <CategoryLinks locale="en" />
    </InfoPage>
  );
}
