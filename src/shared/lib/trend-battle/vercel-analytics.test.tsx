import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TrendVercelAnalytics } from "./vercel-analytics";

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

describe("TrendVercelAnalytics", () => {
  it("mounts Vercel Web Analytics for PRD metric tracking", () => {
    render(<TrendVercelAnalytics />);

    expect(screen.getByTestId("vercel-analytics")).toBeInTheDocument();
  });
});
