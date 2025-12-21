"use client";

import * as React from "react";
import { AlertTriangle, Chrome, Download, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui/alert-dialog";
import { useFSAccessSupport, useBrowserInfo } from "../detect";

/**
 * BrowserPromptBanner Props
 */
interface BrowserPromptBannerProps {
  /** 배너 표시 여부 제어 (undefined면 자동 감지) */
  show?: boolean;
  /** 닫기 버튼 클릭 시 콜백 */
  onDismiss?: () => void;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 브라우저 호환성 배너
 *
 * Safari/Firefox 사용자에게 Chrome 사용 권장 메시지 표시
 */
export function BrowserPromptBanner({
  show,
  onDismiss,
  className,
}: BrowserPromptBannerProps) {
  const { isSupported, isFallback } = useFSAccessSupport();
  const browser = useBrowserInfo();
  const [dismissed, setDismissed] = React.useState(false);

  // 표시 여부 결정
  const shouldShow = show ?? (!isSupported && isFallback && !dismissed);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (!shouldShow) return null;

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950",
        className,
      )}
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
      <div className="flex-1">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          {browser.name}에서는 일부 기능이 제한됩니다
        </p>
        <p className="mt-0.5 text-amber-700 dark:text-amber-300">
          Chrome 또는 Edge에서 폴더 직접 저장 기능을 사용할 수 있습니다. 현재
          브라우저에서는 ZIP 다운로드로 대체됩니다.
        </p>
      </div>
      <Badge variant="secondary" className="shrink-0">
        <Download className="h-3 w-3" />
        ZIP 다운로드
      </Badge>
      <button
        onClick={handleDismiss}
        className="shrink-0 rounded-md p-1 text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900"
        aria-label="닫기"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/**
 * BrowserPromptDialog Props
 */
interface BrowserPromptDialogProps {
  /** 다이얼로그 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 콜백 */
  onOpenChange: (open: boolean) => void;
  /** ZIP 다운로드 선택 시 콜백 */
  onContinueWithZip?: () => void;
  /** 취소 시 콜백 */
  onCancel?: () => void;
}

/**
 * 브라우저 호환성 다이얼로그
 *
 * 파일 내보내기 전 브라우저 호환성 안내
 */
export function BrowserPromptDialog({
  open,
  onOpenChange,
  onContinueWithZip,
  onCancel,
}: BrowserPromptDialogProps) {
  const browser = useBrowserInfo();

  const handleContinue = () => {
    onContinueWithZip?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            브라우저 호환성 안내
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>
                현재 <strong>{browser.name}</strong>에서는 File System Access
                API가 지원되지 않습니다.
              </p>
              <div className="rounded-md bg-muted p-3">
                <p className="font-medium">사용 가능한 옵션:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>ZIP 파일로 다운로드 (현재 브라우저)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Chrome className="h-4 w-4" />
                    <span>Chrome/Edge에서 폴더 직접 저장</span>
                  </li>
                </ul>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            <Download className="mr-2 h-4 w-4" />
            ZIP으로 다운로드
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * ExportModeSelector Props
 */
interface ExportModeSelectorProps {
  /** 현재 선택된 모드 */
  mode: "folder" | "zip";
  /** 모드 변경 콜백 */
  onModeChange: (mode: "folder" | "zip") => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 내보내기 모드 선택기
 *
 * 사용자가 폴더 저장/ZIP 다운로드 중 선택 가능
 */
export function ExportModeSelector({
  mode,
  onModeChange,
  disabled,
  className,
}: ExportModeSelectorProps) {
  const { isSupported } = useFSAccessSupport();

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant={mode === "folder" ? "default" : "outline"}
        size="sm"
        onClick={() => onModeChange("folder")}
        disabled={disabled || !isSupported}
        className="flex-1"
      >
        <Chrome className="mr-2 h-4 w-4" />
        폴더에 저장
        {!isSupported && (
          <Badge variant="secondary" className="ml-2">
            Chrome 전용
          </Badge>
        )}
      </Button>
      <Button
        variant={mode === "zip" ? "default" : "outline"}
        size="sm"
        onClick={() => onModeChange("zip")}
        disabled={disabled}
        className="flex-1"
      >
        <Download className="mr-2 h-4 w-4" />
        ZIP 다운로드
      </Button>
    </div>
  );
}

/**
 * FSAccessStatus Props
 */
interface FSAccessStatusProps {
  /** 추가 클래스명 */
  className?: string;
}

/**
 * File System Access API 상태 표시
 */
export function FSAccessStatus({ className }: FSAccessStatusProps) {
  const { isSupported, isFallback } = useFSAccessSupport();
  const browser = useBrowserInfo();

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      {isSupported ? (
        <>
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-muted-foreground">
            {browser.name}: 폴더 직접 저장 가능
          </span>
        </>
      ) : isFallback ? (
        <>
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-muted-foreground">
            {browser.name}: ZIP 다운로드 모드
          </span>
        </>
      ) : (
        <>
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-muted-foreground">파일 저장 미지원</span>
        </>
      )}
    </div>
  );
}
