"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type ProjectVisibility = "draft" | "public";
type StatusFilter = "all" | ProjectVisibility;

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  tech_stack: string[];
  live_url: string;
  repo_url: string;
  visibility: ProjectVisibility;
  sort_order: number;
  created_at: string;
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

const visibilityBadgeVariant: Record<ProjectVisibility, "secondary" | "default"> = {
  draft: "secondary",
  public: "default",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const loadProjects = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load projects");
      setProjects([]);
    } else {
      setProjects((data || []) as Project[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadProjects]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete project");
      return;
    }

    toast.success("Project deleted");
    loadProjects();
  }

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.tech_stack || []).some((tech) => tech.toLowerCase().includes(query));
    const matchesStatus = statusFilter === "all" ? true : project.visibility === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Content
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your portfolio projects and control what is public.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new" className="gap-2">
            <PlusIcon />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-border/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Tech</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">{project.title}</div>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {project.description}
                    </p>
                    {project.slug && (
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                        /portfolio/{project.slug}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(project.tech_stack || []).slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs font-normal">
                          {tech}
                        </Badge>
                      ))}
                      {(project.tech_stack || []).length > 3 && (
                        <Badge variant="outline" className="text-xs font-normal">
                          +{project.tech_stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={visibilityBadgeVariant[project.visibility ?? "draft"]}>
                      {project.visibility === "public" ? "Public" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <PenIcon />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(project.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/40 py-16">
          <p className="mb-2 text-sm text-muted-foreground">No projects found</p>
          <p className="mb-4 text-xs text-muted-foreground">
            Try changing the search or status filter.
          </p>
          {projects.length === 0 && (
            <Button asChild>
              <Link href="/dashboard/projects/new" className="gap-2">
                <PlusIcon />
                Add your first project
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
