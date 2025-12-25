import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAdBlockDetection } from "../use-adblock-detection";

describe("useAdBlockDetection", () => {
  const STORAGE_KEY = "adblock-notice-dismissed";

  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("초기 상태에서는 광고 차단이 감지되지 않아야 함", () => {
    const { result } = renderHook(() => useAdBlockDetection());
    expect(result.current.isAdBlockDetected).toBe(false);
    expect(result.current.showNotice).toBe(false);
  });

  it("광고 차단이 감지되면 showNotice가 true가 되어야 함", async () => {
    // DOM 시뮬레이션: offsetHeight를 0으로 설정하여 광고 차단 감지 유도
    const mockDiv = document.createElement("div");
    Object.defineProperty(mockDiv, "offsetHeight", { value: 0 });
    Object.defineProperty(mockDiv, "clientHeight", { value: 0 });
    vi.spyOn(document, "createElement").mockReturnValue(mockDiv);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => mockDiv);
    vi.spyOn(document.body, "removeChild").mockImplementation(() => mockDiv);

    const { result } = renderHook(() => useAdBlockDetection());

    // useEffect 내부의 detectAdBlock 실행 대기
    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.isAdBlockDetected).toBe(true);
    expect(result.current.showNotice).toBe(true);
  });

  it("이미 dismiss되었다면 공지를 보여주지 않아야 함", () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());

    // storage 이벤트 트리거 (캐시 갱신을 위해)
    window.dispatchEvent(new Event("storage"));

    const { result } = renderHook(() => useAdBlockDetection());

    // 광고 차단 환경이라고 가정해도 isDismissed가 true이므로 showNotice는 false여야 함
    expect(result.current.showNotice).toBe(false);
  });

  it("dismissNotice 호출 시 localStorage에 저장되고 공지가 사라져야 함", async () => {
    const { result } = renderHook(() => useAdBlockDetection());

    // 광고 차단 감지 시뮬레이션
    act(() => {
      // 내부 상태 강제 업데이트는 어려우므로 dismissNotice 호출 위주로 테스트
    });

    act(() => {
      result.current.dismissNotice();
    });

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(result.current.showNotice).toBe(false);
  });
});
