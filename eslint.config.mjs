import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Console 사용 경고 (프로덕션 코드 품질)
  {
    rules: {
      "no-console": ["warn", { allow: ["error"] }],
    },
  },
  // Helper to force FSD boundaries
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app/**/*",
        },
        {
          type: "widgets",
          pattern: "src/widgets/**/*",
        },
        {
          type: "features",
          pattern: "src/features/**/*",
        },
        {
          type: "entities",
          pattern: "src/entities/**/*",
        },
        {
          type: "shared",
          pattern: "src/shared/**/*",
        },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["app", "widgets", "features", "entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "features",
              // widgets 허용: tool-actions 같은 cross-cutting concern이 widgets에 위치
              allow: ["features", "entities", "shared", "widgets"],
            },
            {
              from: "entities",
              allow: ["entities", "shared"],
            },
            {
              from: "shared",
              allow: ["shared"],
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Extension has its own build process
    "extension/**",
  ]),
]);

export default eslintConfig;
