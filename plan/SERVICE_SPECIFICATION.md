# DevToolkit 전체 기능 명세서

## 📋 개요

이 문서는 DevToolkit이 제공할 모든 도구들의 상세 명세를 담고 있습니다. 
각 도구는 **"Client-side Only"** 원칙에 따라 사용자의 브라우저에서만 작동합니다.

## 🎯 우선순위 매트릭스

우선순위는 다음 3가지 요소를 고려하여 결정됩니다:
- **효용성 (Utility)**: 실제 개발자들의 사용 빈도
- **난이도 (Complexity)**: 구현 복잡도 및 소요 시간
- **SEO 가치 (SEO Value)**: 검색 트래픽 유입 잠재력

---

## 1. Converters & Formatters (변환 및 포맷팅)

### 1.1 JSON Formatter ⭐⭐⭐
- **기능**: JSON 데이터 포맷팅, 압축, 검증, 변환
- **상세 기능**:
  - Beautify (들여쓰기 조절)
  - Minify (공백 제거)
  - Validate (구문 오류 체크)
  - Convert (JSON ↔ YAML/XML)
  - Tree View (계층 구조 시각화)
- **입력/출력**: Text Editor (Monaco)
- **핵심 라이브러리**: `js-beautify`, `yaml`, `fast-xml-parser`
- **번들 영향도**: ~150KB
- **SEO 키워드**: "json formatter", "json beautifier", "json validator online"
- **우선순위**: Phase 1 (MVP)

### 1.2 SQL Formatter
- **기능**: SQL 쿼리 정렬 및 포맷팅
- **상세 기능**:
  - 방언 선택 (MySQL, PostgreSQL, Oracle, SQL Server)
  - 대소문자 변환 옵션
  - 압축/정렬 모드
- **입력/출력**: Code Editor
- **핵심 라이브러리**: `sql-formatter`
- **번들 영향도**: ~80KB
- **SEO 키워드**: "sql formatter", "sql beautifier", "format sql query"
- **우선순위**: Phase 3

### 1.3 Markdown Preview
- **기능**: 실시간 마크다운 미리보기
- **상세 기능**:
  - Split View (편집기/미리보기)
  - GFM (GitHub Flavored Markdown) 지원
  - HTML/PDF 내보내기
  - 테마 선택
- **입력/출력**: Split Editor/Preview
- **핵심 라이브러리**: `react-markdown`, `remark-gfm`
- **번들 영향도**: ~200KB
- **SEO 키워드**: "markdown preview", "markdown editor online"
- **우선순위**: Phase 3

### 1.4 Diff Checker
- **기능**: 코드/텍스트 차이점 비교
- **상세 기능**:
  - Side-by-side / Inline 뷰
  - 문법 하이라이팅
  - 변경사항 통계
  - Git 스타일 diff 출력
- **입력/출력**: Dual Editors
- **핵심 라이브러리**: `diff`, `monaco-editor` (내장 diff)
- **번들 영향도**: Monaco에 포함
- **SEO 키워드**: "diff checker", "text compare", "code diff tool"
- **우선순위**: Phase 3

### 1.5 Prettier Playground
- **기능**: 다양한 언어 코드 포맷팅
- **상세 기능**:
  - 언어별 옵션 조절 (탭 크기, 세미콜론 등)
  - 지원 언어: JS, TS, CSS, HTML, JSON, Markdown
  - Config 파일 생성
- **입력/출력**: Code Editor
- **핵심 라이브러리**: `prettier/standalone`, 언어별 파서
- **번들 영향도**: ~500KB (동적 로딩 필요)
- **SEO 키워드**: "prettier online", "code formatter", "javascript beautifier"
- **우선순위**: Phase 4

---

## 2. Encoders & Decoders (인코딩 및 보안)

### 2.1 JWT Decoder ⭐⭐⭐
- **기능**: JWT 토큰 디코딩 및 분석
- **상세 기능**:
  - Header/Payload 분리 표시
  - 만료 시간 시각화 (타이머)
  - 클레임 정보 테이블 뷰
  - 시그니처 검증 (공개키 입력 시)
- **입력/출력**: Text Input
- **핵심 라이브러리**: `jwt-decode`
- **번들 영향도**: ~10KB
- **SEO 키워드**: "jwt decoder", "jwt token decoder", "decode jwt online"
- **우선순위**: Phase 1 (MVP)

### 2.2 Base64 Converter ⭐⭐⭐
- **기능**: Base64 인코딩/디코딩
- **상세 기능**:
  - Text ↔ Base64
  - Image ↔ Base64 (드래그앤드롭)
  - File ↔ Base64
  - URL Safe Base64
- **입력/출력**: Text/File Input
- **핵심 라이브러리**: Native `btoa`/`atob`, FileReader API
- **번들 영향도**: 0KB (네이티브)
- **SEO 키워드**: "base64 encoder", "base64 decoder", "image to base64"
- **우선순위**: Phase 1 (MVP)

