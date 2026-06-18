import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../_trend/category-game-page";

export const metadata = createCategoryMetadata("movies");

export default function MoviesPage() {
  return <CategoryGamePage slug="movies" />;
}
