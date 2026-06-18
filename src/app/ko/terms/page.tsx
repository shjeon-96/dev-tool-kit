import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "이용약관 | Trend Battle",
  description: "Trend Battle 이용약관입니다.",
  slug: "terms",
  locale: "ko",
});

export default function KoreanTermsPage() {
  return (
    <InfoPage
      eyebrow="약관"
      title="이용약관"
      description="Trend Battle은 공개 데이터 기반의 캐주얼 브라우저 게임입니다."
      locale="ko"
    >
      <h2 className="text-xl font-bold text-slate-950">서비스 이용</h2>
      <p>
        Trend Battle은 개인적인 오락과 학습 목적으로 사용할 수 있는 비교
        게임입니다.
      </p>
      <h2 className="text-xl font-bold text-slate-950">데이터 정확성</h2>
      <p>
        값은 공개 출처를 바탕으로 구성되며, 도시 인구나 동물 속도처럼 기준에
        따라 달라질 수 있는 데이터는 근사치일 수 있습니다.
      </p>
      <h2 className="text-xl font-bold text-slate-950">변경</h2>
      <p>
        카테고리, 데이터, 게임 모드, 정책은 제품 개선 과정에서 변경될 수
        있습니다.
      </p>
    </InfoPage>
  );
}
