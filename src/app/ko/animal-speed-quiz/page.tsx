import {
  createSeoPageMetadata,
  SeoContentPage,
} from "../../_trend/seo-content-page";

export const metadata = createSeoPageMetadata("animal-speed-quiz", "ko");

export default function KoreanAnimalSpeedQuizPage() {
  return <SeoContentPage slug="animal-speed-quiz" locale="ko" />;
}
