import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  experimental: {
    // 켜 두면 globals.css를 고쳐도 예전 CSS가 같은 파일 이름으로 나와 운영에 반영되지 않았다.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
