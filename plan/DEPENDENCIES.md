# Dependencies Management

## 🎯 의존성 관리 원칙

### 1. 최소 의존성 (Minimal Dependencies)
- 가능한 한 네이티브 API 사용
- 꼭 필요한 경우에만 외부 라이브러리 추가
- 대안이 있는 경우 더 작은 라이브러리 선택

### 2. 보안 우선 (Security First)
- 정기적인 보안 취약점 스캔
- 의존성 자동 업데이트 설정
- 라이센스 호환성 확인

### 3. 번들 크기 최적화 (Bundle Optimization)
- Tree-shaking 가능한 라이브러리 우선
- Dynamic import로 코드 스플리팅
- 대용량 라이브러리는 CDN 고려

---

## 📦 Core Dependencies

### Framework & Runtime
```json
{
  "next": "16.0.7",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "typescript": "^5"
}
```

### State Management
```json
{
  "zustand": "^5.0.9"  // 경량 상태 관리 (8KB)
}
```

### UI Framework
```json
{
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-slot": "^1.2.4",
  "class-variance-authority": "^0.7.1",
  "tailwind-merge": "^3.4.0",
  "clsx": "^2.1.1"
}
```

### Styling
```json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4"
}
```

### Animation
```json
{
  "framer-motion": "^12.23.25"  // 페이지 전환 애니메이션
}
```

### Icons
```json
{
  "lucide-react": "^0.556.0"  // Tree-shakeable 아이콘
}
```

### Theme
```json
{
  "next-themes": "^0.4.6"  // 다크모드 지원
}
```

---

## 🛠️ Tool-Specific Dependencies

### 1. Converters & Formatters

#### JSON Formatter
```json
{
  "js-beautify": "^1.14.0",    // 15KB - JSON/JS/CSS/HTML 포맷팅
  "yaml": "^2.3.0",            // 89KB - YAML 파싱/변환
  "fast-xml-parser": "^4.3.0"  // 73KB - XML 파싱/변환
}
```
**대안**: 
- `prettier/standalone` (500KB+) - 더 많은 언어 지원 필요 시

#### SQL Formatter
```json
{
  "sql-formatter": "^15.0.0"  // 45KB - SQL 포맷팅
}
```

#### Markdown Preview
```json
{
  "react-markdown": "^9.0.0",     // 43KB - Markdown 렌더링
  "remark-gfm": "^4.0.0",        // 34KB - GitHub Flavored Markdown
  "rehype-highlight": "^7.0.0"   // 218KB - 구문 하이라이팅 (선택)
}
```

#### Diff Checker
```json
{
  "diff": "^5.1.0"  // 13KB - 텍스트 diff 알고리즘
}
```
**참고**: Monaco Editor 내장 diff 뷰어 활용 가능

#### Prettier Playground
```json
{
  "prettier": "^3.1.0",                    // 코어
  "@prettier/plugin-xml": "^3.2.0",        // 플러그인들
  "prettier-plugin-tailwindcss": "^0.5.0"
}
```
**번들 크기**: ~500KB (동적 로딩 필수)

### 2. Encoders & Decoders

#### JWT Decoder
```json
{
  "jwt-decode": "^4.0.0"  // 3.7KB - JWT 디코딩
}
```

#### Base64 Converter
- **Native API 사용**: `btoa()`, `atob()`, `FileReader`

#### URL Encoder
- **Native API 사용**: `encodeURIComponent()`, `decodeURIComponent()`

#### Hash Generator
```json
{
  "crypto-js": "^4.2.0"  // 235KB - 다양한 해시 알고리즘
}
```
**대안**: 
- Web Crypto API (네이티브) - SHA-256/512만 필요한 경우
- `js-sha256` (7KB) - SHA-256만 필요한 경우

#### UUID/ULID Generator
```json
{
  "uuid": "^9.0.0",  // 13KB - UUID 생성
  "ulid": "^2.3.0"   // 3KB - ULID 생성
}
```

#### HTML Entity Encoder
```json
{
  "he": "^1.2.0"  // 92KB - HTML 엔티티 인코딩/디코딩
}
```
**대안**: 
- 커스텀 구현 (간단한 경우)

### 3. Media & Images

#### Image Processing
```json
{
  "browser-image-compression": "^2.0.0",  // 25KB - 이미지 압축
  "react-dropzone": "^14.2.0"            // 23KB - 드래그앤드롭
}
```
**참고**: Canvas API 네이티브 활용

#### App Icon Generator
```json
{
  "jszip": "^3.10.0",      // 100KB - ZIP 생성
  "file-saver": "^2.0.0"   // 2.8KB - 파일 다운로드
}
```

#### QR Code Generator
```json
{
  "qrcode.js": "^1.0.0"        // 17KB - QR 코드 생성
  // 또는
  "react-qr-code": "^2.0.0"    // 130KB - React 컴포넌트
}
```

#### SVG Optimizer
```json
{
  "svgo": "^3.0.0"  // 367KB - SVG 최적화
}
```
**참고**: 브라우저 버전 또는 WASM 고려

#### Color Picker
```json
{
  "colorthief": "^2.4.0",  // 8KB - 색상 추출
  "chroma-js": "^2.4.0"    // 35KB - 색상 조작
}
```

### 4. Web & Network Utilities

#### User Agent Parser
```json
{
  "ua-parser-js": "^1.0.0"  // 18KB - UA 파싱
}
```

