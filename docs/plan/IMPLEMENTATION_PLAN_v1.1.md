# Web Toolkit 전략적 확장 구현 계획서 v1.1

> 단순 유틸리티에서 Vertical SaaS로의 전환을 위한 리파인드 전략

**작성일**: 2025-12-20
**버전**: 1.3.2 (Final Green Light)
**목표 기간**: 12개월

---

## 변경 사항 요약 (v1.0 → v1.3.0)

| 영역               | 변경 내용                                                               |
| ------------------ | ----------------------------------------------------------------------- |
| **Tech Stack**     | 대용량 처리를 위한 File System Access API 추가                          |
| **Strategy**       | Engineering as Marketing 전략 추가 (리드 수집)                          |
| **Monetization**   | 오프라인/온라인 수익화 경계 명확화 (Hybrid Model)                       |
| **Payment**        | Stripe → Lemon Squeezy 전환 검토 (MoR 장점) + **결제 추상화 패턴**      |
| **Storage**        | OPFS 기반 모델/파일 캐싱 전략 추가                                      |
| **Browser Compat** | Safari/Firefox Bulk Action 대응 (ZIP Fallback) 추가                     |
| **Security**       | PDF 민감정보 마스킹 (Auto-Redaction) 기능 추가 + **래스터화 보안 강화** |
| **Validation**     | Fake Door 테스트로 기능 수요 검증 전략 추가                             |
| **Integration**    | PDF.js + Next.js 호환성 설정 가이드 추가 (Worker, Webpack)              |
| **UX**             | WebGPU 모델 OPFS 캐싱 상태 관리 + Ready 배지 UI 추가                    |
| **Build**          | Next.js Webpack canvas alias 설정 명확화 (빌드 오류 방지)               |
| **Logic**          | PDF 좌표계 변환 로직 수정 (Y축 반전 + Scale Factor)                     |
| **Storage**        | Safari Persistence 요청으로 7일 데이터 삭제 방지                        |
| **PWA**            | Safari iOS 홈 화면 추가 안내 프롬프트 (`AddToHomePrompt`)               |
| **Cross-Platform** | postinstall 스크립트 Windows 호환성 (`shx` 라이브러리)                  |
| **Performance**    | PDF 래스터화 동적 Scale + 메모리 사용량 예측 + 품질 선택 UI             |

---

## 목차

