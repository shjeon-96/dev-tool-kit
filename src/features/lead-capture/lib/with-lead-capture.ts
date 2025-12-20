"use client";

import { getLeadMagnetForTool } from "../config/magnets";

/**
 * 다운로드 함수를 Lead Capture로 래핑
 *
 * @param toolSlug - 도구 식별자
 * @param downloadFn - 실제 다운로드 함수
 * @param openModal - Lead Capture 모달을 여는 함수
 * @returns 래핑된 다운로드 함수
 */
export function withLeadCapture(
  toolSlug: string,
  downloadFn: () => void,
  openModal: (toolSlug: string, onDownload: () => void) => void,
): () => void {
  // Lead Magnet이 설정된 도구만 Lead Capture 적용
  const leadMagnet = getLeadMagnetForTool(toolSlug);

  if (!leadMagnet) {
    // Lead Magnet이 없으면 바로 다운로드
    return downloadFn;
  }

  return () => {
    openModal(toolSlug, downloadFn);
  };
}

/**
 * React Hook 형태로 사용할 수 있는 withLeadCapture
 */
export function createLeadCaptureDownload(
  toolSlug: string,
  openModal: (toolSlug: string, onDownload: () => void) => void,
) {
  const leadMagnet = getLeadMagnetForTool(toolSlug);

  return (downloadFn: () => void) => {
    if (!leadMagnet) {
      downloadFn();
      return;
    }

    openModal(toolSlug, downloadFn);
  };
}
