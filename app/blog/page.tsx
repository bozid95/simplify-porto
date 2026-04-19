import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { GradientFrame } from "@/components/ui/gradient-frame";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-6">
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="right-0 top-0 h-72 w-72 translate-x-1/3" fill="rgba(120,120,120,0.18)" />
        <Spotlight className="left-0 top-1/3 h-80 w-80 -translate-x-1/4" fill="rgba(160,160,160,0.14)" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8 gap-2 rounded-full border border-border/60 bg-background/70 px-4 backdrop-blur-sm"
          asChild
        >
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>

        <div className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Writing & Notes
          </p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Blog
          </h1>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid gap-4">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                <GradientFrame className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                  <Card className="cursor-pointer rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 shadow-none backdrop-blur-xl">
                    <CardHeader className="pb-3 pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl font-semibold transition-colors group-hover:text-primary">
                          {article.title}
                        </CardTitle>
                        <span className="shrink-0 rounded-full border border-border/50 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <p className="mb-4 text-sm leading-7 text-muted-foreground">
                        {article.excerpt}
                      </p>
                      {article.tags && article.tags.length > 0 && (
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
                    </CardContent>
                  </Card>
                </GradientFrame>
              </Link>
            ))}
          </div>
        ) : (
          <GradientFrame>
            <Card className="rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 backdrop-blur-xl shadow-none">
              <CardContent className="px-6 py-8 text-sm text-muted-foreground">
                No articles yet.
              </CardContent>
            </Card>
          </GradientFrame>
        )}
      </div>
    </div>
  );
}
