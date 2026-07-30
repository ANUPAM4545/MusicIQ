import { InsightCardDto } from '@/types/insights';
import { InsightCard } from './InsightCard';

interface InsightSummaryCardProps {
  insight: InsightCardDto;
  isSummary?: boolean;
}

export function InsightSummaryCard({ insight, isSummary = false }: InsightSummaryCardProps) {
  return (
    <InsightCard
      title={insight.title}
      description={insight.description}
      iconName={insight.icon}
      badgeLabel={insight.priority === 'HIGH' ? 'Important' : undefined}
      className={isSummary ? 'col-span-1 md:col-span-2 lg:col-span-full bg-gradient-to-br from-primary/5 to-white border-primary/20' : ''}
    />
  );
}
