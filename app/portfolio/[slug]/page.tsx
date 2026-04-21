import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { PageNav } from "@/components/page-nav";

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function normalizeExternalUrl(url?: string | null) {
  if (!url) return "";
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Try to find by slug first
  let { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("visibility", "public")
    .single();

  // If not found, and slug looks like a UUID, try to find by ID
  if (!project && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
     const { data: projectById } = await supabase
        .from("projects")
        .select("*")
        .eq("id", slug)
        .eq("visibility", "public")
        .single();
     project = projectById;
  }

  if (!project) notFound();

  const liveUrl = normalizeExternalUrl(project.live_url);
  const repoUrl = normalizeExternalUrl(project.repo_url);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 -translate-x-1/4 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-96 w-96 translate-x-1/4 rounded-full bg-muted-foreground/10 blur-3xl" />
      </div>

      <article className="relative mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-9">
        <PageNav backHref="/portfolio" backLabel="Back to Portfolio" />

        <Card className="overflow-hidden rounded-[2rem] border-border/50 bg-card/75 py-0 shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          {project.image_url && (
            <div className="overflow-hidden border-b border-border/40 bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image_url}
                alt={project.title}
                className="h-auto max-h-[520px] w-full object-cover"
              />
            </div>
          )}

          <CardContent className="px-5 py-6 sm:px-7 sm:py-8">
            <header className="mb-7 md:mb-8">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Project Overview
              </p>
              <h1 className="mb-3 text-[1.9rem] font-semibold tracking-tight sm:text-[2.2rem]">
                {project.title}
              </h1>
              <p className="mb-6 max-w-3xl text-[15px] leading-7 text-muted-foreground sm:text-base">
                {project.description}
              </p>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {liveUrl && (
                    <Button size="sm" className="gap-2 rounded-full px-4" asChild>
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon />
                        Visit Site
                      </a>
                    </Button>
                  )}
                  {repoUrl && (
                    <Button variant="outline" size="sm" className="gap-2 rounded-full px-4 bg-background/70" asChild>
                      <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Tech Stack
                </h3>
                {project.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech: string) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-full border border-border/40 bg-background/70 px-3 py-1 text-[11px] font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                  </div>
                )}
              </div>
            </header>

            {project.content ? (
              <MarkdownRenderer content={project.content} />
            ) : (
              <div className="prose prose-neutral dark:prose-invert">
                <p className="italic text-muted-foreground">
                  No detailed description available for this project.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
