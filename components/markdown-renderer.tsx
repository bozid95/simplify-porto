"use client";

import React, { useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback or ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors focus:outline-none"
      title="Copy code"
    >
      {copied ? (
        <>
          <svg
            className="w-3.5 h-3.5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function generateHeadingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNodeText(node: React.ReactNode): string {
  if (!node) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (typeof node === "object" && "props" in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getNodeText(el.props.children);
  }
  return "";
}

const markdownComponents: Components = {
  h2({ children, ...props }) {
    const text = getNodeText(children);
    const id = generateHeadingId(text);
    return (
      <h2 id={id} className="scroll-mt-20 group relative" {...props}>
        {children}
      </h2>
    );
  },
  h3({ children, ...props }) {
    const text = getNodeText(children);
    const id = generateHeadingId(text);
    return (
      <h3 id={id} className="scroll-mt-20 group relative" {...props}>
        {children}
      </h3>
    );
  },
  pre({ children, ...props }) {
    return (
      <div className="relative group my-5 overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0d1117] shadow-lg">
        {children}
      </div>
    );
  },
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    const isBlockCode =
      Boolean(match) ||
      (typeof children === "string" && children.includes("\n"));

    if (isBlockCode) {
      const language = match ? match[1] : "text";
      return (
        <div className="w-full">
          <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/70 px-4 py-1.5 select-none">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-zinc-400">
              {language}
            </span>
            <CopyButton code={codeString} />
          </div>
          <pre className="!m-0 !p-4 !bg-transparent overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <code
        className="rounded-md bg-zinc-100 dark:bg-zinc-800/70 px-1.5 py-0.5 font-mono text-xs font-medium text-pink-600 dark:text-pink-400 border border-zinc-200 dark:border-zinc-700/60"
        {...props}
      >
        {children}
      </code>
    );
  },
  table({ children }) {
    return (
      <div className="my-6 w-full overflow-x-auto rounded-lg border border-border/60">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="my-4 border-l-4 border-primary/60 bg-muted/30 py-2 pl-4 pr-3 italic rounded-r-md text-muted-foreground">
        {children}
      </blockquote>
    );
  },
  img({ src, alt, ...props }) {
    if (!src) return null;
    return (
      <figure className="wiki-thumb-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} {...props} />
        {alt && <figcaption className="wiki-thumb-caption">{alt}</figcaption>}
      </figure>
    );
  },
};

export function MarkdownRenderer({
  content,
  stripLeadingH1 = true,
}: {
  content: string;
  stripLeadingH1?: boolean;
}) {
  const processedContent = React.useMemo(() => {
    if (!content) return "";
    if (!stripLeadingH1) return content;
    // Remove leading H1 if markdown begins with # Title to prevent double headers
    return content.replace(/^#\s+[^\r\n]+(?:\r?\n)+/, "");
  }, [content, stripLeadingH1]);

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:mb-4
      prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-3
      prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:mb-2
      prose-p:text-sm prose-p:md:text-base prose-p:leading-relaxed
      prose-li:text-sm prose-li:md:text-base
      prose-strong:text-foreground
      prose-a:text-primary prose-a:underline hover:prose-a:opacity-80
      [&>*:first-child]:mt-0
    "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
