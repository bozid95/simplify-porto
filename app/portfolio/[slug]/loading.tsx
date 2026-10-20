export default function ProjectDetailLoading() {
  return (
    <main data-mode="nostalgia">
      {/* Header skeleton */}
      <header className="wiki-header flex items-center justify-between pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="wiki-skeleton h-7 w-7 rounded" />
          <div className="wiki-skeleton h-5 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <div className="wiki-skeleton h-5 w-16" />
          <div className="wiki-skeleton h-5 w-16" />
          <div className="wiki-skeleton h-5 w-16" />
        </div>
      </header>

      {/* Main Title skeleton */}
      <div className="wiki-skeleton h-9 w-2/3 mb-4 pb-2 border-b border-[var(--wiki-border)]" />

      {/* Layout with Left TOC + Floating Image + Content */}
      <div className="wiki-article-layout my-6">
        {/* Left TOC Skeleton */}
        <aside className="wiki-toc-aside">
          <div className="wiki-toc-sidebar space-y-2 p-3">
            <div className="wiki-skeleton h-4 w-20 mb-3" />
            <div className="wiki-skeleton h-3.5 w-full" />
            <div className="wiki-skeleton h-3.5 w-4/5" />
            <div className="wiki-skeleton h-3.5 w-5/6" />
            <div className="wiki-skeleton h-3.5 w-3/4" />
          </div>
        </aside>

        {/* Content Body with floating thumbnail Skeleton */}
        <article className="min-w-0 w-full space-y-4">
          {/* Floating Thumbnail Skeleton */}
          <div className="wiki-thumb-right">
            <div className="wiki-skeleton h-44 w-full mb-2" />
            <div className="wiki-skeleton h-3 w-3/4 mx-auto" />
          </div>

          <div className="space-y-2.5">
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-5/6" />
            <div className="wiki-skeleton h-4 w-4/5" />
            <div className="wiki-skeleton h-4 w-11/12" />
          </div>

          <div className="wiki-entry my-4 py-2 space-y-2">
            <div className="wiki-skeleton h-4 w-48" />
          </div>

          <div className="pt-4 space-y-2.5">
            <div className="wiki-skeleton h-6 w-44 mb-3" />
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-10/12" />
          </div>
        </article>
      </div>
    </main>
  );
}
