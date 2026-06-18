import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { InfoPage } from "../../_trend/info-page";

export const metadata: Metadata = createTrendMetadata({
  title: "개인정보 처리방침 | Trend Battle",
  description: "Trend Battle 개인정보 처리방침입니다.",
  slug: "privacy",
  locale: "ko",
});

export default function KoreanPrivacyPage() {
  return (
    <InfoPage
      eyebrow="개인정보"
      title="개인정보 처리방침"
      description="Trend Battle은 회원가입 없이 플레이할 수 있으며, 게임 점수는 브라우저에 저장됩니다."
      locale="ko"
    >
      <h2 className="text-xl font-bold text-slate-950">저장하는 정보</h2>
      <p>
        회원가입을 요구하지 않습니다. 최고점과 기본 게임 기록은 사용자의 기기
        localStorage에 저장됩니다.
      </p>
      <h2 className="text-xl font-bold text-slate-950">분석과 광고</h2>
      <p>
        서비스 개선과 운영을 위해 분석 도구와 Google AdSense를 사용할 수
        있습니다. 제3자 제공자는 각자의 정책에 따라 표준 브라우저 정보를 처리할
        수 있습니다.
      </p>
      <h2 className="text-xl font-bold text-slate-950">문의</h2>
      <p>
        개인정보 관련 문의는{" "}
        <a
          className="font-semibold underline"
          href="mailto:pixellogic.app@gmail.com"
        >
          pixellogic.app@gmail.com
        </a>
        으로 보내주세요.
      </p>
    </InfoPage>
  );
}
