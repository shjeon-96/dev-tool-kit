import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/shared/lib/supabase/server";
import { DashboardContent } from "@/features/dashboard/ui/dashboard-content";

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ checkout?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardPageProps) {
  const { locale } = await params;
  const { checkout } = await searchParams;

  const supabase = await createClient();

  // 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard`);
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

  return (
    <DashboardContent
      user={userData}
      subscription={subscriptionData}
      checkoutSuccess={checkout === "success"}
    />
  );
}
