import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AuthForm } from "@/features/auth";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.signup" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <AuthForm mode="signup" />
    </div>
  );
}
