import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-lg border shadow-sm">
        <Skeleton className="h-24 w-24 rounded-full shrink-0" />
        <div className="flex flex-col items-center md:items-start flex-1 w-full space-y-3 mt-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-none shadow-sm ring-1 ring-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
