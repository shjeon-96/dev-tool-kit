# 차세대 트래픽 자동화 플레이북 v1.0

> 프로그래매틱 비디오, 임베더블 위젯, 동적 OG, 커뮤니티 봇을 활용한 트래픽 성장 전략

**작성일**: 2025-12-23
**버전**: 1.0
**기반 문서**: 자동화된 트래픽 엔지니어링 심층 분석 보고서
**목표**: 기존 pSEO + 신규 자동화 전략으로 월간 150K+ 방문자 달성

---

## Executive Summary

기존 전략(pSEO, Extension)에 4가지 신규 자동화 축을 추가하여 트래픽 퍼널을 완성합니다.

| 자동화 축               | 핵심 기술          | 예상 ROI        | 우선순위   |
| ----------------------- | ------------------ | --------------- | ---------- |
| **동적 OG 이미지**      | Vercel OG + Satori | 높음 (CTR 40%↑) | P0 - 즉시  |
| **임베더블 위젯**       | Shadow DOM + React | 중-높음         | P1 - 1개월 |
| **프로그래매틱 비디오** | Remotion + AI TTS  | 중간            | P2 - 2개월 |
| **커뮤니티 봇**         | Discord/Slack API  | 중간            | P2 - 2개월 |

---

## Part 1: 동적 OG 이미지 엔진 (P0 - 즉시 실행)

### 1.1 현황 및 목표

**현재 상태**: 정적 OG 이미지 (도구별 1개)
**목표 상태**: 동적 OG 이미지 (입력값/결과 반영)

**기대 효과**:

- 소셜 공유 CTR 30-40% 향상
- 사용자 생성 콘텐츠(UGC) 공유 증가
- 브랜드 인지도 강화

### 1.2 구현 전략

#### Phase 1: 기본 동적 OG (1주)

```typescript
// src/app/api/og/[tool]/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool } = await params;
  const { searchParams } = new URL(request.url);

  // 도구별 동적 데이터
  const title = searchParams.get('title') || getToolTitle(tool);
  const preview = searchParams.get('preview') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #313244 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* 로고 */}
        <div style={{ fontSize: 24, color: '#89b4fa', marginBottom: 20 }}>
          🛠️ Web Toolkit
        </div>

        {/* 도구명 */}
        <div style={{ fontSize: 48, fontWeight: 'bold', color: '#cdd6f4' }}>
          {title}
        </div>

        {/* 미리보기 (코드/결과) */}
        {preview && (
          <div
            style={{
              marginTop: 30,
              padding: '20px 40px',
              background: '#181825',
              borderRadius: 12,
              color: '#a6e3a1',
              fontFamily: 'monospace',
              fontSize: 18,
              maxWidth: '80%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {preview.slice(0, 100)}
          </div>
        )}

        {/* 푸터 */}
        <div style={{ position: 'absolute', bottom: 40, color: '#6c7086' }}>
          web-toolkit.app • 100% Client-Side
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

#### Phase 2: 도구별 특화 OG (2주)

| 도구            | 동적 요소              | 시각화              |
| --------------- | ---------------------- | ------------------- |
| JSON Formatter  | 포맷팅된 JSON 미리보기 | 구문 강조 코드 블록 |
| Hash Generator  | 입력 → 해시값          | 화살표 다이어그램   |
| QR Generator    | 생성된 QR 코드         | QR 이미지 삽입      |
| Color Converter | 변환된 색상            | 색상 견본 표시      |
| Image Resizer   | 리사이즈 전/후 크기    | 비교 다이어그램     |

```typescript
// src/app/api/og/json-formatter/route.tsx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jsonPreview = searchParams.get('json') || '{}';

  // JSON 구문 강조 렌더링
  const highlighted = highlightJson(jsonPreview);

  return new ImageResponse(
    <JsonPreviewTemplate code={highlighted} />,
    { width: 1200, height: 630 }
  );
}
```

#### Phase 3: Magic Share 연동 (3주)

```typescript
// 공유 링크 생성 시 동적 OG URL 자동 생성
// src/features/magic-share/lib/create-share.ts

