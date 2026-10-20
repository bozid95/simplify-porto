export default function NotesLoading() {
  return (
    <main data-mode="nostalgia">
      {/* Header skeleton */}
      <header className="wiki-header flex items-center justify-between pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="wiki-skeleton h-7 w-7 rounded" />
          <div className="wiki-skeleton h-5 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <div className="wiki-skeleton h-5 w-16" />
          <div className="wiki-skeleton h-5 w-16" />
          <div className="wiki-skeleton h-5 w-16" />
        </div>
      </header>

      {/* Title skeleton */}
      <div className="wiki-skeleton h-8 w-56 mb-2" />
      <div className="wiki-skeleton h-4 w-80 mb-6" />

      {/* Entry list skeletons */}
      <div className="space-y-3 my-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="wiki-entry space-y-2 py-3">
            <div className="flex justify-between items-center">
              <div className="wiki-skeleton h-5 w-64" />
              <div className="wiki-skeleton h-3 w-20" />
            </div>
            <div className="wiki-skeleton h-4 w-11/12" />
            <div className="flex gap-2 pt-1">
              <div className="wiki-skeleton h-4 w-14" />
              <div className="wiki-skeleton h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
