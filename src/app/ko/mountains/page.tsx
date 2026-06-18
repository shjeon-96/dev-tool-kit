import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../../_trend/category-game-page";

export const metadata = createCategoryMetadata("mountains", "ko");

export default function KoreanMountainsPage() {
  return <CategoryGamePage slug="mountains" locale="ko" />;
}
