"use client";

import React, { useState } from "react";
import { Player } from "@remotion/player";
import { ToolDemoComposition } from "../compositions/tool-demo";
import { getToolTheme } from "../lib/types";
import type { ToolSlug } from "@/entities/tool";

// ============================================
// Video Player Component
// ============================================

interface VideoPlayerProps {
  toolSlug: ToolSlug;
  toolName: string;
  toolDescription: string;
  /** 화면 비율 */
  aspectRatio?: "16:9" | "1:1" | "9:16";
  /** 자동 재생 */
  autoPlay?: boolean;
  /** 반복 재생 */
  loop?: boolean;
  /** 컨트롤 표시 */
  showControls?: boolean;
  /** 클래스명 */
  className?: string;
}

/**
 * 도구 데모 비디오 플레이어
 * Remotion Player를 래핑하여 도구별 비디오 미리보기 제공
 */
export function VideoPlayer({
  toolSlug,
  toolName,
  toolDescription,
  aspectRatio = "16:9",
  autoPlay = false,
  loop = true,
  showControls = true,
  className,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const theme = getToolTheme(toolSlug);

  // 화면 비율에 따른 크기 설정
  const dimensions = {
    "16:9": { width: 1920, height: 1080 },
    "1:1": { width: 1080, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
  }[aspectRatio];

  // 컨테이너 스타일 (반응형)
  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    paddingBottom:
      aspectRatio === "16:9"
        ? "56.25%"
        : aspectRatio === "1:1"
          ? "100%"
          : "177.78%",
    backgroundColor: "#f3f4f6",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const playerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div className={className} style={containerStyle}>
      <Player
        component={ToolDemoComposition}
        inputProps={{
          toolSlug,
          toolName,
          toolDescription,
          inputExample: theme.inputExample,
          outputExample: theme.outputExample,
          primaryColor: theme.primary,
          secondaryColor: theme.secondary,
          iconText: theme.icon,
        }}
        durationInFrames={180}
        fps={30}
        compositionWidth={dimensions.width}
        compositionHeight={dimensions.height}
        style={playerStyle}
        autoPlay={isPlaying}
        loop={loop}
        controls={showControls}
        clickToPlay
        showVolumeControls={false}
        spaceKeyToPlayOrPause
      />
    </div>
  );
}

// ============================================
// Video Thumbnail Component
// ============================================

interface VideoThumbnailProps {
  toolSlug: ToolSlug;
  toolName: string;
  toolDescription: string;
  aspectRatio?: "16:9" | "1:1" | "9:16";
  className?: string;
  onClick?: () => void;
}

/**
 * 비디오 썸네일 (정적 프레임)
 */
export function VideoThumbnail({
  toolSlug,
  toolName,
  toolDescription,
  aspectRatio = "16:9",
  className,
  onClick,
}: VideoThumbnailProps) {
  const theme = getToolTheme(toolSlug);

  // 화면 비율에 따른 크기 설정
  const dimensions = {
    "16:9": { width: 1920, height: 1080 },
    "1:1": { width: 1080, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
  }[aspectRatio];

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    paddingBottom:
      aspectRatio === "16:9"
        ? "56.25%"
        : aspectRatio === "1:1"
          ? "100%"
          : "177.78%",
    backgroundColor: "#f3f4f6",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: onClick ? "pointer" : "default",
  };

  return (
    <div className={className} style={containerStyle} onClick={onClick}>
      <Player
        component={ToolDemoComposition}
        inputProps={{
          toolSlug,
          toolName,
          toolDescription,
          inputExample: theme.inputExample,
          outputExample: theme.outputExample,
          primaryColor: theme.primary,
          secondaryColor: theme.secondary,
          iconText: theme.icon,
        }}
        durationInFrames={180}
        fps={30}
        compositionWidth={dimensions.width}
        compositionHeight={dimensions.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        autoPlay={false}
        controls={false}
        // 첫 프레임만 표시
        initialFrame={45}
      />

      {/* 재생 버튼 오버레이 */}
      {onClick && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            transition: "background-color 0.2s",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: theme.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              style={{ marginLeft: 3 }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
