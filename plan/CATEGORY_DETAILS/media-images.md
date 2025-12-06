# Media & Images (미디어 처리)

## 🎯 카테고리 개요

**목적**: 이미지와 미디어 파일을 브라우저에서 직접 처리하는 강력한 도구 제공

**타겟 사용자**:
- UI/UX 디자이너
- 프론트엔드 개발자
- 모바일 앱 개발자
- 마케팅/콘텐츠 제작자

**핵심 가치**:
- **네이티브급 성능**: Canvas API, WebAssembly 활용
- **프라이버시 보장**: 이미지가 서버로 전송되지 않음
- **일괄 처리**: 여러 이미지 동시 처리
- **다양한 포맷 지원**: JPEG, PNG, WebP, AVIF

---

## 🛠️ 도구별 상세 명세

### 1. Image Resizer

#### 기능 상세
**리사이징 옵션**:
- **크기 조절**: 픽셀, 퍼센트, 프리셋 (HD, 4K, 소셜미디어)
- **종횡비**: 유지, 자유 변경, 특정 비율 (16:9, 4:3, 1:1)
- **리샘플링**: Lanczos, Bicubic, Bilinear, Nearest
- **스마트 크롭**: 얼굴/객체 인식 중심 크롭

**압축 옵션**:
- **품질**: 1-100% (시각적 비교)
- **포맷**: JPEG, PNG, WebP, AVIF
- **메타데이터**: 유지/제거 선택
- **색상 프로파일**: sRGB 변환

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Drop images here or click to browse         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────┐    │
│ │   Image 1   │ │   Image 2   │ │  +  │    │
│ │  2048x1536  │ │  3000x2000  │ │     │    │
│ │   2.3 MB    │ │   4.1 MB    │ │     │    │
│ └─────────────┘ └─────────────┘ └─────┘    │
├─────────────────────────────────────────────┤
│ Resize Settings:                            │
│ Width: [1920] Height: [1080] [Lock ratio ✓] │
│ Unit: [Pixels ▼]  Preset: [Full HD ▼]      │
│                                             │
│ Compression:                                │
│ Format: [WebP ▼]  Quality: [85]% ──────○   │
│                                             │
│ Before/After Preview:                       │
│ ┌─────────────┬─────────────┐               │
│ │   Original  │  Processed  │               │
│ │   2.3 MB    │   487 KB    │               │
│ └─────────────┴─────────────┘               │
│        [Process All] [Download ZIP]         │
└─────────────────────────────────────────────┘
```

#### 구현 고려사항
- **Web Worker 처리**: 메인 스레드 블로킹 방지
- **메모리 관리**: 대용량 이미지 청크 처리
- **실시간 미리보기**: 품질 변화 즉시 확인
- **배치 프로세싱**: 진행률 표시

#### SEO 키워드
- Primary: "image resizer", "resize image online", "image compressor"
- Secondary: "bulk image resize", "webp converter", "image optimizer"
- Long-tail: "resize images without losing quality", "batch image resizer online free"

---

### 2. App Icon Generator

#### 기능 상세
**플랫폼별 규격**:

**iOS 아이콘**:
- iPhone: 60x60@2x, 60x60@3x
- iPad: 76x76@1x, 76x76@2x, 83.5x83.5@2x
- App Store: 1024x1024
- 기타: 20개+ 크기

**Android 아이콘**:
- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192
- Play Store: 512x512

**기타 플랫폼**:
- Favicon: 16x16, 32x32, 64x64
- PWA: 192x192, 512x512
- Windows: ICO 포맷
- macOS: ICNS 포맷

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Upload your app icon (1024x1024 recommended)│
│ ┌─────────────────────────┐                 │
│ │                         │                 │
│ │    Drop icon here       │  Icon Preview: │
│ │    or click to browse   │  ┌─────┐       │
│ │                         │  │     │       │
│ └─────────────────────────┘  └─────┘       │
├─────────────────────────────────────────────┤
│ Platform Selection:                         │
│ [✓] iOS    [✓] Android    [✓] Web         │
│ [✓] PWA    [ ] Windows    [ ] macOS       │
│                                             │
│ Options:                                    │
│ [✓] Remove transparency                     │
│ [✓] Add padding (10%)                       │
│ [ ] Round corners (iOS style)               │
│                                             │
│ Generated Icons: (23 files)                 │
│ ┌────┬────┬────┬────┬────┐                 │
│ │60@2│60@3│76  │76@2│... │                 │
│ └────┴────┴────┴────┴────┘                 │
│        [Download All (ZIP)]                 │
└─────────────────────────────────────────────┘
```

