import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  submit: vi.fn(),
}));
vi.mock("@/features/company-survival/leaderboard", () => ({
  submitVerifiedCompanyResult: mocks.submit,
}));

import { POST } from "./route";

const payload = {
  date: "2026-07-16",
  industry: "saas",
  trait: "builder",
  history: [{ cardId: "ship-core" }],
  playerId: "00000000-0000-4000-8000-000000000001",
};

function request(body: unknown) {
  return new Request("http://localhost/api/company-survival/results", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("company result API", () => {
  beforeEach(() => mocks.submit.mockReset());

  it("rejects malformed identities before replay", async () => {
    const response = await POST(request({ ...payload, playerId: "forged" }));
    expect(response.status).toBe(400);
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("returns 400 for a forged decision history", async () => {
    mocks.submit.mockResolvedValue({
      kind: "invalid",
      error: "Invalid decision history",
    });
    const response = await POST(request(payload));
    expect(response.status).toBe(400);
  });

  it("returns the verified leaderboard result", async () => {
    mocks.submit.mockResolvedValue({
      kind: "verified",
      score: 500,
      percentile: 80,
      total: 10,
    });
    const response = await POST(request(payload));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      score: 500,
      percentile: 80,
      total: 10,
    });
  });
});
