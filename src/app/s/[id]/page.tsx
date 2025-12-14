import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getShareData } from "@/shared/lib/kv";
import { tools } from "@/entities/tool";

// ============================================
// Share Redirect Page
// ============================================

interface SharePageProps {
  params: Promise<{ id: string }>;
}

/**
 * 공유 링크 메타데이터
 */
export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getShareData(id);

  if (!result.success || !result.data) {
    return {
      title: "Share Not Found | DevToolkit",
      description: "This share link may have expired or does not exist.",
    };
  }

  const tool = tools[result.data.toolSlug];
  const toolName = tool ? result.data.toolSlug : "Tool";

  return {
    title: `Shared ${toolName} | DevToolkit`,
    description: `View shared data in DevToolkit ${toolName}`,
    robots: "noindex, nofollow", // 공유 페이지는 인덱싱 안함
  };
}

/**
 * 공유 페이지 - 데이터 로드 후 해당 도구 페이지로 리다이렉트
 */
export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;

  // 1. 공유 데이터 조회
  const result = await getShareData(id);

  // 2. 데이터가 없거나 만료된 경우
  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 p-8">
          <div className="text-6xl">🔗</div>
          <h1 className="text-2xl font-bold">Share Link Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            {result.error ||
              "This share link may have expired or does not exist."}
          </p>
          <p className="text-sm text-muted-foreground">
            Share links expire after 30 days.
          </p>
          <Link
            href="/en/tools"
            className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to DevToolkit
          </Link>
        </div>
      </div>
    );
  }

  // 3. 도구 존재 여부 확인
  const tool = tools[result.data.toolSlug];
  if (!tool) {
    notFound();
  }

  // 4. 공유 데이터를 쿼리 파라미터로 인코딩하여 리다이렉트
  // 데이터는 클라이언트에서 sessionStorage로 전달
  const searchParams = new URLSearchParams({
    shared: id,
  });

  // 기본 locale은 en
  redirect(`/en/tools/${result.data.toolSlug}?${searchParams.toString()}`);
}
