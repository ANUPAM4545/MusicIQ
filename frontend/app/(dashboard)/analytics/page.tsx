"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { ErrorState } from "@/components/ui/ErrorState";
import { DashboardSkeleton } from "@/components/analytics/DashboardSkeleton";
import { AnalyticsEmptyState } from "@/components/analytics/AnalyticsEmptyState";
import { StatCard } from "@/components/analytics/StatCard";
import { ChartCard } from "@/components/analytics/ChartCard";
import { GenrePieChart } from "@/components/analytics/GenrePieChart";
import { ReleaseYearBarChart } from "@/components/analytics/ReleaseYearBarChart";
import { RatingDistributionChart } from "@/components/analytics/RatingDistributionChart";
import { TopRatedList } from "@/components/analytics/TopRatedList";
import { RecentAlbumsList } from "@/components/analytics/RecentAlbumsList";
import { Library, Music, BarChart, Star } from "lucide-react";

export default function AnalyticsPage() {
  const { data: analytics, isLoading, isError, error, refetch } = useAnalytics();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-2">Loading your music insights...</p>
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ErrorState 
          title="Failed to load analytics" 
          message={error instanceof Error ? error.message : "An unexpected error occurred"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  // If no albums are saved, the backend might return empty lists or totalAlbums = 0
  if (!analytics || analytics.totalAlbums === 0) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
        </div>
        <div className="flex justify-center">
          <AnalyticsEmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-2">Insights and statistics about your personal music library.</p>
      </div>

      <div className="space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Albums" 
            value={analytics.totalAlbums} 
            icon={<Library className="w-6 h-6" />} 
          />
          <StatCard 
            title="Total Artists" 
            value={analytics.totalUniqueArtists} 
            icon={<Music className="w-6 h-6" />} 
          />
          <StatCard 
            title="Genres" 
            value={analytics.totalGenres} 
            icon={<BarChart className="w-6 h-6" />} 
          />
          <StatCard 
            title="Avg. Rating" 
            value={analytics.averagePersonalRating ? analytics.averagePersonalRating.toFixed(1) : "N/A"} 
            icon={<Star className="w-6 h-6" />} 
          />
        </div>

        {/* Charts Row 1: Genre & Year */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Genre Distribution" description="Albums broken down by their primary genre.">
            <GenrePieChart data={analytics.genreDistribution} />
          </ChartCard>
          <ChartCard title="Release Year Distribution" description="Albums organized by release year.">
            <ReleaseYearBarChart data={analytics.releaseYearDistribution} />
          </ChartCard>
        </div>

        {/* Charts Row 2: Ratings */}
        <ChartCard title="Rating Distribution" description="How you've rated your collection from 1 to 5 stars.">
          <RatingDistributionChart data={analytics.ratingDistribution} />
        </ChartCard>

        {/* Lists Row: Top Rated & Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Top Rated Albums" description="Your highest rated masterpieces.">
            <TopRatedList albums={analytics.topRatedAlbums} />
          </ChartCard>
          <ChartCard title="Recently Added" description="The latest additions to your library.">
            <RecentAlbumsList albums={analytics.recentlyAddedAlbums} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