#### URL Parser
```json
{
  "query-string": "^8.1.0"  // 8.9KB - 쿼리스트링 파싱
}
```
**참고**: Native URL API로 대부분 처리 가능

#### cURL Builder
- **커스텀 구현**: 외부 의존성 불필요

#### Meta Tag Generator
- **템플릿 기반**: 외부 의존성 불필요

#### Keycode Info
- **Native Event API**: 외부 의존성 불필요

### 5. Development Helpers

#### Unix Timestamp
```json
{
  "date-fns": "^3.0.0"  // 73KB - 날짜 조작 (tree-shakeable)
}
```
**대안**: 
- `dayjs` (7KB) - 더 작은 대안
- Native `Date` API - 기본 기능만 필요한 경우

#### Cron Parser
```json
{
  "cronstrue": "^2.0.0",   // 31KB - Cron → 자연어
  "cron-parser": "^4.0.0"  // 24KB - Cron 파싱
}
```

#### Regex Tester
- **Native RegExp API**: 외부 의존성 불필요

#### Number Base Converter
- **Native API**: `parseInt()`, `toString()`

#### Lorem Ipsum
```json
{
  "lorem-ipsum": "^2.0.0"  // 13KB - 더미 텍스트 생성
}
```

### 6. CSS & UI Tools

모든 CSS 도구는 네이티브 JavaScript로 구현 가능
- 외부 의존성 불필요

---

## 🔧 Development Dependencies

### Build Tools
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.0.7"
}
```

### Testing (Phase 3)
```json
{
  "vitest": "^1.0.0",           // 단위 테스트
  "@testing-library/react": "^14.0.0",
  "@testing-library/user-event": "^14.0.0",
  "playwright": "^1.40.0"       // E2E 테스트
}
```

---

## 📊 Bundle Size Analysis

### 현재 예상 번들 크기
```
Base Next.js App:        ~85KB (gzipped)
React + React DOM:       ~42KB (gzipped)
Common Dependencies:     ~50KB (gzipped)
Monaco Editor:           ~2MB (동적 로딩)
Tool Dependencies:       ~50-200KB per tool
-----------------------------------------
Total Initial Load:      ~180KB (gzipped)
Total with all tools:    ~4MB (code split)
```

### 최적화 전략

#### 1. Dynamic Imports
```typescript
// 도구별 동적 로딩
const JsonFormatter = dynamic(
  () => import('@/features/json-formatter'),
  { loading: () => <ToolSkeleton /> }
);
```

#### 2. Tree Shaking
```typescript
// 필요한 함수만 import
import { format } from 'date-fns/format';
// NOT: import * as dateFns from 'date-fns';
```

#### 3. CDN 활용
```html
<!-- 대용량 라이브러리는 CDN 고려 -->
<script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js"></script>
```

#### 4. Lazy Loading
```typescript
// 사용 시점에 라이브러리 로드
const loadPrettier = async () => {
  const prettier = await import('prettier/standalone');
  const parserBabel = await import('prettier/parser-babel');
  return { prettier, plugins: [parserBabel] };
};
```

---

## 🔐 보안 고려사항

### 1. 의존성 검사
```bash
# 보안 취약점 검사
npm audit

# 자동 수정
npm audit fix

# 업데이트 확인
npm outdated
```

### 2. 라이센스 확인
- MIT, Apache 2.0, BSD: ✅ 사용 가능
- GPL: ⚠️ 주의 필요
- Commercial: ❌ 확인 필요

### 3. Supply Chain Security
```json
{
  "scripts": {
    "postinstall": "npm audit",
    "precommit": "npm audit --production"
  }
}
```

---

## 📈 의존성 추가 가이드라인

### 의존성 추가 전 체크리스트
- [ ] 네이티브 API로 구현 가능한가?
- [ ] 번들 크기는 얼마나 되는가?
- [ ] Tree-shaking을 지원하는가?
- [ ] 보안 취약점은 없는가?
- [ ] 라이센스는 호환되는가?
- [ ] 유지보수가 활발한가?
- [ ] 대안은 없는가?

### 의존성 평가 매트릭스
| 항목 | 가중치 | 평가 기준 |
|------|--------|-----------|
| 번들 크기 | 30% | <10KB: 5점, <50KB: 3점, >50KB: 1점 |
| 기능성 | 25% | 요구사항 충족도 |
| 유지보수 | 20% | 최근 업데이트, 이슈 대응 |
| 보안 | 15% | 취약점 이력, 대응 속도 |
| 인기도 | 10% | NPM 다운로드, GitHub 스타 |

### 대안 검토 프로세스
1. **요구사항 정의**: 정확히 무엇이 필요한가?
2. **네이티브 API 검토**: 브라우저 API로 가능한가?
3. **경량 대안 탐색**: 더 작은 라이브러리는 없나?
4. **커스텀 구현 검토**: 직접 구현이 더 나은가?
5. **최종 결정**: 종합적 평가 후 결정

---

## 🚀 향후 계획

### Phase별 의존성 추가 계획

#### Phase 1 (MVP)
- 최소한의 의존성으로 시작
- 네이티브 API 최대 활용

#### Phase 2 (Visual)
- 이미지 처리 라이브러리 추가
- 파일 처리 유틸리티

#### Phase 3 (Dev Tools)
- 코드 분석 도구
- 고급 파싱 라이브러리

#### Phase 4 (Advanced)
- AI/ML 라이브러리 (선택)
- 고급 시각화 도구