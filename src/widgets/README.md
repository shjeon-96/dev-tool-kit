# widgets/

<!-- AUTO-GENERATED-START -->

## Overview

여러 feature와 entity를 조합한 독립적인 UI 블록. 레이아웃 구성 요소로 사용됩니다.

## Widgets

| Widget       | Purpose                        |
| ------------ | ------------------------------ |
| `header/`    | 사이트 헤더 (네비게이션, 로고) |
| `footer/`    | 사이트 푸터 (링크, 저작권)     |
| `sidebar/`   | 사이드바 (카테고리, 관련 기사) |
| `user-menu/` | 사용자 메뉴 (프로필, 로그아웃) |
| `ad-unit/`   | AdSense 광고 유닛              |

## Structure Convention

```
widgets/[widget-name]/
├── ui/
│   └── *.tsx        # UI 컴포넌트
└── index.ts         # 배럴 export
```

## header/

사이트 헤더 컴포넌트

**구성:**

- 로고
- 메인 네비게이션
- 언어 전환
- 사용자 메뉴

## footer/

사이트 푸터 컴포넌트

**구성:**

- 사이트 링크
- 소셜 미디어 링크
- 저작권 정보

## sidebar/

콘텐츠 페이지 사이드바

**구성:**

- 카테고리 목록
- 인기 기사
- 관련 기사

## ad-unit/

Google AdSense 광고 컴포넌트

**사용:**

```typescript
import { AdUnit } from "@/widgets/ad-unit";
import { AD_SLOTS } from "@/shared/config/ad-slots";

<AdUnit slot={AD_SLOTS.ARTICLE_MIDDLE} format="rectangle" />
```

<!-- AUTO-GENERATED-END -->
