# PixelLogic Website Development Guide

## Product rules

1. 이 저장소는 픽셀로직 공식 홈페이지의 단일 소유 저장소다.
2. 홈페이지는 픽셀로직 브랜드, 실제 제품, Google 사용자 데이터 이용 목적과 정책 문서를 로그인 없이 공개한다.
3. OAuth 앱 이름 `픽셀로직`, 홈페이지 브랜드, 동의 화면 로고와 정책 URL은 서로 일치해야 한다.
4. 제품 정보는 `src/shared/content/site-content.ts`, 정책 문구는 `src/shared/i18n/legal.ts`, 시각 결정은 `docs/design/DESIGN_SET.md`가 각각 소유한다.
5. 준비되지 않은 제품 링크, 가짜 성과 수치, 고객사 로고, 로그인 전용 홈페이지, 게임 폴백을 만들지 않는다.
6. 라이트·다크, 모바일·데스크톱과 `prefers-reduced-motion`을 함께 유지한다.
7. 한국어와 영어는 같은 정보 구조와 정책 범위를 제공한다.

## Required checks

```bash
npm run lint
npm run build
npm run test:e2e
```

UI 변경은 기본 글자 크기의 라이트·다크와 모바일·데스크톱 캡처를 최소 두 라운드 확인한다. 전역 지침에 따라 최대 글자·시스템 폰트 최대 배율 테스트는 실행하거나 추가하지 않는다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
