import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../_trend/category-game-page";

export const metadata = createCategoryMetadata("cities");

export default function CitiesPage() {
  return <CategoryGamePage slug="cities" />;
}