1. [현재 상태 분석](#1-현재-상태-분석)
2. [전략적 피벗: Engineering as Marketing](#2-전략적-피벗-engineering-as-marketing-new)
3. [Phase 1: 기반 구축 (1-3개월)](#3-phase-1-기반-구축-1-3개월)
4. [Phase 2: 도구 확장 및 고성능 I/O (4-6개월)](#4-phase-2-도구-확장-및-고성능-io-4-6개월)
5. [Phase 3: AI 통합 및 Vertical 진입 (7-12개월)](#5-phase-3-ai-통합-및-vertical-진입-7-12개월)
6. [기술 의존성 맵](#6-기술-의존성-맵-updated)
7. [리스크 관리](#7-리스크-관리-updated)
8. [성공 지표](#8-성공-지표-kpi-수정-제안)

---

## 1. 현재 상태 분석

### 1.1 완료된 항목

| 카테고리             | 항목                      | 상태    |
| -------------------- | ------------------------- | ------- |
| **도구**             | 31개 개발자 도구          | ✅ 완료 |
| **치트시트**         | 14개 참조 문서            | ✅ 완료 |
| **가이드**           | 31개 SEO 가이드           | ✅ 완료 |
| **다국어**           | 영어, 한국어, 일본어      | ✅ 완료 |
| **WebAssembly**      | FFmpeg.wasm, hash-wasm    | ✅ 완료 |
| **Video Compressor** | 브라우저 내 비디오 압축   | ✅ 완료 |
| **PWA**              | 오프라인 인디케이터       | ✅ 완료 |
| **Programmatic SEO** | 54개 변환 페이지          | ✅ 완료 |
| **Chrome Extension** | Plasmo 기반 확장          | ✅ 완료 |
| **Magic Share**      | 서버리스 공유 (Vercel KV) | ✅ 완료 |
| **AdSense**          | 광고 수익화               | ✅ 완료 |

### 1.2 기술 스택 현황 (Updated)

```yaml
Frontend: Next.js 16 + React 19 + TypeScript
Styling: Tailwind CSS 4 + Radix UI
Wasm: FFmpeg.wasm, hash-wasm, Tesseract.js (예정)
Storage:
  - localStorage (설정)
  - IndexedDB (Workspace)
  - Vercel KV (공유)
  - OPFS (대용량 파일 캐시) ← NEW
File I/O:
  - File System Access API ← NEW
  - Drag & Drop
Analytics: GA4, Microsoft Clarity
Monetization: Google AdSense
```

### 1.3 핵심 과제 식별

| 과제               | 현재 상태      | 해결 방안                |
| ------------------ | -------------- | ------------------------ |
| 수익화 구조 부재   | AdSense만      | Freemium + Pro           |
| 리드 수집 부재     | 방문자 → 이탈  | Engineering as Marketing |
| 대용량 처리 한계   | 메모리 제한    | File System Access API   |
| 오프라인/광고 충돌 | PWA vs AdSense | Hybrid 수익화 모델       |

---

## 2. 전략적 피벗: Engineering as Marketing (NEW)

### 2.1 핵심 개념

단순 유틸리티 제공을 넘어, **특정 직군(Persona)의 이메일 리스트**를 확보하여 향후 **Vertical SaaS로 전환**하기 위한 전략입니다.

```
┌─────────────────────────────────────────────────────────────┐
│  Traditional Model (현재)                                    │
│  ─────────────────────────                                  │
│  방문자 → 도구 사용 → 이탈 (가치 손실)                        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  Engineering as Marketing Model (목표)                       │
│  ─────────────────────────────────                          │
│  방문자 → 도구 사용 → 결과물 다운로드 → Lead Magnet 제안 →   │
│  이메일 수집 → 관계 구축 → Pro 전환 / Vertical SaaS 전환     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Persona별 Lead Magnet 전략

| 도구 그룹               | 타겟 Persona             | Lead Magnet 제안               |
| ----------------------- | ------------------------ | ------------------------------ |
| **PDF Toolkit**         | 법무 담당자, 계약 관리자 | "계약서 관리 체크리스트 PDF"   |
| **OCR Scanner**         | 경리/회계 담당자         | "영수증 정리 엑셀 템플릿"      |
| **OG Image Generator**  | 마케터, 블로거           | "SNS 이미지 크기 가이드 2025"  |
| **QR Generator (Bulk)** | 이벤트 기획자            | "QR 코드 마케팅 성공 사례집"   |
| **Background Remover**  | 이커머스 셀러            | "상품 사진 촬영 노하우 가이드" |

### 2.3 Soft Gating 구현

**원칙**: 도구 사용은 완전 무료. 결과물 다운로드 시 **선택적** 이메일 수집.

```
┌─────────────────────────────────────────────────────────────┐
│  [결과물 다운로드]                                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ 결과물이 준비되었습니다!                                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📩 이메일을 입력하시면 "계약서 관리 체크리스트"를      │   │
│  │    무료로 보내드립니다. (선택사항)                      │   │
│  │                                                       │   │
│  │ [이메일 입력...]              [받기]                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [건너뛰고 다운로드]              [Pro로 업그레이드]         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.4 데이터 모델

```sql
-- leads 테이블 (Supabase)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source_tool TEXT NOT NULL,        -- 어떤 도구에서 수집했는지
  lead_magnet TEXT,                 -- 어떤 자료를 제공했는지
  persona_tag TEXT,                 -- 추정 직군
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  converted_to_pro BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMPTZ,
  unsubscribed BOOLEAN DEFAULT FALSE,
  UNIQUE(email, source_tool)
);

-- 인덱스
CREATE INDEX idx_leads_persona ON leads(persona_tag);
CREATE INDEX idx_leads_source ON leads(source_tool);
```

---

## 3. Phase 1: 기반 구축 (1-3개월)

### 3.1 목표

- 인증 및 결제 인프라 구축
- **오프라인/온라인 하이브리드 수익화 모델 정립**
- Lead 수집 시스템 구현

### 3.2 수익화 모델 재정의 (Hybrid Model)

**핵심 인사이트**: PWA 오프라인 지원과 AdSense 광고는 양립 불가 (오프라인 = 광고 로드 불가)

| 티어           | 가격   | 온라인       | 오프라인  | 광고    |
| -------------- | ------ | ------------ | --------- | ------- |
| **Free**       | $0     | ✅ 모든 도구 | ❌        | ✅ 표시 |
| **Pro**        | $9/월  | ✅ 모든 도구 | ✅ 무제한 | ❌ 제거 |
| **Enterprise** | 커스텀 | ✅           | ✅        | ❌      |

**마케팅 메시지**:

- Free: "무료로 모든 도구를 사용하세요. 광고가 표시됩니다."
- Pro: **"비행기 안에서도, 지하철에서도 끊김 없이 작업하세요."**

### 3.3 Month 1: 인증 시스템 + Leads DB

#### Week 1-2: Supabase 설정

**작업 항목**:

| 순서 | 작업                   | 파일                                | 예상 시간 |
| ---- | ---------------------- | ----------------------------------- | --------- |
| 1    | Supabase 프로젝트 생성 | -                                   | 1시간     |
| 2    | 핵심 스키마 배포       | `supabase/migrations/001_core.sql`  | 4시간     |
| 3    | Leads 스키마 배포      | `supabase/migrations/002_leads.sql` | 2시간     |
| 4    | Supabase 클라이언트    | `src/shared/lib/supabase/client.ts` | 2시간     |
| 5    | 서버 클라이언트        | `src/shared/lib/supabase/server.ts` | 2시간     |

**핵심 스키마 (001_core.sql)**:

```sql
-- users 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- subscriptions 테이블
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT DEFAULT 'lemonsqueezy', -- stripe or lemonsqueezy
  external_customer_id TEXT,
  external_subscription_id TEXT,
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- usage_records 테이블
CREATE TABLE usage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  action_type TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- api_keys 테이블
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  name TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);
```

#### Week 3-4: 인증 UI

**작업 항목**:

| 순서 | 작업            | 파일                                      | 예상 시간 |
| ---- | --------------- | ----------------------------------------- | --------- |
| 1    | 로그인 페이지   | `src/app/[locale]/auth/signin/page.tsx`   | 4시간     |
| 2    | 회원가입 페이지 | `src/app/[locale]/auth/signup/page.tsx`   | 4시간     |
| 3    | OAuth 콜백      | `src/app/[locale]/auth/callback/route.ts` | 2시간     |
| 4    | 사용자 메뉴     | `src/entities/user/ui/user-menu.tsx`      | 3시간     |
| 5    | 인증 미들웨어   | `src/middleware.ts` 수정                  | 2시간     |

### 3.4 Month 2: 결제 시스템 (Lemon Squeezy)

#### Stripe vs Lemon Squeezy 비교

| 항목          | Stripe         | Lemon Squeezy |
| ------------- | -------------- | ------------- |
| **세금 처리** | 직접 구현 필요 | 자동 (MoR)    |
| **VAT/GST**   | 별도 설정      | 포함          |
| **개발 시간** | ~3주           | ~1주          |
| **수수료**    | 2.9% + 0.30    | 5% + 0.50     |
| **적합 대상** | 대규모         | 1인/소규모    |

**결정**: 초기에는 **Lemon Squeezy**로 빠르게 시작, 성장 후 Stripe 전환 고려

> ⚠️ **2024년 7월 Stripe의 Lemon Squeezy 인수**
>
> Stripe가 Lemon Squeezy를 인수했으므로 향후 Stripe "Managed Payments"로 통합될 가능성이 있습니다.
> 결제 로직을 추상화(Adapter Pattern)하여 나중에 쉽게 전환할 수 있도록 설계합니다.

#### 결제 모듈 추상화 (Adapter Pattern)

```typescript
// src/shared/lib/payment/types.ts
export interface PaymentProvider {
  createCheckout(params: CheckoutParams): Promise<CheckoutResult>;
  handleWebhook(payload: unknown, signature: string): Promise<WebhookEvent>;
  getCustomerPortalUrl(customerId: string): Promise<string>;
  cancelSubscription(subscriptionId: string): Promise<void>;
}

export interface CheckoutParams {
  userId: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  checkoutUrl: string;
  sessionId: string;
}

export interface WebhookEvent {
  type:
    | "subscription.created"
    | "subscription.updated"
    | "subscription.cancelled";
  data: {
    userId: string;
    subscriptionId: string;
    status: string;
    currentPeriodEnd: Date;
  };
}
```

```typescript
// src/shared/lib/payment/lemonsqueezy.ts
import type { PaymentProvider, CheckoutParams, CheckoutResult } from "./types";

export class LemonSqueezyProvider implements PaymentProvider {
  async createCheckout(params: CheckoutParams): Promise<CheckoutResult> {
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: params.email,
              custom: { user_id: params.userId },
            },
            success_url: params.successUrl,
            cancel_url: params.cancelUrl,
          },
          relationships: {
            store: {
              data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID },
            },
            variant: { data: { type: "variants", id: params.priceId } },
          },
        },
      }),
    });

    const data = await response.json();
    return {
      checkoutUrl: data.data.attributes.url,
      sessionId: data.data.id,
    };
  }

  // ... 기타 메서드 구현
}
```

```typescript
// src/shared/lib/payment/index.ts
import { LemonSqueezyProvider } from "./lemonsqueezy";
// import { StripeProvider } from './stripe'; // 향후 추가

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER || "lemonsqueezy";

  switch (provider) {
    case "lemonsqueezy":
      return new LemonSqueezyProvider();
    // case 'stripe':
    //   return new StripeProvider();
    default:
      throw new Error(`Unknown payment provider: ${provider}`);
  }
}
```

**전환 시 필요한 작업**:

1. `StripeProvider` 클래스 구현
2. `.env`의 `PAYMENT_PROVIDER=stripe` 변경
3. Stripe 웹훅 시크릿 설정
4. 기존 고객 데이터 마이그레이션 (Lemon Squeezy → Stripe)

#### Week 1-2: Lemon Squeezy 통합

**작업 항목**:

| 순서 | 작업                         | 파일                                         | 예상 시간 |
| ---- | ---------------------------- | -------------------------------------------- | --------- |
| 1    | Lemon Squeezy 계정/제품 설정 | -                                            | 2시간     |
| 2    | 클라이언트 설정              | `src/shared/lib/lemonsqueezy/client.ts`      | 2시간     |
| 3    | Checkout 통합                | `src/app/api/checkout/route.ts`              | 3시간     |
| 4    | 웹훅 핸들러                  | `src/app/api/webhooks/lemonsqueezy/route.ts` | 4시간     |
| 5    | Customer Portal 링크         | `src/app/api/portal/route.ts`                | 2시간     |

**Lemon Squeezy 제품 구성**:

```yaml
products:
  - name: "Pro Monthly"
    price: $9/month
    variant_id: var_monthly

  - name: "Pro Yearly"
    price: $90/year (2개월 무료)
    variant_id: var_yearly
```

#### Week 3-4: 가격 페이지 및 Billing

**작업 항목**:

| 순서 | 작업           | 파일                                             | 예상 시간 |
| ---- | -------------- | ------------------------------------------------ | --------- |
| 1    | 가격 페이지    | `src/app/[locale]/pricing/page.tsx`              | 6시간     |
| 2    | 가격 카드      | `src/entities/subscription/ui/pricing-card.tsx`  | 3시간     |
| 3    | 기능 비교표    | `src/entities/subscription/ui/feature-table.tsx` | 2시간     |
| 4    | Billing 페이지 | `src/app/[locale]/dashboard/billing/page.tsx`    | 4시간     |

**가격 페이지 핵심 메시지**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────┐  ┌─────────────────────┐                  │
│  │   FREE      │  │       PRO           │                  │
│  │   $0/mo     │  │      $9/mo          │                  │
│  │             │  │    ⭐ 인기           │                  │
│  │ ✅ 31 도구  │  │ ✅ 31 도구          │                  │
│  │ ✅ 온라인   │  │ ✅ 온라인 + 오프라인 │                  │
│  │ ❌ 광고 표시 │  │ ✅ 광고 제거         │                  │
│  │ ❌ Bulk     │  │ ✅ 무제한 Bulk       │                  │
│  │             │  │ ✅ API 접근          │                  │
│  │             │  │                     │                  │
│  │ [현재]      │  │ [업그레이드]         │                  │
│  └─────────────┘  └─────────────────────┘                  │
│                                                             │
│  💡 "비행기에서도, 지하철에서도 끊김 없이 작업하세요"         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.5 Month 3: Quota, Lead 수집, 마케팅 엔진

#### Week 1-2: Quota 시스템

**작업 항목**:

| 순서 | 작업            | 파일                                | 예상 시간 |
| ---- | --------------- | ----------------------------------- | --------- |
| 1    | Quota 타입 정의 | `src/shared/lib/quota/types.ts`     | 2시간     |
| 2    | useQuota 훅     | `src/shared/lib/quota/use-quota.ts` | 4시간     |
| 3    | 사용량 기록 API | `src/app/api/usage/record/route.ts` | 3시간     |
| 4    | 한도 검증       | `src/shared/lib/quota/check.ts`     | 3시간     |

**Quota 설정**:

```typescript
// src/shared/lib/quota/config.ts
export const QUOTA_LIMITS = {
  free: {
    daily_operations: 100,
    bulk_files: 1,
    history_days: 7,
    offline_access: false,
    api_access: false,
  },
  pro: {
    daily_operations: Infinity,
    bulk_files: Infinity,
    history_days: Infinity,
    offline_access: true,
    api_access: true,
  },
} as const;
```

#### Week 3: Lead Magnet 시스템

**작업 항목**:

| 순서 | 작업               | 파일                                                 | 예상 시간 |
| ---- | ------------------ | ---------------------------------------------------- | --------- |
| 1    | Lead Magnet 모달   | `src/features/lead-capture/ui/lead-magnet-modal.tsx` | 4시간     |
| 2    | Lead 저장 API      | `src/app/api/leads/capture/route.ts`                 | 2시간     |
| 3    | 도구별 Magnet 설정 | `src/features/lead-capture/config/magnets.ts`        | 2시간     |
| 4    | 다운로드 래퍼      | `src/shared/lib/download/with-lead-capture.ts`       | 3시간     |

**Lead Magnet 설정**:

```typescript
// src/features/lead-capture/config/magnets.ts
export const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  "pdf-toolkit": {
    title: "계약서 관리 체크리스트",
    description:
      "법무팀이 사용하는 계약서 검토 체크리스트를 무료로 받아보세요.",
    fileUrl: "/lead-magnets/contract-checklist.pdf",
    personaTag: "legal",
  },
  "ocr-scanner": {
    title: "영수증 정리 템플릿",
    description: "경비 처리를 위한 엑셀 템플릿을 받아보세요.",
    fileUrl: "/lead-magnets/expense-template.xlsx",
    personaTag: "accounting",
  },
  "og-generator": {
    title: "SNS 이미지 사이즈 가이드 2025",
    description: "플랫폼별 최적 이미지 크기 가이드를 받아보세요.",
    fileUrl: "/lead-magnets/social-image-guide.pdf",
    personaTag: "marketing",
  },
  "bg-remover": {
    title: "상품 사진 촬영 노하우",
    description: "전문 포토그래퍼의 상품 촬영 팁을 받아보세요.",
    fileUrl: "/lead-magnets/product-photo-guide.pdf",
    personaTag: "ecommerce",
  },
};
```

#### Week 4: 오프라인 모드 유도

**작업 항목**:

| 순서 | 작업                 | 파일                                                     | 예상 시간 |
| ---- | -------------------- | -------------------------------------------------------- | --------- |
| 1    | 오프라인 감지        | `src/shared/lib/hooks/use-network-status.ts`             | 2시간     |
| 2    | 업그레이드 유도 모달 | `src/entities/subscription/ui/offline-upgrade-modal.tsx` | 3시간     |
| 3    | Pro 기능 잠금 로직   | `src/entities/subscription/lib/feature-gate.ts`          | 2시간     |

**오프라인 유도 모달**:

```
┌─────────────────────────────────────────────────────────────┐
│  ✈️ 오프라인 모드가 감지되었습니다                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  현재 인터넷에 연결되어 있지 않습니다.                        │
│                                                             │
│  Pro로 업그레이드하시면:                                     │
│  • 비행기, 지하철에서도 끊김 없이 작업                        │
│  • 광고 없는 깔끔한 인터페이스                               │
│  • 무제한 일괄 처리                                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  월 $9로 어디서든 작업하세요                          │   │
│  │                                                       │   │
│  │  [Pro 시작하기]                        [나중에]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.6 Phase 1 체크리스트

```
Month 1: 인증 + Leads DB
├── [ ] Supabase 프로젝트 생성
├── [ ] 핵심 스키마 배포 (users, subscriptions, usage)
├── [ ] Leads 스키마 배포
├── [ ] 로그인/회원가입 페이지
├── [ ] OAuth (Google, GitHub) 설정
└── [ ] 사용자 메뉴 컴포넌트

Month 2: 결제 시스템 (Lemon Squeezy)
├── [ ] Lemon Squeezy 계정/제품 설정
├── [ ] Checkout 통합
├── [ ] 웹훅 핸들러
├── [ ] 가격 페이지
└── [ ] Billing Portal

Month 3: Quota + Marketing Engine
├── [ ] Quota 시스템 구현
├── [ ] 사용량 추적
├── [ ] Lead Magnet 모달
├── [ ] 도구별 Magnet 설정
├── [ ] 오프라인 감지 및 유도 모달
└── [ ] 광고 제거 (Pro 사용자)
```

---

## 4. Phase 2: 도구 확장 및 고성능 I/O (4-6개월)

### 4.1 핵심 기술 도입: File System Access API (NEW)

**문제점**: 현재 브라우저 기반 처리는 메모리 제한으로 대용량 파일/다수 파일 처리 시 크래시 위험

**해결책**: File System Access API로 **디스크 직접 스트리밍**

```
┌─────────────────────────────────────────────────────────────┐
│  Traditional (Memory-based)                                  │
│  ─────────────────────────                                  │
│  파일 선택 → 메모리 로드 → 처리 → 메모리 저장 → 다운로드     │
│                    ↓                                        │
│            💥 대용량 시 메모리 폭발                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  File System Access API (Streaming)                          │
│  ──────────────────────────────                             │
│  폴더 선택 → 파일 하나씩 읽기 → 처리 → 즉시 저장 → 다음 파일  │
│                    ↓                                        │
│            ✅ 10GB 영상도 처리 가능                          │
└─────────────────────────────────────────────────────────────┘
```

#### Month 4 Week 1: Local I/O Handler 구현

**작업 항목**:

| 순서 | 작업             | 파일                                         | 예상 시간 |
| ---- | ---------------- | -------------------------------------------- | --------- |
| 1    | API 감지 유틸    | `src/shared/lib/fs-access/detect.ts`         | 1시간     |
| 2    | 폴더 선택 핸들러 | `src/shared/lib/fs-access/pick-directory.ts` | 3시간     |
| 3    | 스트리밍 읽기    | `src/shared/lib/fs-access/stream-read.ts`    | 4시간     |
| 4    | 스트리밍 쓰기    | `src/shared/lib/fs-access/stream-write.ts`   | 4시간     |
| 5    | 폴백 (기존 방식) | `src/shared/lib/fs-access/fallback.ts`       | 2시간     |

**코드 예시**:

```typescript
// src/shared/lib/fs-access/pick-directory.ts

export async function pickDirectory(): Promise<FileSystemDirectoryHandle | null> {
  if (!("showDirectoryPicker" in window)) {
    return null; // 폴백 필요
  }

  try {
    const dirHandle = await window.showDirectoryPicker({
      mode: "readwrite",
    });
    return dirHandle;
  } catch (e) {
    if ((e as Error).name === "AbortError") {
      return null; // 사용자 취소
    }
    throw e;
  }
}

export async function* iterateFiles(
  dirHandle: FileSystemDirectoryHandle,
  extensions: string[],
): AsyncGenerator<{ name: string; handle: FileSystemFileHandle }> {
  for await (const entry of dirHandle.values()) {
    if (entry.kind === "file") {
      const ext = entry.name.split(".").pop()?.toLowerCase();
      if (extensions.includes(ext || "")) {
        yield { name: entry.name, handle: entry };
      }
    } else if (entry.kind === "directory") {
      yield* iterateFiles(entry, extensions); // 재귀
    }
  }
}
```

```typescript
// src/shared/lib/fs-access/stream-process.ts

export async function processFilesInPlace(
  dirHandle: FileSystemDirectoryHandle,
  processor: (file: File) => Promise<Blob>,
  extensions: string[],
  onProgress?: (current: number, total: number, fileName: string) => void,
): Promise<{ processed: number; errors: string[] }> {
  const files: { name: string; handle: FileSystemFileHandle }[] = [];

  // 파일 목록 수집
  for await (const entry of iterateFiles(dirHandle, extensions)) {
    files.push(entry);
  }

  const errors: string[] = [];
  let processed = 0;

  for (const { name, handle } of files) {
    try {
      onProgress?.(processed + 1, files.length, name);

      // 파일 읽기 (스트리밍)
      const file = await handle.getFile();

      // 처리
      const result = await processor(file);

      // 결과 쓰기 (원본 덮어쓰기 또는 새 파일)
      const writable = await handle.createWritable();
      await writable.write(result);
      await writable.close();

      processed++;
    } catch (e) {
      errors.push(`${name}: ${(e as Error).message}`);
    }
  }

  return { processed, errors };
}
```

**브라우저 호환성**:

| 브라우저   | File System Access API |
| ---------- | ---------------------- |
| Chrome 86+ | ✅                     |
| Edge 86+   | ✅                     |
| Opera 72+  | ✅                     |
| Firefox    | ❌ (폴백 사용)         |
| Safari     | ❌ (폴백 사용)         |

#### Safari/Firefox 대응 전략 (ZIP Fallback)

> ⚠️ **Safari/Firefox의 Bulk Action 한계**
>
> Safari와 Firefox에서는 File System Access API가 지원되지 않아 폴더 단위 접근이나 파일 덮어쓰기가 불가능합니다.
> Pro 사용자가 대량 변환 시도 시 최악의 UX(파일마다 저장 대화상자)를 겪을 수 있습니다.

**해결 전략**:

1. **브라우저 감지 및 유도**:

```typescript
// src/features/bulk-actions/ui/browser-check.tsx
'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/shared/ui';
import { Chrome, AlertCircle } from 'lucide-react';

export function BulkActionBrowserCheck() {
  const [isChromium, setIsChromium] = useState(true);

  useEffect(() => {
    // Chromium 기반 브라우저 확인
    const isChromiumBased = 'showDirectoryPicker' in window;
    setIsChromium(isChromiumBased);
  }, []);

  if (isChromium) return null;

  return (
    <Alert variant="warning" className="mb-4">
      <Chrome className="h-4 w-4" />
      <AlertDescription>
        <strong>대량 처리는 Chrome/Edge에서 10배 빠릅니다.</strong>
        <br />
        현재 브라우저에서는 처리된 파일이 하나의 ZIP으로 다운로드됩니다.
        <br />
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Chrome 다운로드 →
        </a>
      </AlertDescription>
    </Alert>
  );
}
```

2. **ZIP Fallback 구현**:

```typescript
// src/features/bulk-actions/lib/processor.ts
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface BulkProcessResult {
  name: string;
  data: Blob;
}

export async function processBulkWithFallback<T>(
  files: File[],
  processor: (file: File) => Promise<Blob>,
  outputDir?: FileSystemDirectoryHandle,
  onProgress?: (current: number, total: number, fileName: string) => void,
): Promise<{ processed: number; errors: string[] }> {
  const isChromium = "showDirectoryPicker" in window && outputDir;
  const results: BulkProcessResult[] = [];
  const errors: string[] = [];
  let processed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length, file.name);

    try {
      const result = await processor(file);

      if (isChromium && outputDir) {
        // Chrome/Edge: 직접 파일 쓰기
        const outputName = file.name.replace(/\.[^.]+$/, "_processed$&");
        const fileHandle = await outputDir.getFileHandle(outputName, {
          create: true,
        });
        const writable = await fileHandle.createWritable();
        await writable.write(result);
        await writable.close();
      } else {
        // Safari/Firefox: 결과 수집
        results.push({
          name: file.name.replace(/\.[^.]+$/, "_processed$&"),
          data: result,
        });
      }

      processed++;
    } catch (e) {
      errors.push(`${file.name}: ${(e as Error).message}`);
    }
  }

  // Safari/Firefox: ZIP으로 일괄 다운로드
  if (!isChromium && results.length > 0) {
    const zip = new JSZip();

    for (const result of results) {
      zip.file(result.name, result.data);
    }

    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const timestamp = new Date().toISOString().slice(0, 10);
    saveAs(zipBlob, `bulk-processed-${timestamp}.zip`);
  }

  return { processed, errors };
}
```

3. **UX 최적화**:

```typescript
// src/features/bulk-actions/ui/bulk-download-modal.tsx
interface BulkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: { processed: number; errors: string[] };
  isZipMode: boolean; // Safari/Firefox 여부
}

export function BulkDownloadModal({
  isOpen,
  onClose,
  results,
  isZipMode
}: BulkDownloadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>처리 완료</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            ✅ {results.processed}개 파일 처리 완료
            {results.errors.length > 0 && (
              <span className="text-destructive">
                , ❌ {results.errors.length}개 실패
              </span>
            )}
          </p>

          {isZipMode && (
            <Alert>
              <AlertDescription>
                📦 모든 파일이 하나의 ZIP으로 다운로드되었습니다.
                <br />
                Chrome/Edge를 사용하면 원본 폴더에 바로 저장됩니다.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 4.2 Month 4: 문서 처리 도구

#### Week 2-3: PDF Toolkit

**작업 항목**:

| 순서 | 작업                           | 파일                                                | 예상 시간 |
| ---- | ------------------------------ | --------------------------------------------------- | --------- |
| 1    | pdf-lib + pdfjs-dist 설치      | `package.json`                                      | 30분      |
| 2    | PDF 병합                       | `src/features/pdf-toolkit/lib/merge.ts`             | 4시간     |
| 3    | PDF 분할                       | `src/features/pdf-toolkit/lib/split.ts`             | 4시간     |
| 4    | PDF 압축                       | `src/features/pdf-toolkit/lib/compress.ts`          | 4시간     |
| 5    | 페이지 추출                    | `src/features/pdf-toolkit/lib/extract.ts`           | 3시간     |
| 6    | UI 컴포넌트                    | `src/features/pdf-toolkit/ui/pdf-toolkit.tsx`       | 6시간     |
| 7    | 훅                             | `src/features/pdf-toolkit/model/use-pdf-toolkit.ts` | 3시간     |
| 8    | 한글 폰트 지원                 | `src/features/pdf-toolkit/lib/fonts.ts`             | 4시간     |
| 9    | **민감정보 마스킹 (래스터화)** | `src/features/pdf-toolkit/lib/redaction.ts`         | 6시간     |
| 10   | 마스킹 UI                      | `src/features/pdf-toolkit/ui/redaction-tool.tsx`    | 4시간     |
| 11   | pdf.js 워커 설정               | `public/pdf.worker.min.js`                          | 30분      |

#### PDF 민감정보 마스킹 (Auto-Redaction) - 킬러 기능

> 🛡️ **Privacy-First 마스킹 도구**
>
> 법무/금융/의료 분야 사용자의 핵심 니즈. 기존 클라우드 툴은 "서버 업로드" 때문에 사용이 금지됨.
> 100% 브라우저 처리로 기업 고객(B2B) 유치 가능.

**핵심 기능**:

- OCR로 텍스트 위치(좌표) 추출
- 주민번호, 전화번호, 계좌번호 등 패턴 자동 감지
- 검은색 사각형으로 덮어씌우기
- PDF 평탄화(Flatten)로 복구 불가능하게 처리

**구현 코드**:

```typescript
// src/features/pdf-toolkit/lib/redaction.ts
import { PDFDocument, rgb } from "pdf-lib";
import Tesseract from "tesseract.js";

// 민감정보 패턴 (한국 기준)
export const SENSITIVE_PATTERNS = {
  // 주민등록번호: 000000-0000000
  residentNumber: /\d{6}[-\s]?\d{7}/g,
  // 전화번호: 010-0000-0000
  phoneNumber: /01[016789][-\s]?\d{3,4}[-\s]?\d{4}/g,
  // 계좌번호: 다양한 패턴
  bankAccount: /\d{3,4}[-\s]?\d{2,4}[-\s]?\d{4,6}/g,
  // 카드번호: 0000-0000-0000-0000
  creditCard: /\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g,
  // 이메일
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
};

interface DetectedSensitive {
  text: string;
  pattern: keyof typeof SENSITIVE_PATTERNS;
  bbox: { x: number; y: number; width: number; height: number };
  pageIndex: number;
}

export async function detectSensitiveInfo(
  pdfBytes: ArrayBuffer,
  patterns: (keyof typeof SENSITIVE_PATTERNS)[],
  onProgress?: (page: number, total: number) => void,
): Promise<DetectedSensitive[]> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const detected: DetectedSensitive[] = [];

  for (let i = 0; i < pages.length; i++) {
    onProgress?.(i + 1, pages.length);

    // PDF 페이지를 이미지로 렌더링 (pdf.js 사용)
    const pageImage = await renderPageToImage(pdfBytes, i);

    // OCR로 텍스트 및 좌표 추출
    const result = await Tesseract.recognize(pageImage, "kor+eng", {
      logger: () => {}, // 로깅 비활성화
    });

    // 각 단어에서 패턴 매칭
    for (const word of result.data.words) {
      for (const patternName of patterns) {
        const regex = SENSITIVE_PATTERNS[patternName];
        if (regex.test(word.text)) {
          detected.push({
            text: word.text,
            pattern: patternName,
            bbox: word.bbox,
            pageIndex: i,
          });
        }
      }
    }
  }

  return detected;
}

/**
 * 🚨 보안 경고: 단순 drawRectangle은 '가짜 마스킹'입니다!
 *
 * drawRectangle로 검은 사각형을 그려도 PDF 내부의 텍스트 데이터는 그대로 남아 있습니다.
 * Ctrl+A로 전체 선택 후 복사하면 마스킹된 텍스트가 그대로 추출됩니다.
 *
 * 해결책: 래스터화(Rasterization) 기법
 * 1. PDF 페이지를 이미지(Canvas)로 렌더링 (pdf.js 사용)
 * 2. Canvas 위에 검은 사각형을 그림 (텍스트 데이터 파괴)
 * 3. Canvas를 이미지로 변환
 * 4. 이미지를 새 PDF 페이지로 삽입
 *
 * 이 방식은 텍스트 레이어를 완전히 제거하여 진정한 마스킹을 구현합니다.
 */

// pdf.js를 사용한 페이지 렌더링 (Canvas)
async function renderPageToCanvas(
  pdfDoc: any, // pdfjs-dist의 PDFDocumentProxy
  pageNumber: number,
  scale: number = 2, // 고해상도를 위해 2배 스케일
): Promise<HTMLCanvasElement> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext("2d")!;
  await page.render({ canvasContext: context, viewport }).promise;

  return canvas;
}

// Canvas에 마스킹 적용
/**
 * ⚠️ 좌표계 변환 주의사항 (v1.3.1 수정)
 *
 * PDF 좌표계:     Canvas 좌표계:
 * ┌─────────┐     ┌─────────┐
 * │         │     │ (0,0)   │  ← 원점 (좌상단)
 * │         │     │    ↓ Y  │
 * │ (0,0)   │     │         │
 * └─────────┘     └─────────┘
 *    ↑ 원점
 * (좌하단, Y가 위로 증가)   (좌상단, Y가 아래로 증가)
 *
 * 변환 공식: canvas_y = page_height - pdf_y - rect_height
 */
function applyMaskToCanvas(
  canvas: HTMLCanvasElement,
  items: DetectedSensitive[],
  pageIndex: number,
  scale: number = 2,
): void {
  const ctx = canvas.getContext("2d")!;

  // ⚠️ 캔버스 높이 (페이지 높이 * scale)
  const canvasHeight = canvas.height;

  // 해당 페이지의 마스킹 항목만 필터링
  const pageItems = items.filter((item) => item.pageIndex === pageIndex);

  // 검은 사각형으로 덮기 (텍스트 데이터 완전 파괴)
  ctx.fillStyle = "#000000";

  for (const item of pageItems) {
    // ✅ 좌표 변환: UI 좌표(Viewport scale 1.0) → Canvas 좌표(Scale 적용)
    //
    // 1. 마진 추가 (-2px는 bbox 외곽 여유)
    // 2. scale 적용 (고해상도 렌더링)
    // 3. Y축 반전 필요 시 아래 공식 사용:
    //    canvas_y = canvasHeight - (pdf_y * scale) - (height * scale)

    const x = (item.bbox.x - 2) * scale;
    const width = (item.bbox.width + 4) * scale;
    const height = (item.bbox.height + 4) * scale;

    // Y축 변환: PDF 좌표계 → Canvas 좌표계
    // 주의: pdf.js의 getTextContent()가 이미 Viewport 좌표로 변환된 경우 반전 불필요
    // 직접 PDF 좌표를 사용하는 경우 아래 공식 적용:
    // const y = canvasHeight - ((item.bbox.y + item.bbox.height + 2) * scale);

    // pdf.js Viewport 좌표 사용 시 (일반적인 케이스):
    const y = (item.bbox.y - 2) * scale;

    ctx.fillRect(x, y, width, height);
  }
}

/**
 * 📋 좌표 변환 참고 (OCR/PDF 텍스트 추출 결과에 따라)
 *
 * Case 1: pdf.js getTextContent() 사용 시
 *   - Viewport 좌표 반환 (Canvas 좌표계와 동일)
 *   - Y축 반전 불필요: y = bbox.y * scale
 *
 * Case 2: Tesseract.js OCR 결과 사용 시
 *   - Canvas 좌표 반환 (이미 Canvas 좌표계)
 *   - Y축 반전 불필요: y = bbox.y * scale
 *
 * Case 3: 직접 PDF 파싱 (pdf-lib 등) 사용 시
 *   - PDF 좌표 반환 (원점이 좌하단)
 *   - Y축 반전 필요: y = canvasHeight - (bbox.y * scale) - (height * scale)
 */

// Canvas를 이미지 Blob으로 변환
async function canvasToImageBlob(
  canvas: HTMLCanvasElement,
  quality: number = 0.95,
): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob!),
      "image/jpeg", // JPEG for smaller file size
      quality,
    );
  });
}

export async function applyRedaction(
  pdfBytes: ArrayBuffer,
  items: DetectedSensitive[],
): Promise<Uint8Array> {
  // 1. pdf.js로 원본 PDF 로드 (렌더링용)
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

  const pdfJsDoc = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  const totalPages = pdfJsDoc.numPages;

  // 2. pdf-lib로 새 PDF 문서 생성 (이미지 삽입용)
  const newPdfDoc = await PDFDocument.create();

  // 3. 마스킹이 필요한 페이지 인덱스 Set
  const pagesToRedact = new Set(items.map((item) => item.pageIndex));

  // 4. 각 페이지 처리
  // ⚠️ 동적 스케일 계산 (v1.3.2): 페이지 수에 따라 메모리 최적화
  const scale = calculateOptimalScale(totalPages, pagesToRedact.size);

  for (let i = 0; i < totalPages; i++) {
    const pageNumber = i + 1; // pdf.js는 1-indexed

    if (pagesToRedact.has(i)) {
      // 🔒 마스킹이 필요한 페이지: 래스터화 처리
      const canvas = await renderPageToCanvas(pdfJsDoc, pageNumber, scale);
      applyMaskToCanvas(canvas, items, i, scale);

      // Canvas → 이미지 → PDF 페이지
      const imageBlob = await canvasToImageBlob(canvas);
      const imageBytes = await imageBlob.arrayBuffer();
      const image = await newPdfDoc.embedJpg(new Uint8Array(imageBytes));

      // 원본 페이지 크기로 새 페이지 생성
      const origPage = await pdfjsLib
        .getDocument({ data: pdfBytes })
        .promise.then((doc: any) => doc.getPage(pageNumber));
      const viewport = origPage.getViewport({ scale: 1 });

      const page = newPdfDoc.addPage([viewport.width, viewport.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });
    } else {
      // ✅ 마스킹 불필요한 페이지: 원본 복사
      const [copiedPage] = await newPdfDoc.copyPages(
        await PDFDocument.load(pdfBytes),
        [i],
      );
      newPdfDoc.addPage(copiedPage);
    }
  }

  // 5. 래스터화된 PDF 반환 (텍스트 데이터 완전 제거됨)
  return newPdfDoc.save();
}

/**
 * 📋 래스터화 방식의 장단점
 *
 * ✅ 장점:
 * - 텍스트 데이터가 완전히 파괴되어 복사/추출 불가
 * - 법적 문서, 의료 기록, 금융 정보에 적합
 * - 기업/기관의 컴플라이언스 요구사항 충족
 *
 * ⚠️ 단점:
 * - 파일 크기 증가 (텍스트 → 이미지)
 * - PDF 텍스트 검색 불가 (마스킹 페이지)
 * - 처리 시간 증가 (렌더링 오버헤드)
 *
 * 🎯 권장 사용 사례:
 * - 민감정보가 포함된 문서의 공개/공유 전 처리
 * - 법적 증거 보존 시 개인정보 보호
 * - 의료/금융 문서의 익명화 처리
 */

/**
 * ⚡ 동적 스케일 계산 (v1.3.2 추가)
 *
 * Scale = 2.0 기준 A4 문서당 약 2~4MB 이미지 생성
 * 50페이지 문서 = 100~200MB 메모리 사용 → 브라우저 크래시 위험
 *
 * 권장 설정:
 * - 1~10페이지: scale 2.0 (고화질)
 * - 11~30페이지: scale 1.5 (균형)
 * - 31~50페이지: scale 1.2 (경량)
 * - 51페이지 이상: scale 1.0 (최소)
 */
type QualityPreset = "high" | "balanced" | "fast";

interface ScaleConfig {
  scale: number;
  jpegQuality: number;
  label: string;
}

const QUALITY_PRESETS: Record<QualityPreset, ScaleConfig> = {
  high: { scale: 2.0, jpegQuality: 0.95, label: "고화질 (느림)" },
  balanced: { scale: 1.5, jpegQuality: 0.85, label: "균형 (권장)" },
  fast: { scale: 1.0, jpegQuality: 0.75, label: "빠름 (경량)" },
};

/**
 * 페이지 수와 마스킹 페이지 수에 따라 최적 스케일 계산
 */
function calculateOptimalScale(
  totalPages: number,
  pagesToRedact: number,
  userPreset?: QualityPreset,
): number {
  // 사용자가 명시적으로 선택한 경우
  if (userPreset) {
    return QUALITY_PRESETS[userPreset].scale;
  }

  // 마스킹할 페이지 수 기준 자동 계산
  if (pagesToRedact <= 5) return 2.0; // 고화질
  if (pagesToRedact <= 15) return 1.5; // 균형
  if (pagesToRedact <= 30) return 1.2; // 경량
  return 1.0; // 최소 (대용량 문서)
}

/**
 * 예상 메모리 사용량 계산 (MB)
 */
function estimateMemoryUsage(pageCount: number, scale: number): number {
  // A4 기준: 595 x 842 points = 약 0.5MP
  // scale 적용 시: (595 * scale) * (842 * scale) * 4 bytes (RGBA)
  const pixelsPerPage = 595 * scale * (842 * scale);
  const bytesPerPage = pixelsPerPage * 4;
  const mbPerPage = bytesPerPage / (1024 * 1024);

  return Math.round(mbPerPage * pageCount);
}
```

**사용자 선택 UI 제공 (권장)**:

```typescript
// src/features/pdf-toolkit/ui/quality-selector.tsx
'use client';

import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Badge } from '@/shared/ui/badge';

interface QualitySelectorProps {
  pageCount: number;
  onSelect: (preset: QualityPreset) => void;
  selected: QualityPreset;
}

export function QualitySelector({
  pageCount,
  onSelect,
  selected,
}: QualitySelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">처리 품질 선택</Label>
      <RadioGroup value={selected} onValueChange={(v) => onSelect(v as QualityPreset)}>
        {Object.entries(QUALITY_PRESETS).map(([key, config]) => {
          const estimatedMB = estimateMemoryUsage(pageCount, config.scale);
          const isRecommended = key === 'balanced';

          return (
            <div key={key} className="flex items-center space-x-3">
              <RadioGroupItem value={key} id={key} />
              <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer">
                <span>{config.label}</span>
                {isRecommended && (
                  <Badge variant="secondary" className="text-xs">권장</Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  (~{estimatedMB}MB)
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {pageCount > 30 && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400">
          ⚠️ 페이지가 많습니다. "빠름" 옵션을 권장합니다.
        </p>
      )}
    </div>
  );
}
```

#### 🔧 PDF.js + Next.js 호환성 설정 (필수)

> ⚠️ **주의**: `pdfjs-dist`는 Next.js의 Server Component 및 Webpack 설정과 충돌이 잦습니다.
> 아래 설정을 반드시 적용해야 합니다.

**1. Worker 파일 정적 배치**

```bash
# node_modules에서 worker 파일을 public으로 복사
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.js
```

또는 `postinstall` 스크립트로 자동화:

```json
// package.json (⚠️ Mac/Linux 전용)
{
  "scripts": {
    "postinstall": "cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.js"
  }
}
```

#### 🔧 크로스 플랫폼 postinstall (v1.3.2 추가)

> ⚠️ **Windows 호환성**: `cp` 명령어는 Windows에서 동작하지 않습니다.
> `shx` 라이브러리를 사용하여 크로스 플랫폼 지원을 권장합니다.

```bash
# shx 설치 (크로스 플랫폼 쉘 명령어)
npm install -D shx
```

```json
// package.json (✅ Windows/Mac/Linux 모두 지원)
{
  "scripts": {
    "postinstall": "shx cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.js"
  },
  "devDependencies": {
    "shx": "^0.3.4"
  }
}
```

**대안: Node.js 스크립트로 직접 복사**

```javascript
// scripts/copy-pdf-worker.mjs
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const src = join(
  projectRoot,
  "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
);
const dest = join(projectRoot, "public/pdf.worker.min.js");

// public 폴더가 없으면 생성
const destDir = dirname(dest);
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

try {
  copyFileSync(src, dest);
  console.log("✅ PDF.js worker copied to public/");
} catch (error) {
  console.error("❌ Failed to copy PDF.js worker:", error.message);
  process.exit(1);
}
```

```json
// package.json (Node.js 스크립트 방식)
{
  "scripts": {
    "postinstall": "node scripts/copy-pdf-worker.mjs"
  }
}
```

**2. next.config.ts 설정 (⚠️ 필수)**

> 🚨 **빌드 오류 방지**: `config.resolve.alias.canvas = false`가 없으면 `pdfjs-dist`의 optional dependency인 `canvas` 패키지를 찾으려 하여 빌드 실패

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // ⚠️ 필수: pdfjs-dist의 canvas 의존성 무시 (Node.js canvas 패키지 불필요)
    // 이 설정이 없으면 "Module not found: Can't resolve 'canvas'" 에러 발생
    config.resolve.alias.canvas = false;

    // Server에서 pdfjs-dist 로드 방지 (Client-only 라이브러리)
    if (isServer) {
      config.externals.push("pdfjs-dist");
    }

    return config;
  },
  // Worker 파일 정적 제공을 위한 헤더
  async headers() {
    return [
      {
        source: "/pdf.worker.min.js",
        headers: [
          { key: "Content-Type", value: "application/javascript" },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**빌드 오류 시 체크**:

```bash
# 에러: Module not found: Can't resolve 'canvas'
# 원인: config.resolve.alias.canvas = false 누락
# 해결: 위 설정을 next.config.ts에 추가
```

**3. Dynamic Import로 Client-only 로드**

```typescript
// src/features/pdf-toolkit/lib/pdf-loader.ts
"use client";

let pdfjsLib: typeof import("pdfjs-dist") | null = null;

export async function getPdfJs() {
  if (pdfjsLib) return pdfjsLib;

  // Dynamic import (Client-side only)
  pdfjsLib = await import("pdfjs-dist");

  // Worker 경로 설정 (정적 파일 또는 CDN)
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    process.env.NODE_ENV === "production"
      ? "/pdf.worker.min.js" // 정적 파일
      : `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`; // CDN (개발용)

  return pdfjsLib;
}
```

**4. 사용 예시 (Redaction Tool)**

```typescript
// src/features/pdf-toolkit/lib/redaction.ts
import { getPdfJs } from "./pdf-loader";

export async function applyRedaction(
  pdfBytes: ArrayBuffer,
  items: DetectedSensitive[],
): Promise<Uint8Array> {
  // ✅ 안전한 로드 방식
  const pdfjsLib = await getPdfJs();

  const pdfJsDoc = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  // ... 나머지 로직
}
```

**5. CDN 대안 (Worker 파일 복사 불가 시)**

```typescript
// Cloudflare CDN 사용 (무료, 빠름)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;

// 또는 unpkg
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs`;
```

**체크리스트**:

- [ ] `pdfjs-dist` 설치 (`npm install pdfjs-dist`)
- [ ] Worker 파일 `public/` 폴더에 복사 (또는 CDN 설정)
- [ ] `next.config.ts`에 canvas alias 및 externals 추가
- [ ] Dynamic import wrapper 함수 생성
- [ ] 개발/프로덕션 환경별 Worker 경로 분기

```typescript

```

```typescript
// src/features/pdf-toolkit/ui/redaction-tool.tsx
'use client';

import { useState } from 'react';
import { Button, Checkbox, Progress } from '@/shared/ui';
import {
  detectSensitiveInfo,
  applyRedaction,
  SENSITIVE_PATTERNS,
  type DetectedSensitive,
} from '../lib/redaction';

export function RedactionTool() {
  const [file, setFile] = useState<File | null>(null);
  const [patterns, setPatterns] = useState<string[]>(['residentNumber', 'phoneNumber']);
  const [detected, setDetected] = useState<DetectedSensitive[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDetect = async () => {
    if (!file) return;
    setIsProcessing(true);

    const buffer = await file.arrayBuffer();
    const items = await detectSensitiveInfo(
      buffer,
      patterns as (keyof typeof SENSITIVE_PATTERNS)[],
      (page, total) => setProgress((page / total) * 100)
    );

    setDetected(items);
    setSelected(new Set(items.map((_, i) => i))); // 기본 전체 선택
    setIsProcessing(false);
  };

  const handleRedact = async () => {
    if (!file || selected.size === 0) return;
    setIsProcessing(true);

    const buffer = await file.arrayBuffer();
    const itemsToRedact = detected.filter((_, i) => selected.has(i));
    const result = await applyRedaction(buffer, itemsToRedact);

    // 다운로드
    const blob = new Blob([result], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace('.pdf', '_redacted.pdf');
    a.click();
    URL.revokeObjectURL(url);

    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* 파일 업로드 */}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* 패턴 선택 */}
      <div className="space-y-2">
        <h3 className="font-medium">감지할 민감정보 유형</h3>
        {Object.keys(SENSITIVE_PATTERNS).map((key) => (
          <label key={key} className="flex items-center gap-2">
            <Checkbox
              checked={patterns.includes(key)}
              onCheckedChange={(checked) => {
                setPatterns(
                  checked
                    ? [...patterns, key]
                    : patterns.filter((p) => p !== key)
                );
              }}
            />
            {key === 'residentNumber' && '주민등록번호'}
            {key === 'phoneNumber' && '전화번호'}
            {key === 'bankAccount' && '계좌번호'}
            {key === 'creditCard' && '카드번호'}
            {key === 'email' && '이메일'}
          </label>
        ))}
      </div>

      {/* 감지 버튼 */}
      <Button onClick={handleDetect} disabled={!file || isProcessing}>
        민감정보 검색
      </Button>

      {/* 진행률 */}
      {isProcessing && <Progress value={progress} />}

      {/* 감지 결과 */}
      {detected.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">
            감지된 민감정보 ({detected.length}개)
          </h3>
          {detected.map((item, i) => (
            <label key={i} className="flex items-center gap-2 p-2 border rounded">
              <Checkbox
                checked={selected.has(i)}
                onCheckedChange={(checked) => {
                  const newSelected = new Set(selected);
                  if (checked) newSelected.add(i);
                  else newSelected.delete(i);
                  setSelected(newSelected);
                }}
              />
              <span className="font-mono">{item.text}</span>
              <span className="text-muted-foreground text-sm">
                ({item.pattern}, 페이지 {item.pageIndex + 1})
              </span>
            </label>
          ))}

          <Button onClick={handleRedact} disabled={selected.size === 0 || isProcessing}>
            {selected.size}개 항목 마스킹 적용
          </Button>
        </div>
      )}

      {/* 프라이버시 안내 */}
      <p className="text-sm text-muted-foreground">
        🛡️ 모든 처리는 브라우저 내에서 이루어집니다. 파일이 서버로 전송되지 않습니다.
      </p>
    </div>
  );
}
```

**마케팅 메시지**:

```
┌─────────────────────────────────────────────────────────────┐
│  🛡️ 계약서 속 개인정보, 클라우드 없이 안전하게 가리기         │
│                                                             │
│  • 주민번호, 전화번호, 계좌번호 자동 감지                     │
│  • 클릭 한 번으로 완벽하게 가리기 (복구 불가)                 │
│  • 파일이 서버로 전송되지 않아 100% 안전                      │
│                                                             │
│  법무팀, 인사팀이 신뢰하는 보안 도구                          │
│                                                             │
│  [지금 시작하기]                                             │
└─────────────────────────────────────────────────────────────┘
```

**한글 폰트 임베딩**:

```typescript
// src/features/pdf-toolkit/lib/fonts.ts
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export async function embedKoreanFont(pdfDoc: PDFDocument) {
  pdfDoc.registerFontkit(fontkit);

  // Noto Sans KR 폰트 로드 (CDN 또는 번들)
  const fontBytes = await fetch("/fonts/NotoSansKR-Regular.otf").then((res) =>
    res.arrayBuffer(),
  );

  const font = await pdfDoc.embedFont(fontBytes);
  return font;
}
```

#### Week 4: OCR Scanner

**작업 항목**:

| 순서 | 작업              | 파일                                          | 예상 시간 |
| ---- | ----------------- | --------------------------------------------- | --------- |
| 1    | Tesseract.js 설치 | `package.json`                                | 30분      |
| 2    | OCR 워커          | `src/features/ocr-scanner/lib/worker.ts`      | 3시간     |
| 3    | 언어 팩 관리      | `src/features/ocr-scanner/lib/languages.ts`   | 2시간     |
| 4    | 이미지 전처리     | `src/features/ocr-scanner/lib/preprocess.ts`  | 4시간     |
| 5    | UI 컴포넌트       | `src/features/ocr-scanner/ui/ocr-scanner.tsx` | 5시간     |

**Tesseract SIMD 최적화**:

```typescript
// src/features/ocr-scanner/lib/worker.ts
import { createWorker } from "tesseract.js";

export async function createOCRWorker(lang: string) {
  const worker = await createWorker(lang, 1, {
    corePath: "/tesseract/tesseract-core-simd.wasm.js", // SIMD 버전
    workerPath: "/tesseract/worker.min.js",
    langPath: "/tesseract/lang",
  });

  return worker;
}
```

### 4.3 Month 5: 미디어 도구 (WebGPU)

#### Week 1-2: Background Remover

**작업 항목**:

| 순서 | 작업              | 파일                                        | 예상 시간 |
| ---- | ----------------- | ------------------------------------------- | --------- |
| 1    | ONNX Runtime 설치 | `package.json`                              | 30분      |
| 2    | WebGPU 감지       | `src/shared/lib/webgpu/detect.ts`           | 2시간     |
| 3    | U2-Net 모델 설정  | `public/models/`                            | 2시간     |
| 4    | 추론 파이프라인   | `src/features/bg-remover/lib/inference.ts`  | 6시간     |
| 5    | 마스크 적용       | `src/features/bg-remover/lib/mask.ts`       | 3시간     |
| 6    | UI 컴포넌트       | `src/features/bg-remover/ui/bg-remover.tsx` | 5시간     |
| 7    | Canvas 폴백       | `src/features/bg-remover/lib/fallback.ts`   | 4시간     |

**WebGPU 감지 및 폴백**:

```typescript
// src/shared/lib/webgpu/detect.ts

export async function getOptimalBackend(): Promise<"webgpu" | "wasm" | "cpu"> {
  // 1. WebGPU 체크
  if (navigator.gpu) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        return "webgpu";
      }
    } catch {}
  }

  // 2. WASM SIMD 체크
  const simdSupported = await checkSIMDSupport();
  if (simdSupported) {
    return "wasm";
  }

  // 3. CPU 폴백
  return "cpu";
}

async function checkSIMDSupport(): Promise<boolean> {
  try {
    return WebAssembly.validate(
      new Uint8Array([
        0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10,
        1, 8, 0, 65, 0, 253, 15, 253, 98, 11,
      ]),
    );
  } catch {
    return false;
  }
}
```

**마케팅 메시지**:

```
┌─────────────────────────────────────────────────────────────┐
│  🛡️ 100% 프라이버시 보장                                    │
│                                                             │
│  서버로 이미지를 보내지 않습니다.                            │
│  당신의 신제품 사진은 안전합니다.                            │
│                                                             │
│  AI 처리가 모두 브라우저 내에서 이루어집니다.                 │
│                                                             │
│  [배경 제거 시작하기]                                        │
└─────────────────────────────────────────────────────────────┘
```

#### Week 3-4: OG Image Generator

**작업 항목**:

| 순서 | 작업          | 파일                                            | 예상 시간 |
| ---- | ------------- | ----------------------------------------------- | --------- |
| 1    | Satori 설치   | `package.json`                                  | 30분      |
| 2    | 템플릿 시스템 | `src/features/og-generator/lib/templates.ts`    | 4시간     |
| 3    | 폰트 로딩     | `src/features/og-generator/lib/fonts.ts`        | 2시간     |
| 4    | 렌더링 엔진   | `src/features/og-generator/lib/render.ts`       | 4시간     |
| 5    | UI 컴포넌트   | `src/features/og-generator/ui/og-generator.tsx` | 5시간     |

### 4.4 Month 6: Bulk Actions (Pro Only)

**차별화 포인트**: 경쟁사는 서버 비용 때문에 Bulk 제한. Web Toolkit은 **클라이언트 처리 + File System API**로 **무제한**

#### Week 1-2: Bulk Framework

**작업 항목**:

| 순서 | 작업            | 파일                                         | 예상 시간 |
| ---- | --------------- | -------------------------------------------- | --------- |
| 1    | Bulk 프레임워크 | `src/features/bulk-actions/lib/processor.ts` | 4시간     |
| 2    | 진행률 관리     | `src/features/bulk-actions/lib/progress.ts`  | 2시간     |
| 3    | 오류 복구       | `src/features/bulk-actions/lib/recovery.ts`  | 3시간     |
| 4    | 결과 리포트     | `src/features/bulk-actions/lib/report.ts`    | 2시간     |

**Bulk 프로세서**:

```typescript
// src/features/bulk-actions/lib/processor.ts

interface BulkJobConfig<T, R> {
  items: T[];
  processor: (item: T, index: number) => Promise<R>;
  concurrency?: number;
  onProgress?: (completed: number, total: number, current: T) => void;
  onError?: (
    error: Error,
    item: T,
    index: number,
  ) => "skip" | "retry" | "abort";
}

export async function processBulk<T, R>(
  config: BulkJobConfig<T, R>,
): Promise<{
  results: (R | null)[];
  errors: { index: number; item: T; error: Error }[];
  stats: { processed: number; failed: number; skipped: number };
}> {
  const { items, processor, concurrency = 3, onProgress, onError } = config;

  const results: (R | null)[] = new Array(items.length).fill(null);
  const errors: { index: number; item: T; error: Error }[] = [];
  let processed = 0;
  let failed = 0;
  let skipped = 0;

  // 병렬 처리 풀
  const pool = new Set<Promise<void>>();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const task = (async () => {
      try {
        results[i] = await processor(item, i);
        processed++;
        onProgress?.(processed + failed + skipped, items.length, item);
      } catch (e) {
        const error = e as Error;
        const action = onError?.(error, item, i) ?? "skip";

        if (action === "abort") {
          throw error;
        } else if (action === "retry") {
          // 재시도 로직
          results[i] = await processor(item, i);
          processed++;
        } else {
          errors.push({ index: i, item, error });
          failed++;
        }
      }
    })();

    pool.add(task);
    task.finally(() => pool.delete(task));

    if (pool.size >= concurrency) {
      await Promise.race(pool);
    }
  }

  await Promise.all(pool);

  return {
    results,
    errors,
    stats: { processed, failed, skipped },
  };
}
```

#### Week 3-4: Bulk 도구 구현 + API

**작업 항목**:

| 순서 | 작업              | 파일                                   | 예상 시간 |
| ---- | ----------------- | -------------------------------------- | --------- |
| 1    | Bulk JSON         | `src/features/bulk-actions/json/`      | 4시간     |
| 2    | Bulk Hash         | `src/features/bulk-actions/hash/`      | 4시간     |
| 3    | Bulk Image Resize | `src/features/bulk-actions/image/`     | 5시간     |
| 4    | Bulk QR           | `src/features/bulk-actions/qr/`        | 4시간     |
| 5    | ZIP 다운로드      | `src/features/bulk-actions/lib/zip.ts` | 2시간     |
| 6    | API 키 시스템     | `src/app/api/keys/route.ts`            | 4시간     |
| 7    | API 엔드포인트    | `src/app/api/v1/`                      | 6시간     |

### 4.5 Phase 2 체크리스트

```
Month 4: File System Access + 문서 도구
├── [ ] File System Access API 핸들러
├── [ ] 폴더 선택 및 스트리밍 처리
├── [ ] **Safari/Firefox ZIP Fallback** ← NEW
├── [ ] **브라우저 감지 및 Chrome 유도** ← NEW
├── [ ] PDF Toolkit (병합, 분할, 압축)
├── [ ] **PDF 민감정보 마스킹 (Auto-Redaction)** ← NEW
├── [ ] 한글 폰트 임베딩
├── [ ] OCR Scanner (Tesseract.js SIMD)
└── [ ] 언어 팩 관리

Month 5: 미디어 도구 (WebGPU)
├── [ ] WebGPU 감지 및 폴백
├── [ ] Background Remover (ONNX)
├── [ ] U2-Net 모델 CDN 호스팅
├── [ ] OG Image Generator (Satori)
└── [ ] 템플릿 시스템

Month 6: Bulk Actions + API
├── [ ] Bulk 프레임워크
├── [ ] Bulk JSON/Hash/Image/QR
├── [ ] File System API 통합
├── [ ] ZIP 다운로드
├── [ ] API 키 시스템
├── [ ] Rate Limiting
└── [ ] API 문서
```

---

## 5. Phase 3: AI 통합 및 Vertical 진입 (7-12개월)

### 5.1 로컬 LLM 통합 (OPFS 캐싱)

**문제점**: AI 모델 가중치가 수백 MB ~ 수 GB. 매번 다운로드하면 UX 저하.

**해결책**: OPFS (Origin Private File System)에 모델 캐싱

#### Month 7-8: OPFS 기반 모델 캐싱

**작업 항목**:

| 순서 | 작업                 | 파일                                     | 예상 시간 |
| ---- | -------------------- | ---------------------------------------- | --------- |
| 1    | OPFS 유틸리티        | `src/shared/lib/opfs/manager.ts`         | 4시간     |
| 2    | 모델 캐시 매니저     | `src/shared/lib/ai/model-cache.ts`       | 5시간     |
| 3    | 다운로드 진행률      | `src/shared/lib/ai/download-progress.ts` | 2시간     |
| 4    | 버전 관리            | `src/shared/lib/ai/model-version.ts`     | 2시간     |
| 5    | **캐싱 상태 훅**     | `src/shared/lib/ai/use-model-status.ts`  | 3시간     |
| 6    | **Ready 인디케이터** | `src/shared/ui/model-ready-badge.tsx`    | 2시간     |

**OPFS 모델 캐싱**:

```typescript
// src/shared/lib/opfs/manager.ts

export class OPFSModelCache {
  private root: FileSystemDirectoryHandle | null = null;

  async init() {
    this.root = await navigator.storage.getDirectory();
    return this;
  }

  async hasModel(modelId: string, version: string): Promise<boolean> {
    if (!this.root) return false;

    try {
      const modelDir = await this.root.getDirectoryHandle("models", {
        create: true,
      });
      const versionFile = await modelDir.getFileHandle(
        `${modelId}-${version}.bin`,
      );
      return !!versionFile;
    } catch {
      return false;
    }
  }

  async saveModel(
    modelId: string,
    version: string,
    data: ArrayBuffer,
  ): Promise<void> {
    if (!this.root) throw new Error("OPFS not initialized");

    const modelDir = await this.root.getDirectoryHandle("models", {
      create: true,
    });
    const fileHandle = await modelDir.getFileHandle(
      `${modelId}-${version}.bin`,
      { create: true },
    );
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
  }

  async loadModel(
    modelId: string,
    version: string,
  ): Promise<ArrayBuffer | null> {
    if (!this.root) return null;

    try {
      const modelDir = await this.root.getDirectoryHandle("models");
      const fileHandle = await modelDir.getFileHandle(
        `${modelId}-${version}.bin`,
      );
      const file = await fileHandle.getFile();
      return await file.arrayBuffer();
    } catch {
      return null;
    }
  }

  async getStorageUsage(): Promise<{ used: number; quota: number }> {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      quota: estimate.quota || 0,
    };
  }
}
```

#### 🛡️ Safari Persistence 요청 (v1.3.1 추가)

> ⚠️ **Safari 7일 정책**: Safari는 미사용 사이트의 IndexedDB, OPFS 데이터를 7일 후 자동 삭제합니다.
>
> **해결책**: `navigator.storage.persist()`를 호출하여 영구 저장소로 승격 요청

```typescript
// src/shared/lib/storage/persistence.ts

/**
 * 브라우저 저장소 영구 보존 요청
 *
 * Safari의 7일 데이터 삭제 정책을 우회하기 위해
 * Persistent Storage를 요청합니다.
 *
 * 참고:
 * - Chrome: 충분한 engagement score가 있으면 자동 승인
 * - Firefox: 사용자에게 권한 프롬프트 표시
 * - Safari: 사이트 데이터가 "중요"하다고 판단되면 승인 (자동)
 *
 * @returns true면 영구 저장 보장, false면 7일 후 삭제 가능
 */
export async function requestPersistence(): Promise<boolean> {
  // Storage API 지원 확인
  if (!navigator.storage || !navigator.storage.persist) {
    console.warn("Storage Persistence API not supported");
    return false;
  }

  try {
    // 이미 영구 저장소인지 확인
    const isPersisted = await navigator.storage.persisted();

    if (isPersisted) {
      console.log("Storage is already persistent");
      return true;
    }

    // 영구 저장소 요청
    const result = await navigator.storage.persist();

    if (result) {
      console.log("Storage persistence granted");
    } else {
      console.warn(
        "Storage persistence denied - data may be evicted after 7 days",
      );
    }

    return result;
  } catch (error) {
    console.error("Failed to request storage persistence:", error);
    return false;
  }
}

/**
 * 현재 저장소 상태 확인
 */
export async function checkStorageStatus(): Promise<{
  isPersistent: boolean;
  usage: number;
  quota: number;
  usagePercent: number;
}> {
  const isPersistent = navigator.storage?.persisted
    ? await navigator.storage.persisted()
    : false;

  const estimate = navigator.storage?.estimate
    ? await navigator.storage.estimate()
    : { usage: 0, quota: 0 };

  const usage = estimate.usage || 0;
  const quota = estimate.quota || 0;
  const usagePercent = quota > 0 ? (usage / quota) * 100 : 0;

  return {
    isPersistent,
    usage,
    quota,
    usagePercent,
  };
}
```

**OPFS 초기화 시 Persistence 요청**:

```typescript
// src/shared/lib/opfs/manager.ts 수정

import { requestPersistence } from "../storage/persistence";

export class OPFSModelCache {
  private root: FileSystemDirectoryHandle | null = null;
  private isPersistent: boolean = false;

  async init() {
    this.root = await navigator.storage.getDirectory();

    // ⚠️ Safari 7일 삭제 정책 우회
    this.isPersistent = await requestPersistence();

    if (!this.isPersistent) {
      console.warn(
        "[OPFSModelCache] Storage is not persistent. " +
          "Cached models may be deleted after 7 days of inactivity (Safari).",
      );
    }

    return this;
  }

  // 캐시 상태 확인 시 persistence 정보도 포함
  async getStorageStatus() {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      quota: estimate.quota || 0,
      isPersistent: this.isPersistent,
    };
  }
}
```

**사용자 안내 메시지** (persistence 실패 시):

```typescript
// src/shared/ui/storage-warning-banner.tsx
'use client';

interface StorageWarningBannerProps {
  isPersistent: boolean;
}

export function StorageWarningBanner({ isPersistent }: StorageWarningBannerProps) {
  if (isPersistent) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
      <div className="flex">
        <div className="flex-shrink-0">
          ⚠️
        </div>
        <div className="ml-3">
          <p className="text-yellow-700">
            <strong>저장소 알림:</strong> 브라우저 정책에 따라 7일 이상 미사용 시
            캐시된 AI 모델이 삭제될 수 있습니다.
          </p>
          <p className="text-yellow-600 mt-1">
            도구를 정기적으로 사용하면 캐시가 유지됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
```

#### 📱 Safari PWA 홈 화면 추가 안내 (v1.3.2 추가)

> 🎯 **Pro-Tip**: Safari(iOS)는 `navigator.storage.persist()` 요청을 무시하는 경향이 있습니다.
> **PWA로 홈 화면에 추가된 상태**가 Safari의 7일 삭제 정책을 피하는 가장 확실한 방법입니다.

```typescript
// src/shared/ui/add-to-home-prompt.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Share, Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface AddToHomePromptProps {
  onDismiss?: () => void;
}

/**
 * Safari iOS에서 홈 화면 추가를 안내하는 프롬프트
 * - PWA로 설치 시 데이터 영구 보존 가능
 * - persist() 실패 시 대안으로 표시
 */
export function AddToHomePrompt({ onDismiss }: AddToHomePromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // iOS Safari 감지
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true;

    setIsIOS(iOS);
    setIsStandalone(standalone);

    // 이미 설치되었거나 iOS가 아니면 표시 안 함
    // 또는 이미 닫았던 경우 (localStorage 체크)
    const dismissed = localStorage.getItem('add-to-home-dismissed');
    if (!iOS || standalone || dismissed) {
      setIsVisible(false);
    } else {
      // persist() 실패 후에만 표시
      navigator.storage?.persisted?.().then((isPersisted) => {
        if (!isPersisted) {
          setIsVisible(true);
        }
      });
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('add-to-home-dismissed', 'true');
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border p-4 z-50 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="닫기"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Plus className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-sm">
            홈 화면에 추가하기
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            앱처럼 사용하고, AI 모델을 영구 저장하세요.
          </p>

          <div className="mt-3 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-muted px-1.5 py-0.5 rounded">1</span>
              <span>하단의</span>
              <Share className="h-4 w-4 text-blue-500" />
              <span>공유 버튼을 탭하세요</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-muted px-1.5 py-0.5 rounded">2</span>
              <span>"홈 화면에 추가"를 선택하세요</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**통합 위치**: AI 도구 페이지의 Layout에 조건부 렌더링

```typescript
// src/app/[locale]/tools/[slug]/layout.tsx
import { AddToHomePrompt } from '@/shared/ui/add-to-home-prompt';

// AI 도구 목록 (대용량 모델 사용)
const AI_TOOLS = ['background-remover', 'ocr-scanner', 'pdf-redaction'];

export default function ToolLayout({ children, params }) {
  const showPrompt = AI_TOOLS.includes(params.slug);

  return (
    <>
      {children}
      {showPrompt && <AddToHomePrompt />}
    </>
  );
}
```

#### 🎯 모델 캐싱 상태 관리 (UX 핵심)

> ⚠️ **문제**: 200MB~1GB 모델 파일 다운로드 중 사용자에게 "멈춘 것 같은" 경험 제공
>
> **해결책**: 3단계 상태 관리 + Ready 배지로 명확한 피드백 제공

**상태 정의**:

```typescript
// src/shared/lib/ai/use-model-status.ts
export type ModelStatus =
  | "checking" // 캐시 확인 중
  | "downloading" // 다운로드 중 (진행률 표시)
  | "ready" // 사용 가능 (캐시됨)
  | "error"; // 오류 발생

export interface ModelState {
  status: ModelStatus;
  progress: number; // 0-100
  modelId: string;
  version: string;
  sizeInMB: number; // 예상 크기 표시용
  cachedAt?: Date; // 캐시된 시간
  error?: string;
}
```

**상태 관리 훅**:

```typescript
// src/shared/lib/ai/use-model-status.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { OPFSModelCache } from "@/shared/lib/opfs/manager";

const cache = new OPFSModelCache();

interface ModelConfig {
  modelId: string;
  version: string;
  sizeInMB: number;
}

export function useModelStatus(config: ModelConfig) {
  const [state, setState] = useState<ModelState>({
    status: "checking",
    progress: 0,
    ...config,
  });

  // 초기 캐시 확인
  useEffect(() => {
    async function checkCache() {
      await cache.init();
      const isCached = await cache.hasModel(config.modelId, config.version);

      if (isCached) {
        // 캐시된 시간 정보 로드
        const metadata = await cache.getMetadata(
          config.modelId,
          config.version,
        );
        setState((prev) => ({
          ...prev,
          status: "ready",
          progress: 100,
          cachedAt: metadata?.cachedAt,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: "downloading",
          progress: 0,
        }));
      }
    }

    checkCache();
  }, [config.modelId, config.version]);

  // 진행률 업데이트 콜백
  const updateProgress = useCallback((progress: number) => {
    setState((prev) => ({
      ...prev,
      progress: Math.round(progress),
      status: progress >= 100 ? "ready" : "downloading",
    }));
  }, []);

  // 에러 처리
  const setError = useCallback((error: string) => {
    setState((prev) => ({
      ...prev,
      status: "error",
      error,
    }));
  }, []);

  return {
    state,
    updateProgress,
    setError,
    isReady: state.status === "ready",
    isDownloading: state.status === "downloading",
  };
}
```

**Ready 배지 컴포넌트**:

```typescript
// src/shared/ui/model-ready-badge.tsx
'use client';

import { CheckCircle2, Download, AlertCircle, Loader2 } from 'lucide-react';
import type { ModelState } from '@/shared/lib/ai/use-model-status';

interface ModelReadyBadgeProps {
  state: ModelState;
  showDetails?: boolean;
}

export function ModelReadyBadge({ state, showDetails = false }: ModelReadyBadgeProps) {
  const formatSize = (mb: number) => mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : `${mb} MB`;

  switch (state.status) {
    case 'checking':
      return (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>캐시 확인 중...</span>
        </div>
      );

    case 'downloading':
      return (
        <div className="flex items-center gap-2 text-sm">
          <Download className="h-4 w-4 text-blue-500" />
          <div className="flex-1">
            <div className="flex justify-between">
              <span>모델 다운로드 중</span>
              <span className="text-muted-foreground">{state.progress}%</span>
            </div>
            {/* 프로그레스 바 */}
            <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${state.progress}%` }}
              />
            </div>
            {showDetails && (
              <p className="text-xs text-muted-foreground mt-1">
                약 {formatSize(state.sizeInMB)} · 첫 다운로드 후 오프라인 사용 가능
              </p>
            )}
          </div>
        </div>
      );

    case 'ready':
      return (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <span>Ready ⚡️</span>
          {showDetails && state.cachedAt && (
            <span className="text-xs text-muted-foreground">
              · 캐시됨 ({new Date(state.cachedAt).toLocaleDateString()})
            </span>
          )}
        </div>
      );

    case 'error':
      return (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>오류: {state.error}</span>
        </div>
      );
  }
}
```

**도구 페이지 통합 예시**:

```typescript
// src/features/audio-transcriber/ui/transcriber.tsx
'use client';

import { useModelStatus } from '@/shared/lib/ai/use-model-status';
import { ModelReadyBadge } from '@/shared/ui/model-ready-badge';
import { createTranscriber } from '../lib/whisper';

const WHISPER_CONFIG = {
  modelId: 'Xenova/whisper-tiny',
  version: '1.0.0',
  sizeInMB: 150,
};

export function AudioTranscriber() {
  const { state, updateProgress, isReady } = useModelStatus(WHISPER_CONFIG);

  const handleTranscribe = async () => {
    if (!isReady) {
      // 다운로드 시작 (자동 캐싱)
      await createTranscriber(updateProgress);
    }
    // ... 트랜스크립션 로직
  };

  return (
    <div className="space-y-4">
      {/* 헤더에 상태 배지 표시 */}
      <div className="flex items-center justify-between">
        <h2>음성 → 텍스트 변환</h2>
        <ModelReadyBadge state={state} showDetails />
      </div>

      {/* 버튼 상태 */}
      <Button
        onClick={handleTranscribe}
        disabled={state.status === 'downloading'}
      >
        {state.status === 'downloading' ? '다운로드 중...' : '변환 시작'}
      </Button>
    </div>
  );
}
```

**UX 고려사항**:

| 상태          | 사용자 메시지           | 액션                         |
| ------------- | ----------------------- | ---------------------------- |
| `checking`    | "캐시 확인 중..."       | 스피너 표시                  |
| `downloading` | "모델 다운로드 중 (X%)" | 프로그레스 바 + 예상 크기    |
| `ready`       | "Ready ⚡️"              | 즉시 사용 가능 (초록색 체크) |
| `error`       | 오류 메시지             | 재시도 버튼                  |

**체크리스트**:

- [ ] `useModelStatus` 훅 구현
- [ ] `ModelReadyBadge` 컴포넌트 구현
- [ ] OPFS 메타데이터 (cachedAt) 저장 로직 추가
- [ ] 도구별 모델 설정 상수 정의
- [ ] 에러 복구 (재시도) 로직 추가

#### Whisper 음성 변환

**작업 항목**:

| 순서 | 작업                 | 파일                                                | 예상 시간 |
| ---- | -------------------- | --------------------------------------------------- | --------- |
| 1    | Transformers.js 설치 | `package.json`                                      | 30분      |
| 2    | Whisper 파이프라인   | `src/features/audio-transcriber/lib/whisper.ts`     | 5시간     |
| 3    | 오디오 전처리        | `src/features/audio-transcriber/lib/audio.ts`       | 3시간     |
| 4    | 자막 생성            | `src/features/audio-transcriber/lib/subtitles.ts`   | 3시간     |
| 5    | UI 컴포넌트          | `src/features/audio-transcriber/ui/transcriber.tsx` | 5시간     |

**Whisper 캐싱 통합**:

```typescript
// src/features/audio-transcriber/lib/whisper.ts
import { pipeline, env } from "@huggingface/transformers";
import { OPFSModelCache } from "@/shared/lib/opfs/manager";

// WASM 백엔드 설정
env.backends.onnx.wasm.wasmPaths = "/transformers/";

const cache = new OPFSModelCache();

export async function createTranscriber(
  onProgress?: (progress: number) => void,
) {
  await cache.init();

  const modelId = "Xenova/whisper-tiny";
  const version = "1.0.0";

  // 캐시 확인
  const cached = await cache.hasModel(modelId, version);

  if (!cached) {
    onProgress?.(0);
    // 첫 로드 시 진행률 표시
  }

  const transcriber = await pipeline("automatic-speech-recognition", modelId, {
    progress_callback: (data: { progress: number }) => {
      onProgress?.(data.progress);
    },
  });

  return transcriber;
}
```

#### AI Summarizer

**작업 항목**:

| 순서 | 작업            | 파일                                           | 예상 시간 |
| ---- | --------------- | ---------------------------------------------- | --------- |
| 1    | 요약 모델       | `src/features/ai-summarizer/lib/model.ts`      | 3시간     |
| 2    | 텍스트 청킹     | `src/features/ai-summarizer/lib/chunker.ts`    | 2시간     |
| 3    | 요약 파이프라인 | `src/features/ai-summarizer/lib/summarize.ts`  | 4시간     |
| 4    | UI 컴포넌트     | `src/features/ai-summarizer/ui/summarizer.tsx` | 4시간     |

### 5.2 Fake Door 테스트 전략 (수요 검증)

> 💡 **개발 전 수요 검증으로 리소스 낭비 방지**
>
> Phase 3의 '팀 기능', 'Enterprise'는 개발 공수가 매우 큽니다.
> 실제로 만들기 전에 Fake Door 테스트로 수요를 먼저 검증하세요.

#### Fake Door 패턴

**원리**: 실제 기능이 없지만 UI는 존재. 클릭 시 사전 예약 모달 표시.

```typescript
// src/features/fake-door/ui/fake-door-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';
import { FakeDoorModal } from './fake-door-modal';
import { trackFakeDoorClick } from '../lib/analytics';

interface FakeDoorButtonProps {
  featureId: string;
  featureName: string;
  children: React.ReactNode;
  discount?: string; // e.g., "50%"
}

export function FakeDoorButton({
  featureId,
  featureName,
  children,
  discount = '50%',
}: FakeDoorButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    trackFakeDoorClick(featureId);
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleClick}>{children}</Button>
      <FakeDoorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        featureName={featureName}
        discount={discount}
        featureId={featureId}
      />
    </>
  );
}
```

```typescript
// src/features/fake-door/ui/fake-door-modal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from '@/shared/ui';
import { registerFakeDoorInterest } from '../lib/api';

