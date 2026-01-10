# Validate Skill

프로젝트 일관성과 코드 품질을 검증하는 워크플로우입니다.

## Trigger

- "검증해줘", "validate"
- "빌드 체크", "build check"
- "린트", "lint"

## Quick Validation

```bash
# 전체 검증 (타입 + 린트 + 빌드)
npx tsc --noEmit && npm run lint && npm run build
```

## Validation Commands

### 1. Type Check

```bash
npx tsc --noEmit
```

모든 TypeScript 타입 오류 확인

### 2. Lint Check

```bash
npm run lint
```

ESLint 규칙 위반 검사

### 3. Build Validation

```bash
npm run build
```

빌드 시 검증되는 항목:

- 모든 import 경로 유효성
- 정적 페이지 생성
- 번역 키 존재 여부
- 환경 변수 참조

### 4. Test Validation

```bash
npm run test --run      # 단위 테스트
npm run test:e2e        # E2E 테스트
```

## Feature/Entity 추가 체크리스트

### Feature 추가 시

```markdown
- [ ] `src/features/[feature]/` 디렉토리 생성
  - `model/use-*.ts` - Hook
  - `lib/*.ts` - 순수 함수
  - `lib/*.test.ts` - 단위 테스트
  - `ui/*.tsx` - UI 컴포넌트
  - `index.ts` - 배럴 export
- [ ] `messages/en.json` - 영어 번역
- [ ] `messages/ko.json` - 한국어 번역
- [ ] 린트 통과
- [ ] 테스트 통과
```

### Entity 추가 시

```markdown
- [ ] `src/entities/[entity]/model/types.ts` - 타입 정의
- [ ] `src/entities/[entity]/model/queries.ts` - Supabase 쿼리
- [ ] `src/entities/[entity]/index.ts` - 배럴 export
- [ ] Supabase 테이블 마이그레이션
```

### API Route 추가 시

```markdown
- [ ] `src/app/api/[route]/route.ts` - API 핸들러
- [ ] 인증/권한 검사 구현
- [ ] 에러 핸들링 구현
- [ ] Zod 스키마로 입력 검증
```

### Cron Job 추가 시

```markdown
- [ ] `src/app/api/cron/[job]/route.ts` - Cron 핸들러
- [ ] `vercel.json` - Cron 스케줄 등록
- [ ] CRON_SECRET 인증 검사
- [ ] 에러 핸들링 및 로깅
```

## Database Validation

### Supabase 마이그레이션

```bash
# 마이그레이션 파일 위치
ls supabase/migrations/

# Supabase CLI로 적용 (로컬)
npx supabase db push

# 타입 생성 (선택)
npx supabase gen types typescript --local > src/shared/types/database.ts
```

### 쿼리 함수 검증

```typescript
// src/entities/trend/model/queries.ts
import {
  getPublishedArticles,
  getArticleBySlug,
} from "@/entities/trend/model/queries";

// 테스트
const articles = await getPublishedArticles();
const article = await getArticleBySlug("test-slug");
```

## i18n Validation

### 번역 키 확인

```bash
# 영어 번역 키 목록
cat messages/en.json | jq 'keys'

# 한국어 번역 키 목록
cat messages/ko.json | jq 'keys'

# 키 비교 (누락 확인)
diff <(cat messages/en.json | jq 'keys' | sort) \
     <(cat messages/ko.json | jq 'keys' | sort)
```

### 사용하지 않는 번역 키 찾기

```bash
# 특정 키가 코드에서 사용되는지 확인
grep -r "t(\"blog.title\")" src --include="*.ts*"
```

## Common Validation Issues

### 1. Next.js 16 Async Params

```
Error: params should be awaited before using its properties
```

**Solution:**

```typescript
// ✅ 올바른 방식
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}
```

### 2. Missing Translation Key

페이지에 `blog.title` 같은 키가 그대로 표시됨

**Solution:** `messages/en.json`, `messages/ko.json`에 번역 추가

### 3. Supabase Type Mismatch

```
Error: Type 'string' is not assignable to type 'ArticleCategory'
```

**Solution:** `src/entities/trend/model/types.ts`에서 타입 확인

### 4. Import Path Error

```
Error: Cannot find module '@/features/...'
```

**Solution:** 경로 확인, `index.ts` 배럴 export 확인

## Pre-commit Validation

`.husky/pre-commit`에서 자동 실행:

```bash
#!/bin/sh
npx tsc --noEmit
npm run lint
```

## Full Validation Pipeline

```bash
#!/bin/bash
set -e

echo "🔍 Type checking..."
npx tsc --noEmit

echo "📝 Linting..."
npm run lint

echo "🧪 Running tests..."
npm run test --run

echo "🏗️ Building..."
npm run build

echo "✅ All validations passed!"
```

## CI/CD Validation

GitHub Actions에서 자동 검증:

```yaml
# .github/workflows/ci.yml
- run: npx tsc --noEmit
- run: npm run lint
- run: npm run test --run
- run: npm run build
```
