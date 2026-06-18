import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../../_trend/category-game-page";

export const metadata = createCategoryMetadata("cities", "ko");

export default function KoreanCitiesPage() {
  return <CategoryGamePage slug="cities" locale="ko" />;
}