export async function createShareUrl(
  tool: string,
  data: unknown,
): Promise<ShareResult> {
  const shareId = await saveToKV(data);

  // OG 이미지 URL에 preview 데이터 포함
  const preview = generatePreview(tool, data);
  const ogUrl = `${BASE_URL}/api/og/${tool}?share=${shareId}&preview=${encodeURIComponent(preview)}`;

  return {
    shareUrl: `${BASE_URL}/share/${shareId}`,
    ogImageUrl: ogUrl,
  };
}
```

### 1.3 메타 태그 동적 생성

```typescript
// src/app/[locale]/tools/[slug]/page.tsx

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const shareId = searchParams.get("share");

  // 공유 링크인 경우 동적 OG 이미지 사용
  const ogImage = shareId
    ? `${BASE_URL}/api/og/${slug}?share=${shareId}`
    : `${BASE_URL}/api/og/${slug}`;

  return {
    openGraph: {
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}
```

---

## Part 2: 임베더블 위젯 아키텍처 (P1 - 1개월)

### 2.1 전략적 가치

**목표**: 타사 웹사이트에 Web Toolkit 기능을 임베드하여 백링크 + 트래픽 확보

**유효한 위젯 카테고리**:

| 위젯 유형       | 타겟 사이트         | 가치 제안            |
| --------------- | ------------------- | -------------------- |
| JSON Validator  | 블로그, 문서 사이트 | API 응답 예시 검증   |
| Color Picker    | 디자인 블로그       | 인터랙티브 색상 데모 |
| QR Generator    | 마케팅 사이트       | 즉석 QR 생성         |
| Hash Calculator | 보안 블로그         | 해시값 확인 도구     |

### 2.2 Shadow DOM 기반 위젯 구현

#### 2.2.1 위젯 번들러 설정

```javascript
// widget-builder/rollup.config.js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/widgets/index.ts",
  output: {
    file: "public/widget.js",
    format: "iife",
    name: "WebToolkitWidget",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    postcss({
      inject: false,
      extract: false,
      minimize: true,
    }),
    terser(),
  ],
};
```

#### 2.2.2 Shadow DOM 컨테이너

```typescript
// src/widgets/lib/shadow-container.ts

export function createWidgetContainer(
  hostElement: HTMLElement,
  styles: string,
): ShadowRoot {
  // Shadow DOM 생성
  const shadow = hostElement.attachShadow({ mode: "closed" });

  // 스타일 격리
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  shadow.appendChild(styleSheet);

  // React 마운트 포인트
  const mountPoint = document.createElement("div");
  mountPoint.id = "widget-root";
  shadow.appendChild(mountPoint);

  return shadow;
}
```

#### 2.2.3 위젯 초기화 스크립트

```typescript
// src/widgets/index.ts

import { createRoot } from 'react-dom/client';
import { JsonValidatorWidget } from './json-validator';
import { ColorPickerWidget } from './color-picker';
import { createWidgetContainer } from './lib/shadow-container';
import styles from './styles.css?raw';

interface WidgetConfig {
  tool: 'json-validator' | 'color-picker' | 'qr-generator' | 'hash-calculator';
  theme?: 'light' | 'dark' | 'auto';
  height?: number;
  onResult?: (result: unknown) => void;
}

const WIDGETS = {
  'json-validator': JsonValidatorWidget,
  'color-picker': ColorPickerWidget,
  'qr-generator': QRGeneratorWidget,
  'hash-calculator': HashCalculatorWidget,
};