#### 구현 고려사항
- **자동 배경 처리**: 투명 배경 → 흰색/검정 변환
- **스마트 패딩**: 안전 영역 자동 계산
- **아이콘 검증**: 플랫폼별 요구사항 체크
- **메타데이터 생성**: Contents.json, AndroidManifest 스니펫

---

### 3. QR Code Generator

#### 기능 상세
**QR 코드 타입**:
- **URL**: 웹사이트 링크
- **Text**: 일반 텍스트
- **WiFi**: SSID, 비밀번호, 암호화 타입
- **vCard**: 연락처 정보
- **SMS**: 전화번호, 메시지
- **Email**: 주소, 제목, 본문
- **Geo**: 위도/경도 좌표
- **Event**: 캘린더 이벤트

**커스터마이징**:
- **색상**: 전경/배경색
- **로고**: 중앙 로고 삽입
- **모양**: 사각형, 원형, 둥근 모서리
- **오류 수정 레벨**: L, M, Q, H

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ QR Code Type: [URL ▼]                      │
├──────────────────┬──────────────────────────┤
│ Input:           │ Preview:                 │
│ ┌──────────────┐ │ ┌────────────┐           │
│ │ https://     │ │ │ ▓▓▓▓▓▓▓▓▓ │           │
│ │ example.com  │ │ │ ▓ ▓   ▓ ▓ │           │
│ └──────────────┘ │ │ ▓ ▓▓▓ ▓ ▓ │           │
│                  │ │ ▓     ▓ ▓ │           │
│ Customize:       │ │ ▓▓▓▓▓▓▓▓▓ │           │
│ Foreground: [■]  │ └────────────┘           │
│ Background: [□]  │                          │
│ Size: [512] px   │ Error Level: [M ▼]       │
│                  │                          │
│ [+ Add Logo]     │ Download as:             │
│                  │ [PNG] [SVG] [PDF]        │
└──────────────────┴──────────────────────────┘
```

#### 구현 고려사항
- **실시간 생성**: 입력 시 즉시 QR 코드 생성
- **벡터 출력**: SVG 포맷 지원
- **동적 QR**: 단축 URL 서비스 연동 (선택)
- **스캔 테스트**: 웹캠으로 생성된 QR 테스트

---

### 4. SVG Optimizer

#### 기능 상세
**최적화 옵션**:
- **구조**: 불필요한 그룹, 빈 요소 제거
- **속성**: 기본값 속성, 중복 속성 제거
- **경로**: 경로 데이터 최적화, 소수점 정밀도
- **변환**: 변환 매트릭스 단순화
- **스타일**: 인라인 스타일 → CSS 클래스

**보존 옵션**:
- **뷰박스**: 크기 정보 유지
- **ID/클래스**: JavaScript 조작용
- **애니메이션**: SMIL 애니메이션
- **접근성**: ARIA 속성

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Drop SVG file or paste SVG code             │
├──────────────────┬──────────────────────────┤
│ Original:        │ Optimized:               │
│ Size: 24.5 KB    │ Size: 8.3 KB (-66%)      │
│ Elements: 145    │ Elements: 87             │
│                  │                          │
│ [SVG Preview]    │ [SVG Preview]            │
│                  │                          │
│ Settings:        │ Comparison:              │
│ [✓] Remove IDs   │ ┌──────────────┐         │
│ [✓] Minify       │ │ Visual Diff  │         │
│ [ ] Keep ARIA    │ └──────────────┘         │
└──────────────────┴──────────────────────────┘
```

---

### 5. Color Picker from Image

#### 기능 상세
**색상 추출**:
- **주요 색상**: 5-10개 대표 색상
- **팔레트 생성**: 조화로운 색상 조합
- **픽셀 피커**: 특정 위치 색상 선택
- **색상 분포**: 히스토그램 표시

