import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { GradientFrame } from "@/components/ui/gradient-frame";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default function BlogLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-6">
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="right-0 top-0 h-72 w-72 translate-x-1/3" fill="rgba(120,120,120,0.18)" />
        <Spotlight className="left-0 top-1/3 h-80 w-80 -translate-x-1/4" fill="rgba(160,160,160,0.14)" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Button variant="ghost" size="sm" className="mb-8 gap-2 disabled:opacity-50">
           <ArrowLeftIcon />
           Back
        </Button>

        <div className="mb-10 max-w-2xl space-y-3">
          <Skeleton className="h-3 w-28 rounded-full bg-muted/70" />
          <Skeleton className="h-12 w-40 rounded-full bg-muted/80" />
          <Skeleton className="h-4 w-full max-w-xl rounded-full bg-muted/70" />
          <Skeleton className="h-4 w-4/5 max-w-lg rounded-full bg-muted/70" />
        </div>

        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GradientFrame key={i}>
              <Card className="rounded-[calc(1.75rem-1px)] border-0 bg-card/70 py-0 shadow-none">
                <CardHeader className="pb-3 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <Skeleton className="h-7 w-1/2 rounded-full bg-muted/80" />
                    <Skeleton className="h-7 w-24 shrink-0 rounded-full bg-muted/75" />
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-4 space-y-2">
                    <Skeleton className="h-4 w-full rounded-full bg-muted/70" />
                    <Skeleton className="h-4 w-3/4 rounded-full bg-muted/70" />
                    <Skeleton className="h-4 w-2/3 rounded-full bg-muted/70" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-12 rounded-full bg-muted/75" />
                    <Skeleton className="h-6 w-16 rounded-full bg-muted/75" />
                    <Skeleton className="h-6 w-14 rounded-full bg-muted/75" />
                  </div>
                </CardContent>
              </Card>
            </GradientFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
