# Database (Supabase) Skill

Supabase 데이터베이스 작업 워크플로우입니다.

## Trigger

- "DB 작업", "database"
- "테이블 만들어줘", "create table"
- "쿼리", "query"
- "마이그레이션", "migration"

## 테이블 구조

```
articles          # 기사
trends            # 트렌드 데이터
article_analytics # 조회수 통계
authors           # 저자 (E-E-A-T)
profiles          # 사용자 프로필
subscriptions     # 구독 정보
publish_queue     # 발행 대기열
```

## 쿼리 패턴

### 기본 조회

```typescript
import { createClient } from "@/shared/lib/supabase/server";

export async function getArticles() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

### 페이지네이션

```typescript
export async function getArticlesPaginated(page: number, limit: number) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { data, total: count ?? 0 };
}
```

### 조인 쿼리

```typescript
export async function getArticleWithAuthor(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *,
      author:authors(*)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}
```

### 삽입

```typescript
export async function createArticle(article: CreateArticleInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### 업데이트

```typescript
export async function updateArticle(id: string, updates: Partial<Article>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### 삭제

```typescript
export async function deleteArticle(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw error;
}
```

### Upsert

```typescript
export async function upsertTrend(trend: CreateTrendInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trends")
    .upsert(trend, { onConflict: "keyword,region" })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

## 마이그레이션

### 파일 위치

```
supabase/migrations/
└── YYYYMMDD_description.sql
```

### 마이그레이션 템플릿

```sql
-- supabase/migrations/20260111_add_feature.sql

-- ============================================
-- Feature Name Migration
-- ============================================

-- 1. Create Table
CREATE TABLE IF NOT EXISTS feature_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Indexes
CREATE INDEX IF NOT EXISTS idx_feature_name ON feature_table(name);

-- 3. Add Column to Existing Table
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS new_column TEXT;

-- 4. Create Trigger (updated_at)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON feature_table
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- 5. RLS (Row Level Security)
ALTER TABLE feature_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
ON feature_table FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated insert"
ON feature_table FOR INSERT
TO authenticated
WITH CHECK (true);
```

### 마이그레이션 적용

```bash
# Supabase Dashboard에서 SQL 실행
# 또는 CLI 사용

npx supabase db push
```

## 클라이언트 설정

### 서버 클라이언트

```typescript
// src/shared/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}
```

### 브라우저 클라이언트

```typescript
// src/shared/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

## 타입 생성

```bash
# Supabase CLI로 타입 자동 생성
npx supabase gen types typescript --local > src/shared/types/database.ts
```

## 에러 핸들링

```typescript
import { PostgrestError } from "@supabase/supabase-js";

export async function safeQuery<T>(
  query: Promise<{ data: T | null; error: PostgrestError | null }>,
): Promise<T | null> {
  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }

  return data;
}
```

## 체크리스트

```markdown
### DB 작업 체크리스트

- [ ] 마이그레이션 SQL 작성
- [ ] 인덱스 추가 (자주 조회하는 컬럼)
- [ ] RLS 정책 설정
- [ ] 타입 정의 (types.ts)
- [ ] 쿼리 함수 작성 (queries.ts)
- [ ] 에러 핸들링
- [ ] Supabase Dashboard에서 테스트
```

## 바이브 코딩 팁

```bash
# Supabase Studio 열기
# https://supabase.com/dashboard/project/[project-id]

# 빠른 쿼리 테스트
# SQL Editor에서 직접 실행
```
