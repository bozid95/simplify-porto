import { cn } from "@/lib/utils";

function Spotlight({
  className,
  fill = "rgba(255,255,255,0.22)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full opacity-90 blur-3xl",
        className
      )}
      style={{
        background: `radial-gradient(circle, ${fill} 0%, transparent 68%)`,
      }}
    />
  );
}

export { Spotlight };
