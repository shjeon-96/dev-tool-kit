# DevToolkit 프로젝트 현황

> 마지막 업데이트: 2025-12-25 (v1.3.0)

---

## 📊 프로젝트 개요

| 항목           | 값                       |
| -------------- | ------------------------ |
| **프로젝트명** | DevToolkit (Web Toolkit) |
| **URL**        | https://web-toolkit.app  |
| **버전**       | 1.3.0                    |
| **라이선스**   | Private                  |

---

## 🛠 기술 스택

### Core Framework

| 기술             | 버전    | 비고                  |
| ---------------- | ------- | --------------------- |
| **Next.js**      | 16.0.10 | App Router, Turbopack |
| **React**        | 19.2.0  | Server Components     |
| **TypeScript**   | 5.x     | Strict Mode           |
| **Tailwind CSS** | 4.x     | JIT 모드              |

### UI & Styling

| 라이브러리   | 용도                 |
| ------------ | -------------------- |
| Radix UI     | 헤드리스 UI 컴포넌트 |
| Shadcn/ui    | 커스텀 UI 컴포넌트   |
| Lucide React | 아이콘               |
| next-themes  | 다크 모드            |

### 데이터 & 인증

| 서비스       | 용도                  |
| ------------ | --------------------- |
| Supabase     | 인증 & 데이터베이스   |
| LemonSqueezy | 결제 & 구독           |
| Vercel KV    | Magic Share 링크 저장 |

### 특수 기술

| 기술          | 용도                     |
| ------------- | ------------------------ |
| FFmpeg.wasm   | 비디오 압축 (클라이언트) |
| ONNX Runtime  | AI 배경 제거 (WebGPU)    |
| Tesseract.js  | OCR 텍스트 추출          |
| pdf-lib       | PDF 처리                 |
| Satori        | OG 이미지 생성           |
| html-to-image | 코드 스니펫 이미지       |
| Monaco Editor | 코드 에디터              |

---

## 📈 프로젝트 규모

### 코드베이스

| 항목             | 수량  |
| ---------------- | ----- |
| **Feature 모듈** | 70개  |
| **Entity 모듈**  | 20개  |
| **도구 (Tools)** | 41개  |
| **pSEO 라우트**  | 23개  |
| **테스트 파일**  | 23개  |
| **의존성**       | 127개 |

### 콘텐츠

| 항목            | 수량 |
| --------------- | ---- |
| **가이드**      | 31개 |
| **치트시트**    | 14개 |
| **pSEO 페이지** | 500+ |
| **지원 언어**   | 6개  |

### 지원 언어

- 🇺🇸 English (en) - 기본
- 🇰🇷 한국어 (ko)
- 🇯🇵 日本語 (ja)
- 🇪🇸 Español (es)
- 🇧🇷 Português (pt)
- 🇩🇪 Deutsch (de)

---

## 🏗 아키텍처

### Feature-Sliced Design (FSD)

```
src/
├── app/              # Next.js App Router
├── features/         # 도구 & 기능 모듈 (70개)
├── entities/         # 비즈니스 엔티티 (20개)
├── widgets/          # 레이아웃 위젯
└── shared/           # 공유 리소스
```

### 의존성 흐름

```
app → widgets → features → entities → shared
```

---

## 🗺 pSEO 라우트 맵

### 도구 페이지

| 라우트              | 설명        | 페이지 수 |
| ------------------- | ----------- | --------- |
| `/tools/[slug]`     | 메인 도구   | 41개      |
| `/guides/[slug]`    | 사용 가이드 | 31개      |
| `/use-cases/[slug]` | 사용 사례   | 12개      |

### 프로그래매틱 SEO

| 라우트                         | 설명            | 대상 키워드                 |
| ------------------------------ | --------------- | --------------------------- |
| `/convert/[slug]`              | 포맷 변환       | "json to yaml converter"    |
| `/resize-to/[target]`          | 이미지 리사이즈 | "resize image to 1920x1080" |
| `/minify/[type]`               | 코드 압축       | "minify json online"        |
| `/validate/[type]`             | 유효성 검사     | "validate json online"      |
| `/diff/[type]`                 | 차이 비교       | "json diff checker"         |
| `/hash/[type]`                 | 해시 생성       | "sha256 hash generator"     |
| `/format/[type]`               | 포맷팅          | "sql formatter online"      |
| `/encode/[type]`               | 인코딩          | "base64 encode"             |
| `/decode/[type]`               | 디코딩          | "base64 decode"             |
| `/generate/[type]`             | 생성기          | "uuid generator"            |
| `/fix/[error-type]`            | 에러 해결       | "json unexpected token fix" |
| `/ai/[tool]`                   | AI 코드 도구    | "ai json formatter"         |
| `/alternative-to/[competitor]` | 경쟁사 비교     | "codebeautify alternative"  |
| `/glossary/[term]`             | 용어 사전       | "what is json"              |
| `/trends/[week]`               | 트렌드          | 내부 분석용                 |

---

