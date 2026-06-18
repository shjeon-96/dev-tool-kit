import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { RandomGamePage } from "../../_trend/category-game-page";

export const metadata: Metadata = createTrendMetadata({
  title: "Higher or Lower 랜덤 게임 | Trend Battle",
  description:
    "로그인 없이 바로 시작하는 랜덤 비교 게임입니다. 어느 쪽의 수치가 더 큰지 맞혀보세요.",
  slug: "play",
  locale: "ko",
});

export default function KoreanPlayPage() {
  return <RandomGamePage locale="ko" />;
}
