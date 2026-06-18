import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../../_trend/category-game-page";

export const metadata = createCategoryMetadata("movies", "ko");

export default function KoreanMoviesPage() {
  return <CategoryGamePage slug="movies" locale="ko" />;
}
