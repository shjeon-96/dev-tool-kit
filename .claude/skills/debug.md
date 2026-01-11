# Debug Skill

문제 해결과 디버깅 워크플로우입니다.

## Trigger

- "안돼", "에러", "버그"
- "디버그", "debug"
- "왜 안되지?", "문제 해결"

## 빠른 진단

### 1단계: 에러 확인

```bash
# 타입 에러?
npx tsc --noEmit

# 린트 에러?
npm run lint

# 빌드 에러?
npm run build
```

### 2단계: 로그 확인

```bash
# 개발 서버 콘솔 확인
npm run dev

# 브라우저 콘솔 (F12 → Console)
# 네트워크 탭 (F12 → Network)
```

## 일반적인 에러 해결

### TypeScript 에러

#### "Type 'X' is not assignable to type 'Y'"

```typescript
// 문제: 타입 불일치
const value: string = 123; // ❌

// 해결: 올바른 타입 사용
const value: number = 123; // ✅
// 또는 타입 변환
const value: string = String(123); // ✅
```

#### "Property 'X' does not exist on type 'Y'"

```typescript
// 문제: 존재하지 않는 속성
interface User {
  name: string;
}
const user: User = { name: "John" };
console.log(user.email); // ❌

// 해결: 인터페이스에 속성 추가
interface User {
  name: string;
  email?: string;
}
```

#### "Cannot find module '@/...'"

```bash
# 해결: 경로 확인
1. 파일이 존재하는지 확인
2. index.ts에 export 되어 있는지 확인
3. tsconfig.json paths 설정 확인
```

### Next.js 에러

#### "params should be awaited" (Next.js 16)

```typescript
// ❌ 이전 방식
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
}

// ✅ Next.js 16 방식
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}
```

#### "Hydration mismatch"

```typescript
// 문제: 서버/클라이언트 렌더링 불일치
// 원인: Date, Math.random() 등 동적 값

// 해결 1: useEffect로 클라이언트에서만 실행
const [date, setDate] = useState<string>("");
useEffect(() => {
  setDate(new Date().toISOString());
}, []);

// 해결 2: suppressHydrationWarning
<time suppressHydrationWarning>{new Date().toISOString()}</time>
```

#### "Dynamic server usage: headers"

```typescript
// 문제: 서버 컴포넌트에서 동적 API 사용

// 해결: 클라이언트 컴포넌트로 변경
"use client";

// 또는 dynamic import
import dynamic from "next/dynamic";
const Component = dynamic(() => import("./component"), { ssr: false });
```

### Supabase 에러

#### "JWT expired"

```typescript
// 해결: 세션 갱신
const { data, error } = await supabase.auth.refreshSession();
```

#### "Row level security policy violation"

```sql
-- 해결: RLS 정책 확인/수정
-- Supabase Dashboard → Authentication → Policies

-- 예: 읽기 허용
CREATE POLICY "Public read" ON articles
FOR SELECT USING (true);
```

#### "null value in column violates not-null constraint"

```typescript
// 해결: 필수 필드 확인
const { data, error } = await supabase.from("articles").insert({
  slug: "required", // ✅ 필수
  title_ko: "필수", // ✅ 필수
  title_en: "Required", // ✅ 필수
  // content_ko: null,     // ❌ NOT NULL 위반
});
```

### i18n 에러

#### 번역 키가 그대로 표시됨

```typescript
// 문제: t("blog.title") → "blog.title" 표시

// 확인 사항:
1. messages/en.json에 키 존재?
2. messages/ko.json에 키 존재?
3. 중첩 구조 올바른지?

// messages/en.json
{
  "blog": {
    "title": "Blog"  // ✅
  }
}
```

### API 에러

#### CORS 에러

```typescript
// next.config.ts에 헤더 추가
async headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
      ],
    },
  ];
}
```

#### 500 Internal Server Error

```typescript
// 해결: try-catch로 상세 에러 확인
export async function GET() {
  try {
    // 로직
  } catch (error) {
    console.error("API Error:", error); // 서버 로그 확인
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
```

## 디버깅 도구

### console 메서드

```typescript
console.log("값:", value);
console.error("에러:", error);
console.table(arrayData); // 테이블 형태로 출력
console.time("작업"); // 시간 측정 시작
console.timeEnd("작업"); // 시간 측정 종료
console.trace(); // 호출 스택 출력
```

### VS Code 디버거

```json
// .vscode/launch.json
{
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

### React DevTools

```bash
# 브라우저 확장 설치
# Chrome: React Developer Tools

# 컴포넌트 트리 확인
# Props, State 실시간 확인
```

## 문제 해결 체크리스트

```markdown
### 디버깅 체크리스트

1. [ ] 에러 메시지 전체 읽기
2. [ ] 타입 에러 확인 (npx tsc --noEmit)
3. [ ] 콘솔 로그 확인 (브라우저 + 서버)
4. [ ] 네트워크 요청 확인 (F12 → Network)
5. [ ] 최근 변경 사항 확인 (git diff)
6. [ ] 의존성 문제 확인 (rm -rf node_modules && npm i)
7. [ ] 캐시 삭제 (rm -rf .next)
```

## 바이브 코딩 팁

```bash
# 빠른 리셋
rm -rf .next node_modules/.cache && npm run dev

# 전체 클린 설치
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```
