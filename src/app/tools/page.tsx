import Link from "next/link";
import { tools } from "@/entities/tool";

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DevToolkit</h1>
        <p className="text-muted-foreground">
          개발자를 위한 웹 기반 올인원 도구 모음
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(tools).map(([slug, tool]) => (
          <Link
            key={slug}
            href={`/tools/${slug}`}
            className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <tool.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
