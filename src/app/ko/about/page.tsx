import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { CategoryLinks, InfoPage } from "../../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "소개 | Trend Battle",
  description:
    "Trend Battle은 어느 항목의 수치가 더 큰지 맞히는 빠른 비교 게임입니다.",
  slug: "about",
  locale: "ko",
});

export default function KoreanAboutPage() {
  return (
    <InfoPage
      eyebrow="소개"
      title="짧은 쉬는 시간에 바로 즐기는 비교 게임"
      description="Trend Battle은 접속하자마자 문제를 보여주고, 선택 후 실제 수치를 바로 공개합니다."
      locale="ko"
    >
      <p>
        Trend Battle은 글로벌 Higher or Lower 스타일의 웹게임입니다. 국가, 도시,
        영화, 동물, 산 데이터를 비교하며 로그인 없이 바로 플레이할 수 있습니다.
      </p>
      <p>
        모바일에서 짧게 즐기는 흐름에 맞춰 만들었습니다. 점수와 최고점은
        브라우저 localStorage에 저장됩니다.
      </p>
      <CategoryLinks locale="ko" />
    </InfoPage>
  );
}
