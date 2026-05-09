import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { GradientFrame } from "@/components/ui/gradient-frame";
import { PageNav } from "@/components/page-nav";

function truncateText(text?: string | null, maxLength = 140) {
  const value = text?.trim();
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (mode !== "modern") {
    return (
      <main data-mode="nostalgia">
        <p data-nostalgia-modern>
          <Link href="/blog?mode=modern">Modern mode</Link>
        </p>
        <h1>Notes</h1>
        <p>
          <Link href="/">Home</Link> |{" "}
          <Link href="/portfolio">Portfolio</Link>
        </p>
        <hr />

        {articles && articles.length > 0 ? (
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <Link href={`/blog/${article.slug}`}>
                  {article.title}
                </Link>
                {truncateText(article.excerpt) ? `: ${truncateText(article.excerpt)}` : ""}
                {" "}
                <Link href={`/blog/${article.slug}`}>Read more...</Link>
                <ul>
                  <li>
                    {new Date(article.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </li>
                  {article.tags && article.tags.length > 0 && (
                    <li>Tags: {article.tags.join(", ")}</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes yet.</p>
        )}
      </main>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-6">
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="right-0 top-0 h-72 w-72 translate-x-1/3" fill="rgba(120,120,120,0.18)" />
        <Spotlight className="left-0 top-1/3 h-80 w-80 -translate-x-1/4" fill="rgba(160,160,160,0.14)" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-8">
        <PageNav
          backHref="/?mode=modern"
          backLabel="Back"
          modeHref="/blog"
          modeLabel="Nostalgia Mode"
        />

        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Notes
          </p>
          <h1 className="mb-2 text-[1.9rem] font-semibold tracking-tight sm:text-[2.15rem]">
            Notes
          </h1>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid gap-3.5">
            {articles.map((article, index) => {
              const delayClass =
                index % 4 === 0 ? "" :
                index % 4 === 1 ? " delay-100" :
                index % 4 === 2 ? " delay-180" :
                " delay-260";

              return (
              <Link key={article.id} href={`/blog/${article.slug}?mode=modern`} className={`group animate-fade-up-soft${delayClass}`}>
                <GradientFrame className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                  <Card className="cursor-pointer rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 shadow-none backdrop-blur-xl">
                    <CardHeader className="pb-2 pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary sm:text-[1.15rem]">
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
                    <CardContent className="pb-5">
                      <p className="mb-3 text-sm leading-6 text-muted-foreground">
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
            )})}
          </div>
        ) : (
          <GradientFrame>
            <Card className="rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 backdrop-blur-xl shadow-none">
              <CardContent className="px-6 py-8 text-sm text-muted-foreground">
                No notes yet.
              </CardContent>
            </Card>
          </GradientFrame>
        )}
      </div>
    </div>
  );
}