**색상 정보**:
- **포맷**: HEX, RGB, HSL, HSV
- **이름**: 가장 가까운 색상 이름
- **대비**: WCAG 대비 검사
- **조화**: 보색, 유사색, 삼각색

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Upload image or paste from clipboard        │
├──────────────────┬──────────────────────────┤
│ Image:           │ Extracted Palette:       │
│ ┌──────────────┐ │ ┌───┬───┬───┬───┬───┐   │
│ │              │ │ │   │   │   │   │   │   │
│ │   [Photo]    │ │ └───┴───┴───┴───┴───┘   │
│ │              │ │ #2C3E50 (Dominant)       │
│ └──────────────┘ │                          │
│                  │ Color Details:           │
│ Eyedropper: [🎯] │ HEX: #2C3E50             │
│                  │ RGB: 44, 62, 80          │
│                  │ HSL: 210°, 29%, 24%      │
│                  │                          │
│                  │ Contrast Check:          │
│                  │ On White: 13.1:1 ✓ AAA  │
│                  │ On Black: 1.6:1 ✗       │
└──────────────────┴──────────────────────────┘
```

---

## 📊 카테고리 전체 메트릭스

### 예상 사용 빈도 (일일)
1. Image Resizer: 4,000+ 사용
2. QR Code Generator: 2,000+ 사용
3. App Icon Generator: 1,500+ 사용
4. Color Picker: 1,000+ 사용
5. SVG Optimizer: 500+ 사용

### 기술적 복잡도
1. Image Resizer: ⭐⭐⭐ (Canvas API, Web Workers)
2. App Icon Generator: ⭐⭐⭐⭐ (다중 포맷, 플랫폼별 처리)
3. QR Code Generator: ⭐⭐ (라이브러리 활용)
4. Color Picker: ⭐⭐⭐ (색상 알고리즘)
5. SVG Optimizer: ⭐⭐⭐⭐ (파싱, 최적화 로직)

---

## 🎨 UI/UX 패턴

### 1. 드래그앤드롭
```typescript
// 모든 이미지 도구 공통
const dropzoneConfig = {
  accept: {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
  },
  maxSize: 10 * 1024 * 1024, // 10MB
  multiple: true,
  onDrop: handleFileUpload
};
```

### 2. 실시간 미리보기
```typescript
// Before/After 비교
const PreviewComparison = () => (
  <div className="comparison-slider">
    <img src={original} alt="Before" />
    <div className="slider-handle" />
    <img src={processed} alt="After" />
  </div>
);
```

### 3. 진행률 표시
```typescript
// 배치 처리 시
interface ProgressState {
  current: number;
  total: number;
  fileName: string;
  status: 'processing' | 'completed' | 'error';
}
```

---

## ⚡ 성능 최적화

### 1. Canvas 처리
```typescript
// 고성능 이미지 처리
const processImage = (img: ImageData): ImageData => {
  const worker = new Worker('./image.worker.js');
  return new Promise((resolve) => {
    worker.postMessage({ img, options });
    worker.onmessage = (e) => resolve(e.data);
  });
};
```

### 2. 메모리 관리
```typescript
// 대용량 이미지 처리
const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
const processLargeImage = async (file: File) => {
  for (let i = 0; i < file.size; i += CHUNK_SIZE) {
    const chunk = file.slice(i, i + CHUNK_SIZE);
    await processChunk(chunk);
  }
};
```

### 3. WebAssembly 활용
```typescript
// 무거운 연산은 WASM으로
const loadWASM = async () => {
  const module = await import('./image-processor.wasm');
  return module.initialize();
};
```

---

## 🚀 향후 확장 계획

### Phase 2 추가 기능
1. **배경 제거**: AI 기반 배경 제거
2. **이미지 필터**: Instagram 스타일 필터
3. **워터마크**: 일괄 워터마크 추가

### Phase 3 고급 기능
1. **RAW 지원**: DNG, CR2 등 RAW 포맷
2. **EXIF 편집**: 메타데이터 수정
3. **애니메이션**: GIF/APNG 생성

### API 서비스
1. **대량 처리 API**: 기업용 일괄 처리
2. **CDN 통합**: 처리된 이미지 호스팅
3. **Webhook**: 처리 완료 알림