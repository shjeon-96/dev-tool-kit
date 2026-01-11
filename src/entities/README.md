# entities/

<!-- AUTO-GENERATED-START -->

## Overview

비즈니스 도메인 엔티티를 정의하는 레이어. 타입 정의와 Supabase 쿼리 함수를 포함합니다.

## Entities

| Entity          | Purpose                         |
| --------------- | ------------------------------- |
| `trend/`        | 트렌드 및 기사 (Article) 엔티티 |
| `author/`       | 저자 프로필 (E-E-A-T SEO용)     |
| `subscription/` | 구독 및 결제 정보               |

## Structure Convention

```
entities/[entity-name]/
├── model/
│   ├── types.ts     # 타입 정의
│   └── queries.ts   # Supabase 쿼리 함수
└── index.ts         # 배럴 export
```

## Usage

```typescript
// Types
import { Article, ArticleCategory, Trend } from "@/entities/trend/model/types";
import { Author, LocalizedAuthor } from "@/entities/author/model/types";

// Queries
import {
  getPublishedArticles,
  getTrendingArticles,
} from "@/entities/trend/model/queries";
import { getAuthorBySlug } from "@/entities/author/model/queries";
```

## Key Types

### ArticleCategory

```typescript
type ArticleCategory =
  | "tech" // 테크놀로지
  | "business" // 비즈니스
  | "lifestyle" // 라이프스타일
  | "entertainment" // 엔터테인먼트
  | "trending" // 트렌딩
  | "news"; // 뉴스
```

### ArticleStatus

```typescript
type ArticleStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";
```

<!-- AUTO-GENERATED-END -->
