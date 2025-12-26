# UI Components Guide

Web Toolkit의 UI 컴포넌트 시스템 가이드입니다.

---

## Design System Overview

| 항목                  | 값                    |
| --------------------- | --------------------- |
| **Color System**      | OKLCH (CSS Variables) |
| **Component Library** | Radix UI + CVA        |
| **Animation**         | Framer Motion         |
| **Styling**           | Tailwind CSS 4        |

---

## Color Tokens

### Semantic Colors (Light/Dark 자동 전환)

```css
/* Primary */
--primary          /* 주요 버튼, 링크, 강조 */
--primary-foreground

/* Status */
--success          /* 성공, 확인 */
--warning          /* 경고 */
--destructive      /* 에러, 삭제 */

/* Neutral */
--muted            /* 비활성, 배경 */
--muted-foreground /* 보조 텍스트 */
--border           /* 테두리 */
--card             /* 카드 배경 */
```

### 사용 예시

```tsx
// ✅ 시맨틱 토큰 사용
<div className="text-primary bg-muted border-border">
<span className="text-success">Success</span>
<span className="text-destructive">Error</span>

// ❌ 하드코딩 색상 피하기
<div className="text-blue-500 bg-gray-100">
```

---

## Button Variants

```tsx
import { Button } from "@/shared/ui";

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

---

## Responsive Patterns

### Textarea 반응형 높이

```tsx
// ✅ 권장 패턴
<Textarea className="h-[250px] sm:h-[350px] lg:h-[400px]" />

// ❌ 피하기 (모바일 overflow)
<Textarea className="h-[400px]" />
```

### Grid 브레이크포인트

```tsx
// Stats Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// Feature Cards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

// Tool Grid (Bento)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 모바일 우선 숨김

```tsx
// 모바일에서 숨기기
<div className="hidden sm:block">Desktop only</div>

// 데스크탑에서 숨기기
<div className="sm:hidden">Mobile only</div>
```

---

## Animation Patterns (Framer Motion)

### Container + Item Stagger

```tsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.div key={i} variants={item}>
      {i}
    </motion.div>
  ))}
</motion.div>;
```

### Scroll Trigger (whileInView)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Effects

```tsx
<motion.div whileHover={{ y: -4, scale: 1.02 }}>Card content</motion.div>
```

### Accordion (AnimatePresence)

```tsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>;
```

---

## Accessibility Checklist

- [ ] `focus-visible:ring-2 focus-visible:ring-ring` 포커스 스타일
- [ ] `aria-label` 아이콘 버튼에 필수
- [ ] 색상 대비 4.5:1 이상
- [ ] 터치 타겟 44x44px 이상
- [ ] 키보드 네비게이션 지원

```tsx
// ✅ 접근성 준수
<button
  className="focus-visible:ring-2 focus-visible:ring-ring"
  aria-label="Close dialog"
>
  <X className="h-4 w-4" />
</button>
```

---

## Spacing Scale

| Class   | Size | Use Case         |
| ------- | ---- | ---------------- |
| `gap-2` | 8px  | 아이콘 + 텍스트  |
| `gap-4` | 16px | 카드 내부 요소   |
| `gap-6` | 24px | 섹션 내 컴포넌트 |
| `gap-8` | 32px | 섹션 간          |
| `py-6`  | 24px | 컨테이너 패딩    |
| `py-12` | 48px | 섹션 패딩        |

---

## Section Patterns

### Hero Section

```tsx
import { HeroSection } from "@/widgets/hero-section";

<HeroSection
  locale={locale}
  badge="New Feature"
  title="Main Title"
  subtitle="Description text"
  cta="Get Started"
  ctaSecondary="Learn More"
/>;
```

### FAQ Section (Accordion)

```tsx
import { FAQSection } from "@/widgets/faq-section";

<FAQSection
  title="FAQ"
  items={[
    { question: "Q1?", answer: "A1" },
    { question: "Q2?", answer: "A2" },
  ]}
/>;
```

### Related Tools Section

```tsx
<section className="mt-12 pt-8 border-t">
  <div className="rounded-xl bg-muted/30 p-6 sm:p-8">
    <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
    <RelatedToolsSSR currentTool={slug} locale={locale} maxLinks={6} />
  </div>
</section>
```

---

## Common Pitfalls

### 1. 하드코딩 색상

```tsx
// ❌ 피하기
<span className="text-green-500">Success</span>
<span className="text-red-500">Error</span>

// ✅ 시맨틱 토큰
<span className="text-success">Success</span>
<span className="text-destructive">Error</span>
```

### 2. 반응형 스케일

```tsx
// ❌ 데스크탑 전용 스케일 (모바일 레이아웃 깨짐)
<div className="scale-105">

// ✅ 반응형 스케일
<div className="md:scale-105">
```

### 3. Framer Motion ease 타입

```tsx
// ❌ 타입 에러 발생
transition={{ duration: 0.5, ease: "easeOut" }}

// ✅ 올바른 사용
transition={{ duration: 0.5 }}
// 또는
transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
```

### 4. Server Component에서 이벤트 핸들러

```tsx
// ❌ Server Component에서 onClick
export default function Page() {
  return <button onClick={() => {}}>Click</button>;
}

// ✅ "use client" 추가
("use client");
export default function Page() {
  return <button onClick={() => {}}>Click</button>;
}
```

---

## File Structure

```
src/shared/ui/
├── button.tsx       # Button (CVA)
├── input.tsx        # Input
├── textarea.tsx     # Textarea
├── card.tsx         # Card
├── dialog.tsx       # Dialog (Radix)
├── select.tsx       # Select (Radix)
├── switch.tsx       # Switch (Radix)
├── tabs.tsx         # Tabs (Radix)
├── accordion.tsx    # Accordion (Radix)
└── index.ts         # Barrel export

src/widgets/
├── hero-section/    # Animated Hero
├── faq-section/     # Animated FAQ Accordion
├── header/          # Site Header
└── sidebar/         # Navigation Sidebar
```
