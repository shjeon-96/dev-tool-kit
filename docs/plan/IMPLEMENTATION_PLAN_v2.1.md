# Web Toolkit 구현 계획서 v2.1

> Phase 2 진행 상황 업데이트

**작성일**: 2025-12-21
**버전**: 2.1
**기준 문서**: IMPLEMENTATION_PLAN_v2.0.md

---

## Phase 2 진행 현황

### Month 4: File System Access + 문서 도구

#### 4.1 File System Access API ✅ 완료

| 순서 | 작업                         | 파일                                                | 상태 |
| ---- | ---------------------------- | --------------------------------------------------- | ---- |
| 1    | API 감지 유틸                | `src/shared/lib/fs-access/detect.ts`                | ✅   |
| 2    | 타입 정의                    | `src/shared/lib/fs-access/types.ts`                 | ✅   |
| 3    | 스트리밍 읽기                | `src/shared/lib/fs-access/stream-read.ts`           | ✅   |
| 4    | 스트리밍 쓰기                | `src/shared/lib/fs-access/stream-write.ts`          | ✅   |
| 5    | Safari/Firefox ZIP Fallback  | `src/shared/lib/fs-access/fallback/zip-fallback.ts` | ✅   |
| 6    | 브라우저 감지 및 Chrome 유도 | `src/shared/lib/fs-access/ui/browser-prompt.tsx`    | ✅   |
| 7    | 통합 Hook                    | `src/shared/lib/fs-access/use-fs-access.ts`         | ✅   |

#### 4.2 PDF Toolkit 🟡 부분 완료

| 순서 | 작업                | 파일                                         | 상태 |
| ---- | ------------------- | -------------------------------------------- | ---- |
| 1    | PDF 병합            | `src/features/pdf-toolkit/lib/merge.ts`      | ✅   |
| 2    | PDF 분할            | `src/features/pdf-toolkit/lib/split.ts`      | ✅   |
| 3    | PDF 압축            | `src/features/pdf-toolkit/lib/compress.ts`   | ✅   |
| 4    | PDF 민감정보 마스킹 | `src/features/pdf-toolkit/lib/redact.ts`     | ❌   |
| 5    | 한글 폰트 임베딩    | `src/features/pdf-toolkit/lib/font-embed.ts` | ❌   |
| 6    | PDF Toolkit UI      | `src/features/pdf-toolkit/ui/*.tsx`          | ✅   |
| 7    | 단위 테스트         | `lib/split.test.ts`, `lib/compress.test.ts`  | ✅   |

#### 4.3 OCR Scanner ✅ 완료

| 순서 | 작업           | 파일                                                | 상태 |
| ---- | -------------- | --------------------------------------------------- | ---- |
| 1    | OCR 엔진 래퍼  | `src/features/ocr-scanner/lib/ocr.ts`               | ✅   |
| 2    | 타입 정의      | `src/features/ocr-scanner/lib/types.ts`             | ✅   |
| 3    | OCR Scanner UI | `src/features/ocr-scanner/ui/ocr-scanner.tsx`       | ✅   |
| 4    | 상태 관리 Hook | `src/features/ocr-scanner/model/use-ocr-scanner.ts` | ✅   |
| 5    | 단위 테스트    | `src/features/ocr-scanner/lib/ocr.test.ts`          | ✅   |

#### 4.4 추가 완료 도구

| 도구              | 상태 | 단위 테스트 | E2E 테스트 |
| ----------------- | ---- | ----------- | ---------- |
| Schema Generator  | ✅   | ✅ 16개     | ❌         |
| Headline Analyzer | ✅   | ✅ 31개     | ✅ 11개    |

---

## 다음 작업 우선순위

### 🔴 즉시 (High Priority)

#### 1. Background Remover (WebGPU)

**예상 시간**: 22시간
**의존성**: `onnxruntime-web`, U2-Net ONNX 모델

```
src/features/bg-remover/
├── index.ts
├── lib/
│   ├── types.ts          # 타입 정의
│   ├── model.ts          # U2-Net 모델 로더
│   ├── remove.ts         # 배경 제거 로직
│   └── webgpu-detect.ts  # WebGPU 감지
├── model/
│   └── use-bg-remover.ts # 상태 관리 Hook
└── ui/
    └── bg-remover.tsx    # UI 컴포넌트
```

