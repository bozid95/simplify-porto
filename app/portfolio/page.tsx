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

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-6">
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="left-0 top-0 h-72 w-72 -translate-x-1/3" fill="rgba(120,120,120,0.18)" />
        <Spotlight className="right-0 top-1/4 h-80 w-80 translate-x-1/4" fill="rgba(160,160,160,0.14)" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6">
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
            Selected Projects
          </p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Portfolio
          </h1>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="group relative">
                <Link href={`/portfolio/${project.slug || project.id}`} className="block h-full">
                  <GradientFrame className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
                    <Card className="h-full overflow-hidden rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 shadow-none backdrop-blur-xl">
                      {project.image_url && (
                        <div className="aspect-[16/10] w-full overflow-hidden border-b border-border/40 bg-muted/30">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-3 flex-none">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl font-semibold transition-colors group-hover:text-primary">
                            {project.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-6">
                        <p className="mb-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                          {project.description}
                        </p>
                        {project.tech_stack && project.tech_stack.length > 0 && (
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
                      </CardContent>
                    </Card>
                  </GradientFrame>
                </Link>
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  {project.live_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/50 bg-background/75 backdrop-blur-md hover:bg-background"
                      asChild
                    >
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon />
                      </a>
                    </Button>
                  )}
                  {project.repo_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/50 bg-background/75 backdrop-blur-md hover:bg-background"
                      asChild
                    >
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <GradientFrame>
            <Card className="rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 backdrop-blur-xl shadow-none">
              <CardContent className="px-6 py-8 text-sm text-muted-foreground">
                No projects yet.
              </CardContent>
            </Card>
          </GradientFrame>
        )}
      </div>
    </div>
  );
}
