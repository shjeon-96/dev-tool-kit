import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import type { ToolDemoProps } from "../lib/types";

// ============================================
// Tool Demo Video Composition
// ============================================

/**
 * 도구 데모 비디오 - 메인 컴포지션
 * 도구 사용 전후를 보여주는 애니메이션 비디오
 */
export const ToolDemoComposition: React.FC<ToolDemoProps> = ({
  toolName,
  toolDescription,
  inputExample,
  outputExample,
  primaryColor,
  secondaryColor,
  iconText,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 반응형 크기 계산
  const isVertical = height > width;
  const isSquare = width === height;

  // 레이아웃 변수
  const padding = isVertical ? 60 : 80;
  const titleSize = isVertical ? 48 : 64;
  const descSize = isVertical ? 24 : 32;
  const codeSize = isVertical ? 16 : 20;

  // 애니메이션 타이밍
  const introEnd = 30; // 1초
  const inputStart = 30;
  const inputEnd = 75; // 2.5초
  const transformStart = 75;
  const transformEnd = 105; // 3.5초
  const outputStart = 105;

  // 배경 그라디언트 애니메이션
  const gradientRotation = interpolate(frame, [0, 180], [0, 360]);

  // 인트로 애니메이션
  const introOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const introScale = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100 },
  });

  // 아이콘 바운스
  const iconBounce = spring({
    fps,
    frame: frame - 10,
    config: { damping: 8, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientRotation}deg, ${primaryColor}20, ${secondaryColor}20)`,
        fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
      }}
    >
      {/* 배경 패턴 */}
      <BackgroundPattern primaryColor={primaryColor} />

      {/* 헤더 - 항상 표시 */}
      <div
        style={{
          position: "absolute",
          top: padding,
          left: padding,
          right: padding,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: introOpacity,
          transform: `scale(${introScale})`,
        }}
      >
        {/* 도구 아이콘 */}
        <div
          style={{
            width: isVertical ? 60 : 80,
            height: isVertical ? 60 : 80,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isVertical ? 24 : 32,
            fontWeight: "bold",
            color: "white",
            transform: `scale(${iconBounce})`,
            boxShadow: `0 8px 32px ${primaryColor}40`,
          }}
        >
          {iconText || "⚡"}
        </div>

        {/* 제목 & 설명 */}
        <div>
          <h1
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: "#1f2937",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {toolName}
          </h1>
          <p
            style={{
              fontSize: descSize,
              color: "#6b7280",
              margin: 0,
              marginTop: 4,
            }}
          >
            {toolDescription}
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? 200 : 220,
          left: padding,
          right: padding,
          bottom: padding + 60,
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: 40,
        }}
      >
        {/* 입력 패널 */}
        <Sequence from={inputStart} durationInFrames={180 - inputStart}>
          <InputPanel
            content={inputExample}
            primaryColor={primaryColor}
            isVertical={isVertical}
            fontSize={codeSize}
            frame={frame - inputStart}
            fps={fps}
          />
        </Sequence>

        {/* 변환 화살표 */}
        <Sequence from={transformStart} durationInFrames={180 - transformStart}>
          <TransformArrow
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            isVertical={isVertical}
            frame={frame - transformStart}
            fps={fps}
          />
        </Sequence>

        {/* 출력 패널 */}
        <Sequence from={outputStart} durationInFrames={180 - outputStart}>
          <OutputPanel
            content={outputExample}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            isVertical={isVertical}
            fontSize={codeSize}
            frame={frame - outputStart}
            fps={fps}
          />
        </Sequence>
      </div>

      {/* 하단 브랜딩 */}
      <div
        style={{
          position: "absolute",
          bottom: padding,
          left: padding,
          right: padding,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: interpolate(frame, [150, 165], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontSize: isVertical ? 20 : 24,
            fontWeight: 600,
            color: "#374151",
          }}
        >
          🛠️ DevToolkit
        </div>
        <div
          style={{
            fontSize: isVertical ? 16 : 20,
            color: primaryColor,
            fontWeight: 500,
          }}
        >
          web-toolkit.app
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Sub Components
// ============================================

/**
 * 배경 패턴
 */
const BackgroundPattern: React.FC<{ primaryColor: string }> = ({
  primaryColor,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${primaryColor}15 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        opacity: 0.5,
      }}
    />
  );
};

/**
 * 입력 패널
 */
const InputPanel: React.FC<{
  content: string;
  primaryColor: string;
  isVertical: boolean;
  fontSize: number;
  frame: number;
  fps: number;
}> = ({ content, primaryColor, isVertical, fontSize, frame, fps }) => {
  const slideIn = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 타이핑 효과
  const typedLength = Math.floor(
    interpolate(frame, [0, 45], [0, content.length], {
      extrapolateRight: "clamp",
    }),
  );
  const displayText = content.slice(0, typedLength);

  return (
    <div
      style={{
        flex: 1,
        background: "white",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: `2px solid ${primaryColor}30`,
        opacity,
        transform: `translateX(${(1 - slideIn) * -50}px)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: primaryColor,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Input
      </div>
      <pre
        style={{
          flex: 1,
          fontSize,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#374151",
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          overflow: "hidden",
        }}
      >
        {displayText}
        <span
          style={{
            opacity: frame % 30 < 15 ? 1 : 0,
            color: primaryColor,
          }}
        >
          |
        </span>
      </pre>
    </div>
  );
};

/**
 * 변환 화살표
 */
const TransformArrow: React.FC<{
  primaryColor: string;
  secondaryColor: string;
  isVertical: boolean;
  frame: number;
  fps: number;
}> = ({ primaryColor, secondaryColor, isVertical, frame, fps }) => {
  const scale = spring({
    fps,
    frame,
    config: { damping: 10, stiffness: 150 },
  });

  const pulse = Math.sin(frame * 0.2) * 0.1 + 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale * pulse}) rotate(${isVertical ? 90 : 0}deg)`,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 16px ${primaryColor}40`,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 출력 패널
 */
const OutputPanel: React.FC<{
  content: string;
  primaryColor: string;
  secondaryColor: string;
  isVertical: boolean;
  fontSize: number;
  frame: number;
  fps: number;
}> = ({
  content,
  primaryColor,
  secondaryColor,
  isVertical,
  fontSize,
  frame,
  fps,
}) => {
  const slideIn = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 페이드인 효과
  const revealProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
        borderRadius: 16,
        padding: 24,
        boxShadow: `0 4px 24px ${primaryColor}20`,
        border: `2px solid ${primaryColor}`,
        opacity,
        transform: `translateX(${(1 - slideIn) * 50}px)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: primaryColor,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Output
        </div>
        <div
          style={{
            fontSize: 12,
            color: "white",
            background: primaryColor,
            padding: "2px 8px",
            borderRadius: 4,
            fontWeight: 500,
            opacity: revealProgress,
          }}
        >
          ✓ Success
        </div>
      </div>
      <pre
        style={{
          flex: 1,
          fontSize,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#1f2937",
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          overflow: "hidden",
          opacity: revealProgress,
        }}
      >
        {content}
      </pre>
    </div>
  );
};
