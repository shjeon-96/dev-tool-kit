import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, type ToolSlug } from "@/entities/tool";
import { ToolRenderer } from "./tool-renderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(tools).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    return {};
  }

  return {
    title: tool.title,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `/tools/${slug}`,
    },
    alternates: {
      canonical: `/tools/${slug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
          <tool.icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{tool.title}</h1>
          <p className="text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <ToolRenderer slug={slug as ToolSlug} />
      </div>
    </div>
  );
}
