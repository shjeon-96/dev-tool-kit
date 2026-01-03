# Web Toolkit - Project Overview

## Purpose

개발자를 위한 웹 기반 올인원 도구 모음 (100% 클라이언트 사이드 처리)

## Key Information

| 항목           | 값                      |
| -------------- | ----------------------- |
| **URL**        | https://web-toolkit.app |
| **Tools**      | 45+                     |
| **pSEO Pages** | 500+                    |
| **Languages**  | en, ko, ja, es, pt, de  |
| **License**    | MIT                     |

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: React hooks + custom hooks
- **Compiler**: React Compiler (babel-plugin-react-compiler)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Auth**: Supabase
- **Payments**: LemonSqueezy
- **i18n**: next-intl

## Architecture

Feature-Sliced Design (FSD)

```
의존성 흐름: app → widgets → features → entities → shared
```

## Project Structure

```
src/
├── app/[locale]/    # Next.js App Router (i18n routing)
├── features/        # 도구 + 기능 모듈 (50+)
├── entities/        # 비즈니스 엔티티 + pSEO 레지스트리
├── widgets/         # 복합 UI 위젯
├── shared/          # 공통 컴포넌트, hooks, utils
├── i18n/            # 다국어 설정
└── remotion/        # 동영상 생성
```

## Key Files

| File                                       | Purpose                      |
| ------------------------------------------ | ---------------------------- |
| `src/entities/tool/model/registry.ts`      | 도구 메타데이터 레지스트리   |
| `src/entities/tool/model/component-map.ts` | 도구 컴포넌트 Dynamic Import |
| `src/shared/types/tool.ts`                 | ToolSlug, ToolCategory 타입  |
| `src/i18n/routing.ts`                      | 지원 언어 목록 (6개)         |
| `messages/*.json`                          | i18n 번역 파일               |
