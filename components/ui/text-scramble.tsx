"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function scrambleText(text: string, progress: number) {
  const revealCount = Math.floor(text.length * progress);

  return text
    .split("")
    .map((char, index) => {
      if (char === " " || /[.,/&()-]/.test(char)) return char;
      if (index < revealCount) return text[index];
      return randomChar();
    })
    .join("");
}

function TextScramble({
  text,
  className,
  as: Component = "span",
  duration = 900,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  delay?: number;
}) {
  const [displayText, setDisplayText] = React.useState(text);

  React.useEffect(() => {
    let frame = 0;
    let rafId = 0;
    let timeoutId = 0;
    const totalFrames = Math.max(12, Math.floor(duration / 32));

    timeoutId = window.setTimeout(() => {
      const tick = () => {
        frame += 1;
        const progress = Math.min(frame / totalFrames, 1);
        setDisplayText(scrambleText(text, progress));

        if (progress < 1) {
          rafId = window.setTimeout(tick, 32);
        }
      };

      setDisplayText(scrambleText(text, 0));
      tick();
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(rafId);
    };
  }, [text, duration, delay]);

  return <Component className={cn(className)}>{displayText}</Component>;
}

export { TextScramble };
