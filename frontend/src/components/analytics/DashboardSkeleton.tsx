export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={`stat-skel-${i}`} className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[104px]" />
        ))}
      </div>

      {/* Charts Row 1 Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[400px]" />
        <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[400px]" />
      </div>

      {/* Chart Row 2 Skeleton */}
      <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[400px]" />

      {/* Lists Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[350px]" />
        <div className="bg-white p-6 rounded-xl border shadow-sm animate-pulse h-[350px]" />
      </div>
    </div>
  );
}
