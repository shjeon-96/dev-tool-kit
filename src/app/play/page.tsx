import type { Metadata } from "next";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";
import { RandomGamePage } from "../_trend/category-game-page";

export const metadata: Metadata = createTrendMetadata({
  title: "Higher or Lower Game | Trend Battle",
  description:
    "Start a random Trend Battle round instantly. No login, no setup, just guess which one is bigger.",
  slug: "play",
  locale: "en",
});

export default function PlayPage() {
  return <RandomGamePage />;
}
