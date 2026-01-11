# features/

<!-- AUTO-GENERATED-START -->

## Overview

비즈니스 기능 단위를 캡슐화하는 레이어. 각 feature는 독립적인 model, UI, lib을 포함합니다.

## Features

| Feature    | Purpose                     |
| ---------- | --------------------------- |
| `auth/`    | 인증 (Supabase Auth)        |
| `billing/` | 결제 및 구독 (LemonSqueezy) |

## Structure Convention

```
features/[feature-name]/
├── model/
│   └── use-*.ts     # 상태/로직 Hook
├── lib/
│   └── *.ts         # 순수 함수 (테스트 대상)
├── ui/
│   └── *.tsx        # UI 컴포넌트
└── index.ts         # 배럴 export (named export 필수)
```

## auth/

Supabase 기반 사용자 인증

**기능:**

- 이메일/비밀번호 로그인
- OAuth 소셜 로그인
- 세션 관리

**주요 파일:**

- `model/use-auth.ts` - 인증 상태 Hook
- `ui/SignInForm.tsx` - 로그인 폼
- `ui/SignUpForm.tsx` - 회원가입 폼

## billing/

LemonSqueezy 결제 통합

**기능:**

- 구독 플랜 선택
- 결제 처리
- 구독 관리 (취소/재개)

**주요 파일:**

- `model/use-subscription.ts` - 구독 상태 Hook
- `ui/PricingCard.tsx` - 가격 카드
- `ui/BillingPortal.tsx` - 결제 포털

## Usage

```typescript
import { useAuth } from "@/features/auth";
import { useSubscription } from "@/features/billing";
```

<!-- AUTO-GENERATED-END -->
