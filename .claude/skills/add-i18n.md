# Add i18n Translation Skill

번역을 추가하거나 관리하는 워크플로우입니다.

## Trigger

- "번역 추가해줘", "add translation"
- "i18n 업데이트", "다국어 지원 추가"
- 특정 도구/페이지의 번역 요청

## Supported Languages

| Code | Language          | File               |
| ---- | ----------------- | ------------------ |
| `en` | English (default) | `messages/en.json` |
| `ko` | 한국어            | `messages/ko.json` |
| `ja` | 日本語            | `messages/ja.json` |
| `es` | Español           | `messages/es.json` |
| `pt` | Português         | `messages/pt.json` |
| `de` | Deutsch           | `messages/de.json` |

## Translation Structure

### Tool Translations

```json
{
  "tools": {
    "tool-slug": {
      "title": "Tool Title",
      "description": "Tool description",
      "inputPlaceholder": "Enter input...",
      "outputPlaceholder": "Output will appear here...",
      "action": "Process",
      "copySuccess": "Copied!",
      "error": "An error occurred"
    }
  }
}
```

### SEO Translations

```json
{
  "seo": {
    "tool-slug": {
      "title": "Tool Title - Web Toolkit",
      "description": "SEO-optimized description (150-160 chars)",
      "keywords": "keyword1, keyword2, keyword3"
    }
  }
}
```

### pSEO Type Translations

```json
{
  "hashTypes": {
    "md5": {
      "title": "MD5 Hash Generator",
      "description": "Generate MD5 hash values"
    }
  }
}
```

## Workflow

### Step 1: Identify Missing Translations

```bash
# 특정 키가 모든 언어에 있는지 확인
grep -l "tool-slug" messages/*.json
```

### Step 2: Add to All Language Files

반드시 6개 파일 모두에 추가:

```bash
# 파일 목록
messages/en.json  # 먼저 작성
messages/ko.json
messages/ja.json
messages/es.json
messages/pt.json
messages/de.json
```

### Step 3: Translation Guidelines

#### English (en.json) - Source Language

- Clear, concise, professional tone
- Use sentence case for titles
- Include keywords for SEO

#### Korean (ko.json)

- 존댓말 사용 (해요체)
- 기술 용어는 영어 그대로 유지 (JSON, API 등)
- 예: "JSON 데이터를 포맷팅합니다"

#### Japanese (ja.json)

- です/ます調 사용
- 기술 용어는 카타카나 또는 영어
- 예: "JSONデータをフォーマットします"

#### Spanish (es.json)

- Formal "usted" form
- 예: "Formatee sus datos JSON"

#### Portuguese (pt.json)

- Brazilian Portuguese preferred
- Formal tone
- 예: "Formate seus dados JSON"

#### German (de.json)

- Formal "Sie" form
- 예: "Formatieren Sie Ihre JSON-Daten"

## Usage in Code

### Client Components

```typescript
"use client";
import { useTranslations } from "next-intl";

export function Component() {
  const t = useTranslations("tools.json-formatter");
  return <h1>{t("title")}</h1>;
}
```

### Server Components

```typescript
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("tools.json-formatter");
  return <h1>{t("title")}</h1>;
}
```

### With Parameters

```typescript
// JSON: "greeting": "Hello, {name}!"
t("greeting", { name: "World" });
```

### Pluralization

```json
{
  "items": "{count, plural, =0 {No items} one {# item} other {# items}}"
}
```

```typescript
t("items", { count: 5 }); // "5 items"
```

## Batch Translation Template

새 도구 추가 시 필요한 모든 번역:

```json
{
  "tools": {
    "new-tool": {
      "title": "",
      "description": "",
      "inputPlaceholder": "",
      "outputPlaceholder": "",
      "action": "",
      "copySuccess": "",
      "clear": "",
      "error": ""
    }
  },
  "seo": {
    "new-tool": {
      "title": "",
      "description": "",
      "keywords": ""
    }
  }
}
```

## Validation

```bash
# 빌드로 누락된 키 확인
npm run build

# 개발 서버에서 직접 확인
npm run dev
# 각 언어로 페이지 접근: /en/..., /ko/..., /ja/...
```

## Common Pitfalls

1. **일부 언어만 추가** - 런타임에 키가 그대로 표시됨
2. **중첩 구조 불일치** - 파싱 에러
3. **JSON 문법 오류** - 쉼표 누락, 따옴표 오류
4. **SEO 키 누락** - 메타데이터에 키가 표시됨

## Quick Add Script

모든 언어 파일에 동일한 구조 추가할 때:

```bash
# jq 사용 (설치: brew install jq)
for lang in en ko ja es pt de; do
  jq '.tools["new-tool"] = {"title": "TODO", "description": "TODO"}' \
    messages/$lang.json > tmp.json && mv tmp.json messages/$lang.json
done
```
