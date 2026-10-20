import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { PageNav } from "@/components/page-nav";
import { WikiTableOfContents } from "@/components/wiki-toc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) {
    return {
      title: "Notes — Widodo",
    };
  }

  return {
    title: `${article.title} — Widodo`,
    description: article.excerpt || "Note by Widodo",
    openGraph: {
      title: `${article.title} — Widodo`,
      description: article.excerpt || "Note by Widodo",
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) notFound();

  if (mode !== "modern") {
    return (
      <main data-mode="nostalgia">
        {/* Wikipedia Header */}
        <header className="wiki-header">
          <Link href="/" className="wiki-logo">
            <span className="wiki-logo-mark">W</span>
            <span>Notes</span>
          </Link>
          <div className="flex items-center gap-3">
            <nav className="wiki-nav">
              <Link href="/" className="wiki-nav-item">
                Home
              </Link>
              <Link href="/portfolio" className="wiki-nav-item">
                Projects
              </Link>
              <Link href="/notes" className="wiki-nav-item active">
                Notes
              </Link>
            </nav>
            <Link
              href={`/notes/${article.slug}?mode=modern`}
              className="wiki-switch-mode"
            >
              Modern Mode &rarr;
            </Link>
          </div>
        </header>

        <h1>{article.title}</h1>
        <div className="wiki-site-sub flex flex-wrap items-center justify-between gap-2">
          <span suppressHydrationWarning className="text-xs">
            Published:{" "}
            {new Date(article.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-[var(--wiki-muted)] mr-1">
                Categories:
              </span>
              {article.tags.map((tag: string) => (
                <span key={tag} className="wiki-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Vector 2022 Article Layout with Left Table of Contents */}
        <div className="wiki-article-layout my-6">
          {article.content && (
            <aside className="wiki-toc-aside">
              <WikiTableOfContents
                content={article.content}
                pageTitle={article.title}
              />
            </aside>
          )}

          <article className="min-w-0 w-full">
            {article.content ? (
              <MarkdownRenderer content={article.content} />
            ) : (
              <p>No note content yet.</p>
            )}
          </article>
        </div>

        <footer className="wiki-footer">
          <div>
            <Link href="/notes">&larr; Back to all notes</Link>
          </div>
          <div>{article.title}</div>
        </footer>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/4 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-96 w-96 -translate-x-1/4 rounded-full bg-muted-foreground/10 blur-3xl" />
      </div>

      <article className="relative mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-9">
        <PageNav
          backHref="/notes?mode=modern"
          backLabel="Back to Notes"
          modeHref={`/notes/${article.slug}`}
          modeLabel="Nostalgia Mode"
        />

        <Card className="rounded-[2rem] border-border/50 bg-card/75 py-0 shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          <CardContent className="px-5 py-6 sm:px-7 sm:py-8">
            <header className="mb-8">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Note
              </p>
              <time
                suppressHydrationWarning
                className="inline-flex rounded-full border border-border/50 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <h1 className="mt-3 mb-4 text-[1.9rem] font-semibold tracking-tight sm:text-[2.2rem]">
                {article.title}
              </h1>
              {article.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full border border-border/40 bg-background/70 px-3 py-1 text-[11px] font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <MarkdownRenderer content={article.content} />
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
