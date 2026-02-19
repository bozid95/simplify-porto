"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";

export function ArticleContent({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
}
