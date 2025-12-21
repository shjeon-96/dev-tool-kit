# Web Toolkit 구현 계획서 v2.0

> Phase 1 완료 후 남은 작업 목록

**작성일**: 2025-12-21
**버전**: 2.0
**기준 문서**: IMPLEMENTATION_PLAN_v1.1.md

---

## ✅ Phase 1 완료 현황 (1-3개월)

| 카테고리  | 완료 항목                                                        |
| --------- | ---------------------------------------------------------------- |
| **인증**  | Supabase Auth, OAuth (Google/GitHub), 로그인/회원가입 페이지     |
| **결제**  | LemonSqueezy 통합, Checkout, Webhook, Pricing 페이지, Billing    |
| **Quota** | 사용량 추적, 일일/월간 제한, Usage 대시보드                      |
| **Lead**  | Lead Magnet 모달, 도구별 Magnet 설정, Leads API                  |
| **구독**  | Upgrade 모달, Plan Badge, Offline Upgrade Prompt                 |
| **Bulk**  | JSON/Hash/QR Bulk Actions (3개)                                  |
| **API**   | API 키 시스템, 5개 엔드포인트 (/v1/json, hash, qr, uuid, base64) |

---

## Phase 2: 도구 확장 및 고성능 I/O (4-6개월)

### Month 4: File System Access + 문서 도구

#### 4.1 File System Access API

**목표**: 대용량 파일 스트리밍 처리 (10GB+ 지원)

| 순서 | 작업                         | 파일                                         | 예상 시간 |
| ---- | ---------------------------- | -------------------------------------------- | --------- |
| 1    | API 감지 유틸                | `src/shared/lib/fs-access/detect.ts`         | 1시간     |
| 2    | 폴더 선택 핸들러             | `src/shared/lib/fs-access/pick-directory.ts` | 3시간     |
| 3    | 스트리밍 읽기                | `src/shared/lib/fs-access/stream-read.ts`    | 4시간     |
| 4    | 스트리밍 쓰기                | `src/shared/lib/fs-access/stream-write.ts`   | 4시간     |
| 5    | 폴백 (기존 방식)             | `src/shared/lib/fs-access/fallback.ts`       | 2시간     |
| 6    | Safari/Firefox ZIP Fallback  | `src/shared/lib/fs-access/zip-fallback.ts`   | 3시간     |
| 7    | 브라우저 감지 및 Chrome 유도 | `src/shared/ui/browser-prompt.tsx`           | 2시간     |

**브라우저 지원**:

- Chrome/Edge: File System Access API (full support)
- Safari/Firefox: ZIP 다운로드 폴백

#### 4.2 PDF Toolkit

**의존성**: `pdf-lib`, `pdfjs-dist`

| 순서 | 작업                | 파일                                          | 예상 시간 |
| ---- | ------------------- | --------------------------------------------- | --------- |
| 1    | PDF 병합            | `src/features/pdf-toolkit/lib/merge.ts`       | 4시간     |
| 2    | PDF 분할            | `src/features/pdf-toolkit/lib/split.ts`       | 4시간     |
| 3    | PDF 압축            | `src/features/pdf-toolkit/lib/compress.ts`    | 5시간     |
| 4    | PDF 민감정보 마스킹 | `src/features/pdf-toolkit/lib/redact.ts`      | 6시간     |
| 5    | 한글 폰트 임베딩    | `src/features/pdf-toolkit/lib/font-embed.ts`  | 4시간     |
| 6    | PDF Toolkit UI      | `src/features/pdf-toolkit/ui/pdf-toolkit.tsx` | 6시간     |
| 7    | 도구 페이지         | `src/app/[locale]/tools/pdf-toolkit/page.tsx` | 2시간     |

**Next.js 설정 필요**:

```typescript
// next.config.ts
webpack: (config) => {
  config.resolve.alias.canvas = false;
  config.externals.push({ canvas: "canvas" });
  return config;
};
```

#### 4.3 OCR Scanner

**의존성**: `tesseract.js`

| 순서 | 작업           | 파일                                          | 예상 시간 |
| ---- | -------------- | --------------------------------------------- | --------- |
| 1    | OCR 엔진 래퍼  | `src/features/ocr-scanner/lib/engine.ts`      | 4시간     |
| 2    | 언어 팩 관리   | `src/features/ocr-scanner/lib/languages.ts`   | 3시간     |
| 3    | 이미지 전처리  | `src/features/ocr-scanner/lib/preprocess.ts`  | 3시간     |
| 4    | OCR Scanner UI | `src/features/ocr-scanner/ui/ocr-scanner.tsx` | 5시간     |
| 5    | 도구 페이지    | `src/app/[locale]/tools/ocr-scanner/page.tsx` | 2시간     |

