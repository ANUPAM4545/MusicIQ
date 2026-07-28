import { CollectionHealthDto } from '@/types/insights';
import { InsightCard } from './InsightCard';

interface CollectionHealthCardProps {
  health: CollectionHealthDto;
}

export function CollectionHealthCard({ health }: CollectionHealthCardProps) {
  // Determine color based on score
  let progressColor = 'bg-gray-200';
  let badgeLabel = 'Needs Improvement';
  
  if (health.score >= 80) {
    progressColor = 'bg-green-500';
    badgeLabel = 'Excellent';
  } else if (health.score >= 50) {
    progressColor = 'bg-blue-500';
    badgeLabel = 'Good';
  } else if (health.score >= 30) {
    progressColor = 'bg-yellow-500';
    badgeLabel = 'Average';
  } else {
    progressColor = 'bg-red-500';
  }

  return (
    <InsightCard
      title={health.title}
      description={health.description}
      iconName="Activity"
      badgeLabel={badgeLabel}
      className="md:col-span-2 lg:col-span-1"
    >
      <div className="mt-2">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-gray-700">Health Score</span>
          <span className="text-2xl font-bold text-gray-900">{health.score}<span className="text-sm text-gray-500 font-normal">/100</span></span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full ${progressColor}`} style={{ width: `${Math.min(Math.max(health.score, 0), 100)}%` }}></div>
        </div>
      </div>
    </InsightCard>
  );
}
