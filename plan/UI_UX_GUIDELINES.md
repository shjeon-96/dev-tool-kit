# UI/UX Guidelines

## 🎨 디자인 원칙

### 1. 일관성 (Consistency)
- 모든 도구에서 동일한 레이아웃 패턴 사용
- 통일된 컬러 시스템과 타이포그래피
- 예측 가능한 인터랙션 패턴

### 2. 단순성 (Simplicity)
- 최소한의 클릭으로 원하는 결과 도출
- 불필요한 요소 제거
- 직관적인 UI로 학습 곡선 최소화

### 3. 피드백 (Feedback)
- 모든 액션에 즉각적인 시각적 피드백
- 에러와 성공 상태를 명확히 구분
- 진행 상황을 실시간으로 표시

### 4. 접근성 (Accessibility)
- WCAG 2.1 AA 기준 준수
- 키보드 네비게이션 완벽 지원
- 스크린 리더 호환성

---

## 📐 레이아웃 패턴

### 1. Single Column (단일 컬럼)
**사용 케이스**: 간단한 변환 도구
```
┌─────────────────────────┐
│      Tool Header        │
├─────────────────────────┤
│                         │
│      Input Area         │
│                         │
├─────────────────────────┤
│     Action Buttons      │
├─────────────────────────┤
│                         │
│      Output Area        │
│                         │
└─────────────────────────┘
```
**예시**: Hash Generator, UUID Generator

### 2. Two Column (투 컬럼)
**사용 케이스**: 입력/출력이 명확히 구분되는 도구
```
┌──────────────┬──────────────┐
│   Tool Header (spans both)  │
├──────────────┼──────────────┤
│              │              │
│    Input     │    Output    │
│    Panel     │    Panel     │
│              │              │
├──────────────┴──────────────┤
│      Action Buttons         │
└─────────────────────────────┘
```
**예시**: JSON Formatter, Base64 Converter

### 3. Three Column (쓰리 컬럼)
**사용 케이스**: 설정이 많거나 비교가 필요한 도구
```
┌─────────┬──────────┬──────────┐
│ Options │  Input   │  Output  │
│  Panel  │  Area    │  Area    │
│         │          │          │
└─────────┴──────────┴──────────┘
```
**예시**: Diff Checker, CSS Generators

### 4. Visual Editor (비주얼 에디터)
**사용 케이스**: 시각적 조작이 필요한 도구
```
┌────────────────┬────────────────┐
│   Controls     │                │
│   & Options    │    Preview     │
│                │      Area      │
├────────────────┴────────────────┤
│        Generated Code           │
└─────────────────────────────────┘
```
**예시**: Box Shadow Generator, Gradient Generator

---

## 🎨 컬러 시스템

### Primary Colors
```scss
// Light Theme
--color-primary: hsl(222.2, 47.4%, 11.2%);
--color-primary-foreground: hsl(210, 40%, 98%);

// Dark Theme
--color-primary: hsl(210, 40%, 98%);
--color-primary-foreground: hsl(222.2, 47.4%, 11.2%);
```

### Semantic Colors
```scss
// Success
--color-success: hsl(142, 71%, 45%);
--color-success-light: hsl(141, 84%, 93%);

// Error
--color-error: hsl(0, 84%, 60%);
--color-error-light: hsl(0, 93%, 94%);

// Warning
--color-warning: hsl(38, 92%, 50%);
--color-warning-light: hsl(48, 96%, 89%);

// Info
--color-info: hsl(217, 91%, 60%);
--color-info-light: hsl(214, 95%, 93%);
```

### Neutral Colors
```scss
// Grays
--color-gray-50: hsl(210, 20%, 98%);
--color-gray-100: hsl(210, 16%, 93%);
--color-gray-200: hsl(210, 15%, 89%);
--color-gray-300: hsl(210, 14%, 83%);
--color-gray-400: hsl(210, 13%, 69%);
--color-gray-500: hsl(210, 11%, 56%);
--color-gray-600: hsl(210, 12%, 43%);
--color-gray-700: hsl(210, 14%, 31%);
--color-gray-800: hsl(210, 17%, 20%);
--color-gray-900: hsl(210, 20%, 13%);
```

---

## 🔤 타이포그래피

### Font Family
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
--font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", 
             Consolas, "Courier New", monospace;
```

### Font Sizes
```scss
--text-xs: 0.75rem;    // 12px
--text-sm: 0.875rem;   // 14px
--text-base: 1rem;     // 16px
--text-lg: 1.125rem;   // 18px
--text-xl: 1.25rem;    // 20px
--text-2xl: 1.5rem;    // 24px
--text-3xl: 1.875rem;  // 30px
```

### Font Weights
```scss
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 📏 Spacing System

### Base Unit: 8px
```scss
--space-0: 0;
--space-0.5: 0.125rem;  // 2px
--space-1: 0.25rem;     // 4px
--space-2: 0.5rem;      // 8px
--space-3: 0.75rem;     // 12px
--space-4: 1rem;        // 16px
--space-5: 1.25rem;     // 20px
--space-6: 1.5rem;      // 24px
--space-8: 2rem;        // 32px
--space-10: 2.5rem;     // 40px
--space-12: 3rem;       // 48px
--space-16: 4rem;       // 64px
```

