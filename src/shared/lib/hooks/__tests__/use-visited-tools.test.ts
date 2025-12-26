import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useVisitedTools } from "../use-visited-tools";

// Test에서만 사용하는 타입 - entities 의존성 제거
type ToolSlug = string;

describe("useVisitedTools", () => {
  const STORAGE_KEY = "visited-tools";

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset global module state if needed (though we can't easily reset module-level variables like cachedStorageValue)
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("초기 상태는 비어있어야 함", () => {
    const { result } = renderHook(() => useVisitedTools());
    expect(result.current.visitedTools).toEqual([]);
    expect(result.current.uniqueVisitedTools).toEqual([]);
    expect(result.current.visitCount).toBe(0);
  });

  it("도구 방문을 기록하면 상태가 업데이트되어야 함", () => {
    const { result } = renderHook(() => useVisitedTools());

    act(() => {
      result.current.recordVisit("json-formatter" as ToolSlug);
    });

    expect(result.current.visitedTools).toEqual(["json-formatter"]);
    expect(result.current.uniqueVisitedTools).toEqual(["json-formatter"]);
    expect(result.current.visitCount).toBe(1);

    // localStorage 확인
    expect(localStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify(["json-formatter"]),
    );
  });

  it("여러 도구 방문 시 최신 순으로 정렬되어야 함 (중복 허용)", () => {
    const { result } = renderHook(() => useVisitedTools());

    act(() => {
      result.current.recordVisit("json-formatter" as ToolSlug);
    });
    act(() => {
      result.current.recordVisit("jwt-decoder" as ToolSlug);
    });
    act(() => {
      result.current.recordVisit("json-formatter" as ToolSlug);
    });

    // visitedTools는 중복 포함
    expect(result.current.visitedTools).toEqual([
      "json-formatter",
      "jwt-decoder",
      "json-formatter",
    ]);
    // uniqueVisitedTools는 중복 제거 및 최신 순
    expect(result.current.uniqueVisitedTools).toEqual([
      "json-formatter",
      "jwt-decoder",
    ]);
    expect(result.current.visitCount).toBe(3);
  });

  it("기록을 초기화하면 모든 상태가 비워져야 함", () => {
    const { result } = renderHook(() => useVisitedTools());

    act(() => {
      result.current.recordVisit("json-formatter" as ToolSlug);
    });
    expect(result.current.visitCount).toBe(1);

    act(() => {
      result.current.clearVisitedTools();
    });

    expect(result.current.visitedTools).toEqual([]);
    expect(result.current.visitCount).toBe(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("localStorage의 변경사항을 구독해야 함", () => {
    const { result } = renderHook(() => useVisitedTools());

    // 외부에서 localStorage 변경 시뮬레이션
    const newList = ["base64-converter", "hash-generator"];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    // storage 이벤트 발생 시뮬레이션
    act(() => {
      window.dispatchEvent(new Event("storage"));
    });

    expect(result.current.visitedTools).toEqual(newList);
  });
});