class WebToolkitWidget {
  constructor(selector: string, config: WidgetConfig) {
    const hostElement = document.querySelector(selector);
    if (!hostElement) {
      console.error(`[WebToolkit] Element not found: ${selector}`);
      return;
    }

    const shadow = createWidgetContainer(hostElement as HTMLElement, styles);
    const mountPoint = shadow.getElementById('widget-root')!;

    const WidgetComponent = WIDGETS[config.tool];
    if (!WidgetComponent) {
      console.error(`[WebToolkit] Unknown widget: ${config.tool}`);
      return;
    }

    const root = createRoot(mountPoint);
    root.render(
      <WidgetComponent
        theme={config.theme || 'auto'}
        height={config.height || 300}
        onResult={config.onResult}
      />
    );
  }
}

// 전역 노출
(window as any).WebToolkitWidget = WebToolkitWidget;
```

#### 2.2.4 사용자용 임베드 코드

```html
<!-- 사용자가 자신의 사이트에 붙여넣을 코드 -->
<div id="json-widget"></div>
<script src="https://web-toolkit.app/widget.js"></script>
<script>
  new WebToolkitWidget("#json-widget", {
    tool: "json-validator",
    theme: "dark",
    height: 400,
  });
</script>

<!-- 또는 data 속성 방식 -->
<div
  data-webtoolkit-widget="json-validator"
  data-theme="dark"
  data-height="400"
></div>
<script src="https://web-toolkit.app/widget.js" async></script>
```

### 2.3 위젯 관리 페이지

```typescript
// src/app/[locale]/widgets/page.tsx

