import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8">
          {/* Avatar Skeleton */}
          <Skeleton className="h-24 w-24 rounded-full ring-2 ring-border/50 ring-offset-2 ring-offset-background" />

          {/* Name & Tagline Skeleton */}
          <div className="text-center space-y-2 flex flex-col items-center w-full">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Bio Skeleton */}
          <div className="space-y-1 w-full flex flex-col items-center">
             <Skeleton className="h-4 w-64" />
             <Skeleton className="h-4 w-56" />
          </div>

          <Separator className="w-full opacity-50" />

          {/* Navigation Links Skeleton */}
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>

          <Separator className="w-full opacity-50" />

          {/* Social Links Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
