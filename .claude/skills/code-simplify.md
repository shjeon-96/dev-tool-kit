# Code Simplification Skill

프로젝트 코드를 점검하고 구조를 단순화하는 워크플로우입니다.

## Trigger

- "코드 단순화", "코드 정리", "code simplify"
- "코드 스멜", "code smell", "리팩토링"
- "복잡도 분석", "complexity analysis"
- "사용 안하는 코드", "dead code", "unused code"

## Analysis Categories

프로젝트를 **카테고리별**로 분석하여 효율적으로 검토합니다:

| 카테고리     | 대상 디렉토리   | 검토 포인트                           |
| ------------ | --------------- | ------------------------------------- |
| **API**      | `src/app/api/`  | 에러 처리, 중복 로직, 응답 일관성     |
| **Features** | `src/features/` | Hook 복잡도, 컴포넌트 크기, 상태 관리 |
| **Entities** | `src/entities/` | 타입 설계, 쿼리 최적화, 중복 쿼리     |
| **Lib**      | `src/lib/`      | 유틸 함수 중복, 순수 함수 여부        |
| **Shared**   | `src/shared/`   | 재사용성, 의존성 방향                 |
| **Widgets**  | `src/widgets/`  | 컴포넌트 분리, Props 복잡도           |

## Code Smell Checklist

### 1. 복잡도 (Complexity)

```bash
# 파일별 라인 수 확인
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -n | tail -20
```

**기준:**

- 함수: 50줄 이하 권장
- 파일: 300줄 이하 권장
- 컴포넌트: 150줄 이하 권장

**해결:**

- 긴 함수 → 작은 함수로 분리
- 큰 컴포넌트 → 서브 컴포넌트 추출
- 복잡한 조건문 → 조기 반환(Early Return) 패턴

### 2. 중복 코드 (Duplication)

**검출 패턴:**

```typescript
// ❌ 중복된 에러 처리
try {
  /* ... */
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: "Failed" }, { status: 500 });
}

// ✅ 공통 유틸로 추출
import { handleApiError } from "@/shared/lib/api-utils";
return handleApiError(error);
```

**확인 방법:**

- 3회 이상 반복되는 패턴 검색
- 비슷한 구조의 API 라우트 비교
- Hook 간 공통 로직 확인

### 3. 사용하지 않는 코드 (Dead Code)

```bash
# 미사용 export 검색 (ESLint 규칙)
npm run lint

# 미사용 의존성
npx depcheck

# 미사용 파일 (import 되지 않는 파일)
# TypeScript 컴파일러로 확인
npx tsc --noEmit
```

**삭제 대상:**

- 주석 처리된 코드
- 미사용 import
- 미사용 변수/함수
- 테스트 없는 유틸 함수

### 4. 과도한 추상화 (Over-Engineering)

**징후:**

- 한 번만 사용되는 유틸 함수
- 불필요한 래퍼 컴포넌트
- 과도한 제네릭
- 설정 가능하지만 사용되지 않는 옵션

**해결:**

- 인라인으로 되돌리기
- 래퍼 제거
- 구체적인 타입으로 교체

### 5. Props Drilling

**징후:**

- 3단계 이상 Props 전달
- 중간 컴포넌트가 Props를 사용하지 않음

**해결:**

- Context API 사용
- 컴포넌트 합성(Composition) 패턴
- 상태 끌어올리기 재검토

## Simplification Commands

### Quick Analysis

```bash
# 타입 에러 확인
npx tsc --noEmit

# 린트 검사
npm run lint

# 미사용 의존성
npx depcheck
```

### File Size Analysis

```bash
# 가장 큰 TypeScript 파일
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -rn | head -20

# 디렉토리별 파일 수
find src -type f -name "*.ts*" | cut -d/ -f2,3 | sort | uniq -c | sort -rn
```

### Import Analysis

```bash
# 특정 모듈 사용처 확인
grep -r "from.*@/shared/lib/supabase" src --include="*.ts*"

# 순환 의존성 확인 (madge 설치 필요)
npx madge --circular src/
```

## Refactoring Patterns

### 1. API Route 단순화

```typescript
// Before: 중복된 인증/에러 처리
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // ... 로직
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// After: 공통 래퍼 사용
export const GET = withAuth(async (request, session) => {
  // ... 로직만 작성
});
```

### 2. Hook 단순화

```typescript
// Before: 복잡한 상태 관리
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);
const [data, setData] = useState<Data | null>(null);

// After: useQuery 또는 커스텀 Hook
const { data, isLoading, error } = useArticles();
```

### 3. 조건부 렌더링 단순화

```typescript
// Before: 중첩된 조건문
{isLoading ? (
  <Spinner />
) : error ? (
  <Error message={error.message} />
) : data ? (
  <ArticleList articles={data} />
) : (
  <Empty />
)}

// After: 조기 반환
if (isLoading) return <Spinner />;
if (error) return <Error message={error.message} />;
if (!data?.length) return <Empty />;
return <ArticleList articles={data} />;
```

## Project-Specific Simplifications

### Trend Blog 특화 검토

1. **Cron Jobs** (`src/app/api/cron/`)
   - 각 Cron 간 중복 로직 (인증, 에러 처리)
   - 트렌드 수집 → 기사 생성 간 데이터 흐름

2. **Content Generator** (`src/lib/content-generator/`)
   - 프롬프트 관리 방식
   - AI 응답 파싱 로직

3. **Entities** (`src/entities/trend/`)
   - 쿼리 함수 중복
   - 타입 정의 일관성

4. **번역** (`messages/*.json`)
   - 사용하지 않는 번역 키
   - 중복 문자열

## Cleanup Checklist

```markdown
### 코드 정리 체크리스트

- [ ] 미사용 import 제거
- [ ] 미사용 변수/함수 제거
- [ ] 주석 처리된 코드 삭제
- [ ] console.log 제거
- [ ] TODO 주석 처리 또는 이슈 생성
- [ ] 중복 타입 정의 통합
- [ ] 불필요한 유틸 함수 인라인화
- [ ] 긴 함수 분리 (50줄 초과)
- [ ] 큰 컴포넌트 분리 (150줄 초과)
- [ ] Props drilling 해결
```

## Automated Tools

```bash
# ESLint 자동 수정
npm run lint -- --fix

# Prettier 포맷팅
npx prettier --write "src/**/*.{ts,tsx}"

# 미사용 의존성 확인
npx depcheck

# 번들 크기 분석
npm run analyze
```

## When to Simplify

**적극 단순화:**

- 새 기능 추가 전
- PR 리뷰 전
- 버그 수정 후
- 정기 리뷰 (월 1회)

**주의:**

- 동작하는 코드를 "깔끔하게" 만들기 위해 불필요하게 변경하지 않기
- 리팩토링과 기능 변경을 같은 커밋에 섞지 않기
- 테스트 없이 큰 리팩토링 진행하지 않기
