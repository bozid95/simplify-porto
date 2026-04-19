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
import { TextFlip } from "@/components/ui/text-flip";
import { TextScramble } from "@/components/ui/text-scramble";

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
  twitter?: string;
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
      href: socialLinks.twitter,
      label: "Twitter",
      icon: <TwitterIcon />,
      external: true,
    },
    {
      href: socialLinks.email ? `mailto:${socialLinks.email}` : undefined,
      label: "Email",
      icon: <MailIcon />,
      external: false,
    },
  ];
  const socialItems: SocialItem[] = socialItemCandidates.filter(
    (item): item is SocialItem => Boolean(item.href)
  );

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

      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <Card3D className="w-full max-w-lg">
          <GradientFrame className="w-full max-w-lg">
            <Card className="relative w-full overflow-hidden rounded-[calc(2rem-1px)] border-0 bg-card/75 py-0 shadow-none">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_32%,transparent_65%,rgba(255,255,255,0.1))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,transparent_65%,rgba(255,255,255,0.04))]" />
              <Spotlight className="-left-8 top-8 h-40 w-40" fill="rgba(255,255,255,0.16)" />

              <CardContent className="relative flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-7">
                <div className="flex items-start justify-between gap-4 [transform:translateZ(30px)]">
                <div className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
                  Portfolio & Notes
                </div>
              </div>

                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative [transform:translateZ(60px)]">
                    <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
                    <Avatar className="relative h-24 w-24 border border-border/60 ring-4 ring-background/80 shadow-lg">
                      <AvatarImage src={avatarUrl} alt={name} />
                      <AvatarFallback className="bg-muted text-2xl font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="space-y-1.5 [transform:translateZ(50px)]">
                    <TextFlip
                      text={name}
                      as="h1"
                      delay={80}
                      className="text-[1.7rem] font-semibold tracking-tight sm:text-[1.85rem]"
                    />
                    <p className="animate-fade-up-soft delay-100 text-sm font-medium text-muted-foreground/90">
                      {tagline}
                    </p>
                  </div>

                  <TextScramble
                    text={bio}
                    as="p"
                    className="max-w-sm text-sm leading-6 text-muted-foreground [transform:translateZ(40px)]"
                    duration={700}
                    delay={170}
                  />
                </div>

                <Separator className="w-full opacity-60" />

                <div className="grid gap-2.5 [transform:translateZ(35px)]">
                  <Button
                    variant="outline"
                    className="group animate-fade-up-soft animate-glow-in-soft delay-100 h-auto w-full justify-start rounded-2xl border-border/70 bg-background/70 px-4 py-3.5 text-left shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/95 hover:shadow-lg"
                    asChild
                  >
                    <Link href="/portfolio">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                        <FolderIcon />
                      </span>
                      <span className="flex flex-1 flex-col items-start">
                        <span className="text-sm font-semibold">Portfolio</span>
                        <span className="text-xs font-normal text-muted-foreground">Selected work, case studies, and experiments</span>
                      </span>
                      <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRightIcon />
                      </span>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="group animate-fade-up-soft animate-glow-in-soft delay-180 h-auto w-full justify-start rounded-2xl border-border/70 bg-background/70 px-4 py-3.5 text-left shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/95 hover:shadow-lg"
                    asChild
                  >
                    <Link href="/blog">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                        <PenIcon />
                      </span>
                      <span className="flex flex-1 flex-col items-start">
                        <span className="text-sm font-semibold">Blog</span>
                        <span className="text-xs font-normal text-muted-foreground">Notes, writing, and things worth sharing</span>
                      </span>
                      <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRightIcon />
                      </span>
                    </Link>
                  </Button>
                </div>

                {socialItems.length > 0 && (
                  <>
                    <Separator className="w-full opacity-60" />

                    <div className="animate-fade-up-soft animate-glow-in-soft delay-260 flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/55 px-3 py-2.5 backdrop-blur-sm [transform:translateZ(30px)]">
                      <p className="pl-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Connect
                      </p>
                      <div className="flex flex-wrap justify-end gap-2">
                        {socialItems.map((item) => (
                          <Button
                            key={item.label}
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full border border-transparent bg-background/70 transition-all hover:border-border hover:bg-background"
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
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </GradientFrame>
        </Card3D>
      </div>
    </div>
  );
}
