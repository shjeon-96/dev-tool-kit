import {
  createSeoPageMetadata,
  SeoContentPage,
} from "../../_trend/seo-content-page";

export const metadata = createSeoPageMetadata("mountain-height-quiz", "ko");

export default function KoreanMountainHeightQuizPage() {
  return <SeoContentPage slug="mountain-height-quiz" locale="ko" />;
}
