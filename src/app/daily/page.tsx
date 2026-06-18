import type { Metadata } from "next";
import { createDailyMetadata, DailyPage } from "../_trend/daily-page";

export const metadata: Metadata = createDailyMetadata("en");

export default function DailyChallengePage() {
  return <DailyPage />;
}
