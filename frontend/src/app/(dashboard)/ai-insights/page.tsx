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
  
  // Extract specific insights
  const summaryInsight = insights.find(i => i.category === 'SUMMARY');
  const otherInsights = insights.filter(i => i.category !== 'SUMMARY');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <SectionHeader 
        title="AI Insights" 
        description="Discover hidden patterns and personalized recommendations from your library." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Top Full Width Summary */}
        {summaryInsight && (
          <InsightSummaryCard insight={summaryInsight} isSummary={true} />
        )}

        {/* Collection Health */}
        {collectionHealth && (
          <CollectionHealthCard health={collectionHealth} />
        )}

        {/* Other Insight Cards */}
        {otherInsights.map((insight, index) => (
          <InsightSummaryCard key={`${insight.title}-${index}`} insight={insight} />
        ))}

        {/* Revisit Recommendations */}
        {revisitSuggestions && revisitSuggestions.length > 0 && (
          <RevisitRecommendations albums={revisitSuggestions} />
        )}
        
      </div>
    </div>
  );
}
