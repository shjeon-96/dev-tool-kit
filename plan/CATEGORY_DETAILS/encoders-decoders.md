# Encoders & Decoders (인코딩 및 보안)

## 🎯 카테고리 개요

**목적**: 보안 및 인코딩/디코딩이 필요한 개발 작업을 브라우저에서 안전하게 처리

**타겟 사용자**:
- 보안 엔지니어
- API 개발자
- 프론트엔드 개발자
- DevOps 엔지니어

**핵심 가치**:
- **100% 클라이언트 처리**: 민감한 데이터가 서버로 전송되지 않음
- **다양한 인코딩 지원**: 웹 개발에 필요한 모든 인코딩
- **즉각적인 피드백**: 실시간 변환 및 검증
- **보안 우선**: 안전한 처리 보장

---

## 🛠️ 도구별 상세 명세

### 1. JWT Decoder

#### 기능 상세
**디코딩 프로세스**:
```
JWT Token → Split by '.' → Base64 Decode → JSON Parse → Display
```

**표시 정보**:
- **Header**: Algorithm, Type, Key ID
- **Payload**: Claims, Issuer, Subject, Audience
- **Signature**: 검증 상태 (공개키 입력 시)
- **Metadata**: 발행일, 만료일, 남은 시간

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ JWT Token Input                             │
│ [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...]  │
├──────────────┬──────────────────────────────┤
│ HEADER       │ {                            │
│ Algorithm    │   "alg": "HS256",            │
│ Type: JWT    │   "typ": "JWT"               │
│              │ }                            │
├──────────────┼──────────────────────────────┤
│ PAYLOAD      │ {                            │
│ Expires in:  │   "sub": "1234567890",       │
│ 2h 34m 🟢    │   "name": "John Doe",        │
│              │   "iat": 1516239022          │
│              │ }                            │
├──────────────┼──────────────────────────────┤
│ SIGNATURE    │ ⚠️ Signature not verified     │
│              │ [Verify with public key]     │
└──────────────┴──────────────────────────────┘
```

#### 구현 고려사항
- **실시간 만료 타이머**: 초 단위 카운트다운
- **클레임 하이라이팅**: 표준/커스텀 클레임 구분
- **시각화**: 토큰 구조 다이어그램
- **디버깅 도구**: 토큰 생성 도구 (고급)

#### SEO 키워드
- Primary: "jwt decoder", "jwt token decoder", "decode jwt online"
- Secondary: "jwt debugger", "jwt parser", "jwt viewer"
- Long-tail: "jwt token decoder with expiry timer", "jwt claims viewer online"

---

### 2. Base64 Converter

#### 기능 상세
**변환 타입**:
- Text ↔ Base64
- File ↔ Base64
- Image ↔ Base64 (with preview)
- Binary ↔ Base64
- URL Safe Base64

**특수 기능**:
- **이미지 미리보기**: 인코딩된 이미지 즉시 표시
- **파일 크기 표시**: 원본 vs 인코딩 크기 비교
- **청크 처리**: 대용량 파일 Progressive 인코딩
- **Data URL 생성**: `data:image/png;base64,...`

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ [Text] [File] [Image]          [Encode ⇄]   │
├─────────────────┬───────────────────────────┤
│ Input           │ Output                    │
│ ┌─────────────┐ │ ┌────────────────────┐    │
│ │ Drop files  │ │ │ SGVsbG8gV29ybGQ=  │    │
│ │ here or     │ │ │                    │    │
│ │ [Browse]    │ │ │ [Copy] [Download]  │    │
│ └─────────────┘ │ └────────────────────┘    │
│                 │ Preview:                  │
│ Size: 1.2 MB    │ [Image preview here]      │
└─────────────────┴───────────────────────────┘
```

#### 구현 고려사항
- **메모리 관리**: FileReader API chunk 읽기
- **진행률 표시**: 대용량 파일 처리 시
- **MIME 타입 감지**: 자동 Content-Type 설정
- **에러 처리**: 손상된 Base64 복구 시도

---

### 3. URL Encoder/Decoder

#### 기능 상세
**인코딩 옵션**:
- Component (`encodeURIComponent`)
- Full URI (`encodeURI`)
- Custom (특정 문자만)
- RFC 3986 준수

