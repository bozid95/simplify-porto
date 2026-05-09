"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export function PageNav({
  backHref,
  backLabel,
  modeHref,
  modeLabel,
}: {
  backHref: string;
  backLabel: string;
  modeHref?: string;
  modeLabel?: string;
}) {
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 56);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 rounded-full border border-border/60 bg-background/70 px-4 backdrop-blur-sm"
          asChild
        >
          <Link href={backHref}>
            <ArrowLeftIcon />
            {backLabel}
          </Link>
        </Button>
        <div className="flex shrink-0 items-center gap-2">
          {modeHref && modeLabel && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/60 bg-background/70 px-4 backdrop-blur-sm"
              asChild
            >
              <Link href={modeHref}>{modeLabel}</Link>
            </Button>
          )}
          <ThemeToggle className="shrink-0" />
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-3 z-30 transition-all duration-300",
          showFloatingNav ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="pointer-events-auto gap-2 rounded-full border border-border/60 bg-background/72 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            asChild
          >
            <Link href={backHref}>
              <ArrowLeftIcon />
              {backLabel}
            </Link>
          </Button>
          <div className="flex shrink-0 items-center gap-2">
            {modeHref && modeLabel && (
              <Button
                variant="outline"
                size="sm"
                className="pointer-events-auto rounded-full border-border/60 bg-background/72 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
                asChild
              >
                <Link href={modeHref}>{modeLabel}</Link>
              </Button>
            )}
            <ThemeToggle className="pointer-events-auto shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
}
