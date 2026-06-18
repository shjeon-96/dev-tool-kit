import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "문의 | Trend Battle",
  description: "Trend Battle 문의 페이지입니다.",
  slug: "contact",
  locale: "ko",
});

export default function KoreanContactPage() {
  return (
    <InfoPage
      eyebrow="문의"
      title="문의"
      description="피드백, 데이터 수정 요청, 제휴 문의를 보내주세요."
      locale="ko"
    >
      <p>
        이메일{" "}
        <a
          className="font-semibold underline"
          href="mailto:pixellogic.app@gmail.com"
        >
          pixellogic.app@gmail.com
        </a>
        으로 연락할 수 있습니다.
      </p>
    </InfoPage>
  );
}