### 2.3 URL Encoder
- **기능**: URL 인코딩/디코딩
- **상세 기능**:
  - 전체 URL 인코딩
  - 컴포넌트별 인코딩
  - 한글 깨짐 방지 확인
  - 쿼리 파라미터 파싱
- **입력/출력**: Text Input
- **핵심 라이브러리**: Native `encodeURIComponent`
- **번들 영향도**: 0KB
- **SEO 키워드**: "url encoder", "url decoder", "percent encoding"
- **우선순위**: Phase 2

### 2.4 Hash Generator
- **기능**: 단방향 해시 생성
- **상세 기능**:
  - 알고리즘: MD5, SHA-1, SHA-256, SHA-512
  - 파일 해시 (드래그앤드롭)
  - HMAC 지원
  - Salt 추가 옵션
- **입력/출력**: Text/File Input
- **핵심 라이브러리**: `crypto-js`
- **번들 영향도**: ~100KB
- **SEO 키워드**: "hash generator", "sha256 online", "md5 generator"
- **우선순위**: Phase 2

### 2.5 UUID/ULID Generator
- **기능**: 고유 ID 생성
- **상세 기능**:
  - UUID v1, v4 생성
  - ULID (Sortable) 생성
  - 대량 생성 (최대 1000개)
  - 복사/내보내기
- **입력/출력**: Button Actions
- **핵심 라이브러리**: `uuid`, `ulid`
- **번들 영향도**: ~20KB
- **SEO 키워드**: "uuid generator", "guid generator", "ulid generator"
- **우선순위**: Phase 2

### 2.6 HTML Entity Encoder
- **기능**: HTML 엔티티 변환
- **상세 기능**:
  - 특수문자 → 엔티티 코드
  - 엔티티 코드 → 특수문자
  - Named/Numeric 엔티티
- **입력/출력**: Text Input
- **핵심 라이브러리**: `he`
- **번들 영향도**: ~30KB
- **SEO 키워드**: "html entity encoder", "html escape", "special characters"
- **우선순위**: Phase 3

---

## 3. Media & Images (미디어 처리)

### 3.1 Image Resizer ⭐⭐⭐
- **기능**: 이미지 크기 조절 및 압축
- **상세 기능**:
  - 픽셀/퍼센트 단위 리사이징
  - 종횡비 유지/자유 변경
  - 품질 조절 (1-100%)
  - 포맷 변환 (JPEG, PNG, WebP)
  - 일괄 처리
- **입력/출력**: Drag & Drop / Download
- **핵심 라이브러리**: Canvas API, `browser-image-compression`
- **번들 영향도**: ~50KB
- **SEO 키워드**: "image resizer", "resize image online", "compress image"
- **우선순위**: Phase 2 (Visual)

### 3.2 App Icon Generator ⭐⭐⭐
- **기능**: 앱 아이콘 자동 생성
- **상세 기능**:
  - iOS 규격 (모든 크기)
  - Android 규격 (mdpi~xxxhdpi)
  - Favicon 세트
  - PWA 아이콘
  - ZIP 다운로드
- **입력/출력**: Image Upload / ZIP
- **핵심 라이브러리**: Canvas API, `jszip`, `file-saver`
- **번들 영향도**: ~150KB
- **SEO 키워드**: "app icon generator", "favicon generator", "ios icon sizes"
- **우선순위**: Phase 2 (Visual)

### 3.3 QR Code Generator ⭐⭐⭐
- **기능**: QR 코드 생성
- **상세 기능**:
  - 텍스트, URL, WiFi, 연락처
  - 크기/여백 조절
  - 색상 커스터마이징
  - 로고 삽입
  - SVG/PNG 다운로드
- **입력/출력**: Form Input / Image
- **핵심 라이브러리**: `qrcode.js` 또는 `react-qr-code`
- **번들 영향도**: ~40KB
- **SEO 키워드**: "qr code generator", "qr code maker", "create qr code"
- **우선순위**: Phase 2 (Visual)

### 3.4 SVG Optimizer
- **기능**: SVG 파일 최적화
- **상세 기능**:
  - 불필요한 속성 제거
  - 경로 단순화
  - 압축률 표시
  - 미리보기
- **입력/출력**: SVG Code/File
- **핵심 라이브러리**: `svgo` (브라우저 버전)
- **번들 영향도**: ~200KB
- **SEO 키워드**: "svg optimizer", "svg compressor", "optimize svg"
- **우선순위**: Phase 4

### 3.5 Color Picker ⭐⭐
- **기능**: 이미지에서 색상 추출
- **상세 기능**:
  - 주요 색상 팔레트 추출
  - 색상 코드 (HEX, RGB, HSL)
  - 대비 검사 (WCAG)
  - 색상 조화 제안
