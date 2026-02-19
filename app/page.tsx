import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

// SVG Icons as components
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

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
  twitter?: string;
  email?: string;
  [key: string]: string | undefined;
}

export default async function Home() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .single();

  const name = profile?.name || "Your Name";
  const tagline = profile?.tagline || "Software Developer";
  const bio = profile?.bio || "Hello! I build things on the internet.";
  const avatarUrl = profile?.avatar_url || "";
  const socialLinks: SocialLinks = (profile?.social_links as SocialLinks) || {};

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8">
          {/* Avatar */}
          <Avatar className="h-24 w-24 ring-2 ring-border/50 ring-offset-2 ring-offset-background">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Name & Tagline */}
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{tagline}</p>
          </div>

          {/* Bio */}
          <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-xs">
            {bio}
          </p>

          <Separator className="w-full opacity-50" />

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              variant="outline"
              className="w-full h-12 justify-start gap-3 text-sm font-medium"
              asChild
            >
              <Link href="/portfolio">
                <FolderIcon />
                Portfolio
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 justify-start gap-3 text-sm font-medium"
              asChild
            >
              <Link href="/blog">
                <PenIcon />
                Blog
              </Link>
            </Button>
          </div>

          <Separator className="w-full opacity-50" />

          {/* Social Links */}
          <div className="flex gap-2">
            {socialLinks.github && (
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" asChild>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                </a>
              </Button>
            )}
            {socialLinks.linkedin && (
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" asChild>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon />
                </a>
              </Button>
            )}
            {socialLinks.twitter && (
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" asChild>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </a>
              </Button>
            )}
            {socialLinks.email && (
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" asChild>
                <a href={`mailto:${socialLinks.email}`}>
                  <MailIcon />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
