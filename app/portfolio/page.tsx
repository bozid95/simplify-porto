import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl py-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-8 gap-2" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>

        <h1 className="text-2xl font-bold tracking-tight mb-8">Portfolio</h1>

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="group relative">
                <Link href={`/portfolio/${project.slug || project.id}`} className="block h-full">
                    <Card className="border-border/40 bg-card/50 backdrop-blur-sm h-full transition-all hover:bg-card/80 overflow-hidden flex flex-col">
                        {project.image_url && (
                          <div className="aspect-video w-full overflow-hidden border-b border-border/40">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img 
                                src={project.image_url} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                             />
                          </div>
                        )}
                        <CardHeader className="pb-3 flex-none">
                        <div className="flex items-start justify-between">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.title}</CardTitle>
                        </div>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                            {project.description}
                        </p>
                        {project.tech_stack && project.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                            {project.tech_stack.map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="text-xs font-normal">
                                {tech}
                                </Badge>
                            ))}
                            </div>
                        )}
                        </CardContent>
                    </Card>
                </Link>
                 {/* Action Buttons Overlay or Separate */}
                 <div className="absolute top-4 right-4 flex gap-1 z-10">
                      {project.live_url && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLinkIcon />
                          </a>
                        </Button>
                      )}
                      {project.repo_url && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background" asChild>
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
          <p className="text-muted-foreground text-sm">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