---

### Month 5: 미디어 도구 (WebGPU)

#### 5.1 Background Remover

**의존성**: `onnxruntime-web`, U2-Net 모델

| 순서 | 작업                  | 파일                                         | 예상 시간 |
| ---- | --------------------- | -------------------------------------------- | --------- |
| 1    | WebGPU 감지           | `src/shared/lib/webgpu/detect.ts`            | 2시간     |
| 2    | ONNX 런타임 래퍼      | `src/shared/lib/onnx/runtime.ts`             | 4시간     |
| 3    | U2-Net 모델 로더      | `src/features/bg-remover/lib/model.ts`       | 4시간     |
| 4    | 배경 제거 로직        | `src/features/bg-remover/lib/remove.ts`      | 5시간     |
| 5    | Background Remover UI | `src/features/bg-remover/ui/bg-remover.tsx`  | 5시간     |
| 6    | 도구 페이지           | `src/app/[locale]/tools/bg-remover/page.tsx` | 2시간     |

#### 5.2 OG Image Generator

**의존성**: `satori`, `@resvg/resvg-js`

| 순서 | 작업            | 파일                                            | 예상 시간 |
| ---- | --------------- | ----------------------------------------------- | --------- |
| 1    | Satori 렌더러   | `src/features/og-generator/lib/render.ts`       | 4시간     |
| 2    | 템플릿 시스템   | `src/features/og-generator/lib/templates.ts`    | 4시간     |
| 3    | 폰트 로더       | `src/features/og-generator/lib/fonts.ts`        | 2시간     |
| 4    | OG Generator UI | `src/features/og-generator/ui/og-generator.tsx` | 5시간     |
| 5    | 도구 페이지     | `src/app/[locale]/tools/og-generator/page.tsx`  | 2시간     |

---

### Month 6: Bulk Actions + API 완성

#### 6.1 추가 Bulk Actions

| 순서 | 작업                 | 파일                                    | 예상 시간 |
| ---- | -------------------- | --------------------------------------- | --------- |
| 1    | Bulk Image Resize    | `src/features/bulk-actions/image-bulk/` | 6시간     |
| 2    | File System API 통합 | Bulk Actions에 FS Access 연동           | 4시간     |
| 3    | ZIP 다운로드         | `src/features/bulk-actions/lib/zip.ts`  | 3시간     |

#### 6.2 API 완성

| 순서 | 작업                   | 파일                                 | 예상 시간 |
| ---- | ---------------------- | ------------------------------------ | --------- |
| 1    | Rate Limiting 미들웨어 | `src/shared/lib/api/rate-limit.ts`   | 4시간     |
| 2    | API 문서 페이지        | `src/app/[locale]/docs/api/page.tsx` | 6시간     |
| 3    | OpenAPI 스펙 생성      | `src/app/api/v1/openapi.json`        | 3시간     |

---

### Phase 2 체크리스트

```
Month 4: File System Access + 문서 도구
├── [ ] File System Access API 핸들러
├── [ ] 폴더 선택 및 스트리밍 처리
├── [ ] Safari/Firefox ZIP Fallback
├── [ ] 브라우저 감지 및 Chrome 유도
├── [ ] PDF Toolkit (병합, 분할, 압축)
├── [ ] PDF 민감정보 마스킹 (Auto-Redaction)
├── [ ] 한글 폰트 임베딩
├── [ ] OCR Scanner (Tesseract.js SIMD)
└── [ ] 언어 팩 관리

Month 5: 미디어 도구 (WebGPU)
├── [ ] WebGPU 감지 및 폴백
├── [ ] Background Remover (ONNX)
├── [ ] U2-Net 모델 CDN 호스팅
├── [ ] OG Image Generator (Satori)
└── [ ] 템플릿 시스템

Month 6: Bulk Actions + API
├── [ ] Bulk Image Resize
├── [ ] File System API 통합
├── [ ] ZIP 다운로드
├── [ ] Rate Limiting
└── [ ] API 문서
```

---

## Phase 3: AI 통합 및 Vertical 진입 (7-12개월)

