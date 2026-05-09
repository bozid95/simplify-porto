import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { ArticleContent } from "./article-content";
import { PageNav } from "@/components/page-nav";

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

  if (mode === "nostalgia") {
    return (
      <main data-mode="nostalgia">
        <p data-nostalgia-modern>
          <Link href={`/blog/${article.slug}`}>Modern mode</Link>
        </p>
        <h1>{article.title}</h1>
        <p>
          <Link href="/?mode=nostalgia">Home</Link> |{" "}
          <Link href="/blog?mode=nostalgia">{"<- Back to Blog"}</Link>
        </p>
        <p>
          {new Date(article.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {article.tags?.length > 0 && <p>Tags: {article.tags.join(", ")}</p>}
        <hr />

        {article.content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        ) : (
          <p>No article content yet.</p>
        )}
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
          backHref="/blog"
          backLabel="Back to Blog"
          modeHref={`/blog/${article.slug}?mode=nostalgia`}
          modeLabel="Nostalgia Mode"
        />

        <Card className="rounded-[2rem] border-border/50 bg-card/75 py-0 shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          <CardContent className="px-5 py-6 sm:px-7 sm:py-8">
            <header className="mb-8">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Article
              </p>
              <time className="inline-flex rounded-full border border-border/50 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
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

            <ArticleContent content={article.content} />
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
