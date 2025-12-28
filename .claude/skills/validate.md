# Validate Tool Skill

도구 레지스트리와 프로젝트 일관성을 검증하는 워크플로우입니다.

## Trigger

- "검증해줘", "validate"
- "도구 체크해줘", "check tools"
- 새 도구 추가 후 확인 요청

## Validation Commands

### Tool Registry Validation

```bash
npm run validate:tools
```

이 명령어는 다음을 검증합니다:

- ToolSlug 타입과 registry.ts 일치
- component-map.ts에 모든 도구 등록
- 필수 필드 존재 (title, description, icon, category)

### Type Check

```bash
npx tsc --noEmit
```

### Build Validation

```bash
npm run build
```

빌드 시 검증되는 항목:

- 모든 import 경로 유효성
- 정적 페이지 생성 (pSEO)
- 번역 키 존재 여부

### Lint Check

```bash
npm run lint
```

## Manual Validation Checklist

### New Tool Checklist

```markdown
- [ ] `src/shared/types/tool.ts` - ToolSlug 추가
- [ ] `src/entities/tool/model/registry.ts` - 메타데이터 등록
- [ ] `src/features/[slug]/index.ts` - 배럴 export 존재
- [ ] `src/entities/tool/model/component-map.ts` - Dynamic import 등록
- [ ] `messages/en.json` - tools.[slug] 번역
- [ ] `messages/ko.json` - tools.[slug] 번역
- [ ] `messages/ja.json` - tools.[slug] 번역
- [ ] `messages/es.json` - tools.[slug] 번역
- [ ] `messages/pt.json` - tools.[slug] 번역
- [ ] `messages/de.json` - tools.[slug] 번역
- [ ] `messages/*/seo.[slug]` - SEO 번역 (6개 언어)
- [ ] `src/entities/tool/model/seo-content.ts` - SEO 콘텐츠
```

### pSEO Page Checklist

```markdown
- [ ] Entity 타입 정의
- [ ] Registry 데이터 추가
- [ ] generateStaticParams()에서 routing.locales 사용
- [ ] alternates.languages에 6개 언어 포함
- [ ] Locale fallback 처리 (es, pt, de → en)
- [ ] sitemap.ts 업데이트
- [ ] 번역 추가 (6개 언어)
```

## Validation Scripts

### Check Registry Consistency

```typescript
// scripts/validate-registry.ts
import { tools } from "../src/entities/tool/model/registry";
import { toolImportConfigs } from "../src/entities/tool/model/component-map";

const registrySlugs = Object.keys(tools);
const componentMapSlugs = Object.keys(toolImportConfigs);

// registry에는 있지만 component-map에 없는 것
const missingInComponentMap = registrySlugs.filter(
  (slug) => !componentMapSlugs.includes(slug),
);

if (missingInComponentMap.length > 0) {
  console.error("Missing in component-map:", missingInComponentMap);
  process.exit(1);
}

console.log("✅ All tools validated");
```

### Check Translations

```typescript
// scripts/validate-translations.ts
import fs from "fs";

const languages = ["en", "ko", "ja", "es", "pt", "de"];
const requiredKeys = ["site.title", "site.description"];

languages.forEach((lang) => {
  const content = JSON.parse(fs.readFileSync(`messages/${lang}.json`, "utf-8"));

  requiredKeys.forEach((key) => {
    const value = key.split(".").reduce((obj, k) => obj?.[k], content);
    if (!value) {
      console.error(`Missing ${key} in ${lang}.json`);
    }
  });
});
```

## Common Validation Issues

### 1. ToolSlug Type Mismatch

```
Error: Type '"new-tool"' is not assignable to type 'ToolSlug'
```

**Solution:** `src/shared/types/tool.ts`에 slug 추가

### 2. Missing Export

```
Error: Module '"@/features/new-tool"' has no exported member 'NewTool'
```

**Solution:** `src/features/new-tool/index.ts`에 export 추가

### 3. Dynamic Import Failure

```
Error: Cannot find module '@/features/new-tool'
```

**Solution:** 디렉토리 이름과 import 경로 일치 확인

### 4. Translation Key Missing

페이지에 `tools.new-tool.title` 같은 키가 그대로 표시됨
**Solution:** 6개 언어 파일 모두에 번역 추가

### 5. Build-time Static Generation Error

```
Error: Dynamic server usage: headers
```

**Solution:** 클라이언트 전용 코드는 "use client" 디렉티브 추가

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

echo "🔧 Validating tools..."
npm run validate:tools

echo "🏗️ Building..."
npm run build

echo "✅ All validations passed!"
```

## Pre-commit Hook

`.husky/pre-commit`에 추가하면 커밋 전 자동 검증:

```bash
#!/bin/sh
npm run validate:tools
npx tsc --noEmit
npm run lint
```

## Quick Health Check

```bash
# 빠른 상태 확인
npm run validate:tools && npx tsc --noEmit && npm run lint
```
