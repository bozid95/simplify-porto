import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { ArticleContent } from "./article-content";
import { ThemeToggle } from "@/components/theme-toggle";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/4 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-96 w-96 -translate-x-1/4 rounded-full bg-muted-foreground/10 blur-3xl" />
      </div>

      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <article className="relative mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-9">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 gap-2 rounded-full border border-border/60 bg-background/70 px-4 backdrop-blur-sm"
          asChild
        >
          <Link href="/blog">
            <ArrowLeftIcon />
            Back to Blog
          </Link>
        </Button>

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
