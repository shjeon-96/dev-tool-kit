import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/shared/lib/supabase/server";
import { BillingContent } from "@/features/billing/ui/billing-content";

interface BillingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "billing" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function BillingPage({ params }: BillingPageProps) {
  const { locale } = await params;

  const supabase = await createClient();

  // 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard/billing`);
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

  return <BillingContent user={userData} subscription={subscriptionData} />;
}
