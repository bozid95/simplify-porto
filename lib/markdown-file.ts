export type ParsedMarkdown = {
  content: string;
  title?: string;
  excerpt?: string;
  description?: string;
  tags?: string;
  tech_stack?: string;
  slug?: string;
  live_url?: string;
  repo_url?: string;
  image_url?: string;
};

/**
 * Parses markdown text, extracting optional YAML frontmatter.
 */
export function parseMarkdownFile(rawText: string): ParsedMarkdown {
  const text = rawText.trim();
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = frontmatterRegex.exec(text);

  if (!match) {
    const firstH1 = text.match(/^#\s+(.+)$/m);
    const title = firstH1 ? firstH1[1].trim() : undefined;
    return {
      content: text,
      title,
    };
  }

  const frontmatter = match[1];
  const content = match[2].trim();

  let title: string | undefined;
  let excerpt: string | undefined;
  let description: string | undefined;
  let tags: string | undefined;
  let tech_stack: string | undefined;
  let slug: string | undefined;
  let live_url: string | undefined;
  let repo_url: string | undefined;
  let image_url: string | undefined;

  for (const line of frontmatter.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim().toLowerCase();
    let val = line.slice(colonIdx + 1).trim();

    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    if (key === "title") title = val;
    else if (key === "excerpt") {
      excerpt = val;
      if (!description) description = val;
    } else if (key === "description") {
      description = val;
      if (!excerpt) excerpt = val;
    } else if (key === "slug") slug = val;
    else if (key === "tags") {
      val = val.replace(/^\[|\]$/g, "");
      tags = val;
    } else if (key === "tech_stack" || key === "techstack" || key === "tech") {
      val = val.replace(/^\[|\]$/g, "");
      tech_stack = val;
    } else if (key === "live_url" || key === "live") live_url = val;
    else if (key === "repo_url" || key === "repo" || key === "github")
      repo_url = val;
    else if (key === "image_url" || key === "image") image_url = val;
  }

  return {
    content,
    title,
    excerpt,
    description,
    tags,
    tech_stack,
    slug,
    live_url,
    repo_url,
    image_url,
  };
}

/**
 * Downloads a string as a .md file in the browser.
 */
export function downloadMarkdownFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
