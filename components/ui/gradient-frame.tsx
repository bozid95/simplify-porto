import * as React from "react";

import { cn } from "@/lib/utils";

function GradientFrame({
  className,
  innerClassName,
  children,
}: React.ComponentProps<"div"> & {
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "group/frame relative rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(255,255,255,0.06)_28%,rgba(255,255,255,0.12)_52%,rgba(255,255,255,0.04)_100%)] p-px shadow-[0_20px_80px_rgba(0,0,0,0.10)] transition-all duration-300",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-[-2px] rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),transparent_36%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.16),transparent_34%)] opacity-70 blur-xl transition-opacity duration-300 group-hover/frame:opacity-100" />
      <div
        className={cn(
          "relative rounded-[calc(2rem-1px)] bg-background/55 backdrop-blur-xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { GradientFrame };
