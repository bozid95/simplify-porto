import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Spotlight } from "@/components/ui/spotlight";
import { GradientFrame } from "@/components/ui/gradient-frame";

export default function HomeLoading() {
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

      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <GradientFrame className="w-full max-w-lg">
          <Card className="relative w-full overflow-hidden rounded-[calc(2rem-1px)] border-0 bg-card/75 py-0 shadow-none">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <CardContent className="relative flex flex-col gap-7 px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-7 w-28 rounded-full bg-muted/80" />
              </div>

              <div className="flex flex-col items-center gap-5 text-center">
                <Skeleton className="h-24 w-24 rounded-full bg-muted/80" />

                <div className="flex w-full flex-col items-center space-y-2">
                  <Skeleton className="h-9 w-48 rounded-full bg-muted/80" />
                  <Skeleton className="h-4 w-32 rounded-full bg-muted/70" />
                </div>

                <div className="flex w-full max-w-sm flex-col items-center gap-2">
                  <Skeleton className="h-4 w-full rounded-full bg-muted/70" />
                  <Skeleton className="h-4 w-5/6 rounded-full bg-muted/70" />
                </div>
              </div>

              <Separator className="w-full opacity-60" />

              <div className="grid gap-3">
                <Skeleton className="h-20 w-full rounded-2xl bg-muted/75" />
                <Skeleton className="h-20 w-full rounded-2xl bg-muted/75" />
              </div>

              <Separator className="w-full opacity-60" />

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/55 px-3 py-3 backdrop-blur-sm">
                <Skeleton className="h-4 w-16 rounded-full bg-muted/70" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-muted/75" />
                  <Skeleton className="h-10 w-10 rounded-full bg-muted/75" />
                  <Skeleton className="h-10 w-10 rounded-full bg-muted/75" />
                  <Skeleton className="h-10 w-10 rounded-full bg-muted/75" />
                </div>
              </div>
            </CardContent>
          </Card>
        </GradientFrame>
      </div>
    </div>
  );
}
