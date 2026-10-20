"use client";

import React, { useState, useEffect } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractTocFromMarkdown(content: string): TocItem[] {
  if (!content) return [];
  const lines = content.split(/\r?\n/);
  const items: TocItem[] = [];
  const idCounts = new Map<string, number>();

  // Skip leading H1 if present
  let hasSkippedFirstH1 = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!hasSkippedFirstH1 && /^#\s+/.test(trimmed)) {
      hasSkippedFirstH1 = true;
      continue;
    }

    const match = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (match) {
      const level = match[1].length;
      // Remove any markdown links or styling inside heading text
      const rawText = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .trim();

      let slug = rawText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (!slug) slug = `section-${items.length + 1}`;

      const count = idCounts.get(slug) || 0;
      idCounts.set(slug, count + 1);
      const finalId = count > 0 ? `${slug}-${count}` : slug;

      items.push({
        id: finalId,
        text: rawText,
        level,
      });
    }
  }

  return items;
}

export function WikiTableOfContents({
  content,
  items: propItems,
  pageTitle,
}: {
  content?: string;
  items?: TocItem[];
  pageTitle?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>("");

  const items = React.useMemo(() => {
    if (propItems) return propItems;
    if (content) return extractTocFromMarkdown(content);
    return [];
  }, [propItems, content]);

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentActive = "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY - 120;
          if (scrollY >= top) {
            currentActive = item.id;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="wiki-toc-sidebar" aria-label="Table of Contents">
      <div className="wiki-toc-header">
        <span className="wiki-toc-title">Contents</span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="wiki-toc-toggle"
        >
          {isOpen ? "hide" : "show"}
        </button>
      </div>

      {isOpen && (
        <ul className="wiki-toc-list">
          {pageTitle && (
            <li className="wiki-toc-item">
              <a
                href="#top"
                className={`wiki-toc-link ${!activeId ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                (Top)
              </a>
            </li>
          )}
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`wiki-toc-item level-${item.level} ${
                  isActive ? "is-active" : ""
                }`}
              >
                <a
                  href={`#${item.id}`}
                  className={`wiki-toc-link ${isActive ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      const yOffset = -80;
                      const y =
                        target.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