- **입력/출력**: Image Upload
- **핵심 라이브러리**: `colorthief`, `chroma-js`
- **번들 영향도**: ~80KB
- **SEO 키워드**: "color picker from image", "extract colors", "color palette"
- **우선순위**: Phase 2 (Visual)

### 3.6 OG Image Preview
- **기능**: Open Graph 미리보기
- **상세 기능**:
  - URL 입력으로 OG 태그 파싱
  - 카톡/페북/트위터 미리보기
  - 메타 태그 검증
- **입력/출력**: URL Input
- **핵심 라이브러리**: 서버 액션 필요 (예외적)
- **번들 영향도**: Server-side
- **SEO 키워드**: "og image preview", "open graph tester"
- **우선순위**: Phase 4

---

## 4. Web & Network Utilities (웹 유틸리티)

### 4.1 User Agent Parser
- **기능**: User Agent 문자열 분석
- **상세 기능**:
  - 현재 브라우저 자동 감지
  - OS, 디바이스, 브라우저 정보
  - 버전 정보 파싱
  - 봇 감지
- **입력/출력**: Auto Detect / Text
- **핵심 라이브러리**: `ua-parser-js`
- **번들 영향도**: ~30KB
- **SEO 키워드**: "user agent parser", "browser detection", "ua string"
- **우선순위**: Phase 3

### 4.2 URL Parser
- **기능**: URL 구성 요소 분해
- **상세 기능**:
  - 프로토콜, 호스트, 경로 분리
  - 쿼리 파라미터 테이블
  - URL 재구성
  - 유효성 검사
- **입력/출력**: URL Input
- **핵심 라이브러리**: Native URL API, `query-string`
- **번들 영향도**: ~15KB
- **SEO 키워드**: "url parser", "parse url online", "url components"
- **우선순위**: Phase 3

### 4.3 cURL Builder
- **기능**: cURL 명령어 생성기
- **상세 기능**:
  - HTTP 메소드 선택
  - 헤더/바디 입력
  - 인증 옵션
  - 명령어 복사
- **입력/출력**: Form UI
- **핵심 라이브러리**: 커스텀 로직
- **번들 영향도**: 0KB
- **SEO 키워드**: "curl generator", "curl builder", "http request builder"
- **우선순위**: Phase 3

### 4.4 Meta Tag Generator
- **기능**: SEO 메타 태그 생성
- **상세 기능**:
  - 기본 메타 태그
  - Open Graph 태그
  - Twitter Cards
  - 미리보기
- **입력/출력**: Form UI
- **핵심 라이브러리**: 템플릿 로직
- **번들 영향도**: 0KB
- **SEO 키워드**: "meta tag generator", "seo tags", "og tags generator"
- **우선순위**: Phase 3

### 4.5 Keycode Info
- **기능**: 키보드 이벤트 정보 표시
- **상세 기능**:
  - event.key, event.code
  - keyCode (deprecated)
  - 모디파이어 키 감지
- **입력/출력**: Key Press
- **핵심 라이브러리**: Event Listeners
- **번들 영향도**: 0KB
- **SEO 키워드**: "keycode info", "javascript keycode", "keyboard event"
- **우선순위**: Phase 4

---

## 5. Development Helpers (개발 보조)

### 5.1 Unix Timestamp Converter ⭐⭐⭐
- **기능**: 타임스탬프 변환
- **상세 기능**:
  - 현재 타임스탬프 표시 (실시간)
  - 날짜 → 타임스탬프
  - 타임스탬프 → 날짜
  - 타임존 변환
  - 밀리초/초 단위
- **입력/출력**: Date/Number Input
- **핵심 라이브러리**: `date-fns`
- **번들 영향도**: ~50KB
- **SEO 키워드**: "unix timestamp converter", "epoch converter", "timestamp to date"
- **우선순위**: Phase 1 (MVP)

### 5.2 Cron Parser
- **기능**: Cron 표현식 해석
- **상세 기능**:
  - 사람이 읽기 쉬운 설명
  - 다음 실행 시간 계산
  - 표현식 검증
  - 프리셋 제공
- **입력/출력**: Text Input
- **핵심 라이브러리**: `cronstrue`, `cron-parser`
- **번들 영향도**: ~40KB
- **SEO 키워드**: "cron parser", "cron expression", "crontab generator"
- **우선순위**: Phase 3

### 5.3 Regex Tester
- **기능**: 정규식 테스트
- **상세 기능**:
  - 실시간 매칭 하이라이팅
  - 플래그 옵션 (g, i, m)
  - 매치 그룹 표시
  - 치트시트 제공
  - 언어별 코드 생성
