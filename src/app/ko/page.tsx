import type { Metadata } from "next";
import {
  createHomeMetadata,
  RandomGamePage,
} from "../_trend/category-game-page";

export const metadata: Metadata = createHomeMetadata("ko");

export default function KoreanHomePage() {
  return <RandomGamePage locale="ko" />;
}
