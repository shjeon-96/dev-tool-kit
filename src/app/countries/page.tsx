import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../_trend/category-game-page";

export const metadata = createCategoryMetadata("countries");

export default function CountriesPage() {
  return <CategoryGamePage slug="countries" />;
}
