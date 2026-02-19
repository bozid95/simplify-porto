"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    tech_stack: "",
    live_url: "",
    repo_url: "",
    sort_order: 0,
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const techStack = form.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from("projects").insert({
      title: form.title,
      slug: form.slug, // Make sure to handle empty slug (maybe auto-generate or required)
      description: form.description,
      content: form.content,
      image_url: form.image_url,
      tech_stack: techStack,
      live_url: form.live_url,
      repo_url: form.repo_url,
      sort_order: form.sort_order,
    });

    setSaving(false);
    if (error) {
      toast.error("Failed to create project");
    } else {
      toast.success("Project created!");
      router.push("/dashboard/projects");
    }
  }

  return (
    <div className="max-w-full">
      <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
        <Link href="/dashboard/projects">
          <ArrowLeftIcon />
          Back to Projects
        </Link>
      </Button>

      <h1 className="text-2xl font-bold tracking-tight mb-6">New Project</h1>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="My Awesome Project"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="project-slug-example"
                  />
                  <p className="text-xs text-muted-foreground">Unique URL identifier for this project</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description for the card..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Detailed Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div data-color-mode="dark">
                  <MDEditor
                    value={form.content}
                    onChange={(val) => setForm({ ...form, content: val || "" })}
                    height={500}
                    preview="edit"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
                </div>
                <Separator />
                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? "Creating..." : "Create Project"}
                  </Button>
                  <Button type="button" variant="outline" asChild className="w-full">
                    <Link href="/dashboard/projects">Cancel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tech">Tech Stack</Label>
                  <Input
                    id="tech"
                    value={form.tech_stack}
                    onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                    placeholder="React, TypeScript"
                  />
                  <p className="text-xs text-muted-foreground">Comma-separated</p>
                </div>
                <div className="space-y-2">
                   <Label htmlFor="image_url">Image URL</Label>
                   <Input
                     id="image_url"
                     value={form.image_url}
                     onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                     placeholder="https://..."
                   />
                 </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input
                    id="live_url"
                    value={form.live_url}
                    onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repo_url">Repository URL</Label>
                  <Input
                    id="repo_url"
                    value={form.repo_url}
                    onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
