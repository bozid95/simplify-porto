export default function NoteDetailLoading() {
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
      <div className="wiki-skeleton h-9 w-3/4 mb-2" />
      <div className="flex gap-4 mb-6 pb-2 border-b border-[var(--wiki-border)]">
        <div className="wiki-skeleton h-4 w-32" />
        <div className="wiki-skeleton h-4 w-28" />
      </div>

      {/* Article Vector 2022 Layout: Left TOC + Content */}
      <div className="wiki-article-layout my-6">
        {/* Left TOC Skeleton */}
        <aside className="wiki-toc-aside">
          <div className="wiki-toc-sidebar space-y-2 p-3">
            <div className="wiki-skeleton h-4 w-20 mb-3" />
            <div className="wiki-skeleton h-3.5 w-full" />
            <div className="wiki-skeleton h-3.5 w-4/5" />
            <div className="wiki-skeleton h-3.5 w-5/6" />
            <div className="wiki-skeleton h-3.5 w-3/4" />
            <div className="wiki-skeleton h-3.5 w-4/5" />
          </div>
        </aside>

        {/* Content Body Skeleton */}
        <article className="min-w-0 w-full space-y-4">
          <div className="space-y-2.5">
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-11/12" />
            <div className="wiki-skeleton h-4 w-4/5" />
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-3/4" />
          </div>

          <div className="pt-4 space-y-2.5">
            <div className="wiki-skeleton h-6 w-52 mb-3" />
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-10/12" />
            <div className="wiki-skeleton h-4 w-5/6" />
          </div>
        </article>
      </div>
    </main>
  );
}
