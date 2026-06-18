import type { Metadata } from "next";
import { createDailyMetadata, DailyPage } from "../../_trend/daily-page";

export const metadata: Metadata = createDailyMetadata("ko");

export default function KoreanDailyChallengePage() {
  return <DailyPage locale="ko" />;
}
