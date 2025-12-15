"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

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
