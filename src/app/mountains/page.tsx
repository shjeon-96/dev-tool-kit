import {
  CategoryGamePage,
  createCategoryMetadata,
} from "../_trend/category-game-page";

export const metadata = createCategoryMetadata("mountains");

export default function MountainsPage() {
  return <CategoryGamePage slug="mountains" />;
}
