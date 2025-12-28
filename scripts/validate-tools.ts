#!/usr/bin/env npx tsx
/**
 * Tool Validation Script
 *
 * 도구 설정 누락을 빌드 시점에 검증합니다.
 *
 * 검증 항목:
 * 1. types.ts에 정의된 모든 슬러그가 registry.ts에 등록되어 있는지
 * 2. 모든 슬러그가 component-map.ts에 매핑되어 있는지
 * 3. 모든 슬러그가 messages/*.json에 번역이 있는지
 * 4. 모든 슬러그가 seo-content.ts에 SEO 콘텐츠가 있는지
 *
 * 사용법:
 *   npm run validate:tools
 *   npx tsx scripts/validate-tools.ts
 */

import fs from "fs";
import path from "path";

const ROOT_DIR = path.resolve(__dirname, "..");
const MESSAGES_DIR = path.join(ROOT_DIR, "messages");
const REQUIRED_LOCALES = ["en", "ko", "ja"];

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

interface ToolValidation {
  slug: string;
  hasRegistry: boolean;
  hasComponent: boolean;
  hasTranslation: Record<string, boolean>;
  hasSeoContent: boolean;
}

/**
 * 파일에서 ToolSlug 타입 정의 추출
 */
function extractToolSlugs(typesFilePath: string): string[] {
  const content = fs.readFileSync(typesFilePath, "utf-8");

  // ToolSlug 타입 정의 찾기 (여러 줄에 걸쳐 있을 수 있음, 세미콜론 선택적)
  const typeMatch = content.match(
    /export\s+type\s+ToolSlug\s*=\s*([\s\S]+?)(?:;|\nexport|\n\n|$)/s,
  );

  if (!typeMatch) {
    throw new Error("ToolSlug 타입 정의를 찾을 수 없습니다.");
  }

  // 문자열 리터럴 추출
  const slugMatches = typeMatch[1].matchAll(/"([^"]+)"/g);
  return Array.from(slugMatches, (m) => m[1]);
}

/**
 * registry.ts에서 등록된 도구 슬러그 추출
 */
function extractRegisteredSlugs(registryFilePath: string): string[] {
  const content = fs.readFileSync(registryFilePath, "utf-8");

  // tools 객체의 키 추출
  const slugMatches = content.matchAll(/"([^"]+)":\s*\{/g);
  return Array.from(slugMatches, (m) => m[1]).filter(
    (slug) => !slug.includes(":"),
  ); // 카테고리 키 제외
}

/**
 * component-map.ts에서 등록된 도구 슬러그 추출
 */
function extractComponentMapSlugs(componentMapFilePath: string): string[] {
  const content = fs.readFileSync(componentMapFilePath, "utf-8");

  // toolImportConfigs 객체의 키 추출
  const slugMatches = content.matchAll(/"([^"]+)":\s*\{\s*import:/g);
  return Array.from(slugMatches, (m) => m[1]);
}

/**
 * seo-content.ts에서 등록된 도구 슬러그 추출
 */
function extractSeoContentSlugs(seoContentFilePath: string): string[] {
  const content = fs.readFileSync(seoContentFilePath, "utf-8");

  // toolSeoContent 객체의 키 추출 (whatIs 필드로 식별)
  const slugMatches = content.matchAll(/"([^"]+)":\s*\{[\s\S]*?whatIs:/g);
  return Array.from(slugMatches, (m) => m[1]);
}

/**
 * messages/*.json에서 도구 번역 확인
 */
function checkTranslations(
  slug: string,
  locale: string,
): { hasTitle: boolean; hasDescription: boolean } {
  const messagesPath = path.join(MESSAGES_DIR, `${locale}.json`);

  if (!fs.existsSync(messagesPath)) {
    return { hasTitle: false, hasDescription: false };
  }

  const content = JSON.parse(fs.readFileSync(messagesPath, "utf-8"));
  const tools = content.tools || {};
  const toolEntry = tools[slug] || {};

  return {
    hasTitle: !!toolEntry.title,
    hasDescription: !!toolEntry.description,
  };
}

/**
 * 도구 검증 실행
 */
