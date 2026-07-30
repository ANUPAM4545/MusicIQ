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
      <div className="mt-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Health Score</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {health.score}<span className="text-sm text-gray-500 font-normal">/100</span>
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 mb-6">
          <div className={`h-2.5 rounded-full ${progressColor}`} style={{ width: `${Math.min(Math.max(health.score, 0), 100)}%` }}></div>
        </div>
        
        <div className="space-y-3 pt-4 border-t dark:border-gray-800">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Score Breakdown</h4>
          
          <MetricRow label="Rated Albums" value={health.ratedAlbumsScore} max={20} />
          <MetricRow label="Metadata Completeness" value={health.metadataCompletenessScore} max={20} />
          <MetricRow label="Genre Diversity" value={health.genreDiversityScore} max={20} />
          <MetricRow label="Artist Diversity" value={health.artistDiversityScore} max={20} />
          <MetricRow label="Collection Activity" value={health.collectionActivityScore} max={20} />
        </div>
      </div>
    </InsightCard>
  );
}

function MetricRow({ label, value, max }: { label: string, value: number, max: number }) {
  const percentage = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-900 dark:text-white">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
