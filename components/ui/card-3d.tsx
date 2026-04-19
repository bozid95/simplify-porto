"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Card3D({
  className,
  children,
}: React.ComponentProps<"div">) {
  const [transform, setTransform] = React.useState(
    "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((0.5 - y / rect.height)) * 14;

    setTransform(
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    );
  }

  function handleLeave() {
    setTransform(
      "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  }

  return (
    <div
      className={cn("group/card3d relative [perspective:1400px]", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{ transform }}
      >
        {children}
      </div>
    </div>
  );
}

export { Card3D };