export default function WidgetsPage() {
  return (
    <main className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Embeddable Widgets</h1>

      <p className="text-muted-foreground mb-8">
        Add developer tools to your website with a single line of code.
        100% client-side, no data sent to servers.
      </p>

      <div className="grid gap-8">
        {AVAILABLE_WIDGETS.map(widget => (
          <WidgetCard key={widget.id} widget={widget}>
            <WidgetPreview tool={widget.id} />
            <EmbedCodeGenerator tool={widget.id} />
          </WidgetCard>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">SEO Benefits</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Widgets include a "Powered by Web Toolkit" link (rel="nofollow")</li>
          <li>Improve your content with interactive tools</li>
          <li>No impact on your page speed (async loading)</li>
        </ul>
      </section>
    </main>
  );
}
```

### 2.4 백링크 전략 (SEO 안전)

```typescript
// 위젯 푸터 컴포넌트
function WidgetFooter() {
  return (
    <div className="widget-footer">
      <a
        href="https://web-toolkit.app"
        target="_blank"
        rel="nofollow noopener"  // Google 가이드라인 준수
        className="powered-by"
      >
        Powered by Web Toolkit
      </a>
    </div>
  );
}
```

---

## Part 3: 프로그래매틱 비디오 엔진 (P2 - 2개월)

### 3.1 전략적 포지셔닝

**목표**: TikTok/Reels/Shorts에 자동 생성 숏폼 콘텐츠 배포

**콘텐츠 유형**:

| 유형      | 예시                                 | 바이럴 요소 |
| --------- | ------------------------------------ | ----------- |
| 도구 팁   | "JSON 파싱 에러? 이렇게 해결"        | 문제 해결   |
| 비교      | "MD5 vs SHA256 - 어떤 걸 써야 할까?" | 호기심      |
| 변환 데모 | "JSON → CSV 3초 만에"                | 효율성      |
| 개발자 밈 | "콘솔에 찍힌 undefined"              | 공감        |

### 3.2 Remotion 파이프라인 설계

#### 3.2.1 프로젝트 구조

```
video-generator/
├── src/
│   ├── compositions/
│   │   ├── tool-tip/              # 도구 팁 영상
│   │   │   ├── ToolTipVideo.tsx
│   │   │   └── schema.ts
│   │   ├── comparison/            # 비교 영상
│   │   └── demo/                  # 데모 영상
│   ├── components/
│   │   ├── CodeBlock.tsx          # 코드 애니메이션
│   │   ├── Captions.tsx           # 자막 (워드 단위)
│   │   └── Branding.tsx           # 브랜딩 요소
│   └── Root.tsx
├── scripts/
│   └── render-batch.ts            # 대량 렌더링
└── data/
    └── topics.json                # 콘텐츠 데이터
```

#### 3.2.2 코드 애니메이션 컴포넌트

```tsx
// video-generator/src/components/CodeBlock.tsx
import { useCurrentFrame, interpolate, spring } from "remotion";

interface CodeBlockProps {
  code: string;
  language: "json" | "javascript" | "typescript";
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  language,
  highlightLines = [],
}: CodeBlockProps) {
  const frame = useCurrentFrame();
  const lines = code.split("\n");

  return (
    <div className="code-block">
      {lines.map((line, index) => {
        // 라인별 순차 등장 애니메이션
        const opacity = interpolate(
          frame,
          [index * 5, index * 5 + 10],
          [0, 1],
          { extrapolateRight: "clamp" },
        );

        const isHighlighted = highlightLines.includes(index + 1);

        return (
          <div
            key={index}
            style={{
              opacity,
              background: isHighlighted ? "rgba(255,255,0,0.1)" : "transparent",
            }}
          >
            <span className="line-number">{index + 1}</span>
            <HighlightedCode code={line} language={language} />
          </div>
        );
      })}
    </div>
  );
}
```

#### 3.2.3 워드 단위 자막

```tsx
// video-generator/src/components/Captions.tsx
import { useCurrentFrame, interpolate } from "remotion";

interface CaptionsProps {
  words: { text: string; start: number; end: number }[];
}

export function Captions({ words }: CaptionsProps) {
  const frame = useCurrentFrame();
  const fps = 30;

  return (
    <div className="captions">
      {words.map((word, index) => {
        const startFrame = word.start * fps;
        const endFrame = word.end * fps;
        const isActive = frame >= startFrame && frame <= endFrame;

        const scale = isActive
          ? spring({ frame: frame - startFrame, fps, config: { damping: 10 } })
          : 1;

        return (
          <span
            key={index}
            style={{
              transform: `scale(${scale})`,
              color: isActive ? "#FFD700" : "#FFFFFF",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {word.text}{" "}
          </span>
        );
      })}
    </div>
  );
}
```

### 3.3 자동화 파이프라인

```typescript
// scripts/video-pipeline.ts

import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import { generateScript } from "./ai/script-generator";
import { generateVoiceover } from "./ai/tts";
import { transcribeAudio } from "./ai/whisper";

interface VideoConfig {
  topic: string;
  tool: string;
  style: "tip" | "comparison" | "demo";
}

export async function generateVideo(config: VideoConfig) {
  // 1. AI 스크립트 생성
  const script = await generateScript({
    topic: config.topic,
    tool: config.tool,
    style: config.style,
    maxLength: 60, // 60초 숏폼
  });

  // 2. TTS 음성 생성 (ElevenLabs)
  const audioPath = await generateVoiceover(script.narration);

  // 3. 음성 → 타임스탬프 (Whisper)
  const transcript = await transcribeAudio(audioPath);

  // 4. 비디오 렌더링
  const bundled = await bundle({
    entryPoint: "./src/index.ts",
    webpackOverride: (config) => config,
  });

  const outputPath = `./output/${config.topic}-${Date.now()}.mp4`;

  await renderMedia({
    composition: config.style,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: {
      script: script.content,
      words: transcript.words,
      audioSrc: audioPath,
      tool: config.tool,
    },
  });

  return outputPath;
}
```

### 3.4 배포 자동화 (GitHub Actions)

```yaml
# .github/workflows/video-generator.yml
name: Generate & Upload Videos

on:
  schedule:
    - cron: "0 9 * * 1,3,5" # 월/수/금 오전 9시
  workflow_dispatch:
    inputs:
      topic:
        description: "Video topic"
        required: true

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: cd video-generator && npm ci

      - name: Generate video
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ELEVENLABS_API_KEY: ${{ secrets.ELEVENLABS_API_KEY }}
        run: |
          cd video-generator
          npm run generate -- --topic="${{ github.event.inputs.topic || 'auto' }}"

      - name: Upload to platforms
        env:
          TIKTOK_SESSION: ${{ secrets.TIKTOK_SESSION }}
          YOUTUBE_CLIENT_SECRET: ${{ secrets.YOUTUBE_CLIENT_SECRET }}
        run: |
          cd video-generator
          npm run upload -- --platforms=tiktok,youtube-shorts
```

---

## Part 4: 커뮤니티 오토메이션 (P2 - 2개월)

### 4.1 Discord 유틸리티 봇

#### 4.1.1 봇 기능 설계

| 명령어               | 기능        | 트래픽 유도               |
| -------------------- | ----------- | ------------------------- |
| `/json format`       | JSON 포맷팅 | "더 많은 기능 → 웹사이트" |
| `/hash md5 <text>`   | 해시 생성   | "파일 해시는 → 웹사이트"  |
| `/uuid`              | UUID 생성   | "v5 UUID는 → 웹사이트"    |
| `/color hex #FF5733` | 색상 변환   | "팔레트 생성 → 웹사이트"  |

#### 4.1.2 Discord.js 구현

```typescript
// discord-bot/src/commands/json.ts
import {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("json")
  .setDescription("JSON utilities")
  .addSubcommand((sub) =>
    sub
      .setName("format")
      .setDescription("Format JSON")
      .addStringOption((opt) =>
        opt
          .setName("input")
          .setDescription("JSON string to format")
          .setRequired(true),
      ),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const input = interaction.options.getString("input", true);

  try {
    const formatted = JSON.stringify(JSON.parse(input), null, 2);

    // 결과가 2000자 이하면 직접 표시
    if (formatted.length <= 1500) {
      const embed = new EmbedBuilder()
        .setTitle("Formatted JSON")
        .setDescription(`\`\`\`json\n${formatted}\n\`\`\``)
        .setColor(0x89b4fa)
        .setFooter({ text: "Powered by Web Toolkit" });

      const button = new ButtonBuilder()
        .setLabel("Open in Web Toolkit")
        .setURL(`https://web-toolkit.app/tools/json-formatter`)
        .setStyle(5); // Link style

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

      await interaction.reply({ embeds: [embed], components: [row] });
    } else {
      // 결과가 길면 웹사이트로 유도
      await interaction.reply({
        content: "📦 JSON is too large to display here.",
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setLabel("Format on Web Toolkit")
              .setURL(`https://web-toolkit.app/tools/json-formatter`)
              .setStyle(5),
          ),
        ],
      });
    }
  } catch (error) {
    await interaction.reply({
      content: "❌ Invalid JSON. Check your syntax.",
      ephemeral: true,
    });
  }
}
```

#### 4.1.3 봇 배포 전략

```
1. 공식 봇 서버 생성
   - 사용 가이드
   - 커뮤니티 지원
   - 피처 요청

