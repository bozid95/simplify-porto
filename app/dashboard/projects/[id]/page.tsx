"use client";

import { useEffect, useState, useCallback, useRef, useId } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { parseMarkdownFile, downloadMarkdownFile } from "@/lib/markdown-file";
import { toast } from "sonner";

type ProjectVisibility = "draft" | "public";

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = useId();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    tech_stack: "",
    live_url: "",
    repo_url: "",
    visibility: "draft" as ProjectVisibility,
    sort_order: 0,
  });

  const loadProject = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      setForm({
        title: data.title,
        slug: data.slug || "",
        description: data.description || "",
        content: data.content || "",
        image_url: data.image_url || "",
        tech_stack: (data.tech_stack || []).join(", "),
        live_url: data.live_url || "",
        repo_url: data.repo_url || "",
        visibility: (data.visibility as ProjectVisibility) || "draft",
        sort_order: data.sort_order || 0,
      });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadProject();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadProject]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !file.name.endsWith(".md") &&
      !file.name.endsWith(".markdown") &&
      !file.name.endsWith(".txt")
    ) {
      toast.error("Harap unggah file berekstensi .md");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const parsed = parseMarkdownFile(text);

      setForm((prev) => ({
        ...prev,
        title: parsed.title || prev.title,
        slug: parsed.slug || prev.slug,
        description: parsed.description || parsed.excerpt || prev.description,
        tech_stack: parsed.tech_stack || prev.tech_stack,
        live_url: parsed.live_url || prev.live_url,
        repo_url: parsed.repo_url || prev.repo_url,
        image_url: parsed.image_url || prev.image_url,
        content: parsed.content,
      }));

      toast.success(`File ${file.name} berhasil dimuat ke editor!`);
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportMd = () => {
    if (!form.content.trim() && !form.description.trim()) {
      toast.error("Konten proyek masih kosong untuk diekspor");
      return;
    }

    const frontmatter = [
      "---",
      `title: "${form.title || "Untitled"}"`,
      `slug: "${form.slug || generateSlug(form.title || "untitled")}"`,
      form.description ? `description: "${form.description}"` : null,
      form.tech_stack ? `tech_stack: [${form.tech_stack}]` : null,
      form.live_url ? `live_url: "${form.live_url}"` : null,
      form.repo_url ? `repo_url: "${form.repo_url}"` : null,
      form.image_url ? `image_url: "${form.image_url}"` : null,
      "---",
      "",
      form.content,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const fileName = form.slug || generateSlug(form.title || "project");
    downloadMarkdownFile(fileName, frontmatter);
    toast.success("File .md berhasil diunduh");
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const techStack = form.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("projects")
      .update({
        title: form.title,
        slug: form.slug,
        description: form.description,
        content: form.content,
        image_url: form.image_url,
        tech_stack: techStack,
        live_url: form.live_url,
        repo_url: form.repo_url,
        visibility: form.visibility,
        sort_order: form.sort_order,
      })
      .eq("id", id);

    setSaving(false);
    if (error) {
      toast.error("Gagal memperbarui project: " + error.message);
    } else {
      toast.success("Project berhasil diperbarui!");
      router.push("/dashboard/projects");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Memuat project...</p>
      </div>
    );
  }

  return (
    <div className="max-w-full">
      <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
        <Link href="/dashboard/projects">
          <ArrowLeftIcon />
          Kembali ke Projects
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Content
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Project
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <input
            id={fileInputId}
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".md,.markdown,.txt"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon />
            Import File .md
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleExportMd}
          >
            <DownloadIcon />
            Export .md
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Detail Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Singkat</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-semibold tracking-tight">
                    Konten Detail (Markdown)
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tulis format markdown atau unggah file .md project Anda
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setEditorMode("write")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      editorMode === "write"
                        ? "bg-background text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Tulis
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("preview")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      editorMode === "preview"
                        ? "bg-background text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {editorMode === "write" ? (
                  <Textarea
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    placeholder="# Deskripsi Lengkap Project&#10;&#10;Jelaskan fitur, arsitektur, atau highlight teknis di sini dalam format Markdown..."
                    className="min-h-[500px] font-mono text-sm leading-relaxed p-4 border-border/50 focus-visible:ring-1 resize-y"
                  />
                ) : (
                  <div className="min-h-[500px] rounded-lg border border-border/50 bg-card/60 p-5 overflow-auto">
                    {form.content ? (
                      <MarkdownRenderer content={form.content} />
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Belum ada konten detail untuk ditampilkan.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Publikasi & Tampilan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Visibilitas</Label>
                  <Tabs
                    value={form.visibility}
                    onValueChange={(val) =>
                      setForm({ ...form, visibility: val as ProjectVisibility })
                    }
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="draft">Draft</TabsTrigger>
                      <TabsTrigger value="public">Public</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Urutan Tampilan</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Angka lebih kecil tampil lebih awal
                  </p>
                </div>

                <Separator />

                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="w-full"
                  >
                    <Link href="/dashboard/projects">Batal</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Tautan & Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL Gambar Cover</Label>
                  <Input
                    id="image_url"
                    value={form.image_url}
                    onChange={(e) =>
                      setForm({ ...form, image_url: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input
                    id="live_url"
                    value={form.live_url}
                    onChange={(e) =>
                      setForm({ ...form, live_url: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repo_url">Repository URL</Label>
                  <Input
                    id="repo_url"
                    value={form.repo_url}
                    onChange={(e) =>
                      setForm({ ...form, repo_url: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tech_stack">Tech Stack</Label>
                  <Input
                    id="tech_stack"
                    value={form.tech_stack}
                    onChange={(e) =>
                      setForm({ ...form, tech_stack: e.target.value })
                    }
                    placeholder="Next.js, TypeScript, Tailwind"
                  />
                  <p className="text-xs text-muted-foreground">
                    Pisahkan dengan koma
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
