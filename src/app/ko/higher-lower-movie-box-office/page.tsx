import {
  createSeoPageMetadata,
  SeoContentPage,
} from "../../_trend/seo-content-page";

export const metadata = createSeoPageMetadata(
  "higher-lower-movie-box-office",
  "ko",
);

export default function KoreanHigherLowerMovieBoxOfficePage() {
  return <SeoContentPage slug="higher-lower-movie-box-office" locale="ko" />;
}
