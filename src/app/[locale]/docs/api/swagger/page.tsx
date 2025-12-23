"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { SITE_CONFIG } from "@/shared/config";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-muted-foreground">
        Loading API Documentation...
      </div>
    </div>
  ),
});

export default function SwaggerPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const titles: Record<string, string> = {
    en: "Interactive API Documentation",
    ko: "대화형 API 문서",
    ja: "インタラクティブAPIドキュメント",
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {titles[locale] || titles.en}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ko"
            ? "OpenAPI 3.0 스펙을 사용한 대화형 API 문서입니다. 요청을 직접 테스트해볼 수 있습니다."
            : locale === "ja"
              ? "OpenAPI 3.0仕様を使用したインタラクティブAPIドキュメント。リクエストを直接テストできます。"
              : "Interactive API documentation using OpenAPI 3.0 spec. You can test requests directly."}
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <a
            href={`/${locale}/docs/api`}
            className="text-primary hover:underline"
          >
            ←{" "}
            {locale === "ko"
              ? "API 문서로 돌아가기"
              : locale === "ja"
                ? "APIドキュメントに戻る"
                : "Back to API Docs"}
          </a>
          <a
            href="/openapi.yaml"
            download
            className="text-primary hover:underline"
          >
            {locale === "ko"
              ? "OpenAPI 스펙 다운로드"
              : locale === "ja"
                ? "OpenAPIスペックをダウンロード"
                : "Download OpenAPI Spec"}
          </a>
        </div>
      </div>

      <div className="swagger-wrapper rounded-lg border bg-white dark:bg-zinc-900 overflow-hidden">
        <SwaggerUI
          url={`${SITE_CONFIG.url}/openapi.yaml`}
          docExpansion="list"
          defaultModelsExpandDepth={-1}
          persistAuthorization={true}
        />
      </div>

      <style jsx global>{`
        .swagger-wrapper .swagger-ui {
          font-family: inherit;
        }
        .swagger-wrapper .swagger-ui .info {
          margin: 20px 0;
        }
        .swagger-wrapper .swagger-ui .info .title {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .swagger-wrapper .swagger-ui .scheme-container {
          background: transparent;
          padding: 16px 0;
        }
        .swagger-wrapper .swagger-ui .opblock-tag {
          border-bottom: 1px solid hsl(var(--border));
        }
        .swagger-wrapper .swagger-ui .opblock {
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .swagger-wrapper .swagger-ui .opblock .opblock-summary {
          border-radius: 8px;
        }
        .swagger-wrapper .swagger-ui .opblock.opblock-post {
          background: rgba(73, 204, 144, 0.1);
          border-color: rgb(73, 204, 144);
        }
        .swagger-wrapper
          .swagger-ui
          .opblock.opblock-post
          .opblock-summary-method {
          background: rgb(73, 204, 144);
        }
        .swagger-wrapper .swagger-ui .btn {
          border-radius: 6px;
        }
        .swagger-wrapper .swagger-ui .btn.execute {
          background-color: hsl(var(--primary));
          border-color: hsl(var(--primary));
        }
        .swagger-wrapper .swagger-ui .btn.execute:hover {
          background-color: hsl(var(--primary) / 0.9);
        }
        .swagger-wrapper .swagger-ui input[type="text"],
        .swagger-wrapper .swagger-ui textarea {
          border-radius: 6px;
        }
        .swagger-wrapper .swagger-ui .model-box {
          background: hsl(var(--muted) / 0.3);
          border-radius: 8px;
        }
        .swagger-wrapper .swagger-ui table tbody tr td {
          padding: 8px;
        }
        .dark .swagger-wrapper .swagger-ui,
        .dark .swagger-wrapper .swagger-ui .info .title,
        .dark .swagger-wrapper .swagger-ui .info .description,
        .dark .swagger-wrapper .swagger-ui .opblock-tag,
        .dark
          .swagger-wrapper
          .swagger-ui
          .opblock
          .opblock-summary-description,
        .dark .swagger-wrapper .swagger-ui .opblock-description-wrapper p,
        .dark .swagger-wrapper .swagger-ui table thead tr th,
        .dark .swagger-wrapper .swagger-ui table tbody tr td,
        .dark .swagger-wrapper .swagger-ui .parameter__name,
        .dark .swagger-wrapper .swagger-ui .parameter__type,
        .dark .swagger-wrapper .swagger-ui .response-col_status,
        .dark .swagger-wrapper .swagger-ui .response-col_description {
          color: hsl(var(--foreground));
        }
        .dark .swagger-wrapper .swagger-ui .opblock .opblock-section-header {
          background: hsl(var(--muted) / 0.5);
        }
        .dark .swagger-wrapper .swagger-ui input[type="text"],
        .dark .swagger-wrapper .swagger-ui textarea {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border-color: hsl(var(--border));
        }
        .dark .swagger-wrapper .swagger-ui select {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
}
