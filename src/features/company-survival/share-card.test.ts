import { describe, expect, it } from "vitest";
import { createInitialGameState } from "@/shared/lib/company-survival/game";
import { createResultCardSvg } from "./share-card";

describe("result share card", () => {
  it("renders challenge, score, metrics, and streak into one image source", () => {
    const game = createInitialGameState("2026-07-15", "saas");
    game.turn = 10;
    game.status = "survived";
    const svg = createResultCardSvg({
      locale: "en",
      challengeNumber: 196,
      game,
      streak: 4,
    });
    expect(svg).toContain("RUNWAY 10");
    expect(svg).toContain("#196");
    expect(svg).toContain("CASH 64");
    expect(svg).toContain(">4</text>");
  });
});
