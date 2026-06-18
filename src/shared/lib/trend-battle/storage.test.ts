import { beforeEach, describe, expect, it } from "vitest";
import {
  appendPlayedRound,
  readPlayedRounds,
  readPreferredMode,
  readRecentCategory,
  writePreferredMode,
  writeRecentCategory,
} from "./storage";

describe("trend battle storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("stores and reads the recent category", () => {
    writeRecentCategory("movie_box_office");

    expect(readRecentCategory()).toBe("movie_box_office");
  });

  it("stores and reads the preferred game mode", () => {
    writePreferredMode("classic");

    expect(readPreferredMode()).toBe("classic");
  });

  it("ignores invalid preferred mode data", () => {
    window.localStorage.setItem("trend-battle:preferred-mode", "invalid");

    expect(readPreferredMode()).toBeNull();
    expect(
      window.localStorage.getItem("trend-battle:preferred-mode"),
    ).toBeNull();
  });

  it("appends played rounds newest first with a maximum size", () => {
    for (let index = 0; index < 25; index += 1) {
      appendPlayedRound({
        category: "country_population",
        mode: "duel",
        leftItemId: `left-${index}`,
        rightItemId: `right-${index}`,
        selectedAnswer: "left",
        correctAnswer: "right",
        wasCorrect: false,
        score: index,
        playedAt: index,
      });
    }

    const rounds = readPlayedRounds();

    expect(rounds).toHaveLength(20);
    expect(rounds[0]?.leftItemId).toBe("left-24");
    expect(rounds[19]?.leftItemId).toBe("left-5");
  });

  it("removes invalid played round data at the storage boundary", () => {
    window.localStorage.setItem("trend-battle:played-rounds", "{bad json");

    expect(readPlayedRounds()).toEqual([]);
    expect(
      window.localStorage.getItem("trend-battle:played-rounds"),
    ).toBeNull();
  });
});
