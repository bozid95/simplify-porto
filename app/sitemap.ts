import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://widodo.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Fetch articles
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, updated_at, created_at")
    .eq("published", true);

  // Fetch projects
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, id, updated_at, created_at")
    .eq("visibility", "public");

  const articleEntries: MetadataRoute.Sitemap = (articles || []).map(
    (article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updated_at || article.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = (projects || []).map(
    (project) => ({
      url: `${BASE_URL}/portfolio/${project.slug || project.id}`,
      lastModified: new Date(project.updated_at || project.created_at),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...projectEntries,
    ...articleEntries,
  ];
}
