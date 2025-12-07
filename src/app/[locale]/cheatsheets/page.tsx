import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { GitBranch, Globe, Hash, FileCode } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cheatsheets");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const cheatsheets = [
  {
    slug: "git",
    icon: GitBranch,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    slug: "http-status",
    icon: Globe,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    slug: "regex",
    icon: Hash,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    slug: "mime-types",
    icon: FileCode,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export default async function CheatsheetsPage() {
  const t = await getTranslations("cheatsheets");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cheatsheets.map((sheet) => {
          const Icon = sheet.icon;
          return (
            <Link
              key={sheet.slug}
              href={`/cheatsheets/${sheet.slug}`}
              className="group block rounded-lg border p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${sheet.bgColor}`}>
                  <Icon className={`h-6 w-6 ${sheet.color}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t(`${sheet.slug}.title`)}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(`${sheet.slug}.description`)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
