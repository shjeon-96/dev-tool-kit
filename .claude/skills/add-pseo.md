# Add pSEO Page Skill

프로그래매틱 SEO 페이지를 추가하는 워크플로우입니다.

## Trigger

- "pSEO 페이지 추가", "add programmatic SEO page"
- 특정 pSEO 타입 요청 (예: "hash 타입 페이지 추가해줘")

## Existing pSEO Routes

| Route                    | Registry Location                     | Description     |
| ------------------------ | ------------------------------------- | --------------- |
| `/convert/[slug]`        | `entities/converter/model/`           | 포맷 변환       |
| `/resize-to/[target]`    | `entities/image-resize-target/model/` | 이미지 리사이즈 |
| `/encode/[type]`         | `entities/encode-decode-type/model/`  | 인코딩          |
| `/decode/[type]`         | `entities/encode-decode-type/model/`  | 디코딩          |
| `/hash/[type]`           | `entities/hash-type/model/`           | 해시 생성       |
| `/minify/[type]`         | `entities/minify-type/model/`         | 코드 압축       |
| `/validate/[type]`       | `entities/validate-type/model/`       | 유효성 검사     |
| `/diff/[type]`           | `entities/diff-type/model/`           | 차이 비교       |
| `/format/[type]`         | `entities/format-type/model/`         | 코드 포맷팅     |
| `/generate/[type]`       | `entities/generate-type/model/`       | 코드 생성       |
| `/alternative-to/[comp]` | `entities/competitor/model/`          | 경쟁사 비교     |
| `/glossary/[term]`       | `entities/glossary/model/`            | 용어집          |
| `/use-cases/[slug]`      | `entities/use-case/model/`            | 사용 사례       |
| `/compare/[slug]`        | `entities/comparison/model/`          | 도구 비교       |
| `/ai/[context]`          | `entities/ai-context/model/`          | AI 컨텍스트     |

## Workflow: Adding New Item to Existing pSEO Type

### Step 1: Registry 업데이트

**Example:** `src/entities/hash-type/model/registry.ts`

```typescript
export const hashTypes: Record<HashType, HashTypeConfig> = {
  // 기존 항목들...
  "new-hash": {
    algorithm: "NEW-HASH",
    description: {
      en: "English description",
      ko: "한국어 설명",
      ja: "日本語の説明",
    },
    outputLength: 256,
    category: "cryptographic",
  },
};
```

### Step 2: 타입 추가 (필요 시)

**File:** `src/entities/hash-type/model/types.ts`

```typescript
export type HashType = "existing-type" | "new-hash"; // 추가
```

### Step 3: 번역 추가

**Files:** `messages/*.json`

```json
{
  "hashTypes": {
    "new-hash": {
      "title": "NEW-HASH Generator",
      "description": "Generate NEW-HASH hashes"
    }
  }
}
```

### Step 4: sitemap.ts 확인

`src/app/sitemap.ts`가 해당 레지스트리를 순회하는지 확인

## Workflow: Creating New pSEO Route Type

### Step 1: Entity 생성

**Directory:** `src/entities/new-type/`

```
new-type/
├── model/
│   ├── types.ts      # 타입 정의
│   ├── registry.ts   # 데이터 레지스트리
│   └── index.ts      # 배럴 export
└── index.ts
```

#### types.ts:

```typescript
export type NewType = "item-1" | "item-2" | "item-3";

export interface NewTypeConfig {
  title: string;
  description: Record<"en" | "ko" | "ja", string>;
  // 필요한 필드 추가
}
```

#### registry.ts:

```typescript
import type { NewType, NewTypeConfig } from "./types";

export const newTypes: Record<NewType, NewTypeConfig> = {
  "item-1": {
    title: "Item 1",
    description: {
      en: "Description in English",
      ko: "한국어 설명",
      ja: "日本語の説明",
    },
  },
  // 추가 항목들...
};

export const newTypeList = Object.keys(newTypes) as NewType[];
```

### Step 2: App Route 생성

**Directory:** `src/app/[locale]/new-route/[slug]/`

```
[slug]/
├── page.tsx
└── (optional) layout.tsx
```

#### page.tsx 템플릿:

```typescript
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { newTypes, newTypeList } from "@/entities/new-type/model";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    newTypeList.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "newTypes" });

  const config = newTypes[slug as keyof typeof newTypes];
  if (!config) return {};

  const url = `https://web-toolkit.app/${locale}/new-route/${slug}`;

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://web-toolkit.app/${l}/new-route/${slug}`])
      ),
    },
  };
}

export default async function NewRoutePage({ params }: Props) {
  const { locale, slug } = await params;
  const config = newTypes[slug as keyof typeof newTypes];

  if (!config) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "newTypes" });

  // Locale fallback (es, pt, de -> en)
  type LocaleKey = "en" | "ko" | "ja";
  const localeKey: LocaleKey =
    locale === "ko" || locale === "ja" ? locale : "en";

  return (
    <main className="container py-8">
      <h1>{t(`${slug}.title`)}</h1>
      <p>{config.description[localeKey]}</p>
      {/* 페이지 콘텐츠 */}
    </main>
  );
}
```

### Step 3: Sitemap 업데이트

**File:** `src/app/sitemap.ts`

```typescript
import { newTypeList } from "@/entities/new-type/model";

// sitemap entries에 추가
const newTypeUrls = locales.flatMap((locale) =>
  newTypeList.map((slug) => ({
    url: `${baseUrl}/${locale}/new-route/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
);
```

### Step 4: 번역 추가 (6개 언어)

각 `messages/*.json`에 네임스페이스 추가

## Locale Fallback Pattern

es, pt, de 언어에서 번역이 없는 경우:

```typescript
type LocaleKey = "en" | "ko" | "ja";

function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}
```

## Validation

```bash
# 빌드로 정적 생성 확인
npm run build

# 특정 페이지 접근 테스트
curl -I http://localhost:3000/en/new-route/item-1
```

## Common Pitfalls

1. **generateStaticParams에서 routing.locales 사용 필수** - 하드코딩 금지
2. **alternates.languages에 6개 언어 모두 포함**
3. **Locale fallback 누락** - es, pt, de에서 런타임 에러
4. **sitemap.ts 업데이트 누락** - 크롤링 안 됨
