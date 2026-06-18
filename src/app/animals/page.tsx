import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../_trend/category-game-page";

export const metadata = createCategoryMetadata("animals");

export default function AnimalsPage() {
  return <CategoryGamePage slug="animals" />;
}
