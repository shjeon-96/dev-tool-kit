# Web Toolkit - Project Summary

> 개발자를 위한 올인원 웹 도구 모음 (100% 클라이언트 사이드)

**URL**: https://web-toolkit.app
**Version**: 1.2.0
**Languages**: English, 한국어, 日本語

---

## Quick Stats

| 항목                   | 수량   |
| ---------------------- | ------ |
| 도구 (Tools)           | 43개   |
| pSEO 페이지            | 1,400+ |
| 가이드 (Guides)        | 31개   |
| 치트시트 (Cheatsheets) | 14개   |
| 빌드 시간              | ~29초  |

---

## 1. 도구 카탈로그 (43개)

### Text & Code (20개)

| 도구                  | 설명                                  |
| --------------------- | ------------------------------------- |
| JSON Formatter        | JSON 포맷팅, 압축, 검증               |
| SQL Formatter         | SQL 쿼리 포맷팅 (다양한 방언)         |
| Prettier Playground   | 코드 포맷팅 (JS, TS, CSS, HTML, JSON) |
| Markdown Preview      | 마크다운 실시간 미리보기              |
| Diff Checker          | 텍스트/코드 비교                      |
| Regex Tester          | 정규표현식 테스트                     |
| JSON to TypeScript    | JSON → TypeScript 타입 변환           |
| Lorem Ipsum Generator | 더미 텍스트 생성                      |
| URL Parser            | URL 분석 및 편집                      |
| UUID/ULID Generator   | UUID v1, v4, ULID 생성                |
| Cron Parser           | Cron 표현식 해석                      |
| CSS to Tailwind       | CSS → Tailwind 변환                   |
| cURL Builder          | cURL 명령어 빌더                      |
| Meta Tag Generator    | SEO 메타 태그 생성                    |
| HTML Entity Encoder   | HTML 엔티티 인코딩/디코딩             |
| Text Case Converter   | 대소문자 변환                         |
| Sitemap Generator     | XML 사이트맵 생성                     |
| Schema Generator      | Schema.org 마크업 생성                |
| Headline Analyzer     | 헤드라인 품질 분석                    |
| SERP Preview          | 검색 결과 미리보기                    |

### Media & Design (12개)

| 도구                 | 설명                             |
| -------------------- | -------------------------------- |
| Image Resizer        | 이미지 크기 조절, 포맷 변환      |
| App Icon Generator   | iOS/Android/Favicon 아이콘 생성  |
| QR Code Generator    | QR 코드 생성 (URL, WiFi, 연락처) |
| Color Picker         | 이미지에서 색상 추출             |
| Gradient Generator   | CSS 그라데이션 생성              |
| Box Shadow Generator | CSS 박스 쉐도우 생성             |
| SVG Optimizer        | SVG 최적화                       |
| Video Compressor     | 비디오 압축                      |
| PDF Toolkit          | PDF 병합, 분할, 압축             |
| OCR Scanner          | 이미지에서 텍스트 추출           |
| Background Remover   | AI 배경 제거                     |
| OG Image Generator   | Open Graph 이미지 생성           |

### Converters (9개)

| 도구                  | 설명                     |
| --------------------- | ------------------------ |
| Base64 Converter      | Base64 인코딩/디코딩     |
| Unix Timestamp        | 타임스탬프 ↔ 날짜 변환   |
| Number Base Converter | 진법 변환 (2, 8, 10, 16) |
| URL Encoder           | URL 인코딩/디코딩        |
| JSON ↔ YAML           | JSON ↔ YAML 상호 변환    |
| JSON ↔ XML            | JSON ↔ XML 상호 변환     |
| JSON ↔ CSV            | JSON ↔ CSV 상호 변환     |
| Image Converter       | 이미지 포맷 변환         |
| Unit Converter        | 단위 변환                |

### Security (2개)

| 도구           | 설명                         |
| -------------- | ---------------------------- |
| JWT Decoder    | JWT 토큰 디코딩              |
| Hash Generator | MD5, SHA-1, SHA-256, SHA-512 |

---

## 2. pSEO 라우트 (프로그램적 SEO)

| 라우트                | 설명                 | 페이지 수    |
| --------------------- | -------------------- | ------------ |
| `/tools/[slug]`       | 개별 도구            | 43 × 6 = 258 |
| `/convert/[slug]`     | 변환 조합            | 54 × 6 = 324 |
| `/hash/[type]`        | 해시 유형별          | 8 × 6 = 48   |
| `/encode/[type]`      | 인코딩 유형별        | 7 × 6 = 42   |
| `/decode/[type]`      | 디코딩 유형별        | 7 × 6 = 42   |
| `/format/[type]`      | 포맷 유형별          | 8 × 6 = 48   |
| `/generate/[type]`    | 생성 유형별          | 8 × 6 = 48   |
| `/minify/[type]`      | 압축 유형별          | 4 × 6 = 24   |
| `/validate/[type]`    | 검증 유형별          | 5 × 6 = 30   |
| `/diff/[type]`        | 비교 유형별          | 4 × 6 = 24   |
| `/resize-to/[target]` | 이미지 리사이즈 타겟 | 22 × 6 = 132 |
| `/compare/[slug]`     | 도구 비교            | 6 × 6 = 36   |
| `/guides/[slug]`      | 가이드               | 31 × 6 = 186 |
| `/cheatsheets/[slug]` | 치트시트             | 14 × 6 = 84  |
| `/use-cases/[slug]`   | 사용 사례            | 6 × 6 = 36   |
| `/fix/[error-type]`   | AI 오류 해결         | 10 × 6 = 60  |
| `/ai/[tool]`          | AI 코드 도구         | 16 × 6 = 96  |
| `/trends/[week]`      | 주간 트렌드          | 6 × 6 = 36   |