## 🔌 API 현황

### Public API v1

| 엔드포인트               | 메서드 | 설명         |
| ------------------------ | ------ | ------------ |
| `/api/v1/hash/generate`  | POST   | 해시 생성    |
| `/api/v1/json/format`    | POST   | JSON 포맷팅  |
| `/api/v1/qr/generate`    | POST   | QR 코드 생성 |
| `/api/v1/uuid/generate`  | GET    | UUID 생성    |
| `/api/v1/base64/convert` | POST   | Base64 변환  |

### 내부 API

| 엔드포인트            | 용도                  |
| --------------------- | --------------------- |
| `/api/share`          | Magic Share 링크 생성 |
| `/api/checkout`       | 결제 세션             |
| `/api/subscription/*` | 구독 관리             |
| `/api/og/[tool]`      | 동적 OG 이미지        |
| `/api/analytics/*`    | A/B 테스트            |

---

## 🧪 테스트 현황

### 단위 테스트 (Vitest)

| 카테고리         | 테스트 수 |
| ---------------- | --------- |
| JSON Formatter   | 12개      |
| Hash Generator   | 8개       |
| UUID Generator   | 6개       |
| Base64 Converter | 5개       |
| PDF Toolkit      | 24개      |
| OCR Scanner      | 11개      |
| 기타             | 다수      |

### E2E 테스트 (Playwright)

| 테스트 파일               | 설명          |
| ------------------------- | ------------- |
| json-formatter.spec.ts    | JSON 포맷터   |
| image-converter.spec.ts   | 이미지 변환   |
| uuid-generator.spec.ts    | UUID 생성     |
| pdf-toolkit.spec.ts       | PDF 도구      |
| headline-analyzer.spec.ts | 헤드라인 분석 |
| security-headers.spec.ts  | 보안 헤더     |

---

## 📅 최근 릴리스

### v1.3.0 (2025-12-25) 🎄

**신규 도구:**

- Share as Image (Carbon 스타일 코드 이미지)

**신규 pSEO:**

- `/alternative-to/[competitor]` - 경쟁사 비교 (5개)
- `/glossary/[term]` - 용어 사전 (27개)

### v1.2.0 (2025-12-23)

**신규 도구:**

- BG Remover (AI 배경 제거)
- OG Generator (OG 이미지 생성)
- Image Converter (포맷 변환)
- PDF Redact (민감정보 마스킹)

### v1.1.0 (2025-12-21)

**신규 도구:**

- PDF Toolkit (병합, 분할, 압축)
- OCR Scanner (텍스트 추출)
- Schema Generator (JSON-LD)
- Headline Analyzer (헤드라인 분석)

---

## 🎯 도구 카테고리

### 📝 텍스트 & 코드 (17개)

- JSON Formatter
- UUID Generator
- SQL Formatter
- Cron Parser
- Markdown Preview
- Diff Checker
- Lorem Generator
- URL Parser
- UA Parser
- Regex Tester
- Meta Generator
- cURL Builder
- Prettier Playground
- CSS Minifier
- Schema Generator
- Headline Analyzer
- **Share as Image** 🆕

### 🎨 미디어 & 디자인 (13개)

- Image Resizer
- App Icon Generator
- QR Generator
- Color Picker
- Box Shadow
- Gradient Generator
- SVG Optimizer ⭐
- Video Compressor ⭐
- PDF Toolkit
- OCR Scanner
- BG Remover
- OG Generator
- Image Converter

### 🔄 변환 도구 (8개)

- Unix Timestamp
- Base64 Converter
- Base Converter
- URL Encoder
- HTML Entity
- CSS to Tailwind
- JSON to TypeScript ⭐
- Text Case Converter

### 🔒 보안 (2개)

- JWT Decoder
- Hash Generator

⭐ = Premium 전용

---

## 📊 빌드 통계

| 항목             | 값               |
| ---------------- | ---------------- |
| **빌드 타입**    | SSG + SSR Hybrid |
| **정적 페이지**  | 2,000+           |
| **동적 라우트**  | 15개             |
| **Node.js 요구** | 20.9.0+          |

---

## 🔗 관련 문서

- [CLAUDE.md](../CLAUDE.md) - 개발 가이드
- [MASTER_DOCUMENT.md](./MASTER_DOCUMENT.md) - 상세 문서
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 프로젝트 요약
- [GROWTH_STRATEGY_v1.0.md](./plan/GROWTH_STRATEGY_v1.0.md) - 성장 전략

---

## 🚀 다음 단계

### 계획된 기능

1. **Browser Extension** - Chrome/Firefox 확장
2. **Glossary 확장** - 27개 → 100개+
3. **Competitor 확장** - 5개 → 20개+
4. **신규 도구** - 사용자 요청 기반

### 기술 부채

- [ ] 테스트 커버리지 80% 달성
- [ ] 번들 사이즈 최적화
- [ ] 접근성 개선 (WCAG 2.1 AA)

---

_이 문서는 자동 생성되었습니다._
