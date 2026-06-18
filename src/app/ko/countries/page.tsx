import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../../_trend/category-game-page";

export const metadata = createCategoryMetadata("countries", "ko");

export default function KoreanCountriesPage() {
  return <CategoryGamePage slug="countries" locale="ko" />;
}
