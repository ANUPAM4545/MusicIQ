export function AlbumSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow animate-pulse">
      <div className="aspect-square bg-gray-200 w-full" />
      <div className="flex flex-col p-4 flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="pt-2 mt-auto">
          <div className="h-9 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
}
