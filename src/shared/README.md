# shared/

<!-- AUTO-GENERATED-START -->

## Overview

의존성 없는 공통 코드. UI 컴포넌트, hooks, 설정, 유틸리티 함수를 포함합니다.

## Structure

| Directory | Purpose                                  |
| --------- | ---------------------------------------- |
| `ui/`     | 공통 UI 컴포넌트 (Radix UI 기반)         |
| `lib/`    | 공통 라이브러리 (Supabase, hooks, utils) |
| `config/` | 앱 설정 (site config, ad slots)          |
| `types/`  | 공통 타입 정의                           |

## ui/

Radix UI 기반 공통 컴포넌트

```typescript
import { Button, Input, Card, Badge } from "@/shared/ui";
```

## lib/

### supabase/

Supabase 클라이언트 설정

```typescript
import { createClient } from "@/shared/lib/supabase/client";
import { createServerClient } from "@/shared/lib/supabase/server";
```

### hooks/

공통 React Hooks

```typescript
import { useMediaQuery, useLocalStorage } from "@/shared/lib/hooks";
```

### lemonsqueezy/

LemonSqueezy 결제 클라이언트

### errors/

에러 처리 유틸리티

### data-pipeline/

데이터 파이프라인 유틸리티

## config/

### site.ts

```typescript
import { SITE_CONFIG } from "@/shared/config/site";
```

### ad-slots.ts

```typescript
import { AD_SLOTS } from "@/shared/config/ad-slots";
```

## Key Files

| File                  | Purpose                  |
| --------------------- | ------------------------ |
| `lib/db.ts`           | 데이터베이스 유틸리티    |
| `lib/kv.ts`           | Key-Value 스토어         |
| `lib/storage.ts`      | 파일 스토리지 유틸리티   |
| `lib/format-utils.ts` | 포맷팅 함수 (날짜, 숫자) |

<!-- AUTO-GENERATED-END -->
