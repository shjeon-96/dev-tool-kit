# src/

<!-- AUTO-GENERATED-START -->

## Overview

Web Toolkit 프로젝트의 소스 코드 디렉토리. Feature-Sliced Design (FSD) 아키텍처를 따릅니다.

## Architecture

```
의존성 흐름: app → widgets → features → entities → shared
```

## Directory Structure

| Directory   | Purpose                                           |
| ----------- | ------------------------------------------------- |
| `app/`      | Next.js App Router - 페이지, API Routes           |
| `entities/` | 비즈니스 엔티티 (trend, author, subscription)     |
| `features/` | 기능 모듈 (auth, billing)                         |
| `widgets/`  | 조합된 UI 위젯 (header, footer, sidebar, ad-unit) |
| `lib/`      | 자동화 라이브러리 (트렌드 감지, AI 콘텐츠 생성)   |
| `shared/`   | 공통 코드 (UI 컴포넌트, hooks, config)            |
| `i18n/`     | 국제화 설정 (next-intl)                           |
| `types/`    | 전역 타입 정의                                    |

## Layer Rules

1. **app** - 페이지, 레이아웃, API 라우트만 포함
2. **widgets** - 여러 feature를 조합한 독립적인 UI 블록
3. **features** - 비즈니스 기능 단위 (model, ui, lib)
4. **entities** - 도메인 모델과 쿼리 함수
5. **shared** - 의존성 없는 공통 코드

## Key Conventions

- 파일명: kebab-case (예: `trend-detector.ts`)
- 컴포넌트명: PascalCase (예: `ArticleCard.tsx`)
- 각 레이어는 `index.ts`로 배럴 export

<!-- AUTO-GENERATED-END -->
