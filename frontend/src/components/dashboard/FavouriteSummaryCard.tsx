import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Heart, Disc3, Mic2, Shuffle } from 'lucide-react';
import { InsightBadge } from '@/components/insights/InsightBadge';

interface FavouriteSummaryCardProps {
  genreTitle?: string;
  genrePercentage?: number;
  artistName?: string;
  artistCount?: number;
  diversityScore?: number;
  diversityLabel?: string;
}

export function FavouriteSummaryCard({
  genreTitle,
  genrePercentage,
  artistName,
  artistCount,
  diversityScore,
  diversityLabel
}: FavouriteSummaryCardProps) {
  return (
    <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 border-b border-gray-50">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          Favourite Music
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col gap-4">
        
        {/* Favourite Genre */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
            <Disc3 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Top Genre</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {genreTitle || 'N/A'}
            </p>
          </div>
          {genrePercentage !== undefined && (
             <div className="text-sm font-bold text-gray-700">
               {genrePercentage}%
             </div>
          )}
        </div>

        {/* Favourite Artist */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-full">
            <Mic2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Top Artist</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {artistName || 'N/A'}
            </p>
          </div>
          {artistCount !== undefined && (
             <div className="text-sm font-bold text-gray-700">
               {artistCount} <span className="font-normal text-xs text-gray-500">albums</span>
             </div>
          )}
        </div>

        {/* Listening Diversity */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
            <Shuffle className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Diversity</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-900">
                {diversityScore !== undefined ? `${diversityScore}/100` : 'N/A'}
              </p>
              {diversityLabel && (
                <InsightBadge 
                   label={diversityLabel}
                />
              )}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
