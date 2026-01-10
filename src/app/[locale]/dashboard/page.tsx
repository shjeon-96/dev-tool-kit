import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/shared/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/shared/ui";
import Link from "next/link";
import { User, Mail, Calendar, CreditCard, CheckCircle } from "lucide-react";

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

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard`);
  }

  const { data: subscriptionData } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const isKorean = locale === "ko";
  const subscription = subscriptionData as {
    status?: string;
    current_period_end?: string;
  } | null;
  const isPro = subscription?.status === "active";

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      {/* Checkout Success Banner */}
      {checkout === "success" && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <p className="text-success font-medium">
            {isKorean
              ? "결제가 완료되었습니다! Pro 기능을 이용하실 수 있습니다."
              : "Payment successful! You now have access to Pro features."}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {isKorean ? "대시보드" : "Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isKorean
            ? "계정 정보와 구독 상태를 확인하세요."
            : "View your account information and subscription status."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {isKorean ? "계정 정보" : "Account Info"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {isKorean ? "가입일: " : "Joined: "}
                {new Date(user.created_at).toLocaleDateString(locale)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {isKorean ? "구독 상태" : "Subscription"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {isKorean ? "플랜" : "Plan"}
              </span>
              <span
                className={`font-medium ${isPro ? "text-primary" : "text-muted-foreground"}`}
              >
                {isPro ? "Pro" : "Free"}
              </span>
            </div>
            {isPro && subscription?.current_period_end && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {isKorean ? "다음 결제일" : "Next billing"}
                </span>
                <span className="text-sm">
                  {new Date(subscription.current_period_end).toLocaleDateString(
                    locale,
                  )}
                </span>
              </div>
            )}
            {!isPro && (
              <Button asChild className="w-full mt-2">
                <Link href={`/${locale}/pricing`}>
                  {isKorean ? "Pro로 업그레이드" : "Upgrade to Pro"}
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