### Month 7-8: 로컬 AI (OPFS 캐싱)

#### 7.1 OPFS 모델 캐싱

| 순서 | 작업             | 파일                                     | 예상 시간 |
| ---- | ---------------- | ---------------------------------------- | --------- |
| 1    | OPFS 유틸리티    | `src/shared/lib/opfs/manager.ts`         | 4시간     |
| 2    | 모델 캐시 매니저 | `src/shared/lib/ai/model-cache.ts`       | 5시간     |
| 3    | 다운로드 진행률  | `src/shared/lib/ai/download-progress.ts` | 2시간     |
| 4    | 버전 관리        | `src/shared/lib/ai/model-version.ts`     | 2시간     |
| 5    | 캐싱 상태 훅     | `src/shared/lib/ai/use-model-status.ts`  | 3시간     |
| 6    | Ready 인디케이터 | `src/shared/ui/model-ready-badge.tsx`    | 2시간     |

#### 7.2 AI 도구

| 순서 | 작업                    | 파일                               | 예상 시간 |
| ---- | ----------------------- | ---------------------------------- | --------- |
| 1    | Whisper 음성 변환       | `src/features/whisper-transcribe/` | 8시간     |
| 2    | AI Summarizer           | `src/features/ai-summarizer/`      | 6시간     |
| 3    | Fake Door 테스트 시스템 | `src/features/fake-door/`          | 4시간     |

---

### Month 9-10: Vertical 분석 및 설계

| 순서 | 작업                      | 파일                                    | 예상 시간 |
| ---- | ------------------------- | --------------------------------------- | --------- |
| 1    | 리드 데이터 분석 대시보드 | `src/app/[locale]/dashboard/analytics/` | 8시간     |
| 2    | Persona별 전환율 분석     | 대시보드 내 구현                        | 4시간     |
| 3    | Fake Door 결과 분석       | 대시보드 내 구현                        | 3시간     |
| 4    | Vertical 후보 선정        | 문서화                                  | 2시간     |

---

### Month 11-12: 팀 기능 + Enterprise

| 순서 | 작업                 | 파일                                    | 예상 시간 |
| ---- | -------------------- | --------------------------------------- | --------- |
| 1    | 팀 워크스페이스      | `src/features/teams/`                   | 10시간    |
| 2    | 멤버 초대 시스템     | `src/features/teams/lib/invites.ts`     | 4시간     |
| 3    | RBAC 권한 관리       | `src/features/teams/lib/permissions.ts` | 5시간     |
| 4    | 팀 대시보드          | `src/app/[locale]/dashboard/team/`      | 6시간     |
| 5    | 감사 로그            | `src/features/audit-log/`               | 5시간     |
| 6    | Enterprise 영업 자료 | `public/enterprise/`                    | 3시간     |

---

### Phase 3 체크리스트

```
Month 7-8: 로컬 AI
├── [ ] OPFS 모델 캐싱 시스템
├── [ ] Whisper 음성 변환
├── [ ] AI Summarizer
├── [ ] 모델 버전 관리
├── [ ] 다운로드 진행률 UI
└── [ ] Fake Door 테스트 시스템

Month 9-10: Vertical 분석 및 설계
├── [ ] 리드 데이터 분석 대시보드
├── [ ] Persona별 전환율 분석
├── [ ] Fake Door 결과 분석
├── [ ] Vertical 후보 선정
└── [ ] MVP 프로토타입

Month 11-12: 팀 기능 + Enterprise
├── [ ] 팀 워크스페이스
├── [ ] 멤버 초대 시스템
├── [ ] RBAC 권한 관리
├── [ ] 감사 로그
└── [ ] Enterprise 영업 자료
```

---

## 기술 의존성

### Phase 2 패키지

```json
{
  "pdf-lib": "^1.17.x",
  "pdfjs-dist": "^4.x",
  "tesseract.js": "^5.x",
  "onnxruntime-web": "^1.x",
  "satori": "^0.x",
  "@resvg/resvg-js": "^2.x",
  "jszip": "^3.x"
}
```

### Phase 3 패키지

```json
{
  "@xenova/transformers": "^2.x"
}
```

---

## 다음 단계 권장

**Phase 2 시작 순서**:

1. File System Access API 핸들러 (기반 인프라)
2. PDF Toolkit (높은 수요)
3. OCR Scanner (리드 수집 효과 높음)

시작할 항목을 선택해주세요.
