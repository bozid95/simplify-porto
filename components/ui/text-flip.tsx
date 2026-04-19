"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface TextFlipProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}

function TextFlip({
  text,
  className,
  as: Component = "span",
  delay = 0,
}: TextFlipProps) {
  return (
    <Component className={cn("inline-block overflow-hidden [perspective:1000px]", className)}>
      <span
        className="inline-block animate-text-flip-in [transform-origin:50%_100%]"
        style={{ animationDelay: `${delay}ms` }}
      >
        {text}
      </span>
    </Component>
  );
}

export { TextFlip };