function validateTools(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 파일 경로
  const typesPath = path.join(ROOT_DIR, "src/shared/types/tool.ts");
  const registryPath = path.join(
    ROOT_DIR,
    "src/entities/tool/model/registry.ts",
  );
  const componentMapPath = path.join(
    ROOT_DIR,
    "src/entities/tool/model/component-map.ts",
  );
  const seoContentPath = path.join(
    ROOT_DIR,
    "src/entities/tool/model/seo-content.ts",
  );

  // 슬러그 추출
  const typeSlugs = extractToolSlugs(typesPath);
  const registrySlugs = new Set(extractRegisteredSlugs(registryPath));
  const componentMapSlugs = new Set(extractComponentMapSlugs(componentMapPath));
  const seoContentSlugs = new Set(extractSeoContentSlugs(seoContentPath));

  console.log(`\n📊 도구 검증 시작...`);
  console.log(`   - 타입 정의: ${typeSlugs.length}개`);
  console.log(`   - 레지스트리: ${registrySlugs.size}개`);
  console.log(`   - 컴포넌트 맵: ${componentMapSlugs.size}개`);
  console.log(`   - SEO 콘텐츠: ${seoContentSlugs.size}개\n`);

  const validations: ToolValidation[] = [];

  for (const slug of typeSlugs) {
    const hasRegistry = registrySlugs.has(slug);
    const hasComponent = componentMapSlugs.has(slug);
    const hasSeoContent = seoContentSlugs.has(slug);

    const hasTranslation: Record<string, boolean> = {};
    for (const locale of REQUIRED_LOCALES) {
      const { hasTitle, hasDescription } = checkTranslations(slug, locale);
      hasTranslation[locale] = hasTitle && hasDescription;
    }

    validations.push({
      slug,
      hasRegistry,
      hasComponent,
      hasTranslation,
      hasSeoContent,
    });

    // 에러 수집
    if (!hasRegistry) {
      errors.push(`❌ [${slug}] registry.ts에 등록되지 않음`);
    }
    if (!hasComponent) {
      errors.push(`❌ [${slug}] component-map.ts에 매핑되지 않음`);
    }
    if (!hasSeoContent) {
      warnings.push(`⚠️  [${slug}] seo-content.ts에 SEO 콘텐츠 없음`);
    }

    for (const locale of REQUIRED_LOCALES) {
      if (!hasTranslation[locale]) {
        errors.push(`❌ [${slug}] messages/${locale}.json에 번역 누락`);
      }
    }
  }

  // 역방향 검증: 컴포넌트 맵에 있지만 타입에 없는 경우
  for (const slug of componentMapSlugs) {
    if (!typeSlugs.includes(slug)) {
      warnings.push(
        `⚠️  [${slug}] component-map.ts에 있지만 types.ts에 정의되지 않음`,
      );
    }
  }

  // 역방향 검증: 레지스트리에 있지만 타입에 없는 경우
  for (const slug of registrySlugs) {
    if (!typeSlugs.includes(slug)) {
      warnings.push(
        `⚠️  [${slug}] registry.ts에 있지만 types.ts에 정의되지 않음`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * 메인 실행
 */
function main() {
  console.log("🔍 Web Toolkit 도구 검증 스크립트");
  console.log("=".repeat(50));

  try {
    const result = validateTools();

    if (result.warnings.length > 0) {
      console.log("\n⚠️  경고:");
      result.warnings.forEach((w) => console.log(`   ${w}`));
    }

    if (result.errors.length > 0) {
      console.log("\n❌ 오류:");
      result.errors.forEach((e) => console.log(`   ${e}`));
    }

    if (result.valid) {
      console.log("\n✅ 모든 도구 검증 통과!");
      process.exit(0);
    } else {
      console.log(`\n❌ 검증 실패: ${result.errors.length}개 오류 발견`);
      console.log("\n💡 새 도구 추가 체크리스트:");
      console.log(
        "   1. src/entities/tool/model/types.ts - ToolSlug 타입에 추가",
      );
      console.log(
        "   2. src/entities/tool/model/registry.ts - tools 객체에 추가",
      );
      console.log(
        "   3. src/entities/tool/model/component-map.ts - 컴포넌트 맵에 추가",
      );
      console.log(
        "   4. src/entities/tool/model/seo-content.ts - SEO 콘텐츠 추가",
      );
      console.log("   5. messages/*.json - 번역 추가 (en, ko, ja)");
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ 스크립트 실행 오류:", error);
    process.exit(1);
  }
}

main();
