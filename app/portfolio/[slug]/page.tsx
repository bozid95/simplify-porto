import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/app/blog/[slug]/article-content";

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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" className="mb-8 gap-2" asChild>
          <Link href="/portfolio">
            <ArrowLeftIcon />
            Back to Portfolio
          </Link>
        </Button>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
             {project.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
             <div className="flex gap-2">
                {project.live_url && (
                    <Button size="sm" className="gap-2" asChild>
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon />
                        Visit Site
                    </a>
                    </Button>
                )}
                {project.repo_url && (
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                        View Code
                    </a>
                    </Button>
                )}
             </div>
          </div>
          
          <div className="space-y-2">
             <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
             {project.tech_stack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-sm font-normal px-2.5 py-1">
                    {tech}
                    </Badge>
                ))}
                </div>
            )}
          </div>
        </header>
        
        {project.content ? (
             <ArticleContent content={project.content} />
        ) : (
             <div className="prose prose-neutral dark:prose-invert">
                 <p className="italic text-muted-foreground">No detailed description available for this project.</p>
             </div>
        )}
       
      </article>
    </div>
  );
}
