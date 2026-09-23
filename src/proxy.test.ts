import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

describe("루트 경로 언어 선택", () => {
  it("언어 우선순위와 q=0을 반영한다", () => {
    const redirect = (language: string) =>
      proxy(
        new NextRequest("https://web-toolkit.app/", {
          headers: { "accept-language": language },
        }),
      ).headers.get("location");

    expect(redirect("ja-JP,ja;q=0.9,ko;q=0.1")).toBe(
      "https://web-toolkit.app/ja",
    );
    expect(redirect("en-US,en;q=0.9,ko;q=0.1")).toBe(
      "https://web-toolkit.app/en",
    );
    expect(redirect("ko;q=0,ja;q=0.8")).toBe("https://web-toolkit.app/ja");
  });
});
