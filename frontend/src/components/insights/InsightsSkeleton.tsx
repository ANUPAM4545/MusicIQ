export function InsightsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Summary Skeleton */}
      <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[160px]" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={`insight-skel-${i}`} className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[180px]" />
        ))}
      </div>

      {/* Recommendations Skeleton */}
      <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[280px]" />
    </div>
  );
}
