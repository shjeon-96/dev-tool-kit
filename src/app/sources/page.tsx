import type { Metadata } from "next";
import { trendItems } from "@/entities/trend-item/data/items";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "Data Sources | Trend Battle",
  description:
    "Data sources used by Trend Battle for population, box office, speed, and mountain height comparisons.",
  slug: "sources",
  locale: "en",
});

export default function SourcesPage() {
  const sources = Array.from(
    new Map(
      trendItems.map((item) => [
        `${item.sourceName}:${item.sourceUrl}`,
        {
          name: item.sourceName,
          url: item.sourceUrl,
          updatedAt: item.updatedAt,
        },
      ]),
    ).values(),
  );

  return (
    <InfoPage
      eyebrow="Sources"
      title="Data Sources"
      description="Every Trend Battle item includes a source name, source URL, and update date."
    >
      <p>
        Data is structured for regular updates. Some values are approximate
        because public datasets can use different definitions or reporting
        periods.
      </p>
      <div className="grid gap-3">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-200 p-4 font-semibold text-slate-950 underline"
          >
            {source.name}
            <span className="block pt-1 text-xs font-medium text-slate-500">
              Updated in app: {source.updatedAt}
            </span>
          </a>
        ))}
      </div>
    </InfoPage>
  );
}