---

## 🧩 컴포넌트 패턴

### 1. Input Components

#### Text Input
```tsx
<div className="input-group">
  <label htmlFor="input-id" className="input-label">
    Label Text
  </label>
  <input
    id="input-id"
    type="text"
    className="input"
    placeholder="Placeholder text..."
  />
  <span className="input-help">Help text</span>
</div>
```

#### File Upload
```tsx
<div className="upload-area" data-state="idle|hover|active">
  <UploadIcon className="upload-icon" />
  <p className="upload-text">
    Drop files here or <button>browse</button>
  </p>
  <p className="upload-hint">
    Supported formats: JPG, PNG, WebP
  </p>
</div>
```

### 2. Button Components

#### Primary Button
```tsx
<button className="btn btn-primary">
  <Icon className="btn-icon" />
  <span>Button Text</span>
</button>
```

#### Button Variants
- `btn-primary`: 주요 액션
- `btn-secondary`: 보조 액션
- `btn-ghost`: 최소한의 스타일
- `btn-danger`: 위험한 액션

### 3. Feedback Components

#### Success Message
```tsx
<div className="alert alert-success">
  <CheckIcon className="alert-icon" />
  <p className="alert-text">Operation completed successfully!</p>
</div>
```

#### Error Message
```tsx
<div className="alert alert-error">
  <XIcon className="alert-icon" />
  <p className="alert-text">Something went wrong. Please try again.</p>
</div>
```

### 4. Loading States

#### Skeleton Loader
```tsx
<div className="skeleton">
  <div className="skeleton-line" />
  <div className="skeleton-line w-3/4" />
  <div className="skeleton-line w-1/2" />
</div>
```

#### Spinner
```tsx
<div className="spinner" aria-label="Loading">
  <div className="spinner-dot" />
  <div className="spinner-dot" />
  <div className="spinner-dot" />
</div>
```

---

## ⌨️ 키보드 단축키

### 전역 단축키
- `Cmd/Ctrl + K`: Command Palette 열기
- `Cmd/Ctrl + /`: 도움말 표시
- `Cmd/Ctrl + ,`: 설정 열기
- `Esc`: 모달/팝업 닫기

### 도구별 단축키
- `Cmd/Ctrl + Enter`: 실행/변환
- `Cmd/Ctrl + A`: 전체 선택
- `Cmd/Ctrl + C`: 복사
- `Cmd/Ctrl + V`: 붙여넣기
- `Cmd/Ctrl + Z`: 실행 취소
- `Cmd/Ctrl + Shift + Z`: 다시 실행

---

## 📱 반응형 디자인

### Breakpoints
```scss
--screen-sm: 640px;   // Mobile landscape
--screen-md: 768px;   // Tablet
--screen-lg: 1024px;  // Desktop
--screen-xl: 1280px;  // Large desktop
--screen-2xl: 1536px; // Extra large
```

### Mobile-First Approach
```scss
// Base styles (mobile)
.container {
  padding: var(--space-4);
}

// Tablet and up
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
  }
}

// Desktop and up
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
  }
}
```

### Layout Adaptation
- **Mobile**: 단일 컬럼, 수직 스택
- **Tablet**: 2 컬럼 가능, 유연한 레이아웃
- **Desktop**: 전체 레이아웃, 사이드바 표시

---

## ♿ 접근성 (Accessibility)

### ARIA Labels
```tsx
<button aria-label="Copy to clipboard" title="Copy">
  <CopyIcon aria-hidden="true" />
</button>
```

### Focus Management
```scss
// Focus visible styles
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

// Skip to content link
.skip-to-content {
  position: absolute;
  left: -9999px;
  
  &:focus {
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
}
```

### Color Contrast
- 일반 텍스트: 최소 4.5:1
- 큰 텍스트: 최소 3:1
- UI 컴포넌트: 최소 3:1

### Screen Reader Support
- 의미 있는 HTML 구조 사용
- 적절한 헤딩 레벨 유지
- 폼 요소와 레이블 연결
- 상태 변경 시 알림

---

## 🎭 애니메이션

### Timing Functions
```scss
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Duration
```scss
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
```

### Common Animations
```scss
// Fade In
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Slide Up
@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// Pulse
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### Motion Preferences
```scss
// Respect user's motion preferences
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🌐 국제화 (i18n)

### Text Direction
```scss
// RTL Support
[dir="rtl"] {
  .input-group {
    text-align: right;
  }
  
  .btn-icon {
    margin-right: 0;
    margin-left: var(--space-2);
  }
}
```

### Language Considerations
- 텍스트 확장을 위한 여유 공간 확보
- 아이콘과 함께 텍스트 레이블 제공
- 문화적으로 중립적인 아이콘 사용

---

## 📋 체크리스트

### 새 도구 UI 체크리스트
- [ ] 적절한 레이아웃 패턴 선택
- [ ] 컬러 시스템 준수
- [ ] 타이포그래피 규칙 적용
- [ ] 반응형 디자인 구현
- [ ] 키보드 네비게이션 테스트
- [ ] 스크린 리더 호환성 확인
- [ ] 다크 모드 지원
- [ ] 로딩/에러 상태 처리
- [ ] 애니메이션 구현
- [ ] 성능 최적화