**총 페이지**: ~1,400+ (6개 로케일)

---

## 3. SEO 최적화

### Schema.org 마크업

- `SoftwareApplicationJsonLd` - 도구 페이지
- `FAQJsonLd` - FAQ 섹션
- `BreadcrumbJsonLd` - 브레드크럼
- `HowToJsonLd` - 오류 해결 페이지
- `WebsiteJsonLd` - 사이트 전체

### 기술적 SEO

- SSG (Static Site Generation) - 1,411 페이지 / 29초
- 다국어 hreflang 태그
- 동적 OG 이미지 생성 (`/api/og/[tool]`)
- XML 사이트맵 자동 생성

### CLS 최적화

- 광고 고정 높이 플레이스홀더
- CSS Containment (`contain: layout style`)
- 스켈레톤 UI 로딩 상태

---

## 4. 비즈니스 기능

### 인증 (Supabase)

- 이메일/패스워드 로그인
- OAuth (Google, GitHub)
- 매직 링크

### 구독 (LemonSqueezy)

| 플랜        | 가격   | 기능                        |
| ----------- | ------ | --------------------------- |
| Free        | $0     | 기본 도구, 일일 제한        |
| Pro Monthly | $9/월  | 무제한, 광고 제거, API 접근 |
| Pro Yearly  | $90/년 | Pro + 2개월 무료            |

### API (Public API v1)

- `/api/v1/hash/generate` - 해시 생성
- `/api/v1/json/format` - JSON 포맷팅
- `/api/v1/qr/generate` - QR 코드 생성
- `/api/v1/uuid/generate` - UUID 생성
- `/api/v1/base64/convert` - Base64 변환

---

## 5. 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State**: React Hooks + URL State

### Backend

- **Auth**: Supabase
- **Payments**: LemonSqueezy
- **KV Store**: Vercel KV (공유 링크)
- **Analytics**: Microsoft Clarity

### AI/ML (클라이언트 사이드)

- **OCR**: Tesseract.js
- **Background Removal**: ONNX Runtime (WebGPU)
- **OG Image**: Satori + resvg-wasm

### 아키텍처

- Feature-Sliced Design (FSD)
- 100% 클라이언트 사이드 처리
- PWA 지원 (오프라인)

---

## 6. 프로젝트 구조

```
src/
├── app/[locale]/           # Next.js App Router (i18n)
│   ├── tools/[slug]/       # 도구 페이지
│   ├── fix/[error-type]/   # AI 오류 해결
│   ├── ai/[tool]/          # AI 코드 도구
│   └── ...                 # pSEO 라우트
│
├── features/               # 도구 + 기능 모듈 (70개)
│   ├── json-formatter/
│   ├── auth/
│   ├── billing/
│   └── ...
│
├── entities/               # 비즈니스 엔티티 (18개)
│   ├── tool/               # 도구 레지스트리
│   ├── ai-context/         # AI 도구 컨텍스트
│   ├── error-fix/          # 오류 해결 데이터
│   ├── subscription/       # 구독 상태
│   └── ...
│
├── shared/
│   ├── ui/                 # 공통 UI 컴포넌트
│   ├── lib/                # 유틸리티, Hooks
│   └── config/             # 설정
│
└── extension/              # Chrome Extension (Plasmo)
```

---

## 7. 핵심 차별화

| 특징                | 설명                                    |
| ------------------- | --------------------------------------- |
| **100% 클라이언트** | 데이터가 서버로 전송되지 않음           |
| **오프라인 지원**   | PWA로 인터넷 없이 사용 가능             |
| **다국어**          | 영어, 한국어, 일본어 지원               |
| **AI 코드 검증**    | ChatGPT, Claude, Copilot 코드 오류 해결 |
| **무료**            | 대부분 기능 무료, 광고 지원             |

---

## 8. Vibe Coding SEO 전략

### Phase 1: Error Fix Pages ✅

- `/fix/[error-type]` - 10개 AI 오류 해결 페이지
- JSON, JavaScript, TypeScript, React, Python 오류

### Phase 2: AI Code Tools ✅

- `/ai/[tool]` - 16개 AI 호환 도구 페이지
- ChatGPT, Claude, Copilot, Gemini, Cursor 지원

### Phase 3: Browser Extension ❌ (스킵)

- 향후 개발 예정

---

## 9. 개발 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run test         # 단위 테스트
npm run test:e2e     # E2E 테스트
npm run lint         # ESLint
npm run analyze      # 번들 분석
```

---

## 10. 최근 업데이트

| 날짜       | 버전  | 내용                                        |
| ---------- | ----- | ------------------------------------------- |
| 2025-12-25 | 1.2.0 | Vibe Coding SEO (Error Fix, AI Tools)       |
| 2025-12-24 | 1.1.0 | pSEO 확장 (hash, encode, decode, format 등) |
| 2025-12-23 | 1.0.0 | Phase 2 도구 완료 (PDF, OCR, BG Remover 등) |

---

_Last Updated: 2025-12-25_
