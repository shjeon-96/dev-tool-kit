import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  GitBranch,
  Globe,
  Hash,
  FileCode,
  Braces,
  Palette,
  FileType,
  Atom,
  Triangle,
  Hexagon,
  Wind,
  Server,
  Container,
  Terminal,
} from "lucide-react";

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
  {
    slug: "javascript",
    icon: Braces,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    slug: "css",
    icon: Palette,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    slug: "typescript",
    icon: FileType,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    slug: "react",
    icon: Atom,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    slug: "vue",
    icon: Triangle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    slug: "nextjs",
    icon: Hexagon,
    color: "text-neutral-700 dark:text-neutral-300",
    bgColor: "bg-neutral-700/10 dark:bg-neutral-300/10",
  },
  {
    slug: "tailwind",
    icon: Wind,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    slug: "nodejs",
    icon: Server,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    slug: "docker",
    icon: Container,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    slug: "bash",
    icon: Terminal,
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-600/10 dark:bg-gray-400/10",
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
