import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Spotlight } from "@/components/ui/spotlight";
import { GradientFrame } from "@/components/ui/gradient-frame";
import { Card3D } from "@/components/ui/card-3d";

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <path d="m12 12 4 10 1.7-4.3L22 16Z" />
    </svg>
  );
}

interface SocialLinks {
  github?: string;
  linkedin?: string;
  threads?: string;
  email?: string;
  [key: string]: string | undefined;
}

interface SocialItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  external: boolean;
}

interface SocialItemCandidate extends Omit<SocialItem, "href"> {
  href?: string;
}

interface ProjectStackSource {
  tech_stack?: string[] | null;
}

interface StackLogoItem {
  name: string;
  slug: string;
  color?: string;
}

const stackLogoMap: Record<string, StackLogoItem> = {
  nextjs: { name: "Next.js", slug: "nextdotjs", color: "000000" },
  next: { name: "Next.js", slug: "nextdotjs", color: "000000" },
  react: { name: "React", slug: "react", color: "61DAFB" },
  vue: { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  vuejs: { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  typescript: { name: "TypeScript", slug: "typescript", color: "3178C6" },
  ts: { name: "TypeScript", slug: "typescript", color: "3178C6" },
  javascript: { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  js: { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  tailwindcss: { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  tailwind: { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  supabase: { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  postgresql: { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  postgres: { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  nodejs: { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  node: { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  nest: { name: "NestJS", slug: "nestjs", color: "E0234E" },
  nestjs: { name: "NestJS", slug: "nestjs", color: "E0234E" },
  express: { name: "Express", slug: "express", color: "FFFFFF" },
  mongodb: { name: "MongoDB", slug: "mongodb", color: "47A248" },
  redis: { name: "Redis", slug: "redis", color: "FF4438" },
  prisma: { name: "Prisma", slug: "prisma", color: "2D3748" },
  framermotion: { name: "Framer Motion", slug: "framer", color: "0055FF" },
  framer: { name: "Framer Motion", slug: "framer", color: "0055FF" },
  firebase: { name: "Firebase", slug: "firebase", color: "FFCA28" },
  vercel: { name: "Vercel", slug: "vercel", color: "FFFFFF" },
  github: { name: "GitHub", slug: "github", color: "FFFFFF" },
  figma: { name: "Figma", slug: "figma", color: "F24E1E" },
  docker: { name: "Docker", slug: "docker", color: "2496ED" },
  graphql: { name: "GraphQL", slug: "graphql", color: "E10098" },
  laravel: { name: "Laravel", slug: "laravel", color: "FF2D20" },
  php: { name: "PHP", slug: "php", color: "777BB4" },
  go: { name: "Go", slug: "go", color: "00ADD8" },
  golang: { name: "Go", slug: "go", color: "00ADD8" },
  n8n: { name: "n8n", slug: "n8n", color: "EA4B71" },
};

function normalizeTechKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function resolveStackLogo(label: string): StackLogoItem | null {
  return stackLogoMap[normalizeTechKey(label)] ?? null;
}

function truncateText(text?: string | null, maxLength = 120) {
  const value = text?.trim();
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const supabase = await createClient();
  const [
    { data: profile },
    { data: featuredProject },
    { data: latestArticle },
    { data: stackProjects },
    { data: nostalgiaProjects },
    { data: nostalgiaArticles },
    { count: totalProjects },
    { count: totalArticles },
  ] = await Promise.all([
    supabase.from("profiles").select("*").single(),
    supabase
      .from("projects")
      .select("id, slug, title, description")
      .eq("visibility", "public")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("articles")
      .select("slug, title, excerpt")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("projects")
      .select("tech_stack")
      .eq("visibility", "public")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(18),
    supabase
      .from("projects")
      .select("id, slug, title, description, live_url, repo_url")
      .eq("visibility", "public")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("articles")
      .select("slug, title, excerpt")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("visibility", "public"),
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
  ]);

  const name = profile?.name || "Your Name";
  const tagline = profile?.tagline || "Software Developer";
  const bio = profile?.bio || "Hello! I build things on the internet.";
  const avatarUrl = profile?.avatar_url || "";
  const socialLinks: SocialLinks = (profile?.social_links as SocialLinks) || {};
  const emailHref = socialLinks.email ? `mailto:${socialLinks.email}` : "";
  const featuredProjectHref = featuredProject ? `/portfolio/${featuredProject.slug || featuredProject.id}` : "/portfolio";
  const latestArticleHref = latestArticle ? `/notes/${latestArticle.slug}` : "/notes";

  const socialItemCandidates: SocialItemCandidate[] = [
    {
      href: socialLinks.github,
      label: "GitHub",
      icon: <GithubIcon />,
      external: true,
    },
    {
      href: socialLinks.linkedin,
      label: "LinkedIn",
      icon: <LinkedinIcon />,
      external: true,
    },
    {
      href: socialLinks.threads,
      label: "Threads",
      icon: <ThreadsIcon />,
      external: true,
    },
    {
      href: emailHref || undefined,
      label: "Email",
      icon: <MailIcon />,
      external: false,
    },
  ];

  const socialItems: SocialItem[] = socialItemCandidates.filter(
    (item): item is SocialItem => Boolean(item.href)
  );

  if (mode !== "modern") {
    return (
      <main data-mode="nostalgia">
        <p data-nostalgia-modern>
          <Link href="/?mode=modern">Modern Mode</Link>
        </p>
        <h1>{name}</h1>
        <p>{tagline}</p>
        <p>
          {socialItems.map((item, index) => (
            <span key={item.label}>
              {index > 0 && " | "}
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </a>
            </span>
          ))}
        </p>
        <hr />

        <p>{bio}</p>

        <hr />

        <h2>
          Recent Notes (<Link href="/notes">All</Link>)
        </h2>
        {nostalgiaArticles && nostalgiaArticles.length > 0 ? (
          <ul>
            {nostalgiaArticles.map((article) => (
              <li key={article.slug}>
                <Link href={`/notes/${article.slug}`}>
                  {article.title}
                </Link>
                {truncateText(article.excerpt, 110) ? `: ${truncateText(article.excerpt, 110)}` : ""}
                {" "}
                <Link href={`/notes/${article.slug}`}>Read more...</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes yet.</p>
        )}

        <hr />

        <h2>
          Projects (<Link href="/portfolio">All</Link>)
        </h2>
        {nostalgiaProjects && nostalgiaProjects.length > 0 ? (
          <ul>
            {nostalgiaProjects.map((project) => (
              <li key={project.id}>
                <Link href={`/portfolio/${project.slug || project.id}`}>
                  {project.title}
                </Link>
                {truncateText(project.description, 110) ? `: ${truncateText(project.description, 110)}` : ""}
                {" "}
                <Link href={`/portfolio/${project.slug || project.id}`}>Read more...</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects yet.</p>
        )}

        <hr />
        <p>Copyright (C) {new Date().getFullYear()} {name}.</p>
      </main>
    );
  }

  const stackCloud = Array.from(
    ((stackProjects as ProjectStackSource[] | null) ?? []).reduce((map, project) => {
      for (const rawTech of project.tech_stack ?? []) {
        const tech = rawTech.trim();
        if (!tech) continue;

        const resolved = resolveStackLogo(tech);
        const key = resolved?.slug ?? normalizeTechKey(tech);
        const existing = map.get(key);

        map.set(key, {
          count: (existing?.count ?? 0) + 1,
          rawName: existing?.rawName ?? tech,
          displayName: resolved?.name ?? existing?.displayName ?? tech,
          logoUrl: resolved
            ? `https://cdn.simpleicons.org/${resolved.slug}/${resolved.color ?? "currentColor"}`
            : existing?.logoUrl ?? null,
        });
      }

      return map;
    }, new Map<string, {
      count: number;
      rawName: string;
      displayName: string;
      logoUrl: string | null;
    }>())
  )
    .map(([, item]) => item)
    .sort((a, b) => b.count - a.count || a.displayName.localeCompare(b.displayName))
    .filter((item) => item.logoUrl);
  const stackCloudLoop = stackCloud.length > 0 ? [...stackCloud, ...stackCloud] : [];

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="left-1/2 top-0 h-72 w-72 -translate-x-[130%]" fill="rgba(120,120,120,0.18)" />
        <Spotlight className="right-0 top-1/3 h-80 w-80 translate-x-1/4" fill="rgba(160,160,160,0.14)" />
        <Spotlight className="bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 translate-y-1/3" fill="rgba(120,120,120,0.12)" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_32%),linear-gradient(to_bottom,_transparent,_rgba(0,0,0,0.04))]" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <GradientFrame className="w-full max-w-lg">
            <Card className="relative w-full overflow-hidden rounded-[calc(2rem-1px)] border-0 bg-card/75 py-0 shadow-none">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_32%,transparent_65%,rgba(255,255,255,0.1))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,transparent_65%,rgba(255,255,255,0.04))]" />
              <Spotlight className="-left-8 top-8 h-40 w-40" fill="rgba(255,255,255,0.16)" />

              <CardContent className="relative flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
                    Portfolio & Notes
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full border border-border/60 bg-background/70 px-3 text-xs"
                      asChild
                    >
                      <Link href="/">Nostalgia Mode</Link>
                    </Button>
                    <ThemeToggle className="shrink-0" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                  <Card3D className="relative">
                    <div className="relative rounded-full p-2">
                      <div className="absolute inset-1 rounded-full bg-primary/15 blur-xl" />
                      <div className="relative rounded-full border border-border/60 bg-background/55 p-1.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-sm [transform-style:preserve-3d]">
                        <Avatar className="relative h-20 w-20 border border-border/60 ring-4 ring-background/80 shadow-lg [transform:translateZ(48px)]">
                          <AvatarImage src={avatarUrl} alt={name} />
                          <AvatarFallback className="bg-muted text-xl font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </Card3D>

                  <div className="space-y-1.5">
                    <h1 className="animate-fade-up-soft animate-glow-in-soft text-[1.55rem] font-semibold tracking-tight sm:text-[1.7rem]">
                      {name}
                    </h1>
                    <p className="animate-fade-up-soft animate-glow-in-soft delay-100 text-sm font-medium text-muted-foreground/90">
                      {tagline}
                    </p>
                  </div>

                  <p className="animate-fade-up-soft animate-glow-in-soft delay-180 line-clamp-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    {bio}
                  </p>
                </div>

                {stackCloud.length > 0 && (
                  <div className="animate-fade-up-soft animate-glow-in-soft delay-260 relative overflow-hidden rounded-full border border-border/35 bg-background/20 px-2 py-1 backdrop-blur-[2px] dark:border-white/10 dark:bg-white/5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background/95 via-background/70 to-transparent" />

                    <div
                      className="flex w-max min-w-full items-center gap-2 hover:[animation-play-state:paused]"
                      style={{
                        animation: "logo-marquee 13s linear infinite",
                      }}
                    >
                      {stackCloudLoop.map((tech, index) => (
                        <div
                          key={`${tech.rawName}-${index}`}
                          className="group relative flex shrink-0 items-center gap-1.5 rounded-full px-1.5 py-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border/50 bg-background/80">
                            <Image
                              src={tech.logoUrl ?? ""}
                              alt={tech.displayName}
                              width={12}
                              height={12}
                              className="h-[12px] w-[12px] object-contain opacity-90"
                              unoptimized
                            />
                          </div>
                          <span className="text-[11px] font-medium">
                            {tech.displayName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="w-full opacity-50" />

                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="group animate-fade-up-soft animate-glow-in-soft delay-100 h-auto w-full justify-start rounded-2xl border-border/70 bg-background/70 px-3 py-2.5 text-left shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/95 hover:shadow-lg sm:px-4 sm:py-3"
                    asChild
                  >
                    <Link href="/portfolio?mode=modern" className="flex min-w-0 items-center gap-3">
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-foreground sm:h-10 sm:w-10">
                        <FolderIcon />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-border/70 bg-background px-1 text-[10px] font-semibold leading-none text-foreground shadow-sm">
                          {totalProjects ?? 0}
                        </span>
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col items-start">
                        <span className="min-w-0 text-sm font-semibold">Portfolio</span>
                        <span className="text-xs font-normal leading-5 text-muted-foreground">
                          Selected work and case studies
                        </span>
                      </span>
                      <span className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRightIcon />
                      </span>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="group animate-fade-up-soft animate-glow-in-soft delay-180 h-auto w-full justify-start rounded-2xl border-border/70 bg-background/70 px-3 py-2.5 text-left shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/95 hover:shadow-lg sm:px-4 sm:py-3"
                    asChild
                  >
                    <Link href="/notes?mode=modern" className="flex min-w-0 items-center gap-3">
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-foreground sm:h-10 sm:w-10">
                        <PenIcon />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-border/70 bg-background px-1 text-[10px] font-semibold leading-none text-foreground shadow-sm">
                          {totalArticles ?? 0}
                        </span>
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col items-start">
                        <span className="min-w-0 text-sm font-semibold">Notes</span>
                        <span className="text-xs font-normal leading-5 text-muted-foreground">
                          Notes and writing
                        </span>
                      </span>
                      <span className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRightIcon />
                      </span>
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Link
                    href={`${featuredProjectHref}?mode=modern`}
                    className="group animate-fade-up-soft animate-glow-in-soft delay-180 block h-full"
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-background/45 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/80 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.45)]">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Featured Project
                        </p>
                        <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRightIcon />
                        </span>
                      </div>
                      <h2 className="mb-1 min-h-[2.5rem] text-sm font-semibold leading-5">
                        {featuredProject?.title || "See the latest selected project"}
                      </h2>
                      <p className="line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-muted-foreground">
                        {featuredProject?.description || "A closer look at recent work, process, and outcomes."}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`${latestArticleHref}?mode=modern`}
                    className="group animate-fade-up-soft animate-glow-in-soft delay-260 block h-full"
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-background/45 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/80 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.45)]">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Latest Note
                        </p>
                        <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRightIcon />
                        </span>
                      </div>
                      <h2 className="mb-1 min-h-[2.5rem] text-sm font-semibold leading-5">
                        {latestArticle?.title || "Read the latest note"}
                      </h2>
                      <p className="line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-muted-foreground">
                        {latestArticle?.excerpt || "Thoughts, notes, and things worth sharing from recent work."}
                      </p>
                    </div>
                  </Link>
                </div>

                {socialItems.length > 0 && (
                  <div className="animate-fade-up-soft animate-glow-in-soft delay-260 flex items-center justify-center gap-1.5">
                    {socialItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full border border-transparent bg-background/30 text-muted-foreground/75 transition-all hover:border-border/60 hover:bg-background/55 hover:text-foreground"
                        asChild
                      >
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          aria-label={item.label}
                          title={item.label}
                        >
                          {item.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </GradientFrame>

      </div>
    </div>
  );
}
