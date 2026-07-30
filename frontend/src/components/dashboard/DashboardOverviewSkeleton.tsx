export function DashboardOverviewSkeleton() {
  return (
    <div className="flex flex-col space-y-8 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="h-40 w-full rounded-xl bg-gray-200" />

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-gray-200" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Latest AI Insight Skeleton */}
          <div className="h-56 rounded-xl bg-gray-200" />
          
          {/* Quick Actions Skeleton */}
          <div className="h-64 rounded-xl bg-gray-200" />
        </div>

        <div className="flex flex-col space-y-6">
          {/* Favourite Music Skeleton */}
          <div className="h-56 rounded-xl bg-gray-200" />
          
          {/* Recent Albums Skeleton */}
          <div className="h-[26rem] rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