2. Top.gg 등록
   - 설명 최적화
   - 스크린샷 준비
   - 투표 리워드 설계

3. 서버 파트너십
   - 개발자 커뮤니티 서버 접촉
   - 상호 홍보
```

### 4.2 소셜 미디어 자동화 (Make.com)

#### 4.2.1 워크플로우 시나리오

```
[트리거] RSS 피드 - 기술 블로그 신규 글
    ↓
[필터] 관련 키워드 포함 여부 (JSON, API, Developer)
    ↓
[AI 처리] GPT-4 요약 + 홍보 문구 생성
    ↓
[라우터]
    ├── X (Twitter): 스레드 형태 게시
    ├── LinkedIn: 긴 호흡 게시물
    └── Discord Webhook: 커뮤니티 알림
```

#### 4.2.2 X (Twitter) 자동화 설정

```typescript
// make.com 시나리오 설정 (참고용 의사 코드)
const scenario = {
  trigger: {
    module: "rss.watch",
    params: {
      url: "https://dev.to/feed",
      maxResults: 10,
    },
  },
  filters: [
    {
      condition: "title OR content CONTAINS",
      values: ["json", "api", "developer tool", "formatter", "converter"],
    },
  ],
  actions: [
    {
      module: "openai.chat",
      params: {
        model: "gpt-4",
        prompt: `
          다음 기술 블로그 글을 읽고 Twitter 스레드용 요약을 작성해주세요.
          - 3개의 트윗으로 구성 (각 280자 이내)
          - 개발자 타겟
          - 마지막 트윗에 "관련 도구: web-toolkit.app" 자연스럽게 포함

          원문: {content}
        `,
      },
    },
    {
      module: "twitter.createThread",
      params: {
        tweets: "{openai.output}",
      },
    },
  ],
};
```

### 4.3 Slack 앱 (B2B 타겟)

````typescript
// slack-app/src/commands/format.ts
import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// /format 명령어
app.command("/format", async ({ command, ack, respond }) => {
  await ack();

  const input = command.text;

  try {
    // JSON 자동 감지 및 포맷팅
    if (input.trim().startsWith("{") || input.trim().startsWith("[")) {
      const formatted = JSON.stringify(JSON.parse(input), null, 2);

      await respond({
        response_type: "in_channel",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "```" + formatted + "```",
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "<https://web-toolkit.app/tools/json-formatter|Open in Web Toolkit> for advanced features",
              },
            ],
          },
        ],
      });
    }
  } catch (error) {
    await respond({
      response_type: "ephemeral",
      text: "❌ Invalid format. Please check your input.",
    });
  }
});
````

---

## Part 5: 실행 로드맵

### 5.1 타임라인

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Week 1-2: 동적 OG 이미지 구현 (P0)                                       │
│  ├── Vercel OG API 엔드포인트 개발                                       │
│  ├── 주요 도구 5개 동적 OG 구현                                          │
│  ├── Magic Share 연동                                                   │
│  └── 메타 태그 동적 생성 적용                                            │
├─────────────────────────────────────────────────────────────────────────┤
│  Week 3-4: 임베더블 위젯 MVP (P1)                                         │
│  ├── Shadow DOM 컨테이너 구현                                            │
│  ├── JSON Validator 위젯 개발                                           │
│  ├── 위젯 빌더 페이지 구축                                               │
│  └── CDN 배포 및 문서화                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  Week 5-6: 위젯 확장 + Discord 봇 (P1/P2)                                 │
│  ├── Color Picker, QR Generator 위젯 추가                               │
│  ├── Discord 봇 기본 명령어 구현                                         │
│  └── Top.gg 등록 준비                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  Week 7-8: 비디오 파이프라인 구축 (P2)                                    │
│  ├── Remotion 프로젝트 설정                                             │
│  ├── 기본 템플릿 3종 개발                                                │
│  ├── AI TTS + Whisper 연동                                             │
│  └── 첫 비디오 5개 수동 테스트                                           │
├─────────────────────────────────────────────────────────────────────────┤
│  Week 9-10: 자동화 완성 (P2)                                              │
│  ├── GitHub Actions 비디오 자동 생성                                     │
│  ├── Make.com 소셜 미디어 워크플로우                                     │
│  ├── Slack 앱 개발 및 배포                                              │
│  └── Discord 봇 서버 런칭                                               │
├─────────────────────────────────────────────────────────────────────────┤
│  Week 11-12: 최적화 및 확장 (지속)                                        │
│  ├── A/B 테스트 (OG 이미지 디자인)                                       │
│  ├── 위젯 사용 통계 분석                                                 │
│  ├── 비디오 성과 분석 및 최적화                                          │
│  └── 커뮤니티 피드백 반영                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 KPI 목표

| 지표                    | 1개월  | 3개월  | 6개월 |
| ----------------------- | ------ | ------ | ----- |
| **동적 OG 이미지**      |        |        |       |
| 소셜 공유 CTR           | +20%   | +35%   | +40%  |
| Magic Share 사용        | 100/주 | 500/주 | 1K/주 |
| **임베더블 위젯**       |        |        |       |
| 위젯 설치 사이트        | 10     | 50     | 200   |
| 위젯 통한 유입          | 100/월 | 1K/월  | 5K/월 |
| **프로그래매틱 비디오** |        |        |       |
| 영상 제작 수            | 20     | 60     | 120   |
| 총 조회수               | 5K     | 50K    | 200K  |
| 채널 구독자             | 100    | 1K     | 5K    |
| **커뮤니티 봇**         |        |        |       |
| Discord 봇 서버         | 10     | 50     | 200   |
| Slack 앱 워크스페이스   | 5      | 30     | 100   |
| 봇 통한 유입            | 50/월  | 500/월 | 2K/월 |

### 5.3 비용 예상

| 항목                    | 월 비용     | 비고            |
| ----------------------- | ----------- | --------------- |
| Vercel Edge (OG 이미지) | $0-20       | 무료 티어 충분  |
| ElevenLabs (TTS)        | $22         | Creator 플랜    |
| OpenAI API              | $20-50      | 스크립트 + 요약 |
| Make.com                | $9          | Core 플랜       |
| Discord 봇 호스팅       | $5          | Railway 등      |
| **총계**                | ~$60-100/월 |                 |

---

## Part 6: 리스크 관리

### 6.1 기술적 리스크

| 리스크                     | 영향도 | 대응 전략                                |
| -------------------------- | ------ | ---------------------------------------- |
| Vercel OG 한도 초과        | 중간   | 캐싱 레이어 추가, 캐시 TTL 조정          |
| Shadow DOM 브라우저 호환성 | 낮음   | Polyfill 제공, IE11 미지원 명시          |
| TTS API 비용 증가          | 중간   | 캐싱, 자주 쓰는 문구 사전 생성           |
| 소셜 플랫폼 API 변경       | 높음   | Make.com 모듈 업데이트 의존, 다채널 분산 |

### 6.2 정책 리스크

| 플랫폼      | 정책 이슈             | 대응 전략                       |
| ----------- | --------------------- | ------------------------------- |
| X (Twitter) | API 비용 급등         | 서드파티 툴 활용, 게시량 최적화 |
| TikTok      | AI 생성 콘텐츠 라벨링 | 투명하게 "AI-assisted" 표기     |
| Google      | 위젯 링크 스팸 판정   | nofollow, 가치 중심 설계        |
| Discord     | 봇 스팸 정책          | Rate limiting 준수, 유용성 중심 |

---

## 부록: 기술 스택 요약

```yaml
동적 OG 이미지:
  - Vercel OG (@vercel/og)
  - Satori (HTML → SVG)
  - Edge Functions

임베더블 위젯:
  - React 18
  - Shadow DOM
  - Rollup (번들링)
  - PostCSS (스타일 격리)

프로그래매틱 비디오:
  - Remotion 4.x
  - ElevenLabs (TTS)
  - OpenAI Whisper (자막)
  - GitHub Actions (자동화)

커뮤니티 봇:
  - Discord.js v14
  - Slack Bolt
  - Railway (호스팅)

자동화 오케스트레이션:
  - Make.com (워크플로우)
  - Vercel Cron (스케줄)
  - GitHub Actions (CI/CD)
```

---

_이 플레이북은 격주로 진행 상황을 리뷰하고 업데이트합니다._
_최종 수정: 2025-12-23_