- **입력/출력**: Pattern & Test String
- **핵심 라이브러리**: Native RegExp
- **번들 영향도**: 0KB
- **SEO 키워드**: "regex tester", "regular expression tester", "regex online"
- **우선순위**: Phase 4

### 5.4 Number Base Converter
- **기능**: 진법 변환
- **상세 기능**:
  - 2진수, 8진수, 10진수, 16진수
  - 사용자 정의 진법 (2-36)
  - 음수 지원
  - 비트 연산 표시
- **입력/출력**: Number Input
- **핵심 라이브러리**: Native parseInt/toString
- **번들 영향도**: 0KB
- **SEO 키워드**: "number base converter", "hex to decimal", "binary converter"
- **우선순위**: Phase 3

### 5.5 Lorem Ipsum Generator
- **기능**: 더미 텍스트 생성
- **상세 기능**:
  - 단어/문장/문단 단위
  - 한국어 더미 텍스트
  - 더미 이미지 URL
  - HTML 태그 포함
- **입력/출력**: Options Form
- **핵심 라이브러리**: `lorem-ipsum`
- **번들 영향도**: ~20KB
- **SEO 키워드**: "lorem ipsum generator", "dummy text", "placeholder text"
- **우선순위**: Phase 4

---

## 6. CSS & UI Tools (스타일링)

### 6.1 Box Shadow Generator
- **기능**: CSS 그림자 생성
- **상세 기능**:
  - 시각적 슬라이더 조절
  - 다중 그림자
  - Inset 옵션
  - 실시간 미리보기
- **입력/출력**: Visual UI
- **핵심 라이브러리**: CSS Variables
- **번들 영향도**: 0KB
- **SEO 키워드**: "box shadow generator", "css shadow", "shadow css"
- **우선순위**: Phase 4

### 6.2 Border Radius Generator
- **기능**: 둥근 모서리 생성
- **상세 기능**:
  - 각 모서리 개별 조절
  - 타원형 반경
  - 8-point 도형
- **입력/출력**: Visual UI
- **핵심 라이브러리**: CSS Variables
- **번들 영향도**: 0KB
- **SEO 키워드**: "border radius generator", "css rounded corners"
- **우선순위**: Phase 4

### 6.3 CSS to Tailwind Converter
- **기능**: CSS → Tailwind 클래스 변환
- **상세 기능**:
  - 일반 CSS 파싱
  - 근사치 매칭
  - 지원되지 않는 속성 표시
- **입력/출력**: CSS Code
- **핵심 라이브러리**: 정규식/매핑 테이블
- **번들 영향도**: ~50KB
- **SEO 키워드**: "css to tailwind", "tailwind converter", "convert css"
- **우선순위**: Phase 4

### 6.4 Gradient Generator
- **기능**: CSS 그라디언트 생성
- **상세 기능**:
  - 선형/원형/원뿔형
  - 색상 스톱 조절
  - 각도 조절
  - CSS 코드 출력
- **입력/출력**: Color Picker UI
- **핵심 라이브러리**: 커스텀 로직
- **번들 영향도**: 0KB
- **SEO 키워드**: "gradient generator", "css gradient", "linear gradient"
- **우선순위**: Phase 4

---

## 📊 번들 사이즈 영향도 분석

### 총 예상 번들 크기 (모든 도구 포함)
- **Base (Next.js + React + 공통)**: ~200KB
- **Monaco Editor**: ~2MB (동적 로딩)
- **도구별 라이브러리**: ~2MB
- **총합**: ~4.2MB (코드 스플리팅 적용 시)

### 최적화 전략
1. **Route-based Code Splitting**: 도구별 동적 import
2. **Monaco Editor 지연 로딩**: 필요한 도구에서만 로드
3. **이미지 처리 Web Worker**: 메인 스레드 블로킹 방지
4. **CDN 활용**: 대용량 라이브러리는 CDN 고려

---

## 🔍 SEO 최적화 키워드 맵

### High-Value Keywords (월 검색량 10K+)
- "json formatter online"
- "base64 decoder"
- "image resizer online"
- "qr code generator"

### Medium-Value Keywords (월 검색량 1K-10K)
- "jwt decoder online"
- "unix timestamp converter"
- "sql formatter online"
- "regex tester online"

### Long-tail Keywords
- "resize image without losing quality"
- "generate app icons all sizes"
- "convert json to yaml online"
- "hash generator sha256 online"

---

## 🚀 구현 복잡도 레벨

### Level 1 (간단) - 1-2일
- URL Encoder, HTML Entity, Number Base Converter

### Level 2 (중간) - 3-4일
- JSON Formatter, JWT Decoder, Base64 Converter, Unix Timestamp

### Level 3 (복잡) - 5-7일
- Image Resizer, QR Code Generator, Diff Checker

### Level 4 (매우 복잡) - 1-2주
- App Icon Generator, Prettier Playground, Regex Tester