**구현 순서**:

1. WebGPU 감지 유틸 (`src/shared/lib/webgpu/detect.ts`)
2. ONNX 런타임 래퍼 (`src/shared/lib/onnx/runtime.ts`)
3. U2-Net 모델 로더
4. 배경 제거 로직
5. UI 컴포넌트

#### 2. OG Image Generator (Satori)

**예상 시간**: 17시간
**의존성**: `satori`, `@resvg/resvg-wasm`

```
src/features/og-generator/
├── index.ts
├── lib/
│   ├── types.ts        # 타입 정의
│   ├── render.ts       # Satori 렌더러
│   ├── templates.ts    # 템플릿 시스템
│   └── fonts.ts        # 폰트 로더
├── model/
│   └── use-og-generator.ts
└── ui/
    └── og-generator.tsx
```

---

### 🟡 다음 단계 (Medium Priority)

#### 3. PDF Toolkit 확장

| 작업                | 예상 시간 | 우선순위 |
| ------------------- | --------- | -------- |
| PDF 민감정보 마스킹 | 6시간     | Medium   |
| 한글 폰트 임베딩    | 4시간     | Low      |

#### 4. E2E 테스트 추가

| 도구             | 예상 시간 |
| ---------------- | --------- |
| PDF Toolkit      | 2시간     |
| OCR Scanner      | 2시간     |
| Schema Generator | 2시간     |

#### 5. Bulk Image Resize

**예상 시간**: 10시간

```
src/features/bulk-actions/image-bulk/
├── index.ts
├── lib/
│   ├── types.ts
│   └── resize.ts
├── model/
│   └── use-image-bulk.ts
└── ui/
    └── image-bulk.tsx
```

---

### 🟢 나중에 (Low Priority)

#### 6. API 완성

| 작업                   | 예상 시간 |
| ---------------------- | --------- |
| Rate Limiting 미들웨어 | 4시간     |
| OpenAPI 스펙 생성      | 3시간     |

---

## Phase 2 체크리스트 (업데이트)

```
Month 4: File System Access + 문서 도구
├── [x] File System Access API 핸들러
├── [x] 폴더 선택 및 스트리밍 처리
├── [x] Safari/Firefox ZIP Fallback
├── [x] 브라우저 감지 및 Chrome 유도
├── [x] PDF Toolkit (병합, 분할, 압축)
├── [ ] PDF 민감정보 마스킹 (Auto-Redaction)
├── [ ] 한글 폰트 임베딩
├── [x] OCR Scanner (Tesseract.js)
├── [x] Schema Generator (보너스)
└── [x] Headline Analyzer (보너스)

Month 5: 미디어 도구 (WebGPU)
├── [ ] WebGPU 감지 및 폴백
├── [ ] Background Remover (ONNX)
├── [ ] U2-Net 모델 CDN 호스팅
├── [ ] OG Image Generator (Satori)
└── [ ] 템플릿 시스템

Month 6: Bulk Actions + API
├── [ ] Bulk Image Resize
├── [x] File System API 통합 (Bulk Actions에 적용됨)
├── [x] ZIP 다운로드
├── [ ] Rate Limiting
└── [~] API 문서 (기본 페이지 존재)
```

---

## 권장 다음 작업

### Option A: Background Remover

- **장점**: 높은 사용자 수요, 차별화된 기능
- **단점**: WebGPU/ONNX 복잡성, 모델 호스팅 필요

### Option B: OG Image Generator

- **장점**: 마케터/블로거 타겟, 상대적으로 간단
- **단점**: 서버사이드 렌더링 고려 필요

### Option C: E2E 테스트 완성

- **장점**: 안정성 확보, 기존 기능 검증
- **단점**: 새 기능 없음

### Option D: PDF Toolkit 확장 (Redact)

- **장점**: 기존 도구 강화, 보안 기능
- **단점**: 니치 마켓

---

## 기술 의존성 (추가 필요)

```bash
# Background Remover
npm install onnxruntime-web

# OG Image Generator
npm install satori @resvg/resvg-wasm
```

---

**권장**: Option A (Background Remover) 또는 Option B (OG Image Generator)

선택해주세요.
