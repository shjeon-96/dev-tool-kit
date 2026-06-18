import type { Metadata } from "next";
import { trendItems } from "@/entities/trend-item/data/items";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "데이터 출처 | Trend Battle",
  description:
    "Trend Battle의 인구, 흥행 수익, 속도, 산 높이 데이터 출처입니다.",
  slug: "sources",
  locale: "ko",
});

export default function KoreanSourcesPage() {
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
      eyebrow="출처"
      title="데이터 출처"
      description="모든 Trend Battle 항목은 출처명, 출처 URL, 앱 내 업데이트 날짜를 포함합니다."
      locale="ko"
    >
      <p>
        데이터는 정기 업데이트를 염두에 두고 구조화했습니다. 일부 값은 공개
        데이터의 기준 차이 때문에 근사치일 수 있습니다.
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
              앱 업데이트: {source.updatedAt}
            </span>
          </a>
        ))}
      </div>
    </InfoPage>
  );
}
