import React from "react";
import { Composition } from "remotion";
import { ToolDemoComposition } from "./compositions/tool-demo";
import type { ToolDemoProps } from "./lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ToolDemoWrapper = ToolDemoComposition as React.FC<any>;

// ============================================
// Remotion Root - Video Composition Registry
// ============================================

/**
 * 기본 도구 데모 Props
 */
const defaultToolDemoProps: ToolDemoProps = {
  toolSlug: "json-formatter",
  toolName: "JSON Formatter",
  toolDescription: "Format and validate JSON with syntax highlighting",
  inputExample: '{"name":"DevToolkit","version":"1.0"}',
  outputExample: `{
  "name": "DevToolkit",
  "version": "1.0"
}`,
  primaryColor: "#f59e0b",
  secondaryColor: "#fbbf24",
};

/**
 * Remotion Root Component
 * 모든 비디오 컴포지션을 등록
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 도구 데모 비디오 - 16:9 (YouTube/Twitter) */}
      <Composition
        id="ToolDemo"
        component={ToolDemoWrapper}
        durationInFrames={180} // 6초 @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultToolDemoProps}
        schema={undefined}
      />

      {/* 도구 데모 비디오 - 정사각형 (Instagram/LinkedIn) */}
      <Composition
        id="ToolDemoSquare"
        component={ToolDemoWrapper}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={defaultToolDemoProps}
        schema={undefined}
      />

      {/* 도구 데모 비디오 - 세로 (TikTok/Reels/Shorts) */}
      <Composition
        id="ToolDemoVertical"
        component={ToolDemoWrapper}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultToolDemoProps}
        schema={undefined}
      />
    </>
  );
};
