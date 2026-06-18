import type { Metadata } from "next";
import {
  createHomeMetadata,
  RandomGamePage,
} from "./_trend/category-game-page";

export const metadata: Metadata = createHomeMetadata("en");

export default function HomePage() {
  return <RandomGamePage />;
}
