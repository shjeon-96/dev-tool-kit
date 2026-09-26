import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  // 앱 문서는 /work/{slug}/{kind}로 모았다. 스토어에 등록된 옛 주소는 계속 열리게 둔다.
  async redirects() {
    return [
      {
        source: "/:locale(en|ko|ja)/bori-cleaner/privacy",
        destination: "/:locale/work/bori-cleaner/privacy",
        permanent: true,
      },
    ];
  },
  experimental: {
    // 켜 두면 globals.css를 고쳐도 예전 CSS가 같은 파일 이름으로 나와 운영에 반영되지 않았다.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
