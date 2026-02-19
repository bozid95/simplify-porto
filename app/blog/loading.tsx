import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl py-8">
        {/* Back Button Skeleton */}
        <Button variant="ghost" size="sm" className="mb-8 gap-2 disabled:opacity-50">
           <ArrowLeftIcon />
           Back
        </Button>

        <h1 className="text-2xl font-bold tracking-tight mb-8">Blog</h1>

        {/* Articles List Skeleton */}
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-24 shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
