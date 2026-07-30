'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { useAiInsights } from '@/hooks/useAiInsights';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { DashboardOverviewSkeleton } from '@/components/dashboard/DashboardOverviewSkeleton';
import { StatCard } from '@/components/analytics/StatCard';
import { Disc3, Users, LayoutList, Star } from 'lucide-react';
import { LatestInsightCard } from '@/components/dashboard/LatestInsightCard';
import { FavouriteSummaryCard } from '@/components/dashboard/FavouriteSummaryCard';
import { RecentAlbumsList } from '@/components/analytics/RecentAlbumsList';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { AlertCircle, History } from 'lucide-react';

export default function DashboardPage() {
  const { data: analyticsData, isLoading: analyticsLoading, isError: analyticsError } = useAnalytics();
  const { data: insightsData, isLoading: insightsLoading, isError: insightsError } = useAiInsights();

  // If both are loading, show skeleton
  if (analyticsLoading && insightsLoading) {
    return <DashboardOverviewSkeleton />;
  }

  const isEmpty = analyticsData?.totalAlbums === 0;

  if (isEmpty && !analyticsLoading) {
    return (
      <div className="flex flex-col space-y-6">
        <WelcomeBanner />
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
          <EmptyState
            title="Start building your music library"
            description="Your dashboard will show analytics and AI insights once you add some albums to your collection."
            icon={<Disc3 size={48} />}
            action={
              <Link href="/search">
                <Button>Search Albums</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 pb-8">
      <WelcomeBanner />

      {/* Quick Stats */}
      {analyticsError ? (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2 border border-red-100 dark:border-red-900">
          <AlertCircle className="w-5 h-5" />
          <span>Failed to load analytics statistics.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/analytics">
            <StatCard 
              title="Total Albums" 
              value={analyticsData?.totalAlbums ?? 0} 
              icon={<Disc3 />} 
              tooltip="Total number of albums saved in your library."
            />
          </Link>
          <Link href="/analytics">
            <StatCard 
              title="Total Artists" 
              value={analyticsData?.totalUniqueArtists ?? 0} 
              icon={<Users />} 
              tooltip="Number of unique artists across your entire collection."
            />
          </Link>
          <Link href="/analytics">
            <StatCard 
              title="Genres" 
              value={analyticsData?.totalGenres ?? 0} 
              icon={<LayoutList />} 
              tooltip="Total variety of genres represented in your albums."
            />
          </Link>
          <Link href="/analytics">
            <StatCard 
              title="Avg Rating" 
              value={analyticsData?.averagePersonalRating?.toFixed(1) ?? '0.0'} 
              icon={<Star />} 
              tooltip="Average rating you have given to albums in your collection (out of 5)."
            />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Latest AI Insight */}
          {insightsError ? (
             <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2 border border-red-100 dark:border-red-900">
               <AlertCircle className="w-5 h-5" />
               <span>Failed to load AI insights.</span>
             </div>
          ) : (
             <LatestInsightCard 
               summary={insightsData?.insights?.find((i) => i.category === 'SUMMARY')?.description ?? 'Gathering insights...'} 
               healthStatus={insightsData?.collectionHealth?.title}
             />
          )}

          {/* Quick Actions */}
          <QuickActionCard />
        </div>

        <div className="flex flex-col space-y-6">
          {/* Favourite Music */}
          {!insightsError && (
            <FavouriteSummaryCard 
              genreTitle={insightsData?.insights?.find((i) => i.title.toLowerCase().includes('genre'))?.description}
              artistName={insightsData?.insights?.find((i) => i.title.toLowerCase().includes('artist'))?.description}
              diversityScore={insightsData?.collectionHealth?.score} 
              diversityLabel={insightsData?.insights?.find((i) => i.category === 'DIVERSITY')?.description}
            />
          )}

          {/* Recently Added */}
          {!analyticsError && (
             <Card className="h-full flex flex-col shadow-sm">
               <CardHeader className="pb-3 border-b border-gray-50">
                 <CardTitle className="text-lg font-semibold flex items-center gap-2">
                   <History className="w-5 h-5 text-gray-500" />
                   Recently Added
                 </CardTitle>
               </CardHeader>
               <CardContent className="pt-4 flex-1">
                 <RecentAlbumsList albums={analyticsData?.recentlyAddedAlbums ?? []} />
               </CardContent>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
}
