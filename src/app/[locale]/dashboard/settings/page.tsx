import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Settings, Construction } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard");
  return {
    title: t("nav.settings"),
  };
}

export default async function SettingsPage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="h-8 w-8" />
          {t("nav.settings")}
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md">
          Settings page is under development. You&apos;ll be able to manage your
          account preferences, notifications, and more.
        </p>
      </div>
    </div>
  );
}
