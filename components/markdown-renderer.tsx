"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h1:text-xl prose-h1:md:text-2xl prose-h1:mb-4
      prose-h2:text-lg prose-h2:md:text-xl prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-base prose-h3:md:text-lg prose-h3:mt-6 prose-h3:mb-3
      prose-p:text-sm prose-p:md:text-base prose-p:leading-relaxed prose-p:text-muted-foreground
      prose-li:text-sm prose-li:md:text-base prose-li:text-muted-foreground
      prose-strong:text-foreground
      prose-code:text-xs prose-code:md:text-sm prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50
      [&>*:first-child]:mt-0
    ">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
