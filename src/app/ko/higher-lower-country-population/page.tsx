import {
  createSeoPageMetadata,
  SeoContentPage,
} from "../../_trend/seo-content-page";

export const metadata = createSeoPageMetadata(
  "higher-lower-country-population",
  "ko",
);

export default function KoreanHigherLowerCountryPopulationPage() {
  return <SeoContentPage slug="higher-lower-country-population" locale="ko" />;
}
