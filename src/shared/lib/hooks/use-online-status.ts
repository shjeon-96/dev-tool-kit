"use client";

import {
  useState,
  useEffect,
  useSyncExternalStore,
  useCallback,
  useRef,
} from "react";

/**
 * 브라우저 온라인/오프라인 상태 구독 함수
 */
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

/**
 * 현재 온라인 상태 반환
 */
function getSnapshot() {
  return navigator.onLine;
}

/**
 * SSR 시 기본값 (온라인으로 가정)
 */
function getServerSnapshot() {
  return true;
}

/**
 * 브라우저 온라인/오프라인 상태를 추적하는 훅
 * useSyncExternalStore를 사용하여 hydration mismatch 방지
 */
export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    isOnline,
    isOffline: !isOnline,
  };
}

/**
 * Service Worker 등록 상태 확인 훅
 */
export function useServiceWorkerStatus() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          setIsRegistered(true);
          setIsReady(registration.active !== null);
        }
      });

      // Service Worker 상태 변화 감지
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setIsReady(true);
      });
    }
  }, []);

  return {
    isRegistered,
    isReady,
    isSupported: typeof window !== "undefined" && "serviceWorker" in navigator,
  };
}

/**
 * 오프라인 사용 가능 여부를 종합적으로 판단하는 훅
 */
export function useOfflineReady() {
  const { isOnline } = useOnlineStatus();
  const { isReady: swReady, isSupported } = useServiceWorkerStatus();

  return {
    isOnline,
    isOfflineReady: isSupported && swReady,
    canWorkOffline: isSupported && swReady,
  };
}

/**
 * 네트워크 상태 변경을 감지하고 콜백을 실행하는 훅
 * 오프라인 전환 시 업그레이드 유도 등에 활용
 */
export function useNetworkStatusChange(options?: {
  onOnline?: () => void;
  onOffline?: () => void;
  onStatusChange?: (isOnline: boolean) => void;
}) {
  const { isOnline } = useOnlineStatus();
  const prevStatusRef = useRef<boolean | null>(null);
  const optionsRef = useRef(options);

  // 최신 옵션 유지
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    // 초기 렌더링 시 무시
    if (prevStatusRef.current === null) {
      prevStatusRef.current = isOnline;
      return;
    }

    // 상태가 변경되었을 때만 콜백 실행
    if (prevStatusRef.current !== isOnline) {
      const opts = optionsRef.current;

      if (isOnline) {
        opts?.onOnline?.();
      } else {
        opts?.onOffline?.();
      }

      opts?.onStatusChange?.(isOnline);
      prevStatusRef.current = isOnline;
    }
  }, [isOnline]);

  return { isOnline };
}

/**
 * 오프라인 전환 횟수를 추적하여 업그레이드 유도 타이밍 결정
 */
export function useOfflineUpgradePrompt(options?: {
  promptThreshold?: number; // 오프라인 전환 몇 회 후 프롬프트 표시 (기본값: 2)
  cooldownMs?: number; // 프롬프트 표시 후 재표시까지 대기 시간 (기본값: 24시간)
}) {
  const { promptThreshold = 2, cooldownMs = 24 * 60 * 60 * 1000 } =
    options ?? {};

  const [shouldShowPrompt, setShouldShowPrompt] = useState(false);
  const [offlineCount, setOfflineCount] = useState(0);
  const lastPromptTimeRef = useRef<number>(0);

  const checkAndShowPrompt = useCallback(() => {
    const now = Date.now();
    const timeSinceLastPrompt = now - lastPromptTimeRef.current;

    if (offlineCount >= promptThreshold && timeSinceLastPrompt >= cooldownMs) {
      setShouldShowPrompt(true);
      lastPromptTimeRef.current = now;
    }
  }, [offlineCount, promptThreshold, cooldownMs]);

  const handleOffline = useCallback(() => {
    setOfflineCount((prev) => prev + 1);
  }, []);

  const dismissPrompt = useCallback(() => {
    setShouldShowPrompt(false);
    // localStorage에 마지막 dismiss 시간 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("offline-upgrade-dismissed", Date.now().toString());
    }
  }, []);

  const acceptUpgrade = useCallback(() => {
    setShouldShowPrompt(false);
    // 프라이싱 페이지로 이동하거나 업그레이드 플로우 시작
    if (typeof window !== "undefined") {
      window.location.href = "/pricing";
    }
  }, []);

  // 오프라인 전환 감지
  useNetworkStatusChange({
    onOffline: handleOffline,
  });

  // 오프라인 카운트 변경 시 프롬프트 체크
  useEffect(() => {
    if (offlineCount > 0) {
      checkAndShowPrompt();
    }
  }, [offlineCount, checkAndShowPrompt]);

  // 초기화 시 localStorage에서 마지막 dismiss 시간 복원
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastDismissed = localStorage.getItem("offline-upgrade-dismissed");
      if (lastDismissed) {
        lastPromptTimeRef.current = parseInt(lastDismissed, 10);
      }
    }
  }, []);

  return {
    shouldShowPrompt,
    offlineCount,
    dismissPrompt,
    acceptUpgrade,
  };
}
