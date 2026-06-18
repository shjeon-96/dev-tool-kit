import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../../_trend/category-game-page";

export const metadata = createCategoryMetadata("animals", "ko");

export default function KoreanAnimalsPage() {
  return <CategoryGamePage slug="animals" locale="ko" />;
}
