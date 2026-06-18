import {
  createSeoPageMetadata,
  SeoContentPage,
} from "../../_trend/seo-content-page";

export const metadata = createSeoPageMetadata(
  "which-country-has-more-people",
  "ko",
);

export default function KoreanWhichCountryHasMorePeoplePage() {
  return <SeoContentPage slug="which-country-has-more-people" locale="ko" />;
}
