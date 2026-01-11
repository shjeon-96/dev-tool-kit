# UI Component Skill

UI 컴포넌트를 빠르게 생성하는 워크플로우입니다.

## Trigger

- "컴포넌트 만들어줘", "create component"
- "UI 추가", "add ui"
- "버튼/카드/... 만들어줘"

## 컴포넌트 위치

```
src/
├── shared/ui/           # 공통 UI (Button, Card, Input...)
├── widgets/             # 복합 위젯 (Header, Footer, Sidebar...)
└── features/*/ui/       # 기능별 UI
```

## 기존 공통 컴포넌트

```typescript
import {
  Button,
  Input,
  Textarea,
  Card,
  Badge,
  Dialog,
  DropdownMenu,
  Select,
  Checkbox,
  Switch,
  Tabs,
  Table,
  Avatar,
  Skeleton,
  Spinner,
  Alert,
  Toast,
  // ...
} from "@/shared/ui";
```

## 템플릿

### 기본 컴포넌트

```typescript
// src/shared/ui/[name].tsx
"use client";

import { cn } from "@/shared/lib/utils";

interface ComponentNameProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export function ComponentName({
  children,
  className,
  variant = "default",
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        "base-styles",
        variant === "outline" && "outline-styles",
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Radix UI 래퍼

```typescript
// src/shared/ui/[name].tsx
"use client";

import * as RadixComponent from "@radix-ui/react-[name]";
import { cn } from "@/shared/lib/utils";

const Root = RadixComponent.Root;

const Item = React.forwardRef<
  React.ElementRef<typeof RadixComponent.Item>,
  React.ComponentPropsWithoutRef<typeof RadixComponent.Item>
>(({ className, ...props }, ref) => (
  <RadixComponent.Item
    ref={ref}
    className={cn("item-styles", className)}
    {...props}
  />
));
Item.displayName = RadixComponent.Item.displayName;

export { Root, Item };
```

### 서버 컴포넌트

```typescript
// src/features/[feature]/ui/[name].tsx
import { getTranslations } from "next-intl/server";

interface ServerComponentProps {
  data: SomeType;
}

export async function ServerComponent({ data }: ServerComponentProps) {
  const t = await getTranslations("feature");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{data.content}</p>
    </div>
  );
}
```

### 클라이언트 컴포넌트 (with Hook)

```typescript
// src/features/[feature]/ui/[name].tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/ui";

export function InteractiveComponent() {
  const t = useTranslations("feature");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    // 로직
  };

  return (
    <div className="space-y-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("inputPlaceholder")}
      />
      <Button onClick={handleSubmit}>
        {t("submit")}
      </Button>
    </div>
  );
}
```

### 카드 컴포넌트 예시

```typescript
// src/features/blog/ui/article-card.tsx
import Link from "next/link";
import { Badge, Card } from "@/shared/ui";
import { Article } from "@/entities/trend";

interface ArticleCardProps {
  article: Article;
  locale: string;
}

export function ArticleCard({ article, locale }: ArticleCardProps) {
  const title = locale === "ko" ? article.title_ko : article.title_en;
  const excerpt = locale === "ko" ? article.excerpt_ko : article.excerpt_en;

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <Link href={`/${locale}/${article.category}/${article.slug}`}>
        <Badge className="mb-2">{article.category}</Badge>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {excerpt}
        </p>
      </Link>
    </Card>
  );
}
```

### 리스트 컴포넌트 예시

```typescript
// src/features/blog/ui/article-list.tsx
import { Article } from "@/entities/trend";
import { ArticleCard } from "./article-card";

interface ArticleListProps {
  articles: Article[];
  locale: string;
}

export function ArticleList({ articles, locale }: ArticleListProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No articles found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          locale={locale}
        />
      ))}
    </div>
  );
}
```

## 스타일링

### Tailwind 유틸리티

```typescript
// 기본 패턴
className = "flex items-center gap-2";
className = "grid grid-cols-1 md:grid-cols-2 gap-4";
className = "p-4 rounded-lg border bg-card";
className = "text-sm text-muted-foreground";
className = "hover:bg-accent transition-colors";
```

### cn 유틸리티 (조건부 클래스)

```typescript
import { cn } from "@/shared/lib/utils";

className={cn(
  "base-class",
  isActive && "active-class",
  variant === "large" && "large-class",
  className
)}
```

### 시맨틱 컬러

```css
text-foreground       /* 기본 텍스트 */
text-muted-foreground /* 보조 텍스트 */
bg-background         /* 기본 배경 */
bg-card               /* 카드 배경 */
bg-accent             /* 강조 배경 */
border-border         /* 테두리 */
text-primary          /* 주요 색상 */
text-destructive      /* 위험/삭제 */
```

## 애니메이션

### Framer Motion

```typescript
"use client";

import { motion } from "framer-motion";

export function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

## Export 추가

```typescript
// src/shared/ui/index.ts
export { ComponentName } from "./component-name";
```

## 체크리스트

```markdown
### 컴포넌트 생성 체크리스트

- [ ] 컴포넌트 파일 생성
- [ ] Props 인터페이스 정의
- [ ] "use client" 디렉티브 (필요시)
- [ ] cn 유틸리티로 className 병합
- [ ] 시맨틱 컬러 토큰 사용
- [ ] 반응형 스타일링
- [ ] index.ts에 export 추가
```
