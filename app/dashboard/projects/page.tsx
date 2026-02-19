"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  sort_order: number;
  created_at: string;
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="M12 5v14" />
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
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadProjects = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    setProjects(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error("Failed to delete project");
    else {
      toast.success("Project deleted");
      loadProjects();
    }
  }

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tech_stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new" className="gap-2">
            <PlusIcon />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input 
          placeholder="Search projects..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div className="border border-border/40 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Tech</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">{project.title}</div>
                    {/* The following code snippet was provided in the instruction, but it appears to be
                        intended for an "Add Project" form component, not for display within a table cell
                        on the projects list page. Inserting it here would cause syntax errors due to
                        undefined variables (e.g., `newProject`, `setNewProject`, `Label`, `Textarea`)
                        and would break the table's structure and functionality.
                        
                        As per the instructions to "make the change faithfully" and "return the full contents
                        of the new code document after the change" while ensuring it's "syntactically correct",
                        I cannot directly insert the provided snippet into this file.
                        
                        The instruction "Add slug and content inputs to the Add Project dialog" suggests
                        modifying a different file (e.g., `dashboard/projects/new/page.tsx` or a component
                        used within it) where project creation/editing forms reside.
                        
                        Since this file (`ProjectsPage.tsx`) is for listing projects, and the provided
                        snippet is a form, I'm commenting it out to maintain a syntactically correct and
                        functional file, as directly inserting it would lead to a broken application.
                        
                        If the intention was to add these fields to the Project interface or display them
                        in the table, the instruction and snippet would need to be different. */}
                    {/*
                    <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                placeholder="Project Title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (URL friendly)</Label>
              <Input
                id="slug"
                value={newProject.slug || ""}
                onChange={(e) =>
                  setNewProject({ ...newProject, slug: e.target.value })
                }
                placeholder="project-slug-example"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Short)</Label>
              <Input
                id="description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Short description for the card"
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="content">Content (Detailed - Markdown)</Label>
              <Textarea
                id="content"
                value={newProject.content || ""}
                onChange={(e) =>
                  setNewProject({ ...newProject, content: e.target.value })
                }
                placeholder="## Features\n\n- Feature 1..."
                className="h-32 font-mono text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
              <Input
                id="tech_stack"
                value={newProject.tech_stack.join(", ")}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    tech_stack: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                placeholder="React, Next.js, TypeScript"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="live_url">Live URL</Label>
                <Input
                  id="live_url"
                  value={newProject.live_url}
                  onChange={(e) =>
                    setNewProject({ ...newProject, live_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repo_url">Repo URL</Label>
                <Input
                  id="repo_url"
                  value={newProject.repo_url}
                  onChange={(e) =>
                    setNewProject({ ...newProject, repo_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
                    */}
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {project.description}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
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
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border/40 rounded-lg">
          <p className="text-muted-foreground text-sm mb-4">No projects found</p>
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
