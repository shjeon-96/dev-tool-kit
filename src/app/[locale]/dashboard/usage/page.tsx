import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/shared/lib/supabase/server";
import { UsageContent } from "@/features/usage";

interface UsagePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "usage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function UsagePage({ params }: UsagePageProps) {
  const { locale } = await params;

  const supabase = await createClient();

  // 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard/usage`);
  }

  // 사용자 정보 조회
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // 구독 정보 조회
  const { data: subscriptionData } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // 이번 달 사용량 조회
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const { data: usageRecords } = await supabase
    .from("usage_records")
    .select("tool_slug, quantity, recorded_at")
    .eq("user_id", user.id)
    .gte("recorded_at", monthStart.toISOString())
    .order("recorded_at", { ascending: false });

  return (
    <UsageContent
      user={userData}
      subscription={subscriptionData}
      usageRecords={usageRecords || []}
    />
  );
}
