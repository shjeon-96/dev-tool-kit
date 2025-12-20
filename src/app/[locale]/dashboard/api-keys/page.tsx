import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Key } from "lucide-react";
import { ApiKeysManager } from "@/features/api-access";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard");
  return {
    title: t("quickLinks.apiKeys"),
  };
}

export default async function ApiKeysPage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Key className="h-8 w-8" />
          {t("quickLinks.apiKeys")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Create and manage API keys for programmatic access to Web Toolkit
        </p>
      </div>

      <ApiKeysManager />
    </div>
  );
}
