import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "Terms | Trend Battle",
  description: "Terms of use for Trend Battle.",
  slug: "terms",
  locale: "en",
});

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Terms of Use"
      description="Use Trend Battle as a casual browser game and check source links for data context."
    >
      <h2 className="text-xl font-bold text-slate-950">Use of the service</h2>
      <p>
        Trend Battle is provided as a casual comparison game. You may use the
        site for personal, non-commercial entertainment and learning.
      </p>
      <h2 className="text-xl font-bold text-slate-950">Data accuracy</h2>
      <p>
        Values are collected from public sources and may be approximate,
        especially for categories such as city population or animal speed.
        Source links are provided for context.
      </p>
      <h2 className="text-xl font-bold text-slate-950">Changes</h2>
      <p>
        Categories, data, game modes, and policies may change as the product
        improves.
      </p>
    </InfoPage>
  );
}