interface FakeDoorModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  discount: string;
  featureId: string;
}

export function FakeDoorModal({
  isOpen,
  onClose,
  featureName,
  discount,
  featureId,
}: FakeDoorModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await registerFakeDoorInterest(featureId, email);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🚀 {featureName} 곧 출시!</DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-muted-foreground">
              <strong>{featureName}</strong>을 개발 중입니다.
              <br />
              사전 예약하시면 출시 시 <strong>{discount} 할인</strong>을 드립니다!
            </p>

            <Input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? '등록 중...' : '사전 예약하기'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              스팸 없음. 출시 알림만 보내드립니다.
            </p>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-lg">✅ 등록 완료!</p>
            <p className="text-muted-foreground mt-2">
              출시 시 {discount} 할인 쿠폰을 보내드리겠습니다.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

```typescript
// src/features/fake-door/lib/analytics.ts
export function trackFakeDoorClick(featureId: string) {
  // Google Analytics 이벤트
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "fake_door_click", {
      event_category: "interest",
      event_label: featureId,
    });
  }

  // Microsoft Clarity 태그
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("set", "fake_door", featureId);
  }
}

// src/features/fake-door/lib/api.ts
export async function registerFakeDoorInterest(
  featureId: string,
  email: string,
): Promise<void> {
  await fetch("/api/fake-door/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ featureId, email }),
  });
}
```

#### 적용 대상 기능

| 기능                | 버튼 위치         | 예상 CTR 기준   |
| ------------------- | ----------------- | --------------- |
| **팀 워크스페이스** | 대시보드 사이드바 | >5% → 개발 시작 |
| **API 접근**        | 가격 페이지       | >3% → 개발 시작 |
| **AI 분석**         | 도구 결과 하단    | >2% → 개발 시작 |
| **Enterprise 플랜** | 가격 페이지       | >1% → 영업 시작 |

```typescript
// 대시보드 사이드바에 적용 예시
// src/widgets/sidebar/ui/sidebar.tsx

import { FakeDoorButton } from '@/features/fake-door';

// ... 기존 코드

<nav className="space-y-2">
  {/* 기존 메뉴 항목들 */}
  <Link href="/dashboard">대시보드</Link>
  <Link href="/dashboard/billing">결제 관리</Link>

  {/* Fake Door: 팀 관리 */}
  <FakeDoorButton
    featureId="team-workspace"
    featureName="팀 워크스페이스"
    discount="50%"
  >
    <Users className="h-4 w-4 mr-2" />
    팀 관리
    <Badge variant="secondary" className="ml-auto">Coming Soon</Badge>
  </FakeDoorButton>
</nav>
```

#### 수요 분석 대시보드

```sql
-- Supabase: Fake Door 관심도 분석 쿼리

-- 기능별 클릭률 (CTR)
SELECT
  feature_id,
  COUNT(DISTINCT session_id) as clicks,
  COUNT(DISTINCT email) as registrations,
  ROUND(COUNT(DISTINCT email)::numeric / NULLIF(COUNT(DISTINCT session_id), 0) * 100, 2) as conversion_rate
FROM fake_door_events
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY feature_id
ORDER BY clicks DESC;

-- 결과 예시:
-- feature_id        | clicks | registrations | conversion_rate
-- team-workspace    | 450    | 67            | 14.89%
-- api-access        | 320    | 28            | 8.75%
-- ai-analysis       | 280    | 15            | 5.36%
-- enterprise        | 120    | 8             | 6.67%
```

**의사결정 프레임워크**:

```
┌─────────────────────────────────────────────────────────────┐
│  Fake Door 결과 → 의사결정                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CTR > 5% + 등록 > 50명                                      │
│  → ✅ 즉시 개발 시작 (검증된 수요)                             │
│                                                             │
│  CTR 2-5% + 등록 20-50명                                     │
│  → 🔄 사용자 인터뷰 후 결정                                    │
│                                                             │
│  CTR < 2% 또는 등록 < 20명                                    │
│  → ❌ 개발 보류 (수요 불충분)                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Vertical SaaS 스핀오프 준비

#### Month 9-10: Vertical 분석

수집된 리드 데이터를 분석하여 가장 유망한 Vertical 식별

**분석 지표**:

| 지표             | 측정 방법                 |
| ---------------- | ------------------------- |
| **도구 사용량**  | usage_records 테이블 분석 |
| **Persona 분포** | leads.persona_tag 분석    |
| **Pro 전환율**   | persona별 전환율 비교     |
| **재방문율**     | 사용자별 세션 분석        |

**시나리오 예시**:

```
분석 결과:
─────────────
• 'PDF Toolkit + OCR' 조합 사용량 1위
• 'legal' persona의 Pro 전환율 8.5% (평균 2.5%의 3.4배)
• 재방문율: legal > marketing > ecommerce

→ 결론: "법률 계약서 관리" Vertical로 확장
```

#### 확장 기능 설계

**기존 도구**:

- PDF 병합/분할
- OCR 텍스트 추출
- PDF 서명

**Vertical 확장** (법률 계약서 관리):

| 기능           | 구현                              |
| -------------- | --------------------------------- |
| 프로젝트 관리  | 계약서 폴더 구조, 메타데이터      |
| 중요 조항 추출 | 로컬 LLM으로 핵심 조항 하이라이트 |
| 만료일 알림    | 브라우저 알림 + 이메일            |
| 엑셀 리포트    | 계약서 현황 대시보드              |
| 팀 협업        | 권한 관리, 코멘트                 |

### 5.3 Month 11-12: 팀 기능 및 Enterprise

**작업 항목**:

| 순서 | 작업            | 파일                                        | 예상 시간 |
| ---- | --------------- | ------------------------------------------- | --------- |
| 1    | 팀 데이터 모델  | `supabase/migrations/teams.sql`             | 3시간     |
| 2    | 팀 생성/관리    | `src/features/teams/`                       | 6시간     |
| 3    | 멤버 초대       | `src/features/teams/ui/invite-member.tsx`   | 4시간     |
| 4    | RBAC 권한       | `src/features/teams/lib/permissions.ts`     | 5시간     |
| 5    | 팀 대시보드     | `src/app/[locale]/dashboard/team/page.tsx`  | 6시간     |
| 6    | 감사 로그       | `src/features/audit-log/`                   | 5시간     |
| 7    | 사용량 대시보드 | `src/app/[locale]/dashboard/usage/page.tsx` | 5시간     |

### 5.4 Phase 3 체크리스트

```
Month 7-8: 로컬 AI
├── [ ] OPFS 모델 캐싱 시스템
├── [ ] Whisper 음성 변환
├── [ ] AI Summarizer
├── [ ] 모델 버전 관리
├── [ ] 다운로드 진행률 UI
└── [ ] **Fake Door 테스트 시스템 구현** ← NEW

Month 9-10: Vertical 분석 및 설계
├── [ ] 리드 데이터 분석 대시보드
├── [ ] Persona별 전환율 분석
├── [ ] **Fake Door 결과 분석** ← NEW
├── [ ] Vertical 후보 선정
├── [ ] 확장 기능 설계
└── [ ] MVP 프로토타입

Month 11-12: 팀 기능 + Enterprise (Fake Door 검증 후)
├── [ ] **Fake Door CTR > 5% 확인** ← NEW
├── [ ] 팀 워크스페이스
├── [ ] 멤버 초대 시스템
├── [ ] RBAC 권한 관리
├── [ ] 감사 로그
├── [ ] 사용량 대시보드
└── [ ] Enterprise 영업 자료
```

---

## 6. 기술 의존성 맵 (Updated)

### 6.1 새로운 의존성

```json
{
  "dependencies": {
    // Phase 1: 인증 & 결제
    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",
    "@lemonsqueezy/lemonsqueezy.js": "^3.x",

    // Phase 2: 도구 확장
    "pdf-lib": "^1.17.x",
    "@pdf-lib/fontkit": "^1.x",
    "pdfjs-dist": "^4.x", // PDF 렌더링 (래스터화 마스킹용)
    "tesseract.js": "^5.x",
    "onnxruntime-web": "^1.x",
    "satori": "^0.10.x",
    "@resvg/resvg-wasm": "^2.x",
    "jszip": "^3.x",
    "file-saver": "^2.x",

    // Phase 3: AI 통합
    "@huggingface/transformers": "^3.x"
  }
}
```

### 6.2 브라우저 API 의존성

| API                | 용도                | 지원 브라우저           | 폴백             |
| ------------------ | ------------------- | ----------------------- | ---------------- |
| File System Access | 폴더 선택, 스트리밍 | Chrome, Edge            | input[type=file] |
| OPFS               | 모델 캐싱           | Chrome, Safari, Firefox | IndexedDB        |
| WebGPU             | AI 가속             | Chrome, Edge            | WASM             |
| SharedArrayBuffer  | FFmpeg 멀티스레딩   | All (COOP/COEP)         | 싱글스레드       |

---

## 7. 리스크 관리 (Updated)

### 7.1 브라우저 호환성 리스크

| 기능               | Chrome | Firefox | Safari | Edge | 폴백 전략        |
| ------------------ | ------ | ------- | ------ | ---- | ---------------- |
| File System Access | ✅     | ❌      | ❌     | ✅   | input + download |
| OPFS               | ✅     | ✅      | ✅     | ✅   | IndexedDB        |
| WebGPU             | ✅     | 🔜      | 🔜     | ✅   | WASM SIMD        |
| SharedArrayBuffer  | ✅     | ✅      | ✅     | ✅   | 싱글스레드       |

**대응 전략**:

1. 기능 감지 후 최적 경로 선택
2. 폴백 시 사용자에게 성능 차이 안내
3. Chrome/Edge 사용 권장 배너 (고급 기능)

### 7.2 수익화 리스크

| 리스크            | 영향도 | 확률 | 대응 전략                      |
| ----------------- | ------ | ---- | ------------------------------ |
| 낮은 Pro 전환율   | 높음   | 중   | Lead Magnet 최적화, A/B 테스트 |
| AdSense 승인 거부 | 중간   | 낮   | 현재 승인됨, 규정 준수 유지    |
| 경쟁사 무료화     | 중간   | 중   | 오프라인/Bulk 차별화 강화      |
| 결제 이탈         | 높음   | 중   | 연간 결제 할인, 리텐션 이메일  |

### 7.3 기술 리스크

| 리스크         | 영향도 | 확률 | 대응 전략                  |
| -------------- | ------ | ---- | -------------------------- |
| 모델 로딩 지연 | 중     | 높   | OPFS 캐싱, 진행률 UI       |
| 메모리 부족    | 높     | 중   | File System API, 청크 처리 |
| WebGPU 미지원  | 중     | 중   | WASM 폴백, 성능 안내       |
| OPFS 용량 초과 | 낮     | 낮   | 용량 모니터링, 자동 정리   |

---

## 8. 성공 지표 (KPI) 수정 제안

### 8.1 핵심 지표 재정의

단순 **트래픽**보다는 **리드 품질**과 **Pro 전환**에 집중

| 지표                  | 정의                       | Phase 1 목표 | Phase 2 목표 | Phase 3 목표 |
| --------------------- | -------------------------- | ------------ | ------------ | ------------ |
| **Leads 수집**        | 이메일 수집 수             | 1,000        | 5,000        | 20,000       |
| **Lead → Pro 전환율** | 리드 중 Pro 가입           | 2%           | 4%           | 6%           |
| **MRR**               | 월간 반복 수익             | $500         | $2,500       | $15,000      |
| **Pro 기능 사용률**   | Pro 사용자의 Bulk/API 사용 | 30%          | 50%          | 70%          |
| **오프라인 세션**     | 오프라인 사용 세션         | 100          | 500          | 2,000        |
| **Vertical 적합도**   | 특정 persona 집중도        | 측정         | 1개 선정     | MVP 출시     |

### 8.2 Funnel 분석

```
방문자 (100%)
    │
    ▼
도구 사용 (60%)
    │
    ▼
결과물 생성 (40%)
    │
    ├──── Lead Magnet 클릭 (15%) ──── 이메일 제출 (10%)
    │                                       │
    │                                       ▼
    │                               Lead 육성 (이메일)
    │                                       │
    └──── 직접 업그레이드 (2%) ◄──────────────┘
                    │
                    ▼
              Pro 사용자 (2-4%)
                    │
                    ▼
              Enterprise (0.1%)
```

### 8.3 월간 리포트 템플릿

```
┌─────────────────────────────────────────────────────────────┐
│  Web Toolkit Monthly Report - 2025.XX                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Revenue                                                    │
│  ───────                                                    │
│  MRR: $2,450 (+$340)                                        │
│  Pro Users: 272 (+18)                                       │
│  Churn: 3 users (1.1%)                                      │
│                                                             │
│  Lead Generation                                            │
│  ───────────────                                            │
│  New Leads: 450                                             │
│  Top Source: PDF Toolkit (180)                              │
│  Lead → Pro: 4.2%                                           │
│                                                             │
│  Persona Distribution                                       │
│  ─────────────────────                                      │
│  Legal: 35% ████████████░░░░░░░░                           │
│  Marketing: 28% ██████████░░░░░░░░░                        │
│  Ecommerce: 22% ████████░░░░░░░░░░░                        │
│  Other: 15% █████░░░░░░░░░░░░░░░░                          │
│                                                             │
│  Feature Usage (Pro)                                        │
│  ──────────────────                                         │
│  Bulk Processing: 68%                                       │
│  Offline Mode: 45%                                          │
│  API Access: 23%                                            │
│                                                             │
│  Action Items                                               │
│  ────────────                                               │
│  • Legal persona 전환율 높음 → 계약서 관리 Vertical 검토    │
│  • Offline 사용률 낮음 → 마케팅 메시지 강화                  │
│  • API 사용률 낮음 → 온보딩 가이드 개선                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 부록

### A. 환경 변수 목록 (Updated)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Lemon Squeezy
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=
NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL=

# Analytics
NEXT_PUBLIC_GA_ID=G-BHCZK28NQQ
NEXT_PUBLIC_CLARITY_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_BULK=true
NEXT_PUBLIC_ENABLE_AI_TOOLS=false
NEXT_PUBLIC_ENABLE_TEAMS=false
NEXT_PUBLIC_ENABLE_LEAD_CAPTURE=true
```

### B. Lead Magnet 제작 체크리스트

각 도구별 Lead Magnet 제작 시:

```
[ ] 타겟 Persona 정의
[ ] 문제점(Pain Point) 식별
[ ] 해결책 제시 (10페이지 이내)
[ ] 디자인 (Canva 또는 Figma)
[ ] PDF 또는 스프레드시트 형식
[ ] 도구 사용 CTA 포함
[ ] A/B 테스트용 변형 2개
[ ] 이메일 시퀀스 연동
```

### C. 참고 자료

- [File System Access API](https://developer.chrome.com/articles/file-system-access/)
- [OPFS 문서](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)
- [Transformers.js](https://huggingface.co/docs/transformers.js)
- [Lemon Squeezy 문서](https://docs.lemonsqueezy.com/)
- [Engineering as Marketing](https://www.saastr.com/engineering-as-marketing/)

---

**문서 버전**: 1.2.0 (Bulletproof)
**최종 수정일**: 2025-12-20
**작성자**: Claude Code

---

## 변경 로그

### v1.3.2 (2025-12-20) - Final Green Light ✅

- **📱 Safari PWA**: 홈 화면 추가 안내 프롬프트 추가
  - `AddToHomePrompt` 컴포넌트 - iOS Safari 전용 안내 UI
  - persist() 실패 시 PWA 설치 권유로 데이터 영구 보존
  - AI 도구 페이지에 조건부 렌더링
- **🖥️ 크로스 플랫폼**: postinstall 스크립트 Windows 호환성
  - `shx` 라이브러리로 `cp` 명령어 대체 권장
  - Node.js 스크립트 대안 (`scripts/copy-pdf-worker.mjs`)
- **⚡ PDF 성능 최적화**: 래스터화 동적 Scale 계산
  - `calculateOptimalScale()` 함수 - 페이지 수 기반 자동 조절
  - `estimateMemoryUsage()` 함수 - 예상 메모리 사용량 표시
  - `QualitySelector` UI 컴포넌트 - 고화질/균형/빠름 선택
  - 대용량 문서(30+ 페이지) 경고 메시지
- **상태**: 🟢 **최종 개발 승인 (Green Light)**

### v1.3.1 (2025-12-20) - Production Ready

- **🔧 빌드 수정**: Next.js Webpack canvas alias 설정 강화
  - `config.resolve.alias.canvas = false` 필수 설정 명시
  - "Module not found: Can't resolve 'canvas'" 에러 해결 가이드 추가
- **🎯 로직 수정**: PDF 좌표계 변환 문서화
  - PDF 좌표계(좌하단 원점) vs Canvas 좌표계(좌상단 원점) 설명 추가
  - Y축 반전 공식: `canvas_y = page_height - pdf_y - rect_height`
  - pdf.js / Tesseract.js / pdf-lib 별 좌표 처리 가이드
- **🛡️ 저장소 수정**: Safari Persistence 요청 로직 추가
  - `navigator.storage.persist()` 호출로 7일 데이터 삭제 방지
  - `requestPersistence()` 유틸리티 함수 및 상태 확인 함수
  - 저장소 경고 배너 컴포넌트 (`StorageWarningBanner`)
  - OPFS 초기화 시 자동 Persistence 요청

### v1.3.0 (2025-12-20) - Final Approved (Ready for Dev)

- **🔧 호환성**: PDF.js + Next.js 통합 가이드 추가
  - Worker 파일 정적 배치 방법 (public/ 또는 CDN)
  - next.config.ts Webpack 설정 (canvas alias, externals)
  - Dynamic import wrapper 패턴 (Client-only 로드)
  - 개발/프로덕션 환경별 Worker 경로 분기
- **📊 UX**: WebGPU 모델 OPFS 캐싱 상태 관리 추가
  - `useModelStatus` 훅 (checking → downloading → ready → error)
  - `ModelReadyBadge` 컴포넌트 (프로그레스 바, Ready ⚡️ 배지)
  - 다운로드 진행률 + 예상 크기 표시
  - 캐시된 시간 메타데이터 저장
- **상태**: 개발 승인 완료 (바로 구현 가능)

### v1.2.1 (2025-12-20) - Security Hardened

- **🚨 보안 수정**: PDF 마스킹 래스터화(Rasterization) 기법 적용
  - 기존 drawRectangle 방식은 텍스트 데이터가 PDF 내부에 잔존 (Ctrl+A로 추출 가능)
  - pdf.js로 페이지를 Canvas에 렌더링 → 마스킹 → 이미지화 → 새 PDF 생성
  - 텍스트 레이어 완전 파괴로 진정한 마스킹 구현
- **문서화**: 래스터화 방식의 장단점 및 권장 사용 사례 추가

### v1.2.0 (2025-12-20) - Bulletproof Edition

- **추가**: 결제 모듈 추상화 (Adapter Pattern) - Lemon Squeezy/Stripe 전환 대비
- **추가**: Safari/Firefox Bulk Action 대응 (ZIP Fallback)
- **추가**: PDF 민감정보 마스킹 (Auto-Redaction) - 킬러 기능
- **추가**: Fake Door 테스트 전략 - 개발 전 수요 검증
- **경고**: Stripe의 Lemon Squeezy 인수 리스크 문서화

### v1.1.0 (2025-12-20)

- **추가**: Engineering as Marketing 전략 (리드 수집)
- **추가**: File System Access API 통합 (대용량 처리)
- **추가**: OPFS 모델 캐싱 전략
- **수정**: Stripe → Lemon Squeezy 전환 검토
- **수정**: 오프라인/온라인 수익화 경계 명확화
- **수정**: KPI를 리드/전환 중심으로 재정의
