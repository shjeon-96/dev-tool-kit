# API Route Skill

API 라우트를 빠르게 생성하는 워크플로우입니다.

## Trigger

- "API 만들어줘", "create api"
- "엔드포인트 추가", "add endpoint"
- "라우트 생성", "new route"

## API Route 구조

```
src/app/api/
├── cron/                    # Cron Jobs
│   ├── trends/route.ts
│   ├── generate-articles/route.ts
│   └── publish-articles/route.ts
├── checkout/route.ts        # 결제
├── subscription/            # 구독 관리
├── webhooks/                # 웹훅
├── analytics/               # 분석
└── revalidate/route.ts      # 캐시 무효화
```

## 템플릿

### 기본 GET API

```typescript
// src/app/api/[name]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 로직
    const data = { message: "Success" };

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API_NAME] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### 인증 필요 API

```typescript
// src/app/api/[name]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 인증된 사용자 로직
    return NextResponse.json({ userId: user.id });
  } catch (error) {
    console.error("[API_NAME] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### POST with Validation (Zod)

```typescript
// src/app/api/[name]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(10),
  category: z.enum(["tech", "business", "lifestyle"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = requestSchema.parse(body);

    // 검증된 데이터로 로직 수행
    const result = await processData(validated);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("[API_NAME] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Cron Job API

```typescript
// src/app/api/cron/[job]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Cron 인증 확인 (Vercel)
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cron 작업 수행
    const result = await performCronJob();

    return NextResponse.json({
      success: true,
      processed: result.count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[CRON_JOB] Error:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
```

### Dynamic Route Parameter

```typescript
// src/app/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // Next.js 16 필수!

  // id로 데이터 조회
  return NextResponse.json({ articleId: id });
}
```

## Supabase 연동

### 데이터 조회

```typescript
import { createClient } from "@/shared/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

### 데이터 삽입

```typescript
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("articles")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
```

## 응답 헬퍼

```typescript
// src/shared/lib/api-utils.ts
import { NextResponse } from "next/server";

export function success<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function unauthorized() {
  return error("Unauthorized", 401);
}

export function badRequest(message: string) {
  return error(message, 400);
}

export function notFound(message = "Not found") {
  return error(message, 404);
}
```

## 체크리스트

```markdown
### API 생성 체크리스트

- [ ] 라우트 파일 생성 (`route.ts`)
- [ ] HTTP 메서드 핸들러 (GET/POST/PUT/DELETE)
- [ ] 입력 검증 (Zod 스키마)
- [ ] 에러 핸들링 (try-catch)
- [ ] 인증 검사 (필요시)
- [ ] 응답 타입 일관성
- [ ] 로깅 추가
```

## 바이브 코딩 팁

```bash
# API 생성 후 바로 테스트
curl http://localhost:3000/api/[name]

# POST 테스트
curl -X POST http://localhost:3000/api/[name] \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```