**특수 기능**:
- **한글 처리**: UTF-8 인코딩 확인
- **쿼리 파라미터**: 개별 인코딩/디코딩
- **경로 세그먼트**: 경로별 처리
- **미리보기**: 브라우저에서 어떻게 보일지

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Mode: [Component ▼] [Auto-detect charset ✓] │
├─────────────────────────────────────────────┤
│ Input:                                      │
│ https://example.com/경로?이름=값&foo=bar    │
│                                             │
│ Output:                                     │
│ https://example.com/%EA%B2%BD%EB%A1%9C?     │
│ %EC%9D%B4%EB%A6%84=%EA%B0%92&foo=bar       │
│                                             │
│ Preview in browser:                         │
│ [https://example.com/경로?이름=값&foo=bar]  │
└─────────────────────────────────────────────┘
```

---

### 4. Hash Generator

#### 기능 상세
**알고리즘 지원**:
- MD5 (legacy)
- SHA-1
- SHA-256
- SHA-512
- BLAKE2
- HMAC (with key)

**입력 타입**:
- Text
- File (drag & drop)
- Hex string
- Base64 string

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Algorithm: [SHA-256 ▼]  [HMAC Mode ☐]      │
├─────────────────────────────────────────────┤
│ Input: [Text] [File]                        │
│ ┌─────────────────────────────────────┐     │
│ │ Enter text or drop file here...     │     │
│ └─────────────────────────────────────┘     │
│                                             │
│ HMAC Key (optional):                        │
│ [                                     ]     │
│                                             │
│ Output:                                     │
│ ┌─────────────────────────────────────┐     │
│ │ a665a45920422f9d417e4867efdc4fb8a04 │     │
│ │ a78cf2a8b7fe5f02b081647f26b       │     │
│ └─────────────────────────────────────┘     │
│         [Copy] [Compare with...]            │
└─────────────────────────────────────────────┘
```

#### 구현 고려사항
- **스트리밍 해시**: 대용량 파일 처리
- **해시 비교**: 두 해시 값 비교 기능
- **Salt 지원**: 보안 강화 옵션
- **벤치마크**: 알고리즘별 속도 비교

---

### 5. UUID/ULID Generator

#### 기능 상세
**생성 타입**:
- UUID v1 (timestamp-based)
- UUID v4 (random)
- UUID v5 (namespace)
- ULID (sortable)
- Custom format

**대량 생성**:
- 수량: 1-1000개
- 형식: 대소문자, 하이픈
- 내보내기: CSV, JSON, Text

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Type: [UUID v4 ▼]  Count: [10]  [Generate] │
├─────────────────────────────────────────────┤
│ Generated IDs:                              │
│ ┌─────────────────────────────────────┐     │
│ │ 550e8400-e29b-41d4-a716-446655440000│     │
│ │ 6ba7b810-9dad-11d1-80b4-00c04fd430c8│     │
│ │ 6ba7b811-9dad-11d1-80b4-00c04fd430c8│     │
│ │ ...                                  │     │
│ └─────────────────────────────────────┘     │
│                                             │
│ Format: [Lowercase ▼] [With hyphens ✓]      │
│         [Copy All] [Download as...]         │
└─────────────────────────────────────────────┘
```

---

### 6. HTML Entity Encoder/Decoder

#### 기능 상세
**인코딩 타입**:
- Named entities (`&amp;`, `&lt;`)
- Numeric entities (`&#38;`, `&#60;`)
- Hexadecimal (`&#x26;`, `&#x3C;`)

**옵션**:
- ASCII only
- Encode quotes
- Encode all non-ASCII

#### UI/UX 설계
```
┌─────────────────────────────────────────────┐
│ Mode: [Named Entities ▼]  [Encode quotes ✓] │
├─────────────────┬───────────────────────────┤
│ Input:          │ Output:                   │
│ <div>           │ &lt;div&gt;               │
│   "Hello"       │   &quot;Hello&quot;       │
│   & World       │   &amp; World             │
│ </div>          │ &lt;/div&gt;              │
└─────────────────┴───────────────────────────┘
```

---

## 📊 카테고리 전체 메트릭스

### 예상 사용 빈도 (일일)
1. JWT Decoder: 3,000+ 사용
2. Base64 Converter: 2,500+ 사용
3. Hash Generator: 1,500+ 사용
4. URL Encoder: 1,000+ 사용
5. UUID Generator: 800+ 사용
6. HTML Entity: 500+ 사용

### 보안 중요도
1. JWT Decoder: ⭐⭐⭐⭐⭐ (매우 높음)
2. Hash Generator: ⭐⭐⭐⭐⭐ (매우 높음)
3. Base64 Converter: ⭐⭐⭐ (중간)
4. 기타: ⭐⭐ (일반)

---

## 🔒 보안 구현 지침

### 1. 데이터 처리
```typescript
// 모든 처리는 메모리에서만
const processData = (input: string): string => {
  // 서버 전송 없음
  // localStorage 저장 없음 (사용자 동의 없이)
  // 처리 후 메모리 정리
  return processed;
};
```

### 2. 민감 데이터 경고
```typescript
// JWT, 비밀번호 등 감지 시 경고
const warnings = {
  jwt: "⚠️ JWT 토큰은 민감한 정보를 포함할 수 있습니다",
  password: "⚠️ 비밀번호는 안전하게 관리하세요",
  apiKey: "⚠️ API 키가 감지되었습니다"
};
```

### 3. HTTPS 강제
```typescript
// 보안 도구는 HTTPS에서만 작동
if (location.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
  location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}
```

---

## 🎨 UI 일관성 가이드

### 입력 방식
1. **텍스트 입력**: 대부분의 도구
2. **파일 업로드**: Base64, Hash
3. **드래그앤드롭**: 파일 기반 도구

### 출력 표시
1. **모노스페이스 폰트**: 모든 결과
2. **구문 하이라이팅**: JSON, 코드
3. **복사 버튼**: 모든 결과 옆

### 피드백
- **성공**: 초록색 체크 아이콘
- **에러**: 빨간색 X 아이콘
- **경고**: 노란색 경고 아이콘

---

## 🚀 향후 확장 계획

### 고급 기능
1. **JWT 생성기**: 토큰 생성 도구
2. **암호화 도구**: AES, RSA 암호화
3. **인증서 뷰어**: X.509 인증서 파싱

### API 통합
1. **JWT 검증 API**: 서명 검증 서비스
2. **해시 DB**: 알려진 해시 데이터베이스
3. **보안 스캔**: 취약점 검사