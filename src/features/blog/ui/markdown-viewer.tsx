import { useMemo } from "react";
import MarkdownIt from "markdown-it";

// Tailwind Typography (prose) 스타일을 적용하기 위해 className 사용
interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const html = useMemo(() => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    });
    return md.render(content);
  }, [content]);

  return (
    <article
      className="prose prose-zinc dark:prose-invert max-w-none
      prose-headings:scroll-mt-20 prose-headings:font-bold
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
      prose-img:rounded-lg prose-img:border prose-img:border-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
