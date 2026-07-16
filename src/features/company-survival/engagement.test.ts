import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runRedisPipeline: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/shared/lib/redis", () => mocks);

import { recordCompanyActivity, recordVerifiedCompletion } from "./engagement";

const playerId = "00000000-0000-4000-8000-000000000001";

describe("company engagement storage", () => {
  beforeEach(() => mocks.runRedisPipeline.mockReset());

  it("records an exact D1 cohort return with expiring sets", async () => {
    mocks.runRedisPipeline
      .mockResolvedValueOnce([
        { result: null },
        { result: "2026-07-15" },
        { result: 1 },
        { result: 1 },
      ])
      .mockResolvedValueOnce([{ result: 1 }, { result: 1 }]);

    await recordCompanyActivity({
      event: "session_started",
      date: "2026-07-16",
      playerId,
    });

    expect(mocks.runRedisPipeline).toHaveBeenLastCalledWith([
      ["SADD", "runway10:cohort:d1:v1:2026-07-15", playerId],
      ["EXPIRE", "runway10:cohort:d1:v1:2026-07-15", 10_368_000],
    ]);
  });

  it("separates verified completion from experiment starts", async () => {
    mocks.runRedisPipeline.mockResolvedValue([]);
    await recordVerifiedCompletion({
      date: "2026-07-16",
      playerId,
      targetTurns: 6,
    });
    expect(mocks.runRedisPipeline).toHaveBeenCalledWith(
      expect.arrayContaining([
        [
          "SADD",
          "runway10:experiment:run-length:v1:complete:6:2026-07-16",
          playerId,
        ],
      ]),
    );
  });
});
