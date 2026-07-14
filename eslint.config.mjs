import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 프로덕션 코드 품질 규칙
  {
    rules: {
      // console.log 금지 (console.warn, console.error 허용)
      "no-console": ["error", { allow: ["warn", "error"] }],
      // any 타입 사용 금지 (unknown 사용 권장)
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  // scripts/ 폴더는 CLI 출력을 위해 console.log 허용
  {
    files: ["scripts/**/*.ts", "scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
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
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              from: { element: { types: "app" } },
              allow: {
                to: {
                  element: {
                    types: {
                      anyOf: [
                        "app",
                        "widgets",
                        "features",
                        "entities",
                        "shared",
                      ],
                    },
                  },
                },
              },
            },
            {
              from: { element: { types: "widgets" } },
              allow: {
                to: {
                  element: {
                    types: {
                      anyOf: ["widgets", "features", "entities", "shared"],
                    },
                  },
                },
              },
            },
            {
              from: { element: { types: "features" } },
              allow: {
                to: {
                  element: {
                    types: {
                      anyOf: ["features", "entities", "shared", "widgets"],
                    },
                  },
                },
              },
            },
            {
              from: { element: { types: "entities" } },
              allow: {
                to: { element: { types: { anyOf: ["entities", "shared"] } } },
              },
            },
            {
              from: { element: { types: "shared" } },
              allow: { to: { element: { types: "shared" } } },
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
    "vscode-extension/**",
    // Coverage
    "coverage/**",
    // Legacy generated PWA files may remain in local checkouts.
    "public/sw.js",
    "public/workbox-*.js",
  ]),
]);

export default eslintConfig;
