"use client";

import { useAiInsights } from "@/hooks/useAiInsights";
import { ErrorState } from "@/components/ui/ErrorState";
import { SectionHeader } from "@/components/insights/SectionHeader";
import { InsightsSkeleton } from "@/components/insights/InsightsSkeleton";
import { InsightsEmptyState } from "@/components/insights/InsightsEmptyState";
import { CollectionHealthCard } from "@/components/insights/CollectionHealthCard";
import { InsightSummaryCard } from "@/components/insights/InsightSummaryCard";
import { RevisitRecommendations } from "@/components/insights/RevisitRecommendations";

export default function AiInsightsPage() {
  const { data: response, isLoading, isError, error, refetch } = useAiInsights();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="AI Insights" 
          description="Generating personalized insights about your music collection..." 
        />
        <InsightsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ErrorState 
          title="Failed to load AI Insights" 
          message={(error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred while generating insights."}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  // If no insights exist, show empty state
  if (!response || !response.insights || response.insights.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader title="AI Insights" />
        <div className="flex justify-center">
          <InsightsEmptyState />
        </div>
      </div>
    );
  }

  const { insights, revisitSuggestions, collectionHealth } = response;
  
  // Group insights by category
  const summaryInsight = insights.find(i => i.category === 'SUMMARY');
  const diversityInsights = insights.filter(i => i.category === 'DIVERSITY');
  const behaviourInsights = insights.filter(i => i.category === 'BEHAVIOUR');
  const trendInsights = insights.filter(i => i.category === 'TREND');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader 
        title="AI Insights" 
        description="Discover hidden patterns and personalized recommendations from your library." 
      />

      {/* Top Level Summary & Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryInsight && (
          <InsightSummaryCard insight={summaryInsight} isSummary={true} />
        )}
        {collectionHealth && (
          <CollectionHealthCard health={collectionHealth} />
        )}
      </div>

      {/* Diversity & Discovery */}
      {diversityInsights.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">Diversity & Discovery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diversityInsights.map((insight, index) => (
              <InsightSummaryCard key={`div-${index}`} insight={insight} />
            ))}
          </div>
        </section>
      )}

      {/* Listening Behaviour */}
      {behaviourInsights.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">Listening Behaviour</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {behaviourInsights.map((insight, index) => (
              <InsightSummaryCard key={`beh-${index}`} insight={insight} />
            ))}
          </div>
        </section>
      )}

      {/* Trends & Activity */}
      {trendInsights.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">Trends & Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendInsights.map((insight, index) => (
              <InsightSummaryCard key={`trend-${index}`} insight={insight} />
            ))}
          </div>
        </section>
      )}

      {/* Revisit Recommendations */}
      {revisitSuggestions && revisitSuggestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">Recommendations to Revisit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RevisitRecommendations albums={revisitSuggestions} />
          </div>
        </section>
      )}
      
    </div>
  );
}
