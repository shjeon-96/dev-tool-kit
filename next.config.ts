import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline",
  },
  runtimeCaching: [
    // WebAssembly 바이너리 캐싱 (FFmpeg 등)
    {
      urlPattern: /\.wasm$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "wasm-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year (Wasm은 거의 변경 안됨)
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // unpkg/jsdelivr CDN 캐싱 (@ffmpeg/core, @ffmpeg/ffmpeg)
    {
      urlPattern: /^https:\/\/(?:unpkg|cdn\.jsdelivr)\.(?:com|net)\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "cdn-cache",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    // 정적 리소스 (JS, CSS, 폰트)
    {
      urlPattern: /\.(?:js|css|woff2?)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    // 이미지 캐싱
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    // API 요청
    {
      urlPattern: /^https?:\/\/.*\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
    // Next.js 정적 파일
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    // 도구 페이지 캐싱 (오프라인 사용 지원)
    {
      urlPattern: /\/(?:en|ko|ja)\/tools\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "tools-pages",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
    // 변환 도구 페이지 캐싱
    {
      urlPattern: /\/(?:en|ko|ja)\/convert\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "convert-pages",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
  ],
});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // React Compiler (자동 메모이제이션)
  reactCompiler: true,

  // Experimental optimizations
  experimental: {
    // Tree-shake barrel imports for better bundle size
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash-es",
    ],
  },

  // Route-specific headers for WebAssembly support
  // Only apply COOP/COEP to Wasm-enabled tools to preserve AdSense on other pages
  async headers() {
    return [
      {
        // Wasm을 사용하는 특정 도구에만 COOP/COEP 헤더 적용
        // 이 헤더가 있어야 SharedArrayBuffer 사용 가능 (FFmpeg 멀티스레딩)
        source:
          "/:locale/tools/(image-resizer|hash-generator|video-compressor)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        // FFmpeg Wasm 파일 서빙을 위한 CORS 헤더
        source: "/ffmpeg/:path*",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(withPWA(withNextIntl(nextConfig)));
