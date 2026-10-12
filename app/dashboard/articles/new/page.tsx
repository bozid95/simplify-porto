"use client";

import { useState, useRef, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { parseMarkdownFile, downloadMarkdownFile } from "@/lib/markdown-file";
import { toast } from "sonner";

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

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = useId();
  const [saving, setSaving] = useState(false);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    published: false,
  });

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
      const fallbackTitle = file.name.replace(/\.[^/.]+$/, "");

      setForm((prev) => ({
        ...prev,
        title: prev.title || parsed.title || fallbackTitle,
        slug:
          prev.slug ||
          parsed.slug ||
          generateSlug(parsed.title || fallbackTitle),
        excerpt: prev.excerpt || parsed.excerpt || "",
        tags: prev.tags || parsed.tags || "",
        content: parsed.content,
      }));

      toast.success(`File ${file.name} berhasil dimuat!`);
    };

    reader.readAsText(file);
    // Reset file input
    e.target.value = "";
  };

  const handleExportMd = () => {
    if (!form.content.trim()) {
      toast.error("Konten artikel masih kosong untuk diekspor");
      return;
    }

    const frontmatter = [
      "---",
      `title: "${form.title || "Untitled"}"`,
      `slug: "${form.slug || generateSlug(form.title || "untitled")}"`,
      form.excerpt ? `excerpt: "${form.excerpt}"` : null,
      form.tags ? `tags: [${form.tags}]` : null,
      "---",
      "",
      form.content,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const fileName = form.slug || generateSlug(form.title || "article");
    downloadMarkdownFile(fileName, frontmatter);
    toast.success("File .md berhasil diunduh");
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from("articles").insert({
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      tags,
      published: form.published,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    if (error) {
      toast.error("Gagal membuat artikel: " + error.message);
    } else {
      toast.success("Artikel berhasil dibuat!");
      router.push("/dashboard/articles");
    }
  }

  return (
    <div className="max-w-full">
      <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
        <Link href="/dashboard/articles">
          <ArrowLeftIcon />
          Kembali ke Artikel
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Publishing
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Artikel Baru
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
                  Detail Artikel
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
                    placeholder="Judul artikel..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="judul-artikel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
                  <Textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm({ ...form, excerpt: e.target.value })
                    }
                    placeholder="Ringkasan singkat artikel..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-semibold tracking-tight">
                    Konten (Markdown)
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tulis format markdown murni atau unggah file .md Anda
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
                    placeholder="# Tulis judul atau isi artikel disini dalam format Markdown (bisa paste atau import .md file)..."
                    className="min-h-[500px] font-mono text-sm leading-relaxed p-4 border-border/50 focus-visible:ring-1 resize-y"
                  />
                ) : (
                  <div className="min-h-[500px] rounded-lg border border-border/50 bg-card/60 p-5 overflow-auto">
                    {form.content ? (
                      <MarkdownRenderer content={form.content} />
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Belum ada konten untuk ditampilkan.
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
                  Publikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="published"
                    className="cursor-pointer font-medium"
                  >
                    Terbitkan langsung
                  </Label>
                </div>
                <Separator />
                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? "Menyimpan..." : "Buat Artikel"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="w-full"
                  >
                    <Link href="/dashboard/articles">Batal</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="react, tutorial, tech"
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
