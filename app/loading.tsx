export default function HomeLoading() {
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

      {/* Title skeleton */}
      <div className="wiki-skeleton h-8 w-48 mb-3" />
      <div className="wiki-skeleton h-4 w-72 mb-6" />

      {/* Grid content */}
      <div className="wiki-content-grid">
        {/* Main body skeleton */}
        <div className="min-w-0 space-y-4">
          <div className="space-y-2">
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-5/6" />
            <div className="wiki-skeleton h-4 w-4/6" />
          </div>

          <div className="pt-4">
            <div className="wiki-skeleton h-6 w-40 mb-3" />
            <div className="space-y-2">
              <div className="wiki-skeleton h-4 w-full" />
              <div className="wiki-skeleton h-4 w-10/12" />
              <div className="wiki-skeleton h-4 w-3/4" />
            </div>
          </div>

          <div className="pt-4">
            <div className="wiki-skeleton h-6 w-36 mb-3" />
            <div className="space-y-2">
              <div className="wiki-skeleton h-4 w-full" />
              <div className="wiki-skeleton h-4 w-11/12" />
              <div className="wiki-skeleton h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Infobox skeleton */}
        <aside className="wiki-infobox">
          <div className="p-3 border-b border-[var(--wiki-border)]">
            <div className="wiki-skeleton h-5 w-28 mx-auto" />
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="wiki-skeleton h-32 w-32 rounded-full mb-3" />
            <div className="wiki-skeleton h-3 w-20" />
          </div>
          <div className="p-3 space-y-2 border-t border-[var(--wiki-border-light)]">
            <div className="wiki-skeleton h-4 w-full" />
            <div className="wiki-skeleton h-4 w-4/5" />
            <div className="wiki-skeleton h-4 w-3/4" />
          </div>
        </aside>
      </div>
    </main>
  );
}
