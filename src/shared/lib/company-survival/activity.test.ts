import { describe, expect, it } from "vitest";
import { parseCompanyActivity } from "./activity";

const date = "2026-07-16";
const playerId = "00000000-0000-4000-8000-000000000001";
const referralId = "00000000-0000-4000-8000-000000000002";

describe("company activity payload", () => {
  it("accepts the authoritative activity shapes", () => {
    expect(
      parseCompanyActivity({ event: "session_started", date, playerId }, date),
    ).toEqual({ event: "session_started", date, playerId });
    expect(
      parseCompanyActivity(
        {
          event: "game_started",
          date,
          playerId,
          industry: "saas",
          targetTurns: 6,
          referralId,
        },
        date,
      ),
    ).toMatchObject({ event: "game_started", targetTurns: 6, referralId });
    expect(
      parseCompanyActivity(
        { event: "share_opened", date, playerId, referralId },
        date,
      ),
    ).toMatchObject({ event: "share_opened", referralId });
  });

  it("rejects stale dates and forged fields", () => {
    expect(
      parseCompanyActivity(
        { event: "session_started", date: "2026-07-15", playerId },
        date,
      ),
    ).toBeNull();
    expect(
      parseCompanyActivity(
        {
          event: "game_started",
          date,
          playerId,
          industry: "forged",
          targetTurns: 8,
        },
        date,
      ),
    ).toBeNull();
  });
});
